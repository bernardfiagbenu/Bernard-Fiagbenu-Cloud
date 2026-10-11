import p5 from 'p5';

export const homePageSketch = (p: p5) => {
  let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '-1');

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: p.random(-0.4, 0.4),
        vy: p.random(-0.4, 0.4),
        size: p.random(2, 4),
      });
    }
  };

  p.draw = () => {
    p.clear();
    p.stroke(128, 128, 128, 40);
    p.fill(128, 128, 128, 60);

    for (let i = 0; i < particles.length; i++) {
      let pt = particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;

      if (pt.x < 0 || pt.x > p.width) pt.vx *= -1;
      if (pt.y < 0 || pt.y > p.height) pt.vy *= -1;

      p.ellipse(pt.x, pt.y, pt.size);

      for (let j = i + 1; j < particles.length; j++) {
        let pt2 = particles[j];
        let d = p.dist(pt.x, pt.y, pt2.x, pt2.y);
        if (d < 120) {
          p.stroke(128, 128, 128, (1 - d / 120) * 25);
          p.line(pt.x, pt.y, pt2.x, pt2.y);
        }
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};
