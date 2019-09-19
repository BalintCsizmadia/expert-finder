(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab1-tab1-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/tab1/tab1.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/tab1/tab1.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Map\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<div id=\"map\"></div>\n\n<!-- <ion-content>\n    <ion-card class=\"welcome-card\">\n      <img src=\"/assets/shapes.svg\" alt=\"\" />\n      <ion-card-header>\n        <ion-card-subtitle>Get Started</ion-card-subtitle>\n        <ion-card-title>Welcome to Ionic</ion-card-title>\n      </ion-card-header>\n      <ion-card-content>\n        <p>Now that your app has been created, you'll want to start building out features and components. Check out some of the resources below for next steps.</p>\n      </ion-card-content>\n    </ion-card>\n    <ion-list lines=\"none\">\n      <ion-list-header>\n        <ion-label>Resources</ion-label>\n      </ion-list-header>\n      <ion-item href=\"https://ionicframework.com/docs/\">\n        <ion-icon slot=\"start\" color=\"medium\" name=\"book\"></ion-icon>\n        <ion-label>Ionic Documentation</ion-label>\n      </ion-item>\n      <ion-item href=\"https://ionicframework.com/docs/building/scaffolding\">\n        <ion-icon slot=\"start\" color=\"medium\" name=\"build\"></ion-icon>\n        <ion-label>Scaffold Out Your App</ion-label>\n      </ion-item>\n      <ion-item href=\"https://ionicframework.com/docs/layout/structure\">\n        <ion-icon slot=\"start\" color=\"medium\" name=\"grid\"></ion-icon>\n        <ion-label>Change Your App Layout</ion-label>\n      </ion-item>\n      <ion-item href=\"https://ionicframework.com/docs/theming/basics\">\n        <ion-icon slot=\"start\" color=\"medium\" name=\"color-fill\"></ion-icon>\n        <ion-label>Theme Your App</ion-label>\n      </ion-item>\n    </ion-list>\n</ion-content> -->\n"

/***/ }),

/***/ "./src/app/tab1/tab1.module.ts":
/*!*************************************!*\
  !*** ./src/app/tab1/tab1.module.ts ***!
  \*************************************/
/*! exports provided: Tab1PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1PageModule", function() { return Tab1PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _tab1_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab1.page */ "./src/app/tab1/tab1.page.ts");







let Tab1PageModule = class Tab1PageModule {
};
Tab1PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab1_page__WEBPACK_IMPORTED_MODULE_6__["Tab1Page"] }])
        ],
        declarations: [_tab1_page__WEBPACK_IMPORTED_MODULE_6__["Tab1Page"]]
    })
], Tab1PageModule);



/***/ }),

/***/ "./src/app/tab1/tab1.page.scss":
/*!*************************************!*\
  !*** ./src/app/tab1/tab1.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".welcome-card img {\n  max-height: 35vh;\n  overflow: hidden;\n}\n\n#map {\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2JhbGludC9Eb2N1bWVudHMvRGV2ZWxvcC9UcmlhbC9leHBlcnQtZmluZGVyL3NyYy9hcHAvdGFiMS90YWIxLnBhZ2Uuc2NzcyIsInNyYy9hcHAvdGFiMS90YWIxLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7QUNDRjs7QURFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC90YWIxL3RhYjEucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndlbGNvbWUtY2FyZCBpbWcge1xuICBtYXgtaGVpZ2h0OiAzNXZoO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4jbWFwIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn0iLCIud2VsY29tZS1jYXJkIGltZyB7XG4gIG1heC1oZWlnaHQ6IDM1dmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbiNtYXAge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/tab1/tab1.page.ts":
/*!***********************************!*\
  !*** ./src/app/tab1/tab1.page.ts ***!
  \***********************************/
/*! exports provided: Tab1Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1Page", function() { return Tab1Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


// layer
const MAP_TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// map
let map;
let Tab1Page = class Tab1Page {
    constructor() {
        this.onLocationFound = (locationEvent) => {
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
        };
    }
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
    onLocationClick(marker, locationEvent) {
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
    onLocationError(e) {
        alert(e.message);
    }
    onLocationZoom(latitude, longitude, zoomLevel) {
        // implement
    }
    // Should I use these calls here?
    ngAfterContentInit() {
        //   map.locate({ setView: true, maxZoom: 16, timeout: 10000, watch: true });
        //   map.on('locationfound', this.onLocationFound);
        //   map.on('locationerror', this.onLocationError);
    }
};
Tab1Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tab1',
        template: __webpack_require__(/*! raw-loader!./tab1.page.html */ "./node_modules/raw-loader/index.js!./src/app/tab1/tab1.page.html"),
        styles: [__webpack_require__(/*! ./tab1.page.scss */ "./src/app/tab1/tab1.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], Tab1Page);



/***/ })

}]);
//# sourceMappingURL=tab1-tab1-module-es2015.js.map