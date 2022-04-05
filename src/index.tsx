import React from 'react'
import './index.css'
import App from 'App'
import reportWebVitals from './reportWebVitals'
import { CodeProvider } from 'hooks'
import { createRoot } from 'react-dom/client'
import { render } from 'react-dom'

const container = document.getElementById('root')
render(
	<React.StrictMode>
		<CodeProvider>
			<App />
		</CodeProvider>
	</React.StrictMode>,
	container
)
// container &&
// 	createRoot(container).render(
// 		<React.StrictMode>
// 			<CodeProvider>
// 				<App />
// 			</CodeProvider>
// 		</React.StrictMode>
// 	)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
