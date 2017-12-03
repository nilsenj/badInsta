import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    public posts: Post[];
    public postService;

    constructor(postService: PostService) {
        this.postService = postService;
    }

    ngOnInit() {
      this.posts = [];
        this.postService.getAllUserPosts.subscribe(data => {
            console.log(data);
            this.posts = data;
        });
    }

}
