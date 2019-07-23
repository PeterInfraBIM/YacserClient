import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {YacserObject} from '../../../../types';

@Component({
  selector: 'app-link-editor',
  templateUrl: './link-editor.component.html',
  styleUrls: ['./link-editor.component.css']
})
export class LinkEditorComponent implements OnInit {
  isEditing: boolean;
  value: YacserObject;
  remove: YacserObject[];
  add: YacserObject[];
  @Input() object: YacserObject;
  @Input() links: YacserObject[];
  @Input() attribute: string;
  @Input() isMultiple = false;
  @Input() isEditable = true;
  @Output() newValue = new EventEmitter<YacserObject>();
  @Output() newValues = new EventEmitter<YacserObject[]>()

  constructor() {
  }

  ngOnInit() {
    if (this.isMultiple) {
      this.remove = [];
      this.add = [];
    } else {
      this.value = this.object[this.attribute];
    }
  }

  onClickEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && !this.isMultiple && this.value !== this.object[this.attribute]) {
      this.newValue.emit(this.value);
    } else if (!this.isEditing && this.isMultiple && (this.add.length > 0 || this.remove.length > 0)) {
      this.newValues.emit(this.add.concat(this.remove));
    }
  }

  onAddClick(instance: YacserObject): void {
    if (this.add.includes(instance)) {
      this.add.splice(this.add.indexOf(instance), 1);
    } else {
      this.add.push(instance);
      this.value = null;
    }
  }

  onRemoveClick(instance: YacserObject): void {
    if (this.remove.includes(instance)) {
      this.remove.splice(this.remove.indexOf(instance), 1);
    } else {
      this.remove.push(instance);
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
