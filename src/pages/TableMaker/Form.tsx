import { Box, TextField } from '@mui/material'
import useFormState from 'state/form'
import usePluginState from 'state/plugin'

export default function UseFormControl() {
	const [formItemConfigs] = useFormState(state => [state.formItemConfigs])
	const [formData, updateForm] = useFormState(state => [state.curForm, state.updateCurrentPluginFormItem])
	const currentPluginKey = usePluginState(state => state.curPluginKey) || ''

	const handelChange = (key: string, value: string | undefined) => {
		updateForm(key, value || '')
	}

	return (
		<Box
			component='form'
			sx={{
				'& .MuiTextField-root': { m: 1, width: '25ch' }
			}}
			noValidate
			autoComplete='off'
		>
			{formItemConfigs
				.filter(config => !!config.key)
				.map(formItemConfig => {
					const { type, label, key } = formItemConfig
					return (
						<TextField
							key={currentPluginKey + key}
							id='outlined-required'
							label={label}
							type={type}
							value={formData[key!] || ''}
							onChange={event => handelChange(key!, event.target.value)}
						/>
					)
				})}
		</Box>
	)
}
