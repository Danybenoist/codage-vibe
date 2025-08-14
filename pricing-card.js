(function () {
  function createPricingCard(plan) {
    const {
      title,
      price,
      currency = "",
      period = "",
      features = [],
      ctaLabel = "Démarrer l'essai",
      onClick
    } = plan || {};

    const card = document.createElement('article');
    card.className = 'pricing-card';
    card.setAttribute('data-plan', title || '');

    const heading = document.createElement('h2');
    heading.className = 'pricing-title';
    heading.textContent = title || '';

    const priceEl = document.createElement('p');
    priceEl.className = 'pricing-price';
    const priceText = [price, currency].filter(Boolean).join(' ') + (period ? `/${period}` : '');
    priceEl.textContent = priceText.trim();

    const ul = document.createElement('ul');
    ul.className = 'pricing-features';
    for (const feat of features) {
      const li = document.createElement('li');
      li.textContent = feat;
      ul.appendChild(li);
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn';
    button.textContent = ctaLabel;
    const ariaPrice = price ? `${price}${currency ? ' ' + currency : ''}` : '';
    const ariaPeriod = period ? `/${period}` : '';
    button.setAttribute('aria-label', `Choisir le plan ${title || ''} ${ariaPrice}${ariaPeriod}`.trim());

    button.addEventListener('click', () => {
      if (typeof onClick === 'function') {
        onClick(plan);
      } else {
        // Fallback action for demo
        console.log('Plan choisi:', plan);
      }
    });

    card.appendChild(heading);
    card.appendChild(priceEl);
    card.appendChild(ul);
    card.appendChild(button);

    return card;
  }

  function renderPricingCards(selector, plans) {
    const container = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!container) {
      console.warn('renderPricingCards: conteneur introuvable pour', selector);
      return;
    }
    container.classList.add('pricing-grid');
    container.innerHTML = '';

    for (const plan of plans || []) {
      container.appendChild(createPricingCard(plan));
    }
  }

  window.createPricingCard = createPricingCard;
  window.renderPricingCards = renderPricingCards;
})();