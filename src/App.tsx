import React, { useState } from 'react'
import {
	AppShell,
	Header,
	Footer,
	Aside,
	Text,
	MediaQuery,
	Burger,
	useMantineTheme,
} from '@mantine/core'
import { NavBar } from './Navbar'
import { CodeEditor } from './CodeEditor'

export default function App() {
	const theme = useMantineTheme()
	const [opened, setOpened] = useState(false)
	return (
		<AppShell
			styles={{
				main: {
					background:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint='sm'
			asideOffsetBreakpoint='sm'
			fixed
			navbar={<NavBar opened={opened} />}
			aside={
				<MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
					<Aside p='md' hiddenBreakpoint='sm' width={{ sm: 200, lg: 300 }}>
						<Text>Application sidebar</Text>
					</Aside>
				</MediaQuery>
			}
			footer={
				<Footer height={60} p='md'>
					Application footer
				</Footer>
			}
			header={
				<Header height={70} p='md'>
					<div
						style={{ display: 'flex', alignItems: 'center', height: '100%' }}
					>
						<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
							<Burger
								opened={opened}
								onClick={() => setOpened(o => !o)}
								size='sm'
								color={theme.colors.gray[6]}
								mr='xl'
							/>
						</MediaQuery>

						<Text>Application header</Text>
					</div>
				</Header>
			}
		>
			<CodeEditor />
		</AppShell>
	)
}
