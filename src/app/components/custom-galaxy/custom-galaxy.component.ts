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

  cubeArrayWhoseFacesToShow = [[1,3]];
  cube_offset_Z = 1000;

  // CHECK
  randomize_box = false;
  show_5_faces = false;

  camPos_X = 0;
  camPos_Y = 0;
  camPos_Z = 0;

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
      this.show_5_faces = true;
    }  , 4000);

    setTimeout( () => {
      this.goToCube();
    } , 8000);
  }

  goToCube(){

    
    let cube_i = this.cubeArrayWhoseFacesToShow[0][0];
    let cube_j = this.cubeArrayWhoseFacesToShow[0][1];

    var cubePos = this.getCubeOldPos( cube_i, cube_j);
    var new_cubePos = this.get_XYZpos_whenXYZaxisRotation(  cubePos , 30, 0, 0);
    // var new_cubePos = this.get_XYZpos_whenXYZaxisRotation(  cubePos , 0, 0, 0);
    console.log('CUBE POSITION', cube_i, cube_j, 'OLD:-',cubePos, 'NEW:-', new_cubePos );

    var scale_val = 1;

    let t_camPos_X = ( (  new_cubePos[0] + (this.UNIT_SIZE/2) ) * scale_val  ) * -1;
    this.camPos_X = t_camPos_X;
    let t_camPos_Y = (  ( new_cubePos[1] - (this.UNIT_SIZE/2) ) * scale_val  );
    this.camPos_Y = t_camPos_Y;
    let t_camPos_Z = -((( new_cubePos[2] + (this.UNIT_SIZE*scale_val) ) * scale_val  ) + this.galaxy_2d_map_container_POS )  ;
    this.camPos_Z = t_camPos_Z;
    console.log('FIRST PERSON VIEW POS', t_camPos_X, t_camPos_Y, t_camPos_Z );
  }

  setGalaxy(){
    this.GALAXY_WIDTH = this.UNIT_SIZE * this.GALAXY_2D_MAP[0].length;
    this.GALAXY_HEIGHT = this.UNIT_SIZE * this.GALAXY_2D_MAP.length;
    this.galaxy_POS_X = -( this.GALAXY_WIDTH - window.innerWidth ) / 2;
    this.galaxy_POS_Y = -( this.GALAXY_HEIGHT - window.innerHeight ) / 2;
    this.galaxy_2d_map_container_POS = -3 * Math.max ( this.GALAXY_WIDTH , this.GALAXY_HEIGHT );
    this.cube_offset_Z = this.galaxy_2d_map_container_POS/2;

    this.GALAXY_2D_MAP_CubeZ_POS = [];
    for( let i = 0; i < this.GALAXY_2D_MAP.length ; i++ ){
      let t_arr = []
      for( let j = 0; j < this.GALAXY_2D_MAP[i].length ; j++ ){
        let t_random = this.getRandomInt( -this.cube_offset_Z, this.cube_offset_Z );
        t_arr.push(t_random);
      }
      this.GALAXY_2D_MAP_CubeZ_POS.push(t_arr);
    }
    // console.log(this.GALAXY_2D_MAP_CubeZ_POS);
  }

  startCubeAnimation(){
    this.messageService.sendMessage( 'START_CUBE_ANIMATION' , { } )
  }

  getCubePos(i,j){
    if( true || !this.randomize_box  ){
      return 0;
    }
    return this.GALAXY_2D_MAP_CubeZ_POS[i][j];
  }

  getCubeOldPos(i,j){

    let ypos_yaxis = (  this.GALAXY_2D_MAP_CubeZ_POS.length/2   ) - i;
    let xpos_xaxis = j - (  this.GALAXY_2D_MAP_CubeZ_POS[0].length/2  );
    console.log('AXIS POSITION :- x:', xpos_xaxis ,'\ty:', ypos_yaxis, this.GALAXY_2D_MAP_CubeZ_POS.length, this.GALAXY_2D_MAP_CubeZ_POS[0].length );
    let y_pos  = ( ypos_yaxis ) * this.UNIT_SIZE;
    let x_pos  = ( xpos_xaxis ) * this.UNIT_SIZE;
    let cube_ran_z = this.getCubePos(i,j);

    var z_pos  = cube_ran_z;
    return [  x_pos,  y_pos,  z_pos ];
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  showFiveFaces(i,j){

    // if( this.show_5_faces){
    //   return true;
    // }

    if( this.show_5_faces && ( i == this.cubeArrayWhoseFacesToShow[0][0] && j == this.cubeArrayWhoseFacesToShow[0][1] ) ){
      return true;
    }

    return false;
  }

  toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  get_XYZpos_whenXYZaxisRotation( old_XYZpos, deg_X,  deg_Y,  deg_Z ){
    
    var rad_X = this.toRadians( deg_X );
    var rad_Y = this.toRadians( deg_Y );
    var rad_Z = this.toRadians( deg_Z );

    var Xrotation_matrix = [
      [ 1 , 0                ,   0                       ],
      [ 0 , Math.cos( rad_X ),   Math.sin( rad_X ) * -1  ],
      [ 0 , Math.sin( rad_X ),   Math.cos( rad_X )       ]
    ];

    var Yrotation_matrix = [
      [ Math.cos( rad_Y )       , 0 ,   Math.sin( rad_Y )    ],
      [ 0                       , 1 ,   0                    ],
      [ Math.sin( rad_Y ) * -1  , 0 ,   Math.cos( rad_Y )    ]
    ];

    var Zrotation_matrix = [
      [ Math.cos( rad_Z ) , Math.sin( rad_Z ) * -1  , 0   ],
      [ Math.sin( rad_Z ) , Math.cos( rad_Z )       , 0   ],
      [ 0                 , 0                       , 1   ]
    ];

    var rotation_3D_matrix = this.matrixMultiplication3x3(  this.matrixMultiplication3x3(  Zrotation_matrix  , Yrotation_matrix)  , Xrotation_matrix  );
    var new_XYZpos = [  0,  0,  0];
    new_XYZpos = this.getNew_XYZpos(  rotation_3D_matrix , old_XYZpos );

    return new_XYZpos;
  }

  getNew_XYZpos(  rotMatrix , old_XYZpos  ){

    var new_XYZpos = [  0,  0,  0 ];

    new_XYZpos[0] = rotMatrix[0][0] * old_XYZpos[0] + rotMatrix[0][1] * old_XYZpos[0] + rotMatrix[0][2] * old_XYZpos[0];
    new_XYZpos[1] = rotMatrix[1][0] * old_XYZpos[1] + rotMatrix[1][1] * old_XYZpos[1] + rotMatrix[1][2] * old_XYZpos[1];
    new_XYZpos[2] = rotMatrix[2][0] * old_XYZpos[2] + rotMatrix[2][1] * old_XYZpos[2] + rotMatrix[2][2] * old_XYZpos[2];

    return new_XYZpos;
  }

  matrixMultiplication3x3( a , b ){
    var productAns = [
      [ 0,  0,  0],
      [ 0,  0,  0],
      [ 0,  0,  0]
    ];

    productAns[0][0] = a[0][0]*b[0][0]+a[0][1]*b[1][0]+a[0][2]*b[2][0];
    productAns[0][1] = a[0][0]*b[0][1]+a[0][1]*b[1][1]+a[0][2]*b[2][1];
    productAns[0][2] = a[0][0]*b[0][2]+a[0][1]*b[1][2]+a[0][2]*b[2][2];
    productAns[1][0] = a[1][0]*b[0][0]+a[1][1]*b[1][0]+a[1][2]*b[2][0];
    productAns[1][1] = a[1][0]*b[0][1]+a[1][1]*b[1][1]+a[1][2]*b[2][1];
    productAns[1][2] = a[1][0]*b[0][2]+a[1][1]*b[1][2]+a[1][2]*b[2][2];
    productAns[2][0] = a[2][0]*b[0][0]+a[2][1]*b[1][0]+a[2][2]*b[2][0];
    productAns[2][1] = a[2][0]*b[0][1]+a[2][1]*b[1][1]+a[2][2]*b[2][1];
    productAns[2][2] = a[2][0]*b[0][2]+a[2][1]*b[1][2]+a[2][2]*b[2][2];

    return productAns;

  }

  

}
