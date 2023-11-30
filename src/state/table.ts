import type { ColumnConfig, DsField } from "components/table";
import _ from "lodash";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { columnConfigs } from "./config";
import type { ExtraParams as ExtraParameters, RegisterConfig } from "./temp";
import { getRegisterList } from "./temp";

interface DsState {
  data: DsField[];
  activeTab: string;
  columnConfigs: ColumnConfig[];
  extraParams: Record<string, ExtraParameters>;
  updateData: (data: DsField[]) => void;
  updateActiveTab: (activeTab: string) => void;
  extendColumnConfigs: (columns: ColumnConfig[]) => void;
  updateExtraParam: (formKey: string, filedKey: string, value: string) => void;
}

const registerList = getRegisterList();
const registerConfigMap = registerList.reduce<Record<string, RegisterConfig | undefined>>((accumulator, current) => {
  accumulator[current.name] = current.config;
  return accumulator;
}, {});
const extraParametersInit = registerList.reduce<Record<string, ExtraParameters>>((accumulator, current) => {
  accumulator[current.name] = current.config?.extraParams || {};
  return accumulator;
}, {});

export const useDsState = create(
  persist<DsState>(
    (set, get) => ({
      data: [],
      activeTab: registerList[0].name || "",
      columnConfigs: [...columnConfigs, ...(registerList[0].config?.extraColumns || [])],
      extraParams: extraParametersInit,
      updateData: (data: DsField[]) => {
        set({ data });
      },
      updateActiveTab: (activeTab: string) => {
        const extraColumns = registerConfigMap[activeTab]?.extraColumns || [];
        set({ activeTab, columnConfigs: [...columnConfigs, ...extraColumns] });
      },
      extendColumnConfigs: (extraColumns: ColumnConfig[]) => {
        set({ columnConfigs: [...columnConfigs, ...extraColumns] });
      },
      updateExtraParam: (formKey: string, filedKey: string, value: string) => {
        const { extraParams } = get();
        const extraParameter = extraParams[formKey];
        extraParams[formKey] = {
          ...extraParameter,
          [filedKey]: value,
        };
        set({ extraParams });
      },
    }),
    {
      name: "table-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // merge: (persistedState:DsState | null, currentState:DsState) => {

      //   return { ...currentState, ...persistedState };
      // },
    },
  ),
);

export interface DsListState {
  templabel: string;
  activeIndex: number;
  list: {
    key: string;
    label: string;
    data: DsField[];
    extraParams: Record<string, ExtraParameters>;
  }[];
  create: () => void;
  update: () => void;
  remove: (key: string) => void;
  changeActiveIndex: (key: string) => void;
  setTemlabel: (label: string) => void;
}

export const useDsListState = create(
  persist<DsListState>(
    (set, get) => ({
      templabel: "",
      activeIndex: -1,
      list: [],
      create: () => {
        const data = _.cloneDeep(useDsState.getState().data);
        const extraParameters = _.cloneDeep(useDsState.getState().extraParams);
        const label = get().templabel;
        set({ list: [...get().list, { label, key: Math.random().toString(36).slice(2), data, extraParams: extraParameters }] });
      },
      update: () => {
        const data = _.cloneDeep(useDsState.getState().data);
        const { list } = get();
        const index = get().activeIndex;
        if (index === -1) return;
        list[index].data = data;
        list[index].extraParams = _.cloneDeep(useDsState.getState().extraParams);
        list[index].label = get().templabel;
        set({ list });
      },
      remove: (key: string) => {
        const { list } = get();
        const index = list.findIndex((item) => item.key === key);
        if (index === -1) return;
        list.splice(index, 1);
        set({ list, activeIndex: -1 });
      },
      changeActiveIndex: (key: string) => {
        const { list } = get();
        const activeIndex = list.findIndex((item) => item.key === key);
        set({ activeIndex, templabel: list[activeIndex].label });
        if (activeIndex === -1) return;
        // useDsState.getState().updateData(_.cloneDeep(get().list[activeIndex].data));
        useDsState.setState({
          data: _.cloneDeep(get().list[activeIndex].data),
          extraParams: _.cloneDeep(get().list[activeIndex].extraParams),
        });
      },
      setTemlabel: (label: string) => {
        set({ templabel: label });
      },
    }),
    {
      name: "table-list-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
