// app/screens/home.screen.js

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from "react-native";
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import { BackgroundImage } from '../components/background-image/background-image.component';

export default function HomeScreen({ navigation }) {
  return (
    <BackgroundImage>
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>YAM</Text>
        <Text style={styles.subtitle}>Le jeu de dés classique</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.onlineButton]}
          onPress={() => navigation.navigate('OnlineGameScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Jouer en ligne</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.botButton]}
          onPress={() => navigation.navigate('VsBotGameScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Jouer contre le bot</Text>
        </TouchableOpacity>
      </View>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl * 2
  },
  title: {
    ...typography.h1,
    fontSize: 48,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.sm
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: spacing.md
  },
  button: {
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
    }),
  },
  onlineButton: {
    backgroundColor: colors.primary,
  },
  botButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    ...typography.h2,
    color: colors.text.light,
    textAlign: 'center'
  }
});
