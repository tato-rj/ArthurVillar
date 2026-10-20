// Traced from the four supplied conducting-pattern screenshots.
// The three-beat right loop has a subtle swing; the final downstroke accelerates.
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
                // Match the three-beat turn's rounded, horizontal crest.
                { to: [247, 343], controls: [[312.81, 572.13], [301, 343]] },
                { to: [178.55, 416.85], controls: [[212.81, 343], [239.55, 434.83]] },
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
                // A shared horizontal tangent rounds the right-hand reversal.
                { to: [354, 299], controls: [[349.3, 450.7], [402, 299]] },
            ],
        },
        {
            point: [354, 299],
            curves: [
                { to: [306.18, 406.25], controls: [[313.64, 299], [337.04, 406.25]] },
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

function addSwingTiming(motion) {
    const [start, crest, end] = motion.curveEnds.slice(1, 4);
    const delay = Math.min(crest - start, end - crest) * 0.08;
    return {
        ...motion,
        samples: motion.samples.map(sample => {
            if (sample.distance <= start || sample.distance >= end) return sample;
            const progress = sample.distance <= crest
                ? (sample.distance - start) / (crest - start)
                : (end - sample.distance) / (end - crest);
            // Delay the climb, then recover that time on the descent. A quintic
            // ramp joins the surrounding motion with continuous speed and
            // acceleration, keeping the loop's total duration unchanged.
            const ease = progress ** 3 * (progress * (progress * 6 - 15) + 10);
            return { ...sample, distance: sample.distance + delay * ease };
        }),
    };
}

const conductingMotion = Object.fromEntries(Object.entries(CONDUCTING_PATTERNS)
    .map(([beats, pattern]) => {
        const motion = {
            beats: Number(beats),
            ...measureStroke({
                point: pattern[0].point,
                curves: pattern.flatMap(segment => segment.curves),
            }),
        };
        return [beats, motion.beats === 3 ? addSwingTiming(motion) : motion];
    }));

function pointAtDistance({ samples, length }, distance) {
    if (distance <= 0 || length === 0) return samples[0].point;
    if (distance >= length) return samples[samples.length - 1].point;
    let low = 1;
    let high = samples.length - 1;
    while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (samples[middle].distance < distance) low = middle + 1;
        else high = middle;
    }
    const before = samples[low - 1];
    const after = samples[low];
    if (distance === after.distance) return after.point;
    const fraction = (distance - before.distance) / (after.distance - before.distance);
    return before.point.map((value, axis) => value + (after.point[axis] - value) * fraction);
}

function downstrokePoint(motion, progress) {
    const from = motion.curveEnds[motion.curveEnds.length - 2];
    const t = Math.min(1, Math.max(0, progress));
    // A falling body's distance grows with time squared. Apply this only to
    // the descent from the top, keeping its arrival on the downbeat unchanged.
    return pointAtDistance(motion, from + (motion.length - from) * t ** 2);
}

export function conductorPoint(beats, beat, progress) {
    const motion = conductingMotion[beats] || conductingMotion[1];
    const index = ((beat % motion.beats) + motion.beats) % motion.beats;
    const t = Math.min(1, Math.max(0, progress));
    // The cached map adds only the three-beat swing to the uniform distance
    // ramp. The final descent accelerates over its existing time window.
    const distance = (index + t) / motion.beats * motion.length;
    const dropStart = motion.curveEnds[motion.curveEnds.length - 2];
    if (distance > dropStart) {
        return downstrokePoint(motion, (distance - dropStart) / (motion.length - dropStart));
    }
    return pointAtDistance(motion, distance);
}

export function conductorPreparationPoint(beats, progress) {
    const motion = conductingMotion[beats] || conductingMotion[1];
    return downstrokePoint(motion, progress);
}

export function conductorPreparationBeats(beats) {
    const motion = conductingMotion[beats] || conductingMotion[1];
    const from = motion.curveEnds[motion.curveEnds.length - 2];
    // Give the opening fall the same duration as the repeating downstroke,
    // reaching the bottom exactly on the first click.
    return motion.beats * (motion.length - from) / motion.length;
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
