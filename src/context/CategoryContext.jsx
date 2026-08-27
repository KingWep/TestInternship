import React, { createContext, useContext, useState, useEffect } from 'react'
import axiosClient from '../api/axiosClient'
import { API_ENDPOINTS } from '../api/endpoints'

const CategoryContext = createContext()

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCategories = async () => {

    try {
      setIsLoading(true)
      const response = await axiosClient.get(API_ENDPOINTS.CATEGORIES.GET_ALL)
      console.log('Fetched categories:', response.data)
      setCategories(response.data?.data || response.data || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoryContext.Provider value={{ categories, setCategories, isLoading, fetchCategories }}>
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
