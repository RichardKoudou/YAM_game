// app/controller/online-game.controller.js

import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { SocketContext } from '../contexts/socket.context';
import Board from "../components/board/board.component";
import GameSummary from "../components/game-summary/game-summary.component";
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';


export default function OnlineGameController({ navigation }) {

    const socket = useContext(SocketContext);

    const [inQueue, setInQueue] = useState(false);
    const [inGame, setInGame] = useState(false);
    const [idOpponent, setIdOpponent] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [finalScores, setFinalScores] = useState(null);

    useEffect(() => {
        console.log('[emit][queue.join]:', socket.id);
        socket.emit("queue.join");
        setInQueue(false);
        setInGame(false);

        socket.on('queue.added', (data) => {
            console.log('[listen][queue.added]:', data);
            setInQueue(data['inQueue']);
            setInGame(data['inGame']);
        });

        socket.on('game.start', (data) => {
            console.log('[listen][game.start]:', data);
            setInQueue(data['inQueue']);
            setInGame(data['inGame']);
            setIdOpponent(data['idOpponent']);
        });

        socket.on('queue.left', (data) => {
            console.log('[listen][queue.left]:', data);
            setInQueue(false);
            setInGame(false);
            navigation.navigate('HomeScreen');
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
            {!inQueue && !inGame && (
                <>
                    <Text style={styles.message}>
                        En attente du serveur...
                    </Text>
                </>
            )}

            {inQueue && (
                <>
                    <Text style={styles.message}>
                        En attente d'un autre joueur...
                    </Text>
                    <TouchableOpacity
                        style={[styles.button, styles.dangerButton]}
                        onPress={() => {socket.emit("queue.leave")}}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Quitter la file d'attente</Text>
                    </TouchableOpacity>
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
    dangerButton: {
        backgroundColor: colors.danger
    },
    buttonText: {
        ...typography.body,
        color: colors.text.light,
        fontWeight: 'bold'
    }
});
