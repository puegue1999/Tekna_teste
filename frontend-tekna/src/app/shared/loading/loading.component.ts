import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoadingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
