// GARANTE QUE A PAGINA ESTEJA SEMPRE NO TOPO AO SER CARREGADA
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// bloqueia pinch (iOS)
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

// Dados dos produtos
const produtos = [
    { nome: "Heineken 25cl", en: "Heineken 25cl", es: "Heineken 25cl", preco: 1.00, imagem: "https://i.ibb.co/bMPvC8q5/Heineken25cl-LN.jpg" },
    { nome: "Super Bock 25cl", en: "Super Bock 25cl", es: "Super Bock 25cl", preco: 0.80, imagem: "https://i.ibb.co/RT5kLmmt/Super-Bock25cl.jpg" },
    { nome: "Super Bock 50cl", en: "Super Bock 50cl", es: "Super Bock 50cl", preco: 1.25, imagem: "https://i.ibb.co/ZR404hrk/Super-Bocklata50cl.jpg" },
    { nome: "Super Bock Litrão 1L.", en: "Super Bock 1L Bottle", es: "Super Bock Litro 1L.", preco: 2.50, imagem: "https://i.ibb.co/Wp4RnDhk/Super-Bocklitr-o1-L.jpg" },
    { nome: "Sagres 25cl", en: "Sagres 25cl", es: "Sagres 25cl", preco: 0.80, imagem: "https://i.ibb.co/Ymdb0gx/Sagre-25cl-removebg-preview.jpg" },
    { nome: "Somersby 20cl", en: "Somersby 20cl", es: "Somersby 20cl", preco: 1.00, imagem: "https://i.ibb.co/gbt4Vzpb/Somersby-20cl.jpg" },
    { nome: "Coca-Cola 1 Litro", en: "Coca-Cola 1 Liter", es: "Coca-Cola 1 Litro", preco: 2.00, imagem: "https://i.ibb.co/NdyQpPnf/Coca-cola-1-litro.jpg" },
    { nome: "Coca-Cola Zero 1 Litro", en: "Coca-Cola Zero 1 Liter", es: "Coca-Cola Zero 1 Litro", preco: 2.00, imagem: "https://i.ibb.co/cX8LLW1C/Coca-cola-zero-1-litro.jpg" },
    { nome: "Sprite Limão 1 Litro", en: "Sprite Lemon 1 Liter", es: "Sprite Limón 1 Litro", preco: 2.00, imagem: "https://i.ibb.co/Ps5Ls7Fy/Sprite-limao-1-litro.jpg" },
    { nome: "Monster Black 50cl", en: "Monster Black 50cl", es: "Monster Black 50cl", preco: 2.50, imagem: "https://i.ibb.co/gbxGKD4j/Monster-Black-50cl.jpg" },
    { nome: "Monster White 50cl", en: "Monster White 50cl", es: "Monster White 50cl", preco: 2.50, imagem: "https://i.ibb.co/JjfXqQbv/Monster-white-50cl.jpg" },
    { nome: "Monster Juiced 50cl", en: "Monster Juiced 50cl", es: "Monster Juiced 50cl", preco: 2.50, imagem: "https://i.ibb.co/HpFSk1tr/Monster-juiced-50cl.jpg" },
    { nome: "Vinho Branco 75cl", en: "White Wine 75cl", es: "Vino Blanco 75cl", preco: 6.00, imagem: "https://i.ibb.co/vCtKjrFG/vinho-Coutada-Velha.jpg" },
    { nome: "Vinho Tinto 75cl", en: "Red Wine 75cl", es: "Vino Tinto 75cl", preco: 6.00, imagem: "https://i.ibb.co/YBL0DKjf/Coltada-Velha-Tinto.jpg" },
    { nome: "Vinho Rosè 75cl", en: "Rosé Wine 75cl", es: "Vino Rosado 75cl", preco: 6.00, imagem: "https://i.ibb.co/YBhxQ35F/monte-dos-amigos-rose-removebg-preview.jpg" },
    { nome: "Água Penacova 50cl", en: "Penacova Water 50cl", es: "Agua Penacova 50cl", preco: 0.50, imagem: "https://i.ibb.co/ccCnGkcd/Agua-25cl.jpg" },
    { nome: "Água Penacova 1.5L", en: "Penacova Water 1.5L", es: "Agua Penacova 1.5L", preco: 1.00, imagem: "https://i.ibb.co/ZRrZ86hX/agua-1-5-L.jpg" },
];

// LÓGICA DE TRADUÇÃO (Movida para cima para evitar erros de inicialização)
const traducoes = {
    pt: {
        sobreNos: "Sobre Nós",
        idiomaBtn: '<img src="https://flagcdn.com/256x192/pt.png" width="24"> Português',
        carrinhoTitulo: "Seu Carrinho",
        fecharCarrinho: "Fechar ✖",
        formaPagamento: "Forma de pagamento:",
        moradaLabel: "Morada (confirmar/editar):",
        btnPesquisar: "🔍 Pesquisar localização",
        trocoPergunta: "Vai precisar de troco?",
        quantoPagar: "Quanto vai pagar?",
        btnFinalizar: "Finalizar pedido via WhatsApp",
        totalLabel: "Total: ",
        msgMinimo: "⚠️ Pedido mínimo de 10 € para finalizar.",
        msgPagamento: "⚠️ Selecione uma forma de pagamento.",
        btnUnidade: "1 Unidade",
        btnDezUnidades: "10 Unidades",
        optSelecione: "Selecione...",
        optDinheiro: "Dinheiro",
        optMbway: "MB Way",
        optMultibanco: "Multibanco",
        btnDetectar: "📍 Detectar Localização (GPS) 📍",
        msgTrocoAviso: "💡 Para liberar o botão, informe um valor maior que o total para calcular o troco.",
        btnRemoverTudo: "Remover Tudo",
        statusDetectando: "📡 Detectando localização...",
        statusLido: "✅ Localização detectada!",
        statusBuscando: "🔍 Buscando endereço...",
        statusLocalizado: "✅ Endereço localizado!",
        statusAtualizandoEndereco: "🔄 Atualizando endereço...",
        statusEnderecoAtualizado: "📍 Endereço atualizado!",
        statusErroAtualizar: "⚠️ Erro ao atualizar endereço.",
        statusLocalizacaoCarregada: "✅ Localização carregada!",
        statusLocalizacaoDispositivo: "📍 Localização carregada do dispositivo!",
        statusNaoSuportado: "❌ Geolocalização não é suportada pelo seu navegador.",
        statusErroDetectar: "❌ Erro ao detectar localização: ",
        statusDigiteEndereco: "⚠️ Por favor, digite um endereço.",
        statusEnderecoNaoEncontrado: "⚠️ Endereço não encontrado.",
        sobreNosTitulo: "Sobre Nós",
        sobreNosTexto1: "🍻 Bem-vindo ao <strong>Zé Birita Delivery</strong>! Aqui você encontra as bebidas mais geladas, com entrega rápida e em um saco com gelo. Aproveite nosso atendimento personalizado e a comodidade de pedir e receber suas bebidas favoritas direto de sua casa.",
        sobreNosTexto2: "🎥 No vídeo acima verá clientes satisfeitos compartilhando suas experiências em redes sociais com nossas bebidas fazendo a diferença em festas ou em momentos especiais. Explore as imagens e descubra tudo o que o <strong>Zé Birita</strong> tem a oferecer. Agradecemos sua visita e esperamos levar mais sabor aos seus momentos!"
    },
    en: {
        sobreNos: "About Us",
        idiomaBtn: '<img src="https://flagcdn.com/256x192/us.png" width="24"> English',
        carrinhoTitulo: "Your Cart",
        fecharCarrinho: "Close ✖",
        formaPagamento: "Payment Method:",
        moradaLabel: "Address (confirm/edit):",
        btnPesquisar: "🔍 Search location",
        trocoPergunta: "Do you need change?",
        quantoPagar: "How much will you pay?",
        btnFinalizar: "Finish order via WhatsApp",
        totalLabel: "Total: ",
        msgMinimo: "⚠️ Minimum order of 10 € to finish.",
        msgPagamento: "⚠️ Select a payment method.",
        btnUnidade: "1 Unit",
        btnDezUnidades: "10 Units",
        optSelecione: "Select...",
        optDinheiro: "Cash",
        optMbway: "MB Way",
        optMultibanco: "ATM Card",
        btnDetectar: "📍 Detect Location (GPS) 📍",
        msgTrocoAviso: "💡 To enable the button, enter a value higher than the total to calculate change.",
        btnRemoverTudo: "Remove All",
        statusDetectando: "📡 Detecting location...",
        statusLido: "✅ Location detected!",
        statusBuscando: "🔍 Searching address...",
        statusLocalizado: "✅ Address located!",
        statusAtualizandoEndereco: "🔄 Updating address...",
        statusEnderecoAtualizado: "📍 Address updated!",
        statusErroAtualizar: "⚠️ Error updating address.",
        statusLocalizacaoCarregada: "✅ Location loaded!",
        statusLocalizacaoDispositivo: "📍 Location loaded from device!",
        statusNaoSuportado: "❌ Geolocation is not supported by your browser.",
        statusErroDetectar: "❌ Error detecting location: ",
        statusDigiteEndereco: "⚠️ Please enter an address.",
        statusEnderecoNaoEncontrado: "⚠️ Address not found.",
        sobreNosTitulo: "About Us",
        sobreNosTexto1: "🍻 Welcome to <strong>Zé Birita Delivery</strong>! Here you will find the coldest drinks, with fast delivery and in an ice bag. Enjoy our personalized service and the convenience of ordering and receiving your favorite drinks directly from your home.",
        sobreNosTexto2: "🎥 In the video above you will see satisfied customers sharing their experiences on social networks with our drinks making a difference in parties or special moments. Explore the images and discover everything <strong>Zé Birita</strong> has to offer. Thank you for your visit and we hope to bring more flavor to your moments!"
    },
    es: {
        sobreNos: "Sobre Nosotros",
        idiomaBtn: '<img src="https://flagcdn.com/256x192/es.png" width="24"> Español',
        carrinhoTitulo: "Tu Carrito",
        fecharCarrinho: "Cerrar ✖",
        formaPagamento: "Forma de pago:",
        moradaLabel: "Dirección (confirmar/editar):",
        btnPesquisar: "🔍 Buscar ubicación",
        trocoPergunta: "¿Necesita cambio?",
        quantoPagar: "¿Quanto va a pagar?",
        btnFinalizar: "Finalizar pedido por WhatsApp",
        totalLabel: "Total: ",
        msgMinimo: "⚠️ Pedido mínimo de 10 € para finalizar.",
        msgPagamento: "⚠️ Seleccione una forma de pago.",
        btnUnidade: "1 Unidad",
        btnDezUnidades: "10 Unidades",
        optSelecione: "Seleccione...",
        optDinheiro: "Efectivo",
        optMbway: "MB Way",
        optMultibanco: "Cajero",
        btnDetectar: "📍 Detectar Ubicación (GPS) 📍",
        msgTrocoAviso: "💡 Para habilitar el botón, ingrese un valor superior al total para calcular el cambio.",
        btnRemoverTudo: "Eliminar Todo",
        statusDetectando: "📡 Detectando ubicación...",
        statusLido: "✅ ¡Ubicación detectada!",
        statusBuscando: "🔍 Buscando dirección...",
        statusLocalizado: "✅ ¡Dirección localizada!",
        statusAtualizandoEndereco: "🔄 Actualizando dirección...",
        statusEnderecoAtualizado: "📍 ¡Dirección actualizada!",
        statusErroAtualizar: "⚠️ Error al actualizar la dirección.",
        statusLocalizacaoCarregada: "✅ ¡Ubicación cargada!",
        statusLocalizacaoDispositivo: "📍 ¡Ubicación cargada del dispositivo!",
        statusNaoSuportado: "❌ La geolocalización no es compatible con su navegador.",
        statusErroDetectar: "❌ Error al detectar la ubicación: ",
        statusDigiteEndereco: "⚠️ Por favor, ingrese una dirección.",
        statusEnderecoNaoEncontrado: "⚠️ Dirección no encontrada.",
        sobreNosTitulo: "Sobre Nosotros",
        sobreNosTexto1: "🍻 ¡Bienvenido a <strong>Zé Birita Delivery</strong>! Aquí encontrarás las bebidas más frías, con entrega rápida y en una bolsa con hielo. Disfruta de nuestra atención personalizada y la comodidad de pedir y recibir tus bebidas favoritas directamente desde tu casa.",
        sobreNosTexto2: "🎥 En el vídeo de arriba verás a clientes satisfechos compartiendo sus experiencias en las redes sociales con nuestras bebidas marcando la diferencia en fiestas o momentos especiales. Explora las imágenes y descubre todo lo que <strong>Zé Birita</strong> tiene para ofrecerte. ¡Gracias por tu visita y esperamos llevar más sabor a tus momentos!"
    }
};

// DOM
const container = document.getElementById("produtos-container");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const contadorCarrinho = document.getElementById("contador-carrinho");
const painelCarrinho = document.getElementById("painel-carrinho");
const modal = document.getElementById("modal");

// Adiciona um espaçamento à direita no container dos produtos
container.style.paddingRight = "35px";

let carrinho = [];

// Utilitários
const atualizarCarrinho = () => {
    listaCarrinho.innerHTML = "";
    let total = 0;
    let totalItens = 0;
    
    const lang = localStorage.getItem('idiomaPreferido') || 'pt';
    const t = traducoes[lang] || traducoes['pt'];

    carrinho.forEach((item, index) => {
        const subtotal = item.quantidade * item.produto.preco;
        total += subtotal;
        totalItens += item.quantidade;
        const nomeTraduzido = lang === 'pt' ? item.produto.nome : item.produto[lang];

        const li = document.createElement("li");
        li.innerHTML = `
            <div class="item-carrinho">
                <div class="quantidade-box">${item.quantidade}x</div>
                <img src="${item.produto.imagem}" alt="${nomeTraduzido}" style="flex-shrink: 0; margin-right: 10px;">
                <div class="info-carrinho" style="flex: 1; min-width: 0;">
                    <p><strong>${nomeTraduzido}</strong></p>
                    <p>€ ${subtotal.toFixed(2)}</p>
                    <div class="botoes-carrinho">
                        <button class="botao-mais">+1</button>
                        <button class="botao-menos" onclick="removerUmaUnidade(${index})">-1</button>
                        <button class="botao-remover" onclick="removerTudo(${index})">${t.btnRemoverTudo}</button>
                    </div>
                </div>
            </div>
        `;

        // Adiciona evento ao botão de adicionar (+1) para corrigir a animação
        // Apenas atualiza a quantidade, sem animação
        li.querySelector('.botao-mais').addEventListener('click', () => adicionarAoCarrinho(produtos.indexOf(item.produto), 1));

        listaCarrinho.appendChild(li);
    });

    contadorCarrinho.textContent = totalItens;
    const totalLabel = (traducoes[lang] && traducoes[lang].totalLabel) || "Total: ";
    totalCarrinho.innerHTML = `<strong>${totalLabel}${total.toFixed(2)} €</strong>`;
    atualizarBotaoFinalizar(totalItens, total);
};

const atualizarBotaoFinalizar = (totalItens, total) => {
    verificarLiberacaoBotao();
};


const renderizarProdutos = () => {
    container.innerHTML = ""; // Limpa o container para re-renderizar ao trocar idioma
    const lang = localStorage.getItem('idiomaPreferido') || 'pt';
    const t = traducoes[lang] || traducoes['pt'];

    produtos.forEach((produto, index) => {
        const nomeTraduzido = lang === 'pt' ? produto.nome : produto[lang];

        const box = document.createElement("div");
        box.classList.add("produto");
        box.innerHTML = `
            <img src="${produto.imagem}" alt="${nomeTraduzido}">
            <h3>${nomeTraduzido}</h3>
            <p><strong>${produto.preco.toFixed(2)} €</strong></p>
            <button onclick="handleAdicionarAoCarrinho(event, ${index}, 1)">${t.btnUnidade}</button>
            <button onclick="handleAdicionarAoCarrinho(event, ${index}, 10)">${t.btnDezUnidades}</button>
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

const handleAdicionarAoCarrinho = (event, index, quantidade, elementoOrigem = null) => {
    adicionarAoCarrinho(index, quantidade);
    const origem = elementoOrigem || event.currentTarget;
    animarQuantidade(origem, quantidade);
};

const toggleCarrinho = () => {
    painelCarrinho.classList.toggle("aberto");
    verificarLiberacaoBotao(); // Verifica o estado do botão e mensagens ao abrir/fechar
};


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
    const msgPagamento = document.getElementById('mensagem-pagamento');

    // Mostra ou esconde a mensagem de pagamento conforme a seleção
    msgPagamento.style.display = formaSelecionada === "" ? 'block' : 'none';

    // pega valor numérico, mesmo que esteja vazio
    let total = parseFloat(totalCarrinho.innerText.replace(/[^\d,.]/g, '').replace(',', '.'));
    if (isNaN(total)) total = 0; // garante valor numérico

    const atingiuMinimo = total >= 10;

    // controla mensagem de pedido mínimo
    const msgMinimo = document.getElementById('mensagem-minimo');

    // sempre mostra se for menor que o mínimo (inclusive carrinho vazio)
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
    const lang = localStorage.getItem('idiomaPreferido') || 'pt';

    let msg = `🛒 *Olá! Gostaria de fazer um pedido:*\n📦 *Produtos:*\n`;
    carrinho.forEach(item => {
        const nomeTraduzido = lang === 'pt' ? item.produto.nome : item.produto[lang];
        msg += `\n- ${item.quantidade} x ${nomeTraduzido} 🍺\n`;
    });
    msg += `\n💰 *Total:* ${total.toFixed(2)} €\n💳 *Forma de pagamento:* ${forma}`;

    if (forma === 'Dinheiro') {
        if (trocoSim.checked && campoTroco.value) {
            const quanto = conversordevalor();
            const troco = (quanto - total).toFixed(2);
            msg += `\n💵 *Valor que irá pagar:* ${quanto.toFixed(2)} €`;
            msg += `\n💸 *Troco a ser devolvido:* ${troco} €`;
        } else {
            msg += `\n💸 *Não precisa de troco*`;
        }
    }

    const campoMorada = document.getElementById('localizacao-morada');
    const moradaConfirmada = campoMorada && campoMorada.value.trim() ? campoMorada.value.trim() : null;

    if (moradaConfirmada) {
        msg += `\n\n📍 *Morada de entrega:* ${moradaConfirmada}`;
    } else {
        // Se não tiver morada escrita, tenta pegar as coordenadas do GPS
        const loc = carregarLocalizacaoCheckout();
        if (loc) {
            msg += `\n📍 *Localização (coords):* ${loc.lat.toFixed(6)}, ${loc.lon.toFixed(6)} (precisão ~${Math.round(loc.accuracy)}m)`;

            // Adiciona o link do Google Maps
            const linkMapa = `https://www.google.com/maps?q=${loc.lat},${loc.lon}`;
            msg += `\n🗺️ *Ver no mapa:* ${linkMapa}`;
        }
    }

    // 🟢 NOVO BLOCO — garante que, mesmo com morada, se houver coordenadas, o link seja enviado também
    const lat = localStorage.getItem('latitude');
    const lon = localStorage.getItem('longitude');
    if (lat && lon) {
        const linkMapa = `https://www.google.com/maps?q=${lat},${lon}`;
        msg += `\n🗺️ *Link da localização:* ${linkMapa}`;
    }

    const numero = '351931835337';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    // limpa carrinho e reseta o checkout
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

            localStorage.setItem("latitude", lat);
            localStorage.setItem("longitude", lon);

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

            setStatus('✅ Localização detectada. Confirme a morada antes de finalizar o pedido.');
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

function toggleMenuIdioma() {
    const menu = document.getElementById('menu-idioma');
    menu.classList.toggle('aberto');
}

function mudarIdioma(lang) {
    localStorage.setItem('idiomaPreferido', lang);
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const chave = el.getAttribute('data-i18n');
        if (traducoes[lang][chave]) {
            // Lista de chaves que contém HTML (tags strong, br, etc)
            const chavesComHtml = ['tituloSite', 'sobreNosTexto1', 'sobreNosTexto2', 'idiomaBtn'];
            if (chavesComHtml.includes(chave)) {
                el.innerHTML = traducoes[lang][chave];
            } else {
                el.textContent = traducoes[lang][chave];
            }
        }
    });

    // Oculta o idioma selecionado no menu dropdown para que apareçam apenas as outras opções
    const ids = ['pt', 'en', 'es'];
    ids.forEach(id => {
        const btn = document.getElementById(`lang-${id}`);
        if (btn) btn.style.display = (id === lang) ? 'none' : 'flex';
    });

    renderizarProdutos(); // Re-renderiza os botões do catálogo com o novo idioma
    atualizarCarrinho(); // Atualiza o label do Total
    document.getElementById('menu-idioma').classList.remove('aberto');
}

// Inicialização do sistema de tradução e renderização baseada na preferência salva
const langSalvo = localStorage.getItem('idiomaPreferido') || 'pt';
mudarIdioma(langSalvo);

// Fecha menu ao clicar fora
window.addEventListener('click', (e) => {
    const menu = document.getElementById('menu-idioma');
    if (!e.target.closest('.seletor-idioma') && menu) {
        menu.classList.remove('aberto');
    }
});