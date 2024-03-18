// 확장 프로그램의 핵심 로직을 처리하며, 다른 컴포넌트들과의 메시지 교환을 관리

// contentscript.js에서 계산한 성적 평균을 받지만, 팝업에서 직접 처리하므로 여기서는 별도의 저장 로직을 수행하지 않음
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.action === "calculateAverage") {
        // 성적 평균 처리 로직
        // 예: 메시지 로깅
        console.log("Received average grade:", request.average);
        // 필요한 경우 여기에서 추가적인 처리를 수행할 수 있음
      }
    }
  );
  