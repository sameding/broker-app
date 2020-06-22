import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BROKER_ACTIONS, BROKER_SELECTORS } from '_@core/broker';
import { Broker } from '_@api/broker';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signForm = new FormGroup({
    fname: new FormControl(null, [Validators.required]),
    lname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    private store: Store<any>
  ){ }

  ngOnInit(): void {
  }

  resetValues(){
    this.signForm.reset();
    this.signForm.setValue({
      fname:null,
      lname:null,
      email: null,
      password: null,
    });
  }

  createBroker() {
    const { fname, lname, email, password } = this.signForm.value;
    const newBroker: Broker = {
      fname,
      lname,
      email,
      password
    }

    this.store.dispatch(new BROKER_ACTIONS.CreateOneBroker(newBroker));
    this.store.select(BROKER_SELECTORS.status).pipe(
      filter(status => !status.fetching),
      first()
    ).subscribe(status => {
      if (!status.failed) {
        this.resetValues();
        setTimeout(() => { this.router.navigate(['/'])}, 2000);
      }  else if(status.failed) {
        alert('Account Creation Failed. Try again');
      }
    })
  }

}
