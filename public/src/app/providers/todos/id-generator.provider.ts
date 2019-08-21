import { InjectionToken } from '@angular/core';

let NB_INSTANCES = 0;

export const UNIQUE_ID = new InjectionToken<string>("UNIQUE_ID");

export const UNIQUE_ID_PROVIDER = {
    provide: UNIQUE_ID,
    useFactory: () => "my-unique-id-" + (NB_INSTANCES++)
};
