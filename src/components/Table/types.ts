export enum FieldType {
  String = "string",
  Number = "number",
  Boolean = "boolean",
  Date = "date",
  DateTime = "datetime",
  Time = "time",
  Lov = "lov",
  LovView = "lovView",
}

export type DsFieldExtend = Record<string, boolean | string | undefined>;

// ColumnConfigType 映射string或者boolean
type ColumnConfigTypeMap<T extends ColumnConfigType> =
  T extends ColumnConfigType.String ? string : boolean;

export type DsField<
  K extends string = string,
  T extends ColumnConfigType = ColumnConfigType,
> = {
  /** 扩展 */
  [KEy in K]?: ColumnConfigTypeMap<T>;
} & {
  id: string;
  /** 字段名称 */
  fileName: string;
  /** 字段 */
  field: string;
  /** 字段类型 */
  type: FieldType;
  /** 字段是否必填 */
  required?: boolean;
  /** 字段值集 */
  valueSet?: string;
};

export enum ColumnConfigType {
  String = "string",
  Select = "select",
  Switch = "switch",
}

export interface ColumnConfig<
  K extends string = string,
  T extends ColumnConfigType = ColumnConfigType,
> {
  accessorKey: K;
  header: string;
  type?: T;
  options?: FieldType[];
}
