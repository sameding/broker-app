import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  initialState as BrokerState, MODULE_NAME as BROKER_MODULE, BrokerEffects
} from '_@core/broker';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: Store<any>;
  const initialState = { [BROKER_MODULE]: BrokerState };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ SignupComponent ],
      providers: [
        BrokerEffects,
        provideMockStore({
            initialState,
        }),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
