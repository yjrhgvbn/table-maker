import { Delete as DeleteIcon } from '@mui/icons-material'
import { Button, Chip, IconButton, Tooltip } from '@mui/material'
import type { MRT_Cell, MRT_Column, MRT_ColumnDef } from 'material-react-table'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { useCallback, useMemo } from 'react'
import { ColumnConfig, ColumnConfigType, DsField } from 'state/interface'

interface DsTableProperties {
	columnConfigs: ColumnConfig[]
	data: DsField[]
	/** the table row will no render when key value unchanged, so adding a key prefix allows the row to be re-rendered. */
	keyPrefix?: string
	onChange?: (data: DsField[]) => void
}

export function DsTable(properties: DsTableProperties) {
	const { columnConfigs = [], data, keyPrefix, onChange } = properties
	const handleSaveCell = useCallback(
		(cell: MRT_Cell<DsField>, value: string | boolean) => {
			const newData = [...data]
			newData[cell.row.index][cell.column.id] = value
			onChange?.(newData)
		},
		[data, onChange]
	)
	const createNewData = useCallback(() => {
		const result = {
			// 随机生成一个id
			id: Math.random().toString(36).slice(2)
		}
		const typeDeafultValueMap = {
			[ColumnConfigType.String]: '',
			[ColumnConfigType.Switch]: 0,
			[ColumnConfigType.Select]: ''
		}
		for (const { key, type } of columnConfigs) {
			if (key in result) {
				const value = typeDeafultValueMap[type || ColumnConfigType.String]
				result[key] = value
			}
		}
		return result
	}, [columnConfigs])
	const renderChip = useMemo(() => {
		const render = ({ column, cell }: { cell: MRT_Cell<DsField>; column: MRT_Column<DsField> }) => (
			<Chip
				color={cell.getValue() ? 'primary' : 'default'}
				onClick={() => {
					handleSaveCell(cell, !cell.getValue())
				}}
				label={column.columnDef.id}
			/>
		)
		return render
	}, [handleSaveCell])
	const columns = useMemo<MRT_ColumnDef<DsField>[]>(
		() =>
			columnConfigs.map<MRT_ColumnDef<DsField>>(column => {
				const columnType = column.type || ColumnConfigType.String
				if (columnType === ColumnConfigType.Select) {
					return {
						accessorKey: column.key,
						header: column.header,
						editVariant: 'select',
						mantineEditSelectProps: ({ cell }) => ({
							data: (column.options || []) as string[],
							onChange: value => {
								handleSaveCell(cell, value as string)
							}
						})
					}
				}
				if (columnType === ColumnConfigType.Switch) {
					return {
						accessorKey: column.key,
						header: column.header,
						Edit: renderChip
					}
				}
				return {
					accessorKey: column.key,
					header: column.header,
					muiEditTextFieldProps: ({ cell }) => ({
						type: 'string',
						onBlur: event => {
							handleSaveCell(cell, event.target.value)
						},
						onFocus: event => {
							const target = event.target as HTMLInputElement | null
							target?.select()
						}
					})
				}
			}),
		[handleSaveCell, columnConfigs, renderChip]
	)

	const table = useMaterialReactTable({
		columns,
		data,
		createDisplayMode: 'row', // ('modal', and 'custom' are also available)
		editDisplayMode: 'table', // ('modal', 'row', 'cell', and 'custom' are also available)
		enableEditing: true,
		enableRowActions: true,
		positionActionsColumn: 'first',

		getRowId: row => (keyPrefix || '') + row.id,
		// mantineTableContainerProps: {
		//   sx: {
		//     minHeight: "500px",
		//   },
		// },
		renderRowActions: ({ row }) => (
			<Tooltip title='Delete'>
				<IconButton
					aria-label='delete'
					onClick={() => {
						const newData = [...data]
						newData.splice(row.index, 1)
						onChange?.(newData)
					}}
				>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		),
		// renderBottomToolbarCustomActions: () => <Button>Save</Button>,
		enableBottomToolbar: false,
		renderTopToolbarCustomActions: () => (
			<Button
				onClick={() => {
					onChange?.([...data, createNewData()])
				}}
			>
				Create
			</Button>
		),
		state: {}
	})
	return <MaterialReactTable table={table} />
}

export default DsTable
