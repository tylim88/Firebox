import React, { useRef } from 'react'
import ReactCodeEditor from '@uiw/react-textarea-code-editor'
import './style.css'
import { useCode } from 'hooks'
import { Grid, Button } from '@mantine/core'

export const CodeEditor = () => {
	const textRef = useRef(null)
	const { code, setCode, loading, disabled, onSave } = useCode()

	return (
		<Grid style={{ width: '100%', overflow: 'auto' }}>
			<Grid.Col
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<Button
					variant='outline'
					color='red'
					compact
					loading={loading}
					disabled={disabled}
					onClick={onSave}
				>
					{loading ? 'Fetching Module and Transpiling' : 'Save'}
				</Button>
			</Grid.Col>
			<Grid.Col data-color-mode='light'>
				<ReactCodeEditor
					value={code}
					ref={textRef}
					language='jsx'
					placeholder='Please enter JSX code.'
					onChange={evn => setCode(evn.target.value)}
					padding={15}
					style={{
						height: '100%',
						borderWidth: 0,
						fontSize: 14,
						fontFamily:
							'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
					}}
				/>
			</Grid.Col>
		</Grid>
	)
}
