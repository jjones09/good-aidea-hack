import React, { useState } from 'react';
import Webcam from 'react-webcam';

import './dropdown.css';
import './Train.css';

import classifier from '../classifier';
import dropdownOpts from './dropdownOpts';


const Train = () => {

    const [selectedLetter, setSelectedLetter ] = useState(0);

    const trainLetter = () => {
        classifier.addExample(document.getElementsByClassName('CamFeed')[0], selectedLetter)
    }

    return <div className='TrainingPage'>

        <div className='TrainingSelector'>
            <h2>Train for letter: </h2>
            <select className='LetterSelect' onChange={(e) => setSelectedLetter(e.value)}>
                {dropdownOpts.map(opt =>
                    <option key={`dropdown-opt-${opt.value}`} value={opt.value} label={opt.label} />)}
            </select>
        </div>

        <Webcam
            className='CamFeed'
            audio={false}
            height={500}
            screenshotFormat="image/jpeg"
            width={500} />

        <button onClick={trainLetter}>Classify</button>
    </div>;
}

export default Train;