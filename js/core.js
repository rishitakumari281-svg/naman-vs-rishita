const $=s=>document.querySelector(s),cv=$('#c'),W=960,H=540,G=450,SCD=420;let g=cv.getContext('2d');cv.width=W;cv.height=H;
const DK={l:'a',r:'d',j:'w',c:'s',p:'f',k:'g',b:'h',s:'r',u:'shift',o:'e',z:'q'};let S={music:.5,sfx:.7,mute:0,diff:'medium',arena:0,keys:{...DK}},train=0,dm='idle',wko=0,wpf=0,hpv=[100,100],hpl=[100,100],cine=null,curProj=null,late=[],boss=0;try{Object.assign(S,JSON.parse(localStorage.nvr))}catch(e){}
const save=()=>{try{localStorage.nvr=JSON.stringify(S)}catch(e){}};
const TOUCH=matchMedia('(pointer:coarse)').matches||'ontouchstart' in window;
let scr='menu',paused=false,from='menu',T=0,mt=0,vt=0,it=0,ot=0,ft=0,tm=60,rs='intro',round=1,score=[0,0],shake=0,hov='',banner='',p1,p2,projs=[],parts=[],rings=[],hitstop=0;
function fit(){const s=Math.min(innerWidth/16,innerHeight/9),e=$('#w');e.style.width=s*16+'px';e.style.height=s*9+'px';e.style.fontSize=s*16/48+'px'}addEventListener('resize',fit);fit();
