// Cumulative assembly follows the reference: key, hammer, drive, repetition,
// checking, then damping. Two keystrokes demonstrate each new stage.
export const actionStages = [
    { name: 'Key and balance', parts: ['base', 'keyframe', 'key', 'keytop', 'balance-rail', 'balance-pin', 'balance-felt', 'front-rail', 'front-felt', 'back-rail', 'string'] },
    { name: 'Hammer and pivot', parts: ['hammer-flange', 'shank', 'hammer', 'knuckle'] },
    { name: 'Direct lifting stick', parts: [] },
    { name: 'Wippen and capstan', parts: ['capstan', 'wippen-heel', 'wippen', 'wippen-flange', 'hammer-rest'] },
    { name: 'Jack and escapement', parts: ['jack', 'let-off'] },
    { name: 'Repetition mechanism', parts: ['repetition', 'spring', 'drop-screw'] },
    { name: 'Backcheck', parts: ['backcheck'] },
    { name: 'Damper assembly', parts: ['damper-head', 'damper-wire', 'damper-guide', 'damper-underlever'] },
    { name: 'Complete action', parts: ['action-rail'] },
];

export function createAssemblySequence(stages, { reveal, strike, finish }) {
    let running = false, elapsed = 0, stage = -1, stroke = -1;
    const visible = new Set();
    function stop() { if (!running) return; running = false; finish(); }
    function update(delta) {
        if (!running) return;
        elapsed += delta;
        const nextStage = Math.floor(elapsed / 4.2);
        if (nextStage >= stages.length) { stop(); return; }
        if (stage !== nextStage) {
            stage = nextStage;
            stages[stage].parts.forEach(id => visible.add(id));
            reveal(new Set(visible), stages[stage].name, stage + 1, stages.length);
        }
        const nextStroke = stage * 2 + Math.min(1, Math.floor((elapsed % 4.2) / 2.1));
        if (stroke !== nextStroke) { stroke = nextStroke; strike(); }
    }
    return {
        get running() { return running; },
        start() { elapsed = 0; stage = stroke = -1; visible.clear(); running = true; update(0); },
        stop,
        update,
    };
}
