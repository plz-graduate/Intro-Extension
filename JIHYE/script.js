// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.scripting.executeScript({
//         target: { tabId: tabs[0].id },
//         function: function () {

       
            // 특정 텍스트를 포함하는 엘리먼트를 찾습니다.
            function findElementByText(selector, text) {
                let elements = document.querySelectorAll(selector);
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].innerText.includes(text)) {
                        return elements[i];
                    }
                }
                return null;
            }

            //학점으로 변환
            function getScore(grade){
                if(grade=='A+') return 4.5;
                else if(grade=='A0') return 4.0;
                else if(grade=='B+') return 3.5;
                else if(grade=='B0') return 3.0;
                else if(grade=='C+') return 2.5;
                else if(grade=='C0') return 2.0;
                else if(grade=='D+') return 1.5;
                else if(grade=='D0') return 1.0;
                else if(grade=='F') return 0.0;
            }

            function avgScore(scores){
                const sum = scores.reduce(function(acc,cur){
                    return acc +cur;
                },0);
                const average = sum/scores.length;
                return average.toFixed(2);
            }

            // "2023학년도 2" 찾기
            specificElement = findElementByText('th[colspan="9"]', '2023학년도 2');


            // 특정 엘리먼트의 부모인 테이블을 찾기
            table = specificElement ? specificElement.closest('table') : null;


            
                let grade = []; // ex. A+,B etc
                const score = [];   //들은 학점들

                //성적 가져와서 점수로 변환
                for (var i = 0; i < 7; i++) {
                    grade.push(table.querySelectorAll("tbody > tr > td:nth-child(6)")[i].textContent); // 결과를 배열에 추가
                }
                let scores = grade.map(getScore);
                console.log(scores); // 점수로 변경한 학점 배열 출력

                //성적 평균
                const avg = avgScore(scores);
                console.log(avg);
                
                chrome.runtime.sendMessage({type: "calculationResult", avg: avg});
                chrome.runtime.sendMessage({ type: "avgResult", avg2: avg });
                

            
            // console.log('Message sent to popup:', avg);
            // for (var i = 0; i < 7; i++){
            //     score.push(table.querySelectorAll("tbody > tr > td:nth-child(5)")[i].textContent)
            // }

            // console.log(score); // 배열 출력

            
//         }
//     });
// });