(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile=()=>innerWidth<768;
const GH='https://github.com/Blazikener/';

/* ---------- data ---------- */
const WORKS=[
 {slug:'marcus',name:'Marcus Intelligence',badge:'Live',year:'2025',line:'Autonomous QA that doesn\'t hallucinate',kicker:'Co-founder & AI engineer · 2025 – now',
  sub:'AI-written tests look impressive, then click buttons that don\'t exist or, worse, submit real payments.',stat:['5,000+','test runs across ~20 web apps'],
  built:'An autonomous QA agent that maps the real page, lets an LLM draft steps, throws out any step it can\'t ground in a real element, and blocks risky actions by policy before running them in a real browser.',
  result:'~40% less time reviewing results, with screenshot evidence for every failure.',stack:['Python','FastAPI','Playwright','browser-use','OpenAI','PostgreSQL / Supabase','Next.js'],links:[['marcusai.in','https://marcusai.in']]},
 {slug:'unprompted',name:'Unprompted',badge:'3rd place',year:'2026',line:'Finds creators who already mention your brand',kicker:'Replit × Oriane hackathon · 3rd place',
  sub:'Brands pay creators to talk about them, while the ones who already do it for free go unnoticed.',stat:['Every','match backed by a quote, timestamp and frame'],
  built:'Search across creator videos for spoken brand mentions (including ones never written in captions), with an evidence player that jumps to the exact moment, plus collab and licensing flows for brands and creators.',
  result:'Placed 3rd at Replit × Oriane, then kept building it into a product with creator, brand and manager dashboards.',stack:['Python','PostgreSQL','Oriane video search','Vanilla JS','Stripe'],links:[['GitHub',GH+'unprompted']]},
 {slug:'resolve',name:'Resolve',badge:'Open source',year:'2026',line:'A finance agent that can\'t go rogue',kicker:'Agent · finance ops',
  sub:'Accounts-payable exceptions eat finance teams\' time, and nobody wants an LLM freely touching invoices and supplier emails.',stat:['8','tool steps max, every case audited'],
  built:'Deterministic rule checks first, a fixed tool-step budget, a policy gateway with tool allow-lists, supplier emails treated as untrusted input, and UAE e-invoicing credit-note handling.',
  result:'Every case ends in an auditable resolution packet, and a red-team planner continuously probes the limits.',stack:['Python','FastAPI','OpenAI tool-calling','Pytest'],links:[['GitHub',GH+'resolve-']]},
 {slug:'uni',name:'University AI assistant',badge:'10,000+ users',year:'2025',line:'RAG assistant for Sathyabama students',kicker:'Client delivery · Martech AI',
  sub:'Students had to dig through scattered university documents to answer simple questions.',stat:['10,000+','students served'],
  built:'A document-grounded RAG assistant: ingestion of university documents, OpenAI embeddings, Pinecone retrieval and answers that stay inside the sources.',
  result:'Shipped to production for the client during my internship at Martech AI.',stack:['Python','LangChain','OpenAI embeddings','Pinecone'],links:[['GitHub',GH+'Sathyabama-ChatBot']]},
 {slug:'mobile-use',name:'mobile-use',badge:'Open source',year:'2026',line:'PRs to an AI agent that drives real phones',kicker:'Open source · minitap-ai/mobile-use (3.2k★)',
  sub:'I fix the tools I use, upstream.',stat:['3','PRs to mobile-use'],
  built:'#228 opt-in strict app lock with deterministic foreground checks. #230 honours the resource-ID index when searching the UI tree, for precision taps. #231 experimental Poco UI hierarchies so the agent can operate Android games.',
  result:'Also PR #49 to CAMB.AI\'s Python SDK, lazy-loading sounddevice so live transcription works without PortAudio.',stack:['Python','Android','UI automation'],
  links:[['PR #228','https://github.com/minitap-ai/mobile-use/pull/228'],['PR #230','https://github.com/minitap-ai/mobile-use/pull/230'],['PR #231','https://github.com/minitap-ai/mobile-use/pull/231']]},
 {slug:'furprint',name:'FurPrint',year:'2026',line:'A search party for lost cats',kicker:'Side project',
  sub:'When a cat goes missing, neighbours want to help but nobody knows where to look.',stat:['1','shared map for the whole search'],
  built:'An evidence-based search zone, shared areas so volunteers don\'t double up, sighting reports and matching for found cats, with moderation and data retention built in.',
  result:'Taken from v1 to production hardening: migrations, moderation, retention and security headers.',stack:['Python','PostgreSQL + PostGIS','Supabase','Docker'],links:[['GitHub',GH+'FurPrint']]},
];
const MORE=[
 {slug:'gate',name:'Marcus Gate',year:'2026',line:'Merge gate for cross-tenant data leaks',kicker:'Open source · CI',
  sub:'One tenant reading another tenant\'s data is the bug that ends a B2B company.',stat:['0','cross-tenant reads allowed to merge'],
  built:'A merge gate that fails a pull request when one tenant can read another tenant\'s object, with redacted evidence and an agent handoff.',result:'Runs in CI on every PR.',stack:['Python','GitHub Actions'],links:[['GitHub',GH+'marcus-gate']]},
 {slug:'forecast',name:'Sales forecasting',year:'2025',line:'Revenue from multi-channel ad spend',kicker:'ML · RahaXR',
  sub:'The team needed to know which ad channels actually move revenue.',stat:['R² = 0.96','on a held-out split'],
  built:'Benchmarked linear regression, XGBoost and random forest on ~5,000 rows of company sales, plus a voice-command inventory analytics pilot (FastAPI + Streamlit).',result:'The model comparison report guided production model selection.',stack:['Python','scikit-learn','XGBoost','FastAPI','Streamlit'],links:[]},
 {slug:'farasat',name:'Farasat Al Sahraa',year:'2026',line:'Abu Dhabi Game Jam entry',kicker:'Game jam',
  sub:'48 hours, one theme, one playable game.',stat:['1','game shipped in a weekend'],
  built:'A desert game built for the Abu Dhabi Game Jam.',result:'Shipped and playable at the end of the jam.',stack:['Game jam'],links:[['GitHub',GH+'Farasat-Al-Sahraa']]},
];
const GHOST=['a QA agent that throws out every step it can\'t ground.','a finance agent that can\'t go rogue.','brand-mention search across creator videos.','a search party app for lost cats.','this website.'];
const TOOLS=[['python','Python'],['typescript','TypeScript'],['fastapi','FastAPI'],['postgresql','PostgreSQL'],['supabase','Supabase'],['nextdotjs','Next.js'],['openai','OpenAI'],['langchain','LangChain'],[null,'Playwright','Pw'],[null,'Pinecone','Pc'],['docker','Docker'],[null,'Devin','Dv']];

/* ---------- render lists ---------- */
$('#tools').innerHTML=TOOLS.map(([k,n,ab])=>`<div class="tool"><i>${k&&ICONS[k]?ICONS[k]:`<b>${ab}</b>`}</i>${n}</div>`).join('');
const card=w=>`<button class="work" data-slug="${w.slug}"><div class="hd"><h3>${w.name}</h3>${w.badge?`<span class="badge">${w.badge}</span>`:''}<span class="y">${w.year}</span></div><p>${w.line}</p><span class="arr">↗</span></button>`;
$('#works').innerHTML=WORKS.map(card).join('')+
 `<div class="more-list" id="moreList"><div style="display:contents">${MORE.map(card).join('')}<div class="work" id="game" tabindex="0" role="button" aria-label="Bug squash mini game"><canvas></canvas><div class="gt"><h3>More coming soon</h3><p id="gameMsg"><span class="hov">Click or press space to help ship it</span></p></div></div></div></div>`+
 `<button class="more-btn" id="moreBtn" aria-expanded="false"><span>More</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 5v14M5 12h14"/></svg></button>`;

/* ---------- lenis ---------- */
let lenis=null;
if(!RM&&window.Lenis){lenis=new Lenis({lerp:.1,smoothWheel:true});const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf)}
const go=h=>{const el=$(h);if(!el)return;lenis?lenis.scrollTo(el,{offset:0,duration:1.4}):el.scrollIntoView({behavior:'smooth'})};
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();closeMenu();go(a.getAttribute('href'))}));

/* ---------- menu ---------- */
const menuBtn=$('#menuBtn');
function closeMenu(){document.body.classList.remove('menu-open');menuBtn.textContent='Menu';menuBtn.setAttribute('aria-expanded','false');$('#menu').setAttribute('aria-hidden','true')}
menuBtn.onclick=()=>{const o=document.body.classList.toggle('menu-open');menuBtn.textContent=o?'Close':'Menu';menuBtn.setAttribute('aria-expanded',o);$('#menu').setAttribute('aria-hidden',!o);$$('#menu a').forEach((a,i)=>a.style.transitionDelay=o?(.06*i+.05)+'s':'0s')};
$('#menu').addEventListener('click',e=>{if(e.target.id==='menu')closeMenu()});
const star=$('#star');
const onScroll=()=>{star.style.transform=`rotate(${scrollY*.25}deg)`;revealWords()};
addEventListener('scroll',onScroll,{passive:true});

/* ---------- clock ---------- */
const tick=()=>{const t=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Dubai'}).format(new Date());$$('.clock').forEach(c=>c.textContent=t)};tick();setInterval(tick,15000);

/* ---------- name fit ---------- */
function fitName(){const n=$('#name'),span=getComputedStyle($('.d')).display!=='none'?$('.d'):$('.m');n.style.setProperty('--nfs','100px');const w=span.getBoundingClientRect().width;const avail=n.clientWidth;n.style.setProperty('--nfs',(100*avail/w*.995)+'px')}
function splitName(){['.d','.m'].forEach(s=>{const el=$(s);el.innerHTML=[...el.textContent].map((c,i)=>`<span class="l" style="transition-delay:${(.035*i).toFixed(3)}s">${c===' '?'&nbsp;':c}</span>`).join('')})}
splitName();

/* ---------- reveal ---------- */
$$('[data-reveal]').forEach(p=>{p.innerHTML=p.textContent.trim().split(/\s+/).map(w=>`<span class="w">${w}</span>`).join(' ')});
function revealWords(){const vh=innerHeight;$$('[data-reveal]').forEach(p=>{const r=p.getBoundingClientRect();const pr=Math.min(1,Math.max(0,(vh*.88-r.top)/(r.height+vh*.3)));const ws=p.children;const n=ws.length;for(let i=0;i<n;i++)ws[i].classList.toggle('lit',RM||i<pr*n*1.15)})}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.fade').forEach(el=>io.observe(el));

/* ---------- run card ---------- */
(()=>{const lis=$$('#run li');let i=0,timer;const step=()=>{if(i>=lis.length){timer=setTimeout(()=>{lis.forEach(l=>l.classList.remove('on'));i=0;timer=setTimeout(step,700)},2600);return}lis[i++].classList.add('on');timer=setTimeout(step,900)};
 new IntersectionObserver(es=>{es.forEach(e=>{clearTimeout(timer);if(e.isIntersecting)step()})},{threshold:.3}).observe($('#card'))})();

/* ---------- ghost typer ---------- */
(()=>{const t=$('#ghost .t');let k=0,j=0,del=false;const loop=()=>{const s=GHOST[k];if(!del){t.textContent=s.slice(0,++j);if(j>=s.length){del=true;return setTimeout(loop,1700)}return setTimeout(loop,34)}t.textContent=s.slice(0,--j);if(j<=0){del=false;k=(k+1)%GHOST.length;return setTimeout(loop,300)}setTimeout(loop,16)};
 if(RM)t.textContent=GHOST[0];else setTimeout(loop,1500)})();

/* ---------- drawer ---------- */
const ALL=[...WORKS,...MORE];
function openWork(slug){const w=ALL.find(x=>x.slug===slug);if(!w)return;
 $('#dBody').innerHTML=`<p class="k">${w.kicker}</p><h2 id="dTitle">${w.name}</h2><p class="sub">${w.sub}</p><div class="stat"><b>${w.stat[0]}</b><span>${w.stat[1]}</span></div><dl><dt>What I built</dt><dd>${w.built}</dd><dt>Result</dt><dd>${w.result}</dd></dl><div class="chips">${w.stack.map(s=>`<span>${s}</span>`).join('')}</div><div class="links">${w.links.map(([l,u])=>`<a href="${u}" target="_blank" rel="noopener"><span>→</span>${l}</a>`).join('')}</div>`;
 document.body.classList.add('drawer-open');$('#drawer').setAttribute('aria-hidden','false');lenis&&lenis.stop();$('#drawer .pn').scrollTop=0;setTimeout(()=>$('#drawer .x').focus(),50)}
function closeDrawer(){document.body.classList.remove('drawer-open');$('#drawer').setAttribute('aria-hidden','true');lenis&&lenis.start()}
$('#works').addEventListener('click',e=>{const b=e.target.closest('.work[data-slug]');if(b)openWork(b.dataset.slug)});
$('#drawer .sc').onclick=closeDrawer;$('#drawer .x').onclick=closeDrawer;
addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawer();closeMenu()}});

/* ---------- more ---------- */
$('#moreBtn').onclick=()=>{const L=$('#moreList'),o=!$('#works').classList.contains('more-open');$('#works').classList.toggle('more-open',o);$('#moreBtn span').textContent=o?'Less':'More';$('#moreBtn').setAttribute('aria-expanded',o);
 const h=L.firstElementChild?L.scrollHeight:0;if(o){L.style.height=L.scrollHeight+'px';setTimeout(()=>{L.style.height='auto';game.resize()},820)}else{L.style.height=L.scrollHeight+'px';requestAnimationFrame(()=>requestAnimationFrame(()=>L.style.height='0px'))}};

/* ---------- email copy ---------- */
$$('[data-copy]').forEach(a=>a.addEventListener('click',()=>{navigator.clipboard&&navigator.clipboard.writeText(a.dataset.copy).then(()=>{const t=$('#toast');t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1800)}).catch(()=>{})}));

/* ---------- shared drag helper ---------- */
const M=window.Matter;
function dragger(canvas,engine,bodiesFn,opts={}){let con=null;const pos=e=>{const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
 canvas.addEventListener('pointerdown',e=>{const p=pos(e);const hit=M.Query.point(bodiesFn(),p)[0];if(!hit){opts.miss&&opts.miss(p,e);return}
  e.preventDefault();canvas.setPointerCapture(e.pointerId);const off={x:p.x-hit.position.x,y:p.y-hit.position.y};const c=Math.cos(-hit.angle),s=Math.sin(-hit.angle);
  con=M.Constraint.create({pointA:p,bodyB:hit,pointB:{x:off.x*c-off.y*s,y:off.x*s+off.y*c},stiffness:.16,damping:.08,length:0});M.World.add(engine.world,con);canvas.style.cursor='grabbing';opts.grab&&opts.grab(hit)});
 canvas.addEventListener('pointermove',e=>{const p=pos(e);if(con){con.pointA=opts.clamp?opts.clamp(p):p;return}canvas.style.cursor=M.Query.point(bodiesFn(),p).length?'grab':''});
 const up=()=>{if(con){M.World.remove(engine.world,con);con=null;canvas.style.cursor=''}};canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 return{active:()=>!!con}}

/* ---------- hero pills ---------- */
const PILLS=[{t:'AI ENGINEER'},{k:'star'},{t:'AGENTS'},{t:'4X HACKATHON WINNER'},{k:'emoji',e:'🤖'},{t:'EVALS'},{t:'FORWARD DEPLOYED',m:'FDE'},{k:'arrow'},{t:'GUARDRAILS',hm:1},{t:'OPEN SOURCE'},{k:'emoji',e:'🏆',hm:1},{t:'RAG',hm:1},{t:'FOUNDING ENGINEER',m:'FOUNDING'}];
function hero(){const cv=$('#pills'),ctx=cv.getContext('2d');const sec=$('#hero');let W,H,dpr=Math.min(devicePixelRatio||1,2),floorY;
 const engine=M.Engine.create({positionIterations:10,velocityIterations:8});engine.gravity.scale=.0009;let walls=[],bodies=[];
 const sc=()=>mobile()?.62:Math.min(1,innerWidth/1500+.1);
 function size(){W=sec.clientWidth;H=sec.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);const nr=$('#name').getBoundingClientRect(),sr=sec.getBoundingClientRect();floorY=nr.top-sr.top+parseFloat(getComputedStyle($('#name')).fontSize)*.07;
  if(walls.length)M.World.remove(engine.world,walls);walls=[M.Bodies.rectangle(W/2,floorY+100,W*4,200,{isStatic:true}),M.Bodies.rectangle(-100,H/2,200,H*4,{isStatic:true}),M.Bodies.rectangle(W+100,H/2,200,H*4,{isStatic:true})];M.World.add(engine.world,walls);
  bodies.forEach(b=>{if(b.position.y>floorY)M.Body.setPosition(b,{x:Math.min(W-60,Math.max(60,b.position.x)),y:floorY-80})})}
 size();
 function make(){const s=sc(),list=PILLS.filter(p=>!(mobile()&&p.hm));const hgt=92*s;
  bodies=list.map((p,i)=>{const x=Math.max(80,W/list.length)*(i+.5)+(Math.random()-.5)*40,y=-140-60*i;let b;
   if(p.t){const label=mobile()&&p.m?p.m:p.t;ctx.font=`500 ${28*s}px "Geist Mono"`;const w=ctx.measureText(label).width+76*s;b=M.Bodies.rectangle(x,y,w,hgt,{chamfer:{radius:hgt/2-.5},restitution:.38,friction:.55,frictionStatic:1.1,frictionAir:.022,density:.0009});b.plugin.p={label,w,h:hgt,s}}
   else{const r=46*s*(p.k==='emoji'?.9:1);b=M.Bodies.circle(x,y,r,{restitution:.42,friction:.5,frictionAir:.022,density:.0011});b.plugin.p={k:p.k,e:p.e,r,s}}
   M.Body.setAngle(b,(Math.random()-.5)*1.2);return b});M.World.add(engine.world,bodies)}
 function draw(){ctx.clearRect(0,0,W,H);const fg='#f2efe9',bg='#131313';
  for(const b of bodies){const p=b.plugin.p;ctx.save();ctx.translate(b.position.x,b.position.y);ctx.rotate(b.angle);
   if(p.label){ctx.beginPath();ctx.roundRect(-p.w/2,-p.h/2,p.w,p.h,p.h/2);ctx.fillStyle=bg;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle=fg;ctx.stroke();ctx.fillStyle=fg;ctx.font=`500 ${28*p.s}px "Geist Mono"`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.label,0,2*p.s)}
   else{ctx.beginPath();ctx.arc(0,0,p.r,0,7);if(p.k==='emoji'){ctx.fillStyle=bg;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle=fg;ctx.stroke();ctx.font=`${p.r*1.05}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.e,0,p.r*.07)}
    else{ctx.fillStyle=fg;ctx.fill();ctx.strokeStyle=bg;ctx.lineCap='round';ctx.lineWidth=3.4*p.s;const L=p.r*.55;ctx.beginPath();
     if(p.k==='star'){for(let a=0;a<3;a++){const t=a*Math.PI/3+Math.PI/2;ctx.moveTo(Math.cos(t)*L,Math.sin(t)*L);ctx.lineTo(-Math.cos(t)*L,-Math.sin(t)*L)}}
     else{ctx.moveTo(-L,L*.35);ctx.lineTo(L,-L*.35);ctx.moveTo(L*.35,-L*.7);ctx.lineTo(L,-L*.35);ctx.lineTo(L*.55,L*.25)}ctx.stroke()}}
   ctx.restore()}}
 dragger(cv,engine,()=>bodies,{clamp:p=>({x:p.x,y:Math.min(p.y,floorY-10)})});
 let run=true,last=performance.now();new IntersectionObserver(es=>{run=es[0].isIntersecting;if(run){last=performance.now();loop()}}).observe(sec);
 function loop(){if(!run)return;const now=performance.now();M.Engine.update(engine,Math.min(32,now-last));last=now;for(const b of bodies){if(b.bounds.max.y>floorY+1){M.Body.translate(b,{x:0,y:floorY-b.bounds.max.y});if(b.velocity.y>0)M.Body.setVelocity(b,{x:b.velocity.x,y:0})}}draw();requestAnimationFrame(loop)}
 let lastW=innerWidth;addEventListener('resize',()=>{fitName();size();if(Math.abs(innerWidth-lastW)>200&&(innerWidth<768)!==(lastW<768)){M.World.remove(engine.world,bodies);make()}lastW=innerWidth});
 return{start(){make();loop()}}}

/* ---------- hoop ---------- */
function hoop(){const zone=$('#hoop');if(getComputedStyle(zone).display==='none')return;const cv=$('canvas',zone),ctx=cv.getContext('2d');const dpr=Math.min(devicePixelRatio||1,2);let W,H;
 const engine=M.Engine.create();engine.gravity.scale=.0012;let statics=[],score=0,armed=false;const R=30;
 const ball=M.Bodies.circle(0,0,R,{restitution:.55,friction:.02,frictionAir:.006,density:.002});M.World.add(engine.world,ball);
 const G={};const net=Array.from({length:10},()=>Array.from({length:4},()=>({dx:0,dy:0,vx:0,vy:0})));
 function size(){W=zone.clientWidth;H=zone.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
  const pad=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pad'))||24;G.bx=pad+4;G.bt=40;G.rimY=G.bt+120;G.rx=60;G.cx=G.bx+12+10+G.rx;G.back=G.cx-G.rx;G.front=G.cx+G.rx;
  if(statics.length)M.World.remove(engine.world,statics);
  statics=[M.Bodies.rectangle(G.bx+6,G.bt+75,12,150,{isStatic:true}),M.Bodies.circle(G.back,G.rimY,4,{isStatic:true,restitution:.5}),M.Bodies.circle(G.front,G.rimY,4,{isStatic:true,restitution:.5}),
   M.Bodies.rectangle(W/2,H+50,W*3,100,{isStatic:true,friction:.3}),M.Bodies.rectangle(-50,H/2,100,H*3,{isStatic:true}),M.Bodies.rectangle(W+50,H/2,100,H*3,{isStatic:true}),M.Bodies.rectangle(W/2,-450,W*3,100,{isStatic:true})];M.World.add(engine.world,statics);reset()}
 function reset(){M.Body.setPosition(ball,{x:Math.min(W-60,G.front+220),y:H-R-4});M.Body.setVelocity(ball,{x:0,y:0});M.Body.setAngularVelocity(ball,0)}
 const netPt=(i,j)=>{const t=i/9,top=G.rx,bot=G.rx*.55,w=top+(bot-top)*(j/3);return{x:G.cx-w+2*w*t,y:G.rimY+j*22}};
 function physNet(){const bx=ball.position.x,by=ball.position.y;for(let i=0;i<10;i++)for(let j=1;j<4;j++){const n=net[i][j],p=netPt(i,j),ax=p.x+n.dx-bx,ay=p.y+n.dy-by,d=Math.hypot(ax,ay);
  if(d<R+3&&d>.001){const f=(R+3-d)*.3;n.vx+=ax/d*f+.04*ball.velocity.x;n.vy+=ay/d*f+.04*ball.velocity.y}const k=.09-.012*j;n.vx+=-n.dx*k;n.vy+=-n.dy*k;n.vx*=.86;n.vy*=.86;n.dx=Math.max(-22,Math.min(22,n.dx+n.vx));n.dy=Math.max(-22,Math.min(22,n.dy+n.vy))}}
 function drawNet(){ctx.strokeStyle='rgba(242,239,233,.85)';ctx.lineWidth=1.4;const P=(i,j)=>{const p=netPt(i,j),n=net[i][j];return{x:p.x+n.dx,y:p.y+n.dy}};ctx.beginPath();
  for(let i=0;i<9;i++)for(let j=0;j<3;j++){const a=P(i,j),b=P(i+1,j+1),c=P(i+1,j),d=P(i,j+1);ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.moveTo(c.x,c.y);ctx.lineTo(d.x,d.y)}
  for(let j=1;j<4;j++){for(let i=0;i<10;i++){const p=P(i,j);i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)}}ctx.stroke()}
 function rim(front){ctx.beginPath();ctx.ellipse(G.cx,G.rimY,G.rx,8,0,front?0:Math.PI,front?Math.PI:Math.PI*2);ctx.strokeStyle='#e0452f';ctx.lineWidth=5;ctx.stroke()}
 function draw(){ctx.clearRect(0,0,W,H);ctx.fillStyle='#f2efe9';ctx.beginPath();ctx.roundRect(G.bx,G.bt,12,150,5);ctx.fill();ctx.fillStyle='#e0452f';ctx.fillRect(G.bx+12,G.rimY-4,10,7);rim(false);
  ctx.save();ctx.translate(ball.position.x,ball.position.y);ctx.rotate(ball.angle);ctx.font=`${R*2}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🏀',0,R*.08);ctx.restore();drawNet();rim(true)}
 dragger(cv,engine,()=>[ball],{});
 cv.style.pointerEvents='auto';
 let run=false,last=0,prevY=0;new IntersectionObserver(es=>{run=es[0].isIntersecting;if(run){last=performance.now();loop()}}).observe(zone);
 function loop(){if(!run)return;const now=performance.now();M.Engine.update(engine,Math.min(32,now-last));last=now;const y=ball.position.y,x=ball.position.x;
  if(prevY<G.rimY-R*.3&&y>=G.rimY-R*.3&&x>G.back+4&&x<G.front-4&&ball.velocity.y>0)armed=true;
  if(armed&&y>G.rimY+40){armed=false;if(x>G.back&&x<G.front+10){score++;$('#hoopScore').textContent=`nice · ${score} bucket${score>1?'s':''}`;}}
  if(y<G.rimY-R)armed=armed&&true;prevY=y;physNet();draw();requestAnimationFrame(loop)}
 size();addEventListener('resize',size)}

/* ---------- bug squash ---------- */
const game=(()=>{const el=$('#game'),cv=$('canvas',el),ctx=cv.getContext('2d'),msg=$('#gameMsg');const dpr=Math.min(devicePixelRatio||1,2);let W=0,H=0,state='idle',bugs=[],splats=[],score=0,best=+localStorage.getItem('yz-bugs')||0,t0=0,spawnT=0,raf;const DUR=15000;
 const hov=matchMedia('(hover:hover)').matches;const idleMsg=()=>msg.textContent=hov?'Click or press space to help ship it':'Tap to help ship it';idleMsg();
 function resize(){W=el.clientWidth;H=el.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
 function start(){state='playing';bugs=[];splats=[];score=0;t0=performance.now();spawnT=0;resize();cancelAnimationFrame(raf);loop()}
 function spawn(){const l=Math.random()<.5,y=24+Math.random()*(H-48);bugs.push({x:l?-20:W+20,y,vx:(l?1:-1)*(1.1+Math.random()*1.6+score*.05),ph:Math.random()*6})}
 function hit(x,y){for(let i=bugs.length-1;i>=0;i--){const b=bugs[i];if(Math.hypot(b.x-x,b.y-y)<26){bugs.splice(i,1);splats.push({x:b.x,y:b.y,a:1});score++;return}}}
 function loop(){const now=performance.now(),el2=now-t0;ctx.clearRect(0,0,W,H);
  if(state==='playing'){if(now-spawnT>Math.max(320,650-score*12)){spawn();spawnT=now}
   const left=Math.max(0,Math.ceil((DUR-el2)/1000));msg.textContent=`Bugs squashed: ${score} · ${left}s`;if(el2>DUR){state='over';if(score>best){best=score;localStorage.setItem('yz-bugs',best)}msg.textContent=`Shipped. Bugs squashed: ${score} · best ${best}. ${hov?'Click or space':'Tap'} to retry`}}
  splats=splats.filter(s=>(s.a-=.02)>0);splats.forEach(s=>{ctx.globalAlpha=s.a;ctx.fillStyle='#e8643c';ctx.beginPath();ctx.arc(s.x,s.y,9+(1-s.a)*10,0,7);ctx.fill();ctx.globalAlpha=1});
  ctx.font='26px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  bugs=bugs.filter(b=>b.x>-40&&b.x<W+40);bugs.forEach(b=>{b.x+=b.vx;b.ph+=.15;b.y+=Math.sin(b.ph)*1.2;ctx.save();ctx.translate(b.x,b.y);ctx.rotate(b.vx>0?Math.PI/2:-Math.PI/2);ctx.fillText('🐞',0,0);ctx.restore()});
  if(state!=='idle'||splats.length)raf=requestAnimationFrame(loop)}
 el.addEventListener('pointerdown',e=>{if(state!=='playing'){start();return}const r=cv.getBoundingClientRect();hit(e.clientX-r.left,e.clientY-r.top)});
 el.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();if(state!=='playing')start();else if(bugs.length){const b=bugs[0];hit(b.x,b.y)}}});
 return{resize}})();

/* ---------- boot ---------- */
async function boot(){try{await Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,1500))])}catch(e){}
 fitName();const h=hero();hoop();onScroll();
 const pre=$('#pre');let seen=false;try{seen=sessionStorage.getItem('yz-pre')==='1';sessionStorage.setItem('yz-pre','1')}catch(e){}
 const done=()=>{document.body.classList.add('ready');setTimeout(()=>h.start(),RM?0:250)};
 if(seen||RM){pre.classList.add('gone');done();return}
 const n=mobile()?5:10;pre.insertAdjacentHTML('afterbegin',Array.from({length:n},()=>'<div class="st"></div>').join(''));$$('#pre .words span').forEach((s,i)=>s.style.transitionDelay=(.1*i)+'s');
 requestAnimationFrame(()=>pre.classList.add('show'));
 setTimeout(()=>{$$('#pre .st').forEach((s,i)=>s.style.transitionDelay=(.06*Math.abs(i-(n-1)/2))+'s');pre.classList.add('out');setTimeout(done,350);setTimeout(()=>pre.classList.add('gone'),1200)},1300)}
boot();
})();
