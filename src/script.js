import converter from './convertXY.js';
const $ = document.querySelector.bind(document);
//########TIMER
let Target_date = document.querySelector('.date');
let Target = document.querySelector('.time');
let Target_apm = document.querySelector('.apm');

let time = new Date();
let hours = time.getHours();
let minutes = time.getMinutes();
let year = time.getFullYear();
let month = time.getMonth() + 1;
let date = time.getDate();
//base_date, base_time for query
console.log(typeof date);

console.log(hours);
let curHour = `${
  hours >= 10 && minutes >= 40 ? hours : hours === '00' ? hours : hours - 1
}${minutes < 40 ? '00' : minutes}`;
console.log(curHour);
let cur = `${year}${month >= 10 ? month : '0' + month}${
  date >= 10 && Number(curHour) > 40
    ? date
    : date < 10 && Number(curHour) > 40
    ? '0' + date
    : date < 10 && Number(curHour) > 40 && date !== 1
    ? date - 1
    : date
}`;
// month......
function clock() {
  let current = new Date();
  let clockhours = current.getHours();
  let day = current.getDay();
  let clockminutes = current.getMinutes();
  let week = ['일', '월', '화', '수', '목', '금', '토'];
  let seconds = current.getSeconds();
  let ampm = 'AM';
  if (clockhours > 12) {
    ampm = 'PM';
    clockhours %= 12;
  }

  Target_date.innerText = `${month}월 ${date}일 ${week[day]}요일`;

  Target.innerText = `${clockhours < 10 ? `0${clockhours}` : clockhours}:${
    clockminutes < 10 ? `0${clockminutes}` : clockminutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  Target_apm.innerText = `${ampm}`;
}
clock();
setInterval(clock, 1000);
//Web API = geolocation(lat, lon) => Convert to xy position => fetch FORECAST API

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    let lon = position.coords.longitude.toFixed(2);
    let lat = position.coords.latitude.toFixed(2);
    let xy = converter.toXY(lat, lon);
    const wrap = async () => {
      try {
        const res = await fetch(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=vvpTO1TiQTn8PogQ5TxNuHFsBs3r%2FxEFN8JzGe%2BaiQmURQPWznWyY9vzW1D21L%2BABtV2%2FL9ranr%2F0KzB4u8f2g%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${cur}&base_time=${curHour}&nx=${xy.x}&ny=${xy.y}`
        );
        const json = await res.json();
        //PTY[0] - 강수형태, T1H[3] - 기온
        const temp = json.response.body.items.item[3].obsrValue;
        const pty = json.response.body.items.item[0].obsrValue;
        createIcon(Number(pty));
        showTemp(Number(temp));
      } catch (err) {
        console.error(err);
      }
    };
    wrap();
  });
}

function createIcon(value) {
  const icon = document.createElement('div');
  icon.classList.add('material-symbols-outlined');
  $('.icon-container').appendChild(icon);
  switch (value) {
    case 0:
      return ($('.material-symbols-outlined').innerText = 'sunny');
    case 1:
      return ($('.material-symbols-outlined').innerText = 'rainy');
    case 2:
      return ($('.material-symbols-outlined').innerText = 'rainy snow');
    case 3:
      return ($('.material-symbols-outlined').innerText = 'weather snowy');
    case 5:
      return ($('.material-symbols-outlined').innerText = 'waterdrop');
    case 6:
      return ($('.material-symbols-outlined').innerText = 'snowing');
    case 7:
      return ($('.material-symbols-outlined').innerText = 'snowing heavy');
  }
}

function showTemp(value) {
  const celcius = document.createElement('div');
  celcius.classList.add('temperature');
  celcius.innerText = `${value}℃`;
  $('.temp-container').appendChild(celcius);
}
