/*
 * Framelet website configuration — the ONE place for download, release, appcast and contact links.
 *
 * Every page also carries the same values as its default href, so the site still works with
 * JavaScript off; keep them in step when these change (see site/README.md).
 *
 * In the HTML:
 *   <a data-link="DMG_URL" href="…">         href is replaced with the value of DMG_URL
 *   <span data-text="APPCAST_URL">…</span>   text is replaced with the value
 *   <a data-mailto="KEY">…</a>               href becomes mailto:…, text becomes the address
 */
window.FRAMELET_CONFIG = {
  // Repository home.
  REPO_URL: "https://github.com/robeshell/framelet-releases",
  // Release list; the download buttons fall back to this when JavaScript is off.
  RELEASES_URL: "https://github.com/robeshell/framelet-releases/releases/latest",
  // Direct DMG download. Works only if every release attaches an asset with exactly this file name.
  DMG_URL: "https://github.com/robeshell/framelet-releases/releases/latest/download/Framelet.dmg",
  // Sparkle update feed. Must match SUFeedURL in the app's Info.plist; shown on the privacy page.
  // Served by GitHub Pages from the same public repository as the site.
  APPCAST_URL: "https://robeshell.github.io/framelet-releases/appcast.xml",
  // Privacy questions and support.
  SUPPORT_URL: "https://github.com/robeshell/framelet-releases/issues",
  // false until the first notarized DMG is published: download buttons read 即将发布 / Coming soon
  // and the release list is hidden. Set to true with the first release.
  RELEASED: false,
};

(function () {
  "use strict";
  var config = window.FRAMELET_CONFIG;
  function apply() {
    document.querySelectorAll("[data-link]").forEach(function (el) {
      var value = config[el.getAttribute("data-link")];
      if (value) el.setAttribute("href", value);
    });
    document.querySelectorAll("[data-text]").forEach(function (el) {
      var value = config[el.getAttribute("data-text")];
      if (value) el.textContent = value;
    });
    document.querySelectorAll("[data-mailto]").forEach(function (el) {
      var value = config[el.getAttribute("data-mailto")];
      if (!value) return;
      el.setAttribute("href", "mailto:" + value);
      el.textContent = value;
    });
    if (!config.RELEASED) {
      var english = (document.documentElement.lang || "").indexOf("en") === 0;
      document.querySelectorAll('[data-link="DMG_URL"]').forEach(function (el) {
        el.removeAttribute("href");
        el.setAttribute("aria-disabled", "true");
        el.textContent = english ? "Coming soon" : "即将发布";
      });
      document.querySelectorAll('[data-link="RELEASES_URL"]').forEach(function (el) {
        el.hidden = true;
      });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", apply);
  else apply();
})();
