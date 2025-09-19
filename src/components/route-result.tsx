
'use client';

import { Suspense } from 'react';
import { AlertTriangle, Train, IndianRupee, Clock, Footprints, GitBranch, Loader2 } from 'lucide-react';

import { useLanguage } from '@/context/language-provider';
import { getRouteDetails, getStationById, getLineColor } from '@/lib/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

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
            <Card>
                <CardHeader>
                     <Skeleton className="h-8 w-1/4" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

function RouteDetails({ fromId, toId }: { fromId: string; toId: string }) {
    const { t } = useLanguage();

    if (!fromId || !toId) {
        return (
            <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{t.route.selectStationsError}</AlertDescription>
            </Alert>
        );
    }
    
    const fromStation = getStationById(fromId);
    const toStation = getStationById(toId);
    const routeDetails = getRouteDetails(fromId, toId, t);

    if (routeDetails.error || !fromStation || !toStation) {
        return (
            <Alert variant="destructive" className="mt-4">
                 <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{routeDetails.error || t.route.noRouteFound}</AlertDescription>
            </Alert>
        )
    }

    const { path, fare, stops, time, interchanges } = routeDetails;

    return (
        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-headline flex items-center justify-between">
                       <span>{fromStation.name} <Train className="inline-block mx-2 h-5 w-5"/> {toStation.name}</span>
                       <Badge variant="secondary" className="text-lg">{t.route.rupees}{fare}</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="flex flex-col items-center p-2 rounded-lg bg-muted">
                        <Clock className="h-6 w-6 mb-1 text-primary"/>
                        <span className="font-bold text-lg">{time}</span>
                        <span className="text-sm text-muted-foreground">{t.route.mins}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-muted">
                        <Footprints className="h-6 w-6 mb-1 text-primary"/>
                        <span className="font-bold text-lg">{stops}</span>
                        <span className="text-sm text-muted-foreground">{t.route.stops}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-muted">
                        <GitBranch className="h-6 w-6 mb-1 text-primary"/>
                        <span className="font-bold text-lg">{interchanges}</span>
                        <span className="text-sm text-muted-foreground">{t.route.interchanges}</span>
                    </div>
                     <div className="flex flex-col items-center p-2 rounded-lg bg-muted col-span-2 md:col-span-1">
                        <IndianRupee className="h-6 w-6 mb-1 text-primary"/>
                        <span className="font-bold text-lg">{fare}</span>
                        <span className="text-sm text-muted-foreground">{t.route.fare}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{t.route.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="relative border-l-2 border-primary/20 ml-3">
                        {path.map((station, index) => {
                             let isInterchange = false;
                             let prevLine: string | undefined;
                             if (index > 0) {
                                const prevStationInfo = path[index-1];
                                if (station.line !== prevStationInfo.line) {
                                    isInterchange = true;
                                    prevLine = prevStationInfo.line;
                                }
                             }
                             const lineColor = getLineColor(station.line);
                             const interchangeColor = isInterchange && prevLine ? getLineColor(prevLine as any) : '';

                            return (
                                <li key={`${station.id}-${index}`} className="mb-6 ml-6">
                                    <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-background ${lineColor}`}>
                                        <Train className="w-3 h-3 text-white"/>
                                    </span>

                                    <h3 className="font-semibold text-lg">{station.name}</h3>
                                    <Badge style={{backgroundColor: lineColor.replace('bg-','').replace('-500','')}} className={station.line === 'Yellow' ? `text-black` : `text-white`}>
                                        {station.line} {t.route.line}
                                    </Badge>
                                    
                                    {isInterchange && prevLine && (
                                        <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-md border border-accent/50 text-sm">
                                            <p className="font-semibold text-accent-foreground">{t.route.changeLine} {station.line} {t.route.line}</p>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </CardContent>
            </Card>
        </div>
    )
}

export default function RouteResult({ fromId, toId }: { fromId: string, toId: string }) {
    return (
        <Suspense fallback={<RouteLoadingSkeleton />}>
            <RouteDetails fromId={fromId} toId={toId} />
        </Suspense>
    );
}
