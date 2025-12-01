"use strict";

/**
 * 简易粒子背景：在页面底部插入 canvas 并绘制漂浮粒子
 * 让主题拥有持续的科幻感，性能开销低
 */
(function () {
  if (typeof window === "undefined" || document.getElementById("neon-particles")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "neon-particles";
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    pointer-events: none;
  `;

  const context = canvas.getContext("2d");
  const particles = [];
  const particleCount = 80;
  const colors = ["#6c63ff", "#00e0ff", "#ff7242"];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resize();
  window.addEventListener("resize", resize);

  document.body.appendChild(canvas);

  function createParticle() {
    const size = Math.random() * 2 + 0.5;
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2
    };
  }

  while (particles.length < particleCount) {
    particles.push(createParticle());
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.pulse += 0.01;

      // 边缘回弹
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      const alpha = 0.5 + Math.sin(particle.pulse) * 0.25;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
      context.shadowBlur = 12;
      context.shadowColor = particle.color;
      context.fill();
    });
    requestAnimationFrame(draw);
  }

  draw();
})();

