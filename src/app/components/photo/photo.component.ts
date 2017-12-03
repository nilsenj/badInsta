import {Component, Input, OnInit} from '@angular/core';
import {Photo} from "../../models/Photo";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  @Input('model') model: Photo[];
  constructor() { }

  ngOnInit() {
  }

}
