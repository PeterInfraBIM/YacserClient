import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  context: Context;
  // canvas: HTMLCanvasElement;
  // ctx: CanvasRenderingContext2D;
  // windowX: number;
  // windowY: number;
  // currentScale: number;
  // zIndex: number;
  drawList: Shape[];

  constructor() {
  }

  ngOnInit() {
    this.context = new Context(
      document.getElementById('cnvs') as HTMLCanvasElement,
      0, 0, 1, 1, 0, 0);
    document.onmousemove = (event: MouseEvent) => {
      this.context.cursorX = (event.offsetX - this.context.windowX) / this.context.currentScale;
      this.context.cursorY = (event.offsetY - this.context.windowY) / this.context.currentScale;
    };
    this.drawList = [];
    // *********************************
    this.drawTest();
    // *********************************
    this.gameloop();
  }

  gameloop(): void {
    requestAnimationFrame(this.gameloop.bind(this));
    const ctx = this.context.ctx;
    const windowX = this.context.windowX;
    const windowY = this.context.windowY;
    const currentScale = this.context.currentScale;
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(-windowX, -windowY, 1600, 800);
    ctx.save();
    ctx.scale(currentScale, currentScale);
    this.draw();
    ctx.restore();
  }

  draw(): void {
    this.drawList.sort((a, b) => {
      return a.zIndex > b.zIndex ? 1 : -1;
    });
    for (const shape of this.drawList) {
      shape.draw();
    }
  }

  drawTest(): void {
    const node1 = new SystemSlotWidget(this.context, 100, 100, 'Zitvoorziening');
    this.drawList.push(node1);
    const node2 = new SystemSlotWidget(this.context, 300, 100, 'Fundatiesysteem');
    this.drawList.push(node2);
    this.drawList.push(new Edge(this.context, 'part', node1, node2));
  }

}

export class Context {
  public ctx: CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement,
              public windowX: number,
              public windowY: number,
              public currentScale: number,
              public zIndex: number,
              public cursorX: number,
              public cursorY: number) {
    this.ctx = this.canvas.getContext('2d');
  }
}

export abstract class Shape {
  public x: number;
  public y: number;
  protected width: number;
  protected height: number;
  public zIndex: number;
  protected color: string;
  protected lineWidth: number;

  protected constructor() {
  }

  public abstract draw(): void;

  clearMenu(menuElement: HTMLElement): void {
    let last = menuElement.lastChild;
    while (last = menuElement.lastChild) {
      menuElement.removeChild(last);
    }
  }

  addMenuItem(parentElement: HTMLElement, itemName: string, action: () => void, enabled: boolean = true): void {
    const childNode = document.createElement('A');
    const textNode = document.createTextNode(itemName);
    childNode.appendChild(textNode);
    if (enabled) {
      childNode.setAttribute('style', 'color: black; padding: 4px 4px 4px 4px; ' +
        'text-decoration: none; display: block; background-color: transparent; ');
      childNode.onmouseenter = (e: MouseEvent) => {
        childNode.setAttribute('style', 'color: black; padding: 4px 4px 4px 4px; ' +
          'text-decoration: none; display: block; background-color: #ddd');
      };
      childNode.onmouseleave = (e: MouseEvent) => {
        childNode.setAttribute('style', 'color: black; padding: 4px 4px 4px 4px; ' +
          'text-decoration: none; display: block; background-color: transparent');
      };
      childNode.onclick = action;
    } else {
      childNode.setAttribute('style', 'color: grey; padding: 4px 4px 4px 4px; ' +
        'text-decoration: none; display: block; background-color: transpar[link]nt; ');
    }
    parentElement.appendChild(childNode);
  }
}

export class Edge extends Shape {
  constructor(protected context: Context, private label: string, public startNode: Node, public endNode: Node, private fontSize: number = 10) {
    super();
    this.zIndex = 0;
  }

  draw(): void {
    const ctx = this.context.ctx;
    this.x = this.startNode.x + ((this.endNode.x - this.startNode.x) * 4 / 9);
    this.y = this.startNode.y + ((this.endNode.y - this.startNode.y) * 4 / 9);

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';
    ctx.moveTo(this.startNode.x, this.startNode.y);
    ctx.lineTo(this.endNode.x, this.endNode.y);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'LightGrey';
    ctx.font = this.fontSize + 'px Verdana';
    const halfTxtLength = ctx.measureText(this.label).width / 2 + 2;
    ctx.fillRect(this.x - halfTxtLength, this.y - 5, 2 * halfTxtLength, 10);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(this.label, this.x, this.y);
    ctx.restore();
  }
}

export abstract class Node extends Shape {
  protected static selectedNode;
  protected label: string;
  protected fontSize: number;
  protected down: boolean;
  protected anchorX: number;
  protected anchorY: number;

  protected constructor(protected context: Context) {
    super();
    this.zIndex = this.context.zIndex++;
    this.fontSize = 12;
    this.down = false;

    this.context.canvas.addEventListener('mousedown', (e) => {
      this.mouseDown(e);
    }, false);
    this.context.canvas.addEventListener('mouseup', (e) => {
      this.mouseUp(e);
    }, false);
  }

  isHit(event: MouseEvent): boolean {

    const x = (event.offsetX - this.context.windowX) / this.context.currentScale;
    const y = (event.offsetY - this.context.windowY) / this.context.currentScale;
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    return x > this.x - halfWidth
      && y > this.y - halfHeight
      && x < this.x + halfWidth
      && y < this.y + halfHeight;
  }

  mouseDown(event: MouseEvent): void {
    if (event.button === 2) {
      return;
    }
    if (this.isHit(event)) {
      console.log(this.label + ' mouseDown x=' + event.offsetX + ' y=' + event.offsetY);
      this.anchorX = event.offsetX - this.x + this.context.windowX / this.context.currentScale;
      this.anchorY = event.offsetY - this.y + this.context.windowY / this.context.currentScale;
      this.zIndex = this.context.zIndex++;
      if (Node.selectedNode) {
        if (Node.selectedNode !== this && this.zIndex > Node.selectedNode.zIndex) {
          Node.selectedNode = this;
        }
      } else {
        Node.selectedNode = this;
      }
      this.down = true;
    }
  }

  mouseUp(event: MouseEvent): void {
    if (event.button === 2) {
      return;
    }
    if (this.isHit(event)) {
      console.log(this.label + 'mouseUp x=' + event.offsetX + ' y=' + event.offsetY);
      this.down = false;
    }
  }

  public draw() {
    const ctx = this.context.ctx;
    if (this.down === true) {
      this.x = this.context.cursorX - this.anchorX;
      this.y = this.context.cursorY - this.anchorY;
    }

    ctx.save();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = this.color;
    if (this.down === true && this === Node.selectedNode) {
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(this.x + 2, this.y + 2, this.width / 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.font = this.fontSize + 'px Verdana';

    if (this.down === true && this === Node.selectedNode) {
      ctx.globalAlpha = 0.5;
      if (ctx.measureText(this.label).width < this.width) {
        ctx.fillText(this.label, this.x + 2, this.y + 2);
      } else {
        const firstPart = this.label.substring(0, this.label.length / 2);
        const secondPart = this.label.substring(this.label.length / 2);
        ctx.fillText(firstPart, this.x + 2, this.y - this.height / 8 + 2);
        ctx.fillText(secondPart, this.x + 2, this.y + this.height / 8 + 2);
      }
    } else {
      if (ctx.measureText(this.label).width < this.width) {
        ctx.fillText(this.label, this.x, this.y);
      } else {
        const firstPart = this.label.substring(0, this.label.length / 2);
        const secondPart = this.label.substring(this.label.length / 2);
        ctx.fillText(firstPart, this.x, this.y - this.height / 8);
        ctx.fillText(secondPart, this.x, this.y + this.height / 8);
      }
    }
    ctx.restore();
  }
}

export class SystemSlotWidget extends Node {
  constructor(context: Context, x: number, y: number, label: string) {
    super(context);
    this.x = x;
    this.y = y;
    this.width = 110;
    this.height = 110;
    this.label = label;
    this.color = 'LightBlue';
    this.context.canvas.addEventListener('contextmenu', (e) => {
      this.contextmenu(e);
    }, false);
  }

  public draw() {
    super.draw();
  }

  public contextmenu(event: MouseEvent): void {
    event.preventDefault();
    if (this.isHit(event)) {
      const dropDown = document.getElementById('dropdown');
      dropDown.style.left = this.x * this.context.currentScale + this.context.windowX + 'px';
      dropDown.style.top = this.y * this.context.currentScale + this.context.windowY + 'px';
 //     this.clearMenu(dropDown);
 //     this.addMenuItem(dropDown, 'assembly', null, false);
      dropDown.classList.toggle('show');
    }
  }
}
