# 🎯 Branch Convention & Git Convention

## 🎯 Git Convention

- 🎉 **Start:** Start New Project [:tada]
- ✨ **Feat:** 새로운 기능을 추가 [:sparkles]
- 🐛 **Fix:** 버그 수정 [:bug]
- 🎨 **Design:** CSS 등 사용자 UI 디자인 변경 [:art]
- ♻️ **Refactor:** 코드 리팩토링 [:recycle]
- 🔧 **Settings:** Changing configuration files [:wrench]
- 🗃️ **Comment:** 필요한 주석 추가 및 변경 [:card_file_box]
- ➕ **Dependency/Plugin:** Add a dependency/plugin [:heavy_plus_sign]
- 📝 **Docs:** 문서 수정 [:memo]
- 🔀 **Merge:** Merge branches [:twisted_rightwards_arrows:]
- 🚀 **Deploy:** Deploying stuff [:rocket]
- 🚚 **Rename:** 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우 [:truck]
- 🔥 **Remove:** 파일을 삭제하는 작업만 수행한 경우 [:fire]
- ⏪️ **Revert:** 전 버전으로 롤백 [:rewind]

## 🪴 Branch Convention (GitHub Flow)

- `main`: 배포 가능한 브랜치, 항상 배포 가능한 상태를 유지
- `feature/{description}`: 새로운 기능을 개발하는 브랜치
  - 예: `feature/add-login-page`

### Flow

1. `main` 브랜치에서 새로운 브랜치를 생성.
2. 작업을 완료하고 커밋 메시지에 맞게 커밋.
3. Pull Request를 생성 / 팀원들의 리뷰.
4. 리뷰가 완료되면 `main` 브랜치로 병합.
5. 병합 후, 필요시 배포.

**예시**:

```bash
# 새로운 기능 개발
git checkout -b feature/add-login-page

# 작업 완료 후, main 브랜치로 병합
git checkout main
git pull origin main
git merge feature/add-login-page
git push origin main
```

# 디렉토리/파일명

- 기본 파일명은 **PascalCase**로 작명.
  - 확장자가 jsx인 파일은 **PascalCase(index.jsx는 예외사항)**
  - 확장자가 js인 파일은 **camelCase**
- 모든 파일 시작은 **rafce 스니핏**으로 작성.
  - 물론 한 파일에 여러 훅을 저장하는게 효율적이라면 꼭 default로 안내보내도 됨!

## 폴더 구조

- components
  - common → 공통 컴포넌트
  - [domain] → 기능별로 묶기 (예 user, domain1, domain2, …)
- hooks → use로 시작하는 리액트 훅 모음
- layouts → header, sidebar, footer 같은 레이아웃 모음
- pages → 말 그대로 페이지들 모음
- router → 라우팅 담당(페이지 및 레이아웃 들어갑니다)
- utils → truncate, dayjs 같은 유용한 기능 파일 모음

### Main.jsx

- 전역상태, 라우터, cookie-provider처럼 전역으로 감싸는 최상위 집합
- 예시

  ```tsx
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App.jsx';
  import './index.css';
  import { BrowserRouter } from 'react-router-dom';

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
  ```

## 별칭 관리

→ `vite.config.js`에서 관리하기 resolve 이하 참고

### Routes.jsx

```tsx
import { Route, Routes as ReactRouters } from 'react-router-dom';
import HomePage from '@pages/HomePage';

const Routes = () => {
  return (
    <ReactRouters>
      <Route path="/" element={<HomePage />} />
    </ReactRouters>
  );
};

export default Routes;
```

→ App.jsx에서 라우팅을 구성하지 않은건 최대한 깔끔하게 가져가기 위함(물론 다르게 하자고 제안주셔도 됩니당 ㅎㅎ)