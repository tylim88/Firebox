import React, {
	useContext,
	createContext,
	useState,
	useEffect,
	useRef,
} from 'react'
import esbuild from 'esbuild-wasm'
import { OnMount } from '@monaco-editor/react'
import Prettier from 'prettier'
import parser from 'prettier/parser-babel'

const codeContext = createContext<{
	code: string
	setCode: React.Dispatch<React.SetStateAction<string>>
	loading: boolean
	onSave: () => void
	disabled: boolean
	saveRef: React.MutableRefObject<HTMLButtonElement | null>
	editorRef: React.MutableRefObject<Parameters<OnMount>[0] | null>
}>({
	code: '',
	setCode: () => {},
	loading: false,
	onSave: () => {},
	disabled: false,
	saveRef: { current: null },
	editorRef: { current: null },
})

export const useCode = () => {
	const value = useContext(codeContext)
	return value
}

export const CodeProvider: React.FC = props => {
	const [code, setCode] = useState(`
	console.log(123,'this is in iframe')
	console.log(1223,'this is in iframe')
	// import React from 'react'
	// const App=()=>{
	// 	return (<div>Hello World</div>)
	// }
	`)
	const [oldCode, setOldCode] = useState(code)
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const saveRef = useRef(null)
	const editorRef = useRef<Parameters<OnMount>[0] | null>(null)

	const onSave = () => {
		setOldCode(code)
		setLoading(true)
		setTimeout(() => setLoading(false), 5000)
		const formatted = Prettier.format(code || '', {
			parser: 'babel',
			plugins: [parser],
			useTabs: true,
			semi: false,
			singleQuote: true,
		}).replace(/\n$/, '')
		setCode(formatted)
		esbuild.transform(code, { loader: 'tsx' })
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
			value={{ code, setCode, loading, onSave, disabled, saveRef, editorRef }}
			{...props}
		/>
	)
}
