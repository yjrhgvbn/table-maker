import {
	ColumnConfig,
	ColumnConfigType,
	DsField,
	DsTable,
	FieldType
} from 'components/table'

// import { useDsListState, useDsState } from "state/table";
// import { getRegisterList } from "./temp";

// const registerList = getRegisterList();import type { ColumnConfig } from "components/type";

export const columnConfigs: ColumnConfig[] = [
	{
		accessorKey: 'fileName',
		header: '字段名称'
	},
	{
		accessorKey: 'field',
		header: '字段'
	},
	{
		accessorKey: 'type',
		header: '类型',
		type: ColumnConfigType.Select,
		options: Object.values(FieldType)
	},
	{
		accessorKey: 'required',
		header: '是否必输',
		type: ColumnConfigType.Switch
	}
]

export function EditTable(): JSX.Element {
	const data: DsField[] = [
		{
			id: '1',
			fileName: '文件名',
			type: FieldType.String,
			field: '字段',
			required: true
		}
	]
	// const [data, setData] = useDsState((state) => [state.data, state.updateData]);
	// const [extraParameters, setExtraParameter] = useDsState((state) => [state.extraParams, state.updateExtraParam]);
	// const [activeTab, setActiveTab] = useDsState((state) => [state.activeTab, state.updateActiveTab]);
	// const [columnConfigs] = useDsState((state) => [state.columnConfigs]);
	// const activeIndex = useDsListState((state) => state.activeIndex);

	const handleClick = (eventData: DsField[]) => {
		console.log(
			'🚀 ~ file: EditTable.tsx:42 ~ handleClick ~ eventData:',
			eventData
		)
		// setData(eventData);
	}

	// const handleTableChange = (value: TabsValue) => {
	//   if (!value) return;
	//   setActiveTab(value);
	// };
	return (
		<div>
			<DsTable
				columnConfigs={columnConfigs}
				data={data}
				onChange={handleClick}
			/>
		</div>
	)

	// const codeList = registerList.map((item) => item.fn(data, extraParameters[item.name]));
	// return (
	//   <main className="overflow-auto w-full pl-64">
	//     <Tabs defaultValue={activeTab} onTabChange={handleTableChange} variant="outline">
	//       <Tabs.List className=" text-lg">
	//         {registerList.map((item) => (
	//           <Tabs.Tab className=" text-lg" key={item.name} value={item.name}>
	//             {item.name}
	//           </Tabs.Tab>
	//         ))}
	//       </Tabs.List>
	//       <div className="my-4 over">
	//       </div>
	//       {registerList.map((item, index) => (
	//         <Tabs.Panel key={item.name} value={item.name}>
	//           <div className="flex min-h-[30rem]">
	//             <Card className="mr-3 min-w-[20rem]" withBorder>
	//               {Object.keys(extraParameters[item.name]).map((key) => (
	//                 <TextInput
	//                   key={key}
	//                   label={key}
	//                   onChange={(event) => {
	//                     setExtraParameter(item.name, key, event.currentTarget.value);
	//                   }}
	//                   value={extraParameters[item.name][key]}
	//                 />
	//               ))}
	//             </Card>

	//             <Card className="flex-1" withBorder>
	//               <div className="mb-4">
	//                 <CopyButton value={codeList[index]}>
	//                   {({ copied, copy }) => (
	//                     <Button className="bg-blue-500" color={copied ? "teal" : "blue"} onClick={copy}>
	//                       {copied ? "Copied" : "Copy"}
	//                     </Button>
	//                   )}
	//                 </CopyButton>
	//               </div>
	//               <Code block>{codeList[index]}</Code>
	//             </Card>
	//           </div>
	//         </Tabs.Panel>
	//       ))}
	//     </Tabs>
	//   </main>
	// );
}

export default EditTable
