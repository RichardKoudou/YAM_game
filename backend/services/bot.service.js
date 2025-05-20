// backend/services/bot.service.js

const GameService = require('./game.service');

const BotService = {
    // Initialisation des états du bot
    init: {
        botState: () => ({
            isThinking: false,
            lastAction: null,
            selectedDices: [],
        })
    },

    // Logique de décision du bot
    decision: {
        // Décide quels dés garder après un lancer
        chooseDicesToKeep: (dices) => {
            console.log('[BOT] Analyse des dés à garder:', dices);
            const counts = {};
            dices.forEach(dice => {
                if (!dice.isLocked) {
                    counts[dice.value] = (counts[dice.value] || 0) + 1;
                }
            });

            // Stratégie simple: garde les dés qui apparaissent le plus souvent
            const maxCount = Math.max(...Object.values(counts));
            if (maxCount >= 2) {
                const valueToKeep = Object.keys(counts).find(key => counts[key] === maxCount);
                return dices.map(dice => ({
                    ...dice,
                    shouldLock: dice.value === parseInt(valueToKeep)
                }));
            }
            return dices.map(dice => ({ ...dice, shouldLock: false }));
        },

        // Choisit la meilleure combinaison disponible
        chooseBestCombination: (availableChoices, grid) => {
            console.log('[BOT] Choix de la meilleure combinaison:', availableChoices);
            // Priorité aux combinaisons plus fortes
            const priorities = ['yam', 'carre', 'full', 'brelan', 'suite', 'moinshuit'];
            
            for (const priority of priorities) {
                const choice = availableChoices.find(c => c.id.toLowerCase().includes(priority));
                if (choice) return choice;
            }
            
            return availableChoices[0]; // Prend la première combinaison si aucune priorité trouvée
        },

        // Choisit la meilleure cellule pour placer un pion
        chooseBestCell: (grid, availableCells) => {
            console.log('[BOT] Choix de la meilleure cellule:', availableCells);
            // Pour l'instant, prend simplement la première cellule disponible
            return availableCells[0];
        }
    },

    // Actions du bot
    action: {
        // Simule un délai de réflexion du bot
        simulateThinking: async () => {
            const thinkingTime = Math.random() * 1000 + 500; // 500-1500ms
            return new Promise(resolve => setTimeout(resolve, thinkingTime));
        },

        // Exécute le tour du bot
        async playTurn(gameState) {
            console.log('[BOT] Début du tour du bot');
            await BotService.action.simulateThinking();

            // Réinitialise les dés pour le nouveau tour
            gameState.deck.dices = gameState.deck.dices.map(dice => ({ ...dice, locked: false }));

            // Effectue jusqu'à 3 lancers
            while (gameState.deck.rollsCounter <= gameState.deck.rollsMaximum) {
                console.log(`[BOT] Lancer ${gameState.deck.rollsCounter}`);
                
                // Lance les dés non verrouillés
                gameState.deck.dices = GameService.dices.roll(gameState.deck.dices);
                // Les mises à jour des vues sont gérées par le code appelant

                // Analyse les combinaisons disponibles
                const combinations = GameService.choices.findCombinations(
                    gameState.deck.dices,
                    false,
                    gameState.deck.rollsCounter === 1
                );

                // Si on trouve une bonne combinaison, on arrête les lancers
                if (combinations.some(c => ['yam', 'carre', 'full'].includes(c.id))) {
                    break;
                }

                // Sinon, on verrouille les dés intéressants pour le prochain lancer
                if (gameState.deck.rollsCounter < gameState.deck.rollsMaximum) {
                    const dicesToKeep = BotService.decision.chooseDicesToKeep(gameState.deck.dices);
                    gameState.deck.dices = dicesToKeep.map((dice, index) => ({
                        ...gameState.deck.dices[index],
                        locked: dice.shouldLock
                    }));
                    // Les mises à jour des vues sont gérées par le code appelant
                }

                gameState.deck.rollsCounter++;
                await BotService.action.simulateThinking();
            }

            // Verrouille tous les dés à la fin des lancers
            gameState.deck.dices = GameService.dices.lockEveryDice(gameState.deck.dices);

            // Trouve les combinaisons disponibles finales
            const finalCombinations = GameService.choices.findCombinations(
                gameState.deck.dices,
                false,
                gameState.deck.rollsCounter === 1
            );

            if (finalCombinations.length > 0) {
                // Choisit la meilleure combinaison
                const bestCombination = BotService.decision.chooseBestCombination(finalCombinations, gameState.grid);
                gameState.choices.availableChoices = finalCombinations;
                gameState.choices.idSelectedChoice = bestCombination.id;
                // Les mises à jour des vues sont gérées par le code appelant

                // Met à jour la grille avec les cellules disponibles
                gameState.grid = GameService.grid.updateGridAfterSelectingChoice(
                    bestCombination.id,
                    gameState.grid
                );

                // Trouve toutes les cellules disponibles
                let availableCells = [];
                gameState.grid.forEach((row, rowIndex) => {
                    row.forEach((cell, cellIndex) => {
                        if (cell.canBeChecked) {
                            availableCells.push({ ...cell, rowIndex, cellIndex });
                        }
                    });
                });

                // Sélectionne une cellule si disponible
                if (availableCells.length > 0) {
                    const bestCell = availableCells[0]; // Pour l'instant, prend la première cellule disponible
                    gameState.grid = GameService.grid.selectCell(
                        bestCell.id,
                        bestCell.rowIndex,
                        bestCell.cellIndex,
                        'player:2',
                        gameState.grid
                    );
                    // Les mises à jour des vues sont gérées par le code appelant

                    // Met à jour le score
                    const result = GameService.grid.updateScore(
                        bestCell.id,
                        bestCell.rowIndex,
                        bestCell.cellIndex,
                        'player:2',
                        gameState
                    );

                    if (result.gameOver) {
                        gameState.winner = result.winner;
                        gameState.scores = result.scores;
                    }
                }
            }

            console.log('[BOT] Fin du tour du bot');
            return gameState;
        }
    }
};

module.exports = BotService;