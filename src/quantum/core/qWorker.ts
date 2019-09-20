import { workerDiffCode } from "./workers";

const resolves: any = {};
const rejects:any = {};
let globalMsgId = 0;
window.URL = window.URL || (window as any).webkitURL;
// Activate calculation in the worker, returning a promise
function sendMsg(payload: any, worker: Worker){
  const msgId = globalMsgId++
  const msg = {
    id: msgId,
    payload
  }
  return new Promise(function (resolve, reject) {
    // save callbacks for later
    resolves[msgId] = resolve;
    rejects[msgId] = reject;
    worker.postMessage(JSON.parse(JSON.stringify(msg)))
  }) 
}
// Handle incoming calculation result
function handleMsg(msg:any) {
  const {id, err, payload} = msg.data
  if (payload) {
    const resolve = resolves[id]
    if (resolve) {
      resolve(payload)
    }
  } else {
    const reject = rejects[id]
    if (reject) {
        if (err) {
          reject(err)
        } else {
          reject('Got nothing')
        }
    }
  }
  
  // purge used callbacks
  delete resolves[id]
  delete rejects[id]
}
// Wrapper class
class qWorker {
    private worker: Worker;
    constructor() {
      const blb = new Blob([workerDiffCode], {type: 'application/javascript'});
      this.worker = new Worker(window.URL.createObjectURL(blb))
      this.worker.onmessage = handleMsg
    }
  
    call(str: any) {
      return sendMsg(str, this.worker);
    }
}
export default qWorker