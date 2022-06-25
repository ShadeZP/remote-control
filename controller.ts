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
    case Commands.drawRectangle:
      return drawRectangle(Number(arg1), Number(arg2));
    case Commands.drawSquare:
      return drawRectangle(Number(arg1), Number(arg1));
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

function drawRectangle(offsetX: number, offsetY: number): string {
  const { x, y } = robot.getMousePos();
  const coords = {
    a: {
      x: x,
      y: y,
    },
    b: {
      x: x + offsetX,
      y: y,
    },
    c: {
      x: x + offsetX,
      y: y + offsetY,
    },
    d: {
      x: x,
      y: y + offsetY,
    }
  }

  robot.mouseToggle('down');

  drawLine(coords.a.x, coords.a.y, coords.b.x, coords.b.y);
  drawLine(coords.b.x, coords.b.y, coords.c.x, coords.c.y);
  drawLine(coords.c.x, coords.c.y, coords.d.x, coords.d.y);
  drawLine(coords.d.x, coords.d.y, coords.a.x, coords.a.y);

  robot.mouseToggle('up');


  return Commands.drawRectangle;
}

function drawLine(startX: number, startY: number, endX: number, endY: number): void {
  const lengthX = Math.abs(startX - endX);
  const lengthY = Math.abs(startY - endY);

  if (startX < endX) {
    for (let i = 0; i <= lengthX; i += 1) {
      const x = startX + i;
      const y = startY;

      robot.dragMouse(x, y);
    }
  } else if (startX > endX) {
    for (let i = 0; i <= lengthX; i += 1) {
      const x = startX - i;
      const y = startY;

      robot.dragMouse(x, y);
    }
  } else if (startY < endY) {
    for (let i = 0; i <= lengthY; i += 1) {
      const x = startX;
      const y = startY + i;

      robot.dragMouse(x, y);
    }
  } else {
    for (let i = 0; i <= lengthY; i += 1) {
      const x = startX;
      const y = startY - i;

      robot.dragMouse(x, y);
    }
  }

}