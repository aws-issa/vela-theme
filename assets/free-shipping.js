(function () {
  function updateBars(cart) {
    document.querySelectorAll('.free-ship-bar').forEach((el) => {
      const threshold = Number(el.dataset.threshold || 0);
      const remaining = Math.max(threshold - (cart.items_subtotal_price || 0), 0);
      el.innerHTML =
        remaining === 0
          ? '<p class="qualify">🎉 You qualify for free shipping!</p>'
          : `<p class="progress">Spend <strong>$${fmt(remaining)}</strong> more to get free shipping!</p>`;
    });
  }

  function fmt(cents) {
    return window.Shopify && Shopify.formatMoney ? Shopify.formatMoney(cents) : (cents / 100).toFixed(2);
  }

  fetch('/cart.js', { cache: 'no-store' })
    .then((r) => r.json())
    .then(updateBars);

  if (window.fetch) {
    const origFetch = window.fetch;
    window.fetch = async (...args) => {
      const res = await origFetch(...args);
      try {
        const url = typeof args[0] === 'string' ? args[0] : args[0].url;
        if (url.includes('/cart')) {
          res.clone().json().then(updateBars);
        }
      } catch (_) {}
      return res;
    };
  }
})();
