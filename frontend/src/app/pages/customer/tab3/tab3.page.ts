import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private authService: AuthService, private navCtrl: NavController) {}

  logout() {
    this.authService.deleteAuth();
    this.navCtrl.navigateBack('');
   // this.navCtrl.navigateForward('/visitor/tabs/tab1');

  }
}
