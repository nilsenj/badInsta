import {Component, Input, OnInit} from '@angular/core';
import {Video} from "../../models/Video";
import {Post} from "../../models/Post";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

    @Input('model') model: Post[];
    @Input('indexIndicator') indexIndicator: number;
    constructor() { }

    ngOnInit() {
    }
}
