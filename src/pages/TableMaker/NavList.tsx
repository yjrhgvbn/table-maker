import { Delete as DeleteIcon } from '@mui/icons-material'
import { IconButton, ListItemButton } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { changeList, useStore } from 'state'

export function NavList() {
	const [list, deleteList] = useStore(state => [state.list, state.delete])
	const currentListKey = useStore(state => state.curListKey)
	return (
		<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			{list.map(item => {
				const { name = '(empty name)', key } = item
				return (
					<ListItem
						sx={{ minWidth: 250 }}
						key={key}
						secondaryAction={
							<IconButton edge='end' aria-label='delete' onClick={() => deleteList(key)}>
								<DeleteIcon />
							</IconButton>
						}
						disablePadding
					>
						<ListItemButton onClick={() => changeList(key)} dense selected={key === currentListKey}>
							<ListItemText id={key} primary={name} />
						</ListItemButton>
					</ListItem>
				)
			})}
		</List>
	)
}

export default NavList
