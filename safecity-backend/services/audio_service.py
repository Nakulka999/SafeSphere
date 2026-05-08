import numpy as np
import tensorflow as tf
# pyrefly: ignore [missing-import]
import tensorflow_hub as hub
import csv
import io
import logging
from datetime import datetime

logger = logging.getLogger("AudioService")

class AudioDetector:
    def __init__(self):
        logger.info("Loading YAMNet model from TFHub...")
        self.model = hub.load('https://tfhub.dev/google/yamnet/1')
        self.class_map_path = self.model.class_map_path().numpy()
        self.class_names = self._load_class_names(self.class_map_path)
        
        # Specific classes we care about
        self.target_classes = ['Screaming', 'Crying, sobbing', 'Glass', 'Siren', 'Shout']
        self.cooldowns = {}

    def _load_class_names(self, class_map_path):
        class_names = []
        with tf.io.gfile.GFile(class_map_path) as f:
            reader = csv.DictReader(f)
            for row in reader:
                class_names.append(row['display_name'])
        return class_names

    def predict(self, waveform):
        """
        waveform: float32 numpy array of shape (N,) sampled at 16kHz
        """
        if len(waveform) < 16000: # Ensure at least 1 second
            return None

        scores, embeddings, spectrogram = self.model(waveform)
        mean_scores = np.mean(scores, axis=0)
        
        top_class_index = np.argmax(mean_scores)
        top_score = mean_scores[top_class_index]
        top_class_name = self.class_names[top_class_index]

        # Filter for our target classes
        if top_class_name in self.target_classes and top_score > 0.3:
            return {
                "event": top_class_name,
                "confidence": float(top_score),
                "timestamp": datetime.now().isoformat()
            }
        
        return None
