/* ==========================================================================
   王子杰 · 个人主页  —  script.js
   无第三方依赖：主题切换、移动端菜单、滚动显现、导航高亮、打字机效果。
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------ 1. 主题（浅色 / 深色） ------------------------ */
  var THEME_KEY = 'wzj-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('themeBtn');
    if (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? '切换到浅色模式' : '切换到深色模式');
    }
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { /* 隐私模式下忽略 */ }

    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (systemDark ? 'dark' : 'light'));

    var btn = document.getElementById('themeBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* 忽略 */ }
    });
  }

  /* ------------------------ 2. 移动端导航菜单 ------------------------ */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    var nav = document.getElementById('nav');
    if (!toggle || !links) return;

    function close() {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }

    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });

    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) close();
    });

    // 滚动时给导航加分隔阴影
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  /* ------------------------ 3. 滚动显现动画 ------------------------ */
  function initReveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    if (!items.length) return;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // 同组元素错开出现，形成节奏感
        var delay = Math.min(i * 70, 280);
        setTimeout(function () { el.classList.add('is-visible'); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------ 4. 导航当前区块高亮 ------------------------ */
  function initScrollSpy() {
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    var linkMap = {};
    Array.prototype.forEach.call(document.querySelectorAll('#navLinks a'), function (a) {
      var id = (a.getAttribute('href') || '').replace('#', '');
      if (id) linkMap[id] = a;
    });
    if (!sections.length || !Object.keys(linkMap).length) return;

    if (!('IntersectionObserver' in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(linkMap).forEach(function (id) {
          linkMap[id].classList.toggle('is-active', id === entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
  }

  /* ------------------------ 5. 首屏打字机效果 ------------------------ */
  function initTyped() {
    var el = document.getElementById('typed');
    if (!el) return;

    var words = ['AI Infra 研究者', '并行与分布式计算', '大模型训练与推理系统', '国防科技大学 PDL 实验室'];

    if (prefersReduced) { el.textContent = words[0]; return; }

    var wi = 0, ci = 0, deleting = false;

    function tick() {
      var word = words[wi];
      ci += deleting ? -1 : 1;
      el.textContent = word.slice(0, ci);

      var delay = deleting ? 45 : 105;

      if (!deleting && ci === word.length) {
        deleting = true;
        delay = 1600;                    // 完整停留
      } else if (deleting && ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
        delay = 320;
      }
      setTimeout(tick, delay);
    }

    setTimeout(tick, 500);
  }

  /* ------------------------ 6. 页脚年份 ------------------------ */
  function initYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* ------------------------ 启动 ------------------------ */
  function boot() {
    initTheme();
    initNav();
    initReveal();
    initScrollSpy();
    initTyped();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
