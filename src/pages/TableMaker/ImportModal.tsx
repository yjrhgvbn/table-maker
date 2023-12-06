import { Box, Button, Modal, Stack, TextareaAutosize } from '@mui/material'
import { useState } from 'react'

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4
}
interface ImportModalProperties {
	open: boolean
	handleClose: () => void
	handleImport: (data: string) => void
}
export function ImportModal(properties: ImportModalProperties) {
	const { open, handleClose, handleImport } = properties
	const [data, setData] = useState('')
	return (
		<Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
			<Box sx={style}>
				<TextareaAutosize
					aria-label='minimum height'
					minRows={10}
					placeholder='Minimum 3 rows'
					className='w-full'
					onChange={event => setData(event.target.value)}
				/>
				<Stack spacing={2} direction='row' justifyContent='flex-end' sx={{ marginTop: 2 }}>
					<Button variant='contained' onClick={handleClose}>
						取消
					</Button>
					<Button variant='contained' onClick={() => handleImport(data)}>
						确定
					</Button>
				</Stack>
			</Box>
		</Modal>
	)
}

export default ImportModal
