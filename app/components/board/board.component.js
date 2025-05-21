// app/components/board/board.component.js

import React from "react";
import { View, Text, StyleSheet, Platform } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../styles/theme';
import PlayerTimer from './timers/player-timer.component'
import OpponentTimer from './timers/opponent-timer.component'
import PlayerDeck from "./decks/player-deck.component";
import OpponentDeck from "./decks/opponent-deck.component";
import Choices from "./choices/choices.component";
import Grid from "./grid/grid.component";

import TokenCounter from './tokens/token-counter.component';

const OpponentInfos = () => {
  return (
    <View style={styles.opponentInfosContainer}>
      <Text style={styles.playerText}>Adversaire</Text>
      <TokenCounter isOpponent={true} />
    </View>
  );
};

import OpponentScore from './scores/opponent-score.component';
import PlayerScore from './scores/player-score.component';

const 
PlayerInfos = () => {
  return (
    <View style={styles.playerInfosContainer}>
      <Text style={styles.playerText}>Vous</Text>
      <TokenCounter isOpponent={false} />
    </View>
  );
};



const Board = ({ gameViewState}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.row, { height: '10%' }]}>
        <OpponentInfos />
        <View style={styles.opponentTimerScoreContainer}>
          <OpponentTimer />
          <OpponentScore />
        </View>
      </View>
      <View style={[styles.row, { height: '10%' }]}>
        <OpponentDeck />
      </View>
      <View style={[styles.row, { height: '48%' }]}>
        <Grid />
        <Choices />
      </View>
      <View style={[styles.row, { height: '22%' }]}>
        <PlayerDeck />
      </View>
      <View style={[styles.row2, { height: '10%' }]}>
        <PlayerInfos />
        <View style={styles.playerTimerScoreContainer}>
          <PlayerTimer />
          <PlayerScore />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: '100%',
    backgroundColor: colors.background,
    paddingBottom: '24px',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: spacing.xs,
  },
  row2: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '8px',
  },
  opponentInfosContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...Platform.select({
      ios: shadows.lg,
      android: { elevation: 2 },
      web: shadows.lg
    })
  },
  opponentTimerScoreContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginLeft: spacing.xs,
    ...Platform.select({
      ios: shadows.lg,
      android: { elevation: 2 },
      web: shadows.lg
    })
  },
  opponentScoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deckOpponentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 10,
    borderColor: "black"
  },
  gridContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'black',
  },
  playerInfosContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...Platform.select({
      ios: shadows.lg,
      android: { elevation: 2 },
      web: shadows.lg
    })
  },
  playerTimerScoreContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginLeft: spacing.xs,
    ...Platform.select({
      ios: shadows.lg,
      android: { elevation: 2 },
      web: shadows.lg
    })
  },
  playerText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs
  },
  counterText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  playerScoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "lightgrey"
  },
});

export default Board;
