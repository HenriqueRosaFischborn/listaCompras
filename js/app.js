  // Lista fixa de produtos (simulando o banco de dados do mercado)
  const listaProdutos = [
    { id: 1, nome: "Arroz", preco: 5.99 },
    { id: 2, nome: "Feijão", preco: 7.49 },
    { id: 3, nome: "Macarrão", preco: 3.49 },
    { id: 4, nome: "Leite", preco: 4.79 },
  ];
  
  // Função para obter o carrinho do localStorage (ou criar um vazio se não existir)
  function getCarrinho() {
    const carrinho = localStorage.getItem("carrinho");
    return carrinho ? JSON.parse(carrinho) : [];
  }
  
  // Função para salvar o carrinho atualizado no localStorage
  function salvarCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
  
  // Função para renderizar os produtos disponíveis
  function mostrarProdutos() {
    const divProdutos = document.getElementById("produtos");
    divProdutos.innerHTML = "";
  
    listaProdutos.forEach(produto => {
      const div = document.createElement("div");
      div.className = "produto";
      div.innerHTML = `
        <strong>${produto.nome}</strong> - R$ ${produto.preco.toFixed(2)}
        <button onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.preco.toFixed(2)})">Adicionar</button>
      `;
      divProdutos.appendChild(div);
    });
  }
  
  // Função para adicionar um item ao carrinho
  function adicionarAoCarrinho(idp, nomep, precop) {
    let carrinho = getCarrinho();
  
    // Verifica se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.id === idp);
  
    if (itemExistente) {
      itemExistente.quantidade += 1; // Se já existe, só aumenta a quantidade
    } else {
      carrinho.push({ id: idp, nome: nomep, preco: precop, quantidade: 1 });
    }
  
    salvarCarrinho(carrinho);
    mostrarCarrinho();
  }

  function showTotal(total) {
    const divTotal = document.getElementById("divTotal");
    divTotal.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
  }
  
  // Função para remover um item do carrinho
  function removerDoCarrinho(idProduto) {
    let carrinho = getCarrinho();
    carrinho = carrinho.filter(item => item.id !== idProduto);
    salvarCarrinho(carrinho);
    mostrarCarrinho();
  }
  
  // Função para exibir o carrinho
  function mostrarCarrinho() {
    const divCarrinho = document.getElementById("carrinho");
    const carrinho = getCarrinho();
  
    if (carrinho.length === 0) {
      divCarrinho.innerHTML = "<p>O carrinho está vazio!</p>";
      showTotal(0)
      return;
    }
  
    divCarrinho.innerHTML = "";
    let total = 0;
  
    carrinho.forEach(item => {
      total += Number(item.quantidade)*Number(item.preco);
  
      const div = document.createElement("div");
      div.className = "carrinho-item";
      div.innerHTML = `
        ${item.nome} - Quantidade: ${item.quantidade} - Subtotal: R$ ${item.preco}
        <button onclick="removerDoCarrinho(${item.id})">Remover</button>
      `;
      divCarrinho.appendChild(div);
    });
  
    showTotal(total)
  }
  
  // Inicia a página mostrando tudo
  mostrarProdutos();
  mostrarCarrinho();
  