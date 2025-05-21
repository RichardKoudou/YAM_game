// app/components/board/decks/dice.component.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { colors, typography, spacing, borderRadius, shadows } from '../../../styles/theme';

const Dice = ({ index, locked, value, onPress, opponent }) => {

  const handlePress = () => {
    if (!opponent) {
      onPress(index);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.dice, locked && styles.lockedDice]}
      onPress={handlePress}
      disabled={opponent}
    >
      <Text style={styles.diceText}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dice: {
    width: 45,
    height: 45,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    margin: spacing.xs,
    ...Platform.select({
      ios: shadows.md,
      android: { elevation: 4 },
      web: shadows.md
    })
  },
  lockedDice: {
    backgroundColor: "gray",
    transform: [{ scale: 0.95 }]
  },
  diceText: {
    ...typography.h3,
    color: colors.text.light,
    fontWeight: "bold"
  },
  opponentText: {
    ...typography.caption,
    color: colors.error,
  },
});

export default Dice;
