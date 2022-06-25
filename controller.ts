import { Commands } from './models';
import {
  moveMouseDown,
  moveMouseLeft,
  moveMouseRight,
  moveMouseUp,
  getMousePosition,
  drawCircle,
  drawRectangle,
} from './utils'

export function controller(command: string, arg1?: string, arg2?: string): string {
  switch (command) {
    case Commands.mouseUp:
      return moveMouseUp(arg1);
    case Commands.mouseDown:
      return moveMouseDown(arg1);
    case Commands.mouseRight:
      return moveMouseRight(arg1);
    case Commands.mouseLeft:
      return moveMouseLeft(arg1);
    case Commands.mousePosition:
      return getMousePosition();
    case Commands.drawCircle:
      return drawCircle(Number(arg1));
    case Commands.drawRectangle:
      return drawRectangle(Number(arg1), Number(arg2));
    case Commands.drawSquare:
      return drawRectangle(Number(arg1), Number(arg1));
  }
}