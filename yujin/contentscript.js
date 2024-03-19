
// 웹페이지의 DOM에 접근하여 성적 정보를 수집. 성적정보를 찾아서 평균을 계산한 후, 이를 popup으로 보냄

// 계산된 평균 성적을 페이지에 추가하는 함수
function insertAverage(average) {
    // 성적을 표시할 요소 생성
    const resultElement = document.createElement('div');
    resultElement.style.padding = '10px';
    resultElement.style.marginTop = '10px';
    resultElement.style.backgroundColor = '#f0f0f0';
    resultElement.style.border = '1px solid #ddd';
    resultElement.textContent = `2023학년도 2학기 평균 성적: ${average}`;

    // 'tablegw' 클래스를 가진 첫 번째 테이블을 찾습니다.
    const targetTable = document.querySelector('.tablegw');
    if (targetTable) {
        // 찾은 테이블 바로 다음에 평균 성적 요소를 삽입합니다.
        targetTable.parentNode.insertBefore(resultElement, targetTable.nextSibling);
    } else {
        console.log("대상 테이블을 찾을 수 없습니다.");
    }
}


function convertGradeToPoint(grade) {
    const gradeToPoint = {
        'A+': 4.5, 'A0': 4.0, 'B+': 3.5, 'B0': 3.0,
        'C+': 2.5, 'C0': 2.0, 'D+': 1.5, 'D0': 1.0, 'F': 0.0,
        'P': null, 'NP': null // 'P'와 'NP'는 평균 계산에 포함되지 않음
    };
    return grade in gradeToPoint ? gradeToPoint[grade] : null; // 성적이 매핑되지 않은 경우 null로 처리
}

function calculateAverage(semester) {
    // 모든 테이블을 순회하면서 지정된 학기의 테이블을 찾습니다.
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
    let totalPoints = 0;
    let subjectCount = 0;

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

    // 계산된 평균 성적을 웹 페이지에 표시합니다.
    insertAverage(average.toFixed(2));

    // 평균 성적을 팝업에 전달하기 위한 메시지 구성
    chrome.runtime.sendMessage({
        type: "calculationResult",
        data: average.toFixed(2)
    });
}



// "2023학년도 2학기"에 해당하는 성적의 평균을 계산합니다.
calculateAverage("2023학년도 2학기");

