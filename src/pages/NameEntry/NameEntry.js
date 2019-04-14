import React from 'react';

import './NameEntry.css';

const NameEntry = props => {

    return <div>
        <h3 className='NamePrompt'>What is your name?</h3>
        <textarea className='NameBox' autoFocus rows={1} onChange={e => props.onChange(e.target.value)}></textarea>
        <h3 className='NameSign'>{props.name}</h3>
    </div>;
};

export default NameEntry;