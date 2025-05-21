// app/components/board/tokens/token-counter.component.js

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SocketContext } from '../../../contexts/socket.context';

const TokenCounter = ({ isOpponent }) => {
  const socket = useContext(SocketContext);
  const [tokenCount, setTokenCount] = useState(12);

  useEffect(() => {
    socket.on('game.tokens.update', (data) => {
      const playerKey = isOpponent ? 'player:2' : 'player:1';
      setTokenCount(data[playerKey]);
    });

    return () => {
      socket.off('game.tokens.update');
    };
  }, [isOpponent]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pions: {tokenCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TokenCounter;