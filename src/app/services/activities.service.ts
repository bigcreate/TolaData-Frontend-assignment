import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      'https://dev-api.toladata.io/api/workflowlevel2/',
    );
  }

  getByProgramId(programId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      'https://dev-api.toladata.io/api/workflowlevel2/',
      {
        params: {
          workflowlevel1__id: programId.toString(),
        },
      },
    );
  }
}
