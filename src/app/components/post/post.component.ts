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
            data.forEach(function (item, index, arr) {
                let items = [];
                item.videos.forEach(function (item, index, arr) {
                    item.type = 'video';
                });
                item.photos.forEach(function (item, index, arr) {
                    item.type = 'photo';
                });
                items.push(item.videos);
                items.push(item.photos);
                let newArr = [];
                for (let i = 0; i < items.length; i++) {
                    newArr = newArr.concat(items[i]);
                }
                item.items = newArr;
            });
            this.posts = data;
        });
    }

    __chunk(arr, len) {
        var chunks = [],
            i = 0,
            n = arr.length;
        while (i < n) {
            chunks.push(arr.slice(i, i += len));
        }

        return chunks;
    }

    __dateNow(): number {
        return Date.now();
    }
}
