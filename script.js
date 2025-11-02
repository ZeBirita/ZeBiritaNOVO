// Dados dos produtos
const produtos = [
    { nome: "Heineken 25cl", preco: 1.00, imagem: "https://i.ibb.co/bMPvC8q5/Heineken25cl-LN.jpg" },
    { nome: "Heineken 50cl", preco: 1.80, imagem: "https://i.ibb.co/WNDnLKLb/heineken50cl.jpg" },
    { nome: "Heineken Barril 5L.", preco: 24.00, imagem: "https://i.ibb.co/xKBH64Y7/Heineken5-LBarril.jpg" },
    { nome: "Super Bock 25cl", preco: 0.80, imagem: "https://i.ibb.co/RT5kLmmt/Super-Bock25cl.jpg" },
    { nome: "Super Bock 50cl", preco: 1.20, imagem: "https://i.ibb.co/ZR404hrk/Super-Bocklata50cl.jpg" },
    { nome: "Super Bock Litrão 1L.", preco: 2.50, imagem: "https://i.ibb.co/Wp4RnDhk/Super-Bocklitr-o1-L.jpg" },
    { nome: "Sagres 25cl", preco: 0.80, imagem: "https://i.ibb.co/Ymdb0gx/Sagre-25cl-removebg-preview.jpg" },
    { nome: "Somersby 20cl", preco: 0.90, imagem: "https://i.ibb.co/gbt4Vzpb/Somersby-20cl.jpg" },
    { nome: "Coca-Cola 1 Litro", preco: 2.00, imagem: "https://i.ibb.co/NdyQpPnf/Coca-cola-1-litro.jpg" },
    { nome: "Coca-Cola Zero 1 Litro", preco: 2.00, imagem: "https://i.ibb.co/cX8LLW1C/Coca-cola-zero-1-litro.jpg" },
    { nome: "Monster Black 50cl", preco: 2.50, imagem: "https://i.ibb.co/R4JFbLp4/Monster-black-50c.jpg" },
    { nome: "Monster White 50cl", preco: 2.50, imagem: "https://i.ibb.co/JjfXqQbv/Monster-white-50cl.jpg" },
    { nome: "Monster Juiced 50cl", preco: 2.50, imagem: "https://i.ibb.co/HpFSk1tr/Monster-juiced-50cl.jpg" },
    { nome: "Vinho Coutada Velha 75cl", preco: 6.00, imagem: "https://i.ibb.co/vCtKjrFG/vinho-Coutada-Velha.jpg" },
    { nome: "Vinho Rosè EA 75cl", preco: 6.00, imagem: "https://i.ibb.co/LdHLPJH5/Vinho-EA-rose.jpg" },
    { nome: "Vinho Tinto Monte dos Amigos 75cl", preco: 6.00, imagem: "https://i.ibb.co/KpJdwj9d/vinho-monte-dos-amigos.jpg" },
    { nome: "Vinho Tinto Vidigueira 75cl", preco: 6.00, imagem: "https://i.ibb.co/HDYY6bqZ/vinho-Vidigueira.jpg" },
    { nome: "Água Penacova 50cl", preco: 0.50, imagem: "https://i.ibb.co/ccCnGkcd/Agua-25cl.jpg" },
    { nome: "Água Penacova 1.5L", preco: 1.00, imagem: "https://i.ibb.co/ZRrZ86hX/agua-1-5-L.jpg" },
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
    verificarLiberacaoBotao();
};


const renderizarProdutos = () => {
    produtos.forEach((produto, index) => {
        const box = document.createElement("div");
        box.classList.add("produto");
        box.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p><strong>${produto.preco.toFixed(2)} €</strong></p>
            <button onclick="handleAdicionarAoCarrinho(event, ${index}, 1)">1 Unidade</button>
            <button onclick="handleAdicionarAoCarrinho(event, ${index}, 10)">10 Unidades</button>
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
    if (e.target === modal) fecharModal();
});

// Pagamento e envio via WhatsApp
const pagamento = document.getElementById('forma-pagamento');
const btnFinalizar = document.getElementById('finalizar-whatsapp');
const trocoSim = document.getElementById('precisa-troco');
const trocoNao = document.getElementById('nao-precisa-troco');
const campoTroco = document.getElementById('valor-troco');
const trocoContainer = document.getElementById('troco-container');
const trocoQuantidade = document.getElementById('troco-quantidade');


function verificarLiberacaoBotao() {
    const trocoSim = document.getElementById('precisa-troco');
    const trocoNao = document.getElementById('nao-precisa-troco');

    trocoSim.addEventListener('change', () => {
        if (trocoSim.checked) {
            trocoNao.checked = false;
        } else {
            // Se desmarcou "Sim", marca "Não"
            trocoNao.checked = true;
        }
    });

    trocoNao.addEventListener('change', () => {
        if (trocoNao.checked) {
            trocoSim.checked = false;
        } else {
            // Se desmarcou "Não", marca "Sim"
            trocoSim.checked = true;
        }
    });

    const formaSelecionada = pagamento.value;
    const total = parseFloat(totalCarrinho.innerText.replace(/[^\d,.]/g, '').replace(',', '.'));
    const atingiuMinimo = total >= 10;

    // controla mensagem de pedido mínimo
    const msgMinimo = document.getElementById('mensagem-minimo');
    msgMinimo.style.display = atingiuMinimo ? 'none' : 'block';

    // controla mensagem de troco
    const msgTroco = document.getElementById('mensagem-troco');
    let mostrarTrocoAviso = false;

    let liberar = atingiuMinimo && formaSelecionada !== "";

    if (formaSelecionada === "Dinheiro" && trocoSim.checked) {
        const valor = conversordevalor();
        if (isNaN(valor) || valor <= total) {
            mostrarTrocoAviso = true;
            liberar = false;
        }
    }

    msgTroco.style.display = mostrarTrocoAviso ? 'block' : 'none';
    btnFinalizar.disabled = !liberar;
}


pagamento.addEventListener('change', function () {
    if (this.value === 'Dinheiro') {
        trocoContainer.style.display = 'block';
        trocoSim.checked = true;
        trocoNao.checked = false;
        trocoQuantidade.style.display = 'block';
    } else {
        trocoContainer.style.display = 'none';
        campoTroco.value = '';
    }
    verificarLiberacaoBotao();
});

trocoSim.addEventListener('change', () => {
    if (trocoSim.checked) {
        trocoNao.checked = false;
        trocoQuantidade.style.display = 'block';
    } else {
        trocoQuantidade.style.display = 'none';
        campoTroco.value = '';
    }
    verificarLiberacaoBotao();
});

trocoNao.addEventListener('change', () => {
    if (trocoNao.checked) {
        trocoSim.checked = false;
        trocoQuantidade.style.display = 'none';
        campoTroco.value = '';
    } else {
        trocoSim.checked = true;
        trocoQuantidade.style.display = 'block';
    }
    verificarLiberacaoBotao();
});

campoTroco.addEventListener('input', verificarLiberacaoBotao);

document.getElementById('precisa-troco').addEventListener('change', (e) => {
    document.getElementById('troco-quantidade').style.display = e.target.checked ? 'block' : 'none';
});

document.getElementById('finalizar-whatsapp').addEventListener('click', () => {
    const total = parseFloat(totalCarrinho.innerText.replace(/[^\d,.]/g, '').replace(',', '.'));
    const forma = pagamento.value;

    let msg = `🛒 *Olá! Gostaria de fazer um pedido:*\n📦 *Produtos:*\n`;
    carrinho.forEach(item => msg += `\n- ${item.quantidade} x ${item.produto.nome} 🍺\n`);
    msg += `\n💰 *Total:* ${total.toFixed(2)} €\n💳 *Forma de pagamento:* ${forma}`;

    if (forma === 'Dinheiro' && trocoSim.checked) {
        const quanto = conversordevalor();
        const troco = (quanto - total).toFixed(2);
        msg += `\n💵 *Valor que irá pagar:* ${quanto.toFixed(2)} €`;
        msg += `\n💸 *Troco a ser devolvido:* ${troco} €`;
    }
    else {
        msg += `\n💸 *Não precisa de troco*`;
    }
    const campoMorada = document.getElementById('localizacao-morada');
    const moradaConfirmada = campoMorada && campoMorada.value.trim() ? campoMorada.value.trim() : null;
    if (moradaConfirmada) {
        msg += `\n📍 *Morada de entrega:* ${moradaConfirmada}`;
    } else {
        // opcional: incluir lat/lon se não houver morada
        const loc = carregarLocalizacaoCheckout();
        if (loc) msg += `\n📍 *Localização (coords):* ${loc.lat.toFixed(6)}, ${loc.lon.toFixed(6)} (precisão ~${Math.round(loc.accuracy)}m)`;
    }

    const numero = '351931835337';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    carrinho = [];
    atualizarCarrinho();
    pagamento.value = "";
    pagamento.dispatchEvent(new Event('change'));
    painelCarrinho.classList.remove("aberto");
});

// Inicializa
renderizarProdutos();

const conversordevalor = () => {
    const valorInput = document.getElementById('valor-troco').value.trim().replace(',', '.');
    const quanto = parseFloat(valorInput);
    return quanto;
}

function verificarConsentimentoCookies() {
    const banner = document.getElementById('banner-cookies');
    if (!banner) return; // evita erro se o elemento não existir

    const aceitouCookies = localStorage.getItem('aceitouCookies');
    if (!aceitouCookies) {
        // mostra o banner
        banner.style.display = 'flex';
        banner.classList.add('show'); // se você tiver animação CSS
        return;
    }

    // Se já aceitou, verifica se passou 7 dias
    const dataAceite = localStorage.getItem('dataAceiteCookies');
    if (dataAceite) {
        const agora = new Date();
        const diffDias = (agora - new Date(dataAceite)) / (1000 * 60 * 60 * 24);
        if (diffDias >= 7) {
            banner.style.display = 'flex';
            banner.classList.add('show');
        }
    }
}

function aceitarCookies() {
    const banner = document.getElementById('banner-cookies'); // DECLARA AQUI
    if (!banner) return;

    localStorage.setItem('aceitouCookies', 'true');
    localStorage.setItem('dataAceiteCookies', new Date().toISOString());

    banner.classList.remove('show');
    setTimeout(() => banner.style.display = 'none', 500);
}

function rejeitarCookies() {
    const banner = document.getElementById('banner-cookies'); // DECLARA AQUI
    if (!banner) return;

    localStorage.setItem('aceitouCookies', 'false');
    localStorage.setItem('dataAceiteCookies', new Date().toISOString());

    banner.classList.remove('show');
    setTimeout(() => banner.style.display = 'none', 500);
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', verificarConsentimentoCookies);

verificarConsentimentoCookies();

// Timeout / opções para geolocation
const GEO_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 10000, // 10s
    maximumAge: 0
};

// Chave: salvar e usar depois no envio do pedido
function salvarLocalizacaoNoCheckout(data) {
    // data = { lat, lon, accuracy, address, timestamp }
    localStorage.setItem('checkoutLocation', JSON.stringify(data));
}

// Recuperar (se existir e não expirado)
function carregarLocalizacaoCheckout(expireHours = 24) {
    const raw = localStorage.getItem('checkoutLocation');
    if (!raw) return null;
    try {
        const obj = JSON.parse(raw);
        if (!obj.timestamp) return null;
        const idadeHoras = (Date.now() - new Date(obj.timestamp).getTime()) / (1000 * 60 * 60);
        if (idadeHoras > expireHours) {
            localStorage.removeItem('checkoutLocation');
            return null;
        }
        return obj;
    } catch (e) { return null; }
}

// Mostrar na UI
function setStatus(text, isError = false) {
    const s = document.getElementById('localizacao-status');
    if (!s) return;
    s.textContent = text;
    s.style.color = isError ? '#c82333' : '#333';
}

// Reverse geocode via Nominatim (OSS). Limite de uso público — não abuse em loops.
async function reverseGeocodeNominatim(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
    const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) throw new Error('Erro no reverse geocode');
    const data = await res.json();
    // pode ter display_name ou address detalhado
    return data.display_name || '';
}

// Função principal para detectar localização
function detectarLocalizacao() {
    if (!navigator.geolocation) {
        setStatus('Geolocalização não suportada neste navegador.', true);
        return;
    }

    setStatus('A obter localização... Pediremos permissão ao navegador.');
    navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const accuracy = pos.coords.accuracy; // em metros

            setStatus(`Localização obtida (precisão ~${Math.round(accuracy)} m). Obtendo morada...`);

            // tenta reverse geocode (pode falhar, tratar erros)
            let address = '';
            try {
                address = await reverseGeocodeNominatim(lat, lon);
            } catch (err) {
                console.warn('Reverse geocode falhou:', err);
            }

            // Preenche UI e salva
            const obj = {
                lat, lon, accuracy,
                address,
                timestamp: new Date().toISOString()
            };
            // Preenche campo editável
            const campoMorada = document.getElementById('localizacao-morada');
            if (campoMorada) campoMorada.value = address;
            salvarLocalizacaoNoCheckout(obj);

            setStatus('Localização detectada. Confirme a morada antes de finalizar o pedido.');
        } catch (err) {
            console.error(err);
            setStatus('Erro ao processar localização.', true);
        }
    }, (err) => {
        console.warn('Geolocation error', err);
        if (err.code === err.PERMISSION_DENIED) {
            setStatus('Permissão de localização negada. Por favor, insira a morada manualmente.', true);
        } else if (err.code === err.POSITION_UNAVAILABLE) {
            setStatus('Localização indisponível.', true);
        } else if (err.code === err.TIMEOUT) {
            setStatus('Tempo esgotado ao tentar obter localização. Tente novamente.', true);
        } else {
            setStatus('Erro desconhecido ao obter localização.', true);
        }
    }, GEO_OPTIONS);
}

// Hook no botão
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('detectar-localizacao');
    if (btn) btn.addEventListener('click', detectarLocalizacao);

    // Carregar localização salva (se houver) e preencher campo
    const saved = carregarLocalizacaoCheckout();
    if (saved) {
        if (document.getElementById('localizacao-morada')) document.getElementById('localizacao-morada').value = saved.address || '';
        setStatus('Localização carregada do dispositivo (confirmar/editar).');
    }
});
