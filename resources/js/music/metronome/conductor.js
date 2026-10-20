// Traced from the four supplied conducting-pattern screenshots.
// Each point marks a beat; its curves lead to the next beat.
// The four-beat side loops mirror each other around the center downstroke.
export const CONDUCTING_PATTERNS = {
    1: [
        {
            point: [200, 540],
            curves: [
                { to: [208.85, 384.54], controls: [[173.1, 508.74], [200.34, 423.2]] },
                { to: [235.85, 210.89], controls: [[221.33, 327.78], [235.85, 270.11]] },
                { to: [200.83, 36], controls: [[235.85, 153.6], [211.94, 91.77]] },
                { to: [200, 540], controls: [[215, 204.22], [213.91, 372.13]] },
            ],
        },
    ],
    2: [
        {
            point: [200, 540],
            curves: [
                { to: [262.14, 327.55], controls: [[312.81, 572.13], [277.43, 381.03]] },
                { to: [178.55, 416.85], controls: [[265.41, 373.54], [239.55, 434.83]] },
                { to: [218.96, 256.19], controls: [[216.22, 388.02], [218.96, 301.19]] },
                { to: [200, 36], controls: [[218.96, 183.16], [211.01, 108.19]] },
            ],
        },
        {
            point: [200, 36],
            curves: [{ to: [200, 540], controls: [[200, 204], [200, 372]] }],
        },
    ],
    3: [
        {
            point: [200, 540],
            curves: [
                { to: [203.83, 326.33], controls: [[175.99, 514.59], [162.56, 326.33]] },
                { to: [304.96, 450.7], controls: [[226.88, 326.33], [261.71, 450.7]] },
                { to: [371.43, 283.11], controls: [[349.3, 450.7], [366.48, 315.1]] },
            ],
        },
        {
            point: [371.43, 283.11],
            curves: [
                { to: [306.18, 406.25], controls: [[365.15, 308.08], [337.04, 406.25]] },
                { to: [200, 36], controls: [[215.55, 406.25], [197.12, 94.21]] },
            ],
        },
        {
            point: [200, 36],
            curves: [{ to: [200, 540], controls: [[200, 204], [200, 372]] }],
        },
    ],
    4: [
        {
            point: [200, 540],
            curves: [
                { to: [208.28, 402.99], controls: [[200, 481.8], [202.76, 453.12]] },
                { to: [200.57, 305.53], controls: [[209.56, 391.32], [223.13, 305.53]] },
                { to: [63.15, 464.16], controls: [[171.7, 305.53], [96.35, 464.16]] },
            ],
        },
        {
            point: [63.15, 464.16],
            curves: [
                { to: [79.46, 303.09], controls: [[17.47, 464.16], [32.63, 303.09]] },
                { to: [336.85, 464.16], controls: [[129.84, 303.09], [303.65, 464.16]] },
            ],
        },
        {
            point: [336.85, 464.16],
            curves: [
                { to: [320.54, 303.09], controls: [[382.53, 464.16], [367.37, 303.09]] },
                { to: [235, 384], controls: [[270.16, 303.09], [255, 384]] },
                { to: [200, 36], controls: [[210, 384], [204.69, 88.9]] },
            ],
        },
        {
            point: [200, 36],
            curves: [{ to: [200, 540], controls: [[200, 204], [200, 372]] }],
        },
    ],
};

function curvePoint(start, curve, progress) {
    const t = Math.min(1, Math.max(0, progress));
    const u = 1 - t;
    return start.map((value, axis) =>
        u ** 3 * value + 3 * u ** 2 * t * curve.controls[0][axis]
        + 3 * u * t ** 2 * curve.controls[1][axis] + t ** 3 * curve.to[axis]);
}

function measureStroke(segment) {
    const samples = [{ point: segment.point, distance: 0 }];
    const curveEnds = [];
    let start = segment.point;
    let previous = start;
    let length = 0;
    for (const curve of segment.curves) {
        // Cache a dense arc-length map once, rather than timing individual
        // Bézier parameters: equal parameter steps do not cover equal distances.
        for (let step = 1; step <= 512; step++) {
            const point = curvePoint(start, curve, step / 512);
            length += Math.hypot(point[0] - previous[0], point[1] - previous[1]);
            samples.push({ point, distance: length });
            previous = point;
        }
        curveEnds.push(length);
        start = curve.to;
    }
    return { samples, curveEnds, length };
}

const conductingMotion = Object.fromEntries(Object.entries(CONDUCTING_PATTERNS)
    .map(([beats, pattern]) => [beats, pattern.map(measureStroke)]));

export function conductorPoint(beats, beat, progress) {
    const pattern = conductingMotion[beats] || conductingMotion[1];
    const index = ((beat % pattern.length) + pattern.length) % pattern.length;
    const { samples, length } = pattern[index];
    const t = Math.min(1, Math.max(0, progress));
    if (t === 0 || length === 0) return samples[0].point;
    if (t === 1) return samples[samples.length - 1].point;

    // One uninterrupted distance ramp per beat, including every curve join.
    const distance = t * length;
    let low = 1;
    let high = samples.length - 1;
    while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (samples[middle].distance < distance) low = middle + 1;
        else high = middle;
    }
    const before = samples[low - 1];
    const after = samples[low];
    const fraction = (distance - before.distance) / (after.distance - before.distance);
    return before.point.map((value, axis) => value + (after.point[axis] - value) * fraction);
}

export function conductorPreparationPoint(beats, progress) {
    const duration = conductorPreparationBeats(beats);
    return conductorPoint(beats, beats - 1, 1 - duration + duration * progress);
}

export function conductorPreparationBeats(beats) {
    if (beats !== 1) return 1;
    // A single beat includes both the rebound and drop. Its opening drop uses
    // the same share of distance and time as the repeating stroke.
    const { length, curveEnds } = conductingMotion[1][0];
    return (length - curveEnds[curveEnds.length - 2]) / length;
}

export class ConductorView {
    constructor(svg) {
        this.svg = svg;
        this.path = svg.querySelector('[data-conductor-path]');
        this.dot = svg.querySelector('[data-conductor-dot]');
        this.halo = svg.querySelector('[data-conductor-halo]');
        this.beats = 1;
        this.setBeats(1);
    }

    setBeats(beats) {
        this.beats = beats;
        const pattern = CONDUCTING_PATTERNS[beats];
        const segments = pattern.flatMap(segment => segment.curves.map(curve =>
            `C ${curve.controls[0].join(' ')} ${curve.controls[1].join(' ')} ${curve.to.join(' ')}`
        ));
        this.path.setAttribute('d', `M ${pattern[0].point.join(' ')} ${segments.join(' ')}`);
        this.prepare(0);
    }

    render(beat, progress) {
        this.position(conductorPoint(this.beats, beat, progress));
    }

    prepare(progress) {
        this.position(conductorPreparationPoint(this.beats, progress));
    }

    position([x, y]) {
        for (const element of [this.dot, this.halo]) {
            element.setAttribute('cx', x);
            element.setAttribute('cy', y);
        }
    }
}
