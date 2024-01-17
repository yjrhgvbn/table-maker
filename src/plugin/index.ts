import { MessageManager } from './worker/messageManager'
import './worker/plugin'
import MyWorker from './worker?worker'

export * from '../../plugin/interface'
export * from './worker/plugin'

export const messageManager = new MessageManager(new MyWorker())
export default messageManager
