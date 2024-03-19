
// 웹페이지의 DOM에 접근하여 성적 정보를 수집. 성적정보를 찾아서 평균을 계산한 후, 이를 popup으로 보냄

// 성적을 점수로 변환하는 함수
function convertGradeToPoint(grade) {
    const gradeToPoint = {
        'A+': 4.5, 'A0': 4.0, 'B+': 3.5, 'B0': 3.0,
        'C+': 2.5, 'C0': 2.0, 'D+': 1.5, 'D0': 1.0, 'F': 0.0,
        'P': null, 'NP': null // 'P'와 'NP'는 평균 계산에 포함되지 않음
    };
    return grade in gradeToPoint ? gradeToPoint[grade] : null; // 성적이 매핑되지 않은 경우 null로 처리
}

// 지정된 학기의 성적 평균을 계산하고 결과를 웹 페이지에 추가하는 함수
function calculateAverage(semester) {
    const tables = document.querySelectorAll("table.AType");
    let targetTable = null;
    tables.forEach(table => {
        const headerText = table.querySelector("th").innerText;
        if (headerText.includes(semester)) {
            targetTable = table;
        }
    });

    if (!targetTable) {
        console.log(`${semester}에 해당하는 성적 정보를 찾을 수 없습니다.`);
        return;
    }

    const rows = targetTable.querySelectorAll("tbody tr");
    let totalPoints = 0, subjectCount = 0;

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const grade = cells[3].innerText.trim(); // 성적 정보
        const point = convertGradeToPoint(grade);

        if (point !== null) { // 'P'와 'NP'가 아닌 경우만 계산에 포함
            totalPoints += point;
            subjectCount += 1;
        }
    });

    const average = subjectCount ? totalPoints / subjectCount : 0; // 0으로 나누는 것을 방지
    console.log(`성적 평균: ${average.toFixed(2)}`);

    // 계산된 평균 성적을 웹 페이지에 추가합니다.
    insertAverage(average.toFixed(2));

    // 평균 성적을 팝업에 전달하기 위한 메시지 구성
    chrome.runtime.sendMessage({
        type: "calculationResult",
        data: average.toFixed(2)
    });
}

// 계산된 평균 성적을 페이지에 추가하는 함수
function insertAverage(average) {
    const resultElementId = 'averageResult';
    // 이미 결과를 표시한 요소가 있는지 검사하고, 있다면 제거
    const existingResult = document.getElementById(resultElementId);
    if (existingResult) {
        existingResult.remove();
    }

    const resultElement = document.createElement('div');
    resultElement.id = resultElementId;
    resultElement.style.padding = '10px';
    resultElement.style.marginTop = '10px';
    resultElement.style.backgroundColor = '#f0f0f0';
    resultElement.style.border = '1px solid #ddd';
    resultElement.textContent = `2023학년도 2학기 평균 성적: ${average}`;

    // 'tablegw' 클래스를 가진 첫 번째 테이블을 찾아 바로 다음에 삽입
    const targetTable = document.querySelector('.tablegw');
    if (targetTable) {
        targetTable.parentNode.insertBefore(resultElement, targetTable.nextSibling);
    } else {
        console.log("대상 테이블을 찾을 수 없습니다.");
    }
}


// 데이터 추출 함수
function extractData() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
            // 셀의 데이터 처리
            console.log(cell.innerText); // 콘솔에 텍스트 출력
        });
    });
}

// 변화 감지 및 데이터 추출 로직
function observeDynamicContent() {
    const targetNode = document.querySelector('body'); // 감시할 대상

    // 감시자 옵션: 자손 노드의 변화와 자식 노드의 추가 또는 제거를 관찰
    const config = { childList: true, subtree: true };

    // 변화가 감지됐을 때 실행할 콜백 함수
    const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('Detected changes in the DOM.');
                extractData(); // 변화 감지 시 데이터 추출 함수 실행
                
                // 필요한 경우, 여기서 observer.disconnect();를 호출하여 감시를 멈출 수 있음
            }
        }
    };

    // MutationObserver 인스턴스 생성 및 시작
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}

// 웹 페이지 로딩 완료 시 동적 콘텐츠 감시 시작
if (document.readyState === 'complete') {
    observeDynamicContent();
} else {
    window.addEventListener('load', observeDynamicContent);
}



// 배경 스크립트로부터 데이터를 요청하고 받아온 데이터를 처리합니다.
chrome.runtime.sendMessage({action: "fetchData"}, function(response) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, "text/html");

    // 두 번째 'tablegw' 클래스를 가진 테이블을 찾습니다.
    const tables = doc.querySelectorAll('.tablegw');
    if (tables.length > 1) { // 두 번째 테이블이 존재하는 경우
        const secondTableHTML = tables[1].outerHTML; // 두 번째 테이블의 HTML을 추출
        
        // 현재 페이지에 삽입하는 함수 호출
        insertDataIntoPage(secondTableHTML);
    } else {
        console.error("두 번째 'tablegw' 클래스를 가진 테이블이 존재하지 않습니다.");
    }
});

// 페이지에 데이터를 삽입하는 함수
function insertDataIntoPage(html) {
    // 현재 페이지에서 첫 번째 'tablegw' 클래스를 가진 테이블을 찾습니다.
    const targetTable = document.querySelector('.tablegw');
    if (targetTable) {
        // 삽입될 위치를 정의하는 wrapper 요소 생성
        const wrapperDiv = document.createElement('div');
        wrapperDiv.innerHTML = html;
        
        // 첫 번째 'tablegw' 다음에 추출한 두 번째 'tablegw' 삽입
        targetTable.parentNode.insertBefore(wrapperDiv, targetTable.nextSibling);
    }
}

// 교양 이수 현황 업데이트 함수
function updateGyoyangIsuTable() {
    // HTML 페이지 가져오기
    fetch('https://klas.kw.ac.kr/std/cps/inqire/GyoyangIsuStdPage.do')
        .then(response => response.text())
        .then(htmlString => {
            // JSON 데이터 가져오기
            return fetch('/std/cps/inqire/GyoyangIsuInfo.do', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            })
            .then(response => response.json())
            .then(jsonData => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlString, 'text/html');
                const table = doc.querySelector('#appModule > div > table:nth-child(3)');
                const html = `<br><br> ` + table.outerHTML;

                // JSON 데이터를 사용하여 HTML 요소 대체
                let updatedHtml = html
                    .replace('{{sugang.aa8128}}', jsonData.aa8128)
                    .replace('{{sugang.aa3362}}', jsonData.aa3362)
                    .replace('{{sugang.aa76}}', jsonData.aa76)
                    .replace('{{sugang.aa64}}', jsonData.aa64)
                    .replace('{{sugang.aa63}}', jsonData.aa63)
                    .replace('{{sugang.aa65}}', jsonData.aa65)
                    .replace('{{sugang.aa66}}', jsonData.aa66)
                    .replace('{{sugang.aa67}}', jsonData.aa67)
                    .replace('{{sugang.aa68}}', jsonData.aa68)
                    .replace('{{sugang.aa7881}}', jsonData.aa7881)
                    // 필요한 만큼 추가적인 데이터 필드 반복
                    .replace('{{totHakjum}}', Object.values(jsonData).reduce((a, b) => a + b, 0));

                // 삽입 위치 선정 및 HTML 삽입
                const insertLocation = document.querySelector('.tablegw');
                if (insertLocation && updatedHtml) {
                    insertLocation.insertAdjacentHTML('afterend', updatedHtml);
                }
            });
        })
        .catch(error => console.error('Fetching error:', error));
}

// 페이지 로드가 완료되면 교양 이수 현황 업데이트 함수 실행
window.addEventListener('load', updateGyoyangIsuTable);

// 여기에 필요한 추가적인 컨텐츠 스크립트 코드를 포함할 수 있습니다.
// 예를 들어, 페이지의 특정 액션에 대한 리스너나 다른 DOM 조작 등을 추가할 수 있습니다.


// "2023학년도 2학기"에 해당하는 성적의 평균을 계산하고 삽입하는 함수 실행
calculateAverage("2023학년도 2학기");


  
  

