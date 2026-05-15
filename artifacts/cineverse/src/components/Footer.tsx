import { Link } from 'wouter';
import { Film } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="w-full bg-background border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-primary">
          <Film className="w-6 h-6" />
          <span className="text-xl font-display tracking-wider">CINEVERSE</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} CineVerse. {t('footer.rights')}
        </p>
        <p className="text-sm text-muted-foreground">
          {t('footer.poweredBy')}
        </p>
      </div>
    </footer>
  );
}
