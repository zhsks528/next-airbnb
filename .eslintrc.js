module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    qutoes: ["error", "double"], // 더블 쿼터 사용
    "@typescript-eslint/qutoes": ["error", "double"], // 더블 쿼터 사용
    "no-unused-vars": "off", // 사용 안 한 변수 경고 중복
    "@typescript-eslint/no-unused-vars": "warn", // 사용 안한 변수는 경고
    "spaced-comment": "off", // 주석을 뒤에 쓰지 말라는 경고
    "react/no-array-index-key": "off", // key 값으로 index를 사용할 수 있다.
    "comma-dangle": "off", // 마지막에 , 을 넣어주지 않는다.
    "arrow-body-style": "off", // 화살표 함수 안에 return을 사용할 수 있다.
    "react/no-unescaped-entities": "off", // 문자열 내에서 " ' > } 허용
    "react/prop-types": "off", // proptypes를 사용하지 않는다.
  },
};
