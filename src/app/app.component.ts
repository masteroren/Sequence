import { Component, OnInit } from '@angular/core';
import { SequencesService } from './shared/services/sequences.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Sequences, ISequence } from './shared/interfaces/sequence.interface';
import { IAnnotation } from './shared/interfaces/annotation.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'twistBio';
  private sequences: any;
  public arrSequences: Sequences;
  public index: number[];
  public indexToDelete: number;
  signupForm: FormGroup;

  private offset: number = 50;

  constructor(private sequencesService: SequencesService) { }

  ngOnInit() {

    this.signupForm = new FormGroup({
      'index': new FormControl(null, [Validators.required]),
      'length': new FormControl(null, [Validators.required]),
      'tooltip': new FormControl(null, [Validators.required])
    });

    this.indexToDelete = -1;
    this.index = [];
    this.arrSequences = [];
    this.getSequences();
  }

  getSequences() {
    const annotations = this.sequencesService.getAnnotations();
    this.sequencesService.getSequences().subscribe(data => {
      this.sequences = data['text'].split('');
      for (let i = 0; i < this.sequences.length; i += this.offset) {
        this.arrSequences.push({
          index: i + 1,
          arr: this.sequences.slice(i, i + this.offset),
          from: i + 1,
          to: i + this.offset,
          annotations: ((annotations) => {
            return annotations.filter((annotation: IAnnotation) => annotation.index >= i + 1 && annotation.index <= i + this.offset);
          })(annotations)
        });
      }
      console.log(this.arrSequences);
    });
  }

  // deleteIndexAnnotation(deleteIndex) {
  //   this.indexToDelete = deleteIndex;
  // }

  onSubmit() {
    const newAnnotation = this.sequencesService.addAnnotationToservice(this.signupForm.value);
    const seq: ISequence = this.arrSequences.find((seq: ISequence) => newAnnotation.index >= seq.from && newAnnotation.index <= seq.to);
    if (seq) {
      seq.annotations.push(newAnnotation);
      seq.doChange();
    }

  }

  AddAnnotationFromLine(ann) {
    console.log('ann', ann);
  }

  deleteAnnotation(index) {
    console.log('index', index);

    if (/\S/.test(index)) {

      this.indexToDelete = index;
    }
  }

  onFocusMethod(deleteInput: HTMLInputElement): void {
    deleteInput.value = '';
  }

}

// this.annotations = this.annotations.filter(item => item.index !== myIndex);
// console.log('delete', this.annotations);
