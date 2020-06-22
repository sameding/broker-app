import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BROKER_ACTIONS, BROKER_SELECTORS } from '_@core/broker';
import { BrokerLoginObject } from '_@api/broker';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private subscription: Subscription = new Subscription();

  public form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
      private router: Router,
      private store: Store<any>
  ) { }

  public resetValues() {
      this.form.reset();
      this.form.setValue({
        email: null,
        password: null,
      });
  }

  onSubmit() {
    const { email, password } = this.form.value;
    const loginObject: BrokerLoginObject = { email, password };
    this.store.dispatch(new BROKER_ACTIONS.LoginBroker(loginObject));
    this.store.select(BROKER_SELECTORS.status).pipe(
        filter(status => !status.fetching),
        first()
    ).subscribe(status => {
        if (!status.failed) {
            this.resetValues();
            //this.router.navigate(['/']);
            setTimeout(() => { this.router.navigate(['/'])}, 5000);
        }  else if(status.failed) {
          alert('Log In failed. try again')
        }
    })
  }
}
