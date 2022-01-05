import { useContext } from "react";
import {AngularInjectorContext} from "angulareact";

export default function() {
    return useContext(AngularInjectorContext);
}