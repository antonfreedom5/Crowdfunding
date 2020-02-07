import {Component, OnInit} from '@angular/core';
import {ImageUploadService} from '../_services/image-upload.service';

let imageSet: String[] = [];

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css'],
  providers: [ImageUploadService]
})
export class DragAndDropComponent implements OnInit {
  constructor(private uploadService: ImageUploadService) {}

  ngOnInit() {
    let gallery = document.getElementById('gallery');
    this.uploadService.setOnUploadedCallback(this.onUploadedCallback);
    this.uploadService.processDirectSelect(document.getElementById('fileSelect'),
      document.getElementById('fileElem'));
    this.uploadService.processDropboxSelect(document.getElementById('dropbox'));
  }

  public onUploadedCallback(url) {
    imageSet.push(url);
    let img = new Image();
    img.src = url;
    let gallery = document.getElementById('gallery');
    gallery.appendChild(img);
  }

  public handleFiles(files) {
    this.uploadService.handleFiles(files);
  }

  public getImageSet(): String[] {
    let copy = imageSet.slice();
    imageSet = [];
    return copy;
  }
}
