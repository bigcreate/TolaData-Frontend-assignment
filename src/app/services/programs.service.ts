import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from 'src/app/interfaces/program';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Program[]> {
    return this.http.get<Program[]>('https://dev-api.toladata.io/api/workflowlevel1/');
  }
}
