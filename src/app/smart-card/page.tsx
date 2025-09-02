import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, Star, Ticket, Percent, Briefcase } from 'lucide-react';
import { Translations } from '@/lib/translations';

export default function SmartCardPage() {
    const t = Translations.en;
    const benefits = t.smartCard.benefitsList;
    const touristCardTypes = t.smartCard.touristCard.types;

    return (
        <div className="container mx-auto max-w-4xl p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-primary flex items-center">
                        <Ticket className="mr-3 h-8 w-8" />
                        {t.smartCard.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold font-headline mb-3">{t.smartCard.whatIsTitle}</h2>
                        <p className="text-lg text-muted-foreground">
                            {t.smartCard.whatIsDescription}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold font-headline mb-3">{t.smartCard.pricingTitle}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="bg-muted/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-xl">
                                        <IndianRupee className="mr-2 h-5 w-5" /> {t.smartCard.cardCostTitle}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{t.route.rupees}{t.smartCard.cardCostValue}</p>
                                    <p className="text-muted-foreground mt-1">{t.smartCard.cardCostDescription}</p>
                                </CardContent>
                            </Card>
                            <Card className="bg-muted/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-xl">
                                        <IndianRupee className="mr-2 h-5 w-5" /> {t.smartCard.rechargeTitle}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{t.route.rupees}{t.smartCard.rechargeValue}</p>
                                    <p className="text-muted-foreground mt-1">{t.smartCard.rechargeDescription}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold font-headline mb-3">{t.smartCard.benefitsTitle}</h2>
                        <ul className="space-y-3">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                    <Badge variant="secondary" className="mr-3 mt-1 flex-shrink-0">
                                        {index === 0 ? <Percent className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                                    </Badge>
                                    <span className="text-muted-foreground">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-semibold font-headline mb-3">{t.smartCard.howToUseTitle}</h2>
                        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                            <li>{t.smartCard.howToUseStep1}</li>
                            <li>{t.smartCard.howToUseStep2}</li>
                            <li>{t.smartCard.howToUseStep3}</li>
                        </ol>
                    </section>
                </CardContent>
            </Card>

             <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-primary flex items-center">
                        <Briefcase className="mr-3 h-8 w-8" />
                        {t.smartCard.touristCard.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-lg text-muted-foreground">
                        {t.smartCard.touristCard.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {touristCardTypes.map((card, index) => (
                             <Card key={index} className="bg-muted/50">
                                <CardHeader>
                                    <CardTitle className="text-xl">{card.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{t.route.rupees}{card.price}</p>
                                    <p className="text-muted-foreground mt-1">{card.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                     <ul className="space-y-3 text-muted-foreground">
                        {t.smartCard.touristCard.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                                <Star className="h-4 w-4 text-accent mr-3 mt-1 flex-shrink-0" />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

        </div>
    );
}
