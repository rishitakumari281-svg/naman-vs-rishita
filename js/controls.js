/* ---------- INPUT ---------- */
const K={},TC={};let rb=null;
addEventListener('keydown',e=>{initA();const k=e.key.toLowerCase();if(rb){const a=rb;rb=null;if(k!=='escape'&&k!=='p'){for(const o in S.keys)if(S.keys[o]===k)S.keys[o]=S.keys[a];S.keys[a]=k;save()}drawKeys();e.preventDefault();return}if(k==='escape'||k==='p'){tp();return}K[k]=1;if(scr==='fight'&&['arrowup','arrowdown','arrowleft','arrowright',' '].includes(k))e.preventDefault()});
addEventListener('keyup',e=>K[e.key.toLowerCase()]=0);addEventListener('blur',()=>{for(const k in K)K[k]=0;for(const k in TC)TC[k]=0});
document.querySelectorAll('#tc button').forEach(b=>{const k=b.dataset.k;b.addEventListener('pointerdown',e=>{e.preventDefault();TC[k]=1;b.classList.add('on');initA()});['pointerup','pointercancel','pointerleave'].forEach(n=>b.addEventListener(n,e=>{e.preventDefault();TC[k]=0;b.classList.remove('on')}))});
addEventListener('contextmenu',e=>e.preventDefault());
const kk=a=>K[S.keys[a]],lastTap={l:-99,r:-99},prevD={l:0,r:0},runL={l:0,r:0};
const hin=()=>{const l=kk('l')||K.arrowleft||TC.l,r=kk('r')||K.arrowright||TC.r;
 for(const [d,v] of [['l',l],['r',r]]){if(v&&!prevD[d]){if(T-lastTap[d]<18)runL[d]=1;lastTap[d]=T}if(!v)runL[d]=0;prevD[d]=!!v}
 return{l,r,j:kk('j')||K.arrowup||TC.j,c:kk('c')||K.arrowdown||TC.c,p:kk('p')||TC.p,k:kk('k')||TC.k,b:kk('b')||TC.b,s:kk('s')||TC.s,o:kk('o')||TC.o,z:kk('z')||TC.z,u:kk('u')||(l&&runL.l)||(r&&runL.r)||TC.u}};
