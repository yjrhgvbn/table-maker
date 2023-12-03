import { Stack } from '@mui/material'
import clsx from 'clsx'
import { EditTable } from './EditTable'
import { Form } from './Form'
import { Head } from './Head'
import { NavList } from './NavList'
import { Output } from './Output'

export function TableMaker() {
	return (
		<Stack flexDirection='row'>
			<div>
				<NavList />
			</div>
			<div className={clsx('flex-1')}>
				<Head />
				<EditTable />
				<Stack flexDirection='row' gap={10} sx={{ marginTop: 10 }}>
					<Form />
					<Output />
				</Stack>
			</div>
		</Stack>
	)
}
export default TableMaker
