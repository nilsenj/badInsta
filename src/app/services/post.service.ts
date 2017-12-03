import {EventEmitter, Inject, Injectable, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {app} from "../../config/app";
import {Post} from "../models/Post";
import {arrays} from "../helpers/arrays";
import {ToastrService} from "./toastr.service";
import {Video} from "../models/Video";
import {Photo} from "../models/Photo";

@Injectable()
export class PostService {
    token: any;

    /**
     * emit events
     *
     * @type {EventEmitter}
     */
    public postEvent: EventEmitter<any> = new EventEmitter();
    @Output() postChange = new EventEmitter();
    @Input() post: Post;

    constructor(@Inject(Http) private http: Http,
                private toastrService: ToastrService) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    /**
     * get all posts
     *
     * @returns {Observable<R>}
     */
    all(): Observable<Post[]> {
        // add authorization header with jwt token
        let headers = new Headers({'Authorization': 'Bearer ' + this.token});
        let options = new RequestOptions({headers: headers});

        // get posts from api
        return this.http.get(app.api_url + '/api/posts', options)
            .map((response: Response) => response.json());
    }

    /**
     * get all users data
     * @returns {Observable<R>}
     */
    getAllUserPosts(): Observable<Post[]> {
        // add authorization header with jwt token
        let headers = new Headers({'Authorization': 'Bearer ' + this.token});
        let options = new RequestOptions({headers: headers});

        // get posts from api
        return this.http.get(app.api_url + '/api/posts/allUserPosts ', options)
            .map((response: Response) => response.json());
    }

    /**
     * get the post
     *
     * @returns {Observable<R>}
     */
    show(id: number): Observable<Post> {
        // add authorization header with jwt token
        let headers = new Headers({'Authorization': 'Bearer ' + this.token});
        let options = new RequestOptions({headers: headers});

        // get posts from api
        return this.http.get(app.api_url + '/api/posts/' + id, options)
            .map((response: Response) => response.json());
    }

    /**
     * store post
     * @param {Video[]} videos
     * @param {Photo[]} photo
     * @returns {Observable<boolean>}
     */
    store(videos: Video[] = [], photo: Photo[] = []): Observable<boolean> {
        return this.http.post(app.api_url + '/api/posts', {})
            .map((response: Response) => {
                // register successful if there's a jwt token in the response
                if (response.json()) {
                    // set token property
                    this.postEvent.emit(response.json());
                    this.post = response.json();
                    this.postChange.emit(this.post);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    /**
     * update post
     *
     * @param {Post} post
     * @returns {Observable<boolean>}
     */
    update(post: Post): Observable<boolean> {
        return this.http.put(app.api_url + '/api/posts/' + post.id, post)
            .map((response: Response) => {
                // register successful if there's a jwt token in the response
                if (response.json()) {
                    // set token property
                    this.postEvent.emit(response.json());
                    this.post = response.json();
                    this.postChange.emit(this.post);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

}
