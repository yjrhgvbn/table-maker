import { DsField, DsTable } from 'components/table'
import { useCheckState } from 'state'
import useTableState from 'state/table'

// import { useDsListState, useDsState } from "state/table";
// import { getRegisterList } from "./temp";

// const registerList = getRegisterList();import type { ColumnConfig } from "components/type";

// const columnConfigs: ColumnConfig[] = [
// 	{
// 		key: 'fileName',
// 		header: '字段名称'
// 	}
// ]

export function EditTable(): JSX.Element {
	const [data, setData] = useTableState(state => [state.data, state.updateData])
	const columnConfigs = useTableState(state => state.columnConfigs)
	const currentListKey = useCheckState(state => state.curListKey)
	// const [data, setData] = useDsState((state) => [state.data, state.updateData]);
	// const [extraParameters, setExtraParameter] = useDsState((state) => [state.extraParams, state.updateExtraParam]);
	// const [activeTab, setActiveTab] = useDsState((state) => [state.activeTab, state.updateActiveTab]);
	// const [columnConfigs] = useDsState((state) => [state.columnConfigs]);
	// const activeIndex = useDsListState((state) => state.activeIndex);

	const handleUpdate = (eventData: DsField[]) => {
		setData(eventData)
	}

	// const handleTableChange = (value: TabsValue) => {
	//   if (!value) return;
	//   setActiveTab(value);
	// };
	return (
		<div>
			<DsTable columnConfigs={columnConfigs} data={data} onChange={handleUpdate} keyPrefix={currentListKey} />
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
