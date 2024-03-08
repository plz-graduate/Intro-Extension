function calcScore(grade, time) {
    let sumScore = 0;
    let sumTime = 0;
    for(let i=0; i<grade.length; i++){
        if (grade[i] == 'P'){
            continue
        }
        sumScore += grade[i] * time[i];
        sumTime += time[i];
    }

    return (sumScore / sumTime).toFixed(2);
}

// input : 영어 성적 list
function rescore(scores){
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
    scoreTable.set("P", "P");
    scoreTable.set("NP", "NP");

    let numScores = []
    for (let i=0; i<scores.length; i++){
        numScores.push(scoreTable.get(scores[i]));
    }

    return numScores;
}

let scores = ["A+", "B+", "B0", "C+", "P"];
let times = [3, 3, 2, 3, 2];

console.log(calcScore(rescore(scores), times));