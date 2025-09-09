// 파일 역할: Jest 설정 파일(ts-jest 사용, ESM/TypeScript 테스트 실행 구성)
import { createDefaultPreset } from "ts-jest";
// ts-jest에서 제공하는 기본 프리셋 생성 함수를 가져옵니다.

const tsJestTransformCfg = createDefaultPreset().transform;
// 기본 프리셋의 transform 규칙을 참고용으로 변수에 담아둡니다(아래에서 재정의).

export default {
  preset: "ts-jest", // Jest가 사용할 프리셋으로 ts-jest를 지정합니다.
  testEnvironment: "node", // 테스트가 실행될 환경을 node로 지정합니다.
  roots: ["<rootDir>/src"],// 테스트 루트 디렉터리를 src로 제한합니다.
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],// 테스트 파일 패턴을 지정합니다: __tests__ 폴더와 *.test.ts/*.spec.ts 포함.
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],// 커버리지 수집 대상: .d.ts(선언 파일)은 제외합니다.
  transform: { // TypeScript 파일을 ts-jest로 변환(트랜스파일)하는 규칙입니다.
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,// ESM 모드로 동작하도록 설정합니다.
      tsconfig: {// ts-jest에 전달할 TypeScript 설정 오버라이드입니다.
        module: 'esnext',// ESNext 모듈 시스템 사용(ESM 호환).
        target: 'esnext',// 최신 JS로 컴파일 타겟 설정.
        moduleResolution: 'node',// Node 방식 모듈 해석.
        verbatimModuleSyntax: false// import/export 구문을 적절히 정규화합니다.
      }
    }]
  },
  // import 경로에서 '@/...' 별칭을 '<rootDir>/src/...'로 매핑합니다.
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  // .ts 확장자를 ESM으로 취급하여 Jest가 ESM 로더로 처리하도록 합니다.
  extensionsToTreatAsEsm: ['.ts']
};