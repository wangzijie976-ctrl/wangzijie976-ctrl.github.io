/* ==========================================================================
   王子杰 · 个人主页 — i18n.js
   中英切换按钮：只切换 <html lang>，文案由 style.css 里的 .zh / .en 显隐规则控制。
   无 JS 时按钮不显示，页面默认中文，功能不受影响。
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'wzj-lang';
  var root = document.documentElement;
  var btn = document.getElementById('langBtn');
  var TITLES = {
    zh: '王子杰 | 国防科技大学 博士研究生',
    en: 'Zijie Wang | Ph.D. Student, NUDT'
  };

  function apply(lang) {
    var en = lang === 'en';
    root.setAttribute('lang', en ? 'en' : 'zh-CN');
    document.title = en ? TITLES.en : TITLES.zh;
    if (btn) btn.textContent = en ? '中文' : 'English';
  }

  var saved = 'zh';
  try { saved = localStorage.getItem(KEY) || 'zh'; } catch (e) { /* 隐私模式忽略 */ }
  apply(saved);

  if (btn) {
    root.classList.add('js');          // 有 JS 才显示按钮
    btn.addEventListener('click', function () {
      var next = root.getAttribute('lang') === 'en' ? 'zh' : 'en';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* 忽略 */ }
    });
  }
})();
