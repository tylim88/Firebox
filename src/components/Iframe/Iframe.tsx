import React, { useRef, useState, useEffect } from 'react'
import { useCode } from 'hooks'
import { Console as ConsoleR, Hook, Unhook } from 'console-feed'
import { Grid, Switch, Box } from '@mantine/core'

export const Iframe: React.FC = () => {
	const { code } = useCode()
	const ref = useRef(null)
	const [logs, setLogs] = useState<unknown[]>([])
	const [checked, setChecked] = useState(true)
	// @ts-expect-error
	useEffect(() => {
		// ! this is not truly complete, as it does not capture the error logs from the iframe
		// https://github.com/samdenty/console-feed/issues/49
		// @ts-expect-error
		const iWindow = ref?.current?.contentWindow
		Hook(
			iWindow.console,
			log => {
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
            console.log(123,'this is in iframe')
			console.log(1223,'this is in iframe)
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
			}}
			grow
		>
			<Grid.Col span={checked ? 6 : 11} style={{ overflow: 'auto' }}>
				<iframe
					ref={ref}
					style={{ height: '100%', width: '100%' }}
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
				style={{ overflow: 'auto', backgroundColor: '#242424' }}
			>
				<Box mr='15px' style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Switch
						styles={{
							label: { color: 'white' },
						}}
						label='console'
						checked={checked}
						onChange={event => setChecked(event.currentTarget.checked)}
					/>
					;
				</Box>
			</Grid.Col>
			<Grid.Col
				span={checked ? 5 : 0}
				style={{ overflow: 'auto', backgroundColor: '#242424' }}
			>
				<ConsoleR
					styles={{ width: '100%', height: '100%' }}
					// @ts-expect-error
					logs={logs}
					variant='dark'
				/>
			</Grid.Col>
		</Grid>
	)
}
