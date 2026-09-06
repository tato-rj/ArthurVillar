import * as THREE from 'three';
import { createPianoAnimation } from '../animation';

export function createActionAnimation(groups, reducedMotion, upright, { demonstrationRod } = {}) {
    const sound = createPianoAnimation(new Map(), reducedMotion);
    let started = -Infinity;
    let sounded = false;
    let assemblyStage = null;
    const resting = [];
    groups.forEach((group, id) => group.children.forEach(mesh => resting.push({ id, mesh, position: mesh.position.clone(), quaternion: mesh.quaternion.clone() })));
    const keyParts = new Set(['key', 'keytop', 'capstan', 'backcheck']);
    const wippenParts = new Set(['wippen', 'wippen-heel', 'repetition', 'spring']);
    const hammerParts = new Set(['hammer', 'shank', 'knuckle']);
    const animatedIds = [...keyParts, ...wippenParts, ...hammerParts, 'jack', 'damper-head', 'damper-wire', 'damper-underlever'];
    function play() { started = performance.now(); sounded = false; }
    function update(now, delta) {
        sound.update(now, delta);
        const t = (now - started) / 1000;
        if (!sounded && t >= .52) {
            // Consume this strike even when hidden; revealing a part later must not
            // produce a delayed note during the hammer's rebound.
            sounded = true;
            if ((assemblyStage === null || assemblyStage >= 2) && t < .76 && groups.get('hammer')?.visible && groups.get('string')?.visible) sound.play(60);
        }
        const press = t < .60 ? THREE.MathUtils.smoothstep(t, 0, .60) : 1 - THREE.MathUtils.smoothstep(t, 1.25, 1.8);
        // The key/backcheck begins dropping before the checked hammer returns,
        // opening a gap instead of supporting it all the way down to rest.
        const hammer = t < .52 ? THREE.MathUtils.smoothstep(t, 0, .52) : t < .76 ? THREE.MathUtils.lerp(1, .50, THREE.MathUtils.smoothstep(t, .52, .76)) : .50 * (1 - THREE.MathUtils.smoothstep(t, 1.38, 1.8));
        if (demonstrationRod) {
            demonstrationRod.visible = assemblyStage === 2;
            if (demonstrationRod.visible) {
                const bottom = new THREE.Vector3(.60, .66, 0).sub(new THREE.Vector3(.5, .56, 0)).applyAxisAngle(new THREE.Vector3(0, 0, 1), -.055 * press).add(new THREE.Vector3(.5, .56, 0));
                const top = new THREE.Vector3(.60, 1.95, 0).sub(new THREE.Vector3(.91, 2.025, 0)).applyAxisAngle(new THREE.Vector3(0, 0, 1), -.23 * hammer).add(new THREE.Vector3(.91, 2.025, 0));
                demonstrationRod.position.copy(bottom).add(top).multiplyScalar(.5);
                demonstrationRod.scale.y = bottom.distanceTo(top);
                demonstrationRod.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), top.sub(bottom).normalize());
            }
        }
        for (const { id, mesh, position, quaternion } of resting) {
            mesh.position.copy(position); mesh.quaternion.copy(quaternion);
            if (reducedMotion) continue;
            let pivot, angle = 0;
            if (keyParts.has(id)) { pivot = [.5, .56, 0]; angle = -.055 * press; }
            if (wippenParts.has(id)) { pivot = [-1.1, 1.13, 0]; angle = .048 * press; }
            if (hammerParts.has(id)) { pivot = [.91, 2.025, 0]; angle = assemblyStage === 1 ? .35 - .05 * press : -.23 * hammer; }
            if (id === 'jack') { pivot = [.77, 1.18, 0]; angle = -.25 * THREE.MathUtils.smoothstep(t, .44, .60) * (1 - THREE.MathUtils.smoothstep(t, 1.25, 1.8)); }
            if (id === 'damper-underlever') { pivot = [-2.58, .73, 0]; angle = .19 * press; }
            if (pivot) {
                const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
                const localPivot = new THREE.Vector3(...pivot).sub(groups.get(id).userData.home);
                mesh.position.sub(localPivot).applyQuaternion(q).add(localPivot); mesh.quaternion.premultiply(q);
            }
            if (id === 'jack') {
                // Carry the tripping jack with its parent wippen instead of leaving its pivot behind.
                const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), .048 * press);
                const pivot = new THREE.Vector3(-1.10, 1.13, 0).sub(groups.get(id).userData.home);
                mesh.position.sub(pivot).applyQuaternion(q).add(pivot);
                mesh.quaternion.premultiply(q);
            }
            if (id === 'damper-head' || id === 'damper-wire') mesh.position.y += .13 * THREE.MathUtils.smoothstep(press, .15, .85);
        }
    }
    return { play, update, setAssemblyStage(stage) { assemblyStage = stage; if (demonstrationRod) demonstrationRod.visible = stage === 2; }, pedals: {}, reset() { started = -Infinity; sound.reset(); }, animatedIds };
}
