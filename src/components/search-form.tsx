'use client';

import * as React from 'react';
import { ChevronsUpDown, Check, ArrowRightLeft, Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/language-provider';
import { stations } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type StationOption = {
  value: string;
  label: string;
};

const stationOptions: StationOption[] = stations
  .map((s) => ({
    value: s.id,
    label: s.name,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

function StationCombobox({
  value,
  onChange,
  placeholder,
  searchText,
  noResultsText,
  disabledValue
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchText: string;
  noResultsText: string;
  disabledValue?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-14 text-base border-2 hover:border-primary transition-all duration-200"
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value
              ? stationOptions.find((station) => station.value === value)?.label
              : placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchText} />
          <CommandList>
            <CommandEmpty>{noResultsText}</CommandEmpty>
            <CommandGroup>
              {stationOptions.map((station) => (
                <CommandItem
                  key={station.value}
                  value={station.label}
                  disabled={station.value === disabledValue}
                  onSelect={() => {
                    onChange(station.value);
                    setOpen(false);
                  }}
                  className={cn(
                      station.value === disabledValue && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 text-primary',
                      value === station.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {station.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default function SearchForm({ onSearch }: { onSearch: (from: string, to: string) => void }) {
  const [fromStation, setFromStation] = React.useState('');
  const [toStation, setToStation] = React.useState('');
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSwap = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromStation || !toStation) {
      toast({
        variant: "destructive",
        title: "Selection Error",
        description: t.route.selectStationsError,
      });
      return;
    }
    if (fromStation === toStation) {
      toast({
        variant: "destructive",
        title: "Selection Error",
        description: t.route.sameStationError,
      });
      return;
    }
    onSearch(fromStation, toStation);
  };

  return (
    <Card className="w-full max-w-2xl mt-4 shadow-xl border-t-4 border-t-primary">
      <form onSubmit={handleSearch}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-4 relative">
            <div className="flex-1 w-full space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                        {t.home.from}
                    </label>
                    <StationCombobox
                        value={fromStation}
                        onChange={setFromStation}
                        placeholder={t.home.from}
                        searchText={t.home.searchStation}
                        noResultsText={t.home.noStationFound}
                        disabledValue={toStation}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider pl-1">
                        {t.home.to}
                    </label>
                    <StationCombobox
                        value={toStation}
                        onChange={setToStation}
                        placeholder={t.home.to}
                        searchText={t.home.searchStation}
                        noResultsText={t.home.noStationFound}
                        disabledValue={fromStation}
                    />
                </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleSwap}
              className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-background border-2 shadow-sm z-20 rounded-full h-10 w-10 hover:bg-primary hover:text-white transition-colors"
              aria-label={t.home.swap}
            >
              <ArrowRightLeft className="h-5 w-5 md:rotate-90" />
            </Button>
            
            <Button 
                type="submit" 
                className="w-full md:w-auto md:h-28 px-8 text-lg font-bold bg-primary text-white hover:bg-primary/90 transition-all rounded-xl mt-4 md:mt-6"
            >
                <Search className="mr-2 h-5 w-5" />
                {t.home.search}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
