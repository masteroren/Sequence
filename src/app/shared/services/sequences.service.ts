import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAnnotation } from '../interfaces/annotation.interface';

@Injectable({
  providedIn: 'root'
})
export class SequencesService {

  private url: string;

  public annotations: any;

  constructor(private httpClient: HttpClient) {
    this.annotations = [
      { 'index': 1, 'length': 20, 'tooltip': 'Annotation 1' },
      { 'index': 33, 'length': 20, 'tooltip': 'Annotation 2' },
      { 'index': 130, 'length': 20, 'tooltip': 'Annotation 3' },
      { 'index': 700, 'length': 20, 'tooltip': 'Annotation 4' },
      { 'index': 730, 'length': 20, 'tooltip': 'Annotation 5' },
      { 'index': 4000, 'length': 20, 'tooltip': 'Annotation 6' },
      { 'index': 28000, 'length': 20, 'tooltip': 'Annotation 7' },
      { 'index': 28100, 'length': 20, 'tooltip': 'Annotation 8' },
      { 'index': 34000, 'length': 20, 'tooltip': 'Annotation 9' },
      { 'index': 34100, 'length': 20, 'tooltip': 'Annotation 10' }
    ];
    this.url = '../assets/data.json';
  }



  getSequences(): Observable<string> {
    return this.httpClient.get<string>(this.url);
  }
  getAnnotations() {
    return this.annotations;
  }
  delAnnotations(setAnn, indexToDelete) {
    this.annotations = setAnn.filter(item => item.index !== Number(indexToDelete));

    console.log('service set', this.annotations);
  }

  addAnnotationToservice(formObjectValue): IAnnotation {
    const annotation: IAnnotation = {
      index: Number(formObjectValue.index), length: Number(formObjectValue.length),
      tooltip: formObjectValue.tooltip
    }
    this.annotations.push(annotation);
    console.log('addAnnotationFromservice', this.annotations);
    return annotation;
  }
}
