import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Translations } from '@/lib/translations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Kolkata Metro Guide',
    description: 'Privacy Policy for the Kolkata Metro Guide application.',
};

export default function PrivacyPolicyPage() {
    const t = Translations.en.privacyPolicy;

    return (
        <div className="container mx-auto max-w-4xl p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-primary">{t.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-muted-foreground">
                    <p>{t.p1}</p>
                    <p>{t.p2}</p>
                    <p>{t.p3}</p>
                    <p>{t.p4}</p>
                    <p>{t.p5}</p>
                    <p>{t.p6}</p>
                    <p>{t.p7}</p>
                </CardContent>
            </Card>
        </div>
    );
}
