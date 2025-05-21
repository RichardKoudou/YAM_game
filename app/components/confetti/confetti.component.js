// app/components/confetti/confetti.component.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Easing } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CONFETTI_COLORS = ['#405DE6', '#5851DB', '#833AB4', '#C13584', '#E1306C', '#FD1D1D'];
const CONFETTI_SIZE = 10;
const CONFETTI_COUNT = 50;

const Confetti = ({ active }) => {
    const [confetti, setConfetti] = useState([]);

    useEffect(() => {
        if (active) {
            createConfetti();
        } else {
            setConfetti([]);
        }
    }, [active]);

    const createConfetti = () => {
        const pieces = Array(CONFETTI_COUNT).fill().map((_, i) => ({
            id: i,
            x: new Animated.Value(Math.random() * SCREEN_WIDTH),
            y: new Animated.Value(-20),
            rotation: new Animated.Value(0),
            scale: new Animated.Value(1),
            color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
        }));

        setConfetti(pieces);

        pieces.forEach(piece => {
            const duration = 3000 + (Math.random() * 2000);

            Animated.parallel([
                Animated.timing(piece.y, {
                    toValue: SCREEN_HEIGHT + 20,
                    duration,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.timing(piece.rotation, {
                    toValue: 360 + (Math.random() * 720),
                    duration,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.sequence([
                    Animated.timing(piece.scale, {
                        toValue: 1.2,
                        duration: duration / 2,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }),
                    Animated.timing(piece.scale, {
                        toValue: 0,
                        duration: duration / 2,
                        easing: Easing.linear,
                        useNativeDriver: true
                    })
                ])
            ]).start();
        });
    };

    if (!active) return null;

    return (
        <View style={StyleSheet.absoluteFill}>
            {confetti.map(piece => (
                <Animated.View
                    key={piece.id}
                    style={[
                        styles.confetti,
                        {
                            backgroundColor: piece.color,
                            transform: [
                                { translateX: piece.x },
                                { translateY: piece.y },
                                { rotate: piece.rotation.interpolate({
                                    inputRange: [0, 360],
                                    outputRange: ['0deg', '360deg']
                                })},
                                { scale: piece.scale }
                            ]
                        }
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    confetti: {
        position: 'absolute',
        width: CONFETTI_SIZE,
        height: CONFETTI_SIZE,
        borderRadius: CONFETTI_SIZE / 4
    }
});

export default Confetti;