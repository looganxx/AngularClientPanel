import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from "src/app/models/Client";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';



@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client | null;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if(client != null){
        this.hasBalance = (client.balance !== undefined && client.balance > 0) ?  true : false;       
      }
      this.client = client;
    })
  }


  onDeleteClient(){
    if(confirm('Are you sure?'))
    {
      if (this.client !== null){
        this.clientService.deleteClient(this.client);
        this.flashMessage.show("Client removed", {
          cssClass: 'alert-success', timeout: 4000
        });
        
        this.router.navigate(['/']);
      }
      else
      {
        this.flashMessage.show("Some errors", {
          cssClass: 'alert-dangers', timeout: 4000
        });
      }
    }
  }

  updateBalance(){
    console.log(this.client);
    this.clientService.updateClient(this.client!);
    this.flashMessage.show("Balance updated", {
      cssClass: 'alert-success', timeout: 4000
    });
  }
}
