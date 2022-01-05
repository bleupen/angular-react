import ReactFoo from "../../src/ReactFoo";
import {reactToAngular} from "angulareact";

angular.module('informer')
    .component('ngBar', reactToAngular(ReactFoo));