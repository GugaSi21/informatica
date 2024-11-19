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
        displayServices(categoryName);  // Exibe os serviços
        scrollToServices(); // Move a tela para os serviços
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
                + 
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

// Função para rolar para os serviços automaticamente após selecionar a categoria
function scrollToServices() {
    const serviceSection = document.getElementById("services");
    serviceSection.scrollIntoView({ behavior: "smooth" });
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

    // Exibe o carrinho
    document.getElementById("cart").style.display = "block";

    // Exibe o botão de WhatsApp se houver itens no carrinho
    if (cartItems.children.length > 0) {
        whatsappButton.style.display = "block";
        whatsappButton.href = `https://wa.me/5541999999999?text=Gostaria de saber mais sobre os serviços: ${getCartSummary()}`;
    }
}

// Atualiza o total do carrinho
function updateCartTotal(amount) {
    const cartTotal = document.getElementById("cart-total");
    let currentTotal = parseFloat(cartTotal.textContent);
    currentTotal += amount;
    cartTotal.textContent = currentTotal.toFixed(2);
}

// Resumo do carrinho para o WhatsApp
function getCartSummary() {
    const items = document.querySelectorAll("#cart-items li");
    return Array.from(items).map(item => item.textContent).join(", ");
}

// Abrir o carrinho
const openCartButton = document.getElementById("open-cart");
openCartButton.addEventListener("click", function() {
    document.getElementById("cart").style.display = "block";
});

// Fechar o carrinho
const closeCartButton = document.getElementById("close-cart");
closeCartButton.addEventListener("click", function() {
    document.getElementById("cart").style.display = "none";
});
