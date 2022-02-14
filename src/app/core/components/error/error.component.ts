import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpWrapperService } from '@core/services/http-wrapper.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  error: any;
  isComponentActive = true;

  constructor(private httpWrapperService: HttpWrapperService, private router: Router) { }

  ngOnInit(): void {
    this.httpWrapperService.httpError.pipe(takeWhile(() => this.isComponentActive)).subscribe(e => {
      if (e) {
        this.error = e;
      } else {
        this.router.navigateByUrl('/home');
      }
    })
  }
  
  ngOnDestroy(): void {
    this.isComponentActive = false;
  }

}
