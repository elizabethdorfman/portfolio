import { useEffect, useRef, useState } from 'react';
import * as T from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './workshop.css';
import HandwrittenFinale, { StudioNameplate } from '../components/HandwrittenFinale';
import PromptDirector from '../components/PromptDirector';

export default function Workshop() {
  const host = useRef<HTMLDivElement>(null);
  const endingHost = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const paintCursor = useRef<HTMLDivElement>(null);
  const finalBustHost = useRef<HTMLDivElement>(null);
  const rotationSlider = useRef<HTMLInputElement>(null);
  const bustControls = useRef({zoom:1,rotation:.65,manual:false});
  const [, setFinale] = useState(false);
  const [promptStage,setPromptStage]=useState(0);
  const [promptAmount,setPromptAmount]=useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const [writingAmount, setWritingAmount] = useState(0);
  const [status, setStatus] = useState('Preparing the studio…');
  useEffect(() => {
    const el = host.current!;
    const scene = new T.Scene(); scene.background = new T.Color('#e7dbcc');
    scene.fog = new T.Fog('#e7dbcc', 28, 65);
    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    const touchDevice = window.matchMedia('(pointer: coarse)').matches;
    renderer.setPixelRatio(Math.min(devicePixelRatio, touchDevice ? .8 : 1));
    renderer.shadowMap.enabled = !touchDevice; renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = .95;
    const pmrem = new T.PMREMGenerator(renderer);
    const environment = new RoomEnvironment();
    const envTarget = pmrem.fromScene(environment, .04);
    scene.environment = envTarget.texture; scene.environmentIntensity = .32;
    environment.dispose(); pmrem.dispose();
    el.appendChild(renderer.domElement);
    const camera = new T.PerspectiveCamera(36, 1, .1, 70);
    const controls = new OrbitControls(camera, renderer.domElement);
    // OrbitControls sets touch-action:none even when disabled. Keep native swipes.
    renderer.domElement.style.touchAction = 'pan-y pinch-zoom';
    const scrollRoot = document.documentElement;
    const previousScrollBehavior = scrollRoot.style.scrollBehavior;
    scrollRoot.style.scrollBehavior = 'auto';
    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;
    el.closest<HTMLElement>('.scroll-page')!.style.setProperty('--scene-height', `${viewportHeight}px`);
    let manualCamera=false;
    const takeCamera=()=>{manualCamera=true;};
    controls.addEventListener('start',takeCamera);
    controls.target.set(0, 2.8, 0); controls.enableDamping = true;
    controls.enablePan = false; controls.enableZoom = false;
    controls.minAzimuthAngle = -.3; controls.maxAzimuthAngle = .3;
    controls.minPolarAngle = 1.36; controls.maxPolarAngle = 1.51;
    let cameraRestRadius=1;
    const cameraOffset=new T.Vector3();
    const mobileScenery: Array<{object:T.Object3D; x:number; z:number; kind:"server"|"flowers"|"bed"}> = [];
    const resize = () => {
      // Mobile browser chrome changes height mid-swipe; do not reset the camera.
      if (touchDevice && camera.aspect !== 1 && window.innerWidth === viewportWidth) return;
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      el.closest<HTMLElement>('.scroll-page')!.style.setProperty('--scene-height', `${viewportHeight}px`);
      const w=el.clientWidth,h=viewportHeight;
      renderer.setSize(w,h);
      camera.aspect=w/h;
      camera.setViewOffset(w,h,0,-h*.12,w,h);
      // Fit the full garden width on portrait screens, including the front flowers.
      const portrait = camera.aspect < .8;
      controls.enabled = !touchDevice && !portrait;
      controls.minAzimuthAngle = portrait ? -.08 : -.3;
      controls.maxAzimuthAngle = portrait ? .08 : .3;
      const distance = portrait ? Math.max(28, 33 * .462 / camera.aspect) : 12.8;
      const fogOffset = Math.max(0, distance - 19);
      (scene.fog as T.Fog).near = 28 + fogOffset;
      (scene.fog as T.Fog).far = 65 + fogOffset;
      camera.far = Math.max(70, distance + 50);
      camera.position.set(portrait ? 0 : .8,portrait ? 4.8 : 4.4,distance);
      cameraRestRadius=camera.position.distanceTo(controls.target);
      for (const item of mobileScenery) {
        item.object.position.x = portrait ? (item.kind === 'server' ? item.x - Math.sign(item.x)*1.8 : item.x*.67) : item.x;
        item.object.position.z = item.z - (portrait && item.kind !== 'server' ? 2 : 0);
        item.object.scale.x = portrait && item.kind === 'bed' ? .8 : 1;
        if (item.kind === 'flowers') item.object.scale.setScalar(portrait ? .85 : 1);
      }
      camera.updateProjectionMatrix();
    };
    resize(); window.addEventListener('resize',resize);
    scene.add(new T.HemisphereLight('#fff5df','#7e8b73',1.05));
    const sun = new T.DirectionalLight('#ffecd0',3.2); sun.position.set(-4,9,6); sun.castShadow=true;
    sun.shadow.mapSize.set(1024,1024); Object.assign(sun.shadow.camera,{left:-9,right:9,top:10,bottom:-8}); sun.shadow.bias=-.0003;sun.shadow.radius=4; scene.add(sun);
    const fill=new T.DirectionalLight('#cbdfe6',.7);fill.position.set(5,5,-2);scene.add(fill);
    const mat=(color:string,metalness=0,roughness=.7)=>new T.MeshStandardMaterial({color,metalness,roughness});
    const stone=mat('#d9c8ae'), wood=mat('#dfd5c4'), brass=mat('#b8ad98',.45,.35), black=mat('#22292a');
    function mesh(g:T.BufferGeometry,m:T.Material,x:number,y:number,z:number,parent:T.Object3D=scene){const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
    const box=(w:number,h:number,d:number,m:T.Material,x:number,y:number,z:number,parent:T.Object3D=scene)=>mesh(new T.BoxGeometry(w,h,d),m,x,y,z,parent);
    // A deep classical conservatory: repeated columns establish its scale.
    function surface(base:string, grain:boolean) {
      const c=document.createElement('canvas'); c.width=c.height=512;
      const ctx=c.getContext('2d')!;ctx.fillStyle=base;ctx.fillRect(0,0,512,512);
      for(let i=0;i<16000;i++){const v=Math.random();ctx.fillStyle=`rgba(${v>.5?'255,248,229':'36,25,16'},${grain?.06:.035})`;ctx.fillRect(Math.random()*512,Math.random()*512,grain?1:2,grain?8+Math.random()*90:2);}
      const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;tex.wrapS=tex.wrapT=T.RepeatWrapping;
      return tex;
    }
    wood.map=surface('#e2d8c8',true);wood.bumpMap=wood.map;wood.bumpScale=.025;wood.roughness=.45;
    stone.map=surface('#d6c6aa',false);stone.bumpMap=stone.map;stone.bumpScale=.018;
    const loadMaterial=(name:string,tile:number)=>{
      const loader=new T.TextureLoader();
      const map=loader.load(`/materials/${name}-Diffuse.jpg`);map.colorSpace=T.SRGBColorSpace;
      const normalMap=loader.load(`/materials/${name}-nor_gl.jpg`);
      const roughnessMap=loader.load(`/materials/${name}-Rough.jpg`);
      for(const t of [map,normalMap,roughnessMap]){t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(tile,tile);t.anisotropy=renderer.capabilities.getMaxAnisotropy();}
      return new T.MeshStandardMaterial({map,normalMap,roughnessMap,normalScale:new T.Vector2(.22,.22),roughness:.6,color:'#eee3d2'});
    };
    const floorMat=loadMaterial('marble',8);floorMat.roughness=.28;floorMat.metalness=.08;
    box(34,.2,120,floorMat,0,-.15,0);
    const plaster=loadMaterial('plaster',4);plaster.side=T.DoubleSide;
    for(const x of [-9,9])box(.55,14,100,plaster,x,7,20);
    const vault=mesh(new T.CylinderGeometry(9,9,100,96,1,true,-Math.PI/2,Math.PI),plaster,0,7,20);vault.rotation.x=-Math.PI/2;vault.castShadow=false;
    const wallShape=new T.Shape();wallShape.moveTo(-15,0);wallShape.lineTo(15,0);wallShape.lineTo(15,20);wallShape.lineTo(-15,20);wallShape.closePath();
    const opening=new T.Path();opening.moveTo(-6.5,0);opening.lineTo(-6.5,5.5);opening.absarc(0,5.5,6.5,Math.PI,0,true);opening.lineTo(6.5,0);opening.closePath();wallShape.holes.push(opening);
    mesh(new T.ExtrudeGeometry(wallShape,{depth:.8,bevelEnabled:true,bevelSize:.12,bevelThickness:.12,bevelSegments:3}),plaster,0,0,-16);
    const breezeTime = { value: 0 };
    const coast=new T.TextureLoader().load('/beach-view.png');coast.colorSpace=T.SRGBColorSpace;
    const oceanMaterial = new T.MeshBasicMaterial({map:coast,fog:false,toneMapped:false});
    oceanMaterial.onBeforeCompile = shader => {
      shader.uniforms.breezeTime = breezeTime;
      shader.fragmentShader = 'uniform float breezeTime;\n' + shader.fragmentShader;
      // Animate just the water in the photograph; sky, headland and dry sand stay still.
      shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', `
        vec2 oceanUv = vMapUv;
        float waterMask = smoothstep(0.335, 0.395, oceanUv.y)
          * (1.0 - smoothstep(0.57, 0.604, oceanUv.y));
        float shore = 1.0 - smoothstep(0.38, 0.59, oceanUv.y);
        float swell = sin(oceanUv.y * 85.0 + breezeTime * 1.15
          + sin(oceanUv.x * 12.0) * 0.45);
        oceanUv.y += waterMask * (0.0018 + shore * 0.0045) * swell;
        oceanUv.x += waterMask * 0.0018
          * sin(oceanUv.y * 145.0 + oceanUv.x * 18.0 + breezeTime * 0.65);
        ${T.ShaderChunk.map_fragment.replace('texture2D( map, vMapUv )', 'texture2D( map, oceanUv )')}
      `);
    };
    // Extend the sky above the arch without moving the horizon or stretching the sea.
    // UVs above the photograph clamp to its top row of sky.
    const backdropGeometry = new T.PlaneGeometry(30,32);
    const backdropUv = backdropGeometry.attributes.uv;
    for (let i=0;i<backdropUv.count;i++) backdropUv.setY(i,backdropUv.getY(i)*1.6);
    const beach=mesh(backdropGeometry,oceanMaterial,0,8.7,-21);
    beach.castShadow=false;beach.receiveShadow=false;
    const serverStart = scene.children.length;
    for(const x of [-6,6]) {
      box(2.45,5.1,1.25,plaster,x,2.55,-5.9);
      const niche=mesh(new T.TorusGeometry(1.12,.18,16,48,Math.PI),plaster,x,5.05,-5.2);niche.castShadow=false;
      box(1.8,4.55,.25,mat('#514d43'),x,2.38,-5.23);
      for(let row=0;row<12;row++){
        box(1.45,.25,.25,black,x,.45+row*.33,-5);
        for(let k=0;k<8;k++)box(.05,.08,.03,mat('#4c5850'),x-.58+k*.1,.45+row*.33,-4.85);
        mesh(new T.SphereGeometry(.024,6,6),new T.MeshBasicMaterial({color:row%3?'#82d2b3':'#f5bb57'}),x+.58,.45+row*.33,-4.85);
      }
      for(const dx of [-.86,.86])box(.035,4.4,.05,brass,x+dx,2.35,-5);
    }
    for (const object of scene.children.slice(serverStart)) mobileScenery.push({object,x:object.position.x,z:object.position.z,kind:'server'});
    // Minimal white glass work surface; sculpture rests directly on the table.
    const whiteGlass=new T.MeshPhysicalMaterial({color:'#f7faf9',roughness:.12,metalness:0,transmission:0,thickness:.12,ior:1.48});
    box(6.6,.13,2.65,whiteGlass,0,1.55,.1);
    for(const x of [-2.8,2.8])box(.10,1.49,2.3,whiteGlass,x,.745,.1);
    const sculpture = new T.Group();sculpture.position.y=1.615;scene.add(sculpture);
    const devices:T.Group[]=[];
    const indicators:T.MeshBasicMaterial[]=[];
    // Open desktop chassis with a detailed, textured circuit-board asset.
    const tower=new T.Group();tower.position.set(0,1.615,0);tower.rotation.y=-.2;scene.add(tower);devices.push(tower);
    // Exposed hardware only: no pale chassis collapsing into a slab.
    const led=new T.MeshBasicMaterial({color:'#62cd8b'});indicators.push(led);
    mesh(new T.SphereGeometry(.018,10,8),led,.78,1.28,.10,tower);
    devices.forEach(d=>{d.userData.start=d.position.clone();d.userData.rotation=d.rotation.clone();});
    // Oval artist's palette: thumb hole, irregular paint daubs and brush ridges.
    const colors=['#39ff88','#00e5ff','#536dff','#d449ff','#ff2bbd','#ff5630','#ffab00','#efff37','#ffffff'];
    const ceramic=new T.MeshPhysicalMaterial({color:'#eee5d5',roughness:.35,clearcoat:.18});
    const palette=new T.Group();palette.position.set(camera.aspect<.8?-1.1:-1.8,1.64,-.8);palette.rotation.y=-.12;scene.add(palette);
    const outline=new T.Shape();outline.absellipse(0,0,1.12,.51,0,Math.PI*2,false,0);
    const hole=new T.Path();hole.absellipse(.48,.13,.13,.095,0,Math.PI*2,true,0);outline.holes.push(hole);
    const base=mesh(new T.ExtrudeGeometry(outline,{depth:.035,bevelEnabled:true,bevelThickness:.012,bevelSize:.015,bevelSegments:3,curveSegments:48}),ceramic,0,0,0,palette);base.rotation.x=-Math.PI/2;
    colors.forEach((color,i)=>{
      const angle=.3+i*.53,x=Math.cos(angle)*.89,z=Math.sin(angle)*.37;
      const paint=new T.MeshPhysicalMaterial({color,roughness:.3,clearcoat:.65,clearcoatRoughness:.24});
      for(let dab=0;dab<5;dab++){
        const blob=mesh(new T.SphereGeometry(1,12,8),paint,x+Math.sin(dab*2.7+i)*.065,.052+dab*.002,z+Math.cos(dab*3.1+i)*.032,palette);

        blob.userData.paintIndex=i;
        blob.scale.set(.1+dab*.006,.013+(dab%3)*.006,.06);blob.rotation.y=angle+dab*.3;
      }
      for(let ridge=0;ridge<5;ridge++){
        const line=mesh(new T.CapsuleGeometry(.006,.12,3,8),paint,x-.055+ridge*.027,.077,z,palette);line.rotation.x=Math.PI/2;line.rotation.z=angle*.3;
      }
    });
    // Pigment travels as branching electrical arcs from the palette.
    const paintBolts=new T.Group();scene.add(paintBolts);
    const paintDummy=new T.Object3D(),paintUp=new T.Vector3(0,1,0);
    const paintArcs=colors.map((color,i)=>{
      const core=new T.InstancedMesh(new T.CylinderGeometry(1,1,1,7),new T.MeshBasicMaterial({color:new T.Color(color).lerp(new T.Color('white'),.4),toneMapped:false}),22);
      const glow=new T.InstancedMesh(new T.CylinderGeometry(1,1,1,7),new T.MeshBasicMaterial({color,transparent:true,opacity:.25,blending:T.AdditiveBlending,depthWrite:false,toneMapped:false}),22);
      core.frustumCulled=glow.frustumCulled=false;paintBolts.add(core,glow);
      const a=.3+i*.53,start=new T.Vector3(Math.cos(a)*.89,.09,Math.sin(a)*.37);palette.localToWorld(start);
      return {core,glow,start};
    });
    // Low flower beds and gently moving flowers.
    const flowers:T.Group[]=[];
    let seed=23;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
    for(const side of [-1,1]) {
      const bed=box(3,.4,8,stone,side*5,.16,-1.6);
      mobileScenery.push({object:bed,x:bed.position.x,z:bed.position.z,kind:'bed'});
      const foliage = new T.TextureLoader().load('/garden-flowers.png');
      foliage.colorSpace=T.SRGBColorSpace;
      const flowerMaterial=new T.MeshStandardMaterial({map:foliage,transparent:true,alphaTest:.15,side:T.DoubleSide,forceSinglePass:true,roughness:1,depthWrite:true});
      flowerMaterial.onBeforeCompile = shader => {
        shader.uniforms.breezeTime = breezeTime;
        shader.vertexShader = 'uniform float breezeTime;\n' + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', `
          #include <begin_vertex>
          float tip = uv.y * uv.y;
          float plantPhase = modelMatrix[3].x * 0.7 + modelMatrix[3].z * 0.45;
          float breeze = sin(breezeTime * 0.85 + plantPhase)
            + 0.3 * sin(breezeTime * 1.7 + plantPhase * 1.3);
          transformed.x += tip * breeze * 0.085;
          transformed.z += tip * sin(breezeTime * 0.65 + plantPhase) * 0.035;
        `);
      };
      for(let i=0;i<16;i++) {
        const f=new T.Group();f.position.set(side*(3.9+rand()*2),.43,-5+rand()*8);scene.add(f);flowers.push(f);mobileScenery.push({object:f,x:f.position.x,z:f.position.z,kind:'flowers'});
        const size=1.05+rand()*.65;
        const plant=mesh(new T.PlaneGeometry(size*1.45,size,8,8),flowerMaterial,0,size/2,0,f);
        plant.rotation.y=(rand()-.5)*.6;plant.castShadow=false;
      }

    }
    // The first prompt assembles the studio contents; the room remains a backdrop.
    const studioContents=new T.Group();
    for(const object of scene.children.slice(serverStart)) studioContents.add(object);
    scene.add(studioContents);studioContents.visible=false;
    const starCanvas=document.createElement('canvas');starCanvas.width=starCanvas.height=32;
    const starContext=starCanvas.getContext('2d')!;
    starContext.fillStyle='white';starContext.beginPath();
    for(let i=0;i<8;i++){const angle=i*Math.PI/4,r=i%2?3:15;
      const x=16+Math.cos(angle)*r,y=16+Math.sin(angle)*r;
      if(i===0)starContext.moveTo(x,y);else starContext.lineTo(x,y);
    }starContext.closePath();starContext.fill();
    const starTexture=new T.CanvasTexture(starCanvas);
    const starPositions=new Float32Array(90*3);
    for(let i=0;i<90;i++){starPositions[i*3]=(rand()-.5)*11;starPositions[i*3+1]=.6+rand()*4.4;starPositions[i*3+2]=-5+rand()*7;}
    const starGeometry=new T.BufferGeometry();starGeometry.setAttribute('position',new T.BufferAttribute(starPositions,3));
    const starMaterial=new T.PointsMaterial({map:starTexture,color:'#fff0bf',size:.18,transparent:true,depthWrite:false,blending:T.AdditiveBlending,toneMapped:false});
    const sparkles=new T.Points(starGeometry,starMaterial);sparkles.visible=false;scene.add(sparkles);
    resize();
    let disposed=false;let david:T.Mesh|undefined;
    const assembly={value:0};

    const meltAmount={value:0};const hardwareMaterials:T.MeshStandardMaterial[]=[];
    const electric=new T.Group();scene.add(electric);
    const arcGeometry=Array.from({length:12},()=>new T.BufferGeometry().setAttribute('position',new T.BufferAttribute(new Float32Array(15*3),3)));
    const arcMaterial=new T.MeshBasicMaterial({color:'#d6ffe9',transparent:true,opacity:1,toneMapped:false});
    const haloMaterial=new T.MeshBasicMaterial({color:'#56ffa0',transparent:true,opacity:.2,blending:T.AdditiveBlending,depthWrite:false,toneMapped:false});
    const boltGeometry=new T.CylinderGeometry(1,1,1,6);
    const bolts=new T.InstancedMesh(boltGeometry,arcMaterial,12*18);
    const halos=new T.InstancedMesh(boltGeometry,haloMaterial,12*18);
    bolts.frustumCulled=halos.frustumCulled=false;electric.add(bolts,halos);
    const boltDummy=new T.Object3D(),boltA=new T.Vector3(),boltB=new T.Vector3(),boltDirection=new T.Vector3(),up=new T.Vector3(0,1,0);
    const pulse=new T.PointLight('#64ffa0',0,5,2);pulse.position.set(0,2.8,1);scene.add(pulse);
    new GLTFLoader().load('/models/computer/circuit_board.gltf',gltf=>{
      if(disposed){gltf.scene.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();const ms=Array.isArray(o.material)?o.material:[o.material];ms.forEach(m=>m.dispose());}});return;}
      const realBoard=gltf.scene;realBoard.rotation.x=Math.PI/2;realBoard.scale.setScalar(4.35);realBoard.position.set(0,.87,-.34);
      tower.add(realBoard);tower.updateMatrixWorld(true);
      realBoard.traverse(o=>{if(o instanceof T.Mesh){
        o.castShadow=true;o.receiveShadow=true;
        const pos=o.geometry.attributes.position;const molten=new Float32Array(pos.count*3);
        const inverse=o.matrixWorld.clone().invert();
        for(let i=0;i<pos.count;i++){
          const v=new T.Vector3().fromBufferAttribute(pos,i).applyMatrix4(o.matrixWorld);
          const y=Math.max(0,v.y-1.615);
          const neck=1-.5*Math.exp(-Math.pow((y-1.05)*4.,2));
          const target=new T.Vector3(v.x*neck,y*1.4,(v.z+.34)*2-.1).applyAxisAngle(new T.Vector3(0,1,0),.35);target.y+=1.615;target.applyMatrix4(inverse);target.toArray(molten,i*3);
        }
        o.geometry.setAttribute('moltenPosition',new T.BufferAttribute(molten,3));
        const m=(o.material as T.MeshStandardMaterial).clone();m.transparent=true;hardwareMaterials.push(m);o.material=m;
        m.onBeforeCompile=shader=>{
          shader.uniforms.meltAmount=meltAmount;
          shader.vertexShader='uniform float meltAmount; attribute vec3 moltenPosition;\n'+shader.vertexShader;
          shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','vec3 transformed=mix(position,moltenPosition,smoothstep(0.,1.,meltAmount));');
          shader.fragmentShader='uniform float meltAmount;\n'+shader.fragmentShader;
          shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\n diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.025,.16,.095),meltAmount*.8);');
        };
      }});
    },undefined,()=>setStatus('Computer detail could not load. Reload to retry.'));
    const paintCoverage={value:0};
    const paintedCanvas=document.createElement('canvas');paintedCanvas.width=paintedCanvas.height=512;
    const paintedContext=paintedCanvas.getContext('2d')!;
    const paintedTexture=new T.CanvasTexture(paintedCanvas);paintedTexture.colorSpace=T.SRGBColorSpace;
    let paintingStroke=false,lastStamp=0;
    const manualPaintVisible={value:0};
    const selectedPaint=4;
    const blankPaintTexture=new T.CanvasTexture(document.createElement('canvas'));
    const paintRay=new T.Raycaster();
    const stampPaint=(point:T.Vector3,index:number)=>{
      const x=(Math.atan2(point.z,point.x)/(Math.PI*2)+.5)*512,y=(1-point.y/2.8)*512;
      const gradient=paintedContext.createRadialGradient(x,y,3,x,y,22);
      gradient.addColorStop(0,colors[index]);gradient.addColorStop(.65,colors[index]);gradient.addColorStop(1,colors[index]+'00');
      paintedContext.fillStyle=gradient;paintedContext.fillRect(x-22,y-22,44,44);paintedTexture.needsUpdate=true;
      lastStamp=performance.now();
    };
    const loader=new STLLoader();
    // Phones use a 12k-triangle version so the first visit stays usable on slow connections.
    const sculptureAsset = touchDevice || window.matchMedia('(max-width: 900px)').matches
      ? '/models/david-mobile.stl'
      : '/models/david-optimized.stl';
    loader.load(sculptureAsset,geometry=>{
      if(disposed){geometry.dispose();return;}
      geometry.rotateX(-Math.PI/2);geometry.computeBoundingBox();
      const bounds=geometry.boundingBox!;const center=bounds.getCenter(new T.Vector3());
      geometry.translate(-center.x,-bounds.min.y,-center.z);const scale=2.8/(bounds.max.y-bounds.min.y);geometry.scale(scale,scale,scale);
      const pos=geometry.attributes.position;const uv=new Float32Array(pos.count*2);
      for(let i=0;i<pos.count;i++){uv[i*2]=Math.atan2(pos.getZ(i),pos.getX(i))/(Math.PI*2)+.5;uv[i*2+1]=pos.getY(i)/2.8;}
      geometry.setAttribute('uv',new T.BufferAttribute(uv,2));
      const canvas=document.createElement('canvas');canvas.width=canvas.height=1024;const ctx=canvas.getContext('2d')!;
      ctx.fillStyle='#174b3b';ctx.fillRect(0,0,1024,1024);ctx.strokeStyle='#b59851';ctx.lineWidth=2;
      for(let i=0;i<650;i++){const x=Math.floor(rand()*128)*8,y=Math.floor(rand()*128)*8;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+24,y);ctx.lineTo(x+40,y+16);ctx.lineTo(x+40,y+32+rand()*60);ctx.stroke();ctx.fillStyle='#ceb77a';ctx.fillRect(x-2,y-2,4,4);}
      const texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
      const material=new T.MeshStandardMaterial({map:texture,metalness:.35,roughness:.48});
      material.onBeforeCompile=shader=>{
        shader.uniforms.paintedMap={value:paintedTexture};
        shader.uniforms.manualPaintVisible=manualPaintVisible;
        shader.uniforms.assembly=assembly;shader.uniforms.paintCoverage=paintCoverage;
        shader.vertexShader='uniform float assembly; varying vec3 paintPosition;\n'+shader.vertexShader;
        shader.fragmentShader='uniform float manualPaintVisible; uniform sampler2D paintedMap; uniform float paintCoverage; varying vec3 paintPosition; float paintMask;\n'+shader.fragmentShader;
        shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`
          #include <map_fragment>
          float height=paintPosition.y/2.8;
          float edge=1.08-paintCoverage*1.2;
          float ripple=sin(paintPosition.x*9.+sin(paintPosition.y*7.))*sin(paintPosition.z*8.+paintPosition.y*6.);
          float coverage=smoothstep(edge-.075,edge+.075,height+.055*ripple);
          paintMask=coverage;
          float band=height*4.4+paintPosition.x*.7+sin(paintPosition.z*7.+paintPosition.y*5.)*.32+ripple*.35;
          vec3 warm=mix(vec3(1.,.25,.5),vec3(1.,.8,.22),.5+.5*sin(band*2.));
          float greenWash=smoothstep(.52,1.,paintCoverage)*smoothstep(-.25,.55,sin(band*2.4));
          vec3 pigment=mix(warm,vec3(.22,.72,.45),greenWash);
          float grain=.97+.03*sin(paintPosition.x*420.)*sin(paintPosition.y*390.);
          diffuseColor.rgb=mix(diffuseColor.rgb,pigment*grain,coverage);
          vec4 brushed=texture2D(paintedMap,vMapUv); brushed.a*=manualPaintVisible;
          diffuseColor.rgb=mix(diffuseColor.rgb,brushed.rgb,brushed.a);
          paintMask=max(paintMask,brushed.a);
        `);
        shader.fragmentShader=shader.fragmentShader.replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n vec4 neon=texture2D(paintedMap,vMapUv); totalEmissiveRadiance+=neon.rgb*neon.a*1.4*manualPaintVisible;');
        shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n roughnessFactor=mix(roughnessFactor,.72,paintMask);');
        shader.fragmentShader=shader.fragmentShader.replace('#include <metalnessmap_fragment>', '#include <metalnessmap_fragment>\n metalnessFactor=mix(metalnessFactor,.02,paintMask);');
        shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>', `
          paintPosition=position;
          vec3 board=vec3(position.x*.9,position.y*.64,position.z*.12-.3);
          vec3 transformed=mix(board,position,smoothstep(0.,1.,assembly));
        `);
        shader.vertexShader=shader.vertexShader.replace('#include <beginnormal_vertex>', `
          vec3 boardNormal=normalize(normal/vec3(.9,.64,.12));
          vec3 objectNormal=normalize(mix(boardNormal,normal,smoothstep(0.,1.,assembly)));
        `);
      };
      david=new T.Mesh(geometry,material);david.castShadow=true;david.receiveShadow=true;david.rotation.y=.65;sculpture.add(david);setStatus('');
    },undefined,()=>setStatus('Sculpture could not load. Reload to retry.'));
    const galleryTrack=el.closest<HTMLElement>('.gallery-scroll-track')!;
    const syncScroll=()=>{
      // Derive animation progress from the same element that controls sticky release.
      // Painting must finish exactly where the gallery starts leaving the viewport.
      const galleryTravel=Math.max(1,galleryTrack.offsetHeight-viewportHeight);
      const screens=window.scrollY/galleryTravel*5;
      // Continuous progression: each generation flows directly into the next text.
      const checkpoints=[[0,0],[1,.24],[3.9,.74],[5,1.08],[5.1,1.10],[6.2,1.6]];
      let value=1.6;
      for(let i=1;i<checkpoints.length;i++){
        const [end,to]=checkpoints[i], [start,from]=checkpoints[i-1];
        if(screens<=end){value=T.MathUtils.lerp(from,to,T.MathUtils.clamp((screens-start)/(end-start),0,1));break;}
      }
      progress.current=value;
      const entrance=T.MathUtils.clamp((screens-5)/.45,0,1);
      const closing=endingHost.current?.parentElement;
      if(closing){
        closing.style.visibility=screens>5?'visible':'hidden';
        closing.setAttribute('aria-hidden',String(screens<=5));
      }
      const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      endingHost.current?.parentElement?.style.setProperty('--entrance',String(reduce?1:T.MathUtils.smoothstep(entrance,0,.94)));
      closing?.style.setProperty('--flower-entry',String(reduce?1:T.MathUtils.smoothstep(screens,5.75,6.18)));
      closing?.style.setProperty('--prompt-entry',String(reduce?1:T.MathUtils.smoothstep(screens,5,5.35)));
    };
    window.addEventListener('scroll',syncScroll,{passive:true});syncScroll();
    // Pointer events cover both real touch and mouse drags in a phone preview.
    // Lock each portrait gesture to one action so orbit and timeline never compete.
    let gesture: {id:number; x:number; y:number; lastX:number; lastY:number; axis:'horizontal'|'vertical'|null} | null = null;
    const gestureSurface = renderer.domElement;
    const pointerDown = (e:PointerEvent) => {
      if(e.pointerType==='touch'||camera.aspect >= .8 || !e.isPrimary || e.button !== 0) return;
      gesture={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,axis:null};
      gestureSurface.setPointerCapture(e.pointerId);
    };
    const pointerMove = (e:PointerEvent) => {
      if(!gesture || gesture.id!==e.pointerId) return;
      const totalX=e.clientX-gesture.x,totalY=e.clientY-gesture.y;
      if(!gesture.axis){
        if(Math.hypot(totalX,totalY)<6) return;
        gesture.axis=Math.abs(totalY)>=Math.abs(totalX)?'vertical':'horizontal';
      }
      if(gesture.axis==='vertical'){
        window.scrollBy(0,gesture.lastY-e.clientY);
      }else{
        manualCamera=true;
        const offset=camera.position.clone().sub(controls.target);
        const orbit=new T.Spherical().setFromVector3(offset);
        orbit.theta=T.MathUtils.clamp(orbit.theta-(e.clientX-gesture.lastX)/el.clientWidth*1.2,controls.minAzimuthAngle,controls.maxAzimuthAngle);
        camera.position.copy(controls.target).add(offset.setFromSpherical(orbit));
        camera.lookAt(controls.target);
      }
      gesture.lastX=e.clientX;gesture.lastY=e.clientY;
    };
    const pointerEnd = (e:PointerEvent) => {
      if(gesture?.id!==e.pointerId) return;
      gesture=null;
      if(gestureSurface.hasPointerCapture(e.pointerId)) gestureSurface.releasePointerCapture(e.pointerId);
    };
    gestureSurface.addEventListener('pointerdown',pointerDown);
    gestureSurface.addEventListener('pointermove',pointerMove);
    gestureSurface.addEventListener('pointerup',pointerEnd);
    gestureSurface.addEventListener('pointercancel',pointerEnd);
    gestureSurface.addEventListener('lostpointercapture',pointerEnd);
    const keyScroll=(e:KeyboardEvent)=>{if(e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement)return;const step=['ArrowDown','PageDown',' '].includes(e.key)?.08:['ArrowUp','PageUp'].includes(e.key)?-.08:0;if(step){e.preventDefault();window.scrollBy(0,Math.sign(step)*window.innerHeight*.18);}};
    window.addEventListener('keydown',keyScroll);
    // The final scroll chapter paints the sculpture automatically.

    const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock=new T.Clock();let frame=0;let current=0;let finaleVisible=false;let introIsVisible=true;let lastWriting=-1;let lastPrompt=-1;
    const orbitStart=new T.Vector3(),orbitAxis=new T.Vector3(0,1,0);
    let bustCaptured=false;
    let finalRenderer:T.WebGLRenderer|undefined;
    let finalScene:T.Scene|undefined;
    let finalBust:T.Mesh|undefined;
    const finalCamera=new T.OrthographicCamera(-2,2,2,-2,.1,20);
    let finalWidth=0, finalHeight=0;
    const paintHit=(e:PointerEvent)=>{
      if(!david||current<1.079||progress.current>1.08)return;
      const rect=renderer.domElement.getBoundingClientRect();
      paintRay.setFromCamera(new T.Vector2((e.clientX-rect.left)/rect.width*2-1,1-(e.clientY-rect.top)/rect.height*2),camera);
      return paintRay.intersectObject(david)[0];
    };
    const paintHover=(e:PointerEvent)=>{
      const hit=paintHit(e),cursor=paintCursor.current;
      if(cursor){cursor.hidden=!hit;cursor.style.left=`${e.clientX}px`;cursor.style.top=`${e.clientY}px`;}
      renderer.domElement.style.cursor=hit?'none':'';
      if(paintingStroke&&hit&&david&&performance.now()-lastStamp>35)stampPaint(david.worldToLocal(hit.point.clone()),selectedPaint);
    };
    const paintDown=(e:PointerEvent)=>{
      if(!e.isPrimary||e.button!==0)return;
      const hit=paintHit(e);if(!hit||!david)return;
      paintingStroke=true;paintHover(e);stampPaint(david.worldToLocal(hit.point.clone()),selectedPaint);
    };
    const paintLeave=()=>{paintingStroke=false;paintCursor.current?.setAttribute('hidden','');renderer.domElement.style.cursor='';};
    renderer.domElement.addEventListener('pointermove',paintHover);
    renderer.domElement.addEventListener('pointerdown',paintDown);
    renderer.domElement.addEventListener('pointerup',paintLeave);
    renderer.domElement.addEventListener('pointerleave',paintLeave);
    renderer.domElement.addEventListener('pointercancel',paintLeave);

    const renderFinalBust=(delta:number)=>{
      if(!finalRenderer||!finalScene||!finalBust||progress.current<=1.08||document.hidden)return;
      const mount=finalBustHost.current!;
      const w=mount.clientWidth,h=mount.clientHeight;
      if(!w||!h)return;
      if(w!==finalWidth||h!==finalHeight){
        finalWidth=w;finalHeight=h;finalRenderer.setSize(w,h);
        const aspect=w/h,halfHeight=Math.max(1.62,1.35/aspect);
        finalCamera.left=-halfHeight*aspect;finalCamera.right=halfHeight*aspect;
        finalCamera.top=halfHeight;finalCamera.bottom=-halfHeight;finalCamera.updateProjectionMatrix();
      }
      if(!reducedMotion)finalBust.rotation.y+=delta*.35;
      finalRenderer.render(finalScene,finalCamera);
    };
    let finishedAt:number|null=null;
    let lastRenderTime=-1, lastRenderedProgress=-1;
    let lastZoom=1,lastRotation=.65;
    let lastTick=performance.now();
    let lastViewportWidth=viewportWidth, lastViewportHeight=viewportHeight;
    function animate(){frame=requestAnimationFrame(animate);let time=clock.getElapsedTime();
      const tick=performance.now();
      const delta=Math.min((tick-lastTick)/1000,.1);lastTick=tick;
      const target=Math.min(progress.current,1.08);
      // A short, frame-rate independent blend softens wheel steps without a long tail.
      current=reducedMotion||target===0||target===1.08||Math.abs(target-current)>.25
        ? target : T.MathUtils.damp(current,target,20,delta);
      if(Math.abs(target-current)<.0001) current=target;
      if(current>=1.079){finishedAt??=time;time=finishedAt;}else finishedAt=null;
      manualPaintVisible.value=current>=1.079?1:0;
      if(current<1.079||progress.current>1.08)paintLeave();
      const scroll=progress.current;
      const prompt=scroll<.24?0:scroll<.74?1:scroll<1.10?2:scroll<1.46?3:4;
      const starts=[0,.24,.74,1.10,1.46],ends=[.10,.34,.84,1.20,1.6];
      setPromptAmount(Math.min(1,Math.max(0,scroll>=1.10?(scroll-1.10)/.49:(scroll-starts[prompt])/(ends[prompt]-starts[prompt]))));
      if(prompt!==lastPrompt){lastPrompt=prompt;setPromptStage(prompt);}
      renderFinalBust(delta);
      // Once offscreen, keep the DOM finale responsive without rendering the gallery.
      if (window.scrollY >= galleryTrack.offsetHeight && bustCaptured) return;
      const now=performance.now();
      const changed=paintingStroke||performance.now()-lastStamp<150||bustControls.current.zoom!==lastZoom||bustControls.current.rotation!==lastRotation||current!==lastRenderedProgress||viewportWidth!==lastViewportWidth||viewportHeight!==lastViewportHeight;
      // Leave the finished frame on the canvas; CSS handles the section exit.
      if (!changed && current>=1.08 && bustCaptured && !manualCamera) return;
      // Use every available frame while interacting; throttle only idle scenery.
      const active=changed||manualCamera||(current>.35&&current<1.08);
      const interval=active?0:100;
      if(now-lastRenderTime<interval) return;
      lastRenderTime=now;lastRenderedProgress=current;lastZoom=bustControls.current.zoom;lastRotation=bustControls.current.rotation;lastViewportWidth=viewportWidth;lastViewportHeight=viewportHeight;
      const reveal=reducedMotion?1:T.MathUtils.smoothstep(current,.012,.20);
      studioContents.visible=reveal>0;
      studioContents.position.y=-(1-reveal)*.6;
      studioContents.scale.setScalar(.96+.04*reveal);
      sparkles.visible=!reducedMotion&&reveal>0&&reveal<1;
      starMaterial.opacity=Math.sin(reveal*Math.PI)*.9;
      sparkles.position.y=reveal*.65;
      sparkles.rotation.y=Math.sin(time)*.015;
      const action=scroll<.24?0:current;
      const stage=T.MathUtils.smoothstep(action,.38,.70);assembly.value=stage;
      const charge=T.MathUtils.smoothstep(action,.35,.40);
      const energy=charge*(1-T.MathUtils.smoothstep(action,.66,.74));
      indicators.forEach((m,i)=>m.color.setRGB(.12+charge*.25,.25+charge*(.55+.12*Math.sin(time*3+i)),.17+charge*.2));
      const contact=new T.Vector3(.5,2.03+stage*2.45,.6);
      pulse.position.copy(contact);
      electric.visible=energy>.01&&!reducedMotion;
      pulse.intensity=energy*(5+Math.sin(time*8)*.6);
      arcMaterial.opacity=energy;haloMaterial.opacity=energy*.23;
      if(electric.visible) arcGeometry.forEach((g,i)=>{
        const arr=g.attributes.position as T.BufferAttribute;
        const angle=i/12*Math.PI*2;
        const start=i<8?new T.Vector3((i%2?-1:1)*(camera.aspect<.8?3.6:5.4),.8+(i%4)*.85,-4.8):new T.Vector3(Math.cos(angle)*.95,1.8+(i%3)*.6,.5);
        const end=new T.Vector3(Math.cos(angle+.5)*.42,2.03+stage*2.45,Math.sin(angle+.5)*.42);
        for(let k=0;k<15;k++){
          const t=k/14,envelope=Math.sin(t*Math.PI),jitter=reducedMotion?0:Math.sin(k*13+i*8+Math.floor(time*14));
          arr.setXYZ(k,T.MathUtils.lerp(start.x,end.x,t)+jitter*.3*envelope,T.MathUtils.lerp(start.y,end.y,t)+Math.cos(k*7+i+Math.floor(time*14))*.18*envelope,T.MathUtils.lerp(start.z,end.z,t)+jitter*.22*envelope);
        }arr.needsUpdate=true;
      });
      let segment=0;
      const drawBolt=(a:T.Vector3,b:T.Vector3,radius:number)=>{
        boltDirection.subVectors(b,a);boltDummy.position.copy(a).add(b).multiplyScalar(.5);boltDummy.quaternion.setFromUnitVectors(up,boltDirection.clone().normalize());
        boltDummy.scale.set(radius,boltDirection.length(),radius);boltDummy.updateMatrix();bolts.setMatrixAt(segment,boltDummy.matrix);
        boltDummy.scale.set(radius*3.2,boltDirection.length(),radius*3.2);boltDummy.updateMatrix();halos.setMatrixAt(segment++,boltDummy.matrix);
      };
      if(electric.visible) arcGeometry.forEach((g,i)=>{
        const p=g.attributes.position as T.BufferAttribute;
        for(let k=0;k<14;k++){boltA.fromBufferAttribute(p,k);boltB.fromBufferAttribute(p,k+1);drawBolt(boltA,boltB,.018+(i%3)*.003);}
        // Short forks make the discharge read as lightning rather than wires.
        for(let k=0;k<4;k++){
          boltA.fromBufferAttribute(p,4+k*2);boltB.copy(boltA).add(new T.Vector3(Math.sin(i*3+k)*.35,.25+Math.cos(i+k)*.14,.18));drawBolt(boltA,boltB,.01);
        }
      });
      bolts.instanceMatrix.needsUpdate=halos.instanceMatrix.needsUpdate=true;
      meltAmount.value=stage;
      const dissolve=T.MathUtils.smoothstep(action,.46,.70);
      hardwareMaterials.forEach(m=>{m.opacity=1-dissolve;m.roughness=.6-meltAmount.value*.38;});
      devices.forEach(d=>{d.scale.setScalar(1);d.position.copy(d.userData.start);d.rotation.copy(d.userData.rotation);d.visible=action<.71;});
      const painting=T.MathUtils.smoothstep(current,.84,1.08);
      paintCoverage.value=painting;
      paintArcs.forEach(({core,glow,start},i)=>{
        const strength=Math.sin(Math.PI*T.MathUtils.clamp((painting-i*.082)/.31,0,1));
        core.visible=glow.visible=strength>.025&&!reducedMotion;
        if(!core.visible)return;
        const end=new T.Vector3(Math.sin(i*2.4)*.35,4.28-i*.29,.45);
        const points=Array.from({length:17},(_,k)=>{
          const t=k/16,p=start.clone().lerp(end,t),wave=Math.sin(t*Math.PI),tick=Math.floor(time*12);
          p.x+=wave*Math.sin(k*17+i*7+tick)*.15;p.y+=wave*(.22+Math.cos(k*13+tick)*.12);p.z+=wave*Math.sin(k*11+tick)*.12;return p;
        });
        const segment=(a:T.Vector3,b:T.Vector3,j:number,r:number)=>{
          const direction=b.clone().sub(a);paintDummy.position.copy(a).add(b).multiplyScalar(.5);paintDummy.quaternion.setFromUnitVectors(paintUp,direction.clone().normalize());
          paintDummy.scale.set(r,direction.length(),r);paintDummy.updateMatrix();core.setMatrixAt(j,paintDummy.matrix);
          paintDummy.scale.set(r*3.5,direction.length(),r*3.5);paintDummy.updateMatrix();glow.setMatrixAt(j,paintDummy.matrix);
        };
        for(let k=0;k<16;k++)segment(points[k],points[k+1],k,.014+strength*.009);
        for(let k=0;k<6;k++){const a=points[3+k*2],b=a.clone().add(new T.Vector3(Math.sin(k*9+i)*.2,.13,Math.cos(k+i)*.15));segment(a,b,16+k,.009);}
        core.instanceMatrix.needsUpdate=glow.instanceMatrix.needsUpdate=true;
      });

      if(david){
        david.visible=action>.46;
        david.scale.setScalar(bustControls.current.zoom);david.rotation.y=bustControls.current.rotation;const emergence=T.MathUtils.smoothstep(action,.46,.70);
        const m=david.material as T.MeshStandardMaterial;m.transparent=true;m.opacity=emergence;m.metalness=.35;m.roughness=.48;
      }
      const writing = current > 1.595 ? 1 : Math.max(0, (current - 1.28) / .32);
      if (Math.abs(writing-lastWriting) > .002 || (writing === 1 && lastWriting !== 1) || (writing === 0 && lastWriting !== 0)) { lastWriting=writing; setWritingAmount(writing); }
      const showFinale = Boolean(david) && current > 1.27;
      if (showFinale !== finaleVisible) { finaleVisible = showFinale; setFinale(showFinale); }
      const nextIntroVisible = current < .3;
      if (nextIntroVisible !== introIsVisible) { introIsVisible = nextIntroVisible; setIntroVisible(nextIntroVisible); }
      breezeTime.value = reducedMotion ? 0 : time;
      flowers.forEach((f,i)=>f.rotation.z=reducedMotion?0:Math.sin(time*.65+i)*.012);
      const pushIn = T.MathUtils.smoothstep(current, .3, .74);
      const orbitProgress = T.MathUtils.smoothstep(current, .74, 1.26);
      const zoomAmount = reducedMotion ? 0 : pushIn;
      const radius = T.MathUtils.lerp(cameraRestRadius, Math.min(cameraRestRadius, camera.aspect<.8?cameraRestRadius*.53:7.6), zoomAmount);
      if (!manualCamera) {
      if (current < .74) orbitStart.copy(camera.position).sub(controls.target).normalize();
      cameraOffset.copy(orbitStart).multiplyScalar(radius);
      cameraOffset.applyAxisAngle(orbitAxis, reducedMotion ? 0 : Math.sin(orbitProgress*Math.PI*2)*(camera.aspect<.8?.04:.12));
      controls.target.y = T.MathUtils.lerp(2.8, 3.3, zoomAmount);
      camera.position.copy(controls.target).add(cameraOffset);
      camera.lookAt(controls.target);
      }
      controls.enabled=!touchDevice&&camera.aspect>=.8;
      if(manualCamera&&controls.enabled)controls.update();
      // Apply the same safe envelope to scripted motion and manual dragging.
      const safeOffset=camera.position.clone().sub(controls.target);
      const safeOrbit=new T.Spherical().setFromVector3(safeOffset);
      safeOrbit.theta=T.MathUtils.clamp(safeOrbit.theta,controls.minAzimuthAngle,controls.maxAzimuthAngle);
      safeOrbit.phi=T.MathUtils.clamp(safeOrbit.phi,controls.minPolarAngle,controls.maxPolarAngle);
      camera.position.copy(controls.target).add(safeOffset.setFromSpherical(safeOrbit));
      camera.lookAt(controls.target);
      sculpture.position.y=1.615;
      if(!bustCaptured&&current>=1.079&&david){
        finalRenderer=new T.WebGLRenderer({alpha:true,antialias:true});
        finalRenderer.setPixelRatio(Math.min(devicePixelRatio,1));
        finalRenderer.setClearColor(0,0);
        finalRenderer.toneMapping=renderer.toneMapping;
        finalRenderer.toneMappingExposure=renderer.toneMappingExposure;
        finalBustHost.current!.appendChild(finalRenderer.domElement);
        finalRenderer.domElement.style.touchAction='pan-y';
        finalScene=new T.Scene();finalScene.environment=envTarget.texture;finalScene.environmentIntensity=.32;
        finalScene.add(new T.HemisphereLight('#fff5df','#7e8b73',1.05));
        const key=new T.DirectionalLight('#ffecd0',3.2);key.position.set(-4,9,6);finalScene.add(key);
        const rim=new T.DirectionalLight('#cbdfe6',.7);rim.position.set(5,5,-2);finalScene.add(rim);
        // Reuse the already loaded model and painted material, with no room or shadows.
        const originalMaterial=david.material as T.MeshStandardMaterial;
        const finalMaterial=originalMaterial.clone();
        finalMaterial.onBeforeCompile=(shader,webgl)=>{originalMaterial.onBeforeCompile(shader,webgl);shader.uniforms.paintedMap={value:blankPaintTexture};};
        finalBust=new T.Mesh(david.geometry,finalMaterial);finalBust.rotation.y=.65;finalScene.add(finalBust);
        finalCamera.position.set(0,1.4,6);finalCamera.lookAt(0,1.4,0);
        bustCaptured=true;
      }
      renderer.render(scene,camera);
    }animate();
    return()=>{paintedTexture.dispose();blankPaintTexture.dispose();(finalBust?.material as T.Material|undefined)?.dispose();starGeometry.dispose();starMaterial.dispose();starTexture.dispose();finalRenderer?.dispose();finalRenderer?.domElement.remove();scrollRoot.style.scrollBehavior=previousScrollBehavior;disposed=true;cancelAnimationFrame(frame);window.removeEventListener('scroll',syncScroll);gestureSurface.removeEventListener('pointerdown',pointerDown);gestureSurface.removeEventListener('pointermove',pointerMove);gestureSurface.removeEventListener('pointerup',pointerEnd);gestureSurface.removeEventListener('pointercancel',pointerEnd);gestureSurface.removeEventListener('lostpointercapture',pointerEnd);window.removeEventListener('keydown',keyScroll);window.removeEventListener('resize',resize);controls.removeEventListener('start',takeCamera);controls.dispose();scene.traverse(o=>{if(o instanceof T.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>{for(const key of ['map','normalMap','roughnessMap','bumpMap'] as const){if(key in m)(m as T.MeshStandardMaterial)[key]?.dispose();}m.dispose();});}});arcGeometry.forEach(g=>g.dispose());arcMaterial.dispose();envTarget.dispose();renderer.dispose();renderer.domElement.remove();};
  },[]);
  return <main className="workshop prompt-flow scroll-page">
    <StudioNameplate/>
    <div ref={paintCursor} className="paint-hand-cursor" hidden aria-hidden="true">
      <svg viewBox="0 0 32 36" width="28" height="32"><path d="M9 19V8q0-4 3-4t3 4v9V4q0-3 3-3t3 3v13V7q0-3 3-3t3 3v13V13q0-3 3-3t3 3v11q0 9-10 10h-6q-5 0-8-5L2 21q-2-4 1-5t6 3Z" fill="var(--paint-color,#ff2bbd)" stroke="white" strokeWidth="2" strokeLinejoin="round"/></svg>
      <span>Try painting</span>
    </div>
    <section className="gallery-scroll-track" aria-label="Creating the gallery">
      <div className="gallery-sticky">
        <PromptDirector stage={Math.min(promptStage,2)} amount={promptStage===0||promptStage>2?1:promptAmount}/>
        <HandwrittenFinale active={false} amount={writingAmount} loading={Boolean(status)} introVisible={introVisible} onSkip={()=>window.scrollTo(0,window.innerHeight*7.2)}/>
      <div className="bust-controls" hidden={promptStage<2} role="group" aria-label="Explore David">
        <label htmlFor="david-zoom">Zoom
          <input id="david-zoom" type="range" min="60" max="180" defaultValue="100" step="1" onChange={e=>{bustControls.current.zoom=Number(e.target.value)/100;bustControls.current.manual=true;}}/>
        </label>
        <label htmlFor="david-rotate">Rotate
          <input ref={rotationSlider} id="david-rotate" type="range" min="0" max="360" defaultValue="37" step="1" onChange={e=>{bustControls.current.rotation=Number(e.target.value)*Math.PI/180;bustControls.current.manual=true;}}/>
        </label>
      </div>
        <div ref={host} className="workshop-scene" aria-label="Interactive sculpture garden. Scroll to reveal David. Use Zoom and Rotate to explore."/>
        {status&&<div className="workshop-status studio-glass" role="status">{status}</div>}
      </div>
    </section>
    <section className="closing-scroll-track" aria-label="Technology made simple">
    <div className="pink-closing-section">
      <PromptDirector stage={4} amount={progress.current>=1.10?promptAmount:0}/>
      <div ref={endingHost} className="closing-collage" aria-label="David and flowers on pink">

        <div className="collage-flower-layer">
          <img className="collage-flowers" src="/garden-flowers.png" alt="Colourful garden flowers"/>
          <img className="collage-flowers collage-flowers-right" src="/garden-flowers.png" alt=""/>
        </div>
        <div ref={finalBustHost} className="collage-david" role="img" aria-label="Painted David sculpture."/>
      </div>
      <nav className="studio-bottom-links" aria-label="Explore Elizabeth’s portfolio">
        <a className="studio-glass" href="/Elizabeth_Dorfman_Resume_Aug2026.pdf" download>Résumé ↗</a>
        <a className="studio-glass" href="mailto:elizabethdorfman31@gmail.com" >Contact ↗</a>
      </nav>
    </div>
    </section>
  </main>;
}
