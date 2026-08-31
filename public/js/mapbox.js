/* eslint-disable */

/*
console.log('Hello rom the client side :D');

const locations = JSON.parse(document.getElementById('map').dataset.locations);

console.log(locations);

//* PAID
mapboxgl.accessToken =
  'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jonasschmedtmann/cjvi9q8jd04mi1cpgmg7ev3dy',
  scrollZoom: false,
  // center: [-118.113491, 34.111745],
  // zoom: 10,
  // interactive: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  //* Create maker
  const el = document.createElement('div');
  el.className = 'marker';

  //* Add maker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  //* Add popup
  new mapboxgl.Popup({ offset: 30 })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  //* Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
*/

/*
//* CHATGPT
console.log('Hello from the client side :D');

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  scrollZoom: false,
});

// ✅ Fix 1: Ensure container has height
document.getElementById('map').style.height = '600px';

const bounds = new maplibregl.LngLatBounds();

locations.forEach((loc) => {
  // ✅ Fix 2: Ensure [lng, lat] format
  const lngLat = [loc.coordinates[0], loc.coordinates[1]];

  const el = document.createElement('div');
  el.className = 'marker';

  new maplibregl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(lngLat)
    .addTo(map);

  new maplibregl.Popup({ offset: 30 })
    .setLngLat(lngLat)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  bounds.extend(lngLat);
});

// ✅ Fix 3: Wait until map is loaded before calling fitBounds
map.on('load', () => {
  console.log('Map loaded. Fitting bounds...');
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
});
*/

/*
//*WORKING
console.log('Hello from the client side :D');

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

const map = new maplibregl.Map({
  container: 'map',
  style:
    'https://api.maptiler.com/maps/streets-v2-light/style.json?key=74smMglJ38WzlurKax6F',
  scrollZoom: false,
});

// Ensure container has height
document.getElementById('map').style.height = '600px';

const bounds = new maplibregl.LngLatBounds();

locations.forEach((loc) => {
  const lngLat = [loc.coordinates[0], loc.coordinates[1]];

  const el = document.createElement('div');
  el.className = 'marker';

  new maplibregl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(lngLat)
    .addTo(map);

  new maplibregl.Popup({ offset: 30 })
    .setLngLat(lngLat)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  bounds.extend(lngLat);
});

map.on('load', () => {
  console.log('Map loaded. Fitting bounds...');
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
});
*/

//-----------------------------------------------------------------------------------------------------
// export const displayMap = (locations) => {
//   const map = new maplibregl.Map({
//     container: 'map',
//     style:
//       'https://api.maptiler.com/maps/streets-v2-light/style.json?key=74smMglJ38WzlurKax6F',
//     scrollZoom: false,
//   });

//   // Ensure container has height
//   document.getElementById('map').style.height = '600px';

//   const bounds = new maplibregl.LngLatBounds();

//   locations.forEach((loc) => {
//     const lngLat = [loc.coordinates[0], loc.coordinates[1]];

//     const el = document.createElement('div');
//     el.className = 'marker';

//     new maplibregl.Marker({
//       element: el,
//       anchor: 'bottom',
//     })
//       .setLngLat(lngLat)
//       .addTo(map);

//     new maplibregl.Popup({ offset: 30 })
//       .setLngLat(lngLat)
//       .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
//       .addTo(map);

//     bounds.extend(lngLat);
//   });

//   map.on('load', () => {
//     console.log('Map loaded. Fitting bounds...');
//     map.fitBounds(bounds, {
//       padding: {
//         top: 200,
//         bottom: 150,
//         left: 100,
//         right: 100,
//       },
//     });
//   });
// };

//--------------------------------------------------------------------------------------------------------------------
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export const displayMap = (locations) => {
  const map = new maplibregl.Map({
    container: 'map',
    style:
      'https://api.maptiler.com/maps/streets-v2-light/style.json?key=74smMglJ38WzlurKax6F',
    scrollZoom: false,
  });

  // Ensure container has height
  document.getElementById('map').style.height = '600px';

  const bounds = new maplibregl.LngLatBounds();

  locations.forEach((loc) => {
    const lngLat = [loc.coordinates[0], loc.coordinates[1]];

    const el = document.createElement('div');
    el.className = 'marker';

    new maplibregl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(lngLat)
      .addTo(map);

    new maplibregl.Popup({ offset: 30 })
      .setLngLat(lngLat)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(lngLat);
  });

  map.on('load', () => {
    console.log('Map loaded. Fitting bounds...');

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
  });
};
