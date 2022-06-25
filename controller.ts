import robot from 'robotjs';

const enum Commands {
  mouseUp = 'mouse_up',
  mouseDown = 'mouse_down',
  mouseLeft = 'mouse_left',
  mouseRight = 'mouse_right',
  mousePosition = 'mouse_position',
  drawCircle = 'draw_circle',
  drawRectangle = 'draw_rectangle',
  drawSquare = 'draw_square',
  prntScrn = 'prnt_scrn',
}

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

  }
  return command;
}

function moveMouseUp(offset: string): string {
  const { x, y } = robot.getMousePos();

  robot.moveMouse(x, y - Number(offset));

  return Commands.mouseUp;
}

function moveMouseDown(offset: string): string {
  const { x, y } = robot.getMousePos();

  robot.moveMouse(x, y + Number(offset));

  return Commands.mouseDown;
}

function moveMouseRight(offset: string): string {
  const { x, y } = robot.getMousePos();

  robot.moveMouse(x + Number(offset), y);

  return Commands.mouseRight;
}

function moveMouseLeft(offset: string): string {
  const { x, y } = robot.getMousePos();

  robot.moveMouse(x - Number(offset), y);

  return Commands.mouseLeft;
}

function getMousePosition(): string {
  const { x, y } = robot.getMousePos();
  return `${Commands.mousePosition} {${x}px,${y}px}`
}

function drawCircle(radius: number): string {
  const { x, y } = robot.getMousePos();

  robot.moveMouse(x + radius, y);

  robot.mouseToggle('down');

  for (let i = 0; i <= Math.PI * 2; i += 0.02) {
    const currX = x + radius * Math.cos(i);
    const currY = y + radius * Math.sin(i);

    robot.dragMouse(currX, currY);
  }

  robot.mouseToggle('up');


  return Commands.drawCircle;
}