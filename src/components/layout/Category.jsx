import useCategory from '@/hooks/category/useCategory';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../utils/Loading';


export default function Category() {
  const { categories, loading } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();


  const handleCategoryClick = (categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    navigate(`/search-page-by-category?categoryName=${categoryName}`);
  };

  if (loading) return <Loading/>;

  return (
    <div className="py-5 bg-white shadow-sm border-b border-gray-300 mt-5">
      <div className="flex items-center justify-start md:justify-center gap-3 
                      px-4 overflow-x-auto scrollbar-hide pb-2">
        <button className={`relative whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm`}>
          All
        </button>

        {categories.map((item) => (
          <button
            key={item.categoryId}
            onClick={() => handleCategoryClick(item.categoryId, item.categoryName)}
            className={`relative whitespace-nowrap px-6 py-2 rounded-full 
                        text-sm font-medium transition-all duration-300 shadow-sm
                ${selectedCategory === item.categoryId
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
              }`}
          >
            {item.categoryName}

            {selectedCategory === item.categoryId && (
              <span className="absolute inset-x-0 bottom-0 h-1 bg-blue-300 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
