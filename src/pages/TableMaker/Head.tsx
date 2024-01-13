import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import { Badge, Button, Input, Stack, Tab, Tabs } from '@mui/material'
import { styled } from '@mui/material/styles'
import clsx from 'clsx'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { changePlugin, useStore } from 'state'
import loadLocalScript from 'utils/load'
import { ImportModal } from './ImportModal'

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1
})
export function Head() {
	const [creteNewList, saveToList] = useStore(state => [state.create, state.save])
	const [pluginList] = useStore(state => [state.pluginList])
	const [currentPluginKey, isToSave] = useStore(state => [state.curPluginKey, state.isDiffWithList])
	const [currentListName, updateName] = useStore(state => [state.curListName, state.updateName])
	const [openImport, setOpenImport] = useState(false)
	const [updateData] = useStore(state => [state.updateData])
	useHotkeys('mod+s,ctrl+s', () => saveToList(), {
		preventDefault: true
	})

	const handelTabChange = (_: any, value: any) => {
		changePlugin(value)
	}
	const handleImport = (data: string) => {
		const result = ''
		if (result) {
			updateData(result)
		}
		setOpenImport(false)
	}
	const importLocalFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return
		loadLocalScript(file)
	}

	return (
		<>
			<Stack className={clsx('my-4')} spacing={2} direction='row' justifyContent='space-between'>
				<Tabs value={currentPluginKey} onChange={handelTabChange} aria-label='basic tabs example'>
					{pluginList.map(item => (
						<Tab key={item.key} label={item.name} id={item.key} value={item.key} />
					))}
				</Tabs>
				<Stack spacing={2} direction='row'>
					<Input placeholder='列表名' value={currentListName} onChange={event => updateName(event.target.value)} />

					<Button component='label' variant='contained' startIcon={<CloudUploadIcon />}>
						导入本地脚本
						<VisuallyHiddenInput type='file' onChange={importLocalFile} />
					</Button>

					<Button variant='contained' onClick={() => setOpenImport(!openImport)}>
						导入
					</Button>
					<Button variant='contained' onClick={creteNewList}>
						新建
					</Button>
					<Badge color='primary' variant='dot' invisible={!isToSave} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
						<Button variant='outlined' onClick={() => saveToList()}>
							保存
						</Button>
					</Badge>
				</Stack>
			</Stack>
			<ImportModal open={openImport} handleClose={() => setOpenImport(false)} handleImport={handleImport} />
		</>
	)
}
export default Head
