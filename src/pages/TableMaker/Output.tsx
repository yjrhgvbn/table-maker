import { Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { globalPluginCore } from 'plugin'
import { useEffect, useState, useTransition } from 'react'
import useFormState from 'state/form'
import usePluginState from 'state/plugin'
import useTableState from 'state/table'

export default function BasicCard() {
	const [, startTransition] = useTransition()
	const data = useTableState(state => state.data)
	const formData = useFormState(state => state.curForm)
	const [output, setOutput] = useState('')
	const currentPluginKey = usePluginState(state => state.curPluginKey) || ''

	useEffect(() => {
		startTransition(() => {
			const responseOutput = globalPluginCore.exec('parseOutput', data, formData) || ''
			setOutput(responseOutput)
		})
	}, [data, formData, currentPluginKey])
	return (
		<Card variant='outlined' sx={{ width: '100%' }}>
			<Typography variant='subtitle1' gutterBottom className='whitespace-pre-wrap'>
				{output}
			</Typography>
		</Card>
	)
}
