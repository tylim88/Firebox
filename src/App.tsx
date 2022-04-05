import React from 'react'
import { Grid, AppShell } from '@mantine/core'
import { CodeEditor, Iframe, Header, Footer } from 'components'

export default function App() {
	return (
		<AppShell padding='md' fixed>
			<Header />
			<Grid style={{ height: '100%' }}>
				<Grid.Col span={5} style={{ height: '100%' }}>
					<CodeEditor />
				</Grid.Col>
				<Grid.Col span={7} style={{ height: '100%' }}>
					<Iframe />
				</Grid.Col>
			</Grid>

			<Footer />
		</AppShell>
	)
}
