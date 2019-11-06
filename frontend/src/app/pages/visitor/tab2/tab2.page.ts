import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Map, tileLayer, marker, icon, LatLngExpression, Marker, LocationEvent, LatLng } from 'leaflet';
import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/app/models/customer';
import { Position, Profession } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { Status } from 'src/app/models/enums';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProfessionService } from 'src/app/services/profession.service';

// tiles:
const Original = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
const OriginalLight = tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by
   <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a>
    hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>`
});
const Wikimedia = tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
  attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
  minZoom: 1,
  maxZoom: 19
});

// layer
const MAP_TILE_LAYER = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png';
const COORDINATES_OF_BUDAPEST: LatLngExpression = [47.498, 19.05];
const DEFAULT_ZOOM_LEVEL = 12;
// map
let map: Map;
// storage for markers
const markers: Marker[] = [];
// storage for customers' markers
const customerMarkers: Marker[] = [];

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterContentInit {

  currentLocation: Position;
  professions: Profession[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private professionService: ProfessionService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    this.addCustomersToMap();
  }

  ngOnInit() {
    // auth user
    const user = this.authService.getCurrentUser();
    this.userService.getUserById(+user.id).subscribe(usr => {
      console.log(usr);
    });
    // this.authService.getAuth().subscribe(usr => {
    //   // TODO ?
    // });
    this.professionService.getAllProfessions().then((professions: Profession[]) => {
      this.professions = professions;
    });
    // currently the map's starting postion points to Budapest, Hungary
    map = new Map('map').setView(COORDINATES_OF_BUDAPEST, DEFAULT_ZOOM_LEVEL);
    tileLayer(MAP_TILE_LAYER, {
      attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
      minZoom: 1,
      maxZoom: 19
    }).addTo(map);
    // when user comes from 'tab1' - search page
    this.route.queryParams.subscribe(params => {
      const professionId = params.professionId;
      if (professionId) {
        this.addCustomersToMap();
      }
    });
    // TODO TEMP SOLUTION for getting data from db in every minutes
    setInterval(() => {
      // displays customers on map
      this.addCustomersToMap();
    }, 60000);
    // watch:
    // If true, starts continuous watching of location changes (instead of detecting it once)
    // using W3C watchPosition method. You can later stop watching using map.stopLocate() method.
    // setView:
    // if true, reset location completely if position changes (e.g. zoom again)
    map.locate({ setView: false, maxZoom: 16, timeout: 10000, watch: true });
    map.on('locationfound', this.onLocationFound);
    map.on('locationerror', this.onLocationError);
  }

  onLocationFound = (location: LocationEvent) => {
    // remove previous marker
    if (markers.length > 0) {
      map.removeLayer(markers.pop());
    }
    // position icon
    const myMarker = marker(location.latlng, {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        popupAnchor: [0, -40],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      })
    })
      .addTo(map)
      .on('click', () => {
        this.onLocationClick(myMarker, location.latlng.lat, location.latlng.lng);
      });
    markers.push(myMarker);
    // TODO use it or not?
    // L.circle(locationEvent.latlng, locationEvent.accuracy, { opacity: 0.4, fillOpacity: 0.1 }).addTo(map);
    // uses for relocation
    this.currentLocation = this.getCurrentUserPosition(location);
  }

  getCurrentUserPosition = (location: LocationEvent) => {
    return { latitude: location.latlng.lat, longitude: location.latlng.lng, timestamp: new Date() };
  }

  onLocationClick(myMarker: Marker, latitude: number, longitude: number, customer?: Customer) {
    if (myMarker) {
      myMarker.off('click');
      // zoom
      myMarker.on('click', () => {
        // latitude, longitude, zoomLevel
        map.setView([latitude, longitude], 17);
      });
      if (!customer) {
        myMarker
          .bindPopup(`<b>${'name'}</b><br>Your position`)
          .openPopup();
      } else {
        myMarker
          .bindPopup(
            `<div>
            <img id="status-img"
             src="assets/icon/${customer.status === Status.AVAILABLE ? 'online' : 'offline'}.png"
             width="10px"
             height="10px"
            ></img>
            <b> ${customer.firstName + ' ' + customer.lastName}</b>
            </div>
            <!-- ${customer.professionId} -->
            ${this.professionFilter(this.professions, customer.professionId)[0].name}
            <br>
            <p>Phone number: <span><b>${customer.phoneNumber}</b></span></p>
            ${customer.status === Status.NOT_AVAILABLE && customer.availableFrom
              ? '<p>Available from: ' + '<span>' + this.getFormattedDate(new Date(customer.availableFrom)) + '</span></p>'
              : ''
            }`)
          .openPopup();
      }
    }
  }

  private professionFilter = (professions: Profession[], professionId: number) => {
    if (professions.length > 0) {
      return professions.filter((profession: Profession) => {
        return profession.id === professionId;
      });
    }
  }

  private getFormattedDate(dt: Date) {
    return `${
      dt.getFullYear().toString().padStart(4, '0')}-${
      (dt.getMonth() + 1).toString().padStart(2, '0')}-${
      dt.getDate().toString().padStart(2, '0')} ${
      dt.getHours().toString().padStart(2, '0')}:${
      dt.getMinutes().toString().padStart(2, '0')}`;
  }

  onLocationError(e: any) {
    alert(e.message);
    map.on('locationfound', this.onLocationFound);
  }

  // TODO REFACTOR
  addCustomersToMap = () => {
    // remove previous (customer) markers
    customerMarkers.map((singleMarker: Marker) => {
      map.removeLayer(singleMarker);
    });
    this.route.queryParams.subscribe(params => {
      const professionId = params.professionId;
      if (professionId) {
        this.userService.getCustomersByProfession(professionId).subscribe((customersArray: Customer[]) => {
          customersArray.map((customer: Customer) => {
            // 'position' data member comes from the database as a string
            if (typeof customer.position === 'string') {
              const position: Position = JSON.parse(customer.position);
              // rewrite 'position' data member with its parsed value
              customer.position = position;
            }
            this.addLocationIconToMap(customer);
          });
        });
      } else {
        this.userService.getCustomers().subscribe((customersArray: Customer[]) => {
          customersArray.map((customer: Customer) => {
            // 'position' data member comes from the database as a string
            if (typeof customer.position === 'string') {
              const position: Position = JSON.parse(customer.position);
              // rewrite 'position' data member with its parsed value
              customer.position = position;
            }
            this.addLocationIconToMap(customer);
          });
        });
      }
    });
  }

  addLocationIconToMap = (customer: Customer) => {
    const customerStatus = customer.status;
    if (typeof customer.position !== 'string' && customer.position.latitude && customer.position.longitude) {
      const coordinates: LatLngExpression = [customer.position.latitude, customer.position.longitude];
      const mrkr = marker(coordinates, {
        icon: icon({
          iconSize: [31, 31],
          iconAnchor: [13, 41],
          popupAnchor: [0, -40],
          iconUrl: customerStatus === Status.AVAILABLE ? 'assets/icon/available.png' : 'assets/icon/unavailable.png',
        }),
        opacity: customerStatus === Status.AVAILABLE ? 1 : 0.8
      }).addTo(map).on('click', () => {
        this.onLocationClick(mrkr, coordinates[0], coordinates[1], customer);
      });
      // store markers
      customerMarkers.push(mrkr);
    } else {
      // TODO error handling
      console.error('"position" data is missing');
    }
  }

  onSearchInputClick() {
    this.navCtrl.navigateForward('/visitor/tabs/tab1');
  }

  relocate = (currentLocation: Position) => {
    map.flyTo(new LatLng(currentLocation.latitude, currentLocation.longitude), 16);
  }

  // Should I use these calls here?
  ngAfterContentInit() {
    //   map.locate({ setView: true, maxZoom: 16, timeout: 10000, watch: true });
    //   map.on('locationfound', this.onLocationFound);
    //   map.on('locationerror', this.onLocationError);
  }

}
