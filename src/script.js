import converter from './convertXY.js';

function getLocation() {
  let lon;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude.toFixed(2);
      lat = position.coords.latitude.toFixed(2);
      converter.toXY(lon, lat);
    });
  }
}
