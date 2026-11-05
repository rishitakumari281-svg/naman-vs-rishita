/* Progression: XP, levels 1-10, upgrade tree, unlocks, achievements, gallery, boss setup. Saved in localStorage. */
for(const k in DK)if(!S.keys[k])S.keys[k]=DK[k];
const XPT=[0,100,250,450,700,1000,1400,1900,2500,3200],NEED={v1:3,o1:4,ult:5,aura:6,o2:7,v2:9};
const UPG={naman:[['fd','Flame Damage','+12% fire damage',1],['fe','Flame Energy','Special recharges 20% faster',1],['sr','Special Range','Faster, bigger, longer waves',1],['fdash','Fire Dash','Blaze Rush hits harder and reaches further',2],['fup','Flame Uppercut','Crouch + punch launches the foe',2],['ebw','Enhanced Blaze Wave','A second wave follows the first',2]],
rishita:[['spd','Attack Speed','Punches and kicks start faster',1],['def','Defensive Ability','Blocks take far less chip damage',1],['pdm','Petal Damage','+12% petal damage',1],['ls','Lotus Shield','Blocked projectiles reflect as petals',2],['prush','Petal Rush','Run + kick: gliding multi-hit dash',2],['elt','Enhanced Lotus Storm','Special fires three petal waves',2]]};
const OUT={naman:[{},{top:'#e0453a',pants:'#2a1a1a',acc:'#ffcf33'},{top:'#2b2f3a',pants:'#e9eef8',acc:'#35e0ff'}],rishita:[{},{top:'#fff2f6',pants:'#c9a34a',acc:'#ff8fc0'},{top:'#2ec4b6',pants:'#5b2a9b',acc:'#ffe08a'}]};
const ACH=[['first','First Victory','Win a match',100,s=>s.wins>=1],['combo','Combo Master','Land 25 combos of 3+ hits',150,s=>s.combos>=25],['perfect','Perfect Fighter','Win a round without taking damage',150,s=>s.perfect>=1],['special','Special Attack Expert','Hit with 30 specials',150,s=>s.sp>=30],['rage','Rage Survivor','Win a round after entering Rage',150,s=>s.rageWin>=1],['ten','Ten Match Champion','Win 10 matches',250,s=>s.wins>=10],['boss','Boss Slayer','Defeat the Boss',300,s=>s.boss>=1]];
let PD;try{PD=JSON.parse(localStorage.nvr_p)}catch(e){}
PD=Object.assign({naman:{xp:0,up:{},o:0,v:0,a:0},rishita:{xp:0,up:{},o:0,v:0,a:0},ach:{},st:{wins:0,combos:0,perfect:0,sp:0,rageWin:0,boss:0}},PD||{});
const oMax=id=>Prog.ok(id,'o2')?2:Prog.ok(id,'o1')?1:0,vMax=id=>Prog.ok(id,'v2')?2:Prog.ok(id,'v1')?1:0;
const Prog={cur:'naman',
sv(){try{localStorage.nvr_p=JSON.stringify(PD)}catch(e){}},
lvl(id){let l=1;XPT.forEach((x,i)=>{if(PD[id].xp>=x)l=i+1});return l},
pts(id){return this.lvl(id)-1-UPG[id].reduce((a,u)=>a+(PD[id].up[u[0]]?u[3]:0),0)},
ok(id,k){return this.lvl(id)>=NEED[k]},
toast(t){const e=$('#toast');e.textContent=t;e.classList.remove('on');void e.offsetWidth;e.classList.add('on')},
xp(n,why){if(train)return;const id=this.cur,a=this.lvl(id);PD[id].xp+=n;this.toast(`+${n} XP ${why||''}`);if(this.lvl(id)>a){sfx('level');setTimeout(()=>this.toast(`${CH[id].n} reached Level ${this.lvl(id)}!`),1300)}this.sv()},
ev(n){if(train)return;const s=PD.st;
 if(n==='combo'){s.combos++;this.xp(20,'COMBO')}else if(n==='special'){s.sp++;this.xp(15,'SPECIAL')}else if(n==='round')this.xp(50,'ROUND WIN');else if(n==='perfect'){s.perfect++;this.xp(100,'PERFECT')}else if(n==='rageWin')s.rageWin++;else if(n==='matchWin'){s.wins++;this.xp(150,'MATCH WIN')}else if(n==='boss'){s.boss++;this.xp(300,'BOSS DEFEATED')}
 ACH.forEach(([k,t,d,x,f])=>{if(!PD.ach[k]&&f(s)){PD.ach[k]=1;setTimeout(()=>{this.toast('ACHIEVEMENT: '+t);this.xp(x,'')},900)}});this.sv()}};
function setupMatch(id){Prog.cur=id;const d=PD[id],o=p2.id;p1.c=Object.assign({},CH[id],OUT[id][Math.min(d.o,oMax(id))]);p1.up=train?{}:d.up;p1.ultOK=train||Prog.ok(id,'ult');p1.aura=!!d.a&&Prog.ok(id,'aura');p1.vp=Math.min(d.v,vMax(id));
 const n=boss?6:train?0:({easy:0,medium:3,hard:6})[S.diff];p2.up={};UPG[o].slice(0,n).forEach(u=>p2.up[u[0]]=1);p2.ultOK=!train;p2.vp=0;p2.boss=boss&&!train?1:0;
 if(p2.boss)p2.c=Object.assign({},CH[o],{top:'#22222f',pants:'#0e0e16',acc:'#ff2a55',n:'SHADOW '+CH[o].n,spd:CH[o].spd*1.1})}
let PID='naman',gid='naman',gi=0,gf=null;
const GST=['idle','walk','run','jump','crouch','punch','kick','special','block','dodge','hit','power','ultimate','win','ko','rush','counter','upper','prush'];
function rProg(){const id=PID,d=PD[id],l=Prog.lvl(id),nx=XPT[l]||XPT[9],pv=XPT[l-1],pct=l>=10?100:(d.xp-pv)/(nx-pv)*100;
$('#pg').innerHTML=`<div class="tabs"><button class="${id==='naman'?'on':''}" data-pc="naman">Naman</button><button class="${id==='rishita'?'on':''}" data-pc="rishita">Rishita</button></div><h3>${CH[id].n} - Level ${l}</h3><div class="bar"><i style="width:${pct}%"></i></div><p>${d.xp} XP${l<10?' / '+nx:' (MAX)'} &nbsp; Upgrade points: <b>${Prog.pts(id)}</b></p><div class="ug">${UPG[id].map(u=>`<button data-u="${u[0]}" class="${d.up[u[0]]?'on':''}"><b>${u[1]}</b> (${u[3]} pt)<br><small>${u[2]}</small>${d.up[u[0]]?'<br><small>OWNED</small>':''}</button>`).join('')}</div><p><small>Unlocks: Lv3 victory pose 2 · Lv4 outfit 2 · Lv5 Ultimate · Lv6 aura · Lv7 outfit 3 · Lv9 victory pose 3. Every level gives 1 upgrade point.</small></p>`}
function mkG(){gf=new F(gid,480,1);gf.hp=100;const d=PD[gid];gf.c=Object.assign({},CH[gid],OUT[gid][Math.min(d.o,oMax(gid))]);gf.vp=Math.min(d.v,vMax(gid))}
function openGal(){scr='gal';mkG();show('gal');rGal()}
function galStep(){const s=GST[gi],f=gf;f.st=s==='run'?'walk':s;f.run=s==='run';f.t++;if(f.t>70&&!['idle','walk','run','crouch','block','win','power'].includes(s))f.t=0;f.wt+=.28*(f.run?1.6:1);f.vy=s==='jump'?(f.t<35?5:-5):0;f.y=s==='jump'?Math.sin(f.t/70*Math.PI)*70:0;f.rage=(s==='power'||s==='ultimate')?9:0;f.aura=!!PD[gid].a&&Prog.ok(gid,'aura');animStep(f)}
function rGal(){const id=gid,c=CH[id],d=PD[id],nm=id==='naman',own=UPG[id].filter(u=>d.up[u[0]]).map(u=>u[1]).join(', ')||'none yet';
$('#gi').innerHTML=`<h3>${c.n}</h3><p>${nm?'BLAZE FIGHTER: aggressive, blue flames':'LOTUS FIGHTER: graceful, petals and defense'}</p><p>Level ${Prog.lvl(id)} · Outfit ${Math.min(d.o,oMax(id))+1}/3 · Victory pose ${Math.min(d.v,vMax(id))+1}/3 (press again for the next) · Aura ${Prog.ok(id,'aura')?(d.a?'on':'off'):'locked (Lv6)'}</p><p>Special: ${nm?'Blaze Wave':'Lotus Storm'}<br>Move: ${nm?'Blaze Rush':'Petal Counter'}<br>Ultimate: ${nm?'Azure Inferno':'Lotus Tempest'}${Prog.ok(id,'ult')?'':' (locked, Lv5)'}</p><p>Upgrades: ${own}</p><p>Animation: <b>${GST[gi]}</b></p>`}
function rA(){$('#al').innerHTML=ACH.map(([k,t,d,x])=>`<div class="${PD.ach[k]?'on':''}"><b>${PD.ach[k]?'✔':'🔒'} ${t}</b><br><small>${d} · +${x} XP</small></div>`).join('')+`<p>Matches won: ${PD.st.wins} · Combos: ${PD.st.combos} · Perfect rounds: ${PD.st.perfect}</p>`}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
if(d.pc){PID=d.pc;rProg();sfx('ui')}
else if(d.u){const id=PID,u=UPG[id].find(x=>x[0]===d.u);if(!PD[id].up[d.u]&&Prog.pts(id)>=u[3]){PD[id].up[d.u]=1;Prog.sv();sfx('level')}else Prog.toast(PD[id].up[d.u]?'Already owned':'Not enough upgrade points');rProg()}
else if(d.g)galAct(d.g)});
function galAct(act){const id=gid;if(act==='pa')gi=(gi+GST.length-1)%GST.length;else if(act==='na')gi=(gi+1)%GST.length;else if(act==='gc')gid=gid==='naman'?'rishita':'naman';
 else if(act==='go'){if(oMax(id)){PD[id].o=(Math.min(PD[id].o,oMax(id))+1)%(oMax(id)+1)}else Prog.toast('Outfit 2 unlocks at Level 4')}
 else if(act==='gv'){if(GST[gi]!=='win')gi=GST.indexOf('win');else if(vMax(id)){PD[id].v=(Math.min(PD[id].v,vMax(id))+1)%(vMax(id)+1)}else Prog.toast('Victory pose 2 unlocks at Level 3')}
 else if(act==='ga'){if(Prog.ok(id,'aura'))PD[id].a=PD[id].a?0:1;else Prog.toast('Aura unlocks at Level 6')}
 Prog.sv();mkG();rGal();sfx('ui')}
