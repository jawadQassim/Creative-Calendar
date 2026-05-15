import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ScrollRow } from '@/components/ScrollRow';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Movie, getTrending, getPopular, getTopRated } from '@/services/tmdb';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useTranslation();
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [trendingData, popularData, topRatedData] = await Promise.all([
          getTrending(1),
          getPopular(1),
          getTopRated(1)
        ]);

        const trendingMovies = trendingData.results;
        setTrending(trendingMovies);
        setPopular(popularData.results);
        setTopRated(topRatedData.results);

        if (trendingMovies.length > 0) {
          const randomMovie = trendingMovies[Math.floor(Math.random() * Math.min(5, trendingMovies.length))];
          setHeroMovie(randomMovie);
        }
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 w-full pb-16">
        <Hero movie={heroMovie} loading={loading} />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex flex-col gap-2 md:gap-4 -mt-16 md:-mt-24 relative z-20"
        >
          <ScrollRow 
            title={t('home.trendingTitle')} 
            movies={trending} 
            loading={loading} 
            viewAllHref="/trending" 
            viewAllText={t('home.viewAll')}
          />
          <ScrollRow 
            title={t('home.popularTitle')} 
            movies={popular} 
            loading={loading}
          />
          <ScrollRow 
            title={t('home.topRatedTitle')} 
            movies={topRated} 
            loading={loading} 
            viewAllHref="/top-rated"
            viewAllText={t('home.viewAll')}
          />
        </motion.div>
      </main>

      <ScrollToTop />
      <Footer />
    </div>
  );
}
