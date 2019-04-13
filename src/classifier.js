import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

import classifierDataset from './data/classifier';

const classifier = knnClassifier.create();
let net;

const setupNetwork = async () => {
    net = await mobilenet.load();
};

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const fromDatasetObject = datasetObject => {
    console.log(datasetObject)
    return Object.keys(datasetObject).map((key) => {
        console.log(datasetObject[key]);
        return tf.tensor2d(datasetObject[key].data, datasetObject[key].shape);
    });
}

const addExample = (cam, letterIndex) => {

    console.log('Adding example');

    const activation = net.infer(cam, 'conv_preds');

    classifier.addExample(activation, parseInt(letterIndex));
};

const predict = async (cam) => {
    const activation = net.infer(cam, 'conv_preds');

    const result = await classifier.predictClass(activation);

      return `prediction: ${alphabet[result.classIndex]}\nprobability: ${result.confidences[result.classIndex]}`;
}

const outputClassifier = async () => {
    const results = [];
    const dataset = classifier.getClassifierDataset();
    for await (const key of Object.keys(dataset)) {
        const data = await dataset[key].data();
        results.push({
            classId: parseInt(key),
            data: Array.from(data),
            shape: dataset[key].shape
        });
    }
    return results;
}

const reloadClassifier = () => {
    classifier.setClassifierDataset(fromDatasetObject(classifierDataset));
}

setupNetwork();
reloadClassifier();

export default { addExample, predict, outputClassifier, reloadClassifier };