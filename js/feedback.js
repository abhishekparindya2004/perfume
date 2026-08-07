(function () {
  const storageKey = 'localFeedbackEntries';
  const defaultEntries = [
    { name: 'Lina C.', message: 'The scent guide was so helpful. I felt confident choosing a fragrance that suits my style and it arrived beautifully packaged.' },
    { name: 'Noah R.', message: 'Loved the fast delivery and customer support. The fragrance lasts all day and the bottle is stunning.' },
    { name: 'Maya S.', message: 'This shop made it easy to discover a new favourite. The quality is premium and the service is friendly.' }
  ];

  function getEntries() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return defaultEntries.slice();
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.concat(defaultEntries) : defaultEntries.slice();
    } catch (error) {
      return defaultEntries.slice();
    }
  }

  function saveEntries(entries) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(entries));
    } catch (error) {
      console.warn('Unable to save feedback:', error);
    }
  }

  function renderFeedbackList() {
    const listContainer = document.querySelector('.local-feedback-list');
    if (!listContainer) return;

    const entries = getEntries();
    if (!entries.length) {
      listContainer.innerHTML = '<div class="local-feedback-empty">No feedback has been added yet. Be the first to share your experience.</div>';
      return;
    }

    const markup = entries.slice(0, 6).map(entry => {
      return `
        <div class="local-feedback-item">
          <p>${escapeHtml(entry.message)}</p>
          <div class="local-feedback-meta"><strong>${escapeHtml(entry.name)}</strong><span>Customer Feedback</span></div>
        </div>
      `;
    }).join('');

    listContainer.innerHTML = markup;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function initFeedbackForm() {
    const form = document.getElementById('local-feedback-form');
    if (!form) return;

    const messageNode = form.querySelector('.local-feedback-form-message');
    const nameInput = form.querySelector('input[name="name"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    function showMessage(text) {
      if (messageNode) {
        messageNode.textContent = text;
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = nameInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !message) {
        showMessage('Please enter both your name and feedback.');
        return;
      }

      const entries = getEntries();
      entries.unshift({ name, message });
      saveEntries(entries);
      renderFeedbackList();
      form.reset();
      showMessage('Thank you! Your feedback has been saved and is now visible below.');
    });
  }

  function init() {
    renderFeedbackList();
    initFeedbackForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
