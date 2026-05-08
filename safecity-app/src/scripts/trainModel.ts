// To run this: npx ts-node src/scripts/trainModel.ts
// This is the complete boilerplate for training a custom TensorFlow.js model 
// on historical incident/sensor datasets for Agent 1.

import * as tf from '@tensorflow/tfjs';
// To run in Node.js, you would typically use @tensorflow/tfjs-node
// import * as tfnode from '@tensorflow/tfjs-node';
import * as fs from 'fs';

interface SensorDataRow {
  audioAmplitude: number;
  motionMagnitude: number;
  timeOfDay: number; // 0-23
  keywordDetected: number; // 0 or 1
  isIncident: number; // 0 or 1 (Label)
}

// Dummy CSV Dataset representation
const mockDataset: SensorDataRow[] = [
  { audioAmplitude: 0.1, motionMagnitude: 2.0, timeOfDay: 14, keywordDetected: 0, isIncident: 0 },
  { audioAmplitude: 0.9, motionMagnitude: 18.5, timeOfDay: 23, keywordDetected: 1, isIncident: 1 },
  { audioAmplitude: 0.85, motionMagnitude: 3.0, timeOfDay: 2, keywordDetected: 1, isIncident: 1 },
  { audioAmplitude: 0.2, motionMagnitude: 25.0, timeOfDay: 15, keywordDetected: 0, isIncident: 1 }, // Crash
  { audioAmplitude: 0.3, motionMagnitude: 1.5, timeOfDay: 9, keywordDetected: 0, isIncident: 0 },
];

async function trainModel() {
  console.log('Loading dataset...');
  
  // 1. Prepare Data
  const features: number[][] = mockDataset.map(row => [
    row.audioAmplitude,
    row.motionMagnitude,
    row.timeOfDay / 24.0, // Normalize time
    row.keywordDetected
  ]);
  
  const labels: number[] = mockDataset.map(row => row.isIncident);

  const xs = tf.tensor2d(features);
  const ys = tf.tensor2d(labels, [labels.length, 1]);

  // 2. Build Sequential Model
  const model = tf.sequential();
  
  // Input layer: 4 features
  model.add(tf.layers.dense({ units: 8, activation: 'relu', inputShape: [4] }));
  
  // Hidden layer
  model.add(tf.layers.dense({ units: 4, activation: 'relu' }));
  
  // Output layer: Binary classification (0 = Safe, 1 = Incident)
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

  // 3. Compile Model
  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  console.log('Training model...');

  // 4. Train Model
  await model.fit(xs, ys, {
    epochs: 50,
    batchSize: 2,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        if (epoch % 10 === 0) {
          console.log(`Epoch ${epoch}: loss = ${logs?.loss.toFixed(4)}, accuracy = ${logs?.acc.toFixed(4)}`);
        }
      }
    }
  });

  console.log('Training complete.');

  // 5. Test Prediction
  const testInput = tf.tensor2d([[0.88, 14.0, 23/24, 1]]); // High audio, motion, late night, keyword
  const prediction = model.predict(testInput) as tf.Tensor;
  const riskProb = prediction.dataSync()[0];
  
  console.log(`\nTest Prediction (High Risk Scenario): ${(riskProb * 100).toFixed(2)}% probability of incident.`);

  // 6. Save Model
  // In Node.js environment:
  // await model.save('file://./public/models/threat-assessment');
  // console.log('Model saved to ./public/models/threat-assessment');
}

// trainModel();
