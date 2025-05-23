// app/screens/vs-bot-game.screen.js

import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SocketContext } from '../contexts/socket.context';
import VsBotGameController from "../controllers/vs-bot-game.controller";
import { BackgroundImage } from '../components/background-image/background-image.component';

export default function VsBotGameScreen({ navigation }) {
    const socket = useContext(SocketContext);

    return (
        <BackgroundImage>
            <View style={styles.container}>
            {!socket && (
                <>
                    <Text style={styles.paragraph}>
                        Pas de connexion avec le serveur...
                    </Text>
                    <Text style={styles.footnote}>
                        Redémarrez l'application et attendez que le serveur soit de nouveau disponible.
                    </Text>
                </>
            )}

            {socket && (
                <VsBotGameController navigation={navigation}/>
            )}
            </View>
        </BackgroundImage>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    }
});
