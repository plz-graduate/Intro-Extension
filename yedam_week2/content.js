function updateGyoyangIsuTable() {
    // HTML table 가져오기
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

                        .replace('{{totHakjum}}', Object.values(jsonData).reduce((a, b) => a + b, 0));

                    // 삽입 위치 선정, HTML 삽입
                    const insertLocation = document.querySelector('.tablegw');
                    if (insertLocation && updatedHtml) {
                        insertLocation.insertAdjacentHTML('afterend', updatedHtml);
                    }
                });
        })
        .catch(error => console.error('Fetching error:', error));
}

// 페이지 로드가 완료 되면, 교양이수 현황 불러오는 함수 실행
window.addEventListener('load', updateGyoyangIsuTable);

// 2023-2학기 성적 로드
if (document.readyState === 'loading') {  // 로딩 중이라면
    document.addEventListener('DOMContentLoaded', function () {
        const scriptEl = document.createElement('script');
        scriptEl.src = chrome.runtime.getURL('externalScript.js');
        document.documentElement.appendChild(scriptEl);
    });
} else {  // 이미 로딩이 완료된 경우
    const scriptEl = document.createElement('script');
    scriptEl.src = chrome.runtime.getURL('externalScript.js');
    document.documentElement.appendChild(scriptEl);
}