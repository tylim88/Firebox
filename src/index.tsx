import React from 'react'
import './index.css'
import App from 'App'
import reportWebVitals from './reportWebVitals'
import { CodeProvider, ThemeProvider, ChangeThemeProvider } from 'hooks'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')

container &&
	createRoot(container).render(
		<React.StrictMode>
			<ChangeThemeProvider>
				<ThemeProvider>
					<CodeProvider>
						<App />
					</CodeProvider>
				</ThemeProvider>
			</ChangeThemeProvider>
		</React.StrictMode>
	)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
