import converter from './convertXY.js';

function getLocation() {
  let lon;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude.toFixed(2);
      lat = position.coords.latitude.toFixed(2);
      const xy = converter.toXY(lat, lon);
      console.log(xy);
      const wrap = async () => {
        const res = await fetch(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=vvpTO1TiQTn8PogQ5TxNuHFsBs3r%2FxEFN8JzGe%2BaiQmURQPWznWyY9vzW1D21L%2BABtV2%2FL9ranr%2F0KzB4u8f2g%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20230417&base_time=0600&nx=${xy.x}&ny=${xy.y}`
        );
        const json = await res.json();
        console.log(json);
      };
      wrap();
    });
  }
}
getLocation();
