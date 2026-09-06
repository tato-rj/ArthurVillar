import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { createAssemblySequence } from './action/sequence';
import { createPianoAnimation } from './animation';

export function initializePiano({ buildPiano, parts, systems, upright = false, actionModel = false, animationFactory = createPianoAnimation, assemblyStages = [] }) {
    const atlas = document.getElementById('piano-atlas');
    if (!atlas) return;
    const selector = document.getElementById('piano-select');
    selector.addEventListener('change', () => { window.location.href = selector.value; });
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
    renderer.domElement.setAttribute('aria-label', actionModel ? 'Piano action 3D model' : upright ? 'Upright piano 3D model' : 'Grand piano 3D model');
    stage.appendChild(renderer.domElement);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment(); const environment = pmrem.fromScene(room, .04);
    scene.environment = environment.texture; room.dispose(); pmrem.dispose();
    scene.add(new THREE.HemisphereLight('#ffffff', '#c2c6b5', 2.2));
    const light = new THREE.DirectionalLight('#fff9ed', 3.2); light.position.set(3,8,5); light.castShadow = true;
    light.shadow.mapSize.set(2048,2048); Object.assign(light.shadow.camera,{left:-8,right:8,top:8,bottom:-8}); light.shadow.bias=-.0007; light.shadow.normalBias=.025; scene.add(light);
    const fill = new THREE.DirectionalLight('#dfebf1', 1.5); fill.position.set(-5,3,-5); scene.add(fill);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({color:'#52645a',opacity:.13})); floor.rotation.x=-Math.PI/2; floor.position.y=.01; floor.receiveShadow=true; scene.add(floor);
    const { root, groups, lidFlap, rack, rackSupports = [], demonstrationRod } = buildPiano(); scene.add(root);
    const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping=true; controls.dampingFactor=.075; controls.minDistance=1; controls.maxDistance=40; controls.maxPolarAngle=Math.PI*.91;
    const state = { layout:'assembled', explode:0, selected:null, isolated:null, lid:!upright, visible:new Set(systems.map(s=>s.id)), hovered:null, hidden:new Set() };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mechanism = animationFactory(groups, reducedMotion, upright, { demonstrationRod });
    let fallboardOpen = true;
    let fallboardProgress = 1;
    let rackRaised = true;
    let rackProgress = 1;
    let selectedMidi = 60;
    let cameraTween=null;
    const playAssembly = $('play-assembly');
    const sequence = createAssemblySequence(assemblyStages, {
        reveal(visible, name, step, total) {
            state.hidden = new Set(parts.filter(part => !visible.has(part.id)).map(part => part.id));
            mechanism.setAssemblyStage?.(step - 1);
            updateVisibility();
            $('assembly-status').textContent = `${step} of ${total}: ${name}`;
        },
        strike() { mechanism.play(60); },
        finish() {
            mechanism.setAssemblyStage?.(null);
            mechanism.reset();
            showAll();
            playAssembly.setAttribute('aria-pressed', 'false');
            playAssembly.setAttribute('aria-label', 'Play action demonstration');
            playAssembly.title = 'Play action demonstration';
            $('assembly-play-icon').hidden = false;
            $('assembly-stop-icon').hidden = true;
            $('assembly-status').textContent = 'Complete action shown.';
        },
    });
    if (playAssembly) {
        playAssembly.addEventListener('click', () => {
            if (sequence.running) { sequence.stop(); return; }
            closeDetail();
            mechanism.setAssemblyStage?.(null);
            mechanism.reset();
            showAll();
            setLayout('assembled');
            playAssembly.setAttribute('aria-pressed', 'true');
            playAssembly.setAttribute('aria-label', 'Stop action demonstration');
            playAssembly.title = 'Stop action demonstration';
            $('assembly-play-icon').hidden = true;
            $('assembly-stop-icon').hidden = false;
            sequence.start();
        });
        // Manual exploration exits the demonstration before applying the user's control.
        atlas.addEventListener('click', event => {
            if (sequence.running && !event.target.closest('#play-assembly') && event.target.closest('button, input, select')) sequence.stop();
        }, true);
    }
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
        $('internal-only').classList.toggle('is-active',state.visible.size===systems.filter(s=>!['case','pedals'].includes(s.id)).length&&!state.visible.has('case')&&!state.visible.has('pedals'));
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
        updateAnimationButton();
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
    function resetCamera() {
        let position,target;
        if(state.layout==='catalog'){const rows=Math.ceil(parts.length/(window.innerWidth<650?4:8)),y=4.2-(rows-1)*1.67/2;target=new THREE.Vector3(0,y,0);position=new THREE.Vector3(0,y,window.innerWidth<650?Math.max(34,rows*4.25):22);}
        else if(state.explode>0){target=new THREE.Vector3(0,1.9,-.5);position=new THREE.Vector3(7,6.7,9).multiplyScalar(window.innerWidth<650?1.45:1.22);}
        else {target=actionModel ? new THREE.Vector3(window.innerWidth>=650&&window.innerWidth<1100?-1.8:0,1.35,0) : upright ? new THREE.Vector3(0,1.2,0) : new THREE.Vector3(-.25,1.0,-.45);position=(actionModel ? new THREE.Vector3(1.1,3.0,window.innerWidth>=650&&window.innerWidth<1100?17.0:9.8) : upright ? new THREE.Vector3(4.5,3.2,6.8) : new THREE.Vector3(6.1,5.3,7.1)).multiplyScalar(window.innerWidth<650?1.85:1.10);}
        cameraTween={position,target};
    }
    function reset() {
        sequence.stop();
        $('part-search').value = '';
        $('search-results').hidden = true;
        showAll();
        closeDetail();
        setLayout('assembled');
        state.lid = !upright;
        rackRaised = true;
        fallboardOpen = true;
        mechanism.reset();
        updateAnimationButton();
        resetCamera();
    }
    // Register animations by part so the shared details panel can expose them.
    const partAnimations = {
        lid: () => {
            if (state.layout === 'catalog') setLayout('assembled');
            state.lid = !state.lid;
            if (state.lid && !upright) rackRaised = true;
        },
        ...(upright ? { fallboard: () => { fallboardOpen = !fallboardOpen; } } : {}),
        desk: () => {
            if (upright && !fallboardOpen) { fallboardOpen = true; rackRaised = true; return; }
            if (!upright && !state.lid) { state.lid = true; rackRaised = true; }
            else rackRaised = !rackRaised;
        },
        'white-keys': () => mechanism.play([1, 3, 6, 8, 10].includes(selectedMidi % 12) ? 60 : selectedMidi),
        'black-keys': () => mechanism.play([1, 3, 6, 8, 10].includes(selectedMidi % 12) ? selectedMidi : 61),
        'una-corda': () => mechanism.togglePedal('una-corda'),
        'soft-pedal': () => mechanism.togglePedal('una-corda'),
        sustain: () => mechanism.togglePedal('sustain'),
        ...(upright ? {
            practice: () => mechanism.togglePedal('practice'),
            'practice-felt': () => mechanism.togglePedal('practice'),
        } : { sostenuto: () => mechanism.togglePedal('sostenuto') }),
        hammers: () => mechanism.play(selectedMidi),
        shanks: () => mechanism.play(selectedMidi),
        wippens: () => mechanism.play(selectedMidi),
        'key-levers': () => mechanism.play(selectedMidi),
        dampers: () => mechanism.play(Math.min(selectedMidi, 89)),
        'damper-rail': () => mechanism.togglePedal('sustain'),
    };
    if (actionModel) {
        Object.keys(partAnimations).forEach(id => { delete partAnimations[id]; });
        mechanism.animatedIds.forEach(id => { partAnimations[id] = () => mechanism.play(60); });
    }
    function updateAnimationButton() {
        const button = $('animate-part');
        button.hidden = !partAnimations[state.selected];
        const pedal = state.selected === 'practice-felt' ? 'practice' : state.selected === 'damper-rail' ? 'sustain' : state.selected === 'soft-pedal' ? 'una-corda' : state.selected;
        button.title = state.selected === 'lid' ? (state.lid ? 'Close lid' : 'Open lid')
            : state.selected === 'fallboard' ? (fallboardOpen ? 'Close keyboard cover' : 'Open keyboard cover')
            : state.selected === 'desk' ? (rackRaised && (upright || state.lid) ? 'Fold music rack' : 'Raise music rack')
            : pedal in mechanism.pedals ? (mechanism.pedals[pedal] ? 'Release pedal' : 'Press pedal')
            : 'Play a note';
        button.removeAttribute('aria-pressed');
        if (pedal in mechanism.pedals) button.setAttribute('aria-pressed', String(mechanism.pedals[pedal]));
    }
    $('animate-part').addEventListener('click', () => {
        const animation = partAnimations[state.selected];
        if (!animation) return;
        if (state.layout === 'catalog') setLayout('assembled');
        animation();
        updateAnimationButton();
    });
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
                if(actionModel){pos.x+=(i%4-1.5)*t*.30;pos.z+=(Math.floor(i/4)%3-1)*t*.65;}
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
    function updateMode(){atlas.querySelectorAll('[data-layout]').forEach(b=>{const active=b.dataset.layout===state.layout;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active));});}
    atlas.querySelectorAll('[data-layout]').forEach(b=>b.addEventListener('click',()=>setLayout(b.dataset.layout)));
    $('explode-slider').addEventListener('input',event=>{sequence.stop();const was=state.layout;state.explode=Number(event.target.value)/100;state.layout=state.explode?'exploded':'assembled';$('explode-value').innerHTML=`${event.target.value}<span>%</span>`;updateMode();updateTargets();if(was==='catalog'||(was==='assembled'&&state.explode)||!state.explode)resetCamera();});
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
    renderer.domElement.addEventListener('pointerup',event=>{if(down&&Math.hypot(event.clientX-down.x,event.clientY-down.y)<5){const result=hit(event);if(result) {
            const { part, midi } = result.object.userData;
            if (midi !== undefined) selectedMidi = midi;
            select(part);
            if (part === 'white-keys' || part === 'black-keys' || (actionModel && ['key','keytop'].includes(part))) mechanism.play(midi);
        } else closeDetail();}down=null;});
    renderer.domElement.addEventListener('pointermove',event=>{if(event.buttons||performance.now()-lastHover<65)return;lastHover=performance.now();const result=hit(event);const id=result?.object.userData.part||null;if(id!==state.hovered){state.hovered=id;highlight();}renderer.domElement.style.cursor=id?'pointer':'grab';$('part-tooltip').hidden=!id;if(id){$('part-tooltip').textContent=parts.find(p=>p.id===id).name;$('part-tooltip').style.left=`${Math.min(event.clientX+15,window.innerWidth-180)}px`;$('part-tooltip').style.top=`${Math.max(10,event.clientY-35)}px`;}});
    renderer.domElement.addEventListener('pointerleave',()=>{state.hovered=null;$('part-tooltip').hidden=true;highlight();});
    controls.addEventListener('start',()=>{cameraTween=null;$('part-tooltip').hidden=true;});
    let compact = window.innerWidth < 650;
    function resize(){const width=stage.clientWidth,height=stage.clientHeight;camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);const nextCompact=window.innerWidth<650;if(nextCompact!==compact){compact=nextCompact;collapseSystems(compact);updateTargets();resetCamera();}}
    const observer=new ResizeObserver(resize);observer.observe(stage);resize();updateVisibility();updateTargets();resetCamera();
    camera.position.copy(cameraTween.position);controls.target.copy(cameraTween.target);cameraTween=null;controls.update();
    $('atlas-loading').hidden=true;
    let previous=performance.now();
    let lidProgress = upright ? 0 : 1;
    function animate(now){
        requestAnimationFrame(animate);if(document.hidden)return;
        const delta=Math.min((now-previous)/1000,.05);previous=now;const alpha=reducedMotion?1:1-Math.exp(-delta*8);
        // Open: fold the front leaf, lift the lid, then raise the rack. Close in reverse.
        const lidTarget = state.layout === 'catalog' || state.lid ? 1 : 0;
        const step = reducedMotion ? 1 : delta / 1.8;
        lidProgress += Math.sign(lidTarget - lidProgress) * Math.min(step, Math.abs(lidTarget - lidProgress));
        const mainOpen = THREE.MathUtils.smoothstep(lidProgress, .30, .75);
        rackProgress = THREE.MathUtils.lerp(rackProgress, Number(rackRaised), alpha);
        const coverTarget = state.layout === 'catalog' || fallboardOpen ? 1 : 0;
        fallboardProgress += Math.sign(coverTarget - fallboardProgress) * Math.min(reducedMotion ? 1 : delta / 1.3, Math.abs(coverTarget - fallboardProgress));
        const coverAngle = (1 - THREE.MathUtils.smoothstep(fallboardProgress, 0, .75)) * (Math.PI / 2 + .60);
        const rackOpen = (upright ? THREE.MathUtils.smoothstep(fallboardProgress, .75, 1) : THREE.MathUtils.smoothstep(lidProgress, .75, 1)) * rackProgress;
        if (lidFlap) lidFlap.rotation.x = -Math.PI * THREE.MathUtils.smoothstep(lidProgress, 0, .30);
        if (rack) rack.rotation.x = upright
            ? THREE.MathUtils.lerp(-.60, Math.PI / 2, rackOpen)
            : THREE.MathUtils.lerp(-Math.PI / 2, -.30, rackOpen);
        rackSupports.forEach(support => { support.visible = rackOpen > .98; });
        groups.forEach((g,id)=>{const t=targets.get(id);const pos=t.pos.clone();if(upright&&id==='desk'&&state.layout!=='catalog'){const hinge=groups.get('fallboard').userData.home;pos.sub(hinge).applyAxisAngle(new THREE.Vector3(1,0,0),coverAngle).add(hinge);}if(id==='desk'&&!upright&&state.layout!=='catalog')pos.y-=.16*(1-rackOpen);g.position.lerp(pos,alpha);g.scale.lerp(new THREE.Vector3(t.scale,t.scale,t.scale),alpha);const rotation=t.rot.clone();if(upright&&state.layout!=='catalog'&&(id==='fallboard'||id==='desk'))rotation.x+=coverAngle;if(id==='lid'&&state.layout!=='catalog'){if(upright)rotation.x=-1.25*mainOpen;else rotation.z=.48*mainOpen;}g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,rotation.x,alpha);g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,rotation.y,alpha);g.rotation.z=THREE.MathUtils.lerp(g.rotation.z,rotation.z,alpha);if(id==='prop')g.visible=isVisible(parts.find(p=>p.id===id))&&(mainOpen>.95||state.layout==='catalog');});
        sequence.update(delta);
        mechanism.update(now, delta);
        if(cameraTween){camera.position.lerp(cameraTween.position,alpha);controls.target.lerp(cameraTween.target,alpha);if(camera.position.distanceTo(cameraTween.position)<.005)cameraTween=null;}
        controls.update();renderer.render(scene,camera);
        const placed=[];
        parts.forEach(part=>{const b=labels.get(part.id),g=groups.get(part.id);const enabled=(state.layout==='catalog')&&g.visible;b.hidden=!enabled;if(!enabled)return;
            const point=new THREE.Box3().setFromObject(g).getCenter(new THREE.Vector3());if(state.layout==='catalog')point.y-=g.userData.size.y*g.scale.y*.5+.16;point.project(camera);
            const x=(point.x*.5+.5)*stage.clientWidth,y=(-point.y*.5+.5)*stage.clientHeight;
            const overlap=state.layout!=='catalog'&&placed.some(p=>Math.abs(p.x-x)<100&&Math.abs(p.y-y)<28);
            b.hidden=point.z>1||point.z< -1||x<(window.innerWidth<650?12:155)||x>stage.clientWidth-(window.innerWidth<650?12:65)||y<125||y>stage.clientHeight-150||overlap;
            if(!b.hidden){b.style.left=`${x}px`;b.style.top=`${y}px`;placed.push({x,y});}
        });
    }
    requestAnimationFrame(animate);
}
