import robot from 'robotjs';
import { Commands } from './models';
import Jimp from 'jimp';

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

function drawSquare(offset: number): string {
  drawRectangle(offset, offset);
  return Commands.drawSquare;
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

async function makeScreenshot(): Promise<string> {
  console.log('makeScreenshot')
  const { x, y } = robot.getMousePos();

  const robotScreenPic = robot.screen.capture(x - 100, y - 100, 200, 200);
  const image = new Jimp(robotScreenPic.width, robotScreenPic.height);

  for (let x = 0; x < 200; x++) {
    for (let y = 0; y < 200; y++) {
      // hex is a string, rrggbb format
      var hex = robotScreenPic.colorAt(x, y);
      // Jimp expects an Int, with RGBA data,
      // so add FF as 'full opaque' to RGB color
      var num = parseInt(hex + "ff", 16)
      // Set pixel manually
      image.setPixelColor(num, x, y);
    }
  }


  let base64 = await image.getBase64Async(Jimp.MIME_PNG);

  return `${Commands.prntScrn} ${base64.split(',')[1]}`;
}

export {
  drawCircle,
  drawRectangle,
  drawSquare,
  getMousePosition,
  moveMouseDown,
  moveMouseRight,
  moveMouseLeft,
  moveMouseUp,
  makeScreenshot,
}