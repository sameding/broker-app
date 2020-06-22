import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';

import { CLIENT_ACTIONS, CLIENT_SELECTORS} from '_@core/client'
import { Client } from '_@api/broker';
import { calculateMortgage } from '_@shared/helpers';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

  public id: number;
  public client: Client;
  private subscription: Subscription = new Subscription();
  public displayPrice = false;
  public calculatedAmount = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>
  ) {
    this.subscription.add(
      this.store.select(CLIENT_SELECTORS.items).pipe(
        filter(items => !!items && items.length > 0)
      ).subscribe(items => {
        this.client = items.find(item => item && item.id == this.id)
      })
    );
  }

  ngOnInit() {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number
        this.fetch();
     })
    );
  }

  public fetch() {
    this.store.dispatch(new CLIENT_ACTIONS.FetchManyClients())
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  calculate(){
    if(this.client) {
      const { amount, rate, amortization } = this.client;
      this.calculatedAmount =  calculateMortgage(amount, rate, amortization);
      this.displayPrice = !this.displayPrice;
    }
  }

}
