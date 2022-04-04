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
import { CodeEditor } from 'components'

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
			// navbar={<NavBar opened={opened} />}
			aside={
				<Aside p='md' hiddenBreakpoint='sm' width={{ sm: '60%' }}>
					<Text>Application sidebar</Text>
				</Aside>
			}
			footer={
				<Footer height={60} p='md'>
					<a
						href='https://github.com/tylim88/Firebox'
						target={'_blank'}
						rel='noreferrer'
					>
						Github
					</a>
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

						<Text>FireBox</Text>
					</div>
				</Header>
			}
		>
			<CodeEditor />
		</AppShell>
	)
}
