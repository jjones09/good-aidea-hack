import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { saveAs } from 'file-saver';

import Button from '../../components/Button/Button';

import './Train.css';

import classifier from '../../classifier';
import dropdownOpts from './dropdownOpts';

const Train = () => {

    const [selectedLetterIndex, setSelectedLetterIndex ] = useState(0);

    const trainLetter = () => {
        classifier.addExample(document.getElementsByClassName('CamFeed')[0], selectedLetterIndex)
    }

    const saveClassifier = () => {
        const data = JSON.stringify(classifier.outputClassifier(), null, 2);
        saveAs(new Blob([data], {type: "application/json"}), 'classifier.json');
    }

    const reloadClassifier = () => {
        classifier.reloadClassifier();
    }

    return <div className='TrainingPage'>

        <div className='TrainingSelector'>
            <h2>Train for letter: </h2>
            <select className='LetterSelect' onChange={(e) => setSelectedLetterIndex(e.target.value)}>
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

        <Button className='TrainButton' onClick={trainLetter}>Train Letter</Button>
        <div className='ClassifierAdmin'>
            <Button className='LoadButton' onClick={reloadClassifier}>Reload Classifier</Button>
            <Button className='SaveButton' onClick={saveClassifier}>Save Classifier</Button>
        </div>
    </div>;
}

export default Train;