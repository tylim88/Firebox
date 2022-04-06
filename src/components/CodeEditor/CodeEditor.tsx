import React from 'react'
import { useCode, useTheme } from 'hooks'
import { Button, Stack } from '@mantine/core'
import Editor from '@monaco-editor/react'

export const CodeEditor = () => {
	const { code, setCode, loading, disabled, onSave, saveRef } = useCode()
	const { backgroundColor, codeEditor, fontColor } = useTheme()
	return (
		<>
			<Stack style={{ width: 'auto', backgroundColor }} mb='15px'>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						ref={saveRef}
						compact
						loading={loading}
						disabled={disabled}
						onClick={onSave}
						styles={{
							label: {
								color: disabled || loading ? fontColor : 'white',
							},
						}}
						{...(disabled || loading
							? {
									variant: 'outline',
									color: 'gray',
							  }
							: {
									variant: 'gradient',
									gradient: { from: 'orange', to: 'red' },
							  })}
					>
						{loading ? 'Fetching and Transpiling Modules' : 'Ctrl+S Save'}
					</Button>
				</div>
			</Stack>
			<Stack style={{ height: '100%' }}>
				<Editor
					height='85vh'
					theme={codeEditor}
					defaultLanguage='javascript'
					defaultValue={code}
					onChange={newValue => setCode(newValue || '')}
					options={{
						wordWrap: 'on',
						minimap: {
							enabled: false,
						},
					}}
				/>
			</Stack>
		</>
	)
}
