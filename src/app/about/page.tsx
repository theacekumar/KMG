import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { Translations } from '@/lib/translations';

export default function AboutPage() {
    const t = Translations.en;
    const features = [
        t.about.feature1,
        t.about.feature2,
        t.about.feature3,
        t.about.feature4,
    ];
    const techStack = [
        t.about.tech1,
        t.about.tech2,
        t.about.tech3,
    ];

    return (
        <div className="container mx-auto max-w-4xl p-4 md:p-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline text-primary">{t.about.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-lg text-muted-foreground">
                        {t.about.description}
                    </p>

                    <div>
                        <h3 className="text-xl font-headline font-semibold mb-3">{t.about.features}</h3>
                        <ul className="space-y-2">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-headline font-semibold mb-3">{t.about.techStack}</h3>
                         <ul className="space-y-2">
                            {techStack.map((tech, index) => (
                                <li key={index} className="flex items-center">
                                    <CheckCircle className="h-5 w-5 text-blue-500 mr-3" />
                                    <span>{tech}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
