import { Directive, ElementRef, Input, AfterViewInit, OnInit } from '@angular/core';

@Directive({
  selector: '[appMultilineEllipsis]'
})
export class MultilineEllipsisDirective implements OnInit {
  @Input() maxHeight: number;
  @Input() text: string;
  content: string[];

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.content = this.text.split(' ');
  }

  ngAfterViewInit() {
    while (this.el.nativeElement.offsetHeight > this.maxHeight) {
      this.content.pop();
      this.content[this.content.length - 1] = '...';
      this.el.nativeElement.textContent = this.content.join(' ');
    }
  }

}
