import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user = new User();

  constructor(private authService: AuthService, private navCtrl: NavController, private userService: UserService ) {}

  ngOnInit() {
    const userId = this.authService.getCurrentUser().id;
    this.userService.getUserById(+userId).subscribe({
      next: (currentUser: User) => {
        this.user = currentUser;
      }
    });
  }

  logout() {
    this.authService.deleteAuth();
    this.navCtrl.navigateBack('');
   // this.navCtrl.navigateForward('/visitor/tabs/tab1');
  }

}
