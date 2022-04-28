import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ng-marquee',
  templateUrl: 'ng-marquee.component.html',
  styleUrls: ['ng-marquee.component.scss']
})
export class NgMarqueeComponent implements AfterViewInit{

  constructor(public sanitizer: DomSanitizer) {}

  @ViewChild('wrapper') wrapper!: ElementRef<HTMLDivElement> ;
  @ViewChild('single') single!: ElementRef<HTMLDivElement> ;
  
  @Input() direction: Direction = 'left';
  @Input() speed: number = 2;

  scroll: boolean = false;
  numberOfClones: number = 10;

  get clones() {
    return new Array(this.numberOfClones);
  }

  ngAfterViewInit(): void {
    setInterval(() => this.doMagic(), 500);
  }
  
  private doMagic(): void {
      const wrapperEl = this.wrapper.nativeElement;
      const contentEl = this.wrapper.nativeElement;

      const wrapperSize = { 
        height: wrapperEl.offsetHeight,
        width: wrapperEl.offsetWidth
      };

      const contentSize = {
        height: contentEl.scrollHeight,
        width: contentEl.scrollWidth
      };

      const isVertical = ['up', 'down'].includes(this.direction);
      const content = isVertical ? contentSize.height : contentSize.width;
      const wrapper = isVertical ? wrapperSize.height : wrapperSize.width;
  
      if (wrapper < content) {
        this.numberOfClones = 10;
        setTimeout(() => {
          wrapperEl.classList.remove('scroll','left','up', 'down', 'right');
          wrapperEl.classList.add('scroll', this.direction);
        }, 100);
      } else {
        this.numberOfClones = 1;
        wrapperEl.classList.remove('scroll');
      }
  }
}


export type Direction = 'up' | 'down' | 'left' | 'right';

