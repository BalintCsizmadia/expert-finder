import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Map, tileLayer, marker, icon, LatLngExpression, Marker, LocationEvent, LatLng } from 'leaflet';
import { UserService } from 'src/app/services/user.service';
import { Position, LoggedInUser } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Status } from 'src/app/models/enums';


// layer
const MAP_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COORDINATES_OF_BUDAPEST: LatLngExpression = [47.498, 19.03];
const DEFAULT_ZOOM_LEVEL = 13;

// map
let map: Map;
// storage for markers
const markers: Marker[] = [];

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterContentInit {

  // auth user
  customer: LoggedInUser;
  // text after position marker clicked
  markerText: string;
  // buttons
  availableButtonColor = 'primary';
  notAvailableButtonColor = 'primary';
  // date when current customer will be available
  selectedDate = this.dateFormatter(new Date());
  // NodeJS.Timer
  timer: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(loggedInUser => {
      this.customer = loggedInUser;
      this.setButtonColor(this.customer.status);
      if (this.customer.availableFrom) {
        console.log('if customer availablefrom -> ' + this.customer.availableFrom);
        this.selectedDate = this.dateFormatter(new Date(this.customer.availableFrom));
        this.handleCountDownTimer(this.customer.availableFrom);
      }
    });
    // set text in marker after click
    this.addCustomerMarkerText();
    // update 'position' in the DB every time when it changes
    this.updateLocation();
    // currently the map's starting postion points to Budapest, Hungary
    map = new Map('map_expert').setView(COORDINATES_OF_BUDAPEST, DEFAULT_ZOOM_LEVEL);
    tileLayer(MAP_TILE_LAYER, {
      attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
      minZoom: 1,
      maxZoom: 19
    }).addTo(map);
    // watch:
    // If true, starts continuous watching of location changes (instead of detecting it once)
    // using W3C watchPosition method. You can later stop watching using map.stopLocate() method.
    map.locate({ setView: false, maxZoom: 16, timeout: 10000, watch: true, enableHighAccuracy: true });
    map.on('locationfound', this.onLocationFound);
    map.on('locationerror', this.onLocationError);
  }

  private addCustomerMarkerText() {
    this.translateService.get('marker.hereyouare').subscribe(
      (markerText: string) => {
        this.markerText = markerText;
      }
    );
  }

  updateLocation = () => {
    // TODO refactor / rethink
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const userPosition: Position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date()
        };
        if (this.customer && userPosition) {
          this.userService.updateCustomerPosition(this.customer.id, JSON.stringify(userPosition)).subscribe(() => {
            console.log('position updated');
          });
        }
      }, (err: PositionError) => {
        console.error(err);
      });
    }
  }

  // TODO FIX
  relocate = () => {
    this.userService.getCustomerByUserId(this.customer.user.id).subscribe(cstmr => {
      if (cstmr.position && typeof cstmr.position === 'string') {
        const pos: Position = JSON.parse(cstmr.position);
        map.flyTo(new LatLng(pos.latitude, pos.longitude), 16);
      }
    });
  //   console.log('hellO');
  //   if (navigator.geolocation) {
  //   console.log('van geo');
  //   navigator.geolocation.getCurrentPosition(position => {
  //     console.log('juhe');
  //     map.flyTo(new LatLng(position.coords.latitude, position.coords.longitude));
  //   });
  // }
  }

  onLocationFound = (location: LocationEvent) => {
    if (markers.length > 0) {
      map.removeLayer(markers.pop());
    }
    // position icon
    const customerMarker = marker(location.latlng, {
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
        this.onLocationClick(customerMarker, location.latlng.lat, location.latlng.lng);
      });
    markers.push(customerMarker);
    // TODO use it or not?
    // L.circle(locationEvent.latlng, locationEvent.accuracy, { opacity: 0.4, fillOpacity: 0.1 }).addTo(map);
  }

  onLocationClick = (customerMarker: Marker, latitude: number, longitude: number) => {
    if (customerMarker) {
      customerMarker.off('click');
      // zoom
      customerMarker.on('click', () => {
        // latitude, longitude, zoomLevel
        map.setView([latitude, longitude], 17);
      });
      customerMarker
        .bindPopup(
          `<b>${this.customer.firstName + ' ' + this.customer.lastName}</b>
          <br>${this.markerText}`)
        .openPopup();
    }
  }

  onLocationError = (e: any) => {
    alert(e.message);
    map.on('locationfound', this.onLocationFound);
  }


  onStatusChange = (customerId: number, status: number) => {
    if (status === Status.AVAILABLE) {
      clearInterval(this.timer);
    }
    if (status === Status.NOT_AVAILABLE) {
      this.displayDateSelector();
    }
    this.userService.updateCustomerStatus(customerId, status).subscribe((res) => {
      console.log('Status updated. status: ' + res);
      this.setButtonColor(status);
    }, (error: any) => {
      console.error(error);
    });
  }

  displayDateSelector() {
    const selector = document.getElementById('date-selector');
    selector.click();
  }

  setButtonColor = (status: number) => {
    console.log('status: ' + status);
    switch (status) {
      case 0:
        this.availableButtonColor = 'success';
        this.notAvailableButtonColor = 'primary';
        break;
      case 1:
        this.availableButtonColor = 'primary';
        this.notAvailableButtonColor = 'danger';
        break;
    }
  }

  onDateChange = (customerId: number, dateStr: any) => {
    const date = new Date(dateStr);
    this.userService.updateCustomerAvailableDate(customerId, date).subscribe(res => {
      console.log('date updated. status: ' + date);
      this.handleCountDownTimer(date.getTime());
    }, (error: any) => {
      console.error(error);
    });
  }

  // number in milliseconds
  handleCountDownTimer = (availableFromDate: number) => {
    // if user sets timer multiple times then first the timer will be cleard
    clearInterval(this.timer);

    this.timer = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = availableFromDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      console.log(minutes + ':' + seconds);

      // Display the result in the element with id="demo"
      // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      // + minutes + "m " + seconds + "s ";

      // If the count down is finished, change back button's color and the value in db
      if (distance <= 0) {
        clearInterval(this.timer);
        this.setButtonColor(Status.AVAILABLE);
        this.userService.updateCustomerStatus(this.customer.id, Status.AVAILABLE).subscribe(() => {
        });
      }
    }, 1000);
  }

  // Should I use these calls here?
  ngAfterContentInit() {
    //   map.locate({ setView: true, maxZoom: 16, timeout: 10000, watch: true });
    //   map.on('locationfound', this.onLocationFound);
    //   map.on('locationerror', this.onLocationError);
  }

  dateFormatter(moment: Date) {
    return new Date(moment).toISOString();
  }
}
