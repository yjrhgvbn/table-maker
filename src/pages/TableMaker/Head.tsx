import { Button, Stack } from '@mui/material'
import clsx from 'clsx'

export function Head() {
	return (
		<Stack
			className={clsx('my-4')}
			spacing={2}
			direction='row'
			justifyContent='space-between'
		>
			<div>123</div>
			<Stack spacing={2} direction='row'>
				<Button variant='contained'>导入</Button>
				<Button variant='contained'>新建</Button>
				<Button variant='outlined'>保存</Button>
			</Stack>
		</Stack>
	)
}
export default Head
