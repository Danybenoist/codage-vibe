/**
 * Pricing Card Component - Vanilla JavaScript
 */

/**
 * Creates a single pricing card element
 * @param {Object} plan - The pricing plan object
 * @param {string} plan.title - The plan title
 * @param {string} plan.price - The plan price
 * @param {Array<string>} plan.features - Array of feature strings
 * @param {string} plan.buttonText - Text for the call-to-action button
 * @param {Function} [plan.onButtonClick] - Optional click handler for the button
 * @returns {HTMLElement} The pricing card element
 */
function createPricingCard(plan) {
  // Validate input
  if (!plan || typeof plan !== 'object') {
    throw new Error('Plan object is required');
  }
  
  const { title, price, features = [], buttonText = 'Démarrer l\'essai', onButtonClick } = plan;
  
  if (!title || !price) {
    throw new Error('Plan must have title and price');
  }

  // Create the main card container
  const cardElement = document.createElement('div');
  cardElement.className = 'pricing';

  // Create title
  const titleElement = document.createElement('h2');
  titleElement.className = 'title';
  titleElement.textContent = title;

  // Create price
  const priceElement = document.createElement('p');
  priceElement.className = 'price';
  priceElement.textContent = price;

  // Create features list
  const featuresElement = document.createElement('ul');
  featuresElement.className = 'features';
  
  features.forEach(feature => {
    const listItem = document.createElement('li');
    listItem.textContent = feature;
    featuresElement.appendChild(listItem);
  });

  // Create button
  const buttonElement = document.createElement('button');
  buttonElement.className = 'btn';
  buttonElement.textContent = buttonText;
  
  // Add click handler if provided
  if (onButtonClick && typeof onButtonClick === 'function') {
    buttonElement.addEventListener('click', (event) => {
      onButtonClick(plan, event);
    });
  }

  // Assemble the card
  cardElement.appendChild(titleElement);
  cardElement.appendChild(priceElement);
  cardElement.appendChild(featuresElement);
  cardElement.appendChild(buttonElement);

  return cardElement;
}

/**
 * Renders multiple pricing cards in a container
 * @param {string} selector - CSS selector for the container element
 * @param {Array<Object>} plans - Array of pricing plan objects
 * @returns {HTMLElement} The container element with rendered cards
 */
function renderPricingCards(selector, plans) {
  // Find the container element
  const container = document.querySelector(selector);
  
  if (!container) {
    throw new Error(`Container element not found: ${selector}`);
  }
  
  if (!Array.isArray(plans)) {
    throw new Error('Plans must be an array');
  }

  // Clear existing content
  container.innerHTML = '';
  
  // Add pricing-container class for grid layout
  if (!container.classList.contains('pricing-container')) {
    container.classList.add('pricing-container');
  }

  // Create and append pricing cards
  plans.forEach((plan, index) => {
    try {
      const cardElement = createPricingCard(plan);
      container.appendChild(cardElement);
    } catch (error) {
      console.error(`Error creating pricing card at index ${index}:`, error);
    }
  });

  return container;
}

/**
 * Default click handler for pricing buttons
 * @param {Object} plan - The plan that was clicked
 * @param {Event} event - The click event
 */
function defaultButtonHandler(plan, event) {
  alert(`Vous avez sélectionné: ${plan.title} - ${plan.price}`);
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment
  module.exports = {
    createPricingCard,
    renderPricingCards,
    defaultButtonHandler
  };
} else {
  // Browser environment - attach to window
  window.PricingCard = {
    createPricingCard,
    renderPricingCards,
    defaultButtonHandler
  };
}