import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({ value, onChange, className }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('search.placeholder')}
        className="w-full h-14 pl-12 pr-12 text-lg bg-card/50 border-white/10 focus-visible:ring-primary rounded-full backdrop-blur-sm"
        data-testid="input-search"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-white transition-colors rounded-full"
          aria-label="Clear search"
          data-testid="button-clear-search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
