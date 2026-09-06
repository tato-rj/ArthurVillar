import * as THREE from 'three';
import { parts } from './parts';

export function buildPiano() {
    const root = new THREE.Group();
    const groups = new Map();
    parts.forEach(part => { const g = new THREE.Group(); g.userData.part = part.id; root.add(g); groups.set(part.id, g); });
    const material = (color, metalness = 0, roughness = .45) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
    const ebony = material('#161e20', .28, .23), edge = material('#303738', .24, .28);
    const gold = material('#b99a57', .68, .3), steel = material('#a4adb1', .78, .28), copper = material('#aa7950', .62, .38);
    const wood = material('#bb8450', 0, .57), spruce = material('#d8b783', 0, .7), felt = material('#eee7d7', 0, .85), red = material('#89463e', 0, .9);
    const white = material('#f4f0e6', .03, .3);
    // Procedural grain stays self-contained; no external model or texture requests.
    const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#d8b783'; ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 190; i++) { const y = i * 2.7; ctx.strokeStyle = `rgba(104,64,27,${.06 + (i % 5) * .018})`; ctx.beginPath(); ctx.moveTo(0, y); ctx.bezierCurveTo(160, y + 3, 350, y - 3, 512, y + 1); ctx.stroke(); }
    const grain = new THREE.CanvasTexture(canvas); grain.colorSpace = THREE.SRGBColorSpace; spruce.map = grain;
    function mesh(id, geo, mat, x=0, y=0, z=0) { const m = new THREE.Mesh(geo, mat); m.position.set(x,y,z); m.castShadow = true; m.receiveShadow = true; m.userData.part = id; groups.get(id).add(m); return m; }
    const box = (id, size, pos, mat) => mesh(id, new THREE.BoxGeometry(...size), mat, ...pos);
    function rod(id, a, b, radius, mat, radiusTop = radius) { const av = new THREE.Vector3(...a), bv = new THREE.Vector3(...b); const m = mesh(id, new THREE.CylinderGeometry(radiusTop, radius, av.distanceTo(bv), 8), mat); m.position.copy(av).add(bv).multiplyScalar(.5); m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), bv.sub(av).normalize()); return m; }
    function outline(scale=1, front=1.03) {
        const s = new THREE.Shape();
        s.moveTo(-1.46*scale, front*scale); s.lineTo(1.46*scale, front*scale); s.lineTo(1.46*scale, .42*scale);
        s.bezierCurveTo(1.44*scale, -.32*scale, .59*scale, -.64*scale, .38*scale, -1.44*scale);
        s.bezierCurveTo(.16*scale, -2.33*scale, -.32*scale, -2.77*scale, -.91*scale, -2.72*scale);
        s.bezierCurveTo(-1.28*scale, -2.70*scale, -1.46*scale, -2.47*scale, -1.46*scale, -2.09*scale);
        s.lineTo(-1.46*scale, front*scale); return s;
    }
    function slab(id, shape, depth, y, mat) { const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: .012, bevelThickness: .008, bevelSegments: 2, steps: 1, curveSegments: 36 }); geo.rotateX(Math.PI/2); return mesh(id, geo, mat, 0, y, 0); }
    // U-shaped case: the panel across the keyboard belongs to the fallboard.
    function rimOutline(outerScale, innerScale) {
        const points = outline(outerScale).getPoints(60).slice(1)
            .concat(outline(innerScale).getPoints(60).slice(1).reverse());
        return new THREE.Shape(points);
    }
    const rim = rimOutline(1, .948);
    const rimFinish = ebony.clone();
    rimFinish.side = THREE.DoubleSide;
    slab('rim', rim, .55, 1.68, rimFinish);
    // Explicit opaque inner lining prevents back-face gaps and pale environment reflections.
    const innerFinish = material('#080a0a', 0, .65);
    innerFinish.side = THREE.DoubleSide;
    innerFinish.envMapIntensity = .08;
    const innerContour = outline(.948).getPoints(60);
    const liningVertices = [], liningIndices = [];
    innerContour.forEach((point, i) => {
        liningVertices.push(point.x, 1.142, point.y, point.x, 1.668, point.y);
        if (i > 1) {
            const a = (i - 1) * 2, b = i * 2;
            liningIndices.push(a, b, a + 1, b, b + 1, a + 1);
        }
    });
    const lining = new THREE.BufferGeometry();
    lining.setAttribute('position', new THREE.Float32BufferAttribute(liningVertices, 3));
    lining.setIndex(liningIndices);
    lining.computeVertexNormals();
    mesh('rim', lining, innerFinish);
    const trim = rimOutline(1.006, .983); slab('rim', trim, .026, 1.696, edge);
    // A continuous timber soundboard closes the belly; strings stay above it.
    const boardFinish = spruce.clone();
    boardFinish.side = THREE.DoubleSide;
    slab('soundboard', outline(.955), .10, 1.37, boardFinish);
    // The solid front bed conceals the underside of the keyboard and action.
    // Stop the rectangular bed at z=.46, ahead of the rim's curved section (z=.42).
    // The white keys end at z=1.34; keep only a .02 front lip.
    box('keybed', [2.90,.16,.90], [0,1.16,.91], ebony);
    const lowerRim = rimOutline(1, .905);
    slab('rim', lowerRim, .045, 1.175, rimFinish);
    function bellyBeam(a, b, width = .14) {
        const dx = b[0] - a[0], dz = b[1] - a[1];
        const beam = box('underframe', [width,.16,Math.hypot(dx,dz)], [(a[0]+b[0])/2,1.145,(a[1]+b[1])/2], spruce);
        beam.rotation.y = Math.atan2(dx,dz);
    }
    // Start together at the key bed, then fan outward to separate tail/rim anchors.
    // The front ends overlap the bed's rear edge (z=.46) for a continuous joint.
    bellyBeam([-1.12,.48],[-1.22,-2.15], .18);
    bellyBeam([-.98,.48],[-.80,-2.47], .17);
    bellyBeam([-.84,.48],[-.12,-1.96], .17);
    bellyBeam([-.70,.48],[.44,-.89], .17);
    bellyBeam([-1.29,-.81],[.39,-.81], .13);
    bellyBeam([-1.25,-1.63],[-.05,-1.63], .13);
    for (const [x,z] of [[-1.31,1.18],[1.31,1.18],[-.78,-2.33]]) {
        box('underframe',[.32,.13,.32],[x,1.10,z],ebony);
    }
    box('rim', [.13,.28,.66], [-1.46,1.36,1.03], ebony); box('rim', [.13,.28,.66], [1.46,1.36,1.03], ebony);
    // Sit ahead of the soundboard's front edge so only the playing keys remain exposed.
    box('fallboard', [2.84,.38,.065], [0,1.52,1.02], ebony);
    // The separate music desk occupies the open bay ahead of the shortened main lid.
    box('desk', [2.72,.055,.36], [0,1.70,.68], ebony);
    for (const x of [-1.10,1.10]) box('desk', [.48,.035,.37], [x,1.742,.68], edge);
    const rackShape = new THREE.Shape();
    rackShape.moveTo(-.85,0); rackShape.lineTo(.85,0);
    rackShape.bezierCurveTo(.79,.16,.78,.33,.86,.48);
    rackShape.lineTo(.79,.54);
    rackShape.bezierCurveTo(.48,.43,.23,.55,0,.53);
    rackShape.bezierCurveTo(-.23,.55,-.48,.43,-.79,.54);
    rackShape.lineTo(-.86,.48);
    rackShape.bezierCurveTo(-.78,.33,-.79,.16,-.85,0);
    const rackGeometry = new THREE.ExtrudeGeometry(rackShape, {
        depth: .035, bevelEnabled: true, bevelSize: .012,
        bevelThickness: .008, bevelSegments: 3, curveSegments: 24,
    });
    const rack = mesh('desk', rackGeometry, ebony, 0,1.745,.72);
    rack.rotation.x = -.30;
    box('desk', [1.79,.045,.105], [0,1.755,.765], ebony);
    const rackSupports = [];
    for (const x of [-.56,.56]) {
        rackSupports.push(rod('desk', [x,1.73,.49], [x,2.02,.63], .012, ebony));
        rod('desk', [x-.045,1.75,.72], [x+.045,1.75,.72], .013, gold);
    }
    // The lid rotates around the straight bass-side hinge, not its center.
    const lid = slab('lid', outline(1.02, .42), .065, 0, ebony);
    lid.geometry.translate(1.49,0,0); groups.get('lid').position.set(-1.49,1.75,0); groups.get('lid').rotation.z = .48;
    // The front leaf shares the main lid's hinge motion and folds back on top of it.
    const lidFlap = new THREE.Group();
    lidFlap.position.set(1.49, .008, .4284);
    groups.get('lid').add(lidFlap);
    const frontLeaf = new THREE.Mesh(new THREE.BoxGeometry(2.9784,.05,.6222), ebony);
    frontLeaf.position.set(0,-.025,.3111);
    frontLeaf.userData.part = 'lid';
    frontLeaf.castShadow = true; frontLeaf.receiveShadow = true;
    lidFlap.add(frontLeaf);
    lidFlap.rotation.x = -Math.PI;
    const foldHinge = new THREE.Mesh(new THREE.CylinderGeometry(.009,.009,2.92,12), gold);
    foldHinge.rotation.z = Math.PI / 2;
    foldHinge.userData.part = 'lid';
    lidFlap.add(foldHinge);
    // Mount below the rim's top edge on its inner face, leaning toward the lid socket.
    const propTip = new THREE.Vector3(.85 + 1.49, -.065, -.22)
        .applyAxisAngle(new THREE.Vector3(0, 0, 1), .48)
        .add(groups.get('lid').position);
    rod('prop', [1.12,1.56,-.22], propTip.toArray(), .023, ebony);
    for (const z of [-1.8,-.5,.22]) rod('rim', [-1.49,1.72,z-.08],[-1.49,1.72,z+.08], .026, gold);
    const plateShape = outline(.905); plateShape.holes.push(new THREE.Path(outline(.76).getPoints(60))); slab('plate', plateShape, .07, 1.48, gold);
    box('plate', [2.66,.08,.21],[0,1.48,.64],gold);
    rod('braces',[-1.16,1.51,.59],[-.85,1.51,-2.42], .055,gold);
    rod('braces',[-.28,1.51,.59],[-.72,1.51,-2.35], .05,gold);
    rod('braces',[.66,1.51,.59],[-.35,1.51,-1.96], .05,gold);
    rod('braces',[1.2,1.51,.59],[.43,1.51,-.55], .045,gold);
    box('pinblock',[2.63,.12,.20],[0,1.38,.63],wood);
    const boardPoints = outline(.90).getPoints(160);
    for (let i=0;i<12;i++) {
        const z=.68-i*.27, intersections=[];
        for(let j=0;j<boardPoints.length-1;j++) {
            const a=boardPoints[j], b=boardPoints[j+1];
            if((a.y<=z&&b.y>z)||(b.y<=z&&a.y>z)) intersections.push(a.x+(z-a.y)/(b.y-a.y)*(b.x-a.x));
        }
        intersections.sort((a,b)=>a-b);
        if(intersections.length>=2) { const left=intersections[0],right=intersections[intersections.length-1]; box('ribs',[right-left,.07,.045],[(left+right)/2,1.235,z],spruce); }
    }
    const longBridge = new THREE.CatmullRomCurve3([new THREE.Vector3(-.73,1.43,-2.30),new THREE.Vector3(-.46,1.43,-1.68),new THREE.Vector3(.05,1.43,-.98),new THREE.Vector3(.74,1.43,-.29),new THREE.Vector3(1.13,1.43,.2)]);
    mesh('treble-bridge', new THREE.TubeGeometry(longBridge, 48, .042, 8, false),wood);
    rod('bass-bridge',[-1.16,1.46,-1.50],[-.70,1.46,-2.22],.055,wood);
    // 88 physical keys, with the actual A0–C8 black/white pattern.
    let naturalIndex=0;
    const keyWidth=2.70/52;
    for (let midi=21;midi<=108;midi++) {
        const black=[1,3,6,8,10].includes(midi%12);
        const x = black ? -1.35+naturalIndex*keyWidth : -1.35+(naturalIndex+.5)*keyWidth;
        const key=box(black?'black-keys':'white-keys', [black ? keyWidth*.59 : keyWidth*.95,black?.095:.055,black?.32:.44], [x,black?1.362:1.303,black?1.06:1.12],black?ebony:white);
        key.userData.midi=midi;
        const ax=-1.30+(midi-21)/87*2.60;
        box('key-levers',[.021,.035,.42],[ax,1.255,.72],wood);
        box('wippens',[.018,.032,.22],[ax,1.35,.39],wood).rotation.x=-.20;
        rod('wippens',[ax,1.33,.4],[ax,1.44,.31],.009,wood);
        rod('shanks',[ax,1.39,.42],[ax,1.49,.04],.008,wood);
        const hammer=mesh('hammers',new THREE.SphereGeometry(.032,8,6),felt,ax,1.50,.04); hammer.scale.set(.43,1.1,1.4);
        if(midi<90) { box('dampers',[.023,.033,.09],[ax,1.595,-.04],ebony); box('dampers',[.022,.013,.078],[ax,1.572,-.04],felt); rod('dampers',[ax,1.56,-.04],[ax,1.34,-.04],.004,steel); }
        if(!black) naturalIndex++;
    }
    box('balance-rail',[2.69,.035,.055],[0,1.23,.76],wood); box('balance-rail',[2.69,.012,.04],[0,1.258,.76],red);
    // Keep both ends clear of the inner rim, including the narrowing treble curve.
    box('damper-rail',[2.48,.035,.035],[-.05,1.32,-.05],wood);
    // Illustrative string scale: wound bass strings cross over the steel strings.
    for (let i=0;i<64;i++) {
        const x=-1.15+i/63*2.36, endZ=-2.35+Math.pow(i/63,.83)*2.57, endX=-.75+i/63*1.9;
        for(let j=0;j<3;j++) { const dx=(j-1)*.008; rod('treble-strings',[x+dx,1.535,.56],[endX+dx,1.535,endZ],.0022,steel); rod('tuning-pins',[x+dx,1.49,.61+j*.037],[x+dx,1.565,.61+j*.037],.007,steel); rod('hitch-pins',[endX+dx,1.49,endZ],[endX+dx,1.56,endZ],.006,gold); }
    }
    for(let i=0;i<24;i++) { const x=-1.23+i*.032, ex=-1.17+i*.019, ez=-1.5-i*.031; const n=i<8?1:2; for(let j=0;j<n;j++) { rod('bass-strings',[x+j*.009,1.565,.52],[ex+j*.009,1.565,ez],.005,copper); rod('tuning-pins',[x+j*.009,1.49,.54],[x+j*.009,1.59,.54],.01,steel); } }
    for(const [x,z] of [[-1.31,1.18],[1.31,1.18],[-.78,-2.33]]) { rod('legs',[x,.19,z],[x,1.20,z],.064,ebony,.12); rod('legs',[x,.20,z],[x,.28,z],.073,gold); const wheel=mesh('casters',new THREE.CylinderGeometry(.076,.076,.085,16),gold,x,.115,z); wheel.rotation.z=Math.PI/2; box('casters',[.10,.09,.12],[x,.18,z],gold); }
    for(const x of [-.25,.25]) rod('lyre',[x,.30,.92],[x*.75,1.16,.75],.035,ebony);
    box('lyre',[.70,.09,.20],[0,.27,.97],ebony);
    for(const [id,x] of [['una-corda',-.20],['sostenuto',0],['sustain',.20]]) { const pedal=box(id,[.11,.034,.29],[x,.20,1.12],gold); pedal.rotation.x=-.10; rod(id,[x,.24,.98],[x,1.21,.73],.012,gold); }
    // Normalize every component around its own center for consistent explode/focus behavior.
    root.updateMatrixWorld(true);
    groups.forEach((g,id) => {
        if(id!=='lid') { const center=new THREE.Box3().setFromObject(g).getCenter(new THREE.Vector3()); g.children.forEach(child=>child.position.sub(center)); g.position.copy(center); }
        g.userData.home=g.position.clone(); g.userData.rotation=g.rotation.clone();
        const bound=new THREE.Box3().setFromObject(g); g.userData.size=bound.getSize(new THREE.Vector3());
        g.userData.center=bound.getCenter(new THREE.Vector3()).sub(g.position);
        // Separate material instances by part so highlighting cannot bleed into adjacent parts.
        const mats=new Map(); g.traverse(o=>{ if(!o.isMesh)return; if(!mats.has(o.material))mats.set(o.material,o.material.clone()); o.material=mats.get(o.material); });
    });
    return { root, groups, lidFlap, rack, rackSupports };
}
