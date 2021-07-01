import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { Rhino3dmLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/3DMLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#backg'),
    alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setY(20);
camera.position.setZ(30);

//const ambientlight = new THREE.AmbientLight(0xffffff);
const pointlight1 = new THREE.PointLight(0xffffff, 0.9, 200);
pointlight1.position.set(0, 50, 10);
pointlight1.castShadow = true;
scene.add(pointlight1);

const geometry = new THREE.SphereGeometry(3, 32, 32);
const bgLoader = new THREE.TextureLoader();
const luciaTexture = bgLoader.load('lucia.jpeg');
var luciaMaterial = new THREE.MeshBasicMaterial({
  map: luciaTexture
});
const mesh = new THREE.Mesh(geometry, luciaMaterial);
scene.add(mesh);
mesh.position.set(20, 3, -20);

let bbero;
const rhinoLoader = new Rhino3dmLoader();
rhinoLoader.setLibraryPath( 'https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/' );
rhinoLoader.load(
    'bbero.3dm',
    function (obj) {
        bbero = obj;
        obj.position.set(30, 0, -30);
        obj.traverse(function(child){child.eceiveShadow = true;});
        scene.add( obj );
    }
)

const geometry2 = new THREE.DodecahedronGeometry(30, 2);
const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    wireframe: true
});
const giallp = new THREE.Mesh(geometry2, material);
scene.add(giallp);
giallp.position.set(-30, 50, -100);

var groundTexture = new THREE.TextureLoader().load('grass.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set( 30, 50 );
groundTexture.anisotropy = 64;
var groundMaterial = new THREE.MeshStandardMaterial({
    map: groundTexture
});
var planemesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 1000, 1000 ), groundMaterial );
planemesh.position.y = 0.0;
planemesh.rotation.x = - Math.PI / 2;
planemesh.receiveShadow = true;
scene.add( planemesh );

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.02;
  giallp.rotation.y -= 0.001;
  renderer.render(scene, camera);
}

animate();