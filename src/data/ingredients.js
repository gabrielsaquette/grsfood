// Adicionais por tipo de produto
// tipoIngrediente: 1=Lanches, 2=Pratos, 3=Entradas, 4=Bebidas, 5=Sobremesas, 6=Combos
// statusIngrediente: 1=ativo, 0=inativo

export const INGREDIENTS = [
    // ===== LANCHES (1) =====
    { idIngrediente: 4, statusIngrediente: 1, nome: 'Blend 180g extra', tipoIngrediente: 1, preco: 9.0, grupo: 'Carnes' },
    { idIngrediente: 7, statusIngrediente: 1, nome: 'Bacon', tipoIngrediente: 1, preco: 5.0, grupo: 'Extras' },
    { idIngrediente: 8, statusIngrediente: 1, nome: 'Ovo', tipoIngrediente: 1, preco: 3.0, grupo: 'Extras' },
    { idIngrediente: 11, statusIngrediente: 1, nome: 'Cheddar extra', tipoIngrediente: 1, preco: 4.0, grupo: 'Queijos' },

    // ===== PRATOS (2) =====
    { idIngrediente: 25, statusIngrediente: 1, nome: 'Farofa extra', tipoIngrediente: 2, preco: 4.0, grupo: 'Extras' },
    { idIngrediente: 26, statusIngrediente: 1, nome: 'Ovo frito', tipoIngrediente: 2, preco: 3.5, grupo: 'Extras' },
    { idIngrediente: 27, statusIngrediente: 1, nome: 'Molho da casa', tipoIngrediente: 2, preco: 2.5, grupo: 'Molhos' },

    // ===== ENTRADAS (3) =====
    { idIngrediente: 30, statusIngrediente: 1, nome: 'Cheddar', tipoIngrediente: 3, preco: 4.0, grupo: 'Molhos' },
    { idIngrediente: 31, statusIngrediente: 1, nome: 'Barbecue', tipoIngrediente: 3, preco: 3.0, grupo: 'Molhos' },
    { idIngrediente: 32, statusIngrediente: 1, nome: 'Maionese da casa', tipoIngrediente: 3, preco: 3.0, grupo: 'Molhos' },

    // ===== BEBIDAS (4) =====
    { idIngrediente: 43, statusIngrediente: 1, nome: 'Dose de limão', tipoIngrediente: 4, preco: 2.0, grupo: 'Extras' },

    // ===== SOBREMESAS (5) =====
    { idIngrediente: 50, statusIngrediente: 1, nome: 'Calda extra', tipoIngrediente: 5, preco: 3.0, grupo: 'Extras' },
    { idIngrediente: 51, statusIngrediente: 1, nome: 'Chantilly', tipoIngrediente: 5, preco: 4.0, grupo: 'Extras' },

    // ===== COMBOS (6) =====
    { idIngrediente: 61, statusIngrediente: 1, nome: 'Onion rings', tipoIngrediente: 6, preco: 6.0, grupo: 'Acompanhamento' },
    { idIngrediente: 63, statusIngrediente: 1, nome: 'Suco natural', tipoIngrediente: 6, preco: 4.0, grupo: 'Bebida' },
]

export const getIngredientsByType = (tipo) =>
    INGREDIENTS.filter(
        (i) => i.tipoIngrediente === tipo && i.statusIngrediente === 1
    )

export const groupIngredients = (list) =>
    list.reduce((acc, item) => {
        if (!acc[item.grupo]) acc[item.grupo] = []
        acc[item.grupo].push(item)
        return acc
    }, {})