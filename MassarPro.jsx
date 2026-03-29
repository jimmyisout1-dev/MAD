// src/massar/data/archetypes.js
// ─────────────────────────────────────────────────────────────────
// 12 MassarPro archetypes — deterministic, gender-neutral, tri-lingual.
// Wording preserved exactly from the data contract document.
// ─────────────────────────────────────────────────────────────────

export const ARCHETYPES = [
  {
    id: "mllm",
    code: "MS-MLLM",
    rarity: "RARE",
    icon: "🧠",
    titleLatin: "EL MO3ALLIM",
    titleAr: "المعلّم",
    titleFr: "Le Prof",
    titleEn: "The Teacher",
    viralLine: {
      ar: "كنشرحها ببساطة… وكتدخل للراس. 🧠✨",
      fr: "J'explique simple… et ça rentre direct. 🧠✨",
      en: "I make it click—fast. 🧠✨",
    },
    signatureMove: {
      ar: "كنحوّل المعقّد لخطوات ساهلة.",
      fr: "Je transforme le compliqué en étapes claires.",
      en: "I turn complexity into clear steps.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: كتشرح للناس حتى بلا ما تحس… وكتحس براسك مسؤول على الفهم ديالهم.",
        truth: "الحقيقة: كتحتاج حدّ يطلب منك \"طبقها دابا\" باش ما تبقاش غير فالكلام.",
      },
      fr: {
        looks: "Ça se voit: Tu expliques naturellement… même quand personne te demande.",
        truth: "La vérité: Il te faut un \"passe à l'action maintenant\" pour ne pas rester dans la théorie.",
      },
      en: {
        looks: "Looks like: You naturally teach—without trying.",
        truth: "Truth: You need a 'do it now' push so you don't stay in theory.",
      },
    },
    mirror: {
      ar: {
        pressure: "تحت الضغط كتولي هادئ وكتختار الكلمات بدقّة. كتفكر فالحل قبل ما تهضر.",
        consistency: "باش تبقى ثابت، خاصك شريك/جمهور صغير. إلى كنت بوحدك كتطوّل فالشرح بلا تنفيذ.",
        advantage: "ميزتك: كتفهم الناس بسرعة وكتوصل الفكرة بالطريقة اللي كتخليها تستقر.",
        blindSpot: "نقطة عمياء: كتشرح بزاف وكتأخر التجربة. الحل: طبّق خطوة واحدة مباشرة بعد أي شرح.",
      },
      fr: {
        pressure: "Sous pression, tu restes calme et précis. Tu cherches la clarté, pas le bruit.",
        consistency: "Pour tenir, il te faut un binôme ou un petit public. Seul, tu expliques… sans exécuter.",
        advantage: "Tu lis comment l'autre pense, puis tu simplifies jusqu'à l'évidence.",
        blindSpot: "Trop d'explications, pas assez de pratique. Règle: une mini-action après chaque session.",
      },
      en: {
        pressure: "Under pressure, you go calm and precise. You chase clarity, not noise.",
        consistency: "You need a buddy/small audience. Alone, you may explain… but delay execution.",
        advantage: "You read how people think, then simplify until it clicks.",
        blindSpot: "Explaining > doing. Rule: one micro-action after every study block.",
      },
    },
    hookQuestion: {
      ar: "واش كتشرح مزيان… ولكن كتأجل التطبيق؟ شنو أول حاجة تقدر تطبقها اليوم؟",
      fr: "Tu expliques bien… mais tu exécutes quand exactement ? C'est quoi ton premier pas aujourd'hui ?",
      en: "You explain well—but when do you execute? What's your first step today?",
    },
    shareCaption: {
      ar: "طلع ليا «المعلّم» 🧠✨ كنحوّل أي فكرة لشي مفهوم… شنو طلع ليك؟ 👀 #مسار #MassarPro",
      fr: "J'ai eu «Le Prof» 🧠✨ Je rends le compliqué simple… t'as eu quoi toi ? 👀 #MassarPro",
      en: "I got \"The Teacher\" 🧠✨ What did you get? 👀 #MassarPro",
    },
    statsProfile: {
      stat1Label: { ar: "الفهم", fr: "Clarté", en: "Clarity" },
      stat2Label: { ar: "التأثير", fr: "Impact", en: "Impact" },
      stat3Label: { ar: "الانضباط", fr: "Discipline", en: "Discipline" },
      stat1Hint: "How clearly you absorb + explain",
      stat2Hint: "How much people follow your explanation",
      stat3Hint: "How often you execute, not just talk",
    },
  },
  {
    id: "mhni",
    code: "MS-MHNI",
    rarity: "RARE",
    icon: "🏛️",
    titleLatin: "EL MOHTARIF",
    titleAr: "المحترف",
    titleFr: "Le Pro",
    titleEn: "The Professional",
    viralLine: {
      ar: "كنخدمها بالنّظام… والنتيجة كتقول كلشي. ✅",
      fr: "Je bosse carré… et le résultat parle. ✅",
      en: "Clean work. Loud results. ✅",
    },
    signatureMove: {
      ar: "الجودة قبل السرعة.",
      fr: "Qualité avant vitesse.",
      en: "Quality over speed.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: كتكره العشوائية وكتحترم اللي خدام بنظام.",
        truth: "الحقيقة: كتقدر تخسر فرص زوينة غير حيث كتسنى \"الوقت المناسب\".",
      },
      fr: {
        looks: "Ça se voit: Tu respectes le travail structuré, fiable.",
        truth: "La vérité: Tu peux rater des chances en attendant le \"moment parfait\".",
      },
      en: {
        looks: "Looks like: You value structure and reliability.",
        truth: "Truth: You may miss chances waiting for perfect timing.",
      },
    },
    mirror: {
      ar: {
        pressure: "تحت الضغط كتختار المسار المضمون وكتقلل المخاطرة.",
        consistency: "خاصك روتين واضح + معيار \"شنو كافي\".",
        advantage: "الانضباط ديالك كيخلق ثقة قبل ما تبان النتائج.",
        blindSpot: "كتخاف تجرب جديد باش ما تهبطش الجودة. الحل: جرّب صغير وسريع فمساحة آمنة.",
      },
      fr: {
        pressure: "Sous pression, tu sécurises: solide > flashy.",
        consistency: "Routine claire + seuil \"c'est suffisant\".",
        advantage: "Ta discipline inspire confiance.",
        blindSpot: "Tu testes peu. Fix: mini-test rapide, sans risque.",
      },
      en: {
        pressure: "Safe solid move > flashy.",
        consistency: "Routine + \"good enough\" threshold.",
        advantage: "Discipline builds trust early.",
        blindSpot: "Low experimentation. Fix: small safe tests.",
      },
    },
    hookQuestion: {
      ar: "واش الكمال كيعطلك؟ شنو \"نسخة 70%\" تقدر تطلقها هاد السيمانة؟",
      fr: "Le perfectionnisme te bloque ? C'est quoi ta version \"70%\" que tu peux sortir cette semaine ?",
      en: "What's your 70% version you can ship this week?",
    },
    shareCaption: {
      ar: "طلع ليا «المحترف» ✅ الخدمة عندي معيار… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «Le Pro» ✅ Chez moi c'est carré… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Professional\" ✅ What did you get? 👀 #MassarPro",
    },
    statsProfile: {
      stat1Label: { ar: "الجودة", fr: "Qualité", en: "Quality" },
      stat2Label: { ar: "الثبات", fr: "Constance", en: "Consistency" },
      stat3Label: { ar: "المرونة", fr: "Adaptation", en: "Adaptation" },
      stat1Hint: "How strong your standards are",
      stat2Hint: "How reliably you deliver",
      stat3Hint: "How well you adapt to change",
    },
  },
  {
    id: "hrrk",
    code: "MS-HRRK",
    rarity: "COMMON",
    icon: "⚡",
    titleLatin: "EL MOHARRIK",
    titleAr: "المحرّك",
    titleFr: "Le Booster",
    titleEn: "The Spark",
    viralLine: {
      ar: "كنشعل البداية… وكنجرّي حتى كيتحركو الناس. ⚡",
      fr: "J'allume le départ… et je tire tout le monde. ⚡",
      en: "I spark momentum. ⚡",
    },
    signatureMove: {
      ar: "كنبدأ قبل ما تكمل الخطة.",
      fr: "Je lance avant la perfection.",
      en: "I start before it's perfect.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: كتقدر تشعل الحماس فثانية… وكتكره الروتين.",
        truth: "الحقيقة: إلا ما بانش تقدم سريع، كتطيح الطاقة.",
      },
      fr: {
        looks: "Ça se voit: Tu crées l'énergie vite… routine = non.",
        truth: "La vérité: Sans progrès visible, ta motivation chute.",
      },
      en: {
        looks: "Looks like: You create momentum fast.",
        truth: "Truth: No progress = energy drops.",
      },
    },
    mirror: {
      ar: {
        pressure: "كتقلب على أول ضربة كتفرق وكتخدم بسرعة.",
        consistency: "تحدّي صغير يومي + قياس بسيط للتقدم.",
        advantage: "كتقدر تحرّك فريق وتفتح طريق.",
        blindSpot: "كتسخّن وتبرد. الحل: نقاط ثابتة + مكافأة صغيرة.",
      },
      fr: {
        pressure: "Premier move qui change tout, puis tu fonces.",
        consistency: "Micro-défi + tracking (streak).",
        advantage: "Tu relances l'énergie d'un groupe.",
        blindSpot: "Up/down. Fix: petites victoires mesurables.",
      },
      en: {
        pressure: "First game-changing move then sprint.",
        consistency: "Micro-challenges + tracking.",
        advantage: "You energize teams.",
        blindSpot: "Drops fast. Fix: measurable micro-wins.",
      },
    },
    hookQuestion: {
      ar: "شنو اللي كيشعل فيك الحماس فعلاً؟ وشنو اللي كيطفّيه بسرعة؟",
      fr: "Qu'est-ce qui t'allume… et qu'est-ce qui te coupe net ?",
      en: "What fuels you—and what kills your momentum?",
    },
    shareCaption: {
      ar: "طلع ليا «المحرّك» ⚡ كنبدأ قبل الكلام… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «Le Booster» ⚡ J'allume le game… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Spark\" ⚡ What did you get? 👀",
    },
    statsProfile: {
      stat1Label: { ar: "السرعة", fr: "Vitesse", en: "Speed" },
      stat2Label: { ar: "الجرأة", fr: "Audace", en: "Boldness" },
      stat3Label: { ar: "الثبات", fr: "Stabilité", en: "Stability" },
      stat1Hint: "How quickly you start",
      stat2Hint: "How bold you are with decisions",
      stat3Hint: "How long you stay consistent",
    },
  },
  {
    id: "bnaa",
    code: "MS-BNAA",
    rarity: "RARE",
    icon: "🧱",
    titleLatin: "EL BANNAA",
    titleAr: "البنّاء",
    titleFr: "Le Bâtisseur",
    titleEn: "The Builder",
    viralLine: {
      ar: "كنركّبها قطعة بقطعة… وكنخرجها قوية. 🧱",
      fr: "Pièce par pièce… solide à la fin. 🧱",
      en: "Brick by brick. 🧱",
    },
    signatureMove: {
      ar: "كنمشي خطوة بخطوة بلا ضجيج.",
      fr: "Step-by-step, sans blabla.",
      en: "Quiet execution, steady progress.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: كتخدم فصمت وتفاجئ بالنتيجة.",
        truth: "الحقيقة: التفاصيل كتقدر تعطلّك.",
      },
      fr: {
        looks: "Ça se voit: Tu bosses en silence, résultat solide.",
        truth: "La vérité: Les détails peuvent te ralentir.",
      },
      en: {
        looks: "Looks like: Quiet worker, strong finish.",
        truth: "Truth: Details can slow you down.",
      },
    },
    mirror: {
      ar: {
        pressure: "كتقسم المشكل لصغار وكتحلّهم وحدة بوحدة.",
        consistency: "Checklist قصيرة + مراجعة أسبوعية.",
        advantage: "كتخلق نظام وسط الفوضى وكتحافظ على الجودة.",
        blindSpot: "كتطوّل فالتحسين. الحل: V1 بوقت محدد.",
      },
      fr: {
        pressure: "Tu découpes et tu avances morceau par morceau.",
        consistency: "Checklist courte + revue hebdo.",
        advantage: "Tu structures sans perdre la qualité.",
        blindSpot: "Trop polir. Fix: deadline V1.",
      },
      en: {
        pressure: "Break it down, solve stepwise.",
        consistency: "Short checklist + weekly review.",
        advantage: "Structure + quality.",
        blindSpot: "Over-polish. Fix: V1 deadline.",
      },
    },
    hookQuestion: {
      ar: "شنو \"نسخة أولى\" تقدر تكمّلها فـ48 ساعة؟",
      fr: "C'est quoi ta V1 que tu peux finir en 48h ?",
      en: "What's a V1 you can finish in 48 hours?",
    },
    shareCaption: {
      ar: "طلع ليا «البنّاء» 🧱 كنربح بالثبات… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «Le Bâtisseur» 🧱 Résultat solide… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Builder\" 🧱 What did you get? 👀",
    },
    statsProfile: {
      stat1Label: { ar: "التنفيذ", fr: "Exécution", en: "Execution" },
      stat2Label: { ar: "الدقة", fr: "Précision", en: "Precision" },
      stat3Label: { ar: "الصبر", fr: "Endurance", en: "Endurance" },
      stat1Hint: "How much you build, not talk",
      stat2Hint: "How clean your work is",
      stat3Hint: "How long you persist",
    },
  },
  {
    id: "nazl",
    code: "MS-NAZL",
    rarity: "COMMON",
    icon: "🧭",
    titleLatin: "EL MALLAH",
    titleAr: "الملاّح",
    titleFr: "Le Navigateur",
    titleEn: "The Navigator",
    viralLine: {
      ar: "كنقرا الطريق قبل ما نبدا… وكنوصل بلا ما نضيع. 🧭",
      fr: "Je lis la route avant… j'arrive sans me perdre. 🧭",
      en: "Plan first. Win after. 🧭",
    },
    signatureMove: {
      ar: "كنربط بين الخيارات ونختار الأقل مخاطرة.",
      fr: "Je connecte les options et je sécurise le chemin.",
      en: "I connect options and reduce risk.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: كتفكر فالعواقب قبل ما تدير أي خطوة.",
        truth: "الحقيقة: البداية كتكون أصعب عليك من الطريق.",
      },
      fr: {
        looks: "Ça se voit: Tu penses aux conséquences avant d'agir.",
        truth: "La vérité: Démarrer te coûte plus que continuer.",
      },
      en: {
        looks: "Looks like: You foresee outcomes.",
        truth: "Truth: Starting is the hard part.",
      },
    },
    mirror: {
      ar: {
        pressure: "كتخرج بخطة B/C بلا فوضى.",
        consistency: "خطة A/B/C كتخليك ما تحسّش بالحصار.",
        advantage: "كتسبق المشاكل وتتجنب الغلط.",
        blindSpot: "كتأخر البداية. الحل: أصغر خطوة بلا مخاطرة.",
      },
      fr: {
        pressure: "Plan B/C sans panique.",
        consistency: "A/B/C te garde en mouvement.",
        advantage: "Tu évites les pièges tôt.",
        blindSpot: "Tu retardes le départ. Fix: micro-action.",
      },
      en: {
        pressure: "Backup plans.",
        consistency: "A/B/C keeps you moving.",
        advantage: "Avoids pitfalls.",
        blindSpot: "Delays start. Fix micro-step.",
      },
    },
    hookQuestion: {
      ar: "شنو أصغر خطوة بلا مخاطرة تقدر تديرها اليوم؟",
      fr: "C'est quoi le plus petit pas sans risque aujourd'hui ?",
      en: "What's the smallest zero-risk step today?",
    },
    shareCaption: {
      ar: "طلع ليا «الملاّح» 🧭 كنمشي بالخطة… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «Le Navigateur» 🧭 Plan clair… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Navigator\" 🧭 What did you get? 👀",
    },
    statsProfile: {
      stat1Label: { ar: "التخطيط", fr: "Plan", en: "Planning" },
      stat2Label: { ar: "الحكمة", fr: "Prudence", en: "Prudence" },
      stat3Label: { ar: "الحسم", fr: "Décision", en: "Decision" },
      stat1Hint: "How well you map options",
      stat2Hint: "How well you avoid risky mistakes",
      stat3Hint: "How fast you decide & start",
    },
  },
  {
    id: "qaid",
    code: "MS-QAID",
    rarity: "EPIC",
    icon: "👑",
    titleLatin: "EL QAID",
    titleAr: "القائد",
    titleFr: "Le Leader",
    titleEn: "The Leader",
    viralLine: {
      ar: "كنخلّي الناس يتفاهمو… وكنخرج النتيجة من الجماعة. 👑",
      fr: "Je cadre le groupe… et on sort le résultat. 👑",
      en: "I lead with clarity. 👑",
    },
    signatureMove: {
      ar: "كنقود بالوضوح وبحسم الأولويات.",
      fr: "Je mène par la clarté et les priorités.",
      en: "I turn chaos into priorities.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: الناس كتتبعك حيث كتجيب الوضوح وسط الفوضى.",
        truth: "الحقيقة: كتشدّ بزاف بوحدك وكتتقل.",
      },
      fr: {
        looks: "Ça se voit: On te suit parce que tu clarifies tout.",
        truth: "La vérité: Tu portes trop seul.",
      },
      en: {
        looks: "Looks like: People follow your clarity.",
        truth: "Truth: You carry too much alone.",
      },
    },
    mirror: {
      ar: {
        pressure: "كتفرز المهم من اللي يقدر يتسنى.",
        consistency: "التزام قدّام الناس كيخليك ثابت.",
        advantage: "كتجمع الناس بلا \"منصب\".",
        blindSpot: "ما كتفوّضش. الحل: تفويض واحد فالأسبوع.",
      },
      fr: {
        pressure: "Important vs secondaire, vite.",
        consistency: "Engagement public = stabilité.",
        advantage: "Tu mobilises sans titre.",
        blindSpot: "Délègue peu. Fix: 1 délégation / semaine.",
      },
      en: {
        pressure: "Prioritize fast.",
        consistency: "Public commitment works.",
        advantage: "Mobilize without title.",
        blindSpot: "Low delegation.",
      },
    },
    hookQuestion: {
      ar: "شنو مهمة وحدة تقدر تفوّضها هاد السيمانة؟",
      fr: "C'est quoi UNE chose que tu peux déléguer cette semaine ?",
      en: "What's one thing you can delegate this week?",
    },
    shareCaption: {
      ar: "طلع ليا «القائد» 👑 كنقود بالوضوح… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «Le Leader» 👑 Je mène par la clarté… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Leader\" 👑 What did you get? 👀",
    },
    statsProfile: {
      stat1Label: { ar: "القيادة", fr: "Leadership", en: "Leadership" },
      stat2Label: { ar: "التأثير", fr: "Influence", en: "Influence" },
      stat3Label: { ar: "التنظيم", fr: "Organisation", en: "Organization" },
      stat1Hint: "How naturally you lead",
      stat2Hint: "How much people follow you",
      stat3Hint: "How well you structure teams",
    },
  },
  {
    id: "mqni",
    code: "MS-MQNI",
    rarity: "RARE",
    icon: "🎯",
    titleLatin: "EL MOQNI3",
    titleAr: "المقنِع",
    titleFr: "Le Persuasif",
    titleEn: "The Persuader",
    viralLine: {
      ar: "كنقنع بلا صياح… بالكلام اللي فبلاصتو. 🎯",
      fr: "Je convaincs sans forcer… timing parfait. 🎯",
      en: "Quiet persuasion. Big impact. 🎯",
    },
    signatureMove: {
      ar: "الحُجّة + التوقيت = نتيجتي.",
      fr: "Argument + timing = impact.",
      en: "Argument + timing = impact.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: كتقدر تبدّل رأي الناس بجملة وحدة.",
        truth: "الحقيقة: خاصك القياس باش تبقى ثابت.",
      },
      fr: {
        looks: "Ça se voit: Une phrase bien placée et tu retournes la salle.",
        truth: "La vérité: Il te faut des chiffres pour rester stable.",
      },
      en: {
        looks: "Looks like: You can flip a room with one line.",
        truth: "Truth: You need metrics to stay grounded.",
      },
    },
    mirror: {
      ar: {
        pressure: "كتقلب على \"الجملة الحاسمة\".",
        consistency: "هدف اجتماعي (عرض/نقاش) كيخليك شاعل.",
        advantage: "كتجيب الدعم بسرعة.",
        blindSpot: "كتتهرب من القياس. الحل: KPI واحد/أسبوع.",
      },
      fr: {
        pressure: "La phrase décisive.",
        consistency: "Objectif social régulier.",
        advantage: "Support rapide.",
        blindSpot: "Mesure faible. Fix KPI hebdo.",
      },
      en: {
        pressure: "Decisive line.",
        consistency: "Social targets.",
        advantage: "Fast support.",
        blindSpot: "Track a KPI.",
      },
    },
    hookQuestion: {
      ar: "شنو رقم واحد غادي تراقبو هاد الشهر؟",
      fr: "C'est quoi LE chiffre que tu suis ce mois-ci ?",
      en: "What's the one metric you'll track this month?",
    },
    shareCaption: {
      ar: "طلع ليا «المقنِع» 🎯 كنقنع بالهدوء… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «Le Persuasif» 🎯 Timing + كلام فبلاصتو… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Persuader\" 🎯 What did you get? 👀",
    },
    statsProfile: {
      stat1Label: { ar: "الإقناع", fr: "Persuasion", en: "Persuasion" },
      stat2Label: { ar: "الجرأة", fr: "Audace", en: "Boldness" },
      stat3Label: { ar: "القياس", fr: "Mesure", en: "Tracking" },
      stat1Hint: "How persuasive you are",
      stat2Hint: "How bold your moves are",
      stat3Hint: "How much you track results",
    },
  },
  {
    id: "mbd3",
    code: "MS-MBD3",
    rarity: "RARE",
    icon: "🎨",
    titleLatin: "EL MOBDI3",
    titleAr: "المبدع",
    titleFr: "L'Artiste",
    titleEn: "The Creator",
    viralLine: {
      ar: "كنشوف اللي ما كيتشافش… وكنقلبو لحاجة كتخدم. 🎨",
      fr: "Je vois l'angle que personne capte… et je le rends utile. 🎨",
      en: "I see patterns others miss. 🎨",
    },
    signatureMove: {
      ar: "إبداع عملي، ماشي غير أفكار.",
      fr: "Créatif, mais concret.",
      en: "Creative, but practical.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: كتولد الأفكار وكتشوف الربط.",
        truth: "الحقيقة: خاصك إطار بسيط باش تنفذ.",
      },
      fr: {
        looks: "Ça se voit: Idées et connexions rares.",
        truth: "La vérité: Il te faut un cadre simple.",
      },
      en: {
        looks: "Looks like: Rare connections.",
        truth: "Truth: Need structure to execute.",
      },
    },
    mirror: {
      ar: {
        pressure: "كتبدّل الزاوية بدل الصدام.",
        consistency: "فصل \"الإبداع\" عن \"التنفيذ\".",
        advantage: "حلول جديدة كتجيك بسرعة.",
        blindSpot: "الروتين كيطفيك. الحل: إطار صغير ثابت.",
      },
      fr: {
        pressure: "Tu changes d'angle.",
        consistency: "Création ≠ exécution.",
        advantage: "Idées neuves.",
        blindSpot: "Routine = baisse. Fix cadre minimal.",
      },
      en: {
        pressure: "Change angle.",
        consistency: "Create vs execute.",
        advantage: "Novel ideas.",
        blindSpot: "Routine kills you.",
      },
    },
    hookQuestion: {
      ar: "شنو فكرة وحدة غادي تحوّلها لواقع فـ7 أيام؟",
      fr: "Quelle UNE idée tu rends réelle en 7 jours ?",
      en: "Which ONE idea becomes real in 7 days?",
    },
    shareCaption: {
      ar: "طلع ليا «المبدع» 🎨 كنبدّل الزاوية وكنلقى الحل… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «L'Artiste» 🎨 Je change l'angle… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Creator\" 🎨 What did you get? 👀",
    },
    statsProfile: {
      stat1Label: { ar: "الإبداع", fr: "Créa", en: "Creativity" },
      stat2Label: { ar: "التنفيذ", fr: "Exécution", en: "Execution" },
      stat3Label: { ar: "الأصالة", fr: "Originalité", en: "Originality" },
      stat1Hint: "Idea generation",
      stat2Hint: "Turning ideas into outputs",
      stat3Hint: "Uniqueness of thinking",
    },
  },
  {
    id: "7aris",
    code: "MS-7ARIS",
    rarity: "COMMON",
    icon: "🛡️",
    titleLatin: "EL 7ARIS",
    titleAr: "الحارس",
    titleFr: "Le Gardien",
    titleEn: "The Sentinel",
    viralLine: {
      ar: "كنحافظ على الوتيرة… وكنربح بالاستمرار. 🛡️",
      fr: "Je garde le rythme… je gagne au long terme. 🛡️",
      en: "Consistency wins. 🛡️",
    },
    signatureMove: {
      ar: "الاستمرار هو السلاح ديالي.",
      fr: "La constance, c'est mon arme.",
      en: "Consistency is my weapon.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: كتربح بالاستمرار.",
        truth: "الحقيقة: المفاجآت كتقلقك حتى كتعاود توازن.",
      },
      fr: {
        looks: "Ça se voit: Tu gagnes à la constance.",
        truth: "La vérité: L'imprévu te dérègle.",
      },
      en: {
        looks: "Looks like: You outlast hype.",
        truth: "Truth: Chaos disrupts you.",
      },
    },
    mirror: {
      ar: {
        pressure: "كتشدّ فالطريقة المضمونة.",
        consistency: "روتين صغير + مكافأة أسبوعية.",
        advantage: "كتسبق اللي كيعولو على الحماس.",
        blindSpot: "العشوائية كتضرك. الحل: خطة احتياطية.",
      },
      fr: {
        pressure: "Méthode sûre.",
        consistency: "mini-rituel + reward.",
        advantage: "Long terme.",
        blindSpot: "imprévu. Fix plan B.",
      },
      en: {
        pressure: "Safe method.",
        consistency: "mini-ritual + reward.",
        advantage: "long-term win.",
        blindSpot: "chaos. Fix backup plan.",
      },
    },
    hookQuestion: {
      ar: "شنو روتين صغير تقدر تحافظ عليه حتى فأسوأ أسبوع؟",
      fr: "C'est quoi ton mini-rituel même dans ta pire semaine ?",
      en: "What's your tiny routine even on bad weeks?",
    },
    shareCaption: {
      ar: "طلع ليا «الحارس» 🛡️ كنربح بالاستمرار… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «Le Gardien» 🛡️ Constance > hype… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Sentinel\" 🛡️ What did you get? 👀",
    },
    statsProfile: {
      stat1Label: { ar: "الثبات", fr: "Constance", en: "Consistency" },
      stat2Label: { ar: "الانضباط", fr: "Discipline", en: "Discipline" },
      stat3Label: { ar: "التحمل", fr: "Endurance", en: "Endurance" },
      stat1Hint: "How steady you are",
      stat2Hint: "How disciplined your routine is",
      stat3Hint: "How you handle long effort",
    },
  },
  {
    id: "m7lll",
    code: "MS-M7LLL",
    rarity: "COMMON",
    icon: "🔍",
    titleLatin: "EL MO7ALLIL",
    titleAr: "المحلّل",
    titleFr: "L'Analyste",
    titleEn: "The Analyst",
    viralLine: {
      ar: "كنحلّلها فصمت… وكنخرج بقرار صائب. 🔍",
      fr: "Je calcule en silence… décision propre. 🔍",
      en: "Silent analysis. Sharp decision. 🔍",
    },
    signatureMove: {
      ar: "كنحوّل الضباب لخطة واضحة.",
      fr: "Je clarifie le flou.",
      en: "I turn fog into plan.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: كتلقا الغلط قبل ما يبان.",
        truth: "الحقيقة: بلا موعد نهائي كتغرق فالتفكير.",
      },
      fr: {
        looks: "Ça se voit: Tu vois l'erreur avant les autres.",
        truth: "La vérité: Sans deadline, tu sur-analyses.",
      },
      en: {
        looks: "Looks like: You catch mistakes early.",
        truth: "Truth: No deadline = overthinking.",
      },
    },
    mirror: {
      ar: {
        pressure: "كتقيس الاحتمالات وكتتفادى القرار المتسرع.",
        consistency: "deadlines قصيرة كتخرجك من الدوامة.",
        advantage: "كتزيد الجودة وكتنقص الغلط.",
        blindSpot: "كتطلب كمال. الحل: قرر بـ80%.",
      },
      fr: {
        pressure: "Tu gardes le contrôle.",
        consistency: "deadlines courtes.",
        advantage: "qualité ↑ erreurs ↓",
        blindSpot: "perfection. Fix 80%.",
      },
      en: {
        pressure: "controlled.",
        consistency: "short deadlines.",
        advantage: "quality upgrade.",
        blindSpot: "perfectionism.",
      },
    },
    hookQuestion: {
      ar: "إمتى غادي تحسم قرار واحد نهائي؟",
      fr: "Tu tranches QUAND sur une décision ?",
      en: "When will you decide?",
    },
    shareCaption: {
      ar: "طلع ليا «المحلّل» 🔍 كنقرا التفاصيل اللي كتفلت… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «L'Analyste» 🔍 Je capte les détails… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Analyst\" 🔍 What did you get? 👀",
    },
    statsProfile: {
      stat1Label: { ar: "التحليل", fr: "Analyse", en: "Analysis" },
      stat2Label: { ar: "الدقة", fr: "Précision", en: "Precision" },
      stat3Label: { ar: "الحسم", fr: "Décision", en: "Decision" },
      stat1Hint: "How deep you analyze",
      stat2Hint: "How accurate you are",
      stat3Hint: "How fast you decide",
    },
  },
  {
    id: "rayd",
    code: "MS-RAYD",
    rarity: "EPIC",
    icon: "🚀",
    titleLatin: "EL RAYED",
    titleAr: "الرائد",
    titleFr: "Le Pionnier",
    titleEn: "The Pioneer",
    viralLine: {
      ar: "كنجرّب قبل ما يطلبو مني… وكنبني طريق جديد. 🚀",
      fr: "Je teste avant tout le monde… je trace la route. 🚀",
      en: "I move first. 🚀",
    },
    signatureMove: {
      ar: "كنغامر بحساب، ماشي بتهور.",
      fr: "Risque… mais calculé.",
      en: "Calculated risk.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: كتزهق من العادي وكتقلب على الجديد.",
        truth: "الحقيقة: بلا مشروع حيّ كتتشتت.",
      },
      fr: {
        looks: "Ça se voit: Le normal t'ennuie.",
        truth: "La vérité: Sans projet vivant, dispersion.",
      },
      en: {
        looks: "Looks like: You chase novelty.",
        truth: "Truth: No live project = scattered focus.",
      },
    },
    mirror: {
      ar: {
        pressure: "كتتعلم بسرعة وكتقلب على طريق خارج القاعدة.",
        consistency: "مشروع واحد حيّ 30 يوم.",
        advantage: "كتسبق التغيير وتستغل الفرص.",
        blindSpot: "الملل السريع. الحل: تنويع داخل نفس الهدف.",
      },
      fr: {
        pressure: "voie hors cadre.",
        consistency: "un projet 30 jours.",
        advantage: "avance tôt.",
        blindSpot: "ennui. Fix variation interne.",
      },
      en: {
        pressure: "out-of-box path.",
        consistency: "one project 30 days.",
        advantage: "early mover.",
        blindSpot: "boredom.",
      },
    },
    hookQuestion: {
      ar: "شنو المشروع الواحد اللي غادي تركز عليه 30 يوم؟",
      fr: "C'est quoi LE projet que tu portes 30 jours ?",
      en: "What ONE project will you commit to for 30 days?",
    },
    shareCaption: {
      ar: "طلع ليا «الرائد» 🚀 كنمشي قدّام وكنتعلم فالطريق… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «Le Pionnier» 🚀 J'avance avant tout le monde… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Pioneer\" 🚀 What did you get? 👀",
    },
    statsProfile: {
      stat1Label: { ar: "الجرأة", fr: "Audace", en: "Boldness" },
      stat2Label: { ar: "الابتكار", fr: "Innovation", en: "Innovation" },
      stat3Label: { ar: "التركيز", fr: "Focus", en: "Focus" },
      stat1Hint: "How bold you are",
      stat2Hint: "How original your moves are",
      stat3Hint: "How well you commit",
    },
  },
  {
    id: "mzan",
    code: "MS-MZAN",
    rarity: "RARE",
    icon: "⚖️",
    titleLatin: "EL MIZAN",
    titleAr: "المُتوازن",
    titleFr: "L'Équilibré",
    titleEn: "The Balancer",
    viralLine: {
      ar: "كنوازن بين العقل والقلب… بلا ما نضيع. ⚖️",
      fr: "Je garde l'équilibre… cerveau + cœur. ⚖️",
      en: "Balance is my superpower. ⚖️",
    },
    signatureMove: {
      ar: "كنختار اللي كيعيشني مزيان اليوم وغدا.",
      fr: "Je choisis ce qui tient aujourd'hui ET demain.",
      en: "I choose what works now and later.",
    },
    coldReading: {
      ar: {
        looks: "ظاهر عليك: ما كتتباعش بسهولة بالكلام الكبير… كتقلب على المعنى.",
        truth: "الحقيقة: كتمشي فالوسط حتى كتضيع الاختيار. خاصك تحسم.",
      },
      fr: {
        looks: "Ça se voit: Tu n'achètes pas le hype. Tu veux du sens.",
        truth: "La vérité: À force d'équilibrer, tu peux retarder le choix.",
      },
      en: {
        looks: "Looks like: You don't buy hype—you want meaning.",
        truth: "Truth: Over-balancing can delay decisions.",
      },
    },
    mirror: {
      ar: {
        pressure: "كتولي واقعي وكتقلب على حلّ \"يخدم\" بدل الصراع.",
        consistency: "باش تبقى ثابت: حدّد 2 أولويات فقط (مثلاً: النقاط + مهارة).",
        advantage: "كتقدر تجمع بين الدراسة والحياة بلا ما تحترق.",
        blindSpot: "كتتجنب الحسم. الحل: قرار واحد + تجربة أسبوع.",
      },
      fr: {
        pressure: "Tu restes lucide, tu cherches une solution qui marche.",
        consistency: "2 priorités max (notes + skill).",
        advantage: "Tu avances sans te cramer.",
        blindSpot: "Tu évites de trancher. Fix: 1 choix + 1 semaine test.",
      },
      en: {
        pressure: "You stay realistic and practical.",
        consistency: "2 priorities max.",
        advantage: "You progress without burnout.",
        blindSpot: "Decision avoidance. Fix: one choice + one-week test.",
      },
    },
    hookQuestion: {
      ar: "واش كتوازن بزاف حتى كتأخر القرار؟ شنو اختيار واحد غادي تجربو أسبوع واحد؟",
      fr: "Tu veux trop équilibrer ? Quel choix tu testes 1 semaine pour trancher ?",
      en: "Are you delaying decisions? What will you test for one week?",
    },
    shareCaption: {
      ar: "طلع ليا «المتوازن» ⚖️ كنقلب على اللي يخدم اليوم وغدا… شنو طلع ليك؟ 👀 #MassarPro",
      fr: "J'ai eu «L'Équilibré» ⚖️ Je veux du solide, pas du hype… t'as eu quoi ? 👀 #MassarPro",
      en: "I got \"The Balancer\" ⚖️ What did you get? 👀",
    },
    statsProfile: {
      stat1Label: { ar: "التوازن", fr: "Équilibre", en: "Balance" },
      stat2Label: { ar: "الواقعية", fr: "Réalisme", en: "Practicality" },
      stat3Label: { ar: "الحسم", fr: "Décision", en: "Decision" },
      stat1Hint: "How well you manage life + study",
      stat2Hint: "How practical your choices are",
      stat3Hint: "How quickly you commit",
    },
  },
];

// ─────────────────────────────────────────────────────────────────
// ARCHETYPES_BY_ID — fast lookup
// ─────────────────────────────────────────────────────────────────
export const ARCHETYPES_BY_ID = Object.fromEntries(
  ARCHETYPES.map(a => [a.id, a])
);

// ─────────────────────────────────────────────────────────────────
// getArchetypeById
// ─────────────────────────────────────────────────────────────────
export function getArchetypeById(id) {
  return ARCHETYPES_BY_ID[id] || ARCHETYPES_BY_ID["mzan"];
}

// ─────────────────────────────────────────────────────────────────
// computeRarity — deterministic, threshold-based
// ─────────────────────────────────────────────────────────────────
export function computeRarity(confidence) {
  const c = Math.round(Number(confidence) || 0);
  if (c >= 80) return "EPIC";
  if (c >= 60) return "RARE";
  return "COMMON";
}

// ─────────────────────────────────────────────────────────────────
// makeSerialId — deterministic, no randomness
// seed is any stable integer (e.g. sum of char codes of traits)
// ─────────────────────────────────────────────────────────────────
export function makeSerialId(archetypeCode, seed) {
  const s = Math.abs(Math.round(seed || 0)) % 999;
  const n = String(s).padStart(3, "0");
  return `${archetypeCode}-${n}`;
}

// ─────────────────────────────────────────────────────────────────
// pickArchetype — deterministic trait → archetype mapping
// Rules (from spec): no gender logic, no sports push.
// ─────────────────────────────────────────────────────────────────
export function pickArchetype(profile) {
  const {
    traits = {},
    learnerType = "",
    journeyStage = "postbac",
    strengths = [],
    topClusterId = "",
    confidence = 0,
  } = profile || {};

  const tr = {
    analytical:  Number(traits.analytical  || 0),
    social:      Number(traits.social      || 0),
    structure:   Number(traits.structure   || 0),
    creativity:  Number(traits.creativity  || 0),
    risk:        Number(traits.risk        || 0),
    leadership:  Number(traits.leadership  || 0),
  };

  // Find highest trait
  const traitEntries = Object.entries(tr).sort((a, b) => b[1] - a[1]);
  const [topTrait, topVal] = traitEntries[0] || ["structure", 0.5];
  const [secondTrait]      = traitEntries[1] || ["analytical", 0.5];

  // Mixed-signals: if top two traits are very close (< 0.06 apart)
  const isMixed = traitEntries.length > 1 &&
    Math.abs(traitEntries[0][1] - traitEntries[1][1]) < 0.06;

  // Tie-breaker signals
  const hasTeachingStrength = strengths.some(s =>
    ["teaching", "s_writing", "s_speaking", "s_learning"].includes(s)
  );
  const isPlanner = learnerType === "sentinel" || learnerType === "architect";
  const isMomentum = learnerType === "striker" || learnerType === "sprinter";
  const needsRoutine = tr.structure < 0.4 && tr.risk < 0.4;

  // Teaching strength → mllm
  if (hasTeachingStrength && tr.social >= 0.45) {
    return getArchetypeById("mllm");
  }

  // Learner-type tie-breakers
  if (isMomentum && tr.risk >= 0.4) return getArchetypeById("hrrk");
  if (isPlanner && tr.analytical < 0.5) return getArchetypeById("nazl");
  if (needsRoutine) return getArchetypeById("7aris");

  // Mixed signals → mzan
  if (isMixed && topVal < 0.55) return getArchetypeById("mzan");

  // Primary mapping
  switch (topTrait) {
    case "leadership":
      return getArchetypeById("qaid");

    case "analytical":
      // If also strong structure: analyst; otherwise navigator
      return tr.structure >= 0.5
        ? getArchetypeById("m7lll")
        : getArchetypeById("nazl");

    case "structure":
      return confidence >= 55
        ? getArchetypeById("mhni")
        : getArchetypeById("bnaa");

    case "creativity":
      return getArchetypeById("mbd3");

    case "social":
      return confidence >= 55
        ? getArchetypeById("mqni")
        : getArchetypeById("mllm");

    case "risk":
      // High risk + high creativity → pioneer; else spark
      return tr.creativity >= 0.5
        ? getArchetypeById("rayd")
        : getArchetypeById("hrrk");

    default:
      return getArchetypeById("mzan");
  }
}

// ─────────────────────────────────────────────────────────────────
// computeDeterministicStats — derive 3 stat values from traits
// stat1 = (structure + analytical) / 2 × 100
// stat2 = (leadership + social) / 2 × 100
// stat3 = (risk + creativity) / 2 × 100
// ─────────────────────────────────────────────────────────────────
export function computeDeterministicStats(traits) {
  const tr = traits && typeof traits === "object" ? traits : {};
  const s = (x, y) => Math.round(((Number(tr[x]) || 0.5) + (Number(tr[y]) || 0.5)) / 2 * 100);
  return {
    stat1: s("structure", "analytical"),
    stat2: s("leadership", "social"),
    stat3: s("risk", "creativity"),
  };
}
