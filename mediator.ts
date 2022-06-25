import { Transform } from "stream";
import { controller } from './controller'

export const mediator = new Transform({
  transform(this, chunk, encoding, callback) {
    const [command, arg1, arg2] = chunk.toString().trim().split(' ');
    console.log(command, arg1, arg2);
    const answ = controller(command, arg1, arg2);
    callback(null, answ);
  },

  read() {

  }
})
