import * as THREE from 'three'; 

// let geometry = new THREE.BoxGeometry(1,1,1);
// let material = new THREE.MeshStandardMaterial({color: 0x00ff00});
export class PipePair{
    // geometry = new THREE.BoxGeometry(1,1,1);
    geometry = new THREE.BoxGeometry(1,1,1);
    material = new THREE.MeshStandardMaterial({color: 0x00ff00});
    mesh = new THREE.Mesh(geometry, material);

      constructor(w, xpos, gapRage){
        this.width = w;
        this.xPos=xpos;
        // this.yPos = Math.random(0, height/2);
        this.gapRange = gapRage;
        this.gap = Math.random()*this.gapRange;

    }
    getGap(){
      return this.gap;
    }
    getMesh(){
      return this.mesh;
    }
    

  }

