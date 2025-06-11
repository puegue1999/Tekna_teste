import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class ModalComponent implements OnInit {
  @Input() message: string = '';
  @Input() backButton: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  closeModal(action: 'back' | 'confirm') {
    this.close.emit(action === 'confirm');
  }
}
