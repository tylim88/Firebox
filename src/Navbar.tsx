import React from 'react'
import { Navbar, Text } from '@mantine/core'

export const NavBar: React.FC<{ opened: boolean }> = ({ opened }) => {
	return (
		<Navbar p='md' hiddenBreakpoint='sm' hidden={!opened} width={{ sm: 200 }}>
			<Text>Application navbar</Text>
		</Navbar>
	)
}
