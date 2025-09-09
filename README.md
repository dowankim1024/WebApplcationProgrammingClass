# TypeScript/Jest 환경설정 정리

## 개요
- **TypeScript**로 개발하고 **Jest + ts-jest**로 테스트하는 Node(ESM) 프로젝트입니다.
- 모듈 시스템은 `ESM`이며, TypeScript는 `nodenext` 모듈 해석을 사용합니다.

## 사전 요구사항
- Node.js 최신 LTS 또는 그 이상 권장
- npm 사용 환경

## 설치
```bash
npm install
```

## NPM 스크립트
- **test**: `jest`
- **test:watch**: `jest --watch`
- **test:coverage**: `jest --coverage`

## TypeScript 설정(tsconfig.json)
- **module: `nodenext`**: Node의 ESM/CJS 규칙을 TS가 그대로 인식합니다.
- **target: `esnext`**: 최신 JS로 트랜스파일합니다.
- **strict: `true`**: 엄격 타입 검사 활성화.
- **jsx: `react-jsx`**: React 17+ JSX 변환(향후 프론트엔드 공용 설정 겸용).
- **isolatedModules: `true`**: 파일 단위 트랜스파일 보장(ESM 호환).
- **noUncheckedSideEffectImports: `true`**: 타입 전용 import 안전성 강화.
- **moduleDetection: `force`**: ES 모듈 감지 강제(명시적 import/export 필요).
- **skipLibCheck: `true`**: d.ts 타입 검사 생략으로 빌드 속도 향상.
- **esModuleInterop/allowSyntheticDefaultImports**: CJS default import 호환.
- **sourceMap/declaration/declarationMap: `true`**: 디버깅/라이브러리 배포에 유용한 산출물 생성.
- **paths/baseUrl**: `@/* → src/*` 경로 별칭 제공.

## Jest 설정(jest.config.js)
- **preset: `ts-jest`**: TypeScript 테스트 실행을 위해 ts-jest 사용.
- **testEnvironment: `node`**: Node 환경에서 테스트 실행.
- **roots**: `<rootDir>/src` 하위만 테스트 대상으로 지정.
- **testMatch**: `**/__tests__/**/*.ts`, `**/*.(spec|test).ts` 패턴.
- **collectCoverageFrom**: `src/**/*.ts`(`.d.ts` 제외)에서 커버리지 수집.
- **transform**: `^.+\.ts$` 파일을 `ts-jest`로 변환.
  - `useESM: true`: Jest가 ESM로 테스트 수행.
  - `tsconfig` 오버라이드: `module/target esnext`, `moduleResolution node` 등.
- **moduleNameMapper**: `^@/(.*)$ → <rootDir>/src/$1` 경로 별칭 매핑.
- **extensionsToTreatAsEsm: ['.ts']**: `.ts`를 ESM으로 처리.

## 테스트 실행
```bash
npm test
```

테스트 변경사항을 감지하며 재실행하려면:
```bash
npm run test:watch
```

커버리지 보고서를 보려면:
```bash
npm run test:coverage
```

## 폴더 구조(권장)
```
src/
  __tests__/
    sum.test.ts
  sum.ts
jest.config.js
tsconfig.json
package.json
```

## ESM/경로 별칭 주의사항 & 트러블슈팅
- **ESM 관련 에러(예: "Cannot use import statement outside a module")**
  - `package.json`에 `"type": "module"`이 존재해야 하며, Jest 설정에서 `useESM: true`와 `extensionsToTreatAsEsm`이 설정되어 있어야 합니다.
- **경로 별칭(@/...) 관련 에러**
  - Jest에서는 `moduleNameMapper`가 별칭을 처리합니다.
  - 런타임(Node 직접 실행)에서 별칭을 쓰려면 번들러 또는 `tsconfig-paths` 등록이 추가로 필요합니다(테스트만 진행 시 Jest 설정만으로 충분).
- **macOS에서 경로 구분자**
  - `node ./src/sum.js`처럼 `/`를 사용하세요. `\`는 이스케이프 문자입니다.

## 참고
- TypeScript: https://www.typescriptlang.org/
- Jest: https://jestjs.io/
- ts-jest: https://kulshekhar.github.io/ts-jest/