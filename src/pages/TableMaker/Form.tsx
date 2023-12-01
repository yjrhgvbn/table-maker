import { Box, TextField } from '@mui/material'
import useFormState from 'state/form'

export default function UseFormControl() {
	const [formItemConfigs] = useFormState(state => [state.formItemConfigs])
	const [formData, updateForm] = useFormState(state => [state.curForm, state.updateForm])

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
							key={key}
							id='outlined-required'
							label={label}
							defaultValue={formData[key!]}
							type={type}
							onChange={event => handelChange(key!, event.target.value)}
						/>
					)
				})}
		</Box>
	)
}
