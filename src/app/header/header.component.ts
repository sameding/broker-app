import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { BROKER_ACTIONS, BROKER_SELECTORS } from '_@core/broker';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.store.dispatch(new BROKER_ACTIONS.LogOutBroker());
    this.store.select(BROKER_SELECTORS.status).pipe(
      filter(status => !status.fetching),
        first()
    ).subscribe(status => {
        if (!status.failed) {
          this.router.navigate(['/login']);
        }
    })
  }
}
