import React, { useContext, createContext, useState } from 'react'
import { MantineProvider } from '@mantine/core'

const changeThemeContext = createContext<{
	changeTheme: (theme?: 'dark' | 'light') => void
}>({
	changeTheme: () => {},
})

export const useChangeTheme = () => {
	const value = useContext(changeThemeContext)
	return value
}

export const ChangeThemeProvider: React.FC = props => {
	const [theme, setTheme] = useState<'dark' | 'light'>('dark')

	const changeTheme = (theme_?: 'dark' | 'light') => {
		setTheme(theme_ ?? theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<MantineProvider theme={{ colorScheme: theme }}>
			<changeThemeContext.Provider value={{ changeTheme }} {...props} />
		</MantineProvider>
	)
}
