import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '_@environment';
import { Configuration } from './broker';



/** API: Generate Configuration Instance */
export function BR_CONFIG() {
    return new Configuration({
        apiKeys: {},
        basePath: environment.API_PATH,
        withCredentials: false,
    });
}

@NgModule({
    imports: [],
    declarations: [],
    exports: [],
    providers: []
})
export class BrokerAPIModule {

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: BrokerAPIModule,
            providers: [{
                provide: Configuration,
                useFactory: BR_CONFIG,
                multi: false
            }]
        };
    }

    constructor(
        @Optional() @SkipSelf() parent: BrokerAPIModule,
        @Optional() http: HttpClient
    ) {

        if(parent) {
            throw new Error('BrokerAPIModule is already loaded. Import in your base APIModule only.');
        }
        if(!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }

    }

}
