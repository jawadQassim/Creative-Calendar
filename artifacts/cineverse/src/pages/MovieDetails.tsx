import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Loader } from '@/components/Loader';
import { ErrorMessage } from '@/components/ErrorMessage';
import { FavoriteButton } from '@/components/FavoriteButton';
import { 
  MovieDetails as MovieDetailsType, 
  CastMember, 
  Video, 
  getMovieDetails, 
  getMovieCredits, 
  getMovieVideos,
  getBackdropUrl,
  getPosterUrl
} from '@/services/tmdb';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, Calendar, Globe, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function MovieDetails() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  
  const id = Number(params.id);
  
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setLocation('/not-found');
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const [movieData, creditsData, videosData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id)
        ]);

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 15)); // Top 15 cast members
        setVideos(videosData.results);
      } catch (err) {
        console.error(err);
        setError(t('errors.failedToLoad'));
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    window.scrollTo(0, 0);
  }, [id, setLocation, t]);

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24"><Loader /></main>
        <Footer />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-24">
          <ErrorMessage message={error || undefined} onRetry={() => window.location.reload()} />
        </main>
        <Footer />
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'original');
  const posterUrl = getPosterUrl(movie.poster_path, 'w500');
  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : '';
  const officialTrailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube' && v.official) || 
                          videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pb-16">
        {/* Backdrop Header */}
        <div className="relative w-full h-[50vh] md:h-[70vh] max-h-[800px] overflow-hidden bg-black">
          {backdropUrl && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1 }}
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover object-top"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          
          <div className="absolute top-24 left-4 md:left-8 z-20">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 hover:text-white rounded-full bg-black/40 backdrop-blur-md"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
          </div>
        </div>

        {/* Content Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 -mt-32 md:-mt-64">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
            
            {/* Poster Sidebar */}
            <div className="w-48 md:w-72 shrink-0 mx-auto md:mx-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-card aspect-[2/3] relative"
              >
                {posterUrl ? (
                  <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-card">
                    <span className="text-muted-foreground text-sm">{t('movie.notAvailable')}</span>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Main Info */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 flex flex-col pt-4 md:pt-16"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-2">
                    {movie.title}
                    {releaseYear && <span className="text-white/60 ml-3 text-3xl md:text-4xl font-normal">({releaseYear})</span>}
                  </h1>
                  {movie.tagline && (
                    <p className="text-lg md:text-xl text-primary font-medium italic">"{movie.tagline}"</p>
                  )}
                </div>
                <div className="flex items-center self-start">
                  <FavoriteButton movie={movie} className="w-12 h-12 flex items-center justify-center bg-card/50" />
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-1.5 text-white/90 font-medium bg-white/10 px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/10">
                  <Star className="w-4 h-4 text-primary fill-current" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                {movie.runtime && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{movie.runtime} {t('movie.min')}</span>
                  </div>
                )}
                {movie.release_date && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.release_date}</span>
                  </div>
                )}
                {movie.original_language && (
                  <div className="flex items-center gap-1.5 uppercase">
                    <Globe className="w-4 h-4" />
                    <span>{movie.original_language}</span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {movie.genres.map(g => (
                    <Badge key={g.id} variant="outline" className="bg-card/50 border-white/10 text-white/90 rounded-full px-4 py-1 text-sm font-normal">
                      {g.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-white mb-3">{t('movie.overview')}</h3>
                <p className="text-lg leading-relaxed text-white/80 max-w-4xl">
                  {movie.overview || t('movie.notAvailable')}
                </p>
              </div>

            </motion.div>
          </div>

          {/* Cast Section */}
          {cast.length > 0 && (
            <div className="mt-16 mb-16">
              <h3 className="text-2xl font-display font-bold text-white mb-6 pl-2 border-l-4 border-primary">{t('movie.cast')}</h3>
              <div className="flex overflow-x-auto gap-4 pb-6 no-scrollbar">
                {cast.map(member => {
                  const profileUrl = member.profile_path ? getPosterUrl(member.profile_path, 'w185') : null;
                  return (
                    <div key={member.id} className="w-[140px] shrink-0 flex flex-col bg-card rounded-lg overflow-hidden border border-border border-white/5">
                      <div className="w-full aspect-square bg-muted/30 relative">
                        {profileUrl ? (
                          <img src={profileUrl} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-12 h-12 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm text-white line-clamp-1">{member.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{member.character}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Trailer Section */}
          {officialTrailer && (
            <div className="mt-16 mb-8">
              <h3 className="text-2xl font-display font-bold text-white mb-6 pl-2 border-l-4 border-primary">{t('movie.trailer')}</h3>
              <div className="w-full aspect-video md:aspect-[21/9] max-w-5xl rounded-xl overflow-hidden bg-black shadow-2xl border border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${officialTrailer.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
