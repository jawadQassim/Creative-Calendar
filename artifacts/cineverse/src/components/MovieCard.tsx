import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Film, Star } from 'lucide-react';
import { Movie, getPosterUrl } from '@/services/tmdb';
import { FavoriteButton } from './FavoriteButton';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const posterUrl = getPosterUrl(movie.poster_path, 'w500');
  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : '';
  const { t } = useTranslation();
  
  const getRatingColor = (rating: number) => {
    if (rating >= 7) return "text-green-400";
    if (rating >= 5) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className={cn("group relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-card border border-border cursor-pointer", className)}
      data-testid={`card-movie-${movie.id}`}
    >
      <Link href={`/movie/${movie.id}`} className="absolute inset-0 z-10 block">
        <span className="sr-only">{movie.title}</span>
      </Link>

      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-card p-4 text-center">
          <Film className="w-12 h-12 text-muted mb-2" />
          <span className="text-sm text-muted-foreground font-medium">{movie.title}</span>
        </div>
      )}

      {/* Default Overlay Gradient for text readability at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white font-medium px-4 py-2 rounded-full border border-white/30 bg-black/40 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          View Details
        </span>
      </div>

      <div className="absolute top-2 right-2 z-20">
        <FavoriteButton movie={movie} />
      </div>

      <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
        <Star className={cn("w-3 h-3 fill-current", getRatingColor(movie.vote_average))} />
        <span className="text-xs font-bold text-white">{movie.vote_average.toFixed(1)}</span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 z-20 pointer-events-none">
        <h3 className="text-white font-semibold line-clamp-1 text-sm md:text-base leading-tight mb-1">
          {movie.title}
        </h3>
        {releaseYear && (
          <p className="text-white/70 text-xs">{releaseYear}</p>
        )}
      </div>
    </motion.div>
  );
}
