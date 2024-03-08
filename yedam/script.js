chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: function () {
            // 특정 텍스트를 포함하는 엘리먼트를 찾습니다.
            function findElementByText(selector, text) {
                var elements = document.querySelectorAll(selector);
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].innerText.includes(text)) {
                        return elements[i];
                    }
                }
                return null;
            }

            // "2024학년도 1"을 포함하는 엘리먼트를 찾습니다.
            var specificElement = findElementByText('th[colspan="9"]', '2023학년도 2');

            // 특정 엘리먼트의 부모인 테이블을 찾습니다.
            var table = specificElement.closest('table');
            var cnt = table.querySelectorAll("tbody > tr");

            var grade = []; // 결과를 담을 배열 생성
            var score = [];
            for (var i = 0; i < cnt.length; i++) {
                grade.push(table.querySelectorAll("tbody > tr > td:nth-child(6)")[i].textContent); // 결과를 배열에 추가
            }

            console.log(grade); // 배열 출력

            for (var i = 0; i < 7; i++){
                score.push(table.querySelectorAll("tbody > tr > td:nth-child(5)")[i].textContent)
            }

            console.log(score); // 배열 출력




        }


    });
});