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
    'title.act2.primary':   'first buyer · 9:00 PM',
    'title.act2.secondary': 'Dr. Karen Mercer · Boston, formerly',
    'title.act2.meta':      'she takes off her coat',

    // ACT 1 hotspot labels (player choices)
    'hot.act1.h1': 'lock her bedroom door',
    'hot.act1.h2': 'sit beside her, brush her hair',
    'hot.act1.h3': 'leave the door cracked',

    // ACT 2 hotspot labels
    'hot.act2.h4': 'agree · put the ring on the table',
    'hot.act2.h5': '"let me think" · go check on her',
    'hot.act2.h6': 'probe · do you really have her?',

    // Hints
    'hint.act1': 'three ways to receive them',
    'hint.act2': "three ways to answer the doctor",

    // Examine card captions
    'exam.e1': "Elena's appointment list, 8 January 1991",
    'exam.e2': "Paula's ECG · Spitalul Marie Curie",
    'exam.e3': 'what Elena can pay with tonight',
    'exam.e4': 'Paula, sleeping',
    'exam.e5': "Dr. Mercer · Boston Globe · July 1986",
    'exam.e6': "Hungarian donor referral · pediatric",
    'exam.e7': "Klinik Sibiu · post-operative brochure",

    // Short labels for the inline ExamineRow (1-2 words each)
    'short.e1': 'the list',
    'short.e2': 'her ECG',
    'short.e3': 'the purse',
    'short.e4': 'Paula',
    'short.e5': 'the clipping',
    'short.e6': 'the donor',
    'short.e7': 'the clinic',

    // UI
    'btn.continue': '› continue',
    'btn.examine':  'examine',
    'btn.close':    'close',
  },
  zh: {
    'title.act1.primary':   '布加勒斯特 · 第 6 区',
    'title.act1.secondary': '晚 8:00 · 周二 · 1991 年 1 月 8 日',
    'title.act1.meta':      '电只到 11:00 PM',
    'title.act2.primary':   '第一位买家 · 9:00 PM',
    'title.act2.secondary': 'Karen Mercer 医生 · 前波士顿',
    'title.act2.meta':      '她脱了大衣',

    'hot.act1.h1': '把卧室门锁上',
    'hot.act1.h2': '坐在她身边,抚她头发',
    'hot.act1.h3': '把门留一道缝',

    'hot.act2.h4': '同意 · 把戒指放到桌上',
    'hot.act2.h5': "「让我想想」· 去看看她",
    'hot.act2.h6': '试探 · 你真的有她?',

    'hint.act1': '三种接客方式',
    'hint.act2': '三种回应医生的方式',

    'exam.e1': 'Elena 的预约名单, 1991 年 1 月 8 日',
    'exam.e2': "Paula 的心电图 · Marie Curie 医院",
    'exam.e3': 'Elena 今晚能付出的全部',
    'exam.e4': 'Paula, 睡着',
    'exam.e5': "Mercer 医生 · 波士顿环球报 · 1986 年 7 月",
    'exam.e6': "匈牙利捐献者档案 · 儿科",
    'exam.e7': "Sibiu 诊所 · 术后宣传册",

    'short.e1': '名单',
    'short.e2': '心电图',
    'short.e3': '钱包',
    'short.e4': 'Paula',
    'short.e5': '剪报',
    'short.e6': '捐献者',
    'short.e7': '诊所',

    'btn.continue': '› 继续',
    'btn.examine':  '细看',
    'btn.close':    '关闭',
  },
};

export function t(key: string): string {
  return STRINGS[LOCALE]?.[key] ?? STRINGS.en[key] ?? key;
}

export function getLocale(): Locale { return LOCALE; }
