import { Button, Input, Stack, Tab, Tabs } from '@mui/material'
import clsx from 'clsx'
import { changePlugin, useCheckState, useListState } from 'state'
import usePluginState from 'state/plugin'

export function Head() {
	const [creteNewList, saveToList] = useListState(state => [state.create, state.save])
	const [pluginList] = usePluginState(state => [state.pluginList])
	const currentPluginKey = useCheckState(state => state.curPluginKey)
	const [currentListName, updateName] = useCheckState(state => [state.curListName, state.updateName])

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
				</Button>
			</Stack>
		</Stack>
	)
}
export default Head
