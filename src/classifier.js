import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';

const classifier = knnClassifier.create();
let net;

const setupNetwork = async () => {
    net = await mobilenet.load();
};

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const addExample = (cam, letter) => {

    console.log('Adding example');

    const activation = net.infer(cam, 'conv_preds');

    classifier.addExample(activation, alphabet.indexOf(letter));
};

const predict = async (cam) => {
    const activation = net.infer(cam, 'conv_preds');

    const result = await classifier.predictClass(activation);

      return `prediction: ${alphabet[result.classIndex]}\nprobability: ${result.confidences[result.classIndex]}`;
}

setupNetwork();

export default { addExample, predict };