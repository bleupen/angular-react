import React from 'react';
import ReactDOM from 'react-dom';

import ReactFoo from './ReactFoo';
import ReactBar from './ReactBar';
import ComponentWithService from "./ComponentWithService";
import NgModule from "./NgModule";


const element = document.getElementById('root');
const injector = angular.bootstrap(element, ['informer']);
ReactDOM.render(
    <NgModule injector={injector} module={angular.module('informer')}>
            angular
            <ng-foo name="Brad"/>

            ng bar
            <ng-bar/>
            // ng bar

            react

            <ReactFoo/>
            <ReactBar/>
            <ComponentWithService/>
    </NgModule>
,
    element
);