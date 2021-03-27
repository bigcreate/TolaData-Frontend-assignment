import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { Program } from 'src/app/interfaces/program';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Program[]> {
    return this.http.get<Program[]>(
      'https://dev-api.toladata.io/api/workflowlevel1/',
    );
  }

  addActivity(
    activity: Partial<Activity>,
    programUrl: string,
  ): Observable<any> {
    return this.http.put<any>(programUrl, {
      ...activity,
    });
  }
}
