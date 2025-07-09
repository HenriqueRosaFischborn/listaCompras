
    document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".product");
  
    // Inicializa os votos no localStorage se ainda não existir
    products.forEach(product => {
      const id = product.dataset.id;
      if (!localStorage.getItem(`votes_${id}`)) {
        localStorage.setItem(`votes_${id}`, "0");
      }
  
      // Mostra votos atuais no botão
      const voteCount = parseInt(localStorage.getItem(`votes_${id}`), 10);
      updateVoteDisplay(product, voteCount);
    });
  
    // Adiciona event listener de clique em cada produto
    products.forEach(product => {
      product.addEventListener("click", () => {
        const id = product.dataset.id;
        const currentVotes = parseInt(localStorage.getItem(`votes_${id}`), 10) || 0;
        const newVotes = currentVotes + 1;
        localStorage.setItem(`votes_${id}`, newVotes.toString());
  
        updateVoteDisplay(product, newVotes);
        updateMostVoted();
      });
    });
  
    // Atualiza a exibição do produto mais votado
    updateMostVoted();
  });
  
  // Atualiza o texto do botão com o número de votos
  function updateVoteDisplay(productElement, votes) {
    const display = productElement.querySelector(".vote-count");
    if (display) {
      display.textContent = `Votos: ${votes}`;
    } else {
      const span = document.createElement("span");
      span.className = "vote-count";
      span.textContent = `Votos: ${votes}`;
      productElement.appendChild(span);
    }
  }
  
  // Encontra e exibe o produto mais votado
  function updateMostVoted() {
    const products = document.querySelectorAll(".product");
    let maxVotes = -1;
    let topProduct = null;
  
    products.forEach(product => {
      const id = product.dataset.id;
      const votes = parseInt(localStorage.getItem(`votes_${id}`), 10) || 0;
  
      if (votes > maxVotes) {
        maxVotes = votes;
        topProduct = product;
      }
    });
  
    const display = document.getElementById("most-voted");
    if (topProduct) {
      const name = topProduct.dataset.name || `Produto ${topProduct.dataset.id}`;
      display.innerHTML = `🥇 Mais votado: <strong>${name}</strong> (${maxVotes} votos)`;
    } else {
      display.textContent = "Nenhum voto ainda 😶";
    }
  }
  
  document.getElementById("toggle-theme").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("tema", isDark ? "dark" : "light");
  });
  
  // Aplica o tema salvo no localStorage ao carregar a página
  document.addEventListener("DOMContentLoaded", () => {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") {
      document.body.classList.add("dark-mode");
    }
  });
  