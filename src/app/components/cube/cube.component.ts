import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {

  @Input() unitCellSize ;

  blockUnit = 300;
  initiated: boolean = false;
  unitGlowClass: string = 'unit-Glow-1';
  face1_AnimationDuration = '9000ms';
  face2_AnimationDuration = '9000ms';
  face3_AnimationDuration = '9000ms';
  face4_AnimationDuration = '9000ms';
  face5_AnimationDuration = '9000ms';
  face6_AnimationDuration = '9000ms';

  constructor() { }

  ngOnInit() {
    this.initiateBoxMaking();
  }

  initiateBoxMaking(){
    setTimeout(() => {
      this.initiated = true;
    },200);
    this.blockUnit = typeof this.unitCellSize != 'undefined' ? this.unitCellSize : 300;
    this.unitGlowClass = 'unit-Glow-' + this.getRandomInt( 1, 5);
    this.face1_AnimationDuration = this.getRandomInt(8000, 10000) + 'ms';
    this.face2_AnimationDuration = this.getRandomInt(8000, 10000) + 'ms';
    this.face3_AnimationDuration = this.getRandomInt(8000, 10000) + 'ms';
    this.face4_AnimationDuration = this.getRandomInt(8000, 10000) + 'ms';
    this.face5_AnimationDuration = this.getRandomInt(8000, 10000) + 'ms';
    this.face6_AnimationDuration = this.getRandomInt(8000, 10000) + 'ms';
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

}
