// theme.ts
import { MD3LightTheme } from 'react-native-paper';

const CustomLightTheme = {
  ...MD3LightTheme, 
  colors: {
    ...MD3LightTheme.colors,
      "primary": "rgb(20, 141, 206)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(240, 219, 255)",
      "onPrimaryContainer": "rgb(44, 0, 81)",
      "secondary": "rgb(102, 90, 111)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(237, 221, 246)",
      "onSecondaryContainer": "rgb(33, 24, 42)",
      "tertiary": "rgb(128, 81, 88)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(255, 217, 221)",
      "onTertiaryContainer": "rgb(50, 16, 23)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 251, 255)",
      "onBackground": "rgb(29, 27, 30)",
      "surface": "rgb(255, 251, 255)",
      "onSurface": "rgb(29, 27, 30)",
      "surfaceVariant": "rgb(230, 230, 230)",
      "onSurfaceVariant": "rgb(74, 69, 78)",
      "outline": "rgb(124, 117, 126)",
      "outlineVariant": "rgb(204, 196, 206)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(50, 47, 51)",
      "inverseOnSurface": "rgb(245, 239, 244)",
      "inversePrimary": "rgb(220, 184, 255)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(248, 242, 251)",
        "level2": "rgb(244, 236, 248)",
        "level3": "rgb(240, 231, 246)",
        "level4": "rgb(239, 229, 245)",
        "level5": "rgb(236, 226, 243)"
      },
      "surfaceDisabled": "rgba(29, 27, 30, 0.12)",
      "onSurfaceDisabled": "rgba(29, 27, 30, 0.38)",
      "backdrop": "rgba(51, 47, 55, 0.4)"

  },
  roundness: 8, 
};

export default CustomLightTheme;
