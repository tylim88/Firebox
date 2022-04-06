import React, {
	useContext,
	createContext,
	useState,
	useEffect,
	useRef,
} from 'react'
import esbuild from 'esbuild-wasm'
const codeContext = createContext<{
	code: string
	setCode: React.Dispatch<React.SetStateAction<string>>
	loading: boolean
	onSave: () => void
	disabled: boolean
	saveRef: React.MutableRefObject<HTMLButtonElement | null>
}>({
	code: '',
	setCode: () => {},
	loading: false,
	onSave: () => {},
	disabled: false,
	saveRef: { current: null },
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
	const saveRef = useRef(null)

	const onSave = () => {
		setOldCode(code)
		setLoading(true)
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
			value={{ code, setCode, loading, onSave, disabled, saveRef }}
			{...props}
		/>
	)
}
