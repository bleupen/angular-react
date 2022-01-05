import React, { useState } from 'react';

export default () => {
    const [ name, setName ] = useState();

    return (
        <div>
            <input type="text" onChange={e => setName(e.target.value)}/>
            <ng-foo name={name}/>
            <div>{name}</div>
        </div>
    );
}