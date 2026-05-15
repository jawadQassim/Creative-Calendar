import React, { createContext, useContext, useEffect, useState } from 'react';
import { Movie } from '../services/tmdb';

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  toggleFavorite: (movie: Movie) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cineverse_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  const saveFavorites = (newFavorites: Movie[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('cineverse_favorites', JSON.stringify(newFavorites));
  };

  const addFavorite = (movie: Movie) => {
    if (!favorites.find(f => f.id === movie.id)) {
      saveFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id: number) => {
    saveFavorites(favorites.filter(f => f.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some(f => f.id === id);
  };

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
