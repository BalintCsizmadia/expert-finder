import { Component, OnInit, AfterContentInit } from '@angular/core';
// leaflet
declare let L: any;
// layer
const MAP_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// map
let map: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit() {
    map = L.map('map').setView([47.498, 19.03], 13);

    L.tileLayer(MAP_TILE_LAYER, {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // watch:
    // If true, starts continuous watching of location changes (instead of detecting it once)
    // using W3C watchPosition method. You can later stop watching using map.stopLocate() method.
    map.locate({ setView: true, maxZoom: 16, timeout: 10000, watch: true });
    map.on('locationfound', this.onLocationFound);
    map.on('locationerror', this.onLocationError);
  }

  onLocationFound = (locationEvent: any) => {
    const marker = L.marker(locationEvent.latlng, {
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
        this.onLocationClick(marker, locationEvent);
      });
    L.circle(locationEvent.latlng, locationEvent.accuracy, { opacity: 0.4, fillOpacity: 0.1 }).addTo(map);
  }

  onLocationClick(marker: any, locationEvent: any) {
    if (marker) {
      marker.off('click');
      // zoom
      marker.on('click', () => {
        // latitude, longitude, zoomLevel
        map.setView([locationEvent.latlng.lat, locationEvent.latlng.lng], 17);
      });
      marker
        .bindPopup(`<b>${'name'}</b><br>Phone number: ${'123'}`)
        .openPopup();
    }
  }

  onLocationError(e: any) {
    alert(e.message);
  }

  onLocationZoom(latitude: number, longitude: number, zoomLevel: number) {
    // implement
  }

  // Should I use these calls here?
  ngAfterContentInit() {
    //   map.locate({ setView: true, maxZoom: 16, timeout: 10000, watch: true });
    //   map.on('locationfound', this.onLocationFound);
    //   map.on('locationerror', this.onLocationError);
  }

}
