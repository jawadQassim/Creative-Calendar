import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Play, Info, Star } from 'lucide-react';
import { Movie, getBackdropUrl } from '@/services/tmdb';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  movie: Movie | null;
  loading?: boolean;
}

export function Hero({ movie, loading }: HeroProps) {
  const { t } = useTranslation();

  if (loading || !movie) {
    return (
      <div className="w-full h-[100dvh] bg-card animate-pulse flex items-center justify-center">
        <div className="w-full h-full bg-muted/20 absolute inset-0" />
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'original');
  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : '';

  return (
    <div className="relative w-full h-[100dvh] min-h-[600px] max-h-[900px] overflow-hidden bg-black" data-testid="hero-section">
      {backdropUrl && (
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-top opacity-60"
          />
        </motion.div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />

      <div className="absolute inset-0 container mx-auto px-4 md:px-6 flex flex-col justify-end pb-24 md:pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl space-y-4"
        >
          <div className="flex items-center gap-3 text-sm font-medium">
            <div className="flex items-center gap-1 bg-primary/20 text-primary px-2 py-1 rounded border border-primary/30">
              <Star className="w-4 h-4 fill-current" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            {releaseYear && <span className="text-white/80">{releaseYear}</span>}
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight tracking-wide drop-shadow-lg">
            {movie.title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 line-clamp-3 max-w-2xl drop-shadow-md">
            {movie.overview}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link href={`/movie/${movie.id}`}>
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full gap-2 transition-transform hover:scale-105">
                <Play className="w-5 h-5 fill-current" />
                {t('hero.watchNow')}
              </Button>
            </Link>
            <Link href={`/movie/${movie.id}`}>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-white/20 text-white hover:bg-white/10 rounded-full gap-2 backdrop-blur-sm transition-transform hover:scale-105">
                <Info className="w-5 h-5" />
                {t('hero.moreInfo')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
