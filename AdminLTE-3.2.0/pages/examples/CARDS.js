// Função para gerar número aleatório dentro de um intervalo
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para gerar string aleatória
function getRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Adiciona estado para favoritos e histórico
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

// Função para criar um card
function createCard(cardId = null, isFavorite = false) {
    const id = cardId || getRandomString(8);
    const favoriteClass = favorites.includes(id) ? 'text-warning' : 'text-secondary';
    
    return `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100 shadow-sm" onclick="handleCardClick(event, '${id}')">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <div class="d-flex align-items-center text-truncate">
                            <i class="fas fa-building text-secondary mr-2"></i>
                            <span class="text-secondary text-truncate">Corregedoria ${getRandomString(6)}</span>
                        </div>
                        <button class="btn btn-link p-0" style="z-index: 2">
                            <i class="fas fa-star ${favoriteClass}" onclick="toggleFavorite(event, '${id}')"></i>
                        </button>
                    </div>
                    <div class="d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-center py-1">
                            <small class="text-muted">Abertos</small>
                            <span class="badge badge-light">${getRandomNumber(10, 100)}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center py-1">
                            <small class="text-muted">Arquivados</small>
                            <span class="badge badge-success">${getRandomNumber(5, 50)}</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center py-1">
                            <small class="text-muted">Em Atraso</small>
                            <span class="badge badge-danger">${getRandomNumber(1, 20)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Função principal para gerar os cards
function generateCards(quantity) {
    const container = document.querySelector('.row');
    container.innerHTML = '';

    // Cria o cabeçalho
    const header = `
        <div class="col-12 mb-4">
            <div class="d-flex justify-content-between align-items-start flex-wrap">
                <div class="mb-3 mb-md-0">
                    <h1 class="m-0 text-dark">Dashboard de Processos</h1>
                    <p class="text-muted">Visão Geral das Corregedorias - João Pessoa 2025</p>
                </div>
                <div class="d-grid w-100 d-md-block">
                    <button type="button" class="btn btn-primary">
                        <i class="fas fa-download mr-2"></i>Exportar Relatório
                    </button>
                </div>
            </div>
        </div>

        <!-- Seção de Favoritos -->
        <div class="col-12 mb-4">
            <h5 class="text-dark mb-3">
                <i class="fas fa-star text-warning mr-2"></i>Quadros Favoritos
            </h5>
            <div class="row mx-n2" id="favorites-container">
                <!-- Cards favoritos serão inseridos aqui -->
            </div>
        </div>

        <!-- Seção de Visualizados Recentemente -->
        <div class="col-12 mb-4">
            <h5 class="text-dark mb-3">
                <i class="fas fa-clock text-info mr-2"></i>Visualizados Recentemente
            </h5>
            <div class="row mx-n2" id="recent-container">
                <!-- Cards recentes serão inseridos aqui -->
            </div>
        </div>

        <!-- Seção de Todos os Quadros -->
        <div class="col-12">
            <h5 class="text-dark mb-3">
                <i class="fas fa-th-large text-secondary mr-2"></i>Todos os Quadros
            </h5>
            <div class="row mx-n2" id="all-cards-container">
                <!-- Todos os cards serão inseridos aqui -->
            </div>
        </div>
    `;
    container.innerHTML = header;

    // Gera os cards em suas respectivas seções
    const favoritesContainer = document.getElementById('favorites-container');
    const recentContainer = document.getElementById('recent-container');
    const allCardsContainer = document.getElementById('all-cards-container');

    // Gera cards favoritos
    favorites.forEach(cardId => {
        favoritesContainer.innerHTML += createCard(cardId);
    });

    // Gera cards recentes
    recentlyViewed.forEach(cardId => {
        if (!favorites.includes(cardId)) {
            recentContainer.innerHTML += createCard(cardId);
        }
    });

    // Gera todos os cards
    for (let i = 0; i < quantity; i++) {
        allCardsContainer.innerHTML += createCard();
    }
}

// Função para atualizar os cards quando solicitado
function updateCards() {
    const quantity = document.getElementById('cardQuantity').value;
    generateCards(parseInt(quantity));
}

// Adiciona o input e botão para controlar a quantidade de cards
document.addEventListener('DOMContentLoaded', function() {
    const controlDiv = document.createElement('div');
    controlDiv.className = 'col-12 mb-3';
    controlDiv.innerHTML = `
        <div class="input-group" style="max-width: 300px;">
            <input type="number" class="form-control" id="cardQuantity" value="6" min="1" max="20">
            <div class="input-group-append">
                <button class="btn btn-primary" onclick="updateCards()">Gerar Cards</button>
            </div>
        </div>
    `;
    
    const container = document.querySelector('.row');
    container.insertBefore(controlDiv, container.firstChild);
    
    generateCards(20);
});

// Função para lidar com o clique no card
function handleCardClick(event, cardId) {
    // Ignora o clique se for no botão de favorito
    if (event.target.closest('.favorite-btn')) {
        return;
    }
    
    addToRecent(cardId);
    generateCards(20); // Atualiza a visualização
}

// Função para alternar favorito
function toggleFavorite(event, cardId) {
    event.stopPropagation(); // Impede que o clique propague para o card
    
    const index = favorites.indexOf(cardId);
    if (index === -1) {
        favorites.push(cardId);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    generateCards(20);
}

// Função para adicionar à visualização recente
function addToRecent(cardId) {
    recentlyViewed = recentlyViewed.filter(id => id !== cardId);
    recentlyViewed.unshift(cardId);
    if (recentlyViewed.length > 5) { // Mantém apenas os 5 mais recentes
        recentlyViewed.pop();
    }
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
}
