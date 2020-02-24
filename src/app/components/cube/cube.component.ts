import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared/SharedService/sharedMessage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit, OnDestroy {

  @Input() unitCellSize ;
  @Input() showFiveFaces = true;
  private subscriptions = new Subscription();

  blockUnit = 300;
  initiated: boolean = true;
  unitGlowClass: string = 'unit-Glow-1';
  animationName: string = null;
  face1_AnimationDuration = '0ms';
  face2_AnimationDuration = '0ms';
  face3_AnimationDuration = '0ms';
  face4_AnimationDuration = '0ms';
  face5_AnimationDuration = '0ms';
  face6_AnimationDuration = '0ms';

  constructor(private messageService: SharedService) { }

  ngOnInit() {
    this.initiateBoxMaking();
    this.messageListener();
  }

  messageListener(){
    this.subscriptions.add( this.messageService.getMessage().subscribe( (message) => {
      
      if( typeof message.messageType != 'undefined'){
        if( message.messageType == 'START_CUBE_ANIMATION'){
          console.log('Starting Animation');
          this.startAnimation();
        }
      }
    }));
  }

  startAnimation(){
    this.initiated = true;
    this.animationName = 'glowAnimation';
    this.face1_AnimationDuration = this.getRandomInt(4000, 8000) + 'ms';
    this.face2_AnimationDuration = this.getRandomInt(4000, 8000) + 'ms';
    this.face3_AnimationDuration = this.getRandomInt(4000, 8000) + 'ms';
    this.face4_AnimationDuration = this.getRandomInt(4000, 8000) + 'ms';
    this.face5_AnimationDuration = this.getRandomInt(4000, 8000) + 'ms';
    this.face6_AnimationDuration = this.getRandomInt(4000, 8000) + 'ms';
  }

  initiateBoxMaking(){

    this.blockUnit = typeof this.unitCellSize != 'undefined' ? this.unitCellSize : 300;
    this.unitGlowClass = 'unit-Glow-' + this.getRandomInt( 1, 5);
    
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
