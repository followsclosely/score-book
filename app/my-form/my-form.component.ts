import { Component, OnInit } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {
  game = new Game();

  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    alert('Thanks for submitting! Data: ' + JSON.stringify(this.game));
  }
}
