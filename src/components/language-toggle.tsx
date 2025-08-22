'use client';

import { useLanguage } from '@/context/language-provider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const handleToggle = (checked: boolean) => {
    setLanguage(checked ? 'bn' : 'en');
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="language-switch" className={language === 'en' ? 'text-primary' : 'text-muted-foreground'}>
        EN
      </Label>
      <Switch
        id="language-switch"
        checked={language === 'bn'}
        onCheckedChange={handleToggle}
        aria-label="Toggle language"
      />
      <Label htmlFor="language-switch" className={language === 'bn' ? 'text-primary' : 'text-muted-foreground'}>
        BN
      </Label>
    </div>
  );
}
