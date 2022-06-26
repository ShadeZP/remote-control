import { Transform } from "stream";
import { controller } from './controller'

export const mediator = new Transform({
  transform(this, chunk, encoding, callback) {
    const [command, arg1, arg2] = chunk.toString().trim().split(' ');
    console.log(`get command ${command}`);

    controller(command, arg1, arg2)
      .then((data) => {
        console.log(`command ${data} success`);

        callback(null, data)
      })
      .catch((error) => {
        console.log(`command ${command} fail`);

        callback(error);
      })
  },

  read() {

  }
})
