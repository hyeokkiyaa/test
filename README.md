다 다운받아야 실행가능
 - npm install mdb-react-ui-kit
 - npm install mdb-ui-kit
 - npm install @fortawesome/fontawesome-free
 - npm install react-router-dom
 - npm install axios
  - npm install react-bootstrap bootstrap
 - npm install rsuite --save 

 - npm start / yarn start

10/12 오전
 - login 구현 완성
 - 로그인 후 userid 쭉 사용하기 위해서 UserContext.js 설정
 - content/test.js를 보면 확인할 수 있는데 test.js를 통해서 확인 후 userid 매칭 후 해당 mockapi 사용가능 

 - login 후 원래 dashboard로 이동해야하는데 간단하게 userId 연동 테스트 해본다고 test.js로 이동시켰어요! 확인하신 다음에 지우시고 dashboard로 연동해도 될 것 같아요~

10/15 새벽
 - navbar 업데이트 route 해서 사용해봐도 될 것 같아요. 구현하는데만 신경쓰느라 아직 테스트 안해봤어요.
  - useEffect 아까 저녁에 얘기하던 부분도 신경 못해봤어요. 그냥 get하는 부분을 함수로 만드는 방법 생각해봤어요.
 - Login하면 transferList로 이동시켜놨어요. 나중에 하실때 바꾸시면 됩니다. 
 - = 실행이 안됌... navbar icon 확인 필요 (Responsible web desgin)

 10/19 오전
  - navbar를 통한 link 연결 성공
 - navbar를 위해 간단한 구현 dashboard, convert, userinfo
  - delete update 버튼 및 delete 구현 성공
   - table bootstrap을 통해서 구현
  - pagination react suite를 통해서 구현

 10/19 오후
  - update를 Modal해서 생성 완료...
  - data 연동해서 update하는 부분 modal로 하려는 많이 힘들었습니다!!
  - 제목만 변경 가능하고, 나머지는readOnly로 읽기만 설정 완료
