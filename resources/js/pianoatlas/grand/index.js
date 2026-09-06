import { initializePiano } from '../viewer';
import { buildPiano } from './model';
import { parts, systems } from './parts';

try {
    initializePiano({ buildPiano, parts, systems, upright: false });
} catch (error) {
    console.error('Piano viewer could not start:', error);
    document.getElementById('atlas-loading').textContent = 'The 3D view could not start. Enable WebGL and reload this page.';
}
