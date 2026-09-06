import { parts as grandParts, systems } from '../grand/parts';
export { systems };

const changes = {
    rim: ['Cabinet', 'The upright cabinet encloses a vertical soundboard, plate, and string scale in a compact case.'],
    underframe: ['Back posts', 'Heavy vertical timber posts reinforce the back of the upright and support its string-bearing structure.'],
    lid: ['Top lid', 'The hinged top opens to reveal the tuning pins and allows more sound to escape.'],
    desk: ['Music rack', 'A folding ledge fitted inside the raised fallboard supports sheet music. It folds flush against the keyboard cover independently of the top lid.'],
    fallboard: ['Fallboard', 'The hinged keyboard cover protects the keys when closed. It is shown open, overlapping the upper front panel to enclose the action, with a folding music rest on its inner face.'],
    'bass-strings': ['Bass strings', 'Copper-wound bass strings run diagonally in front of the vertical treble strings, fitting a longer vibrating length into the cabinet.'],
    ribs: ['Soundboard ribs', 'Ribs on the rear of the vertical soundboard reinforce its crown.'],
    legs: ['Front supports', 'Two front supports brace the projecting key bed. The cabinet carries most of the weight.'],
    lyre: ['Pedal assembly', 'Pedals and connecting rods are mounted in the base of the upright cabinet.'],
    sostenuto: ['Practice pedal', 'The middle pedal lowers a strip of felt between the hammers and strings, cushioning each strike for quieter practice.'],
    'una-corda': ['Soft pedal', 'The upright soft pedal moves the hammer rest rail and hammers closer to the strings, reducing the striking distance. It does not shift the keyboard sideways.'],
};
const remap = id => id === 'una-corda' ? 'soft-pedal' : id === 'sostenuto' ? 'practice' : id;
export const parts = grandParts.filter(p => p.id !== 'prop').map(p => ({
    ...p,
    id: remap(p.id),
    name: changes[p.id]?.[0] || p.name,
    description: changes[p.id]?.[1] || p.description,
    role: p.id === 'sostenuto' ? 'Quiet practice' : p.role,
    related: p.id === 'sostenuto' ? ['practice-felt', 'hammers'] : p.related.filter(id => id !== 'prop').map(remap),
}));
parts.push(
    { id: 'practice-felt', name: 'Practice felt rail', system: 'action', description: 'The practice pedal lowers this felt strip into the hammer strike line. The hammers strike through the felt, reducing the energy reaching the strings. Release the pedal to raise it clear.', material: 'Wool felt / metal', role: 'Strike cushioning', related: ['practice', 'hammers', 'treble-strings'] },
    { id: 'upper-panel', name: 'Upper front panel', system: 'case', description: 'This removable panel covers the upright action and upper strings. Hide it to inspect the hammer mechanism.', material: 'Finished hardwood', role: 'Enclosure', related: ['desk', 'hammers', 'lid'] },
    { id: 'lower-panel', name: 'Lower front panel', system: 'case', description: 'The removable lower panel covers the bass strings, bridges, and pedal linkage beneath the keyboard.', material: 'Finished hardwood', role: 'Enclosure', related: ['bass-strings', 'lyre', 'sustain'] },
);
parts.forEach((part, index) => { part.number = String(index + 1).padStart(2, '0'); });
