import { Component, OnInit, AfterContentInit } from '@angular/core';
// leaflet
declare let L: any;
// layer
const MAP_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// map
let map: any;
// marker
let marker: any;

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
  }

  onLocationFound(e: any) {
    marker = L.marker(e.latlng, {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        popupAnchor: [0, -40],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      })
    }).addTo(map);
    L.circle(e.latlng, e.accuracy).addTo(map);
  }

  onLocationClick() {
    marker.bindPopup(`<b>${'name'}</b><br>Phone number: ${'123'}`).openPopup();

  }

  onLocationError(e: any) {
    alert(e.message);
  }

  ngAfterContentInit() {
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', this.onLocationFound);
    map.on('locationerror', this.onLocationError);
    map.on('click', this.onLocationClick);
  }

}
