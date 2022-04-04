import React from 'react'
import { useCode } from 'hooks'

export const Iframe = () => {
	const { code } = useCode()
	const srcDoc = `
    <html>
        <body>
            <div id="root"></div>
        </body>
        <script>
            console.log(123)
            ${code}
        </script>
    </html>
    `

	return (
		<iframe
			srcDoc={srcDoc}
			title='sandbox'
			id='sandbox'
			// copy from codesandbox
			allow='accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking'
			sandbox='allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads allow-pointer-lock'
		/>
	)
}
