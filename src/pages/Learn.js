import React from 'react';

import Webcam from 'react-webcam';
import * as mobilenet from '@tensorflow-models/mobilenet';

const Learn = () => {
    let net;

    const classifyFeed = async () => {
        console.log('classifying...');
        net = await mobilenet.load();

        const imgEl = document.getElementsByClassName('CamFeed')[0];
        console.log (imgEl);
        const result = await net.classify(imgEl);
        console.log(result);
    }

    return <div>
        <Webcam
            className='CamFeed'
            audio={false}
            height={500}
            screenshotFormat="image/jpeg"
            width={500} />
        <button onClick={classifyFeed}>Classify</button>
    </div>;
}

export default Learn;