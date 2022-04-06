import React from 'react'
import { Grid, AppShell } from '@mantine/core'
import { CodeEditor, Iframe, Header, Footer } from 'components'
import { useTheme, useCode } from 'hooks'
import { getHotkeyHandler } from '@mantine/hooks'

export default function App() {
	const { backgroundColor } = useTheme()
	const { saveRef } = useCode()
	return (
		<AppShell
			padding='md'
			fixed
			style={{
				backgroundColor,
				overflow: 'none',
			}}
		>
			<Header />
			<Grid
				style={{ height: '100%', backgroundColor }}
				onKeyDown={getHotkeyHandler([
					[
						'ctrl+S',
						() => {
							saveRef?.current?.click()
						},
					],
				])}
			>
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
