import React, { useContext, createContext } from 'react'
import { useMantineTheme } from '@mantine/core'
import { Sun, Moon, Icon } from 'tabler-icons-react'
const themeContext = createContext<{
	backgroundColor: string
	fontColor: string
	ColorSchemeIcon: Icon
	codeEditor: 'vs-dark' | 'light'
	consoleFeed: 'light' | 'dark'
	consoleBg: '#242424' | 'white'
}>({
	backgroundColor: 'white',
	fontColor: 'black',
	ColorSchemeIcon: Sun,
	codeEditor: 'vs-dark',
	consoleFeed: 'dark',
	consoleBg: '#242424',
})

export const useTheme = () => {
	const value = useContext(themeContext)
	return value
}

export const ThemeProvider: React.FC = props => {
	const theme = useMantineTheme()
	const mode = {
		dark: {
			backgroundColor: theme.colors.dark[9],
			fontColor: 'white',
			ColorSchemeIcon: Sun,
			codeEditor: 'vs-dark' as const,
			consoleFeed: 'dark' as const,
			consoleBg: '#242424' as const,
		},
		light: {
			fontColor: 'black',
			backgroundColor: 'white',
			ColorSchemeIcon: Moon,
			codeEditor: 'light' as const,
			consoleFeed: 'light' as const,
			consoleBg: 'white' as const,
		},
	}

	return <themeContext.Provider value={mode[theme.colorScheme]} {...props} />
}
