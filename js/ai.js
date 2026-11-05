/* ---------- AI ---------- */
const DF={easy:{rt:26,bp:.2,aw:70,sp:.08,ag:.5},medium:{rt:14,bp:.45,aw:38,sp:.25,ag:.75},hard:{rt:6,bp:.72,aw:18,sp:.45,ag:.95},boss:{rt:4,bp:.8,aw:12,sp:.55,ag:1}};
function ai(f,o){const d=DF[boss?'boss':dfk()],a=f.a2||(f.a2={n:0,mv:0,bl:0,w:0}),inp={},dx=o.x-f.x,ad=Math.abs(dx),tw=dx>0?'r':'l',aw=dx>0?'l':'r',R=Math.random;
if(a.w>0)a.w--;if(f.st==='hit')a.n=Math.min(a.n,4);
if(--a.n<=0){a.n=d.rt+(R()*d.rt|0);const low=f.hp<30,at=['punch','kick','special'].includes(o.st),inc=projs.some(p=>p.o!==f&&Math.abs(p.x-f.x)<260&&(f.x-p.x)*p.vx>0);
 if(f.ult>=100&&f.ultOK&&ad<420&&dfk()!=='easy'&&R()<(boss?.3:.1))inp.z=1;else if(at&&ad<110&&dfk()==='hard'&&f.dc<=0&&R()<.22)inp.o=1;else if((at&&ad<125||inc)&&R()<d.bp+(low?.15:0)){a.mv=0;if(o.st==='punch'&&R()<(dfk()==='hard'?.4:dfk()==='medium'?.2:0))a.cr=16;else a.bl=20+(R()*12|0);if(inc&&dfk()==='hard'&&R()<.4){inp.j=1;a.bl=0;a.mv=1}}
 else if(['punch','kick'].includes(o.st)&&o.t>12&&ad<100&&a.w<=0&&R()<d.ag){inp.k=1;a.w=d.aw}else if(ad>170){a.mv=1;if(f.cd<=0&&ad>230&&R()<d.sp)inp.s=1;else if(f.id==='naman'&&dfk()!=='easy'&&ad<260&&ad>130&&R()<.25){inp.u=1;inp.p=1;inp[tw]=1}}
 else if(ad>=62){a.mv=R()<.7?1:0;if(a.w<=0&&ad<118&&R()<d.ag*(low?.6:1)){const r=R();if(r<.45)inp.p=1;else if(r<.85)inp.k=1;else if(f.cd<=0&&dfk()!=='easy')inp.s=1;else inp.p=1;a.w=d.aw+(R()*30|0);if(R()<.4)a.mv=-1}}
 else{if(R()<.45)a.mv=-1;else if(a.w<=0&&R()<d.ag){inp[R()<.6?'p':'k']=1;a.w=d.aw+(R()*30|0);a.mv=R()<.5?-1:0}else a.mv=0}
 if(R()<.05&&f.y===0&&!inp.j&&!a.bl)inp.j=1;if(low&&R()<.2)a.mv=-1}
if(a.cr>0){a.cr--;inp.c=1}else if(a.bl>0){a.bl--;inp.b=1;if(f.id==='rishita'&&dfk()!=='easy'&&['punch','kick'].includes(o.st)&&ad<100&&R()<.08)inp.p=1}else if(a.mv===1&&ad>50){inp[tw]=1;if(ad>250&&dfk()!=='easy')inp.u=1}else if(a.mv===-1&&f.x>60&&f.x<W-60)inp[aw]=1;
return inp}
function dfk(){return boss?'hard':S.diff}
