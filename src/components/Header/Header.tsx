import React, { useState } from 'react'
import {
	Header as HeaderR,
	MediaQuery,
	Burger,
	Text,
	useMantineTheme,
	ActionIcon,
	Grid,
} from '@mantine/core'
import { useTheme, useChangeTheme } from 'hooks'

export const Header = () => {
	const theme = useMantineTheme()
	const { fontColor, ColorSchemeIcon } = useTheme()
	const [opened, setOpened] = useState(false)
	const { changeTheme } = useChangeTheme()

	return (
		<HeaderR
			height={60}
			p='md'
			style={{
				height: '100%',
			}}
		>
			<Grid>
				<Grid.Col span={6}>
					<MediaQuery largerThan='sm' styles={{ display: 'none' }}>
						<Burger
							opened={opened}
							onClick={() => setOpened(o => !o)}
							size='sm'
							color={theme.colors.gray[6]}
							mr='xl'
						/>
					</MediaQuery>
					<Text color={fontColor}>🔥FireBox</Text>
				</Grid.Col>
				<Grid.Col
					span={6}
					style={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					<ActionIcon variant='outline' onClick={() => changeTheme()}>
						<ColorSchemeIcon size={16} color={fontColor} />
					</ActionIcon>
				</Grid.Col>
			</Grid>
		</HeaderR>
	)
}
