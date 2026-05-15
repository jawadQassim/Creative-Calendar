import { Movie } from '@/services/tmdb';
import { MovieCard } from './MovieCard';
import { SkeletonCard } from './SkeletonCard';
import { ErrorMessage } from './ErrorMessage';

interface MovieGridProps {
  movies?: Movie[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export function MovieGrid({ movies = [], loading = false, error = null, onRetry }: MovieGridProps) {
  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (loading && movies.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6" data-testid="grid-loading">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6" data-testid="grid-movies">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
      {loading && movies.length > 0 && Array.from({ length: 5 }).map((_, i) => (
        <SkeletonCard key={`loading-${i}`} />
      ))}
    </div>
  );
}
