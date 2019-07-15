import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {YacserObject} from '../../../../types';

@Component({
  selector: 'app-string-editor',
  templateUrl: './string-editor.component.html',
  styleUrls: ['./string-editor.component.css']
})
export class StringEditorComponent implements OnInit {
  isEditing: boolean;
  value: string;
  @Input() object: YacserObject;
  @Input() attribute: string;
  @Output() newValue = new EventEmitter();

  constructor() {
    this.isEditing = false;
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

}
