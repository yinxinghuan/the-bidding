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
    'hint.act3':            '› three ways to answer him',
    'hint.act4':            '› four ways to answer the priest',
    'hint.act5':            '› six possible last calls',

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

    // ─── Pivot — intro + 5 reveal captions + closing ──────────────────────
    'pivot.intro.title': "Antonescu is gone. Elena walks into Paula's bedroom.",
    'pivot.intro.body':  "From under Paula's bed she drags out her mother-in-law's old wooden keepsake box. There is something in it she has not let herself open in eleven years.",
    'pivot.r1': "Paula's hospital ID bracelet. October 14, 1980. Polizu maternity ward, Bucharest. P-1014-07.",
    'pivot.r2': "Her mother in the maternity hallway that night, holding the newborn. Behind her, by the other doorway — a tall American man and his Romanian wife. The Vance family. They were there too.",
    'pivot.r3': "Paula's 1986 cardiology chart. 'Genetic source undetermined — neither parent shows family history.' Elena underlined it years ago. She never asked why.",
    'pivot.r4': "A 1981 letter from Father Stefan to Elena's mother-in-law. He thanks her for the family's 'donation' — and says the church has put the money to good use.",
    'pivot.r5': "The Polizu birth registry page from October 14, 1980. Two infants, ten minutes apart. The names PAULA and SOPHIA have been crossed out and switched — in the same hand that originally wrote them.",
    'pivot.closing.title': "The child she has raised is not biologically hers.",
    'pivot.closing.body':  "Paula is Maria Vance's daughter — the heart defect runs in the Vance family, not in Elena's. Elena's biological daughter, named Sophia at birth, was given to the Vances eleven years ago and is now in California. Father Stefan arranged the swap. Elena's mother-in-law was paid.",

    // ─── Scene 4 (Stefan) ──────────────────────────────────────────────────
    'title.act4.primary':   'The power has gone out',
    'title.act4.secondary': "Father Stefan Costa, the priest who was at Polizu the night Paula was born. He has come with a family from California. You already know what is in his folder.",
    'title.act4.meta':      '11:30 PM · oil lamp only',

    // ─── Scene 4 hotspot labels ────────────────────────────────────────────
    'hot.act4.h13': "make him leave",
    'hot.act4.h14': "open the folder",
    'hot.act4.h15': "ask him: where is she?",
    'hot.act4.h16': "tell him: I will tell the Vance family everything",

    // ─── Scene 4 examines ──────────────────────────────────────────────────
    'exam.e11': "the Vance family · Carmel, 1990",
    'exam.e12': "Sophia Vance · 5th grade · 1990",
    'exam.e13': "adoption consent — California state",
    'short.e11': 'the family',
    'short.e12': 'Sophia',
    'short.e13': 'the papers',

    // ─── Scene 5 (climax) ──────────────────────────────────────────────────
    'title.act5.primary':   "1:00 AM",
    'title.act5.secondary': "Paula's monitor reads 32. Six numbers on the bedspread. Six possible last calls.",
    'title.act5.meta':      'her last decision',

    'hot.act5.h20': 'call Dr. Mercer back',
    'hot.act5.h21': 'call Antonescu back',
    'hot.act5.h22': 'call Yuri back',
    'hot.act5.h23': "call Stefan back — let her go to California",
    'hot.act5.h24': "don't call anyone — stay with her",
    'hot.act5.h25': "call 070-01",

    // ─── 6 endings ─────────────────────────────────────────────────────────
    'ending.A.title':    'saved with cost',
    'ending.A.tagline':  'Paula opened her eyes on the third day. The boy upstairs did not.',
    'epi.a1': "Paula opened her eyes on the third day. The doctors did not ask where the heart came from.",
    'epi.a2': "The boy upstairs was reported missing on Saturday.",
    'epi.a3': "His mother. Every Saturday she put another poster up. Every Saturday she took the old one down.",
    'epi.a4': "Elena went back to work in 1995. The newspaper was in her drawer. She never let it go.",
    'ending.A.final': "Paula grew up. She did not know whose heart was in her. Elena did. The price of one child is sometimes another.",

    'ending.B.title':    'the Vance family',
    'ending.B.tagline':  "Paula left for California on a Wednesday morning. The right family was waiting.",
    'epi.b1': "Paula landed at LAX on a Wednesday morning.",
    'epi.b2': "By June she was on the beach the Vance family had photographed years before.",
    'epi.b3': "Elena's kitchen got quieter. The oil lamp stayed where it was.",
    'epi.b4': "Paula learned to read Romanian again in her twenties. She never asked Elena why.",
    'ending.B.final': "Two mothers, two daughters, an ocean. The truth was that there was no version of this story in which Elena got to keep both.",

    'ending.C.title':    'lost both',
    'ending.C.tagline':  "Vasilenko's clinic was in the basement. Paula did not wake up.",
    'epi.c1': "Vasilenko's clinic was in the basement of a Soviet apartment block.",
    'epi.c2': "Paula did not wake up. Elena buried her at Belu in March.",
    'epi.c3': "In 1995 Elena flew to Carmel. She saw her biological daughter from across a street. She did not cross.",
    'epi.c4': "Elena returned to the library. She has not left it since.",
    'ending.C.final': "Some endings are silence. Elena learned the shape of hers in the basement at Odessa.",

    'ending.D.title':    'the mother who knew',
    'ending.D.tagline':  "She did not pick up the phone. She picked up Paula instead.",
    'epi.d1': "Elena gathered Paula into her lap and rocked her.",
    'epi.d2': "At 1:47 the monitor flattened.",
    'epi.d3': "She buried her in March at Belu next to her husband.",
    'epi.d4': "Twenty years later Elena retired from the library. The Vance daughter's address never left her drawer.",
    'ending.D.final': "Elena chose her over the deal. Paula died held. There is something to be said for that.",

    'ending.E.title':    'the librarian called the police',
    'ending.E.tagline':  "Fourteen people were arrested by Friday. Andrei is still upstairs.",
    'epi.e1': "Elena dialed 070-01 at 1:08 in the morning.",
    'epi.e2': "Fourteen people were arrested by Friday. Father Stefan kept his.",
    'epi.e3': "Andrei is still upstairs. His mother sleeps now.",
    'epi.e4': "Paula did not make it. Elena pays the rent on the grave every year.",
    'ending.E.final': "Elena did the right thing. The right thing did not save her daughter. Sometimes both are true.",

    'ending.F.title':    'the replacement',
    'ending.F.tagline':  "The Sibiu clinic looked exactly like the brochure. Until 1993.",
    'epi.f1': "The Sibiu clinic looked exactly like the brochure.",
    'epi.f2': "Paula was admitted in March 1992 for follow-up care.",
    'epi.f3': "Her file showed a future date she was not told about.",
    'epi.f4': "The Sibiu clinic was torn down in 2001. The records were not found.",
    'ending.F.final': "Mercer kept her word in the way the very precise keep them: literally. Paula lived. For eighteen months.",

    // ACT 1 hotspot labels (player choices)
    'hot.act1.h1': "lock Paula's door before you open",
    'hot.act1.h2': "bring her to the table — let the doctor see",
    'hot.act1.h3': 'leave her door cracked — let the doctor wonder',

    // ACT 2 hotspot labels
    'hot.act2.h4': 'agree · put the ring on the table',
    'hot.act2.h5': '"let me think" · go check on her',
    'hot.act2.h6': 'probe · do you really have her?',

    // Spoken-line subtitles (videos with TTS dialogue)
    'sub.act2.h6': "Doctor — the girl in the file. Do you really have her?",
    'sub.act4.h15': "Where is she. Where is Sophia.",
    'sub.act4.h16': "I am going to tell them. The Vance family. All of it.",

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
    'hint.act3':            '› 三种回应 Antonescu 的方式',
    'hint.act4':            '› 四种回应神父的方式',
    'hint.act5':            '› 六个可能的最后一通电话',

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

    'pivot.intro.title': 'Antonescu 走了。Elena 走进 Paula 的卧室。',
    'pivot.intro.body':  '她从 Paula 的床底, 拖出婆婆留下的旧木盒。盒子里有什么, 她已经十一年没让自己打开过。',
    'pivot.r1': 'Paula 出生时医院系在她手腕上的塑料 ID 手环。1980 年 10 月 14 日。布加勒斯特 Polizu 妇产医院。编号 P-1014-07。',
    'pivot.r2': '婆婆那晚在产科走廊里, 抱着新生的婴儿。背景的另一道门旁 — 一个高个子美国男人和他的罗马尼亚妻子。Vance 一家。他们那晚也在。',
    'pivot.r3': 'Paula 1986 年的心病记录。「遗传源待查 — 父母双方都无家族史。」Elena 当年用红笔划了这一行。她从没问过为什么。',
    'pivot.r4': 'Stefan 神父 1981 年写给婆婆的信。感谢她家「捐助」的那笔钱, 并说教会已经把钱用在了好的地方。',
    'pivot.r5': '1980 年 10 月 14 日 Polizu 医院的出生登记表。两个婴儿, 间隔十分钟。「PAULA」和「SOPHIA」两个名字被划掉, 互相对调 — 划掉用的是登记员原本写名字时同一支笔。',
    'pivot.closing.title': 'Elena 养大的孩子, 不是她亲生的。',
    'pivot.closing.body':  'Paula 是 Maria Vance 的亲生女儿 — 那个心脏缺陷遗传自 Vance 家, 不在 Elena 家。Elena 自己亲生的女儿, 出生时叫 Sophia, 十一年前被交给了 Vance 一家, 现在在加州。神父 Stefan 安排了这次调包。婆婆收了钱。',

    'title.act4.primary':   '停电了',
    'title.act4.secondary': '神父 Stefan Costa, 1980 年 Paula 出生那晚在 Polizu 的人。他从加州带来了一个家庭。他文件袋里的东西, 你已经知道是什么。',
    'title.act4.meta':      '11:30 PM · 只剩油灯',

    'hot.act4.h13': '让他走',
    'hot.act4.h14': '打开文件袋',
    'hot.act4.h15': '问他: 她在哪里?',
    'hot.act4.h16': '告诉他: 我要把全部告诉 Vance 一家',

    'exam.e11': 'Vance 一家 · Carmel · 1990',
    'exam.e12': 'Sophia Vance · 五年级 · 1990',
    'exam.e13': '收养同意书 · 加州',
    'short.e11': '一家人',
    'short.e12': 'Sophia',
    'short.e13': '同意书',

    'title.act5.primary':   '凌晨 1 点',
    'title.act5.secondary': 'Paula 的监护仪显示 32。床单上摊着六个号码。六个可能的最后一通电话。',
    'title.act5.meta':      '她最后的决定',

    'hot.act5.h20': '回拨 Mercer 医生',
    'hot.act5.h21': '回拨 Antonescu',
    'hot.act5.h22': '回拨 Yuri',
    'hot.act5.h23': '回拨 Stefan — 让她去加州',
    'hot.act5.h24': '谁都不打 — 守着她',
    'hot.act5.h25': '拨 070-01',

    'ending.A.title':    '救活了, 但有代价',
    'ending.A.tagline':  '第三天 Paula 睁开眼睛。楼上那个男孩没有。',
    'epi.a1': '第三天, Paula 睁开了眼睛。医生没问那颗心从哪来。',
    'epi.a2': '周六, 楼上那个男孩被报失踪。',
    'epi.a3': '他妈妈。每个周六她贴一张新海报。每个周六她撕一张旧的。',
    'epi.a4': 'Elena 1995 年回到图书馆。那张报纸在她抽屉里。她从来没扔。',
    'ending.A.final': "Paula 长大了。她不知道她身上的心是谁的。Elena 知道。一个孩子的代价, 有时候是另一个孩子。",

    'ending.B.title':    'Vance 一家',
    'ending.B.tagline':  '周三早上 Paula 飞往加州。等她的是对的家庭。',
    'epi.b1': '周三早上, Paula 落在 LAX。',
    'epi.b2': '六月她已经在 Vance 一家几年前拍照的同一片海滩上。',
    'epi.b3': 'Elena 的厨房变安静了。油灯留在原处。',
    'epi.b4': 'Paula 二十多岁时学会重新读罗马尼亚语。她从来没问 Elena 为什么。',
    'ending.B.final': '两个母亲, 两个女儿, 一片海洋。真相是: 这个故事没有哪个版本能让 Elena 两个都留住。',

    'ending.C.title':    '两个都失去',
    'ending.C.tagline':  'Vasilenko 的诊所在地下室。Paula 没醒过来。',
    'epi.c1': 'Vasilenko 的诊所在一栋苏联公寓楼的地下室。',
    'epi.c2': 'Paula 没醒过来。Elena 三月把她葬在 Belu。',
    'epi.c3': '1995 年, Elena 飞去 Carmel。她隔着一条街看到她的亲生女儿。她没走过去。',
    'epi.c4': 'Elena 回到图书馆。从那以后她没有离开过。',
    'ending.C.final': '有些结局是沉默。Elena 是在敖德萨地下室里学到她自己的沉默是什么形状的。',

    'ending.D.title':    '知道了真相的母亲',
    'ending.D.tagline':  '她没接电话。她接了 Paula。',
    'epi.d1': 'Elena 把 Paula 抱进怀里, 摇着。',
    'epi.d2': '1 点 47 分, 监护仪变成一条直线。',
    'epi.d3': '三月, 她把 Paula 葬在 Belu, 紧挨着她丈夫。',
    'epi.d4': '二十年后 Elena 从图书馆退休。Vance 家女儿的地址从未离开过她抽屉。',
    'ending.D.final': 'Elena 选择了她, 而不是那笔交易。Paula 死在被抱着的状态里。这一点是有意义的。',

    'ending.E.title':    '图书馆员报了警',
    'ending.E.tagline':  '周五之前 14 个人被捕。Andrei 还在楼上。',
    'epi.e1': 'Elena 凌晨 1 点 08 分拨通了 070-01。',
    'epi.e2': '周五之前 14 个人被捕。Stefan 神父保住了自己。',
    'epi.e3': 'Andrei 还在楼上。他妈妈现在睡得着了。',
    'epi.e4': 'Paula 没撑过来。Elena 每年支付一次她那块墓地的租金。',
    'ending.E.final': 'Elena 做了对的事。对的事没能救她女儿。有时候这两件事可以同时是真的。',

    'ending.F.title':    '替代品',
    'ending.F.tagline':  'Sibiu 诊所看上去和宣传册一模一样。直到 1993 年。',
    'epi.f1': 'Sibiu 诊所看上去和宣传册一模一样。',
    'epi.f2': 'Paula 1992 年 3 月入院, 做术后随访。',
    'epi.f3': '她的档案上有一个未来的日期, 没人告诉她。',
    'epi.f4': '2001 年 Sibiu 诊所被拆除。记录没有找到。',
    'ending.F.final': 'Mercer 算守住了承诺 — 用极其精确的人才会守住的那种方式: 字面上的。Paula 活下来了, 活了十八个月。',

    'hot.act1.h1': '先锁好 Paula 的门, 再开',
    'hot.act1.h2': '把她带到桌边, 让医生看见',
    'hot.act1.h3': '门留一道缝, 让医生自己想',

    'hot.act2.h4': '同意 · 把戒指放到桌上',
    'hot.act2.h5': "「让我想想」· 去看看她",
    'hot.act2.h6': '试探 · 你真的有她?',

    'sub.act2.h6': "医生 — 文件里那个女孩, 你真的有她吗?",
    'sub.act4.h15': "她在哪里。Sophia 在哪里。",
    'sub.act4.h16': "我要告诉他们。Vance 一家。全部告诉他们。",

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
