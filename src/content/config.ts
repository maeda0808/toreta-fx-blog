import { defineCollection, z } from 'astro:content';

const dailyTradesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        image: z.string().optional(),
        pair: z.enum(['usdjpy', 'eurusd', 'gbpjpy', 'other']).optional(),
        result: z.enum(['win', 'loss', 'draw', 'none']).optional(),
    }),
});

const fxGuidesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        category: z.enum(['basics', 'technical', 'risk', 'books', 'youtube', 'other']).default('basics'),
    }),
});

export const collections = {
    'daily-trades': dailyTradesCollection,
    'fx-guides': fxGuidesCollection,
};
