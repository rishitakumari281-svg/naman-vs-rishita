/* ---------- UI WIRING ---------- */
function setDiff(){document.querySelectorAll('[data-d]').forEach(b=>b.classList.toggle('on',b.dataset.d===S.diff))}
$('#mv').value=S.music*100;$('#sv').value=S.sfx*100;setDiff();$('#ar').textContent='Arena: '+ARN[S.arena|0];
$('#mv').oninput=e=>{S.music=e.target.value/100;vol();save()};$('#sv').oninput=e=>{S.sfx=e.target.value/100;vol();save()};
document.querySelectorAll('[data-p]').forEach(b=>b.addEventListener('pointerover',()=>hov=b.dataset.p));$('#sel').addEventListener('pointerleave',()=>hov='');
document.addEventListener('click',e=>{const b=e.target.closest('button'),d=b&&b.dataset;if(!b||!(d.a||d.p||d.d))return;initA();sfx('ui');
if(d.p){startMatch(d.p);return}
if(d.d){S.diff=d.d;setDiff();save();return}
const a=d.a;
if(a==='sel'||a==='train'){train=a==='train'?1:0;boss=0;scr='sel';show('sel')}
else if(a==='how'){from='menu';show('how')}
else if(a==='set'){from=scr==='fight'?'pause':'menu';show('set')}
else if(a==='back')show(from)
else if(a==='setb')show('set')
else if(a==='boss'){boss=1;train=0;scr='sel';show('sel')}else if(a==='prog'){rProg();show('prog')}else if(a==='gal')openGal();else if(a==='ach'){rA();show('ach')}
else if(a==='keys'){drawKeys();show('keys')}
else if(a==='kreset'){S.keys={...DK};save();drawKeys()}
else if(a==='arena'){S.arena=((S.arena|0)+1)%4;save();$('#ar').textContent='Arena: '+ARN[S.arena]}
else if(a==='dummy'){dm=({idle:'block',block:'crouch',crouch:'attack',attack:'idle'})[dm];$('#dm').textContent='Dummy: '+dm}
else if(a==='menu'){scr='menu';paused=false;mt=0;hov='';show('menu')}
else if(a==='resume')tp();
else if(a==='pause')tp();
else if(a==='restart'||a==='rematch')startMatch(p1.id);
else if(a==='mute'){S.mute=S.mute?0:1;vol();save();$('#mb').textContent=S.mute?'🔇':'🔊';$('#mt').textContent=S.mute?'Unmute':'Mute'}});
$('#mb').textContent=S.mute?'🔇':'🔊';$('#mt').textContent=S.mute?'Unmute':'Mute';
requestAnimationFrame(loop);
const KN={l:'Move left',r:'Move right',j:'Jump',c:'Crouch',p:'Punch',k:'Kick',b:'Block',s:'Special',u:'Run',o:'Dodge',z:'Ultimate'};
function drawKeys(){const e=$('#kl');e.innerHTML='';for(const a in KN){const b=document.createElement('button'),v=S.keys[a];b.textContent=KN[a]+': '+(rb===a?'press a key':v===' '?'space':v);b.onclick=()=>{rb=a;drawKeys()};e.appendChild(b)}}
