import {Component, Inject, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Post} from "../../models/Post";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private postService: PostService;
    public posts: Post[];

    constructor(@Inject(PostService) postService: PostService) {
        this.postService = postService;
    }

    ngOnInit() {
        this.postService.allUsersFeed().subscribe((data) => {
            this.posts = data;
        });
    }

}
