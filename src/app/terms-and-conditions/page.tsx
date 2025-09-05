
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Translations } from '@/lib/translations';

export default function TermsAndConditionsPage() {
    const t = Translations.en.termsAndConditions;

    return (
        <div className="container mx-auto max-w-4xl p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-primary">{t.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-muted-foreground">
                    <p className="text-sm text-muted-foreground">{t.lastUpdated}</p>
                    <p>{t.p1}</p>
                    <p>{t.p2}</p>
                    <p>{t.p3}</p>
                    <p>{t.p4}</p>
                    <p>{t.p5}</p>
                    <p>{t.p6}</p>
                </CardContent>
            </Card>
        </div>
    );
}
