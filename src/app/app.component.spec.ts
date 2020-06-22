import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import {
  initialState as BrokerState, MODULE_NAME as BROKER_MODULE, BrokerEffects
} from '_@core/broker';

let store: Store<any>;
const initialState = { [BROKER_MODULE]: BrokerState };
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        BrokerEffects,
        provideMockStore({
            initialState,
        }),
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'broker-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('broker-app');
  });
});
