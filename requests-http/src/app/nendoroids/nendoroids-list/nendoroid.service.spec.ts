/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NendoroidService } from './nendoroid.service';

describe('Service: Nendoroid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NendoroidService]
    });
  });

  it('should ...', inject([NendoroidService], (service: NendoroidService) => {
    expect(service).toBeTruthy();
  }));
});
