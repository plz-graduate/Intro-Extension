# 예닮 작업 

## 결과 이미지
![image](https://github.com/plz-graduate/Intro-Extension/assets/87516405/f1da0184-9867-428a-99d6-506c23617806)


## 설명
- `script.js` : web page 내에서 실행되는 **content script**
  1. 직전학기 성적 html 태그 찾기
  2. 직전 학기 평량 평균 계산하기
  3. 계산 결과 → `popup.js`에 보내기
       
- `popup.js` : 익스텐션 환경 script. 즉, **popup script**
    1. popup load시 필요한 script(즉, `script.js`)를 주입
    2. `script.js` 계산 결과 수신 & DOM을 update
