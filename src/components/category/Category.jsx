import useCategory from '@/hooks/category/useCategory'
import { useState } from 'react';

export default function Category() {
  const { categories, loading } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (loading) return <p className="text-center py-5">Loading categories...</p>

  return (
    <div className=" bg-gradient-to-r from-sky-700 to-sky-500 shadow-inner py-4">
      <div className="flex items-center  justify-center gap-3 px-4 overflow-x-auto w-full scrollbar-hide">
        {categories.map((item) => (
          <button
            key={item.categoryId}
            onClick={() => setSelectedCategory(item.categoryId)}
            className={`relative whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${selectedCategory === item.categoryId
                ? "bg-white text-sky-700 shadow-lg scale-105"
                : "bg-sky-700/30 text-white hover:bg-sky-600/70 hover:scale-105"
              }`}
          >
            {item.categoryName}
            {selectedCategory === item.categoryId && (
              <span className="absolute inset-x-0 bottom-0 h-1 bg-yellow-400 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
