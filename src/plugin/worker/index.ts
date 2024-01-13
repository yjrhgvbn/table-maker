import { MessageManager } from './messageManager'
import MyWorker from './worker?worker'

export const messageManager = new MessageManager(new MyWorker())
export default messageManager
