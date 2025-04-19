
// 날짜 삽입 코드
let today = new Date();
let hours = ('0' + today.getHours()).slice(-2);
let minutes = ('0' + today.getMinutes()).slice(-2);
let seconds = ('0' + today.getSeconds()).slice(-2);
let timeString = hours + ':' + minutes + ':' + seconds;
let date = today.toLocaleDateString();

export {timeString, date};

