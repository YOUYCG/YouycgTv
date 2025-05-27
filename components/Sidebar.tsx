import React from 'react';
import type { TVCategory } from '../types';

interface SidebarProps {
  categories: TVCategory[];
  activeCategoryName: string | null;
  onSelectCategory: (categoryName: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategoryName, onSelectCategory }) => {
  return (
    <aside className="w-44 md:w-56 bg-neutral-800/60 backdrop-blur-md text-neutral-400 flex-shrink-0 overflow-y-auto p-2 md:p-3 space-y-1 border-r border-neutral-700/50 shadow-md">
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() => onSelectCategory(category.name)}
                className={`w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 ease-in-out transform 
                            focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1 focus-visible:ring-offset-neutral-800
                            ${activeCategoryName === category.name 
                              ? 'bg-sky-500 text-white font-semibold shadow-lg relative' 
                              : 'hover:bg-neutral-700/70 hover:text-neutral-100 active:scale-[0.97] hover:translate-x-0.5'}`}
                aria-current={activeCategoryName === category.name ? "page" : undefined}
              >
                {activeCategoryName === category.name && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3/5 w-1 bg-sky-300 rounded-r-full"></span>
                )}
                <span className={activeCategoryName === category.name ? "ml-1.5" : ""}>{category.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};