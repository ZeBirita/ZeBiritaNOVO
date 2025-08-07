// Dados dos produtos
const produtos = [
    { nome: "Heineken 25cl", preco: 1.00, imagem: "https://i.ibb.co/vx4Rdvp1/Heineken25cl-LN.png" },
    { nome: "Heineken 50cl", preco: 1.80, imagem: "https://i.ibb.co/gFtrBPSK/heineken50cl.png" },
    { nome: "Heineken Barril 5L.", preco: 24.00, imagem: "https://i.ibb.co/QF3hmm8B/Heineken5-LBarril.png" },
    { nome: "Super Bock 25cl", preco: 0.80, imagem: "https://i.ibb.co/RpDC0Y9n/Super-Bock25cl.png" },
    { nome: "Super Bock 50cl", preco: 1.20, imagem: "https://i.ibb.co/T94wJ61/Super-Bocklata50cl.png" },
    { nome: "Super Bock Litrão 1L.", preco: 2.50, imagem: "https://i.ibb.co/ZzrrFxwW/Super-Bocklitr-o1-L.png" },
    { nome: "Sagres 25cl", preco: 0.80, imagem: "https://i.ibb.co/nNSZm67f/Sagre-25cl-removebg-preview.png" },
    { nome: "Somersby 20cl", preco: 0.90, imagem: "https://i.ibb.co/QvMxFS26/Somersby-20cl.png" },
    { nome: "Monster Black 50cl", preco: 2.50, imagem: "https://i.ibb.co/SXcczqsv/Monster-Black.png" },
    { nome: "Monster White 50cl", preco: 2.50, imagem: "https://i.ibb.co/d4YPKhyC/Monster-white-50cl.png" },
    { nome: "Monster Juiced 50cl", preco: 2.50, imagem: "https://i.ibb.co/ZRPpf8cD/Monster-juiced-50cl.png" },
    { nome: "Vinho Coutada Velha 75cl", preco: 6.00, imagem: "https://i.ibb.co/yFvbPjNC/vinho-Coutada-Velha.png" },
    { nome: "Vinho Rosè EA 75cl", preco: 6.00, imagem: "https://i.ibb.co/LX12JfzG/Vinho-EA-rose.png" },
    { nome: "Vinho Tinto Monte dos Amigos 75cl", preco: 6.00, imagem: "https://i.ibb.co/TDF00Pt9/vinho-monte-dos-amigos.png" },
    { nome: "Vinho Tinto Vidigueira 75cl", preco: 6.00, imagem: "https://i.ibb.co/prjFf7F8/Vinho-Vidigueira.png" },
    { nome: "Água Penacova 50cl", preco: 0.50, imagem: "https://i.ibb.co/4RWjNR8t/Agua25cl.png" },
    { nome: "Água Penacova 1.5L", preco: 1.00, imagem: "https://i.ibb.co/zVwZrJYT/agua15L.png" },
];

// DOM
const container = document.getElementById("produtos-container");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const contadorCarrinho = document.getElementById("contador-carrinho");
const painelCarrinho = document.getElementById("painel-carrinho");
const modal = document.getElementById("modal");

let carrinho = [];

// Utilitários
const atualizarCarrinho = () => {
    listaCarrinho.innerHTML = "";
    let total = 0;
    let totalItens = 0;

    carrinho.forEach((item, index) => {
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
                        <button class="botao-menos" onclick="removerUmaUnidade(${index})">-1</button>
                        <button class="botao-remover" onclick="removerTudo(${index})">Remover Tudo</button>
                    </div>
                </div>
            </div>
        `;
        listaCarrinho.appendChild(li);
    });

    contadorCarrinho.textContent = totalItens;
    totalCarrinho.innerHTML = `<strong>Total: ${total.toFixed(2)} €</strong>`;
    atualizarBotaoFinalizar(totalItens, total);
};

const atualizarBotaoFinalizar = (totalItens, total) => {
    const btn = document.getElementById('finalizar-whatsapp');
    const mensagem = document.getElementById('mensagem-minimo');
    const atingiuMinimo = total >= 10;

    if (btn) btn.disabled = !atingiuMinimo;
    if (mensagem) mensagem.style.display = atingiuMinimo ? 'none' : 'block';
};

const renderizarProdutos = () => {
    produtos.forEach((produto, index) => {
        const box = document.createElement("div");
        box.classList.add("produto");
        box.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p><strong>${produto.preco.toFixed(2)} €</strong></p>
            <button onclick="handleAdicionarAoCarrinho(event, ${index}, 1)">Adicionar ao carrinho</button>
            <button onclick="handleAdicionarAoCarrinho(event, ${index}, 10)">10x</button>
        `;
        container.appendChild(box);
    });
};

const adicionarAoCarrinho = (index, quantidade = 1) => {
    const produto = produtos[index];
    const item = carrinho.find(item => item.produto.nome === produto.nome);

    item ? item.quantidade += quantidade : carrinho.push({ produto, quantidade });
    atualizarCarrinho();
};

const removerUmaUnidade = (index) => {
    carrinho[index].quantidade > 1 ? carrinho[index].quantidade-- : carrinho.splice(index, 1);
    atualizarCarrinho();
};

const removerTudo = (index) => {
    carrinho.splice(index, 1);
    atualizarCarrinho();
};

const handleAdicionarAoCarrinho = (event, index, quantidade) => {
    adicionarAoCarrinho(index, quantidade);
    animarQuantidade(event.currentTarget, quantidade);
};

const toggleCarrinho = () => painelCarrinho.classList.toggle("aberto");

const animarQuantidade = (botao, quantidade) => {
    const rectBotao = botao.getBoundingClientRect();
    const carrinhoIcone = document.querySelector('.icone-carrinho');
    const rectCarrinho = carrinhoIcone.getBoundingClientRect();

    const animacao = document.createElement('div');
    animacao.classList.add('animacao-quantidade');
    animacao.textContent = quantidade;
    animacao.style.left = rectBotao.left + rectBotao.width / 2 + 'px';
    animacao.style.top = rectBotao.top + rectBotao.height / 2 + 'px';
    document.body.appendChild(animacao);
    animacao.getBoundingClientRect();

    const deltaX = rectCarrinho.left + rectCarrinho.width / 2 - (rectBotao.left + rectBotao.width / 2);
    const deltaY = rectCarrinho.top + rectCarrinho.height / 2 - (rectBotao.top + rectBotao.height / 2);

    animacao.style.transition = 'transform 1.5s ease';
    animacao.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.3)`;

    animacao.addEventListener('transitionend', function handler(e) {
        if (e.propertyName === 'transform') {
            animacao.removeEventListener('transitionend', handler);
            animacao.style.transition = 'opacity 0.5s ease';
            animacao.style.opacity = '0';
            animacao.addEventListener('transitionend', () => animacao.remove(), { once: true });
        }
    });
};

function togglemodal() {
    const modal = document.getElementById('modal');

    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}
const fecharModal = () => modal.style.display = 'none';

modal.addEventListener('click', (e) => {
    if (e.target === modal) toggleModal();
});

// Pagamento e envio via WhatsApp
const pagamento = document.getElementById('forma-pagamento');
pagamento.addEventListener('change', function () {
    const trocoContainer = document.getElementById('troco-container');
    const precisaTroco = document.getElementById('precisa-troco');
    const trocoQuantidade = document.getElementById('troco-quantidade');

    if (this.value === 'dinheiro') {
        trocoContainer.style.display = 'block';
    } else {
        trocoContainer.style.display = 'none';
        precisaTroco.checked = false;
        trocoQuantidade.style.display = 'none';
        document.getElementById('valor-troco').value = '';
    }
});

document.getElementById('precisa-troco').addEventListener('change', (e) => {
    document.getElementById('troco-quantidade').style.display = e.target.checked ? 'block' : 'none';
});

document.getElementById('finalizar-whatsapp').addEventListener('click', () => {
    const total = parseFloat(totalCarrinho.innerText.replace(/[^\d,.]/g, '').replace(',', '.'));
    const forma = pagamento.value;
    if (!forma) return alert('Por favor, selecione uma forma de pagamento.');

    let msg = `🛒 *Olá! Gostaria de fazer um pedido:*
\n📦 *Produtos:* \n`;
    carrinho.forEach(item => msg += `- ${item.quantidade} x ${item.produto.nome} 🍺\n`);
    msg += `\n💰 ${total.toFixed(2)} €\n💳 *Forma de pagamento:* ${forma}`;

    if (forma === 'dinheiro') {

        const quanto = conversordevalor();

        if (!isNaN(quanto)) {
            const troco = (quanto - total).toFixed(2);
            msg += `\n💵 *Valor que irá pagar:* ${quanto.toFixed(2)} €`;
            msg += `\n💸 *Troco a ser devolvido:* ${troco} €`;
        } else {
            msg += `\n💵 *Valor que irá pagar:* não informado`;
        }
    }

    const numero = '351931835337';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    // Alerta e limpeza
    let resumo = '✅ Pedido enviado via WhatsApp!\n';
    carrinho.forEach(item => resumo += `• ${item.quantidade} x ${item.produto.nome}\n`);
    resumo += `\n ${total.toFixed(2)} €\nForma de pagamento: ${forma}`;
    forma == 'dinheiro' ? resumo += `\nTroco: ${(conversordevalor() - total).toFixed(2)} €` : resumo += ``;

    alert(resumo);

    carrinho = [];
    atualizarCarrinho();
    pagamento.value = "";
    document.getElementById('troco-container').style.display = 'none';
    document.getElementById('troco-quantidade').style.display = 'none';
    document.getElementById('valor-troco').value = "";
    painelCarrinho.classList.remove("aberto");
});

// Inicializa
renderizarProdutos();

const conversordevalor = () => {
    const valorInput = document.getElementById('valor-troco').value.trim().replace(',', '.');
    const quanto = parseFloat(valorInput);
    return quanto;
}