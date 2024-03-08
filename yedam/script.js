function findElementByText(selector, text) {
    let elements = document.querySelectorAll(selector);
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].innerText.includes(text)) {
            return elements[i];
        }
    }
    return null;
}

function calc(scores, times){
    // 성적 매칭
    let scoreTable = new Map();

    scoreTable.set("A+", 4.5);
    scoreTable.set("A0", 4.0);
    scoreTable.set("B+", 3.5);
    scoreTable.set("B0", 3.0);
    scoreTable.set("C+", 2.5);
    scoreTable.set("C0", 2.0);
    scoreTable.set("D+", 1.5);
    scoreTable.set("D0", 1.0);
    scoreTable.set("F", 0);
    scoreTable.set("P ", "P");
    scoreTable.set("NP ", "NP");

    // 계산 준비 : 영어 성적 변환
    let numScores = [];
    for (let i=0; i<scores.length; i++){
        numScores.push(scoreTable.get(scores[i]));
    }

    // 계산 하기
    let sumScore = 0;
    let sumTime = 0;
    for(let i=0; i<numScores.length; i++){
        if (numScores[i] == 'P' | numScores[i] == 'NP'){
            continue;
        }
        sumScore += numScores[i] * parseInt(times[i]);
        sumTime += parseInt(times[i]);
    }

    return (sumScore / sumTime).toFixed(2);
}


let specificElement = findElementByText('th[colspan="9"]', '2023학년도 2');
console.log(specificElement);
let table = specificElement.closest('table');
let cnt = table.querySelectorAll("tbody > tr");

let grade = []; // 영여 성적 ex) A+, A0, ..
let time = []; // 강의 시수 ex) 3, 2, ...
for (let i = 0; i < cnt.length; i++) {
    grade.push(table.querySelectorAll("tbody > tr > td:nth-child(6)")[i].textContent); // 결과를 배열에 추가
}

for (let i = 0; i < cnt.length; i++){
    time.push(table.querySelectorAll("tbody > tr > td:nth-child(5)")[i].textContent)
}


const result = calc(grade, time);
console.log(result);

chrome.runtime.sendMessage({type: "calculationResult", data: result});

