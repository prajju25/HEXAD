import { TestBed } from '@angular/core/testing';
import { UserData } from '../interface/user-data';

import { ApiServiceService } from './api-service.service';

xdescribe('ApiServiceService', () => {
  let service: ApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* it('#login - Check Login Call', (done: DoneFn) => {
    let req: UserData = {
      userName: "jon",
      password: "password123"
    };
    service.login(req).then((res)=>{
      expect(res['status']).toBe('success');
    });
  });

  it('#getLibraryBooks', (done: DoneFn) => {
    service.getLibraryBooks().then((res)=>{
      expect(res['status']).toBe('success');
    });
  }); */
});
