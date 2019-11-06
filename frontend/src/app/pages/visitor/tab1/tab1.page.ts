import { Component, OnInit, AfterContentInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ProfessionService } from 'src/app/services/profession.service';
import { Profession } from 'src/app/models/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, AfterContentInit {

  professions: Profession[] = [];
  selectedProfession: number; // professionId

  constructor(private professionService: ProfessionService, private navCtrl: NavController) { }

  ngOnInit() {
    const searchbar = document.getElementById('search');
    searchbar.addEventListener('ionInput', this.handleSearchInputChange);
    this.professionService.getAllProfessions().then((professions: Profession[]) => {
      this.professions = professions;
    });
  }

  handleSearchInputChange = (event: any) => {
    const items = Array.from(document.getElementById('inner-product-list').children);
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      items.forEach((item: any) => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }

  radioGroupChange = (event: any) => {
    this.selectedProfession = +event.target.value;
  }

  onSearchClick = () => {
    this.navigateToMap();
  }

  navigateToMap = () => {
    const params: NavigationExtras = {
      queryParams: {
        professionId: +this.selectedProfession
      }
    };
    this.navCtrl.navigateBack('/visitor/tabs/tab2', params);
  }


  ngAfterContentInit() {
  }

}
