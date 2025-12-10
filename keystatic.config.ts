import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        dailyTrades: collection({
            label: '実践記録 (Daily Trades)',
            slugField: 'date',
            path: 'src/content/daily-trades/*',
            format: { contentField: 'content' },
            schema: {
                date: fields.slug({ name: { label: '日付 (YYYY-MM-DD)' } }),
                image: fields.image({
                    label: 'マンガ画像',
                    directory: 'public/images/daily-trades',
                    publicPath: '/images/daily-trades',
                }),
                pair: fields.select({
                    label: '通貨ペア',
                    options: [
                        { label: 'USD/JPY', value: 'usdjpy' },
                        { label: 'EUR/USD', value: 'eurusd' },
                        { label: 'GBP/JPY', value: 'gbpjpy' },
                        { label: 'Other', value: 'other' },
                    ],
                    defaultValue: 'usdjpy'
                }),
                result: fields.select({
                    label: '結果',
                    options: [
                        { label: '勝ち (Win)', value: 'win' },
                        { label: '負け (Loss)', value: 'loss' },
                        { label: '引き分け (Draw)', value: 'draw' },
                        { label: 'ノートレード (No Trade)', value: 'none' },
                    ],
                    defaultValue: 'none'
                }),
                content: fields.mdx({
                    label: '詳細・反省 (Content)',
                }),
            },
        }),
        fxGuides: collection({
            label: 'FX解説 (Guides)',
            slugField: 'title',
            path: 'src/content/fx-guides/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'タイトル' } }),
                category: fields.select({
                    label: 'カテゴリ',
                    options: [
                        { label: '基礎知識 (Basics)', value: 'basics' },
                        { label: 'テクニカル (Technical)', value: 'technical' },
                        { label: 'リスク管理 (Risk)', value: 'risk' },
                        { label: '本紹介 (Books)', value: 'books' },
                        { label: 'YouTube (YouTube)', value: 'youtube' },
                        { label: 'その他 (Other)', value: 'other' },
                    ],
                    defaultValue: 'basics'
                }),
                content: fields.mdx({
                    label: '本文',
                    options: {
                        image: {
                            directory: 'public/images/guides',
                            publicPath: '/images/guides',
                        }
                    }
                }),
            },
        }),
    },
});
