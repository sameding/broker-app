import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  initialState as ClientState, MODULE_NAME as CLIENT_MODULE, ClientEffects
} from '_@core/client';
import {
  initialState as BrokerState, MODULE_NAME as BROKER_MODULE, BrokerEffects
} from '_@core/broker';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store<any>;
  const initialState = {
    [CLIENT_MODULE]: ClientState,
    [BROKER_MODULE]: BrokerState,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ HomeComponent ],
      providers: [
        ClientEffects,
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
