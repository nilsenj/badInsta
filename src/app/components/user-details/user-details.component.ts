import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
    public showPost: boolean = true;
    public showSaved: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    postsTab(): void {
        this.showPost = true;
        this.showSaved = false;
    }

    savedTab(): void {
        this.showPost = false;
        this.showSaved = true;
    }


}
