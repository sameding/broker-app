import { NgModule } from '@angular/core';

import { BrokerAPIModule } from './broker-api.module';



@NgModule({
    imports: [
      BrokerAPIModule.forRoot(),
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class APIModule { }
