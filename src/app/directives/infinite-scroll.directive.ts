import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Directive, ElementRef, Input, Inject, HostListener } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Input() scrollPercent: number;
  @Input() scrollCallback: Function;
  scrollPosition: number;
  scrollEvent: Observable<any>;

  constructor(private el: ElementRef) { }
  
  ngOnInit() {
    this.scrollPercent = this.scrollPercent || 1;
  }

  ngAfterViewInit() {
    this.scrollEvent = Observable.fromEvent(window, 'scroll');
    this.streamScrollEvent().exhaustMap(() => this.scrollCallback()).subscribe(() => {});
  }

  streamScrollEvent() {
    return this.scrollEvent
      .map((e: any) => ({
        sT: e.target.documentElement.scrollTop || window.pageYOffset,
        sH: e.target.documentElement.scrollHeight,
        cH: e.target.documentElement.clientHeight
      }))
      .filter((position) => this.isBeyondScrollPercent(position));
  }

  isBeyondScrollPercent(position):boolean {
    return position.sT >= ((position.sH - position.cH) * this.scrollPercent);
  }
  
}
