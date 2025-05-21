// app/components/game-summary/game-summary.component.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/theme';
import Confetti from '../confetti/confetti.component';

const GameSummary = ({ winner, scores }) => {
  return (
    <View style={styles.container}>
      <Confetti active={winner === 'player:1'} />
      
      <View style={styles.card}>
        <Text style={styles.title}>Résumé de la partie</Text>
        
        <View style={styles.resultContainer}>
          {winner === 'draw' ? (
            <Text style={styles.drawText}>Match nul !</Text>
          ) : (
            <Text style={[styles.winnerText, winner === 'player:1' ? styles.winText : styles.loseText]}>
              {winner === 'player:1' ? 'Vous avez gagné !' : 'Vous avez perdu !'}
            </Text>
          )}
        </View>

        <View style={styles.scoresContainer}>
          <Text style={styles.scoreText}>Score final</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Vous</Text>
            <Text style={styles.scoreValue}>{scores['player:1']} points</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Adversaire</Text>
            <Text style={styles.scoreValue}>{scores['player:2']} points</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 400,
    ...shadows.md
  },
  title: {
    ...typography.h1,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  resultContainer: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
  },
  winnerText: {
    ...typography.h2,
    textAlign: 'center',
  },
  winText: {
    color: colors.success,
  },
  loseText: {
    color: colors.danger,
  },
  drawText: {
    ...typography.h2,
    color: colors.primary,
    textAlign: 'center',
  },
  scoresContainer: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  scoreText: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
  },
  scoreLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  scoreValue: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
});

export default GameSummary;