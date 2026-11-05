/* Skeletal animation: pose targets -> smoothing -> 2-bone IK limbs, hair/cloth chains, trails, layered drawing */
function ik(sx,sy,tx,ty,a,b,dir){const dx=tx-sx,dy=ty-sy,d=Math.hypot(dx,dy)||1,m=Math.min(d,a+b-.01),ux=dx/d,uy=dy/d,q=(a*a-b*b+m*m)/(2*m),h=Math.sqrt(Math.max(0,a*a-q*q));return[sx+ux*q-uy*h*dir,sy+uy*q+ux*h*dir,sx+ux*m,sy+uy*m]}
/* Victory animations: 3 looping routines per character (vp 0,1,2); Rishita's first one is a full twirl (see f.sx) */
function winPose(P,f,k,nm){const v=f.vp|0,s=Math.sin,B=Math.abs;
if(nm){
 if(v===0){const c=k%90,j=c>=30&&c<54?s((c-30)/24*Math.PI)*36:0;
  if(c<30){P.dy=s(c/30*Math.PI/2)*10;P.hx=10;P.hy=-60;P.bx=0;P.by=-58;P.ln=.3;P.fx=24;P.gx=-24}
  else if(c<54){P.dy=-j;P.hx=26;P.hy=-160-j;P.bx=-26;P.by=-160-j;P.ln=0;P.fy=-j-6;P.gy=-j-14;P.fx=18;P.gx=-8}
  else{const m=s((c-54)*.4);P.dy=4;P.hx=22;P.hy=-122+m*4;P.bx=-22;P.by=-122+m*4;P.ln=-.12;P.fx=26;P.gx=-26}}
 else if(v===1){const j=B(s(k*.087))*34;P.dy=-j;P.hx=26;P.hy=-150-j;P.bx=-26;P.by=-150-j;P.fy=-j-6;P.gy=-j-14;P.fx=16;P.gx=-12;P.ln=.04}
 else{const c=k%80,m=s(k*.3);if(c<40){P.hx=16+m*4;P.hy=-104+m*6;P.bx=6;P.by=-98-m*5;P.ln=-.12+m*.06;P.dy=m*3;P.fx=24;P.gx=-24}else{P.hx=24;P.hy=-160+s(k*.4)*8;P.bx=8;P.by=-62;P.dy=-B(s(k*.15))*8;P.ln=.06;P.fx=20;P.gx=-18}}}
else{
 if(v===0){const a=k*.1;P.hx=20;P.hy=-158+s(a*2)*6;P.bx=-30;P.by=-118+s(a*2)*8;P.ln=s(a)*.1;P.dy=-B(s(a*.5))*6;P.fx=8;P.gx=-14;P.gy=-12}
 else if(v===1){const c=k%120,b=c<30?0:c<70?s((c-30)/40*Math.PI):0;P.ln=b*.5;P.dy=b*12;P.hx=44-4*b;P.hy=-124+54*b;P.bx=-44+24*b;P.by=-124+34*b;P.fx=16}
 else{const c=k%110,d=c<25?c/25:c<65?1:c<90?1-(c-65)/25:0;P.dy=d*22;P.hx=40-18*d;P.hy=-124+76*d;P.bx=-40+22*d;P.by=-124+74*d;P.ln=s(k*.05)*.05+d*.1;P.fx=24;P.gx=-6}}}
function target(f){const s=f.st,k=f.t,nm=f.id==='naman',w=f.wt,sn=Math.sin(w);
let P={hx:nm?24:20,hy:nm?-96:-88,bx:nm?10:-14,by:nm?-90:-80,fx:nm?24:18,fy:0,gx:nm?-22:-18,gy:0,ln:nm?.1:.03,dy:Math.sin(T*(nm?.12:.08)+f.x)*(nm?2.5:3.5)};
if(s==='walk'){P.fx=sn*26;P.fy=-Math.max(0,Math.cos(w))*12;P.gx=-sn*26;P.gy=-Math.max(0,-Math.cos(w))*12;P.hx=18+sn*10;P.hy=-92;P.bx=-8-sn*10;P.by=-88;P.dy=-Math.abs(sn)*4;P.ln=.12;if(f.run){P.fx*=1.4;P.gx*=1.4;P.fy*=1.5;P.gy*=1.5;P.ln=.34;P.hx=10+sn*24;P.hy=-92+Math.abs(sn)*10;P.bx=-10-sn*24;P.by=-92;P.dy=-Math.abs(sn)*7}}
else if(s==='jump'){const u=f.vy>0;P.fx=26;P.fy=u?-34:-22;P.gx=-8;P.gy=u?-20:-30;P.hx=u?28:30;P.hy=u?-116:-100;P.bx=-16;P.by=u?-104:-92;P.dy=0;P.ln=u?.1:-.05}
else if(s==='punch'){const e=Math.sin(Math.min(1,k/18)*Math.PI);P.hx=24+e*62;P.hy=-106;P.bx=-6;P.by=-96;P.fx=24+e*12;P.ln=e*(nm?.3:.2)}
else if(s==='kick'){const e=Math.sin(Math.min(1,k/28)*Math.PI);P.fx=22+e*72;P.fy=-e*68;P.hx=12;P.hy=-108;P.bx=-26;P.by=-112;P.ln=-e*.28;P.dy=e*4}
else if(s==='special'){if(nm){if(k<14){P.hx=-10;P.hy=-98;P.bx=-26;P.by=-104;P.ln=-.16}else{P.hx=56;P.hy=-102;P.bx=42;P.by=-98;P.ln=.26;P.fx=36;P.gx=-26;P.dy=6}}
 else{if(k<14){const a=k*.45;P.hx=14+Math.cos(a)*44;P.hy=-104+Math.sin(a)*40;P.bx=-10-Math.cos(a)*40;P.by=-104-Math.sin(a)*36;P.ln=Math.sin(k*.4)*.16}else{P.hx=54;P.hy=-108;P.bx=44;P.by=-98;P.ln=.14}}}
else if(s==='power'){P.hx=34;P.hy=-132+Math.sin(k*.4)*5;P.bx=-34;P.by=-132-Math.sin(k*.4)*5;P.ln=-.08;P.dy=Math.sin(k*.3)*3;P.fx=24;P.gx=-24}
else if(s==='ultimate'){P.hx=60;P.hy=-104;P.bx=46;P.by=-98;P.ln=.3;P.fx=38;P.gx=-30;P.dy=8}
else if(s==='dodge'){P.ln=-.32;P.dy=16;P.hx=4;P.hy=-84;P.bx=-22;P.by=-92;P.fx=-6;P.gx=-34}
else if(s==='upper'){const e=Math.sin(Math.min(1,k/30)*Math.PI);P.hx=22+e*10;P.hy=-90-e*70;P.bx=-10;P.by=-84;P.ln=-e*.15;P.fy=-e*20}
else if(s==='prush'){P.hx=40;P.hy=-92;P.bx=-30;P.by=-100;P.ln=.4;P.fx=32;P.fy=-14;P.gx=-34;P.gy=-4;P.dy=4}
else if(s==='rush'){P.hx=62;P.hy=-100;P.bx=-20;P.by=-84;P.ln=.45;P.fx=34;P.fy=-10;P.gx=-34;P.gy=-4;P.dy=6}
else if(s==='counter'){const a=k*.5;P.hx=30+Math.cos(a)*30;P.hy=-100+Math.sin(a)*34;P.bx=-30-Math.cos(a)*24;P.by=-100-Math.sin(a)*30;P.ln=Math.sin(k*.5)*.2}
else if(s==='crouch'){P.dy=28;P.fx=28;P.gx=-26;P.hx=26;P.hy=-84;P.bx=12;P.by=-78;P.ln=.18}
else if(s==='block'){P.hx=nm?24:36;P.hy=nm?-124:-114;P.bx=nm?14:22;P.by=nm?-108:-98;P.dy=nm?9:5;P.ln=nm?-.04:-.12;P.fx=20;P.gx=-22;if(f.pv.c)P.dy+=16}
else if(s==='hit'){P.ln=-.42;P.hx=0;P.hy=-76;P.bx=-34;P.by=-94;P.dy=4;P.fx=26;P.gx=-24}
else if(s==='win')winPose(P,f,k,nm);
else if(s==='ko'){const p=Math.min(1,k/14);P.dy=p*50;P.ln=-p*1.45;P.fx=34;P.fy=-5;P.gx=18;P.gy=-2;P.hx=-70;P.hy=-7;P.bx=-34;P.by=-5}
if(f.land>0&&!AT[s]&&s!=='ko')P.dy+=Math.sin(f.land/9*Math.PI)*12;
return P}
function geo(f){const P=f.P,hip=[0,-62+P.dy],c=Math.cos(P.ln),s=Math.sin(P.ln),sh=[hip[0]+s*44,hip[1]-c*44],hd=[sh[0]+s*21+2,sh[1]-c*21];
return{hip,sh,hd,aF:ik(sh[0]+3,sh[1]+4,P.hx,P.hy,31,31,1),aB:ik(sh[0]-3,sh[1]+4,P.bx,P.by,31,31,1),lF:ik(hip[0]+3,hip[1],P.fx,P.fy,34,34,-1),lB:ik(hip[0]-3,hip[1],P.gx,P.gy,34,34,-1)}}
function stepC(p,ax,ay,len,fc){p[0].x=ax;p[0].y=ay;for(let i=1;i<p.length;i++){const q=p[i],r=p[i-1],vx=(q.x-q.px)*.9-fc*.12,vy=(q.y-q.py)*.9+.55;q.px=q.x;q.py=q.y;q.x+=vx;q.y+=vy;const dx=q.x-r.x,dy=q.y-r.y,d=Math.hypot(dx,dy)||1;q.x=r.x+dx/d*len;q.y=r.y+dy/d*len}}
function animStep(f){const t=target(f),nm=f.id==='naman',R=Math.random;
if(!f.P)f.P=t;else{const k=AT[f.st]?.5:f.st==='hit'?.6:.28;for(const n in t)f.P[n]+=(t[n]-f.P[n])*k}
if(f.land>0)f.land--;
f.sx=1;if(f.st==='win'&&f.id==='rishita'&&!f.vp){const cc=Math.cos(f.t*.1);f.sx=(cc<0?-1:1)*Math.max(.18,Math.abs(cc))}
const J=geo(f),wx=x=>f.x+f.face*x,wy=y=>G-f.y+y;
if(!f.ch){const mk=(n,ax,ay,l)=>Array.from({length:n},(_,i)=>({x:ax,y:ay+i*l,px:ax,py:ay+i*l}));f.ch={hr:mk(8,wx(J.hd[0]-9),wy(J.hd[1]-6),8),tl:mk(5,wx(J.hd[0]-12),wy(J.hd[1]-4),6)}}
stepC(f.ch.hr,wx(J.hd[0]-9),wy(J.hd[1]-5),8,f.face);stepC(f.ch.tl,wx(J.hd[0]-12),wy(J.hd[1]-4),6,f.face);
if(AT[f.st]){const q=f.st==='kick'?[J.lF[2],J.lF[3]]:[J.aF[2],J.aF[3]];f.tr.push({x:wx(q[0]),y:wy(q[1])});if(f.tr.length>8)f.tr.shift()}else if(f.tr.length)f.tr.shift();
if(f.st==='special'){if(f.t<14&&T%2===0)parts.push({x:wx(J.aF[2])+(R()-.5)*20,y:f.y-J.aF[3]+(R()-.5)*20,vx:(R()-.5)*3,vy:R()*3,l:18,c:f.c.sc});
 if(f.t===14){shake=Math.max(shake,9);rings.push({x:f.x+f.face*50,y:f.y+75,l:10,c:f.c.sc})}}
if(f.rage>0&&T%3===0)parts.push({x:f.x+(R()-.5)*40,y:f.y+R()*120,vx:(R()-.5),vy:2+R()*3,l:30,c:nm?'#5fb4ff':'#ff8ccf'});if(f.st==='rush'&&T%2===0)parts.push({x:f.x,y:4,vx:-f.face*3,vy:3,l:22,c:'#4fb3ff'});if(f.st==='counter'&&T%2===0)parts.push({x:f.x+(R()-.5)*60,y:f.y+60+R()*60,vx:(R()-.5)*8,vy:1,l:30,c:'#ff9fd0'});if(f.st==='win'&&T%3===0)parts.push({x:f.x+(R()-.5)*50,y:nm?f.y-J.aF[3]:f.y+150+R()*30,vx:(R()-.5)*(nm?2:5),vy:nm?2+R()*3:2,l:40,c:nm?'#4fb3ff':'#ff9fd0'})}
function trails(f){const t=f.tr;if(t.length<2)return;g.lineCap='round';for(let i=1;i<t.length;i++){g.strokeStyle=f.id==='naman'?`rgba(70,${150+i*10},255,${i/t.length*.7})`:`rgba(255,170,225,${i/t.length*.7})`;g.lineWidth=3+i*2.2;g.beginPath();g.moveTo(t[i-1].x,t[i-1].y);g.lineTo(t[i].x,t[i].y);g.stroke()}}
/* ===== Anime-style layered character renderer (vector art drawn in code; fully replaceable) ===== */
const SK={naman:{iris:'#2c8dff',iris2:'#0b2f7a',iris3:'#a8e0ff',hair:'#1c1512',hair2:'#120c09',hi:'#6b5242',lash:'#120a10'},rishita:{iris:'#d8467f',iris2:'#6a1a4a',iris3:'#ffc2dc',hair:'#2a1020',hair2:'#1c0a14',hi:'#9a4a80',lash:'#1a0814'}};
function sd(h,f){const n=parseInt(h.slice(1),16),k=x=>Math.max(0,Math.min(255,Math.round(f>1?x+(255-x)*(f-1):x*f)));return`rgb(${k(n>>16)},${k(n>>8&255)},${k(n&255)})`}
function tl(a,b,c,w0,w1,w2,col,O){const P=[],Wd=[];for(let i=0;i<=6;i++){const t=i/6;P.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);Wd.push(w0+(w1-w0)*t)}for(let i=1;i<=6;i++){const t=i/6;P.push([b[0]+(c[0]-b[0])*t,b[1]+(c[1]-b[1])*t]);Wd.push(w1+(w2-w1)*t)}
for(const o of[1,0]){g.strokeStyle=o?O:col;for(let i=1;i<P.length;i++){g.lineWidth=(Wd[i]+Wd[i-1])/2+o*3.5;g.beginPath();g.moveTo(P[i-1][0],P[i-1][1]);g.lineTo(P[i][0],P[i][1]);g.stroke()}}}
function lock(bx,by,tx,ty,w,col,O){const dx=tx-bx,dy=ty-by,d=Math.hypot(dx,dy)||1,nx=-dy/d*w/2,ny=dx/d*w/2,mx=(bx+tx)/2,my=(by+ty)/2;g.beginPath();g.moveTo(bx+nx,by+ny);g.quadraticCurveTo(mx+nx*1.3,my+ny*1.3,tx,ty);g.quadraticCurveTo(mx-nx*.5,my-ny*.5,bx-nx,by-ny);g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=O;g.lineWidth=1.3;g.stroke()}
function hand(x,y,ang,open,col,O){g.save();g.translate(x,y);g.rotate(ang);g.lineCap='round';g.fillStyle=col;g.strokeStyle=O;g.lineWidth=1.8;g.beginPath();g.ellipse(2,0,5.5,4.6,0,0,7);g.fill();g.stroke();
if(open){for(let i=-1.5;i<=1.5;i++){for(const o of[1,0]){g.strokeStyle=o?O:col;g.lineWidth=o?4.2:2.6;g.beginPath();g.moveTo(5,i*2.4);g.lineTo(11,i*3.2);g.stroke()}}}
else{for(let i=-1.5;i<=1.5;i++){dot(5.5,i*2.3,2.4,col)}g.strokeStyle=O;g.lineWidth=1;g.beginPath();g.moveTo(4,-4.5);g.lineTo(4,4.5);g.stroke()}
const ty=open?-8:-5;for(const o of[1,0]){g.strokeStyle=o?O:col;g.lineWidth=o?3.8:2.4;g.beginPath();g.moveTo(1,-4);g.lineTo(6,ty);g.stroke()}g.restore()}
function shoe(x,y,col,col2,O){g.beginPath();g.moveTo(x-5,y-9);g.lineTo(x+3,y-9);g.quadraticCurveTo(x+8,y-5,x+14,y-2);g.lineTo(x+14,y+2);g.lineTo(x-6,y+2);g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=O;g.lineWidth=2;g.stroke();g.fillStyle=col2;g.fillRect(x-6,y,20,2.5);g.fillStyle='#fff';g.fillRect(x+2,y-6,5,1.5)}
function drawF(f){if(!f.P)animStep(f);const c=f.c,P=f.P,J=geo(f),s=f.st,k=f.t,nm=f.id==='naman',Q=SK[f.id],O='#140a1e',[hx,hy]=J.hd,H=J.hip,S=J.sh,skin=c.skin,sh2=nm?'#c98a5c':'#dc9c76';
const lp=a=>a.map(q=>[(q.x-f.x)*f.face,q.y-(G-f.y)]),hr=lp(f.ch.hr),tc=lp(f.ch.tl),sw=Math.max(-9,Math.min(9,(hr[3][0]-hr[0][0])*.5));
if(!inSil)drawShadow(f);
g.save();g.translate(f.x,G-f.y);g.scale(f.face*(f.sx||1),1);g.lineCap='round';g.lineJoin='round';
if(!inSil&&s!=='ko'&&(f.rage>0||f.aura||s==='power'||s==='ultimate')){const rg=f.rage>0||s==='power'||s==='ultimate';g.save();g.globalCompositeOperation='lighter';glow(0,-85,(rg?95:70)+Math.sin(T*.3)*6,nm?'60,150,255':'255,110,190',rg?.55:.2);if(f.rage>0)glow(0,-60,60,'255,40,40',.35);g.restore()}
const E=s==='ko'?'x':s==='win'?'s':s==='hit'?'p':(AT[s]||s==='power'||s==='ultimate')?'a':(s==='block'||f.hp<30)?'t':'n',blink=!['ko','win','hit'].includes(s)&&((T+(nm?0:97))%230)<6,open=['special','win','counter'].includes(s)||(s==='block'&&!nm);
const seg=(x1,y1,x2,y2,w,col)=>{for(const o of[1,0]){g.strokeStyle=o?O:col;g.lineWidth=w+o*3;g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke()}},
poly=(p,col,ln=2)=>{g.beginPath();p.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=O;g.lineWidth=ln;g.stroke()},
rib=(pts,ws,col,dx,dy)=>{for(const o of[1,0]){g.strokeStyle=o?O:col;for(let i=1;i<pts.length;i++){g.lineWidth=(ws[i]+ws[i-1])/2+o*3;g.beginPath();g.moveTo(pts[i-1][0]+dx,pts[i-1][1]+dy);g.lineTo(pts[i][0]+dx,pts[i][1]+dy);g.stroke()}}},
arm=(sx,a,dark)=>{const sk=dark?sd(skin,.86):skin,fx=a[2]-a[0],fy=a[3]-a[1],fl=Math.hypot(fx,fy)||1,px=-fy/fl,py=fx/fl;dot(sx,S[1]+4,nm?7:5.4,sk);tl([sx,S[1]+4],[a[0],a[1]],[a[2],a[3]],nm?12:9,nm?10.5:7.5,nm?7.5:5.2,sk,O);
 const m=nm?.5:.78;seg(a[0]+fx*m,a[1]+fy*m,a[0]+fx*.9,a[1]+fy*.9,nm?8:6,dark?sd(c.acc,.8):c.acc);
 if(nm){g.strokeStyle=sd(c.acc,.55);g.lineWidth=1;for(const t of[.58,.68,.78,.86]){g.beginPath();g.moveTo(a[0]+fx*t+px*4,a[1]+fy*t+py*4);g.lineTo(a[0]+fx*t-px*4,a[1]+fy*t-py*4);g.stroke()}}
 hand(a[2],a[3],Math.atan2(fy,fx),open,sk,O)},
leg=(sx,a,dark)=>{const pc=dark?sd(c.pants,.78):c.pants,sk=dark?sd(skin,.86):skin,dx=a[0]-sx,dy=a[1]-H[1],dl=Math.hypot(dx,dy)||1,nx=-dy/dl,ny=dx/dl,ex=a[2]-a[0],ey=a[3]-a[1],el=Math.hypot(ex,ey)||1,qx=-ey/el,qy=ex/el;
 tl([sx,H[1]],[a[0],a[1]],[a[2],a[3]],nm?17:14,nm?13:11,nm?9:7,nm?pc:sk,O);
 if(nm){g.strokeStyle=dark?sd(c.acc,.7):c.acc;g.lineWidth=2;g.beginPath();g.moveTo(sx+nx*4.5,H[1]+ny*4.5);g.lineTo(a[0]+nx*3.5,a[1]+ny*3.5);g.lineTo(a[2]+qx*2.5,a[3]+qy*2.5);g.stroke();
  g.strokeStyle=sd(pc,.6);g.lineWidth=1.3;for(let i=-1;i<=1;i++){const kx=a[0]+dx/dl*i*3,ky=a[1]+dy/dl*i*3;g.beginPath();g.moveTo(kx-nx*5,ky-ny*5);g.lineTo(kx+nx*3,ky+ny*3);g.stroke()}
  shoe(a[2],a[3],dark?'#c9d0e0':'#eef3ff',c.acc,O);seg(a[2]-ex/el*9,a[3]-ey/el*9,a[2]-ex/el*2,a[3]-ey/el*2,11,sd(pc,.85))}
 else{const b0=[a[0]+ex*.35,a[1]+ey*.35];tl(b0,[(b0[0]+a[2])/2,(b0[1]+a[3])/2],[a[2],a[3]],13,11,9.5,pc,O);
  g.strokeStyle='rgba(255,255,255,.28)';g.lineWidth=1.8;g.beginPath();g.moveTo(b0[0]-qx*3,b0[1]-qy*3);g.lineTo(a[2]-qx*3,a[3]-qy*3);g.stroke();g.strokeStyle='rgba(8,4,30,.35)';g.beginPath();g.moveTo(b0[0]+qx*4,b0[1]+qy*4);g.lineTo(a[2]+qx*4,a[3]+qy*4);g.stroke();
  seg(b0[0]+qx*7,b0[1]+qy*7,b0[0]-qx*7,b0[1]-qy*7,3.5,c.acc);dot(b0[0]-qx*5,b0[1]-qy*5,1.6,'#fff');shoe(a[2],a[3],pc,c.acc,O)}};
arm(S[0]-3,J.aB,true);leg(H[0]-3,J.lB,true);
/* back hair */
if(nm){lock(hx-8,hy-6,hx-19+sw,hy+14,10,Q.hair2,O);lock(hx-4,hy-2,hx-12+sw*.8,hy+18,9,Q.hair,O);lock(hx-11,hy-9,hx-23+sw*1.2,hy+5,9,Q.hair,O)}
else{rib(hr,[15,18,17,15,13,10,6,2],Q.hair2,-4,3);rib(hr,[13,16,15,13,11,8,5,1.5],Q.hair,0,0);g.globalAlpha=.7;g.strokeStyle=Q.hi;g.lineWidth=1.6;g.beginPath();hr.forEach(([x,y],i)=>i?g.lineTo(x+3,y):g.moveTo(x+3,y));g.stroke();g.globalAlpha=1}
/* near leg first, then clothing is layered OVER the body and leg tops so it reads as worn */
leg(H[0]+3,J.lF,false);
const mx=(S[0]+H[0])/2,my=(S[1]+H[1])/2,lnA=Math.abs(P.ln);
const cloth=(pf,col,inner,lw)=>{g.save();g.beginPath();pf();g.closePath();const gr=g.createLinearGradient(S[0]-12,S[1],H[0]+12,H[1]+8);gr.addColorStop(0,sd(col,1.2));gr.addColorStop(1,sd(col,.8));g.fillStyle=gr;g.fill();g.clip();g.fillStyle='rgba(8,4,30,.3)';g.beginPath();g.moveTo(S[0]-16,S[1]-6);g.lineTo(S[0]-3,S[1]-6);g.lineTo(H[0]-4,H[1]+14);g.lineTo(H[0]-16,H[1]+14);g.fill();if(inner)inner();g.restore();g.beginPath();pf();g.closePath();g.strokeStyle=O;g.lineWidth=lw||1.8;g.stroke()};
g.beginPath();g.moveTo(S[0]-9,S[1]+1);g.bezierCurveTo(S[0]-11,S[1]+9,H[0]-10,my,H[0]-8,H[1]);g.lineTo(H[0]+9,H[1]);g.bezierCurveTo(H[0]+9,my,S[0]+13,S[1]+16,S[0]+11,S[1]+4);g.lineTo(S[0]+2,S[1]-3);g.closePath();g.fillStyle=skin;g.fill();g.strokeStyle=O;g.lineWidth=2;g.stroke();
if(nm){g.beginPath();g.moveTo(H[0]-11,H[1]-3);g.lineTo(H[0]+12,H[1]-3);g.quadraticCurveTo(H[0]+15,H[1]+7,H[0]+13,H[1]+14);g.lineTo(H[0]-13,H[1]+14);g.quadraticCurveTo(H[0]-14,H[1]+5,H[0]-11,H[1]-3);g.fillStyle=c.pants;g.fill();
 const sp=()=>{g.moveTo(S[0]-10,S[1]+2);g.bezierCurveTo(S[0]-12,S[1]+10,H[0]-11,my,H[0]-10,H[1]+1);g.quadraticCurveTo(H[0]+1,H[1]+7,H[0]+11,H[1]+1);g.bezierCurveTo(H[0]+12,my,S[0]+15,S[1]+17,S[0]+12,S[1]+5);g.lineTo(S[0]+6,S[1]-2);g.quadraticCurveTo(S[0]+1,S[1]-4,S[0]-6,S[1]-2)};
 cloth(sp,c.top,()=>{g.strokeStyle=c.acc;g.lineWidth=2.6;g.beginPath();g.moveTo(S[0]-9,S[1]+8);g.lineTo(H[0]-9,H[1]);g.stroke();g.fillStyle='rgba(255,255,255,.22)';g.beginPath();g.ellipse(S[0]+7,S[1]+10,4,7,.25,0,7);g.fill();g.strokeStyle=sd(c.top,.55);g.globalAlpha=.5+lnA*1.5;g.lineWidth=1.2;g.beginPath();g.moveTo(S[0]+10,S[1]+14);g.quadraticCurveTo(S[0]+6,S[1]+17,S[0]+1,S[1]+17);g.moveTo(H[0]-5,H[1]-7);g.lineTo(H[0]-2,H[1]+1);g.moveTo(H[0]+3,H[1]-9);g.lineTo(H[0]+6,H[1]);g.stroke();g.globalAlpha=1});
 poly([[S[0]+1,S[1]-2],[S[0]+9,S[1]+4],[S[0]+4,S[1]+15]],skin,1.5);g.strokeStyle=c.acc;g.lineWidth=1.6;g.beginPath();g.moveTo(S[0]+1,S[1]-2);g.lineTo(S[0]+4,S[1]+15);g.lineTo(S[0]+9,S[1]+4);g.stroke();
 g.strokeStyle='#10183a';g.lineWidth=4.5;g.beginPath();g.moveTo(H[0]-11,H[1]+4);g.lineTo(H[0]+12,H[1]+4);g.stroke();g.fillStyle=c.acc;g.fillRect(H[0]+3,H[1]+1.5,5,5)}
else{const tpp=()=>{g.moveTo(S[0]-9,S[1]+2);g.bezierCurveTo(S[0]-10,S[1]+7,S[0]-9,S[1]+11,S[0]-8,S[1]+14);g.quadraticCurveTo(S[0]+2,S[1]+18,S[0]+13,S[1]+13);g.bezierCurveTo(S[0]+16,S[1]+8,S[0]+15,S[1]+3,S[0]+11,S[1]+4);g.quadraticCurveTo(S[0]+4,S[1]-1,S[0]-3,S[1])};
 cloth(tpp,c.top,()=>{g.strokeStyle=sd(c.top,.6);g.lineWidth=1.2;g.beginPath();g.moveTo(S[0]-8,S[1]+11);g.quadraticCurveTo(S[0]+3,S[1]+15,S[0]+14,S[1]+10);g.stroke();g.fillStyle='rgba(255,255,255,.28)';g.beginPath();g.ellipse(S[0]+8,S[1]+7,3.5,4.5,.3,0,7);g.fill()},1.8);
 g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.moveTo(S[0]-8,S[1]+14);g.quadraticCurveTo(S[0]+2,S[1]+18,S[0]+13,S[1]+13);g.stroke();
 g.strokeStyle=c.top;g.lineWidth=2;g.beginPath();g.moveTo(S[0]+3,S[1]-1);g.lineTo(S[0]+6,S[1]+4);g.moveTo(S[0]-4,S[1]);g.lineTo(S[0]-8,S[1]+4);g.stroke();dot(mx+3,my+4,1,sh2);
 const q=Math.max(-16,Math.min(16,f.hs*.5)),lf=Math.min(10,Math.max(0,-f.vy)*.7),wv=Math.sin(T*.1)*2,wl=[H[0]-10,H[1]-4],wr=[H[0]+10,H[1]-4],hl=[H[0]-21+q,H[1]+23-lf-wv],hm=[H[0]+q,H[1]+27-lf],hr=[H[0]+21+q,H[1]+23-lf+wv],
 hp=t=>t<.5?[hl[0]+(hm[0]-hl[0])*t*2,hl[1]+(hm[1]-hl[1])*t*2]:[hm[0]+(hr[0]-hm[0])*(t-.5)*2,hm[1]+(hr[1]-hm[1])*(t-.5)*2],tq=t=>[wl[0]+(wr[0]-wl[0])*t,wl[1]];
 for(let i=0;i<5;i++){const p0=tq(i/5),p1_=tq((i+1)/5),h0=hp(i/5),h1=hp((i+1)/5);g.beginPath();g.moveTo(p0[0],p0[1]);g.lineTo(p1_[0],p1_[1]);g.lineTo(h1[0],h1[1]);g.lineTo(h0[0],h0[1]);g.closePath();g.fillStyle=sd(c.pants,i%2?.82:1.12);g.fill()}
 g.beginPath();g.moveTo(wl[0],wl[1]);g.lineTo(hl[0],hl[1]);g.lineTo(hm[0],hm[1]);g.lineTo(hr[0],hr[1]);g.lineTo(wr[0],wr[1]);g.closePath();g.strokeStyle=O;g.lineWidth=1.8;g.stroke();
 g.strokeStyle=c.acc;g.lineWidth=2.6;g.beginPath();g.moveTo(hl[0],hl[1]);g.lineTo(hm[0],hm[1]);g.lineTo(hr[0],hr[1]);g.stroke();
 g.beginPath();g.moveTo(wl[0]-1,wl[1]-2);g.quadraticCurveTo(H[0],H[1]-1,wr[0]+1,wr[1]-2);g.lineTo(wr[0]+1,wr[1]+3);g.quadraticCurveTo(H[0],H[1]+3,wl[0]-1,wl[1]+3);g.closePath();g.fillStyle=c.acc;g.fill();g.strokeStyle=O;g.lineWidth=1.6;g.stroke();
 lock(H[0]-9,H[1]-4,H[0]-21+sw,H[1]+16,6,c.acc,O);lock(H[0]-9,H[1]-4,H[0]-14+sw,H[1]+22,5,c.acc,O)}
/* head */
seg(S[0]+1,S[1]-2,hx-1,hy+13,7,skin);
g.beginPath();g.moveTo(hx-2,hy-15);g.bezierCurveTo(hx+8,hy-15,hx+14,hy-8,hx+13.5,hy+1);g.bezierCurveTo(hx+13.5,hy+5,hx+14.8,hy+6,hx+13,hy+9);g.bezierCurveTo(hx+11,hy+13,hx+7,hy+16,hx+3,hy+16);g.bezierCurveTo(hx-5,hy+16,hx-12,hy+9,hx-13,hy-1);g.bezierCurveTo(hx-13,hy-10,hx-8,hy-15,hx-2,hy-15);g.fillStyle=skin;g.fill();g.strokeStyle=O;g.lineWidth=2;g.stroke();
dot(hx-4,hy+3,3.2,skin);g.strokeStyle=sh2;g.lineWidth=1;g.beginPath();g.arc(hx-4,hy+3,1.6,-1,2);g.stroke();
if(!nm){g.fillStyle='rgba(255,110,150,.35)';g.beginPath();g.ellipse(hx+6,hy+8.5,4,2,0,0,7);g.fill()}
/* hair cap + accessories */
g.beginPath();g.moveTo(hx-14,hy+4);g.bezierCurveTo(hx-18,hy-14,hx-2,hy-22,hx+9,hy-17);g.bezierCurveTo(hx+14,hy-14,hx+15,hy-9,hx+14,hy-4);g.lineTo(hx+8,hy-8);g.quadraticCurveTo(hx,hy-10,hx-7,hy-6);g.lineTo(hx-9,hy+4);g.closePath();g.fillStyle=Q.hair;g.fill();g.strokeStyle=O;g.lineWidth=1.6;g.stroke();
g.globalAlpha=.6;g.strokeStyle=Q.hi;g.lineWidth=1.6;g.beginPath();g.moveTo(hx-8,hy-13);g.quadraticCurveTo(hx-1,hy-18,hx+7,hy-13);g.stroke();g.globalAlpha=1;
if(nm){g.strokeStyle=O;g.lineWidth=6.5;g.beginPath();g.moveTo(hx-14,hy-3);g.quadraticCurveTo(hx,hy-12,hx+14,hy-6);g.stroke();g.strokeStyle='#0b2a6b';g.lineWidth=4;g.stroke();g.strokeStyle=c.acc;g.lineWidth=1;g.stroke();
 for(let i=1;i<tc.length;i++){for(const o of[1,0]){g.strokeStyle=o?O:(i%2?'#0b2a6b':'#12408f');g.lineWidth=7-i*1.1+o*2.5;g.beginPath();g.moveTo(tc[i-1][0],tc[i-1][1]);g.lineTo(tc[i][0],tc[i][1]);g.stroke()}}
 lock(hx+8,hy-13,hx+14,hy-2,7,Q.hair,O);lock(hx+3,hy-15,hx+9,hy-4,8,Q.hair,O);lock(hx-3,hy-15,hx+1,hy-4,7,Q.hair,O);lock(hx-8,hy-12,hx-5,hy+1,6,Q.hair2,O);lock(hx-5,hy-9,hx-7+sw*.3,hy+10,7,Q.hair,O)}
else{lock(hx+3,hy-15,hx+12,hy-1,9,Q.hair,O);lock(hx-2,hy-15,hx+6,hy-3,8,Q.hair,O);lock(hx+9,hy-12,hx+15,hy+7,5,Q.hair,O);lock(hx-4,hy-8,hx-5+sw*.3,hy+22,8,Q.hair,O);
 for(let i=0;i<5;i++){g.save();g.translate(hx-8,hy-11);g.rotate(i*1.256);g.fillStyle=i%2?'#ff9fd0':'#ffc2e6';g.strokeStyle=O;g.lineWidth=1;g.beginPath();g.ellipse(5,0,5,2.6,0,0,7);g.fill();g.stroke();g.restore()}dot(hx-8,hy-11,2,'#ffd23f')}
/* face */
const eye=(ex,ey,rx,ry)=>{g.strokeStyle=Q.lash;
 if(blink){g.lineWidth=2.2;g.beginPath();g.moveTo(ex-rx,ey+1);g.quadraticCurveTo(ex,ey+3,ex+rx,ey+1);g.stroke();return}
 if(E==='x'){g.lineWidth=2;g.beginPath();g.moveTo(ex-3,ey-3);g.lineTo(ex+3,ey+3);g.moveTo(ex+3,ey-3);g.lineTo(ex-3,ey+3);g.stroke();return}
 if(E==='s'){g.lineWidth=2.4;g.beginPath();g.arc(ex,ey+2.5,rx,Math.PI*1.12,Math.PI*1.88);g.stroke();return}
 if(E==='p'){g.lineWidth=2.4;g.beginPath();g.moveTo(ex-rx,ey-3);g.lineTo(ex+rx*.6,ey);g.lineTo(ex-rx,ey+3);g.stroke();return}
 const r=ry*(E==='a'?.72:E==='t'?.8:1);g.fillStyle='#fff';g.beginPath();g.ellipse(ex,ey,rx,r,0,0,7);g.fill();
 const ig=g.createLinearGradient(0,ey-r,0,ey+r);ig.addColorStop(0,Q.iris2);ig.addColorStop(.55,Q.iris);ig.addColorStop(1,Q.iris3);g.fillStyle=ig;g.beginPath();g.ellipse(ex+.9,ey+.4,rx*.78,r*.88,0,0,7);g.fill();
 g.fillStyle='#0a0614';g.beginPath();g.ellipse(ex+.9,ey+.4,rx*.38,r*.5,0,0,7);g.fill();g.fillStyle='#fff';g.beginPath();g.arc(ex-.4,ey-r*.38,1.5,0,7);g.fill();g.beginPath();g.arc(ex+2,ey+r*.4,.8,0,7);g.fill();
 g.lineWidth=2.6;g.beginPath();g.moveTo(ex-rx-1,ey-r*.3);g.quadraticCurveTo(ex,ey-r*1.45,ex+rx+.5,ey-r*.45);g.stroke();g.lineWidth=1.8;g.beginPath();g.moveTo(ex-rx-1,ey-r*.3);g.lineTo(ex-rx-3,ey-r*.9);g.stroke();
 g.lineWidth=1;g.beginPath();g.moveTo(ex-rx+1,ey+r*.8);g.quadraticCurveTo(ex,ey+r*1.1,ex+rx-1,ey+r*.7);g.stroke();if(!nm){g.lineWidth=1.4;g.beginPath();g.moveTo(ex+rx+.5,ey-r*.45);g.lineTo(ex+rx+3,ey-r*.9);g.stroke()}},
brow=(ex,ey,rx)=>{const d=E==='a'?[-1,2.5]:E==='p'?[-3,-3]:E==='t'?[0,1]:[0,-.5];g.strokeStyle=Q.hair;g.lineWidth=1.9;g.beginPath();g.moveTo(ex-rx,ey-8+d[0]);g.quadraticCurveTo(ex,ey-9.5+(d[0]+d[1])/2,ex+rx,ey-8+d[1]);g.stroke()};
eye(hx+2.5,hy+2,4.2,5.2);eye(hx+10,hy+2.2,2.9,4.8);brow(hx+2.5,hy+2,4.5);brow(hx+10,hy+2.2,3);
g.strokeStyle=sh2;g.lineWidth=1.3;g.beginPath();g.moveTo(hx+13.5,hy+5);g.lineTo(hx+14.6,hy+7.2);g.lineTo(hx+13,hy+8);g.stroke();
const mx2=hx+8.5,my2=hy+10.5;g.strokeStyle='#5a2430';g.lineWidth=1.6;
if(E==='a'){g.fillStyle='#5a1522';g.beginPath();g.ellipse(mx2,my2,3,2.4,0,0,7);g.fill();g.fillStyle='#ff8fa0';g.beginPath();g.ellipse(mx2,my2+1,1.8,1,0,0,7);g.fill()}
else if(E==='p'){g.fillStyle='#5a1522';g.beginPath();g.ellipse(mx2,my2+.5,2.6,3.6,0,0,7);g.fill()}
else if(E==='s'){g.fillStyle='#5a1522';g.beginPath();g.moveTo(mx2-4,my2-1);g.quadraticCurveTo(mx2,my2+7,mx2+4.5,my2-1);g.closePath();g.fill();g.fillStyle='#fff';g.fillRect(mx2-3,my2-1,6.5,1.6)}
else if(E==='x'){g.beginPath();g.moveTo(mx2-3,my2+1);g.lineTo(mx2+3,my2+1);g.stroke()}
else{g.beginPath();g.moveTo(mx2-3,my2);g.quadraticCurveTo(mx2,my2+(E==='t'?0:1.8),mx2+3.5,my2-.5);g.stroke()}
arm(S[0]+3,J.aF);
if(AT[s]){const q=s==='kick'?[J.lF[2],J.lF[3]]:[J.aF[2],J.aF[3]];g.globalAlpha=.8;if(nm){dot(q[0]+Math.random()*4,q[1]-6-Math.random()*6,9,'#2f8cff');dot(q[0],q[1]-3,5.5,'#d9f4ff');dot(q[0]-3,q[1]-12-Math.random()*6,4,'#6fd0ff')}else{for(let i=0;i<4;i++){const a=T*.3+i*1.6;g.fillStyle=i%2?'#ff9fd0':'#ffd0ea';g.beginPath();g.ellipse(q[0]+Math.cos(a)*12,q[1]+Math.sin(a)*12,6,3,a,0,7);g.fill()}}g.globalAlpha=1}
if(s==='special'&&k<14){g.globalAlpha=.6;dot(J.aF[2]+10,J.aF[3],10+k*1.4,c.sc);g.globalAlpha=1}
if(s==='block'){g.strokeStyle=nm?'rgba(80,170,255,.65)':'rgba(255,160,220,.65)';g.lineWidth=5;g.beginPath();g.arc(22,-92,46,-1,1);g.stroke()}
g.restore()}
