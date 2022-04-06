import React from 'react'
import { useCode, useTheme } from 'hooks'
import { Button, Stack } from '@mantine/core'
import Editor, { OnMount } from '@monaco-editor/react'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
// @ts-expect-error
import MonacoJSXHighlighter from 'monaco-jsx-highlighter'

export const CodeEditor = () => {
	const { code, setCode, loading, disabled, onSave, saveRef, editorRef } =
		useCode()
	const { backgroundColor, codeEditor, fontColor } = useTheme()
	const handleEditorDidMount: OnMount = (editor, monaco) => {
		editorRef.current = editor
		const babelParse = (code: string) =>
			parse(code, {
				sourceType: 'module',
				plugins: ['jsx'],
				errorRecovery: true,
			})
		// Instantiate the highlighter
		const monacoJSXHighlighter = new MonacoJSXHighlighter(
			monaco,
			babelParse,
			traverse,
			editor
		)
		// Activate highlighting (debounceTime default: 100ms)
		monacoJSXHighlighter.highlightOnDidChangeModelContent(100)
		// Activate JSX commenting
		monacoJSXHighlighter.addJSXCommentCommand()
	}
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
						{loading ? 'Fetching and Transpiling' : 'Ctrl+S Save'}
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
					onMount={handleEditorDidMount}
					value={code}
					options={{
						wordWrap: 'on',
						minimap: {
							enabled: false,
						},
						readOnly: false,
						scrollBeyondLastLine: false,
					}}
				/>
			</Stack>
		</>
	)
}
