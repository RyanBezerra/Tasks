document.addEventListener('DOMContentLoaded', function() {
    const columns = document.querySelectorAll('.card-body');
    
    columns.forEach(column => {
        new Sortable(column, {
            group: 'processes',
            animation: 150,
            ghostClass: 'process-ghost',
            dragClass: 'process-drag'
        });
    });

    // Function to update deadline colors
    function updateDeadlineColors() {
        const deadlines = document.querySelectorAll('.badge');
        const today = new Date();
        
        deadlines.forEach(deadline => {
            const date = new Date(deadline.textContent.trim());
            const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) {
                deadline.classList.remove('bg-success', 'bg-warning');
                deadline.classList.add('bg-danger');
            } else if (diffDays <= 15) {
                deadline.classList.remove('bg-success', 'bg-danger');
                deadline.classList.add('bg-warning');
            } else {
                deadline.classList.remove('bg-danger', 'bg-warning');
                deadline.classList.add('bg-success');
            }
        });
    }

    updateDeadlineColors();
});

// Configuração dos setores e permissões
const SETORES = {
    CORG1: { id: 'CORG1', nome: 'CORG1' },
    CORG2: { id: 'CORG2', nome: 'CORG2' },
    CORG3: { id: 'CORG3', nome: 'CORG3' },
    CORG4: { id: 'CORG4', nome: 'CORG4' },
    REGIONAL: { id: 'REGIONAL', nome: 'Regional' },
    SETORIAL: { id: 'SETORIAL', nome: 'Setorial' }
};

// Dados de exemplo para processos
const PROCESSOS_EXEMPLO = [
    {
        id: 1,
        titulo: "Análise de Conformidade Fiscal 2024",
        checklistConcluidos: 3,
        checklistTotal: 5,
        dataEntrega: "2024-04-15",
        anexos: 4,
        estagio: "entrada"
    },
    {
        id: 2,
        titulo: "Auditoria Interna - Setor Financeiro",
        checklistConcluidos: 2,
        checklistTotal: 8,
        dataEntrega: "2024-03-10", // Processo em atraso
        anexos: 6,
        estagio: "analise"
    },
    {
        id: 3,
        titulo: "Revisão de Procedimentos Administrativos",
        checklistConcluidos: 7,
        checklistTotal: 7,
        dataEntrega: "2024-03-25", // Prazo próximo (15 dias)
        anexos: 3,
        estagio: "revisao"
    }
];

// Função para criar um card de processo
function createProcessCard(processo) {
    const hoje = new Date();
    const dataEntrega = new Date(processo.dataEntrega);
    const diasRestantes = Math.ceil((dataEntrega - hoje) / (1000 * 60 * 60 * 24));
    
    // Define a cor do badge de data baseado no prazo
    let dataBadgeClass = 'bg-success';
    if (diasRestantes < 0) {
        dataBadgeClass = 'bg-danger';
    } else if (diasRestantes <= 15) {
        dataBadgeClass = 'bg-warning';
    }

    // Calcula progresso do checklist
    const progressoPorcentagem = (processo.checklistConcluidos / processo.checklistTotal) * 100;
    const progressoClass = progressoPorcentagem === 100 ? 'bg-success' : 
                          progressoPorcentagem >= 60 ? 'bg-info' : 'bg-warning';

    return `
        <div class="card mb-2 process-card" data-process-id="${processo.id}" draggable="true">
            <div class="card-body p-2">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h6 class="card-title mb-0">${processo.titulo}</h6>
                    <div class="dropdown">
                        <button class="btn btn-tool btn-sm" data-toggle="dropdown">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="#" onclick="visualizarProcesso(${processo.id})">
                                <i class="fas fa-eye mr-2"></i>Visualizar
                            </a>
                            <a class="dropdown-item" href="#" onclick="editarProcesso(${processo.id})">
                                <i class="fas fa-edit mr-2"></i>Editar
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-danger" href="#" onclick="excluirProcesso(${processo.id})">
                                <i class="fas fa-trash mr-2"></i>Excluir
                            </a>
                        </div>
                    </div>
                </div>
                <div class="progress mb-2" title="Progresso do Checklist">
                    <div class="progress-bar ${progressoClass}" 
                         style="width: ${progressoPorcentagem}%">
                        ${processo.checklistConcluidos}/${processo.checklistTotal}
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="badge ${dataBadgeClass}" title="Data de Entrega">
                        ${new Date(processo.dataEntrega).toLocaleDateString('pt-BR')}
                    </span>
                    <span class="badge bg-info" title="Anexos">
                        <i class="fas fa-paperclip"></i> ${processo.anexos}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Função para atualizar contadores das colunas
function atualizarContadores() {
    document.querySelectorAll('.card').forEach(coluna => {
        const quantidade = coluna.querySelector('.process-list').children.length;
        const contador = coluna.querySelector('.badge.float-right');
        if (contador) {
            contador.textContent = quantidade;
        }
    });
}

// Função para carregar exemplos de processos
function carregarExemplosProcessos() {
    PROCESSOS_EXEMPLO.forEach(processo => {
        const lista = document.querySelector(`.process-list[data-stage="${processo.estagio}"]`);
        if (lista) {
            lista.innerHTML += createProcessCard(processo);
        }
    });
    
    // Atualiza os contadores e cores após carregar os cards
    atualizarContadores();
    updateDeadlineColors();
}

// Carregar exemplos quando a página estiver pronta
document.addEventListener('DOMContentLoaded', () => {
    carregarExemplosProcessos();
    
    // Configuração do Sortable para cada coluna
    const columns = document.querySelectorAll('.process-list');
    columns.forEach(column => {
        new Sortable(column, {
            group: 'processes',
            animation: 150,
            ghostClass: 'process-ghost',
            dragClass: 'process-drag',
            onEnd: () => {
                atualizarContadores();
            }
        });
    });
});
