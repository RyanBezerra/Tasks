function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

localStorage.removeItem('favorites');
localStorage.removeItem('recentlyViewed');

let favorites = [];
let recentlyViewed = [];
let allCards = [];

function createCard(cardId = null, isFavorite = false) {
    const id = cardId || getRandomString(8);
    const favoriteClass = favorites.includes(id) ? 'text-warning' : 'text-gray-dark';
    
    return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100 shadow-sm bg-primary" onclick="handleCardClick(event, '${id}')">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <div class="d-flex align-items-center text-truncate">
                            <i class="fas fa-building text-white mr-2"></i>
                            <span class="text-white text-truncate">Corregedoria ${getRandomString(6)}</span>
                        </div>
                        <button class="btn btn-link p-0">
                            <i class="fas fa-star ${favoriteClass}" onclick="toggleFavorite(event, '${id}')"></i>
                        </button>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center py-1">
                            <small class="text-white">Abertos</small>
                            <span class="badge badge-light">${getRandomNumber(10, 100)}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center py-1">
                            <small class="text-white">Arquivados</small>
                            <span class="badge badge-success">${getRandomNumber(5, 50)}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center py-1">
                            <small class="text-white">Em Atraso</small>
                            <span class="badge badge-danger">${getRandomNumber(1, 20)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function handleCreateCard() {
    const allCardsContainer = document.getElementById('all-cards-container');
    if (allCardsContainer) {
        const newCardId = getRandomString(8);
        allCards.push(newCardId);
        localStorage.setItem('allCards', JSON.stringify(allCards));
        generateCards();
    }
}

function generateCards() {
    const container = document.querySelector('.row');
    container.innerHTML = '';

    const structure = `
        <div class="col-12 mb-4 ">
            <div class="d-flex justify-content-between align-items-start flex-wrap">
                <div class="mb-3 mb-md-0">
                    <h1 class="m-0 text-dark">Gerenciador de Quadros</h1>
                    <p class="text-muted">Visão Geral das Corregedorias - João Pessoa 2025</p>
                </div>
            </div>
        </div>

        <!-- Seção de Favoritos -->
        <div class="col-12 mb-4">
            <h5 class="text-dark mb-3">
                <i class="fas fa-star text-warning mr-2"></i>Quadros Favoritos
            </h5>
            <div class="row mx-n2" id="favorites-container">
                ${favorites.length > 0 
                    ? favorites.map(cardId => createCard(cardId, true)).join('')
                    : '<div class="col-12"><p class="text-muted">Nenhum quadro favorito ainda.</p></div>'
                }
            </div>
        </div>

        <!-- Seção de Recentes -->
        <div class="col-12 mb-4">
            <h5 class="text-dark mb-3">
                <i class="fas fa-clock text-info mr-2"></i>Visualizados Recentemente
            </h5>
            <div class="row mx-n2" id="recent-container">
                ${recentlyViewed.length > 0 
                    ? recentlyViewed.map(cardId => createCard(cardId)).join('')
                    : '<div class="col-12"><p class="text-muted">Nenhum quadro visualizado recentemente.</p></div>'
                }
            </div>
        </div>

        <!-- Seção de Todos os Quadros -->
        <div class="col-12">
            <h5 class="text-dark mb-3">
                <i class="fas fa-th-large text-secondary mr-2"></i>Todos os Quadros
            </h5>
            <div class="row mx-n2" id="all-cards-container">
                ${allCards.length > 0 
                    ? allCards.map(cardId => createCard(cardId)).join('')
                    : '<div class="col-12"><p class="text-muted">Nenhum quadro adicionado ainda.</p></div>'
                }
            </div>
        </div>
    `;
    
    container.innerHTML = structure;
}


function handleCardClick(event, cardId) {
    if (event.target.closest('.btn-link')) {
        return;
    }
    
    if (!recentlyViewed.includes(cardId)) {
        recentlyViewed = [cardId, ...recentlyViewed.filter(id => id !== cardId)];
        if (recentlyViewed.length > 5) {
            recentlyViewed.pop();
        }
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
        generateCards();
    }
}

function toggleFavorite(event, cardId) {
    event.stopPropagation();
    
    const index = favorites.indexOf(cardId);
    if (index === -1) {
        favorites.push(cardId);
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    generateCards();
}

document.addEventListener('DOMContentLoaded', function() {
    favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    allCards = JSON.parse(localStorage.getItem('allCards') || '[]');
    
    generateCards();

    const createButton = document.querySelector('.btn-primary');
    if (createButton) {
        createButton.addEventListener('click', handleCreateCard);
    }
});
