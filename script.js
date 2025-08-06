const produtos = [
  {
    nome: "Heineken 25cl",
    // descricao: "Descrição do produto 1",
    preco: 1.00,
    imagem: "https://i.ibb.co/vx4Rdvp1/Heineken25cl-LN.png"
  },
  {
    nome: "Heineken 50cl",
    // descricao: "Descrição do produto 2",
    preco: 1.80,
    imagem: "https://i.ibb.co/gFtrBPSK/heineken50cl.png"
  },
  {
    nome: "Heineken Barril 5L.",
    // descricao: "Descrição do produto 3",
    preco: 24.00,
    imagem: "https://i.ibb.co/QF3hmm8B/Heineken5-LBarril.png"
  },
  {
    nome: "Super Bock 25cl",
    // descricao: "Descrição do produto 4",
    preco: 0.80,
    imagem: "https://i.ibb.co/RpDC0Y9n/Super-Bock25cl.png"
  },
  {
    nome: "Super Bock 50cl",
    // descricao: "Descrição do produto 1",
    preco: 1.20,
    imagem: "https://i.ibb.co/T94wJ61/Super-Bocklata50cl.png"
  },
  {
    nome: "Super Bock Litrão 1L.",
    // descricao: "Descrição do produto 2",
    preco: 2.50,
    imagem: "https://i.ibb.co/ZzrrFxwW/Super-Bocklitr-o1-L.png"
  },
  {
    nome: "Sagres 25cl",
    // descricao: "Descrição do produto 3",
    preco: 0.80,
    imagem: "https://i.ibb.co/nNSZm67f/Sagre-25cl-removebg-preview.png"
  },
  {
    nome: "Somersby 20cl",
    // descricao: "Descrição do produto 3",
    preco: 0.90,
    imagem: "https://i.ibb.co/QvMxFS26/Somersby-20cl.png"
  },
  {
    nome: "Monster Black 50cl",
    // descricao: "Descrição do produto 4",
    preco: 2.50,
    imagem: "https://i.ibb.co/SXcczqsv/Monster-Black.png"
  },
  {
    nome: "Monster White 50cl",
    // descricao: "Descrição do produto 1",
    preco: 2.50,
    imagem: "https://i.ibb.co/d4YPKhyC/Monster-white-50cl.png"
  },
  {
    nome: "Monster Juiced 50cl",
    // descricao: "Descrição do produto 2",
    preco: 2.50,
    imagem: "https://i.ibb.co/ZRPpf8cD/Monster-juiced-50cl.png"
  },
  {
    nome: "Vinho Coutada Velha 75cl",
    // descricao: "Descrição do produto 3",
    preco: 6.00,
    imagem: "https://i.ibb.co/yFvbPjNC/vinho-Coutada-Velha.png"
  },
  {
    nome: "Vinho Rosè EA 75cl",
    // descricao: "Descrição do produto 4",
    preco: 6.00,
    imagem: "https://i.ibb.co/LX12JfzG/Vinho-EA-rose.png"
  },
  {
    nome: "Vinho Tinto Monte dos Amigos 75cl",
    // descricao: "Descrição do produto 1",
    preco: 6.00,
    imagem: "https://i.ibb.co/TDF00Pt9/vinho-monte-dos-amigos.png"
  },
  {
    nome: "Vinho Tinto Vidigueira 75cl",
    // descricao: "Descrição do produto 2",
    preco: 6.00,
    imagem: "https://i.ibb.co/prjFf7F8/Vinho-Vidigueira.png"
  },
  {
    nome: "Água Penacova 50cl",
    // descricao: "Descrição do produto 3",
    preco: 0.50,
    imagem: "https://i.ibb.co/4RWjNR8t/Agua25cl.png"
  },
  {
    nome: "Água Penacova 1.5L",
    // descricao: "Descrição do produto 4",
    preco: 1.00,
    imagem: "https://i.ibb.co/zVwZrJYT/agua15L.png"
  },
];

const container = document.getElementById("produtos-container");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const contadorCarrinho = document.getElementById("contador-carrinho");
const painelCarrinho = document.getElementById("painel-carrinho");
const info = document.getElementById("modal");

let carrinho = [];

function renderizarProdutos() {
  produtos.forEach((produto, index) => {
    const box = document.createElement("div");
    box.classList.add("produto");

    box.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      ${produto.descricao ? `<p>${produto.descricao}</p>` : ""}
      <p><strong>R$ ${produto.preco.toFixed(2)}</strong></p>
      <button onclick="handleAdicionarAoCarrinho(event, ${index}, 1)">Adicionar ao carrinho</button>
      <button onclick="handleAdicionarAoCarrinho(event, ${index}, 10)">10x</button>
    `;

    container.appendChild(box);
  });
}

// Função wrapper para adicionar ao carrinho e animar
function handleAdicionarAoCarrinho(event, index, quantidade) {
  adicionarAoCarrinho(index, quantidade);
  animarQuantidade(event.currentTarget, quantidade);
}

function adicionarAoCarrinho(index, quantidade = 1) {
  const produto = produtos[index];
  const itemExistente = carrinho.find(item => item.produto.nome === produto.nome);

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({ produto, quantidade });
  }

  atualizarCarrinho();
}

function removerUmaUnidade(index) {
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade -= 1;
  } else {
    carrinho.splice(index, 1);
  }

  atualizarCarrinho();
}

function removerTudo(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  listaCarrinho.innerHTML = "";
  let total = 0;
  let totalItens = 0;

  carrinho.forEach((item, i) => {
    const subtotal = item.quantidade * item.produto.preco;
    total += subtotal;
    totalItens += item.quantidade;

    const li = document.createElement("li");
    li.innerHTML = `
      <div class="item-carrinho">
        <div class="quantidade-box">${item.quantidade}x</div>
        <img src="${item.produto.imagem}" alt="${item.produto.nome}">
        <div class="info-carrinho">
          <p><strong>${item.produto.nome}</strong></p>
          <p>€ ${subtotal.toFixed(2)}</p>
          <div class="botoes-carrinho">
            <button class="botao-mais" onclick="handleAdicionarAoCarrinho(event, ${produtos.indexOf(item.produto)}, 1)">+1</button>
            <button class="botao-menos" onclick="removerUmaUnidade(${i})">-1</button>
            <button class="botao-remover" onclick="removerTudo(${i})">Remover Tudo</button>
          </div>
        </div>
      </div>
    `;
    listaCarrinho.appendChild(li);
  });

  contadorCarrinho.textContent = totalItens;
  totalCarrinho.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
}

function toggleCarrinho() {
  painelCarrinho.classList.toggle("aberto");
}

// Função que cria e anima o número saindo do botão e indo para o carrinho
function animarQuantidade(botao, quantidade) {
  const rectBotao = botao.getBoundingClientRect();
  const carrinhoIcone = document.querySelector('.icone-carrinho');
  const rectCarrinho = carrinhoIcone.getBoundingClientRect();

  const animacao = document.createElement('div');
  animacao.classList.add('animacao-quantidade');
  animacao.textContent = quantidade;

  // Posiciona o círculo no centro do botão
  animacao.style.left = rectBotao.left + rectBotao.width / 2 + 'px';
  animacao.style.top = rectBotao.top + rectBotao.height / 2 + 'px';

  document.body.appendChild(animacao);

  // Força reflow para garantir aplicação do estilo inicial
  animacao.getBoundingClientRect();

  // Calcular deslocamento para centro do carrinho (imagem)
  const deltaX = (rectCarrinho.left + rectCarrinho.width / 2) - (rectBotao.left + rectBotao.width / 2);
  const deltaY = (rectCarrinho.top + rectCarrinho.height / 2) - (rectBotao.top + rectBotao.height / 2);

  // Define só o transform para mover (sem alterar opacidade ainda)
  animacao.style.transition = 'transform 1.5s ease';
  animacao.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3)`;

  // Quando o movimento terminar, começa o fade out
  animacao.addEventListener('transitionend', function handler(e) {
    if (e.propertyName === 'transform') {
      animacao.removeEventListener('transitionend', handler);

      // Agora só anima opacidade
      animacao.style.transition = 'opacity 0.5s ease';
      animacao.style.opacity = '0';

      // Remove o elemento depois do fade
      animacao.addEventListener('transitionend', () => animacao.remove(), { once: true });
    }
  });
}
renderizarProdutos();

// Função para fechar modal
function fecharModal() {
  modal.style.display = 'none';
}

// Fechar modal ao clicar fora da janela (fundo do modal)
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    togglemodal();
  }
});

function togglemodal() {
  info.classList.toggle("aberto");
}