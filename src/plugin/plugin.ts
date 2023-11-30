import {globalPluginCore} from './core'

class Plugin{
  create(config:PluginConfig){
    globalPluginCore.add(config)

  }

}