import converter from './convertXY.js';

//Web API = geolocation(lat, lon) => Convert to xy position => fetch FORECAST API

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lon;
      let lat;
      lon = position.coords.longitude.toFixed(2);
      lat = position.coords.latitude.toFixed(2);
      let xy = converter.toXY(lat, lon);
      console.log(xy);
      const wrap = async () => {
        const res = await fetch(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=vvpTO1TiQTn8PogQ5TxNuHFsBs3r%2FxEFN8JzGe%2BaiQmURQPWznWyY9vzW1D21L%2BABtV2%2FL9ranr%2F0KzB4u8f2g%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20230417&base_time=1500&nx=${xy.x}&ny=${xy.y}`
        );
        const json = await res.json();
        console.log(json);
      };
      wrap();
    });
  }
}
getLocation();
let Target_date = document.querySelector('.date');
let Target = document.querySelector('.time');
let Target_apm = document.querySelector('.apm');
function clock() {
  let time = new Date();

  let month = time.getMonth();
  let date = time.getDate();
  let day = time.getDay();
  let week = ['일', '월', '화', '수', '목', '금', '토'];
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = 'AM';
  if (hours > 12) {
    ampm = 'PM';
    hours %= 12;
  }

  Target_date.innerText = `${month + 1}월 ${date}일 ${week[day]}요일`;

  Target.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;

  Target_apm.innerText = `${ampm}`;
}
clock();
setInterval(clock, 1000); // 1초마다 실행
