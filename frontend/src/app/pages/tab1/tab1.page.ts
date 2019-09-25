import { Component, OnInit, AfterContentInit } from '@angular/core';
// leaflet
declare let L: any;
// layer
const MAP_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COORDINATES_OF_BUDAPEST = [47.498, 19.03];
const DEFAULT_ZOOM_LEVEL = 13;
// map
let simpleMap: any;
// storage for markers
const markers: any[] = [];

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit() {
    // currently the map's starting postion points to Budapest, Hungary
    simpleMap = L.map('map_expert').setView(COORDINATES_OF_BUDAPEST, DEFAULT_ZOOM_LEVEL);

    L.tileLayer(MAP_TILE_LAYER, {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(simpleMap);
    // watch:
    // If true, starts continuous watching of location changes (instead of detecting it once)
    // using W3C watchPosition method. You can later stop watching using map.stopLocate() method.
    simpleMap.locate({ setView: true, maxZoom: 16, timeout: 10000, watch: true });
    simpleMap.on('locationfound', this.onLocationFound);
    simpleMap.on('locationerror', this.onLocationError);
  }

  onLocationFound = (locationEvent: any) => {
    if (markers.length > 0) {
      simpleMap.removeLayer(markers.pop());
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
      .addTo(simpleMap)
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
        simpleMap.setView([latitude, longitude], 17);
      });
      marker
        .bindPopup(`<b>${'name'}</b><br>Your position`)
        .openPopup();
    }
  }

  onLocationError(e: any) {
    alert(e.message);
    simpleMap.on('locationfound', this.onLocationFound);
  }


  // Should I use these calls here?
  ngAfterContentInit() {
    //   map.locate({ setView: true, maxZoom: 16, timeout: 10000, watch: true });
    //   map.on('locationfound', this.onLocationFound);
    //   map.on('locationerror', this.onLocationError);
  }

}
