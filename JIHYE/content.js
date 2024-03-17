

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



// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.type === "avgResult") {
//         // 텍스트 바로 삽입은 되는데... script.js에서 불러와서 넣는 거 안됨 ㅅㅂ


//         let newText = document.createTextNode("2023학년도 2학기 성적",message.avg2);
//         const targetTable = document.querySelector('.tablegw');

//         if (targetTable) {
//         targetTable.appendChild(newText);
//         }
//     }
// });

