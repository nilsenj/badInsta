import {Video} from "./Video";
import {Photo} from "./Photo";

export class Post {
    id: number;
    description: string;
    created_at: string;
    updated_at: string;
    videos: Video[];
    photos: Photo[];
    deleted_at: string;
}