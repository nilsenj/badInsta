import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AppRouterModule} from "./modules/router/approuter.module";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AuthGuard} from "./guards/auth.guard";
import {AuthenticationService} from "./services/authentication.service";
import {PostService} from "./services/post.service";
import {NavigationComponent} from './components/navigation/navigation.component';
import {UserComponent} from './components/user/user.component';
import {ToastModule, ToastOptions} from "ng2-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrService} from "./services/toastr.service";
import {CustomToastr} from "./support/CustomToastr";
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { PostComponent } from './components/post/post.component';
import { PhotoComponent } from './components/photo/photo.component';
import { VideoComponent } from './components/video/video.component';
import { SavesComponent } from './components/saves/saves.component';
import { HomePostComponent } from './components/home-post/home-post.component';
import { PhotoPostComponent } from './components/photo-post/photo-post.component';
import { VideoPostComponent } from './components/video-post/video-post.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ClickPreventDirective } from './directives/click-prevent.directive';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        WelcomeComponent,
        NavigationComponent,
        UserComponent,
        UserDetailsComponent,
        PostComponent,
        PhotoComponent,
        VideoComponent,
        SavesComponent,
        HomePostComponent,
        PhotoPostComponent,
        VideoPostComponent,
        ClickPreventDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRouterModule,
        BrowserAnimationsModule,
        ToastModule.forRoot(),
        NgbModule.forRoot()
    ],
    providers: [
        AuthenticationService,
        AuthGuard,
        ToastrService,
        {provide: ToastOptions, useClass: CustomToastr},
        PostService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
