import React from 'react';
import { ImageBackground, StyleSheet, Platform } from 'react-native';

// Image de fond par défaut (à remplacer par votre image)
const defaultBackgroundImage = require('../../assets/background.jpg');

export const BackgroundImage = ({ children, source = defaultBackgroundImage }) => {
  // Gérer différemment l'importation de l'image pour le web
  const imageSource = Platform.select({
    web: { uri: defaultBackgroundImage },
    default: defaultBackgroundImage
  });

  return (
    <ImageBackground
      source={imageSource}
      style={styles.background}
      resizeMode="cover"
      imageStyle={styles.imageStyle}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    opacity: 0.8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  }
});