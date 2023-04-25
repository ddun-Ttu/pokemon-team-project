// 백엔드로 데이터를 보내기 위한 실험 코드
console.log("this is main");

const test = {
  testId: "test-id",
  testPw: "test-pw",
};

console.log(test);
console.log(JSON.stringify(test));
console.log(common.API_URL);

fetch(common.API_URL + "/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(test),
});
