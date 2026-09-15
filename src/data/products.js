// Produtos de teste (futuramente virá de API)
// tipo: 1=Lanches, 2=Pratos, 3=Entradas, 4=Bebidas, 5=Sobremesas, 6=Combos
// status: 1=Disponível, 0=Indisponível

export const PRODUCTS = [
    // LANCHES (1)
    {
        id: 1,
        status: 1,
        nome: 'X-Burger Clássico',
        descricao: 'Pão brioche, blend 180g, queijo cheddar e molho da casa.',
        preco: 28.9,
        temCombo: true,
        tipo: 1,
    },
    {
        id: 2,
        status: 1,
        nome: 'X-Bacon',
        descricao: 'Pão brioche, blend 180g, bacon crocante e cheddar.',
        preco: 32.5,
        temCombo: true,
        tipo: 1,
    },
    {
        id: 3,
        status: 0,
        nome: 'X-Veggie',
        descricao: 'Pão integral, hambúrguer de grão-de-bico e salada.',
        preco: 26.0,
        temCombo: false,
        tipo: 1,
    },

    // PRATOS (2)
    {
        id: 4,
        status: 1,
        nome: 'Parmegiana de Frango',
        descricao: 'Filé de frango empanado, molho de tomate e queijo gratinado.',
        preco: 42.0,
        temCombo: false,
        tipo: 2,
    },
    {
        id: 5,
        status: 1,
        nome: 'Filé à Moda',
        descricao: 'Filé mignon grelhado com arroz e batata rústica.',
        preco: 58.9,
        temCombo: true,
        tipo: 2,
    },

    // ENTRADAS (3)
    {
        id: 6,
        status: 1,
        nome: 'Batata Frita',
        descricao: 'Porção de batata rústica com alecrim.',
        preco: 18.0,
        temCombo: true,
        tipo: 3,
    },
    {
        id: 7,
        status: 1,
        nome: 'Onion Rings',
        descricao: 'Anéis de cebola empanados e crocantes.',
        preco: 22.0,
        temCombo: false,
        tipo: 3,
    },

    // BEBIDAS (4)
    {
        id: 8,
        status: 1,
        nome: 'Refrigerante Lata',
        descricao: 'Coca-Cola, Guaraná ou Sprite. 350ml.',
        preco: 6.5,
        temCombo: false,
        tipo: 4,
    },
    {
        id: 9,
        status: 1,
        nome: 'Suco Natural',
        descricao: 'Laranja, limão ou maracujá. 500ml.',
        preco: 9.9,
        temCombo: false,
        tipo: 4,
    },
    {
        id: 10,
        status: 0,
        nome: 'Cerveja Artesanal',
        descricao: 'IPA local. 500ml.',
        preco: 16.0,
        temCombo: false,
        tipo: 4,
    },

    // SOBREMESAS (5)
    {
        id: 11,
        status: 1,
        nome: 'Pudim de Leite',
        descricao: 'Pudim caseiro com calda de caramelo.',
        preco: 12.0,
        temCombo: false,
        tipo: 5,
    },

    // COMBOS (6)
    {
        id: 12,
        status: 1,
        nome: 'Combo X-Burger',
        descricao: 'X-Burger + batata frita + refrigerante.',
        preco: 39.9,
        temCombo: true,
        tipo: 6,
    },
]

// Helper: produtos agrupados por tipo
export const getProductsByType = () => {
    return PRODUCTS.reduce((acc, product) => {
        if (!acc[product.tipo]) acc[product.tipo] = []
        acc[product.tipo].push(product)
        return acc
    }, {})
}