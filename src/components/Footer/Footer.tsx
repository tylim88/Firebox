import React from 'react'
import { Footer as FooterR, Anchor, Text } from '@mantine/core'
import { BrandGithub } from 'tabler-icons-react'

export const Footer = () => {
	return (
		<FooterR height={60} px='md'>
			<Anchor
				href='https://github.com/tylim88/Firebox'
				target={'_blank'}
				rel='noreferrer'
				style={{ height: '100%', alignItems: 'center', display: 'flex' }}
				size='xl'
				underline={false}
			>
				<BrandGithub size={32} strokeWidth={2} />
				<Text>Github</Text>
			</Anchor>
		</FooterR>
	)
}
