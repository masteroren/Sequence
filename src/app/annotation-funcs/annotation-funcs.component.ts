import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-annotation-funcs',
  templateUrl: './annotation-funcs.component.html',
  styleUrls: ['./annotation-funcs.component.scss']
})
export class AnnotationFuncsComponent implements OnInit {

  @Output() deleteAnnotationCall: EventEmitter<boolean> = new EventEmitter<boolean>();
  // @Output() addAnnotation: EventEmitter<number> = new EventEmitter<number>();

  // signupForm: FormGroup;

  constructor() { }

  ngOnInit() {
    // this.signupForm = new FormGroup({
    //   'index': new FormControl(null, [Validators.required]),
    //   'length': new FormControl(null, [Validators.required]),
    //   'tooltip': new FormControl(null, [Validators.required])
    // });
  }

  // onSubmit() {
  //   console.log(this.signupForm);
  //   this.addAnnotation.emit(this.signupForm.value);
  // }


  deleteAnnotation(index) {
    console.log('index', index);

    if (/\S/.test(index)) {

      this.deleteAnnotationCall.emit(index);
    }
  }

  onFocusMethod(deleteInput: HTMLInputElement): void {
    deleteInput.value = '';
  }

}
