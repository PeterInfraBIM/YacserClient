import {Component, Input, OnInit} from '@angular/core';
import {YacserObject} from '../../../../types';
import {Observable} from "rxjs";

@Component({
  selector: 'app-link-editor',
  templateUrl: './link-editor.component.html',
  styleUrls: ['./link-editor.component.css']
})
export class LinkEditorComponent implements OnInit {
  isEditing: boolean;
  @Input() object: YacserObject;
  @Input() links: Observable<YacserObject[]>;
  @Input() attribute: string;

  constructor() {
  }

  ngOnInit() {
  }

  onClickEdit(): void {
    this.isEditing = !this.isEditing;
 }

}
