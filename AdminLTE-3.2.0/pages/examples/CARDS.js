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

// Função para criar um card
function createCard(index) {
    return `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card card-outline card-primary h-100">
                <div class="card-header">
                    <h3 class="card-title d-flex align-items-center" style="word-break: break-word; overflow-wrap: break-word;">
                        <i class="fas fa-building mr-2 flex-shrink-0"></i>
                        <span class="text-truncate">Corregedoria ${getRandomString(20)}</span>
                    </h3>
                </div>
                <div class="card-body d-flex align-items-center justify-content-center">
                    <div class="info-box bg-light w-100">
                        <div class="info-box-content">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="info-box-text"><i class="fas fa-folder-open mr-2"></i>Processos Abertos</span>
                                <span class="badge badge-primary">${getRandomNumber(10, 100)}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="info-box-text"><i class="fas fa-archive mr-2"></i>Processos Arquivados</span>
                                <span class="badge badge-success">${getRandomNumber(5, 50)}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="info-box-text"><i class="fas fa-clock mr-2"></i>Processos em Atraso</span>
                                <span class="badge badge-danger">${getRandomNumber(1, 20)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <a href="#" class="btn btn-sm btn-primary">
                        <i class="fas fa-eye mr-1"></i>Ver Detalhes
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Função principal para gerar os cards
function generateCards(quantity) {
    const container = document.querySelector('.row');
    container.innerHTML = '';

    // Cria o cabeçalho com classes ajustadas
    const header = `
        <div class="col-12 mb-4">
            <div class="d-flex justify-content-between align-items-start flex-wrap">
                <div class="mb-3 mb-md-0">
                    <h1 class="m-0 text-dark">Dashboard de Processos</h1>
                    <p class="text-muted">Visão Geral das Corregedorias - João Pessoa 2024</p>
                </div>
                <div class="export-button">
                    <button type="button" class="btn btn-primary fixed-width-button">
                        <i class="fas fa-download mr-2"></i>Exportar Relatório
                    </button>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = header;

    // Gera os cards
    for (let i = 0; i < quantity; i++) {
        container.innerHTML += createCard(i);
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
    
    // Gera cards iniciais
    generateCards(20);
});

// Adicione este CSS ao seu arquivo ou inclua no head do HTML
const style = document.createElement('style');
style.textContent = `
    .card-title {
        width: 100%;
        font-size: 1rem;
        line-height: 1.2;
        margin: 0;
    }

    .card-header {
        padding: 0.75rem;
    }

    .card-title i {
        font-size: 1.1rem;
        min-width: 20px;
    }

    .info-box-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .badge {
        min-width: 35px;
        text-align: center;
    }

    .fixed-width-button {
        width: 200px;
        white-space: nowrap;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .export-button {
        flex-shrink: 0;
    }

    @media (max-width: 768px) {
        .fixed-width-button {
            width: 200px;
        }
    }

    .card-body {
        padding: 1.25rem;
        min-height: 200px; /* Altura mínima para manter consistência */
    }

    .info-box {
        margin-bottom: 0;
        box-shadow: none;
        padding: 1rem;
    }
`;
document.head.appendChild(style);
