import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Map, tileLayer, marker, icon, Marker, LocationEvent, LatLng, LocateOptions, TileLayerOptions, circle } from 'leaflet';
import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/app/models/customer';
import { Position, Profession } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { Status } from 'src/app/models/enums';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { ProfessionService } from 'src/app/services/profession.service';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

// layer
const MAP_TILE_LAYER = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png';
const MAP_TILE_ATTRIBUTION = '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>';
const COORDINATES_OF_BUDAPEST: LatLng = new LatLng(47.498, 19.05);
const DEFAULT_ZOOM_LEVEL = 12;
// map
let map: Map;
// storage for logged in user's marker(s)
const markers: Marker[] = [];
// storage for customers' markers
const customerMarkers: Marker[] = [];

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterContentInit {

  currentUser: User;
  currentPosition: Position;
  professions: Profession[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private customerService: CustomerService,
    private professionService: ProfessionService,
    private translateService: TranslateService,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {
    // display customers on map
    this.addCustomersToMap();
  }

  ngOnInit() {
    // auth user
    const user = this.authService.getCurrentUser();
    const userId = +user.id;
    if (userId !== 0) {
      this.userService.getUserById(userId).subscribe({
        next: (usr: User) => {
          console.log(usr);
          this.currentUser = usr;
        },
        error: (err: any) => {
          console.error(err.message);
        }
      });
    } else {
      // TODO
      // if userId equals 0 then user is not a logged in user but a visitor
    }
    this.professionService.getAllProfessions().then((professions: Profession[]) => {
      this.professions = professions;
    });
    // MAP INITIALIZATION
    // currently the map's starting postion points to Budapest, Hungary
    map = new Map('map').setView(COORDINATES_OF_BUDAPEST, DEFAULT_ZOOM_LEVEL);
    const tileLayerOptions: TileLayerOptions = {
      attribution: MAP_TILE_ATTRIBUTION,
      minZoom: 1,
      maxZoom: 19
    };
    tileLayer(MAP_TILE_LAYER, tileLayerOptions)
      .addTo(map);

    const locateOptions: LocateOptions = {
      // If true, starts continuous watching of location changes (instead of detecting it once)
      watch: true,
      // if true, reset location completely if position changes (e.g. zoom again)
      setView: false,
      maxZoom: 16,
      timeout: 10000
    };
    // using W3C watchPosition method. You can later stop watching using map.stopLocate() method.
    map.locate(locateOptions);
    map.on('locationfound', this.onLocationFound);
    map.on('locationerror', this.onLocationError);

    // when user comes from 'tab1' - search page
    this.route.queryParams.subscribe(params => {
      const professionId = params.professionId;
      if (professionId) {
        this.addCustomersToMap();
      }
    });
    // TODO TEMP SOLUTION for getting data from db in every minutes
    setInterval(() => {
      this.addCustomersToMap();
    }, 60000);
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
        this.onLocationClick(myMarker, location.latlng);
      });
    markers.push(myMarker);
    // TODO use it or not?
    // circle(location.latlng, location.accuracy, { opacity: 0.4, fillOpacity: 0.1 }).addTo(map);
    // uses for relocation
    this.currentPosition = this.getCurrentUserPosition(location);
  }

  private getCurrentUserPosition = (location: LocationEvent) => {
    return { latitude: location.latlng.lat, longitude: location.latlng.lng, timestamp: new Date() };
  }

  onLocationClick(myMarker: Marker, latlng: LatLng, customer?: Customer) {
    if (myMarker) {
      myMarker.off('click');
      // zoom
      myMarker.on('click', () => {
        map.setView(latlng, 17);
      });
      if (!customer) {
        myMarker
          // .bindPopup(`<b>${'name'}</b><br>Your position`)
          .bindPopup(this.buildHTMLPopupForVisitor())
          .openPopup();
      } else {
        myMarker
          .bindPopup(this.buildHTMLPopupForCustomer(customer))
          .openPopup();
      }
    }
  }

  private buildHTMLPopupForVisitor() {
    const mainDivEl = document.createElement('div');
    const bTextEl = document.createElement('b');
    this.addTextToHTMLElement(bTextEl, 'popup.your-position');
    mainDivEl.appendChild(bTextEl);
    return mainDivEl;
  }

  private buildHTMLPopupForCustomer(customer: Customer) {
    const mainDivEl = document.createElement('div');
    const topDivEl = document.createElement('div');
    const statusImgEl = document.createElement('img');
    statusImgEl.id = 'status-img';
    statusImgEl.width = 10;
    statusImgEl.height = 10;
    statusImgEl.src = `assets/icon/${customer.status === Status.AVAILABLE ? 'online' : 'offline'}.png`;
    const nameBtextEl = document.createElement('b');
    nameBtextEl.textContent = ` ${customer.firstName + ' ' + customer.lastName}`;
    const professionPtextEl = document.createElement('p');
    professionPtextEl.style.margin = '0';
    professionPtextEl.textContent = `${this.getProfessionFromArrayById(this.professions, customer.professionId)[0].name}`;
    const phonePtextEl = document.createElement('p');
    this.addTextToHTMLElement(phonePtextEl, 'popup.phone');
    const phoneSpanEl = document.createElement('span');
    const phoneBtextEl = document.createElement('b');
    phoneBtextEl.textContent = customer.phoneNumber;
    phoneSpanEl.appendChild(phoneBtextEl);
    phonePtextEl.appendChild(phoneSpanEl);
    // topDivEl -> status icon + name + profession
    topDivEl.appendChild(statusImgEl);
    topDivEl.appendChild(nameBtextEl);
    topDivEl.appendChild(professionPtextEl);
    mainDivEl.appendChild(topDivEl);
    // mainDivEl -> phone number + avaiable from date
    mainDivEl.appendChild(phonePtextEl);
    if (customer.status === Status.NOT_AVAILABLE && customer.availableFrom) {
      const availablePtextEl = document.createElement('p');
      this.addTextToHTMLElement(availablePtextEl, 'popup.available-from');
      const availableSpanEl = document.createElement('span');
      availableSpanEl.textContent = this.getFormattedDate(new Date(customer.availableFrom));
      availablePtextEl.appendChild(availableSpanEl);
      mainDivEl.appendChild(availablePtextEl);
    }
    return mainDivEl;
  }

  /**
   *
   * @param htmlElement HTMLElement
   * @param i18nTextSource string
   * @description get text content via i18n's translateService and
   * attach to the html element
   */
  private addTextToHTMLElement(htmlElement: HTMLElement, i18nTextSource: string) {
    try {
      this.translateService.get(i18nTextSource).subscribe(
        (translatedText: string) => {
          htmlElement.textContent = translatedText;
        }
      );
    } catch (err) {
      console.error('Translation error: ' + err.message);
    }
  }

  private getProfessionFromArrayById = (professions: Profession[], professionId: number) => {
    if (professions.length > 0) {
      return professions.filter((profession: Profession) => {
        return profession.id === professionId;
      });
    }
  }

  /**
   *
   * @param dt Date
   * @description convert Date to a formatted string -> output format: yyyy-mm-dd HH:mm
   * @returns string
   */
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
    // if there is a selected profession (in search)
    // then get only customers by profession
    this.route.queryParams.subscribe({
      next: (params: Params) => {
        const professionId = params.professionId;
        if (professionId) {
          this.customerService.getCustomersByProfession(professionId).subscribe({
            next: (customersArray: Customer[]) => {
              customersArray.map((customer: Customer) => {
                // rewrite 'position' data member with its parsed value
                customer.position = this.parseCustomerPositionToJSON(customer.position);
                this.addLocationIconToMap(customer);
              });
            },
            error: (err: HttpErrorResponse) => {
              console.error(err.message);
            }
          });
        } else {
          this.customerService.getCustomers().subscribe({
            next: (customersArray: Customer[]) => {
              customersArray.map((customer: Customer) => {
                // rewrite 'position' data member with its parsed value
                customer.position = this.parseCustomerPositionToJSON(customer.position);
                this.addLocationIconToMap(customer);
              });
            },
            error: (err: HttpErrorResponse) => {
              console.error(err.message);
            }
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      },
      complete: () => {
        // complete
        console.log('Subscribe completed');
      }
    });
  }

  parseCustomerPositionToJSON(customerPosition: string | Position) {
    // 'position' data member comes from the database as a string
    if (typeof customerPosition === 'string') {
      const position: Position = JSON.parse(customerPosition);
      return position;
    }
  }

  addLocationIconToMap = (customer: Customer) => {
    const customerStatus = customer.status;
    if (typeof customer.position !== 'string' && customer.position.latitude && customer.position.longitude) {
      const latlng: LatLng = new LatLng(customer.position.latitude, customer.position.longitude);
      const mrkr = marker(latlng, {
        icon: icon({
          iconSize: [31, 31],
          iconAnchor: [13, 41],
          popupAnchor: [0, -40],
          iconUrl: customerStatus === Status.AVAILABLE ? 'assets/icon/available.png' : 'assets/icon/unavailable.png',
        }),
        opacity: customerStatus === Status.AVAILABLE ? 1 : 0.8
      })
        .addTo(map)
        .on('click', () => {
          this.onLocationClick(mrkr, latlng, customer);
        });
      // store markers
      customerMarkers.push(mrkr);
    } else {
      console.error('"position" data is missing');
    }
  }

  onSearchInputClick() {
    this.navCtrl.navigateForward('/visitor/tabs/tab1');
  }

  // TODO check on device
  relocate = (currentPosition: Position) => {
    map.flyTo(new LatLng(currentPosition.latitude, currentPosition.longitude), 16);
  }

  ngAfterContentInit() {
  }

}
