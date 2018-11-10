import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { CitiesAppRoot } from './view/CitiesAppRoot/CitiesAppRoot';

export interface IAppConfig {
    apiURL: string;
}

export class CitiesApp {
    constructor(targetElement: HTMLElement, config: IAppConfig) {
        ReactDOM.render(<CitiesAppRoot />, targetElement);
    }
}
