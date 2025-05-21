// app/controllers/vs-bot-game.controller.js

import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { SocketContext } from '../contexts/socket.context';
import Board from "../components/board/board.component";
import GameSummary from "../components/game-summary/game-summary.component";
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

export default function VsBotGameController({ navigation }) {
    const socket = useContext(SocketContext);

    const [inGame, setInGame] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [finalScores, setFinalScores] = useState(null);

    useEffect(() => {
        console.log('[emit][game.vs-bot.start]:', socket.id);
        socket.emit("game.vs-bot.start");
        setInGame(false);

        socket.on('game.start', (data) => {
            console.log('[listen][game.start]:', data);
            setInGame(data['inGame']);
        });

        socket.on('game.end', (data) => {
            console.log('[listen][game.end]:', data);
            setGameOver(true);
            setWinner(data.winner);
            setFinalScores(data.scores);
            setInGame(false);
        });
    }, []);

    return (
        <View style={styles.container}>
            {!inGame && !gameOver && (
                <>
                    <Text style={styles.message}>
                        Initialisation de la partie contre le bot...
                    </Text>
                </>
            )}

            {inGame && (
                <>
                    <Board />
                </>
            )}

            {gameOver && (
                <>
                    <GameSummary winner={winner} scores={finalScores} />
                    <TouchableOpacity
                        style={[styles.button, styles.primaryButton]}
                        onPress={() => navigation.navigate('HomeScreen')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Retour à l'accueil</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: '100%',
    },
    message: {
        ...typography.body,
        color: colors.text.secondary,
        marginBottom: spacing.lg,
        textAlign: 'center'
    },
    button: {
        borderRadius: borderRadius.md,
        padding: spacing.md,
        minWidth: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.md,
        ...Platform.select({
            ios: shadows.md,
            android: {
                elevation: 4
            },
            web: shadows.md
        })
    },
    primaryButton: {
        backgroundColor: colors.primary
    },
    buttonText: {
        ...typography.body,
        color: colors.text.light,
        fontWeight: 'bold'
    }
});