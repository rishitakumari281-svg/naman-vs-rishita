/* ---------- CHARACTERS ---------- */
const CH={naman:{n:'NAMAN',skin:'#e3a877',leg:'#1a2340',hair:'#1c1512',top:'#2f7bff',pants:'#1a2340',acc:'#22c9ff',long:0,spd:4.6,pw:1.1,sc:'#3fa9ff',pvx:11,pd:14,pr:18},
rishita:{n:'RISHITA',skin:'#f0b88f',leg:'#f0b88f',hair:'#2a1020',top:'#ff4f9a',pants:'#5b2a9b',acc:'#ffd23f',long:1,spd:5.2,pw:1,sc:'#ff7ac8',pvx:8,pd:13,pr:27}};
const AT={punch:{d:18,h:6,h2:9,r:72,dm:6},kick:{d:28,h:10,h2:14,r:96,dm:9},special:{d:38},rush:{d:26,h:5,h2:16,r:80,dm:11},counter:{d:30,h:5,h2:14,r:90,dm:7},upper:{d:30,h:6,h2:12,r:70,dm:10},prush:{d:28,h:4,h2:20,r:80,dm:4}};
class F{constructor(id,x,face){this.id=id;this.c=CH[id];this.reset(x,face)}
reset(x,face){Object.assign(this,{x,y:0,vx:0,vy:0,face,hp:100,st:'idle',t:0,cd:150,inv:0,hd:0,pv:{},hs:0,wt:0,low:0,a2:null,P:null,tr:[],ch:null,land:0,cb:0,ct:0,ult:0,rage:0,rgu:0,dc:0})}
go(s){this.st=s;this.t=0;this.hd=0;if(this.y<=0)this.vx=0;sfx(s);if(s==='special'||Math.random()<.35)voice(this.id,s)}
fin(){this.st=this.y>0?'jump':'idle';this.t=0;this.hd=0}
um(s){const u=this.up||{};return(s==='rush'&&u.fd?1.12:1)*(s==='rush'&&u.fdash?1.2:1)*(s==='counter'&&u.pdm?1.12:1)}
ultStep(){const t=this.t,nm=this.id==='naman',B=(y,r,dm,vx)=>projs.push({o:this,x:this.x+this.face*60,y:this.y+y,vx:this.face*vx,r,dm,life:80,u:1});if(nm){if(t===10){B(80,62,30,13);shake=Math.max(shake,16);sfx('ult2')}}else if([8,14,20,26,32].includes(t)){B([40,110,70,130,90][(t-8)/6],34,8,10);sfx('special')}if(t>=48)this.fin()}
upd(inp,o){const pv=this.pv,pr=k=>inp[k]&&!pv[k],s=this.st,u=this.up||{};
if(this.cd>0)this.cd-=this.rage>0?2:1;if(this.dc>0)this.dc--;if(this.rage>0)this.rage--;if(this.ct>0)this.ct--;if(this.inv>0)this.inv--;this.t++;const air=this.y>0||this.vy>0;
if(s==='ko'||s==='win')this.vx*=.92;
else if(s==='hit'){this.vx*=.88;if(this.t>=22)this.fin()}
else if(s==='dodge'){this.vx*=.9;if(this.t>=18)this.fin()}else if(s==='power'){this.vx*=.8;if(this.t>=40&&!cine)this.fin()}else if(s==='ultimate')this.ultStep();else if(AT[s]){const A=AT[s];if(s==='rush')this.vx=this.face*(this.t<16?(u.fdash?12:10):2);if(s==='prush'){this.vx=this.face*(this.t<20?11:2);if(this.t%6===0)this.hd=0}if(s==='upper'&&this.t===6)this.vy=9;if(s!=='special'&&u.spd&&T%4===0&&this.t<A.h)this.t++;
 if(s!=='special'){if(this.t>=A.h&&this.t<=A.h2&&!this.hd){const dx=(o.x-this.x)*this.face;if(dx>-10&&dx<A.r+(s==='rush'&&u.fdash?20:0)&&Math.abs(o.y-this.y)<70&&!(o.st==='crouch'&&s==='punch')&&o.hurt(this,A.dm*this.c.pw*this.um(s),s!=='punch'))this.hd=1}}
 else if(this.t===14)fireSp(this);
 if(this.t>=A.d)this.fin()}
else{if(!air)this.face=o.x>this.x?1:-1;
 if(pr('s')&&this.cd<=0&&!air){this.go('special');this.cd=SCD*(u.fe?.8:1)}
 else if(pr('p')&&this.id==='naman'&&inp.u&&(inp.l||inp.r)&&!air)this.go('rush');else if(pr('p')&&this.id==='rishita'&&inp.b&&!air){this.go('counter');this.inv=12}else if(pr('p')&&this.id==='naman'&&inp.c&&u.fup&&!air)this.go('upper');else if(pr('k')&&this.id==='rishita'&&inp.u&&(inp.l||inp.r)&&u.prush&&!air)this.go('prush');else if(pr('o')&&this.dc<=0&&!air){this.go('dodge');this.inv=16;this.dc=45;this.vx=-this.face*8}else if(pr('z')&&this.ultOK&&this.ult>=100&&!air&&rs==='fight'&&!cine){this.ult=0;cine={t:0,o:this};this.st='power';this.t=0;this.inv=90;this.vx=0;sfx('ult');voice(this.id,'ult')}else if(pr('k'))this.go('kick');else if(pr('p'))this.go('punch');
 else if(inp.b&&!air){this.st='block';this.vx=0} else if(inp.c&&!air){this.st='crouch';this.vx=0}
 else{const d=(inp.r?1:0)-(inp.l?1:0);if(!air){this.vx=d*this.c.spd*(inp.u&&d?1.7:1);this.run=!!(inp.u&&d);if(pr('j')){this.vy=17;this.vx*=.9;sfx('jump')}}this.st=this.y>0||this.vy>0?'jump':d?'walk':'idle'}}
this.x=Math.max(40,Math.min(W-40,this.x+this.vx));
if(this.y>0||this.vy>0){this.y+=this.vy;this.vy-=.9;if(this.y<=0){this.y=0;if(this.vy<-6){this.land=9;spark(this.x,0,"#ddd",6)}this.vy=0;if(this.st==='jump')this.st='idle'}}
if(this.st==='walk')this.wt+=.28*(this.run?1.6:1);
this.hs+=((-this.vx*this.face*3+Math.sin(T*.12)*3-this.vy*.5)-this.hs)*.2;this.pv=inp;animStep(this)}
hurt(a,dm,hv,u2){if(this.inv>0||this.st==='ko'||rs!=='fight')return false;
const dir=this.x>=a.x?1:-1,bl=this.st==='block'&&(a.x-this.x)*this.face>0;
if(bl){if(this.up&&this.up.ls&&curProj&&!curProj.u)late.push({o:this,x:this.x+this.face*40,y:curProj.y,vx:this.face*9,r:22,dm:curProj.dm*.6,life:60});this.hp=Math.max(1,this.hp-dm*(u2?.45:(this.up&&this.up.def?.06:.15)));this.x+=dir*10;this.inv=6;sfx('block');spark(this.x+this.face*26,this.y+80,'#9ef',8);return true}
dm*=(a.rage>0?1.2:1)*(this.boss?.7:1);a.cb=(a.ct>0?a.cb:0)+1;a.ct=55;if(a===p1&&a.cb===3)Prog.ev('combo');dm*=Math.max(.5,1-.1*(a.cb-1));if(a.ultOK)a.ult=Math.min(100,(a.ult||0)+(dm*1.1+6)*(a.boss?1.6:1));if(this.ultOK)this.ult=Math.min(100,(this.ult||0)+dm*.9);this.hp-=dm;sfx(hv?'heavy':'hit');if(Math.random()<.25)voice(this.id,'hurt');spark(this.x,this.y+85,'#fff',14);shake=Math.max(shake,hv?12:6);hitstop=hv?8:4;
if(this.hp<=0){this.hp=0;hitstop=16;shake=18;this.st='ko';this.t=0;this.vx=dir*7;this.vy=9;return true}
this.st='hit';this.t=0;this.hd=0;this.inv=a.cb>=4?40:7;this.vx=dir*(hv?9:5);if(a.st==='upper')this.vy=11;if(this.hp<20&&!this.rgu){this.rgu=1;this.rage=720;this.st='power';this.t=0;this.inv=50;this.vx=0;rageOn(this)}
if(this.hp<30&&!this.low){this.low=1;voice(this.id,'low')}return true}}
function spark(x,y,c,n){for(let i=0;i<n;i++)parts.push({x,y,vx:(Math.random()-.5)*12,vy:Math.random()*8,l:28,c});if(n>6)rings.push({x,y,l:10,c})}
function fireSp(f){const c=f.c,u=f.up||{},nm=f.id==='naman',sp=u.sr?1.25:1,dm=c.pd*(nm&&u.fd?1.12:1)*(!nm&&u.pdm?1.12:1),b={o:f,x:f.x+f.face*50,y:f.y+75,vx:f.face*c.pvx*sp,r:c.pr*(u.sr?1.2:1),dm,life:u.sr?115:90};projs.push(b);if(nm&&u.ebw)projs.push({...b,delay:12,r:b.r*.8,dm:dm*.6});if(!nm&&u.elt){projs.push({...b,y:b.y+38,vx:b.vx*.9,dm:dm*.55});projs.push({...b,y:b.y-38,vx:b.vx*.9,dm:dm*.55})}}
