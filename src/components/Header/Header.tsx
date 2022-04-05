import React, { useState } from 'react'
import {
	Header as HeaderR,
	MediaQuery,
	Burger,
	Text,
	useMantineTheme,
} from '@mantine/core'
export const Header = () => {
	const theme = useMantineTheme()
	const [opened, setOpened] = useState(false)
	return (
		<HeaderR height={70} p='md'>
			<div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
				<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
					<Burger
						opened={opened}
						onClick={() => setOpened(o => !o)}
						size='sm'
						color={theme.colors.gray[6]}
						mr='xl'
					/>
				</MediaQuery>
				<Text>FireBox 🔥</Text>
			</div>
		</HeaderR>
	)
}
