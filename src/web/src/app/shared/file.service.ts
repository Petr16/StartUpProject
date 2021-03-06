import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private url = 'http://localhost:5000/api/file';

  constructor(private http: HttpClient) { }

  public upload(formData: FormData) {
    //this.fileUrlCreateUpdateOut = 'Resources/Images/'+ formData.
    return this.http.post(`${this.url}/upload`, formData, {
        reportProgress: true,
        observe: 'events',
    });
  }

  public download(fileUrl: string) {
    return this.http.get(`${this.url}/download?fileUrl=${fileUrl}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob',
    });
  }

  public getPhotos(){
    return this.http.get(`${this.url}/getPhotos`);
  }

}
