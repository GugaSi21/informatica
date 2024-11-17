// Dados dos serviços
const services = {
    "atendimento-avulso": [
        { name: "Correção de problemas de lentidão - Suporte Remoto", price: 90 },
        { name: "Ssd Kingspec 256gb", price: 185 },
        { name: "Remoção de vírus - Suporte Remoto", price: 90 },
        { name: "Configuração de Antivírus - Suporte Remoto", price: 90 },
        { name: "Formatação de Desktop (sem backup) - Suporte Presencial", price: 100 },
        { name: "Formatação de Notebook (com backup) - Suporte Presencial", price: 130 }
    ],
    "formatacao": [
        { name: "Formatação de Desktop", price: 120 },
        { name: "Formatação de Notebook", price: 150 }
    ],
    "redes": [
        { name: "Instalação de Rede", price: 200 }
    ],
    "suporte": [
        { name: "Suporte Técnico de TI", price: 100 }
    ],
    "consultoria": [
        { name: "Consultoria para compra de PC", price: 90 },
        { name: "Consultoria para compra de Servidores", price: 180 }
    ],
    "backup": [
        { name: "Backup de Dados", price: 80 }
    ]
};

// Seleciona as categorias e define os eventos
document.querySelectorAll(".category").forEach(category => {
    category.addEventListener("click", function () {
        const categoryName = this.getAttribute("data-category");
        displayServices(categoryName);
    });
});

// Exibe os serviços de uma categoria
function displayServices(category) {
    const serviceList = document.getElementById("service-list");
    const serviceTitle = document.getElementById("service-title");
    const serviceDescription = document.getElementById("service-description");

    // Limpa a lista de serviços
    serviceList.innerHTML = "";

    // Atualiza o título e a descrição
    serviceTitle.textContent = `Serviços de ${category.replace(/-/g, " ").toUpperCase()}`;
    serviceDescription.textContent = "Selecione os serviços que deseja adicionar ao carrinho:";

    // Obtém os serviços da categoria
    const selectedServices = services[category];

    // Adiciona os serviços à lista
    selectedServices.forEach(service => {
        const serviceItem = document.createElement("li");
        serviceItem.innerHTML = `
            ${service.name} - R$ ${service.price.toFixed(2)}
            <button class="add-to-cart" data-name="${service.name}" data-price="${service.price}">
                Adicionar ao Carrinho
            </button>
        `;
        serviceList.appendChild(serviceItem);
    });

    // Adiciona eventos para os botões de adicionar ao carrinho
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const serviceName = this.getAttribute("data-name");
            const servicePrice = parseFloat(this.getAttribute("data-price"));
            addToCart(serviceName, servicePrice);
        });
    });
}

// Adiciona serviços ao carrinho
function addToCart(serviceName, servicePrice) {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const whatsappButton = document.getElementById("whatsapp-button");

    // Cria o item no carrinho
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
        ${serviceName} - R$ ${servicePrice.toFixed(2)}
        <button class="remove-from-cart" data-price="${servicePrice}">
            Remover
        </button>
    `;
    cartItems.appendChild(cartItem);

    // Atualiza o total
    updateCartTotal(servicePrice);

    // Adiciona evento para remover do carrinho
    cartItem.querySelector(".remove-from-cart").addEventListener("click", function () {
        const priceToRemove = parseFloat(this.getAttribute("data-price"));
        cartItem.remove();
        updateCartTotal(-priceToRemove);
    });

    // Exibe o botão do WhatsApp se houver itens
    if (cartItems.children.length > 0) {
        whatsappButton.style.display = "inline-block";
    }
}

// Atualiza o total do carrinho
function updateCartTotal(amount) {
    const cartTotal = document.getElementById("cart-total");
    let currentTotal = parseFloat(cartTotal.textContent);
    currentTotal += amount;
    cartTotal.textContent = currentTotal.toFixed(2);

    // Esconde o carrinho se vazio
    const cart = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const whatsappButton = document.getElementById("whatsapp-button");

    if (currentTotal <= 0) {
        cart.style.display = "none";
        whatsappButton.style.display = "none";
    } else {
        cart.style.display = "block";
    }
}

// Atualiza o link do botão WhatsApp com uma mensagem formatada
document.getElementById("whatsapp-button").addEventListener("click", function () {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    let message = "Olá! Gostaria de realizar um pedido com os itens abaixo:\n\n";

    let total = 0;

    // Adiciona itens ao WhatsApp com uma formatação mais organizada
    cartItems.querySelectorAll("li").forEach(item => {
        const itemName = item.textContent.split(" - ")[0].trim();
        const itemPrice = parseFloat(item.textContent.split(" - R$ ")[1].split(" ")[0]);
        total += itemPrice;

        // Monta a mensagem do item formatada com quantidade e subtotal, usando negrito para destacar
        message += `*${itemName}*\n  Quantidade: *1*\n  Preço unitário: *R$ ${itemPrice.toFixed(2)}*\n  Subtotal: *R$ ${itemPrice.toFixed(2)}*\n\n`;
    });

    // Adiciona o total do pedido com destaque
    message += `*Total do Pedido: R$ ${total.toFixed(2)}*\n\nPor favor, confirme o pedido. Obrigado!`;

    // Codifica a mensagem para o link do WhatsApp
    this.href = `https://wa.me/5569993073838?text=${encodeURIComponent(message)}`;
});


// Chamando a função para garantir que funcione
showCart();

// Função para adicionar serviços ao carrinho
function addToCart(serviceName, servicePrice) {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const whatsappButton = document.getElementById("whatsapp-button");

    // Cria o item no carrinho
    const cartItem = document.createElement("li");
    cartItem.style.wordWrap = "break-word"; // Ajuste para evitar quebras longas
    cartItem.innerHTML = `
        ${serviceName} - R$ ${servicePrice.toFixed(2)}
        <button class="remove-from-cart" data-price="${servicePrice}">
            Remover
        </button>
    `;
    cartItems.appendChild(cartItem);

    // Atualiza o total
    updateCartTotal(servicePrice);

    // Adiciona evento para remover do carrinho
    cartItem.querySelector(".remove-from-cart").addEventListener("click", function () {
        const priceToRemove = parseFloat(this.getAttribute("data-price"));
        cartItem.remove();
        updateCartTotal(-priceToRemove);
    });

    // Mostra o botão do WhatsApp e garante que o carrinho está visível
    if (cartItems.children.length > 0) {
        whatsappButton.style.display = "inline-block";
        showCart();
    }
}
