import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default defineConfig([
  {
    ignores: ["node_modules/**", "build/**"], //무시 경로
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { react, "react-hooks": reactHooks, import: importPlugin },
    languageOptions: {
      ecmaVersion: 2023, //JS 최신 버전
      sourceType: "module", // import/export 방식으로 해석
      parserOptions: { ecmaFeatures: { jsx: true } }, //JSX 지원
      globals: globals.browser, //브라우저 전역 객체
    },
  },

  ...compat.extends("plugin:react/recommended"), //flat 호환 방식
  ...compat.extends("plugin:react-hooks/recommended"), //flat 호환 방식

  {
    rules: {
      // 기본 규칙
      "no-unused-vars": "warn", //사용하지 않은 변수가 있다면 경고 발생
      "no-undef": "warn", //정의되지 않은 변수에 대한 경고 발생
      "no-console": "warn", // console.log를 호출하는 코드에 대해 경고 발생

      // React 규칙
      "react/react-in-jsx-scope": "off", //React 17 이후 불필요
      "react/jsx-no-target-blank": ["off", { allowReferrer: true }], // <a href="..." target="_blank" rel="noreferrer"> 보안 규칙 해제
      "react/self-closing-comp": "warn", //<div></div> 대신 <div/> 권장
      "react/prop-types": "off", //0925, prop-types 불필요

      // 추가 JS 규칙
      "no-shadow": "warn", // 같은 이름 변수 재선언 경고 발생
      "prefer-const": "warn", // 재할당 없는 변수는 const 권장

      // import 정렬: 그룹 단위 정리
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "ignore",
          alphabetize: { order: "ignore" },
        },
      ],
    },
    settings: {
      react: { version: "detect" }, // 자동으로 React 버전 감지
    },
  },

  eslintConfigPrettier,
]);
