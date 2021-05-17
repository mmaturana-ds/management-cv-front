import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable()
export class DataService {
    private contextApi = 'http://localhost:8080';

    constructor(private _http: HttpClient) { }

    private handleErrors(error: any): Promise<any> {
        return Promise.reject(error);
    }

    public getCurriculums(): Promise<any> {
        const endpoint = `${this.contextApi}/resume`;
        return this._http.get(endpoint).toPromise()
            .then(response => response)
            .catch(this.handleErrors);
    }

    public getCurriculum(user:string): Promise<any> {
        const endpoint = `${this.contextApi}/resume/${user}`;

        return this._http.get(endpoint).toPromise()
            .then(response => response)
            .catch(this.handleErrors);
    }

    public createCurriculum(data: any): Promise<any> {
        const endpoint = `${this.contextApi}/resume`;

        return this._http.post(endpoint, data).toPromise()
            .then(response => response)
            .catch(this.handleErrors);
    }

    public updateCurriculum(data: any): Promise<any> {
      const endpoint = `${this.contextApi}/resume`;

      return this._http.put(endpoint, data).toPromise()
          .then(response => response)
          .catch(this.handleErrors);
    }

    public deleteCurriculum(): Promise<any> {
      const endpoint = `${this.contextApi}/resume`;

      return this._http.delete(endpoint).toPromise()
          .then(response => response)
          .catch(this.handleErrors);
    }

    public uploadFile(imagen: File): Promise<any> {
        const endpoint = `${this.contextApi}/cloudinary/upload`;

        const formData = new FormData();
        formData.append("multipartFile", imagen);

        return this._http.post(endpoint, formData).toPromise()
            .then(response => response)
            .catch(this.handleErrors);
    }
}