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

const PlayerInfos = () => {
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
      <View style={[styles.row, { height: '5%' }]}>
        <OpponentInfos />
        <View style={styles.opponentTimerScoreContainer}>
          <OpponentTimer />
          <OpponentScore />
        </View>
      </View>
      <View style={[styles.row, { height: '25%' }]}>
        <OpponentDeck />
      </View>
      <View style={[styles.row, { height: '40%' }]}>
        <Grid />
        <Choices />
      </View>
      <View style={[styles.row, { height: '25%' }]}>
        <PlayerDeck />
      </View>
      <View style={[styles.row, { height: '5%' }]}>
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
    padding: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 10,
    borderColor: colors.border,
    marginVertical: spacing.xs,
  },
  opponentInfosContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    ...Platform.select({
      ios: shadows.sm,
      android: { elevation: 2 },
      web: shadows.sm
    })
  },
  opponentTimerScoreContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    marginLeft: spacing.xs,
    ...Platform.select({
      ios: shadows.sm,
      android: { elevation: 2 },
      web: shadows.sm
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
    borderRadius: borderRadius.md,
    ...Platform.select({
      ios: shadows.sm,
      android: { elevation: 2 },
      web: shadows.sm
    })
  },
  playerTimerScoreContainer: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    marginLeft: spacing.xs,
    ...Platform.select({
      ios: shadows.sm,
      android: { elevation: 2 },
      web: shadows.sm
    })
  },
  playerText: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs
  },
  playerScoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "lightgrey"
  },
});

export default Board;
