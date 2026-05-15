import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieGrid } from '@/components/MovieGrid';
import { useFavorites } from '@/context/FavoritesContext';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Favorites() {
  const { t } = useTranslation();
  const { favorites } = useFavorites();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background pt-24">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t('favorites.title')}
          </h1>
        </div>

        {favorites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center min-h-[50vh] max-w-md mx-auto"
          >
            <div className="w-24 h-24 rounded-full bg-card/50 border border-white/5 flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">{t('favorites.empty')}</h2>
            <p className="text-muted-foreground mb-8">
              {t('favorites.emptyDesc')}
            </p>
            <Link href="/">
              <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Explore Movies
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="flex-1">
            <MovieGrid movies={favorites} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
