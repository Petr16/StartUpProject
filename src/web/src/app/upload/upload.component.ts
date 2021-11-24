import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FileService } from '../shared/file.service';
import { RequestsService } from '../shared/requests.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  public message: string;
  public progress: number;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private fileService: FileService,
    private requestsService: RequestsService
    ) { }

  ngOnInit(): void {
  }

  public uploadFile = (files: any) => {
    
    if(files.length === 0){
      return;
    }
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    console.log('uploadFile');
    this.requestsService.fileUrlName = fileToUpload.name;
    console.log(fileToUpload.name);//это надо передать в сервис
    formData.append('file',fileToUpload,fileToUpload.name);
    
    this.fileService.upload(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress){
          if(event.total === undefined){
            event.total = 1;
          }
          
          this.progress = Math.round((100 * event.loaded) / event.total);
        }
            
        else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
        }
    });
  };



  /* public uploadFile = (files: any) => {
    if(files.length === 0){
      return;
    }
    
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);

    this.http.post('http://localhost:5000/api/file/upload',formData,{reportProgress:true,observe:'events'})
    .subscribe(event =>{
      if(event.type === HttpEventType.UploadProgress){
        if(event.total === undefined){
          event.total = 1;
        }
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if(event.type === HttpEventType.Response){
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    })

  } */

}
