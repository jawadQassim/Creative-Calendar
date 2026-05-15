import { Link } from 'wouter';
import { Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background pt-24">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center max-w-md"
        >
          <Film className="w-24 h-24 text-primary opacity-50 mb-6" />
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-2 tracking-widest">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-4">
            Scene Missing
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            The movie you're looking for seems to have been cut from the final edit. Let's get you back to the main feature.
          </p>
          <Link href="/">
            <Button size="lg" className="rounded-full px-8 font-semibold text-base h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
              Return Home
            </Button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
