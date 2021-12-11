# SSUstagram

## 주요 라이브러리

| 이름       | 내용                                             |
|----------|------------------------------------------------|
| nestjs   | express를 사용하는 Typescript 기반의 Node.js 백엔드 프레임워크 |
| axios    | 브라우저 및 node.js를 위한 Promise 기반 HTTP 클라이언트       |
| bctyptjs | 종속성이 없는 JavaScript에서 최적화된 bcrypt               |
| typeorm  | MYSQL을 지원하는 ORM 라이브러리                          |
| passport | Node.js를 위한 authentication middleware          |
| react    | 웹 프론트엔드 프레임워크                                  |
| next     | Production을 위한 리액트 프레임워크                       |

## 접속 정보

```bash
# If node_modules not exists
$ npm install

# Run server
$ npm run start

# 정상적으로 서버가 열리면 8053포트로 접속
# http://127.0.0.1:8053
# http://web.expertly.info:8053
```

## 구현 내용

### 초기화면 (/)

![initial_page](/assets/initial_page.PNG)

- 텍스트, 이미지를 포함한 홈페이지 소개
- 로그인을 할 수 있는 입력 양식
- 사용자 등록을 위한 링크

### 사용자 등록 (/account)

| ![account](/assets/account.PNG)   | ![account_validate](/assets/account_validate.PNG) | ![account_table](/assets/account_table.PNG) |
|----------|----------------|-----------|
| 입력 양식 구성 (email, name, id, password) | 이메일 주소 및 사용자 이름의 경우 중복 체크 | DB에 비밀번호를 암호화해서 저장 |

![account_email](/assets/account_email.PNG)

- 사용자 email 주소 확인을 통해 계정 활성화
- 활성화 되지 않은 계정의 경우 최초 가입 및 매 로그인 시 활성화 이메일 전송 및 문자열 입력 양식이 있는 페이지 띄우기
- 사용자가 입력한 메일 주소로 임의의 문자열 전송을 전송하고, 확인이 된 경우 계정 활성화
- 활성화 코드를 전송했던 시점을 기록했다가 최초 전송 후 3분이 지나면 코드 비활성화 (인증하지 못하도록 막아놓음)

### 사용자 소개 (/profile)

![profile](/assets/profile.PNG)

- 로그인 한 ID 표시
- 현재 시간 표시
- 현재 본인이 following 중인 사람의 숫자와 본인을 follow 하고 있는 사람들의 숫자를 표시
  - user 테이블과 user_following_user 테이블을 통해 구현

### 홈 (/home)

![home](/assets/home.PNG)

- 상단 메뉴 구성
- 메뉴 이동 구현
- 세션 로그아웃
- 작성자 검색
- 일반 텍스트 검색
- Hashtag 검색
- 바둑판 형태로 배치
  - 3열로 사진 및 게시글 Follow 여부에 관계없이 모두 표시
  - 작성자, 작성일, 텍스트, hashtag를 각 사진 하단에 배치
  - 게시글마다 편집 버튼 보인이 작성한 글에 대해서만 표시
  - 게시글 9개 단위로 Pagination 구현
- 하나의 게시물에 여러 장의 사진이 포함된 경우 하단에 버튼 형태의 indicator를 표시하여 전활할 수 있도록 구성
- 게시글 하단의 hashtag를 클릭할 경우 정확히 동일한 hashtag 게시글 검색
- 게시글 하단의 작성자를 클릭할 경우 해당 작성자가 게시한 글들을 검색

### 업로드 (/new)

![new](/assets/new.PNG)

- 한 게시물에 최대 5장의 사진을 올릴 수 있는 입력 양식을 구성
- 텍스트와 hashtag를 동시에 입력 받는 단일 텍스트 입력 양식 구성

### 편집 (/edit)

![edit](/assets/edit.PNG)

- 각 게시물에서 편집 버튼을 누른 경우 업로드와 동일 형태의 입력 양식과 함께 삭제 버튼을 표시하고, 수정 혹은 삭제된 내용을 데이터베이스에 반영 (사진 별로 삭제 혹은 수정 가능)

### Follow 목록 (/follow)

![follow](/assets/follow.PNG)

- 내가 follow 중인 사람과 follow가 가능한 사람들의 목록 표시
- "팔로우" 버튼을 클릭하여 follow 상태 toggle

### Direct Message (/msg)

![msg](/assets/msg.PNG)

- 화면 좌측에 나와 서로 follow 중인 대화 가능한 상대들의 이름과 id 목록 표시
  - 사용자 이름을 클릭할 경우 해당 사용자와의 대화 내용을 우측에 표시 (텍스트만 수신 및 발신)
  - 최근에 대화를 한 순서대로 사용자를 내림차순 배치
    - 가장 최근에 대화한 상대가 가장 위로 오도록 배치
- 대화 창 구성
  - 수신한 메시지는 좌측 정렬
  - 전송한 메시지는 우측 정렬
  - 최근 메시지가 아래에 오도록 정렬
  - 대화 전송 입력양식 표시