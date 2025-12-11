const menuItems = {
    lanches: [
        {
            id: 1,
            name: "Pastel Tradicional",
            description: "Frango/Misto/Carne/Queijo/Presunto/Sabor Pizza",
            price: 5.00,
            image: "./img/Pasteis/pasteltradiicona.jpg"
        },
        {
            id: 2,
            name: "Pastel no Capricho",
            description: "Frango com queijo/Frango com Carne/Frango com Requeijão/Carne com Queijo/Carne com Requeijão/Queijo duplo",
            price: 7.00,
            image: "./img/Pasteis/pastelnocaprichop.jpg"
        },
        {
            id: 3,
            name: "Mistão",
            description: "Frango, Carne, Queijo, Presunto, Requeijão",
            price: 10.00,
            image: "./img/Pasteis/pastelmistao.jpg"
        },
        {
            id: 4,
            name: "Batata Frita",
            description: "Porção de batata frita crocante",
            price: 17.00,
            image: "./img/Pasteis/batatatfrita.jpg"
        },
        {
            id: 5,
            name: "Batata com Calabresa",
            description: "Batata frita com calabresa fatiada",
            price: 23.00,
            image: "./img/Pasteis/calabresacombatata.jpg"
        },
        {
            id: 6,
            name: "Batata com Bacon e Cheddar",
            description: "Batata frita com bacon crocante e cheddar derretido",
            price: 28.00,
            image: "./img/Pasteis/batatacombacon echedar.jpg"
        }
    ],
    bar: [
        {
            id: 7,
            name: "Bisteca Suína",
            description: "Acompanha arroz e farofa",
            price: 25.00,
            image: "./img/Almoco/bistecasuina.jpg"
        },
        {
            id: 8,
            name: "Cará Frito",
            description: "Acompanha arroz ou baião, batata frita e farofa",
            price: 22.00,
            image: "./img/Almoco/carafrito.jpg"
        },
        {
            id: 9,
            name: "Galinha Caipira",
            description: "Acompanha arroz ou baião, batata frita e pirão",
            price: 28.00,
            image: "./img/Almoco/galinhacaipira.jpg"
        },
        {
            id: 10,
            name: "Feijoada Rainha",
            description: "Acompanha Calabresa, feijão preto, arroz, coentro, eucalipto, farofa.",
            price: 38.00,
            image: "./img/Almoco/feijioada.jpg"
        }
    ],
    bebidas: [
        {
            id: 11,
            name: "Itaipava Lata",
            description: "Cerveja Itaipava 350ml",
            price: 4.50,
            image: "./img/Bebidas/itaiopava.jpg"
        },
        {
            id: 12,
            name: "Skol Lata",
            description: "Cerveja Skol 350ml",
            price: 4.50,
            image: "./img/Bebidas/scol.jpg"
        },
        {
            id: 13,
            name: "Heineken 330ml",
            description: "Cerveja Heineken garrafa 330ml",
            price: 8.00,
            image: "./img/Bebidas/heinike.jpg"
        },
        {
            id: 14,
            name: "Itaipava 600ml",
            description: "Cerveja Itaipava garrafa 600ml",
            price: 7.00,
            image: "./img/Bebidas/itaipava600.jpg"
        },
        {
            id: 15,
            name: "Coca-Cola 2L",
            description: "Refrigerante Coca-Cola 2 litros",
            price: 10.00,
            image: "./img/Bebidas/coca.png"
        },
        {
            id: 16,
            name: "Fanta 2L",
            description: "Refrigerante Fanta 2 litros",
            price: 9.00,
            image: "./img/Bebidas/fanta.png"
        }
    ]
};

// Variáveis globais
let cart = [];
let currentCategory = 'lanches';

// DOM Elements
const menuItemsContainer = document.querySelector('.menu-items');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCountElement = document.getElementById('cart-count');
const totalPriceElement = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// Função para renderizar os itens do menu
function renderMenuItems(category) {
    if (!menuItemsContainer) return;
    
    menuItemsContainer.innerHTML = '';
    
    menuItems[category].forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        
        menuItemElement.innerHTML = `
            <img src="${item.image || 'imagens/default.jpg'}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">R$ ${item.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${item.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        
        menuItemsContainer.appendChild(menuItemElement);
    });
    
    // Adiciona event listeners aos botões
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Função para adicionar item ao carrinho
function addToCart(e) {
    const itemId = parseInt(e.target.getAttribute('data-id'));
    let item = null;
    
    // Encontra o item em qualquer categoria
    for (const category in menuItems) {
        const foundItem = menuItems[category].find(i => i.id === itemId);
        if (foundItem) {
            item = foundItem;
            break;
        }
    }
    
    if (!item) return;
    
    // Verifica se o item já está no carrinho
    const existingItem = cart.find(i => i.id === item.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${item.name} adicionado ao carrinho!`);
}

// Função para remover item do carrinho
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        updateCart();
    }
}

// Função para atualizar o carrinho
function updateCart() {
    // Atualiza a contagem no ícone do carrinho
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems.toString();
    }
    
    if (!cartItemsContainer || !checkoutBtn || !totalPriceElement) return;
    
    // Renderiza os itens do carrinho
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="add-item" data-id="${item.id}">+</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Adiciona event listeners aos botões
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                removeFromCart(parseInt(e.target.getAttribute('data-id')));
            });
        });
        
        document.querySelectorAll('.add-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = parseInt(e.target.getAttribute('data-id'));
                const item = cart.find(i => i.id === itemId);
                
                if (item) {
                    item.quantity += 1;
                    updateCart();
                }
            });
        });
        
        checkoutBtn.disabled = false;
    }
    
    // Atualiza o total
    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Função para mostrar notificação
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Event Listeners
if (tabButtons) {
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Atualiza a aba ativa
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Renderiza os itens da categoria selecionada
            currentCategory = button.getAttribute('data-category') || 'lanches';
            renderMenuItems(currentCategory);
        });
    });
}

if (navLinks) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Atualiza o link ativo
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Mostra a seção correspondente
            const target = link.getAttribute('href');
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === target.substring(1)) {
                    section.classList.add('active');
                }
            });
        });
    });
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        // Monta a mensagem para o WhatsApp
        let message = `Olá, gostaria de fazer um pedido:\n\n`;
        message += `*Itens:*\n`;
        
        cart.forEach(item => {
            message += `- ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        message += `\n*Total: R$ ${cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}*`;
        message += `\n\nNome: [Digite seu nome aqui]`;
        message += `\nEndereço: [Digite seu endereço aqui]`;
        
        // Codifica a mensagem para URL
        const encodedMessage = encodeURIComponent(message);
        
        // Abre o WhatsApp
        window.open(`https://wa.me/558596251079?text=${encodedMessage}`, '_blank');
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems(currentCategory);
    
    // Adiciona estilo para notificação
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        }
        
        .notification.fade-out {
            animation: fadeOut 0.5s ease;
            opacity: 0;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});