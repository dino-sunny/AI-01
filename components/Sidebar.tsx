import React, { useState, useRef, useEffect } from 'react';
import { Category } from '../types';
import { EditIcon, PlusIcon, CheckIcon } from './icons';
import { ALL_CATEGORY } from '../constants';

interface SidebarProps {
  categories: Category[];
  selectedCategory: Category;
  isOpen: boolean;
  onSelectCategory: (category: Category) => void;
  isAdmin: boolean;
  onAddCategory: (name: Category) => void;
  onUpdateCategory: (oldName: Category, newName: Category) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  isOpen,
  onSelectCategory,
  isAdmin,
  onAddCategory,
  onUpdateCategory,
}) => {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingCategory && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingCategory]);

  const handleStartEdit = (category: Category) => {
    setEditingCategory(category);
    setEditingValue(category);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditingValue('');
  };

  const handleSaveEdit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (editingCategory && editingValue.trim() && editingCategory !== editingValue.trim()) {
      onUpdateCategory(editingCategory, editingValue.trim());
    }
    handleCancelEdit();
  };

  const handleAddNewCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName('');
    }
  };

  return (
    <aside
      className={`w-64 bg-gray-50 h-full p-6 pt-28 fixed top-0 left-0 border-r border-gray-200 z-30 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Categories</h2>
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category} className="mb-2 group">
              {isAdmin && editingCategory === category ? (
                <form onSubmit={handleSaveEdit}>
                  <div className="flex items-center">
                    <input
                      ref={editInputRef}
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onBlur={handleSaveEdit}
                      className="w-full text-left px-4 py-2 rounded-lg text-md bg-white border border-pink-400 ring-2 ring-pink-200 focus:outline-none"
                    />
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onSelectCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-md ${
                      selectedCategory === category
                        ? 'bg-pink-100 text-pink-700 font-bold shadow-sm'
                        : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
                    }`}
                  >
                    {category}
                  </button>
                  {isAdmin && category !== ALL_CATEGORY && (
                    <button
                      onClick={() => handleStartEdit(category)}
                      className="ml-2 p-1 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-blue-100 hover:text-blue-600 transition-opacity"
                      aria-label={`Edit category ${category}`}
                    >
                      <EditIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {isAdmin && (
        <div className="mt-8 pt-6 border-t border-gray-200">
           <h3 className="text-md font-semibold text-gray-700 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Add Category</h3>
           <form onSubmit={handleAddNewCategory} className="flex items-center space-x-2">
            <input 
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="New category name"
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
            />
             <button type="submit" className="p-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500" aria-label="Add new category">
                <PlusIcon className="w-5 h-5" />
             </button>
           </form>
        </div>
      )}
    </aside>
  );
};
