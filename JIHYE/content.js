

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "avgResult") {
        const targetTable = document.querySelector('.tablegw');

        if (targetTable) {
            
            const tableParent = targetTable.parentNode;
            let newDiv = document.createElement("div");
            let newText = document.createTextNode("2023학년도 2학기 성적: " + message.avg2);

            newDiv.appendChild(newText);

            tableParent.insertBefore(newDiv, targetTable.nextSibling);
        }
    }
});


// 다른 페이지의 URL
var otherPageURL = "https://klas.kw.ac.kr/std/cps/inqire/GyoyangIsuStdPage.do";

// 다른 페이지의 타이틀을 가져오고 현재 페이지에 표시하는 함수
function updateGyoyangIsuTable() {
    fetch(otherPageURL)
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
        .catch(error => {
            console.error('Error fetching page:', error);
        });
}
window.addEventListener('load', updateGyoyangIsuTable);

