"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  searchTerm: string;
  selectedCategories: string[];
  selectedSubcategories: string[];
  selectedRatings: number[];
  selectedDiscounts: number[];
  sortKey: string;
  setSearchTerm: (term: string) => void;
  setSortKey: (key: string) => void;
  setFilter: (filters: any) => void;
  setSelectedCategories: (categories: string[]) => void; 
  setSelectedSubcategories: (subcategories: string[]) => void; 
  setSelectedRatings: (ratings: number[]) => void; 
  setSelectedDiscounts: (discounts: number[]) => void; 
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);
  const [sortKey, setSortKey] = useState('');

 
  const setFilter = (filters: Partial<FilterContextType>) => {
    if (filters.selectedCategories !== undefined) {
      setSelectedCategories(filters.selectedCategories);
    }
    if (filters.selectedSubcategories !== undefined) {
      setSelectedSubcategories(filters.selectedSubcategories);
    }
    if (filters.selectedRatings !== undefined) {
      setSelectedRatings(filters.selectedRatings);
    }
    if (filters.selectedDiscounts !== undefined) {
      setSelectedDiscounts(filters.selectedDiscounts);
    }
    if (filters.searchTerm !== undefined) {
      setSearchTerm(filters.searchTerm);
    }
    if (filters.sortKey !== undefined) {
      setSortKey(filters.sortKey);
    }
  };
  

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        selectedCategories,
        selectedSubcategories,
        selectedRatings,
        selectedDiscounts,
        sortKey,
        setSearchTerm,
        setSortKey,
        setFilter,
        setSelectedCategories, 
        setSelectedSubcategories, 
        setSelectedRatings, 
        setSelectedDiscounts, 
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};