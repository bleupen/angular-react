import ModuleContext from '../../contexts/ModuleContext';
import {useContext} from "react";
import {angularToReact} from "angulareact";

export default function useComponent(name, callbackParameters) {
    const module = useContext(ModuleContext);
    return angularToReact(name, module, callbackParameters);
};