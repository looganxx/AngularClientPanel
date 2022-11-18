import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';




@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client;

  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settings: SettingsService) 
    { }

  ngOnInit(): void {
    this.disableBalanceOnAdd = this.settings.getSettings().disableBalanceOnAdd;
    this.client = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      balance: 0
    }
  }

  onSubmit({value, valid}: {value: Client, valid: boolean | null}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    if (!valid) {
      // Errors
      this.flashMessage.show("Please fill out the form correctly", {cssClass: 'alert-danger', timeout: 4000});
    }
    else
    {
      // Add new client
      this.clientService.newClient(value);
      // Show message
      this.flashMessage.show("New client added", { cssClass: 'alert-success', timeout: 4000 });

      // Redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}
