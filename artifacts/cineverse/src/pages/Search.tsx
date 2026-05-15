import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MovieGrid } from '@/components/MovieGrid';
import { SearchBar } from '@/components/SearchBar';
import { Movie, searchMovies } from '@/services/tmdb';
import { useTranslation } from 'react-i18next';
import { Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  const fetchSearchResults = async (searchQuery: string, pageNumber: number) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      setHasSearched(false);
      return;
    }

    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);
      
      const data = await searchMovies(searchQuery, pageNumber);
      if (pageNumber === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      setTotalPages(data.total_pages);
      setHasSearched(true);
      setError(null);
    } catch (err) {
      setError(t('errors.failedToLoad'));
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchSearchResults(debouncedQuery, 1);
  }, [debouncedQuery]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
      fetchSearchResults(debouncedQuery, page + 1);
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background pt-24">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-8 flex flex-col">
        <div className="mb-12">
          <SearchBar value={query} onChange={setQuery} className="max-w-3xl" />
        </div>

        {!hasSearched && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground min-h-[40vh]">
            <Film className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg">{t('search.typeToSearch')}</p>
          </div>
        )}

        {hasSearched && !loading && movies.length === 0 && !error && (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground min-h-[40vh]">
            <Film className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg">{t('search.noResults')}</p>
          </div>
        )}

        {(loading || movies.length > 0 || error) && (
          <MovieGrid movies={movies} loading={loading} error={error} onRetry={() => fetchSearchResults(debouncedQuery, 1)} />
        )}

        {!loading && !error && hasSearched && movies.length > 0 && page < totalPages && (
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
