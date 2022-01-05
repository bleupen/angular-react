import React from 'react';
import {AngularInjectorContext} from "angulareact";
import ModuleContext from './contexts/ModuleContext';

export default function NgModule({ injector, module, children }) {
    return (
        <AngularInjectorContext.Provider value={injector}>
            <ModuleContext.Provider value={module}>
                <>
                    {children}
                </>
            </ModuleContext.Provider>
        </AngularInjectorContext.Provider>
    );
}