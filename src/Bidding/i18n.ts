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

    // ─── Scene 3 (Antonescu) ───────────────────────────────────────────────
    'title.act3.primary':   "He doesn't take off the coat",
    'title.act3.secondary': "Virgil Antonescu, ex-Securitate. He says he can get a heart for $5,000 and one signed lie. His bodyguard is waiting in your stairwell.",
    'title.act3.meta':      '10:30 PM · second buyer',

    // ─── Scene 3 hotspot labels (Antonescu choices) ────────────────────────
    'hot.act3.h7': 'ask him for proof',
    'hot.act3.h8': 'sign what he gives you',
    'hot.act3.h9': "first, take my husband's name off your list",

    // ─── Scene 3 examines ──────────────────────────────────────────────────
    'exam.e8':  "the Securitate informant list · 1989",
    'exam.e9':  "Andrei Popescu, 4th grade · 1990",
    'exam.e10': "Antonescu's business card",
    'short.e8': 'the list',
    'short.e9': 'the boy',
    'short.e10':'his card',

    // ─── Pivot reveal captions ─────────────────────────────────────────────
    'pivot.r1': "1980. Polizu. The bracelet they tied around her wrist.",
    'pivot.r2': "My mother in the maternity ward. The night Paula was born. The Vance family — they were there too.",
    'pivot.r3': "'Genetic source undetermined.' I underlined this years ago. I never asked.",
    'pivot.r4': "Father Stefan wrote to my mother in 1981. About the 'donation' she made.",
    'pivot.r5': "October 14, 1980. The names were crossed out. Paula is not mine. Sophia is.",

    // To-be-continued panel (still shown after ACT 3 pivot until ACT 4 ships)
    'tbc.title':  'to be continued',
    'tbc.body':   'Father Stefan is on his way up the stairs. He does not know that Elena has found the registry page. He is bringing the same secret he buried in 1980 — and an American family that wants their daughter back.',
    'tbc.note':   'ACT 4 — 5 next. Come back soon.',

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

    'title.act3.primary':   '他没脱大衣',
    'title.act3.secondary': '前 Securitate 大队长 Virgil Antonescu。他说能搞到一颗心 — 五千美元加一份假证词。他的保镖在你楼道里等。',
    'title.act3.meta':      '10:30 PM · 第二个买家',

    'hot.act3.h7': '让他给你证据',
    'hot.act3.h8': '签下他给你的东西',
    'hot.act3.h9': '先把我丈夫的名字从你的名单上划掉',

    'exam.e8':  '1989 年 Securitate 线人名单',
    'exam.e9':  'Andrei Popescu · 四年级 · 1990',
    'exam.e10': 'Antonescu 的名片',
    'short.e8': '名单',
    'short.e9': '男孩',
    'short.e10':'名片',

    'pivot.r1': '1980 年。Polizu。他们绑在她手腕上的那个手环。',
    'pivot.r2': '产科走廊里的妈妈。Paula 出生那一晚。Vance 一家 — 他们也在。',
    'pivot.r3': "「遗传源待查」。我多年前用红笔划过这一行。我从没问过。",
    'pivot.r4': '神父 Stefan 1981 年给妈妈的信。讲她家「捐助」的那笔钱。',
    'pivot.r5': '1980 年 10 月 14 日。两个名字被划掉对调了。Paula 不是我的。Sophia 才是。',

    'tbc.title':  '未完待续',
    'tbc.body':   '神父 Stefan 正在爬上楼梯。他不知道 Elena 已经翻出了那份出生登记。他带着自己 1980 年埋下的同一个秘密 — 还有一个想要回亲生女儿的美国家庭。',
    'tbc.note':   '接下来 ACT 4 — 5。请稍后回来。',

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
