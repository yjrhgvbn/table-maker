import { TextareaAutosize } from '@mui/material'

export default function MinHeightTextarea() {
	return <TextareaAutosize aria-label='minimum height' minRows={3} placeholder='Minimum 3 rows' />
}
