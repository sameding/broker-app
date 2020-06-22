import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BROKER_SELECTORS } from '_@core/broker';
import { CLIENT_ACTIONS, CLIENT_SELECTORS} from '_@core/client'
import { Client } from '_@api/broker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();


  public state: any = {
    model: {
      broker: {},
      clients: []
    },
    tatus: {}
  };

  public form = new FormGroup({
    fname: new FormControl(null, [Validators.required]),
    lname: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    rate: new FormControl(null, [Validators.required]),
    amortization: new FormControl(null, [Validators.required])
  });

  public searchForm = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    private store: Store<any>
  ){ }

  ngOnInit(): void {
    this.subscription.add(
      this.store.select(BROKER_SELECTORS.items).pipe(
        filter(items => !!items && items.length > 0)
       ).subscribe(items => {
          if(items) {
            this.state.model.broker = items[0];
            this.fetch();
          }
      })
    ).add(
      this.store.select(CLIENT_SELECTORS.items).subscribe(items => {
        this.state.model.clients = items;
      })
    );
  }

  private fetch() {
    setTimeout(() => {this.store.dispatch(new CLIENT_ACTIONS.FetchManyClients(null, null))}, 1000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public get hasClients(): boolean {
    const { clients } = this.state.model;
    return clients.length > 0;
  }

  public resetValues() {
    this.form.reset();
    this.form.setValue({
      fname: null,
      lname: null,
      amount: null,
      rate: null,
      amortization: null
    });
}

  createClient() {
    const { fname, lname, amount, rate, amortization } = this.form.value;
    const newClient: Client = {
      fname,
      lname,
      amount,
      rate,
      amortization
    }

    this.store.dispatch(new CLIENT_ACTIONS.CreateOneClient(newClient));
    this.store.select(CLIENT_SELECTORS.status).pipe(
        filter(status => !status.fetching),
        first()
    ).subscribe(status => {
        if (!status.failed) {
            this.resetValues();
        }  else if(status.failed) {
          alert('Failed To create a new user');
        }
    })
  }

  deleteClient(id: number) {
    this.store.dispatch(new CLIENT_ACTIONS.DeleteOneClient(id));
    this.fetch()
  }

  filterResult() {
    const { first_name, last_name } = this.searchForm.value;
    this.store.dispatch(new CLIENT_ACTIONS.FetchManyClients(first_name, last_name));
  }

}
