const colors: Record<ColorThemeName, ThemeColors> = {
  light: {
    text: '#222',
    backgrounds: {
      default: '#fff',
      revert: '#29292c',
    },
  },
  dark: {
    text: '#fff',
    backgrounds: {
      default: '#29292c',
      revert: '#fff',
    },
  },
}

export default colors

export type ThemeColors = {
  text: string
  backgrounds: {
    default: string
    revert: string
  }
}

export type ColorThemeName = 'light' | 'dark'
