import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie } from '@/services/tmdb';
import { useFavorites } from '@/context/FavoritesContext';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface FavoriteButtonProps {
  movie: Movie;
  className?: string;
}

export function FavoriteButton({ movie, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useTranslation();
  const favorited = isFavorite(movie.id);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(movie);
      }}
      className={cn(
        "p-2 rounded-full backdrop-blur-md bg-black/40 border border-white/10 transition-colors",
        favorited ? "text-primary" : "text-white hover:text-primary",
        className
      )}
      aria-label={favorited ? t('movie.removeFavorite') : t('movie.addFavorite')}
      title={favorited ? t('movie.removeFavorite') : t('movie.addFavorite')}
      data-testid={`button-favorite-${movie.id}`}
    >
      <Heart className={cn("w-5 h-5", favorited && "fill-current")} />
    </motion.button>
  );
}
