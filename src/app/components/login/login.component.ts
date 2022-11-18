import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {  }

  onSubmit(){
    this.authService.login(this.email, this.password)
      .then( res => {
        this.flashMessage.show('You are logged in', {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashMessage.show(err.message, { cssClass: 'alert-danger', timeout: 4000 });
      })
  }

}
