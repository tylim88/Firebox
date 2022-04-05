import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { useCode } from 'hooks'
import { Button, Stack } from '@mantine/core'
import { oneDark } from '@codemirror/theme-one-dark'

export const CodeEditor = () => {
	const { code, setCode, loading, disabled, onSave } = useCode()

	return (
		<>
			<Stack style={{ width: 'auto' }} mb='5px'>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
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
				</div>
			</Stack>
			<Stack style={{ height: '100%' }}>
				<CodeMirror
					value={code}
					height='100%'
					theme={oneDark}
					extensions={[javascript({ jsx: true, typescript: true })]}
					onChange={(value, viewUpdate) => {
						setCode(value)
					}}
					style={{ height: '100%' }}
				/>
			</Stack>
		</>
	)
}
