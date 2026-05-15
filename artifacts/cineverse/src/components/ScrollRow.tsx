import React from 'react';
import { Link } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { Movie } from '@/services/tmdb';
import { MovieCard } from './MovieCard';
import { SkeletonCard } from './SkeletonCard';

interface ScrollRowProps {
  title: string;
  viewAllHref?: string;
  movies?: Movie[];
  loading?: boolean;
  viewAllText?: string;
  children?: React.ReactNode;
}

export function ScrollRow({ title, viewAllHref, movies = [], loading = false, viewAllText = "View All", children }: ScrollRowProps) {
  return (
    <section className="py-6 md:py-8 w-full">
      <div className="container mx-auto px-4 md:px-6 mb-4 flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">{title}</h2>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
            {viewAllText}
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>
      
      <div className="w-full overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-4 px-4 md:px-6 container mx-auto w-max min-w-full">
          {children ? (
            children
          ) : loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-[160px] md:w-[200px] shrink-0">
                <SkeletonCard />
              </div>
            ))
          ) : (
            movies.map((movie) => (
              <div key={movie.id} className="w-[160px] md:w-[200px] shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
