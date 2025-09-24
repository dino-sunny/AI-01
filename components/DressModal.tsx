import React, { useState, useEffect } from 'react';
import { Dress, Category } from '../types';
import { CloseIcon } from './icons';
import { ALL_CATEGORY } from '../constants';

interface DressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dress: Dress) => void;
  dressToEdit: Dress | null;
  categories: Category[];
}

const initialFormState: Omit<Dress, 'id'> = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  category: "Casual",
  sizes: [],
};

export const DressModal: React.FC<DressModalProps> = ({ isOpen, onClose, onSave, dressToEdit, categories }) => {
  const [formData, setFormData] = useState<Omit<Dress, 'id'>>(initialFormState);
  const [sizesInput, setSizesInput] = useState('');

  useEffect(() => {
    if (dressToEdit) {
      setFormData(dressToEdit);
      setSizesInput(dressToEdit.sizes.join(', '));
    } else {
      const defaultCategory = categories.find(c => c !== ALL_CATEGORY) || '';
      setFormData({...initialFormState, category: defaultCategory});
      setSizesInput('');
    }
  }, [dressToEdit, isOpen, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) || 0 : value }));
  };
  
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSizesInput(e.target.value);
    const sizesArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, sizes: sizesArray }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dressData = {
      ...formData,
      id: dressToEdit ? dressToEdit.id : new Date().toISOString(),
    };
    onSave(dressData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                {dressToEdit ? 'Edit Dress' : 'Add New Dress'}
              </h2>
              <button type="button" onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"></textarea>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm rounded-md">
                    {categories.filter(c => c !== ALL_CATEGORY).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required placeholder="https://picsum.photos/seed/new_dress/600/800" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
              </div>
              <div className="sm:col-span-2">
                 <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">Sizes</label>
                 <input type="text" name="sizes" id="sizes" value={sizesInput} onChange={handleSizeChange} required placeholder="e.g., S, M, L, XL" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm" />
                 <p className="mt-1 text-xs text-gray-500">Separate sizes with a comma.</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-pink-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">Save Dress</button>
          </div>
        </form>
      </div>
    </div>
  );
};
