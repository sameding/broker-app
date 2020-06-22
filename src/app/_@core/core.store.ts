import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MODULE_NAME as CLIENT_MODULE_NAME, ClientEffects, ClientReducers } from './client';
import { MODULE_NAME as BROKER_MODULE_NAME, BrokerEffects, BrokerReducers } from './broker';

@NgModule({
    imports: [
        StoreModule.forRoot({
          [BROKER_MODULE_NAME]: BrokerReducers,
          [CLIENT_MODULE_NAME]: ClientReducers
        }),
        EffectsModule.forRoot([
          BrokerEffects,
          ClientEffects
        ])
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class CoreStoreModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreStoreModule,
            providers: []
        };
    }

}
