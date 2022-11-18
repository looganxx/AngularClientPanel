import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

import { Client } from "src/app/models/Client"; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})


export class ClientsComponent implements OnInit {

  clients: Client[];
  totalOwed: number;
  isUserAuthorized: boolean = false;

  constructor(private clientService: ClientService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.getInfoAboutCurrentUser() !== null){
      this.isUserAuthorized = true;
      this.clientService.getClients().subscribe( clients => {
        this.clients = clients;
        this.totalOwed = this.getTotalOwed();
      });
    }    
  }

  getTotalOwed() : number {
    const total = this.clients.reduce( (total, c /* itearor */) => {
      if(c.balance === undefined){
        return total;
      }
      else
      {
        return total + parseFloat(c.balance.toString());
      }
    }, 0 );
    return total;
  }
}
