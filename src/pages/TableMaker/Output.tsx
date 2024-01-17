import { ContentCopyRounded, LibraryAddCheck } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import 'plugin'
import { useCallback, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useStore } from 'state'
import { useWorkerMessage } from 'utils/use'

export function Output() {
	const data = useStore(state => state.tableData)
	const formData = useStore(state => state.curForm)
	const currentPluginKey = useStore(state => state.curPluginKey) || ''
	const { data: parseOutput } = useWorkerMessage('parseOutput', {
		pluginKey: currentPluginKey,
		params: [data, formData]
	})
	const [copiedTimer, setCopiedTimer] = useState<null | number>(null)
	const [enabled, setEnabled] = useState(false)

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(parseOutput).then(() => {
			if (copiedTimer) clearTimeout(copiedTimer)
			const newCopiedTimer = setTimeout(() => {
				setCopiedTimer(null)
			}, 2000) as unknown as number
			setCopiedTimer(newCopiedTimer)
		})
	}, [parseOutput, copiedTimer])

	useHotkeys('mod+c,ctrl+c', () => handleCopy(), {
		enabled
	})

	const elementReference = useRef(null)
	const handleMouseEnter = () => {
		setEnabled(true)
	}

	const handleMouseLeave = () => {
		setEnabled(false)
	}

	return (
		<Card variant='outlined' sx={{ width: '100%', position: 'relative' }}>
			<div ref={elementReference} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<div className='absolute right-2 top-2'>
					<IconButton aria-label='copy' size='small' onClick={handleCopy}>
						{copiedTimer ? <LibraryAddCheck fontSize='inherit' /> : <ContentCopyRounded fontSize='inherit' />}
					</IconButton>
				</div>
				<Typography variant='subtitle1' gutterBottom className='min-h-[10rem] whitespace-pre-wrap'>
					{parseOutput}
				</Typography>
			</div>
		</Card>
	)
}
export default Output
