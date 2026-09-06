import * as THREE from 'three';
import { parts } from './parts';

// Illustrative upright with a vertical overstrung scale and a practice pedal.
export function buildPiano() {
    const root = new THREE.Group();
    const groups = new Map(parts.map(part => {
        const group = new THREE.Group();
        group.userData.part = part.id;
        root.add(group);
        return [part.id, group];
    }));
    const material = (color, metalness = 0, roughness = .4) => new THREE.MeshStandardMaterial({ color, metalness, roughness });
    const black = material('#161e20', .28, .23);
    const gold = material('#c5a453', .58, .36);
    const steel = material('#a4adb1', .78, .28);
    const copper = material('#aa7950', .62);
    const wood = material('#bd935c');
    const spruce = material('#d8b783', 0, .7);
    const felt = material('#eee7d7', 0, .85);
    const white = material('#f4f0e6', .03, .3);
    function mesh(id, geometry, finish, position, midi) {
        const object = new THREE.Mesh(geometry, finish);
        object.position.set(...position);
        object.castShadow = object.receiveShadow = true;
        object.userData.part = id;
        if (midi !== undefined) object.userData.midi = midi;
        groups.get(id).add(object);
        return object;
    }
    const box = (id, size, pos, mat, midi) => mesh(id, new THREE.BoxGeometry(...size), mat, pos, midi);
    function rod(id, a, b, radius, mat, midi) {
        const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
        const object = mesh(id, new THREE.CylinderGeometry(radius, radius, start.distanceTo(end), 10), mat, start.clone().add(end).multiplyScalar(.5).toArray(), midi);
        object.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.sub(start).normalize());
        return object;
    }

    // Cabinet, removable front boards, and hinged top.
    for (const x of [-1.46, 1.46]) box('rim', [.10, 2.42, .65], [x, 1.35, -.13], black);
    box('rim', [2.92, .13, .65], [0, .20, -.13], black);
    box('upper-panel', [2.80, .96, .055], [0, 2.04, .22], black);
    box('lower-panel', [2.80, .79, .055], [0, .68, .22], black);
    for (const y of [1.59, 2.48]) box('upper-panel', [2.78, .025, .025], [0, y, .256], black);
    for (const x of [-1.28, 1.28]) box('lower-panel', [.018, .64, .018], [x, .68, .256], black);
    const lid = groups.get('lid');
    lid.position.set(0, 2.58, -.46);
    box('lid', [3.05, .065, .74], [0, 0, .37], black);
    for (const x of [-1, 0, 1]) rod('rim', [x - .07, 2.565, -.44], [x + .07, 2.565, -.44], .016, gold);
    box('keybed', [2.93, .14, .88], [0, 1.19, .46], black);
    // The raised keyboard cover overlaps the upper panel, enclosing the action.
    // Its inner face slopes back toward the cabinet and carries the folding rest.
    const fallboardHinge = new THREE.Vector3(0, 1.445, .46);
    groups.get('fallboard').position.copy(fallboardHinge);
    const fallboard = box('fallboard', [2.84, .46, .065], [0, Math.cos(.60) * .23, -Math.sin(.60) * .23], black);
    fallboard.rotation.x = -.60;
    for (const x of [-1.43, 1.43]) {
        box('rim', [.10, .20, .68], [x, 1.35, .55], black);
        // Solid cheek blocks close the ends of the sloping fallboard.
        const cheek = new THREE.Shape();
        cheek.moveTo(.19, 1.32);
        cheek.lineTo(.58, 1.32);
        cheek.lineTo(.53, 1.42);
        cheek.lineTo(.25, 1.78);
        cheek.lineTo(.19, 1.78);
        cheek.closePath();
        const geometry = new THREE.ExtrudeGeometry(cheek, { depth: .10, bevelEnabled: false });
        geometry.rotateY(-Math.PI / 2);
        mesh('rim', geometry, black, [x + .05, 0, 0]);
    }
    const rack = new THREE.Group();
    rack.position.set(0, 1.59, .40);
    groups.get('desk').add(rack);
    // A slim folding ledge is fitted to the inside of the fallboard, not the panel.
    const ledge = box('desk', [1.70, .10, .022], [0, .05, 0], black);
    rack.add(ledge);
    const lip = box('desk', [1.70, .012, .025], [0, .095, .012], black);
    rack.add(lip);

    // Exposed rear soundboard and structural posts.
    box('soundboard', [2.76, 2.14, .055], [0, 1.39, -.31], spruce);
    for (let i = 0; i < 9; i++) {
        const rib = box('ribs', [2.66, .035, .045], [0, .46 + i * .235, -.355], spruce);
        rib.rotation.z = .065;
    }
    for (const x of [-1.28, -.64, 0, .64, 1.28]) box('underframe', [.13, 2.24, .12], [x, 1.39, -.44], wood);
    for (const y of [.29, 2.49]) box('underframe', [2.78, .13, .13], [0, y, -.44], wood);

    // Cast frame with large open windows and reinforcing ribs.
    const plate = new THREE.Shape();
    plate.moveTo(-1.36, .32); plate.lineTo(1.36, .32); plate.lineTo(1.36, 2.47); plate.lineTo(-1.36, 2.47); plate.closePath();
    for (const [left, right] of [[-1.20, -.53], [-.38, .35], [.50, 1.20]]) {
        const hole = new THREE.Path();
        hole.moveTo(left, .50); hole.lineTo(left, 2.20); hole.lineTo(right, 2.20); hole.lineTo(right, .50); hole.closePath();
        plate.holes.push(hole);
    }
    mesh('plate', new THREE.ExtrudeGeometry(plate, { depth: .055, bevelEnabled: true, bevelSize: .012, bevelThickness: .008, bevelSegments: 2 }), gold, [0, 0, -.245]);
    for (const x of [-.46, .425]) box('braces', [.045, 1.87, .08], [x, 1.36, -.15], gold);
    for (let i = 0; i < 15; i++) {
        for (const y of [.38, 2.39]) {
            const bolt = mesh('plate', new THREE.CylinderGeometry(.022, .022, .025, 6), steel, [-1.25 + i * .178, y, -.168]);
            bolt.rotation.x = Math.PI / 2;
        }
    }
    box('pinblock', [2.65, .19, .095], [0, 2.34, -.29], wood);
    rod('treble-bridge', [-.83, .49, -.19], [1.20, 1.52, -.19], .035, wood);
    rod('bass-bridge', [-1.14, .56, -.12], [-.65, .86, -.12], .045, wood);
    for (let i = 0; i < 64; i++) {
        const x = -1.13 + i / 63 * 2.30;
        const bottom = .53 + i / 63 * .98;
        for (let j = 0; j < 3; j++) {
            const dx = j * .008;
            rod('treble-strings', [x + dx, 2.25, -.11], [x + dx, bottom, -.11], .0022, steel);
            rod('tuning-pins', [x + dx, 2.27 + j * .028, -.19], [x + dx, 2.27 + j * .028, -.07], .006, steel);
            rod('hitch-pins', [x + dx, bottom, -.18], [x + dx, bottom, -.08], .006, gold);
        }
    }
    for (let i = 0; i < 24; i++) rod('bass-strings', [-1.2 + i * .025, 2.20, -.035], [-.95 + i * .064, .55, -.035], .0045, copper);

    // 88 notes with individually addressable keys, action members, and dampers.
    let natural = 0;
    const width = 2.70 / 52;
    for (let midi = 21; midi <= 108; midi++) {
        const sharp = [1, 3, 6, 8, 10].includes(midi % 12);
        const x = -1.35 + (natural + (sharp ? 0 : .5)) * width;
        box(sharp ? 'black-keys' : 'white-keys', [width * (sharp ? .59 : .95), sharp ? .095 : .055, sharp ? .32 : .44], [x, sharp ? 1.362 : 1.303, sharp ? .62 : .68], sharp ? black : white, midi);
        const ax = -1.30 + (midi - 21) / 87 * 2.60;
        box('key-levers', [.020, .03, .35], [ax, 1.29, .26], wood, midi);
        box('wippens', [.020, .09, .12], [ax, 1.46, .12], wood, midi);
        rod('shanks', [ax, 1.51, .12], [ax, 1.85, .06], .008, wood, midi);
        const hammer = mesh('hammers', new THREE.SphereGeometry(.029, 8, 8), felt, [ax, 1.86, .035], midi);
        hammer.scale.set(.42, 1.2, 1.2);
        if (midi < 90) {
            box('dampers', [.022, .08, .027], [ax, 1.99, -.065], felt, midi);
            rod('dampers', [ax, 1.62, .01], [ax, 1.99, -.035], .005, wood, midi);
        }
        if (!sharp) natural++;
    }
    // Park the moderator above the hammers; the middle pedal lowers it into their path.
    box('practice-felt', [2.66, .11, .018], [0, 2.12, -.012], felt);
    box('practice-felt', [2.70, .025, .028], [0, 2.18, -.012], steel);
    box('balance-rail', [2.68, .025, .04], [0, 1.26, .35], wood);
    box('damper-rail', [2.66, .045, .035], [0, 1.64, .03], wood);
    for (const x of [-1.37, 1.37]) {
        box('legs', [.12, 1.03, .13], [x, .69, .77], black);
        box('legs', [.18, .12, 1.12], [x, .19, .24], black);
        for (const z of [-.27, .71]) {
            const caster = mesh('casters', new THREE.CylinderGeometry(.064, .064, .08, 16), gold, [x, .095, z]);
            caster.rotation.z = Math.PI / 2;
        }
    }
    box('lyre', [.85, .09, .22], [0, .24, .34], black);
    for (const [id, x] of [['soft-pedal', -.22], ['practice', 0], ['sustain', .22]]) {
        box(id, [.11, .035, .29], [x, .22, .48], gold);
        rod(id, [x, .25, .10], [x, 1.4, .11], .012, gold);
    }
    root.updateMatrixWorld(true);
    groups.forEach((group, id) => {
        if (id !== 'lid' && id !== 'fallboard') {
            const center = new THREE.Box3().setFromObject(group).getCenter(new THREE.Vector3());
            group.children.forEach(child => child.position.sub(center));
            group.position.copy(center);
        }
        group.userData.home = group.position.clone();
        group.userData.rotation = group.rotation.clone();
        const bounds = new THREE.Box3().setFromObject(group);
        group.userData.size = bounds.getSize(new THREE.Vector3());
        group.userData.center = bounds.getCenter(new THREE.Vector3()).sub(group.position);
        const finishes = new Map();
        group.traverse(object => {
            if (!object.isMesh) return;
            if (!finishes.has(object.material)) finishes.set(object.material, object.material.clone());
            object.material = finishes.get(object.material);
        });
    });
    return { root, groups, rack, rackSupports: [], lidFlap: null };
}
