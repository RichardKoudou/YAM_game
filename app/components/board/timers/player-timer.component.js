import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import { SocketContext } from '../../../contexts/socket.context';
import { colors, typography, spacing, borderRadius } from '../../../styles/theme';

const PlayerTimer = () => {
    const socket = useContext(SocketContext);
    const [playerTimer, setPlayerTimer] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(1));

    useEffect(() => {
        socket.on("game.timer", (data) => {
            setPlayerTimer(data['playerTimer']);
        });
    }, []);

    useEffect(() => {
        if (playerTimer <= 5 && playerTimer > 0) {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.4,
                    duration: 500,
                    useNativeDriver: true
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                })
            ]).start();
        }
    }, [playerTimer]);

    return (
        <View style={styles.playerTimerContainer}>
            <Animated.View style={[styles.timerCard, { opacity: fadeAnim }]}>
                <Text style={[
                    styles.timerText,
                    playerTimer <= 5 && styles.timerWarning
                ]}>
                    {playerTimer}
                </Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    playerTimerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xs
    },
    timerCard: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.md,
        padding: spacing.sm,
        minWidth: 60,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: colors.text.primary,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    timerText: {
        ...typography.h2,
        color: colors.text.primary,
        textAlign: 'center'
    },
    timerWarning: {
        color: colors.danger,
        fontWeight: 'bold'
    }
});

export default PlayerTimer;
