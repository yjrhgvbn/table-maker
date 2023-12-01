import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { globalPluginCore } from 'plugin'
import { useEffect, useState, useTransition } from 'react'
import useFormState from 'state/form'
import useDsState from 'state/table'

export default function BasicCard() {
	const [, startTransition] = useTransition()
	const data = useDsState(state => state.data)
	const formData = useFormState(state => state.curForm)
	const [output, setOutput] = useState('')
	useEffect(() => {
		startTransition(() => {
			const responseOutput = globalPluginCore.exec('parseOutput', data, formData) || ''
			setOutput(responseOutput)
		})
	}, [data, formData])
	return (
		<Card variant='outlined' sx={{ width: '100%' }}>
			<Typography variant='body2'>{output}</Typography>
		</Card>
	)
}
