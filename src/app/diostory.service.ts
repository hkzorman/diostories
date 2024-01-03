import { Injectable } from '@angular/core';
import { Diostory } from './diostory';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiostoryService {

  private baseApiUrl: string;

  constructor(private http: HttpClient) { 
    this.baseApiUrl = "http://diostories.duckdns.org:8102";
  }

  list(): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/list`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/get/${id}`);
  }

  save(diostory: Diostory): Observable<any> {
    let data: string = JSON.stringify({ "payload": diostory });
    return this.http.post(`${this.baseApiUrl}/save`, data);
  }

  uploadImage(file: any, isTemporary: boolean = false): Observable<any> {
    // Create form data
    const formData = new FormData();
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    let headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");
    return this.http.post(`${this.baseApiUrl}/uploadImage/${isTemporary}`, formData, { headers: headers });
  }
  
  getAbsoluteImageUrl(relativeUrl: string): string {
    return `${this.baseApiUrl}/img${relativeUrl}`;
  }
}
