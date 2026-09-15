// Tipos de produto (numérico -> label)
export const PRODUCT_TYPES = {
    1: 'Lanches',
    2: 'Pratos',
    3: 'Entradas',
    4: 'Bebidas',
    5: 'Sobremesas',
    6: 'Combos',
}

// Imagem padrão por tipo (placeholder — troque por imagens reais depois)
export const TYPE_IMAGES = {
    1: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=60', // Lanches
    2: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=60', // Pratos
    3: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=800&q=60', // Entradas
    4: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=60', // Bebidas
    5: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=60', // Sobremesas
    6: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=60', // Combos
}

// Status do produto
export const PRODUCT_STATUS = {
    1: 'Disponível',
    0: 'Indisponível',
}

// Helpers
export const getTypeLabel = (tipo) => PRODUCT_TYPES[tipo] ?? 'Outros'
export const getStatusLabel = (status) => PRODUCT_STATUS[status] ?? 'Indisponível'
export const getTypeImage = (tipo) =>
    TYPE_IMAGES[tipo] ??
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60'

// Lista ordenada de tipos (para renderizar seções)
export const TYPE_LIST = Object.entries(PRODUCT_TYPES).map(
    ([id, label]) => ({ id: Number(id), label })
)