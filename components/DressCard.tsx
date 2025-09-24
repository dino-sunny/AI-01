
import React from 'react';
import { Dress } from '../types';
import { EditIcon, TrashIcon } from './icons';

interface DressCardProps {
  dress: Dress;
  isAdmin: boolean;
  onEdit: (dress: Dress) => void;
  onDelete: (dressId: string) => void;
}

export const DressCard: React.FC<DressCardProps> = ({ dress, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200">
        <img
          src={dress.imageUrl}
          alt={dress.name}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
            {dress.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">{dress.description}</p>
        </div>
        
        <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>${dress.price.toFixed(2)}</p>
        </div>
        
        <div className="mt-4">
            <p className="text-xs font-medium text-gray-500 mb-2">Available Sizes:</p>
            <div className="flex flex-wrap gap-2">
                {dress.sizes.map(size => (
                    <span key={size} className="bg-gray-100 border border-gray-300 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">{size}</span>
                ))}
            </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end">
             <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-xs font-medium">{dress.category}</span>
        </div>
      </div>
      {isAdmin && (
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onEdit(dress)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-blue-100 text-blue-600 transition"
          >
            <EditIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(dress.id)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-red-100 text-red-600 transition"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
