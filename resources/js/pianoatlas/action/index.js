import { initializePiano } from '../viewer';
import { buildPiano } from './model';
import { parts, systems } from './parts';
import { actionStages } from './sequence';
import { createActionAnimation } from './animation';

try {
    initializePiano({ buildPiano, parts, systems, actionModel: true, animationFactory: createActionAnimation, assemblyStages: actionStages });
} catch (error) {
    console.error('Piano action viewer could not start:', error);
    document.getElementById('atlas-loading').textContent = 'The 3D view could not start. Enable WebGL and reload this page.';
}
