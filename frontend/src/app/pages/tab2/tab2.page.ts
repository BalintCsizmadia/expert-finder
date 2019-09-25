import { Component, OnInit, AfterContentInit } from '@angular/core';
// leaflet
declare let L: any;
// layer
const MAP_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COORDINATES_OF_BUDAPEST = [47.498, 19.03];
const DEFAULT_ZOOM_LEVEL = 13;
// map
let map: any;
// storage for markers
const markers: any[] = [];

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit() {
    // currently the map's starting postion points to Budapest, Hungary
    map = L.map('map').setView(COORDINATES_OF_BUDAPEST, DEFAULT_ZOOM_LEVEL);

    L.tileLayer(MAP_TILE_LAYER, {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // -------------------------
    const geojsonFeature = {
      type: 'Feature',
      properties: {
        name: 'Coors Field',
        amenity: 'Baseball Stadium',
        popupContent: 'This is where the Rockies play!'
      },
      geometry: {
        type: 'Point',
        coordinates: [47.498, 19.03]
      }
    };
    // TODO Where is the icon?
    // L.geoJSON(geojsonFeature).addTo(map);
    // ------------------------
    this.addLocationIconToMap([47.498, 19.03]);
    this.addLocationIconToMap([47.493, 19.088]);
    // watch:
    // If true, starts continuous watching of location changes (instead of detecting it once)
    // using W3C watchPosition method. You can later stop watching using map.stopLocate() method.
    map.locate({ setView: true, maxZoom: 16, timeout: 10000, watch: true });
    map.on('locationfound', this.onLocationFound);
    map.on('locationerror', this.onLocationError);
  }

  onLocationFound = (locationEvent: any) => {
    // TODO test it
    if (markers.length > 0) {
      map.removeLayer(markers.pop());
    }
    // position icon
    const marker = L.marker(locationEvent.latlng, {
      name: 'actualPosition',
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        popupAnchor: [0, -40],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      })
    })
      .addTo(map)
      .on('click', () => {
        this.onLocationClick(marker, locationEvent.latlng.lat, locationEvent.latlng.lng, true);
      });
    markers.push(marker);
    // TODO use it or not?
    // L.circle(locationEvent.latlng, locationEvent.accuracy, { opacity: 0.4, fillOpacity: 0.1 }).addTo(map);
  }

  onLocationClick(marker: any, latitude: number, longitude: number, isUser?: boolean) {
    if (marker) {
      marker.off('click');
      // zoom
      marker.on('click', () => {
        // latitude, longitude, zoomLevel
        map.setView([latitude, longitude], 17);
      });
      if (isUser) {
        marker
          .bindPopup(`<b>${'name'}</b><br>Your position`)
          .openPopup();
      } else {
        marker
          .bindPopup(`<b>${'name'}</b><br>Phone number: ${'123'}`)
          .openPopup();
      }
    }
  }

  onLocationError(e: any) {
    alert(e.message);
    map.on('locationfound', this.onLocationFound);
  }

  addLocationIconToMap = (coordinates: number[]) => {
    const mrkr = new L.marker(coordinates, {
      icon: L.icon({
        iconSize: [31, 31],
        iconAnchor: [13, 41],
        popupAnchor: [0, -40],
        iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png'

      })
    }).addTo(map).on('click', () => {
      this.onLocationClick(mrkr, coordinates[0], coordinates[1]);
    });

  }

  // Should I use these calls here?
  ngAfterContentInit() {
    //   map.locate({ setView: true, maxZoom: 16, timeout: 10000, watch: true });
    //   map.on('locationfound', this.onLocationFound);
    //   map.on('locationerror', this.onLocationError);
  }

}
