import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../../styles/theme';
import { SocketContext } from '../../../contexts/socket.context';

const OpponentScore = () => {
    const socket = useContext(SocketContext);
    const [opponentScore, setOpponentScore] = useState(0);
  
    useEffect(() => {
      socket.on("game.scores.update", (scores) => {
        setOpponentScore(scores['player:2']);
      });

      socket.on("game.end", (data) => {
        setOpponentScore(data.scores['player:2']);
      });
    }, []);

    return (
      <View style={styles.opponentScoreContainer}>
        <Text style={styles.scoreText}>Score: {opponentScore}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    opponentScoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.md,
        opacity: 0.9,
    },
    scoreText: {
        ...typography.h4,
        color: colors.text.secondary,
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default OpponentScore;