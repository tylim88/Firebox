import React from 'react'
import { Footer as FooterR } from '@mantine/core'
export const Footer = () => {
	return (
		<FooterR height={60} p='md'>
			<a
				href='https://github.com/tylim88/Firebox'
				target={'_blank'}
				rel='noreferrer'
			>
				Github
			</a>
		</FooterR>
	)
}
