import React, {useEffect, useContext, useState} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import { colors, typography, spacing, borderRadius, shadows } from '../../../styles/theme';

const Grid = () => {

    const socket = useContext(SocketContext);

    const [displayGrid, setDisplayGrid] = useState(false);
    const [canSelectCells, setCanSelectCells] = useState([]);
    const [grid, setGrid] = useState([]);

    const handleSelectCell = (cellId, rowIndex, cellIndex) => {
        if (canSelectCells) {
            socket.emit("game.grid.selected", { cellId, rowIndex, cellIndex });
        }
    };

    const handleUpdateScore = (data) => {
        socket.emit("game.grid.updateScore", data);
    }



    useEffect(() => {
        socket.on("game.grid.view-state", (data) => {
            setDisplayGrid(data['displayGrid']);
            setCanSelectCells(data['canSelectCells'])
            setGrid(data['grid']);
        });
    }, []);

    return (
        <View style={styles.gridContainer}>
            {displayGrid &&
                grid.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((cell, cellIndex) => (
                            
                            <TouchableOpacity
                            
                                key={cell.id + '-' + rowIndex + '-' + cellIndex}
                                style={[
                                    styles.cell,
                                    cell.owner === "player:1" && styles.playerOwnedCell,
                                    cell.owner === "player:2" && styles.opponentOwnedCell,
                                    (cell.canBeChecked && !(cell.owner === "player:1") && !(cell.owner === "player:2")) && styles.canBeCheckedCell,
                                    rowIndex !== 0 && styles.topBorder,
                                    cellIndex !== 0 && styles.leftBorder,
                                ]}
                                onPress={() => handleSelectCell(cell.id, rowIndex, cellIndex)}
                                disabled={!cell.canBeChecked}
                            >
                                <Text style={styles.cellText}>{cell.viewContent}</Text>
                                
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
        </View>
    );
};

const styles = StyleSheet.create({
    gridContainer: {
        flex: 7,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: spacing.sm,
        //backgroundColor: colors.surface,
    },
    row: {
        flexDirection: "row",
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: spacing.xxs,
        gap: '4px',
        marginBottom: '4px',
    },
    cell: {
        flexDirection: "row",
        flex: 2,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.lg,
        margin: spacing.xxs,
        backgroundColor: colors.surface,
        ...Platform.select({
            ios: shadows.lg,
            android: { elevation: 2 },
            web: shadows.lg
        })
    },
    cellText: {
        ...typography.body,
        fontStyle:"bold",
        color: colors.text.primary,
        fontWeight: "bold",
        fontSize: 18,
    },
    playerOwnedCell: {
        backgroundColor: colors.success,
        opacity: 0.9,
    },
    opponentOwnedCell: {
        backgroundColor: colors.danger,
        opacity: 0.9,
    },
    canBeCheckedCell: {
        backgroundColor: colors.warning,
    },
    topBorder: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    leftBorder: {
        borderLeftWidth: 1,
        borderLeftColor: colors.border,
    },
});

export default Grid;
