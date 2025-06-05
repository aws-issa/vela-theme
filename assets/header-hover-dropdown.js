/* header-hover-dropdown.js
   Turns Dawn’s <details data-hover="true"> into hover-dropdowns on desktop.
   Touch devices are ignored to keep the original tap behaviour. */

(function () {
  // Abort on devices that don’t support hover (tablets/phones)
  if (!window.matchMedia('(hover: hover)').matches) return;

  document.querySelectorAll('details[data-hover="true"]').forEach((el) => {
    // Open as soon as the pointer enters any part of the <details>
    el.addEventListener('mouseenter', () => el.setAttribute('open', ''));

    // Close again when the pointer leaves the whole element
    el.addEventListener('mouseleave', () => el.removeAttribute('open'));
    const summary = el.querySelector('summary[data-link]');
    if (!summary) return;

    summary.addEventListener('click', (e) => {
      // Make sure we don’t stop keyboard users from toggling <details>
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const url = summary.dataset.link;
      if (url) window.location.href = url;
    });
  });
})();
