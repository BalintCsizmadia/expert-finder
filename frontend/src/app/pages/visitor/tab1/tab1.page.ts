import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterContentInit {

  constructor(private navCtrl: NavController) {
    console.log('costrukt');
   }

  ngOnInit() {
    const searchbar = document.getElementById('search');
    searchbar.addEventListener('ionInput', this.handleSearchInputChange);
    console.log(this.navCtrl);
  }

  handleSearchInputChange = (event: any) => {
    // TODO implement well
    const items = Array.from(document.querySelector('ion-list').children);
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      items.forEach((item: any) => {
        console.log(item.children);
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });

    // console.log(event.target.value);
    if (event.target.value === 'map') {
      this.navigateToMap();
    }
  }

  navigateToMap = () => {
    this.navCtrl.navigateForward('/visitor/tabs/tab2');
  }


  ngAfterContentInit() {
  }

}
