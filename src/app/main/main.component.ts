import { Component, OnInit, Injector, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  showFiller;
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
}
