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
let processos = [];
function createProcesso(setor, stage) {
    const id = getRandomString(8);
    const titulo = `Protocolo n° ${getRandomNumber(1000, 9999)}.${getRandomNumber(10, 99)}`;
    const dataEntrega = getRandomNumber(-5, 30);
    const anexo = getRandomNumber(0, 5);
    return {
        id,
        titulo,
        dataEntrega,
        anexo,
        setor,
        stage
    };
}
function generateProcessos() {
    const setores = ['CORG1', 'CORG2', 'CORG3', 'CORG4'];
    const stages = ['entrada', 'analise', 'revisao', 'concluido'];
    setores.forEach(setor => {
        stages.forEach(stage => {
            for (let i = 0; i < 5; i++) { 
                processos.push(createProcesso(setor, stage));
            }
        });
    });
}
function displayProcessos() {
    const container = document.querySelectorAll('.process-list');
    const counts = {
        entrada: 0,
        analise: 0,
        revisao: 0,
        concluido: 0
    };
    container.forEach(list => {
        list.innerHTML = '';
    });

    processos.forEach(processo => {
        const entregaClass = processo.dataEntrega < 0 ? 'text-danger' : processo.dataEntrega <= 15 ? 'text-warning' : 'text-success';

        const processoHTML = `
            <div class="card mb-2">
                <div class="card-body text-dark">
                    <h5 class="card-title w-100"><strong>${processo.titulo}</strong></h5>
                    <p class="mb-1"><strong>Data de Entrega:</strong> <span class="${entregaClass}">${processo.dataEntrega} dias</span></p>
                    <p class="mb-0">
                        <i class="fas fa-paperclip"></i> ${processo.anexo} &nbsp;
                        <i class="fas fa-check-square"></i> 0/${getRandomNumber(0, 5)}
                    </p>
                </div>
            </div>
        `;
        const stageList = document.querySelector(`.process-list[data-stage="${processo.stage}"]`);
        stageList.innerHTML += processoHTML;
        counts[processo.stage]++;
    });
    document.getElementById('entrada-count').innerText = counts.entrada;
    document.getElementById('analise-count').innerText = counts.analise;
    document.getElementById('revisao-count').innerText = counts.revisao;
    document.getElementById('concluido-count').innerText = counts.concluido;
}
document.addEventListener('DOMContentLoaded', function() {
    generateProcessos();
    displayProcessos();
});
