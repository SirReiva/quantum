import { workerDiffCode } from "./workers";
import { CREATE, UPDATE, REPLACE } from './vDomActions';

const resolves: any = {};
const rejects:any = {};
let fns:any = {};
let globalMsgId = 0;
window.URL = window.URL || (window as any).webkitURL;

function undoReplacer(obj, fs, treeMode = false) {
  if(treeMode) {
    for (const kProp in obj.props) {
      if (fs[obj.props[kProp]]) {
        obj.props[kProp] = fs[obj.props[kProp]];
        delete fs[obj.props[kProp]];
      }
    }
    if (obj.children && obj.children.length) {
      for (let i = 0; i < obj.children.length; i++)
        undoReplacer(obj.children[i], fs, true);
    }
    return;
  }

  if (obj.type === CREATE || obj.type === REPLACE ) {
    for (const kProp in obj.newNode.props) {
      if (fs[obj.newNode.props[kProp]]) {
        obj.newNode.props[kProp] = fs[obj.newNode.props[kProp]];
        delete fs[obj.newNode.props[kProp]];
      }
    }
    if (obj.newNode.children && obj.newNode.children.length) {
      for (let i = 0; i < obj.newNode.children.length; i++)
        undoReplacer(obj.newNode.children[i], fs, true);
    }
  } else if(obj.type === UPDATE) {
    for (const kProp in obj.props) {
      if (fs[obj.props[kProp].value]) {
        obj.props[kProp].value = fs[obj.props[kProp].value];
        if (obj.props[kProp].prevVal) {
          obj.props[kProp].prevVal = fs[obj.props[kProp].prevVal];
          delete fs[obj.props[kProp].prevVal];
        }
        delete fs[obj.props[kProp].value];
      } 
    }
    if (obj.children && obj.children.length) {
      for (let i = 0; i < obj.children.length; i++)
        undoReplacer(obj.children[i], fs);
    }
  }
  
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function sendMsg(payload: any, worker: Worker) {
  let uuidsFn = [];
  function replacer(key, value) {
    if (typeof value === 'function') {
      const id = uuidv4();
      uuidsFn[id] = value;
      return id;
    }
    return value;
  }
  const msgId = globalMsgId++;
  const msg = {
    id: msgId,
    payload
  };
  return new Promise(function (resolve, reject) {
    resolves[msgId] = resolve;
    rejects[msgId] = reject;
    //console.time("diff" + msgId);
    worker.postMessage(JSON.parse(JSON.stringify(msg, replacer)));
    fns[msgId] = uuidsFn;
  });
}

function handleMsg(msg:any) {
  const {id, err, payload} = msg.data;
  if (payload) {
    const resolve = resolves[id];
    if (resolve) {
      undoReplacer(payload, fns[id]);
      //console.timeEnd("diff" + id);
      resolve(payload);
    }
  } else {
    const reject = rejects[id];
    if (reject) {
        if (err) {
          reject(err);
        } else {
          reject('Got nothing');
        }
    }
  }
  delete resolves[id];
  delete rejects[id];
  delete fns[id];
}

class qWorker {
    private worker: Worker;
    constructor() {
      const blb = new Blob([workerDiffCode], {type: 'application/javascript'});
      this.worker = new Worker(window.URL.createObjectURL(blb));
      this.worker.onmessage = handleMsg;
    }
  
    call(str: any) {
      return sendMsg(str, this.worker);
    }
}
export default qWorker;