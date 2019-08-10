import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {YacserObject} from '../../../../types';
import {faEdit, faSave, faWindowClose} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-literal-editor',
  templateUrl: './literal-editor.component.html',
  styleUrls: ['./literal-editor.component.css']
})
export class LiteralEditorComponent implements OnInit {
  isEditing: boolean;
  value: string;
  @Input() object: YacserObject;
  @Input() attribute: string;
  @Input() inputType = 'text';
  @Output() newValue = new EventEmitter();
  faEdit = faEdit;
  faSave = faSave;
  faWindowClose = faWindowClose;

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

  onClickClose(): void {
    this.isEditing = !this.isEditing;
    this.value = this.object[this.attribute];
  }

}
