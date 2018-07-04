import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SequencesService } from './shared/services/sequences.service';
import { SequencesComponent } from './sequences/sequences.component';
import { SequenceLineComponent } from './sequence-line/sequence-line.component';
import { TooltipModule } from 'ngx-tooltip';
import { AnnotationFuncsComponent } from './annotation-funcs/annotation-funcs.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SequencesComponent,
    SequenceLineComponent,
    AnnotationFuncsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TooltipModule,
    ReactiveFormsModule
  ],
  providers: [SequencesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
