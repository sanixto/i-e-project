// Light/dark theme toggle.
// Loaded in <head> so the saved theme is applied before the page paints.
(function () {
  var STORAGE_KEY = 'theme';
  var root = document.documentElement;
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getSaved() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function save(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function currentTheme() {
    return root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
  }

  var saved = getSaved();
  if (saved === 'light' || saved === 'dark') {
    root.dataset.theme = saved;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('theme-toggle');

    function updateButton() {
      var isDark = currentTheme() === 'dark';
      button.textContent = isDark ? '☀' : '☾';
      button.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    }

    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      save(next);
      updateButton();
    });

    systemDark.addEventListener('change', updateButton);
    updateButton();
  });
})();
