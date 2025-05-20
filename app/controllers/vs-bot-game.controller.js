// app/controllers/vs-bot-game.controller.js

import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { SocketContext } from '../contexts/socket.context';
import Board from "../components/board/board.component";
import GameSummary from "../components/game-summary/game-summary.component";

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
                    <Text style={styles.paragraph}>
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
                    <Button
                        title="Retour à l'accueil"
                        onPress={() => navigation.navigate('HomeScreen')}
                        style={styles.returnButton}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: '100%',
    },
    paragraph: {
        fontSize: 16,
    }
});