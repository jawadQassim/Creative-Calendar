import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  const { t } = useTranslation();
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center w-full gap-4 text-center p-4">
      <AlertTriangle className="w-12 h-12 text-destructive" />
      <p className="text-lg text-muted-foreground">{message || t('errors.failedToLoad')}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-2" data-testid="button-retry">
          {t('errors.tryAgain')}
        </Button>
      )}
    </div>
  );
}
