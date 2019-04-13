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

const toDatasetObject = async dataset => {
    const result = await Promise.all(
      Object.keys(dataset).map(async key => {
        const data = await dataset[key].data();
  
        return {
          classId: parseInt(key),
          data: Array.from(data),
          shape: dataset[key].shape
        };
    }));
    console.log(result);
    return result;
  };

const fromDatasetObject = datasetObject => {
    console.log(datasetObject)
    return Object.keys(datasetObject).map((key) => {
        console.log(datasetObject[key]);
        return tf.tensor2d(datasetObject[key].strides, datasetObject[key].shape);
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

const outputClassifier = () => {
    return toDatasetObject(classifier.getClassifierDataset());
}

const reloadClassifier = () => {
    // console.log(classifier);
    classifier.setClassifierDataset(fromDatasetObject(classifierDataset));
}

setupNetwork();
// reloadClassifier();

export default { addExample, predict, outputClassifier, reloadClassifier };