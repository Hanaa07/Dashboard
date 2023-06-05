import {createContext, useState, useMemo} from "react";
import {createTheme} from "@mui/material";

//color design tokens
export const tokens = (mode: string) => ({
    ...(mode === 'dark'
        ? {
            gray: {
                DEFAULT: '#666666',
                50: '#C2C2C2',
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
                950: '#000000'
            },
            primary: {
                DEFAULT: '#141B2D',
                50: '#4C67AC',
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#1F2A40",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509",
                950: '#000000'
            },
            greenAccent: {
                DEFAULT: '#4CCEAC',
                50: '#DCF5EF',
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922",
                950: '#061713'
            },
            redAccent: {
                DEFAULT: '#DB4F4A',
                50: '#F9E4E3',
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f",
                950: '#220807'
            },
            blueAccent: {
                DEFAULT: '#6870FA',
                50: '#FFFFFF',
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632",
                950: '#030862'
            }
        } : {
            gray: {
                DEFAULT: '#666666',
                50: '#000000',
                100: '#000000',
                200: '#121212',
                300: '#2E2E2E',
                400: '#4A4A4A',
                500: '#666666',
                600: '#7A7A7A',
                700: '#8F8F8F',
                800: '#A3A3A3',
                900: '#B8B8B8',
                950: '#C2C2C2',
            },
            primary: {
                DEFAULT: '#141B2D',
                50: '#000000',
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0", // manually changed
                500: "#141b2d",
                600: "#1F2A40",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
                950: '#4C67AC',
            },
            greenAccent: {
                DEFAULT: '#4CCEAC',
                50: '#061713',
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
                950: '#DCF5EF',
            },
            redAccent: {
                DEFAULT: '#DB4F4A',
                50: '#220807',
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
                950: '#F9E4E3',
            },
            blueAccent: {
                DEFAULT: '#6870FA',
                50: '#030862',
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
                950: '#FFFFFF',
            },
        }),
});

//mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
            ?{
                primary: {
                    main: colors.primary.DEFAULT,
                },
                secondary: {
                    main: colors.greenAccent.DEFAULT,
                },
                neutral: {
                    dark: colors.gray[700],
                    main: colors.gray.DEFAULT,
                    light: colors.gray[100],
                },
                background: {
                    default: colors.primary.DEFAULT,
                }
                } : {
                    primary: {
                        main: colors.primary.DEFAULT,
                    },
                    secondary: {
                        main: colors.greenAccent.DEFAULT,
                    },
                    neutral: {
                        dark: colors.gray[700],
                        main: colors.gray.DEFAULT,
                        light: colors.gray[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontsize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontsize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontsize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontsize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontsize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontsize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontsize: 14,
            },
        },
    };
};
//context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
  const [mode, setMode] = useState<string>("dark");

  const colorMode = useMemo(
      () => ({
          toggleColorMode: () =>
              setMode((prev) => (prev === "light" ? "dark" : "light")),
      }),
      []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
}