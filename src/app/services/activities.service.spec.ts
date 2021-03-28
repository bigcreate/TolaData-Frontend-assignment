import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from './activities.service';

describe('ActivitiesService', () => {
  let service: ActivitiesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ActivitiesService);
  });

  it('should send a get request with and "workflowlevel1__id" for getting activities for a program', (done) => {
    const testData = [{ id: 1 }, { id: 2 }] as Activity[];

    service.getByProgramId(12).subscribe((activities) => {
      expect(activities).toEqual(testData);
      done();
    });

    const req = httpTestingController.expectOne(
      'https://dev-api.toladata.io/api/workflowlevel2/?workflowlevel1__id=12',
    );
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });

  it('should send a put request and a modified activity for changing an original activity', (done) => {
    const modifiedActivity = { id: 1, description: 'new description' } as Activity;

    service.changeActivity('originalActivityUrl', modifiedActivity).subscribe((activity) => {
      expect(activity).toEqual(modifiedActivity);
      done();
    });

    const req = httpTestingController.expectOne('originalActivityUrl');
    expect(req.request.method).toEqual('PUT');
    req.flush(modifiedActivity);
    httpTestingController.verify();
  });
});
