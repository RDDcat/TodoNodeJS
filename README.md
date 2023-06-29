# 안녕하세요!!

안녕하세요. 
이 프로젝트는 간단한 TODO 웹 개발 프로젝트입니다.

Java-Spring을 이용한 백엔드 개발만을 진행하다가 우연히 인턴쉽 도중에 NodeJS를 개발할 기회가 생겼었습니다. 
그때 개발했던 기억이 너무 좋아서 NodeJS와 바닐라 JS를 활용한 새로운 서비스를 만들어 보고싶어서 이 프로젝트를 기획했습니다.

### 🎯 이 서비스는 총 3가지 기능을 가지고 있습니다.

1. 할일 리스팅, 추가, 삭제, 히스토리
2. 간단한 아이디어 메모 작성
3. 아이디어를 스티커 보드에 나열된 것처럼 조회 및 수정


## 기술 스택

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


## 백엔드

[백엔드 깃허브](https://github.com/seeungmin/TodoSpringBack)

백엔드는 Java-Spring Boot 프로젝트로 구성되어있습니다.

자세한 내용은 백엔드 Readme 파일을 확인해주세요 :)


## 구현

현재 총 5가지 페이지를 가지고 있습니다.

1. 메인
2. TODO
3. MEMO
4. BOARD
5. ABOUT


### 메인


### TODO


### MEMO


### BOARD


### ABOUT



### 🔍 Oauth 문제

spring 과 template 엔진을 사용하면서 SSR 방식의 서비스 구현에 익숙했었었는데요. 

이번에 백엔드(spring)와 프론트엔드(node)를 나누고서 Oauth 인증하는 방식에 골머리를 썩히고 있습니다.

해결 방식은 여러가지가 떠오르는데 그중에 뭐가 맞는방식인지 왜 그게 맞는지 잘 모르겠네요.

1. node에서 oauth 인증서버로 링크를 걸고 callback 이벤트를 백엔드에서 받아서 인증 토큰을 프론트로 발급한다. (callback 이후에 강제로 프론트엔드 페이지로 redirect)
2. node에서 oauth 인증서버로 인증을 받고 인증을 받을때 인증확인 토큰만 받는다. 이후에 받은 토큰을 백엔드 서버로 넘겨서 백엔드 서버가 다시 해당 토큰으로 oauth 인증서버에게 인증을 받는다.

흠...


🔍🎯✏️🚀📮💻