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
                DEFAULT: '#2D313F',
                50: '#8088A4',
                100: '#747D9B',
                200: '#606986',
                300: '#4F566F',
                400: '#3E4457',
                500: '#2D313F',
                600: '#262A36',
                700: '#1C1E27',
                800: '#15171E',
                900: '#0F1015',
                950: '#000000'
            },
            greenAccent: {
                DEFAULT: '#53C6D5',
                50: '#E6F7F9',
                100: '#D6F1F5',
                200: '#B5E7ED',
                300: '#95DCE5',
                400: '#74D1DD',
                500: '#53C6D5',
                600: '#2FB0C1',
                700: '#248794',
                800: '#195E67',
                900: '#0E353A',
                950: '#092023'
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
                DEFAULT: '#2D313F',
                50: '#000000',
                100: '#0F1015',
                200: '#15171E',
                300: '#1C1E27',
                400: "#f2f0f0",
                500: '#2D313F',
                600: '#3E4457',
                700: '#4F566F',
                800: '#606986',
                900: '#747D9B',
                950: '#8088A4',
            },//400: "#f2f0f0", // manually changed
            greenAccent: {
                DEFAULT: '#53C6D5',
                50: '#092023',
                100: '#0E353A',
                200: '#195E67',
                300: '#248794',
                400: '#2FB0C1',
                500: '#53C6D5',
                600: '#74D1DD',
                700: '#95DCE5',
                800: '#B5E7ED',
                900: '#D6F1F5',
                950: '#E6F7F9',
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