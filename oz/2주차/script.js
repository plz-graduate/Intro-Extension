// 특정 텍스트를 포함하는 엘리먼트 찾기
function findElementByText(selector, text) {
  2;
  let elements = document.querySelectorAll(selector);
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].innerText.includes(text)) {
      return elements[i];
    }
  }
  return null;
}

//학점으로 변환
function getScores(grades) {
  const gradeMap = {
    "A+": 4.5,
    A0: 4.0,
    "B+": 3.5,
    B0: 3.0,
    "C+": 2.5,
    C0: 2.0,
    "D+": 1.5,
    D0: 1.0,
    F: 0.0,
    P: null,
    NP: null,
  };

  const gradetoscore = [];

  grades.forEach((grade) => {
    gradetoscore.push(gradeMap[grade]);
  });

  return gradetoscore;
}

// "2024학년도 1" 찾기
var specificElement = findElementByText('th[colspan="9"]', "2023학년도 2");

// 특정 엘리먼트의 부모인 테이블을 찾기
var table = specificElement ? specificElement.closest("table") : null;

let grade = []; // ex. A+,B etc
const score = []; // 이수 학점들

//성적 가져와서 배열에 추가하고 성적변환
for (var i = 0; i < 7; i++) {
  grade.push(
    table.querySelectorAll("tbody > tr > td:nth-child(6)")[i].textContent
  );
}
const tt = getScores(grade);

//이수학점 가져오기
for (var i = 0; i < 7; i++) {
  score.push(
    table.querySelectorAll("tbody > tr > td:nth-child(5)")[i].textContent
  );
}

temp = 0;
totalCredit = 0; // 이수학점 총합을 저장할 변수

for (var i = 0; i < score.length; i++) {
  if (grade[i] === "P " || grade[i] === "NP ") continue;
  temp += tt[i] * Number(score[i]);
  totalCredit += Number(score[i]); // 이수학점 총합 업데이트
}

console.log(temp);
console.log(totalCredit); // 이수학점 총합 확인
const avg = (temp / totalCredit).toFixed(2); // 이수학점으로 평균 계산

chrome.runtime.sendMessage({ type: "calculationResult", avg: avg });
chrome.runtime.sendMessage({ type: "avgResult", avg2: avg });
