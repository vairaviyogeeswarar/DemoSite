let currentLang = 'en';

// Load translations from embedded object
function init() {
    updateUI();
}

// Update all elements with data-key attribute
function updateUI() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[currentLang] && translations[currentLang][key]) {
            const content = translations[currentLang][key];
            
            // Special handling for lists
            if (Array.isArray(content)) {
                if (el.id === 'festivals-list') {
                    renderFestivals(content);
                } else if (el.id === 'contributors-list') {
                    renderContributors(content);
                }
            } else {
                el.innerText = content;
            }
        }
    });

    // Update visibility of lang-specific spans
    document.querySelectorAll('.en').forEach(el => el.classList.toggle('hidden', currentLang !== 'en'));
    document.querySelectorAll('.ta').forEach(el => el.classList.toggle('hidden', currentLang !== 'ta'));
}

// Render dynamic festival cards
function renderFestivals(list) {
    const listEl = document.getElementById('festivals-list');
    listEl.innerHTML = '';
    list.forEach(item => {
        const card = document.createElement('div');
        card.className = 'festival-item glass';
        card.innerHTML = `<h3>${item}</h3>`;
        listEl.appendChild(card);
    });
}

// Render contributors list
function renderContributors(list) {
    const listEl = document.getElementById('contributors-list');
    listEl.innerHTML = '';
    
    list.forEach(item => {
        const row = document.createElement('div');
        row.className = 'contributor-card glass';
        row.innerHTML = `
            <div class="contributor-id">${item.id}</div>
            <div class="contributor-details">
                <div class="contributor-service">${item.service}</div>
                <div class="contributor-names">${item.names}</div>
            </div>
        `;
        listEl.appendChild(row);
    });
}

// Toggle language
document.getElementById('toggleLang').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ta' : 'en';
    updateUI();
});

// Scroll Reveal Animation (Simple)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Initial Load
document.addEventListener('DOMContentLoaded', init);
