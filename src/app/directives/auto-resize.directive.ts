import { Directive, Input, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoResize]'
})
export class AutoResizeDirective {
  @Input() style: object;

  constructor(private el: ElementRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    const { children } = this.el.nativeElement;
    let maxHeight = -Infinity;

    for (let i = 0; i < children.length; i++) {
      maxHeight = Math.max(children[i].offsetHeight, maxHeight);
    }

    for (let i = 0; i < children.length; i++) {
      children[i].children[0].children[1].style.height = maxHeight - 240 + 'px';
    }
  }

}
