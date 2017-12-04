import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appCanvasCircleRating]'
})
export class CanvasCircleRatingDirective {
  @Input() rating: any;
  @Input() rgb: string;
  endAngle: number;

  constructor(private canvas: ElementRef) { 
    this.endAngle = 0;
    this.drawRating = this.drawRating.bind(this);
  }

  ngOnChanges() {
    setTimeout(this.drawRating, 5);
  }

  drawRating() {
    const canvas = this.canvas.nativeElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas

    // draw outter circle
    ctx.beginPath();
    ctx.arc(60, 60, 60, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'rgba(13, 28, 34, 1)';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(60, 60, 52, 0, Math.PI * 2);
    ctx.closePath();    
    ctx.fillStyle = `rgba(${this.rgb}, 0.4)`;
    ctx.fill();

    // inner circle
    ctx.beginPath();
    ctx.arc(60, 60, 40, 0, Math.PI * 2);
    ctx.closePath();    
    ctx.fillStyle = 'rgba(13, 28, 34, 1)';
    ctx.fill();

    // inner text
    ctx.font = '38px Roboto';
    let text = 'N/A';
    if (this.rating && this.rating !== '0') {
      text = Number(this.rating).toFixed(1);
    }
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 60, 60);

    ctx.save();

    // draw percentage circle
    ctx.restore();
    if (this.rating && this.rating !== '0') {
      const percentage = Number(this.rating) / 10;
      const startAngle = -(Math.PI / 180) * 90;      
      ctx.beginPath();
      this.endAngle += Math.PI * 2 * percentage / 100;
      ctx.arc(60, 60, 46, startAngle, this.endAngle + startAngle);
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.strokeStyle = `rgba(${this.rgb}, 1)`;
      ctx.stroke();
      
      if (this.endAngle < Math.PI * 2 * Number(this.rating) / 10) {
        setTimeout(this.drawRating, 5);
      }
    }
  }

}
