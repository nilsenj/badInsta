import {Component, Inject, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {PostService} from "../../services/post.service";
import {arrays} from "../../helpers/arrays";

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    public posts: Post[];
    public postService;

    constructor(@Inject(PostService) postService: PostService) {
        this.postService = postService;
    }

    ngOnInit() {
        this.posts = [];
        this.postService.allUserPosts().subscribe(data => {
            this.posts = data;
        });
    }

}
