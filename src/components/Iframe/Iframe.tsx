import React, { useRef, useState, useEffect } from 'react'
import { useCode, useTheme } from 'hooks'
import { Console as ConsoleR, Hook, Unhook } from 'console-feed'
import { Grid, Switch, Box } from '@mantine/core'

export const Iframe: React.FC = () => {
	const { bundledCode, code } = useCode()
	const ref = useRef(null)
	const [logs, setLogs] = useState<unknown[]>([])
	const [checked, setChecked] = useState(true)
	const { backgroundColor, consoleFeed, consoleBg, fontColor } = useTheme()

	// @ts-expect-error
	useEffect(() => {
		// ! this is not truly complete, as it does not capture the error logs from the iframe
		// https://github.com/samdenty/console-feed/issues/49
		// @ts-expect-error
		const iWindow = ref?.current?.contentWindow
		Hook(
			iWindow.console,
			log => {
				console.log({ log })
				setLogs(currLogs => [...currLogs, log])
			},
			false
		)
		return () => Unhook(iWindow.console)
	}, [])

	const srcDoc = `
    <html>
        <body>
            <div id="root"></div>
        </body>
        <script>
		${code}
        </script>
    </html>
    `

	return (
		<Grid
			p='16px'
			style={{
				flexDirection: 'column',
				height: '100%',
				backgroundColor,
			}}
			columns={24}
			grow
		>
			<Grid.Col span={checked ? 13 : 2} style={{ overflow: 'auto' }}>
				<iframe
					ref={ref}
					style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
					srcDoc={srcDoc}
					title='sandbox'
					id='sandbox'
					// copy from codesandbox
					allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
					sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-pointer-lock'
				/>
			</Grid.Col>
			<Grid.Col
				span={1}
				style={{ overflow: 'auto', backgroundColor: consoleBg }}
			>
				<Box mr='15px' style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Switch
						styles={{
							label: { color: fontColor },
						}}
						label='console'
						checked={checked}
						onChange={event => setChecked(event.currentTarget.checked)}
					/>
				</Box>
			</Grid.Col>
			<Grid.Col
				span={checked ? 10 : 0}
				style={{ overflow: 'auto', backgroundColor: consoleBg }}
			>
				<ConsoleR
					styles={{ width: '100%', height: '100%' }}
					// @ts-expect-error
					logs={logs}
					variant={consoleFeed}
				/>
			</Grid.Col>
		</Grid>
	)
}
