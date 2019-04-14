import React, { useState } from 'react';
import Webcam from 'react-webcam';

import Button from '../../components/Button/Button';
import NameEntry from '../NameEntry/NameEntry';

import classifier from '../../classifier';

import './Learn.css';

const Learn = () => {

    const [name, setName] = useState('');
    const [learningName, setLearningName] = useState(false);
    const [letterIndex, setLetterIndex] = useState(0);

    const classifyFeed = async () => {
        const predictionObj = await classifier.predict(document.getElementsByClassName('CamFeed')[0]);
        console.log(predictionObj);
        if (predictionObj.prediction === name[letterIndex].toUpperCase() &&
            predictionObj.probability > 0.8) {
                setLetterIndex(letterIndex + 1);
        }

    }

    const startLearning = () => {
        setLearningName(true);
    }

    const getLearnButton = () => {
        if (name) {
            return <Button onClick={startLearning}>Learn My Name</Button>;
        }
    }

    const getCurrentlyLearning = () => {
        return <div className='SignHint'>
            <span className='PlainChar'>{name[letterIndex].toUpperCase()}</span>
            <span className='SignChar'>{name[letterIndex]}</span>
        </div>;
    }

    return !!name && learningName ?
    <div>
        {getCurrentlyLearning()}
        <Webcam
            className='CamFeed'
            audio={false}
            height={500}
            screenshotFormat="image/jpeg"
            width={500} />
        <Button onClick={classifyFeed}>Classify</Button>
    </div> :
    <div>
        <NameEntry name={name} onChange={setName} />
        {getLearnButton()}
    </div>;
}

export default Learn;