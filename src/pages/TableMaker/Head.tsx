import { Button, Input, Stack, Tab, Tabs } from '@mui/material'
import clsx from 'clsx'
import { useHotkeys } from 'react-hotkeys-hook'
import { changePlugin, useStore } from 'state'

export function Head() {
	const [creteNewList, saveToList] = useStore(state => [state.create, state.save])
	const [pluginList] = useStore(state => [state.pluginList])
	const [currentPluginKey, isToSave] = useStore(state => [state.curPluginKey, state.isToSave])
	const [currentListName, updateName] = useStore(state => [state.curListName, state.updateName])
	useHotkeys('mod+s,ctrl+s', () => saveToList(), {
		preventDefault: true
	})

	const handelTabChange = (_: any, value: any) => {
		changePlugin(value)
	}

	return (
		<Stack className={clsx('my-4')} spacing={2} direction='row' justifyContent='space-between'>
			<Tabs value={currentPluginKey} onChange={handelTabChange} aria-label='basic tabs example'>
				{pluginList.map(item => (
					<Tab key={item.key} label={item.name} id={item.key} value={item.key} />
				))}
			</Tabs>
			<Stack spacing={2} direction='row'>
				<Input placeholder='列表名' value={currentListName} onChange={event => updateName(event.target.value)} />
				<Button variant='contained'>导入</Button>
				<Button variant='contained' onClick={creteNewList}>
					新建
				</Button>
				<Button variant='outlined' onClick={() => saveToList()}>
					保存
					{isToSave && '*'}
				</Button>
			</Stack>
		</Stack>
	)
}
export default Head
