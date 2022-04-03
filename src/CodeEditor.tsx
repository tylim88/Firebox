import React, { useState, useRef, useEffect } from 'react'
import ReactCodeEditor, { SelectionText } from '@uiw/react-textarea-code-editor'
export const CodeEditor = () => {
	const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`)
	const textRef = useRef(null)
	useEffect(() => {
		if (textRef.current) {
			const obj = new SelectionText(textRef.current)
			console.log('obj:', obj)
		}
	}, [])
	return (
		<div data-color-mode='light'>
			<ReactCodeEditor
				value={code}
				ref={textRef}
				language='tsx'
				placeholder='Please enter TSX code.'
				onChange={evn => setCode(evn.target.value)}
				padding={15}
				style={{
					borderWidth: 0,
					fontSize: 14,
					fontFamily:
						'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
				}}
			/>
		</div>
	)
}
