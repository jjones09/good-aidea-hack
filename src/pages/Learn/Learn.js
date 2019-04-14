import React, {useState} from 'react';
import Webcam from 'react-webcam';
import { ToastContainer, toast } from 'react-toastify';

import Button from '../../components/Button/Button';
import NameEntry from '../NameEntry/NameEntry';

import classifier from '../../classifier';

import './Learn.css';

const Learn = () => {

    const [name, setName] = useState('');
    const [learningName, setLearningName] = useState(false);
    const [letterIndex, setLetterIndex] = useState(0);
    // const [fullNameIndex, setFullNameIndex] = useState(0);

    const classifyFeed = async () => {

        let correctSign = false;

        while (correctSign === false) {
            const predictionObj = await classifier.predict(document.getElementsByClassName('CamFeed')[0]);
            console.log(predictionObj);
            if (predictionObj.prediction === name[letterIndex].toUpperCase() &&
                predictionObj.probability > 0.8) {
                setLetterIndex(letterIndex + 1);
                correctSign = true;
                toast('Great!', {
                    type: toast.TYPE.SUCCESS,
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'SuccessToast'
                });
            }
        }
    }

    // const classifyFeedForFullName = async () => {
    //     const predictionObj = await classifier.predict(document.getElementsByClassName('CamFeed')[0]);
    //     console.log(predictionObj);
    //     if (predictionObj.prediction === name[fullNameIndex].toUpperCase() &&
    //         predictionObj.probability > 0.8) {
    //         setFullNameIndex(letterIndex + 1);
    //     }
    // }

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

    const goBack = () => {
        setLearningName(false);
        setLetterIndex(0);
        setName('');
    }

    // const buildFullName = () => {
    //     return <div>{
    //         Array.from(name).map((letter, key) => {
    //                 console.log(key);
    //                 console.log(fullNameIndex);
    //                 return <span
    //                     key={`Letter-${key}`}
    //                     className={fullNameIndex > key ? 'SignChar' : 'PlainChar'}>
    //                 {letter.toUpperCase()}
    //         </span>
    //             }
    //         )}</div>
    // }

    const getLearningContent = () => {
        return letterIndex < name.length ?
            <div>
                <ToastContainer autoClose={3000} />
                {getCurrentlyLearning()}
                <Webcam
                    className='CamFeed'
                    audio={false}
                    height={500}
                    screenshotFormat="image/jpeg"
                    width={500}/>
                <Button onClick={classifyFeed}>Classify</Button>
                <Button onClick={goBack}>Back</Button>
            </div> :
            <div>
                <h2>Good job</h2>
                <h2 className='SignChar'>{name}</h2>
            
                {/* {buildFullName()}
                <Webcam
                    className='CamFeed'
                    audio={false}
                    height={500}
                    screenshotFormat="image/jpeg"
                    width={500}/>
                <Button onClick={classifyFeedForFullName}>Classify</Button>
                <Button onClick={goBack}>Back</Button> */}
            </div>
    };

    return !!name && learningName ?
        <div>{getLearningContent()}</div> :
        <div>
            <NameEntry name={name} onChange={setName}/>
            {getLearnButton()}
        </div>;
}

export default Learn;