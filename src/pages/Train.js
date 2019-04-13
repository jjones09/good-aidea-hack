import React from 'react';

import Webcam from 'react-webcam';
// import * as mobilenet from '@tensorflow-models/mobilenet';

import classifier from '../classifier';


const Train = () => {

    const trainLetter = () => {
        classifier.addExample(document.getElementsByClassName('CamFeed')[0],
        document.getElementById('TestLetter').value)
    }

    return <div>
        <Webcam
            className='CamFeed'
            audio={false}
            height={500}
            screenshotFormat="image/jpeg"
            width={500} />
        <textarea id='TestLetter'></textarea>
        <button onClick={trainLetter}>Classify</button>
    </div>;
}

export default Train;