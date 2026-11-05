/* ---------- GAME FLOW ---------- */
function show(id){document.querySelectorAll('.s').forEach(e=>e.classList.toggle('on',e.id===id));ui()}
function ui(){const f=scr==='fight';$('#hb').style.display=f?'flex':'none';$('#tc').style.display=f&&TOUCH&&!paused?'block':'none'}
function tp(){if(scr!=='fight')return;paused=!paused;show(paused?'pause':null);$('#dm').style.display=train?'':'none'}
let m1=new F('naman',230,1),m2=new F('rishita',730,-1);
function startMatch(id){p1=new F(id,260,1);p2=new F(id==='naman'?'rishita':'naman',700,-1);setupMatch(id);score=[0,0];round=1;paused=false;projs=[];parts=[];vt=train?50:130;scr='vs';rs='intro';show(null);voice(id,'select')}
function startRound(){p1.reset(260,1);p2.reset(700,-1);projs=[];parts=[];rings=[];hitstop=0;cine=null;late=[];tm=60;ft=0;hpv=[100,100];hpl=[100,100];it=train?110:0;rs='intro';banner=''}
function endRound(w){rs='over';ot=0;wko=p1.hp<=0||p2.hp<=0;wpf=w>=0&&[p1,p2][w].hp>=100;announce(wko?'ko':'time');if(wpf)setTimeout(()=>announce('perfect'),1300);if(w<0){score[0]++;score[1]++;banner='DRAW'}else{score[w]++;if(w===0){Prog.ev('round');if(wpf)Prog.ev('perfect');if(p1.rgu)Prog.ev('rageWin')}const A=[p1,p2][w],L=[p1,p2][1-w];A.st='win';A.t=0;if(L.st!=='ko'){L.st='ko';L.t=0;L.vy=6;L.vx=-L.face*5}banner=A.c.n+' WINS!';sfx(w?'lose':'win');voice(A.id,'win');setTimeout(()=>voice(L.id,'lose'),700)}}
function next(){if((score[0]>=2||score[1]>=2)&&score[0]!==score[1]){scr='end';const w=score[0]>score[1];if(w){Prog.ev('matchWin');if(boss)Prog.ev('boss')}$('#et').textContent=w?'VICTORY!':'DEFEAT';if(w)announce('victory');else sfx('lose');$('#es').textContent=`${p1.c.n} ${score[0]} - ${score[1]} ${p2.c.n}`;show('end')}else{round++;startRound()}}
function fight(){if(cine){cine.t++;cine.o.t++;animStep(cine.o);if(cine.t===30)shake=8;if(cine.t>=60){const o=cine.o;o.st='ultimate';o.t=0;o.inv=70;cine=null;sfx('ult2')}return}it++;if(rs==='intro'){if(it===2)announce('round');if(it===52)announce('ready')}if(rs==='intro'&&it===120){rs='fight';announce('fight');voice(p1.id,'start')}
const act=rs==='fight';if(act&&p1.hp<25&&p1.hp>0&&T%48===0)sfx('beat');p1.upd(act?hin():{},p2);p2.upd(act?(train?dummy():ai(p2,p1)):{},p1);
if(Math.abs(p1.x-p2.x)<46&&p1.y<30&&p2.y<30){const m=(46-Math.abs(p1.x-p2.x))/2,d=p1.x<p2.x?-1:1;p1.x+=d*m;p2.x-=d*m}
projs=projs.filter(p=>{if(p.delay>0){p.delay--;return true}p.x+=p.vx;p.life--;const e=p.o===p1?p2:p1;if(Math.abs(p.x-e.x)<p.r+22&&Math.abs(p.y-(e.y+60))<p.r+55&&(curProj=p,(h=>(curProj=null,h))(e.hurt(p.o,p.dm,true,p.u)))){spark(p.x,p.y,p.o.c.sc,16);if(p.o===p1&&!p.u)Prog.ev('special');return false}return p.life>0&&p.x>-50&&p.x<W+50});projs.push(...late.splice(0));
if(act&&train){p1.hp=100;p1.ult=100;if(p2.hp<35)p2.hp=100;p1.cd=Math.min(p1.cd,60)}else if(act){if(++ft%60===0)tm--;
 if(p1.hp<=0||p2.hp<=0)endRound(p1.hp<=0&&p2.hp<=0?-1:p1.hp<=0?1:0);
 else if(tm<=0)endRound(p1.hp===p2.hp?-1:p1.hp>p2.hp?0:1)}
if(rs==='over'&&++ot>150)next()}
function upd(){T++;rings=rings.filter(r=>--r.l>0);parts=parts.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.vy-=.4;return--p.l>0});
if(scr==='menu'){mt++;m1.x=230-Math.max(0,60-mt)*6;m2.x=730+Math.max(0,60-mt)*6;m1.upd({},m2);m2.upd({},m1)}
else if(scr==='sel'){m1.x=330;m2.x=630;pvw(m1,hov==='naman');pvw(m2,hov==='rishita');m1.upd({},m2);m2.upd({},m1)}
else if(scr==='vs'){const q=Math.min(1,(130-vt)/30);p1.x=-100+400*q;p2.x=W+100-(W+100-660)*q;p1.upd({},p2);p2.upd({},p1);if(--vt<=0){scr='fight';startRound();ui()}}
else if(scr==='fight'&&!paused){if(hitstop>0)hitstop--;else if(rs==='over'&&ot<24&&wko&&(T&1)){}else fight()}
else if(scr==='end'){p1.upd({},p2);p2.upd({},p1)}else if(scr==='gal')galStep()}
function dummy(){return dm==='block'?{b:1}:dm==='crouch'?{c:1}:dm==='attack'?(T%90===0?{p:1}:{}):{}}
function pvw(m,on){const w=on?['punch','kick','special','win'][(T/90|0)%4]:'idle';if(m.cs!==w){m.cs=w;m.st=w;m.t=0}}
function rageOn(f){sfx('rage');voice(f.id,'rage');shake=14;rings.push({x:f.x,y:f.y+70,l:10,c:'#ff3030'})}
