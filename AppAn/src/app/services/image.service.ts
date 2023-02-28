import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../models/image';
import {
  map,
  Observable,
  take,
  tap,
  Subject,
  delay,
  BehaviorSubject,
} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }
  productsChange = new BehaviorSubject([]);

  UpdateImage(post:any) {
    return this.http.post('http://localhost:3000/api/image/upload-image',post ,{ responseType: 'text' });
  }

  removeImgFile(img:Image){
    return this.http.post('http://localhost:3000/api/image/delete-image-file',{path:img.path});
  }

  removeImg(img:Image){
    return this.http.delete('http://localhost:3000/api/image/'+img._id);
  }





  PostImage(post:any) {
    return this.http.post('http://localhost:3000/api/image',post);
  }

}
