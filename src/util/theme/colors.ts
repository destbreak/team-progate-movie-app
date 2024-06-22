const colors: Record<ColorThemeName, ThemeColors> = {
  light: {
    text: '#222',
    backgrounds: {
      default: '#fff',
    },
  },
  dark: {
    text: '#fff',
    backgrounds: {
      default: '#29292c',
    },
  },
}

export default colors

export type ThemeColors = {
  text: string
  backgrounds: {
    default: string
  }
}

export type ColorThemeName = 'light' | 'dark'
