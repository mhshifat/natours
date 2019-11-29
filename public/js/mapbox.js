/* eslint-disable */
const locations = JSON.parse(document.getElementById("map").dataset.locations);

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hpZmF0IiwiYSI6ImNrM2lrcGlxZzA2aWQzbnQ1d2c3Z2EwcncifQ.K8KzM_NNtya7ICfQ3TboyQ";

let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/shifat/ck3iksz6z01s11clty9hfy5xy",
  scrollZoom: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  const el = document.createElement("div");
  el.className = "marker";

  new mapboxgl.Marker({
    element: el,
    anchor: "bottom"
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day} : ${loc.description}</p>`)
    .addTo(map);

  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
