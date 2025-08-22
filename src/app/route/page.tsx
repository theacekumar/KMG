'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle, Train, IndianRupee, Clock, Footprints, GitBranch } from 'lucide-react';

import { useLanguage } from '@/context/language-provider';
import { getRouteDetails, getStationById, getLineColor } from '@/lib/routing';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function RouteResult() {
    const searchParams = useSearchParams();
    const { t } = useLanguage();

    const fromId = searchParams.get('from');
    const toId = searchParams.get('to');

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
                             const isFirst = index === 0;
                             const isLast = index === path.length - 1;
                             let isInterchange = false;
                             if(index > 0 && station.line !== path[index-1].line && station.id === 'esplanade'){
                                isInterchange = true;
                             }

                            return (
                                <li key={station.id} className="mb-6 ml-6">
                                    <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-4 ring-background ${getLineColor(station.line)}`}>
                                        <Train className="w-3 h-3 text-white"/>
                                    </span>
                                    <h3 className="font-semibold text-lg">{station.name}</h3>
                                    <Badge variant={station.line === 'Blue' ? 'default' : 'secondary'} className={`${getLineColor(station.line)} text-white`}>
                                        {station.line} {t.route.line}
                                    </Badge>
                                    {isInterchange && (
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


export default function RoutePage() {
    return (
        <div className="container mx-auto max-w-4xl p-4 md:p-8">
            <Suspense fallback={<div>Loading...</div>}>
                <RouteResult />
            </Suspense>
        </div>
    );
}
