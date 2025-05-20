// app/components/game-summary/game-summary.component.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameSummary = ({ winner, scores }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résumé de la partie</Text>
      
      <View style={styles.resultContainer}>
        {winner === 'draw' ? (
          <Text style={styles.drawText}>Match nul !</Text>
        ) : (
          <>
            <Text style={styles.winnerText}>
              {winner === 'player:1' ? 'Vous avez gagné !' : 'Vous avez perdu !'}
            </Text>
          </>
        )}
      </View>

      <View style={styles.scoresContainer}>
        <Text style={styles.scoreText}>Score final :</Text>
        <Text style={styles.scoreDetail}>Vous : {scores['player:1']} points</Text>
        <Text style={styles.scoreDetail}>Adversaire : {scores['player:2']} points</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  resultContainer: {
    marginBottom: 30,
  },
  winnerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2ecc71',
    textAlign: 'center',
  },
  drawText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498db',
    textAlign: 'center',
  },
  scoresContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  scoreDetail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
});

export default GameSummary;