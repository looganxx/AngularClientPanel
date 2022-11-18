import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;
  loggedInUser: string;
  showRegister: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(logged => {
      this.isLoggedIn = logged ? true : false;
      this.loggedInUser = logged?.email as string;
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration;
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 4000
    });

    // make sure we logout
    this.router.navigate(['/login']);
  }

}
