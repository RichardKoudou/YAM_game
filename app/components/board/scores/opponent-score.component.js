import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from 'react-native';
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
        <Text>Score: {opponentScore}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
    opponentScoreContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default OpponentScore;