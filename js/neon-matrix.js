"use strict";

/**
 * Matrix / 数字雨效果，与粒子背景叠加营造科幻感
 * 仅在桌面端启用以避免移动端性能问题
 */
(function () {
  if (typeof window === "undefined") return;
  if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) return;
  if (document.getElementById("neon-matrix")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "neon-matrix";
  canvas.style.cssText = `
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: -3;
    pointer-events: none;
    opacity: 0.6;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const katakana = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const symbols = katakana.split("");
  let fontSize = 16;
  let columns;
  let drops;

  const setup = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    fontSize = Math.max(14, Math.round(window.innerWidth / 120));
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * canvas.height);
  };

  setup();
  window.addEventListener("resize", setup);

  const draw = () => {
    ctx.fillStyle = "rgba(5, 7, 15, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
    ctx.textBaseline = "top";

    drops.forEach((y, index) => {
      const text = symbols[Math.floor(Math.random() * symbols.length)];
      const x = index * fontSize;
      ctx.fillStyle = `rgba(0, 224, 255, ${0.4 + Math.random() * 0.6})`;
      ctx.shadowBlur = 18;
      ctx.shadowColor = "#00e0ff";
      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[index] = 0;
      } else {
        drops[index] = y + fontSize;
      }
    });
    requestAnimationFrame(draw);
  };

  draw();
})();

