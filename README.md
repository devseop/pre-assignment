# RIAD 사전과제

[RIAD 코퍼레이션](https://www.riad.co.kr/) Front-End 엔지니어 채용 과제입니다.

본 과제는 API를 이용해 요구하는 기능을 구현하는 것이 목표입니다.

## 🧑🏻‍💻 프로젝트 정보

### 실행 방법

1. 터미널을 키고 원하는 위치에 아래 명령어를 입력하여 `git clone`을 합니다.

   ```
   git clone https://github.com/devseop/pre-assignment.git
   ```

2. `git clone`이 완료되면 `yarn install`을 입력하여 필요한 `node_modules`를 설치합니다.

   ```
   yarn install
   ```

3. `yarn build`를 입력하여 애플리케이션 실행을 위한 준비를 합니다.
   ```
   yarn build
   ```
4. `yarn start`를 입력하여 애플리케이션을 실행합니다.
   ```
   yarn start
   ```

### 기술 스택

| 기술                | 선택한 이유                                                                                        |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| Next.js             | 카탈로그 목록 페이지를 SSG방식으로 미리 렌더링하여 빠른 응답으로 좋은 사용자 경험을 제공           |
| TypeScript          | 개발을 진행하면서 오류를 미리 발견할 수 있어 안정적인 개발 환경을 유지                             |
| Redux-toolkit       | 전역 상태 관리, 낮은 패키지 의존성, 복잡한 보일러 플레이트 설정이 없어 코드를 확인하기 쉽기 때문에 |
| Redux-Saga          | 비동기 흐름을 쉽게 파악할 수 있어서                                                                |
| Axios               | 프로미스 기반으로 비동기 작업을 처리하는데 있어서 더 직관적이고 편리                               |
| Crypto-js           | 회원가입 기능 구현시 필요한 토큰 생성을 위해 사용                                                  |
| tailwindcss         | Next.js와 같이 사용할 때 효율성이 증대하는 하여 선택                                               |
| husky & lint-staged | git hook 자동화를 통해서 강제성을 유지하고 실수를 방지하기 위해                                    |
| Notion API          | 회원정보를 위한 DB 관리용, 공식문서가 잘 되어있고 난이도가 낮아 선택                               |

### 프로젝트 구조

```tsx
pre-assignment
┣ .husky // git hook 설정 자동화를 위한 husky 설정
┣ pages
┃ ┣ api // 회원가입/로그인을 위한 서버 api
┃ ┃ ┣ logInUser.ts
┃ ┃ ┗ registerUser.ts
┃ ┣ catalogue
┃ ┃ ┣ List.tsx  // 카탈로그 목록 페이지
┃ ┃ ┗ [id].tsx  // 카탈로그 상세 페이지
┃ ┣ LogIn.tsx
┃ ┣ SignUp.tsx
┃ ┣ _app.tsx
┃ ┣ _document.tsx
┃ ┗ index.tsx
┣ src
┃ ┣ components
┃ ┣ carousel  // 캐러셀(슬라이드) 컴포넌트 폴더 및 파일
┃ ┃ ┃ ┣ Carousel.tsx
┃ ┃ ┃ ┗ CarouselItem.tsx
┃ ┃ ┣ catalogue // 카탈로그 페이지와 관련된 컴포넌트 (카탈로그 아이템, 목록 페이지 진입을 위한 배너, 필터, 페이지네이션 등)
┃ ┃ ┃ ┣ CatalogueItem.tsx
┃ ┃ ┃ ┣ CatalogueLinkBanner.tsx
┃ ┃ ┃ ┣ Filter.tsx
┃ ┃ ┃ ┗ Pagenation.tsx
┃ ┃ ┣ header  // 페이지 헤더에 사용되는 컴포넌트 (네비게이션바, 로그인/회원가입, 사용자 프로필)
┃ ┃ ┃ ┣ Navbar.tsx
┃ ┃ ┃ ┣ SignButtons.tsx
┃ ┃ ┃ ┗ UserProfile.tsx
┃ ┃ ┣ HelpMsg.tsx // 로그인/회원가입시 사용자 입력에 따른 안내 메세지 컴포넌트
┃ ┃ ┣ Input.tsx // 로그인/회원가입에 사용되는 Input 컴포넌트
┃ ┃ ┣ Layout.tsx
┃ ┃ ┗ Modal.tsx // 상세 페이지 내 이미지 확인을 위한 모달 컴포넌트
┃ ┣ constant
┃ ┃ ┗ constant.ts
┃ ┣ hooks
┃ ┃ ┗ useInput.ts
┃ ┣ lib
┃ ┃ ┣ checkValidations.ts // 로그인/회원가입시 입력값에 따른 유효성을 검사하는 함수
┃ ┃ ┣ getFilterValues.ts  // 필터에 사용되는 옵션값 추출을 위한 함수
┃ ┃ ┗ loadCatalogueData.ts  // 카탈로그 목록 페이지와 상세페이지에서 사용되는 데이터 페칭 함수
┃ ┣ store
┃ ┃ ┣ reducers
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ userReducer.ts  // 로그인 정보 관리를 위한 리듀서
┃ ┃ ┣ sagas
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ userSaga.ts // 로그인 정보 이벤트시 비동기 처리를 위한 사가
┃ ┃ ┗ configureStore.ts
┃ ┣ styles  // 페이지와 각종 컴포넌트에 적용된 스타일
┃ ┃ ┣ Carousel.module.css
┃ ┃ ┣ Catalogue.module.css
┃ ┃ ┣ Components.module.css
┃ ┃ ┣ Filter.module.css
┃ ┃ ┣ Navbar.module.css
┃ ┃ ┣ Sign.module.css
┃ ┃ ┗ globals.css
┃ ┣ types
┃ ┃ ┗ types.ts // 프로젝트에 사용된 타입
```

## 📝 구현 내용

### ✅ 로그인 / 회원가입

```markdown
- 각 회원정보에 따라 유효성 검사
  - 데이터가 유효하지 않을 경우에는 입력 **즉시** 자유로운 방식으로 사용자가 알수있어야 합니다.
- 회원가입/로그인 버튼 클릭시 API 호출
  - 회원정보가 유효하지 않을 경우에는 버튼 클릭시 자유로운 방식으로 사용자가 알수있어야 합니다.
  - **_이때, API는 제공되지 않으며 가상의 API를 호출하는 코드를 구현해주세요._**
```

- 로그인/회원가입 페이지는 `input`이 반복되는 구조로 해당 엘리먼트를 `Input.tsx`로 분리하여 가독성을 높였습니다.
- 회원정보 입력시 실시간으로 유효성 검사를 진행하여 사용자가 조건에 맞는 값을 입력했는지 알 수 있도록 했습니다. 이 때, 입력필드에 맞는 검사 함수들을 각각 구현하고 이를 모두 모은 함수를 이용해 모든 검사가 통과(true)하면 로그인/회원가입 버튼이 활성화 되도록 했습니다.
- 회원가입시 회원 정보는 `Notion API`를 이용하여 관리했으며, 성공적으로 가입이 완료되면 서버 API 측에서 토큰을 생성하여 Notion에 만들어둔 데이터 테이블에 같이 저장합니다.
- 로그인 정보는 `RTK`와 `Redux-Saga`를 이용하여 관리했습니다.

<details>
  <summary>코드 보기</summary>
    <ul>
        <li>Input 컴포넌트 구조</li>
            https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/src/components/Input.tsx#L5-L42
        <li>유효성 검사 함수 중 일부</li>
            https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/src/lib/checkValidations.ts#L13-L38
        <li>회원가입 API 및 로그인 API 호출</li>
            https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/pages/api/registerUser.ts#L16-L39
            https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/pages/LogIn.tsx#L31-L38
    </ul>
</details>

### ✅ 캐러셀

```markdown
- 메인 페이지에 슬라이드 배너(캐러셀)을 구현합니다. (이미지 3~4장 내외)
- **카탈로그의 상세 이미지를 슬라이드 형식**으로 확인할 수 있어야 합니다.
  이때, 슬라이드는 자유롭게 구성하되 **슬라이드의 개수**를 확인할 수 있도록 표현해 주세요.
```

- 메인 페이지의 캐러셀과 카탈로그 상세 이미지를 모두 보는 컴포넌트가 동일하다고 판단하여 하나의 `Carousel` 컴포넌트로 구현했습니다.
- 카탈로그 데이터 예시를 통해 상세 이미지 목록의 구조를 파악하고, 해당 구조를 메인 페이지 캐러셀에 쓰일 이미지에 동일하게 적용했습니다. 이렇게 컴포넌트가 받는 **데이터의 구조를 통일시켜 재사용성을 높였습니다.**
- `setInterval`을 이용하여 자동 슬라이드를 구현하였고 `useRef`를 이용하여 현재 슬라이드를 관찰하여 Index가 바뀔 때마다 슬라이드를 이동할 수 있도록 구현했습니다.
- 상세 페이지에서 사용한 캐러셀은 `createPortal()`을 이용하여 구현했습니다. 이를 통해 DOM 계층에서 격리시키고 접근성을 향상시켰습니다.

<details>
  <summary>코드 보기</summary>
    <ul>
      <li>UI</li>
          https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/src/components/carousel/Carousel.tsx#L45-L76
      <li>동작 코드</li>
          https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/src/components/carousel/Carousel.tsx#L19-L4   
      <li>모달 컴포넌트</li>
      https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/src/components/Modal.tsx#L11-L25
    </ul>
</details>

### ✅ 카탈로그 페이지 & 페이지네이션

```markdown
- 카탈로그 목록 페이지

  - 카탈로그 목록은 **4X5 형식**으로 노출됩니다.
  - 이때, **가격은 로그인 상태일 경우에만 노출됩니다.**
  - 해당 카탈로그를 클릭할 경우 **카탈로그 상세 페이지로 이동**합니다.
  - 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용해주세요

- 카탈로그 상세 페이지
  - 카탈로그 상세 페이지는 **대표 이미지가 크게 노출**되어야 하고, **카탈로그의 상세 이미지를 슬라이드 형식**으로 확인할 수 있어야 합니다.
  - 이때, 슬라이드는 자유롭게 구성하되 **슬라이드의 개수**를 확인할 수 있도록 표현해 주세요.
  - 카탈로그 상세 페이지에서 확인 가능한 데이터 목록은 아래와 같습니다.
    - **대표 이미지, 상세 이미지, 호텔명, 등급, 가격, 룸 타입, 상세설명, 주소, 전화번호, 이메일**
```

- 요구사항을 확인했을 때 데이터의 업데이트가 실시간으로 이뤄지는 것은 아니라고 판단했습니다. 따라서 정적으로 페이지를 생성하는게 좋을 것이라 판단했고 이러한 판단으로 `Next.js`를 주요 기술 스택으로 선정했습니다.
- `getStaticProps`와 `getStaticPaths`를 이용하여 빌드 시에 정적으로 페이지를 미리 생성 및 정하도록 했습니다. 이를 통해 사용자 입력에 대해 빠른 응답이 가능하여 사용성을 높입니다.
- 데이터 url이 `~.json`형태라 상세 페이지 접근시 해당 url에서 직접 쿼리를 적용하는게 불가능했고, 이에 따라 데이터 요청 함수에서 `find()`를 이용해 입력값에 맞는 데이터만 추출하여 반환하도록 했습니다. 이러한 방식은 오히려 사용성을 저해할 수 있다고 생각했으나 현재 데이터의 길이가 상대적으로 짧기 때문에 시도해도 괜찮을 거라고 판단하고 진행했습니다.

<details>
  <summary>코드 보기</summary>
    <ul>
        <li>getStaticProps</li>
            https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/pages/catalogue/List.tsx#L100-L110
        <li>getStaticPaths</li>
            https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/pages/catalogue/%5Bid%5D.tsx#L120-L128
        <li>카탈로그 데이터 페칭 함수</li>
            https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/src/lib/loadCatalogueData.ts#L5-L29
    </ul>
</details>

### ✅ 필터 & 페이지네이션

```markdown
- 필터

  - 필터는 다음 항목이 포함되어 있습니다.: **카테고리 / 가격 / 룸 타입 / 등급**
  - 각 필터 항목은 **동시 적용**이 가능하며, 각 필터가 **and** 조건으로 적용됩니다.
  - 필터 적용시 필터 조건에 맞는 **상품의 개수**를 확인할 수 있어야 합니다.
  - 가격 필터의 경우 **범위 검색**으로 최소 ~이상, 최대 ~이하의 형태로 검색이 가능해야 합니다.
  - **룸 타입 필터**의 경우 여러개의 룸 타입을 선택 가능하며 이는 **or 조건**으로 검색이 가능해야 합니다.
  - **등급 필터**의 경우 여러개의 등급을 선택 가능하며 이는 **or 조건**으로 검색이 가능해야 합니다.

- 페이지네이션
  - 페이지는 **페이지에는 최대 20개**의 상품이 노출 되며 현재 위치한 페이지 번호는 **하이라이트** 처리 되어야 합니다.
  - 페이지 번호 목록은 **최대 10개**까지 노출됩니다.
```

- `RTK`와 `Redux-Saga`를 사용하고 있으나 해당 라이브러리는 전역 상태 관리가 목적이므로 필터와 페이지네이션에 필요한 상태는 로컬로 관리했습니다.

- 필터

  - 필터에 필요한 옵션값들을 함수를 통해 추출하여 배열로 반환, 반환된 값을 `map()`을 이용해 렌더링하는 방식으로 UI를 구현했습니다.
  - 필터에 입력된 값과 데이터의 값을 비교하고 이를 `filter()`를 이용해 추출하는 방식으로 필터링 로직을 구현했습니다.
  - 데이터의 `price`가 쉼표, 소수점이 포함된 문자열이고 필터의 입력값은 숫자라서 제대로 적용되지 않는 오류가 있었습니다. 해당 오류는 `price`의 쉼표를 제거하고 소숫점을 무시하는 정수형태로 변환하여 로직이 올바르게 작동되도록 했습니다.

- 페이지네이션
  - 페이지네이션은 가독성을 위해 컴포넌트로 분리하여 목록 페이지에서 props를 전달하는 방식으로 구현했습니다.
  - 보여질 아이템의 갯수를 20개로 설정하고 행을 구현하고, 열은 `grid` 옵션을 이용해 구현했습니다.
  - 뒷번호로 갈수록 앞번호의 UI가 사라지는 오류가 있어 이를 방지하는 함수를 추가하여 오류를 해결했습니다.

<details>
  <summary>코드 보기</summary>
    <ul>
        <li>[필터] 필터 옵션값 추출 함수</li>
            https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/src/lib/getFilterValues.ts#L3-L9
        <li>[필터] 필터링 로직</li>
            https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/pages/catalogue/List.tsx#L45C1-L65
        <li>[페이지네이션] 페이지 계산 및 총 페이지 초과 방지</li>
            https://github.com/devseop/pre-assignment/blob/ba948670d1f46b0820cda8348c94330d8e6ea0d7/src/components/catalogue/Pagenation.tsx#L24-L33
    </ul>
</details>

## 🫱🏻‍🫲🏿 Commit Convention

커밋 컨벤션은 다음과 같이 설정하고 이를 지키려 했습니다.

e.g. FEAT: 로그인 유효성 검증 기능 구현

| 태그      | 설명 (한국어로만 작성하기)                                     |
| --------- | -------------------------------------------------------------- |
| FEAT:     | 새로운 기능 추가 (변수명 변경 포함)                            |
| FIX:      | 버그 해결                                                      |
| DESIGN:   | CSS 등 사용자 UI 디자인 변경                                   |
| STYLE:    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우          |
| REFACTOR: | 프로덕션 코드 리팩토링                                         |
| COMMENT:  | 필요한 주석 추가 및 변경                                       |
| DOCS:     | 문서를 수정한 경우                                             |
| CHORE:    | 빌드 테스크 업데이트, 패키지 매니저 설정(프로덕션 코드 변경 X) |
| RENAME:   | 파일 혹은 폴더명을 수정하거나 옮기는 작업                      |
| REMOVE:   | 파일을 삭제하는 작업만 수행한 경우                             |
| INIT:     | 초기 커밋을 진행한 경우                                        |
