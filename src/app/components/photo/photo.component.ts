import {Component, Input, OnInit} from '@angular/core';
import {Photo} from "../../models/Photo";
import {Post} from "../../models/Post";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input('model') model: Post[];
  @Input('indexIndicator') indexIndicator: number;
  constructor() { }

  ngOnInit() {
  }

}
