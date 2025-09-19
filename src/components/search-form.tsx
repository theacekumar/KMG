
'use client';

import * as React from 'react';
import { ChevronsUpDown, Check, ArrowRightLeft } from 'lucide-react';

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
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useLanguage } from '@/context/language-provider';
import { stations } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type StationOption = {
  value: string;
  label: string;
};

const stationOptions: StationOption[] = stations.map((s) => ({
  value: s.id,
  label: s.name,
}));

function StationCombobox({
  value,
  onChange,
  placeholder,
  searchText,
  noResultsText,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchText: string;
  noResultsText: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12 text-base"
        >
          {value
            ? stationOptions.find((station) => station.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={searchText} />
          <CommandList>
            <CommandEmpty>{noResultsText}</CommandEmpty>
            <CommandGroup>
              {stationOptions.map((station) => (
                <CommandItem
                  key={station.value}
                  value={station.label}
                  onSelect={() => {
                    onChange(station.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
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
    setFromStation(toStation);
    setToStation(fromStation);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromStation || !toStation) {
      toast({
        variant: "destructive",
        title: "Error",
        description: t.route.selectStationsError,
      });
      return;
    }
    if (fromStation === toStation) {
      toast({
        variant: "destructive",
        title: "Error",
        description: t.route.sameStationError,
      });
      return;
    }
    onSearch(fromStation, toStation);
  };

  return (
    <Card className="w-full max-w-md lg:max-w-lg mt-8 z-10 shadow-2xl">
      <form onSubmit={handleSearch}>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
            <StationCombobox
              value={fromStation}
              onChange={setFromStation}
              placeholder={t.home.from}
              searchText={t.home.searchStation}
              noResultsText={t.home.noStationFound}
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleSwap}
              className="mx-auto"
              aria-label={t.home.swap}
            >
              <ArrowRightLeft className="h-5 w-5" />
            </Button>

            <StationCombobox
              value={toStation}
              onChange={setToStation}
              placeholder={t.home.to}
              searchText={t.home.searchStation}
              noResultsText={t.home.noStationFound}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full h-12 text-lg bg-accent text-accent-foreground hover:bg-accent/90">
            {t.home.search}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
