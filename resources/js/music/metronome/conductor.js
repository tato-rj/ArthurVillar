// Each point is a beat. Curves describe the rebound toward the next beat;
// `at` is the fraction of that beat's duration at the end of each curve.
export const CONDUCTING_PATTERNS = {
    1: [
        {
            point: [200, 540],
            curves: [
                { to: [235, 220], controls: [[157, 510], [250, 350]], at: 0.28 },
                { to: [200, 36], controls: [[232, 155], [209, 72]], at: 0.5 },
                { to: [200, 540], controls: [[213, 195], [215, 402]], at: 1 },
            ],
        },
    ],
    2: [
        {
            point: [200, 540],
            curves: [
                { to: [262, 328], controls: [[306, 580], [280, 411]], at: 0.35 },
                { to: [178, 418], controls: [[268, 411], [213, 438]], at: 0.55 },
                { to: [200, 36], controls: [[248, 365], [215, 115]], at: 1 },
            ],
        },
        {
            point: [200, 36], label: [174, 42],
            curves: [{ to: [200, 540], controls: [[200, 204], [200, 372]], at: 1 }],
        },
    ],
    3: [
        {
            point: [200, 540],
            curves: [
                { to: [200, 328], controls: [[157, 451], [177, 314]], at: 0.35 },
                { to: [372, 284], controls: [[251, 313], [307, 610]], at: 1 },
            ],
        },
        {
            point: [372, 284], label: [392, 290],
            curves: [{ to: [200, 36], controls: [[304, 534], [217, 446]], at: 1 }],
        },
        {
            point: [200, 36], label: [174, 42],
            curves: [{ to: [200, 540], controls: [[200, 204], [200, 372]], at: 1 }],
        },
    ],
    4: [
        {
            point: [200, 540],
            curves: [
                { to: [200, 307], controls: [[222, 400], [223, 307]], at: 0.45 },
                { to: [61, 467], controls: [[176, 307], [95, 488]], at: 1 },
            ],
        },
        {
            point: [61, 467], label: [37, 483],
            curves: [
                { to: [77, 303], controls: [[14, 500], [27, 315]], at: 0.35 },
                { to: [285, 455], controls: [[122, 280], [252, 460]], at: 0.75 },
                { to: [362, 278], controls: [[330, 450], [350, 340]], at: 1 },
            ],
        },
        {
            point: [362, 278], label: [386, 284],
            curves: [{ to: [200, 36], controls: [[315, 446], [224, 446]], at: 1 }],
        },
        {
            point: [200, 36], label: [174, 42],
            curves: [{ to: [200, 540], controls: [[200, 204], [200, 372]], at: 1 }],
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

export function conductorPoint(beats, beat, progress) {
    const pattern = CONDUCTING_PATTERNS[beats] || CONDUCTING_PATTERNS[1];
    const index = ((beat % pattern.length) + pattern.length) % pattern.length;
    const segment = pattern[index];
    const t = Math.min(1, Math.max(0, progress));
    let start = segment.point;
    let from = 0;
    for (const curve of segment.curves) {
        if (t <= curve.at) return curvePoint(start, curve, (t - from) / (curve.at - from));
        start = curve.to;
        from = curve.at;
    }
    return start;
}

export function conductorPreparationPoint(beats, progress) {
    if (beats !== 1) return conductorPoint(beats, beats - 1, progress);
    // A one-beat pattern still prepares at the top of its rebound.
    const curves = CONDUCTING_PATTERNS[1][0].curves;
    return curvePoint(curves[curves.length - 2].to, curves[curves.length - 1], progress);
}

export class ConductorView {
    constructor(svg) {
        this.svg = svg;
        this.path = svg.querySelector('[data-conductor-path]');
        this.dot = svg.querySelector('[data-conductor-dot]');
        this.halo = svg.querySelector('[data-conductor-halo]');
        this.markers = svg.querySelector('[data-conductor-markers]');
        this.beats = 1;
        this.activeBeat = null;
        this.setBeats(1);
    }

    setBeats(beats) {
        this.beats = beats;
        const pattern = CONDUCTING_PATTERNS[beats];
        const segments = pattern.flatMap(segment => segment.curves.map(curve =>
            `C ${curve.controls[0].join(' ')} ${curve.controls[1].join(' ')} ${curve.to.join(' ')}`
        ));
        this.path.setAttribute('d', `M ${pattern[0].point.join(' ')} ${segments.join(' ')}`);
        this.markers.innerHTML = pattern.map(({ point, label = [point[0], point[1] + 34] }, index) =>
            `<g data-conductor-beat="${index}"><circle cx="${point[0]}" cy="${point[1]}" r="4"/>`
            + `<text x="${label[0]}" y="${label[1]}" text-anchor="middle">${index + 1}</text></g>`
        ).join('');
        this.labels = this.markers.querySelectorAll('[data-conductor-beat]');
        this.activeBeat = null;
        this.prepare(0);
    }

    render(beat, progress) {
        this.position(conductorPoint(this.beats, beat, progress), beat);
    }

    prepare(progress) {
        this.position(conductorPreparationPoint(this.beats, progress), this.beats - 1);
    }

    position([x, y], beat) {
        for (const element of [this.dot, this.halo]) {
            element.setAttribute('cx', x);
            element.setAttribute('cy', y);
        }
        if (beat !== this.activeBeat) {
            this.labels.forEach((label, index) => label.classList.toggle('is-active', index === beat));
            this.activeBeat = beat;
        }
    }
}
