import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  initialState as ClientState, MODULE_NAME as BROKER_MODULE, ClientEffects
} from '_@core/client';

import { ClientComponent } from './client.component';
import { RouterTestingModule } from '@angular/router/testing';



describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let store: Store<any>;
  const initialState = { [BROKER_MODULE]: ClientState };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ClientComponent ],
      providers: [
        ClientEffects,
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
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
