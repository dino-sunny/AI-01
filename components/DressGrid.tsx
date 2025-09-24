
import React from 'react';
import { Dress } from '../types';
import { DressCard } from './DressCard';
import { PlusIcon } from './icons';

interface DressGridProps {
  dresses: Dress[];
  isAdmin: boolean;
  onAdd: () => void;
  onEdit: (dress: Dress) => void;
  onDelete: (dressId: string) => void;
}

export const DressGrid: React.FC<DressGridProps> = ({ dresses, isAdmin, onAdd, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {isAdmin && (
        <button
          onClick={onAdd}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-pink-400 hover:text-pink-600 transition-all duration-300 min-h-[400px] bg-gray-50 hover:bg-pink-50"
        >
          <PlusIcon className="w-12 h-12 mb-2" />
          <span className="text-lg font-medium">Add New Dress</span>
        </button>
      )}
      {dresses.map((dress) => (
        <DressCard
          key={dress.id}
          dress={dress}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
