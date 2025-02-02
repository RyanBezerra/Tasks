document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.row');
  
  function createClientCard(number) {
    const clientDigitLength = Math.floor(Math.random() * (20 - 5 + 1)) + 5; 
    const randomClientNumber = Math.random().toString().slice(2, 2 + clientDigitLength);
    const digitLength = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    const phoneNumber = Math.random().toString().slice(2, 2 + digitLength);
    
    return `
      <div class="col-12 col-md-6 col-lg-4">
  <div class="card bg-white shadow-sm mb-2 d-flex align-items-stretch">
    <div class="card-body p-0 d-flex rounded-1">
      <!-- Ícone do usuário à esquerda com fundo azul e ícone branco -->
      <div class="d-flex flex-column align-items-center justify-content-center mr-3 bg-primary p-3 rounded-left">
        <i class="fas fa-user text-white"></i>
      </div>
      
      <div class="d-flex flex-column p-1">
        <!-- Nome do cliente -->
        <div class="font-weight-bold text-truncate fonte-responsiva">
          Cliente ${randomClientNumber}
        </div>
        
        <div class="d-flex align-items-center my-2">
          <svg class="whatsapp-icon mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="25" height="25">
            <path fill="#25D366" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
          </svg>
          <span class="text-truncate fonte-responsiva-pequena">(83) ${phoneNumber}</span>
        </div>
        
        <div class="d-flex align-items-center">
          <i class="fas fa-map-marker-alt text-primary mr-2 ml-1"></i>
          <span class="text-truncate fonte-responsiva-pequena">Endereço ${number}</span>
        </div>
      </div>
    </div>
  </div>
</div>




    `;
  }

  function generateCards(quantity) {
    container.innerHTML = '';
    for(let i = 1; i <= quantity; i++) {
      container.innerHTML += createClientCard(i);
    }
  }

  const controls = document.createElement('div');
  controls.className = 'mb-3';
  controls.innerHTML = `
    <input type="number" id="cardQuantity" class="form-control d-inline-block w-auto mr-2" min="1" value="1">
    <button class="btn btn-primary" onclick="generateCards(document.getElementById('cardQuantity').value)">Gerar Cards</button>
  `;
  container.parentElement.insertBefore(controls, container);

  window.generateCards = generateCards;
  generateCards(12);
});
