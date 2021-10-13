import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { DraggableRxDirective } from './draggable-rx.directive';



@NgModule({
  declarations: [
    DraggableDirective,
    DraggableRxDirective
  ],
  exports: [DraggableDirective, DraggableRxDirective],
  imports: [
    CommonModule,
    
  ]
})
export class DraggableModule { }
