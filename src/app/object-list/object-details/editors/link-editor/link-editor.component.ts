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
  @Input() object: YacserObject;
  @Input() links: YacserObject[];
  @Input() attribute: string;
  @Output() newValue = new EventEmitter<YacserObject>();

  constructor() {
  }

  ngOnInit() {
    this.value = this.object[this.attribute];
  }

  onClickEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.value !== this.object[this.attribute]) {
      this.newValue.emit(this.value);
    }
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
