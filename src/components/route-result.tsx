'use client';

import { Suspense, useMemo } from 'react';
import { AlertTriangle, Train, IndianRupee, Clock, Footprints, GitBranch, MapPin, ArrowDown } from 'lucide-react';

import { useLanguage } from '@/context/language-provider';
import { getRouteDetails, getStationById, getLineColor } from '@/lib/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

function RouteLoadingSkeleton() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </CardContent>
            </Card>
            <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    )
}

function RouteDetails({ fromId, toId }: { fromId: string; toId: string }) {
    const { t } = useLanguage();

    const fromStation = useMemo(() => getStationById(fromId), [fromId]);
    const toStation = useMemo(() => getStationById(toId), [toId]);
    const routeDetails = useMemo(() => getRouteDetails(fromId, toId, t), [fromId, toId, t]);

    if (routeDetails.error || !fromStation || !toStation) {
        return (
            <Alert variant="destructive" className="mt-4 border-2">
                 <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{routeDetails.error || t.route.noRouteFound}</AlertDescription>
            </Alert>
        )
    }

    const { path, fare, stops, time, interchanges } = routeDetails;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <Card className="overflow-hidden border-2 shadow-lg">
                <CardHeader className="bg-muted/30 pb-4">
                    <CardTitle className="text-xl font-headline flex items-center justify-between">
                       <span className="flex items-center gap-2">
                           {fromStation.name} 
                           <div className="h-px w-8 bg-muted-foreground/30" />
                           {toStation.name}
                       </span>
                       <div className="flex items-center text-primary font-bold text-2xl">
                           <IndianRupee className="h-6 w-6" />
                           {fare}
                       </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-2 p-4 text-center">
                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <Clock className="h-5 w-5 mb-1.5 text-primary"/>
                        <span className="font-bold text-lg">{t.route.approx} {time}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{t.route.mins}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <Footprints className="h-5 w-5 mb-1.5 text-primary"/>
                        <span className="font-bold text-lg">{stops}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{t.route.stops}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-primary/5 border border-primary/10">
                        <GitBranch className="h-5 w-5 mb-1.5 text-primary"/>
                        <span className="font-bold text-lg">{interchanges}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{t.route.interchanges}</span>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-muted/10 border-dashed border-2">
                    <CardHeader className="py-3">
                        <CardTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t.route.firstTrain}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                        <p className="text-2xl font-bold">{fromStation.firstTrain || t.route.unavailable}</p>
                    </CardContent>
                </Card>
                <Card className="bg-muted/10 border-dashed border-2">
                    <CardHeader className="py-3">
                        <CardTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t.route.lastTrain}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                        <p className="text-2xl font-bold">{fromStation.lastTrain || t.route.unavailable}</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 shadow-md">
                <CardHeader className="border-b">
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        {t.route.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="relative pl-8 space-y-0">
                        {path.map((station, index) => {
                             const isInterchange = index > 0 && station.line !== path[index-1].line;
                             const isStart = index === 0;
                             const isEnd = index === path.length - 1;
                             const colorClass = getLineColor(station.line);
                             
                            return (
                                <div key={`${station.id}-${index}`} className="relative pb-8 last:pb-0">
                                    {/* Line connector */}
                                    {!isEnd && (
                                        <div className={cn(
                                            "absolute left-[-1.65rem] top-4 w-1 h-full",
                                            colorClass
                                        )} />
                                    )}

                                    {/* Station Marker */}
                                    <div className={cn(
                                        "absolute left-[-2.15rem] top-0.5 w-5 h-5 rounded-full border-4 border-background z-10",
                                        colorClass,
                                        (isStart || isEnd) && "scale-125 ring-2 ring-primary/20"
                                    )} />

                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3">
                                            <h3 className={cn(
                                                "font-semibold text-base transition-colors",
                                                (isStart || isEnd) ? "text-lg text-primary font-bold" : "text-foreground"
                                            )}>
                                                {station.name}
                                            </h3>
                                            {(isStart || isEnd || isInterchange) && (
                                                <Badge variant="outline" className={cn(
                                                    "text-[10px] font-bold uppercase py-0 px-1.5",
                                                    isStart && "bg-green-500/10 text-green-600 border-green-200",
                                                    isEnd && "bg-red-500/10 text-red-600 border-red-200",
                                                    isInterchange && "bg-yellow-500/10 text-yellow-600 border-yellow-200"
                                                )}>
                                                    {isStart ? 'Origin' : isEnd ? 'Dest' : 'Interchange'}
                                                </Badge>
                                            )}
                                        </div>

                                        {isInterchange && (
                                            <div className="mt-3 p-3 bg-yellow-50/80 dark:bg-yellow-900/10 rounded-xl border border-yellow-200 dark:border-yellow-900/30 flex items-center gap-3">
                                                <GitBranch className="h-5 w-5 text-yellow-600 shrink-0" />
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-yellow-700 uppercase">{t.route.changeLine}</span>
                                                    <span className="text-sm font-semibold">{station.line} {t.route.line}</span>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {isStart && (
                                            <div className="mt-1 text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                                                <Train className="h-3 w-3" />
                                                <span>{station.line} {t.route.line}</span>
                                                <Separator orientation="vertical" className="h-3 mx-1" />
                                                <span>{station.platformInfo.split('|')[0]}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function RouteResult({ fromId, toId }: { fromId: string, toId: string }) {
    if (!fromId || !toId) return null;

    return (
        <Suspense fallback={<RouteLoadingSkeleton />}>
            <RouteDetails fromId={fromId} toId={toId} />
        </Suspense>
    );
}
