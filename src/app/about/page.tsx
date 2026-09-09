'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Code } from 'lucide-react';
import { useLanguage } from '@/context/language-provider';

export default function AboutPage() {
    const { t } = useLanguage();
    const features = [
        t.about.feature1,
        t.about.feature2,
        t.about.feature3,
    ];
    const techStack = t.about.techStack;

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
                        <h3 className="text-xl font-headline font-semibold mb-3">{t.about.techTitle}</h3>
                        <p className="text-muted-foreground mb-4">{t.about.techDescription}</p>
                         <ul className="space-y-4">
                            {techStack.map((tech, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-4">
                                        <Code className="h-5 w-5 text-primary" />
                                    </div>

                                    <div>
                                        <h4 className="font-semibold">{tech.name}</h4>
                                        <p className="text-muted-foreground">{tech.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
