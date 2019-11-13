import { Component, OnInit } from '@angular/core';
import { Map, tileLayer, marker, icon, LatLngExpression, Marker, LocationEvent, LatLng } from 'leaflet';
import { Position, LoggedInUser } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Status } from 'src/app/models/enums';
import { CustomerService } from 'src/app/services/customer.service';


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
export class Tab2Page implements OnInit {

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
    private customerService: CustomerService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    // TODO: getAuth function (without params) works properly in browser but something is wrong with it on device
    // this.authService.getAuth().subscribe(loggedInUser => {
    const user = this.authService.getCurrentUser();
    this.customerService.getCustomerByUserId(+user.id).subscribe(loggedInUser => {
      this.customer = loggedInUser;
      // update 'position' in the DB every time when it changes
      this.updateLocation(this.customer);
      this.setButtonColor(this.customer.status);
      // set text in marker after click
      this.addCustomerMarkerText();
      if (this.customer.availableFrom) {
        this.selectedDate = this.dateFormatter(new Date(this.customer.availableFrom));
        this.handleCountDownTimer(this.customer.availableFrom);
      }
    });
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

  private updateLocation = (customer: LoggedInUser) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const userPosition: Position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date()
        };
        if (customer && userPosition) {
          this.customerService.updateCustomerPosition(
            customer.id, JSON.stringify(userPosition)).subscribe(
              () => {
                console.log('position updated');
              });
        }
      }, (err: PositionError) => {
        console.error(err);
      });
    }
  }

  private addCustomerMarkerText() {
    this.translateService.get('marker.hereyouare').subscribe(
      (markerText: string) => {
        this.markerText = markerText;
      }
    );
  }

  relocate = () => {
    this.customerService.getCustomerByUserId(this.customer.user.id).subscribe({
      next: (cstmr: any) => {
        if (cstmr.position && typeof cstmr.position === 'string') {
          const pos: Position = JSON.parse(cstmr.position);
          map.flyTo(new LatLng(pos.latitude, pos.longitude), 16);
        }
      }, error: (err: Error) => {
        console.error(err.message);
      }
    });
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
    console.log(status);
    if (status === Status.AVAILABLE) {
      clearInterval(this.timer);
    }
    if (status === Status.NOT_AVAILABLE) {
      this.displayDateSelector();
    }
    this.customerService.updateCustomerStatus(customerId, status).subscribe({
      next: (res: any) => {
        console.log('Status updated');
        this.setButtonColor(status);
      }, error: (err: Error) => {
        console.error(err.message);
      }
    });
  }

  private displayDateSelector() {
    const selector = document.getElementById('date-selector');
    selector.click();
  }

  private setButtonColor = (status: number) => {
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
    this.customerService.updateCustomerAvailableDate(customerId, date).subscribe({
      next: () => {
        console.log('date updated: ' + date);
        this.handleCountDownTimer(date.getTime());
      }, error: (err: Error) => {
        console.error(err.message);
      }
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
        this.customerService.updateCustomerStatus(this.customer.id, Status.AVAILABLE).subscribe(() => {
          console.log('status updated');
        });
      }
    }, 1000);
  }

  private dateFormatter(moment: Date) {
    return new Date(moment).toISOString();
  }
}
