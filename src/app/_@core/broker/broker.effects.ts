import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ErrorResponse, Broker, BrokerLoginObject, BrokerService } from '_@api/broker';
import * as ACTIONS from './broker.actions';
import { ACTION_TYPES } from './broker.action.types';

@Injectable()
export class BrokerEffects {

    constructor(
        private actions$: Actions,
        private brokerService: BrokerService,
    ) {}

    @Effect() createBroker$ = this.actions$.pipe(
        ofType(ACTION_TYPES.CREATE_ONE_BROKER),
        map((action: ACTIONS.CreateOneBroker) => action),
        switchMap((action) => this.brokerService.createBroker(action.item).pipe(
          map((res: any) => new ACTIONS.SaveOneBroker(res)),
          catchError((err: ErrorResponse) => of( new ACTIONS.FetchFailedBroker(err)))
        ))
    );

    @Effect() loginBroker$ = this.actions$.pipe(
        ofType(ACTION_TYPES.LOG_IN_BROKER),
        map((action: ACTIONS.LoginBroker) => action),
        switchMap((action) => this.brokerService.logInBroker(action.item).pipe(
            map((res: any) => new ACTIONS.SaveOneBroker(res)),
            catchError((err: ErrorResponse) => of(new ACTIONS.FetchFailedBroker(err)))
        ))
    );
}
