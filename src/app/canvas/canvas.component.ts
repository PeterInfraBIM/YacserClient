import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ObjectListService} from '../object-list/object-list.service';
import {
  YacserFunction, YacserHamburger,
  YacserObject,
  YacserObjectType, YacserPerformance, YacserPortRealisation, YacserRealisationModule, YacserRealisationPort,
  YacserRequirement,
  YacserSystemInterface,
  YacserSystemSlot
} from '../types';
import {ObjectDetailsComponent} from '../object-list/object-details/object-details.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {StateService} from '../state.service';

const minScale = .2;
const maxScale = 3;
const scaleIncrement = .1;

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

  constructor(
    private stateService: StateService,
    private objectListService: ObjectListService,
    private modal: NgbModal) {
  }

  ngOnInit() {
    this.stateService.canvasObjectIdsChanged.subscribe((canvasObjectIds) => {
      this.canvasObjectIds = canvasObjectIds;
      if (this.objectListService.allObjects) {
        for (const object of this.objectListService.allObjects) {
          this.stateService.objectMap.set(object.id, object);
        }
      }
      this.drawTest();
    });
    this.drawList = this.stateService.drawList;
    this.widgets = this.stateService.widgets;
    this.objectMap = this.stateService.objectMap;
    this.context = this.stateService.getContext();
    if (!this.context) {
      this.context = new Context(
        document.getElementById('cnvs') as HTMLCanvasElement, this.drawList, this.canvasObjectIds,
        this.widgets, this.objectMap, this.objectListService, this.modal,
        0, 0, 1, 1, 0, 0);
      this.stateService.setContext(this.context);
    }
    this.context.canvas = document.getElementById('cnvs') as HTMLCanvasElement;
    this.context.ctx = this.context.canvas.getContext('2d');
    this.context.ctx.translate(this.context.windowX, this.context.windowY);
    document.onmousemove = (event: MouseEvent) => {
      this.context.cursorX = (event.offsetX) / this.context.currentScale;
      this.context.cursorY = (event.offsetY) / this.context.currentScale;
    };
    document.onkeydown = (e) => {
      console.log(e.keyCode + 'down');
      switch (e.keyCode) {
        case 38:
          // up
          this.context.windowY -= 10;
          this.context.ctx.translate(0, -10);
          break;
        case 40:
          // down
          this.context.windowY += 10;
          this.context.ctx.translate(0, 10);
          break;
        case 37:
          // left
          this.context.windowX -= 10;
          this.context.ctx.translate(-10, 0);
          break;
        case 39:
          // right
          this.context.windowX += 10;
          this.context.ctx.translate(10, 0);
          break;
        case 109:
          // -
          this.context.currentScale -= scaleIncrement;
          if (this.context.currentScale < minScale) {
            this.context.currentScale = minScale;
          }
          console.log('zoom out: currentScale=' + this.context.currentScale);
          break;
        case 107:
          // +
          this.context.currentScale += scaleIncrement;
          if (this.context.currentScale > maxScale) {
            this.context.currentScale = maxScale;
          }
          console.log('zoom in: currentScale=' + this.context.currentScale);
          break;
      }
    };
    this.drawTest();
    this.gameloop();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.canvasObjectIds) {
      if (this.objectListService.allObjects) {
        for (const object of this.objectListService.allObjects) {
          this.stateService.objectMap.set(object.id, object);
        }
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
    console.log('drawList ' + this.drawList.length);
    const drawListCopy = this.drawList.slice();
    for (const widget of drawListCopy) {
      if (widget instanceof Node) {
        const node = widget as Node;
        if (!this.canvasObjectIds.includes(node.id)) {
          const widgetIndex = this.drawList.indexOf(node);
          console.log('index ' + widgetIndex);
          this.drawList.splice(widgetIndex, 1);
          this.widgets.delete(node.id);
        }
      }
    }
    let index = 0;
    for (const objectId of this.canvasObjectIds) {
      console.log('objectId ' + objectId);
      const object = this.objectMap.get(objectId);
      if (object) {
        console.log('object ' + object.type);
        let widget = this.widgets.get(object.id);
        console.log('widget ' + widget);
        if (!widget) {
          widget = WidgetFactory.createWidget(object.type, this.context, object.id, 100 + index * 10, 100 + index * 10, object.name);
          this.drawList.push(widget);
        } else {
          widget.init(object);
        }
      }
      index++;
    }
    for (const shape of this.drawList) {
      console.log('shape ' + shape.zIndex);
    }
  }
}

export class Context {
  public ctx: CanvasRenderingContext2D;

  constructor(public canvas: HTMLCanvasElement,
              public drawList: Shape[],
              public canvasObjectIds: string[],
              public widgets: Map<string, Node>,
              public objectMap: Map<string, YacserObject>,
              public objectListService: ObjectListService,
              public modal: NgbModal,
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

export class WidgetFactory {

  public static createWidget(type: string, context: Context, id: string, x: number, y: number, label: string): Node {
    if (!context.canvasObjectIds.includes(id)) {
      context.canvasObjectIds.push(id);
    }
    switch (YacserObjectType[type]) {
      case YacserObjectType.Function:
        return new FunctionWidget(context, id, x, y, label);
      case YacserObjectType.Hamburger:
        return new HamburgerWidget(context, id, x, y, label);
      case YacserObjectType.Performance:
        return new PerformanceWidget(context, id, x, y, label);
      case YacserObjectType.PortRealisation:
        return new PortRealisationWidget(context, id, x, y, label);
      case YacserObjectType.RealisationModule:
        return new RealisationModuleWidget(context, id, x, y, label);
      case YacserObjectType.RealisationPort:
        return new RealisationPortWidget(context, id, x, y, label);
      case YacserObjectType.Requirement:
        return new RequirementWidget(context, id, x, y, label);
      case YacserObjectType.SystemInterface:
        return new SystemInterfaceWidget(context, id, x, y, label);
      case YacserObjectType.SystemSlot:
        return new SystemSlotWidget(context, id, x, y, label);
      case YacserObjectType.Value:
        return new ValueWidget(context, id, x, y, label);
    }
  }

  public static isAlreadyRelated(context: Context, label: string, startNode: Node, endNode: Node): boolean {
    for (const shape of context.drawList) {
      if (shape instanceof Edge) {
        const edge = shape as Edge;
        if (edge.startNode === startNode && edge.endNode === endNode && edge.label === label) {
          return true;
        }
      }
    }
    return false;
  }

  public static exists(context: Context, id: string, relation: string): boolean {
    if (this.getRelatedObject(context, id, relation)) {
      return true;
    }
    if (this.getRelatedObjects(context, id, relation)) {
      return true;
    }
    return false;
  }

  public static getRelatedObject(context: Context, id: string, relation: string): YacserObject {
    const object = context.objectMap.get(id);
    if (object) {
      switch (YacserObjectType[object.type]) {
        case YacserObjectType.Function:
          return (object as YacserFunction)[relation];
        case YacserObjectType.Hamburger:
          return (object as YacserHamburger)[relation];
        case YacserObjectType.Performance:
          return (object as YacserPerformance)[relation];
        case YacserObjectType.PortRealisation:
          return (object as YacserPortRealisation)[relation];
        case YacserObjectType.RealisationModule:
          return (object as YacserRealisationModule)[relation];
        case YacserObjectType.RealisationPort:
          return (object as YacserRealisationPort)[relation];
        case YacserObjectType.Requirement:
          return (object as YacserRequirement)[relation];
        case YacserObjectType.SystemInterface:
          return (object as YacserSystemInterface)[relation];
        case YacserObjectType.SystemSlot:
          return (object as YacserSystemSlot)[relation];
        case YacserObjectType.Value:
          break;
      }
    }
    return null;
  }

  public static getRelatedObjects(context: Context, id: string, relation: string): YacserObject[] {
    const object = context.objectMap.get(id);
    if (object) {
      switch (YacserObjectType[object.type]) {
        case YacserObjectType.Function:
          return (object as YacserFunction)[relation];
        case YacserObjectType.Hamburger:
          return (object as YacserHamburger)[relation];
        case YacserObjectType.Performance:
          return (object as YacserPerformance)[relation];
        case YacserObjectType.PortRealisation:
          return (object as YacserPortRealisation)[relation];
        case YacserObjectType.RealisationModule:
          return (object as YacserRealisationModule)[relation];
        case YacserObjectType.RealisationPort:
          return (object as YacserRealisationPort)[relation];
        case YacserObjectType.Requirement:
          return (object as YacserRequirement)[relation];
        case YacserObjectType.SystemInterface:
          return (object as YacserSystemInterface)[relation];
        case YacserObjectType.SystemSlot:
          return (object as YacserSystemSlot)[relation];
        case YacserObjectType.Value:
          break;
      }
    }
    return null;
  }
}

export class Edge extends Shape {
  constructor(
    protected context: Context,
    public label: string,
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
    let object = this.context.objectMap.get(id);
    if (!object) {
      for (const yObj of this.context.objectListService.allObjects) {
        if (yObj.id === id) {
          object = yObj;
          this.context.objectMap.set(id, yObj);
        }
      }
    }
    this.context.widgets.set(id, this);
    this.zIndex = this.context.zIndex++;
    this.fontSize = 12;
    this.down = false;

    this.init(object);
  }

  init(object: YacserObject): void {
    this.context.canvas.addEventListener('mousedown', (e) => {
      this.mouseDown(e);
    }, false);
    this.context.canvas.addEventListener('mouseup', (e) => {
      this.mouseUp(e);
    }, false);
    this.context.canvas.addEventListener('dblclick', (e) => {
      this.dblClick(e);
    }, false);
    this.context.canvas.addEventListener('contextmenu', (e) => {
      this.contextmenu(e);
    }, false);
    this.context.objectListService.setSelectedObject(object);
    this.context.objectListService.getSelectedObject$()
      .subscribe((response) => this.context.objectMap.set(response.id, response));
  }

  abstract contextmenu(event: MouseEvent): void;

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
      const x = (event.offsetX - this.context.windowX) / this.context.currentScale;
      const y = (event.offsetY - this.context.windowY) / this.context.currentScale;
      this.anchorX = x - this.x + this.context.windowX / this.context.currentScale;
      this.anchorY = y - this.y + this.context.windowY / this.context.currentScale;
      console.log(this.label + ' mouseDown x=' + event.offsetX + ' y=' + event.offsetY);
      console.log(this.label + ' this.x=' + this.x + ' this.y=' + this.y);
      console.log(this.label + ' anchorX=' + this.anchorX + ' anchorY=' + this.anchorY);
      console.log(this.label + ' windowX=' + this.context.windowX + ' windowY=' + this.context.windowY);
      this.zIndex = this.context.zIndex++;
      if (Node.selectedNode) {
        if (Node.selectedNode !== this && this.zIndex > Node.selectedNode.zIndex) {
          Node.selectedNode = this;
        }
      } else {
        Node.selectedNode = this;
      }
      this.down = true;
      event.stopImmediatePropagation();
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

  dblClick(event: MouseEvent): void {
    if (this.isHit(event)) {
      const object = this.context.objectMap.get(this.id);
      this.context.objectListService.setSelectedObject(object);
      const modal = this.context.modal.open(ObjectDetailsComponent);
    }
  }

  public draw() {
    const ctx = this.context.ctx;
    if (this.down === true) {
      this.x = Math.round((this.context.cursorX - this.anchorX) / 10.0) * 10;
      this.y = Math.round((this.context.cursorY - this.anchorY) / 10.0) * 10;
    }

    ctx.save();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'black';
    ctx.fillStyle = this.color;
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    if (this instanceof FunctionWidget ||
      this instanceof PerformanceWidget ||
      this instanceof RequirementWidget ||
      this instanceof SystemInterfaceWidget ||
      this instanceof ValueWidget) {
      if (this.down === true && this === Node.selectedNode) {
        ctx.globalAlpha = 0.5;
        ctx.strokeRect(this.x - halfWidth + 2, this.y - halfHeight + 2, this.width, this.height);
        ctx.fillRect(this.x - halfWidth + 2, this.y - halfHeight + 2, this.width, this.height);
      } else {
        ctx.strokeRect(this.x - halfWidth, this.y - halfHeight, this.width, this.height);
        ctx.fillRect(this.x - halfWidth, this.y - halfHeight, this.width, this.height);
      }
    } else if (this instanceof HamburgerWidget) {
      if (this.down === true && this === Node.selectedNode) {
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.x + 2, this.y + 2, this.width / 2, 0, Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'LightGreen';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + 2, this.y + 2, this.width / 2, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'LightBlue';
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'LightGreen';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'LightBlue';
        ctx.fill();
      }
    } else if (this instanceof PortRealisationWidget) {
      if (this.down === true && this === Node.selectedNode) {
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.x + 2, this.y + 2, this.width / 2, 0, Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'LightGreen';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + 2, this.y + 2, this.width / 2, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'DarkGrey';
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI);
        ctx.stroke();
        ctx.fillStyle = 'LightGreen';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = 'DarkGrey';
        ctx.fill();
      }
    } else if (this instanceof RealisationPortWidget) {
      const rotation = this.rotateState * Math.PI / 2;
      if (this.down === true && this === Node.selectedNode) {
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.x + 2, this.y + 2, this.width / 2, Math.PI + rotation, Math.PI * 2 + rotation);
        switch (this.rotateState) {
          case 0:
            ctx.moveTo(this.x - halfWidth + 2, this.y + 2);
            ctx.lineTo(this.x + halfWidth + 2, this.y + 2);
            break;
          case 1:
            ctx.moveTo(this.x + 2, this.y - halfHeight + 2);
            ctx.lineTo(this.x + 2, this.y + halfHeight + 2);
            break;
          case 2:
            ctx.moveTo(this.x - halfWidth + 2, this.y + 2);
            ctx.lineTo(this.x + halfWidth + 2, this.y + 2);
            break;
          case 3:
            ctx.moveTo(this.x + 2, this.y - halfHeight + 2);
            ctx.lineTo(this.x + 2, this.y + halfHeight + 2);
            break;
        }
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 2, Math.PI + rotation, Math.PI * 2 + rotation);
        switch (this.rotateState) {
          case 0:
            ctx.moveTo(this.x - halfWidth, this.y);
            ctx.lineTo(this.x + halfWidth, this.y);
            break;
          case 1:
            ctx.moveTo(this.x, this.y - halfHeight);
            ctx.lineTo(this.x, this.y + halfHeight);
            break;
          case 2:
            ctx.moveTo(this.x - halfWidth, this.y);
            ctx.lineTo(this.x + halfWidth, this.y);
            break;
          case 3:
            ctx.moveTo(this.x, this.y - halfHeight);
            ctx.lineTo(this.x, this.y + halfHeight);
            break;
        }
      }
      ctx.stroke();
      ctx.fillStyle = 'LightGreen';
      ctx.fill();
    } else {
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
    }
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.font = this.fontSize + 'px Verdana';
    if (this instanceof RealisationPortWidget) {
      ctx.font = (this.fontSize - 2) + 'px Verdana';
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotateState !== 2 ? this.rotateState * Math.PI / 2 : 0);
      if (this.down === true && this === Node.selectedNode) {
        ctx.globalAlpha = 0.5;
        if (ctx.measureText(this.label).width < this.width - 4) {
          ctx.fillText(this.label, 2, (this.rotateState !== 2 ? this.height / -6 : this.height / 6) + 2);
        } else {
          const firstPart = this.label.substring(0, this.label.length / 2);
          const secondPart = this.label.substring(this.label.length / 2);
          ctx.fillText(firstPart, 2, (this.rotateState !== 2 ? this.height / -3 : this.height / 6) + 2);
          ctx.fillText(secondPart, 2, (this.rotateState !== 2 ? this.height / -6 : this.height / 3) + 2);
        }
      } else {
        if (ctx.measureText(this.label).width < this.width - 4) {
          ctx.fillText(this.label, 0, this.rotateState !== 2 ? this.height / -6 : this.height / 6);
        } else {
          const firstPart = this.label.substring(0, this.label.length / 2);
          const secondPart = this.label.substring(this.label.length / 2);
          ctx.fillText(firstPart, 0, this.rotateState !== 2 ? this.height / -3 : this.height / 6);
          ctx.fillText(secondPart, 0, this.rotateState !== 2 ? this.height / -6 : this.height / 3);
        }
      }
    } else {
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
    }
    ctx.restore();
  }

  showRelatedObject(relation: string): void {
    const relatedObject = WidgetFactory.getRelatedObject(this.context, this.id, relation);
    if (relatedObject) {
      if (this.context.widgets.get(relatedObject.id)) {
        const endNode = this.context.widgets.get(relatedObject.id);
        if (!WidgetFactory.isAlreadyRelated(this.context, relation, this, endNode)) {
          this.context.drawList.push(new Edge(this.context, relation, this, endNode));
        }
      } else {
        const widget = WidgetFactory.createWidget(relatedObject.type, this.context, relatedObject.id,
          this.x + 100, this.y + 100, relatedObject.name);
        this.context.drawList.push(new Edge(this.context, relation, this, widget));
        this.context.drawList.push(widget);
      }
    }
  }

  showRelatedObjects(relation: string): void {
    const parts = WidgetFactory.getRelatedObjects(this.context, this.id, relation);
    if (parts && parts.length > 0) {
      let index = 0;
      for (const part of parts) {
        if (this.context.widgets.get(part.id)) {
          const endNode = this.context.widgets.get(part.id);
          if (!WidgetFactory.isAlreadyRelated(this.context, relation, this, endNode)) {
            this.context.drawList.push(new Edge(this.context, relation, this, endNode));
          }
        } else {
          const widget = WidgetFactory
            .createWidget(part.type, this.context, part.id, this.x + 100 + index * 8, this.y + 100 + index * 8, part.name);
          this.context.drawList.push(new Edge(this.context, relation, this, widget));
          this.context.drawList.push(widget);
        }
        index++;
      }
    }
  }

  getAssembly = () => {
    this.showRelatedObject('assembly');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getParts = () => {
    this.showRelatedObjects('parts');
    document.getElementById('dropdown').classList.toggle('show');
  }

  isEnabled(relation: string): boolean {
    return WidgetFactory.exists(this.context, this.id, relation);
  }
}

export class FunctionWidget extends Node {
  constructor(context: Context, id: string, x: number, y: number, label: string) {
    super(context, id);
    this.x = x;
    this.y = y;
    this.width = 160;
    this.height = 50;
    this.label = label;
    this.color = 'Plum';
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
      this.addMenuItem(dropDown, 'assembly', this.getAssembly, this.isEnabled('assembly'));
      this.addMenuItem(dropDown, 'parts', this.getParts, this.isEnabled('parts'));
      this.addMenuItem(dropDown, 'requirements', this.getRequirements, this.isEnabled('requirements'));
      this.addMenuItem(dropDown, 'input', this.getInput, this.isEnabled('input'));
      this.addMenuItem(dropDown, 'output', this.getOutput, this.isEnabled('output'));
      dropDown.classList.toggle('show');
    }
  }

  getRequirements = () => {
    this.showRelatedObjects('requirements');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getInput = () => {
    this.showRelatedObject('input');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getOutput = () => {
    this.showRelatedObject('output');
    document.getElementById('dropdown').classList.toggle('show');
  }
}

export class HamburgerWidget extends Node {
  constructor(context: Context, id: string, x: number, y: number, label: string) {
    super(context, id);
    this.x = x;
    this.y = y;
    this.width = 110;
    this.height = 110;
    this.label = label;
    this.color = 'LightGreen';
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
      this.addMenuItem(dropDown, 'assembly', this.getAssembly, this.isEnabled('assembly'));
      this.addMenuItem(dropDown, 'parts', this.getParts, this.isEnabled('parts'));
      this.addMenuItem(dropDown, 'functionalUnit', this.getFunctionalUnit, this.isEnabled('functionalUnit'));
      this.addMenuItem(dropDown, 'technicalSolution', this.getTechnicalSolution, this.isEnabled('technicalSolution'));
      this.addMenuItem(dropDown, 'ports', this.getPorts, this.isEnabled('ports'));
      dropDown.classList.toggle('show');
    }
  }

  getFunctionalUnit = () => {
    this.showRelatedObject('functionalUnit');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getTechnicalSolution = () => {
    this.showRelatedObject('technicalSolution');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getPorts = () => {
    this.showRelatedObjects('ports');
    document.getElementById('dropdown').classList.toggle('show');
  }
}

export class PerformanceWidget extends Node {
  constructor(context: Context, id: string, x: number, y: number, label: string) {
    super(context, id);
    this.x = x;
    this.y = y;
    this.width = 160;
    this.height = 50;
    this.label = label;
    this.color = 'YellowGreen';
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
      this.addMenuItem(dropDown, 'assembly', this.getAssembly, this.isEnabled('assembly'));
      this.addMenuItem(dropDown, 'parts', this.getParts, this.isEnabled('parts'));
      this.addMenuItem(dropDown, 'value', this.getValue, this.isEnabled('value'));
      dropDown.classList.toggle('show');
    }
  }

  getValue = () => {
    this.showRelatedObject('value');
    document.getElementById('dropdown').classList.toggle('show');
  }
}

export class PortRealisationWidget extends Node {
  constructor(context: Context, id: string, x: number, y: number, label: string) {
    super(context, id);
    this.x = x;
    this.y = y;
    this.width = 110;
    this.height = 110;
    this.label = label;
    this.color = 'LightGreen';
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
      this.addMenuItem(dropDown, 'assembly', this.getAssembly, this.isEnabled('assembly'));
      this.addMenuItem(dropDown, 'parts', this.getParts, this.isEnabled('parts'));
      this.addMenuItem(dropDown, 'owner', this.getOwner, this.isEnabled('owner'));
      this.addMenuItem(dropDown, 'interface', this.getInterface, this.isEnabled('interface'));
      this.addMenuItem(dropDown, 'port', this.getPort, this.isEnabled('port'));
      dropDown.classList.toggle('show');
    }
  }

  getOwner = () => {
    this.showRelatedObject('owner');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getInterface = () => {
    this.showRelatedObject('interface');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getPort = () => {
    this.showRelatedObject('port');
    document.getElementById('dropdown').classList.toggle('show');
  }
}

export class RealisationModuleWidget extends Node {
  constructor(context: Context, id: string, x: number, y: number, label: string) {
    super(context, id);
    this.x = x;
    this.y = y;
    this.width = 110;
    this.height = 110;
    this.label = label;
    this.color = 'LightGreen';
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
      this.addMenuItem(dropDown, 'assembly', this.getAssembly, this.isEnabled('assembly'));
      this.addMenuItem(dropDown, 'parts', this.getParts, this.isEnabled('parts'));
      this.addMenuItem(dropDown, 'performances', this.getPerformances, this.isEnabled('performances'));
      this.addMenuItem(dropDown, 'ports', this.getPorts, this.isEnabled('ports'));
      this.addMenuItem(dropDown, 'hamburgers', this.getHamburgers, this.isEnabled('hamburgers'));
      dropDown.classList.toggle('show');
    }
  }

  getPerformances = () => {
    this.showRelatedObjects('performances');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getPorts = () => {
    this.showRelatedObjects('ports');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getHamburgers = () => {
    this.showRelatedObjects('hamburgers');
    document.getElementById('dropdown').classList.toggle('show');
  }
}

export class RealisationPortWidget extends Node {
  rotateState: number;

  constructor(context: Context, id: string, x: number, y: number, label: string) {
    super(context, id);
    this.x = x;
    this.y = y;
    this.width = 110;
    this.height = 110;
    this.label = label;
    this.color = 'LightGreen';
    this.rotateState = 0;
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
      this.addMenuItem(dropDown, 'assembly', this.getAssembly, this.isEnabled('assembly'));
      this.addMenuItem(dropDown, 'parts', this.getParts, this.isEnabled('parts'));
      this.addMenuItem(dropDown, 'owner', this.getOwner, this.isEnabled('owner'));
      this.addMenuItem(dropDown, '', null, false);
      this.addMenuItem(dropDown, 'rotate', this.rotate, true);
      dropDown.classList.toggle('show');
    }
  }

  getOwner = () => {
    this.showRelatedObject('owner');
    document.getElementById('dropdown').classList.toggle('show');
  }

  rotate = () => {
    this.rotateState++;
    if (this.rotateState > 3) {
      this.rotateState = 0;
    }
    document.getElementById('dropdown').classList.toggle('show');
  }
}

export class RequirementWidget extends Node {
  constructor(context: Context, id: string, x: number, y: number, label: string) {
    super(context, id);
    this.x = x;
    this.y = y;
    this.width = 160;
    this.height = 50;
    this.label = label;
    this.color = 'Gold';
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
      this.addMenuItem(dropDown, 'assembly', this.getAssembly, this.isEnabled('assembly'));
      this.addMenuItem(dropDown, 'parts', this.getParts, this.isEnabled('parts'));
      this.addMenuItem(dropDown, 'minValue', this.getMinValue, this.isEnabled('minValue'));
      this.addMenuItem(dropDown, 'maxValue', this.getMaxValue, this.isEnabled('maxValue'));
      dropDown.classList.toggle('show');
    }
  }

  getMinValue = () => {
    this.showRelatedObject('minValue');
    document.getElementById('dropdown').classList.toggle('show');
  }
  getMaxValue = () => {
    this.showRelatedObject('maxValue');
    document.getElementById('dropdown').classList.toggle('show');
  }
}

export class SystemInterfaceWidget extends Node {
  constructor(context: Context, id: string, x: number, y: number, label: string) {
    super(context, id);
    this.x = x;
    this.y = y;
    this.width = 160;
    this.height = 50;
    this.label = label;
    this.color = 'DarkGrey';
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
      this.addMenuItem(dropDown, 'assembly', this.getAssembly, this.isEnabled('assembly'));
      this.addMenuItem(dropDown, 'parts', this.getParts, this.isEnabled('parts'));
      this.addMenuItem(dropDown, 'systemSlot0', this.getSystemSlot0, this.isEnabled('systemSlot0'));
      this.addMenuItem(dropDown, 'systemSlot1', this.getSystemSlot1, this.isEnabled('systemSlot1'));
      this.addMenuItem(dropDown, 'functionInputs', this.getFunctionInputs, this.isEnabled('functionInputs'));
      this.addMenuItem(dropDown, 'functionOutputs', this.getFunctionOutputs, this.isEnabled('functionOutputs'));
      dropDown.classList.toggle('show');
    }
  }

  getSystemSlot0 = () => {
    this.showRelatedObject('systemSlot0');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getSystemSlot1 = () => {
    this.showRelatedObject('systemSlot1');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getFunctionInputs = () => {
    this.showRelatedObjects('functionInputs');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getFunctionOutputs = () => {
    this.showRelatedObjects('functionOutputs');
    document.getElementById('dropdown').classList.toggle('show');
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
      this.addMenuItem(dropDown, 'assembly', this.getAssembly, this.isEnabled('assembly'));
      this.addMenuItem(dropDown, 'parts', this.getParts, this.isEnabled('parts'));
      this.addMenuItem(dropDown, 'functions', this.getFunctions, this.isEnabled('functions'));
      this.addMenuItem(dropDown, 'interfaces', this.getInterfaces, this.isEnabled('interfaces'));
      this.addMenuItem(dropDown, 'hamburgers', this.getHamburgers, this.isEnabled('hamburgers'));
      dropDown.classList.toggle('show');
    }
  }

  getFunctions = () => {
    this.showRelatedObjects('functions');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getInterfaces = () => {
    this.showRelatedObjects('interfaces');
    document.getElementById('dropdown').classList.toggle('show');
  }

  getHamburgers = () => {
    this.showRelatedObjects('hamburgers');
    document.getElementById('dropdown').classList.toggle('show');
  }
}

export class ValueWidget extends Node {
  constructor(context: Context, id: string, x: number, y: number, label: string) {
    super(context, id);
    this.x = x;
    this.y = y;
    this.width = 160;
    this.height = 50;
    this.label = label;
    this.color = 'white';
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
      dropDown.classList.toggle('show');
    }
  }
}
