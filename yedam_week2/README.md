# 예닮 작업 

## 결과 이미지
### Before
![image](https://github.com/plz-graduate/Intro-Extension/assets/87516405/99b5efbd-193b-42ea-9400-d7dc11beffb6)

### After
![image](https://github.com/plz-graduate/Intro-Extension/assets/87516405/e15fa3e5-58f0-4468-b794-9f7e16346481)




## 설명
### `content.js` 
#### : web page의 DOM과 상호작용
 - 교양 이수 현황
     - 교양 이수 현황 표 긁어오기
     - 교양 이수 현황 data 가져오기
     - 교양 이수 현황 정보 주입
       
 - 2023학년도 2학기 성적
     - 로딩 상태에 따라서 `externalScript.js` 주입 
       
### `externalScript.js` 
#### :익스텐션의 환경에서 실행, 로직 수행하고 웹 페이지에 적용
  1. 직전학기 성적 html 태그 찾기
  2. 직전 학기 평량 평균 계산하기
  3. 계산 결과 삽입 

