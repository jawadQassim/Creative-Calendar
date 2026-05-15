import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieGrid } from '@/components/MovieGrid';
import { Movie, getTopRated } from '@/services/tmdb';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function TopRated() {
  const { t } = useTranslation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (pageNumber: number) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);
      
      const data = await getTopRated(pageNumber);
      if (pageNumber === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(t('errors.failedToLoad'));
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, [t]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
      fetchMovies(page + 1);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background pt-24">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t('nav.topRated')}
          </h1>
          {!loading && !error && (
            <p className="text-muted-foreground mt-2">
              The highest rated movies of all time
            </p>
          )}
        </div>

        <MovieGrid movies={movies} loading={loading} error={error} onRetry={() => fetchMovies(1)} />

        {!loading && !error && page < totalPages && (
          <div className="mt-12 flex justify-center">
            <Button 
              onClick={loadMore} 
              disabled={loadingMore}
              size="lg"
              className="rounded-full px-8 bg-card border border-border text-foreground hover:bg-card/80 hover:text-primary transition-colors"
            >
              {loadingMore && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Load More
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
