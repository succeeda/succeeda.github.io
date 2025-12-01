/**
 * 页面切换动画和加载动画
 */
(function() {
  'use strict';

  // 创建加载进度条
  const loadingBar = document.createElement('div');
  loadingBar.id = 'loading';
  document.body.appendChild(loadingBar);

  // 页面加载完成时隐藏加载条
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingBar.style.opacity = '0';
      setTimeout(() => loadingBar.remove(), 300);
    }, 300);
  });

  // 页面切换时的过渡效果
  if (typeof pjax !== 'undefined' && pjax.enable) {
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'page-transition';
    document.body.appendChild(transitionOverlay);

    // Pjax 开始加载时显示过渡
    document.addEventListener('pjax:send', () => {
      transitionOverlay.classList.add('active');
    });

    // Pjax 加载完成时隐藏过渡
    document.addEventListener('pjax:complete', () => {
      setTimeout(() => {
        transitionOverlay.classList.remove('active');
      }, 300);
    });
  }

  // 滚动触发淡入动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // 为需要淡入的元素添加类
  document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.recent-post-item, .card-widget, .article-sort-item');
    elements.forEach((el, index) => {
      el.classList.add('fade-in-on-scroll');
      setTimeout(() => observer.observe(el), index * 50);
    });
  });

  // 使用 Lenis 实现丝滑滚动（如果已加载）
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
})();

