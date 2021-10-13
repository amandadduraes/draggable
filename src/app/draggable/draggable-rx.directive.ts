import { Directive, EventEmitter, HostBinding, HostListener, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { repeat, switchMap, take, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appDraggableRx]'
})
export class DraggableRxDirective implements OnInit {
  @HostBinding('class.draggable') draggable = true;

  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter();
  @Output() dragEnd = new EventEmitter();
  
  private pointerDown = new Subject<PointerEvent>();
  private pointerMove = new Subject<PointerEvent>();
  private pointerUp = new Subject<PointerEvent>();

  @HostListener('pointerdown',['$event']) onPointerDown(event: PointerEvent): void {
    this.pointerDown.next(event);
  }

  @HostListener('document: pointermove',['$event']) onPointerMove(event: PointerEvent): void {
    this.pointerDown.next(event);
  }
  
  @HostListener('document:pointerup',['$event']) onPointerUp(event: PointerEvent): void {
    this.pointerDown.next(event);
  }
  ngOnInit(): void {
  this.pointerDown.asObservable().subscribe(event => this.dragStart.emit(event));

  this.pointerDown.pipe(
      switchMap(() => this.pointerMove),
      takeUntil(this.pointerUp),
      repeat()
    ).subscribe(event => this.dragMove.emit(event));

  this.pointerDown.pipe(
      switchMap(() => this.pointerUp),
      take(1),
      repeat()
    ).subscribe(event => this.dragEnd.emit(event));;

  }
}

