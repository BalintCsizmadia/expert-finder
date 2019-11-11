import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private authService: AuthService) {}

  isValidUser() {
    const user = this.authService.getCurrentUser();
    return +user.id !== 0 ? true : false;
  }

}
