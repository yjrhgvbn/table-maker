// enum PluginType {
// }
interface PluginConfig {
  name?:string;
  key?: string;
  addColumn?:() => void,
  addFormItem?:() => void,
  parseOutput?:() => string,

}

class PluginCore {
  plugins: PluginConfig[] = [];

  exec() {

  }

  add(config: PluginConfig) {
    this.plugins.push(config);
  }
}
export const globalPluginCore = new PluginCore();
export default PluginCore;
