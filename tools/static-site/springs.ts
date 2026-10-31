import { spring } from 'motion';

// Each spring is the one Motion picked for the animation it replaces, at the distance it travelled,
// because Motion's rest thresholds (and so the settle time) depend on that distance.
const springs = {
  letter: { keyframes: [100, 0], stiffness: 100, damping: 15 },
  lift: { keyframes: [0, 10], stiffness: 500, damping: 25, restSpeed: 10 },
  press: { keyframes: [1, 1.1], stiffness: 550, damping: 30, restSpeed: 10 },
};

const stepMs = 10;

export function springProperties() {
  return Object.entries(springs)
    .map(([name, { keyframes, ...options }]) => {
      const [from = 0, to = 1] = keyframes;

      const generator = spring({ keyframes, ...options });

      let duration = 0;

      while (!generator.next(duration).done) {
        duration += stepMs;
      }

      const points = Array.from({ length: duration / stepMs + 1 }, (_, step) => {
        const progress = (generator.next(step * stepMs).value - from) / (to - from);

        return Math.round(progress * 10000) / 10000;
      });

      return `  --spring-${name}: linear(${points.join(', ')});\n  --spring-${name}-duration: ${duration}ms;`;
    })
    .join('\n');
}
