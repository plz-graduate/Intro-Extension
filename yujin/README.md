# 유진 작업



## 설명

- `manifest.json`: 크롬 확장 프로그램의 환경설정 파일

- `popup.html` : 크롬 확장 프로그램 아이콘 클릭시 나오는 popup
    
    <script src="popup.js"></script>
    -> html 파일에 script를 작성하는 것이 아니라 별도의 파일을 만들어서 작업해야됨
    
- `script.js` : web page 내에서 실행되는 **content script**
  1. 직전학기 성적 html 태그 찾기
  2. 직전 학기 평량 평균 계산하기
  3. 계산 결과 → `popup.js`에 보내기
       
- `popup.js` : 익스텐션 환경 script. 즉, **popup script**
    1. popup load시 필요한 script(즉, `script.js`)를 주입
    2. `script.js` 계산 결과 수신 & DOM을 update

## 1주차 
![image]