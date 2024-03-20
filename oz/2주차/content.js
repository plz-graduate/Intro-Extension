// content.js

// 메시지를 수신하여 처리하는 함수
function handleMessage(message) {
  // 웹 페이지의 HTML을 가져오는 함수
  function fetchHTML() {
    return document.documentElement.outerHTML;
  }

  // 가져온 HTML에서 특정 클래스 아래에 내용을 추가하는 함수
  function insertContentIntoTableGW(html) {
    // 특정 클래스명 아래에 추가할 내용
    var insertionContent = "<tr><td>이번학점: " + message.avg2 + "</td></tr>";

    // 특정 클래스를 가진 요소의 위치를 찾기 위해 정규표현식을 사용
    var regex = /<table class="tablegw">[\s\S]*?<\/table>/g;
    var matches = html.match(regex);

    // 모든 매치를 순회하면서 각각에 내용을 추가함
    for (var i = 0; i < matches.length; i++) {
      html = html.replace(matches[i], matches[i] + insertionContent);
    }

    // 수정된 HTML을 반환
    return html;
  }

  // 콘텐츠 스크립트가 실행되면 실행될 함수
  function main() {
    // 웹 페이지의 HTML을 가져옴
    var html = fetchHTML();
    // 특정 클래스 아래에 내용을 추가하여 HTML 수정
    var modifiedHTML = insertContentIntoTableGW(html);
    // 수정된 HTML을 웹 페이지에 삽입함
    document.documentElement.innerHTML = modifiedHTML;
  }
  function updateGyoyangIsuTable() {
    // table 가져옴
    fetch("https://klas.kw.ac.kr/std/cps/inqire/GyoyangIsuStdPage.do")
      .then((response) => response.text())
      .then((htmlString) => {
        // JSON 데이터 가져오기
        return fetch("/std/cps/inqire/GyoyangIsuInfo.do", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        })
          .then((response) => response.json())
          .then((jsonData) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, "text/html");
            const table = doc.querySelector(
              "#appModule > div > table:nth-child(3)"
            );
            const html = `<br><br> ` + table.outerHTML;

            // JSON 데이터를 사용하여 HTML 요소 대체
            let updatedHtml = html
              .replace("{{sugang.aa8128}}", jsonData.aa8128)
              .replace("{{sugang.aa3362}}", jsonData.aa3362)
              .replace("{{sugang.aa76}}", jsonData.aa76)
              .replace("{{sugang.aa64}}", jsonData.aa64)
              .replace("{{sugang.aa63}}", jsonData.aa63)
              .replace("{{sugang.aa65}}", jsonData.aa65)
              .replace("{{sugang.aa66}}", jsonData.aa66)
              .replace("{{sugang.aa67}}", jsonData.aa67)
              .replace("{{sugang.aa68}}", jsonData.aa68)
              .replace("{{sugang.aa7881}}", jsonData.aa7881)

              .replace(
                "{{totHakjum}}",
                Object.values(jsonData).reduce((a, b) => a + b, 0)
              );

            // 삽입 위치 선정, HTML 삽입
            const insertLocation = document.querySelector(".tablegw");
            if (insertLocation && updatedHtml) {
              insertLocation.insertAdjacentHTML("afterend", updatedHtml);
            }
          });
      })
      .catch((error) => console.error("Fetching error:", error));
  }
  // main 함수 실행
  main();
  updateGyoyangIsuTable();
}

// 백그라운드 스크립트 또는 팝업 스크립트로부터 메시지를 수신하고 처리
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  handleMessage(message);
});
