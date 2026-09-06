import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { buildPiano } from './model';
import { parts, systems } from './parts';

const atlas = document.getElementById('piano-atlas');
if (atlas) {
    try { initialize(); }
    catch (error) {
        console.error('Piano Atlas could not start:', error);
        const loading = document.getElementById('atlas-loading');
        loading.textContent = 'The 3D view could not start. Enable WebGL in your browser and reload this page.';
    }
}

function initialize() {
    const $ = id => document.getElementById(id);
    const stage = $('piano-stage');
    const systemsPanel = atlas.querySelector('.atlas-systems');
    function collapseSystems(collapsed) { systemsPanel.classList.toggle('is-collapsed', collapsed); $('systems-toggle').setAttribute('aria-expanded', String(!collapsed)); $('systems-toggle').textContent = collapsed ? '+' : '−'; }
    collapseSystems(window.innerWidth < 650);
    $('systems-toggle').addEventListener('click', () => collapseSystems(!systemsPanel.classList.contains('is-collapsed')));
    const scene = new THREE.Scene();
    const theme = getComputedStyle(atlas);
    scene.background = new THREE.Color(theme.getPropertyValue('--atlas-background').trim());
    const camera = new THREE.PerspectiveCamera(36, 1, .05, 120);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.15;
    renderer.domElement.setAttribute('aria-label', 'Grand piano 3D model');
    stage.appendChild(renderer.domElement);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment(); const environment = pmrem.fromScene(room, .04);
    scene.environment = environment.texture; room.dispose(); pmrem.dispose();
    scene.add(new THREE.HemisphereLight('#ffffff', '#c2c6b5', 2.2));
    const light = new THREE.DirectionalLight('#fff9ed', 3.2); light.position.set(3,8,5); light.castShadow = true;
    light.shadow.mapSize.set(2048,2048); Object.assign(light.shadow.camera,{left:-8,right:8,top:8,bottom:-8}); light.shadow.bias=-.0007; light.shadow.normalBias=.025; scene.add(light);
    const fill = new THREE.DirectionalLight('#dfebf1', 1.5); fill.position.set(-5,3,-5); scene.add(fill);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({color:'#52645a',opacity:.13})); floor.rotation.x=-Math.PI/2; floor.position.y=.01; floor.receiveShadow=true; scene.add(floor);
    const { root, groups } = buildPiano(); scene.add(root);
    const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping=true; controls.dampingFactor=.075; controls.minDistance=1; controls.maxDistance=40; controls.maxPolarAngle=Math.PI*.91; controls.autoRotateSpeed=.6;
    const state = { layout:'assembled', explode:0, selected:null, isolated:null, labels:false, lid:true, visible:new Set(systems.map(s=>s.id)), hovered:null, hidden:new Set() };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cameraTween=null;
    const selectedPart = () => parts.find(p=>p.id===state.selected);
    const isVisible = part => !state.hidden.has(part.id) && state.visible.has(part.system) && (!state.isolated || state.isolated===part.id);
    const visibleGroups = () => parts.filter(isVisible).map(p=>groups.get(p.id));
    const labels = new Map();
    parts.forEach(part=>{ const button=document.createElement('button'); button.textContent=part.name; button.hidden=true; button.addEventListener('click',()=>select(part.id)); $('part-labels').appendChild(button); labels.set(part.id,button); });
    systems.forEach(system=>{
        const count=parts.filter(p=>p.system===system.id).length;
        const button=document.createElement('button'); button.className='system-row'; button.dataset.system=system.id; button.setAttribute('role','switch'); button.setAttribute('aria-checked','true'); button.setAttribute('aria-label',`Show ${system.name}`);
        button.innerHTML=`<span class="system-dot" style="background:${system.color}"></span><span class="system-name">${system.name}</span><small>${count}</small><span class="system-switch"></span>`;
        button.addEventListener('click',()=>{ state.isolated=null; state.visible.has(system.id)?state.visible.delete(system.id):state.visible.add(system.id); updateVisibility(); }); $('system-list').appendChild(button);
    });
    function updateVisibility() {
        parts.forEach(part=>{ groups.get(part.id).visible=isVisible(part); });
        if(state.selected && !isVisible(selectedPart())) closeDetail();
        atlas.querySelectorAll('[data-system]').forEach(button=>button.setAttribute('aria-checked',String(state.visible.has(button.dataset.system))));
        $('visible-count').textContent=`${parts.filter(isVisible).length} / ${parts.length} parts visible`;
        $('show-all').classList.toggle('is-active',state.visible.size===systems.length&&!state.isolated&&!state.hidden.size);
        $('internal-only').classList.toggle('is-active',state.visible.size===5&&!state.visible.has('case')&&!state.visible.has('pedals'));
        $('restore-parts').hidden=!state.isolated&&!state.hidden.size;
        $('isolate-part').innerHTML=state.isolated?'Show all parts <span>↙</span>':'Isolate part <span>↗</span>';
        highlight();
    }
    function showAll() { state.hidden.clear(); state.isolated=null; state.visible=new Set(systems.map(s=>s.id)); updateVisibility(); }
    $('show-all').addEventListener('click',showAll); $('reset-systems').addEventListener('click',showAll);
    $('internal-only').addEventListener('click',()=>{ state.isolated=null; state.visible=new Set(systems.filter(s=>!['case','pedals'].includes(s.id)).map(s=>s.id)); updateVisibility(); });
    function highlight() {
        groups.forEach((g,id)=>g.traverse(o=>{if(o.isMesh){o.material.emissive.set(id===state.selected?'#ffe54c':id===state.hovered?'#b9bec7':'#000000');o.material.emissiveIntensity=id===state.selected?.33:.16;}}));
    }
    function select(id) {
        const part=parts.find(p=>p.id===id); if(!part)return;
        if(state.isolated&&state.isolated!==id)state.isolated=null;
        state.hidden.delete(id); state.visible.add(part.system); state.selected=id; updateVisibility();
        $('part-detail').hidden=false; $('detail-title').textContent=part.name;
        $('detail-system').textContent=systems.find(s=>s.id===part.system).name;
        $('detail-number').textContent=`PART ${part.number} / ${parts.length}`;
        $('detail-description').textContent=part.description; $('detail-material').textContent=part.material; $('detail-role').textContent=part.role;
        $('detail-related').replaceChildren(); part.related.forEach(related=>{const p=parts.find(x=>x.id===related); const b=document.createElement('button');b.textContent=p.name;b.addEventListener('click',()=>select(related));$('detail-related').appendChild(b);});
        $('search-results').hidden=true; highlight();
    }
    function closeDetail(){state.selected=null;state.hovered=null;$('part-detail').hidden=true;highlight();}
    $('close-detail').addEventListener('click',closeDetail);
    function focusObjects(objects, direction) {
        root.updateMatrixWorld(true);
        const bounds=new THREE.Box3(); objects.forEach(g=>bounds.union(new THREE.Box3().setFromObject(g)));
        if(bounds.isEmpty())return;
        const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
        const fit=Math.max(size.y,size.x/Math.max(camera.aspect*.64,.45),size.z*.7);
        const distance=Math.max(2.0,fit/(2*Math.tan(THREE.MathUtils.degToRad(camera.fov/2)))*1.35);
        const dir=direction||camera.position.clone().sub(controls.target).normalize();
        cameraTween={target:center,position:center.clone().add(dir.clone().normalize().multiplyScalar(distance))};
    }
    $('focus-part').addEventListener('click',()=>{if(state.selected)focusObjects([groups.get(state.selected)]);});
    $('isolate-part').addEventListener('click',()=>{if(!state.selected)return;state.isolated=state.isolated?null:state.selected;updateVisibility();if(state.isolated)focusObjects([groups.get(state.selected)]);else resetCamera();});
    $('hide-part').addEventListener('click', () => {
        if (!state.selected) return;
        const wasIsolated = Boolean(state.isolated);
        state.hidden.add(state.selected);
        state.isolated = null;
        closeDetail();
        $('part-tooltip').hidden = true;
        updateVisibility();
        if (wasIsolated) resetCamera();
    });
    $('restore-parts').addEventListener('click',()=>{showAll();resetCamera();});
    function resetCamera(top=false) {
        let position,target;
        if(state.layout==='catalog'){const y=window.innerWidth<650?-1.65:1.7;target=new THREE.Vector3(0,y,0);position=new THREE.Vector3(0,y,window.innerWidth<650?34:22);}
        else if(state.explode>0){target=new THREE.Vector3(0,1.9,-.5);position=new THREE.Vector3(7,6.7,9).multiplyScalar(window.innerWidth<650?1.45:1.22);}
        else {target=new THREE.Vector3(-.25,1.0,-.45);position=new THREE.Vector3(6.1,5.3,7.1).multiplyScalar(window.innerWidth<650?1.85:1.10);}
        if(top)position=target.clone().add(new THREE.Vector3(0,Math.max(9,position.distanceTo(target)),.001));
        cameraTween={position,target};
        $('view-top').classList.toggle('is-active',top); $('view-perspective').classList.toggle('is-active',!top);
    }
    $('view-perspective').addEventListener('click',()=>resetCamera());$('view-top').addEventListener('click',()=>resetCamera(true));
    $('reset-view').addEventListener('click',reset);
    function reset(){state.labels=false;$('toggle-labels').classList.remove('is-active');$('toggle-labels').setAttribute('aria-pressed','false');$('part-search').value='';$('search-results').hidden=true;showAll();closeDetail();setLayout('assembled');state.lid=true;updateLid();controls.autoRotate=false;$('toggle-rotate').classList.remove('is-active');$('toggle-rotate').setAttribute('aria-pressed','false');resetCamera();}
    function zoom(factor){cameraTween=null;camera.position.sub(controls.target).multiplyScalar(factor).add(controls.target);controls.update();}
    $('zoom-in').addEventListener('click',()=>zoom(.8));$('zoom-out').addEventListener('click',()=>zoom(1.25));
    $('toggle-labels').addEventListener('click',()=>{state.labels=!state.labels;$('toggle-labels').classList.toggle('is-active',state.labels);$('toggle-labels').setAttribute('aria-pressed',String(state.labels));});
    $('toggle-rotate').addEventListener('click',()=>{controls.autoRotate=!controls.autoRotate;$('toggle-rotate').classList.toggle('is-active',controls.autoRotate);$('toggle-rotate').setAttribute('aria-pressed',String(controls.autoRotate));});
    function updateLid(){ $('toggle-lid').setAttribute('aria-pressed',String(state.lid));$('toggle-lid').innerHTML=`<span aria-hidden="true">◩</span><span>Lid ${state.lid?'open':'closed'}<small>Click to ${state.lid?'close':'open'}</small></span>`; }
    $('toggle-lid').addEventListener('click',()=>{state.lid=!state.lid;updateLid();});
    const offsets={case:[0,1.35,0],keyboard:[0,-.15,1.35],action:[0,.85,.60],strings:[0,1.6,0],resonance:[0,-.30,0],frame:[0,.85,0],pedals:[0,-.03,0]};
    const targets=new Map();
    function updateTargets(){
        parts.forEach((part,i)=>{
            const g=groups.get(part.id); const pos=g.userData.home.clone(); const rot=g.userData.rotation.clone(); let scale=1;
            if(state.layout==='catalog'){
                const cols=window.innerWidth<650?4:8,col=i%cols,row=Math.floor(i/cols);pos.set((col-(cols-1)/2)*1.72,4.2-row*1.67,0);
                scale=1.20/Math.max(...g.userData.size.toArray());rot.set(.65,-.30,0);
                // Offset the original center (especially for the hinged lid).
                pos.sub(g.userData.center.clone().multiplyScalar(scale).applyEuler(rot));
            } else {
                const t=state.explode; const off=offsets[part.system];pos.add(new THREE.Vector3(...off).multiplyScalar(t));
                if(part.id==='lid')pos.y+=t*1.05;
                if(part.id==='hammers'||part.id==='shanks')pos.y+=t*.35;
                if(part.id==='dampers')pos.y+=t*.68;
                if(part.id==='ribs')pos.y-=t*.38;
                if(part.id==='white-keys'||part.id==='black-keys')pos.z+=t*.40;
                if(part.id==='bass-strings')pos.y+=t*.25;
                if(part.id==='prop')pos.x+=t*.65;
            }
            targets.set(part.id,{pos,rot,scale});
        });
    }
    function setLayout(layout){state.layout=layout;state.explode=layout==='exploded'?1:0;$('explode-slider').value=state.explode*100;$('explode-value').innerHTML=`${state.explode*100}<span>%</span>`;updateMode();updateTargets();resetCamera();}
    function updateMode(){atlas.querySelectorAll('[data-layout]').forEach(b=>{const active=b.dataset.layout===state.layout;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});$('toggle-lid').hidden=state.layout==='catalog';}
    atlas.querySelectorAll('[data-layout]').forEach(b=>b.addEventListener('click',()=>setLayout(b.dataset.layout)));
    $('explode-slider').addEventListener('input',event=>{const was=state.layout;state.explode=Number(event.target.value)/100;state.layout=state.explode?'exploded':'assembled';$('explode-value').innerHTML=`${event.target.value}<span>%</span>`;updateMode();updateTargets();if(was==='catalog'||(was==='assembled'&&state.explode)||!state.explode)resetCamera();});
    const search=$('part-search');
    function searchParts(){const query=search.value.trim().toLowerCase();const matches=parts.filter(p=>`${p.name} ${p.system} ${p.description}`.toLowerCase().includes(query));const results=$('search-results');results.replaceChildren();matches.forEach(p=>{const b=document.createElement('button');b.innerHTML=`${p.name}<small>${systems.find(s=>s.id===p.system).name} · ${p.number}</small>`;b.addEventListener('click',()=>{select(p.id);search.value='';});results.appendChild(b);});if(!matches.length){const p=document.createElement('p');p.textContent='No parts found. Try “hammer” or “strings”.';results.appendChild(p);}results.hidden=false;}
    search.addEventListener('input',searchParts);search.addEventListener('focus',searchParts);
    search.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();$('search-results').querySelector('button')?.focus();}if(event.key==='Enter'){$('search-results').querySelector('button')?.click();search.blur();}});
    document.addEventListener('pointerdown',e=>{if(!e.target.closest('.atlas-search-wrap'))$('search-results').hidden=true;});
    document.addEventListener('keydown',event=>{
        if(event.key==='Escape'){closeDetail();state.isolated=null;updateVisibility();$('search-results').hidden=true;search.blur();return;}
        if(/INPUT|TEXTAREA/.test(event.target.tagName))return;
        if(event.key==='/'){event.preventDefault();search.focus();}if(event.key.toLowerCase()==='r')reset();
    });
    const raycaster=new THREE.Raycaster(), pointer=new THREE.Vector2();let down=null,lastHover=0;
    function hit(event){const rect=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(pointer,camera);return raycaster.intersectObjects(visibleGroups(),true)[0];}
    renderer.domElement.addEventListener('pointerdown',event=>{down={x:event.clientX,y:event.clientY};cameraTween=null;});
    renderer.domElement.addEventListener('pointerup',event=>{if(down&&Math.hypot(event.clientX-down.x,event.clientY-down.y)<5){const result=hit(event);if(result)select(result.object.userData.part);else closeDetail();}down=null;});
    renderer.domElement.addEventListener('pointermove',event=>{if(event.buttons||performance.now()-lastHover<65)return;lastHover=performance.now();const result=hit(event);const id=result?.object.userData.part||null;if(id!==state.hovered){state.hovered=id;highlight();}renderer.domElement.style.cursor=id?'pointer':'grab';$('part-tooltip').hidden=!id;if(id){$('part-tooltip').textContent=parts.find(p=>p.id===id).name;$('part-tooltip').style.left=`${Math.min(event.clientX+15,window.innerWidth-180)}px`;$('part-tooltip').style.top=`${Math.max(10,event.clientY-35)}px`;}});
    renderer.domElement.addEventListener('pointerleave',()=>{state.hovered=null;$('part-tooltip').hidden=true;highlight();});
    controls.addEventListener('start',()=>{cameraTween=null;$('part-tooltip').hidden=true;});
    let compact = window.innerWidth < 650;
    function resize(){const width=stage.clientWidth,height=stage.clientHeight;camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);const nextCompact=window.innerWidth<650;if(nextCompact!==compact){compact=nextCompact;collapseSystems(compact);updateTargets();resetCamera();}}
    const observer=new ResizeObserver(resize);observer.observe(stage);resize();updateVisibility();updateTargets();resetCamera();
    camera.position.copy(cameraTween.position);controls.target.copy(cameraTween.target);cameraTween=null;controls.update();
    $('atlas-loading').hidden=true;
    let previous=performance.now();
    function animate(now){
        requestAnimationFrame(animate);if(document.hidden)return;
        const delta=Math.min((now-previous)/1000,.05);previous=now;const alpha=reducedMotion?1:1-Math.exp(-delta*8);
        groups.forEach((g,id)=>{const t=targets.get(id);g.position.lerp(t.pos,alpha);g.scale.lerp(new THREE.Vector3(t.scale,t.scale,t.scale),alpha);const rotation=t.rot.clone();if(id==='lid'&&state.layout!=='catalog')rotation.z=state.lid?.48:0;g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,rotation.x,alpha);g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,rotation.y,alpha);g.rotation.z=THREE.MathUtils.lerp(g.rotation.z,rotation.z,alpha);if(id==='prop')g.visible=isVisible(parts.find(p=>p.id===id))&&(state.lid||state.layout==='catalog');});
        if(cameraTween){camera.position.lerp(cameraTween.position,alpha);controls.target.lerp(cameraTween.target,alpha);if(camera.position.distanceTo(cameraTween.position)<.005)cameraTween=null;}
        controls.update();renderer.render(scene,camera);
        const placed=[];
        parts.forEach(part=>{const b=labels.get(part.id),g=groups.get(part.id);const enabled=(state.labels||state.layout==='catalog')&&g.visible;b.hidden=!enabled;if(!enabled)return;
            const point=new THREE.Box3().setFromObject(g).getCenter(new THREE.Vector3());if(state.layout==='catalog')point.y-=g.userData.size.y*g.scale.y*.5+.16;point.project(camera);
            const x=(point.x*.5+.5)*stage.clientWidth,y=(-point.y*.5+.5)*stage.clientHeight;
            const overlap=state.layout!=='catalog'&&placed.some(p=>Math.abs(p.x-x)<100&&Math.abs(p.y-y)<28);
            b.hidden=point.z>1||point.z< -1||x<(window.innerWidth<650?12:155)||x>stage.clientWidth-(window.innerWidth<650?12:65)||y<125||y>stage.clientHeight-150||overlap;
            if(!b.hidden){b.style.left=`${x}px`;b.style.top=`${y}px`;placed.push({x,y});}
        });
    }
    requestAnimationFrame(animate);
}
