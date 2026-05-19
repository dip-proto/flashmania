(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const pr="164",Zo=0,Dr=1,jo=2,ho=1,uo=2,Qe=3,pn=0,Se=1,tn=2,fn=0,Jn=1,Ir=2,Ur=3,Nr=4,Jo=5,bn=100,Qo=101,tc=102,ec=103,nc=104,ic=200,sc=201,rc=202,ac=203,ar=204,or=205,oc=206,cc=207,lc=208,hc=209,uc=210,fc=211,dc=212,pc=213,mc=214,gc=0,_c=1,xc=2,rs=3,vc=4,Mc=5,Sc=6,yc=7,fo=0,Ec=1,Tc=2,dn=0,Ac=1,wc=2,bc=3,po=4,Rc=5,Cc=6,Pc=7,mo=300,ei=301,ni=302,cr=303,lr=304,gs=306,hr=1e3,Cn=1001,ur=1002,Ne=1003,Lc=1004,Ri=1005,Be=1006,Ts=1007,Pn=1008,mn=1009,Dc=1010,Ic=1011,go=1012,_o=1013,ii=1014,un=1015,_s=1016,xo=1017,vo=1018,xi=1020,Uc=35902,Nc=1021,Fc=1022,Xe=1023,Oc=1024,zc=1025,Qn=1026,_i=1027,Bc=1028,Mo=1029,Gc=1030,So=1031,yo=1033,As=33776,ws=33777,bs=33778,Rs=33779,Fr=35840,Or=35841,zr=35842,Br=35843,Gr=36196,kr=37492,Hr=37496,Vr=37808,Wr=37809,Xr=37810,qr=37811,Yr=37812,Kr=37813,$r=37814,Zr=37815,jr=37816,Jr=37817,Qr=37818,ta=37819,ea=37820,na=37821,Cs=36492,ia=36494,sa=36495,kc=36283,ra=36284,aa=36285,oa=36286,Hc=3200,Vc=3201,Eo=0,Wc=1,hn="",Ve="srgb",_n="srgb-linear",mr="display-p3",xs="display-p3-linear",as="linear",jt="srgb",os="rec709",cs="p3",Un=7680,ca=519,Xc=512,qc=513,Yc=514,To=515,Kc=516,$c=517,Zc=518,jc=519,la=35044,ha="300 es",en=2e3,ls=2001;class ai{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const me=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],is=Math.PI/180,hs=180/Math.PI;function vi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(me[i&255]+me[i>>8&255]+me[i>>16&255]+me[i>>24&255]+"-"+me[t&255]+me[t>>8&255]+"-"+me[t>>16&15|64]+me[t>>24&255]+"-"+me[e&63|128]+me[e>>8&255]+"-"+me[e>>16&255]+me[e>>24&255]+me[n&255]+me[n>>8&255]+me[n>>16&255]+me[n>>24&255]).toLowerCase()}function Ee(i,t,e){return Math.max(t,Math.min(e,i))}function Jc(i,t){return(i%t+t)%t}function Ps(i,t,e){return(1-e)*i+e*t}function hi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ye(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Gt{constructor(t=0,e=0){Gt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class bt{constructor(t,e,n,s,r,a,o,c,l){bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],f=n[2],m=n[5],g=n[8],x=s[0],p=s[3],u=s[6],T=s[1],y=s[4],E=s[7],L=s[2],b=s[5],w=s[8];return r[0]=a*x+o*T+c*L,r[3]=a*p+o*y+c*b,r[6]=a*u+o*E+c*w,r[1]=l*x+h*T+d*L,r[4]=l*p+h*y+d*b,r[7]=l*u+h*E+d*w,r[2]=f*x+m*T+g*L,r[5]=f*p+m*y+g*b,r[8]=f*u+m*E+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,f=o*c-h*r,m=l*r-a*c,g=e*d+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(s*l-h*n)*x,t[2]=(o*n-s*a)*x,t[3]=f*x,t[4]=(h*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=m*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Ls.makeScale(t,e)),this}rotate(t){return this.premultiply(Ls.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ls.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ls=new bt;function Ao(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function us(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qc(){const i=us("canvas");return i.style.display="block",i}const ua={};function tl(i){i in ua||(ua[i]=!0,console.warn(i))}const fa=new bt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),da=new bt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ci={[_n]:{transfer:as,primaries:os,toReference:i=>i,fromReference:i=>i},[Ve]:{transfer:jt,primaries:os,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[xs]:{transfer:as,primaries:cs,toReference:i=>i.applyMatrix3(da),fromReference:i=>i.applyMatrix3(fa)},[mr]:{transfer:jt,primaries:cs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(da),fromReference:i=>i.applyMatrix3(fa).convertLinearToSRGB()}},el=new Set([_n,xs]),Xt={enabled:!0,_workingColorSpace:_n,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!el.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Ci[t].toReference,s=Ci[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Ci[i].primaries},getTransfer:function(i){return i===hn?as:Ci[i].transfer}};function ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ds(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Nn;class nl{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Nn===void 0&&(Nn=us("canvas")),Nn.width=t.width,Nn.height=t.height;const n=Nn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Nn}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=us("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ti(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ti(e[n]/255)*255):e[n]=ti(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let il=0;class wo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:il++}),this.uuid=vi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Is(s[a].image)):r.push(Is(s[a]))}else r=Is(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Is(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let sl=0;class Ae extends ai{constructor(t=Ae.DEFAULT_IMAGE,e=Ae.DEFAULT_MAPPING,n=Cn,s=Cn,r=Be,a=Pn,o=Xe,c=mn,l=Ae.DEFAULT_ANISOTROPY,h=hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sl++}),this.uuid=vi(),this.name="",this.source=new wo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==mo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case hr:t.x=t.x-Math.floor(t.x);break;case Cn:t.x=t.x<0?0:1;break;case ur:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case hr:t.y=t.y-Math.floor(t.y);break;case Cn:t.y=t.y<0?0:1;break;case ur:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ae.DEFAULT_IMAGE=null;Ae.DEFAULT_MAPPING=mo;Ae.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,s=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],d=c[8],f=c[1],m=c[5],g=c[9],x=c[2],p=c[6],u=c[10];if(Math.abs(h-f)<.01&&Math.abs(d-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+x)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+u-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,E=(m+1)/2,L=(u+1)/2,b=(h+f)/4,w=(d+x)/4,N=(g+p)/4;return y>E&&y>L?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=b/n,r=w/n):E>L?E<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),n=b/s,r=N/s):L<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(L),n=w/r,s=N/r),this.set(n,s,r,e),this}let T=Math.sqrt((p-g)*(p-g)+(d-x)*(d-x)+(f-h)*(f-h));return Math.abs(T)<.001&&(T=1),this.x=(p-g)/T,this.y=(d-x)/T,this.z=(f-h)/T,this.w=Math.acos((l+m+u-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rl extends ai{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Be,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ae(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new wo(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Dn extends rl{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class bo extends Ae{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class al extends Ae{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3];const f=r[a+0],m=r[a+1],g=r[a+2],x=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=x;return}if(d!==x||c!==f||l!==m||h!==g){let p=1-o;const u=c*f+l*m+h*g+d*x,T=u>=0?1:-1,y=1-u*u;if(y>Number.EPSILON){const L=Math.sqrt(y),b=Math.atan2(L,u*T);p=Math.sin(p*b)/L,o=Math.sin(o*b)/L}const E=o*T;if(c=c*p+f*E,l=l*p+m*E,h=h*p+g*E,d=d*p+x*E,p===1-o){const L=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=L,l*=L,h*=L,d*=L}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+h*d+c*m-l*f,t[e+1]=c*g+h*f+l*d-o*m,t[e+2]=l*g+h*m+o*f-c*d,t[e+3]=h*g-o*d-c*f-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),f=c(n/2),m=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*h*d+l*m*g,this._y=l*m*d-f*h*g,this._z=l*h*g+f*m*d,this._w=l*h*d-f*m*g;break;case"YXZ":this._x=f*h*d+l*m*g,this._y=l*m*d-f*h*g,this._z=l*h*g-f*m*d,this._w=l*h*d+f*m*g;break;case"ZXY":this._x=f*h*d-l*m*g,this._y=l*m*d+f*h*g,this._z=l*h*g+f*m*d,this._w=l*h*d-f*m*g;break;case"ZYX":this._x=f*h*d-l*m*g,this._y=l*m*d+f*h*g,this._z=l*h*g-f*m*d,this._w=l*h*d+f*m*g;break;case"YZX":this._x=f*h*d+l*m*g,this._y=l*m*d+f*h*g,this._z=l*h*g-f*m*d,this._w=l*h*d-f*m*g;break;case"XZY":this._x=f*h*d-l*m*g,this._y=l*m*d-f*h*g,this._z=l*h*g+f*m*d,this._w=l*h*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],f=n+o+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,e=0,n=0){D.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(pa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(pa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Us.copy(this).projectOnVector(t),this.sub(Us)}reflect(t){return this.sub(Us.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Us=new D,pa=new Mi;class Si{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Fe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Fe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Fe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Fe):Fe.fromBufferAttribute(r,a),Fe.applyMatrix4(t.matrixWorld),this.expandByPoint(Fe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Pi.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pi.copy(n.boundingBox)),Pi.applyMatrix4(t.matrixWorld),this.union(Pi)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Fe),Fe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ui),Li.subVectors(this.max,ui),Fn.subVectors(t.a,ui),On.subVectors(t.b,ui),zn.subVectors(t.c,ui),sn.subVectors(On,Fn),rn.subVectors(zn,On),vn.subVectors(Fn,zn);let e=[0,-sn.z,sn.y,0,-rn.z,rn.y,0,-vn.z,vn.y,sn.z,0,-sn.x,rn.z,0,-rn.x,vn.z,0,-vn.x,-sn.y,sn.x,0,-rn.y,rn.x,0,-vn.y,vn.x,0];return!Ns(e,Fn,On,zn,Li)||(e=[1,0,0,0,1,0,0,0,1],!Ns(e,Fn,On,zn,Li))?!1:(Di.crossVectors(sn,rn),e=[Di.x,Di.y,Di.z],Ns(e,Fn,On,zn,Li))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Fe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Fe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ke[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ke[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ke[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ke[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ke[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ke[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ke[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ke[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ke),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ke=[new D,new D,new D,new D,new D,new D,new D,new D],Fe=new D,Pi=new Si,Fn=new D,On=new D,zn=new D,sn=new D,rn=new D,vn=new D,ui=new D,Li=new D,Di=new D,Mn=new D;function Ns(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Mn.fromArray(i,r);const o=s.x*Math.abs(Mn.x)+s.y*Math.abs(Mn.y)+s.z*Math.abs(Mn.z),c=t.dot(Mn),l=e.dot(Mn),h=n.dot(Mn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const ol=new Si,fi=new D,Fs=new D;class yi{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ol.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fi.subVectors(t,this.center);const e=fi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(fi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Fs.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fi.copy(t.center).add(Fs)),this.expandByPoint(fi.copy(t.center).sub(Fs))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const $e=new D,Os=new D,Ii=new D,an=new D,zs=new D,Ui=new D,Bs=new D;class gr{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,$e)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=$e.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):($e.copy(this.origin).addScaledVector(this.direction,e),$e.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Os.copy(t).add(e).multiplyScalar(.5),Ii.copy(e).sub(t).normalize(),an.copy(this.origin).sub(Os);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ii),o=an.dot(this.direction),c=-an.dot(Ii),l=an.lengthSq(),h=Math.abs(1-a*a);let d,f,m,g;if(h>0)if(d=a*c-o,f=a*o-c,g=r*h,d>=0)if(f>=-g)if(f<=g){const x=1/h;d*=x,f*=x,m=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-c),r),m=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-c),r),m=-d*d+f*(f+2*c)+l);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Os).addScaledVector(Ii,f),m}intersectSphere(t,e){$e.subVectors(t.center,this.origin);const n=$e.dot(this.direction),s=$e.dot($e)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,a=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,a=(t.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-f.z)*d,c=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,c=(t.min.z-f.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,$e)!==null}intersectTriangle(t,e,n,s,r){zs.subVectors(e,t),Ui.subVectors(n,t),Bs.crossVectors(zs,Ui);let a=this.direction.dot(Bs),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;an.subVectors(this.origin,t);const c=o*this.direction.dot(Ui.crossVectors(an,Ui));if(c<0)return null;const l=o*this.direction.dot(zs.cross(an));if(l<0||c+l>a)return null;const h=-o*an.dot(Bs);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class te{constructor(t,e,n,s,r,a,o,c,l,h,d,f,m,g,x,p){te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,d,f,m,g,x,p)}set(t,e,n,s,r,a,o,c,l,h,d,f,m,g,x,p){const u=this.elements;return u[0]=t,u[4]=e,u[8]=n,u[12]=s,u[1]=r,u[5]=a,u[9]=o,u[13]=c,u[2]=l,u[6]=h,u[10]=d,u[14]=f,u[3]=m,u[7]=g,u[11]=x,u[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new te().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Bn.setFromMatrixColumn(t,0).length(),r=1/Bn.setFromMatrixColumn(t,1).length(),a=1/Bn.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const f=a*h,m=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=m+g*l,e[5]=f-x*l,e[9]=-o*c,e[2]=x-f*l,e[6]=g+m*l,e[10]=a*c}else if(t.order==="YXZ"){const f=c*h,m=c*d,g=l*h,x=l*d;e[0]=f+x*o,e[4]=g*o-m,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=m*o-g,e[6]=x+f*o,e[10]=a*c}else if(t.order==="ZXY"){const f=c*h,m=c*d,g=l*h,x=l*d;e[0]=f-x*o,e[4]=-a*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*h,e[9]=x-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const f=a*h,m=a*d,g=o*h,x=o*d;e[0]=c*h,e[4]=g*l-m,e[8]=f*l+x,e[1]=c*d,e[5]=x*l+f,e[9]=m*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const f=a*c,m=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=x-f*d,e[8]=g*d+m,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=m*d+g,e[10]=f-x*d}else if(t.order==="XZY"){const f=a*c,m=a*l,g=o*c,x=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=f*d+x,e[5]=a*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*h,e[10]=x*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cl,t,ll)}lookAt(t,e,n){const s=this.elements;return be.subVectors(t,e),be.lengthSq()===0&&(be.z=1),be.normalize(),on.crossVectors(n,be),on.lengthSq()===0&&(Math.abs(n.z)===1?be.x+=1e-4:be.z+=1e-4,be.normalize(),on.crossVectors(n,be)),on.normalize(),Ni.crossVectors(be,on),s[0]=on.x,s[4]=Ni.x,s[8]=be.x,s[1]=on.y,s[5]=Ni.y,s[9]=be.y,s[2]=on.z,s[6]=Ni.z,s[10]=be.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],f=n[9],m=n[13],g=n[2],x=n[6],p=n[10],u=n[14],T=n[3],y=n[7],E=n[11],L=n[15],b=s[0],w=s[4],N=s[8],S=s[12],_=s[1],U=s[5],G=s[9],R=s[13],V=s[2],W=s[6],j=s[10],J=s[14],k=s[3],tt=s[7],Q=s[11],gt=s[15];return r[0]=a*b+o*_+c*V+l*k,r[4]=a*w+o*U+c*W+l*tt,r[8]=a*N+o*G+c*j+l*Q,r[12]=a*S+o*R+c*J+l*gt,r[1]=h*b+d*_+f*V+m*k,r[5]=h*w+d*U+f*W+m*tt,r[9]=h*N+d*G+f*j+m*Q,r[13]=h*S+d*R+f*J+m*gt,r[2]=g*b+x*_+p*V+u*k,r[6]=g*w+x*U+p*W+u*tt,r[10]=g*N+x*G+p*j+u*Q,r[14]=g*S+x*R+p*J+u*gt,r[3]=T*b+y*_+E*V+L*k,r[7]=T*w+y*U+E*W+L*tt,r[11]=T*N+y*G+E*j+L*Q,r[15]=T*S+y*R+E*J+L*gt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],f=t[10],m=t[14],g=t[3],x=t[7],p=t[11],u=t[15];return g*(+r*c*d-s*l*d-r*o*f+n*l*f+s*o*m-n*c*m)+x*(+e*c*m-e*l*f+r*a*f-s*a*m+s*l*h-r*c*h)+p*(+e*l*d-e*o*m-r*a*d+n*a*m+r*o*h-n*l*h)+u*(-s*o*h-e*c*d+e*o*f+s*a*d-n*a*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],f=t[10],m=t[11],g=t[12],x=t[13],p=t[14],u=t[15],T=d*p*l-x*f*l+x*c*m-o*p*m-d*c*u+o*f*u,y=g*f*l-h*p*l-g*c*m+a*p*m+h*c*u-a*f*u,E=h*x*l-g*d*l+g*o*m-a*x*m-h*o*u+a*d*u,L=g*d*c-h*x*c-g*o*f+a*x*f+h*o*p-a*d*p,b=e*T+n*y+s*E+r*L;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/b;return t[0]=T*w,t[1]=(x*f*r-d*p*r-x*s*m+n*p*m+d*s*u-n*f*u)*w,t[2]=(o*p*r-x*c*r+x*s*l-n*p*l-o*s*u+n*c*u)*w,t[3]=(d*c*r-o*f*r-d*s*l+n*f*l+o*s*m-n*c*m)*w,t[4]=y*w,t[5]=(h*p*r-g*f*r+g*s*m-e*p*m-h*s*u+e*f*u)*w,t[6]=(g*c*r-a*p*r-g*s*l+e*p*l+a*s*u-e*c*u)*w,t[7]=(a*f*r-h*c*r+h*s*l-e*f*l-a*s*m+e*c*m)*w,t[8]=E*w,t[9]=(g*d*r-h*x*r-g*n*m+e*x*m+h*n*u-e*d*u)*w,t[10]=(a*x*r-g*o*r+g*n*l-e*x*l-a*n*u+e*o*u)*w,t[11]=(h*o*r-a*d*r-h*n*l+e*d*l+a*n*m-e*o*m)*w,t[12]=L*w,t[13]=(h*x*s-g*d*s+g*n*f-e*x*f-h*n*p+e*d*p)*w,t[14]=(g*o*s-a*x*s-g*n*c+e*x*c+a*n*p-e*o*p)*w,t[15]=(a*d*s-h*o*s+h*n*c-e*d*c-a*n*f+e*o*f)*w,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,f=r*l,m=r*h,g=r*d,x=a*h,p=a*d,u=o*d,T=c*l,y=c*h,E=c*d,L=n.x,b=n.y,w=n.z;return s[0]=(1-(x+u))*L,s[1]=(m+E)*L,s[2]=(g-y)*L,s[3]=0,s[4]=(m-E)*b,s[5]=(1-(f+u))*b,s[6]=(p+T)*b,s[7]=0,s[8]=(g+y)*w,s[9]=(p-T)*w,s[10]=(1-(f+x))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Bn.set(s[0],s[1],s[2]).length();const a=Bn.set(s[4],s[5],s[6]).length(),o=Bn.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Oe.copy(this);const l=1/r,h=1/a,d=1/o;return Oe.elements[0]*=l,Oe.elements[1]*=l,Oe.elements[2]*=l,Oe.elements[4]*=h,Oe.elements[5]*=h,Oe.elements[6]*=h,Oe.elements[8]*=d,Oe.elements[9]*=d,Oe.elements[10]*=d,e.setFromRotationMatrix(Oe),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=en){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let m,g;if(o===en)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===ls)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=en){const c=this.elements,l=1/(e-t),h=1/(n-s),d=1/(a-r),f=(e+t)*l,m=(n+s)*h;let g,x;if(o===en)g=(a+r)*d,x=-2*d;else if(o===ls)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Bn=new D,Oe=new te,cl=new D(0,0,0),ll=new D(1,1,1),on=new D,Ni=new D,be=new D,ma=new te,ga=new Mi;class qe{constructor(t=0,e=0,n=0,s=qe.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],f=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ee(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ee(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ee(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ma.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ma,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ga.setFromEuler(this),this.setFromQuaternion(ga,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qe.DEFAULT_ORDER="XYZ";class Ro{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hl=0;const _a=new D,Gn=new Mi,Ze=new te,Fi=new D,di=new D,ul=new D,fl=new Mi,xa=new D(1,0,0),va=new D(0,1,0),Ma=new D(0,0,1),Sa={type:"added"},dl={type:"removed"},kn={type:"childadded",child:null},Gs={type:"childremoved",child:null};class se extends ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hl++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=se.DEFAULT_UP.clone();const t=new D,e=new qe,n=new Mi,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new te},normalMatrix:{value:new bt}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=se.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ro,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gn.setFromAxisAngle(t,e),this.quaternion.multiply(Gn),this}rotateOnWorldAxis(t,e){return Gn.setFromAxisAngle(t,e),this.quaternion.premultiply(Gn),this}rotateX(t){return this.rotateOnAxis(xa,t)}rotateY(t){return this.rotateOnAxis(va,t)}rotateZ(t){return this.rotateOnAxis(Ma,t)}translateOnAxis(t,e){return _a.copy(t).applyQuaternion(this.quaternion),this.position.add(_a.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xa,t)}translateY(t){return this.translateOnAxis(va,t)}translateZ(t){return this.translateOnAxis(Ma,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ze.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Fi.copy(t):Fi.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),di.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ze.lookAt(di,Fi,this.up):Ze.lookAt(Fi,di,this.up),this.quaternion.setFromRotationMatrix(Ze),s&&(Ze.extractRotation(s.matrixWorld),Gn.setFromRotationMatrix(Ze),this.quaternion.premultiply(Gn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Sa),kn.child=t,this.dispatchEvent(kn),kn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(dl),Gs.child=t,this.dispatchEvent(Gs),Gs.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ze.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ze.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ze),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Sa),kn.child=t,this.dispatchEvent(kn),kn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(di,t,ul),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(di,fl,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),f=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}se.DEFAULT_UP=new D(0,1,0);se.DEFAULT_MATRIX_AUTO_UPDATE=!0;se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ze=new D,je=new D,ks=new D,Je=new D,Hn=new D,Vn=new D,ya=new D,Hs=new D,Vs=new D,Ws=new D;class Ge{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ze.subVectors(t,e),s.cross(ze);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ze.subVectors(s,e),je.subVectors(n,e),ks.subVectors(t,e);const a=ze.dot(ze),o=ze.dot(je),c=ze.dot(ks),l=je.dot(je),h=je.dot(ks),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const f=1/d,m=(l*c-o*h)*f,g=(a*h-o*c)*f;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Je)===null?!1:Je.x>=0&&Je.y>=0&&Je.x+Je.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Je)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Je.x),c.addScaledVector(a,Je.y),c.addScaledVector(o,Je.z),c)}static isFrontFacing(t,e,n,s){return ze.subVectors(n,e),je.subVectors(t,e),ze.cross(je).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ze.subVectors(this.c,this.b),je.subVectors(this.a,this.b),ze.cross(je).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ge.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ge.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Ge.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ge.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ge.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Hn.subVectors(s,n),Vn.subVectors(r,n),Hs.subVectors(t,n);const c=Hn.dot(Hs),l=Vn.dot(Hs);if(c<=0&&l<=0)return e.copy(n);Vs.subVectors(t,s);const h=Hn.dot(Vs),d=Vn.dot(Vs);if(h>=0&&d<=h)return e.copy(s);const f=c*d-h*l;if(f<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Hn,a);Ws.subVectors(t,r);const m=Hn.dot(Ws),g=Vn.dot(Ws);if(g>=0&&m<=g)return e.copy(r);const x=m*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Vn,o);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return ya.subVectors(r,s),o=(d-h)/(d-h+(m-g)),e.copy(s).addScaledVector(ya,o);const u=1/(p+x+f);return a=x*u,o=f*u,e.copy(n).addScaledVector(Hn,a).addScaledVector(Vn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Co={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},cn={h:0,s:0,l:0},Oi={h:0,s:0,l:0};function Xs(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class It{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Xt.workingColorSpace){if(t=Jc(t,1),e=Ee(e,0,1),n=Ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Xs(a,r,t+1/3),this.g=Xs(a,r,t),this.b=Xs(a,r,t-1/3)}return Xt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ve){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){const n=Co[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ti(t.r),this.g=ti(t.g),this.b=ti(t.b),this}copyLinearToSRGB(t){return this.r=Ds(t.r),this.g=Ds(t.g),this.b=Ds(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return Xt.fromWorkingColorSpace(ge.copy(this),t),Math.round(Ee(ge.r*255,0,255))*65536+Math.round(Ee(ge.g*255,0,255))*256+Math.round(Ee(ge.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(ge.copy(this),e);const n=ge.r,s=ge.g,r=ge.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(ge.copy(this),e),t.r=ge.r,t.g=ge.g,t.b=ge.b,t}getStyle(t=Ve){Xt.fromWorkingColorSpace(ge.copy(this),t);const e=ge.r,n=ge.g,s=ge.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(cn),this.setHSL(cn.h+t,cn.s+e,cn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(cn),t.getHSL(Oi);const n=Ps(cn.h,Oi.h,e),s=Ps(cn.s,Oi.s,e),r=Ps(cn.l,Oi.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ge=new It;It.NAMES=Co;let pl=0;class In extends ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pl++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=Jn,this.side=pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ar,this.blendDst=or,this.blendEquation=bn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ca,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Un,this.stencilZFail=Un,this.stencilZPass=Un,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Jn&&(n.blending=this.blending),this.side!==pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ar&&(n.blendSrc=this.blendSrc),this.blendDst!==or&&(n.blendDst=this.blendDst),this.blendEquation!==bn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==rs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ca&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Un&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Un&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Un&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class _r extends In{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.combine=fo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ae=new D,zi=new Gt;class ke{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=la,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return tl("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zi.fromBufferAttribute(this,e),zi.applyMatrix3(t),this.setXY(e,zi.x,zi.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ae.fromBufferAttribute(this,e),ae.applyMatrix3(t),this.setXYZ(e,ae.x,ae.y,ae.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ae.fromBufferAttribute(this,e),ae.applyMatrix4(t),this.setXYZ(e,ae.x,ae.y,ae.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ae.fromBufferAttribute(this,e),ae.applyNormalMatrix(t),this.setXYZ(e,ae.x,ae.y,ae.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ae.fromBufferAttribute(this,e),ae.transformDirection(t),this.setXYZ(e,ae.x,ae.y,ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=hi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ye(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=hi(e,this.array)),e}setX(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=hi(e,this.array)),e}setY(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=hi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=hi(e,this.array)),e}setW(t,e){return this.normalized&&(e=ye(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),n=ye(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),n=ye(n,this.array),s=ye(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ye(e,this.array),n=ye(n,this.array),s=ye(s,this.array),r=ye(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==la&&(t.usage=this.usage),t}}class Po extends ke{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Lo extends ke{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class xe extends ke{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ml=0;const Ue=new te,qs=new se,Wn=new D,Re=new Si,pi=new Si,le=new D;class De extends ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ml++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ao(t)?Lo:Po)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ue.makeRotationFromQuaternion(t),this.applyMatrix4(Ue),this}rotateX(t){return Ue.makeRotationX(t),this.applyMatrix4(Ue),this}rotateY(t){return Ue.makeRotationY(t),this.applyMatrix4(Ue),this}rotateZ(t){return Ue.makeRotationZ(t),this.applyMatrix4(Ue),this}translate(t,e,n){return Ue.makeTranslation(t,e,n),this.applyMatrix4(Ue),this}scale(t,e,n){return Ue.makeScale(t,e,n),this.applyMatrix4(Ue),this}lookAt(t){return qs.lookAt(t),qs.updateMatrix(),this.applyMatrix4(qs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wn).negate(),this.translate(Wn.x,Wn.y,Wn.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new xe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Re.setFromBufferAttribute(r),this.morphTargetsRelative?(le.addVectors(this.boundingBox.min,Re.min),this.boundingBox.expandByPoint(le),le.addVectors(this.boundingBox.max,Re.max),this.boundingBox.expandByPoint(le)):(this.boundingBox.expandByPoint(Re.min),this.boundingBox.expandByPoint(Re.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(Re.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];pi.setFromBufferAttribute(o),this.morphTargetsRelative?(le.addVectors(Re.min,pi.min),Re.expandByPoint(le),le.addVectors(Re.max,pi.max),Re.expandByPoint(le)):(Re.expandByPoint(pi.min),Re.expandByPoint(pi.max))}Re.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)le.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(le));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)le.fromBufferAttribute(o,l),c&&(Wn.fromBufferAttribute(t,l),le.add(Wn)),s=Math.max(s,n.distanceToSquared(le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ke(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let N=0;N<n.count;N++)o[N]=new D,c[N]=new D;const l=new D,h=new D,d=new D,f=new Gt,m=new Gt,g=new Gt,x=new D,p=new D;function u(N,S,_){l.fromBufferAttribute(n,N),h.fromBufferAttribute(n,S),d.fromBufferAttribute(n,_),f.fromBufferAttribute(r,N),m.fromBufferAttribute(r,S),g.fromBufferAttribute(r,_),h.sub(l),d.sub(l),m.sub(f),g.sub(f);const U=1/(m.x*g.y-g.x*m.y);isFinite(U)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(U),p.copy(d).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(U),o[N].add(x),o[S].add(x),o[_].add(x),c[N].add(p),c[S].add(p),c[_].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let N=0,S=T.length;N<S;++N){const _=T[N],U=_.start,G=_.count;for(let R=U,V=U+G;R<V;R+=3)u(t.getX(R+0),t.getX(R+1),t.getX(R+2))}const y=new D,E=new D,L=new D,b=new D;function w(N){L.fromBufferAttribute(s,N),b.copy(L);const S=o[N];y.copy(S),y.sub(L.multiplyScalar(L.dot(S))).normalize(),E.crossVectors(b,S);const U=E.dot(c[N])<0?-1:1;a.setXYZW(N,y.x,y.y,y.z,U)}for(let N=0,S=T.length;N<S;++N){const _=T[N],U=_.start,G=_.count;for(let R=U,V=U+G;R<V;R+=3)w(t.getX(R+0)),w(t.getX(R+1)),w(t.getX(R+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ke(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new D,r=new D,a=new D,o=new D,c=new D,l=new D,h=new D,d=new D;if(t)for(let f=0,m=t.count;f<m;f+=3){const g=t.getX(f+0),x=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,p),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=e.count;f<m;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)le.fromBufferAttribute(t,e),le.normalize(),t.setXYZ(e,le.x,le.y,le.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,d=o.normalized,f=new l.constructor(c.length*h);let m=0,g=0;for(let x=0,p=c.length;x<p;x++){o.isInterleavedBufferAttribute?m=c[x]*o.data.stride+o.offset:m=c[x]*h;for(let u=0;u<h;u++)f[g++]=l[m++]}return new ke(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new De,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const f=l[h],m=t(f,n);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,f=l.length;d<f;d++){const m=l[d];h.push(m.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let f=0,m=d.length;f<m;f++)h.push(d[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ea=new te,Sn=new gr,Bi=new yi,Ta=new D,Xn=new D,qn=new D,Yn=new D,Ys=new D,Gi=new D,ki=new Gt,Hi=new Gt,Vi=new Gt,Aa=new D,wa=new D,ba=new D,Wi=new D,Xi=new D;class qt extends se{constructor(t=new De,e=new _r){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Gi.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(Ys.fromBufferAttribute(d,t),a?Gi.addScaledVector(Ys,h):Gi.addScaledVector(Ys.sub(e),h))}e.add(Gi)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Bi.copy(n.boundingSphere),Bi.applyMatrix4(r),Sn.copy(t.ray).recast(t.near),!(Bi.containsPoint(Sn.origin)===!1&&(Sn.intersectSphere(Bi,Ta)===null||Sn.origin.distanceToSquared(Ta)>(t.far-t.near)**2))&&(Ea.copy(r).invert(),Sn.copy(t.ray).applyMatrix4(Ea),!(n.boundingBox!==null&&Sn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Sn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){const p=f[g],u=a[p.materialIndex],T=Math.max(p.start,m.start),y=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=T,L=y;E<L;E+=3){const b=o.getX(E),w=o.getX(E+1),N=o.getX(E+2);s=qi(this,u,t,n,l,h,d,b,w,N),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let p=g,u=x;p<u;p+=3){const T=o.getX(p),y=o.getX(p+1),E=o.getX(p+2);s=qi(this,a,t,n,l,h,d,T,y,E),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=f.length;g<x;g++){const p=f[g],u=a[p.materialIndex],T=Math.max(p.start,m.start),y=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let E=T,L=y;E<L;E+=3){const b=E,w=E+1,N=E+2;s=qi(this,u,t,n,l,h,d,b,w,N),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),x=Math.min(c.count,m.start+m.count);for(let p=g,u=x;p<u;p+=3){const T=p,y=p+1,E=p+2;s=qi(this,a,t,n,l,h,d,T,y,E),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function gl(i,t,e,n,s,r,a,o){let c;if(t.side===Se?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===pn,o),c===null)return null;Xi.copy(o),Xi.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Xi);return l<e.near||l>e.far?null:{distance:l,point:Xi.clone(),object:i}}function qi(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Xn),i.getVertexPosition(c,qn),i.getVertexPosition(l,Yn);const h=gl(i,t,e,n,Xn,qn,Yn,Wi);if(h){s&&(ki.fromBufferAttribute(s,o),Hi.fromBufferAttribute(s,c),Vi.fromBufferAttribute(s,l),h.uv=Ge.getInterpolation(Wi,Xn,qn,Yn,ki,Hi,Vi,new Gt)),r&&(ki.fromBufferAttribute(r,o),Hi.fromBufferAttribute(r,c),Vi.fromBufferAttribute(r,l),h.uv1=Ge.getInterpolation(Wi,Xn,qn,Yn,ki,Hi,Vi,new Gt)),a&&(Aa.fromBufferAttribute(a,o),wa.fromBufferAttribute(a,c),ba.fromBufferAttribute(a,l),h.normal=Ge.getInterpolation(Wi,Xn,qn,Yn,Aa,wa,ba,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new D,materialIndex:0};Ge.getNormal(Xn,qn,Yn,d.normal),h.face=d}return h}class Te extends De{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let f=0,m=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new xe(l,3)),this.setAttribute("normal",new xe(h,3)),this.setAttribute("uv",new xe(d,2));function g(x,p,u,T,y,E,L,b,w,N,S){const _=E/w,U=L/N,G=E/2,R=L/2,V=b/2,W=w+1,j=N+1;let J=0,k=0;const tt=new D;for(let Q=0;Q<j;Q++){const gt=Q*U-R;for(let Ut=0;Ut<W;Ut++){const Yt=Ut*_-G;tt[x]=Yt*T,tt[p]=gt*y,tt[u]=V,l.push(tt.x,tt.y,tt.z),tt[x]=0,tt[p]=0,tt[u]=b>0?1:-1,h.push(tt.x,tt.y,tt.z),d.push(Ut/w),d.push(1-Q/N),J+=1}}for(let Q=0;Q<N;Q++)for(let gt=0;gt<w;gt++){const Ut=f+gt+W*Q,Yt=f+gt+W*(Q+1),H=f+(gt+1)+W*(Q+1),et=f+(gt+1)+W*Q;c.push(Ut,Yt,et),c.push(Yt,H,et),k+=6}o.addGroup(m,k,S),m+=k,f+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Te(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function si(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Me(i){const t={};for(let e=0;e<i.length;e++){const n=si(i[e]);for(const s in n)t[s]=n[s]}return t}function _l(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Do(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const xl={clone:si,merge:Me};var vl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ml=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class gn extends In{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vl,this.fragmentShader=Ml,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=si(t.uniforms),this.uniformsGroups=_l(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Io extends se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=en}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ln=new D,Ra=new Gt,Ca=new Gt;class Pe extends Io{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=hs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(is*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return hs*2*Math.atan(Math.tan(is*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ln.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ln.x,ln.y).multiplyScalar(-t/ln.z),ln.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ln.x,ln.y).multiplyScalar(-t/ln.z)}getViewSize(t,e){return this.getViewBounds(t,Ra,Ca),e.subVectors(Ca,Ra)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(is*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Kn=-90,$n=1;class Sl extends se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Pe(Kn,$n,t,e);s.layers=this.layers,this.add(s);const r=new Pe(Kn,$n,t,e);r.layers=this.layers,this.add(r);const a=new Pe(Kn,$n,t,e);a.layers=this.layers,this.add(a);const o=new Pe(Kn,$n,t,e);o.layers=this.layers,this.add(o);const c=new Pe(Kn,$n,t,e);c.layers=this.layers,this.add(c);const l=new Pe(Kn,$n,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===en)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ls)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,f,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Uo extends Ae{constructor(t,e,n,s,r,a,o,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:ei,super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class yl extends Dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Uo(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Be}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Te(5,5,5),r=new gn({name:"CubemapFromEquirect",uniforms:si(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Se,blending:fn});r.uniforms.tEquirect.value=e;const a=new qt(s,r),o=e.minFilter;return e.minFilter===Pn&&(e.minFilter=Be),new Sl(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Ks=new D,El=new D,Tl=new bt;class An{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ks.subVectors(n,e).cross(El.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ks),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Tl.getNormalMatrix(t),s=this.coplanarPoint(Ks).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yn=new yi,Yi=new D;class xr{constructor(t=new An,e=new An,n=new An,s=new An,r=new An,a=new An){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=en){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],d=s[6],f=s[7],m=s[8],g=s[9],x=s[10],p=s[11],u=s[12],T=s[13],y=s[14],E=s[15];if(n[0].setComponents(c-r,f-l,p-m,E-u).normalize(),n[1].setComponents(c+r,f+l,p+m,E+u).normalize(),n[2].setComponents(c+a,f+h,p+g,E+T).normalize(),n[3].setComponents(c-a,f-h,p-g,E-T).normalize(),n[4].setComponents(c-o,f-d,p-x,E-y).normalize(),e===en)n[5].setComponents(c+o,f+d,p+x,E+y).normalize();else if(e===ls)n[5].setComponents(o,d,x,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yn)}intersectsSprite(t){return yn.center.set(0,0,0),yn.radius=.7071067811865476,yn.applyMatrix4(t.matrixWorld),this.intersectsSphere(yn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Yi.x=s.normal.x>0?t.max.x:t.min.x,Yi.y=s.normal.y>0?t.max.y:t.min.y,Yi.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Yi)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function No(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Al(i){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c._updateRange,f=c.updateRanges;if(i.bindBuffer(l,o),d.count===-1&&f.length===0&&i.bufferSubData(l,0,h),f.length!==0){for(let m=0,g=f.length;m<g;m++){const x=f[m];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}d.count!==-1&&(i.bufferSubData(l,d.offset*h.BYTES_PER_ELEMENT,h,d.offset,d.count),d.count=-1),c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class Ei extends De{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=t/o,f=e/c,m=[],g=[],x=[],p=[];for(let u=0;u<h;u++){const T=u*f-a;for(let y=0;y<l;y++){const E=y*d-r;g.push(E,-T,0),x.push(0,0,1),p.push(y/o),p.push(1-u/c)}}for(let u=0;u<c;u++)for(let T=0;T<o;T++){const y=T+l*u,E=T+l*(u+1),L=T+1+l*(u+1),b=T+1+l*u;m.push(y,E,b),m.push(E,L,b)}this.setIndex(m),this.setAttribute("position",new xe(g,3)),this.setAttribute("normal",new xe(x,3)),this.setAttribute("uv",new xe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ei(t.width,t.height,t.widthSegments,t.heightSegments)}}var wl=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bl=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Rl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Cl=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pl=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ll=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Dl=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Il=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ul=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Nl=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Fl=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ol=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zl=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bl=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gl=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,kl=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Hl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wl=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xl=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ql=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yl=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Kl=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,$l=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zl=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jl=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Jl=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ql=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,th=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,eh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nh="gl_FragColor = linearToOutputTexel( gl_FragColor );",ih=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,sh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,rh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ah=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,oh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ch=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,lh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,uh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,dh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ph=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,mh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gh=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_h=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,xh=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mh=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yh=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Eh=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Th=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ah=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,wh=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Rh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ch=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ph=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lh=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Dh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ih=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Uh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Nh=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Oh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bh=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gh=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,kh=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Hh=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Vh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wh=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Xh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kh=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$h=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zh=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jh=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Qh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,tu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,eu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,su=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ru=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,au=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ou=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,cu=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,hu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,uu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fu=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,du=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pu=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,mu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_u=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,vu=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Mu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Su=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Eu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Tu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Au=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ru=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Du=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Iu=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Uu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Nu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ou=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zu=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Gu=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ku=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hu=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vu=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Wu=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xu=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Yu=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ku=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$u=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Zu=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ju=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ju=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qu=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,tf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ef=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,wt={alphahash_fragment:wl,alphahash_pars_fragment:bl,alphamap_fragment:Rl,alphamap_pars_fragment:Cl,alphatest_fragment:Pl,alphatest_pars_fragment:Ll,aomap_fragment:Dl,aomap_pars_fragment:Il,batching_pars_vertex:Ul,batching_vertex:Nl,begin_vertex:Fl,beginnormal_vertex:Ol,bsdfs:zl,iridescence_fragment:Bl,bumpmap_pars_fragment:Gl,clipping_planes_fragment:kl,clipping_planes_pars_fragment:Hl,clipping_planes_pars_vertex:Vl,clipping_planes_vertex:Wl,color_fragment:Xl,color_pars_fragment:ql,color_pars_vertex:Yl,color_vertex:Kl,common:$l,cube_uv_reflection_fragment:Zl,defaultnormal_vertex:jl,displacementmap_pars_vertex:Jl,displacementmap_vertex:Ql,emissivemap_fragment:th,emissivemap_pars_fragment:eh,colorspace_fragment:nh,colorspace_pars_fragment:ih,envmap_fragment:sh,envmap_common_pars_fragment:rh,envmap_pars_fragment:ah,envmap_pars_vertex:oh,envmap_physical_pars_fragment:xh,envmap_vertex:ch,fog_vertex:lh,fog_pars_vertex:hh,fog_fragment:uh,fog_pars_fragment:fh,gradientmap_pars_fragment:dh,lightmap_pars_fragment:ph,lights_lambert_fragment:mh,lights_lambert_pars_fragment:gh,lights_pars_begin:_h,lights_toon_fragment:vh,lights_toon_pars_fragment:Mh,lights_phong_fragment:Sh,lights_phong_pars_fragment:yh,lights_physical_fragment:Eh,lights_physical_pars_fragment:Th,lights_fragment_begin:Ah,lights_fragment_maps:wh,lights_fragment_end:bh,logdepthbuf_fragment:Rh,logdepthbuf_pars_fragment:Ch,logdepthbuf_pars_vertex:Ph,logdepthbuf_vertex:Lh,map_fragment:Dh,map_pars_fragment:Ih,map_particle_fragment:Uh,map_particle_pars_fragment:Nh,metalnessmap_fragment:Fh,metalnessmap_pars_fragment:Oh,morphinstance_vertex:zh,morphcolor_vertex:Bh,morphnormal_vertex:Gh,morphtarget_pars_vertex:kh,morphtarget_vertex:Hh,normal_fragment_begin:Vh,normal_fragment_maps:Wh,normal_pars_fragment:Xh,normal_pars_vertex:qh,normal_vertex:Yh,normalmap_pars_fragment:Kh,clearcoat_normal_fragment_begin:$h,clearcoat_normal_fragment_maps:Zh,clearcoat_pars_fragment:jh,iridescence_pars_fragment:Jh,opaque_fragment:Qh,packing:tu,premultiplied_alpha_fragment:eu,project_vertex:nu,dithering_fragment:iu,dithering_pars_fragment:su,roughnessmap_fragment:ru,roughnessmap_pars_fragment:au,shadowmap_pars_fragment:ou,shadowmap_pars_vertex:cu,shadowmap_vertex:lu,shadowmask_pars_fragment:hu,skinbase_vertex:uu,skinning_pars_vertex:fu,skinning_vertex:du,skinnormal_vertex:pu,specularmap_fragment:mu,specularmap_pars_fragment:gu,tonemapping_fragment:_u,tonemapping_pars_fragment:xu,transmission_fragment:vu,transmission_pars_fragment:Mu,uv_pars_fragment:Su,uv_pars_vertex:yu,uv_vertex:Eu,worldpos_vertex:Tu,background_vert:Au,background_frag:wu,backgroundCube_vert:bu,backgroundCube_frag:Ru,cube_vert:Cu,cube_frag:Pu,depth_vert:Lu,depth_frag:Du,distanceRGBA_vert:Iu,distanceRGBA_frag:Uu,equirect_vert:Nu,equirect_frag:Fu,linedashed_vert:Ou,linedashed_frag:zu,meshbasic_vert:Bu,meshbasic_frag:Gu,meshlambert_vert:ku,meshlambert_frag:Hu,meshmatcap_vert:Vu,meshmatcap_frag:Wu,meshnormal_vert:Xu,meshnormal_frag:qu,meshphong_vert:Yu,meshphong_frag:Ku,meshphysical_vert:$u,meshphysical_frag:Zu,meshtoon_vert:ju,meshtoon_frag:Ju,points_vert:Qu,points_frag:tf,shadow_vert:ef,shadow_frag:nf,sprite_vert:sf,sprite_frag:rf},it={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new bt},alphaMap:{value:null},alphaMapTransform:{value:new bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new bt}},envmap:{envMap:{value:null},envMapRotation:{value:new bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new bt},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new bt},alphaTest:{value:0},uvTransform:{value:new bt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new bt},alphaMap:{value:null},alphaMapTransform:{value:new bt},alphaTest:{value:0}}},We={basic:{uniforms:Me([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.fog]),vertexShader:wt.meshbasic_vert,fragmentShader:wt.meshbasic_frag},lambert:{uniforms:Me([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new It(0)}}]),vertexShader:wt.meshlambert_vert,fragmentShader:wt.meshlambert_frag},phong:{uniforms:Me([it.common,it.specularmap,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.fog,it.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:wt.meshphong_vert,fragmentShader:wt.meshphong_frag},standard:{uniforms:Me([it.common,it.envmap,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.roughnessmap,it.metalnessmap,it.fog,it.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:wt.meshphysical_vert,fragmentShader:wt.meshphysical_frag},toon:{uniforms:Me([it.common,it.aomap,it.lightmap,it.emissivemap,it.bumpmap,it.normalmap,it.displacementmap,it.gradientmap,it.fog,it.lights,{emissive:{value:new It(0)}}]),vertexShader:wt.meshtoon_vert,fragmentShader:wt.meshtoon_frag},matcap:{uniforms:Me([it.common,it.bumpmap,it.normalmap,it.displacementmap,it.fog,{matcap:{value:null}}]),vertexShader:wt.meshmatcap_vert,fragmentShader:wt.meshmatcap_frag},points:{uniforms:Me([it.points,it.fog]),vertexShader:wt.points_vert,fragmentShader:wt.points_frag},dashed:{uniforms:Me([it.common,it.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:wt.linedashed_vert,fragmentShader:wt.linedashed_frag},depth:{uniforms:Me([it.common,it.displacementmap]),vertexShader:wt.depth_vert,fragmentShader:wt.depth_frag},normal:{uniforms:Me([it.common,it.bumpmap,it.normalmap,it.displacementmap,{opacity:{value:1}}]),vertexShader:wt.meshnormal_vert,fragmentShader:wt.meshnormal_frag},sprite:{uniforms:Me([it.sprite,it.fog]),vertexShader:wt.sprite_vert,fragmentShader:wt.sprite_frag},background:{uniforms:{uvTransform:{value:new bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:wt.background_vert,fragmentShader:wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new bt}},vertexShader:wt.backgroundCube_vert,fragmentShader:wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:wt.cube_vert,fragmentShader:wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:wt.equirect_vert,fragmentShader:wt.equirect_frag},distanceRGBA:{uniforms:Me([it.common,it.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:wt.distanceRGBA_vert,fragmentShader:wt.distanceRGBA_frag},shadow:{uniforms:Me([it.lights,it.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:wt.shadow_vert,fragmentShader:wt.shadow_frag}};We.physical={uniforms:Me([We.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new bt},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new bt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new bt},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new bt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new bt},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new bt}}]),vertexShader:wt.meshphysical_vert,fragmentShader:wt.meshphysical_frag};const Ki={r:0,b:0,g:0},En=new qe,af=new te;function of(i,t,e,n,s,r,a){const o=new It(0);let c=r===!0?0:1,l,h,d=null,f=0,m=null;function g(T){let y=T.isScene===!0?T.background:null;return y&&y.isTexture&&(y=(T.backgroundBlurriness>0?e:t).get(y)),y}function x(T){let y=!1;const E=g(T);E===null?u(o,c):E&&E.isColor&&(u(E,1),y=!0);const L=i.xr.getEnvironmentBlendMode();L==="additive"?n.buffers.color.setClear(0,0,0,1,a):L==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil)}function p(T,y){const E=g(y);E&&(E.isCubeTexture||E.mapping===gs)?(h===void 0&&(h=new qt(new Te(1,1,1),new gn({name:"BackgroundCubeMaterial",uniforms:si(We.backgroundCube.uniforms),vertexShader:We.backgroundCube.vertexShader,fragmentShader:We.backgroundCube.fragmentShader,side:Se,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(L,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),En.copy(y.backgroundRotation),En.x*=-1,En.y*=-1,En.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(En.y*=-1,En.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(af.makeRotationFromEuler(En)),h.material.toneMapped=Xt.getTransfer(E.colorSpace)!==jt,(d!==E||f!==E.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=E,f=E.version,m=i.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new qt(new Ei(2,2),new gn({name:"BackgroundMaterial",uniforms:si(We.background.uniforms),vertexShader:We.background.vertexShader,fragmentShader:We.background.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Xt.getTransfer(E.colorSpace)!==jt,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||f!==E.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,d=E,f=E.version,m=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function u(T,y){T.getRGB(Ki,Do(i)),n.buffers.color.setClear(Ki.r,Ki.g,Ki.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(T,y=1){o.set(T),c=y,u(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,u(o,c)},render:x,addToRenderList:p}}function cf(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,a=!1;function o(_,U,G,R,V){let W=!1;const j=d(R,G,U);r!==j&&(r=j,l(r.object)),W=m(_,R,G,V),W&&g(_,R,G,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,E(_,U,G,R),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function c(){return i.createVertexArray()}function l(_){return i.bindVertexArray(_)}function h(_){return i.deleteVertexArray(_)}function d(_,U,G){const R=G.wireframe===!0;let V=n[_.id];V===void 0&&(V={},n[_.id]=V);let W=V[U.id];W===void 0&&(W={},V[U.id]=W);let j=W[R];return j===void 0&&(j=f(c()),W[R]=j),j}function f(_){const U=[],G=[],R=[];for(let V=0;V<e;V++)U[V]=0,G[V]=0,R[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:G,attributeDivisors:R,object:_,attributes:{},index:null}}function m(_,U,G,R){const V=r.attributes,W=U.attributes;let j=0;const J=G.getAttributes();for(const k in J)if(J[k].location>=0){const Q=V[k];let gt=W[k];if(gt===void 0&&(k==="instanceMatrix"&&_.instanceMatrix&&(gt=_.instanceMatrix),k==="instanceColor"&&_.instanceColor&&(gt=_.instanceColor)),Q===void 0||Q.attribute!==gt||gt&&Q.data!==gt.data)return!0;j++}return r.attributesNum!==j||r.index!==R}function g(_,U,G,R){const V={},W=U.attributes;let j=0;const J=G.getAttributes();for(const k in J)if(J[k].location>=0){let Q=W[k];Q===void 0&&(k==="instanceMatrix"&&_.instanceMatrix&&(Q=_.instanceMatrix),k==="instanceColor"&&_.instanceColor&&(Q=_.instanceColor));const gt={};gt.attribute=Q,Q&&Q.data&&(gt.data=Q.data),V[k]=gt,j++}r.attributes=V,r.attributesNum=j,r.index=R}function x(){const _=r.newAttributes;for(let U=0,G=_.length;U<G;U++)_[U]=0}function p(_){u(_,0)}function u(_,U){const G=r.newAttributes,R=r.enabledAttributes,V=r.attributeDivisors;G[_]=1,R[_]===0&&(i.enableVertexAttribArray(_),R[_]=1),V[_]!==U&&(i.vertexAttribDivisor(_,U),V[_]=U)}function T(){const _=r.newAttributes,U=r.enabledAttributes;for(let G=0,R=U.length;G<R;G++)U[G]!==_[G]&&(i.disableVertexAttribArray(G),U[G]=0)}function y(_,U,G,R,V,W,j){j===!0?i.vertexAttribIPointer(_,U,G,V,W):i.vertexAttribPointer(_,U,G,R,V,W)}function E(_,U,G,R){x();const V=R.attributes,W=G.getAttributes(),j=U.defaultAttributeValues;for(const J in W){const k=W[J];if(k.location>=0){let tt=V[J];if(tt===void 0&&(J==="instanceMatrix"&&_.instanceMatrix&&(tt=_.instanceMatrix),J==="instanceColor"&&_.instanceColor&&(tt=_.instanceColor)),tt!==void 0){const Q=tt.normalized,gt=tt.itemSize,Ut=t.get(tt);if(Ut===void 0)continue;const Yt=Ut.buffer,H=Ut.type,et=Ut.bytesPerElement,ft=H===i.INT||H===i.UNSIGNED_INT||tt.gpuType===_o;if(tt.isInterleavedBufferAttribute){const st=tt.data,Nt=st.stride,Ft=tt.offset;if(st.isInstancedInterleavedBuffer){for(let I=0;I<k.locationSize;I++)u(k.location+I,st.meshPerAttribute);_.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let I=0;I<k.locationSize;I++)p(k.location+I);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let I=0;I<k.locationSize;I++)y(k.location+I,gt/k.locationSize,H,Q,Nt*et,(Ft+gt/k.locationSize*I)*et,ft)}else{if(tt.isInstancedBufferAttribute){for(let st=0;st<k.locationSize;st++)u(k.location+st,tt.meshPerAttribute);_.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let st=0;st<k.locationSize;st++)p(k.location+st);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let st=0;st<k.locationSize;st++)y(k.location+st,gt/k.locationSize,H,Q,gt*et,gt/k.locationSize*st*et,ft)}}else if(j!==void 0){const Q=j[J];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(k.location,Q);break;case 3:i.vertexAttrib3fv(k.location,Q);break;case 4:i.vertexAttrib4fv(k.location,Q);break;default:i.vertexAttrib1fv(k.location,Q)}}}}T()}function L(){N();for(const _ in n){const U=n[_];for(const G in U){const R=U[G];for(const V in R)h(R[V].object),delete R[V];delete U[G]}delete n[_]}}function b(_){if(n[_.id]===void 0)return;const U=n[_.id];for(const G in U){const R=U[G];for(const V in R)h(R[V].object),delete R[V];delete U[G]}delete n[_.id]}function w(_){for(const U in n){const G=n[U];if(G[_.id]===void 0)continue;const R=G[_.id];for(const V in R)h(R[V].object),delete R[V];delete G[_.id]}}function N(){S(),a=!0,r!==s&&(r=s,l(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:S,dispose:L,releaseStatesOfGeometry:b,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:p,disableUnusedAttributes:T}}function lf(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function a(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),e.update(h,n,d))}function o(l,h,d){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<d;m++)this.render(l[m],h[m]);else{f.multiDrawArraysWEBGL(n,l,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=h[g];e.update(m,n,1)}}function c(l,h,d,f){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],h[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x];for(let x=0;x<f.length;x++)e.update(g,n,f[x])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function hf(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(b){return!(b!==Xe&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const w=b===_s&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==mn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==un&&!w)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),x=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),u=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,L=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:x,maxAttributes:p,maxVertexUniforms:u,maxVaryings:T,maxFragmentUniforms:y,vertexTextures:E,maxSamples:L}}function uf(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new An,o=new bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||n!==0||s;return s=f,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=h(d,f,0)},this.setState=function(d,f,m){const g=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,u=i.get(d);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{const T=r?0:n,y=T*4;let E=u.clippingState||null;c.value=E,E=h(g,f,y,m);for(let L=0;L!==y;++L)E[L]=e[L];u.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,f,m,g){const x=d!==null?d.length:0;let p=null;if(x!==0){if(p=c.value,g!==!0||p===null){const u=m+x*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(p===null||p.length<u)&&(p=new Float32Array(u));for(let y=0,E=m;y!==x;++y,E+=4)a.copy(d[y]).applyMatrix4(T,o),a.normal.toArray(p,E),p[E+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}function ff(i){let t=new WeakMap;function e(a,o){return o===cr?a.mapping=ei:o===lr&&(a.mapping=ni),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===cr||o===lr)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new yl(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Fo extends Io{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const jn=4,Pa=[.125,.215,.35,.446,.526,.582],Rn=20,$s=new Fo,La=new It;let Zs=null,js=0,Js=0,Qs=!1;const wn=(1+Math.sqrt(5))/2,Zn=1/wn,Da=[new D(-wn,Zn,0),new D(wn,Zn,0),new D(-Zn,0,wn),new D(Zn,0,wn),new D(0,wn,-Zn),new D(0,wn,Zn),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class Ia{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Zs=this._renderer.getRenderTarget(),js=this._renderer.getActiveCubeFace(),Js=this._renderer.getActiveMipmapLevel(),Qs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Na(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Zs,js,Js),this._renderer.xr.enabled=Qs,t.scissorTest=!1,$i(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ei||t.mapping===ni?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Zs=this._renderer.getRenderTarget(),js=this._renderer.getActiveCubeFace(),Js=this._renderer.getActiveMipmapLevel(),Qs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Be,minFilter:Be,generateMipmaps:!1,type:_s,format:Xe,colorSpace:_n,depthBuffer:!1},s=Ua(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ua(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=df(r)),this._blurMaterial=pf(r,t,e)}return s}_compileMaterial(t){const e=new qt(this._lodPlanes[0],t);this._renderer.compile(e,$s)}_sceneToCubeUV(t,e,n,s){const o=new Pe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(La),h.toneMapping=dn,h.autoClear=!1;const m=new _r({name:"PMREM.Background",side:Se,depthWrite:!1,depthTest:!1}),g=new qt(new Te,m);let x=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,x=!0):(m.color.copy(La),x=!0);for(let u=0;u<6;u++){const T=u%3;T===0?(o.up.set(0,c[u],0),o.lookAt(l[u],0,0)):T===1?(o.up.set(0,0,c[u]),o.lookAt(0,l[u],0)):(o.up.set(0,c[u],0),o.lookAt(0,0,l[u]));const y=this._cubeSize;$i(s,T*y,u>2?y:0,y,y),h.setRenderTarget(s),x&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ei||t.mapping===ni;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fa()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Na());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new qt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;$i(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,$s)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Da[(s-r-1)%Da.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new qt(this._lodPlanes[s],l),f=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Rn-1),x=r/g,p=isFinite(r)?1+Math.floor(h*x):Rn;p>Rn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Rn}`);const u=[];let T=0;for(let w=0;w<Rn;++w){const N=w/x,S=Math.exp(-N*N/2);u.push(S),w===0?T+=S:w<p&&(T+=2*S)}for(let w=0;w<u.length;w++)u[w]=u[w]/T;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=u,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const E=this._sizeLods[s],L=3*E*(s>y-jn?s-y+jn:0),b=4*(this._cubeSize-E);$i(e,L,b,3*E,2*E),c.setRenderTarget(e),c.render(d,$s)}}function df(i){const t=[],e=[],n=[];let s=i;const r=i-jn+1+Pa.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-jn?c=Pa[a-i+jn-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,f=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,x=3,p=2,u=1,T=new Float32Array(x*g*m),y=new Float32Array(p*g*m),E=new Float32Array(u*g*m);for(let b=0;b<m;b++){const w=b%3*2/3-1,N=b>2?0:-1,S=[w,N,0,w+2/3,N,0,w+2/3,N+1,0,w,N,0,w+2/3,N+1,0,w,N+1,0];T.set(S,x*g*b),y.set(f,p*g*b);const _=[b,b,b,b,b,b];E.set(_,u*g*b)}const L=new De;L.setAttribute("position",new ke(T,x)),L.setAttribute("uv",new ke(y,p)),L.setAttribute("faceIndex",new ke(E,u)),t.push(L),s>jn&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ua(i,t,e){const n=new Dn(i,t,e);return n.texture.mapping=gs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function $i(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function pf(i,t,e){const n=new Float32Array(Rn),s=new D(0,1,0);return new gn({name:"SphericalGaussianBlur",defines:{n:Rn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:vr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:fn,depthTest:!1,depthWrite:!1})}function Na(){return new gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:fn,depthTest:!1,depthWrite:!1})}function Fa(){return new gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:fn,depthTest:!1,depthWrite:!1})}function vr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function mf(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===cr||c===lr,h=c===ei||c===ni;if(l||h){let d=t.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Ia(i)),d=l?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return l&&m&&m.height>0||h&&m&&s(m)?(e===null&&(e=new Ia(i)),d=l?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function gf(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function _f(i,t,e,n){const s={},r=new WeakMap;function a(d){const f=d.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const x=f.morphAttributes[g];for(let p=0,u=x.length;p<u;p++)t.remove(x[p])}f.removeEventListener("dispose",a),delete s[f.id];const m=r.get(f);m&&(t.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function c(d){const f=d.attributes;for(const g in f)t.update(f[g],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const x=m[g];for(let p=0,u=x.length;p<u;p++)t.update(x[p],i.ARRAY_BUFFER)}}function l(d){const f=[],m=d.index,g=d.attributes.position;let x=0;if(m!==null){const T=m.array;x=m.version;for(let y=0,E=T.length;y<E;y+=3){const L=T[y+0],b=T[y+1],w=T[y+2];f.push(L,b,b,w,w,L)}}else if(g!==void 0){const T=g.array;x=g.version;for(let y=0,E=T.length/3-1;y<E;y+=3){const L=y+0,b=y+1,w=y+2;f.push(L,b,b,w,w,L)}}else return;const p=new(Ao(f)?Lo:Po)(f,1);p.version=x;const u=r.get(d);u&&t.remove(u),r.set(d,p)}function h(d){const f=r.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function xf(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,m){i.drawElements(n,m,r,f*a),e.update(m,n,1)}function l(f,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,f*a,g),e.update(m,n,g))}function h(f,m,g){if(g===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let p=0;p<g;p++)this.render(f[p]/a,m[p]);else{x.multiDrawElementsWEBGL(n,m,0,r,f,0,g);let p=0;for(let u=0;u<g;u++)p+=m[u];e.update(p,n,1)}}function d(f,m,g,x){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let u=0;u<f.length;u++)l(f[u]/a,m[u],x[u]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,f,0,x,0,g);let u=0;for(let T=0;T<g;T++)u+=m[T];for(let T=0;T<x.length;T++)e.update(u,n,x[T])}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function vf(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Mf(i,t,e){const n=new WeakMap,s=new he;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let _=function(){N.dispose(),n.delete(o),o.removeEventListener("dispose",_)};var m=_;f!==void 0&&f.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let E=0;g===!0&&(E=1),x===!0&&(E=2),p===!0&&(E=3);let L=o.attributes.position.count*E,b=1;L>t.maxTextureSize&&(b=Math.ceil(L/t.maxTextureSize),L=t.maxTextureSize);const w=new Float32Array(L*b*4*d),N=new bo(w,L,b,d);N.type=un,N.needsUpdate=!0;const S=E*4;for(let U=0;U<d;U++){const G=u[U],R=T[U],V=y[U],W=L*b*4*U;for(let j=0;j<G.count;j++){const J=j*S;g===!0&&(s.fromBufferAttribute(G,j),w[W+J+0]=s.x,w[W+J+1]=s.y,w[W+J+2]=s.z,w[W+J+3]=0),x===!0&&(s.fromBufferAttribute(R,j),w[W+J+4]=s.x,w[W+J+5]=s.y,w[W+J+6]=s.z,w[W+J+7]=0),p===!0&&(s.fromBufferAttribute(V,j),w[W+J+8]=s.x,w[W+J+9]=s.y,w[W+J+10]=s.z,w[W+J+11]=V.itemSize===4?s.w:1)}}f={count:d,texture:N,size:new Gt(L,b)},n.set(o,f),o.addEventListener("dispose",_)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const x=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Sf(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(s.get(d)!==l&&(t.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return d}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class Oo extends Ae{constructor(t,e,n,s,r,a,o,c,l,h){if(h=h!==void 0?h:Qn,h!==Qn&&h!==_i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Qn&&(n=ii),n===void 0&&h===_i&&(n=xi),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ne,this.minFilter=c!==void 0?c:Ne,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const zo=new Ae,Bo=new Oo(1,1);Bo.compareFunction=To;const Go=new bo,ko=new al,Ho=new Uo,Oa=[],za=[],Ba=new Float32Array(16),Ga=new Float32Array(9),ka=new Float32Array(4);function oi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Oa[s];if(r===void 0&&(r=new Float32Array(s),Oa[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function oe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function vs(i,t){let e=za[t];e===void 0&&(e=new Int32Array(t),za[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function yf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Ef(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2fv(this.addr,t),ce(e,t)}}function Tf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(oe(e,t))return;i.uniform3fv(this.addr,t),ce(e,t)}}function Af(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4fv(this.addr,t),ce(e,t)}}function wf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ce(e,t)}else{if(oe(e,n))return;ka.set(n),i.uniformMatrix2fv(this.addr,!1,ka),ce(e,n)}}function bf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ce(e,t)}else{if(oe(e,n))return;Ga.set(n),i.uniformMatrix3fv(this.addr,!1,Ga),ce(e,n)}}function Rf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(oe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ce(e,t)}else{if(oe(e,n))return;Ba.set(n),i.uniformMatrix4fv(this.addr,!1,Ba),ce(e,n)}}function Cf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Pf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2iv(this.addr,t),ce(e,t)}}function Lf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(oe(e,t))return;i.uniform3iv(this.addr,t),ce(e,t)}}function Df(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4iv(this.addr,t),ce(e,t)}}function If(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Uf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(oe(e,t))return;i.uniform2uiv(this.addr,t),ce(e,t)}}function Nf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(oe(e,t))return;i.uniform3uiv(this.addr,t),ce(e,t)}}function Ff(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(oe(e,t))return;i.uniform4uiv(this.addr,t),ce(e,t)}}function Of(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Bo:zo;e.setTexture2D(t||r,s)}function zf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ko,s)}function Bf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ho,s)}function Gf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Go,s)}function kf(i){switch(i){case 5126:return yf;case 35664:return Ef;case 35665:return Tf;case 35666:return Af;case 35674:return wf;case 35675:return bf;case 35676:return Rf;case 5124:case 35670:return Cf;case 35667:case 35671:return Pf;case 35668:case 35672:return Lf;case 35669:case 35673:return Df;case 5125:return If;case 36294:return Uf;case 36295:return Nf;case 36296:return Ff;case 35678:case 36198:case 36298:case 36306:case 35682:return Of;case 35679:case 36299:case 36307:return zf;case 35680:case 36300:case 36308:case 36293:return Bf;case 36289:case 36303:case 36311:case 36292:return Gf}}function Hf(i,t){i.uniform1fv(this.addr,t)}function Vf(i,t){const e=oi(t,this.size,2);i.uniform2fv(this.addr,e)}function Wf(i,t){const e=oi(t,this.size,3);i.uniform3fv(this.addr,e)}function Xf(i,t){const e=oi(t,this.size,4);i.uniform4fv(this.addr,e)}function qf(i,t){const e=oi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Yf(i,t){const e=oi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Kf(i,t){const e=oi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function $f(i,t){i.uniform1iv(this.addr,t)}function Zf(i,t){i.uniform2iv(this.addr,t)}function jf(i,t){i.uniform3iv(this.addr,t)}function Jf(i,t){i.uniform4iv(this.addr,t)}function Qf(i,t){i.uniform1uiv(this.addr,t)}function td(i,t){i.uniform2uiv(this.addr,t)}function ed(i,t){i.uniform3uiv(this.addr,t)}function nd(i,t){i.uniform4uiv(this.addr,t)}function id(i,t,e){const n=this.cache,s=t.length,r=vs(e,s);oe(n,r)||(i.uniform1iv(this.addr,r),ce(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||zo,r[a])}function sd(i,t,e){const n=this.cache,s=t.length,r=vs(e,s);oe(n,r)||(i.uniform1iv(this.addr,r),ce(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||ko,r[a])}function rd(i,t,e){const n=this.cache,s=t.length,r=vs(e,s);oe(n,r)||(i.uniform1iv(this.addr,r),ce(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Ho,r[a])}function ad(i,t,e){const n=this.cache,s=t.length,r=vs(e,s);oe(n,r)||(i.uniform1iv(this.addr,r),ce(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Go,r[a])}function od(i){switch(i){case 5126:return Hf;case 35664:return Vf;case 35665:return Wf;case 35666:return Xf;case 35674:return qf;case 35675:return Yf;case 35676:return Kf;case 5124:case 35670:return $f;case 35667:case 35671:return Zf;case 35668:case 35672:return jf;case 35669:case 35673:return Jf;case 5125:return Qf;case 36294:return td;case 36295:return ed;case 36296:return nd;case 35678:case 36198:case 36298:case 36306:case 35682:return id;case 35679:case 36299:case 36307:return sd;case 35680:case 36300:case 36308:case 36293:return rd;case 36289:case 36303:case 36311:case 36292:return ad}}class cd{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=kf(e.type)}}class ld{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=od(e.type)}}class hd{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const tr=/(\w+)(\])?(\[|\.)?/g;function Ha(i,t){i.seq.push(t),i.map[t.id]=t}function ud(i,t,e){const n=i.name,s=n.length;for(tr.lastIndex=0;;){const r=tr.exec(n),a=tr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Ha(e,l===void 0?new cd(o,i,t):new ld(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new hd(o),Ha(e,d)),e=d}}}class ss{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);ud(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Va(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const fd=37297;let dd=0;function pd(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function md(i){const t=Xt.getPrimaries(Xt.workingColorSpace),e=Xt.getPrimaries(i);let n;switch(t===e?n="":t===cs&&e===os?n="LinearDisplayP3ToLinearSRGB":t===os&&e===cs&&(n="LinearSRGBToLinearDisplayP3"),i){case _n:case xs:return[n,"LinearTransferOETF"];case Ve:case mr:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Wa(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+pd(i.getShaderSource(t),a)}else return s}function gd(i,t){const e=md(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function _d(i,t){let e;switch(t){case Ac:e="Linear";break;case wc:e="Reinhard";break;case bc:e="OptimizedCineon";break;case po:e="ACESFilmic";break;case Cc:e="AgX";break;case Pc:e="Neutral";break;case Rc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function xd(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gi).join(`
`)}function vd(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Md(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function gi(i){return i!==""}function Xa(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function qa(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Sd=/^[ \t]*#include +<([\w\d./]+)>/gm;function fr(i){return i.replace(Sd,Ed)}const yd=new Map;function Ed(i,t){let e=wt[t];if(e===void 0){const n=yd.get(t);if(n!==void 0)e=wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return fr(e)}const Td=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ya(i){return i.replace(Td,Ad)}function Ad(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ka(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function wd(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ho?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===uo?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Qe&&(t="SHADOWMAP_TYPE_VSM"),t}function bd(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ei:case ni:t="ENVMAP_TYPE_CUBE";break;case gs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Rd(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ni:t="ENVMAP_MODE_REFRACTION";break}return t}function Cd(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case fo:t="ENVMAP_BLENDING_MULTIPLY";break;case Ec:t="ENVMAP_BLENDING_MIX";break;case Tc:t="ENVMAP_BLENDING_ADD";break}return t}function Pd(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Ld(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=wd(e),l=bd(e),h=Rd(e),d=Cd(e),f=Pd(e),m=xd(e),g=vd(r),x=s.createProgram();let p,u,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(gi).join(`
`),p.length>0&&(p+=`
`),u=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(gi).join(`
`),u.length>0&&(u+=`
`)):(p=[Ka(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gi).join(`
`),u=[Ka(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==dn?"#define TONE_MAPPING":"",e.toneMapping!==dn?wt.tonemapping_pars_fragment:"",e.toneMapping!==dn?_d("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",wt.colorspace_pars_fragment,gd("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(gi).join(`
`)),a=fr(a),a=Xa(a,e),a=qa(a,e),o=fr(o),o=Xa(o,e),o=qa(o,e),a=Ya(a),o=Ya(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,u=["#define varying in",e.glslVersion===ha?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ha?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const y=T+p+a,E=T+u+o,L=Va(s,s.VERTEX_SHADER,y),b=Va(s,s.FRAGMENT_SHADER,E);s.attachShader(x,L),s.attachShader(x,b),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(U){if(i.debug.checkShaderErrors){const G=s.getProgramInfoLog(x).trim(),R=s.getShaderInfoLog(L).trim(),V=s.getShaderInfoLog(b).trim();let W=!0,j=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,L,b);else{const J=Wa(s,L,"vertex"),k=Wa(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+G+`
`+J+`
`+k)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(R===""||V==="")&&(j=!1);j&&(U.diagnostics={runnable:W,programLog:G,vertexShader:{log:R,prefix:p},fragmentShader:{log:V,prefix:u}})}s.deleteShader(L),s.deleteShader(b),N=new ss(s,x),S=Md(s,x)}let N;this.getUniforms=function(){return N===void 0&&w(this),N};let S;this.getAttributes=function(){return S===void 0&&w(this),S};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(x,fd)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dd++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=L,this.fragmentShader=b,this}let Dd=0;class Id{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Ud(t),e.set(t,n)),n}}class Ud{constructor(t){this.id=Dd++,this.code=t,this.usedTimes=0}}function Nd(i,t,e,n,s,r,a){const o=new Ro,c=new Id,l=new Set,h=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(S){return l.add(S),S===0?"uv":`uv${S}`}function p(S,_,U,G,R){const V=G.fog,W=R.geometry,j=S.isMeshStandardMaterial?G.environment:null,J=(S.isMeshStandardMaterial?e:t).get(S.envMap||j),k=J&&J.mapping===gs?J.image.height:null,tt=g[S.type];S.precision!==null&&(m=s.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const Q=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,gt=Q!==void 0?Q.length:0;let Ut=0;W.morphAttributes.position!==void 0&&(Ut=1),W.morphAttributes.normal!==void 0&&(Ut=2),W.morphAttributes.color!==void 0&&(Ut=3);let Yt,H,et,ft;if(tt){const Wt=We[tt];Yt=Wt.vertexShader,H=Wt.fragmentShader}else Yt=S.vertexShader,H=S.fragmentShader,c.update(S),et=c.getVertexShaderID(S),ft=c.getFragmentShaderID(S);const st=i.getRenderTarget(),Nt=R.isInstancedMesh===!0,Ft=R.isBatchedMesh===!0,I=!!S.map,$t=!!S.matcap,vt=!!J,Kt=!!S.aoMap,yt=!!S.lightMap,zt=!!S.bumpMap,Lt=!!S.normalMap,Bt=!!S.displacementMap,ee=!!S.emissiveMap,A=!!S.metalnessMap,v=!!S.roughnessMap,B=S.anisotropy>0,q=S.clearcoat>0,$=S.dispersion>0,Z=S.iridescence>0,xt=S.sheen>0,ct=S.transmission>0,ot=B&&!!S.anisotropyMap,Rt=q&&!!S.clearcoatMap,nt=q&&!!S.clearcoatNormalMap,_t=q&&!!S.clearcoatRoughnessMap,kt=Z&&!!S.iridescenceMap,Mt=Z&&!!S.iridescenceThicknessMap,ut=xt&&!!S.sheenColorMap,Ct=xt&&!!S.sheenRoughnessMap,Ot=!!S.specularMap,ie=!!S.specularColorMap,Pt=!!S.specularIntensityMap,C=ct&&!!S.transmissionMap,K=ct&&!!S.thicknessMap,X=!!S.gradientMap,rt=!!S.alphaMap,ht=S.alphaTest>0,Ht=!!S.alphaHash,Zt=!!S.extensions;let ne=dn;S.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(ne=i.toneMapping);const fe={shaderID:tt,shaderType:S.type,shaderName:S.name,vertexShader:Yt,fragmentShader:H,defines:S.defines,customVertexShaderID:et,customFragmentShaderID:ft,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:Ft,instancing:Nt,instancingColor:Nt&&R.instanceColor!==null,instancingMorph:Nt&&R.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:st===null?i.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:_n,alphaToCoverage:!!S.alphaToCoverage,map:I,matcap:$t,envMap:vt,envMapMode:vt&&J.mapping,envMapCubeUVHeight:k,aoMap:Kt,lightMap:yt,bumpMap:zt,normalMap:Lt,displacementMap:f&&Bt,emissiveMap:ee,normalMapObjectSpace:Lt&&S.normalMapType===Wc,normalMapTangentSpace:Lt&&S.normalMapType===Eo,metalnessMap:A,roughnessMap:v,anisotropy:B,anisotropyMap:ot,clearcoat:q,clearcoatMap:Rt,clearcoatNormalMap:nt,clearcoatRoughnessMap:_t,dispersion:$,iridescence:Z,iridescenceMap:kt,iridescenceThicknessMap:Mt,sheen:xt,sheenColorMap:ut,sheenRoughnessMap:Ct,specularMap:Ot,specularColorMap:ie,specularIntensityMap:Pt,transmission:ct,transmissionMap:C,thicknessMap:K,gradientMap:X,opaque:S.transparent===!1&&S.blending===Jn&&S.alphaToCoverage===!1,alphaMap:rt,alphaTest:ht,alphaHash:Ht,combine:S.combine,mapUv:I&&x(S.map.channel),aoMapUv:Kt&&x(S.aoMap.channel),lightMapUv:yt&&x(S.lightMap.channel),bumpMapUv:zt&&x(S.bumpMap.channel),normalMapUv:Lt&&x(S.normalMap.channel),displacementMapUv:Bt&&x(S.displacementMap.channel),emissiveMapUv:ee&&x(S.emissiveMap.channel),metalnessMapUv:A&&x(S.metalnessMap.channel),roughnessMapUv:v&&x(S.roughnessMap.channel),anisotropyMapUv:ot&&x(S.anisotropyMap.channel),clearcoatMapUv:Rt&&x(S.clearcoatMap.channel),clearcoatNormalMapUv:nt&&x(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&x(S.clearcoatRoughnessMap.channel),iridescenceMapUv:kt&&x(S.iridescenceMap.channel),iridescenceThicknessMapUv:Mt&&x(S.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&x(S.sheenColorMap.channel),sheenRoughnessMapUv:Ct&&x(S.sheenRoughnessMap.channel),specularMapUv:Ot&&x(S.specularMap.channel),specularColorMapUv:ie&&x(S.specularColorMap.channel),specularIntensityMapUv:Pt&&x(S.specularIntensityMap.channel),transmissionMapUv:C&&x(S.transmissionMap.channel),thicknessMapUv:K&&x(S.thicknessMap.channel),alphaMapUv:rt&&x(S.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Lt||B),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!W.attributes.uv&&(I||rt),fog:!!V,useFog:S.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:R.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:Ut,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:ne,useLegacyLights:i._useLegacyLights,decodeVideoTexture:I&&S.map.isVideoTexture===!0&&Xt.getTransfer(S.map.colorSpace)===jt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===tn,flipSided:S.side===Se,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Zt&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Zt&&S.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return fe.vertexUv1s=l.has(1),fe.vertexUv2s=l.has(2),fe.vertexUv3s=l.has(3),l.clear(),fe}function u(S){const _=[];if(S.shaderID?_.push(S.shaderID):(_.push(S.customVertexShaderID),_.push(S.customFragmentShaderID)),S.defines!==void 0)for(const U in S.defines)_.push(U),_.push(S.defines[U]);return S.isRawShaderMaterial===!1&&(T(_,S),y(_,S),_.push(i.outputColorSpace)),_.push(S.customProgramCacheKey),_.join()}function T(S,_){S.push(_.precision),S.push(_.outputColorSpace),S.push(_.envMapMode),S.push(_.envMapCubeUVHeight),S.push(_.mapUv),S.push(_.alphaMapUv),S.push(_.lightMapUv),S.push(_.aoMapUv),S.push(_.bumpMapUv),S.push(_.normalMapUv),S.push(_.displacementMapUv),S.push(_.emissiveMapUv),S.push(_.metalnessMapUv),S.push(_.roughnessMapUv),S.push(_.anisotropyMapUv),S.push(_.clearcoatMapUv),S.push(_.clearcoatNormalMapUv),S.push(_.clearcoatRoughnessMapUv),S.push(_.iridescenceMapUv),S.push(_.iridescenceThicknessMapUv),S.push(_.sheenColorMapUv),S.push(_.sheenRoughnessMapUv),S.push(_.specularMapUv),S.push(_.specularColorMapUv),S.push(_.specularIntensityMapUv),S.push(_.transmissionMapUv),S.push(_.thicknessMapUv),S.push(_.combine),S.push(_.fogExp2),S.push(_.sizeAttenuation),S.push(_.morphTargetsCount),S.push(_.morphAttributeCount),S.push(_.numDirLights),S.push(_.numPointLights),S.push(_.numSpotLights),S.push(_.numSpotLightMaps),S.push(_.numHemiLights),S.push(_.numRectAreaLights),S.push(_.numDirLightShadows),S.push(_.numPointLightShadows),S.push(_.numSpotLightShadows),S.push(_.numSpotLightShadowsWithMaps),S.push(_.numLightProbes),S.push(_.shadowMapType),S.push(_.toneMapping),S.push(_.numClippingPlanes),S.push(_.numClipIntersection),S.push(_.depthPacking)}function y(S,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),S.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.skinning&&o.enable(4),_.morphTargets&&o.enable(5),_.morphNormals&&o.enable(6),_.morphColors&&o.enable(7),_.premultipliedAlpha&&o.enable(8),_.shadowMapEnabled&&o.enable(9),_.useLegacyLights&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.alphaToCoverage&&o.enable(20),S.push(o.mask)}function E(S){const _=g[S.type];let U;if(_){const G=We[_];U=xl.clone(G.uniforms)}else U=S.uniforms;return U}function L(S,_){let U;for(let G=0,R=h.length;G<R;G++){const V=h[G];if(V.cacheKey===_){U=V,++U.usedTimes;break}}return U===void 0&&(U=new Ld(i,_,S,r),h.push(U)),U}function b(S){if(--S.usedTimes===0){const _=h.indexOf(S);h[_]=h[h.length-1],h.pop(),S.destroy()}}function w(S){c.remove(S)}function N(){c.dispose()}return{getParameters:p,getProgramCacheKey:u,getUniforms:E,acquireProgram:L,releaseProgram:b,releaseShaderCache:w,programs:h,dispose:N}}function Fd(){let i=new WeakMap;function t(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function e(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function Od(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function $a(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Za(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,f,m,g,x,p){let u=i[t];return u===void 0?(u={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:x,group:p},i[t]=u):(u.id=d.id,u.object=d,u.geometry=f,u.material=m,u.groupOrder=g,u.renderOrder=d.renderOrder,u.z=x,u.group=p),t++,u}function o(d,f,m,g,x,p){const u=a(d,f,m,g,x,p);m.transmission>0?n.push(u):m.transparent===!0?s.push(u):e.push(u)}function c(d,f,m,g,x,p){const u=a(d,f,m,g,x,p);m.transmission>0?n.unshift(u):m.transparent===!0?s.unshift(u):e.unshift(u)}function l(d,f){e.length>1&&e.sort(d||Od),n.length>1&&n.sort(f||$a),s.length>1&&s.sort(f||$a)}function h(){for(let d=t,f=i.length;d<f;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function zd(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Za,i.set(n,[a])):s>=r.length?(a=new Za,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Bd(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new It};break;case"SpotLight":e={position:new D,direction:new D,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function Gd(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let kd=0;function Hd(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Vd(i){const t=new Bd,e=Gd(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const s=new D,r=new te,a=new te;function o(l,h){let d=0,f=0,m=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let g=0,x=0,p=0,u=0,T=0,y=0,E=0,L=0,b=0,w=0,N=0;l.sort(Hd);const S=h===!0?Math.PI:1;for(let U=0,G=l.length;U<G;U++){const R=l[U],V=R.color,W=R.intensity,j=R.distance,J=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=V.r*W*S,f+=V.g*W*S,m+=V.b*W*S;else if(R.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(R.sh.coefficients[k],W);N++}else if(R.isDirectionalLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity*S),R.castShadow){const tt=R.shadow,Q=e.get(R);Q.shadowBias=tt.bias,Q.shadowNormalBias=tt.normalBias,Q.shadowRadius=tt.radius,Q.shadowMapSize=tt.mapSize,n.directionalShadow[g]=Q,n.directionalShadowMap[g]=J,n.directionalShadowMatrix[g]=R.shadow.matrix,y++}n.directional[g]=k,g++}else if(R.isSpotLight){const k=t.get(R);k.position.setFromMatrixPosition(R.matrixWorld),k.color.copy(V).multiplyScalar(W*S),k.distance=j,k.coneCos=Math.cos(R.angle),k.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),k.decay=R.decay,n.spot[p]=k;const tt=R.shadow;if(R.map&&(n.spotLightMap[b]=R.map,b++,tt.updateMatrices(R),R.castShadow&&w++),n.spotLightMatrix[p]=tt.matrix,R.castShadow){const Q=e.get(R);Q.shadowBias=tt.bias,Q.shadowNormalBias=tt.normalBias,Q.shadowRadius=tt.radius,Q.shadowMapSize=tt.mapSize,n.spotShadow[p]=Q,n.spotShadowMap[p]=J,L++}p++}else if(R.isRectAreaLight){const k=t.get(R);k.color.copy(V).multiplyScalar(W),k.halfWidth.set(R.width*.5,0,0),k.halfHeight.set(0,R.height*.5,0),n.rectArea[u]=k,u++}else if(R.isPointLight){const k=t.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity*S),k.distance=R.distance,k.decay=R.decay,R.castShadow){const tt=R.shadow,Q=e.get(R);Q.shadowBias=tt.bias,Q.shadowNormalBias=tt.normalBias,Q.shadowRadius=tt.radius,Q.shadowMapSize=tt.mapSize,Q.shadowCameraNear=tt.camera.near,Q.shadowCameraFar=tt.camera.far,n.pointShadow[x]=Q,n.pointShadowMap[x]=J,n.pointShadowMatrix[x]=R.shadow.matrix,E++}n.point[x]=k,x++}else if(R.isHemisphereLight){const k=t.get(R);k.skyColor.copy(R.color).multiplyScalar(W*S),k.groundColor.copy(R.groundColor).multiplyScalar(W*S),n.hemi[T]=k,T++}}u>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=it.LTC_FLOAT_1,n.rectAreaLTC2=it.LTC_FLOAT_2):(n.rectAreaLTC1=it.LTC_HALF_1,n.rectAreaLTC2=it.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=f,n.ambient[2]=m;const _=n.hash;(_.directionalLength!==g||_.pointLength!==x||_.spotLength!==p||_.rectAreaLength!==u||_.hemiLength!==T||_.numDirectionalShadows!==y||_.numPointShadows!==E||_.numSpotShadows!==L||_.numSpotMaps!==b||_.numLightProbes!==N)&&(n.directional.length=g,n.spot.length=p,n.rectArea.length=u,n.point.length=x,n.hemi.length=T,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=L,n.spotShadowMap.length=L,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=L+b-w,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=N,_.directionalLength=g,_.pointLength=x,_.spotLength=p,_.rectAreaLength=u,_.hemiLength=T,_.numDirectionalShadows=y,_.numPointShadows=E,_.numSpotShadows=L,_.numSpotMaps=b,_.numLightProbes=N,n.version=kd++)}function c(l,h){let d=0,f=0,m=0,g=0,x=0;const p=h.matrixWorldInverse;for(let u=0,T=l.length;u<T;u++){const y=l[u];if(y.isDirectionalLight){const E=n.directional[d];E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),d++}else if(y.isSpotLight){const E=n.spot[m];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),m++}else if(y.isRectAreaLight){const E=n.rectArea[g];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),a.identity(),r.copy(y.matrixWorld),r.premultiply(p),a.extractRotation(r),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const E=n.point[f];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){const E=n.hemi[x];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(p),x++}}}return{setup:o,setupView:c,state:n}}function ja(i){const t=new Vd(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(h){t.setup(e,h)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Wd(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new ja(i),t.set(s,[o])):r>=a.length?(o=new ja(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Xd extends In{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class qd extends In{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Yd=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kd=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function $d(i,t,e){let n=new xr;const s=new Gt,r=new Gt,a=new he,o=new Xd({depthPacking:Vc}),c=new qd,l={},h=e.maxTextureSize,d={[pn]:Se,[Se]:pn,[tn]:tn},f=new gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:Yd,fragmentShader:Kd}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new De;g.setAttribute("position",new ke(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new qt(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ho;let u=this.type;this.render=function(b,w,N){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;const S=i.getRenderTarget(),_=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),G=i.state;G.setBlending(fn),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const R=u!==Qe&&this.type===Qe,V=u===Qe&&this.type!==Qe;for(let W=0,j=b.length;W<j;W++){const J=b[W],k=J.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const tt=k.getFrameExtents();if(s.multiply(tt),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/tt.x),s.x=r.x*tt.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/tt.y),s.y=r.y*tt.y,k.mapSize.y=r.y)),k.map===null||R===!0||V===!0){const gt=this.type!==Qe?{minFilter:Ne,magFilter:Ne}:{};k.map!==null&&k.map.dispose(),k.map=new Dn(s.x,s.y,gt),k.map.texture.name=J.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const Q=k.getViewportCount();for(let gt=0;gt<Q;gt++){const Ut=k.getViewport(gt);a.set(r.x*Ut.x,r.y*Ut.y,r.x*Ut.z,r.y*Ut.w),G.viewport(a),k.updateMatrices(J,gt),n=k.getFrustum(),E(w,N,k.camera,J,this.type)}k.isPointLightShadow!==!0&&this.type===Qe&&T(k,N),k.needsUpdate=!1}u=this.type,p.needsUpdate=!1,i.setRenderTarget(S,_,U)};function T(b,w){const N=t.update(x);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Dn(s.x,s.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(w,null,N,f,x,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(w,null,N,m,x,null)}function y(b,w,N,S){let _=null;const U=N.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(U!==void 0)_=U;else if(_=N.isPointLight===!0?c:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const G=_.uuid,R=w.uuid;let V=l[G];V===void 0&&(V={},l[G]=V);let W=V[R];W===void 0&&(W=_.clone(),V[R]=W,w.addEventListener("dispose",L)),_=W}if(_.visible=w.visible,_.wireframe=w.wireframe,S===Qe?_.side=w.shadowSide!==null?w.shadowSide:w.side:_.side=w.shadowSide!==null?w.shadowSide:d[w.side],_.alphaMap=w.alphaMap,_.alphaTest=w.alphaTest,_.map=w.map,_.clipShadows=w.clipShadows,_.clippingPlanes=w.clippingPlanes,_.clipIntersection=w.clipIntersection,_.displacementMap=w.displacementMap,_.displacementScale=w.displacementScale,_.displacementBias=w.displacementBias,_.wireframeLinewidth=w.wireframeLinewidth,_.linewidth=w.linewidth,N.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const G=i.properties.get(_);G.light=N}return _}function E(b,w,N,S,_){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&_===Qe)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,b.matrixWorld);const R=t.update(b),V=b.material;if(Array.isArray(V)){const W=R.groups;for(let j=0,J=W.length;j<J;j++){const k=W[j],tt=V[k.materialIndex];if(tt&&tt.visible){const Q=y(b,tt,S,_);b.onBeforeShadow(i,b,w,N,R,Q,k),i.renderBufferDirect(N,null,R,Q,b,k),b.onAfterShadow(i,b,w,N,R,Q,k)}}}else if(V.visible){const W=y(b,V,S,_);b.onBeforeShadow(i,b,w,N,R,W,null),i.renderBufferDirect(N,null,R,W,b,null),b.onAfterShadow(i,b,w,N,R,W,null)}}const G=b.children;for(let R=0,V=G.length;R<V;R++)E(G[R],w,N,S,_)}function L(b){b.target.removeEventListener("dispose",L);for(const N in l){const S=l[N],_=b.target.uuid;_ in S&&(S[_].dispose(),delete S[_])}}}function Zd(i){function t(){let C=!1;const K=new he;let X=null;const rt=new he(0,0,0,0);return{setMask:function(ht){X!==ht&&!C&&(i.colorMask(ht,ht,ht,ht),X=ht)},setLocked:function(ht){C=ht},setClear:function(ht,Ht,Zt,ne,fe){fe===!0&&(ht*=ne,Ht*=ne,Zt*=ne),K.set(ht,Ht,Zt,ne),rt.equals(K)===!1&&(i.clearColor(ht,Ht,Zt,ne),rt.copy(K))},reset:function(){C=!1,X=null,rt.set(-1,0,0,0)}}}function e(){let C=!1,K=null,X=null,rt=null;return{setTest:function(ht){ht?ft(i.DEPTH_TEST):st(i.DEPTH_TEST)},setMask:function(ht){K!==ht&&!C&&(i.depthMask(ht),K=ht)},setFunc:function(ht){if(X!==ht){switch(ht){case gc:i.depthFunc(i.NEVER);break;case _c:i.depthFunc(i.ALWAYS);break;case xc:i.depthFunc(i.LESS);break;case rs:i.depthFunc(i.LEQUAL);break;case vc:i.depthFunc(i.EQUAL);break;case Mc:i.depthFunc(i.GEQUAL);break;case Sc:i.depthFunc(i.GREATER);break;case yc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}X=ht}},setLocked:function(ht){C=ht},setClear:function(ht){rt!==ht&&(i.clearDepth(ht),rt=ht)},reset:function(){C=!1,K=null,X=null,rt=null}}}function n(){let C=!1,K=null,X=null,rt=null,ht=null,Ht=null,Zt=null,ne=null,fe=null;return{setTest:function(Wt){C||(Wt?ft(i.STENCIL_TEST):st(i.STENCIL_TEST))},setMask:function(Wt){K!==Wt&&!C&&(i.stencilMask(Wt),K=Wt)},setFunc:function(Wt,He,ve){(X!==Wt||rt!==He||ht!==ve)&&(i.stencilFunc(Wt,He,ve),X=Wt,rt=He,ht=ve)},setOp:function(Wt,He,ve){(Ht!==Wt||Zt!==He||ne!==ve)&&(i.stencilOp(Wt,He,ve),Ht=Wt,Zt=He,ne=ve)},setLocked:function(Wt){C=Wt},setClear:function(Wt){fe!==Wt&&(i.clearStencil(Wt),fe=Wt)},reset:function(){C=!1,K=null,X=null,rt=null,ht=null,Ht=null,Zt=null,ne=null,fe=null}}}const s=new t,r=new e,a=new n,o=new WeakMap,c=new WeakMap;let l={},h={},d=new WeakMap,f=[],m=null,g=!1,x=null,p=null,u=null,T=null,y=null,E=null,L=null,b=new It(0,0,0),w=0,N=!1,S=null,_=null,U=null,G=null,R=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,j=0;const J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(J)[1]),W=j>=1):J.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),W=j>=2);let k=null,tt={};const Q=i.getParameter(i.SCISSOR_BOX),gt=i.getParameter(i.VIEWPORT),Ut=new he().fromArray(Q),Yt=new he().fromArray(gt);function H(C,K,X,rt){const ht=new Uint8Array(4),Ht=i.createTexture();i.bindTexture(C,Ht),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Zt=0;Zt<X;Zt++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(K,0,i.RGBA,1,1,rt,0,i.RGBA,i.UNSIGNED_BYTE,ht):i.texImage2D(K+Zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ht);return Ht}const et={};et[i.TEXTURE_2D]=H(i.TEXTURE_2D,i.TEXTURE_2D,1),et[i.TEXTURE_CUBE_MAP]=H(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[i.TEXTURE_2D_ARRAY]=H(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),et[i.TEXTURE_3D]=H(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),ft(i.DEPTH_TEST),r.setFunc(rs),zt(!1),Lt(Dr),ft(i.CULL_FACE),Kt(fn);function ft(C){l[C]!==!0&&(i.enable(C),l[C]=!0)}function st(C){l[C]!==!1&&(i.disable(C),l[C]=!1)}function Nt(C,K){return h[C]!==K?(i.bindFramebuffer(C,K),h[C]=K,C===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=K),C===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=K),!0):!1}function Ft(C,K){let X=f,rt=!1;if(C){X=d.get(K),X===void 0&&(X=[],d.set(K,X));const ht=C.textures;if(X.length!==ht.length||X[0]!==i.COLOR_ATTACHMENT0){for(let Ht=0,Zt=ht.length;Ht<Zt;Ht++)X[Ht]=i.COLOR_ATTACHMENT0+Ht;X.length=ht.length,rt=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,rt=!0);rt&&i.drawBuffers(X)}function I(C){return m!==C?(i.useProgram(C),m=C,!0):!1}const $t={[bn]:i.FUNC_ADD,[Qo]:i.FUNC_SUBTRACT,[tc]:i.FUNC_REVERSE_SUBTRACT};$t[ec]=i.MIN,$t[nc]=i.MAX;const vt={[ic]:i.ZERO,[sc]:i.ONE,[rc]:i.SRC_COLOR,[ar]:i.SRC_ALPHA,[uc]:i.SRC_ALPHA_SATURATE,[lc]:i.DST_COLOR,[oc]:i.DST_ALPHA,[ac]:i.ONE_MINUS_SRC_COLOR,[or]:i.ONE_MINUS_SRC_ALPHA,[hc]:i.ONE_MINUS_DST_COLOR,[cc]:i.ONE_MINUS_DST_ALPHA,[fc]:i.CONSTANT_COLOR,[dc]:i.ONE_MINUS_CONSTANT_COLOR,[pc]:i.CONSTANT_ALPHA,[mc]:i.ONE_MINUS_CONSTANT_ALPHA};function Kt(C,K,X,rt,ht,Ht,Zt,ne,fe,Wt){if(C===fn){g===!0&&(st(i.BLEND),g=!1);return}if(g===!1&&(ft(i.BLEND),g=!0),C!==Jo){if(C!==x||Wt!==N){if((p!==bn||y!==bn)&&(i.blendEquation(i.FUNC_ADD),p=bn,y=bn),Wt)switch(C){case Jn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ir:i.blendFunc(i.ONE,i.ONE);break;case Ur:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nr:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case Jn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ir:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ur:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Nr:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}u=null,T=null,E=null,L=null,b.set(0,0,0),w=0,x=C,N=Wt}return}ht=ht||K,Ht=Ht||X,Zt=Zt||rt,(K!==p||ht!==y)&&(i.blendEquationSeparate($t[K],$t[ht]),p=K,y=ht),(X!==u||rt!==T||Ht!==E||Zt!==L)&&(i.blendFuncSeparate(vt[X],vt[rt],vt[Ht],vt[Zt]),u=X,T=rt,E=Ht,L=Zt),(ne.equals(b)===!1||fe!==w)&&(i.blendColor(ne.r,ne.g,ne.b,fe),b.copy(ne),w=fe),x=C,N=!1}function yt(C,K){C.side===tn?st(i.CULL_FACE):ft(i.CULL_FACE);let X=C.side===Se;K&&(X=!X),zt(X),C.blending===Jn&&C.transparent===!1?Kt(fn):Kt(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),r.setFunc(C.depthFunc),r.setTest(C.depthTest),r.setMask(C.depthWrite),s.setMask(C.colorWrite);const rt=C.stencilWrite;a.setTest(rt),rt&&(a.setMask(C.stencilWriteMask),a.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),a.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),ee(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?ft(i.SAMPLE_ALPHA_TO_COVERAGE):st(i.SAMPLE_ALPHA_TO_COVERAGE)}function zt(C){S!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),S=C)}function Lt(C){C!==Zo?(ft(i.CULL_FACE),C!==_&&(C===Dr?i.cullFace(i.BACK):C===jo?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):st(i.CULL_FACE),_=C}function Bt(C){C!==U&&(W&&i.lineWidth(C),U=C)}function ee(C,K,X){C?(ft(i.POLYGON_OFFSET_FILL),(G!==K||R!==X)&&(i.polygonOffset(K,X),G=K,R=X)):st(i.POLYGON_OFFSET_FILL)}function A(C){C?ft(i.SCISSOR_TEST):st(i.SCISSOR_TEST)}function v(C){C===void 0&&(C=i.TEXTURE0+V-1),k!==C&&(i.activeTexture(C),k=C)}function B(C,K,X){X===void 0&&(k===null?X=i.TEXTURE0+V-1:X=k);let rt=tt[X];rt===void 0&&(rt={type:void 0,texture:void 0},tt[X]=rt),(rt.type!==C||rt.texture!==K)&&(k!==X&&(i.activeTexture(X),k=X),i.bindTexture(C,K||et[C]),rt.type=C,rt.texture=K)}function q(){const C=tt[k];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function xt(){try{i.texSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ct(){try{i.texSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ot(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Rt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function nt(){try{i.texStorage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function _t(){try{i.texStorage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function kt(){try{i.texImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Mt(){try{i.texImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ut(C){Ut.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),Ut.copy(C))}function Ct(C){Yt.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),Yt.copy(C))}function Ot(C,K){let X=c.get(K);X===void 0&&(X=new WeakMap,c.set(K,X));let rt=X.get(C);rt===void 0&&(rt=i.getUniformBlockIndex(K,C.name),X.set(C,rt))}function ie(C,K){const rt=c.get(K).get(C);o.get(K)!==rt&&(i.uniformBlockBinding(K,rt,C.__bindingPointIndex),o.set(K,rt))}function Pt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},k=null,tt={},h={},d=new WeakMap,f=[],m=null,g=!1,x=null,p=null,u=null,T=null,y=null,E=null,L=null,b=new It(0,0,0),w=0,N=!1,S=null,_=null,U=null,G=null,R=null,Ut.set(0,0,i.canvas.width,i.canvas.height),Yt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:ft,disable:st,bindFramebuffer:Nt,drawBuffers:Ft,useProgram:I,setBlending:Kt,setMaterial:yt,setFlipSided:zt,setCullFace:Lt,setLineWidth:Bt,setPolygonOffset:ee,setScissorTest:A,activeTexture:v,bindTexture:B,unbindTexture:q,compressedTexImage2D:$,compressedTexImage3D:Z,texImage2D:kt,texImage3D:Mt,updateUBOMapping:Ot,uniformBlockBinding:ie,texStorage2D:nt,texStorage3D:_t,texSubImage2D:xt,texSubImage3D:ct,compressedTexSubImage2D:ot,compressedTexSubImage3D:Rt,scissor:ut,viewport:Ct,reset:Pt}}function jd(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Gt,h=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,v){return m?new OffscreenCanvas(A,v):us("canvas")}function x(A,v,B){let q=1;const $=ee(A);if(($.width>B||$.height>B)&&(q=B/Math.max($.width,$.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(q*$.width),xt=Math.floor(q*$.height);d===void 0&&(d=g(Z,xt));const ct=v?g(Z,xt):d;return ct.width=Z,ct.height=xt,ct.getContext("2d").drawImage(A,0,0,Z,xt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+Z+"x"+xt+")."),ct}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),A;return A}function p(A){return A.generateMipmaps&&A.minFilter!==Ne&&A.minFilter!==Be}function u(A){i.generateMipmap(A)}function T(A,v,B,q,$=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Z=v;if(v===i.RED&&(B===i.FLOAT&&(Z=i.R32F),B===i.HALF_FLOAT&&(Z=i.R16F),B===i.UNSIGNED_BYTE&&(Z=i.R8)),v===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.R8UI),B===i.UNSIGNED_SHORT&&(Z=i.R16UI),B===i.UNSIGNED_INT&&(Z=i.R32UI),B===i.BYTE&&(Z=i.R8I),B===i.SHORT&&(Z=i.R16I),B===i.INT&&(Z=i.R32I)),v===i.RG&&(B===i.FLOAT&&(Z=i.RG32F),B===i.HALF_FLOAT&&(Z=i.RG16F),B===i.UNSIGNED_BYTE&&(Z=i.RG8)),v===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RG8UI),B===i.UNSIGNED_SHORT&&(Z=i.RG16UI),B===i.UNSIGNED_INT&&(Z=i.RG32UI),B===i.BYTE&&(Z=i.RG8I),B===i.SHORT&&(Z=i.RG16I),B===i.INT&&(Z=i.RG32I)),v===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),v===i.RGBA){const xt=$?as:Xt.getTransfer(q);B===i.FLOAT&&(Z=i.RGBA32F),B===i.HALF_FLOAT&&(Z=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Z=xt===jt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function y(A,v){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ne&&A.minFilter!==Be?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function E(A){const v=A.target;v.removeEventListener("dispose",E),b(v),v.isVideoTexture&&h.delete(v)}function L(A){const v=A.target;v.removeEventListener("dispose",L),N(v)}function b(A){const v=n.get(A);if(v.__webglInit===void 0)return;const B=A.source,q=f.get(B);if(q){const $=q[v.__cacheKey];$.usedTimes--,$.usedTimes===0&&w(A),Object.keys(q).length===0&&f.delete(B)}n.remove(A)}function w(A){const v=n.get(A);i.deleteTexture(v.__webglTexture);const B=A.source,q=f.get(B);delete q[v.__cacheKey],a.memory.textures--}function N(A){const v=n.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let $=0;$<v.__webglFramebuffer[q].length;$++)i.deleteFramebuffer(v.__webglFramebuffer[q][$]);else i.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)i.deleteFramebuffer(v.__webglFramebuffer[q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=A.textures;for(let q=0,$=B.length;q<$;q++){const Z=n.get(B[q]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(B[q])}n.remove(A)}let S=0;function _(){S=0}function U(){const A=S;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),S+=1,A}function G(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function R(A,v){const B=n.get(A);if(A.isVideoTexture&&Lt(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const q=A.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ut(B,A,v);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+v)}function V(A,v){const B=n.get(A);if(A.version>0&&B.__version!==A.version){Ut(B,A,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+v)}function W(A,v){const B=n.get(A);if(A.version>0&&B.__version!==A.version){Ut(B,A,v);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+v)}function j(A,v){const B=n.get(A);if(A.version>0&&B.__version!==A.version){Yt(B,A,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+v)}const J={[hr]:i.REPEAT,[Cn]:i.CLAMP_TO_EDGE,[ur]:i.MIRRORED_REPEAT},k={[Ne]:i.NEAREST,[Lc]:i.NEAREST_MIPMAP_NEAREST,[Ri]:i.NEAREST_MIPMAP_LINEAR,[Be]:i.LINEAR,[Ts]:i.LINEAR_MIPMAP_NEAREST,[Pn]:i.LINEAR_MIPMAP_LINEAR},tt={[Xc]:i.NEVER,[jc]:i.ALWAYS,[qc]:i.LESS,[To]:i.LEQUAL,[Yc]:i.EQUAL,[Zc]:i.GEQUAL,[Kc]:i.GREATER,[$c]:i.NOTEQUAL};function Q(A,v){if(v.type===un&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Be||v.magFilter===Ts||v.magFilter===Ri||v.magFilter===Pn||v.minFilter===Be||v.minFilter===Ts||v.minFilter===Ri||v.minFilter===Pn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,J[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,J[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,J[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,k[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,k[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,tt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ne||v.minFilter!==Ri&&v.minFilter!==Pn||v.type===un&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function gt(A,v){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",E));const q=v.source;let $=f.get(q);$===void 0&&($={},f.set(q,$));const Z=G(v);if(Z!==A.__cacheKey){$[Z]===void 0&&($[Z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),$[Z].usedTimes++;const xt=$[A.__cacheKey];xt!==void 0&&($[A.__cacheKey].usedTimes--,xt.usedTimes===0&&w(v)),A.__cacheKey=Z,A.__webglTexture=$[Z].texture}return B}function Ut(A,v,B){let q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=i.TEXTURE_3D);const $=gt(A,v),Z=v.source;e.bindTexture(q,A.__webglTexture,i.TEXTURE0+B);const xt=n.get(Z);if(Z.version!==xt.__version||$===!0){e.activeTexture(i.TEXTURE0+B);const ct=Xt.getPrimaries(Xt.workingColorSpace),ot=v.colorSpace===hn?null:Xt.getPrimaries(v.colorSpace),Rt=v.colorSpace===hn||ct===ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let nt=x(v.image,!1,s.maxTextureSize);nt=Bt(v,nt);const _t=r.convert(v.format,v.colorSpace),kt=r.convert(v.type);let Mt=T(v.internalFormat,_t,kt,v.colorSpace,v.isVideoTexture);Q(q,v);let ut;const Ct=v.mipmaps,Ot=v.isVideoTexture!==!0,ie=xt.__version===void 0||$===!0,Pt=Z.dataReady,C=y(v,nt);if(v.isDepthTexture)Mt=i.DEPTH_COMPONENT16,v.type===un?Mt=i.DEPTH_COMPONENT32F:v.type===ii?Mt=i.DEPTH_COMPONENT24:v.type===xi&&(Mt=i.DEPTH24_STENCIL8),ie&&(Ot?e.texStorage2D(i.TEXTURE_2D,1,Mt,nt.width,nt.height):e.texImage2D(i.TEXTURE_2D,0,Mt,nt.width,nt.height,0,_t,kt,null));else if(v.isDataTexture)if(Ct.length>0){Ot&&ie&&e.texStorage2D(i.TEXTURE_2D,C,Mt,Ct[0].width,Ct[0].height);for(let K=0,X=Ct.length;K<X;K++)ut=Ct[K],Ot?Pt&&e.texSubImage2D(i.TEXTURE_2D,K,0,0,ut.width,ut.height,_t,kt,ut.data):e.texImage2D(i.TEXTURE_2D,K,Mt,ut.width,ut.height,0,_t,kt,ut.data);v.generateMipmaps=!1}else Ot?(ie&&e.texStorage2D(i.TEXTURE_2D,C,Mt,nt.width,nt.height),Pt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,nt.width,nt.height,_t,kt,nt.data)):e.texImage2D(i.TEXTURE_2D,0,Mt,nt.width,nt.height,0,_t,kt,nt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Ot&&ie&&e.texStorage3D(i.TEXTURE_2D_ARRAY,C,Mt,Ct[0].width,Ct[0].height,nt.depth);for(let K=0,X=Ct.length;K<X;K++)ut=Ct[K],v.format!==Xe?_t!==null?Ot?Pt&&e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,ut.width,ut.height,nt.depth,_t,ut.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Mt,ut.width,ut.height,nt.depth,0,ut.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?Pt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,ut.width,ut.height,nt.depth,_t,kt,ut.data):e.texImage3D(i.TEXTURE_2D_ARRAY,K,Mt,ut.width,ut.height,nt.depth,0,_t,kt,ut.data)}else{Ot&&ie&&e.texStorage2D(i.TEXTURE_2D,C,Mt,Ct[0].width,Ct[0].height);for(let K=0,X=Ct.length;K<X;K++)ut=Ct[K],v.format!==Xe?_t!==null?Ot?Pt&&e.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,ut.width,ut.height,_t,ut.data):e.compressedTexImage2D(i.TEXTURE_2D,K,Mt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ot?Pt&&e.texSubImage2D(i.TEXTURE_2D,K,0,0,ut.width,ut.height,_t,kt,ut.data):e.texImage2D(i.TEXTURE_2D,K,Mt,ut.width,ut.height,0,_t,kt,ut.data)}else if(v.isDataArrayTexture)Ot?(ie&&e.texStorage3D(i.TEXTURE_2D_ARRAY,C,Mt,nt.width,nt.height,nt.depth),Pt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,_t,kt,nt.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,Mt,nt.width,nt.height,nt.depth,0,_t,kt,nt.data);else if(v.isData3DTexture)Ot?(ie&&e.texStorage3D(i.TEXTURE_3D,C,Mt,nt.width,nt.height,nt.depth),Pt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,_t,kt,nt.data)):e.texImage3D(i.TEXTURE_3D,0,Mt,nt.width,nt.height,nt.depth,0,_t,kt,nt.data);else if(v.isFramebufferTexture){if(ie)if(Ot)e.texStorage2D(i.TEXTURE_2D,C,Mt,nt.width,nt.height);else{let K=nt.width,X=nt.height;for(let rt=0;rt<C;rt++)e.texImage2D(i.TEXTURE_2D,rt,Mt,K,X,0,_t,kt,null),K>>=1,X>>=1}}else if(Ct.length>0){if(Ot&&ie){const K=ee(Ct[0]);e.texStorage2D(i.TEXTURE_2D,C,Mt,K.width,K.height)}for(let K=0,X=Ct.length;K<X;K++)ut=Ct[K],Ot?Pt&&e.texSubImage2D(i.TEXTURE_2D,K,0,0,_t,kt,ut):e.texImage2D(i.TEXTURE_2D,K,Mt,_t,kt,ut);v.generateMipmaps=!1}else if(Ot){if(ie){const K=ee(nt);e.texStorage2D(i.TEXTURE_2D,C,Mt,K.width,K.height)}Pt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t,kt,nt)}else e.texImage2D(i.TEXTURE_2D,0,Mt,_t,kt,nt);p(v)&&u(q),xt.__version=Z.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Yt(A,v,B){if(v.image.length!==6)return;const q=gt(A,v),$=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+B);const Z=n.get($);if($.version!==Z.__version||q===!0){e.activeTexture(i.TEXTURE0+B);const xt=Xt.getPrimaries(Xt.workingColorSpace),ct=v.colorSpace===hn?null:Xt.getPrimaries(v.colorSpace),ot=v.colorSpace===hn||xt===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ot);const Rt=v.isCompressedTexture||v.image[0].isCompressedTexture,nt=v.image[0]&&v.image[0].isDataTexture,_t=[];for(let X=0;X<6;X++)!Rt&&!nt?_t[X]=x(v.image[X],!0,s.maxCubemapSize):_t[X]=nt?v.image[X].image:v.image[X],_t[X]=Bt(v,_t[X]);const kt=_t[0],Mt=r.convert(v.format,v.colorSpace),ut=r.convert(v.type),Ct=T(v.internalFormat,Mt,ut,v.colorSpace),Ot=v.isVideoTexture!==!0,ie=Z.__version===void 0||q===!0,Pt=$.dataReady;let C=y(v,kt);Q(i.TEXTURE_CUBE_MAP,v);let K;if(Rt){Ot&&ie&&e.texStorage2D(i.TEXTURE_CUBE_MAP,C,Ct,kt.width,kt.height);for(let X=0;X<6;X++){K=_t[X].mipmaps;for(let rt=0;rt<K.length;rt++){const ht=K[rt];v.format!==Xe?Mt!==null?Ot?Pt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,rt,0,0,ht.width,ht.height,Mt,ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,rt,Ct,ht.width,ht.height,0,ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ot?Pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,rt,0,0,ht.width,ht.height,Mt,ut,ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,rt,Ct,ht.width,ht.height,0,Mt,ut,ht.data)}}}else{if(K=v.mipmaps,Ot&&ie){K.length>0&&C++;const X=ee(_t[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,C,Ct,X.width,X.height)}for(let X=0;X<6;X++)if(nt){Ot?Pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,_t[X].width,_t[X].height,Mt,ut,_t[X].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ct,_t[X].width,_t[X].height,0,Mt,ut,_t[X].data);for(let rt=0;rt<K.length;rt++){const Ht=K[rt].image[X].image;Ot?Pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,rt+1,0,0,Ht.width,Ht.height,Mt,ut,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,rt+1,Ct,Ht.width,Ht.height,0,Mt,ut,Ht.data)}}else{Ot?Pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Mt,ut,_t[X]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Ct,Mt,ut,_t[X]);for(let rt=0;rt<K.length;rt++){const ht=K[rt];Ot?Pt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,rt+1,0,0,Mt,ut,ht.image[X]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+X,rt+1,Ct,Mt,ut,ht.image[X])}}}p(v)&&u(i.TEXTURE_CUBE_MAP),Z.__version=$.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function H(A,v,B,q,$,Z){const xt=r.convert(B.format,B.colorSpace),ct=r.convert(B.type),ot=T(B.internalFormat,xt,ct,B.colorSpace);if(!n.get(v).__hasExternalTextures){const nt=Math.max(1,v.width>>Z),_t=Math.max(1,v.height>>Z);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,Z,ot,nt,_t,v.depth,0,xt,ct,null):e.texImage2D($,Z,ot,nt,_t,0,xt,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),zt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,$,n.get(B).__webglTexture,0,yt(v)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,$,n.get(B).__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function et(A,v,B){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer&&!v.stencilBuffer){let q=i.DEPTH_COMPONENT24;if(B||zt(v)){const $=v.depthTexture;$&&$.isDepthTexture&&($.type===un?q=i.DEPTH_COMPONENT32F:$.type===ii&&(q=i.DEPTH_COMPONENT24));const Z=yt(v);zt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Z,q,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,q,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,q,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,A)}else if(v.depthBuffer&&v.stencilBuffer){const q=yt(v);B&&zt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,q,i.DEPTH24_STENCIL8,v.width,v.height):zt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,q,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,A)}else{const q=v.textures;for(let $=0;$<q.length;$++){const Z=q[$],xt=r.convert(Z.format,Z.colorSpace),ct=r.convert(Z.type),ot=T(Z.internalFormat,xt,ct,Z.colorSpace),Rt=yt(v);B&&zt(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,ot,v.width,v.height):zt(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Rt,ot,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ot,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ft(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),R(v.depthTexture,0);const q=n.get(v.depthTexture).__webglTexture,$=yt(v);if(v.depthTexture.format===Qn)zt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,q,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,q,0);else if(v.depthTexture.format===_i)zt(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,q,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function st(A){const v=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");ft(v.__webglFramebuffer,A)}else if(B){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]=i.createRenderbuffer(),et(v.__webglDepthbuffer[q],A,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),et(v.__webglDepthbuffer,A,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(A,v,B){const q=n.get(A);v!==void 0&&H(q.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&st(A)}function Ft(A){const v=A.texture,B=n.get(A),q=n.get(v);A.addEventListener("dispose",L);const $=A.textures,Z=A.isWebGLCubeRenderTarget===!0,xt=$.length>1;if(xt||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=v.version,a.memory.textures++),Z){B.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[ct]=[];for(let ot=0;ot<v.mipmaps.length;ot++)B.__webglFramebuffer[ct][ot]=i.createFramebuffer()}else B.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let ct=0;ct<v.mipmaps.length;ct++)B.__webglFramebuffer[ct]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(xt)for(let ct=0,ot=$.length;ct<ot;ct++){const Rt=n.get($[ct]);Rt.__webglTexture===void 0&&(Rt.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&zt(A)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ct=0;ct<$.length;ct++){const ot=$[ct];B.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[ct]);const Rt=r.convert(ot.format,ot.colorSpace),nt=r.convert(ot.type),_t=T(ot.internalFormat,Rt,nt,ot.colorSpace,A.isXRRenderTarget===!0),kt=yt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,_t,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,B.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),et(B.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Q(i.TEXTURE_CUBE_MAP,v);for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0)for(let ot=0;ot<v.mipmaps.length;ot++)H(B.__webglFramebuffer[ct][ot],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,ot);else H(B.__webglFramebuffer[ct],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);p(v)&&u(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){for(let ct=0,ot=$.length;ct<ot;ct++){const Rt=$[ct],nt=n.get(Rt);e.bindTexture(i.TEXTURE_2D,nt.__webglTexture),Q(i.TEXTURE_2D,Rt),H(B.__webglFramebuffer,A,Rt,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,0),p(Rt)&&u(i.TEXTURE_2D)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ct=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,q.__webglTexture),Q(ct,v),v.mipmaps&&v.mipmaps.length>0)for(let ot=0;ot<v.mipmaps.length;ot++)H(B.__webglFramebuffer[ot],A,v,i.COLOR_ATTACHMENT0,ct,ot);else H(B.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,ct,0);p(v)&&u(ct),e.unbindTexture()}A.depthBuffer&&st(A)}function I(A){const v=A.textures;for(let B=0,q=v.length;B<q;B++){const $=v[B];if(p($)){const Z=A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,xt=n.get($).__webglTexture;e.bindTexture(Z,xt),u(Z),e.unbindTexture()}}}const $t=[],vt=[];function Kt(A){if(A.samples>0){if(zt(A)===!1){const v=A.textures,B=A.width,q=A.height;let $=i.COLOR_BUFFER_BIT;const Z=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=n.get(A),ct=v.length>1;if(ct)for(let ot=0;ot<v.length;ot++)e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let ot=0;ot<v.length;ot++){if(A.resolveDepthBuffer&&(A.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,xt.__webglColorRenderbuffer[ot]);const Rt=n.get(v[ot]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Rt,0)}i.blitFramebuffer(0,0,B,q,0,0,B,q,$,i.NEAREST),c===!0&&($t.length=0,vt.length=0,$t.push(i.COLOR_ATTACHMENT0+ot),A.depthBuffer&&A.resolveDepthBuffer===!1&&($t.push(Z),vt.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,vt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,$t))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let ot=0;ot<v.length;ot++){e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.RENDERBUFFER,xt.__webglColorRenderbuffer[ot]);const Rt=n.get(v[ot]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,xt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ot,i.TEXTURE_2D,Rt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function yt(A){return Math.min(s.maxSamples,A.samples)}function zt(A){const v=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Lt(A){const v=a.render.frame;h.get(A)!==v&&(h.set(A,v),A.update())}function Bt(A,v){const B=A.colorSpace,q=A.format,$=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==_n&&B!==hn&&(Xt.getTransfer(B)===jt?(q!==Xe||$!==mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),v}function ee(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=_,this.setTexture2D=R,this.setTexture2DArray=V,this.setTexture3D=W,this.setTextureCube=j,this.rebindTextures=Nt,this.setupRenderTarget=Ft,this.updateRenderTargetMipmap=I,this.updateMultisampleRenderTarget=Kt,this.setupDepthRenderbuffer=st,this.setupFrameBufferTexture=H,this.useMultisampledRTT=zt}function Jd(i,t){function e(n,s=hn){let r;const a=Xt.getTransfer(s);if(n===mn)return i.UNSIGNED_BYTE;if(n===xo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===vo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Uc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Dc)return i.BYTE;if(n===Ic)return i.SHORT;if(n===go)return i.UNSIGNED_SHORT;if(n===_o)return i.INT;if(n===ii)return i.UNSIGNED_INT;if(n===un)return i.FLOAT;if(n===_s)return i.HALF_FLOAT;if(n===Nc)return i.ALPHA;if(n===Fc)return i.RGB;if(n===Xe)return i.RGBA;if(n===Oc)return i.LUMINANCE;if(n===zc)return i.LUMINANCE_ALPHA;if(n===Qn)return i.DEPTH_COMPONENT;if(n===_i)return i.DEPTH_STENCIL;if(n===Bc)return i.RED;if(n===Mo)return i.RED_INTEGER;if(n===Gc)return i.RG;if(n===So)return i.RG_INTEGER;if(n===yo)return i.RGBA_INTEGER;if(n===As||n===ws||n===bs||n===Rs)if(a===jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===As)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ws)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===bs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Rs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===As)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ws)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===bs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Rs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Fr||n===Or||n===zr||n===Br)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Fr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Or)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===zr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Br)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Gr||n===kr||n===Hr)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Gr||n===kr)return a===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Hr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Vr||n===Wr||n===Xr||n===qr||n===Yr||n===Kr||n===$r||n===Zr||n===jr||n===Jr||n===Qr||n===ta||n===ea||n===na)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Vr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Wr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===qr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Yr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Kr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===$r)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Zr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===jr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Jr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Qr)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ta)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ea)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===na)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Cs||n===ia||n===sa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Cs)return a===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ia)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===sa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kc||n===ra||n===aa||n===oa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Cs)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ra)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===aa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===oa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Qd extends Pe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ln extends se{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tp={type:"move"};class er{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const p=e.getJointPose(x,n),u=this._getHandJoint(l,x);p!==null&&(u.matrix.fromArray(p.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=p.radius),u.visible=p!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=h.position.distanceTo(d.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tp)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ln;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const ep=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,np=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ip{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ae,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,s=new gn({vertexShader:ep,fragmentShader:np,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new qt(new Ei(20,20),s)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class sp extends ai{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,f=null,m=null,g=null;const x=new ip,p=e.getContextAttributes();let u=null,T=null;const y=[],E=[],L=new Gt;let b=null;const w=new Pe;w.layers.enable(1),w.viewport=new he;const N=new Pe;N.layers.enable(2),N.viewport=new he;const S=[w,N],_=new Qd;_.layers.enable(1),_.layers.enable(2);let U=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let et=y[H];return et===void 0&&(et=new er,y[H]=et),et.getTargetRaySpace()},this.getControllerGrip=function(H){let et=y[H];return et===void 0&&(et=new er,y[H]=et),et.getGripSpace()},this.getHand=function(H){let et=y[H];return et===void 0&&(et=new er,y[H]=et),et.getHandSpace()};function R(H){const et=E.indexOf(H.inputSource);if(et===-1)return;const ft=y[et];ft!==void 0&&(ft.update(H.inputSource,H.frame,l||a),ft.dispatchEvent({type:H.type,data:H.inputSource}))}function V(){s.removeEventListener("select",R),s.removeEventListener("selectstart",R),s.removeEventListener("selectend",R),s.removeEventListener("squeeze",R),s.removeEventListener("squeezestart",R),s.removeEventListener("squeezeend",R),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",W);for(let H=0;H<y.length;H++){const et=E[H];et!==null&&(E[H]=null,y[H].disconnect(et))}U=null,G=null,x.reset(),t.setRenderTarget(u),m=null,f=null,d=null,s=null,T=null,Yt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(u=t.getRenderTarget(),s.addEventListener("select",R),s.addEventListener("selectstart",R),s.addEventListener("selectend",R),s.addEventListener("squeeze",R),s.addEventListener("squeezestart",R),s.addEventListener("squeezeend",R),s.addEventListener("end",V),s.addEventListener("inputsourceschange",W),p.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(L),s.renderState.layers===void 0){const et={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new Dn(m.framebufferWidth,m.framebufferHeight,{format:Xe,type:mn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let et=null,ft=null,st=null;p.depth&&(st=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=p.stencil?_i:Qn,ft=p.stencil?xi:ii);const Nt={colorFormat:e.RGBA8,depthFormat:st,scaleFactor:r};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(Nt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),T=new Dn(f.textureWidth,f.textureHeight,{format:Xe,type:mn,depthTexture:new Oo(f.textureWidth,f.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Yt.setContext(s),Yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function W(H){for(let et=0;et<H.removed.length;et++){const ft=H.removed[et],st=E.indexOf(ft);st>=0&&(E[st]=null,y[st].disconnect(ft))}for(let et=0;et<H.added.length;et++){const ft=H.added[et];let st=E.indexOf(ft);if(st===-1){for(let Ft=0;Ft<y.length;Ft++)if(Ft>=E.length){E.push(ft),st=Ft;break}else if(E[Ft]===null){E[Ft]=ft,st=Ft;break}if(st===-1)break}const Nt=y[st];Nt&&Nt.connect(ft)}}const j=new D,J=new D;function k(H,et,ft){j.setFromMatrixPosition(et.matrixWorld),J.setFromMatrixPosition(ft.matrixWorld);const st=j.distanceTo(J),Nt=et.projectionMatrix.elements,Ft=ft.projectionMatrix.elements,I=Nt[14]/(Nt[10]-1),$t=Nt[14]/(Nt[10]+1),vt=(Nt[9]+1)/Nt[5],Kt=(Nt[9]-1)/Nt[5],yt=(Nt[8]-1)/Nt[0],zt=(Ft[8]+1)/Ft[0],Lt=I*yt,Bt=I*zt,ee=st/(-yt+zt),A=ee*-yt;et.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(A),H.translateZ(ee),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert();const v=I+ee,B=$t+ee,q=Lt-A,$=Bt+(st-A),Z=vt*$t/B*v,xt=Kt*$t/B*v;H.projectionMatrix.makePerspective(q,$,Z,xt,v,B),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}function tt(H,et){et===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(et.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;x.texture!==null&&(H.near=x.depthNear,H.far=x.depthFar),_.near=N.near=w.near=H.near,_.far=N.far=w.far=H.far,(U!==_.near||G!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),U=_.near,G=_.far,w.near=U,w.far=G,N.near=U,N.far=G,w.updateProjectionMatrix(),N.updateProjectionMatrix(),H.updateProjectionMatrix());const et=H.parent,ft=_.cameras;tt(_,et);for(let st=0;st<ft.length;st++)tt(ft[st],et);ft.length===2?k(_,w,N):_.projectionMatrix.copy(w.projectionMatrix),Q(H,_,et)};function Q(H,et,ft){ft===null?H.matrix.copy(et.matrixWorld):(H.matrix.copy(ft.matrixWorld),H.matrix.invert(),H.matrix.multiply(et.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(et.projectionMatrix),H.projectionMatrixInverse.copy(et.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=hs*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(H){c=H,f!==null&&(f.fixedFoveation=H),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=H)},this.hasDepthSensing=function(){return x.texture!==null};let gt=null;function Ut(H,et){if(h=et.getViewerPose(l||a),g=et,h!==null){const ft=h.views;m!==null&&(t.setRenderTargetFramebuffer(T,m.framebuffer),t.setRenderTarget(T));let st=!1;ft.length!==_.cameras.length&&(_.cameras.length=0,st=!0);for(let Ft=0;Ft<ft.length;Ft++){const I=ft[Ft];let $t=null;if(m!==null)$t=m.getViewport(I);else{const Kt=d.getViewSubImage(f,I);$t=Kt.viewport,Ft===0&&(t.setRenderTargetTextures(T,Kt.colorTexture,f.ignoreDepthValues?void 0:Kt.depthStencilTexture),t.setRenderTarget(T))}let vt=S[Ft];vt===void 0&&(vt=new Pe,vt.layers.enable(Ft),vt.viewport=new he,S[Ft]=vt),vt.matrix.fromArray(I.transform.matrix),vt.matrix.decompose(vt.position,vt.quaternion,vt.scale),vt.projectionMatrix.fromArray(I.projectionMatrix),vt.projectionMatrixInverse.copy(vt.projectionMatrix).invert(),vt.viewport.set($t.x,$t.y,$t.width,$t.height),Ft===0&&(_.matrix.copy(vt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),st===!0&&_.cameras.push(vt)}const Nt=s.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")){const Ft=d.getDepthInformation(ft[0]);Ft&&Ft.isValid&&Ft.texture&&x.init(t,Ft,s.renderState)}}for(let ft=0;ft<y.length;ft++){const st=E[ft],Nt=y[ft];st!==null&&Nt!==void 0&&Nt.update(st,et,l||a)}x.render(t,_),gt&&gt(H,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const Yt=new No;Yt.setAnimationLoop(Ut),this.setAnimationLoop=function(H){gt=H},this.dispose=function(){}}}const Tn=new qe,rp=new te;function ap(i,t){function e(p,u){p.matrixAutoUpdate===!0&&p.updateMatrix(),u.value.copy(p.matrix)}function n(p,u){u.color.getRGB(p.fogColor.value,Do(i)),u.isFog?(p.fogNear.value=u.near,p.fogFar.value=u.far):u.isFogExp2&&(p.fogDensity.value=u.density)}function s(p,u,T,y,E){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(p,u):u.isMeshToonMaterial?(r(p,u),d(p,u)):u.isMeshPhongMaterial?(r(p,u),h(p,u)):u.isMeshStandardMaterial?(r(p,u),f(p,u),u.isMeshPhysicalMaterial&&m(p,u,E)):u.isMeshMatcapMaterial?(r(p,u),g(p,u)):u.isMeshDepthMaterial?r(p,u):u.isMeshDistanceMaterial?(r(p,u),x(p,u)):u.isMeshNormalMaterial?r(p,u):u.isLineBasicMaterial?(a(p,u),u.isLineDashedMaterial&&o(p,u)):u.isPointsMaterial?c(p,u,T,y):u.isSpriteMaterial?l(p,u):u.isShadowMaterial?(p.color.value.copy(u.color),p.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(p,u){p.opacity.value=u.opacity,u.color&&p.diffuse.value.copy(u.color),u.emissive&&p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.bumpMap&&(p.bumpMap.value=u.bumpMap,e(u.bumpMap,p.bumpMapTransform),p.bumpScale.value=u.bumpScale,u.side===Se&&(p.bumpScale.value*=-1)),u.normalMap&&(p.normalMap.value=u.normalMap,e(u.normalMap,p.normalMapTransform),p.normalScale.value.copy(u.normalScale),u.side===Se&&p.normalScale.value.negate()),u.displacementMap&&(p.displacementMap.value=u.displacementMap,e(u.displacementMap,p.displacementMapTransform),p.displacementScale.value=u.displacementScale,p.displacementBias.value=u.displacementBias),u.emissiveMap&&(p.emissiveMap.value=u.emissiveMap,e(u.emissiveMap,p.emissiveMapTransform)),u.specularMap&&(p.specularMap.value=u.specularMap,e(u.specularMap,p.specularMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest);const T=t.get(u),y=T.envMap,E=T.envMapRotation;if(y&&(p.envMap.value=y,Tn.copy(E),Tn.x*=-1,Tn.y*=-1,Tn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Tn.y*=-1,Tn.z*=-1),p.envMapRotation.value.setFromMatrix4(rp.makeRotationFromEuler(Tn)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=u.reflectivity,p.ior.value=u.ior,p.refractionRatio.value=u.refractionRatio),u.lightMap){p.lightMap.value=u.lightMap;const L=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=u.lightMapIntensity*L,e(u.lightMap,p.lightMapTransform)}u.aoMap&&(p.aoMap.value=u.aoMap,p.aoMapIntensity.value=u.aoMapIntensity,e(u.aoMap,p.aoMapTransform))}function a(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform))}function o(p,u){p.dashSize.value=u.dashSize,p.totalSize.value=u.dashSize+u.gapSize,p.scale.value=u.scale}function c(p,u,T,y){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.size.value=u.size*T,p.scale.value=y*.5,u.map&&(p.map.value=u.map,e(u.map,p.uvTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function l(p,u){p.diffuse.value.copy(u.color),p.opacity.value=u.opacity,p.rotation.value=u.rotation,u.map&&(p.map.value=u.map,e(u.map,p.mapTransform)),u.alphaMap&&(p.alphaMap.value=u.alphaMap,e(u.alphaMap,p.alphaMapTransform)),u.alphaTest>0&&(p.alphaTest.value=u.alphaTest)}function h(p,u){p.specular.value.copy(u.specular),p.shininess.value=Math.max(u.shininess,1e-4)}function d(p,u){u.gradientMap&&(p.gradientMap.value=u.gradientMap)}function f(p,u){p.metalness.value=u.metalness,u.metalnessMap&&(p.metalnessMap.value=u.metalnessMap,e(u.metalnessMap,p.metalnessMapTransform)),p.roughness.value=u.roughness,u.roughnessMap&&(p.roughnessMap.value=u.roughnessMap,e(u.roughnessMap,p.roughnessMapTransform)),u.envMap&&(p.envMapIntensity.value=u.envMapIntensity)}function m(p,u,T){p.ior.value=u.ior,u.sheen>0&&(p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),p.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(p.sheenColorMap.value=u.sheenColorMap,e(u.sheenColorMap,p.sheenColorMapTransform)),u.sheenRoughnessMap&&(p.sheenRoughnessMap.value=u.sheenRoughnessMap,e(u.sheenRoughnessMap,p.sheenRoughnessMapTransform))),u.clearcoat>0&&(p.clearcoat.value=u.clearcoat,p.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(p.clearcoatMap.value=u.clearcoatMap,e(u.clearcoatMap,p.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,e(u.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(p.clearcoatNormalMap.value=u.clearcoatNormalMap,e(u.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Se&&p.clearcoatNormalScale.value.negate())),u.dispersion>0&&(p.dispersion.value=u.dispersion),u.iridescence>0&&(p.iridescence.value=u.iridescence,p.iridescenceIOR.value=u.iridescenceIOR,p.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(p.iridescenceMap.value=u.iridescenceMap,e(u.iridescenceMap,p.iridescenceMapTransform)),u.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=u.iridescenceThicknessMap,e(u.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),u.transmission>0&&(p.transmission.value=u.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),u.transmissionMap&&(p.transmissionMap.value=u.transmissionMap,e(u.transmissionMap,p.transmissionMapTransform)),p.thickness.value=u.thickness,u.thicknessMap&&(p.thicknessMap.value=u.thicknessMap,e(u.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=u.attenuationDistance,p.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(p.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(p.anisotropyMap.value=u.anisotropyMap,e(u.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=u.specularIntensity,p.specularColor.value.copy(u.specularColor),u.specularColorMap&&(p.specularColorMap.value=u.specularColorMap,e(u.specularColorMap,p.specularColorMapTransform)),u.specularIntensityMap&&(p.specularIntensityMap.value=u.specularIntensityMap,e(u.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,u){u.matcap&&(p.matcap.value=u.matcap)}function x(p,u){const T=t.get(u).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function op(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,y){const E=y.program;n.uniformBlockBinding(T,E)}function l(T,y){let E=s[T.id];E===void 0&&(g(T),E=h(T),s[T.id]=E,T.addEventListener("dispose",p));const L=y.program;n.updateUBOMapping(T,L);const b=t.render.frame;r[T.id]!==b&&(f(T),r[T.id]=b)}function h(T){const y=d();T.__bindingPointIndex=y;const E=i.createBuffer(),L=T.__size,b=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,L,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,E),E}function d(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){const y=s[T.id],E=T.uniforms,L=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let b=0,w=E.length;b<w;b++){const N=Array.isArray(E[b])?E[b]:[E[b]];for(let S=0,_=N.length;S<_;S++){const U=N[S];if(m(U,b,S,L)===!0){const G=U.__offset,R=Array.isArray(U.value)?U.value:[U.value];let V=0;for(let W=0;W<R.length;W++){const j=R[W],J=x(j);typeof j=="number"||typeof j=="boolean"?(U.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,G+V,U.__data)):j.isMatrix3?(U.__data[0]=j.elements[0],U.__data[1]=j.elements[1],U.__data[2]=j.elements[2],U.__data[3]=0,U.__data[4]=j.elements[3],U.__data[5]=j.elements[4],U.__data[6]=j.elements[5],U.__data[7]=0,U.__data[8]=j.elements[6],U.__data[9]=j.elements[7],U.__data[10]=j.elements[8],U.__data[11]=0):(j.toArray(U.__data,V),V+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(T,y,E,L){const b=T.value,w=y+"_"+E;if(L[w]===void 0)return typeof b=="number"||typeof b=="boolean"?L[w]=b:L[w]=b.clone(),!0;{const N=L[w];if(typeof b=="number"||typeof b=="boolean"){if(N!==b)return L[w]=b,!0}else if(N.equals(b)===!1)return N.copy(b),!0}return!1}function g(T){const y=T.uniforms;let E=0;const L=16;for(let w=0,N=y.length;w<N;w++){const S=Array.isArray(y[w])?y[w]:[y[w]];for(let _=0,U=S.length;_<U;_++){const G=S[_],R=Array.isArray(G.value)?G.value:[G.value];for(let V=0,W=R.length;V<W;V++){const j=R[V],J=x(j),k=E%L;k!==0&&L-k<J.boundary&&(E+=L-k),G.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=E,E+=J.storage}}}const b=E%L;return b>0&&(E+=L-b),T.__size=E,T.__cache={},this}function x(T){const y={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(y.boundary=4,y.storage=4):T.isVector2?(y.boundary=8,y.storage=8):T.isVector3||T.isColor?(y.boundary=16,y.storage=12):T.isVector4?(y.boundary=16,y.storage=16):T.isMatrix3?(y.boundary=48,y.storage=48):T.isMatrix4?(y.boundary=64,y.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),y}function p(T){const y=T.target;y.removeEventListener("dispose",p);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function u(){for(const T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:c,update:l,dispose:u}}class cp{constructor(t={}){const{canvas:e=Qc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),g=new Int32Array(4);let x=null,p=null;const u=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ve,this._useLegacyLights=!1,this.toneMapping=dn,this.toneMappingExposure=1;const y=this;let E=!1,L=0,b=0,w=null,N=-1,S=null;const _=new he,U=new he;let G=null;const R=new It(0);let V=0,W=e.width,j=e.height,J=1,k=null,tt=null;const Q=new he(0,0,W,j),gt=new he(0,0,W,j);let Ut=!1;const Yt=new xr;let H=!1,et=!1;const ft=new te,st=new D,Nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ft(){return w===null?J:1}let I=n;function $t(M,P){return e.getContext(M,P)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${pr}`),e.addEventListener("webglcontextlost",C,!1),e.addEventListener("webglcontextrestored",K,!1),e.addEventListener("webglcontextcreationerror",X,!1),I===null){const P="webgl2";if(I=$t(P,M),I===null)throw $t(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let vt,Kt,yt,zt,Lt,Bt,ee,A,v,B,q,$,Z,xt,ct,ot,Rt,nt,_t,kt,Mt,ut,Ct,Ot;function ie(){vt=new gf(I),vt.init(),ut=new Jd(I,vt),Kt=new hf(I,vt,t,ut),yt=new Zd(I),zt=new vf(I),Lt=new Fd,Bt=new jd(I,vt,yt,Lt,Kt,ut,zt),ee=new ff(y),A=new mf(y),v=new Al(I),Ct=new cf(I,v),B=new _f(I,v,zt,Ct),q=new Sf(I,B,v,zt),_t=new Mf(I,Kt,Bt),ot=new uf(Lt),$=new Nd(y,ee,A,vt,Kt,Ct,ot),Z=new ap(y,Lt),xt=new zd,ct=new Wd(vt),nt=new of(y,ee,A,yt,q,f,c),Rt=new $d(y,q,Kt),Ot=new op(I,zt,Kt,yt),kt=new lf(I,vt,zt),Mt=new xf(I,vt,zt),zt.programs=$.programs,y.capabilities=Kt,y.extensions=vt,y.properties=Lt,y.renderLists=xt,y.shadowMap=Rt,y.state=yt,y.info=zt}ie();const Pt=new sp(y,I);this.xr=Pt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const M=vt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=vt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(M){M!==void 0&&(J=M,this.setSize(W,j,!1))},this.getSize=function(M){return M.set(W,j)},this.setSize=function(M,P,z=!0){if(Pt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=M,j=P,e.width=Math.floor(M*J),e.height=Math.floor(P*J),z===!0&&(e.style.width=M+"px",e.style.height=P+"px"),this.setViewport(0,0,M,P)},this.getDrawingBufferSize=function(M){return M.set(W*J,j*J).floor()},this.setDrawingBufferSize=function(M,P,z){W=M,j=P,J=z,e.width=Math.floor(M*z),e.height=Math.floor(P*z),this.setViewport(0,0,M,P)},this.getCurrentViewport=function(M){return M.copy(_)},this.getViewport=function(M){return M.copy(Q)},this.setViewport=function(M,P,z,F){M.isVector4?Q.set(M.x,M.y,M.z,M.w):Q.set(M,P,z,F),yt.viewport(_.copy(Q).multiplyScalar(J).round())},this.getScissor=function(M){return M.copy(gt)},this.setScissor=function(M,P,z,F){M.isVector4?gt.set(M.x,M.y,M.z,M.w):gt.set(M,P,z,F),yt.scissor(U.copy(gt).multiplyScalar(J).round())},this.getScissorTest=function(){return Ut},this.setScissorTest=function(M){yt.setScissorTest(Ut=M)},this.setOpaqueSort=function(M){k=M},this.setTransparentSort=function(M){tt=M},this.getClearColor=function(M){return M.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor.apply(nt,arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha.apply(nt,arguments)},this.clear=function(M=!0,P=!0,z=!0){let F=0;if(M){let O=!1;if(w!==null){const at=w.texture.format;O=at===yo||at===So||at===Mo}if(O){const at=w.texture.type,dt=at===mn||at===ii||at===go||at===xi||at===xo||at===vo,pt=nt.getClearColor(),St=nt.getClearAlpha(),Et=pt.r,At=pt.g,Dt=pt.b;dt?(m[0]=Et,m[1]=At,m[2]=Dt,m[3]=St,I.clearBufferuiv(I.COLOR,0,m)):(g[0]=Et,g[1]=At,g[2]=Dt,g[3]=St,I.clearBufferiv(I.COLOR,0,g))}else F|=I.COLOR_BUFFER_BIT}P&&(F|=I.DEPTH_BUFFER_BIT),z&&(F|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",C,!1),e.removeEventListener("webglcontextrestored",K,!1),e.removeEventListener("webglcontextcreationerror",X,!1),xt.dispose(),ct.dispose(),Lt.dispose(),ee.dispose(),A.dispose(),q.dispose(),Ct.dispose(),Ot.dispose(),$.dispose(),Pt.dispose(),Pt.removeEventListener("sessionstart",Wt),Pt.removeEventListener("sessionend",He),ve.stop()};function C(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function K(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const M=zt.autoReset,P=Rt.enabled,z=Rt.autoUpdate,F=Rt.needsUpdate,O=Rt.type;ie(),zt.autoReset=M,Rt.enabled=P,Rt.autoUpdate=z,Rt.needsUpdate=F,Rt.type=O}function X(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function rt(M){const P=M.target;P.removeEventListener("dispose",rt),ht(P)}function ht(M){Ht(M),Lt.remove(M)}function Ht(M){const P=Lt.get(M).programs;P!==void 0&&(P.forEach(function(z){$.releaseProgram(z)}),M.isShaderMaterial&&$.releaseShaderCache(M))}this.renderBufferDirect=function(M,P,z,F,O,at){P===null&&(P=Nt);const dt=O.isMesh&&O.matrixWorld.determinant()<0,pt=qo(M,P,z,F,O);yt.setMaterial(F,dt);let St=z.index,Et=1;if(F.wireframe===!0){if(St=B.getWireframeAttribute(z),St===void 0)return;Et=2}const At=z.drawRange,Dt=z.attributes.position;let re=At.start*Et,de=(At.start+At.count)*Et;at!==null&&(re=Math.max(re,at.start*Et),de=Math.min(de,(at.start+at.count)*Et)),St!==null?(re=Math.max(re,0),de=Math.min(de,St.count)):Dt!=null&&(re=Math.max(re,0),de=Math.min(de,Dt.count));const we=de-re;if(we<0||we===1/0)return;Ct.setup(O,F,pt,z,St);let Ye,Vt=kt;if(St!==null&&(Ye=v.get(St),Vt=Mt,Vt.setIndex(Ye)),O.isMesh)F.wireframe===!0?(yt.setLineWidth(F.wireframeLinewidth*Ft()),Vt.setMode(I.LINES)):Vt.setMode(I.TRIANGLES);else if(O.isLine){let Tt=F.linewidth;Tt===void 0&&(Tt=1),yt.setLineWidth(Tt*Ft()),O.isLineSegments?Vt.setMode(I.LINES):O.isLineLoop?Vt.setMode(I.LINE_LOOP):Vt.setMode(I.LINE_STRIP)}else O.isPoints?Vt.setMode(I.POINTS):O.isSprite&&Vt.setMode(I.TRIANGLES);if(O.isBatchedMesh)O._multiDrawInstances!==null?Vt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances):Vt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)Vt.renderInstances(re,we,O.count);else if(z.isInstancedBufferGeometry){const Tt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,ci=Math.min(z.instanceCount,Tt);Vt.renderInstances(re,we,ci)}else Vt.render(re,we)};function Zt(M,P,z){M.transparent===!0&&M.side===tn&&M.forceSinglePass===!1?(M.side=Se,M.needsUpdate=!0,bi(M,P,z),M.side=pn,M.needsUpdate=!0,bi(M,P,z),M.side=tn):bi(M,P,z)}this.compile=function(M,P,z=null){z===null&&(z=M),p=ct.get(z),p.init(P),T.push(p),z.traverseVisible(function(O){O.isLight&&O.layers.test(P.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),M!==z&&M.traverseVisible(function(O){O.isLight&&O.layers.test(P.layers)&&(p.pushLight(O),O.castShadow&&p.pushShadow(O))}),p.setupLights(y._useLegacyLights);const F=new Set;return M.traverse(function(O){const at=O.material;if(at)if(Array.isArray(at))for(let dt=0;dt<at.length;dt++){const pt=at[dt];Zt(pt,z,O),F.add(pt)}else Zt(at,z,O),F.add(at)}),T.pop(),p=null,F},this.compileAsync=function(M,P,z=null){const F=this.compile(M,P,z);return new Promise(O=>{function at(){if(F.forEach(function(dt){Lt.get(dt).currentProgram.isReady()&&F.delete(dt)}),F.size===0){O(M);return}setTimeout(at,10)}vt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let ne=null;function fe(M){ne&&ne(M)}function Wt(){ve.stop()}function He(){ve.start()}const ve=new No;ve.setAnimationLoop(fe),typeof self<"u"&&ve.setContext(self),this.setAnimationLoop=function(M){ne=M,Pt.setAnimationLoop(M),M===null?ve.stop():ve.start()},Pt.addEventListener("sessionstart",Wt),Pt.addEventListener("sessionend",He),this.render=function(M,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),Pt.enabled===!0&&Pt.isPresenting===!0&&(Pt.cameraAutoUpdate===!0&&Pt.updateCamera(P),P=Pt.getCamera()),M.isScene===!0&&M.onBeforeRender(y,M,P,w),p=ct.get(M,T.length),p.init(P),T.push(p),ft.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),Yt.setFromProjectionMatrix(ft),et=this.localClippingEnabled,H=ot.init(this.clippingPlanes,et),x=xt.get(M,u.length),x.init(),u.push(x),Tr(M,P,0,y.sortObjects),x.finish(),y.sortObjects===!0&&x.sort(k,tt);const z=Pt.enabled===!1||Pt.isPresenting===!1||Pt.hasDepthSensing()===!1;z&&nt.addToRenderList(x,M),this.info.render.frame++,H===!0&&ot.beginShadows();const F=p.state.shadowsArray;Rt.render(F,M,P),H===!0&&ot.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=x.opaque,at=x.transmissive;if(p.setupLights(y._useLegacyLights),P.isArrayCamera){const dt=P.cameras;if(at.length>0)for(let pt=0,St=dt.length;pt<St;pt++){const Et=dt[pt];wr(O,at,M,Et)}z&&nt.render(M);for(let pt=0,St=dt.length;pt<St;pt++){const Et=dt[pt];Ar(x,M,Et,Et.viewport)}}else at.length>0&&wr(O,at,M,P),z&&nt.render(M),Ar(x,M,P);w!==null&&(Bt.updateMultisampleRenderTarget(w),Bt.updateRenderTargetMipmap(w)),M.isScene===!0&&M.onAfterRender(y,M,P),Ct.resetDefaultState(),N=-1,S=null,T.pop(),T.length>0?(p=T[T.length-1],H===!0&&ot.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,u.pop(),u.length>0?x=u[u.length-1]:x=null};function Tr(M,P,z,F){if(M.visible===!1)return;if(M.layers.test(P.layers)){if(M.isGroup)z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(P);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Yt.intersectsSprite(M)){F&&st.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ft);const dt=q.update(M),pt=M.material;pt.visible&&x.push(M,dt,pt,z,st.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Yt.intersectsObject(M))){const dt=q.update(M),pt=M.material;if(F&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),st.copy(M.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),st.copy(dt.boundingSphere.center)),st.applyMatrix4(M.matrixWorld).applyMatrix4(ft)),Array.isArray(pt)){const St=dt.groups;for(let Et=0,At=St.length;Et<At;Et++){const Dt=St[Et],re=pt[Dt.materialIndex];re&&re.visible&&x.push(M,dt,re,z,st.z,Dt)}}else pt.visible&&x.push(M,dt,pt,z,st.z,null)}}const at=M.children;for(let dt=0,pt=at.length;dt<pt;dt++)Tr(at[dt],P,z,F)}function Ar(M,P,z,F){const O=M.opaque,at=M.transmissive,dt=M.transparent;p.setupLightsView(z),H===!0&&ot.setGlobalState(y.clippingPlanes,z),F&&yt.viewport(_.copy(F)),O.length>0&&wi(O,P,z),at.length>0&&wi(at,P,z),dt.length>0&&wi(dt,P,z),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function wr(M,P,z,F){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[F.id]===void 0&&(p.state.transmissionRenderTarget[F.id]=new Dn(1,1,{generateMipmaps:!0,type:vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float")?_s:mn,minFilter:Pn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1}));const at=p.state.transmissionRenderTarget[F.id],dt=F.viewport||_;at.setSize(dt.z,dt.w);const pt=y.getRenderTarget();y.setRenderTarget(at),y.getClearColor(R),V=y.getClearAlpha(),V<1&&y.setClearColor(16777215,.5),y.clear();const St=y.toneMapping;y.toneMapping=dn;const Et=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),p.setupLightsView(F),H===!0&&ot.setGlobalState(y.clippingPlanes,F),wi(M,z,F),Bt.updateMultisampleRenderTarget(at),Bt.updateRenderTargetMipmap(at),vt.has("WEBGL_multisampled_render_to_texture")===!1){let At=!1;for(let Dt=0,re=P.length;Dt<re;Dt++){const de=P[Dt],we=de.object,Ye=de.geometry,Vt=de.material,Tt=de.group;if(Vt.side===tn&&we.layers.test(F.layers)){const ci=Vt.side;Vt.side=Se,Vt.needsUpdate=!0,br(we,z,F,Ye,Vt,Tt),Vt.side=ci,Vt.needsUpdate=!0,At=!0}}At===!0&&(Bt.updateMultisampleRenderTarget(at),Bt.updateRenderTargetMipmap(at))}y.setRenderTarget(pt),y.setClearColor(R,V),Et!==void 0&&(F.viewport=Et),y.toneMapping=St}function wi(M,P,z){const F=P.isScene===!0?P.overrideMaterial:null;for(let O=0,at=M.length;O<at;O++){const dt=M[O],pt=dt.object,St=dt.geometry,Et=F===null?dt.material:F,At=dt.group;pt.layers.test(z.layers)&&br(pt,P,z,St,Et,At)}}function br(M,P,z,F,O,at){M.onBeforeRender(y,P,z,F,O,at),M.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),O.onBeforeRender(y,P,z,F,M,at),O.transparent===!0&&O.side===tn&&O.forceSinglePass===!1?(O.side=Se,O.needsUpdate=!0,y.renderBufferDirect(z,P,F,O,M,at),O.side=pn,O.needsUpdate=!0,y.renderBufferDirect(z,P,F,O,M,at),O.side=tn):y.renderBufferDirect(z,P,F,O,M,at),M.onAfterRender(y,P,z,F,O,at)}function bi(M,P,z){P.isScene!==!0&&(P=Nt);const F=Lt.get(M),O=p.state.lights,at=p.state.shadowsArray,dt=O.state.version,pt=$.getParameters(M,O.state,at,P,z),St=$.getProgramCacheKey(pt);let Et=F.programs;F.environment=M.isMeshStandardMaterial?P.environment:null,F.fog=P.fog,F.envMap=(M.isMeshStandardMaterial?A:ee).get(M.envMap||F.environment),F.envMapRotation=F.environment!==null&&M.envMap===null?P.environmentRotation:M.envMapRotation,Et===void 0&&(M.addEventListener("dispose",rt),Et=new Map,F.programs=Et);let At=Et.get(St);if(At!==void 0){if(F.currentProgram===At&&F.lightsStateVersion===dt)return Cr(M,pt),At}else pt.uniforms=$.getUniforms(M),M.onBuild(z,pt,y),M.onBeforeCompile(pt,y),At=$.acquireProgram(pt,St),Et.set(St,At),F.uniforms=pt.uniforms;const Dt=F.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Dt.clippingPlanes=ot.uniform),Cr(M,pt),F.needsLights=Ko(M),F.lightsStateVersion=dt,F.needsLights&&(Dt.ambientLightColor.value=O.state.ambient,Dt.lightProbe.value=O.state.probe,Dt.directionalLights.value=O.state.directional,Dt.directionalLightShadows.value=O.state.directionalShadow,Dt.spotLights.value=O.state.spot,Dt.spotLightShadows.value=O.state.spotShadow,Dt.rectAreaLights.value=O.state.rectArea,Dt.ltc_1.value=O.state.rectAreaLTC1,Dt.ltc_2.value=O.state.rectAreaLTC2,Dt.pointLights.value=O.state.point,Dt.pointLightShadows.value=O.state.pointShadow,Dt.hemisphereLights.value=O.state.hemi,Dt.directionalShadowMap.value=O.state.directionalShadowMap,Dt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Dt.spotShadowMap.value=O.state.spotShadowMap,Dt.spotLightMatrix.value=O.state.spotLightMatrix,Dt.spotLightMap.value=O.state.spotLightMap,Dt.pointShadowMap.value=O.state.pointShadowMap,Dt.pointShadowMatrix.value=O.state.pointShadowMatrix),F.currentProgram=At,F.uniformsList=null,At}function Rr(M){if(M.uniformsList===null){const P=M.currentProgram.getUniforms();M.uniformsList=ss.seqWithValue(P.seq,M.uniforms)}return M.uniformsList}function Cr(M,P){const z=Lt.get(M);z.outputColorSpace=P.outputColorSpace,z.batching=P.batching,z.instancing=P.instancing,z.instancingColor=P.instancingColor,z.instancingMorph=P.instancingMorph,z.skinning=P.skinning,z.morphTargets=P.morphTargets,z.morphNormals=P.morphNormals,z.morphColors=P.morphColors,z.morphTargetsCount=P.morphTargetsCount,z.numClippingPlanes=P.numClippingPlanes,z.numIntersection=P.numClipIntersection,z.vertexAlphas=P.vertexAlphas,z.vertexTangents=P.vertexTangents,z.toneMapping=P.toneMapping}function qo(M,P,z,F,O){P.isScene!==!0&&(P=Nt),Bt.resetTextureUnits();const at=P.fog,dt=F.isMeshStandardMaterial?P.environment:null,pt=w===null?y.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:_n,St=(F.isMeshStandardMaterial?A:ee).get(F.envMap||dt),Et=F.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,At=!!z.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Dt=!!z.morphAttributes.position,re=!!z.morphAttributes.normal,de=!!z.morphAttributes.color;let we=dn;F.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(we=y.toneMapping);const Ye=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Vt=Ye!==void 0?Ye.length:0,Tt=Lt.get(F),ci=p.state.lights;if(H===!0&&(et===!0||M!==S)){const Ie=M===S&&F.id===N;ot.setState(F,M,Ie)}let Jt=!1;F.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==ci.state.version||Tt.outputColorSpace!==pt||O.isBatchedMesh&&Tt.batching===!1||!O.isBatchedMesh&&Tt.batching===!0||O.isInstancedMesh&&Tt.instancing===!1||!O.isInstancedMesh&&Tt.instancing===!0||O.isSkinnedMesh&&Tt.skinning===!1||!O.isSkinnedMesh&&Tt.skinning===!0||O.isInstancedMesh&&Tt.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Tt.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Tt.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Tt.instancingMorph===!1&&O.morphTexture!==null||Tt.envMap!==St||F.fog===!0&&Tt.fog!==at||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==ot.numPlanes||Tt.numIntersection!==ot.numIntersection)||Tt.vertexAlphas!==Et||Tt.vertexTangents!==At||Tt.morphTargets!==Dt||Tt.morphNormals!==re||Tt.morphColors!==de||Tt.toneMapping!==we||Tt.morphTargetsCount!==Vt)&&(Jt=!0):(Jt=!0,Tt.__version=F.version);let xn=Tt.currentProgram;Jt===!0&&(xn=bi(F,P,O));let Pr=!1,li=!1,Ss=!1;const pe=xn.getUniforms(),nn=Tt.uniforms;if(yt.useProgram(xn.program)&&(Pr=!0,li=!0,Ss=!0),F.id!==N&&(N=F.id,li=!0),Pr||S!==M){pe.setValue(I,"projectionMatrix",M.projectionMatrix),pe.setValue(I,"viewMatrix",M.matrixWorldInverse);const Ie=pe.map.cameraPosition;Ie!==void 0&&Ie.setValue(I,st.setFromMatrixPosition(M.matrixWorld)),Kt.logarithmicDepthBuffer&&pe.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&pe.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,li=!0,Ss=!0)}if(O.isSkinnedMesh){pe.setOptional(I,O,"bindMatrix"),pe.setOptional(I,O,"bindMatrixInverse");const Ie=O.skeleton;Ie&&(Ie.boneTexture===null&&Ie.computeBoneTexture(),pe.setValue(I,"boneTexture",Ie.boneTexture,Bt))}O.isBatchedMesh&&(pe.setOptional(I,O,"batchingTexture"),pe.setValue(I,"batchingTexture",O._matricesTexture,Bt));const ys=z.morphAttributes;if((ys.position!==void 0||ys.normal!==void 0||ys.color!==void 0)&&_t.update(O,z,xn),(li||Tt.receiveShadow!==O.receiveShadow)&&(Tt.receiveShadow=O.receiveShadow,pe.setValue(I,"receiveShadow",O.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(nn.envMap.value=St,nn.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&P.environment!==null&&(nn.envMapIntensity.value=P.environmentIntensity),li&&(pe.setValue(I,"toneMappingExposure",y.toneMappingExposure),Tt.needsLights&&Yo(nn,Ss),at&&F.fog===!0&&Z.refreshFogUniforms(nn,at),Z.refreshMaterialUniforms(nn,F,J,j,p.state.transmissionRenderTarget[M.id]),ss.upload(I,Rr(Tt),nn,Bt)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(ss.upload(I,Rr(Tt),nn,Bt),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&pe.setValue(I,"center",O.center),pe.setValue(I,"modelViewMatrix",O.modelViewMatrix),pe.setValue(I,"normalMatrix",O.normalMatrix),pe.setValue(I,"modelMatrix",O.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const Ie=F.uniformsGroups;for(let Es=0,$o=Ie.length;Es<$o;Es++){const Lr=Ie[Es];Ot.update(Lr,xn),Ot.bind(Lr,xn)}}return xn}function Yo(M,P){M.ambientLightColor.needsUpdate=P,M.lightProbe.needsUpdate=P,M.directionalLights.needsUpdate=P,M.directionalLightShadows.needsUpdate=P,M.pointLights.needsUpdate=P,M.pointLightShadows.needsUpdate=P,M.spotLights.needsUpdate=P,M.spotLightShadows.needsUpdate=P,M.rectAreaLights.needsUpdate=P,M.hemisphereLights.needsUpdate=P}function Ko(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(M,P,z){Lt.get(M.texture).__webglTexture=P,Lt.get(M.depthTexture).__webglTexture=z;const F=Lt.get(M);F.__hasExternalTextures=!0,F.__autoAllocateDepthBuffer=z===void 0,F.__autoAllocateDepthBuffer||vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),F.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,P){const z=Lt.get(M);z.__webglFramebuffer=P,z.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(M,P=0,z=0){w=M,L=P,b=z;let F=!0,O=null,at=!1,dt=!1;if(M){const St=Lt.get(M);St.__useDefaultFramebuffer!==void 0?(yt.bindFramebuffer(I.FRAMEBUFFER,null),F=!1):St.__webglFramebuffer===void 0?Bt.setupRenderTarget(M):St.__hasExternalTextures&&Bt.rebindTextures(M,Lt.get(M.texture).__webglTexture,Lt.get(M.depthTexture).__webglTexture);const Et=M.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(dt=!0);const At=Lt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(At[P])?O=At[P][z]:O=At[P],at=!0):M.samples>0&&Bt.useMultisampledRTT(M)===!1?O=Lt.get(M).__webglMultisampledFramebuffer:Array.isArray(At)?O=At[z]:O=At,_.copy(M.viewport),U.copy(M.scissor),G=M.scissorTest}else _.copy(Q).multiplyScalar(J).floor(),U.copy(gt).multiplyScalar(J).floor(),G=Ut;if(yt.bindFramebuffer(I.FRAMEBUFFER,O)&&F&&yt.drawBuffers(M,O),yt.viewport(_),yt.scissor(U),yt.setScissorTest(G),at){const St=Lt.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+P,St.__webglTexture,z)}else if(dt){const St=Lt.get(M.texture),Et=P||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,St.__webglTexture,z||0,Et)}N=-1},this.readRenderTargetPixels=function(M,P,z,F,O,at,dt){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=Lt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&dt!==void 0&&(pt=pt[dt]),pt){yt.bindFramebuffer(I.FRAMEBUFFER,pt);try{const St=M.texture,Et=St.format,At=St.type;if(!Kt.textureFormatReadable(Et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Kt.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=M.width-F&&z>=0&&z<=M.height-O&&I.readPixels(P,z,F,O,ut.convert(Et),ut.convert(At),at)}finally{const St=w!==null?Lt.get(w).__webglFramebuffer:null;yt.bindFramebuffer(I.FRAMEBUFFER,St)}}},this.copyFramebufferToTexture=function(M,P,z=0){const F=Math.pow(2,-z),O=Math.floor(P.image.width*F),at=Math.floor(P.image.height*F);Bt.setTexture2D(P,0),I.copyTexSubImage2D(I.TEXTURE_2D,z,0,0,M.x,M.y,O,at),yt.unbindTexture()},this.copyTextureToTexture=function(M,P,z,F=0){const O=P.image.width,at=P.image.height,dt=ut.convert(z.format),pt=ut.convert(z.type);Bt.setTexture2D(z,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,z.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,z.unpackAlignment),P.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,F,M.x,M.y,O,at,dt,pt,P.image.data):P.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,F,M.x,M.y,P.mipmaps[0].width,P.mipmaps[0].height,dt,P.mipmaps[0].data):I.texSubImage2D(I.TEXTURE_2D,F,M.x,M.y,dt,pt,P.image),F===0&&z.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),yt.unbindTexture()},this.copyTextureToTexture3D=function(M,P,z,F,O=0){const at=M.max.x-M.min.x,dt=M.max.y-M.min.y,pt=M.max.z-M.min.z,St=ut.convert(F.format),Et=ut.convert(F.type);let At;if(F.isData3DTexture)Bt.setTexture3D(F,0),At=I.TEXTURE_3D;else if(F.isDataArrayTexture||F.isCompressedArrayTexture)Bt.setTexture2DArray(F,0),At=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const Dt=I.getParameter(I.UNPACK_ROW_LENGTH),re=I.getParameter(I.UNPACK_IMAGE_HEIGHT),de=I.getParameter(I.UNPACK_SKIP_PIXELS),we=I.getParameter(I.UNPACK_SKIP_ROWS),Ye=I.getParameter(I.UNPACK_SKIP_IMAGES),Vt=z.isCompressedTexture?z.mipmaps[O]:z.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,Vt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Vt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,M.min.x),I.pixelStorei(I.UNPACK_SKIP_ROWS,M.min.y),I.pixelStorei(I.UNPACK_SKIP_IMAGES,M.min.z),z.isDataTexture||z.isData3DTexture?I.texSubImage3D(At,O,P.x,P.y,P.z,at,dt,pt,St,Et,Vt.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(At,O,P.x,P.y,P.z,at,dt,pt,St,Vt.data):I.texSubImage3D(At,O,P.x,P.y,P.z,at,dt,pt,St,Et,Vt),I.pixelStorei(I.UNPACK_ROW_LENGTH,Dt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,re),I.pixelStorei(I.UNPACK_SKIP_PIXELS,de),I.pixelStorei(I.UNPACK_SKIP_ROWS,we),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ye),O===0&&F.generateMipmaps&&I.generateMipmap(At),yt.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?Bt.setTextureCube(M,0):M.isData3DTexture?Bt.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Bt.setTexture2DArray(M,0):Bt.setTexture2D(M,0),yt.unbindTexture()},this.resetState=function(){L=0,b=0,w=null,yt.reset(),Ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return en}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===mr?"display-p3":"srgb",e.unpackColorSpace=Xt.workingColorSpace===xs?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Mr{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new It(t),this.near=e,this.far=n}clone(){return new Mr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class lp extends se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qe,this.environmentIntensity=1,this.environmentRotation=new qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Vo extends In{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new It(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const fs=new D,ds=new D,Ja=new te,mi=new gr,Zi=new yi,nr=new D,Qa=new D;class hp extends se{constructor(t=new De,e=new Vo){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)fs.fromBufferAttribute(e,s-1),ds.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=fs.distanceTo(ds);t.setAttribute("lineDistance",new xe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zi.copy(n.boundingSphere),Zi.applyMatrix4(s),Zi.radius+=r,t.ray.intersectsSphere(Zi)===!1)return;Ja.copy(s).invert(),mi.copy(t.ray).applyMatrix4(Ja);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=m,p=g-1;x<p;x+=l){const u=h.getX(x),T=h.getX(x+1),y=ji(this,t,mi,c,u,T);y&&e.push(y)}if(this.isLineLoop){const x=h.getX(g-1),p=h.getX(m),u=ji(this,t,mi,c,x,p);u&&e.push(u)}}else{const m=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let x=m,p=g-1;x<p;x+=l){const u=ji(this,t,mi,c,x,x+1);u&&e.push(u)}if(this.isLineLoop){const x=ji(this,t,mi,c,g-1,m);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ji(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(fs.fromBufferAttribute(a,s),ds.fromBufferAttribute(a,r),e.distanceSqToSegment(fs,ds,nr,Qa)>n)return;nr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(nr);if(!(c<t.near||c>t.far))return{distance:c,point:Qa.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,object:i}}const to=new D,eo=new D;class up extends hp{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)to.fromBufferAttribute(e,s),eo.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+to.distanceTo(eo);t.setAttribute("lineDistance",new xe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Wo extends In{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const no=new te,dr=new gr,Ji=new yi,Qi=new D;class fp extends se{constructor(t=new De,e=new Wo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ji.copy(n.boundingSphere),Ji.applyMatrix4(s),Ji.radius+=r,t.ray.intersectsSphere(Ji)===!1)return;no.copy(s).invert(),dr.copy(t.ray).applyMatrix4(no);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let g=f,x=m;g<x;g++){const p=l.getX(g);Qi.fromBufferAttribute(d,p),io(Qi,p,c,s,t,e,this)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let g=f,x=m;g<x;g++)Qi.fromBufferAttribute(d,g),io(Qi,g,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function io(i,t,e,n,s,r,a){const o=dr.distanceSqToPoint(i);if(o<e){const c=new D;dr.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,object:a})}}class Ti extends De{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],f=[],m=[];let g=0;const x=[],p=n/2;let u=0;T(),a===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new xe(d,3)),this.setAttribute("normal",new xe(f,3)),this.setAttribute("uv",new xe(m,2));function T(){const E=new D,L=new D;let b=0;const w=(e-t)/n;for(let N=0;N<=r;N++){const S=[],_=N/r,U=_*(e-t)+t;for(let G=0;G<=s;G++){const R=G/s,V=R*c+o,W=Math.sin(V),j=Math.cos(V);L.x=U*W,L.y=-_*n+p,L.z=U*j,d.push(L.x,L.y,L.z),E.set(W,w,j).normalize(),f.push(E.x,E.y,E.z),m.push(R,1-_),S.push(g++)}x.push(S)}for(let N=0;N<s;N++)for(let S=0;S<r;S++){const _=x[S][N],U=x[S+1][N],G=x[S+1][N+1],R=x[S][N+1];h.push(_,U,R),h.push(U,G,R),b+=6}l.addGroup(u,b,0),u+=b}function y(E){const L=g,b=new Gt,w=new D;let N=0;const S=E===!0?t:e,_=E===!0?1:-1;for(let G=1;G<=s;G++)d.push(0,p*_,0),f.push(0,_,0),m.push(.5,.5),g++;const U=g;for(let G=0;G<=s;G++){const V=G/s*c+o,W=Math.cos(V),j=Math.sin(V);w.x=S*j,w.y=p*_,w.z=S*W,d.push(w.x,w.y,w.z),f.push(0,_,0),b.x=W*.5+.5,b.y=j*.5*_+.5,m.push(b.x,b.y),g++}for(let G=0;G<s;G++){const R=L+G,V=U+G;E===!0?h.push(V,V+1,R):h.push(V+1,V,R),N+=3}l.addGroup(u,N,E===!0?1:2),u+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ti(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Sr extends Ti{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new Sr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const ts=new D,es=new D,ir=new D,ns=new Ge;class dp extends De{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(is*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],d=new Array(3),f={},m=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:x,b:p,c:u}=ns;if(x.fromBufferAttribute(o,l[0]),p.fromBufferAttribute(o,l[1]),u.fromBufferAttribute(o,l[2]),ns.getNormal(ir),d[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,d[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,d[2]=`${Math.round(u.x*s)},${Math.round(u.y*s)},${Math.round(u.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let T=0;T<3;T++){const y=(T+1)%3,E=d[T],L=d[y],b=ns[h[T]],w=ns[h[y]],N=`${E}_${L}`,S=`${L}_${E}`;S in f&&f[S]?(ir.dot(f[S].normal)<=r&&(m.push(b.x,b.y,b.z),m.push(w.x,w.y,w.z)),f[S]=null):N in f||(f[N]={index0:l[T],index1:l[y],normal:ir.clone()})}}for(const g in f)if(f[g]){const{index0:x,index1:p}=f[g];ts.fromBufferAttribute(o,x),es.fromBufferAttribute(o,p),m.push(ts.x,ts.y,ts.z),m.push(es.x,es.y,es.z)}this.setAttribute("position",new xe(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Ms extends De{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new D,f=new D,m=[],g=[],x=[],p=[];for(let u=0;u<=n;u++){const T=[],y=u/n;let E=0;u===0&&a===0?E=.5/e:u===n&&c===Math.PI&&(E=-.5/e);for(let L=0;L<=e;L++){const b=L/e;d.x=-t*Math.cos(s+b*r)*Math.sin(a+y*o),d.y=t*Math.cos(a+y*o),d.z=t*Math.sin(s+b*r)*Math.sin(a+y*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),p.push(b+E,1-y),T.push(l++)}h.push(T)}for(let u=0;u<n;u++)for(let T=0;T<e;T++){const y=h[u][T+1],E=h[u][T],L=h[u+1][T],b=h[u+1][T+1];(u!==0||a>0)&&m.push(y,E,b),(u!==n-1||c<Math.PI)&&m.push(E,L,b)}this.setIndex(m),this.setAttribute("position",new xe(g,3)),this.setAttribute("normal",new xe(x,3)),this.setAttribute("uv",new xe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ms(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Le extends In{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Eo,this.normalScale=new Gt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ai extends se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class pp extends Ai{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const sr=new te,so=new D,ro=new D;class Xo{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Gt(512,512),this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new xr,this._frameExtents=new Gt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;so.setFromMatrixPosition(t.matrixWorld),e.position.copy(so),ro.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ro),e.updateMatrixWorld(),sr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class mp extends Xo{constructor(){super(new Pe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=hs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class ao extends Ai{constructor(t,e,n=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(se.DEFAULT_UP),this.updateMatrix(),this.target=new se,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new mp}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class gp extends Xo{constructor(){super(new Fo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _p extends Ai{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(se.DEFAULT_UP),this.updateMatrix(),this.target=new se,this.shadow=new gp}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class xp extends Ai{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:pr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=pr);const ue=class ue{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}clone(){return new ue(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}add(t){return new ue(this.x+t.x,this.y+t.y,this.z+t.z)}sub(t){return new ue(this.x-t.x,this.y-t.y,this.z-t.z)}multiplyScalar(t){return new ue(this.x*t,this.y*t,this.z*t)}divideScalar(t){return t===0?new ue(0,0,0):new ue(this.x/t,this.y/t,this.z/t)}addInPlace(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}subInPlace(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}scaleInPlace(t){return this.x*=t,this.y*=t,this.z*=t,this}addScaledInPlace(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}normalize(){const t=this.length();return t===0?new ue(0,0,0):this.divideScalar(t)}normalizeInPlace(){const t=this.length();return t===0?(this.set(0,0,0),this):(this.x/=t,this.y/=t,this.z/=t,this)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}cross(t){return new ue(this.y*t.z-this.z*t.y,this.z*t.x-this.x*t.z,this.x*t.y-this.y*t.x)}lerp(t,e){return new ue(this.x+(t.x-this.x)*e,this.y+(t.y-this.y)*e,this.z+(t.z-this.z)*e)}distanceTo(t){return this.sub(t).length()}};ue.ZERO=new ue(0,0,0),ue.UP=new ue(0,1,0),ue.FORWARD=new ue(0,0,-1);let mt=ue;const _e=class _e{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}clone(){return new _e(this.x,this.y,this.z,this.w)}multiply(t){return new _e(this.w*t.x+this.x*t.w+this.y*t.z-this.z*t.y,this.w*t.y-this.x*t.z+this.y*t.w+this.z*t.x,this.w*t.z+this.x*t.y-this.y*t.x+this.z*t.w,this.w*t.w-this.x*t.x-this.y*t.y-this.z*t.z)}static fromAxisAngle(t,e){const n=e*.5,s=Math.sin(n),r=Math.cos(n),a=t.normalize();return new _e(a.x*s,a.y*s,a.z*s,r)}static fromEulerYXZ(t,e,n){const s=_e.fromAxisAngle(mt.UP,t),r=_e.fromAxisAngle(new mt(1,0,0),e);return _e.fromAxisAngle(new mt(0,0,1),n).multiply(r).multiply(s)}rotateVector(t){const e=new _e(t.x,t.y,t.z,0),n=new _e(-this.x,-this.y,-this.z,this.w),s=this.multiply(e).multiply(n);return new mt(s.x,s.y,s.z)}slerp(t,e){let n=this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w,s=t.x,r=t.y,a=t.z,o=t.w;if(n<0&&(n=-n,s=-s,r=-r,a=-a,o=-o),n>.9995)return new _e(this.x+e*(s-this.x),this.y+e*(r-this.y),this.z+e*(a-this.z),this.w+e*(o-this.w)).normalize();const c=Math.acos(n),l=Math.sin(c),h=Math.sin((1-e)*c)/l,d=Math.sin(e*c)/l;return new _e(h*this.x+d*s,h*this.y+d*r,h*this.z+d*a,h*this.w+d*o).normalize()}normalize(){const t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?new _e(0,0,0,1):new _e(this.x/t,this.y/t,this.z/t,this.w/t)}toEuler(){const t=2*(this.w*this.y-this.z*this.x);let e;Math.abs(t)>=1?e=Math.sign(t)*Math.PI/2:e=Math.asin(t);const n=Math.atan2(2*(this.w*this.x+this.y*this.z),1-2*(this.x*this.x+this.y*this.y)),s=Math.atan2(2*(this.w*this.z+this.x*this.y),1-2*(this.y*this.y+this.z*this.z));return{yaw:n,pitch:e,roll:s}}};_e.IDENTITY=new _e(0,0,0,1);let ps=_e;function rr(i,t,e){return Math.max(t,Math.min(e,i))}function oo(i,t,e){return i+(t-i)*e}var lt=(i=>(i.Asphalt="asphalt",i.Dirt="dirt",i.Ice="ice",i.Grass="grass",i.Plastic="plastic",i.None="none",i))(lt||{}),Y=(i=>(i.None="none",i.Booster="booster",i.EngineOff="engine_off",i.Fragile="fragile",i.NoSteer="no_steer",i.NoBrake="no_brake",i.Start="start",i.Finish="finish",i.Checkpoint="checkpoint",i))(Y||{});const ms={asphalt:{grip:.95,drag:.002,rollingResist:.01,color:4473924},dirt:{grip:.55,drag:.008,rollingResist:.03,color:9136404},ice:{grip:.08,drag:.001,rollingResist:.002,color:11197951},grass:{grip:.75,drag:.012,rollingResist:.05,color:2980397},plastic:{grip:.35,drag:.005,rollingResist:.02,color:16737996},none:{grip:0,drag:0,rollingResist:0,color:0}},vp={maxSpeed:300,acceleration:30,brakeForce:45,steeringSpeed:4,steeringSpeedHigh:2,mass:1200,downforceCoeff:.3,bodyLength:4.2,bodyWidth:2,bodyHeight:1.2};class Mp{constructor(){this.position=new mt(0,1,0),this.velocity=new mt(0,0,0),this.rotation=ps.IDENTITY.clone(),this.yaw=0,this.pitch=0,this.roll=0,this.steeringAngle=0,this.speed=0,this.isAirborne=!1,this.isDrifting=!1,this.currentSurface="asphalt",this.currentEffect="none",this.isBoosting=!1,this.boostTimer=0,this.isEngineOff=!1,this.engineOffTimer=0,this.isFragile=!1,this.fragileTimer=0,this.isNoSteer=!1,this.noSteerTimer=0,this.isNoBrake=!1,this.noBrakeTimer=0,this.wetTiresTimer=0,this.isAccelerating=!1,this.isBraking=!1,this.forward=new mt(0,0,-1),this.right=new mt(1,0,0),this.up=new mt(0,1,0),this.checkpointProgress=0,this.surfaceNormal=new mt(0,1,0),this.isBroken=!1,this.brokenSteerOffset=0}}class Sp{constructor(t=vp){this.gravity=-20,this.config=t,this.state=new Mp}reset(t,e=0){this.state.position=t.clone(),this.state.velocity=mt.ZERO.clone(),this.state.yaw=e,this.state.pitch=0,this.state.roll=0,this.state.steeringAngle=0,this.state.speed=0,this.state.isAirborne=!1,this.state.isDrifting=!1,this.state.isBoosting=!1,this.state.boostTimer=0,this.state.isEngineOff=!1,this.state.engineOffTimer=0,this.state.isFragile=!1,this.state.fragileTimer=0,this.state.isNoSteer=!1,this.state.noSteerTimer=0,this.state.isNoBrake=!1,this.state.noBrakeTimer=0,this.state.wetTiresTimer=0,this.state.isBroken=!1,this.state.brokenSteerOffset=0,this.state.checkpointProgress=0,this.state.currentSurface="asphalt",this.state.currentEffect="none",this.state.surfaceNormal=new mt(0,1,0),this.updateDerivedVectors()}updateDerivedVectors(){this.state.rotation=ps.fromEulerYXZ(this.state.yaw,this.state.pitch,this.state.roll),this.state.forward=this.state.rotation.rotateVector(new mt(0,0,-1)),this.state.right=this.state.rotation.rotateVector(new mt(1,0,0)),this.state.up=this.state.rotation.rotateVector(new mt(0,1,0))}update(t,e,n){const s=this.state,r=this.config,a=n(s.position);s.currentSurface=s.isAirborne?"none":a.surface,s.currentEffect=a.effect,this.processBlockEffects(t,a.effect);let o=e.steerInput,c=e.accelerate,l=e.brake;s.isNoSteer&&(o=0),s.isNoBrake&&(l=!1),s.isEngineOff&&(c=!1),s.isBroken&&(o+=s.brokenSteerOffset),this.updateDerivedVectors(),s.speed=s.velocity.dot(s.forward);const h=Math.abs(s.speed)/(r.maxSpeed/3.6),d=oo(r.steeringSpeed,r.steeringSpeedHigh,rr(h,0,1)),f=o;if(s.steeringAngle=oo(s.steeringAngle,f,rr(6*t,0,1)),Math.abs(s.speed)>.5){const E=s.speed>=0?1:-1;s.yaw+=s.steeringAngle*d*E*t}this.updateDerivedVectors();const m=ms[s.currentSurface]||ms.asphalt;let g=m.grip,x=m.drag,p=m.rollingResist;if(s.wetTiresTimer>0&&(g*=.4,s.wetTiresTimer-=t),s.currentSurface==="plastic"&&(s.wetTiresTimer=2),c){if(!s.isAirborne||s.speed>5){const E=s.isBoosting?r.acceleration*2.5:r.acceleration,L=s.isAirborne?.3:1;s.velocity.addScaledInPlace(s.forward,E*L*t)}s.isAccelerating=!0}else s.isAccelerating=!1;if(l)if(s.isBraking=!0,s.isAirborne)s.pitch-=2.5*t;else{const E=Math.abs(s.speed)>1?r.brakeForce:r.brakeForce*Math.abs(s.speed),L=s.speed>=0?-1:1;s.velocity.addScaledInPlace(s.forward,E*L*t)}else s.isBraking=!1;if(!s.isAirborne){const E=s.velocity.dot(s.right),L=g*14,b=rr(L*t,0,1),w=E*(1-b);s.velocity.addScaledInPlace(s.right,w-E),s.isDrifting=Math.abs(E)>1.5}const u=new mt(0,this.gravity*t,0);s.velocity.addInPlace(u);const T=s.velocity.length();if(T>.001){const E=x*T*t,L=s.velocity.normalize().multiplyScalar(-E);s.velocity.addInPlace(L)}if(!s.isAirborne&&Math.abs(s.speed)>.1){const E=p*s.speed*t;s.velocity.addScaledInPlace(s.forward,-E)}if(!c&&!s.isAirborne&&Math.abs(s.speed)>.5){const E=3*t;s.velocity.addScaledInPlace(s.forward,-Math.sign(s.speed)*E)}const y=r.maxSpeed/3.6;s.velocity.length()>y&&s.velocity.normalizeInPlace().scaleInPlace(y),s.position.addScaledInPlace(s.velocity,t),s.velocity.y>1&&(s.isAirborne=!0),s.isAirborne?(s.pitch*=1-3*t,s.roll*=1-4*t):(s.pitch*=1-10*t,s.roll*=1-10*t),s.speed=s.velocity.dot(s.forward),this.updateDerivedVectors()}processBlockEffects(t,e){const n=this.state;if(n.boostTimer>0&&(n.boostTimer-=t,n.boostTimer<=0&&(n.isBoosting=!1)),n.engineOffTimer>0&&(n.engineOffTimer-=t,n.engineOffTimer<=0&&(n.isEngineOff=!1)),n.fragileTimer>0&&(n.fragileTimer-=t,n.fragileTimer<=0&&(n.isFragile=!1,n.isBroken=!1,n.brokenSteerOffset=0)),n.noSteerTimer>0&&(n.noSteerTimer-=t,n.noSteerTimer<=0&&(n.isNoSteer=!1)),n.noBrakeTimer>0&&(n.noBrakeTimer-=t,n.noBrakeTimer<=0&&(n.isNoBrake=!1)),e==="booster"&&(n.isBoosting=!0,n.boostTimer=.4,n.velocity.addScaledInPlace(n.forward,30)),e==="engine_off"&&(n.isEngineOff=!0,n.engineOffTimer=3),e==="fragile"&&(n.isFragile=!0,n.fragileTimer=5),e==="no_steer"&&(n.isNoSteer=!0,n.noSteerTimer=1),e==="no_brake"&&(n.isNoBrake=!0,n.noBrakeTimer=1),n.isFragile&&!n.isBroken){const s=n.velocity.dot(n.right);Math.abs(s)>5&&(n.isBroken=!0,n.brokenSteerOffset=(Math.random()-.5)*.5)}}getSpeedKmh(){return Math.abs(this.state.speed)*3.6}}class yp{constructor(){this.keys=new Map,this.justPressed=new Map,this.prevKeys=new Map,this.accelerate=!1,this.brake=!1,this.steerLeft=!1,this.steerRight=!1,this.restart=!1,this.restartJustPressed=!1,this.boundKeyDown=this.onKeyDown.bind(this),this.boundKeyUp=this.onKeyUp.bind(this),window.addEventListener("keydown",this.boundKeyDown),window.addEventListener("keyup",this.boundKeyUp)}onKeyDown(t){this.keys.set(t.code,!0),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","KeyW","KeyA","KeyS","KeyD"].includes(t.code)&&t.preventDefault()}onKeyUp(t){this.keys.set(t.code,!1)}update(){this.prevKeys=new Map(this.justPressed),this.accelerate=!!(this.keys.get("ArrowUp")||this.keys.get("KeyW")),this.brake=!!(this.keys.get("ArrowDown")||this.keys.get("KeyS")),this.steerLeft=!!(this.keys.get("ArrowLeft")||this.keys.get("KeyA")),this.steerRight=!!(this.keys.get("ArrowRight")||this.keys.get("KeyD")),this.restart=!!this.keys.get("KeyR"),this.restartJustPressed=this.restart&&!this.prevKeys.get("KeyR"),this.pollGamepad()}pollGamepad(){var e,n,s,r;const t=((e=navigator.getGamepads)==null?void 0:e.call(navigator))??[];for(const a of t){if(!a)continue;const o=a.axes.length>4?a.axes[5]:((n=a.buttons[7])==null?void 0:n.value)??0,c=a.axes.length>4?a.axes[4]:((s=a.buttons[6])==null?void 0:s.value)??0;o>.2&&(this.accelerate=!0),c>.2&&(this.brake=!0);const l=a.axes[0]??0;l<-.2&&(this.steerLeft=!0),l>.2&&(this.steerRight=!0),(r=a.buttons[0])!=null&&r.pressed&&(this.restart=!0,this.prevKeys.get("gp_restart")||(this.restartJustPressed=!0))}}destroy(){window.removeEventListener("keydown",this.boundKeyDown),window.removeEventListener("keyup",this.boundKeyUp)}}class Ep{constructor(){this.ctx=null,this.masterGain=null,this.engineOsc=null,this.engineGain=null,this.surfaceNoiseNode=null,this.surfaceGain=null,this.initialized=!1}async init(){if(!this.initialized)try{this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.ctx.destination),this.surfaceGain=this.ctx.createGain(),this.surfaceGain.gain.value=0,this.surfaceGain.connect(this.masterGain),this.initialized=!0,this.engineOsc=this.ctx.createOscillator(),this.engineOsc.type="sawtooth",this.engineOsc.frequency.value=80,this.engineGain=this.ctx.createGain(),this.engineGain.gain.value=.15;const t=this.ctx.createBiquadFilter();t.type="lowpass",t.frequency.value=800,this.engineOsc.connect(t),t.connect(this.engineGain),this.engineGain.connect(this.masterGain),this.engineOsc.start()}catch{console.warn("Audio initialization failed")}}updateEngine(t,e){if(!this.engineOsc||!this.engineGain||!this.ctx)return;const n=60+t*300,s=e?n*1.15:n*.85;this.engineOsc.frequency.setTargetAtTime(s,this.ctx.currentTime,.05);const r=.08+t*.15;this.engineGain.gain.setTargetAtTime(r,this.ctx.currentTime,.05)}setSurfaceNoise(t,e){if(!this.surfaceGain||!this.ctx)return;const n=e*.1;this.surfaceGain.gain.setTargetAtTime(n,this.ctx.currentTime,.1)}playCheckpoint(){if(!this.ctx||!this.masterGain)return;const t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="sine",t.frequency.value=880,e.gain.value=.3,e.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),t.connect(e),e.connect(this.masterGain),t.start(),t.stop(this.ctx.currentTime+.5)}playFinish(){if(!this.ctx||!this.masterGain)return;[523.25,659.25,783.99,1046.5].forEach((e,n)=>{const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.value=e,r.gain.value=.3,r.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5+n*.15),s.connect(r),r.connect(this.masterGain);const a=this.ctx.currentTime+n*.15;s.start(a),s.stop(a+.5)})}playBoost(){if(!this.ctx||!this.masterGain)return;const t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="sawtooth",t.frequency.value=200,t.frequency.exponentialRampToValueAtTime(800,this.ctx.currentTime+.3),e.gain.value=.2,e.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+.5),t.connect(e),e.connect(this.masterGain),t.start(),t.stop(this.ctx.currentTime+.5)}playCrash(){if(!this.ctx||!this.masterGain)return;const t=this.ctx.sampleRate*.3,e=this.ctx.createBuffer(1,t,this.ctx.sampleRate),n=e.getChannelData(0);for(let a=0;a<t;a++)n[a]=(Math.random()*2-1)*Math.exp(-a/(t*.1));const s=this.ctx.createBufferSource();s.buffer=e;const r=this.ctx.createGain();r.gain.value=.3,s.connect(r),r.connect(this.masterGain),s.start()}destroy(){var t,e;(t=this.engineOsc)==null||t.stop(),(e=this.ctx)==null||e.close()}}class Tp{constructor(t){this.scene=t,this.wheelMeshes=[],this.headlightMeshes=[],this.taillightMeshes=[],this.steerAngle=0,this.group=new Ln,this.createCarModel(),this.scene.add(this.group)}createCarModel(){const t=new Te(2,.8,4.2);this.bodyMat=new Le({color:26367,metalness:.8,roughness:.2});const e=new qt(t,this.bodyMat);e.position.y=.4,e.castShadow=!0,this.group.add(e);const n=new Te(1.6,.5,2),s=new Le({color:2236996,metalness:.5,roughness:.1,transparent:!0,opacity:.7}),r=new qt(n,s);r.position.y=1.05,r.position.z=-.2,this.group.add(r);const a=new Te(1.8,.08,.4),o=new Le({color:17612,metalness:.5,roughness:.3}),c=new qt(a,o);c.position.y=1.4,c.position.z=1.8,this.group.add(c);const l=new Te(.08,.4,.08),h=new qt(l,o);h.position.set(-.7,1.2,1.8),this.group.add(h);const d=new qt(l,o);d.position.set(.7,1.2,1.8),this.group.add(d);const f=new Ti(.35,.35,.3,12),m=new Le({color:1118481,roughness:.6}),g=[{x:-1.1,y:.35,z:-1.3},{x:1.1,y:.35,z:-1.3},{x:-1.1,y:.35,z:1.3},{x:1.1,y:.35,z:1.3}];for(const S of g){const _=new qt(f,m);_.rotation.z=Math.PI/2,_.position.set(S.x,S.y,S.z),_.castShadow=!0,this.group.add(_),this.wheelMeshes.push(_)}const x=new Ms(.15,8,8),p=new Le({color:16777215,emissive:16777130,emissiveIntensity:.8}),u=new qt(x,p);u.position.set(-.7,.6,-2.1),this.group.add(u),this.headlightMeshes.push(u);const T=new qt(x,p);T.position.set(.7,.6,-2.1),this.group.add(T),this.headlightMeshes.push(T);const y=new Te(.3,.15,.05),E=new Le({color:16711680,emissive:16711680,emissiveIntensity:.3}),L=new qt(y,E);L.position.set(-.7,.6,2.1),this.group.add(L),this.taillightMeshes.push(L);const b=new qt(y,E);b.position.set(.7,.6,2.1),this.group.add(b),this.taillightMeshes.push(b);const w=new ao(16777164,5,30,Math.PI/6,.5);w.position.set(-.7,.6,-2.1),w.target.position.set(-.7,0,-15),this.group.add(w),this.group.add(w.target);const N=new ao(16777164,5,30,Math.PI/6,.5);N.position.set(.7,.6,-2.1),N.target.position.set(.7,0,-15),this.group.add(N),this.group.add(N.target)}update(t,e){this.group.position.set(t.position.x,t.position.y,t.position.z),this.group.quaternion.set(t.rotation.x,t.rotation.y,t.rotation.z,t.rotation.w);const n=t.speed*3;for(const s of this.wheelMeshes)s.rotation.x+=n*e;t.isBoosting?(this.bodyMat.emissive.setHex(16746496),this.bodyMat.emissiveIntensity=.5):t.isEngineOff?(this.bodyMat.emissive.setHex(3342336),this.bodyMat.emissiveIntensity=.3):t.isFragile?(this.bodyMat.emissive.setHex(16738740),this.bodyMat.emissiveIntensity=.2):(this.bodyMat.emissive.setHex(0),this.bodyMat.emissiveIntensity=0);for(const s of this.taillightMeshes){const r=s.material;r.emissiveIntensity=t.isBraking?1:.3}this.steerAngle+=(t.steeringAngle*.5-this.steerAngle)*10*e,this.wheelMeshes[0].rotation.y=this.steerAngle,this.wheelMeshes[1].rotation.y=this.steerAngle}createGhost(){return new Ap(this.scene)}setPosition(t){this.group.position.set(t.x,t.y,t.z)}dispose(){this.scene.remove(this.group)}}class Ap{constructor(t){this.scene=t,this.group=new Ln,this.createGhostModel(),this.scene.add(this.group)}createGhostModel(){const t=new Te(2,.8,4.2),e=new Le({color:16777215,transparent:!0,opacity:.15,depthWrite:!1}),n=new qt(t,e);n.position.y=.4,this.group.add(n);const s=new Te(1.6,.5,2),r=new Le({color:8956620,transparent:!0,opacity:.1,depthWrite:!1}),a=new qt(s,r);a.position.y=1.05,a.position.z=-.2,this.group.add(a)}update(t,e){this.group.position.set(t.x,t.y,t.z),this.group.quaternion.set(e.x,e.y,e.z,e.w)}setVisible(t){this.group.visible=t}dispose(){this.scene.remove(this.group)}}var Qt=(i=>(i.Menu="menu",i.Countdown="countdown",i.Racing="racing",i.Finished="finished",i.Paused="paused",i))(Qt||{});class Ce{constructor(){this.state="menu",this.raceTime=0,this.bestTime=null,this.checkpointTimes=[],this.nextCheckpoint=0,this.totalCheckpoints=0,this.lapCount=0,this.medalTimes={bronze:60,silver:45,gold:35,author:30},this.countdownValue=3,this.countdownTimer=0,this.currentSurface=lt.Asphalt,this.currentEffect=Y.None,this.maxSpeed=0,this.currentSpeedKmh=0}reset(){this.raceTime=0,this.checkpointTimes=[],this.nextCheckpoint=0,this.lapCount=0,this.maxSpeed=0,this.currentSpeedKmh=0,this.currentSurface=lt.Asphalt,this.currentEffect=Y.None}startCountdown(){this.state="countdown",this.countdownValue=3,this.countdownTimer=0}updateCountdown(t){return this.countdownTimer+=t,this.countdownTimer>=1&&(this.countdownValue--,this.countdownTimer=0,this.countdownValue<0)?(this.state="racing",!0):!1}checkCheckpoint(t){return t===this.nextCheckpoint?(this.checkpointTimes.push(this.raceTime),this.nextCheckpoint++,!0):!1}finish(){return this.state="finished",(this.bestTime===null||this.raceTime<this.bestTime)&&(this.bestTime=this.raceTime),this.getMedal(this.raceTime)}getMedal(t){return t<=this.medalTimes.author?"author":t<=this.medalTimes.gold?"gold":t<=this.medalTimes.silver?"silver":t<=this.medalTimes.bronze?"bronze":"none"}static formatTime(t){const e=Math.floor(t/60),n=t%60,s=Math.floor(n),r=Math.floor((n-s)*1e3);return`${e}:${s.toString().padStart(2,"0")}.${r.toString().padStart(3,"0")}`}static getMedalDisplay(t){switch(t){case"author":return{name:"★ AUTHOR ★",color:"#FFD700"};case"gold":return{name:"🥇 GOLD",color:"#FFD700"};case"silver":return{name:"🥈 SILVER",color:"#C0C0C0"};case"bronze":return{name:"🥉 BRONZE",color:"#CD7F32"};default:return{name:"",color:"#FFFFFF"}}}}class wp{constructor(t){this.mode="chase",this.smoothPosition=new mt(0,5,10),this.smoothLookAt=new mt(0,0,0),this.configs={chase:{offset:new mt(0,4,10),lookAhead:8,smoothness:4,fov:70},far:{offset:new mt(0,8,18),lookAhead:12,smoothness:3,fov:60},top:{offset:new mt(0,25,5),lookAhead:5,smoothness:5,fov:50}},this.camera=t}update(t,e,n){const s=this.configs[this.mode],r=t.position,a=t.forward,o=new mt(r.x-a.x*s.offset.z+t.up.x*s.offset.y,r.y-a.y*s.offset.z+t.up.y*s.offset.y,r.z-a.z*s.offset.z+t.up.z*s.offset.y),c=new mt(r.x+a.x*s.lookAhead,r.y+a.y*s.lookAhead+1,r.z+a.z*s.lookAhead),l=1-Math.exp(-s.smoothness*e);if(this.smoothPosition=this.smoothPosition.lerp(o,l),this.smoothLookAt=this.smoothLookAt.lerp(c,l),this.camera.position.set(this.smoothPosition.x,this.smoothPosition.y,this.smoothPosition.z),this.camera.lookAt(this.smoothLookAt.x,this.smoothLookAt.y,this.smoothLookAt.z),this.camera.fov+=(s.fov-this.camera.fov)*l,this.camera.updateProjectionMatrix(),n===Qt.Racing){const h=Math.min(t.speed*.5,15);this.camera.fov+=h*l,this.camera.updateProjectionMatrix()}}resetToCar(t){const e=this.configs[this.mode],n=t.position,s=t.forward;this.smoothPosition=new mt(n.x-s.x*e.offset.z+t.up.x*e.offset.y,n.y-s.y*e.offset.z+t.up.y*e.offset.y,n.z-s.z*e.offset.z+t.up.z*e.offset.y),this.smoothLookAt=new mt(n.x+s.x*e.lookAhead,n.y+s.y*e.lookAhead+1,n.z+s.z*e.lookAhead)}cycleMode(){const t=["chase","far","top"],e=t.indexOf(this.mode);return this.mode=t[(e+1)%t.length],this.mode}setMode(t){this.mode=t}getMode(){return this.mode}}class bp{constructor(){this.recording=[],this.isRecording=!1,this.startTime=0,this.recordInterval=.05,this.lastRecordTime=0,this.bestGhost=null,this.playbackIndex=0,this.playbackTime=0}startRecording(t){this.recording=[],this.isRecording=!0,this.startTime=t,this.lastRecordTime=-1}recordFrame(t,e,n,s){if(!this.isRecording)return;const r=t-this.startTime;r-this.lastRecordTime<this.recordInterval||(this.lastRecordTime=r,this.recording.push({time:r,position:e.clone(),rotation:{x:n.x,y:n.y,z:n.z,w:n.w},speed:s}))}stopRecording(t){return this.isRecording=!1,this.recording.length===0?null:((!this.bestGhost||t<this.getLastTime())&&(this.bestGhost=[...this.recording]),this.recording)}cancelRecording(){this.isRecording=!1,this.recording=[]}getPlaybackPosition(t){if(!this.bestGhost||this.bestGhost.length===0)return null;let e=this.bestGhost[0],n=this.bestGhost[0];for(let a=1;a<this.bestGhost.length;a++){if(this.bestGhost[a].time>t){n=this.bestGhost[a];break}e=this.bestGhost[a],n=this.bestGhost[a]}const s=n.time===e.time?0:(t-e.time)/(n.time-e.time);return{position:e.position.lerp(n.position,s),rotation:e.rotation,speed:e.speed}}getBestTime(){return!this.bestGhost||this.bestGhost.length===0?null:this.getLastTime()}getLastTime(){var t;return((t=this.recording[this.recording.length-1])==null?void 0:t.time)??1/0}hasGhost(){return this.bestGhost!==null&&this.bestGhost.length>0}}const Rp={[lt.Asphalt]:"Asphalt",[lt.Dirt]:"Dirt",[lt.Ice]:"Ice",[lt.Grass]:"Grass",[lt.Plastic]:"Wet/Plastic",[lt.None]:"---"},Cp={[Y.None]:"",[Y.Booster]:"🚀 BOOST!",[Y.EngineOff]:"⚠️ ENGINE OFF",[Y.Fragile]:"💀 FRAGILE",[Y.NoSteer]:"🔒 NO STEERING",[Y.NoBrake]:"🔓 NO BRAKES",[Y.Start]:"",[Y.Finish]:"",[Y.Checkpoint]:"✓ CHECKPOINT"};class Pp{constructor(t,e){this.container=t,this.audioSystem=e,this.createUI()}createUI(){const t=document.createElement("style");t.textContent=`
      .fm-ui { position: absolute; font-family: 'Segoe UI', Arial, sans-serif; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); }
      .fm-speed { top: 20px; right: 20px; font-size: 48px; font-weight: bold; }
      .fm-speed-unit { font-size: 20px; vertical-align: super; }
      .fm-timer { top: 20px; left: 50%; transform: translateX(-50%); font-size: 36px; font-weight: bold; font-variant-numeric: tabular-nums; }
      .fm-surface { bottom: 20px; left: 20px; font-size: 20px; }
      .fm-effect { top: 70px; left: 50%; transform: translateX(-50%); font-size: 28px; font-weight: bold; animation: fm-pulse 0.5s ease-in-out infinite; }
      .fm-countdown { top: 40%; left: 50%; transform: translate(-50%, -50%); font-size: 120px; font-weight: 900; }
      .fm-medal { top: 30%; left: 50%; transform: translateX(-50%); text-align: center; font-size: 48px; }
      .fm-medal-time { font-size: 36px; margin-top: 10px; }
      .fm-ghost-time { top: 60px; left: 50%; transform: translateX(-50%); font-size: 18px; opacity: 0.7; }
      .fm-controls { bottom: 20px; right: 20px; font-size: 14px; opacity: 0.6; text-align: right; line-height: 1.6; }
      .fm-track-name { top: 20px; left: 20px; font-size: 18px; opacity: 0.8; }
      .fm-menu { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.85); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 100; }
      .fm-menu h1 { font-size: 72px; margin: 0; background: linear-gradient(135deg, #FFD700, #FF6600); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: none; }
      .fm-menu h2 { font-size: 24px; margin: 10px 0 30px; opacity: 0.7; }
      .fm-menu button { background: linear-gradient(135deg, #0066FF, #0044CC); color: white; border: none; padding: 15px 40px; font-size: 22px; font-weight: bold; border-radius: 10px; cursor: pointer; margin: 8px; transition: transform 0.1s, box-shadow 0.2s; }
      .fm-menu button:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(0,102,255,0.5); }
      .fm-medal-times { font-size: 16px; opacity: 0.6; margin-top: 20px; text-align: center; line-height: 1.8; }
      .fm-menu .controls-info { font-size: 14px; opacity: 0.5; margin-top: 30px; text-align: center; line-height: 1.8; }
      .fm-medal-popup { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 64px; font-weight: 900; pointer-events: none; animation: fm-appear 0.5s ease-out; }
      @keyframes fm-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes fm-appear { 0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; } 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; } }
    `,document.head.appendChild(t),this.speedDisplay=this.createElement("fm-ui fm-speed"),this.container.appendChild(this.speedDisplay),this.timerDisplay=this.createElement("fm-ui fm-timer"),this.container.appendChild(this.timerDisplay),this.surfaceDisplay=this.createElement("fm-ui fm-surface"),this.container.appendChild(this.surfaceDisplay),this.effectDisplay=this.createElement("fm-ui fm-effect"),this.container.appendChild(this.effectDisplay),this.countdownDisplay=this.createElement("fm-ui fm-countdown"),this.countdownDisplay.style.display="none",this.container.appendChild(this.countdownDisplay),this.medalDisplay=this.createElement("fm-ui fm-medal"),this.medalDisplay.style.display="none",this.container.appendChild(this.medalDisplay),this.ghostTimeDisplay=this.createElement("fm-ui fm-ghost-time"),this.container.appendChild(this.ghostTimeDisplay),this.controlsDisplay=this.createElement("fm-ui fm-controls"),this.controlsDisplay.innerHTML="W/↑ Accelerate<br>S/↓ Brake<br>A/← Steer Left<br>D/→ Steer Right<br>R Restart<br>ESC Menu",this.container.appendChild(this.controlsDisplay),this.trackNameDisplay=this.createElement("fm-ui fm-track-name"),this.container.appendChild(this.trackNameDisplay),this.medalTimesDisplay=this.createElement("fm-ui fm-medal-times"),this.medalTimesDisplay.style.cssText="position:absolute; top:50px; left:20px; font-size:14px; opacity:0.5;",this.container.appendChild(this.medalTimesDisplay),this.menuOverlay=document.createElement("div"),this.menuOverlay.className="fm-menu",this.menuOverlay.innerHTML=`
      <h1>FLASHMANIA</h1>
      <h2>Time Trial Racing</h2>
      <div id="fm-track-select">
        <button id="fm-track-0" data-track="0">Beginner's Loop</button>
        <button id="fm-track-1" data-track="1">Speed Valley</button>
        <button id="fm-track-2" data-track="2">Ice Mountain</button>
      </div>
      <div class="fm-medal-times" id="fm-menu-medal-times"></div>
      <div class="controls-info">
        W/↑ Accelerate · S/↓ Brake · A/← Steer Left · D/→ Steer Right<br>
        R Restart · ESC Menu
      </div>
    `,this.container.appendChild(this.menuOverlay)}createElement(t){const e=document.createElement("div");return e.className=t,e}update(t){var c,l;const e=t;this.speedDisplay.textContent=`${Math.round(e.currentSpeedKmh)}`,this.speedDisplay.innerHTML+='<span class="fm-speed-unit">km/h</span>',e.currentSpeedKmh>250?this.speedDisplay.style.color="#FF4444":e.currentSpeedKmh>150?this.speedDisplay.style.color="#FFAA00":this.speedDisplay.style.color="#FFFFFF",this.timerDisplay.textContent=Ce.formatTime(e.raceTime);const n=Rp[e.currentSurface]||"---",s=e.currentSurface!==lt.None?"#"+((l=(c=ms[e.currentSurface])==null?void 0:c.color)==null?void 0:l.toString(16).padStart(6,"0")):"#666666";this.surfaceDisplay.innerHTML=`Surface: <span style="color:${s}">${n}</span>`;const r=Cp[e.currentEffect];this.effectDisplay.textContent=r,this.effectDisplay.style.display=r?"block":"none",e.currentEffect===Y.Booster?this.effectDisplay.style.color="#FFD700":e.currentEffect===Y.EngineOff?this.effectDisplay.style.color="#FF4444":e.currentEffect===Y.Fragile?this.effectDisplay.style.color="#FF69B4":e.currentEffect===Y.NoSteer?this.effectDisplay.style.color="#00FFFF":e.currentEffect===Y.NoBrake?this.effectDisplay.style.color="#FF6600":e.currentEffect===Y.Checkpoint&&(this.effectDisplay.style.color="#44FF44"),e.state===Qt.Countdown?(this.countdownDisplay.style.display="block",this.countdownDisplay.textContent=e.countdownValue>0?String(e.countdownValue):"GO!",this.countdownDisplay.style.color=e.countdownValue>0?"#FFFFFF":"#00FF00"):this.countdownDisplay.style.display="none";const a=e.medalTimes;if(this.medalTimesDisplay.innerHTML=`
      🥇 Gold: ${Ce.formatTime(a.gold)}<br>
      🥈 Silver: ${Ce.formatTime(a.silver)}<br>
      🥉 Bronze: ${Ce.formatTime(a.bronze)}<br>
      ★ Author: ${Ce.formatTime(a.author)}
    `,this.menuOverlay.style.display=e.state===Qt.Menu?"flex":"none",e.state===Qt.Finished){const h=e.getMedal(e.raceTime),d=Ce.getMedalDisplay(h);this.medalDisplay.style.display="block",this.medalDisplay.innerHTML=`
        <div style="color:${d.color}">${d.name}</div>
        <div class="fm-medal-time">${Ce.formatTime(e.raceTime)}</div>
        <div style="font-size:20px; margin-top:30px; opacity:0.7">Press R to restart · ESC for menu</div>
      `}else this.medalDisplay.style.display="none";const o=document.getElementById("fm-menu-medal-times");o&&(o.innerHTML=`
        🥇 Gold: ${Ce.formatTime(a.gold)} · 
        🥈 Silver: ${Ce.formatTime(a.silver)} · 
        🥉 Bronze: ${Ce.formatTime(a.bronze)} · 
        ★ Author: ${Ce.formatTime(a.author)}
      `)}onTrackSelect(t){this.menuOverlay.querySelectorAll("button[data-track]").forEach(n=>{n.addEventListener("click",()=>{var s;t(parseInt(((s=n.dataset)==null?void 0:s.track)??"0"))})})}showEffectPopup(t,e){const n=this.createElement("fm-medal-popup");n.textContent=t,n.style.color=e,this.container.appendChild(n),setTimeout(()=>n.remove(),1e3)}}const co={[Y.Booster]:16766720,[Y.EngineOff]:16711680,[Y.Fragile]:16738740,[Y.NoSteer]:65535,[Y.NoBrake]:16729344,[Y.Start]:65280,[Y.Finish]:16716947,[Y.Checkpoint]:16777215},Lp=.3;class Dp{constructor(){this.meshes=[],this.collisionBoxes=[]}build(t){const e=new Ln;this.meshes=[],this.collisionBoxes=[];for(const n of t.blocks){const s=this.createBlockMesh(n);for(const r of s)e.add(r),this.meshes.push(r);this.addCollisionBox(n)}return e}getCollisionBoxes(){return this.collisionBoxes}addCollisionBox(t){const e=t.scale.x*.5,n=t.scale.y*.5,s=t.scale.z*.5,r=t.position,a=Math.sin(t.rotation),o=Math.cos(t.rotation),c=t.pitch??0,l=t.roll??0,h=Math.abs(Math.sin(c))*s+Math.abs(Math.sin(l))*e,d=Math.abs(e*o)+Math.abs(s*a)+2,f=Math.abs(e*a)+Math.abs(s*o)+2;this.collisionBoxes.push({min:new mt(r.x-d,r.y-n-h,r.z-f),max:new mt(r.x+d,r.y+n+h+1,r.z+f),surface:t.surface,effect:t.effect})}createBlockMesh(t){var d;const e=[],n=new Te(t.scale.x,t.scale.y,t.scale.z);let s=((d=ms[t.surface])==null?void 0:d.color)??6710886;t.effect&&co[t.effect]&&(s=co[t.effect]);const r=t.effect===Y.Checkpoint,a=new Le({color:s,roughness:t.surface===lt.Ice?.1:t.surface===lt.Plastic?.3:.7,metalness:t.surface===lt.Ice?.8:.1,transparent:r,opacity:r?Lp:1}),o=new qt(n,a);o.position.set(t.position.x,t.position.y,t.position.z),o.rotation.y=t.rotation,t.pitch&&(o.rotation.x=t.pitch),t.roll&&(o.rotation.z=t.roll);const c=new dp(n),l=new Vo({color:0,transparent:!0,opacity:.3}),h=new up(c,l);if(h.position.copy(o.position),h.rotation.copy(o.rotation),e.push(o),e.push(h),t.effect===Y.Booster){const f=new Sr(.5,2,4),m=new Le({color:16766720,emissive:16746496,emissiveIntensity:.5}),g=new qt(f,m);g.position.set(t.position.x,t.position.y+t.scale.y*.5+1,t.position.z),g.rotation.z=-Math.PI/2,e.push(g)}if(t.effect===Y.Start||t.effect===Y.Finish||t.effect===Y.Checkpoint){const f=t.effect===Y.Start?65280:t.effect===Y.Finish?16716947:4474111,m=5,g=new Ti(.15,.15,m,6),x=new Le({color:f,emissive:f,emissiveIntensity:.3}),p=new qt(g,x);p.position.set(t.position.x-t.scale.x*.5,t.position.y+m*.5,t.position.z),e.push(p);const u=new qt(g,x);u.position.set(t.position.x+t.scale.x*.5,t.position.y+m*.5,t.position.z),e.push(u);const T=new Te(t.scale.x,.2,.2),y=new Le({color:f,emissive:f,emissiveIntensity:.3}),E=new qt(T,y);E.position.set(t.position.x,t.position.y+m,t.position.z),e.push(E)}return e}}function lo(i,t){let e=lt.None,n=Y.None,s=-1/0;for(const r of t)i.x>=r.min.x-1.5&&i.x<=r.max.x+1.5&&i.z>=r.min.z-1.5&&i.z<=r.max.z+1.5&&i.y>=r.min.y-.5&&i.y<=r.max.y+1.5&&r.max.y>s&&r.max.y<=i.y+1.5&&(s=r.max.y,e=r.surface,n=r.effect);return e===lt.None&&i.y<1.5&&(e=lt.Asphalt),{surface:e,effect:n}}const ri=8;lt.Asphalt,lt.Asphalt,lt.Asphalt,lt.Dirt,lt.Ice,lt.Grass,lt.Plastic,lt.Asphalt,lt.Asphalt,lt.Asphalt,Y.Booster,lt.Asphalt,Y.EngineOff,lt.Asphalt,Y.Fragile,lt.Asphalt,Y.NoSteer,lt.Asphalt,Y.NoBrake,lt.Asphalt,Y.Start,lt.Asphalt,Y.Finish,lt.Asphalt,Y.Checkpoint;function yr(i,t=lt.Asphalt,e=ri*2.5,n=1){const s=[];for(let r=0;r<i.length;r++){const a=i[r],o=a.surface??t,c=a.effect??Y.None,l=r<i.length-1?Math.atan2(i[r+1].x-a.x,-(i[r+1].z-a.z))*180/Math.PI:r>0?Math.atan2(a.x-i[r-1].x,-(a.z-i[r-1].z))*180/Math.PI:0;if(s.push({id:`road_${r}`,position:new mt(a.x,a.y,a.z),rotation:l*Math.PI/180,pitch:a.pitch,roll:a.roll,scale:new mt(e,n,n<.5?.3:n),surface:o,effect:c,isCheckpoint:a.isCheckpoint??!1,checkpointIndex:a.checkpointIndex??0}),c!==Y.None&&s.push({id:`road_base_${r}`,position:new mt(a.x,a.y,a.z),rotation:l*Math.PI/180,pitch:a.pitch,roll:a.roll,scale:new mt(e,1,ri),surface:o,effect:Y.None}),c===Y.Start||c===Y.Finish||c===Y.Checkpoint){const d=a.x-Math.sin(l*Math.PI/180)*(e*.5),f=a.z-Math.cos(l*Math.PI/180)*(e*.5),m=a.x+Math.sin(l*Math.PI/180)*(e*.5),g=a.z+Math.cos(l*Math.PI/180)*(e*.5);c===Y.Start||Y.Finish,s.push({id:`gate_l_${r}`,position:new mt(d,a.y+6*.5+.5,f),rotation:0,scale:new mt(.3,6,.3),surface:o,effect:Y.None}),s.push({id:`gate_r_${r}`,position:new mt(m,a.y+6*.5+.5,g),rotation:0,scale:new mt(.3,6,.3),surface:o,effect:Y.None})}if(r%3===0){const d=a.x-Math.sin(l*Math.PI/180)*(e*.55),f=a.z-Math.cos(l*Math.PI/180)*(e*.55),m=a.x+Math.sin(l*Math.PI/180)*(e*.55),g=a.z+Math.cos(l*Math.PI/180)*(e*.55);s.push({id:`wall_l_${r}`,position:new mt(d,a.y+2*.5,f),rotation:l*Math.PI/180,scale:new mt(.4,2,.4),surface:lt.Asphalt,effect:Y.None}),s.push({id:`wall_r_${r}`,position:new mt(m,a.y+2*.5,g),rotation:l*Math.PI/180,scale:new mt(.4,2,.4),surface:lt.Asphalt,effect:Y.None})}}return s}function Er(i,t=ri*.8){const e=[];for(let s=0;s<i.length-1;s++){const r=i[s],a=i[s+1],o=a.x-r.x,c=a.y-r.y,l=a.z-r.z,h=Math.sqrt(o*o+c*c+l*l),d=Math.max(1,Math.floor(h/t));for(let f=0;f<d;f++){const m=f/d,g={x:r.x+o*m,y:r.y+c*m,z:r.z+l*m,surface:m<.5?r.surface:a.surface};f===0&&r.effect&&(g.effect=r.effect,g.isCheckpoint=r.isCheckpoint,g.checkpointIndex=r.checkpointIndex),e.push(g)}}const n=i[i.length-1];return e.push({x:n.x,y:n.y,z:n.z,surface:n.surface,effect:n.effect,isCheckpoint:n.isCheckpoint,checkpointIndex:n.checkpointIndex}),e}function Ip(){const i=ri,t=[{x:0,y:.5,z:i*5,effect:Y.Start},{x:0,y:.5,z:i*3},{x:0,y:.5,z:i*1},{x:0,y:.5,z:-i*1},{x:0,y:.5,z:-i*3},{x:0,y:.5,z:-i*5},{x:0,y:.5,z:-i*7},{x:0,y:.5,z:-i*9},{x:0,y:.5,z:-i*11,effect:Y.Booster},{x:0,y:.5,z:-i*13},{x:0,y:.5,z:-i*15},{x:i*2,y:.5,z:-i*16,surface:lt.Dirt},{x:i*5,y:.5,z:-i*17},{x:i*8,y:.5,z:-i*16.5},{x:i*11,y:.5,z:-i*15,surface:lt.Asphalt},{x:i*13,y:.5,z:-i*13},{x:i*13,y:.5,z:-i*11},{x:i*13,y:.5,z:-i*9},{x:i*13,y:.5,z:-i*7,effect:Y.Checkpoint,isCheckpoint:!0,checkpointIndex:0},{x:i*13,y:.5,z:-i*5},{x:i*13,y:.5,z:-i*3},{x:i*13,y:.5,z:-i*1},{x:i*13,y:.5,z:i*1},{x:i*13,y:.5,z:i*3},{x:i*13,y:.5,z:i*5},{x:i*11,y:.5,z:i*7,surface:lt.Grass},{x:i*8,y:.5,z:i*8},{x:i*5,y:.5,z:i*7.5,surface:lt.Asphalt},{x:i*3,y:.5,z:i*6},{x:i*1,y:.5,z:i*5.5},{x:0,y:.5,z:i*5,effect:Y.Finish,isCheckpoint:!0,checkpointIndex:1}],e=yr(Er(t,i*.85));return e.push({id:"ground",position:new mt(i*7,-.5,-i*5),rotation:0,scale:new mt(i*20,.5,i*30),surface:lt.Grass,effect:Y.None}),{name:"Beginner's Loop",author:"Flashmania",blocks:e,startPositions:[new mt(0,1.5,i*5)],startRotations:[0],medals:{bronze:55,silver:40,gold:30,author:24}}}function Up(){const i=ri,t=[{x:0,y:.5,z:i*2,effect:Y.Start},{x:0,y:.5,z:i},{x:0,y:.5,z:-i},{x:0,y:.5,z:-i*3},{x:0,y:.5,z:-i*5,effect:Y.Booster},{x:0,y:.5,z:-i*7},{x:0,y:.5,z:-i*9},{x:i*3,y:.5,z:-i*11,surface:lt.Dirt},{x:i*7,y:.5,z:-i*12},{x:i*11,y:.5,z:-i*11,surface:lt.Asphalt},{x:i*13,y:.5,z:-i*9,effect:Y.Checkpoint,isCheckpoint:!0,checkpointIndex:0},{x:i*15,y:2,z:-i*8,pitch:.15},{x:i*17,y:4,z:-i*7,pitch:.2},{x:i*19,y:6,z:-i*6,pitch:.03},{x:i*21,y:7,z:-i*7,roll:.25},{x:i*23,y:8,z:-i*8,roll:.35},{x:i*25,y:8,z:-i*9,roll:.4,surface:lt.Asphalt},{x:i*27,y:7,z:-i*8,roll:.3},{x:i*29,y:6,z:-i*7,roll:.15},{x:i*31,y:5,z:-i*6,surface:lt.Ice,pitch:-.12},{x:i*33,y:4,z:-i*5,surface:lt.Ice},{x:i*35,y:3,z:-i*4,surface:lt.Ice,effect:Y.NoSteer,pitch:-.15},{x:i*37,y:2,z:-i*3,pitch:-.1},{x:i*39,y:1,z:-i*1,surface:lt.Asphalt},{x:i*40,y:.5,z:i*1,effect:Y.Fragile},{x:i*41,y:.5,z:i*3},{x:i*40,y:.5,z:i*5},{x:i*38,y:.5,z:i*7},{x:i*36,y:.5,z:i*8,effect:Y.EngineOff},{x:i*34,y:.5,z:i*8},{x:i*32,y:.5,z:i*8,surface:lt.Plastic},{x:i*30,y:.5,z:i*8,surface:lt.Plastic},{x:i*28,y:.5,z:i*8,effect:Y.Checkpoint,isCheckpoint:!0,checkpointIndex:1},{x:i*25,y:2,z:i*7.5,pitch:.12},{x:i*22,y:3,z:i*7,surface:lt.Dirt,pitch:.05},{x:i*19,y:2,z:i*6,pitch:-.1},{x:i*16,y:.5,z:i*5,effect:Y.Booster},{x:i*12,y:.5,z:i*4},{x:i*8,y:.5,z:i*3},{x:i*5,y:.5,z:i*2,surface:lt.Grass},{x:i*2,y:.5,z:i*2,surface:lt.Asphalt},{x:0,y:.5,z:i*2,effect:Y.Finish,isCheckpoint:!0,checkpointIndex:2}],e=yr(Er(t,i*.85));return e.push({id:"ground_1",position:new mt(i*20,-.5,-i*3),rotation:0,scale:new mt(i*46,.5,i*16),surface:lt.Grass,effect:Y.None}),e.push({id:"elevated_support",position:new mt(i*28,3,-i*7),rotation:0,scale:new mt(i*14,6,i*6),surface:lt.None,effect:Y.None}),e.push({id:"return_support",position:new mt(i*30,0,i*8),rotation:0,scale:new mt(i*16,.5,i*6),surface:lt.Grass,effect:Y.None}),{name:"Speed Valley",author:"Flashmania",blocks:e,startPositions:[new mt(0,1.5,i*2)],startRotations:[0],medals:{bronze:80,silver:60,gold:45,author:35}}}function Np(){const i=ri,t=[{x:0,y:.5,z:i*2,effect:Y.Start},{x:0,y:.5,z:i},{x:0,y:.5,z:-i},{x:i*3,y:.5,z:-i*3},{x:i*7,y:.5,z:-i*4},{x:i*10,y:2.5,z:-i*5},{x:i*13,y:5,z:-i*6},{x:i*16,y:8,z:-i*7},{x:i*19,y:11,z:-i*8},{x:i*22,y:13,z:-i*8,effect:Y.Checkpoint,isCheckpoint:!0,checkpointIndex:0},{x:i*25,y:13,z:-i*8,surface:lt.Ice,effect:Y.NoBrake},{x:i*28,y:13,z:-i*8,surface:lt.Ice},{x:i*31,y:13,z:-i*7,surface:lt.Ice},{x:i*34,y:10,z:-i*5},{x:i*36,y:6,z:-i*3},{x:i*38,y:2,z:-i},{x:i*39,y:.5,z:i,effect:Y.Booster},{x:i*39,y:.5,z:i*3},{x:i*38,y:.5,z:i*5,effect:Y.NoSteer},{x:i*36,y:.5,z:i*7},{x:i*33,y:.5,z:i*8,surface:lt.Plastic},{x:i*30,y:.5,z:i*9,surface:lt.Plastic},{x:i*27,y:.5,z:i*8,surface:lt.Dirt,effect:Y.Fragile},{x:i*24,y:.5,z:i*7,surface:lt.Dirt},{x:i*21,y:.5,z:i*6,effect:Y.Checkpoint,isCheckpoint:!0,checkpointIndex:1},{x:i*18,y:.5,z:i*5,surface:lt.Grass},{x:i*15,y:.5,z:i*4,surface:lt.Grass},{x:i*12,y:.5,z:i*3,effect:Y.EngineOff},{x:i*9,y:.5,z:i*2},{x:i*5,y:.5,z:i*2},{x:i*2,y:.5,z:i*2},{x:0,y:.5,z:i*2,effect:Y.Finish,isCheckpoint:!0,checkpointIndex:2}],e=yr(Er(t,i*.85));return e.push({id:"ground_base",position:new mt(i*20,-.5,i*2),rotation:0,scale:new mt(i*44,.5,i*14),surface:lt.Grass,effect:Y.None}),e.push({id:"mountain",position:new mt(i*26,5,-i*8),rotation:0,scale:new mt(i*14,10,i*4),surface:lt.None,effect:Y.None}),{name:"Ice Mountain",author:"Flashmania",blocks:e,startPositions:[new mt(0,1.5,i*2)],startRotations:[0],medals:{bronze:75,silver:55,gold:42,author:32}}}class Fp{constructor(){this.carMesh=null,this.ghostMesh=null,this.currentTrack=null,this.collisionBoxes=[],this.availableTracks=[],this.activeEffects=new Set,this.lastCheckpointIndex=-1,this.wasOnFinish=!1,this.lastTime=0,this.isRunning=!1,this.lastState=Qt.Menu,this.renderer=new cp({antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=uo,this.renderer.toneMapping=po,this.renderer.toneMappingExposure=1.2,document.body.appendChild(this.renderer.domElement),this.scene=new lp,this.scene.background=new It(1710638),this.scene.fog=new Mr(1710638,100,500),this.camera=new Pe(70,window.innerWidth/window.innerHeight,.5,1e3),this.input=new yp,this.audio=new Ep,this.physics=new Sp,this.cameraController=new wp(this.camera),this.gameState=new Ce,this.ghostSystem=new bp,this.trackBuilder=new Dp,this.ui=new Pp(document.getElementById("ui-overlay"),this.audio),this.availableTracks=[Ip(),Up(),Np()],this.setupLighting(),this.setupEvents(),this.ui.onTrackSelect(t=>{this.startTrack(t)}),this.gameState.state=Qt.Menu}setupLighting(){const t=new xp(4210784,.6);this.scene.add(t);const e=new _p(16777181,1.5);e.position.set(100,200,100),e.castShadow=!0,e.shadow.mapSize.width=2048,e.shadow.mapSize.height=2048,e.shadow.camera.near=.5,e.shadow.camera.far=500,e.shadow.camera.left=-200,e.shadow.camera.right=200,e.shadow.camera.top=200,e.shadow.camera.bottom=-200,this.scene.add(e);const n=new pp(6719692,4478242,.4);this.scene.add(n)}setupEvents(){window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}),window.addEventListener("keydown",t=>{t.code==="Escape"&&(this.gameState.state===Qt.Menu?(this.lastState===Qt.Racing||this.lastState===Qt.Countdown)&&(this.gameState.state=this.lastState):this.gameState.state===Qt.Racing||this.gameState.state===Qt.Countdown?(this.lastState=this.gameState.state,this.gameState.state=Qt.Menu):this.gameState.state===Qt.Finished&&(this.gameState.state=Qt.Menu)),t.code==="KeyC"&&this.cameraController.cycleMode()}),window.addEventListener("click",()=>{this.audio.init()},{once:!0}),window.addEventListener("keydown",()=>{this.audio.init()},{once:!0})}startTrack(t){this.clearScene(),this.currentTrack=this.availableTracks[t],this.gameState.medalTimes={bronze:this.currentTrack.medals.bronze,silver:this.currentTrack.medals.silver,gold:this.currentTrack.medals.gold,author:this.currentTrack.medals.author};const e=this.trackBuilder.build(this.currentTrack);this.scene.add(e),this.collisionBoxes=this.trackBuilder.getCollisionBoxes();const n=new Ei(1e3,1e3),s=new Le({color:1718810,roughness:1}),r=new qt(n,s);if(r.rotation.x=-Math.PI/2,r.position.y=-.5,r.receiveShadow=!0,this.scene.add(r),this.addSkybox(),this.carMesh=new Tp(this.scene),this.physics.reset(this.currentTrack.startPositions[0],this.currentTrack.startRotations[0]*Math.PI/180),this.ghostMesh=this.carMesh.createGhost(),this.gameState.totalCheckpoints=this.currentTrack.blocks.filter(a=>a.isCheckpoint&&a.effect!==Y.Finish&&a.effect!==Y.Start).length,this.gameState.nextCheckpoint=0,this.ghostMesh&&this.ghostMesh.setVisible(!1),this.gameState.reset(),this.gameState.startCountdown(),this.cameraController.resetToCar(this.physics.state),document.querySelector(".fm-track-name")){const a=document.querySelector(".fm-track-name");a.textContent=this.currentTrack.name}this.isRunning=!0}addSkybox(){const t=new Ms(400,32,16),e=new _r({color:1710654,side:Se}),n=new qt(t,e);this.scene.add(n);const s=new De,r=2e3,a=new Float32Array(r*3);for(let l=0;l<r;l++){const h=Math.random()*Math.PI*2,d=Math.random()*Math.PI*.5,f=380;a[l*3]=f*Math.sin(d)*Math.cos(h),a[l*3+1]=f*Math.cos(d)+50,a[l*3+2]=f*Math.sin(d)*Math.sin(h)}s.setAttribute("position",new ke(a,3));const o=new Wo({color:16777215,size:1.5}),c=new fp(s,o);this.scene.add(c)}clearScene(){const t=[];this.scene.traverse(e=>{e!==this.scene&&!(e instanceof Ai)&&t.push(e)});for(const e of t)this.scene.remove(e);this.carMesh&&(this.carMesh.dispose(),this.carMesh=null),this.ghostMesh&&(this.ghostMesh.dispose(),this.ghostMesh=null)}run(){this.lastTime=performance.now();const t=e=>{requestAnimationFrame(t);const n=Math.min((e-this.lastTime)/1e3,.05);this.lastTime=e,this.input.update(),this.update(n),this.render(),this.ui.update(this.gameState)};requestAnimationFrame(t)}update(t){const e=this.gameState,n=this.physics.state;if(this.input.restartJustPressed&&this.currentTrack&&(e.state===Qt.Racing||e.state===Qt.Finished||e.state===Qt.Countdown)){e.state===Qt.Finished?this.ghostSystem.stopRecording(e.raceTime):this.ghostSystem.cancelRecording(),this.startTrack(this.availableTracks.indexOf(this.currentTrack));return}switch(e.state){case Qt.Menu:this.camera.position.set(Math.sin(performance.now()*1e-4)*20,10,Math.cos(performance.now()*1e-4)*20),this.camera.lookAt(0,0,0);break;case Qt.Countdown:{e.updateCountdown(t)&&(this.ghostSystem.startRecording(performance.now()),this.audio.init()),this.carMesh&&this.carMesh.update(n,t),this.cameraController.update(n,t,e.state);break}case Qt.Racing:this.updateRacing(t);break;case Qt.Finished:this.carMesh&&this.carMesh.update(n,t),this.cameraController.update(n,t,e.state),this.updateGhost(e.raceTime);break}}updateRacing(t){const e=this.gameState,n=this.physics.state;e.raceTime+=t,e.currentSpeedKmh=this.physics.getSpeedKmh(),e.maxSpeed=Math.max(e.maxSpeed,e.currentSpeedKmh);let s=0;this.input.steerLeft&&(s-=1),this.input.steerRight&&(s+=1);const r=lo(n.position,this.collisionBoxes);if(e.currentSurface=r.surface,e.currentEffect=r.effect,r.effect===Y.Checkpoint||r.effect===Y.Finish){if(r.effect===Y.Checkpoint){const l=this.currentTrack.blocks.filter(h=>h.isCheckpoint&&h.effect!==Y.Finish&&h.effect!==Y.Start).find(h=>{const d=h.scale.x*.5+2,f=h.scale.z*.5+2;return n.position.x>=h.position.x-d&&n.position.x<=h.position.x+d&&n.position.z>=h.position.z-f&&n.position.z<=h.position.z+f});l&&l.checkpointIndex!==void 0&&e.checkCheckpoint(l.checkpointIndex)&&(this.audio.playCheckpoint(),this.ui.showEffectPopup("✓ CHECKPOINT","#44FF44"))}if(r.effect===Y.Finish){const o=this.currentTrack.blocks.filter(c=>c.isCheckpoint&&c.effect!==Y.Finish&&c.effect!==Y.Start).length;if(!this.wasOnFinish&&e.nextCheckpoint>=o){this.wasOnFinish=!0;const c=e.finish();this.audio.playFinish(),this.ghostSystem.stopRecording(e.raceTime);const l=Ce.getMedalDisplay(c);this.ui.showEffectPopup(l.name,l.color)}}}else this.wasOnFinish=!1;this.activeEffects.clear(),n.isBoosting&&this.activeEffects.add(Y.Booster),n.isEngineOff&&this.activeEffects.add(Y.EngineOff),n.isFragile&&this.activeEffects.add(Y.Fragile),n.isNoSteer&&this.activeEffects.add(Y.NoSteer),n.isNoBrake&&this.activeEffects.add(Y.NoBrake),n.isBoosting?e.currentEffect=Y.Booster:n.isEngineOff?e.currentEffect=Y.EngineOff:n.isFragile?e.currentEffect=Y.Fragile:n.isNoSteer?e.currentEffect=Y.NoSteer:n.isNoBrake&&(e.currentEffect=Y.NoBrake),n.isBoosting&&n.boostTimer>t*.8&&this.audio.playBoost(),this.physics.update(t,{accelerate:this.input.accelerate,brake:this.input.brake,steerInput:s},o=>lo(o,this.collisionBoxes)),this.snapToGround(),this.carMesh&&this.carMesh.update(n,t),this.cameraController.update(n,t,Qt.Racing),this.audio.updateEngine(Math.abs(n.speed)/(this.physics.config.maxSpeed/3.6),n.isAccelerating);const a=n.isDrifting?.8:Math.min(Math.abs(n.speed)/30,.5);this.audio.setSurfaceNoise(n.currentSurface,a),this.ghostSystem.recordFrame(performance.now(),n.position,n.rotation,n.speed),this.updateGhost(e.raceTime/1)}snapToGround(){const t=this.physics.state.position,e=this.physics.state;let n=-1/0;for(const r of this.collisionBoxes)if(t.x>=r.min.x-.5&&t.x<=r.max.x+.5&&t.z>=r.min.z-.5&&t.z<=r.max.z+.5){const o=r.max.y;o<=t.y+.8&&o>n&&(n=o)}n===-1/0&&(n=0);const s=n+.6;if(e.isAirborne,e.isAirborne=t.y>s+.3&&e.velocity.y>-.5,t.y<=s&&(e.velocity.y<0&&(e.velocity.y<-15,e.velocity.y=0),t.y=s,e.isAirborne=!1),t.y<.6&&(t.y=.6,e.velocity.y<0&&(e.velocity.y=0),e.isAirborne=!1),t.y<-10||Math.abs(t.x)>500||Math.abs(t.z)>500){const r=this.currentTrack.startPositions[0],a=this.currentTrack.startRotations[0]*Math.PI/180;this.physics.reset(r,a),this.wasOnFinish=!1}}updateGhost(t){if(!this.ghostMesh||!this.ghostSystem.hasGhost())return;const e=this.ghostSystem.getPlaybackPosition(t);e&&(this.ghostMesh.update(e.position,e.rotation),this.ghostMesh.setVisible(!0))}render(){this.renderer.render(this.scene,this.camera)}destroy(){this.input.destroy(),this.audio.destroy(),this.renderer.dispose()}}window.addEventListener("DOMContentLoaded",()=>{console.log("🏎️ Flashmania starting..."),new Fp().run();const t=()=>{console.log("🔊 Audio context initialized"),document.removeEventListener("click",t),document.removeEventListener("keydown",t)};document.addEventListener("click",t),document.addEventListener("keydown",t)});
//# sourceMappingURL=index-DWvextXh.js.map
