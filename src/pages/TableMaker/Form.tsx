import { Box, TextField } from '@mui/material'
import { useStore } from 'state'

export function Form() {
	const [formItemConfigs] = useStore(state => [state.formItemConfigs])
	const [formData, updateForm] = useStore(state => [state.curForm, state.updateCurrentPluginFormItem])
	const currentPluginKey = useStore(state => state.curPluginKey) || ''

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
export default Form
