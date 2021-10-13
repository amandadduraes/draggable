import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DraggableModule } from './draggable/draggable.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DraggableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
