# 유진 작업



## 설명

- `manifest.json`: 크롬 확장 프로그램의 환경설정 파일

- `popup.html` : 크롬 확장 프로그램 아이콘 클릭시 나오는 popup
    
    <script src="popup.js"></script>
    -> html 파일에 script를 작성하는 것이 아니라 별도의 파일을 만들어서 작업해야됨
    
- `contentscript.js` : 웹페이지의 DOM에 접근하여 성적 정보를 수집.
  1. 성적정보를 찾아서 평균을 계산한 후
  2. 이를 popup.js로 보냄
       
- `popup.js` : 익스텐션 환경 script. 즉, **popup script**
    1. popup load시 필요한 script(즉, `script.js`)를 주입
    2. `script.js` 계산 결과 수신 & DOM을 update

## 1주차 
<img width="257" alt="image" src="https://github.com/plz-graduate/Intro-Extension/assets/136612437/502281eb-40ab-4287-b0b1-04fe50ff399c">
