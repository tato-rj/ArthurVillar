import * as THREE from 'three';
import { parts } from './parts';

export function buildPiano() {
    const root = new THREE.Group();
    const groups = new Map(parts.map(part => {
        const group = new THREE.Group(); group.userData.part = part.id; root.add(group); return [part.id, group];
    }));
    const material = (color, metalness = 0, roughness = .55) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
    const wood = material('#d8b985'), darkWood = material('#785138'), green = material('#277858'), red = material('#a23442');
    const felt = material('#f1e8cf'), steel = material('#aeb9bd', .75, .25), brass = material('#bd9957', .65, .3), iron = material('#354640', .5), leather = material('#b99a65');
    // Fine end-grain variation helps distinguish wood from felt without remote textures.
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#d8b985'; ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 90; i++) { ctx.strokeStyle = `rgba(115,75,35,${.04 + (i % 4) * .02})`; ctx.beginPath(); ctx.moveTo(i * 3, 0); ctx.lineTo(i * 3 + 8, 256); ctx.stroke(); }
    const grain = new THREE.CanvasTexture(canvas); grain.colorSpace = THREE.SRGBColorSpace; wood.map = grain;
    function mesh(id, geometry, mat, pos = [0, 0, 0]) {
        const m = new THREE.Mesh(geometry, mat); m.position.set(pos[0], pos[1], pos[2] || 0); m.castShadow = m.receiveShadow = true; m.userData.part = id; groups.get(id).add(m); return m;
    }
    const box = (id, size, pos, mat = wood) => mesh(id, new THREE.BoxGeometry(...size), mat, pos);
    function beam(id, a, b, width, depth, mat = wood) {
        const av = new THREE.Vector3(...a), bv = new THREE.Vector3(...b);
        const m = mesh(id, new THREE.BoxGeometry(width, av.distanceTo(bv), depth), mat, av.clone().add(bv).multiplyScalar(.5).toArray());
        m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), bv.sub(av).normalize()); return m;
    }
    function rod(id, a, b, radius, mat = steel) {
        const av = new THREE.Vector3(...a), bv = new THREE.Vector3(...b);
        const m = mesh(id, new THREE.CylinderGeometry(radius, radius, av.distanceTo(bv), 16), mat, av.clone().add(bv).multiplyScalar(.5).toArray());
        m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), bv.sub(av).normalize()); return m;
    }
    function pin(id, x, y, z = 0, radius = .025) { rod(id, [x, y, z - .17], [x, y, z + .17], radius, brass); }
    function profile(id, points, depth, mat = wood, z = 0) {
        const shape = new THREE.Shape(points.map(([x, y]) => new THREE.Vector2(x, y)));
        const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSize: .015, bevelThickness: .008, bevelSegments: 2 });
        return mesh(id, geo, mat, [0, 0, z - depth / 2]);
    }
    box('base', [5.8, .14, 1.20], [0, .14, 0], darkWood);
    box('keyframe', [5.5, .09, .68], [0, .26, 0]);
    box('balance-rail', [.35, .15, .65], [.50, .37, 0]);
    box('balance-felt', [.31, .025, .42], [.50, .46, 0], green);
    box('front-rail', [.30, .11, .65], [2.30, .35, 0]);
    box('front-felt', [.28, .045, .42], [2.30, .43, 0], green);
    rod('front-rail', [2.30, .37, 0], [2.30, .52, 0], .024);
    box('back-rail', [.55, .05, .48], [-2.15, .39, 0], green);
    box('key', [5.20, .17, .38], [0, .56, 0]);
    box('keytop', [1.62, .025, .40], [1.79, .658, 0], felt);
    rod('balance-pin', [.50, .39, 0], [.50, .62, 0], .022);
    box('key', [.27, .035, .30], [.50, .665, 0]);
    rod('capstan', [-.25, .64, 0], [-.25, .91, 0], .028, brass);
    mesh('capstan', new THREE.CylinderGeometry(.070, .07, .035, 24), brass, [-.25, .91, 0]);
    box('wippen-heel', [.22, .18, .25], [-.25, 1.02, 0]);
    box('wippen-heel', [.23, .025, .26], [-.25, .923, 0], green);
    profile('wippen', [[-1.15, 1.08], [1.12, 1.08], [1.23, 1.17], [-.12, 1.22], [-.88, 1.20], [-1.15, 1.17]], .20);
    box('wippen-flange', [.16, .29, .28], [-1.10, .96, 0]); pin('wippen-flange', -1.10, 1.13);
    // Open-sided metal bracket leaves the linkage visible from both sides.
    for (const z of [-.38]) {
        profile('action-rail', [[-.95, .30], [-.75, .30], [1.42, 1.66], [1.42, 2.02], [1.24, 2.02], [1.24, 1.76]], .07, iron, z);
    }
    box('action-rail', [.40, .17, .94], [1.28, 1.88]);
    box('hammer-flange', [.42, .11, .27], [1.05, 2.025]); pin('hammer-flange', .91, 2.025);
    beam('shank', [.91, 2.025, 0], [-1.43, 1.45, 0], .073, .13);
    // Layered hammer molding, underfelt, and outer striking felt.
    const hammer = mesh('hammer', new THREE.SphereGeometry(1, 32, 24), felt, [-1.52, 1.76, 0]); hammer.scale.set(.20, .34, .16); hammer.rotation.z = .27;
    const underfelt = mesh('hammer', new THREE.SphereGeometry(1, 24, 16), red, [-1.52, 1.74, .155]); underfelt.scale.set(.09, .20, .016); underfelt.rotation.z = .27;
    beam('hammer', [-1.43, 1.42, 0], [-1.56, 1.83, 0], .07, .18);
    rod('knuckle', [.60, 1.86, -.115], [.60, 1.86, .115], .075, leather);
    beam('repetition', [-.82, 1.35, 0], [.76, 1.79, 0], .085, .20);
    beam('repetition', [-.18, 1.17, 0], [-.18, 1.54, 0], .075, .15); pin('repetition', -.18, 1.54);
    profile('jack', [[.77, 1.15], [.86, 1.17], [.57, 1.79], [.50, 1.79], [.69, 1.27], [1.02, 1.26], [1.02, 1.19]], .12);
    pin('jack', .77, 1.18);
    rod('let-off', [1.04, 1.53, 0], [1.04, 1.87, 0], .021, brass);
    box('let-off', [.17, .06, .21], [1.04, 1.53]); box('let-off', [.18, .025, .22], [1.04, 1.485], green);
    rod('drop-screw', [.71, 1.83, 0], [.71, 2.12, 0], .021);
    box('drop-screw', [.12, .025, .13], [.71, 2.12], steel);
    const springPoints = [];
    for (let i = 0; i <= 90; i++) { const t = i / 90; springPoints.push(new THREE.Vector3(.35 + t * .22, 1.29 + Math.sin(t * Math.PI * 14) * .025, Math.cos(t * Math.PI * 14) * .025)); }
    mesh('spring', new THREE.TubeGeometry(new THREE.CatmullRomCurve3(springPoints), 90, .007, 6), brass);
    rod('spring', [.35, 1.29, 0], [-.15, 1.51, 0], .007, brass); rod('spring', [.57, 1.29, 0], [.62, 1.57, 0], .007, brass);
    box('hammer-rest', [.27, .20, .28], [-.98, .93]); box('hammer-rest', [.30, .07, .30], [-.98, 1.065], green);
    // The raised, leather-faced backcheck catches the hammer tail on rebound.
    rod('backcheck', [-1.42, .65, 0], [-1.63, 1.41, 0], .022);
    const check = box('backcheck', [.14, .27, .29], [-1.63, 1.42], wood);
    check.rotation.z = .20;
    const checkLeather = box('backcheck', [.045, .27, .31], [-1.55, 1.436], leather);
    checkLeather.rotation.z = .20;
    box('damper-guide', [.25, .42, .47], [-2.38, 1.96]);
    box('damper-guide', [.54, .09, .50], [-2.22, 2.18]);
    rod('damper-wire', [-2.18, .79, 0], [-2.18, 2.73, 0], .015);
    profile('damper-underlever', [[-2.61, .66], [-1.97, .64], [-1.95, .84], [-2.59, .81]], .24);
    pin('damper-underlever', -2.58, .73);
    for (const x of [-2.40, -2.15]) pin('damper-underlever', x, .735, 0, .058);
    box('damper-head', [.72, .12, .38], [-2.18, 2.80]);
    for (const x of [-2.40, -1.96]) box('damper-head', [.25, .12, .40], [x, 2.68], felt);
    for (const z of [-.065, 0, .065]) rod('string', [-2.70, 2.615, z], [.30, 2.615, z], .006);
    root.updateMatrixWorld(true);
    groups.forEach(group => {
        const center = new THREE.Box3().setFromObject(group).getCenter(new THREE.Vector3());
        group.children.forEach(child => child.position.sub(center)); group.position.copy(center);
        group.userData.home = center.clone(); group.userData.rotation = group.rotation.clone();
        group.userData.size = new THREE.Box3().setFromObject(group).getSize(new THREE.Vector3()); group.userData.center = new THREE.Vector3();
        const mats = new Map(); group.traverse(m => { if (!m.isMesh) return; if (!mats.has(m.material)) mats.set(m.material, m.material.clone()); m.material = mats.get(m.material); });
    });
    // Temporary teaching linkage used only before the real action is assembled.
    const demonstrationRod = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, 1, 12), wood.clone());
    demonstrationRod.visible = false;
    demonstrationRod.castShadow = true;
    root.add(demonstrationRod);
    return { root, groups, demonstrationRod };
}
