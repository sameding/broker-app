import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ErrorResponse, Client, ClientList, ClientService } from '_@api/broker';
import * as ACTIONS from './client.actions';
import { ACTION_TYPES } from './client.action.types';

@Injectable()
export class ClientEffects {

    constructor(
        private actions$: Actions,
        private clientService: ClientService,
    ) {}

    @Effect() fetchManyClient$ = this.actions$.pipe(
        ofType(ACTION_TYPES.FETCH_MANY_CLIENTS),
        map((action: ACTIONS.FetchManyClients) => action),
        switchMap((action) => this.clientService.getClients(action.FirstName, action.LastName).pipe(
            map((res: any) => new ACTIONS.SaveManyClients(res.clients)),
            catchError((err: ErrorResponse) => of(new ACTIONS.FetchFailedClient(err)))
        ))
    );

    @Effect() fetchOneClient$ = this.actions$.pipe(
        ofType(ACTION_TYPES.FETCH_ONE_CLIENT),
        map((action: ACTIONS.FetchOneClient) => action),
        switchMap((action) => this.clientService.getClient(action.id).pipe(
            map((res: Client) => new ACTIONS.SaveOneClient(res)),
            catchError((err: ErrorResponse) => of(new ACTIONS.FetchFailedClient(err)))
        ))
    );

    @Effect() updateClient$ = this.actions$.pipe(
      ofType(ACTION_TYPES.UPDATE_ONE_CLIENT),
      map((action: ACTIONS.UpdateOneClient) => action),
      switchMap((action) => this.clientService.updateClient(action.item.id, action.item).pipe(
        map((res: Client) => new ACTIONS.SaveOneClient(res)),
        catchError((err: ErrorResponse) => of( new ACTIONS.FetchFailedClient(err)))
      ))
    );

    @Effect() createClient$ = this.actions$.pipe(
      ofType(ACTION_TYPES.CREATE_ONE_CLIENT),
      map((action: ACTIONS.CreateOneClient) => action),
      switchMap((action) => this.clientService.createClient(action.item).pipe(
        map((res: any) => new ACTIONS.SaveOneClient(res)),
        catchError((err: ErrorResponse) => of( new ACTIONS.FetchFailedClient(err)))
      ))
    );

    @Effect() deleteClient$ = this.actions$.pipe(
      ofType(ACTION_TYPES.DELETE_ONE_CLIENT),
      map((action: ACTIONS.DeleteOneClient) => action),
      switchMap((action) => this.clientService.deleteClient(action.id).pipe(
        map((res: any) => new ACTIONS.DeleteSaveOneClient(res)),
        catchError((err: ErrorResponse) => of( new ACTIONS.FetchFailedClient(err)))
      ))
    );
}
