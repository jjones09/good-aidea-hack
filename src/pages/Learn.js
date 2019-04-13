import React from 'react';
import Webcam from 'react-webcam';

import classifier from '../classifier';

const Learn = () => {

    const classifyFeed = async () => {
        const predictionMessage = await classifier.predict(document.getElementsByClassName('CamFeed')[0]);
        console.log(predictionMessage);
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