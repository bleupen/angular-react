import React, {useState} from 'react';
import useService from "./hooks/ng/useService";
import useComponent from "./hooks/ng/useComponent";

export default () => {
    const Foo = useComponent('ng-foo');
    const hello = useService('hello');
    const [name, setName] = useState('brad');

    return (
        <div>
            <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            <div>{hello(name)}</div>
            foo:
            <Foo name={name}/>
        </div>
    );
}