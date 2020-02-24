import { Component, OnInit } from '@angular/core';
import { TURMS_LOGO } from 'src/app/shared/themeDefaults/galaxyDefaults';
import { SharedService } from 'src/app/shared/SharedService/sharedMessage.service';

@Component({
  selector: 'app-custom-galaxy',
  templateUrl: './custom-galaxy.component.html',
  styleUrls: ['./custom-galaxy.component.scss']
})
export class CustomGalaxyComponent implements OnInit {

  UNIT_SIZE: number = 300;
  GALAXY_2D_MAP = TURMS_LOGO;
  // GALAXY_2D_MAP = [
  //   [ 0, 1, 0],
  //   [ 1, 1, 1],
  //   [ 0, 1, 0]
  // ];
  GALAXY_2D_MAP_CubeZ_POS = new Array(this.GALAXY_2D_MAP.length).fill( new Array(this.GALAXY_2D_MAP[0].length).fill( 0 ) ) ;
  

  GALAXY_WIDTH: number = 0;
  GALAXY_HEIGHT: number = 0;
  galaxy_POS_X : number = 0;
  galaxy_POS_Y : number = 0;
  galaxy_2d_map_container_POS : number = 0;

  cubeArrayWhoseFacesToShow = [];
  cube_offset_Z = 1000;

  randomize_box = false;
  show_5_faces = false;

  constructor( private messageService: SharedService) { }

  ngOnInit() {
    this.setGalaxy();
    setTimeout( () => {
      this.startCubeAnimation();
    }  , 0);

    setTimeout( () => {
      this.randomize_box = true;
    }  , 5000);

    setTimeout( () => {
      this.show_5_faces = false;
    }  , 8000);
  }

  setGalaxy(){
    this.GALAXY_WIDTH = this.UNIT_SIZE * this.GALAXY_2D_MAP[0].length;
    this.GALAXY_HEIGHT = this.UNIT_SIZE * this.GALAXY_2D_MAP.length;
    this.galaxy_POS_X = -( this.GALAXY_WIDTH - window.innerWidth ) / 2;
    this.galaxy_POS_Y = -( this.GALAXY_HEIGHT - window.innerHeight ) / 2;
    this.galaxy_2d_map_container_POS = -3 * Math.max ( this.GALAXY_WIDTH , this.GALAXY_HEIGHT );
    this.cube_offset_Z = this.galaxy_2d_map_container_POS/3;

    this.GALAXY_2D_MAP_CubeZ_POS = [];
    for( let i = 0; i < this.GALAXY_2D_MAP.length ; i++ ){
      let t_arr = []
      for( let j = 0; j < this.GALAXY_2D_MAP[i].length ; j++ ){
        let t_random = this.getRandomInt( -this.cube_offset_Z, this.cube_offset_Z );
        t_arr.push(t_random);
      }
      this.GALAXY_2D_MAP_CubeZ_POS.push(t_arr);
    }
    console.log(this.GALAXY_2D_MAP_CubeZ_POS);
  }

  startCubeAnimation(){
    this.messageService.sendMessage( 'START_CUBE_ANIMATION' , { } )
  }

  getCubePos(i,j){
    if( !this.randomize_box ){
      return 0;
    }

    return this.GALAXY_2D_MAP_CubeZ_POS[i][j];
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  showFiveFaces(i,j){

    if( this.show_5_faces ){
      return true;
    }

    return false;
  }

}
