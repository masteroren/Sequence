import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SequencesService } from '../shared/services/sequences.service';
import { ISequence } from '../shared/interfaces/sequence.interface';
import { Annotations, IAnnotation } from '../shared/interfaces/annotation.interface';

@Component({
  selector: 'app-sequence-line',
  templateUrl: './sequence-line.component.html',
  styleUrls: ['./sequence-line.component.scss']
})
export class SequenceLineComponent implements OnInit, AfterViewInit {

  public firstRectFLag: boolean;
  public secondRectFlag: boolean;
  public thirdRectFLag: boolean;

  @ViewChild('firstRect') firstRect: ElementRef;
  @ViewChild('secondRect') secondRect: ElementRef;
  @ViewChild('thirddRect') thirdRect: ElementRef;
  @ViewChild('textEl') svgText: ElementRef;

  private annotations: Annotations;
  @Input() sequence: ISequence;

  private textWidth: number;
  private lastIndexOfLine: number;
  private checkTheRangeAnnotation: number;

  constructor(private renderer: Renderer2, private sequencesService: SequencesService) {
  }

  ngOnInit() {
    this.firstRectFLag = false;
    this.secondRectFlag = false;
    this.thirdRectFLag = false;
    this.textWidth = 840;
    this.lastIndexOfLine = this.sequence.index + this.sequence.arr.length;
    
    this.sequence.doChange = () => {
      this.annotations = this.sequence.annotations;
      this.drawAnnotations();
      return true
    }

    this.annotations = this.sequence.annotations;
    this.drawAnnotations();
  }

  private drawAnnotations() {
    this.annotations.forEach((item: IAnnotation) => {
      const letterWidth = 17;
      this.checkTheRangeAnnotation = item.index + item.length;
      const annotationStartPoint = item.index - this.sequence.index;
      if (this.checkIndexInRangeOfRow(item.index)) {

        if (this.checkTheRangeAnnotation < this.lastIndexOfLine) {
          const calcInPx = (annotationStartPoint + 1) * letterWidth;
          const widthFirstRect = item.length * letterWidth;
          this.showRect(this.firstRect.nativeElement, widthFirstRect, calcInPx, this.firstRectFLag);
        }
        if (this.checkTheRangeAnnotation > this.lastIndexOfLine) {
          const shownLetters = this.lastIndexOfLine - item.index;
          const leftLettersToShow = item.length - shownLetters;
          const widthSecondRect = shownLetters * letterWidth;
          const widthThirdRect = (leftLettersToShow + 1) * letterWidth;
          const calcXpT = (annotationStartPoint + 1) * letterWidth;

          this.thirdRectFLag = true;
          this.renderer.setStyle(this.thirdRect.nativeElement, 'display', 'block');
          this.showRect(this.secondRect.nativeElement, widthSecondRect, calcXpT, this.secondRectFlag);
          this.rectSetAtrribute(this.thirdRect.nativeElement, 'width', widthThirdRect);
        }  // do refactoring
      }
    });

  }

  rectSetAtrribute(rectNum, att, val) {
    this.renderer.setAttribute(rectNum, att, val.toString());
  }
  rectSetStyleDisplay(rectNum, val) {
    this.renderer.setStyle(rectNum, 'display', val);
  }
  showRect(rectNum, width, xPt, flag) {
    flag = true;
    this.rectSetStyleDisplay(rectNum, 'block');
    this.rectSetAtrribute(rectNum, 'width', width);
    this.rectSetAtrribute(rectNum, 'x', xPt);
  }

  ngAfterViewInit() {
    this.svgTextWidth(this.textWidth);
  }

  svgTextWidth(textWidth) {
    this.svgText.nativeElement.textLength.baseVal.newValueSpecifiedUnits(
      SVGLength.SVG_LENGTHTYPE_PX, textWidth);
  }

  checkIndexInRangeOfRow(index: number): boolean {
    if ((index > (this.sequence.index - 1)) && index < this.lastIndexOfLine) {
      return true;
    }
    return false;
  }


}




