import { Directive, Input, Inject, HostListener } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Input() scrollCallback: Function;
  @HostListener('window:scroll')
  onScroll() {
    let offset = document.documentElement.scrollTop || window.pageYOffset;
    let scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (offset >= scrollHeight) {
      this.scrollCallback();
    }
  }

  constructor() { }
  
}
