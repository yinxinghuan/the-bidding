// The Bidding — minimal i18n (en / zh).
// Strings are mostly atmospheric or document captions; some are choice labels.

type Locale = 'zh' | 'en';

const STORAGE_KEY = 'bidding_locale';

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';
  try {
    const override = window.localStorage.getItem(STORAGE_KEY);
    if (override === 'zh' || override === 'en') return override;
  } catch {}
  const nav = (typeof navigator !== 'undefined' ? navigator.language : 'en') || 'en';
  return nav.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

const LOCALE: Locale = detectLocale();

const STRINGS: Record<Locale, Record<string, string>> = {
  en: {
    // Title cards
    'title.act1.primary':   'Bucharest · Sector 6',
    'title.act1.secondary': '8:00 PM · Tuesday · 8 January 1991',
    'title.act1.meta':      'electricity until 11:00 PM',

    // ACT 1 hotspot labels (player choices)
    'hot.act1.h1': 'lock her bedroom door',
    'hot.act1.h2': 'dress her, seat her at the table',
    'hot.act1.h3': 'leave the door cracked',

    // ACT 1 hint
    'hint.act1': 'three ways to receive them',

    // Examine card captions
    'exam.e1': "Elena's appointment list, 8 January 1991",
    'exam.e2': "Paula's ECG · Spitalul Marie Curie",
    'exam.e3': 'what Elena can pay with tonight',
    'exam.e4': 'Paula, sleeping',

    // UI
    'btn.continue': 'continue',
    'btn.examine':  'examine',
    'btn.close':    'close',
  },
  zh: {
    'title.act1.primary':   '布加勒斯特 · 第 6 区',
    'title.act1.secondary': '晚 8:00 · 周二 · 1991 年 1 月 8 日',
    'title.act1.meta':      '电只到 11:00 PM',

    'hot.act1.h1': '把卧室门锁上',
    'hot.act1.h2': '给她穿好, 让她坐在桌边',
    'hot.act1.h3': '把门留一道缝',

    'hint.act1': '三种接客方式',

    'exam.e1': 'Elena 的预约名单, 1991 年 1 月 8 日',
    'exam.e2': "Paula 的心电图 · Marie Curie 医院",
    'exam.e3': 'Elena 今晚能付出的全部',
    'exam.e4': 'Paula, 睡着',

    'btn.continue': '继续',
    'btn.examine':  '细看',
    'btn.close':    '关闭',
  },
};

export function t(key: string): string {
  return STRINGS[LOCALE]?.[key] ?? STRINGS.en[key] ?? key;
}

export function getLocale(): Locale { return LOCALE; }
