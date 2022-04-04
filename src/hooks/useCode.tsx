import React, { useContext, createContext, useState, useEffect } from 'react'

const codeContext = createContext<{
	code: string
	setCode: React.Dispatch<React.SetStateAction<string>>
	loading: boolean
	onSave: () => void
	disabled: boolean
}>({
	code: '',
	setCode: () => {},
	loading: false,
	onSave: () => {},
	disabled: false,
})

export const useCode = () => {
	const value = useContext(codeContext)
	return value
}

export const CodeProvider: React.FC = props => {
	const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`)
	const [oldCode, setOldCode] = useState(code)
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)

	const onSave = () => {
		setOldCode(code)
		setLoading(true)
		// esbuild here
	}
	useEffect(() => {
		if (code === oldCode) {
			setDisabled(true)
		} else {
			setDisabled(false)
		}
	}, [code, oldCode])

	return (
		<codeContext.Provider
			value={{ code, setCode, loading, onSave, disabled }}
			{...props}
		/>
	)
}
