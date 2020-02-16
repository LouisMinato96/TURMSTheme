import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {

  blockUnit = 300;
  initiated: boolean = false;
  unitGlowClass: string = 'unit-Glow-1';

  constructor() { }

  initiateBoxMaking(){
    setTimeout(() => {
      this.initiated = true;
    },200);
  }

  ngOnInit() {
    this.initiateBoxMaking();
  }

}
