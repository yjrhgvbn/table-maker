# table-maker

一个可以将数据转换为可编辑表格，并将表格数据格式输出工具

# 自定义插件

table-maker的数据转换都是建立在插件上的，你可以自定义自己的插件，你可以查看这个[demo](/plugin/demo.ts)

## 如何使用插件

1. 可以克隆该项目，在`plugin`目录下加入自己的插件，参考[demo](/plugin/demo.ts)，项目会自动导入`plugin`目录的插件

2. 将你文件编译成单个js文件，点击**导入本地插件**进行导入

# 运行

```shell
pnpm install

pnpm dev
```
