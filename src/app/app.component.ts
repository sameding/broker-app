import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';


import { BROKER_ACTIONS, BROKER_SELECTORS } from '_@core/broker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  title = 'broker-app';

  constructor(
    private store: Store<any>
  ){
    this.subscription.add(
      this.store.select(BROKER_SELECTORS.items).subscribe(items => {
          if(items.length === 0 && !!localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));
            this.store.dispatch(new BROKER_ACTIONS.SaveOneBroker(user))
          }
      })
    );
  }

  ngOnInit() {

  }
}
