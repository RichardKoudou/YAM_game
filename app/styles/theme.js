// app/styles/theme.js

export const colors = {
    primary: '#405DE6',  // Bleu Instagram
    secondary: '#5851DB', // Violet Instagram
    accent: '#833AB4',    // Violet foncé Instagram
    success: '#5851DB',   // Vert pour les actions réussies
    warning: '#f1c40f',   // Jaune pour les avertissements
    danger: '#e74c3c',    // Rouge pour les erreurs/dangers
    background: '#FAFAFA', // Fond clair Instagram
    surface: '#FFFFFF',    // Surface des cartes
    text: {
        primary: '#262626',   // Texte principal
        secondary: '#8e8e8e', // Texte secondaire
        light: '#FFFFFF'      // Texte clair
    },
    border: '#DBDBDB',    // Couleur de bordure Instagram
    overlay: 'rgba(0, 0, 0, 0.5)' // Overlay pour les modales
};
export const useTheme = () => {
    return {
        colors,
        spacing,
        borderRadius,
        shadows,
        typography,
        buttons,
        layout
    };
};
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999
};

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 5
    }
};

export const typography = {
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 32
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 28
    },
    body: {
        fontSize: 16,
        lineHeight: 24
    },
    caption: {
        fontSize: 14,
        lineHeight: 20
    }
};

export const buttons = {
    base: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.md,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    primary: {
        backgroundColor: colors.primary
    },
    secondary: {
        backgroundColor: colors.secondary
    },
    outline: {
        borderWidth: 1,
        borderColor: colors.primary,
        backgroundColor: 'transparent'
    }
};

export const layout = {
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
};