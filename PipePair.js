import * as THREE from 'three'; 


export class PipePair{
    geometry = new THREE.BoxGeometry(1,1,1);
    material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    
    mesh = new THREE.Mesh(this.geometry, this.material);

      constructor(w, xpos, gapRange){
        this.width = w;
        this.xPos=xpos;
        // this.yPos = Math.random(0, height/2);
        this.gapRange = gapRange;
        this.gap = Math.random()*this.gapRange;
    }
    getGap(){
      return this.gap;
    }
    getMesh(){
      return this.mesh;
    }


}