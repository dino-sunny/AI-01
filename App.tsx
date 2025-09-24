import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DressGrid } from './components/DressGrid';
import { DressModal } from './components/DressModal';
import { Dress, Category } from './types';
import { INITIAL_DRESSES, INITIAL_CATEGORIES, ALL_CATEGORY } from './constants';

function App() {
  const [dresses, setDresses] = useState<Dress[]>(INITIAL_DRESSES);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<Category>(ALL_CATEGORY);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [editingDress, setEditingDress] = useState<Dress | null>(null);

  const filteredDresses = useMemo(() => {
    if (selectedCategory === ALL_CATEGORY) {
      return dresses;
    }
    return dresses.filter((dress) => dress.category === selectedCategory);
  }, [dresses, selectedCategory]);

  const handleToggleAdmin = () => setIsAdmin(prev => !prev);

  const handleToggleSidebar = () => setIsSidebarOpen(prev => !prev);
  
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleAddDress = () => {
    setEditingDress(null);
    setIsModalOpen(true);
  };

  const handleEditDress = (dress: Dress) => {
    setEditingDress(dress);
    setIsModalOpen(true);
  };

  const handleDeleteDress = (dressId: string) => {
    if (window.confirm('Are you sure you want to delete this dress?')) {
        setDresses(prev => prev.filter(d => d.id !== dressId));
    }
  };

  const handleSaveDress = (dressToSave: Dress) => {
    if (editingDress) {
        setDresses(prev => prev.map(d => d.id === dressToSave.id ? dressToSave : d));
    } else {
        setDresses(prev => [dressToSave, ...prev]);
    }
    setIsModalOpen(false);
    setEditingDress(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDress(null);
  };

  const handleAddCategory = (newCategoryName: string) => {
    const trimmedName = newCategoryName.trim();
    if (trimmedName && !categories.find(c => c.toLowerCase() === trimmedName.toLowerCase())) {
        setCategories(prev => [...prev, trimmedName]);
    } else {
        alert("Category already exists or is empty.");
    }
  };

  const handleUpdateCategory = (oldName: Category, newName: string) => {
    const trimmedNewName = newName.trim();
    if (!trimmedNewName) {
        alert("Category name cannot be empty.");
        return;
    }
    if (categories.find(c => c.toLowerCase() === trimmedNewName.toLowerCase() && c.toLowerCase() !== oldName.toLowerCase())) {
        alert("A category with this name already exists.");
        return;
    }

    setCategories(prev => prev.map(c => c === oldName ? trimmedNewName : c));
    setDresses(prev => prev.map(d => d.category === oldName ? { ...d, category: trimmedNewName } : d));

    if (selectedCategory === oldName) {
        setSelectedCategory(trimmedNewName);
    }
  };

  const pageTitle = selectedCategory === ALL_CATEGORY ? "All Dresses" : selectedCategory;
  const pageDescription = selectedCategory === ALL_CATEGORY 
      ? "Browse our entire collection of beautiful dresses." 
      : `Browse our curated collection of ${selectedCategory.toLowerCase()} dresses.`;

  return (
    <div className="bg-gray-50 min-h-screen">
       {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={handleToggleSidebar}
          aria-hidden="true"
        />
      )}
      <Header isAdmin={isAdmin} onToggleAdmin={handleToggleAdmin} onToggleSidebar={handleToggleSidebar} />
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          isAdmin={isAdmin}
          onAddCategory={handleAddCategory}
          onUpdateCategory={handleUpdateCategory}
        />
        <main className="flex-1 md:ml-64 p-8 pt-28">
          <div className="container mx-auto">
            <div className="mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                {pageTitle}
              </h2>
              <p className="mt-2 text-md text-gray-500">
                {pageDescription}
              </p>
            </div>
            <DressGrid 
              dresses={filteredDresses} 
              isAdmin={isAdmin}
              onAdd={handleAddDress}
              onEdit={handleEditDress}
              onDelete={handleDeleteDress}
            />
          </div>
        </main>
      </div>
      <DressModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveDress}
        dressToEdit={editingDress}
        categories={categories}
      />
    </div>
  );
}

export default App;
