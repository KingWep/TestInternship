import React, { createContext, useContext, useState } from 'react'

const CategoryContext = createContext()

const initialCategories = [
  {
    id: 1,
    name: 'Cosmetic',
    slug: 'cosmetic',
    status: 'Active',
    description: 'Beauty and cosmetic products.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
    productCount: 8,
  },
  {
    id: 2,
    name: 'Skincare',
    slug: 'skincare',
    status: 'Active',
    description: 'Skin nourishing and care products.',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
    productCount: 14,
  },
  {
    id: 3,
    name: 'Body Care',
    slug: 'body-care',
    status: 'Active',
    description: 'Full body care essentials.',
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500',
    productCount: 6,
  },
  {
    id: 4,
    name: 'Hair Care',
    slug: 'hair-care',
    status: 'Inactive',
    description: 'Hair treatment and styling products.',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500',
    productCount: 3,
  },
  {
    id: 5,
    name: 'Makeup',
    slug: 'makeup',
    status: 'Active',
    description: 'Cosmetics for face, eyes, and lips.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500',
    productCount: 22,
  },
  {
    id: 6,
    name: 'Fragrance',
    slug: 'fragrance',
    status: 'Active',
    description: 'Perfumes, colognes, and body mists.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
    productCount: 15,
  },
  {
    id: 7,
    name: 'Nail Care',
    slug: 'nail-care',
    status: 'Active',
    description: 'Nail polishes, tools, and treatments.',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500',
    productCount: 9,
  },
  {
    id: 8,
    name: "Men's Grooming",
    slug: 'mens-grooming',
    status: 'Inactive',
    description: 'Skincare and shaving products for men.',
    image: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=500',
    productCount: 4,
  },
  {
    id: 9,
    name: 'Sun Care',
    slug: 'sun-care',
    status: 'Active',
    description: 'Sunscreens and after-sun recovery lotions.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
    productCount: 7,
  },
  {
    id: 10,
    name: 'Oral Care',
    slug: 'oral-care',
    status: 'Active',
    description: 'Dental hygiene and teeth whitening kits.',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500',
    productCount: 5,
  },
]

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(initialCategories)

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategoryContext() {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error('useCategoryContext must be used within a CategoryProvider')
  }
  return context
}
