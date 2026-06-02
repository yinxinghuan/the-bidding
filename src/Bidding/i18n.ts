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
    // Prologue paragraphs
    'prologue.p1': 'Bucharest. January 1991.',
    'prologue.p2': 'A year after Ceaușescu was shot, the country is still trying to figure out what it is.',
    'prologue.p3': 'Elena Marin is 38. Her husband was killed at University Square in December \'89. Her daughter Paula, 11, has weeks left unless someone finds her a heart.',
    'prologue.p4': 'Tonight, in her third-floor apartment, four black-market buyers will visit her, one after the other. Each claims to have one for sale.',
    'prologue.p5': 'Right now, the first one is on her landing.',
    'prologue.cta': 'open the door',

    // ─── Scene 1: Mercer at the door ───────────────────────────────────────
    'title.act1.primary':   'Someone is at the door',
    'title.act1.secondary': "The first buyer. You have a minute before you open. Paula is in the next room — how should the doctor meet her?",
    'title.act1.meta':      "8:58 PM · Tuesday · 8 Jan 1991",
    'hint.act1':            '› three ways to receive her',

    // ─── Scene 2: Mercer is inside (varies by Scene 1 choice) ──────────────
    'title.act2.primary':           'Dr. Karen Mercer is here',
    'title.act2.secondary.hidden':  "She does not know there is a child in this apartment. She wants $20,000 cash for a heart, tonight.",
    'title.act2.secondary.seated':  "She has seen Paula. Her face did not change. She wants $20,000 cash for a heart, tonight.",
    'title.act2.secondary.glimpse': "She keeps glancing past you toward the bedroom door. She wants $20,000 cash for a heart, tonight.",
    'title.act2.secondary':         "She wants $20,000 cash for a heart, tonight.",  // fallback
    'title.act2.meta':              '9:04 PM',
    'hint.act2':                    "› three ways to answer her",

    // To-be-continued panel (after act 2 in the pilot build)
    'tbc.title':  'to be continued',
    'tbc.body':   'In the next act, the ex-Securitate officer arrives. Then the Russian. Then the priest with the truth Elena will not be able to take back. Six endings, depending on what she is willing to trade tonight.',
    'tbc.note':   'ACT 3 — 5 are being built. Come back soon.',

    // ACT 1 hotspot labels (player choices)
    'hot.act1.h1': "lock Paula's door before you open",
    'hot.act1.h2': "bring her to the table — let the doctor see",
    'hot.act1.h3': 'leave her door cracked — let the doctor wonder',

    // ACT 2 hotspot labels
    'hot.act2.h4': 'agree · put the ring on the table',
    'hot.act2.h5': '"let me think" · go check on her',
    'hot.act2.h6': 'probe · do you really have her?',

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
    'prologue.p1': '布加勒斯特。1991 年 1 月。',
    'prologue.p2': 'Ceaușescu 被枪决一年后, 这个国家还在试着搞清楚自己是什么。',
    'prologue.p3': 'Elena Marin, 38 岁。她丈夫 1989 年 12 月在 University Square 革命中被乱枪打死。女儿 Paula 11 岁, 先天心脏病, 撑不过几周, 除非有人给她一颗心。',
    'prologue.p4': '今晚, 她三楼的公寓, 4 个黑市买家会一个接一个来。每个人都说自己有一颗。',
    'prologue.p5': '此刻, 第一个买家已经站在她的楼道里。',
    'prologue.cta': '开门',

    'title.act1.primary':   '门外有人',
    'title.act1.secondary': '第一个买家。你还有一分钟才开门。Paula 在隔壁房间 — 你想让医生怎么看见她?',
    'title.act1.meta':      '晚 8:58 · 周二 · 1991 年 1 月 8 日',
    'hint.act1':            '› 三种接客方式',

    'title.act2.primary':           'Mercer 医生进来了',
    'title.act2.secondary.hidden':  '她不知道这间公寓里有孩子。她要两万美元现金, 今晚, 换一颗心。',
    'title.act2.secondary.seated':  '她看见了 Paula。脸上没有变化。她要两万美元现金, 今晚, 换一颗心。',
    'title.act2.secondary.glimpse': '她的目光不断往卧室门口瞟。她要两万美元现金, 今晚, 换一颗心。',
    'title.act2.secondary':         '她要两万美元现金, 今晚, 换一颗心。',
    'title.act2.meta':              '9:04 PM',
    'hint.act2':                    '› 三种回应方式',

    'tbc.title':  '未完待续',
    'tbc.body':   '下一幕里, 前 Securitate 大队长来了。然后是俄国人。然后是带着 Elena 收不回真相的神父。6 种结局, 看她今晚愿意拿什么换。',
    'tbc.note':   'ACT 3 — 5 正在制作中。请稍后回来。',

    'hot.act1.h1': '先锁好 Paula 的门, 再开',
    'hot.act1.h2': '把她带到桌边, 让医生看见',
    'hot.act1.h3': '门留一道缝, 让医生自己想',

    'hot.act2.h4': '同意 · 把戒指放到桌上',
    'hot.act2.h5': "「让我想想」· 去看看她",
    'hot.act2.h6': '试探 · 你真的有她?',

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
