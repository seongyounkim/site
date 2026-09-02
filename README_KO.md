# Seong Youn Kim 연구 홈페이지 초안

이 폴더는 별도의 설치나 빌드 없이 바로 작동하는 정적 홈페이지입니다.  
대부분의 수정은 **`site-data.js` 한 파일**에서 끝납니다.

## 1. 가장 먼저 고칠 것

`site-data.js`를 열고 `TODO`를 검색하세요.

필수 수정 항목은 다음 네 가지입니다.

1. `profile.position`: 현재 직위
2. `profile.affiliation`: 학과 및 소속 기관
3. `profile.email`: 공개할 이메일 주소
4. Google Scholar, ORCID, GitHub 주소가 있으면 각각 입력하고 `enabled: true`로 변경

예시:

```js
position: "Ph.D. Candidate",
affiliation: "Department of Mathematics, Example University",
email: "name@example.edu"
```

## 2. 프로필 사진 넣기

1. 사진 파일을 `assets/profile.jpg`로 저장합니다.
2. `site-data.js`에서 아래처럼 바꿉니다.

```js
photo: "assets/profile.jpg"
```

사진을 넣지 않으면 현재처럼 `SYK` 모노그램이 표시됩니다.

## 3. CV 넣기

1. CV를 `assets/cv.pdf`로 저장합니다.
2. `site-data.js`의 CV 항목에서 `enabled: false`를 `enabled: true`로 바꿉니다.

```js
{
  label: "CV",
  url: "assets/cv.pdf",
  icon: "file",
  enabled: true
}
```

## 4. 논문 추가하기

`site-data.js`의 `publications` 배열에서 기존 논문 한 블록을 복사한 뒤 제목, 연도, 요약, 링크, BibTeX를 수정하면 됩니다.

최신 논문을 위에 두고, 대표 논문 하나에만 다음을 설정하는 것을 권합니다.

```js
featured: true
```

## 5. 강연 및 강의 섹션 열기

초안에서는 데이터가 없어서 숨겨져 있습니다.

강연 정보를 입력한 뒤:

```js
talks: {
  show: true,
  items: [ ... ]
}
```

강의 정보를 입력한 뒤:

```js
teaching: {
  show: true,
  items: [ ... ]
}
```

으로 바꾸면 메뉴와 본문에 자동으로 나타납니다.

## 6. 로컬에서 확인하기

### 가장 간단한 방법

`index.html`을 더블클릭해 브라우저로 엽니다.

### 로컬 서버 사용

터미널에서 이 폴더로 이동한 뒤:

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다.

## 7. GitHub Pages에 올리기

1. GitHub에서 `<사용자명>.github.io`라는 public repository를 만듭니다.
2. 이 폴더 안의 파일을 모두 repository 최상단에 업로드합니다.
3. Repository의 **Settings → Pages**로 이동합니다.
4. **Deploy from a branch**를 선택합니다.
5. Branch는 `main`, 폴더는 `/ (root)`로 지정합니다.
6. 저장 후 `<사용자명>.github.io`에서 확인합니다.

`README_KO.md`는 홈페이지에 노출되지 않습니다. 다만 repository 자체를 공개했을 때는 GitHub에서 보입니다.

## 8. 독자 도메인 연결

도메인을 구입했다면 GitHub Pages 설정에서 Custom domain을 지정할 수 있습니다.  
루트 폴더에 `CNAME` 파일을 만들고 도메인 한 줄만 적는 방식도 사용할 수 있습니다.

예시:

```text
seongyounkim.com
```

DNS 설정은 도메인 구입처에 따라 달라집니다.

## 파일 구조

```text
.
├── index.html              # 페이지 골격: 보통 수정할 필요 없음
├── site-data.js            # 내용 수정은 거의 전부 여기서
├── styles.css              # 색상·폰트·레이아웃
├── script.js               # 자동 렌더링·다크 모드·메뉴
├── GOOGLE_SITES_COPY.md    # Google Sites 복사용 문구
└── assets/
    ├── favicon.svg
    └── portrait-placeholder.svg
```

## 색상 바꾸기

`styles.css` 맨 위 `:root`의 변수만 바꾸면 됩니다.

```css
--bg: #f5f0e8;
--ink: #18201c;
--accent: #285c4d;
--warm: #b96a40;
```

다크 모드 색상은 바로 아래 `html[data-theme="dark"]`에서 바꿀 수 있습니다.
