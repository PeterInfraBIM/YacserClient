import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ObjectListService} from '../object-list/object-list.service';
import {YacserObject, YacserSystemSlot} from '../types';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, OnChanges {
  @Input() modelId: string;
  @Input() canvasObjectIds: string[];
  objectMap: Map<string, YacserObject>;
  widgets: Map<string, Node>;
  context: Context;
  drawList: Shape[];

  constructor(private objectListService: ObjectListService) {
    this.objectMap = new Map<string, YacserObject>();
    this.widgets = new Map<string, Node>();
  }

  ngOnInit() {
    this.drawList = [];
    this.context = new Context(
      document.getElementById('cnvs') as HTMLCanvasElement, this.drawList, this.widgets, this.objectMap,
      0, 0, 1, 1, 0, 0);
    document.onmousemove = (event: MouseEvent) => {
      this.context.cursorX = (event.offsetX - this.context.windowX) / this.context.currentScale;
      this.context.cursorY = (event.offsetY - this.context.windowY) / this.context.currentScale;
    };
    this.drawTest();
    this.gameloop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.canvasObjectIds) {
      for (const object of this.objectListService.allObjects) {
        this.objectMap.set(object.id, object);
      }
    }
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
    let index = 0;
    for (const objectId of this.canvasObjectIds) {
      const object = this.objectMap.get(objectId);
      this.objectListService.setSelectedObject(object);
      this.objectListService.getSelectedObject$().subscribe((response) => this.objectMap.set(response.id, response));
      switch (object.type) {
        case 'SystemSlot':
          const node = new SystemSlotWidget(this.context, object.id, 100 + index * 10, 100 + index * 10, object.name);
          this.widgets.set(object.id, node);
          this.drawList.push(node);
          break;
        default:
          break;
      }
      index++;
    }
  }

}

export class Context {
  public ctx: CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement,
              public drawList: Shape[],
              public widgets: Map<string, Node>,
              public objectMap: Map<string, YacserObject>,
              public windowX: number,
              public windowY: number,
              public currentScale: number,
              public zIndex: number,
              public cursorX: number,
              public cursorY: number
  ) {
    this
      .ctx = this.canvas.getContext('2d');
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
  constructor(
    protected context: Context,
    private label: string,
    public startNode: Node,
    public endNode: Node,
    private fontSize: number = 10) {
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
  public id: string;
  protected label: string;
  protected fontSize: number;
  protected down: boolean;
  protected anchorX: number;
  protected anchorY: number;

  protected constructor(protected context: Context, id: string) {
    super();
    this.id = id;
    this.context.widgets.set(id, this);
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

  getAssembly = () => {
    const object = this.context.objectMap.get(this.id);
    let assembly = null;
    switch (object.type) {
      case 'SystemSlot':
        assembly = (this.context.objectMap.get(this.id) as YacserSystemSlot).assembly;
        break;
      default:
        break;
    }
    if (assembly) {
      if (this.context.widgets.get(assembly.id)) {
        this.context.drawList.push(new Edge(this.context, 'assembly', this, this.context.widgets.get(assembly.id)));
      } else {
        let widget = null;
        switch (object.type) {
          case 'SystemSlot':
            widget = new SystemSlotWidget(this.context, assembly.id, this.x + 100, this.y + 100, assembly.name);
            break;
          default:
            break;
        }
        this.context.drawList.push(new Edge(this.context, 'assembly', this, widget));
        this.context.drawList.push(widget);
      }
    }
    const dropDown = document.getElementById('dropdown');
    dropDown.classList.toggle('show');
  }
}

export class SystemSlotWidget extends Node {
  constructor(context: Context, id: string, x: number, y: number, label: string) {
    super(context, id);
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
      this.clearMenu(dropDown);
      this.addMenuItem(dropDown, 'assembly', this.getAssembly, true);
      dropDown.classList.toggle('show');
    }
  }
}
