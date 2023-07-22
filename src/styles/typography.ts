import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const fonts = {
  100: 'Inter-Thin',
  200: 'Inter-ExtraLight',
  300: 'Inter-Light',
  400: 'Inter-Regular',
  500: 'Inter-Medium',
  600: 'Inter-SemiBold',
  700: 'Inter-Bold',
  800: 'Inter-ExtraBold',
  900: 'Inter-Black',
};

export const typography = StyleSheet.create({
  'display-xxl': {
    fontSize: 72,
    lineHeight: 90,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
  'display-xl': {
    fontSize: 60,
    lineHeight: 72,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
  'display-lg': {
    fontSize: 48,
    lineHeight: 60,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
  'display-md': {
    fontSize: 36,
    lineHeight: 44,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
  'display-sm': {
    fontSize: 30,
    lineHeight: 38,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
  'display-xs': {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
  'text-xl': {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
  'text-lg': {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
  'text-md': {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
  'text-sm': {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
  'text-xs': {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: fonts[400],
    fontStyle: 'normal',
    color: colors.gray[9],
  },
});

export type Typography = keyof typeof typography;
export type Fonts = keyof typeof fonts;
