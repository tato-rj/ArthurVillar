// Each point is a beat. Curves describe the rebound toward the next beat;
// `at` is the fraction of that beat's duration at the end of each curve.
const BASE_CONDUCTING_PATTERNS = {
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
                { to: [61, 467], controls: [[176, 307], [95, 467]], at: 1 },
            ],
        },
        {
            point: [61, 467], label: [37, 483],
            curves: [
                { to: [77, 303], controls: [[14, 467], [27, 315]], at: 7 / 15 },
                { to: [285, 455], controls: [[122, 280], [252, 455]], at: 1 },
            ],
        },
        {
            point: [285, 455], label: [309, 471],
            curves: [
                { to: [362, 278], controls: [[330, 455], [350, 340]], at: 0.2 },
                { to: [200, 36], controls: [[315, 446], [224, 446]], at: 1 },
            ],
        },
        {
            point: [200, 36], label: [174, 42],
            curves: [{ to: [200, 540], controls: [[200, 204], [200, 372]], at: 1 }],
        },
    ],
};

const interpolatePoint = (a, b, t) => a.map((value, axis) => value + (b[axis] - value) * t);
const pointDistance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const unitVector = vector => {
    const length = Math.hypot(...vector);
    return length ? vector.map(value => value / length) : [0, 0];
};

function splitCurve(start, curve, t) {
    const a = interpolatePoint(start, curve.controls[0], t);
    const b = interpolatePoint(curve.controls[0], curve.controls[1], t);
    const c = interpolatePoint(curve.controls[1], curve.to, t);
    const d = interpolatePoint(a, b, t);
    const e = interpolatePoint(b, c, t);
    const point = interpolatePoint(d, e, t);
    return [
        { controls: [a, d], to: point },
        { controls: [e, c], to: curve.to },
    ];
}

function roundPattern(pattern) {
    const joins = [];
    const rounded = pattern.map(segment => {
        let start = segment.point;
        let from = 0;
        const curves = segment.curves.flatMap(curve => {
            const duration = curve.at - from;
            const [first, rest] = splitCurve(start, curve, 0.2);
            const [middle, last] = splitCurve(first.to, rest, 0.75);
            first.at = from + duration * 0.2;
            middle.at = from + duration * 0.8;
            last.at = curve.at;
            joins.push({ start, curve, first, last, duration });
            start = curve.to;
            from = curve.at;
            return [first, middle, last];
        });
        return { ...segment, curves };
    });

    joins.forEach((incoming, index) => {
        const outgoing = joins[(index + 1) % joins.length];
        const point = incoming.curve.to;
        const arrival = point.map((value, axis) => value - incoming.curve.controls[1][axis]);
        const departure = outgoing.curve.controls[0].map((value, axis) => value - point[axis]);
        const entry = unitVector(arrival);
        const exit = unitVector(departure);
        let direction = unitVector(entry.map((value, axis) => value + exit[axis]));

        // Horizontal tangents round the top and bottom of each gesture.
        // Vertical tangents round its outer sides.
        const before = incoming.start;
        const after = outgoing.curve.to;
        if ((point[1] - before[1]) * (after[1] - point[1]) < 0) {
            direction = [Math.sign(direction[0] || after[0] - before[0]) || 1, 0];
        } else if ((point[0] - before[0]) * (after[0] - point[0]) < 0) {
            direction = [0, Math.sign(direction[1] || after[1] - before[1]) || -1];
        }

        const radius = Math.min(30,
            pointDistance(point, incoming.start) * 0.25,
            pointDistance(point, outgoing.curve.to) * 0.25);
        const speed = Math.min(
            3 * radius / (Math.max(incoming.duration, outgoing.duration) * 0.2),
            3 * Math.hypot(...arrival) / incoming.duration,
            3 * Math.hypot(...departure) / outgoing.duration,
        );
        // Match velocity, including the duration of each side, at every join.
        // The middle of each curve retains the original reference shape.
        incoming.last.controls[1] = point.map((value, axis) =>
            value - direction[axis] * speed * incoming.duration * 0.2 / 3);
        outgoing.first.controls[0] = point.map((value, axis) =>
            value + direction[axis] * speed * outgoing.duration * 0.2 / 3);
    });
    return rounded;
}

export const CONDUCTING_PATTERNS = Object.fromEntries(
    Object.entries(BASE_CONDUCTING_PATTERNS).map(([beats, pattern]) => [beats, roundPattern(pattern)])
);

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
    const duration = conductorPreparationBeats(beats);
    return conductorPoint(beats, beats - 1, 1 - duration + duration * progress);
}

export function conductorPreparationBeats(beats) {
    // One beat includes both the rise and fall, so its drop is half a beat.
    return beats === 1 ? 0.5 : 1;
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
            `<g data-conductor-beat="${index}">`
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
