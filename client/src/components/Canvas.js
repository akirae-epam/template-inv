import React, { Component } from 'react';
import * as THREE from 'three';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lionActions from 'actions/lion';
import {Link} from 'react-router-dom';
import {siteRoutes} from 'data/siteRoutes';

var OrbitControls = require('three-orbit-controls')(THREE);

/* Original from here: https://codepen.io/Yakudoo/pen/YXxmYR */

let twitchName = '';
let json = require('config.json');
twitchName = json.twitchName;

class ThreeContainer extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    const scene = new THREE.Scene();

    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 2000;
    let width = window.innerWidth;
    let height = window.innerHeight;
    this.props.lionActions.setWindowHalfX(width/2);
    this.props.lionActions.setWindowHalfY(height/2);
    let mousePos = {x: 0, y: 0};

    let tHeadRotY;
    let tHeadRotX;
    let tHeadPosX;
    let tHeadPosY;
    let tHeadPosZ;

    let tEyeScale;
    let tIrisYScale;
    let tIrisZScale;
    let tIrisPosY;
    let tLeftIrisPosZ;
    let tRightIrisPosZ;

    let tLipsPosX;
    let tLipsPosY;

    let tSmilePosX;
    let tMouthPosZ;
    let tSmilePosZ;
    let tSmilePosY;
    let tSmileRotZ;

    let tRightKneeRotZ;
    let tLeftKneeRotZ;


    //background
    scene.background = new THREE.Color( 0xebe5e7 );

    //camera
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      width / height,
      nearPlane,
      farPlane,
    );
    camera.position.z = 800;
    camera.position.y = 0;
    camera.lookAt(new THREE.Vector3(0,0,0));

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(width, height);
    renderer.shadowMapEnabled = true;


    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('resize', this.setWindowHalfValues, false);

    function onWindowResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    document.addEventListener('mousemove', this.handleMouseMove, false);


    //lights
    const shadowLight = new THREE.DirectionalLight(0xffffff, .8);
    shadowLight.position.set(200, 200, 200);

    const spotLight = new THREE.DirectionalLight(0xffffff, .3);
    spotLight.position.set(-100, 200, 50);

    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5);
    scene.add(light);
    scene.add(shadowLight);
    scene.add(spotLight);

    //floor
    const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,500), new THREE.MeshBasicMaterial({color: 0xebe5e7}));
    floor.rotation.x = -Math.PI/2;
    floor.position.y = -100;
    floor.receiveShadow = true;
    scene.add(floor);

    //lion
    let lion = new THREE.Object3D();

    //geoms
    var bodyGeom = new THREE.CylinderGeometry(30,80, 140, 4);
    var maneGeom = new THREE.BoxGeometry(40,40,15);
    var faceGeom = new THREE.BoxGeometry(80,80,80);
    var spotGeom = new THREE.BoxGeometry(4,4,4);
    var mustacheGeom = new THREE.BoxGeometry(30,2,1);
    mustacheGeom.applyMatrix( new THREE.Matrix4().makeTranslation( 15, 0, 0 ) );

    var earGeom = new THREE.BoxGeometry(20,20,20);
    var noseGeom = new THREE.BoxGeometry(35,35,35);
    var eyeGeom = new THREE.BoxGeometry(5,30,30);
    var irisGeom = new THREE.BoxGeometry(4,10,10);
    var mouthGeom = new THREE.BoxGeometry(20,20,10);
    var smileGeom = new THREE.TorusGeometry( 12, 4, 2, 10, Math.PI );
    var lipsGeom = new THREE.BoxGeometry(40,15,20);
    var kneeGeom = new THREE.BoxGeometry(25, 80, 80);
    kneeGeom.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 50, 0 ) );
    var footGeom = new THREE.BoxGeometry(40, 20, 20);


    let yellowMat = new THREE.MeshLambertMaterial ({
      color: 0xfdd276,
      flatShading:THREE.FlatShading
    });


    let redMat = new THREE.MeshLambertMaterial ({
      color: 0xad3525,
      flatShading:THREE.FlatShading
    });
    let whiteMat = new THREE.MeshLambertMaterial ({
      color: 0xffffff,
      flatShading:THREE.FlatShading
    });


    let greyMat = new THREE.MeshLambertMaterial ({
      color: 0x653f4c,
      flatShading:THREE.FlatShading
    });

    let blackMat = new THREE.MeshLambertMaterial ({
      color: 0x302925,
      flatShading:THREE.FlatShading
    });

    //body
    let body = new THREE.Mesh(bodyGeom, yellowMat);
    body.position.z = -60;
    body.position.y = -30;
    let bodyInitPositions = [];
    let bodyVertices = [0,1,2,3,4,10];
    for (var i=0;i<bodyVertices.length-1; i++){
      var tv = body.geometry.vertices[bodyVertices[i]];
      tv.z =70;
      tv.x = 0;
      bodyInitPositions.push({x:tv.x, y:tv.y, z:tv.z});
    }

    // knee
    let leftKnee = new THREE.Mesh(kneeGeom, yellowMat);
    leftKnee.position.x = 65;
    leftKnee.position.z = -20;
    leftKnee.position.y = -110;
    leftKnee.rotation.z = -.3;

    let rightKnee = new THREE.Mesh(kneeGeom, yellowMat);
    rightKnee.position.x = -65;
    rightKnee.position.z = -20;
    rightKnee.position.y = -110;
    rightKnee.rotation.z = .3;

    // feet
    let backLeftFoot = new THREE.Mesh(footGeom, yellowMat);
    backLeftFoot.position.z = 30;
    backLeftFoot.position.x = 75;
    backLeftFoot.position.y = -90;

    let backRightFoot = new THREE.Mesh(footGeom, yellowMat);
    backRightFoot.position.z = 30;
    backRightFoot.position.x = -75;
    backRightFoot.position.y = -90;

    let frontRightFoot = new THREE.Mesh(footGeom, yellowMat);
    frontRightFoot.position.z = 40;
    frontRightFoot.position.x = -22;
    frontRightFoot.position.y = -90;

    let frontLeftFoot = new THREE.Mesh(footGeom, yellowMat);
    frontLeftFoot.position.z = 40;
    frontLeftFoot.position.x = 22;
    frontLeftFoot.position.y = -90;

    //head
    let head = new THREE.Group();

    // face
    let face = new THREE.Mesh(faceGeom, yellowMat);
    face.position.z = 135;

    let mustaches = [];

    let mustache1 = new THREE.Mesh(mustacheGeom, greyMat);
    mustache1.position.x = 30;
    mustache1.position.y = -5;
    mustache1.position.z = 175;
    let mustache2 = mustache1.clone();
    mustache2.position.x = 35;
    mustache2.position.y = -12;
    let mustache3 = mustache1.clone();
    mustache3.position.y = -19;
    mustache3.position.x = 30;
    let mustache4 = mustache1.clone();
    mustache4.rotation.z = Math.PI;
    mustache4.position.x = -30;
    let mustache5 = new THREE.Mesh(mustacheGeom, blackMat);
    mustache5 = mustache2.clone();
    mustache5.rotation.z = Math.PI;
    mustache5.position.x = -35;
    let mustache6 = new THREE.Mesh(mustacheGeom, blackMat);
    mustache6 = mustache3.clone();
    mustache6.rotation.z = Math.PI;
    mustache6.position.x = -30;

    mustaches.push(mustache1);
    mustaches.push(mustache2);
    mustaches.push(mustache3);
    mustaches.push(mustache4);
    mustaches.push(mustache5);
    mustaches.push(mustache6);

    // eyes
    let leftEye = new THREE.Mesh(eyeGeom, whiteMat);
    leftEye.position.x = 40;
    leftEye.position.z = 120;
    leftEye.position.y = 25;

    let rightEye = new THREE.Mesh(eyeGeom, whiteMat);
    rightEye.position.x = -40;
    rightEye.position.z = 120;
    rightEye.position.y = 25;

    // iris
    let leftIris = new THREE.Mesh(irisGeom, blackMat);
    leftIris.position.x = 42;
    leftIris.position.z = 120;
    leftIris.position.y = 25;

    let rightIris = new THREE.Mesh(irisGeom, blackMat);
    rightIris.position.x = -42;
    rightIris.position.z = 120;
    rightIris.position.y = 25;

    // mouth
    let mouth = new THREE.Mesh(mouthGeom, blackMat);
    mouth.position.z = 171;
    mouth.position.y = -30;
    mouth.scale.set(.5,.5,1);

    // smile
    let smile = new THREE.Mesh(smileGeom, greyMat);
    smile.position.z = 173;
    smile.position.y = -15;
    smile.rotation.z = -Math.PI;

    // lips
    let lips = new THREE.Mesh(lipsGeom, yellowMat);
    lips.position.z = 165;
    lips.position.y = -45;

    // ear
    let rightEar = new THREE.Mesh(earGeom, yellowMat);
    rightEar.position.x = -50;
    rightEar.position.y = 50;
    rightEar.position.z = 105;

    let leftEar = new THREE.Mesh(earGeom, yellowMat);
    leftEar.position.x = 50;
    leftEar.position.y = 50;
    leftEar.position.z = 105;

    // nose
    let nose = new THREE.Mesh(noseGeom, greyMat);
    nose.position.z = 160;
    nose.position.y = 25;

    // spots
    let spot1 = new THREE.Mesh(spotGeom, redMat);
    spot1.position.x = 39;
    spot1.position.z = 150;

    let spot2 = spot1.clone();
    spot2.position.z = 160;
    spot2.position.y = -10;

    let spot3 = spot1.clone();
    spot3.position.z = 140;
    spot3.position.y = -15;

    let spot4 = spot1.clone();
    spot4.position.z = 150;
    spot4.position.y = -20;

    let spot5 = spot1.clone();
    spot5.position.x = -39;
    let spot6 = spot2.clone();
    spot6.position.x = -39;
    let spot7 = spot3.clone();
    spot7.position.x = -39;
    let spot8 = spot4.clone();
    spot8.position.x = -39;

    // mane
    let maneParts = [];
    let mane = new THREE.Group();
    for (var j=0; j<4; j++){
      for (var k=0; k<4; k++){
        var manePart = new THREE.Mesh(maneGeom, redMat);
        manePart.position.x = (j*40)-60;
        manePart.position.y = (k*40)-60;

        var amp;
        var zOffset;
        var periodOffset = Math.random()*Math.PI*2;

        if ((j===0 && k===0) || (j===0 && k===3) || (j===3 && k===0) || (j===3 && k===3)){
          amp = -10-Math.floor(Math.random()*5);
          zOffset = -5;
        }else if (j===0 || k ===0 || j===3 || k===3){
          amp = -5-Math.floor(Math.random()*5);
          zOffset = 0;
        }else{
          amp = 0;
          zOffset = 0;
        }

        maneParts.push({mesh:manePart, amp:amp, zOffset:zOffset, periodOffset:periodOffset, xInit:manePart.position.x, yInit:manePart.position.y});
        mane.add(manePart);
      }
    }
    mane.position.y = -10;
    mane.position.z = 80;

    head.add(mustache1);
    head.add(mustache2);
    head.add(mustache3);
    head.add(mustache4);
    head.add(mustache5);
    head.add(mustache6);

    head.add(face);
    head.add(mane);
    head.add(rightEar);
    head.add(leftEar);
    head.add(nose);
    head.add(leftEye);
    head.add(rightEye);
    head.add(leftIris);
    head.add(rightIris);
    head.add(mouth);
    head.add(smile);
    head.add(lips);

    head.add(spot1);
    head.add(spot2);
    head.add(spot3);
    head.add(spot4);
    head.add(spot5);
    head.add(spot6);
    head.add(spot7);
    head.add(spot8);

    lion.add(body);
    lion.add(leftKnee);
    lion.add(rightKnee);
    lion.add(backLeftFoot);
    lion.add(backRightFoot);
    lion.add(frontRightFoot);
    lion.add(frontLeftFoot);
    lion.add(head);

    lion.traverse( function ( object ) {
      if ( object instanceof THREE.Mesh ) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    scene.add(lion);

    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.lion = lion;
    this.mane = mane;
    this.mousePos = mousePos;

    this.tHeadRotY = tHeadRotY;
    this.tHeadRotX = tHeadRotX;
    this.tHeadPosX =tHeadPosX;
    this.tHeadPosY = tHeadPosY;
    this.tHeadPosZ = tHeadPosZ;

    this.tEyeScale = tEyeScale;
    this.tIrisYScale = tIrisYScale;
    this.tIrisZScale = tIrisZScale;
    this.tIrisPosY = tIrisPosY;
    this.tLeftIrisPosZ = tLeftIrisPosZ;
    this.tRightIrisPosZ = tRightIrisPosZ;

    this.tLipsPosX = tLipsPosX;
    this.tLipsPosY = tLipsPosY;

    this.tSmilePosX = tSmilePosX;
    this.tMouthPosZ = tMouthPosZ;
    this.tSmilePosZ =tSmilePosZ;
    this.tSmilePosY = tSmilePosY;
    this.tSmileRotZ = tSmileRotZ;

    this.tRightKneeRotZ = tRightKneeRotZ;
    this.tLeftKneeRotZ = tLeftKneeRotZ;

    this.head = head;

    this.leftEye = leftEye;
    this.rightEye = rightEye;

    this.leftIris = leftIris;
    this.rightIris = rightIris;

    this.rightKnee = rightKnee;
    this.leftKnee = leftKnee;

    this.lips = lips;
    this.smile = smile;
    this.mouth = mouth;

    this.bodyVertices = bodyVertices;
    this.bodyInitPositions = bodyInitPositions;
    this.body = body;

    //document.bodyappendChild(renderer.domElement)
    this.mount.appendChild(this.renderer.domElement);

    this.start();
  }

  //game logic
  update () {
    this.renderScene();
    let xTarget = (this.mousePos.x-this.props.windowHalfX);
    let yTarget= (this.mousePos.y-this.props.windowHalfY);
    if (this.props.isSmiling) {
      this.startSmile(xTarget, yTarget);
    }
    else {
      this.look(xTarget, yTarget);
    }
    this.frameId = window.requestAnimationFrame(this.update);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.update);
    }
  }

  //load scene
  renderScene () {
    //renderer.render(scene, camera);
    this.renderer.render(this.scene, this.camera);
  }

  handleMouseMove = (event) => {
    this.mousePos = {x:event.clientX, y:event.clientY};
  }

  rule3 =(v,vmin,vmax,tmin, tmax) => {
    var nv = Math.max(Math.min(v,vmax), vmin);
    var dv = vmax-vmin;
    var pc = (nv-vmin)/dv;
    var dt = tmax-tmin;
    var tv = tmin + (pc*dt);
    return tv;
  }

  look = (xTarget, yTarget) =>{
    this.tHeadRotY = this.rule3(xTarget, -200, 200, -Math.PI/4, Math.PI/4);
    this.tHeadRotX = this.rule3(yTarget, -200,200, -Math.PI/4, Math.PI/4);
    this.tHeadPosX = this.rule3(xTarget, -200, 200, 70,-70);
    this.tHeadPosY = this.rule3(yTarget, -140, 260, 20, 100);
    this.tHeadPosZ = 0;

    this.tEyeScale = 1;
    this.tIrisYScale = 1;
    this.tIrisZScale = 1;
    this.tIrisPosY = this.rule3(yTarget, -200,200, 35,15);
    this.tLeftIrisPosZ = this.rule3(xTarget, -200, 200, 130, 110);
    this.tRightIrisPosZ = this.rule3(xTarget, -200, 200, 110, 130);

    this.tLipsPosX = 0;
    this.tLipsPosY = -45;

    this.tSmilePosX = 0;
    this.tMouthPosZ = 174;
    this.tSmilePosZ = 173;
    this.tSmilePosY = -15;
    this.tSmileRotZ = -Math.PI;

    this.tRightKneeRotZ = this.rule3(xTarget, -200, 200, .3-Math.PI/8, .3+Math.PI/8);
    this.tLeftKneeRotZ = this.rule3(xTarget, -200, 200, -.3-Math.PI/8, -.3+Math.PI/8);
    this.updateBody(10);

    this.mane.rotation.y = 0;
    this.mane.rotation.x = 0;

    /*
    for (var i=0; i<this.maneParts.length; i++){
      var m = this.maneParts[i].mesh;
      m.position.z = 0;
      m.rotation.y = 0;
    }

    for (var i=0; i<this.mustaches.length; i++){
      var m = this.mustaches[i];
      m.rotation.y = 0;
    }*/

    for (var i=0; i<this.bodyVertices.length -1; i++){
      var tvInit = this.bodyInitPositions[i];
      var tv = this.body.geometry.vertices[this.bodyVertices[i]];
      tv.x = tvInit.x + this.head.position.x;
    }

    this.body.geometry.verticesNeedUpdate = true;

  }

  updateBody = (speed) => {
    this.head.rotation.y += (this.tHeadRotY - this.head.rotation.y) / speed;
    this.head.rotation.x += (this.tHeadRotX - this.head.rotation.x) / speed;
    this.head.position.x += (this.tHeadPosX-this.head.position.x) / speed;
    this.head.position.y += (this.tHeadPosY-this.head.position.y) / speed;
    this.head.position.z += (this.tHeadPosZ-this.head.position.z) / speed;

    this.leftEye.scale.y += (this.tEyeScale - this.leftEye.scale.y) / (speed*2);
    this.rightEye.scale.y = this.leftEye.scale.y;

    this.leftIris.scale.y += (this.tIrisYScale - this.leftIris.scale.y) / (speed*2);
    this.rightIris.scale.y = this.leftIris.scale.y;

    this.leftIris.scale.z += (this.tIrisZScale - this.leftIris.scale.z) / (speed*2);
    this.rightIris.scale.z = this.leftIris.scale.z;

    this.leftIris.position.y += (this.tIrisPosY - this.leftIris.position.y) / speed;
    this.rightIris.position.y = this.leftIris.position.y;
    this.leftIris.position.z += (this.tLeftIrisPosZ - this.leftIris.position.z) / speed;
    this.rightIris.position.z += (this.tRightIrisPosZ - this.rightIris.position.z) / speed;

    this.rightKnee.rotation.z += (this.tRightKneeRotZ - this.rightKnee.rotation.z) / speed;
    this.leftKnee.rotation.z += (this.tLeftKneeRotZ - this.leftKnee.rotation.z) / speed;

    this.lips.position.x += (this.tLipsPosX - this.lips.position.x) / speed;
    this.lips.position.y += (this.tLipsPosY - this.lips.position.y) / speed;
    this.smile.position.x += (this.tSmilePosX - this.smile.position.x) / speed;
    this.mouth.position.z += (this.tMouthPosZ - this.mouth.position.z) / speed;
    this.smile.position.z += (this.tSmilePosZ - this.smile.position.z) / speed;
    this.smile.position.y += (this.tSmilePosY - this.smile.position.y) / speed;
    this.smile.rotation.z += (this.tSmileRotZ - this.smile.rotation.z) / speed;
  }

  startSmile = (xTarget, yTarget) => {
    this.tEyeScale = 0.1;
    this.tIrisYScale = 0.1;
    this.tIrisZScale = 3;

    this.tIrisPosY = 24;
    this.tLeftIrisPosZ = 120;
    this.tRightIrisPosZ = 120;

    //this.tLipsPosX = this.rule3(xTarget, -200, 200, -15,15);
    //this.tLipsPosY = this.rule3(yTarget, -200, 200, -45,-40);

    this.tMouthPosZ = 168;
    this.tSmilePosZ = 176;
    this.tSmileRotZ = this.rule3(xTarget, -200, 200, -Math.PI-.3, -Math.PI+.3);

    this.updateBody(10);

    this.body.geometry.verticesNeedUpdate = true;
  }

  setSmiling = () => {
    this.props.lionActions.setSmile(true);
  }
  stopSmiling = () => {
    this.props.lionActions.setSmile(false);
  }
  setWindowHalfValues = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    this.props.lionActions.setWindowHalfX(width/2);
    this.props.lionActions.setWindowHalfY(height/2);
  }
  render () {

    const {
      liveValues,
      isLive = liveValues.isLive,
    } = this.props;

    return (
      <div>
        <div
          className="canvas_container"
          ref={(mount) => { this.mount = mount; }}
          onMouseEnter={()=>this.stopSmiling()}
        />
        <Link to={siteRoutes.twitchScreen}>
          {isLive ?
            <div
              className="text_block"
              onMouseEnter={()=>this.setSmiling()}
              onMouseLeave={()=>this.stopSmiling()}
            >
              Stream is online
            </div>
            :
            <div
              className="text_block"
              onMouseEnter={()=>this.setSmiling()}
              onMouseLeave={()=>this.stopSmiling()}
            >
            Stream is offline
            </div>
          }
        </Link>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    liveValues: state.twitch.liveValues,
    isSmiling: state.lion.isSmiling,
    windowHalfX: state.lion.windowHalfX,
    windowHalfY: state.lion.windowHalfY,
  }),
  dispatch => ({
    lionActions: bindActionCreators(lionActions, dispatch),
  }),
)(ThreeContainer);