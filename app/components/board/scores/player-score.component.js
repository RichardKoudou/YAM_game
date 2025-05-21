import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SocketContext } from '../../../contexts/socket.context';
import { colors, typography, spacing, borderRadius, shadows } from '../../../styles/theme';

const PlayerScore = () => {
    const socket = useContext(SocketContext);
    const [playerScore, setPlayerScore] = useState(0);
  
    useEffect(() => {
      socket.on("game.scores.update", (scores) => {
        setPlayerScore(scores['player:1']);
      });

      socket.on("game.end", (data) => {
        setPlayerScore(data.scores['player:1']);
      });
    }, []);

    return (
      <View style={styles.playerScoreContainer}>
        <Text style={styles.scoreText}>Score: {playerScore}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    playerScoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: borderRadius.md,
        padding: spacing.sm,
        margin: spacing.xs,
        ...Platform.select({
            ios: shadows.sm,
            android: { elevation: 2 },
            web: shadows.sm
        })
    },
    scoreText: {
        ...typography.body,
        color: colors.text.primary,
        fontWeight: 'bold',
        fontSize: 18,
    }
});

export default PlayerScore;