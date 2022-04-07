import React, {
	useContext,
	createContext,
	useState,
	useEffect,
	useRef,
} from 'react'
import { OnMount } from '@monaco-editor/react'
import Prettier from 'prettier/standalone'
import parser from 'prettier/parser-babel'
import localForage from 'localforage'
import { initialize, bundle } from 'bundler'

const codeContext = createContext<{
	code: string
	bundledCode: string
	setCode: React.Dispatch<React.SetStateAction<string>>
	loading: boolean
	onSave: () => void
	disabled: boolean
	saveRef: React.MutableRefObject<HTMLButtonElement | null>
	editorRef: React.MutableRefObject<Parameters<OnMount>[0] | null>
	iframeRef: React.MutableRefObject<HTMLIFrameElement | null>
}>({
	code: '',
	bundledCode: '',
	setCode: () => {},
	loading: false,
	onSave: () => {},
	disabled: false,
	saveRef: { current: null },
	editorRef: { current: null },
	iframeRef: { current: null },
})

export const useCode = () => {
	const value = useContext(codeContext)
	return value
}

const defaultCode = `console.log(123,'this is in iframe')
console.log(1223,'this is in iframe')
// import React from 'react'
// const App=()=>{
// 	return (<div>Hello World</div>)
// }`

export const CodeProvider: React.FC = props => {
	const [code, setCode] = useState(defaultCode)
	const [bundledCode, setBundledCode] = useState('')
	const [oldCode, setOldCode] = useState(code)
	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)
	const saveRef = useRef(null)
	const iframeRef = useRef(null)
	const editorRef = useRef<Parameters<OnMount>[0] | null>(null)

	const onSave = async () => {
		localForage.setItem('code', code)
		setOldCode(code)
		setLoading(true)
		const formatted = Prettier.format(code || '', {
			parser: 'babel',
			plugins: [parser],
			useTabs: true,
			semi: false,
			singleQuote: true,
		}).replace(/\n$/, '')
		setCode(formatted)

		if (process.env.NODE_ENV === 'development') {
			setBundledCode(code)
		} else if (process.env.NODE_ENV === 'production') {
			const bundledCode = (await bundle(code)).outputFiles[0].text
			setBundledCode(bundledCode)
		}
		setLoading(false)
	}
	useEffect(() => {
		const load = async () => {
			setLoading(true)
			const data = await localForage.getItem<string>('code')
			await localForage.clear() // clear local storage cache
			if (data) {
				setCode(data)
				await localForage.setItem('code', data)
			}
			let bundledCode = ''
			if (process.env.NODE_ENV === 'development') {
				setBundledCode(data || defaultCode)
			} else if (process.env.NODE_ENV === 'production') {
				await initialize()
				bundledCode = (await bundle(data || defaultCode)).outputFiles[0].text
				setBundledCode(bundledCode)
			}
			setLoading(false)
		}
		load()
	}, [])
	useEffect(() => {
		if (code === oldCode) {
			setDisabled(true)
		} else {
			setDisabled(false)
		}
	}, [code, oldCode])

	return (
		<codeContext.Provider
			value={{
				code,
				setCode,
				loading,
				onSave,
				disabled,
				saveRef,
				editorRef,
				bundledCode,
				iframeRef,
			}}
			{...props}
		/>
	)
}
