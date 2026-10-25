// Original Digital Alchemy sculpture — WebGL, GLSL, Canvas 2D; no dependencies
export function initializeSculpture(stage) {
'use strict';
const canvas=stage.querySelector('[data-webgl]'),fx=stage.querySelector('[data-fx]'),ctx=fx.getContext('2d');
const controller=new AbortController();
const listen=(element,event,handler)=>element.addEventListener(event,handler,{signal:controller.signal});
let frameId=0, pulseTimer=0, renderGL=null;
const buffers=[], programs=[], shaders=[];
const labels=[...stage.querySelectorAll('[data-tech-label]')];
function renderLabels(elapsed) {
  const scale=mobile?1.02:(W<600?1.06:1.12);
  const placed=[];
  labels.forEach((label,index)=>{
    const phase=index*Math.PI/2+elapsed*(index%2===0?.16:-.12);
    const pos=point(phase,.5,index);
    const x=Math.cos(yaw)*pos[0]+Math.sin(yaw)*pos[2];
    const depth=-Math.sin(yaw)*pos[0]+Math.cos(yaw)*pos[2];
    const y=Math.cos(pitch)*pos[1]-Math.sin(pitch)*depth;
    const z=Math.sin(pitch)*pos[1]+Math.cos(pitch)*depth;
    const perspective=(8.7-z)*.25;
    const px=W/2+x*.62*scale/perspective*W/2;
    const py=H/2-y*.62*(H/W)*1.22*scale/perspective*H/2;
    const labelX=clamp(px,48,W-48);
    let labelY=clamp(py,24,H-24);
    for(let pass=0;pass<labels.length;pass++) {
      for(const previous of placed) {
        if(Math.abs(labelX-previous.x)<90&&Math.abs(labelY-previous.y)<36) labelY=previous.y+36;
      }
    }
    labelY=clamp(labelY,24,H-24);
    placed.push({x:labelX,y:labelY});
    label.style.transform=`translate3d(${labelX}px,${labelY}px,0) translate(-50%,-50%) scale(${.92+(z+2)*.035})`;
    label.style.opacity=z<-.4?'0.6':'1';
    label.style.zIndex='5';
  });
}
const gl=canvas.getContext('webgl',{alpha:true,antialias:true,depth:true,premultipliedAlpha:false, powerPreference:'high-performance'});
const mobile=matchMedia('(max-width:640px)').matches,reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
let W=600,H=600,dpr=1,mouseX=0,mouseY=0,targetX=0,targetY=0, yaw=-0.17,pitch=-.09,drag=false,lastX=0,lastY=0,dragMoved=false,energy=0,energyTarget=0,t=0,lastTime=0,boost=0;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));const mix=(a,b,v)=>a+(b-a)*v;
function resize(){let r=stage.getBoundingClientRect();W=r.width;H=r.height;dpr=Math.min(devicePixelRatio||1,mobile?1.5:1.8);canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);fx.width=Math.round(W*dpr);fx.height=Math.round(H*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);if(gl)gl.viewport(0,0,canvas.width,canvas.height)}
resize();const observer=new ResizeObserver(resize);observer.observe(stage);
listen(stage,'pointerdown', e=>{if(e.target.closest('button'))return;drag=true;dragMoved=false;lastX=e.clientX;lastY=e.clientY;stage.classList.add('grabbing');stage.setPointerCapture(e.pointerId)});
listen(stage,'pointermove',e=>{const r=stage.getBoundingClientRect();targetX=clamp(((e.clientX-r.left)/r.width-.5)*2,-1,1);targetY=clamp(((e.clientY-r.top)/r.height-.5)*2,-1,1);if(drag){let dx=e.clientX-lastX,dy=e.clientY-lastY;if(Math.abs(dx)+Math.abs(dy)>2)dragMoved=true;yaw+=dx*.007;pitch=clamp(pitch+dy*.005,-1.0,1.0);lastX=e.clientX;lastY=e.clientY}});
listen(stage,'pointerleave',()=>{targetX=0;targetY=0});
listen(stage,'pointerup',e=>{drag=false;stage.classList.remove('grabbing');if(!dragMoved&&!e.target.closest('button'))trigger()});
listen(stage,'pointercancel',()=>{drag=false;stage.classList.remove('grabbing')});
function trigger(){if(reduce)return;energyTarget=1;energy=0.05;boost=1;let f=stage.querySelector('[data-flash]');f.classList.remove('on');void f.offsetWidth;f.classList.add('on');clearTimeout(pulseTimer);pulseTimer=setTimeout(()=>{energyTarget=0},650)}


// 3D WebGL artwork: every ribbon vertex is calculated here; no images, videos, libraries or CDN.
function shader(type,src){const sh=gl.createShader(type);shaders.push(sh);gl.shaderSource(sh,src);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))console.error(gl.getShaderInfoLog(sh));return sh}
function program(v,f){let p=gl.createProgram();programs.push(p);gl.attachShader(p,shader(gl.VERTEX_SHADER,v));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))console.error(gl.getProgramInfoLog(p));return p}
const vsrc=`precision highp float;
attribute vec3 aP;attribute vec3 aN;attribute vec2 aUV;attribute float aID;
uniform float uT;uniform float uYaw;uniform float uPitch;uniform float uEnergy;uniform float uAspect;uniform float uScale;
varying vec3 vN;varying vec3 vP;varying vec2 vUV;varying float vID;varying float vA;
void main(){
vec3 pos=aP;
float phase=aUV.x*6.2831853;
float rumble=sin(uT*1.05+phase*5.0+aID*2.3);
pos+=aN*rumble*0.018;
vec3 radial=normalize(pos+vec3(0.00001));
float burst=uEnergy*uEnergy;
pos+=radial*(burst*(0.25+0.39*sin(phase*7.0+aID*2.0)));
pos+=vec3(sin(phase*8.0+aID)*.10,cos(phase*6.0+aID)*.12,sin(phase*10.0+aID)*.09)*burst;
float cy=cos(uYaw),sy=sin(uYaw),cx=cos(uPitch),sx=sin(uPitch);
mat3 ry=mat3(cy,0.,-sy, 0.,1.,0., sy,0.,cy);
mat3 rx=mat3(1.,0.,0., 0.,cx,sx, 0.,-sx,cx);
pos=rx*ry*pos;
vec3 normal=normalize(rx*ry*aN);
pos.z-=8.7;
float z=-pos.z;
float f=.62;gl_Position=vec4(pos.x*f/max(uAspect,1.0),pos.y*f*min(uAspect,1.0),-pos.z*.011+(pos.z+8.7)*.003, z*.115);
// Manual perspective calibrated for responsive central sculpture.
gl_Position=vec4(pos.x*f, pos.y*f*uAspect*1.22, 1.0-1.6/z, z*.25);
gl_Position.xy*=uScale;
vN=normal;vP=pos;vUV=aUV;vID=aID;vA=burst;
}`;
const fsrc=`precision highp float;
varying vec3 vN;varying vec3 vP;varying vec2 vUV;varying float vID;varying float vA;
uniform float uT;
float sat(float v){return clamp(v,0.,1.);}
void main(){
vec3 N=normalize(vN), V=normalize(-vP);
vec3 L1=normalize(vec3(-.72, .85,1.2));
vec3 L2=normalize(vec3(.9,-.65,1.2));
vec3 L3=normalize(vec3(.15,1.0,-.35));
float d1=sat(dot(N,L1)),d2=sat(dot(N,L2)),d3=sat(dot(N,L3));
float spec1=pow(sat(dot(reflect(-L1,N),V)),66.);
float spec2=pow(sat(dot(reflect(-L2,N),V)),42.);
float spec3=pow(sat(dot(reflect(-L3,N),V)),92.);
float f=pow(1.0-sat(dot(N,V)),2.7);
float wave=sin(vUV.x*28.0-uT*.7+vUV.y*4.5);
vec3 navy=vec3(.022,.075,.19);
vec3 blue=vec3(.013,.35,.75);
vec3 cyan=vec3(.025,.8,.91);
vec3 violet=vec3(.29,.13,.82);
float b=sin(vUV.x*11.8+vUV.y*2.0+vID*2.6+uT*.25)*.5+.5;
vec3 base=mix(navy,blue,sat(.36+vUV.y*.42+.25*b));
if(vID>0.6&&vID<1.5) base=mix(violet,blue,sat(.37+.45*b+.18*vUV.y));
if(vID>1.5&&vID<2.5) base=mix(cyan,blue,sat(.4+.4*b));
if(vID>2.5) base=mix(vec3(.08,.42,.89),vec3(.57,.27,.88),b);
float mirror=pow(sat(sin(atan(N.z,N.x)*5.2+N.y*6.0)),6.0)*.40;
vec3 col=base*(.37+.56*d1+.25*d2+.09*d3);
col+=vec3(.62,.94,1.)*spec1*1.95+vec3(.46,.61,1.)*spec2*.86+vec3(.97,.76,1.)*spec3*.85;
col+=vec3(.23,.65,.92)*mirror;
col+=mix(vec3(.10,.72,1.),vec3(.72,.42,1.),b)*f*1.0;
float edge=pow(abs(vUV.y*2.0-1.0),14.);
col+=mix(vec3(.32,.95,1.),vec3(.87,.66,1.),b)*edge*1.25;
float moving=pow(sat(sin(vUV.x*9.0-uT*.32+vID*.9)),14.)*.42;
col+=vec3(.42,.84,1.)*moving;
col+=vA*vec3(.24,.5,.96)*.65;
gl_FragColor=vec4(col,1.0);
}`;
const psrc=`precision highp float;
attribute vec3 aP;attribute float aSize;attribute float aPhase;
uniform float uT,uYaw,uPitch,uAspect,uEnergy,uScale;
varying float vPhase;
void main(){
vec3 pos=aP;float cy=cos(uYaw),sy=sin(uYaw),cx=cos(uPitch),sx=sin(uPitch);
mat3 ry=mat3(cy,0.,-sy,0.,1.,0.,sy,0.,cy),rx=mat3(1.,0.,0.,0.,cx,sx,0.,-sx,cx);
pos=rx*ry*(pos+normalize(pos+vec3(.001))*(uEnergy*.7));
pos.z-=8.7;float z=-pos.z;
gl_Position=vec4(pos.x*.58*uScale,pos.y*.58*uAspect*1.22*uScale,1.0-1.6/z,z*.25);
gl_PointSize=aSize*(3.0+1.9*sin(uT*1.6+aPhase*5.0))*(9.0/z);
vPhase=aPhase;
}`;
const pfsh=`precision highp float;varying float vPhase;uniform float uT;void main(){float r=length(gl_PointCoord-.5)*2.0;float a=pow(max(0.,1.-r),2.6);vec3 c=mix(vec3(.03,.65,.9),vec3(.64,.37,1.),sin(vPhase*18.0+uT*.1)*.5+.5);gl_FragColor=vec4(c,a*.80);}`;
let main=null,sparks=null,meshGroups=[];
function V(x,y,z){return [x,y,z]};function add(a,b){return[a[0]+b[0],a[1]+b[1],a[2]+b[2]]}function sub(a,b){return[a[0]-b[0],a[1]-b[1],a[2]-b[2]]}function mul(a,k){return[a[0]*k,a[1]*k,a[2]*k]};function cross(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}function norm(a){let l=Math.hypot(...a)||1;return mul(a,1/l)}
function curve(t,id){let v=t+(id===1?.10:id===2?-.10:id===3?.21:0);
let amp=id===0?1:id===1?.94:id===2?1.045:1.085;
return [amp*(1.88*Math.sin(v)+.40*Math.sin(3*v)),amp*(1.00*Math.sin(2*v)+.15*Math.cos(5*v)),.94*Math.cos(v)+.49*Math.cos(3*v)+id*.033];}
function point(t,u,id){let c=curve(t,id),dt=.0005,dir=norm(sub(curve(t+dt,id),curve(t-dt,id)));
let aux=norm(cross(dir,[0,0,1]));if(Math.hypot(...aux)<.001)aux=[1,0,0];let v=norm(cross(dir,aux));
let tw=(t*(id%2===0?1.6:-2.05)+id*1.63),basis=add(mul(aux,Math.cos(tw)),mul(v,Math.sin(tw)));
let width=[.62,.31,.17,.07][id]*(.84+.18*Math.sin(3*t+id));
let offset=add(mul(aux,[0,.16,-.18,.25][id]),mul(v,[0,-.075,.12,.14][id]));
let ripple=Math.sin(t*9.0+u*3.8+id)*.016;
return add(add(c,offset),mul(basis,(u-.5)*width+ripple));}
function makeRibbon(id){let columns=10,rows=260,raw=[],uv=[],inds=[],ns=[],ids=[];
for(let i=0;i<=rows;i++){let t=i/rows*Math.PI*2;for(let j=0;j<=columns;j++){let u=j/columns,cp=point(t,u,id);raw.push(...cp);uv.push(i/rows,u);ids.push(id);let dt=.003,du=.01,xx=sub(point(t+dt,u,id),point(t-dt,u,id)),yy=sub(point(t,u+du,id),point(t,u-du,id)),N=norm(cross(xx,yy));ns.push(...N)}}
for(let i=0;i<rows;i++)for(let j=0;j<columns;j++){let a=i*(columns+1)+j,b=a+columns+1;inds.push(a,b,a+1,b,b+1,a+1)}
let expanded=[],normals=[],uvs=[],material=[];for(let k of inds){expanded.push(raw[k*3],raw[k*3+1],raw[k*3+2]);normals.push(ns[k*3],ns[k*3+1],ns[k*3+2]);uvs.push(uv[k*2],uv[k*2+1]);material.push(id)}
return{pos:new Float32Array(expanded),normal:new Float32Array(normals),uv:new Float32Array(uvs),id:new Float32Array(material),n:inds.length}}
function buf(data){let b=gl.createBuffer();buffers.push(b);gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);return b}
function connect(program,name,buffer,size){let loc=gl.getAttribLocation(program,name);if(loc<0)return;gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0)}
if(gl){main=program(vsrc,fsrc);sparks=program(psrc,pfsh);
for(let i=0;i<4;i++){let m=makeRibbon(i);meshGroups.push({p:buf(m.pos),n:buf(m.normal),uv:buf(m.uv),id:buf(m.id),count:m.n})}
const pts=[],sizes=[],phases=[];let seed=1521;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
for(let i=0;i<950;i++){let a=rnd()*Math.PI*2,b=rnd()*Math.PI*2;let rad=1.3+Math.pow(rnd(),1.2)*2.8;pts.push(Math.cos(a)*rad,Math.sin(b)*1.95,Math.sin(a)*rad*.50+Math.cos(b)*.9);sizes.push(.85+rnd()*1.65);phases.push(rnd())}
const m={p:buf(new Float32Array(pts)),size:buf(new Float32Array(sizes)),phase:buf(new Float32Array(phases)),count:sizes.length};
function uni(program,name,value){let loc=gl.getUniformLocation(program,name);gl.uniform1f(loc,value)}
renderGL=(elapsed)=>{
gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
const aspect=H/W,scale=mobile?1.02:(W<600?1.06:1.12);
gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.BLEND);gl.useProgram(main);uni(main,'uT',elapsed);uni(main,'uYaw',yaw);uni(main,'uPitch',pitch);uni(main,'uEnergy',energy);uni(main,'uAspect',aspect);uni(main,'uScale',scale);
for(let m of meshGroups){connect(main,'aP',m.p,3);connect(main,'aN',m.n,3);connect(main,'aUV',m.uv,2);connect(main,'aID',m.id,1);gl.drawArrays(gl.TRIANGLES,0,m.count)}
gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.depthMask(false);gl.useProgram(sparks);uni(sparks,'uT',elapsed);uni(sparks,'uYaw',yaw);uni(sparks,'uPitch',pitch);uni(sparks,'uAspect',aspect);uni(sparks,'uEnergy',energy);uni(sparks,'uScale',scale);connect(sparks,'aP',m.p,3);connect(sparks,'aSize',m.size,1);connect(sparks,'aPhase',m.phase,1);gl.drawArrays(gl.POINTS,0,m.count);gl.depthMask(true);
};}
else {canvas.style.display='none';}

const dust=Array.from({length:90},(_,i)=>{let a=Math.random()*Math.PI*2,r=.22+Math.random()*.45;return{x:Math.random(),y:Math.random(),r:Math.random()*1.2+.2,phase:a,speed:.15+Math.random()*.36,alpha:.12+Math.random()*.32}});
const shards=Array.from({length:36},(_,i)=>({a:Math.random()*Math.PI*2,rad:.11+Math.random()*.38,w:5+Math.random()*15,offset:Math.random()*6.28}));
function renderFX(elapsed){ctx.clearRect(0,0,W,H);const cx=W*.53,cy=H*.49;ctx.save();
// Fine reticle, fragmented circular coordinate marks. Deliberately not an orbital sphere.
ctx.globalAlpha=.33;ctx.strokeStyle='#87aaca';ctx.lineWidth=.85;ctx.setLineDash([3,9]);ctx.beginPath();ctx.ellipse(cx,cy,W*.36,H*.30,.29,Math.PI*.02,Math.PI*.52);ctx.stroke();ctx.beginPath();ctx.ellipse(cx,cy,W*.32,H*.34,-.40,Math.PI*1.08,Math.PI*1.56);ctx.stroke();ctx.setLineDash([]);
for(let s of dust){let x=s.x*W+Math.sin(elapsed*s.speed+s.phase)*8,y=s.y*H+Math.cos(elapsed*s.speed+s.phase)*9;let d=Math.hypot((x-cx)/W,(y-cy)/H);if(d>.46)continue;ctx.globalAlpha=s.alpha*.55*(.75+.25*Math.sin(elapsed*1.3+s.phase));ctx.fillStyle=s.phase>3?'#4c61c4':'#11a4c5';ctx.beginPath();ctx.arc(x,y,s.r,0,7);ctx.fill()}
for(let s of shards){let a=s.a+elapsed*(.025+.018*Math.sin(s.a)),r=W*s.rad+Math.sin(elapsed*.8+s.offset)*5;let x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.66;if(Math.hypot(x-cx,y-cy)<W*.19)continue;ctx.globalAlpha=.17+.19*Math.sin(elapsed+s.a)**2;ctx.strokeStyle=s.a>3?'#645bca':'#169fcb';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a+2)*s.w,y+Math.sin(a+2)*s.w);ctx.stroke()}
ctx.globalAlpha=.34;ctx.strokeStyle='#63b7da';ctx.lineWidth=1;const cr=W*.425;
for(let i=0;i<18;i++){let a=i*Math.PI/9+elapsed*.014,r=cr*(.82+(i%3)*.027);let x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.76;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a)*6,y+Math.sin(a)*5);ctx.stroke()}
if(boost>.01){let g=ctx.createRadialGradient(cx,cy,0,cx,cy,W*.42*boost);g.addColorStop(0,'rgba(65,203,249,0)');g.addColorStop(.75,`rgba(88,171,250,${.22*boost})`);g.addColorStop(.95,`rgba(73,131,237,${.2*boost})`);g.addColorStop(1,'rgba(73,131,237,0)');ctx.fillStyle=g;ctx.globalAlpha=1;ctx.beginPath();ctx.arc(cx,cy,W*.42*boost,0,7);ctx.fill()}
ctx.restore()}
const fpsCap=reduce?15:60;let frameLast=0;
function frame(ts){if(ts-frameLast<1000/fpsCap){frameId=requestAnimationFrame(frame);return}let dt=lastTime?Math.min((ts-lastTime)/1000,.08):.016;frameLast=ts;lastTime=ts;if(!reduce)t+=dt;mouseX=mix(mouseX,targetX,.065);mouseY=mix(mouseY,targetY,.065);
if(!drag&&!reduce){yaw+=dt*.15;yaw+=((mouseX*.14)-((yaw+.17)%(Math.PI*2)))*.0;pitch=mix(pitch,-.11+mouseY*.20,.028)}
energy=mix(energy,energyTarget,energyTarget?.15:.075);boost*=.94;
if(gl)renderGL(t);
renderFX(t);
renderLabels(t);
if(!gl)renderFallback(t);frameId=requestAnimationFrame(frame)}
function renderFallback(elapsed){const c=fx.getContext('2d');let cx=W*.52,cy=H*.49;c.save();c.translate(cx,cy);for(let j=0;j<3;j++){c.beginPath();for(let i=0;i<=1300;i++){let a=i/1300*Math.PI*2;let x=W*.31*Math.sin(a)+W*.09*Math.sin(3*a),y=H*.23*Math.sin(2*a);let rot=yaw+elapsed*.08;let xx=x*Math.cos(rot)+Math.cos(a)*W*.12*Math.sin(rot);if(i)c.lineTo(xx,y);else c.moveTo(xx,y)}c.lineWidth=(13-j*3);c.strokeStyle=['#0ba8d4','#5468df','#72cef7'][j];c.stroke()}c.restore()}
frameId=requestAnimationFrame(frame);
return () => {
controller.abort();observer.disconnect();cancelAnimationFrame(frameId);clearTimeout(pulseTimer);
if(gl){buffers.forEach(b=>gl.deleteBuffer(b));programs.forEach(p=>gl.deleteProgram(p));shaders.forEach(s=>gl.deleteShader(s));}
};
}
