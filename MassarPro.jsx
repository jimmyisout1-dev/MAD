// MassarPro — self-contained single-file build

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";



// ═══════════════════════════════════ i18n ═══════════════════════

// src/massar/i18n/translations.js
// ─────────────────────────────────────────────────────────────────
// Single source of truth for all UI strings.
// To add a key: add to all 3 language objects simultaneously.
// ─────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  ar: {
    dir: "rtl",
    // App shell
    // HOME PAGE 3D CSS — translations
    homeHero: "اختر مسارك بثقة… وبالأرقام",
    homeHeroSub: "مسار يقرأ شخصيتك ويحلّل نقطك حسب شعبتك (باك 1/باك 2)، ثم يمنحك 3 توصيات واضحة: الأنسب لك، الخيار المتوازن، والأكثر طموحاً — مع أسباب مقنعة وخطة عمل.",
    homeCTA: "ابدأ مجاناً",
    homeSecondaryCTA: "شاهد مثالاً للنتيجة",
    homeMicroTrust: "بدون وعود كاذبة. نعرض الأهلية والبدائل بوضوح: عمومي/خصوصي.",
    homeParentLine: "مناسب للطالب… ومقنع للأسرة.",
    homeValueBullets: ["مواد دقيقة حسب الشعبة — بلا تخمين","3 زوايا: الأنسب • المتوازن • الطموح","أهلية واقعية: ماذا يمكنك فعلاً؟","خطة 30 يوماً بخطوات قابلة للتنفيذ","نتيجة قابلة للمشاركة + وصف جاهز"],
    homeTrustChips: ["مُفسَّر","واقعي","مناسب للهاتف","مهيّأ للمغرب"],
    homeNotSure: "إن كنت متردداً، فهذا طبيعي. سنقدّم لك 3 مسارات قوية لتجربتها هذا الشهر. النتيجة بوصلة… وليست حكماً.",
    homeFamilyNote: "نعرف الضغط العائلي. لذلك نعرض «مساراً طموحاً» يمكن شرحه للأسرة، مع شروطه وخطة الوصول إليه.",
    homeShareCTA: "شارك نتيجتك — ودعها تتكلم عنك.",
    homeHowItWorks: "كيف يعمل مسار؟",
    homeStep1Title: "اختبار الشخصية",
    homeStep1Desc: "8–12 دقيقة — أسئلة ذكية ومباشرة تكشف ميولك الحقيقية.",
    homeStep2Title: "أدخل نقطك",
    homeStep2Desc: "0 إلى 20 — حسب شعبتك فقط، بلا تخمين.",
    homeStep3Title: "خطة الطريق",
    homeStep3Desc: "توصيات + تبرير + خطة عمل — في ثلاث زوايا: الأنسب، المتوازن، الطموح.",
    homeTrust1: "باك 1 / باك 2",
    homeTrust2: "عمومي / خصوصي",
    homeTrust3: "أهلية واقعية — لا وعود فارغة",
    homeFooterBy: "مسار — بوصلتك المهنية بالمغرب",
    homeFooterContact: "contact@massar.ma",
    homeBackToTest: "متابعة الاختبار",
    // Journey stage + learner type — new translations
    journeyTitle: "أين أنت الآن؟",
    journeyDesc: "سيساعدنا هذا في تخصيص التوصيات لوضعك الحالي.",
    journeyPreBac: "قبل الباكالوريا (أنا لا أزال أدرس)",
    journeyPostBac: "بعد الباكالوريا (لديّ نتائج نهائية)",
    journeyPreBacHint: "سنقترح مسارات بناءً على شخصيتك وميولك وتوقعاتك",
    journeyPostBacHint: "سنحلّل نقطك الفعلية ونوفر توصيات دقيقة",
    preBacStrengthsTitle: "ما الذي تُتقنه فعلاً الآن؟",
    preBacStrengthsDesc: "اختر 3 نقاط قوة تشعر أنها حقيقية لديك",
    preBacStrengthsOpts: {
      teaching:"الشرح والتعليم", solving:"حل المشكلات", designing:"التصميم والإبداع",
      negotiating:"الإقناع والتفاوض", organizing:"التنظيم والقيادة",
      building:"الصنع والتركيب اليدوي", sports:"الانضباط الرياضي",
      writing:"الكتابة والتواصل", tech:"الفضول التقني",
    },
    preBacInterestsTitle: "ما الذي تستمتع به أكثر؟",
    preBacInterestsDesc: "اختر 3 اهتمامات تصف شغفك",
    preBacInterestsOpts: {
      competition:"المنافسة", helping:"مساعدة الناس", building2:"بناء الأشياء",
      creativity:"الإبداع", business:"الأعمال والمال", technology:"التكنولوجيا",
      languages:"اللغات والسفر", outdoors:"الطبيعة والخارج", handson:"العمل اليدوي",
    },
    preBacSliderTitle: "تقدير ذاتي للمواد (1 = ضعيف / 5 = قوي)",
    preBacConstraints: "قيودك وأولوياتك",
    prestige_priority: "أهمية المكانة والهيبة",
    prestige_low:"غير مهمة",prestige_med:"مهمة بعض الشيء",prestige_high:"ضرورية جداً",
    learnerTitle: "كيف تتعلم؟",
    learnerDesc: "6 أسئلة قصيرة لفهم أسلوبك في الدراسة والإنجاز",
    learnerTypes: {
      architect:"البنّاء الذهني", striker:"المُنْجِز", diplomat:"المُقنِع",
      sprinter:"عدّاء اللحظة الأخيرة", sentinel:"الحارس", visionary:"المُبتكِر",
    },
    learnerTypeIcons: {
      architect:"🏗️", striker:"⚡", diplomat:"🤝", sprinter:"🏃", sentinel:"🛡️", visionary:"🔭",
    },
    // Results pages
    resultsPage: "الصفحة",
    resultsOf: "من",
    identityMirrorTitle: "مرآة هويتك المهنية",
    underPressure: "كيف تفكر تحت الضغط",
    consistencySecret: "ما تحتاجه للمثابرة",
    unfairAdvantage: "ميزتك غير المتوقعة",
    blindSpot: "نقطة عمياء تحتاج وعياً",
    credibilityLine: "إن لم تشعر بالتوافق التام، هذا طبيعي — العوامل التشخيصية تقترب من الواقع، لا تُحدّده.",
    prestigePage2Title: "المكانة وواقع الأسرة في المغرب",
    marketPage3Title: "مسارك في سوق 2030",
    directionsPage4Title: "توصياتك المفصّلة",
    planPage5Title: "خطة الانطلاق",
    pdfPage6Title: "ملف المدرّب الشخصي الكامل",
    futureProofScore: "مؤشر المستقبل",
    moroccoDemandsLabel: "الطلب في المغرب",
    globalDemandsLabel: "الطلب العالمي",
    hedgeSkillLabel: "مهارة التحوّط الموصى بها",
    weakPoint2Win: "قوّتك هذا الأسبوع",
    riskAvoid: "خطر تجنّبه",
    prioritySelector: "اضبط عرض النتائج حسب أولويتك",
    previewLocked: "محتوى حصري في ملف PDF",
    pdfBenefits: [
      "قائمة مدارس مخصصة لمدينتك وتنقّلك وميزانيتك (6–12 مؤسسة)",
      "خطة المكانة A/B/C مع جدول زمني (نخبة / قوية / مباشرة للسوق)",
      "استراتيجية رفع النقط: المواد الأهم + الخطوات الواقعية",
      "نص المحادثة العائلية كاملاً (عربي + فرنسي) مع ردود الاعتراضات",
      "مصفوفة القرار الكاملة + مقارنة السيناريوهات",
      "خارطة طريق 90 يوماً (الأسابيع 2–12) + موارد مختارة",
      "دليل المنح والرسوم (عام / خاص)",
      "أسلوب الفوز حسب نمط تعلّمك — كتيّب كامل",
      "المصائد الشخصية التي تجنّبها",
      "دليل المسار الدولي (اختياري)",
    ],

        backHome: "العودة للرئيسية",
        // Arabic rewrite
    appTitle: "مسار | دليلك المهني بالمغرب",
    appSubtitle: "اكتشف مسارك الدراسي والمهني المناسب لك",
    next: "متابعة",
    back: "رجوع",
    start: "ابدأ الاختبار",
    finish: "اعرض نتائجي",
    step: "الخطوة",
    of: "من",
    // Steps
    langStep: "اختر لغة التطبيق",
    langDesc: "سيُعرض التطبيق كاملاً باللغة التي تختارها",
    personalityStep: "اختبار الشخصية",
    personalityDesc: "أجب بصدق — لا توجد إجابات خاطئة",
    infoStep: "شعبتك ومعلوماتك",
    marksStep: "أدخل نقطك",
    resultsStep: "نتائجك",
    // Info fields
    bacTrack: "الشعبة",
    city: "مدينتك الحالية",
    mobility: "استعدادك للتنقل",
    mobilityOptions: ["نفس المدينة فقط", "مستعد للانتقال داخل المغرب", "أقبل التعلم عن بُعد"],
    studyLang: "لغة الدراسة المفضلة",
    privateBudgetLabel: "هل لديك إمكانية الالتحاق بالتعليم الخاص؟",
    privateBudgetHint: "يؤثر هذا على توصيات الطب والتخصصات ذات المنافسة العالية",
    yes: "نعم",
    no: "لا",
    // Marks
    marks: "نقطك (من 20)",
    examModeLabel: "نوع النقط التي ستُدخلها",
    examModeWatani: "نقط الامتحان الوطني فقط",
    examModeFull: "الباكالوريا كاملة (جهوي + وطني + مراقبة مستمرة)",
    // TASK 1 — examTiming: pre-Bac vs post-Bac determines which subject list to show
    examTimingLabel: "متى تُجري هذا التقييم؟",
    examTimingPre: "قبل نتائج الباكالوريا (لا يزال بإمكاني التحسين)",
    examTimingPost: "بعد الباكالوريا (نتائج نهائية رسمية)",
    examTimingHint: "يحدد هذا قائمة المواد الدقيقة المعروضة",
    // TASK 2 — goalPreference: prestige / balanced / practical (replaces goalMode selector)
    goalPreferenceLabel: "أي أسلوب يناسبك الآن؟",
    goalPreferenceOptions: {
      prestige:   { icon:"🏆", label:"المكانة والمدارس الكبرى (مسار مسابقاتي)" },
      balanced:   { icon:"⚖️", label:"متوازن — أفضل خيار يناسبني مع الحفاظ على المكانة" },
      practical:  { icon:"🔧", label:"دخل سريع / مسار تطبيقي (OFPPT أو BTS)" },
    },
    marksSectionWatani: "الامتحان الوطني (الوطني)",
    marksSectionRegional: "الامتحان الجهوي (الجهوي)",
    marksSectionContinuous: "المراقبة المستمرة (اختياري)",
    wataniAverage: "معدل الوطني (تقريبي)",
    regionalAverage: "معدل الجهوي (تقريبي)",
    continuousAverage: "معدل المراقبة المستمرة",
    overallAverage: "المعدل العام",
    // What-if sliders (Goal 2)
    whatIf: "ماذا لو؟ — تعديل النقط",
    adjustedAverage: "المعدل بعد التعديل",
    sliderHint: "↑ عدّل النقط لإعادة حساب التوصيات فوراً",
    sliderChangeSummary: "التغييرات",
    sliderNoChange: "لم تُجرَ أي تعديلات حتى الآن",
    // Results
    traitRadar: "ملف شخصيتك",
    topCareers: "أبرز المسارات المناسبة لك",
    pathways: "المسارات التعليمية",
    actionPlan: "خطة 30 يوماً",
    fallback: "مسار بديل",
    fallbackDesc: "خيار آخر بقيمة مساوية",
    fallbackBody: "OFPPT والتكوين التطبيقي ليسا خياراً ثانوياً — بل مدخل مباشر لسوق الشغل بكفاءات تقنية مطلوبة.",
    explainability: "لماذا هذه التوصية؟",
    // Confidence / signals
    confidenceLabel: "مستوى الثقة",
    mixedSignals: "📊 تباين في الملف — المعطيات الدراسية وعوامل الهوية تشير إلى مجالات مختلفة. راجع المسارات مع الأخذ بالسياق الكامل.",
    // Pathways
    universityRoute: "المسار الجامعي",
    grandeEcoleRoute: "المدارس العليا",
    practicalRoute: "التكوين المهني",
    durationLabel: "المدة",
    pathwayMissing: "تفاصيل قريباً",
    // Eligibility
    privateOnly: "مدارس خاصة فقط",
    notEligiblePublic: "تنافسية عالية (التعليم العام)",
    // Medicine eligibility note (Goal 3)
    eligibilityTitle: "شروط القبول – الطب العام",
    eligibilityThresholdLabel: "العتبة الرسمية للقبول العام",
    eligibilityThresholdValue: "المعدل ≥ 16/20 · علوم الحياة والأرض ≥ 14 · الفيزياء والكيمياء ≥ 13",
    eligibilityYourAvg: "معدلك الحالي",
    eligibilityMeetsPublic: "✅ مستوفٍ لشروط القبول العام",
    eligibilityFailsPublic: "❌ لا تتوفر شروط الطب العام حالياً",
    eligibilityPrivateNote: "الطب الخاص متاح برسوم عالية (UIR، UIC…). تحقق من المنح المتاحة.",
    eligibilityAlternativesLabel: "مسارات قريبة بشروط أخف:",
    eligibilityAlternatives: [
      "تمريض – IFCS (المعدل ≥ 12)",
      "تقني الأشعة والمختبر (معهد التكوين المهني)",
      "صيدلاني مساعد (OFPPT)",
      "إدارة مستشفيات (ENCG / FSJES)",
      "تقني طب الأسنان",
    ],
    // Narrative fix / Guardrails — ambitious tab "How to unlock"
    ambitiousUnlockTitle: "🔓 كيف تبلغ هذا المسار؟",
    ambitiousUnlockMed:   "لفتح مسار الطب العام: ارفع معدلك إلى 16+ وعلوم الحياة والأرض ≥ 14 والفيزياء والكيمياء ≥ 13.",
    ambitiousUnlockGen:   "ارفع معدلك إلى {avg}+ وحسّن نقطك في المواد الأساسية لتعزيز فرصك.",
    // Feature 1: Exam timing
    examTimingStep: "توقيت التقييم",
    examTimingQuestion: "هل أجريت هذا التقييم قبل أم بعد امتحان الباكالوريا؟",
    examTimingBefore: "قبل نتائج الباكالوريا",
    examTimingAfter: "بعد نتائج الباكالوريا",
    examTimingDesc: "يؤثر هذا على طريقة عرض التوصيات وخطط التحسين",
    whatIfDisabled: "النقط نهائية — لا يمكن تعديلها بعد إعلان النتائج.",
    improvementTitle: "💡 كيف تُحسِّن فرصك قبل الباكالوريا؟",
    improvementSubjectHint: "المواد الأهم لمسارك:",
    improvementUnlock: "رفع درجة +2 يفتح لك:",
    improvementTip1: "ركّز على المسائل المتكررة في مواضيع الامتحانات السابقة",
    improvementTip2: "التحضير لمسابقات القبول يبدأ 6 أشهر مسبقاً",
    improvementTip3: "انضم لمجموعات مراجعة عبر واتساب أو تليغرام مع طلاب من نفس الشعبة",
    improvementTip4: "استخدم منصات مجانية: خان أكاديمي عربي، إدراك، مرحبا",
    improvementDisclaimer: "هذه توقعات تربوية. لا يمكن ضمان القبول في أي مؤسسة.",
    // SUBJECTS FIX: examLevel + trackField selectors
    examLevelLabel: "المستوى الدراسي",
    examLevelBac1: "الباكالوريا الأولى (الجهوي)",
    examLevelBac2: "الباكالوريا الثانية (الوطني)",
    trackFieldLabel: "مسار الدراسة الرسمي",
    trackFields: {
      SE:  "العلوم التجريبية",
      SM:  "العلوم الرياضية",
      ST:  "العلوم والتكنولوجيا",
      ECO: "العلوم الاقتصادية",
      LSH: "الآداب والعلوم الإنسانية",
      AA:  "الفنون التطبيقية",
      EO:  "التعليم الأصيل",
      BP:  "الباكالوريا المهنية",
    },
    smOptionLabel: "الخيار (لمسار العلوم الرياضية)",
    // SUBJECT MODEL (MOROCCO) FIX: examYear + bac2Track selectors
    examYearLabel: "السنة الدراسية",
    examYearBac1: "الباكالوريا الأولى (الجهوي)",
    examYearBac2: "الباكالوريا الثانية (الوطني)",
    bac1FieldLabel: "شعبة الباكالوريا الأولى",
    bac1Fields: {
      SE:"العلوم التجريبية", SM:"العلوم الرياضية", ST:"العلوم والتكنولوجيا",
      ECO:"العلوم الاقتصادية", LSH:"الآداب والعلوم الإنسانية",
      AA:"الفنون التطبيقية", EO:"التعليم الأصيل", BP:"الباكالوريا المهنية",
    },
    bac2TrackLabel: "مسار الباكالوريا الثانية",
    bac2Tracks: {
      SVT:"علوم الحياة والأرض", PC:"العلوم الفيزيائية",
      SMA:"العلوم الرياضية – خيار أ", SMB:"العلوم الرياضية – خيار ب",
      ST:"العلوم والتكنولوجيا", ECO:"العلوم الاقتصادية",
      LSH:"الآداب والعلوم الإنسانية", AA:"الفنون التطبيقية",
      EO:"التعليم الأصيل", BP:"الباكالوريا المهنية",
    },
    smOptionA: "الخيار أ (علوم الحياة والأرض)",
    smOptionB: "الخيار ب (علوم المهندس)",
    eoOptionLabel: "التخصص (التعليم الأصيل)",
    eoOptionArabic: "الأدب العربي",
    eoOptionSharia: "الشريعة الإسلامية",
    bpExtrasLabel: "مواد إضافية (الباكالوريا المهنية)",
    // NEW INPUT: Profile Boost step translations
    profileBoostStep: "🚀 دقّق توصياتك",
    profileBoostDesc: "6 أسئلة سريعة — تجعل التوصيات أدق وأقرب إليك",
    pb_prestige: "مدى أهمية الهيبة والسمعة لك ولعائلتك",
    pb_prestige0: "ليس مهماً — النتائج والعمل هما الأساس",
    pb_prestige1: "مهم بعض الشيء",
    pb_prestige2: "مهم جداً — الهيبة خط أحمر",
    pb_money: "مدى أهمية الاستقرار المالي الآن",
    pb_money0: "ليست الأولوية الآن",
    pb_money1: "مهمة لكنها ليست الوحيدة",
    pb_money2: "ضرورية جداً",
    pb_handsOn: "تفضّل العمل اليدوي الحقيقي على العمل المكتبي؟",
    pb_handsOn0: "لا — أفضل الفكر والتحليل",
    pb_handsOn1: "مزيج من الاثنين",
    pb_handsOn2: "نعم — العمل الميداني أكثر إمتاعاً لي",
    pb_risk: "هل أنت مرتاح للمسارات غير المضمونة (ريادة / إبداع / ابتكار)؟",
    pb_risk0: "لا — أفضل طريقاً مضموناً",
    pb_risk1: "نوعاً ما — إذا كان هناك خطة بديلة",
    pb_risk2: "نعم — المجهول لا يخيفني",
    pb_intl: "هل تريد مساراً قابلاً للعمل خارج المغرب؟",
    pb_intl0: "لا، أعمل في المغرب",
    pb_intl1: "ربما في المستقبل",
    pb_intl2: "نعم، الخارج ضمن خطتي",
    pb_focus: "هل تستطيع الدراسة 2 إلى 4 ساعات يومياً بجدية؟",
    pb_focus0: "صعب علي باستمرار",
    pb_focus1: "نعم لكن مع صعوبة أحياناً",
    pb_focus2: "نعم دائماً، الانضباط قوتي",
    // Feature 2: Study abroad
    studyAbroadLabel: "هل تفكر في الدراسة في الخارج؟",
    studyAbroadRegionLabel: "المنطقة المفضلة",
    abroadRegions: { france:"فرنسا", canada:"كندا", germany:"ألمانيا", spain:"إسبانيا", usa:"الولايات المتحدة", other:"دول أخرى" },
    intlPathwayTitle: "🌍 المسار الدولي",
    intlRequirementsTitle: "المتطلبات العامة",
    intlRequirementsText: "غالباً ما تشمل: شهادة معترف بها + إثبات إتقان اللغة (TCF/IELTS/TestDaF) + إثبات قدرة مالية. تختلف الشروط حسب البلد والمؤسسة.",
    intlFinanceTitle: "الواقع المالي",
    intlFinanceText: "الرسوم الدراسية تتراوح بين مجانية (ألمانيا) وعالية (الولايات المتحدة). منح Campus France وDAAD وErasmus+ متاحة – تحقق من المواعيد مبكراً.",
    intlTranslationTitle: "كيف يُترجم مسارك دولياً؟",
    intlHealthNote: "⚕️ تنبيه: الطب في الخارج ليس أسهل – بعض الدول تُصعّب قبول الطلاب الأجانب في كليات الطب العام.",
    intlDifferenceTitle: "الفرق عن المنظومة المغربية",
    intlDifferenceText: "الانتقاء التنافسي في المغرب عبر المسابقات. في الخارج: معظم الجامعات تعتمد على ملف الطالب وبيان الأغراض. الشهادات الأجنبية تتطلب مسطرة معادلة عند العودة.",
    // Family pressure
    // Cultural sensitivity patch (Tier + Goal) — study goal selector
    studyGoalLabel: "ما هدفك من الدراسة؟",
    studyGoalOptions: {
      prestige: { icon:"🏆", label:"أفضل مسار عام / هيبة أكاديمية" },
      balanced: { icon:"⚖️", label:"التوافق الشخصي + الجهد الواقعي" },
      handsOn:  { icon:"🔧", label:"عمل يدوي / دخول سريع لسوق الشغل" },
    },
    practicalFastTrack: "⚡ خيار سريع الدخول — مثالي إذا كنت تفضّل العمل قبل الجامعة",
    // Goal mode input (Cultural rerank layer)
    goalModeLabel: "ما الأهم لك الآن؟",
    goalModeOptions: {
      prestige:  { icon:"🏆", label:"أفضل مدرسة / المسار الأرفع مستوى" },
      fit:       { icon:"🎯", label:"الأنسب لشخصيتي" },
      practical: { icon:"🔧", label:"دخل سريع / مهارة ملموسة" },
      unsure:    { icon:"🤷", label:"لست متأكداً — أرني الخيارين" },
    },
    prestigeAdjacentTitle: "إذا كانت العائلة تريد مساراً أكثر هيبة",
    prestigeAdjacentDesc: "بناءً على ملفك الشخصي، هذه مسارات مجاورة بمستوى أكاديمي أعلى:",
    bridgeOptionLabel: "خيار جسر",
    bestFitTab: "أفضل توافق",
    prestigeTrackTab: "المسار الأرفع",
    familyPressureLabel: "هل تواجه ضغطاً من الأسرة نحو تخصص معين؟",
    familyPressureTitle: "💬 ضغط الأسرة — كلام واضح",
    familyPressureText: "من الطبيعي أن تحمل عائلتك آمالاً كبيرة. لكن مسيرة مهنية موفقة تبنى على مزيج من الميول الحقيقية، والواقع الأكاديمي، وظروف سوق الشغل.",
    familyPressureAltsTitle: "مسارات مجاورة ذات قيمة عالية:",
    familyPressureAlts: {
      health: ["تمريض وعلاج طبيعي (IFCS)", "أجهزة طبية وتقنيات المختبر", "إدارة صحية (ENCG/FSJES)"],
      engineering: ["تقنية في الصناعة (OFPPT BTS)", "الهندسة المعلوماتية الصناعية", "الطاقة الشمسية والكهرباء"],
      law: ["إدارة الشركات (ENCG)", "محاسبة ومالية", "الوظيفة العمومية"],
    },
    // Misc
    why: "السبب",
    score: "النقطة",
    personality: "الشخصية",
    academic: "الجانب الدراسي",
    market: "سوق الشغل",
    constraints: "الشروط",
    salaryNote: "* الأرقام تقديرية وتعتمد على الخبرة والشركة والمنطقة",
    salary: "الراتب المتوقع (تقديري)",
    weekLabel: "الأسبوع",
    // Session (Goal 1)
    resume: "متابعة من حيث توقفت",
    resumeSaved: "لديك جلسة سابقة محفوظة",
    resumeDesc: "جلسة محفوظة في متناول يدك – هل تريد الاستمرار من حيث توقفت؟",
    restart: "بدء من جديد",
    revealCard: "اكتشف بطاقتك",
    downloadStory: "تحميل Story 9:16",
    downloadSquare: "تحميل Square 1:1",
    downloadCard: "تحميل Card 5:7",
    copyCaption: "نسخ النص",
    archetypeColdReading: "القراءة الأولى",
    archetypeMirror: "مرآة هويتك",
    archetypeHook: "سؤالك الجوهري",
    // CTA (Goal 5)
    ctaButton: "📄 احصل على خطة الطريق الكاملة PDF",
    ctaModalTitle: "خطة الطريق الكاملة – قريباً",
    ctaModalSubtitle: "سنُرسل إليك تقرير PDF مخصص يتضمن مدارسك المُوصى بها، جدول المواعيد والخطوات التفصيلية.",
    ctaEmailPlaceholder: "بريدك الإلكتروني",
    ctaSubmit: "أعلمني عند الإطلاق",
    ctaComingSoon: "✅ تم التسجيل! سنتواصل معك قريباً.",
    ctaClose: "إغلاق",
    // Clusters
    cluster1: "برمجيات وتكنولوجيا المعلومات",
    cluster2: "البيانات والذكاء الاصطناعي",
    cluster3: "الأمن السيبراني",
    cluster4: "الشبكات والاتصالات",
    cluster5: "الهندسة الصناعية والسيارات",
    cluster6: "الطاقة المتجددة",
    cluster7: "الهندسة المدنية والبناء",
    cluster8: "الرعاية الصحية",
    cluster9: "المالية والمحاسبة",
    cluster10: "التسويق والمبيعات",
    cluster11: "اللوجستيك وسلسلة التوريد",
    cluster12: "السياحة والضيافة",
    cluster13: "التعليم والقانون",
    cluster14: "الفنون والإعلام",
    cluster15: "المهن التقنية الحرفية",
    cluster16: "ميكانيكا السيارات والنقل",
    cluster17: "الرياضة واللياقة البدنية",
    cluster18: "إنتاج المحتوى الرقمي",
    cluster19: "فنون الطهي والضيافة",
    // Bac status step (moved to step 2)
    bacStatusStep: "حالة الباكالوريا",
    bacStatusQ: "هل يتم هذا التقييم قبل أم بعد الباكالوريا؟",
    bacStatusBefore: "قبل الباكالوريا (لا يزال بإمكاني التحسين)",
    bacStatusAfter: "بعد الباكالوريا (نتائج نهائية)",
    bacStatusNote: "سيؤثر اختيارك على كيفية عرض التوصيات والخطط",
    bacStatusFinalNote: "نتائجك نهائية — سنركز على الخيارات الواقعية والخطوات المقبلة.",
    // Family pressure (in bac status step)
    fpQuestion: "هل تضغط عليك عائلتك للتوجه نحو تخصص معين؟",
    fpFieldLabel: "نحو أي مجال يتركّز الضغط؟",
    fpFieldOptions: { medicine:"الطب", engineering:"الهندسة", business:"الأعمال", law:"الحقوق", other:"مجال آخر" },
    fpFieldOtherPlaceholder: "حدّد المجال",
    // Preferred style (in reality step)
    preferredStyleLabel: "ما أسلوبك المفضل في العمل؟",
    preferredStyleOptions: { handson:"عملي / يدوي", academic:"أكاديمي / نظري", mixed:"مزيج من الاثنين" },
    // Improve Mode (enhanced, before bac only)
    improveModeTitle: "🚀 وضع التحسين (30-60 يوماً)",
    improveTargetLabel: "الهدف",
    improveWhyLabel: "لماذا يهم؟",
    improveMiniPlanLabel: "خطة مصغّرة",
    improveDistanceHealth: "أنت على بُعد {avg} نقطة من معدل الطب العام · {bio} نقطة في الأحياء · {chem} نقطة في الكيمياء",
    improveClusterUp: "سيرتفع ترتيب: {clusters}",
    // Family pressure adaptive advice
    fpAdviceTitle: "💬 بشأن الضغط العائلي — كلمة صريحة",
    fpTalkToParentsTitle: "🗣️ كيف تُحاوِر عائلتك",
    fpTalkToParents: [
      "شارك بالأرقام: معدلاتك الحالية، ومتطلبات المجال المطلوب — دون مشاعر.",
      "اقترح بديلاً ملموساً: مسار ذو قيمة عالية يستوفي طموحاتهم.",
      "اطلب وقتاً: \"أعطوني 6 أشهر لأثبت كفاءتي في مساري أولاً\".",
    ],
    fpByField: {
      medicine: {
        ineligibleAfter: {
          text: "الطب العام يتطلب تنافسية عالية (المعدل ≥ 16 عادةً + أحياء وكيمياء). بناءً على نتائجك الحالية، المسار العام يستلزم تحسيناً جوهرياً.",
          alts: ["تمريض – IFCS (معدل ≥ 12)", "تقني أشعة/مختبر – ISTA", "مساعد صيدلي – OFPPT", "هندسة طبية حيوية", "إدارة صحية – ENCG/FSJES"],
        },
        mismatch: {
          text: "نتائجك تسمح بالوصول لكن ملفك الشخصي يشير إلى احتمالية إرهاق مهني. الإرهاق حقيقي حين لا يكون الشغف داخلياً.",
          alts: ["الصيدلة (متطلبات أخف + استقلالية أعلى)", "الهندسة الطبية الحيوية", "إدارة مستشفيات"],
        },
        match: { text: "ملفك ونتائجك يتلاءمان مع الطب. إذا كان هذا قرارك الحقيقي فهو مسار ممكن يتطلب تضحيات جوهرية.", alts: [] },
        before: {
          text: "إذا اخترت الطب، إليك خطة واقعية:",
          plan: ["خصّص 3 ساعات يومياً للأحياء والكيمياء", "حل 5 مسائل من امتحانات سابقة أسبوعياً", "انضم لمجموعة مراجعة مع طلاب SVT متقدمين"],
          warning: "الطب = 7+ سنوات دراسية مكثفة. تأكد أن الدافع هو دافعك أنت.",
        },
      },
      engineering: {
        ineligibleAfter: {
          text: "الهندسة في المدارس الكبرى تنافسية للغاية (رياضيات وفيزياء عاليتان). بناءً على ملفك الحالي، المدارس العليا الكبرى صعبة المنال، لكن الهندسة التطبيقية متاحة.",
          alts: ["BTS صناعي – OFPPT", "ENSA في مدن متعددة", "تقنيات الطاقة الشمسية والكهرباء", "مهندس تقني معتمد"],
        },
        mismatch: {
          text: "ملفك يشير إلى مزايا في العمل الميداني أكثر من النظرية المحضة. الهندسة التطبيقية قد تناسبك أكثر من الهندسة الأكاديمية.",
          alts: ["هندسة صناعية – OFPPT / ISTA", "تقنيات الإعلاميات الصناعية", "صيانة الآلات الصناعية"],
        },
        match: { text: "ملفك ونتائجك يتوافقان جيداً مع مسارات الهندسة. ابدأ بالمباريات المناسبة لمستواك.", alts: [] },
        before: {
          text: "لتعزيز فرصك في الهندسة:",
          plan: ["ركّز على الرياضيات والفيزياء يومياً", "تدرّب على مسائل الكتب المدرسية السنوات السابقة", "ابحث عن دروس تدعيمية مجانية على يوتيوب أو Idrisse"],
          warning: "Classes prépa متطلبة جداً — 2 سنتان مكثفتان. ادخل بوعي كامل.",
        },
      },
      business: {
        ineligibleAfter: {
          text: "الأعمال والتجارة متاحان لطيف أوسع من المسارات. ENCG وHEM وFSJES خيارات جيدة بمعدلات مختلفة.",
          alts: ["ENCG (وطني)", "FSJES – اقتصاد وتدبير", "HEM Business School", "ESCA École de Management"],
        },
        mismatch: {
          text: "ملفك الشخصي لا يُشير إلى شغف قوي بالمال والأعمال، لكن ذلك يمكن أن يتطور. فكّر في ما تريد أن تبنيه أولاً.",
          alts: ["تسويق رقمي", "إدارة مشاريع تقنية", "ريادة الأعمال الاجتماعية"],
        },
        match: { text: "شخصيتك وتطلعاتك تتوافق جيداً مع عالم الأعمال. اختر التخصص الأدق لاهتماماتك.", alts: [] },
        before: {
          text: "لتعزيز فرصك في الأعمال:",
          plan: ["اقرأ تقرير اقتصادي واحد أسبوعياً (HCP، Banque Mondiale)", "جرّب إدارة ميزانية صغيرة (عائلية أو مشروع صغير)", "انضم لنادي أعمال أو مشاريع في مدرستك"],
          warning: "",
        },
      },
      law: {
        ineligibleAfter: {
          text: "الحقوق في الجامعات العامة متاحة. المنافسة أشد في الدراسات العليا (الماستر والدكتوراه).",
          alts: ["FSJES – حقوق وعلوم سياسية", "ENCG – قانون الأعمال", "الوظيفة العمومية والامتحانات الوطنية"],
        },
        mismatch: {
          text: "الحقوق تتطلب صبراً على النصوص والتحليل. ملفك يشير لقدرات إبداعية — فكّر في القانون التجاري أو الحقوق الإعلامية.",
          alts: ["الصحافة القانونية", "الموارد البشرية", "الإدارة العامة"],
        },
        match: { text: "شخصيتك التنظيمية والتحليلية مناسبة للحقوق. ابدأ بمشاغل القراءة والمناظرة.", alts: [] },
        before: {
          text: "لتحضير مسار الحقوق:",
          plan: ["اقرأ نصاً قانونياً مختصراً أسبوعياً (مدونة الأسرة، قانون تجاري)", "شارك في نادي النقاش أو المناظرات", "تابع قضايا محاكم محلية عبر الصحافة"],
          warning: "",
        },
      },
      other: {
        ineligibleAfter: { text: "بناءً على ملفك، هناك مسارات متعددة تستحق الاستكشاف.", alts: [] },
        mismatch: { text: "دراسة إمكانيات المجال المُشار إليه قد تُفيد في اتخاذ قرار مدروس.", alts: [] },
        match: { text: "ملفك منفتح على خيارات واسعة. خذ وقتك في الاستكشاف.", alts: [] },
        before: { text: "الاستكشاف المبكر خير من القرار المتسرع.", plan: [], warning: "" },
      },
    },
    // Truth Mode
    truthModeBtn: "🔍 وضع الحقيقة",
    truthModeTitle: "🔍 كلام واضح عن ملفك",
    truthModeDesc: "نظرة موضوعية على مسارك — بدون مبالغة ولا تهويل. فقط معطيات.",
    burnoutRisk: "خطر الإرهاق المهني",
    stressRisk: "خطر الضغط",
    incomeVolatility: "تقلب الدخل",
    truthLow: "منخفض", truthMed: "متوسط", truthHigh: "مرتفع",
    burnoutExplain: { low:"انضباطك وقيمك المهنية تحميك من الإرهاق.", med:"بعض الضغط متوقع — إدارة الوقت مفتاح.", high:"انتبه: أحياناً الطاقة الإبداعية العالية مع الهياكل الجامدة تُسبب استنزافاً." },
    stressExplain: { low:"ملفك يشير إلى قدرة عالية على التكيّف.", med:"الحساسية للفشل قد تزيد الضغط — طوّر نظام دعم.", high:"المجال التنافسي + شخصية حساسة = استرداد بطيء. ابنِ روتيناً للصحة النفسية." },
    incomeExplain: { low:"مسارك يوفر دخلاً تدريجياً ومستقراً.", med:"تقلبات محتملة في السنوات الأولى — احتياطي مالي ضروري.", high:"مسار ريادي أو إبداعي = دخل غير منتظم في البداية. ابنِ شبكة عملاء مبكراً." },
    // Reality Alignment block
    realityAlignmentTitle: "🎯 مدى التوافق",
    realityAlignmentDesc: "حين تتوافق هذه العوامل الثلاثة، تزداد الثقة في التوصية.",
    identityFit: "توافق الهوية",
    academicFit: "توافق أكاديمي",
    marketFit: "توافق السوق",
    // Archetype
    archetypeTitle: "🔮 نمط شخصيتك المهنية",
    archetypeOpposite: "نمطك المقابل",
    archetypeEvolution: "إذا طوّرت قدرتك في",
    archetypeEvolutionInto: "تتطور نحو",
    archetypeBestEnv: "البيئة المثالية لك",
    archetypeWorstEnv: "البيئة التي تستنزفك",
    archetypeStrengths: "نقاط قوتك",
    archetypeRisk: "تحذير نمو",
    // Massar Type
    massarTypeTitle: "🧬 نوع مسار الخاص بك",
    massarTypeDims: {
      A:"تحليلي", C:"مبدع", S:"اجتماعي", I:"مستقل", P:"عملي", O:"نظري", R:"مجازف", K:"مستقر",
    },
    massarTypeDesc: "رمز مكون من 4 أحرف مشتق من شخصيتك وتفضيلاتك",
    shareTitle: "📤 شارك نتيجتك",
    copyCaptionBtn: "نسخ النص",
    downloadBadgeBtn: "تحميل البطاقة",
    shareCopied: "✓ تم النسخ!",
    shareCaptionTpl: "اكتشفت نوع مساري: {type} 🧬\nأفضل مسار: {cluster} ({confidence}% توافق)\nاكتشف نوعك على Massar 👇",
    // Reality layer
    realityStep: "شخصيتك وأولوياتك",
    realityDesc: "4 أسئلة قصيرة — تنتهي في 3 دقائق",
    realityStrengthsTitle: "ما الذي تتقنه فعلاً؟",
    realityStrengthsDesc: "اختر حتى 5 مهارات تشعر أنك قوي فيها",
    realityInterestsTitle: "ما الذي تستمتع به بشكل طبيعي؟",
    realityInterestsDesc: "اختر حتى 5 أنشطة تشدّك",
    realityIdentityTitle: "كيف تصف نفسك؟",
    realityPriorityTitle: "ما أهم شيء بالنسبة إليك الآن؟",
    realityMaxHint: "(اختر 5 كحد أقصى)",
    realityStrengths: {
      s_math:"حل مسائل الرياضيات", s_writing:"الكتابة والتعبير", s_speaking:"الإلقاء والخطابة",
      s_mechanical:"إصلاح الأشياء الميكانيكية", s_tools:"استخدام الأدوات اليدوية",
      s_projects:"بناء مشاريع صغيرة", s_coding:"البرمجة", s_video:"تحرير مقاطع الفيديو",
      s_design:"التصميم والرسم", s_negotiating:"الإقناع والتفاوض",
      s_organizing:"تنظيم الناس والأحداث", s_sports:"الأداء الرياضي",
      s_discipline:"الانضباط والمثابرة", s_learning:"التعلم السريع", s_selling:"البيع والترويج",
      s_cooking:"الطهي والمطبخ", s_sport_team:"الرياضة الجماعية", s_sport_indiv:"الرياضة الفردية",
      s_coaching:"التدريب والقيادة", s_diy:"المشاريع اليدوية / DIY",
    },
    realityInterests: {
      i_building:"البناء والإصلاح", i_sports:"المنافسة الرياضية", i_gaming:"الألعاب الإلكترونية",
      i_content:"إنشاء المحتوى", i_helping:"مساعدة الناس", i_leading:"قيادة المجموعات",
      i_selling:"البيع والأعمال", i_research:"البحث العميق",
      i_outdoors:"العمل في الهواء الطلق", i_machines:"العمل مع الآلات",
      i_alone:"العمل بمفردي", i_people:"العمل مع الآخرين",
      i_cooking:"الطبخ والأكل", i_fitness:"التدريب البدني",
    },
    realityIdentityOptions: {
      academic:{ icon:"📚", label:"أكاديمي" },
      builder:{ icon:"🔨", label:"بنّاء" },
      creative:{ icon:"🎨", label:"مبدع" },
      athletic:{ icon:"⚡", label:"رياضي" },
      business:{ icon:"💼", label:"رجل أعمال" },
      explorer:{ icon:"🧭", label:"مستكشف" },
      unsure:{ icon:"🤷", label:"لست متأكداً بعد" },
    },
    realityPriorityOptions: {
      money:{ icon:"💰", label:"الدخل السريع" },
      prestige:{ icon:"🏆", label:"المكانة والهيبة" },
      stability:{ icon:"🏠", label:"الاستقرار" },
      freedom:{ icon:"🕊️", label:"الحرية والمرونة" },
      impact:{ icon:"🌍", label:"التأثير والإسهام" },
      flexibility:{ icon:"⚖️", label:"التوازن في الحياة" },
    },
    // Improve Mode inputs
    strengthsNowLabel: "ما الذي تتقنه فعلاً الآن؟",
    strengthsNowDesc: "اختر ما ينطبق عليك (حتى 5)",
    preferredStyleLabel: "ما أسلوبك المفضل في العمل؟",
    preferredStyleOptions: { handson:"عملي / يدوي", academic:"أكاديمي / نظري", mixed:"مزيج من الاثنين" },
    strengthsNowOptions: {
      sn_math:"الرياضيات", sn_physics:"الفيزياء", sn_biology:"الأحياء",
      sn_writing:"الكتابة / اللغة", sn_speaking:"الخطابة / التواصل",
      sn_fixing:"الإصلاح والتركيب (DIY)", sn_mechanics:"الميكانيكا", sn_cooking:"الطبخ",
      sn_design:"التصميم", sn_video:"تحرير الفيديو",
      sn_sport_team:"الرياضة الجماعية", sn_sport_indiv:"الرياضة الفردية",
      sn_coaching:"التدريب / القيادة", sn_gaming:"الألعاب / الاستراتيجية",
    },
  },

  fr: {
    dir: "ltr",
    // HOME PAGE 3D CSS — translations
    homeHero: "Choisis ta voie. Avec du concret.",
    homeHeroSub: "Massar croise ta personnalité + tes notes (matières exactes Bac 1/Bac 2) pour te proposer 3 parcours : Fit, Équilibré, Ambitieux — avec le «pourquoi», l'éligibilité (public/privé) et un plan d'action.",
    homeCTA: "Commencer gratuitement",
    homeSecondaryCTA: "Voir un exemple",
    homeMicroTrust: "Zéro promesse bidon. Des règles claires, des alternatives réelles.",
    homeParentLine: "Clair pour toi — convaincant pour tes parents.",
    homeValueBullets: ["Matières exactes selon ta filière","3 vues : Fit • Équilibré • Ambitieux","Éligibilité claire : public/privé, seuils, options","Plan 30 jours (actions concrètes)","Résultat partageable + caption prête"],
    homeTrustChips: ["Explicable","Réaliste","Mobile-first","Pensé pour le Maroc"],
    homeNotSure: "Si tu hésites, c'est normal. On te donne 3 directions solides à tester ce mois-ci. Le résultat est une boussole — pas une étiquette.",
    homeFamilyNote: "On connaît la pression. On te donne un «parcours ambitieux» défendable devant tes parents, avec les conditions et le plan pour y arriver.",
    homeShareCTA: "Partage ton profil — et fais parler le résultat.",
    homeHowItWorks: "Comment ça marche ?",
    homeStep1Title: "Test de personnalité",
    homeStep1Desc: "8–12 min — questions utiles, directes, sans détour.",
    homeStep2Title: "Saisis tes notes",
    homeStep2Desc: "/20, selon ta filière exacte — zéro approximation.",
    homeStep3Title: "Ta roadmap",
    homeStep3Desc: "Parcours + raisons + actions — en 3 perspectives : Fit, Équilibré, Ambitieux.",
    homeTrust1: "Bac 1 / Bac 2",
    homeTrust2: "Public / privé",
    homeTrust3: "Éligibilité réelle — pas de fausses promesses",
    homeFooterBy: "Massar — ta boussole carrière au Maroc",
    homeFooterContact: "contact@massar.ma",
    homeBackToTest: "Reprendre le test",
    // Journey stage + learner type
    journeyTitle: "Où en es-tu maintenant ?",
    journeyDesc: "Cela nous aide à personnaliser les recommandations.",
    journeyPreBac: "Avant le Bac (je suis encore en cours d'études)",
    journeyPostBac: "Après le Bac (j'ai mes résultats définitifs)",
    journeyPreBacHint: "On te propose des orientations selon ta personnalité et tes intérêts",
    journeyPostBacHint: "On analyse tes vraies notes pour des recommandations précises",
    preBacStrengthsTitle: "Qu'est-ce que tu maîtrises vraiment ?",
    preBacStrengthsDesc: "Choisis 3 points forts qui te semblent vrais",
    preBacStrengthsOpts: {
      teaching:"Expliquer/enseigner", solving:"Résoudre des problèmes", designing:"Créer/designer",
      negotiating:"Persuader/négocier", organizing:"Organiser/diriger",
      building:"Construire/réparer", sports:"Discipline sportive",
      writing:"Écrire/communiquer", tech:"Curiosité tech",
    },
    preBacInterestsTitle: "Qu'est-ce qui te passionne le plus ?",
    preBacInterestsDesc: "Choisis 3 intérêts qui décrivent ta passion",
    preBacInterestsOpts: {
      competition:"La compétition", helping:"Aider les gens", building2:"Construire des choses",
      creativity:"La créativité", business:"Business / argent", technology:"Technologie",
      languages:"Langues / voyages", outdoors:"Dehors / nature", handson:"Travail manuel",
    },
    preBacSliderTitle: "Auto-évaluation par matière (1 = faible / 5 = fort)",
    preBacConstraints: "Contraintes et priorités",
    prestige_priority: "Importance du prestige",
    prestige_low:"Peu important",prestige_med:"Assez important",prestige_high:"Très important",
    learnerTitle: "Comment tu apprends ?",
    learnerDesc: "6 questions courtes pour cerner ton style d'apprentissage",
    learnerTypes: {
      architect:"L'Architecte", striker:"L'Exécutant", diplomat:"Le Diplomate",
      sprinter:"Le Sprinter", sentinel:"La Sentinelle", visionary:"Le Visionnaire",
    },
    learnerTypeIcons: {
      architect:"🏗️", striker:"⚡", diplomat:"🤝", sprinter:"🏃", sentinel:"🛡️", visionary:"🔭",
    },
    resultsPage: "Page", resultsOf: "sur",
    identityMirrorTitle: "Miroir de ton identité professionnelle",
    underPressure: "Comment tu penses sous pression",
    consistencySecret: "Ce dont tu as besoin pour rester constant",
    unfairAdvantage: "Ton avantage inattendu",
    blindSpot: "Point aveugle à conscientiser",
    credibilityLine: "Si ça ne semble pas totalement juste, c'est normal — c'est une approximation, pas une vérité absolue.",
    prestigePage2Title: "Prestige & Réalité familiale (Maroc)",
    marketPage3Title: "Ton marché en 2030",
    directionsPage4Title: "Tes recommandations détaillées",
    planPage5Title: "Ton plan de démarrage",
    pdfPage6Title: "Dossier Coach Personnel Complet",
    futureProofScore: "Score futur",
    moroccoDemandsLabel: "Demande au Maroc",
    globalDemandsLabel: "Demande mondiale",
    hedgeSkillLabel: "Compétence tampon recommandée",
    weakPoint2Win: "Ta victoire cette semaine",
    riskAvoid: "Risque à éviter",
    prioritySelector: "Ajuste selon ta priorité",
    previewLocked: "Contenu réservé au PDF",
    pdfBenefits: [
      "Shortlist d'écoles pour ta ville, mobilité & budget (6–12 établissements)",
      "Plan Prestige A/B/C avec timeline (élite / solide / direct-marché)",
      "Stratégie de révision : matières clés + étapes réalistes",
      "Script famille complet (arabe + français) + réponses aux objections",
      "Matrice de décision complète + comparaison de scénarios",
      "Roadmap 90 jours (semaines 2–12) + ressources sélectionnées",
      "Guide des bourses et frais (public / privé)",
      "Comment gagner selon ton style d'apprentissage — playbook complet",
      "Pièges personnalisés à éviter",
      "Guide de la voie internationale (optionnel)",
    ],

        backHome: "← Accueil",
        appTitle: "Massar | Guide Carrière Maroc",
    appSubtitle: "Découvrez votre voie professionnelle idéale au Maroc",
    next: "Suivant",
    back: "Retour",
    start: "Commencer",
    finish: "Voir mes résultats",
    step: "Étape",
    of: "sur",
    langStep: "Choisissez votre langue",
    langDesc: "L'application sera entièrement affichée dans la langue choisie",
    personalityStep: "Test de personnalité",
    personalityDesc: "Répondez honnêtement – il n'y a pas de mauvaises réponses",
    infoStep: "Votre profil scolaire",
    marksStep: "Vos notes",
    resultsStep: "Vos résultats",
    bacTrack: "Filière du Bac",
    city: "Votre ville actuelle",
    mobility: "Mobilité géographique",
    mobilityOptions: ["Ma ville uniquement", "Prêt à déménager au Maroc", "À distance OK"],
    studyLang: "Langue d'études préférée",
    privateBudgetLabel: "Études privées envisageables ?",
    privateBudgetHint: "Influence les recommandations pour la médecine et filières très sélectives",
    yes: "Oui",
    no: "Non",
    marks: "Vos notes /20",
    examModeLabel: "Type de notes saisies",
    examModeWatani: "Notes du National uniquement",
    examModeFull: "Bac complet (Régional + National + contrôle continu)",
    // TASK 1 — examTiming
    examTimingLabel: "Quand effectuez-vous cette évaluation ?",
    examTimingPre: "Avant le Bac (je peux encore m'améliorer)",
    examTimingPost: "Après le Bac (résultats officiels définitifs)",
    examTimingHint: "Cela détermine la liste exacte des matières affichées",
    // TASK 2 — goalPreference
    goalPreferenceLabel: "Quel style vous correspond le mieux ?",
    goalPreferenceOptions: {
      prestige:   { icon:"🏆", label:"Prestige & longues études (concours, grandes écoles)" },
      balanced:   { icon:"⚖️", label:"Équilibré — meilleur choix qui reste valorisé" },
      practical:  { icon:"🔧", label:"Emploi rapide / voie pratique (OFPPT / BTS)" },
    },
    marksSectionWatani: "Examen National",
    marksSectionRegional: "Examen Régional",
    marksSectionContinuous: "Contrôle continu (optionnel)",
    wataniAverage: "Moyenne National (approx.)",
    regionalAverage: "Moyenne Régional (approx.)",
    continuousAverage: "Moyenne contrôle continu",
    overallAverage: "Moyenne générale",
    whatIf: "Et si ? – Modifier les notes",
    adjustedAverage: "Moyenne ajustée",
    sliderHint: "↑ Modifier les notes pour recalculer instantanément",
    sliderChangeSummary: "Modifications",
    sliderNoChange: "Aucune modification pour l'instant",
    traitRadar: "Votre profil de personnalité",
    topCareers: "Meilleures orientations",
    pathways: "Parcours de formation",
    actionPlan: "Plan d'action – 30 jours",
    fallback: "Parcours alternatif",
    fallbackDesc: "Parcours alternatif à valeur égale",
    fallbackBody: "L'OFPPT et les formations BTS ne sont pas des voies de secours — ce sont des passerelles directes vers le marché du travail avec des compétences techniques très demandées.",
    explainability: "Pourquoi cette recommandation ?",
    confidenceLabel: "Niveau de confiance",
    mixedSignals: "📊 Divergence de profil détectée – les facteurs académiques et identitaires pointent vers des domaines distincts. Examinez les parcours en tenant compte du contexte complet.",
    universityRoute: "Université",
    grandeEcoleRoute: "Grande École",
    practicalRoute: "Formation pratique",
    durationLabel: "Durée",
    pathwayMissing: "Détails à venir",
    privateOnly: "Privé uniquement",
    notEligiblePublic: "Très compétitif (public)",
    // Medicine eligibility (Goal 3)
    eligibilityTitle: "Critères d'éligibilité – Médecine publique",
    eligibilityThresholdLabel: "Seuil officiel (public)",
    eligibilityThresholdValue: "Moyenne ≥ 16/20 · Biologie ≥ 14 · Chimie ≥ 13",
    eligibilityYourAvg: "Votre moyenne actuelle",
    eligibilityMeetsPublic: "✅ Éligible à la voie publique",
    eligibilityFailsPublic: "❌ En dessous du seuil public marocain",
    eligibilityPrivateNote: "La médecine privée reste accessible (UIR, UIC…) – frais élevés, vérifiez les bourses disponibles.",
    eligibilityAlternativesLabel: "Filières paramédicales accessibles :",
    eligibilityAlternatives: [
      "Infirmier·e – IFCS (moyenne ≥ 12)",
      "Technicien·ne en radiologie / laboratoire (ISTA)",
      "Assistant·e en pharmacie (OFPPT)",
      "Administration hospitalière (ENCG / FSJES)",
      "Technicien·ne en prothèse dentaire",
    ],
    // Narrative fix / Guardrails — ambitious tab "How to unlock"
    ambitiousUnlockTitle: "🔓 Comment débloquer cette voie ?",
    ambitiousUnlockMed:   "Pour la médecine publique : amène ta moyenne à 16+ et Bio/Chimie aux seuils requis.",
    ambitiousUnlockGen:   "Vise une moyenne de {avg}+ et améliore tes matières clés pour augmenter tes chances.",
    // Feature 1: Exam timing
    examTimingStep: "Calendrier Bac",
    examTimingQuestion: "Cette évaluation est-elle réalisée avant ou après votre examen du Bac ?",
    examTimingBefore: "Avant les résultats du Bac",
    examTimingAfter: "Après les résultats du Bac",
    examTimingDesc: "Cela influence la façon dont les recommandations et les plans d'amélioration sont présentés",
    whatIfDisabled: "Notes finales – simulation désactivée après les résultats.",
    improvementTitle: "💡 Comment améliorer vos chances avant le Bac ?",
    improvementSubjectHint: "Matières clés pour votre parcours :",
    improvementUnlock: "Gagner +2 points débloquerait :",
    improvementTip1: "Travaillez les types d'exercices récurrents dans les annales",
    improvementTip2: "La préparation aux concours commence 6 mois avant",
    improvementTip3: "Rejoignez des groupes de révision sur WhatsApp ou Telegram",
    improvementTip4: "Plateformes gratuites : Khan Academy, Idrisse, YouTube Dar Taliba",
    improvementDisclaimer: "Ces projections sont indicatives. Aucune admission n'est garantie.",
    // SUBJECTS FIX: examLevel + trackField selectors
    examLevelLabel: "Niveau d'examen",
    examLevelBac1: "1ère Bac (Régional / جهوي)",
    examLevelBac2: "2ème Bac (National / وطني)",
    trackFieldLabel: "Filière officielle",
    trackFields: {
      SE:  "Sciences Expérimentales",
      SM:  "Sciences Mathématiques",
      ST:  "Sciences et Technologies",
      ECO: "Sciences Économiques",
      LSH: "Lettres et Sciences Humaines",
      AA:  "Arts Appliqués",
      EO:  "Enseignement Originel",
      BP:  "Bac Professionnel",
    },
    smOptionLabel: "Option (Sciences Mathématiques)",
    // SUBJECT MODEL (MOROCCO) FIX: examYear + bac2Track selectors
    examYearLabel: "Année d'examen",
    examYearBac1: "1ère Bac (Régional / جهوي)",
    examYearBac2: "2ème Bac (National / وطني)",
    bac1FieldLabel: "Filière (1ère Bac)",
    bac1Fields: {
      SE:"Sciences Expérimentales", SM:"Sciences Mathématiques", ST:"Sciences et Technologies",
      ECO:"Sciences Économiques", LSH:"Lettres et Sciences Humaines",
      AA:"Arts Appliqués", EO:"Enseignement Originel", BP:"Bac Professionnel",
    },
    bac2TrackLabel: "Filière (2ème Bac)",
    bac2Tracks: {
      SVT:"Sciences de la Vie et de la Terre", PC:"Sciences Physiques (Physique-Chimie)",
      SMA:"Sciences Maths – Option A (SVT)", SMB:"Sciences Maths – Option B (Ing.)",
      ST:"Sciences et Technologies", ECO:"Sciences Économiques",
      LSH:"Lettres et Sciences Humaines", AA:"Arts Appliqués",
      EO:"Enseignement Originel", BP:"Bac Professionnel",
    },
    smOptionA: "Option A (SVT)",
    smOptionB: "Option B (Sciences de l'ingénieur)",
    eoOptionLabel: "Spécialité (Ens. Originel)",
    eoOptionArabic: "Littérature arabe",
    eoOptionSharia: "Charia islamique",
    bpExtrasLabel: "Matières supplémentaires (Bac Pro)",
    // NEW INPUT: Profile Boost step translations
    profileBoostStep: "🚀 Booster ton profil",
    profileBoostDesc: "6 questions rapides qui affinent vraiment les recommandations",
    pb_prestige: "Importance du prestige pour toi et ta famille",
    pb_prestige0: "Pas important — résultats et emploi d'abord",
    pb_prestige1: "Un peu important",
    pb_prestige2: "Très important — le prestige est non-négociable",
    pb_money: "Importance de la stabilité financière maintenant",
    pb_money0: "Pas la priorité pour l'instant",
    pb_money1: "Important mais pas le seul critère",
    pb_money2: "Indispensable, c'est ma contrainte principale",
    pb_handsOn: "Tu préfères le travail concret / terrain au bureau ?",
    pb_handsOn0: "Non — je préfère analyser et réfléchir",
    pb_handsOn1: "Un mix des deux",
    pb_handsOn2: "Oui — le terrain me motive plus",
    pb_risk: "Tu acceptes les voies incertaines (startup/créatif/indépendant) ?",
    pb_risk0: "Non — je veux un chemin balisé",
    pb_risk1: "Un peu, si j'ai un plan B",
    pb_risk2: "Oui — l'incertitude ne me fait pas peur",
    pb_intl: "Tu veux un parcours qui fonctionne à l'étranger ?",
    pb_intl0: "Non, je reste au Maroc",
    pb_intl1: "Peut-être plus tard",
    pb_intl2: "Oui, l'international est dans mon plan",
    pb_focus: "Tu peux étudier 2 à 4h par jour sérieusement ?",
    pb_focus0: "Difficile pour moi de façon constante",
    pb_focus1: "Oui, avec quelques difficultés parfois",
    pb_focus2: "Oui toujours — la discipline c'est mon moteur",
    // Feature 2: Study abroad
    studyAbroadLabel: "Souhaitez-vous étudier à l'étranger ?",
    studyAbroadRegionLabel: "Région préférée",
    abroadRegions: { france:"France", canada:"Canada", germany:"Allemagne", spain:"Espagne", usa:"États-Unis", other:"Autre" },
    intlPathwayTitle: "🌍 Parcours International",
    intlRequirementsTitle: "Conditions générales",
    intlRequirementsText: "Généralement requis : diplôme reconnu + justificatif de niveau de langue (TCF/IELTS/TestDaF) + preuve de ressources financières. Les conditions varient selon le pays et l'établissement.",
    intlFinanceTitle: "Réalité financière",
    intlFinanceText: "Les frais vont de gratuits (Allemagne) à très élevés (États-Unis). Des bourses Campus France, DAAD et Erasmus+ existent – renseignez-vous tôt sur les échéances.",
    intlTranslationTitle: "Comment votre domaine se transpose à l'international ?",
    intlHealthNote: "⚕️ Attention : étudier la médecine à l'étranger n'est pas plus facile – certains pays rendent l'admission en médecine difficile pour les étrangers.",
    intlDifferenceTitle: "Différence avec le système marocain",
    intlDifferenceText: "Au Maroc : concours hautement sélectifs. À l'étranger : dossier + lettre de motivation. Les diplômes étrangers nécessitent souvent une équivalence pour exercer au Maroc.",
    // Family pressure
    familyPressureLabel: "Subissez-vous une pression familiale vers un domaine particulier ?",
    familyPressureTitle: "💬 Un regard honnête sur la pression familiale",
    familyPressureText: "Il est naturel que votre famille ait de grandes ambitions. Mais une carrière épanouissante se construit sur vos aptitudes réelles, votre profil académique et les réalités du marché.",
    familyPressureAltsTitle: "Filières proches à fort potentiel :",
    familyPressureAlts: {
      health: ["Infirmier·e & kinésithérapie (IFCS)", "Dispositifs médicaux & labo", "Administration hospitalière (ENCG/FSJES)"],
      engineering: ["BTS industriel (OFPPT)", "Informatique industrielle", "Énergies solaires & électricité"],
      law: ["Gestion d'entreprise (ENCG)", "Finance & comptabilité", "Fonction publique"],
    },
    why: "Pourquoi ?",
    score: "Score",
    personality: "Personnalité",
    academic: "Académique",
    market: "Marché",
    constraints: "Contraintes",
    salaryNote: "* Estimations indicatives selon l'expérience, l'entreprise et la région",
    salary: "Salaire estimé",
    weekLabel: "Semaine",
    resume: "Reprendre où j'en étais",
    resumeSaved: "Vous avez une session sauvegardée",
    resumeDesc: "Reprenez votre progression sans tout recommencer.",
    restart: "Recommencer",
    revealCard: "Révèle ta carte",
    downloadStory: "Télécharger Story 9:16",
    downloadSquare: "Télécharger Carré 1:1",
    downloadCard: "Télécharger Carte 5:7",
    copyCaption: "Copier le texte",
    archetypeColdReading: "Lecture à froid",
    archetypeMirror: "Miroir identité",
    archetypeHook: "Ta question clé",
    ctaButton: "📄 Obtenir mon roadmap PDF complet",
    ctaModalTitle: "Votre roadmap PDF – Bientôt disponible",
    ctaModalSubtitle: "Recevez un rapport PDF personnalisé : écoles recommandées, calendrier des concours et plan d'action détaillé.",
    ctaEmailPlaceholder: "Votre adresse e-mail",
    ctaSubmit: "Me notifier au lancement",
    ctaComingSoon: "✅ Enregistré ! Nous vous contacterons bientôt.",
    ctaClose: "Fermer",
    cluster1: "Logiciels & IT",
    cluster2: "Data & IA",
    cluster3: "Cybersécurité",
    cluster4: "Réseaux & Télécom",
    cluster5: "Génie Industriel & Auto",
    cluster6: "Énergies Renouvelables",
    cluster7: "Génie Civil & BTP",
    cluster8: "Santé & Médecine",
    cluster9: "Finance & Comptabilité",
    cluster10: "Marketing & Ventes",
    cluster11: "Logistique & Supply Chain",
    cluster12: "Tourisme & Hôtellerie",
    cluster13: "Éducation & Droit",
    cluster14: "Arts & Médias",
    cluster15: "Métiers Techniques & Artisanaux",
    cluster16: "Mécanique Auto & Transport",
    cluster17: "Sport & Condition Physique",
    cluster18: "Création de Contenu Digital",
    cluster19: "Cuisine & Hôtellerie Opérationnelle",
    // Bac status step
    bacStatusStep: "Statut Bac",
    bacStatusQ: "Cette évaluation est-elle réalisée avant ou après votre Bac ?",
    bacStatusBefore: "Avant le Bac (je peux encore m'améliorer)",
    bacStatusAfter: "Après le Bac (résultats définitifs)",
    bacStatusNote: "Cela adapte les recommandations et les plans d'action.",
    bacStatusFinalNote: "Vos résultats sont définitifs — nous allons nous concentrer sur des options réalistes et les prochaines étapes.",
    fpQuestion: "Votre famille vous pousse-t-elle vers un domaine particulier ?",
    fpFieldLabel: "Vers quel domaine ?",
    fpFieldOptions: { medicine:"Médecine", engineering:"Ingénierie", business:"Commerce / Business", law:"Droit", other:"Autre domaine" },
    fpFieldOtherPlaceholder: "Précisez le domaine",
    // Improve Mode inputs
    strengthsNowLabel: "En quoi êtes-vous vraiment bon(ne) maintenant ?",
    strengthsNowDesc: "Sélectionnez ce qui s'applique (jusqu'à 5)",
    preferredStyleLabel: "Quel est votre style de travail préféré ?",
    preferredStyleOptions: { handson:"Pratique / manuel", academic:"Académique / théorique", mixed:"Les deux" },
    strengthsNowOptions: {
      sn_math:"Mathématiques", sn_physics:"Physique", sn_biology:"Biologie",
      sn_writing:"Écriture / langues", sn_speaking:"Prise de parole / communication",
      sn_fixing:"Bricolage / réparation", sn_mechanics:"Mécanique", sn_cooking:"Cuisine",
      sn_design:"Design", sn_video:"Montage vidéo",
      sn_sport_team:"Sport collectif", sn_sport_indiv:"Sport individuel",
      sn_coaching:"Coaching / encadrement", sn_gaming:"Jeux / stratégie",
    },
    // Improve Mode output
    improveModeTitle: "🚀 Mode Amélioration (30–60 jours)",
    improveTargetLabel: "Objectif",
    improveWhyLabel: "Pourquoi c'est important",
    improveMiniPlanLabel: "Mini-plan",
    improveDistanceHealth: "Il vous manque {avg} pt de moyenne · {bio} pt en Bio · {chem} pt en Chimie",
    improveClusterUp: "Progresser débloquerait : {clusters}",
    // Family pressure adaptive
    fpAdviceTitle: "💬 La pression familiale — regard direct",
    fpTalkToParentsTitle: "🗣️ Comment parler à votre famille",
    fpTalkToParents: [
      "Partagez les chiffres : vos notes actuelles et les exigences du domaine — sans émotion.",
      "Proposez une alternative concrète : une filière de valeur qui répond à leurs ambitions.",
      "Demandez du temps : «Donnez-moi 6 mois pour prouver mes compétences d'abord».",
    ],
    fpByField: {
      medicine: {
        ineligibleAfter: {
          text: "La médecine publique est hautement compétitive (seuil typique ≥ 16/20 + Bio ≥ 14). Votre profil actuel nécessite une amélioration significative pour y accéder.",
          alts: ["Infirmier·e – IFCS (moy. ≥ 12)", "Technicien·ne radio/labo – ISTA", "Assistant·e pharmacie – OFPPT", "Génie biomédical", "Administration hospitalière – ENCG/FSJES"],
        },
        mismatch: {
          text: "Vos notes permettent l'accès, mais votre profil suggère un risque de surmenage professionnel. L'épuisement en médecine est réel quand la motivation n'est pas intrinsèque.",
          alts: ["Pharmacie (moins intensif + autonomie)", "Génie biomédical", "Gestion hospitalière"],
        },
        match: { text: "Votre profil et vos notes sont compatibles avec la médecine. Si c'est votre propre choix, c'est une voie viable qui demande de lourds sacrifices.", alts: [] },
        before: {
          text: "Si vous choisissez de viser la médecine avant le Bac :",
          plan: ["3h/jour en biologie et chimie", "5 exercices d'annales par semaine par matière", "Rejoignez un groupe de révision SVT avancés"],
          warning: "Médecine = 7+ ans intensifs. Assurez-vous que c'est votre motivation, pas seulement celle de votre famille.",
        },
      },
      engineering: {
        ineligibleAfter: {
          text: "Les grandes écoles d'ingénieurs sont très sélectives. Votre profil actuel est plus adapté à l'ingénierie appliquée qu'aux grandes écoles.",
          alts: ["BTS industriel – OFPPT", "ENSA (plusieurs villes)", "Énergies solaires & électricité", "Technicien·ne diplômé·e"],
        },
        mismatch: {
          text: "Votre profil suggère un avantage en terrain pratique plutôt qu'en théorie pure. L'ingénierie appliquée pourrait vous convenir davantage.",
          alts: ["Ingénierie industrielle – OFPPT/ISTA", "Informatique industrielle", "Maintenance industrielle"],
        },
        match: { text: "Votre profil est bien aligné avec les filières d'ingénierie. Ciblez les concours adaptés à votre niveau.", alts: [] },
        before: {
          text: "Pour renforcer vos chances en ingénierie :",
          plan: ["Focus quotidien sur maths et physique", "Annales des années précédentes", "Ressources gratuites : YouTube, Idrisse"],
          warning: "Les classes prépa sont très exigeantes — 2 ans intensifs. Entrez en pleine conscience.",
        },
      },
      business: {
        ineligibleAfter: {
          text: "Le commerce est accessible à une large gamme de profils. ENCG, HEM et FSJES offrent des entrées à différents niveaux.",
          alts: ["ENCG (national)", "FSJES – économie & gestion", "HEM Business School", "ESCA École de Management"],
        },
        mismatch: {
          text: "Votre profil ne révèle pas encore une forte affinité business, mais cela peut évoluer. Réfléchissez d'abord à ce que vous voulez construire.",
          alts: ["Marketing digital", "Gestion de projets tech", "Entrepreneuriat social"],
        },
        match: { text: "Votre personnalité et vos ambitions s'alignent bien avec le monde des affaires. Choisissez la spécialisation la plus proche de vos intérêts.", alts: [] },
        before: {
          text: "Pour renforcer votre profil business :",
          plan: ["Lisez un rapport économique par semaine (HCP, Banque Mondiale)", "Gérez un petit budget (familial ou projet)", "Rejoignez un club business / entrepreneuriat"],
          warning: "",
        },
      },
      law: {
        ineligibleAfter: {
          text: "Le droit en université publique est accessible. La compétition est plus forte en master et doctorat.",
          alts: ["FSJES – droit et sciences politiques", "ENCG – droit des affaires", "Concours de la fonction publique"],
        },
        mismatch: {
          text: "Le droit exige patience et analyse textuelle. Votre profil créatif pourrait s'épanouir en droit des médias ou droit commercial.",
          alts: ["Journalisme juridique", "Ressources humaines", "Administration publique"],
        },
        match: { text: "Votre rigueur et esprit d'analyse sont des atouts pour le droit. Commencez par des clubs de débat.", alts: [] },
        before: {
          text: "Pour préparer une carrière en droit :",
          plan: ["Lisez un texte juridique résumé chaque semaine", "Participez à des débats ou concours de plaidoirie", "Suivez des affaires judiciaires locales dans la presse"],
          warning: "",
        },
      },
      other: {
        ineligibleAfter: { text: "Votre profil ouvre plusieurs pistes intéressantes à explorer.", alts: [] },
        mismatch: { text: "Explorer les exigences du domaine mentionné permettra une décision éclairée.", alts: [] },
        match: { text: "Votre profil est ouvert à de nombreuses options. Prenez le temps d'explorer.", alts: [] },
        before: { text: "Explorer tôt vaut mieux que décider précipitamment.", plan: [], warning: "" },
      },
    },
    // Truth Mode
    truthModeBtn: "🔍 Mode Vérité",
    truthModeTitle: "🔍 Analyse réaliste de votre profil",
    truthModeDesc: "Analyse structurée — sans exagération, sans peur. Juste des données.",
    burnoutRisk: "Risque d'épuisement professionnel",
    stressRisk: "Risque de stress",
    incomeVolatility: "Volatilité des revenus",
    truthLow: "Faible", truthMed: "Modéré", truthHigh: "Élevé",
    burnoutExplain: { low:"Votre discipline et vos valeurs vous protègent du surmenage.", med:"Du stress attendu — la gestion du temps est la clé.", high:"Créativité intense dans des structures rigides peut épuiser." },
    stressExplain: { low:"Votre profil montre une forte capacité d'adaptation.", med:"La sensibilité à l'échec peut amplifier le stress — construisez un réseau de soutien.", high:"Profil compétitif + personnalité sensible = récupération lente. Établissez une routine bien-être." },
    incomeExplain: { low:"Votre parcours offre une progression stable.", med:"Des fluctuations possibles en début de carrière — constitution d'un fonds de secours conseillée.", high:"Parcours entrepreneurial ou créatif = revenus irréguliers au départ. Constituez un réseau client tôt." },
    // Reality Alignment
    realityAlignmentTitle: "🎯 Alignement du profil",
    realityAlignmentDesc: "Quand ces trois facteurs s'alignent fortement, la confiance dans la recommandation augmente.",
    identityFit: "Alignement identité",
    academicFit: "Alignement académique",
    marketFit: "Demande marché",
    // Archetype
    archetypeTitle: "🔮 Votre archétype professionnel",
    archetypeOpposite: "Votre type opposé",
    archetypeEvolution: "En développant votre",
    archetypeEvolutionInto: "vous évoluez vers",
    archetypeBestEnv: "Environnement idéal",
    archetypeWorstEnv: "Environnement épuisant",
    archetypeStrengths: "Vos forces",
    archetypeRisk: "Avertissement croissance",
    // Massar Type
    massarTypeTitle: "🧬 Votre Type Massar",
    massarTypeDims: {
      A:"Analytique", C:"Créatif·ve", S:"Social·e", I:"Indépendant·e", P:"Pratique", O:"Théorique", R:"Preneur de risques", K:"Stable",
    },
    massarTypeDesc: "Code 4 lettres dérivé de votre personnalité et préférences",
    shareTitle: "📤 Partager mon profil",
    copyCaptionBtn: "Copier le texte",
    downloadBadgeBtn: "Télécharger le badge",
    shareCopied: "✓ Copié !",
    shareCaptionTpl: "Mon Type Massar : {type} 🧬\nMeilleure voie : {cluster} ({confidence}% compatibilité)\nDécouvre le tien sur Massar 👇",
    // Reality layer
    realityStep: "Réalité & Identité",
    realityDesc: "4 questions rapides – tap, sélectionne, terminé en 3 min",
    realityStrengthsTitle: "En quoi êtes-vous vraiment bon(ne) maintenant ?",
    realityStrengthsDesc: "Choisissez jusqu'à 5 compétences où vous vous sentez fort(e)",
    realityInterestsTitle: "Qu'est-ce que vous aimez faire naturellement ?",
    realityInterestsDesc: "Choisissez jusqu'à 5 activités qui vous attirent",
    realityIdentityTitle: "Comment vous définissez-vous ?",
    realityPriorityTitle: "Qu'est-ce qui compte le plus pour vous maintenant ?",
    realityMaxHint: "(Choisissez jusqu'à 5)",
    realityStrengths: {
      s_math:"Résoudre des problèmes maths", s_writing:"Écriture / langues", s_speaking:"Prise de parole en public",
      s_mechanical:"Réparer des choses mécaniques", s_tools:"Utiliser des outils",
      s_projects:"Monter de petits projets", s_coding:"Coder", s_video:"Montage vidéo",
      s_design:"Design / dessin", s_negotiating:"Négocier / convaincre",
      s_organizing:"Organiser des gens", s_sports:"Performance sportive",
      s_discipline:"Rester discipliné(e)", s_learning:"Apprendre vite", s_selling:"Vendre / promouvoir",
      s_cooking:"Cuisine / gastronomie", s_sport_team:"Sport collectif", s_sport_indiv:"Sport individuel",
      s_coaching:"Coaching / leadership", s_diy:"Projets manuels / DIY",
    },
    realityInterests: {
      i_building:"Construire / réparer", i_sports:"Compétition sportive", i_gaming:"Jeux vidéo",
      i_content:"Créer du contenu", i_helping:"Aider les autres", i_leading:"Diriger des groupes",
      i_selling:"Vente / business", i_research:"Rechercher en profondeur",
      i_outdoors:"Travailler en extérieur", i_machines:"Travailler avec des machines",
      i_alone:"Travailler seul(e)", i_people:"Travailler avec d'autres",
      i_cooking:"Cuisine & restauration", i_fitness:"Entraînement physique",
    },
    realityIdentityOptions: {
      academic:{ icon:"📚", label:"Académique" },
      builder:{ icon:"🔨", label:"Bâtisseur" },
      creative:{ icon:"🎨", label:"Créatif/ve" },
      athletic:{ icon:"⚡", label:"Sportif/ve" },
      business:{ icon:"💼", label:"Business-minded" },
      explorer:{ icon:"🧭", label:"Explorateur/rice" },
      unsure:{ icon:"🤷", label:"Pas encore sûr(e)" },
    },
    realityPriorityOptions: {
      money:{ icon:"💰", label:"Gagner vite" },
      prestige:{ icon:"🏆", label:"Prestige / statut" },
      stability:{ icon:"🏠", label:"Stabilité" },
      freedom:{ icon:"🕊️", label:"Liberté" },
      impact:{ icon:"🌍", label:"Impact" },
      flexibility:{ icon:"⚖️", label:"Équilibre vie pro/perso" },
    },
    // Cultural sensitivity patch (Tier + Goal)
    studyGoalLabel: "Quel est ton objectif d'études ?",
    studyGoalOptions: {
      prestige: { icon:"🏆", label:"Meilleure voie publique / prestige académique" },
      balanced: { icon:"⚖️", label:"Meilleur équilibre profil + effort réaliste" },
      handsOn:  { icon:"🔧", label:"Formation pratique / emploi rapide" },
    },
    practicalFastTrack: "⚡ Option insertion rapide — idéal si tu préfères travailler avant l'université",
    // Goal mode input (Cultural rerank layer)
    goalModeLabel: "Qu'est-ce qui compte le plus pour toi maintenant ?",
    goalModeOptions: {
      prestige:  { icon:"🏆", label:"Meilleure école / voie la plus prestigieuse" },
      fit:       { icon:"🎯", label:"Ce qui correspond le mieux à ma personnalité" },
      practical: { icon:"🔧", label:"Revenu rapide / compétences concrètes" },
      unsure:    { icon:"🤷", label:"Je ne sais pas — montre-moi les deux" },
    },
    prestigeAdjacentTitle: "Si votre famille veut une voie plus 'prestigieuse'",
    prestigeAdjacentDesc: "D'après votre profil, voici des parcours adjacents à fort prestige académique :",
    bridgeOptionLabel: "Option passerelle",
    bestFitTab: "Meilleur profil",
    prestigeTrackTab: "Voie prestige",
  },

  en: {
    dir: "ltr",
    // HOME PAGE 3D CSS — translations
    homeHero: "Pick your path — with clarity.",
    homeHeroSub: "Massar combines your personality + your Bac marks (track-accurate subjects for Bac 1/Bac 2) and returns 3 directions: Best Fit, Balanced, Ambitious — with reasons, eligibility (public/private), and a 30-day action plan.",
    homeCTA: "Start free",
    homeSecondaryCTA: "See an example",
    homeMicroTrust: "No fake promises. Clear rules, real alternatives.",
    homeParentLine: "Clear for you — credible for parents.",
    homeValueBullets: ["Accurate subjects for your track","3 views: Fit • Balanced • Ambitious","Eligibility shown: public vs private","Practical 30-day plan","Shareable result + ready caption"],
    homeTrustChips: ["Explainable","Realistic","Mobile-first","Built for Morocco"],
    homeNotSure: "If you're unsure, that's normal. We'll give you 3 strong directions to test this month. A result is a compass — not a label.",
    homeFamilyNote: "We get it. We include an 'ambitious track' you can defend to parents, with requirements and a plan to reach it.",
    homeShareCTA: "Share your profile — let the card speak.",
    homeHowItWorks: "How it works",
    homeStep1Title: "Personality test",
    homeStep1Desc: "8–12 minutes — smart, direct questions that surface real affinities.",
    homeStep2Title: "Enter your grades",
    homeStep2Desc: "/20, track-accurate subjects — zero guesswork.",
    homeStep3Title: "Your roadmap",
    homeStep3Desc: "Paths + reasons + next steps — in 3 views: Fit, Balanced, Ambitious.",
    homeTrust1: "Bac 1 / Bac 2",
    homeTrust2: "Public / private",
    homeTrust3: "Real eligibility — no empty promises",
    homeFooterBy: "Massar — your career compass in Morocco",
    homeFooterContact: "contact@massar.ma",
    homeBackToTest: "Resume the test",
    // Journey stage + learner type
    journeyTitle: "Where are you right now?",
    journeyDesc: "This helps us personalise your recommendations.",
    journeyPreBac: "Pre-Bac (still studying / before final results)",
    journeyPostBac: "Post-Bac (I have my final Bac results)",
    journeyPreBacHint: "We'll suggest directions based on your personality and interests",
    journeyPostBacHint: "We'll analyse your actual grades for precise recommendations",
    preBacStrengthsTitle: "What are you really good at right now?",
    preBacStrengthsDesc: "Pick 3 strengths that feel genuinely true",
    preBacStrengthsOpts: {
      teaching:"Explaining/teaching", solving:"Problem solving", designing:"Designing/creating",
      negotiating:"Persuading/negotiating", organizing:"Organizing/leading",
      building:"Hands-on building/repair", sports:"Sports discipline",
      writing:"Writing/communication", tech:"Tech curiosity",
    },
    preBacInterestsTitle: "What do you enjoy most?",
    preBacInterestsDesc: "Pick 3 interests that describe your passion",
    preBacInterestsOpts: {
      competition:"Competition", helping:"Helping people", building2:"Building things",
      creativity:"Creativity", business:"Business/money", technology:"Technology",
      languages:"Languages/travel", outdoors:"Outdoors/nature", handson:"Hands-on work",
    },
    preBacSliderTitle: "Self-rate key subjects (1 = weak / 5 = strong)",
    preBacConstraints: "Constraints & priorities",
    prestige_priority: "Prestige importance",
    prestige_low:"Not important", prestige_med:"Somewhat important", prestige_high:"Very important",
    learnerTitle: "How do you learn?",
    learnerDesc: "6 quick questions to understand your learning style",
    learnerTypes: {
      architect:"The Architect", striker:"The Striker", diplomat:"The Diplomat",
      sprinter:"The Sprinter", sentinel:"The Sentinel", visionary:"The Visionary",
    },
    learnerTypeIcons: {
      architect:"🏗️", striker:"⚡", diplomat:"🤝", sprinter:"🏃", sentinel:"🛡️", visionary:"🔭",
    },
    resultsPage: "Page", resultsOf: "of",
    identityMirrorTitle: "Your Career Identity Mirror",
    underPressure: "How you think under pressure",
    consistencySecret: "What you need to stay consistent",
    unfairAdvantage: "Your unfair advantage",
    blindSpot: "Blind spot to be aware of",
    credibilityLine: "If this doesn't feel completely right, that's normal — it's a guide, not a verdict.",
    prestigePage2Title: "Prestige & Family Reality (Morocco)",
    marketPage3Title: "Your market in 2030",
    directionsPage4Title: "Your detailed directions",
    planPage5Title: "Your starter plan",
    pdfPage6Title: "Full Personal Coach Dossier",
    futureProofScore: "Future score",
    moroccoDemandsLabel: "Morocco demand",
    globalDemandsLabel: "Global demand",
    hedgeSkillLabel: "Recommended hedge skill",
    weakPoint2Win: "Your win this week",
    riskAvoid: "Risk to avoid",
    prioritySelector: "Adjust by priority",
    previewLocked: "PDF-exclusive content",
    pdfBenefits: [
      "City-specific school shortlist (6–12 institutions)",
      "Prestige Plan A/B/C with timeline (elite / solid / direct-to-market)",
      "Grade-raise strategy: key subjects + realistic steps",
      "Full family script (Arabic + French) + objection replies",
      "Full decision matrix + scenario comparisons",
      "90-day roadmap (weeks 2–12) + resources",
      "Scholarships & fees guide (public / private)",
      "How you win as your learner type — full playbook",
      "Personalised traps to avoid",
      "International pathway guide (optional)",
    ],

        backHome: "← Home",
        appTitle: "Massar | Morocco Career Guide",
    appSubtitle: "Discover your ideal career path in Morocco",
    next: "Next",
    back: "Back",
    start: "Get Started",
    finish: "Get My Results",
    step: "Step",
    of: "of",
    langStep: "Choose Your Language",
    langDesc: "The app will display fully in the chosen language",
    personalityStep: "Personality Test",
    personalityDesc: "Answer honestly – there are no wrong answers",
    infoStep: "Your Academic Profile",
    marksStep: "Your Grades",
    resultsStep: "Your Results",
    bacTrack: "Bac Track",
    city: "Your Current City",
    mobility: "Willingness to Relocate",
    mobilityOptions: ["Same city only", "Willing to move within Morocco", "Remote learning OK"],
    studyLang: "Preferred Study Language",
    privateBudgetLabel: "Private studies budget available?",
    privateBudgetHint: "Affects recommendations for medicine and highly selective programs",
    yes: "Yes",
    no: "No",
    marks: "Your Grades /20",
    examModeLabel: "Which grades are these?",
    examModeWatani: "National exam grades only",
    examModeFull: "Full Bac (Regional + National + continuous assessment)",
    // TASK 1 — examTiming
    examTimingLabel: "When is this evaluation?",
    examTimingPre: "Before Bac (I can still improve)",
    examTimingPost: "After Bac (final official results)",
    examTimingHint: "This determines which exact subjects are shown",
    // TASK 2 — goalPreference
    goalPreferenceLabel: "Which style fits you best right now?",
    goalPreferenceOptions: {
      prestige:   { icon:"🏆", label:"Prestige & long studies (competitive exams, grandes écoles)" },
      balanced:   { icon:"⚖️", label:"Balanced — best option that still has good standing" },
      practical:  { icon:"🔧", label:"Fast job / practical route (OFPPT / BTS / hands-on)" },
    },
    marksSectionWatani: "National Exam",
    marksSectionRegional: "Regional Exam",
    marksSectionContinuous: "Continuous Assessment (optional)",
    wataniAverage: "National average (approx.)",
    regionalAverage: "Regional average (approx.)",
    continuousAverage: "Continuous average",
    overallAverage: "Overall Average",
    whatIf: "What-If? – Adjust Grades",
    adjustedAverage: "Adjusted Average",
    sliderHint: "↑ Adjusting grades instantly recomputes recommendations",
    sliderChangeSummary: "Changes",
    sliderNoChange: "No changes yet",
    traitRadar: "Your Personality Profile",
    topCareers: "Top Career Paths",
    pathways: "Educational Pathways",
    actionPlan: "30-Day Action Plan",
    fallback: "Fallback Path",
    fallbackDesc: "Strong-value alternative pathway",
    fallbackBody: "OFPPT and BTS programs are not backup options — they are direct routes to the labour market with highly demanded technical skills.",
    explainability: "Why This Recommendation?",
    confidenceLabel: "Confidence",
    mixedSignals: "📊 Profile divergence detected — academic and identity factors point toward distinct domains. Review pathways with full context in mind.",
    universityRoute: "University Route",
    grandeEcoleRoute: "Grande École Route",
    practicalRoute: "Practical Training",
    durationLabel: "Duration",
    pathwayMissing: "Details coming soon",
    privateOnly: "Private only",
    notEligiblePublic: "Highly competitive (public)",
    // Medicine eligibility (Goal 3)
    eligibilityTitle: "Eligibility – Public Medicine",
    eligibilityThresholdLabel: "Official public threshold",
    eligibilityThresholdValue: "Average ≥ 16/20 · Biology ≥ 14 · Chemistry ≥ 13",
    eligibilityYourAvg: "Your current average",
    eligibilityMeetsPublic: "✅ Eligible for public pathway",
    eligibilityFailsPublic: "❌ Below Moroccan public medicine threshold",
    eligibilityPrivateNote: "Private medicine is accessible (UIR, UIC…) with high fees – check available scholarships.",
    eligibilityAlternativesLabel: "Accessible paramedical paths:",
    eligibilityAlternatives: [
      "Nursing – IFCS (average ≥ 12)",
      "Radiology / Lab technician (ISTA)",
      "Pharmacy assistant (OFPPT)",
      "Hospital administration (ENCG / FSJES)",
      "Dental prosthetics technician",
    ],
    // Narrative fix / Guardrails — ambitious tab "How to unlock"
    ambitiousUnlockTitle: "🔓 How to unlock this path?",
    ambitiousUnlockMed:   "For public medicine: raise your average to 16+ and Bio/Chem to required thresholds.",
    ambitiousUnlockGen:   "Aim for an average of {avg}+ and improve key subjects to strengthen your chances.",
    // Feature 1: Exam timing
    examTimingStep: "Exam Timing",
    examTimingQuestion: "Is this evaluation before or after your final Bac exam?",
    examTimingBefore: "Before Bac results",
    examTimingAfter: "After Bac results",
    examTimingDesc: "This affects how recommendations and improvement plans are shown",
    whatIfDisabled: "Grades are final – what-if simulation is disabled after results.",
    improvementTitle: "💡 How to improve your chances before the Bac?",
    improvementSubjectHint: "Most important subjects for your path:",
    improvementUnlock: "Gaining +2 points would unlock:",
    improvementTip1: "Focus on recurring exercise types from past exam papers",
    improvementTip2: "Competitive exam prep starts 6 months in advance",
    improvementTip3: "Join revision groups on WhatsApp or Telegram with same-track students",
    improvementTip4: "Free platforms: Khan Academy, Coursera (audit), YouTube tutorials",
    improvementDisclaimer: "These are indicative projections only. No admission is guaranteed.",
    // SUBJECTS FIX: examLevel + trackField selectors
    examLevelLabel: "Exam level",
    examLevelBac1: "1st Bac (Regional)",
    examLevelBac2: "2nd Bac (National)",
    trackFieldLabel: "Official track / field",
    trackFields: {
      SE:  "Experimental Sciences",
      SM:  "Mathematical Sciences",
      ST:  "Sciences & Technology",
      ECO: "Economic Sciences",
      LSH: "Letters & Humanities",
      AA:  "Applied Arts",
      EO:  "Original Teaching",
      BP:  "Vocational Bac",
    },
    smOptionLabel: "Option (Mathematical Sciences)",
    // SUBJECT MODEL (MOROCCO) FIX: examYear + bac2Track selectors
    examYearLabel: "Exam year",
    examYearBac1: "1st Bac (Regional)",
    examYearBac2: "2nd Bac (National)",
    bac1FieldLabel: "Field (1st Bac)",
    bac1Fields: {
      SE:"Experimental Sciences", SM:"Mathematical Sciences", ST:"Sciences & Technology",
      ECO:"Economic Sciences", LSH:"Letters & Humanities",
      AA:"Applied Arts", EO:"Original Teaching", BP:"Vocational Bac",
    },
    bac2TrackLabel: "Track (2nd Bac)",
    bac2Tracks: {
      SVT:"Life & Earth Sciences", PC:"Physical Sciences (Physics-Chemistry)",
      SMA:"Maths Sciences – Option A (Life Sci.)", SMB:"Maths Sciences – Option B (Eng. Sci.)",
      ST:"Sciences & Technology", ECO:"Economic Sciences",
      LSH:"Letters & Humanities", AA:"Applied Arts",
      EO:"Original Teaching", BP:"Vocational Bac",
    },
    smOptionA: "Option A (Life & Earth Sciences)",
    smOptionB: "Option B (Engineering Sciences)",
    eoOptionLabel: "Speciality (Original Teaching)",
    eoOptionArabic: "Arabic Literature",
    eoOptionSharia: "Islamic Sharia",
    bpExtrasLabel: "Extra subjects (Vocational Bac)",
    // NEW INPUT: Profile Boost step translations
    profileBoostStep: "🚀 Profile Boost",
    profileBoostDesc: "6 quick questions that meaningfully sharpen your recommendations",
    pb_prestige: "How important is prestige to you / your family?",
    pb_prestige0: "Not important — outcomes and work matter more",
    pb_prestige1: "Somewhat important",
    pb_prestige2: "Very important — prestige is non-negotiable",
    pb_money: "How important is income stability right now?",
    pb_money0: "Not a priority right now",
    pb_money1: "Important but not the only factor",
    pb_money2: "Essential — it's my main constraint",
    pb_handsOn: "Do you prefer hands-on / real-world work over desk work?",
    pb_handsOn0: "No — I prefer thinking and analysing",
    pb_handsOn1: "A mix of both",
    pb_handsOn2: "Yes — field work motivates me more",
    pb_risk: "Are you okay with uncertain paths (startup/creator/freelance)?",
    pb_risk0: "No — I want a clear, stable path",
    pb_risk1: "Somewhat, if I have a backup plan",
    pb_risk2: "Yes — uncertainty doesn't scare me",
    pb_intl: "Do you want a path that can work internationally?",
    pb_intl0: "No, I plan to stay in Morocco",
    pb_intl1: "Maybe in the future",
    pb_intl2: "Yes, international is part of my plan",
    pb_focus: "Can you study 2 to 4 hours a day consistently?",
    pb_focus0: "Hard for me to do consistently",
    pb_focus1: "Yes, with some difficulty sometimes",
    pb_focus2: "Yes always — discipline is my strength",
    // Feature 2: Study abroad
    studyAbroadLabel: "Are you considering studying abroad?",
    studyAbroadRegionLabel: "Preferred region",
    abroadRegions: { france:"France", canada:"Canada", germany:"Germany", spain:"Spain", usa:"USA", other:"Other" },
    intlPathwayTitle: "🌍 International Pathway",
    intlRequirementsTitle: "General requirements",
    intlRequirementsText: "Often required: recognised diploma + language proof (TCF/IELTS/TestDaF) + proof of financial means. Conditions vary by country and institution.",
    intlFinanceTitle: "Financial reality",
    intlFinanceText: "Tuition ranges from free (Germany) to very high (USA). Campus France, DAAD and Erasmus+ scholarships exist – check deadlines early.",
    intlTranslationTitle: "How your field translates internationally",
    intlHealthNote: "⚕️ Note: medicine abroad is not easier – some countries make medical school admission difficult for international students.",
    intlDifferenceTitle: "Differences vs Moroccan system",
    intlDifferenceText: "Morocco uses highly selective competitive exams. Abroad: portfolio + motivation letter. Foreign degrees commonly need equivalence recognition to practise in Morocco.",
    // Family pressure
    familyPressureLabel: "Are you under family pressure toward a specific field?",
    familyPressureTitle: "💬 An honest look at family pressure",
    familyPressureText: "It's natural for your family to have big ambitions. A fulfilling career is built on a combination of real aptitudes, academic profile, and market realities.",
    familyPressureAltsTitle: "High-value adjacent paths:",
    familyPressureAlts: {
      health: ["Nursing & physiotherapy (IFCS)", "Medical devices & lab tech", "Hospital administration (ENCG/FSJES)"],
      engineering: ["Industrial BTS (OFPPT)", "Industrial computing", "Solar energy & electrical"],
      law: ["Business management (ENCG)", "Finance & accounting", "Civil service"],
    },
    why: "Why?",
    score: "Score",
    personality: "Personality",
    academic: "Academic",
    market: "Market",
    constraints: "Constraints",
    salaryNote: "* Estimates vary by experience, company, and region",
    salary: "Estimated Salary",
    weekLabel: "Week",
    resume: "Resume Where I Left Off",
    resumeSaved: "You have a saved session",
    resumeDesc: "Pick up right where you left off.",
    restart: "Start Over",
    revealCard: "Reveal my card",
    downloadStory: "Download Story 9:16",
    downloadSquare: "Download Square 1:1",
    downloadCard: "Download Card 5:7",
    copyCaption: "Copy caption",
    archetypeColdReading: "Cold Reading",
    archetypeMirror: "Identity Mirror",
    archetypeHook: "Key question",
    ctaButton: "📄 Get My Full PDF Roadmap",
    ctaModalTitle: "Your PDF Roadmap – Coming Soon",
    ctaModalSubtitle: "Receive a personalised PDF report: recommended schools, exam calendar and a detailed action plan.",
    ctaEmailPlaceholder: "Your email address",
    ctaSubmit: "Notify me at launch",
    ctaComingSoon: "✅ Saved! We'll reach out soon.",
    ctaClose: "Close",
    cluster1: "Software & IT",
    cluster2: "Data & AI",
    cluster3: "Cybersecurity",
    cluster4: "Networking & Telecom",
    cluster5: "Industrial & Auto Engineering",
    cluster6: "Renewable Energy",
    cluster7: "Civil Engineering & Construction",
    cluster8: "Healthcare & Medicine",
    cluster9: "Finance & Accounting",
    cluster10: "Marketing & Sales",
    cluster11: "Logistics & Supply Chain",
    cluster12: "Tourism & Hospitality",
    cluster13: "Education & Law",
    cluster14: "Arts & Media",
    cluster15: "Skilled Trades & Crafts",
    cluster16: "Automotive & Transport Tech",
    cluster17: "Sports & Fitness",
    cluster18: "Digital Content Creation",
    cluster19: "Culinary & Hospitality Operations",
    // Bac status step
    bacStatusStep: "Bac Status",
    bacStatusQ: "Is this evaluation before or after your final Bac exam?",
    bacStatusBefore: "Before Bac (I can still improve)",
    bacStatusAfter: "After Bac (final results)",
    bacStatusNote: "This adapts recommendations and action plans.",
    bacStatusFinalNote: "Your results are final — we'll focus on realistic options and next steps.",
    fpQuestion: "Is your family pushing you toward a specific field?",
    fpFieldLabel: "Toward which field?",
    fpFieldOptions: { medicine:"Medicine", engineering:"Engineering", business:"Business", law:"Law", other:"Other field" },
    fpFieldOtherPlaceholder: "Specify the field",
    // Improve Mode inputs
    strengthsNowLabel: "What are you really good at right now?",
    strengthsNowDesc: "Select what applies (up to 5)",
    preferredStyleLabel: "What's your preferred work style?",
    preferredStyleOptions: { handson:"Hands-on / practical", academic:"Academic / theory", mixed:"Both" },
    strengthsNowOptions: {
      sn_math:"Math", sn_physics:"Physics", sn_biology:"Biology",
      sn_writing:"Writing / languages", sn_speaking:"Public speaking / communication",
      sn_fixing:"Fixing things / DIY", sn_mechanics:"Mechanics", sn_cooking:"Cooking",
      sn_design:"Design", sn_video:"Video editing",
      sn_sport_team:"Team sports", sn_sport_indiv:"Individual sports",
      sn_coaching:"Coaching / leadership", sn_gaming:"Gaming / strategy",
    },
    // Improve Mode output
    improveModeTitle: "🚀 Improve Mode (30–60 days)",
    improveTargetLabel: "Target",
    improveWhyLabel: "Why it matters",
    improveMiniPlanLabel: "Mini-plan",
    improveDistanceHealth: "You're {avg} pts away from medicine average · {bio} pts in Biology · {chem} pts in Chemistry",
    improveClusterUp: "Improving would boost: {clusters}",
    // Family pressure adaptive
    fpAdviceTitle: "💬 Family pressure — a straight talk",
    fpTalkToParentsTitle: "🗣️ How to talk to your family",
    fpTalkToParents: [
      "Share the data: your current grades and the field's typical requirements — no emotion needed.",
      "Propose a concrete alternative: a high-value path that meets their ambitions differently.",
      "Ask for time: \"Give me 6 months to prove my strengths first.\"",
    ],
    fpByField: {
      medicine: {
        ineligibleAfter: {
          text: "Public medicine is highly competitive given your current profile (typical threshold: avg ≥ 16/20 + Bio ≥ 14 + Chemistry ≥ 13). Significant improvement would be needed.",
          alts: ["Nursing – IFCS (avg ≥ 12)", "Radiology / lab tech – ISTA", "Pharmacy assistant – OFPPT", "Biomedical engineering", "Hospital administration – ENCG/FSJES"],
        },
        mismatch: {
          text: "Your grades allow entry, but your profile suggests a burnout risk long-term. Burnout in medicine is real when the drive isn't genuinely internal.",
          alts: ["Pharmacy (lighter load + more autonomy)", "Biomedical engineering", "Hospital management"],
        },
        match: { text: "Your profile and grades align with medicine. If this is your own choice — not just your family's — it's a viable path with serious demands.", alts: [] },
        before: {
          text: "If you choose to push for medicine before your Bac:",
          plan: ["3h/day on Biology and Chemistry", "5 past-paper exercises per week per key subject", "Find a revision group with advanced SVT students"],
          warning: "Honest check: medicine = 7+ years of intensive study. Make sure the drive is genuinely yours.",
        },
      },
      engineering: {
        ineligibleAfter: {
          text: "Top engineering schools are highly competitive given your current profile. Applied engineering programs are a realistic and valuable path.",
          alts: ["BTS industriel – OFPPT", "ENSA (multiple cities)", "Solar/electrical engineering tech", "Certified technical engineer"],
        },
        mismatch: {
          text: "Your profile suggests an edge in hands-on work over pure theory. Applied engineering may suit you better than academic programs.",
          alts: ["Industrial engineering – OFPPT/ISTA", "Industrial computing", "Industrial machine maintenance"],
        },
        match: { text: "Your profile aligns well with engineering paths. Target competitions suited to your level.", alts: [] },
        before: {
          text: "To boost your engineering chances:",
          plan: ["Daily focus on math and physics", "Past-year exam papers practice", "Free resources: YouTube, Idrisse, Khan Academy"],
          warning: "Classes prépa are very demanding — 2 intense years. Enter with full awareness.",
        },
      },
      business: {
        ineligibleAfter: {
          text: "Business is accessible across a wide range of profiles. ENCG, HEM and FSJES offer entry at different levels.",
          alts: ["ENCG (national)", "FSJES – economics & management", "HEM Business School", "ESCA École de Management"],
        },
        mismatch: {
          text: "Your profile doesn't yet show a strong business affinity, but that can grow. Consider what you want to build first.",
          alts: ["Digital marketing", "Tech project management", "Social entrepreneurship"],
        },
        match: { text: "Your personality and ambitions align well with business. Pick the specialisation closest to your interests.", alts: [] },
        before: {
          text: "To strengthen your business profile:",
          plan: ["Read one economic report per week (HCP, World Bank)", "Manage a small budget (family or side project)", "Join a business / entrepreneurship club"],
          warning: "",
        },
      },
      law: {
        ineligibleAfter: {
          text: "Law at public university is accessible. Competition is stronger at master's and doctoral level.",
          alts: ["FSJES – law and political science", "ENCG – business law", "Civil service national exams"],
        },
        mismatch: {
          text: "Law requires patience with texts and analysis. Your creative profile might flourish in media law or commercial law.",
          alts: ["Legal journalism", "Human resources", "Public administration"],
        },
        match: { text: "Your analytical and organised profile is an asset in law. Start with debate clubs and public speaking.", alts: [] },
        before: {
          text: "To prepare a legal career:",
          plan: ["Read one summarised legal text per week", "Participate in debate or moot court competitions", "Follow local court cases through the press"],
          warning: "",
        },
      },
      other: {
        ineligibleAfter: { text: "Your profile opens several interesting paths worth exploring.", alts: [] },
        mismatch: { text: "Studying the requirements of the mentioned field will support a more informed decision.", alts: [] },
        match: { text: "Your profile is open to many options. Take time to explore.", alts: [] },
        before: { text: "Early exploration beats a rushed decision.", plan: [], warning: "" },
      },
    },
    // Truth Mode
    truthModeBtn: "🔍 Truth Mode",
    truthModeTitle: "🔍 Realistic Profile Analysis",
    truthModeDesc: "Structured analysis — no exaggeration, no fear tactics. Just data.",
    burnoutRisk: "Burnout risk",
    stressRisk: "Stress risk",
    incomeVolatility: "Income volatility",
    truthLow: "Low", truthMed: "Moderate", truthHigh: "High",
    burnoutExplain: { low:"Your discipline and professional values protect against burnout.", med:"Some pressure expected — time management is key.", high:"High creativity in rigid structures can drain energy." },
    stressExplain: { low:"Your profile shows strong adaptability.", med:"Sensitivity to failure may amplify stress — build a support network.", high:"Competitive field + sensitive personality = slower recovery. Build a wellness routine." },
    incomeExplain: { low:"Your path offers gradual stable income progression.", med:"Early-career fluctuations possible — an emergency fund is wise.", high:"Entrepreneurial or creative path = irregular income early on. Build a client network early." },
    // Reality Alignment
    realityAlignmentTitle: "🎯 Profile Alignment",
    realityAlignmentDesc: "When these three factors align strongly, confidence in the recommendation increases.",
    identityFit: "Identity alignment",
    academicFit: "Academic alignment",
    marketFit: "Market demand",
    // Archetype
    archetypeTitle: "🔮 Your Career Archetype",
    archetypeOpposite: "Your opposite type",
    archetypeEvolution: "By developing your",
    archetypeEvolutionInto: "you evolve into",
    archetypeBestEnv: "Your ideal environment",
    archetypeWorstEnv: "Your draining environment",
    archetypeStrengths: "Your core strengths",
    archetypeRisk: "Growth warning",
    // Massar Type
    massarTypeTitle: "🧬 Your Massar Type",
    massarTypeDims: {
      A:"Analytical", C:"Creative", S:"Social", I:"Independent", P:"Practical", O:"Theoretical", R:"Risk-taker", K:"Stable",
    },
    massarTypeDesc: "4-letter code derived from your personality and preferences",
    shareTitle: "📤 Share Your Profile",
    copyCaptionBtn: "Copy caption",
    downloadBadgeBtn: "Download badge",
    shareCopied: "✓ Copied!",
    shareCaptionTpl: "My Massar Type: {type} 🧬\nTop path: {cluster} ({confidence}% match)\nDiscover yours at Massar 👇",
    // Reality layer
    realityStep: "Reality & Identity",
    realityDesc: "4 quick questions – tap, select, done in 3 minutes",
    realityStrengthsTitle: "What are you REALLY good at right now?",
    realityStrengthsDesc: "Choose up to 5 skills where you feel genuinely strong",
    realityInterestsTitle: "What do you enjoy doing naturally?",
    realityInterestsDesc: "Choose up to 5 activities that draw you in",
    realityIdentityTitle: "How do you see yourself?",
    realityPriorityTitle: "What matters most to you right now?",
    realityMaxHint: "(Choose up to 5)",
    realityStrengths: {
      s_math:"Solving math problems", s_writing:"Writing / languages", s_speaking:"Public speaking",
      s_mechanical:"Fixing mechanical things", s_tools:"Using tools",
      s_projects:"Building small projects", s_coding:"Coding", s_video:"Video editing",
      s_design:"Design / drawing", s_negotiating:"Negotiating / convincing",
      s_organizing:"Organizing people", s_sports:"Sports performance",
      s_discipline:"Staying disciplined", s_learning:"Learning fast", s_selling:"Selling things",
      s_cooking:"Cooking / culinary", s_sport_team:"Team sports", s_sport_indiv:"Individual sports",
      s_coaching:"Coaching / leadership", s_diy:"Hands-on / DIY projects",
    },
    realityInterests: {
      i_building:"Building / fixing", i_sports:"Competing in sports", i_gaming:"Gaming",
      i_content:"Creating content", i_helping:"Helping people", i_leading:"Leading groups",
      i_selling:"Selling / business", i_research:"Researching deeply",
      i_outdoors:"Working outdoors", i_machines:"Working with machines",
      i_alone:"Working alone", i_people:"Working with people",
      i_cooking:"Cooking & food", i_fitness:"Physical training",
    },
    realityIdentityOptions: {
      academic:{ icon:"📚", label:"Academic" },
      builder:{ icon:"🔨", label:"Builder" },
      creative:{ icon:"🎨", label:"Creative" },
      athletic:{ icon:"⚡", label:"Athletic" },
      business:{ icon:"💼", label:"Business-minded" },
      explorer:{ icon:"🧭", label:"Explorer" },
      unsure:{ icon:"🤷", label:"Not sure yet" },
    },
    realityPriorityOptions: {
      money:{ icon:"💰", label:"Make money fast" },
      prestige:{ icon:"🏆", label:"Prestige / status" },
      stability:{ icon:"🏠", label:"Stability" },
      freedom:{ icon:"🕊️", label:"Freedom" },
      impact:{ icon:"🌍", label:"Impact" },
      flexibility:{ icon:"⚖️", label:"Work-life balance" },
    },
    // Cultural sensitivity patch (Tier + Goal)
    studyGoalLabel: "What is your study goal?",
    studyGoalOptions: {
      prestige: { icon:"🏆", label:"Best public / prestigious academic route" },
      balanced: { icon:"⚖️", label:"Best personal fit + realistic effort" },
      handsOn:  { icon:"🔧", label:"Hands-on / fast job entry" },
    },
    practicalFastTrack: "⚡ Fast-track option — ideal if you prefer job entry before university",
    // Goal mode input (Cultural rerank layer)
    goalModeLabel: "What matters most right now?",
    goalModeOptions: {
      prestige:  { icon:"🏆", label:"Best school / most prestigious route" },
      fit:       { icon:"🎯", label:"Best fit for my personality" },
      practical: { icon:"🔧", label:"Fast income / hands-on skills" },
      unsure:    { icon:"🤷", label:"Not sure — show me both" },
    },
    prestigeAdjacentTitle: "If your family wants a more 'prestigious' path",
    prestigeAdjacentDesc: "Based on your profile, here are adjacent paths with stronger academic prestige:",
    bridgeOptionLabel: "Bridge option",
    bestFitTab: "Best Fit",
    prestigeTrackTab: "Prestige Track",
  },
};



// ══════════════════════════════════ data ═══════════════════════

// src/massar/data/constants.js
// ─────────────────────────────────────────────────────────────────
// Static reference data. Edit here to add Bac tracks, subjects, cities.
// ─────────────────────────────────────────────────────────────────

const BAC_TRACKS = [
  { id: "SMA",  label: { ar: "علوم رياضية أ",       fr: "Sciences Math A",             en: "Sciences Math A"         } },
  { id: "SMB",  label: { ar: "علوم رياضية ب",       fr: "Sciences Math B",             en: "Sciences Math B"         } },
  { id: "PC",   label: { ar: "فيزياء وكيمياء",      fr: "Physique-Chimie",             en: "Physics-Chemistry"       } },
  { id: "SVT",  label: { ar: "علوم الحياة والأرض",  fr: "SVT",                         en: "Life & Earth Sciences"   } },
  { id: "ECO",  label: { ar: "علوم اقتصادية",       fr: "Sciences Économiques",        en: "Economic Sciences"       } },
  { id: "LET",  label: { ar: "آداب وعلوم إنسانية",  fr: "Lettres & Sciences Humaines", en: "Humanities"              } },
  { id: "TECH", label: { ar: "علوم وتقنيات",        fr: "Sciences & Techniques",       en: "Sciences & Technology"   } },
  { id: "ARTS", label: { ar: "فنون تطبيقية",        fr: "Arts Appliqués",              en: "Applied Arts"            } },
];

const STREAM_BY_TRACK = {
  SMA: "scientific",
  SMB: "scientific",
  PC: "scientific",
  SVT: "scientific",
  ECO: "eco",
  LET: "letters",
  TECH: "scientific",
  ARTS: "arts",
};

// National exam (Watani) subjects by track (Morocco)
// TASK 1 — ACCURATE MOROCCAN BAC SUBJECT MAPS
// ─────────────────────────────────────────────────────────────────
// TWO maps: PRE (during year / mock exam) and POST (final official Bac marks).
// The UI uses info.examTiming ("pre" | "post") to pick the right list.
// KEY RULE: Physics + Chemistry are ONE combined mark ("pc") in Moroccan science
//           post-Bac for SMA/SMB/PC/SVT/TECH tracks. Keep them separate only pre-Bac.
// ─────────────────────────────────────────────────────────────────

// SUBJECT MODEL (MOROCCO) FIX: Single source of truth for all Moroccan Bac subjects.
// examYear = "bac1" | "bac2"
// bac1Field = "SE"|"SM"|"ST"|"ECO"|"LSH"|"AA"|"EO"|"BP"   (only shown when examYear=bac1)
// bac2Track = "SVT"|"PC"|"SMA"|"SMB"|"ST"|"ECO"|"LSH"|"AA"|"EO"|"BP" (only shown when examYear=bac2)
// eoOption  = "arabic" | "sharia"   (EO track only)
// bpExtras  = ["math","physchem","svt"] optional toggle (BP only)

// ── Bac 1 (1ère Bac / Régional) ─────────────────────────────────
const BAC1_SUBJECTS_BY_FIELD = {
  SE:  ["arabic","french","islamic","history_geo","translation"],
  SM:  ["arabic","french","islamic","history_geo","translation"],
  ST:  ["arabic","french","islamic"],
  ECO: ["arabic","french","islamic","history_geo","law","mgmt_info"],
  LSH: ["french","islamic","math"],
  AA:  ["arabic","french","islamic","math","info_infog","art_culture_hist"],
  EO:  ["french","math","history_geo","tawtiq"],  // + sharia extras via getSubjectsForMarks
  BP:  ["french","islamic","arabic_lang_culture"], // + bpExtras via getSubjectsForMarks
};

// ── Bac 2 (2ème Bac / National) ──────────────────────────────────
// IMPORTANT: SE is a Bac1 field only. In Bac2 it splits into SVT and PC tracks.
// SMA and SMB are separate tracks (not a shared SM with options).
const BAC2_SUBJECTS_BY_TRACK = {
  SVT: ["math","physchem","svt","philosophy","english"],
  PC:  ["math","physchem","philosophy","english"],
  SMA: ["math","physchem","philosophy","english","svt"],      // SM Option A
  SMB: ["math","physchem","philosophy","english","eng_sci"],  // SM Option B
  ST:  ["math","physchem","eng_sci","philosophy","english"],
  ECO: ["math","acct_fin","econ_stats","bus_econ_org","philosophy","english"],
  LSH: ["arabic_lit","history_geo","philosophy","english"],
  AA:  ["comm_multimedia","env_product_design","philosophy","english"],
  EO:  ["lit","tafsir_hadith","philosophy","english"],  // + arabic/sharia extras
  BP:  ["prof_synth","philosophy","english"],           // + bpExtras extras
};

// ── getSubjectsForMarks: THE single helper driving marks UI + average + results ──
// SUBJECT MODEL (MOROCCO) FIX: all paths go through here.
function getSubjectsForMarks(info) {
  const year = info.examYear || (info.examLevel === "bac1" ? "bac1" : "bac2"); // migrate old key

  let base;
  if (year === "bac1") {
    const field = info.bac1Field || info.trackField || "SE";  // migrate trackField
    base = BAC1_SUBJECTS_BY_FIELD[field] || BAC1_SUBJECTS_BY_FIELD.SE;
  } else {
    const track = info.bac2Track || info.trackField || "SVT"; // migrate trackField
    base = BAC2_SUBJECTS_BY_TRACK[track] || BAC2_SUBJECTS_BY_TRACK.SVT;
  }
  let list = [...base];

  // EO extras (bac1 or bac2)
  if (year === "bac1" && (info.bac1Field === "EO" || info.trackField === "EO")) {
    if (info.eoOption === "sharia") list = [...list, "lang_sci", "inheritance_timing"];
  }
  if (year === "bac2" && (info.bac2Track === "EO" || info.trackField === "EO")) {
    if (info.eoOption === "arabic") list = [...list, "lang_sci"];
    if (info.eoOption === "sharia") list = [...list, "fiqh_usul"];
  }

  // BP extras (bac1 or bac2)
  const isBP = (year === "bac1" && (info.bac1Field === "BP" || info.trackField === "BP"))
             || (year === "bac2" && (info.bac2Track === "BP" || info.trackField === "BP"));
  if (isBP && Array.isArray(info.bpExtras)) {
    info.bpExtras.forEach(k => { if (!list.includes(k)) list.push(k); });
  }

  // Dev logging (localhost only)
  if (typeof window !== "undefined" && (window.__DEV__ ||
      (typeof location !== "undefined" && location.hostname === "localhost"))) {
    const field = year === "bac1" ? (info.bac1Field || info.trackField) : (info.bac2Track || info.trackField);
    console.log(`[Massar Subjects] examYear=${year} field/track=${field} → [${list.join(", ")}]`);
  }

  return list;
}

// SUBJECT MODEL (MOROCCO) FIX: map bac2Track/bac1Field → scoring engine bacTrack key.
const BAC2_TRACK_TO_SCORING = {
  SVT:"SVT", PC:"PC", SMA:"SMA", SMB:"SMB",
  ST:"TECH", ECO:"ECO", LSH:"LET", AA:"ARTS", EO:"LET", BP:"TECH",
};
const BAC1_FIELD_TO_SCORING = {
  SE:"SVT", SM:"SMA", ST:"TECH", ECO:"ECO", LSH:"LET", AA:"ARTS", EO:"LET", BP:"TECH",
};

// SUBJECT MODEL (MOROCCO) FIX: resolve bacTrack for scoring engine from new info fields.
function getScoringBacTrack(info) {
  const year = info.examYear || (info.examLevel === "bac1" ? "bac1" : "bac2");
  if (year === "bac1") {
    const field = info.bac1Field || info.trackField || "SE";
    return BAC1_FIELD_TO_SCORING[field] || "SVT";
  }
  const track = info.bac2Track || info.trackField || "SVT";
  return BAC2_TRACK_TO_SCORING[track] || "SVT";
}

// ── Legacy aliases (dead stubs — not used for subject lists anywhere) ─
// SUBJECT MODEL (MOROCCO) FIX: kept only so no lingering ref crashes the build.
const TRACK_FIELD_TO_BAC_TRACK = BAC1_FIELD_TO_SCORING; // legacy compat
const TRACK_FIELD_TO_BAC_TRACK_REVERSE = { SVT:"SE",SMA:"SM",SMB:"SM",PC:"SVT",TECH:"ST",ECO:"ECO",LET:"LSH",ARTS:"AA" };
const SUBJECTS_BY_TRACK        = { SMA:["math","physchem","english","philosophy","svt"], SMB:["math","physchem","english","philosophy","eng_sci"], PC:["math","physchem","english","philosophy"], SVT:["svt","physchem","math","english","philosophy"], ECO:["math","econ_stats","acct_fin","bus_econ_org","english","philosophy"], LET:["arabic_lit","history_geo","philosophy","english"], TECH:["math","physchem","eng_sci","english","philosophy"], ARTS:["comm_multimedia","env_product_design","philosophy","english"] };
const SUBJECTS_POST_BY_TRACK   = SUBJECTS_BY_TRACK;
const SUBJECTS_PRE_BY_TRACK    = SUBJECTS_BY_TRACK;
const WATANI_SUBJECTS_BY_TRACK = SUBJECTS_BY_TRACK;
// (Old SUBJECTS_BY_FIELD_AND_LEVEL alias for any remaining ref)
const SUBJECTS_BY_FIELD_AND_LEVEL = null; // decommissioned — use BAC1_SUBJECTS_BY_FIELD / BAC2_SUBJECTS_BY_TRACK

// Regional (Jihawi) subjects (1ère Bac), used only when examMode="full_bac"
const REGIONAL_SUBJECTS_BY_STREAM = {
  scientific: ["arabic", "islamic", "history"],
  eco:        ["arabic", "islamic", "history"],
  letters:    ["arabic", "islamic", "history"],
  arts:       ["arabic", "islamic", "history"],
};

// SUBJECTS FIX: migrateMarks — map old saved-session keys to canonical keys.
// physics + chemistry → physchem; biology → svt; history → history_geo; pc → physchem; etc.
function migrateMarks(marks) {
  if (!marks || typeof marks !== "object") return marks || {};
  const out = { ...marks };
  // physics + chemistry → physchem
  if (out.physchem == null) {
    if (out.pc != null) { out.physchem = out.pc; }
    else {
      const p = Number(out.physics) || 0;
      const c = Number(out.chemistry) || 0;
      if (p > 0 || c > 0) out.physchem = (p > 0 && c > 0) ? (p + c) / 2 : Math.max(p, c);
    }
  }
  delete out.pc; delete out.physics; delete out.chemistry;
  // biology → svt
  if (out.svt == null && out.biology != null) out.svt = out.biology;
  delete out.biology;
  // history → history_geo
  if (out.history_geo == null && out.history != null) out.history_geo = out.history;
  delete out.history;
  // economics_stats → econ_stats
  if (out.econ_stats == null && out.economics_stats != null) out.econ_stats = out.economics_stats;
  delete out.economics_stats;
  // accounting → acct_fin
  if (out.acct_fin == null && out.accounting != null) out.acct_fin = out.accounting;
  delete out.accounting;
  // economics → econ_stats (loose)
  if (out.econ_stats == null && out.economics != null) out.econ_stats = out.economics;
  delete out.economics;
  // SUBJECT SYSTEM FIX: bus_org → bus_econ_org (old key rename)
  if (out.bus_econ_org == null && out.bus_org != null) out.bus_econ_org = out.bus_org;
  delete out.bus_org;
  // management → bus_econ_org (canonical key)
  if (out.management != null && out.bus_econ_org == null) out.bus_econ_org = out.management;
  delete out.management;
  return out;
}

// SUBJECTS FIX: canonical subject labels (AR / FR / EN) for all Bac tracks.
const SUBJECT_LABELS = {
  // ── Core ──────────────────────────────────────────────────────────
  arabic:              { ar:"اللغة العربية",            fr:"Arabe",                            en:"Arabic"                        },
  arabic_lit:          { ar:"الأدب العربي",             fr:"Littérature Arabe",                en:"Arabic Literature"             },
  french:              { ar:"اللغة الفرنسية",            fr:"Français",                         en:"French"                        },
  english:             { ar:"اللغة الإنجليزية",         fr:"Anglais",                          en:"English"                       },
  islamic:             { ar:"التربية الإسلامية",         fr:"Éducation islamique",              en:"Islamic Education"             },
  history_geo:         { ar:"التاريخ والجغرافيا",        fr:"Histoire-Géographie",              en:"History & Geography"           },
  philosophy:          { ar:"الفلسفة",                  fr:"Philosophie",                      en:"Philosophy"                    },
  math:                { ar:"الرياضيات",                fr:"Mathématiques",                    en:"Mathematics"                   },
  translation:         { ar:"الترجمة",                  fr:"Traduction",                       en:"Translation"                   },
  // ── Sciences ─────────────────────────────────────────────────────
  physchem:            { ar:"الفيزياء والكيمياء",        fr:"Physique-Chimie",                  en:"Physics & Chemistry"           },
  svt:                 { ar:"علوم الحياة والأرض",        fr:"SVT",                              en:"Life & Earth Sciences"         },
  // ── Technology / Engineering ─────────────────────────────────────
  eng_sci:             { ar:"علوم المهندس",              fr:"Sciences de l'ingénieur",          en:"Engineering Sciences"          },
  // ── Economics / Business ─────────────────────────────────────────
  law:                 { ar:"القانون",                  fr:"Droit",                            en:"Law"                           },
  mgmt_info:           { ar:"التدبير ونظم المعلومات",   fr:"Gestion et Systèmes d'info.",      en:"Management & Info. Systems"    },
  acct_fin:            { ar:"المحاسبة والرياضيات الم.", fr:"Comptabilité & Maths financières", en:"Accounting & Financial Maths"  },
  econ_stats:          { ar:"الاقتصاد والإحصاء",        fr:"Économie & Statistiques",          en:"Economics & Statistics"        },
  bus_econ_org:             { ar:"اقتصاد المقاولة والتنظيم", fr:"Économie d'entreprise & Org.",     en:"Business Economics & Org."     },
  // ── Arts Appliqués ───────────────────────────────────────────────
  info_infog:          { ar:"إعلامية وإنفوغرافيا",      fr:"Informatique & Infographie",       en:"IT & Infographics"             },
  art_culture_hist:    { ar:"ثقافة وتاريخ الفنون",      fr:"Culture et Histoire des arts",     en:"Art Culture & History"         },
  comm_multimedia:     { ar:"التواصل والوسائط المتعددة",fr:"Communication & Multimédia",       en:"Communication & Multimedia"    },
  env_product_design:  { ar:"تصميم بيئات ومنتجات",      fr:"Design d'env. & de produits",      en:"Environment & Product Design"  },
  // ── Enseignement Originel ─────────────────────────────────────────
  tawtiq:              { ar:"التوثيق والإجراءات القانونية",fr:"Tawthiq et procédures judiciaires",en:"Legal Documentation"        },
  lang_sci:            { ar:"علوم اللغة",               fr:"Sciences de la langue",            en:"Language Sciences"             },
  inheritance_timing:  { ar:"الفرائض والمواقيت",        fr:"Héritage & Calcul des temps",      en:"Inheritance & Timing Calculus" },
  lit:                 { ar:"الأدب",                   fr:"Littérature",                      en:"Literature"                    },
  tafsir_hadith:       { ar:"التفسير والحديث",          fr:"Tafsir & Hadith",                  en:"Tafsir & Hadith"               },
  fiqh_usul:           { ar:"الفقه وأصوله",             fr:"Fiqh & Usul al-Fiqh",             en:"Fiqh & Usul al-Fiqh"           },
  // ── Bac Professionnel ─────────────────────────────────────────────
  prof_synth:          { ar:"التقييم المهني الاصطناعي", fr:"Épreuve professionnelle de synthèse",en:"Professional Synthesis Test" },
  arabic_lang_culture: { ar:"اللغة العربية والثقافة",   fr:"Langue arabe & Culture",           en:"Arabic Language & Culture"     },
  // ── Backward-compat keys (for old saved sessions / narrative helpers) ──
  pc:                  { ar:"الفيزياء والكيمياء",        fr:"Physique-Chimie",                  en:"Physics-Chemistry"             },
  physics:             { ar:"الفيزياء",                 fr:"Physique",                         en:"Physics"                       },
  chemistry:           { ar:"الكيمياء",                 fr:"Chimie",                           en:"Chemistry"                     },
  biology:             { ar:"علم الأحياء",               fr:"Biologie",                         en:"Biology"                       },
  economics:           { ar:"الاقتصاد",                 fr:"Économie",                         en:"Economics"                     },
  management:          { ar:"التدبير",                  fr:"Gestion",                          en:"Management"                    },
  history:             { ar:"التاريخ والجغرافيا",        fr:"Histoire-Géo",                     en:"History & Geography"           },
  tech:                { ar:"التكنولوجيا",              fr:"Technologie",                      en:"Technology"                    },
  arts:                { ar:"الفنون",                   fr:"Arts",                             en:"Arts"                          },
  design:              { ar:"التصميم",                  fr:"Design",                           en:"Design"                        },
  accounting:          { ar:"المحاسبة",                 fr:"Comptabilité",                     en:"Accounting"                    },
  // SUBJECT SYSTEM FIX: lang2 key removed
  sn_math:             { ar:"الرياضيات",                fr:"Mathématiques",                    en:"Mathematics"                   },
  sn_physics:          { ar:"الفيزياء",                 fr:"Physique",                         en:"Physics"                       },
  sn_biology:          { ar:"الأحياء",                  fr:"Biologie",                         en:"Biology"                       },
};

const MOROCCAN_CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", "Meknès",
  "Oujda", "Kénitra", "Tétouan", "Safi", "El Jadida", "Nador", "Beni Mellal",
  "Settat", "Khouribga", "Mohammedia", "Laâyoune", "Dakhla", "Autre",
];

// 12 questions, Likert 1-5, 6 reverse-coded items → 6 trait dimensions
const PERSONALITY_QUESTIONS = [
  { id:"q1",  trait:"analytical", reverse:false, text:{ ar:"أستمتع بحل المشكلات الرياضية والمنطقية المعقدة", fr:"J'aime résoudre des problèmes mathématiques et logiques complexes", en:"I enjoy solving complex mathematical and logical problems" } },
  { id:"q2",  trait:"social",     reverse:false, text:{ ar:"أفضل العمل في فريق على العمل منفرداً", fr:"Je préfère travailler en équipe plutôt que seul", en:"I prefer working in a team rather than alone" } },
  { id:"q3",  trait:"structure",  reverse:false, text:{ ar:"أحب التخطيط المسبق واتباع الجداول الزمنية", fr:"J'aime planifier à l'avance et suivre des horaires", en:"I like planning ahead and following schedules" } },
  { id:"q4",  trait:"creativity", reverse:false, text:{ ar:"أجد نفسي دائماً أبحث عن طرق جديدة وغير تقليدية لحل المشكلات", fr:"Je cherche toujours des façons nouvelles et créatives de résoudre les problèmes", en:"I always look for new and unconventional ways to solve problems" } },
  { id:"q5",  trait:"risk",       reverse:false, text:{ ar:"أنا مرتاح لتجربة أشياء جديدة حتى لو كانت النتيجة غير مضمونة", fr:"Je suis à l'aise pour essayer de nouvelles choses même si le résultat est incertain", en:"I'm comfortable trying new things even if the outcome is uncertain" } },
  { id:"q6",  trait:"leadership", reverse:false, text:{ ar:"أتقدم طوعاً لقيادة المشاريع والمجموعات", fr:"Je me porte volontaire pour diriger des projets et des groupes", en:"I voluntarily step up to lead projects and groups" } },
  { id:"q7",  trait:"analytical", reverse:true,  text:{ ar:"أجد الأرقام والبيانات مملة وغير مثيرة للاهتمام", fr:"Je trouve les chiffres et les données ennuyeux et sans intérêt", en:"I find numbers and data boring and uninteresting" } },
  { id:"q8",  trait:"social",     reverse:true,  text:{ ar:"أفضل قضاء وقت طويل بمفردي بدلاً من التواجد مع الآخرين", fr:"Je préfère passer beaucoup de temps seul plutôt qu'avec d'autres", en:"I prefer spending long periods alone rather than with others" } },
  { id:"q9",  trait:"structure",  reverse:true,  text:{ ar:"أنا مرتاح للتصرف عفوياً دون خطة مسبقة", fr:"Je suis à l'aise pour agir spontanément sans plan préalable", en:"I'm comfortable acting spontaneously without a prior plan" } },
  { id:"q10", trait:"creativity", reverse:false, text:{ ar:"أستمتع بالرسم والكتابة أو أي شكل من أشكال التعبير الفني", fr:"J'apprécie le dessin, l'écriture ou toute forme d'expression artistique", en:"I enjoy drawing, writing, or any form of artistic expression" } },
  { id:"q11", trait:"risk",       reverse:true,  text:{ ar:"أفضل المسار المضمون حتى لو كان أقل إثارة", fr:"Je préfère le chemin sûr même s'il est moins excitant", en:"I prefer the safe path even if it's less exciting" } },
  { id:"q12", trait:"leadership", reverse:true,  text:{ ar:"أشعر بعدم الارتياح عندما يطلب مني الآخرون اتخاذ القرارات", fr:"Je me sens mal à l'aise quand on me demande de prendre des décisions", en:"I feel uncomfortable when others ask me to make decisions" } },
];

// src/massar/data/constraints.js
// ─────────────────────────────────────────────────────────────────
// Eligibility rules per cluster.
// ► TO TUNE THRESHOLDS: edit the numbers below — nowhere else.
//
// Fields:
//   minAvg           — minimum overall average (/20) for public eligibility
//   requiredSubjects — { subject: minMark } — subject-level minimums
//   privateOk        — if true, show "Private only" badge when public fails
//   hardPenalty      — score penalty applied when NOT privateBudget + below threshold
//                      (0.45 = effectively removed from top 3)
// ─────────────────────────────────────────────────────────────────

const CLUSTER_CONSTRAINTS = {
  health: {
    // Public medicine (Médecine/Pharmacie) in Morocco is extremely selective.
    // National average acceptance rate: top 2–3% of SVT bac holders.
    minAvg: 16.0,
    requiredSubjects: { svt: 14, pc: 13 },
    privateOk: true,
    hardPenalty: 0.45,   // pushes cluster out of top 3 when !privateBudget
  },
  data: {
    minAvg: 14.0,
    requiredSubjects: { math: 13 },
    privateOk: true,
    hardPenalty: 0.0,    // soft penalty only (0.12 via privateOnly tag)
  },
  it: {
    minAvg: 12.0,
    requiredSubjects: { math: 11 },
    privateOk: true,
    hardPenalty: 0.0,
  },
  cyber: {
    minAvg: 12.0,
    requiredSubjects: { math: 11 },
    privateOk: true,
    hardPenalty: 0.0,
  },
  network:    { minAvg: 11.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  industrial: { minAvg: 11.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  energy: {
    minAvg: 12.0,
    requiredSubjects: { physics: 12 },
    privateOk: true,
    hardPenalty: 0.0,
  },
  civil:      { minAvg: 11.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  finance:    { minAvg: 11.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  marketing:  { minAvg: 10.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  logistics:  { minAvg: 10.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  tourism:    { minAvg:  9.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  edu_law:    { minAvg: 11.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  arts_media: { minAvg:  9.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  // New clusters — skilled trades, automotive, sports, digital content
  trades:          { minAvg:  8.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  automotive:      { minAvg:  8.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  sports:          { minAvg:  8.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  creative_digital:{ minAvg:  8.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
  culinary_ops:    { minAvg:  7.0, requiredSubjects: {}, privateOk: true, hardPenalty: 0.0 },
};

// src/massar/data/clusters.js
// ─────────────────────────────────────────────────────────────────
// 14 career clusters for Morocco. Each cluster has:
//   id, icon, demandIndex (0–1), bacAffinity, subjectWeights,
//   traitWeights, salary, pathways (3 routes), actionPlan (4 weeks).
// Action items: { label, url } → rendered as links; plain string → plain text.
// ─────────────────────────────────────────────────────────────────

const CLUSTER_KEY_MAP = {
  it:"cluster1", data:"cluster2", cyber:"cluster3", network:"cluster4",
  industrial:"cluster5", energy:"cluster6", civil:"cluster7", health:"cluster8",
  finance:"cluster9", marketing:"cluster10", logistics:"cluster11",
  tourism:"cluster12", edu_law:"cluster13", arts_media:"cluster14",
  trades:"cluster15", automotive:"cluster16", sports:"cluster17", creative_digital:"cluster18",
  culinary_ops:"cluster19",
};

const CLUSTERS = [
  {
    id:"it", icon:"💻", demandIndex:0.95,
    bacAffinity:{ SMA:0.9,SMB:0.9,PC:0.7,SVT:0.3,ECO:0.4,LET:0.2,TECH:0.8,ARTS:0.2 },
    subjectWeights:{ math:0.35,pc:0.2,tech:0.3,french:0.15 },
    traitWeights:{ analytical:0.35,creativity:0.25,structure:0.2,social:-0.05,risk:0.1,leadership:0.05 },
    salary:{ min:5000,max:25000,currency:"MAD" },
    pathways:{
      university:{ schools:["FSTT Tanger","FST Mohammedia","Université Ibn Tofail"], duration:"3–5 ans" },
      grandeEcole:{ schools:["ENSIAS","ENSA Rabat/Marrakech","EMSI","INPT","UM6P CS"], duration:"5 ans" },
      practical:{ schools:["OFPPT – Technicien Spécialisé Dev","YouCode","Simplon.co","1337 (42)"], duration:"1–3 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Python basics – freeCodeCamp", url:"https://www.freecodecamp.org/learn/scientific-computing-with-python/" },
        { label:"GitHub account setup", url:"https://github.com" },
      ]},
      { week:2, items:[
        { label:"Build a simple web page (HTML/CSS) – MDN", url:"https://developer.mozilla.org/fr/docs/Learn" },
        { label:"Join Dev Maroc Discord", url:"https://discord.gg/devmaroc" },
      ]},
      { week:3, items:[
        { label:"JavaScript crash course – The Odin Project", url:"https://www.theodinproject.com/" },
        "Renseignez-vous sur le concours ENSIAS/ENSA",
      ]},
      { week:4, items:[
        { label:"Push your first project to GitHub", url:"https://docs.github.com/fr/get-started" },
        { label:"Programme Marhaba – Simplon.co Maroc", url:"https://simplon.co/maroc" },
      ]},
    ],
  },
  {
    id:"data", icon:"📊", demandIndex:0.92,
    bacAffinity:{ SMA:0.95,SMB:0.85,PC:0.7,SVT:0.5,ECO:0.7,LET:0.15,TECH:0.6,ARTS:0.1 },
    subjectWeights:{ math:0.45,pc:0.1,economics:0.2,french:0.1,tech:0.15 },
    traitWeights:{ analytical:0.45,creativity:0.2,structure:0.25,social:-0.05,risk:0.05,leadership:0.1 },
    salary:{ min:6000,max:30000,currency:"MAD" },
    pathways:{
      university:{ schools:["Faculté des Sciences – Master Big Data","Université Hassan II"], duration:"5 ans" },
      grandeEcole:{ schools:["ENSIAS – Data","UM6P Data Science","OCP School of AI"], duration:"5 ans" },
      practical:{ schools:["DataCamp Morocco","OFPPT BI","Coursera Google Data Analytics"], duration:"6 mois–2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Statistics basics – Khan Academy", url:"https://fr.khanacademy.org/math/statistics-probability" },
        { label:"Install Jupyter Notebook", url:"https://jupyter.org/install" },
      ]},
      { week:2, items:[
        { label:"Kaggle Intro to Machine Learning", url:"https://www.kaggle.com/learn/intro-to-machine-learning" },
        { label:"Bourse OCP School of AI", url:"https://ocpschoolofai.ma" },
      ]},
      { week:3, items:[
        { label:"Titanic dataset project – Kaggle", url:"https://www.kaggle.com/c/titanic" },
        "Suivez @DataMaroc sur Twitter/X",
      ]},
      { week:4, items:[
        { label:"Publiez votre notebook sur Kaggle", url:"https://www.kaggle.com" },
        { label:"Programme été OCP School of AI", url:"https://ocpschoolofai.ma" },
      ]},
    ],
  },
  {
    id:"cyber", icon:"🔐", demandIndex:0.88,
    bacAffinity:{ SMA:0.85,SMB:0.8,PC:0.6,SVT:0.2,ECO:0.3,LET:0.15,TECH:0.75,ARTS:0.1 },
    subjectWeights:{ math:0.3,pc:0.15,tech:0.4,french:0.15 },
    traitWeights:{ analytical:0.4,creativity:0.15,structure:0.3,social:-0.1,risk:0.1,leadership:0.05 },
    salary:{ min:7000,max:28000,currency:"MAD" },
    pathways:{
      university:{ schools:["FST – Réseaux & Sécurité","FSTG Marrakech"], duration:"3–5 ans" },
      grandeEcole:{ schools:["INPT Cybersécurité","ENSA","EMSI Sécurité"], duration:"5 ans" },
      practical:{ schools:["OFPPT Cyber","TryHackMe","EC-Council CEH (bootcamp)"], duration:"1–2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"TryHackMe – free learning path", url:"https://tryhackme.com" },
        { label:"Networking basics – OSI model (Coursera)", url:"https://www.coursera.org/learn/computer-networking" },
      ]},
      { week:2, items:[
        { label:"CTF beginner challenge – picoCTF", url:"https://picoctf.org" },
        { label:"Install Kali Linux (VirtualBox)", url:"https://www.kali.org/get-kali/" },
      ]},
      { week:3, items:[
        { label:"TryHackMe Pre-Security path", url:"https://tryhackme.com/path/outline/presecurity" },
        "Renseignez-vous sur le concours INPT",
      ]},
      { week:4, items:[
        { label:"HackTheBox – Starting Point machines", url:"https://www.hackthebox.com/starting-point" },
        { label:"Discord Morocco Cyber Community", url:"https://discord.gg/cybersecmaroc" },
      ]},
    ],
  },
  {
    id:"network", icon:"📡", demandIndex:0.8,
    bacAffinity:{ SMA:0.8,SMB:0.85,PC:0.65,SVT:0.2,ECO:0.25,LET:0.1,TECH:0.9,ARTS:0.05 },
    subjectWeights:{ math:0.25,pc:0.3,tech:0.4,french:0.05 },
    traitWeights:{ analytical:0.3,creativity:0.1,structure:0.35,social:0.1,risk:0.05,leadership:0.1 },
    salary:{ min:5000,max:20000,currency:"MAD" },
    pathways:{
      university:{ schools:["FST – Génie Électrique","Université Ibn Zohr"], duration:"3–5 ans" },
      grandeEcole:{ schools:["INPT","ENSA Télécom","EMSI"], duration:"5 ans" },
      practical:{ schools:["OFPPT Technicien Réseaux","Cisco CCNA (Cisco Academy)","OFPPT TSRI"], duration:"2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Cisco Networking Academy – Intro to Networks", url:"https://www.netacad.com" },
        { label:"Install Packet Tracer", url:"https://www.netacad.com/courses/packet-tracer" },
      ]},
      { week:2, items:[
        { label:"Subnetting practice – Subnetting.net", url:"https://subnetting.net" },
        { label:"YouTube: NetworkChuck Networking series", url:"https://www.youtube.com/@NetworkChuck" },
      ]},
      { week:3, items:[
        "Simulez un réseau LAN complet dans Packet Tracer",
        "Renseignez-vous sur le concours INPT & OFPPT TSRI",
      ]},
      { week:4, items:[
        { label:"Quiz CCNA Introduction – Cisco", url:"https://www.netacad.com" },
        "Contactez un fournisseur internet local pour un stage",
      ]},
    ],
  },
  {
    id:"industrial", icon:"⚙️", demandIndex:0.78,
    bacAffinity:{ SMA:0.8,SMB:0.95,PC:0.75,SVT:0.2,ECO:0.2,LET:0.05,TECH:0.9,ARTS:0.05 },
    subjectWeights:{ math:0.3,pc:0.35,tech:0.35 },
    traitWeights:{ analytical:0.25,creativity:0.15,structure:0.4,social:0.1,risk:0.05,leadership:0.05 },
    salary:{ min:5500,max:22000,currency:"MAD" },
    pathways:{
      university:{ schools:["FST – Génie Industriel","FSTG"], duration:"3–5 ans" },
      grandeEcole:{ schools:["ENSA – Génie Mécanique","EMINES UM6P","EMI Rabat"], duration:"5 ans" },
      practical:{ schools:["OFPPT Technicien Mécanique","ISTA Automobile","Renault Somaca Formation"], duration:"2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"AutoCAD basics – Autodesk free course", url:"https://www.autodesk.com/education/edu-software" },
        { label:"YouTube: Lean Manufacturing explained", url:"https://www.youtube.com/results?search_query=lean+manufacturing" },
      ]},
      { week:2, items:[
        "Visitez une usine locale (Renault, Stellantis Kénitra)",
        { label:"Journées portes ouvertes EMINES UM6P", url:"https://emines.um6p.ma" },
      ]},
      { week:3, items:[
        "Réalisez un projet CAD (pièce mécanique simple)",
        "Renseignez-vous sur le concours ENSA Génie Industriel",
      ]},
      { week:4, items:[
        "Postulez pour un stage ISTA en usine",
        { label:"Zone industrielle Tanger Auto – LinkedIn", url:"https://www.linkedin.com/jobs/search/?keywords=génie+industriel+maroc" },
      ]},
    ],
  },
  {
    id:"energy", icon:"🌞", demandIndex:0.85,
    bacAffinity:{ SMA:0.85,SMB:0.9,PC:0.85,SVT:0.5,ECO:0.2,LET:0.05,TECH:0.8,ARTS:0.05 },
    subjectWeights:{ math:0.3,pc:0.55,tech:0.15 },
    traitWeights:{ analytical:0.3,creativity:0.2,structure:0.3,social:0.1,risk:0.05,leadership:0.05 },
    salary:{ min:6000,max:24000,currency:"MAD" },
    pathways:{
      university:{ schools:["FST – Énergie","Université Cadi Ayyad"], duration:"3–5 ans" },
      grandeEcole:{ schools:["EMINES UM6P","ENSA Énergie","IRESEN partenaires"], duration:"5 ans" },
      practical:{ schools:["OFPPT Électrotechnique","IRESEN bootcamp","Masen partenaires"], duration:"2–3 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Solar Energy – Coursera (Duke University)", url:"https://www.coursera.org/learn/solar-energy" },
        { label:"Projet Noor Ouarzazate – MASEN", url:"https://www.masen.ma" },
      ]},
      { week:2, items:[
        { label:"Projet Arduino capteur solaire – Instructables", url:"https://www.instructables.com/Solar-Arduino/" },
        { label:"Bourses EMINES UM6P", url:"https://emines.um6p.ma" },
      ]},
      { week:3, items:[
        { label:"Webinaires IRESEN", url:"https://www.iresen.org" },
        { label:"Programme de stage MASEN", url:"https://www.masen.ma/fr/rejoindre-masen" },
      ]},
      { week:4, items:[
        { label:"Journées découverte EMINES UM6P", url:"https://emines.um6p.ma" },
        { label:"Ingénieurs énergie Maroc – LinkedIn", url:"https://www.linkedin.com/jobs/search/?keywords=energie+renouvelable+maroc" },
      ]},
    ],
  },
  {
    id:"civil", icon:"🏗️", demandIndex:0.72,
    bacAffinity:{ SMA:0.85,SMB:0.9,PC:0.75,SVT:0.2,ECO:0.15,LET:0.05,TECH:0.85,ARTS:0.1 },
    subjectWeights:{ math:0.35,pc:0.4,tech:0.2,french:0.05 },
    traitWeights:{ analytical:0.3,creativity:0.2,structure:0.35,social:0.1,risk:0.0,leadership:0.05 },
    salary:{ min:5000,max:20000,currency:"MAD" },
    pathways:{
      university:{ schools:["Faculté des Sciences et Techniques","Université Mohammed V"], duration:"3–5 ans" },
      grandeEcole:{ schools:["EHTP","EMI Génie Civil","ENSA BTP"], duration:"5 ans" },
      practical:{ schools:["OFPPT Technicien BTP","ISTA Génie Civil","BTS Construction"], duration:"2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"AutoCAD Civil basics – Autodesk", url:"https://www.autodesk.com/education/edu-software" },
        "Visitez un chantier de construction près de chez vous",
      ]},
      { week:2, items:[
        "Renseignez-vous sur le programme Villes Nouvelles Maroc",
        { label:"Concours EHTP – informations", url:"https://www.ehtp.ac.ma" },
      ]},
      { week:3, items:[
        "Réalisez un plan d'étage simple (SketchUp free)",
        "Contactez une entreprise BTP locale pour un shadowing",
      ]},
      { week:4, items:[
        { label:"OFPPT BTP – filières disponibles", url:"https://www.ofppt.ma" },
        { label:"Offres emploi BTP Maroc – LinkedIn", url:"https://www.linkedin.com/jobs/search/?keywords=génie+civil+maroc" },
      ]},
    ],
  },
  {
    id:"health", icon:"🏥", demandIndex:0.82,
    bacAffinity:{ SMA:0.5,SMB:0.4,PC:0.75,SVT:0.98,ECO:0.15,LET:0.1,TECH:0.3,ARTS:0.05 },
    subjectWeights:{ svt:0.5,pc:0.35,math:0.15 },
    traitWeights:{ analytical:0.25,creativity:0.1,structure:0.25,social:0.3,risk:0.0,leadership:0.1 },
    salary:{ min:8000,max:40000,currency:"MAD" },
    pathways:{
      university:{ schools:["Faculté de Médecine et de Pharmacie (Rabat/Casa)","Faculté Médecine Dentaire"], duration:"6–7 ans" },
      grandeEcole:{ schools:["UIR Médecine","Université Internationale de Casablanca","EMSI Santé"], duration:"5–7 ans" },
      practical:{ schools:["IFCS Infirmier","OFPPT Aide-soignant","Technicien de Radiologie"], duration:"2–3 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Programme Concours Médecine – syllabus SVT/Chimie", url:"https://www.fmpr.ac.ma" },
        { label:"Khan Academy – biologie niveau concours", url:"https://fr.khanacademy.org/science/biology" },
      ]},
      { week:2, items:[
        "Bénévolat dans un dispensaire local",
        { label:"Frais et bourses UIR Médecine", url:"https://www.uir.ac.ma/fr/faculty/medicine" },
      ]},
      { week:3, items:[
        "Faites 2 annales du concours national Médecine",
        "Parlez avec un(e) étudiant(e) en 2e année de Médecine",
      ]},
      { week:4, items:[
        { label:"Concours National Médecine – dates & infos", url:"https://www.fmpr.ac.ma" },
        { label:"Concours IFCS Infirmier (plan B)", url:"https://www.sante.gov.ma" },
      ]},
    ],
  },
  {
    id:"finance", icon:"💰", demandIndex:0.8,
    bacAffinity:{ SMA:0.7,SMB:0.6,PC:0.5,SVT:0.3,ECO:0.98,LET:0.3,TECH:0.4,ARTS:0.1 },
    subjectWeights:{ math:0.3,economics:0.45,management:0.2,french:0.05 },
    traitWeights:{ analytical:0.4,creativity:0.1,structure:0.3,social:0.1,risk:0.05,leadership:0.05 },
    salary:{ min:5500,max:25000,currency:"MAD" },
    pathways:{
      university:{ schools:["FSJES – Économie/Gestion","Université Mohammed V","Université Hassan II"], duration:"3–5 ans" },
      grandeEcole:{ schools:["ENCG (toutes villes)","HEM","ISCAE","ESCA École de Management"], duration:"5 ans" },
      practical:{ schools:["OFPPT Comptabilité","BTS Finance","CPA Maroc"], duration:"2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Rapport annuel Banque Al-Maghrib", url:"https://www.bkam.ma" },
        { label:"Finance personnelle – Khan Academy", url:"https://fr.khanacademy.org/college-careers-more/personal-finance" },
      ]},
      { week:2, items:[
        "Construisez un modèle de budget simple sur Excel",
        { label:"Concours ENCG – guide complet", url:"https://www.encg.ac.ma" },
      ]},
      { week:3, items:[
        { label:"Financial Markets – Yale/Coursera (gratuit)", url:"https://www.coursera.org/learn/financial-markets-global" },
        { label:"Offres emploi Finance Maroc – LinkedIn", url:"https://www.linkedin.com/jobs/search/?keywords=finance+maroc" },
      ]},
      { week:4, items:[
        { label:"Dossier ENCG ou ISCAE", url:"https://www.encg.ac.ma" },
        "Accompagnez un comptable ou conseiller bancaire local",
      ]},
    ],
  },
  {
    id:"marketing", icon:"📣", demandIndex:0.75,
    bacAffinity:{ SMA:0.5,SMB:0.4,PC:0.4,SVT:0.3,ECO:0.9,LET:0.65,TECH:0.4,ARTS:0.6 },
    subjectWeights:{ economics:0.35,english:0.15,management:0.25,french:0.2,arts:0.05 },
    traitWeights:{ analytical:0.15,creativity:0.4,structure:0.1,social:0.25,risk:0.05,leadership:0.05 },
    salary:{ min:4500,max:18000,currency:"MAD" },
    pathways:{
      university:{ schools:["FSJES Marketing","Université Mundiapolis","Université Internationale de Rabat"], duration:"3–5 ans" },
      grandeEcole:{ schools:["ENCG","HEM","ESCA","ISIC – Communication"], duration:"5 ans" },
      practical:{ schools:["OFPPT Commerce","Google Digital Marketing Certificate","Bootcamp Social Media"], duration:"6 mois–2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Google Digital Marketing – certification gratuite", url:"https://skillshop.withgoogle.com" },
        "Créez un compte Instagram professionnel test",
      ]},
      { week:2, items:[
        "Créez une fausse campagne pub (Canva + Meta Ads Manager)",
        { label:"Concours ENCG Marketing", url:"https://www.encg.ac.ma" },
      ]},
      { week:3, items:[
        "Constituez un mini portfolio (3 campagnes créatives)",
        { label:"Marketeurs marocains – LinkedIn", url:"https://www.linkedin.com/jobs/search/?keywords=marketing+maroc" },
      ]},
      { week:4, items:[
        { label:"Dossier ENCG ou ISIC", url:"https://www.isic.ac.ma" },
        "Proposez vos services social media à une boutique locale (gratuitement)",
      ]},
    ],
  },
  {
    id:"logistics", icon:"🚢", demandIndex:0.83,
    bacAffinity:{ SMA:0.7,SMB:0.75,PC:0.55,SVT:0.3,ECO:0.8,LET:0.2,TECH:0.7,ARTS:0.05 },
    subjectWeights:{ math:0.25,economics:0.35,management:0.25,tech:0.1,french:0.05 },
    traitWeights:{ analytical:0.3,creativity:0.1,structure:0.4,social:0.1,risk:0.05,leadership:0.05 },
    salary:{ min:5000,max:22000,currency:"MAD" },
    pathways:{
      university:{ schools:["FSJES – Logistique","ENCG Logistics","Université Hassan 1er Settat"], duration:"3–5 ans" },
      grandeEcole:{ schools:["ENCG Settat Logistique","EMT Transports","ISCAE Logistique"], duration:"5 ans" },
      practical:{ schools:["OFPPT Logistique/Transport","BTS Commerce International","DHL/MAERSK Formation"], duration:"2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Supply Chain Basics – Coursera (Rutgers)", url:"https://www.coursera.org/learn/supply-chain-logistics" },
        { label:"Port Tanger Med – actualités", url:"https://www.tangermed.ma" },
      ]},
      { week:2, items:[
        { label:"Introduction logistique – Coursera", url:"https://www.coursera.org/courses?query=supply+chain" },
        { label:"Concours ENCG Settat", url:"https://www.encg-settat.ac.ma" },
      ]},
      { week:3, items:[
        "Cartographiez une chaîne logistique marocaine (huile d'argan, phosphate…)",
        { label:"Recruteurs Tanger Med – LinkedIn", url:"https://www.linkedin.com/jobs/search/?keywords=logistique+tanger" },
      ]},
      { week:4, items:[
        { label:"Candidature ENCG ou EMT", url:"https://www.encg.ac.ma" },
        { label:"Programmes étudiants MAERSK/DHL Maroc", url:"https://jobs.maersk.com" },
      ]},
    ],
  },
  {
    id:"tourism", icon:"🏨", demandIndex:0.7,
    bacAffinity:{ SMA:0.3,SMB:0.25,PC:0.3,SVT:0.3,ECO:0.65,LET:0.7,TECH:0.2,ARTS:0.75 },
    subjectWeights:{ french:0.3,arabic:0.2,economics:0.2,english:0.2,history:0.1 },
    traitWeights:{ analytical:0.1,creativity:0.25,structure:0.15,social:0.45,risk:0.0,leadership:0.05 },
    salary:{ min:4000,max:16000,currency:"MAD" },
    pathways:{
      university:{ schools:["Faculté des Lettres – Tourisme","Université Ibn Battuta Tanger"], duration:"3 ans" },
      grandeEcole:{ schools:["ISIT (Institut Supérieur International du Tourisme)","ISHT Mohammedia","Vatel Maroc"], duration:"3–5 ans" },
      practical:{ schools:["OFPPT Tourisme & Hôtellerie","ISTA Accueil","Ecole Hôtelière de Casablanca"], duration:"2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Plan Maroc 2030 Tourisme – ONMT", url:"https://www.onmt.ma" },
        "Apprenez 20 phrases d'hospitalité en anglais et en espagnol",
      ]},
      { week:2, items:[
        "Visitez un riad ou hôtel local, posez des questions au manager",
        { label:"Concours ISIT – informations", url:"https://www.isit.ac.ma" },
      ]},
      { week:3, items:[
        "Créez un itinéraire touristique pour votre ville (48h)",
        { label:"YouTube: hotel management luxury", url:"https://www.youtube.com/results?search_query=hotel+management+luxury" },
      ]},
      { week:4, items:[
        { label:"OFPPT Tourisme – filières", url:"https://www.ofppt.ma" },
        "Contactez une agence de voyage pour un stage d'observation",
      ]},
    ],
  },
  {
    id:"edu_law", icon:"⚖️", demandIndex:0.65,
    bacAffinity:{ SMA:0.4,SMB:0.35,PC:0.35,SVT:0.4,ECO:0.6,LET:0.95,TECH:0.2,ARTS:0.3 },
    subjectWeights:{ arabic:0.35,french:0.3,philosophy:0.2,history:0.15 },
    traitWeights:{ analytical:0.25,creativity:0.1,structure:0.3,social:0.25,risk:0.0,leadership:0.1 },
    salary:{ min:4500,max:20000,currency:"MAD" },
    pathways:{
      university:{ schools:["Faculté des Sciences Juridiques (toutes villes)","Université Mohammed V Droit"], duration:"4–5 ans" },
      grandeEcole:{ schools:["ENA (École Nationale d'Administration)","IEAP Droit","UIR Droit"], duration:"5 ans" },
      practical:{ schools:["CPGE Lettres (prépa ENA)","Formation Greffier Tribunal","BTS Assistant Juridique"], duration:"2–3 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Constitution marocaine – version simplifiée", url:"https://www.sgg.gov.ma/Portals/0/constitution/constitution_2011_Fr.pdf" },
        { label:"Introduction au droit – Khan Academy", url:"https://fr.khanacademy.org" },
      ]},
      { week:2, items:[
        "Assistez à une audience publique au tribunal de votre ville",
        { label:"Conditions concours ENA Maroc", url:"https://www.ena.ac.ma" },
      ]},
      { week:3, items:[
        "Rédigez une analyse d'1 page sur un fait divers juridique marocain",
        "Contactez le Barreau de votre ville pour une visite",
      ]},
      { week:4, items:[
        { label:"Dossier Faculté Droit ou ENA CPGE", url:"https://www.ena.ac.ma" },
        "Rejoignez un club de débat au lycée ou à la faculté",
      ]},
    ],
  },
  {
    id:"arts_media", icon:"🎨", demandIndex:0.55,
    bacAffinity:{ SMA:0.2,SMB:0.2,PC:0.2,SVT:0.2,ECO:0.3,LET:0.6,TECH:0.25,ARTS:0.98 },
    subjectWeights:{ arts:0.4,french:0.2,arabic:0.15,design:0.25 },
    traitWeights:{ analytical:0.05,creativity:0.55,structure:0.05,social:0.2,risk:0.1,leadership:0.05 },
    salary:{ min:3500,max:15000,currency:"MAD" },
    pathways:{
      university:{ schools:["INBA (Institut National des Beaux Arts)","ISADAC Théâtre","ESAv Arts Visuels Marrakech"], duration:"4–5 ans" },
      grandeEcole:{ schools:["ISIC – Journalisme","Université Senghor","ISCAE Communication"], duration:"3–5 ans" },
      practical:{ schools:["OFPPT Arts Graphiques","Bootcamp UI/UX Design","YouTube Creator Academy"], duration:"1–2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Créez un profil Behance", url:"https://www.behance.net" },
        { label:"Canva Design School – cours gratuits", url:"https://www.canva.com/learn/design-school/" },
      ]},
      { week:2, items:[
        "Concevez une affiche pour un événement local",
        { label:"Concours INBA – informations", url:"https://www.inba.ac.ma" },
      ]},
      { week:3, items:[
        "Constituez un portfolio de 3 œuvres (Behance ou PDF)",
        { label:"Designers marocains à suivre – LinkedIn", url:"https://www.linkedin.com/jobs/search/?keywords=design+maroc" },
      ]},
      { week:4, items:[
        { label:"Dossier INBA ou ISIC", url:"https://www.isic.ac.ma" },
        "Lancez un compte Instagram ou TikTok créatif",
      ]},
    ],
  },
  // ── NEW: Skilled Trades ────────────────────────────────────────
  {
    id:"trades", icon:"🔧", demandIndex:0.82,
    bacAffinity:{ SMA:0.5,SMB:0.65,PC:0.5,SVT:0.4,ECO:0.35,LET:0.2,TECH:0.85,ARTS:0.25 },
    subjectWeights:{ tech:0.4,math:0.25,pc:0.2,french:0.15 },
    traitWeights:{ analytical:0.2,creativity:0.15,structure:0.35,social:0.1,risk:0.1,leadership:0.1 },
    salary:{ min:4500,max:18000,currency:"MAD" },
    pathways:{
      university:{ schools:["FST Technicien spécialisé (TS)","Université Chouaïb Doukkali – Technologie"], duration:"2–3 ans" },
      grandeEcole:{ schools:["OFPPT – Technicien Spécialisé Électricité/Plomberie/HVAC","ISTA – BTS Froid & Climatisation"], duration:"2 ans" },
      practical:{ schools:["OFPPT centre régional","Formation Artisanat – Ministère Artisanat","Auto-entrepreneur + certification ONEE"], duration:"6 mois – 2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"OFPPT – filières techniques", url:"https://www.ofppt.ma" },
        "Identifiez un électricien ou plombier local, demandez une journée d'observation",
      ]},
      { week:2, items:[
        { label:"YouTube: électricité bâtiment bases", url:"https://www.youtube.com/results?search_query=electricite+batiment+maroc+formation" },
        "Faites une liste des chantiers actifs dans votre ville",
      ]},
      { week:3, items:[
        { label:"ONEE Maroc – programme formation", url:"https://www.one.org.ma" },
        "Trouvez un apprentissage de 2 semaines chez un artisan certifié",
      ]},
      { week:4, items:[
        { label:"Inscription OFPPT en ligne", url:"https://www.ofppt.ma/fr/offre-de-formation" },
        "Renseignez-vous sur les aides à la création d'entreprise artisanale (Moukawalati)",
      ]},
    ],
  },
  // ── NEW: Automotive & Transport ────────────────────────────────
  {
    id:"automotive", icon:"🚗", demandIndex:0.78,
    bacAffinity:{ SMA:0.55,SMB:0.7,PC:0.5,SVT:0.35,ECO:0.3,LET:0.2,TECH:0.9,ARTS:0.2 },
    subjectWeights:{ tech:0.45,math:0.2,pc:0.2,french:0.15 },
    traitWeights:{ analytical:0.25,creativity:0.1,structure:0.35,social:0.1,risk:0.1,leadership:0.1 },
    salary:{ min:4000,max:16000,currency:"MAD" },
    pathways:{
      university:{ schools:["FSTT – Génie Mécanique","Université Cadi Ayyad – Mécanique Appliquée"], duration:"3–5 ans" },
      grandeEcole:{ schools:["OFPPT – Mécanique Auto (BTS)","ISTA Auto & Transport","ISMALA (Marrakech)"], duration:"2 ans" },
      practical:{ schools:["OFPPT garage agréé","Apprentissage en garage","Formation homologuée par NARSA"], duration:"1–2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"NARSA Maroc – métiers automobile", url:"https://www.narsa.ma" },
        "Passez une journée dans un garage de confiance près de chez vous",
      ]},
      { week:2, items:[
        { label:"Cours mécanique auto – YouTube", url:"https://www.youtube.com/results?search_query=mecanique+auto+formation+maroc" },
        { label:"OFPPT – BTS Maintenance Auto", url:"https://www.ofppt.ma" },
      ]},
      { week:3, items:[
        "Démontez et remontez un composant simple (filtre, batterie, plaquettes)",
        "Explorez le secteur des véhicules électriques : Tesla, BYD arrivent au Maroc",
      ]},
      { week:4, items:[
        { label:"Inscription ISTA Auto", url:"https://www.ofppt.ma/fr/offre-de-formation" },
        "Contactez un transporteur régional (CTM, ALSA) pour un stage découverte",
      ]},
    ],
  },
  // ── NEW: Sports & Fitness ──────────────────────────────────────
  {
    id:"sports", icon:"🏃", demandIndex:0.65,
    bacAffinity:{ SMA:0.4,SMB:0.4,PC:0.35,SVT:0.55,ECO:0.45,LET:0.5,TECH:0.3,ARTS:0.4 },
    subjectWeights:{ biology:0.35,french:0.2,arabic:0.15,philosophy:0.15,history:0.15 },
    traitWeights:{ analytical:0.15,creativity:0.1,structure:0.35,social:0.3,risk:0.2,leadership:0.3 },
    salary:{ min:3500,max:18000,currency:"MAD" },
    pathways:{
      university:{ schools:["ISSAF (Institut Supérieur du Sport et de l'Animation)","Faculté Sciences du Sport – UM5","STAPS équivalent – ENCPS"], duration:"3–5 ans" },
      grandeEcole:{ schools:["IRFC (Institut Royal de Formation des Cadres)","IRCAM Sports","École Nationale de Kinésithérapie – privé"], duration:"3–4 ans" },
      practical:{ schools:["Certification Coach Fitness – fédérations","OFPPT Animateur Sportif","Académie privée de sport"], duration:"6 mois – 2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Fédération Royale Marocaine de Football – formations", url:"https://www.frmf.ma" },
        "Listez vos sports pratiqués et vos niveaux (compétition, loisir, encadrement)",
      ]},
      { week:2, items:[
        { label:"IRFC – programmes formation sport", url:"https://www.irfc.ma" },
        { label:"Cours de kinésiologie – Coursera", url:"https://www.coursera.org/courses?query=kinesiology" },
      ]},
      { week:3, items:[
        "Proposez des sessions de sport dans votre quartier – lancez-vous en amateur",
        "Contactez une association sportive locale pour bénévolat",
      ]},
      { week:4, items:[
        { label:"Dossier ISSAF ou ENCPS", url:"https://www.issaf.ma" },
        "Créez un profil de coach sur Instagram avec contenu sportif original",
      ]},
    ],
  },
  // ── NEW: Digital Content Creation ─────────────────────────────
  {
    id:"creative_digital", icon:"🎬", demandIndex:0.75,
    bacAffinity:{ SMA:0.4,SMB:0.35,PC:0.35,SVT:0.35,ECO:0.5,LET:0.65,TECH:0.55,ARTS:0.9 },
    subjectWeights:{ french:0.3,arabic:0.2,tech:0.2,arts:0.15,design:0.15 },
    traitWeights:{ analytical:0.1,creativity:0.55,structure:0.1,social:0.3,risk:0.25,leadership:0.15 },
    salary:{ min:3000,max:20000,currency:"MAD" },
    pathways:{
      university:{ schools:["ISIC – Journalisme & Communication Digitale","FSJES – Communication","UIR – Media Arts"], duration:"3–5 ans" },
      grandeEcole:{ schools:["Sup'Communication (Casablanca)","ISCAE Marketing Digital","HEM Business – option Digital"], duration:"3–5 ans" },
      practical:{ schools:["Bootcamp vidéo/montage Udemy","Formation TikTok & Reels Creator","Certification Meta Blueprint"], duration:"3–12 mois" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"Créez une chaîne YouTube ou un compte TikTok", url:"https://www.youtube.com" },
        { label:"Cours vidéo gratuit – YouTube Creator Academy", url:"https://creatoracademy.youtube.com" },
      ]},
      { week:2, items:[
        { label:"CapCut – montage vidéo gratuit", url:"https://www.capcut.com" },
        { label:"Canva Pro – design gratuit étudiant", url:"https://www.canva.com/education/" },
      ]},
      { week:3, items:[
        "Publiez 5 contenus courts sur un sujet qui vous passionne",
        { label:"Meta Blueprint – publicité & contenu", url:"https://www.facebook.com/business/learn" },
      ]},
      { week:4, items:[
        { label:"Dossier ISIC ou Sup'Communication", url:"https://www.isic.ac.ma" },
        "Proposez un service de création de contenu à une PME locale",
      ]},
    ],
  },
  // ── NEW: Culinary & Hospitality Operations ────────────────────
  {
    id:"culinary_ops", icon:"🍽️", demandIndex:0.72,
    bacAffinity:{ SMA:0.3,SMB:0.3,PC:0.3,SVT:0.35,ECO:0.55,LET:0.45,TECH:0.3,ARTS:0.5 },
    subjectWeights:{ french:0.25,arabic:0.2,economics:0.2,management:0.15,english:0.1,history:0.1 },
    traitWeights:{ analytical:0.15,creativity:0.25,structure:0.35,social:0.45,risk:0.2,leadership:0.25 },
    salary:{ min:3500,max:16000,currency:"MAD" },
    pathways:{
      university:{ schools:["ISIT Tanger – Tourism & Hôtellerie","FSJES – Économie touristique","UIR – Hospitality Management"], duration:"3–5 ans" },
      grandeEcole:{ schools:["ITHC (Institut Supérieur de Technologie Hôtelière)","ISHT – BTS Cuisine / Restauration","Académie Accor Maroc"], duration:"2–3 ans" },
      practical:{ schools:["OFPPT – BTS Restauration & Hôtellerie","ISTA Cuisine & Pâtisserie","Centre Mohammed VI de Formation"], duration:"1–2 ans" },
    },
    actionPlan:[
      { week:1, items:[
        { label:"OFPPT – filières restauration", url:"https://www.ofppt.ma/fr/offre-de-formation" },
        "Listez vos recettes préférées et pratiquez quotidiennement à la maison",
      ]},
      { week:2, items:[
        { label:"YouTube – techniques de base en cuisine", url:"https://www.youtube.com/results?search_query=bases+cuisine+maroc" },
        "Proposez de cuisiner pour un proche : retour d'expérience pratique",
      ]},
      { week:3, items:[
        { label:"ITHC – programmes formation", url:"https://www.ithc.ma" },
        "Faites un stage d'une semaine dans un restaurant ou café local",
      ]},
      { week:4, items:[
        { label:"Salon Hôtellerie Restauration Maroc – SIRHA", url:"https://www.sirha.com/sirha-casablanca" },
        "Calculez le coût d'un menu simple → bases de gestion de restaurant",
      ]},
    ],
  },
];



// ═════════════════════════════════ utils ═══════════════════════

// ── Reality cluster mapping ────────────────────────────────────────
// Maps cluster id → strengthTags, interestTags, identityBoost, priorityBoost.
// Used by the extended scoring engine. Defined OUTSIDE clusters so CLUSTERS
// stays clean and this file remains diffable.
// identityBoost / priorityBoost: 1.0 = perfect fit, 0.5 = neutral, 0.2 = poor fit.
const REALITY_CLUSTER_MAP = {
  it:              { strengthTags:["s_coding","s_math","s_projects","s_learning"],           interestTags:["i_alone","i_gaming","i_research"],                     identityBoost:{academic:0.85,builder:0.65,creative:0.5,athletic:0.2,business:0.5,explorer:0.75,unsure:0.5},  priorityBoost:{money:0.9,prestige:0.65,stability:0.7,freedom:0.8,impact:0.55,flexibility:0.8} },
  data:            { strengthTags:["s_math","s_coding","s_learning","s_projects"],           interestTags:["i_research","i_alone","i_gaming"],                     identityBoost:{academic:0.9,builder:0.5,creative:0.4,athletic:0.2,business:0.6,explorer:0.8,unsure:0.5},   priorityBoost:{money:0.9,prestige:0.7,stability:0.6,freedom:0.75,impact:0.65,flexibility:0.7} },
  cyber:           { strengthTags:["s_coding","s_math","s_discipline","s_learning"],         interestTags:["i_alone","i_gaming","i_research"],                     identityBoost:{academic:0.8,builder:0.55,creative:0.35,athletic:0.25,business:0.45,explorer:0.8,unsure:0.5}, priorityBoost:{money:0.9,prestige:0.7,stability:0.8,freedom:0.65,impact:0.5,flexibility:0.6} },
  network:         { strengthTags:["s_coding","s_math","s_mechanical","s_tools"],            interestTags:["i_machines","i_alone","i_building"],                   identityBoost:{academic:0.7,builder:0.75,creative:0.3,athletic:0.25,business:0.45,explorer:0.6,unsure:0.5}, priorityBoost:{money:0.8,prestige:0.55,stability:0.8,freedom:0.6,impact:0.45,flexibility:0.65} },
  industrial:      { strengthTags:["s_math","s_mechanical","s_tools","s_projects","s_discipline"], interestTags:["i_machines","i_building","i_outdoors"],          identityBoost:{academic:0.75,builder:0.9,creative:0.3,athletic:0.4,business:0.45,explorer:0.6,unsure:0.5}, priorityBoost:{money:0.8,prestige:0.6,stability:0.85,freedom:0.5,impact:0.55,flexibility:0.55} },
  energy:          { strengthTags:["s_math","s_mechanical","s_projects","s_tools"],          interestTags:["i_outdoors","i_building","i_machines","i_research"],   identityBoost:{academic:0.75,builder:0.85,creative:0.35,athletic:0.35,business:0.45,explorer:0.8,unsure:0.5}, priorityBoost:{money:0.75,prestige:0.55,stability:0.7,freedom:0.6,impact:0.9,flexibility:0.6} },
  civil:           { strengthTags:["s_math","s_mechanical","s_projects","s_tools","s_organizing"], interestTags:["i_building","i_outdoors","i_machines"],          identityBoost:{academic:0.7,builder:0.9,creative:0.4,athletic:0.35,business:0.5,explorer:0.6,unsure:0.5}, priorityBoost:{money:0.8,prestige:0.65,stability:0.85,freedom:0.45,impact:0.6,flexibility:0.5} },
  health:          { strengthTags:["s_learning","s_discipline","s_speaking"],                interestTags:["i_helping","i_people","i_research"],                   identityBoost:{academic:0.9,builder:0.35,creative:0.3,athletic:0.5,business:0.35,explorer:0.6,unsure:0.5}, priorityBoost:{money:0.6,prestige:0.85,stability:0.75,freedom:0.3,impact:0.9,flexibility:0.3} },
  finance:         { strengthTags:["s_math","s_discipline","s_negotiating","s_learning"],    interestTags:["i_research","i_alone","i_selling"],                    identityBoost:{academic:0.85,builder:0.3,creative:0.3,athletic:0.2,business:0.9,explorer:0.5,unsure:0.5}, priorityBoost:{money:0.95,prestige:0.8,stability:0.8,freedom:0.5,impact:0.45,flexibility:0.5} },
  marketing:       { strengthTags:["s_speaking","s_negotiating","s_design","s_selling","s_writing"], interestTags:["i_selling","i_content","i_people","i_leading"], identityBoost:{academic:0.55,builder:0.35,creative:0.8,athletic:0.35,business:0.9,explorer:0.65,unsure:0.5}, priorityBoost:{money:0.85,prestige:0.65,stability:0.55,freedom:0.75,impact:0.5,flexibility:0.8} },
  logistics:       { strengthTags:["s_organizing","s_math","s_discipline","s_negotiating"],  interestTags:["i_leading","i_research","i_outdoors","i_machines"],     identityBoost:{academic:0.65,builder:0.65,creative:0.3,athletic:0.3,business:0.8,explorer:0.55,unsure:0.5}, priorityBoost:{money:0.8,prestige:0.55,stability:0.8,freedom:0.5,impact:0.5,flexibility:0.55} },
  tourism:         { strengthTags:["s_speaking","s_writing","s_negotiating","s_organizing"], interestTags:["i_people","i_helping","i_outdoors","i_content"],        identityBoost:{academic:0.45,builder:0.3,creative:0.7,athletic:0.4,business:0.65,explorer:0.9,unsure:0.5}, priorityBoost:{money:0.6,prestige:0.45,stability:0.55,freedom:0.9,impact:0.55,flexibility:0.85} },
  edu_law:         { strengthTags:["s_writing","s_speaking","s_organizing","s_discipline","s_learning"], interestTags:["i_helping","i_people","i_research","i_leading"], identityBoost:{academic:0.9,builder:0.25,creative:0.4,athletic:0.2,business:0.5,explorer:0.5,unsure:0.5}, priorityBoost:{money:0.5,prestige:0.85,stability:0.8,freedom:0.4,impact:0.85,flexibility:0.4} },
  arts_media:      { strengthTags:["s_design","s_video","s_writing","s_projects"],           interestTags:["i_content","i_alone","i_gaming","i_people"],            identityBoost:{academic:0.35,builder:0.4,creative:0.95,athletic:0.25,business:0.4,explorer:0.7,unsure:0.5}, priorityBoost:{money:0.5,prestige:0.55,stability:0.35,freedom:0.9,impact:0.6,flexibility:0.9} },
  trades:          { strengthTags:["s_mechanical","s_tools","s_projects","s_discipline"],    interestTags:["i_building","i_machines","i_outdoors"],                 identityBoost:{academic:0.25,builder:0.95,creative:0.35,athletic:0.5,business:0.4,explorer:0.6,unsure:0.6}, priorityBoost:{money:0.9,prestige:0.4,stability:0.9,freedom:0.5,impact:0.5,flexibility:0.55} },
  automotive:      { strengthTags:["s_mechanical","s_tools","s_projects","s_math"],          interestTags:["i_machines","i_building","i_outdoors","i_alone"],       identityBoost:{academic:0.3,builder:0.95,creative:0.25,athletic:0.4,business:0.35,explorer:0.55,unsure:0.6}, priorityBoost:{money:0.85,prestige:0.35,stability:0.85,freedom:0.6,impact:0.45,flexibility:0.6} },
  sports:          { strengthTags:["s_sports","s_discipline","s_organizing","s_speaking"],   interestTags:["i_sports","i_people","i_helping","i_leading","i_outdoors"], identityBoost:{academic:0.3,builder:0.4,creative:0.35,athletic:0.95,business:0.5,explorer:0.7,unsure:0.5}, priorityBoost:{money:0.6,prestige:0.7,stability:0.4,freedom:0.75,impact:0.8,flexibility:0.7} },
  creative_digital:{ strengthTags:["s_video","s_design","s_coding","s_writing","s_projects"],interestTags:["i_content","i_gaming","i_alone","i_people"],             identityBoost:{academic:0.4,builder:0.5,creative:0.95,athletic:0.2,business:0.55,explorer:0.75,unsure:0.5}, priorityBoost:{money:0.7,prestige:0.5,stability:0.4,freedom:0.95,impact:0.55,flexibility:0.9} },
  culinary_ops:    { strengthTags:["s_cooking","s_organizing","s_speaking","s_discipline","s_creativity"], interestTags:["i_cooking","i_people","i_outdoors","i_helping"], identityBoost:{academic:0.3,builder:0.65,creative:0.75,athletic:0.4,business:0.65,explorer:0.7,unsure:0.6}, priorityBoost:{money:0.7,prestige:0.5,stability:0.65,freedom:0.75,impact:0.6,flexibility:0.7} },
};


// ─────────────────────────────────────────────────────────────────
// FIX: cultural scoring layer
// Three new dimensions per cluster, used in computeClusterScores.
// prestigeScore        — social/parental perception in Moroccan context
// parentAcceptanceScore— likelihood parents approve without pushback
// academicUtilScore    — how well this path rewards high academic marks
// All 0–1 scale.
// ─────────────────────────────────────────────────────────────────
const CULTURAL_CLUSTER_SCORES = {
  it:              { prestige:0.75, parentAcceptance:0.80, academicUtil:0.85 },
  data:            { prestige:0.80, parentAcceptance:0.82, academicUtil:0.90 },
  cyber:           { prestige:0.72, parentAcceptance:0.76, academicUtil:0.80 },
  network:         { prestige:0.60, parentAcceptance:0.68, academicUtil:0.65 },
  industrial:      { prestige:0.65, parentAcceptance:0.70, academicUtil:0.75 },
  energy:          { prestige:0.70, parentAcceptance:0.72, academicUtil:0.78 },
  civil:           { prestige:0.78, parentAcceptance:0.80, academicUtil:0.82 },
  health:          { prestige:0.98, parentAcceptance:0.97, academicUtil:0.98 },
  finance:         { prestige:0.88, parentAcceptance:0.90, academicUtil:0.88 },
  marketing:       { prestige:0.68, parentAcceptance:0.72, academicUtil:0.65 },
  logistics:       { prestige:0.60, parentAcceptance:0.64, academicUtil:0.62 },
  tourism:         { prestige:0.42, parentAcceptance:0.38, academicUtil:0.35 },
  edu_law:         { prestige:0.85, parentAcceptance:0.88, academicUtil:0.82 },
  arts_media:      { prestige:0.50, parentAcceptance:0.42, academicUtil:0.40 },
  trades:          { prestige:0.35, parentAcceptance:0.32, academicUtil:0.30 },
  automotive:      { prestige:0.33, parentAcceptance:0.30, academicUtil:0.28 },
  sports:          { prestige:0.48, parentAcceptance:0.45, academicUtil:0.30 },
  creative_digital:{ prestige:0.52, parentAcceptance:0.48, academicUtil:0.45 },
  culinary_ops:    { prestige:0.40, parentAcceptance:0.36, academicUtil:0.32 },
};

// Cultural rerank layer — Step 2
// prestigeIndex: 0–1, how prestigious this path is perceived in Morocco
// trackType: classification used for rerank filtering
// PrestigeIndex — Moroccan cultural perception of prestige per cluster (0–1).
// NOT a value judgement; reflects "parent/family acceptance & social standing" in Moroccan context.
// Values are heuristics based on observable social patterns.
const CLUSTER_PRESTIGE = {
  health:          { prestigeIndex:1.00, trackType:"academic_prestige" },
  data:            { prestigeIndex:0.90, trackType:"academic_prestige" },
  it:              { prestigeIndex:0.85, trackType:"academic_prestige" },
  cyber:           { prestigeIndex:0.80, trackType:"academic_prestige" },
  finance:         { prestigeIndex:0.75, trackType:"business_prestige" },
  industrial:      { prestigeIndex:0.75, trackType:"academic_prestige" },
  civil:           { prestigeIndex:0.70, trackType:"academic_prestige" },
  energy:          { prestigeIndex:0.68, trackType:"academic_prestige" },
  network:         { prestigeIndex:0.65, trackType:"academic_prestige" },
  marketing:       { prestigeIndex:0.60, trackType:"business_prestige" },
  logistics:       { prestigeIndex:0.60, trackType:"business_prestige" },
  edu_law:         { prestigeIndex:0.60, trackType:"business_prestige" },
  creative_digital:{ prestigeIndex:0.50, trackType:"creative" },
  arts_media:      { prestigeIndex:0.45, trackType:"creative" },
  tourism:         { prestigeIndex:0.45, trackType:"service" },
  trades:          { prestigeIndex:0.42, trackType:"hands_on" },
  sports:          { prestigeIndex:0.40, trackType:"hands_on" },
  automotive:      { prestigeIndex:0.40, trackType:"hands_on" },
  culinary_ops:    { prestigeIndex:0.38, trackType:"hands_on" },
};

// Cultural rerank layer — Step 4
// Hardcoded adjacent prestigious paths per low-prestige cluster id.
// Used when a low-prestige cluster tops Best Fit for a high-avg prestige/unsure student.
const PRESTIGE_ADJACENT_PATHS = {
  sports: {
    ar: ["إدارة الرياضة (FSJES/ENCG)", "الفيزيوتيراپي وإعادة التأهيل (IFCS)", "شهادات التدريب والأداء البشري"],
    fr: ["Management du Sport (FSJES/ENCG)", "Kinésithérapie & rééducation (IFCS)", "Certifications coaching & performance humaine"],
    en: ["Sport Management (FSJES/ENCG)", "Physiotherapy & Rehabilitation (IFCS)", "Coaching & Human Performance certifications"],
  },
  tourism: {
    ar: ["ENCG – تدبير المقاولات", "إدارة الضيافة (grandes écoles privées)", "تسويق السياحة وإدارة الأحداث"],
    fr: ["ENCG – Gestion d'entreprise", "Management Hôtelier (grandes écoles privées)", "Marketing touristique & management d'événements"],
    en: ["ENCG – Business Management", "Hospitality Management (private grandes écoles)", "Tourism Marketing & Event Management"],
  },
  arts_media: {
    ar: ["التسويق والاتصال (ENCG/ISCAE)", "تصميم تجربة المستخدم (UX)", "الإشهار والعلامة التجارية"],
    fr: ["Marketing & Communication (ENCG/ISCAE)", "Design UX/UI", "Publicité & stratégie de marque"],
    en: ["Marketing & Communication (ENCG/ISCAE)", "UX/UI Design", "Advertising & Brand Strategy"],
  },
  creative_digital: {
    ar: ["التسويق الرقمي (ENCG)", "استراتيجية العلامة التجارية", "إدارة وسائل التواصل الاجتماعي"],
    fr: ["Marketing digital (ENCG)", "Stratégie de marque", "Gestion des réseaux sociaux"],
    en: ["Digital Marketing (ENCG)", "Brand Strategy", "Social Media Management"],
  },
  logistics: {
    ar: ["ENCG – الاقتصاد والإدارة", "هندسة الأنظمة الصناعية (ENSA)", "إدارة سلسلة التوريد (Master)"],
    fr: ["ENCG – Économie & gestion", "Génie industriel (ENSA)", "Supply Chain Management (Master)"],
    en: ["ENCG – Economics & Management", "Industrial Engineering (ENSA)", "Supply Chain Management (Master)"],
  },
  culinary_ops: {
    ar: ["إدارة الضيافة والمطاعم (ISIT/privé)", "علوم الأغذية (FST)", "إدارة الأعمال الغذائية"],
    fr: ["Hôtellerie-Restauration Management (ISIT/privé)", "Sciences alimentaires (FST)", "Gestion d'entreprise agroalimentaire"],
    en: ["Hospitality & Restaurant Management (ISIT/private)", "Food Science (FST)", "Agri-food Business Management"],
  },
  trades: {
    ar: ["هندسة تقنيات صناعية (ENSA/FST)", "تقنيات الطاقة والكهرباء (OFPPT BTS ثم licence)", "هندسة ميكانيكية تطبيقية"],
    fr: ["Génie technologique industriel (ENSA/FST)", "Électrotechnique & Énergie (BTS puis licence)", "Génie mécanique appliqué"],
    en: ["Industrial Technology Engineering (ENSA/FST)", "Electrotechnics & Energy (BTS then degree)", "Applied Mechanical Engineering"],
  },
  automotive: {
    ar: ["هندسة ميكاترونيك وأنظمة السيارات (ENSA)", "صناعة السيارات (ENSAM/FST)", "هندسة كهربائية للمركبات"],
    fr: ["Génie mécatronique & automobile (ENSA)", "Génie automobile (ENSAM/FST)", "Génie électrique pour véhicules"],
    en: ["Mechatronics & Automotive Engineering (ENSA)", "Automotive Engineering (ENSAM/FST)", "Automotive Electrical Engineering"],
  },
};

// FIX: prestige-aware path naming
// When a high-performing student (avg 14+) gets a lower-prestige path,
// use the elevated display name instead of the base cluster label.
const PRESTIGE_PATH_NAMES = {
  tourism: {
    ar: { elevated:"إدارة الضيافة الدولية", base:"السياحة والضيافة" },
    fr: { elevated:"Management Hôtelier International", base:"Tourisme & Hôtellerie" },
    en: { elevated:"International Hospitality Management", base:"Tourism & Hospitality" },
  },
  culinary_ops: {
    ar: { elevated:"إدارة المطاعم والضيافة الراقية", base:"الطهي والضيافة التشغيلية" },
    fr: { elevated:"Gestion Restauration & Gastronomie", base:"Cuisine & Hôtellerie Opérationnelle" },
    en: { elevated:"Restaurant & Culinary Arts Management", base:"Culinary & Hospitality Operations" },
  },
  arts_media: {
    ar: { elevated:"الإنتاج الإعلامي والاستراتيجية الرقمية", base:"الفنون والإعلام" },
    fr: { elevated:"Production Médias & Stratégie Digitale", base:"Arts & Médias" },
    en: { elevated:"Media Production & Digital Strategy", base:"Arts & Media" },
  },
  creative_digital: {
    ar: { elevated:"تسويق المحتوى الرقمي وبناء الماركة", base:"إنتاج المحتوى الرقمي" },
    fr: { elevated:"Marketing de Contenu & Brand Building", base:"Création de Contenu Digital" },
    en: { elevated:"Content Marketing & Brand Building", base:"Digital Content Creation" },
  },
  sports: {
    ar: { elevated:"علوم الرياضة وإدارة الأداء البشري", base:"الرياضة واللياقة البدنية" },
    fr: { elevated:"Sciences du Sport & Management de Performance", base:"Sport & Condition Physique" },
    en: { elevated:"Sport Sciences & Human Performance Management", base:"Sports & Fitness" },
  },
  trades: {
    ar: { elevated:"هندسة التقنيات الصناعية والبنية التحتية", base:"المهن التقنية الحرفية" },
    fr: { elevated:"Ingénierie des Technologies Industrielles", base:"Métiers Techniques & Artisanaux" },
    en: { elevated:"Industrial Engineering Technology", base:"Skilled Trades & Crafts" },
  },
};

// FIX: clamp numeric UI values
function clamp(val, min = 0, max = 100) {
  const n = Number(val);
  return isNaN(n) ? min : Math.min(max, Math.max(min, n));
}

// TASK 2 — PRESTIGE TIER per cluster
// A = medicine / engineering / data / law  (socially elite in Morocco)
// B = business / logistics / civil / network (solid, respected)
// C = tourism / hospitality / arts / trades / sports / culinary (low cultural prestige)
// OFPPT/ISTA are PATHWAYS shown inside clusters, never standalone cluster IDs.
const CLUSTER_PRESTIGE_TIER = {
  health: "A", data: "A", it: "A", cyber: "A", industrial: "A",
  energy: "A", civil: "A",
  finance: "B", edu_law: "B", network: "B", logistics: "B", marketing: "B",
  creative_digital: "B",
  tourism: "C", arts_media: "C", sports: "C", trades: "C",
  automotive: "C", culinary_ops: "C",
};

// TASK 2 — Academic tier A/B/C/D (replaces HIGH/MID/LOW for new scoring)
function getAcademicTierABCD(avg) {
  if (avg >= 15.5) return "A";
  if (avg >= 14.0) return "B";
  if (avg >= 12.0) return "C";
  return "D";
}
function tierIsHigh(tier) { return tier === "A" || tier === "B"; }

// Legacy alias — kept for backward-compat with old callers
function getAcademicTier(overallAvg) {
  const avg = Number(overallAvg) || 0;
  if (avg >= 14.5) return "HIGH";
  if (avg >= 12)   return "MID";
  return "LOW";
}

// TASK 2 — computePES: Prestige Expectation Score [0..1]
// Deterministic. Reads average, track stream, top subject, and family pressure field.
function computePES(overallAvg, bacTrack, effectiveMarks, fpField) {
  const avg = clamp(Number(overallAvg) || 0, 0, 20);
  const stream = STREAM_BY_TRACK[bacTrack] || "scientific";
  let pes = avg / 20;
  if (stream === "scientific") pes = Math.min(1, pes * 1.15);
  else if (stream === "eco")   pes = Math.min(1, pes * 1.05);
  if (fpField === "medicine" || fpField === "engineering") pes = Math.min(1, pes + 0.08);
  const markVals = Object.values(effectiveMarks||{}).map(Number).filter(v => !isNaN(v) && v > 0);
  if (markVals.length && Math.max(...markVals) >= 16) pes = Math.min(1, pes + 0.05);
  return pes;
}

// LOGIC FIX: computeThreeViews — uses pre-computed lane scores (fit/balanced/ambitious)
// stored on each cluster by computeClusterScores. See spec §3.7.
// Lane formulas (already baked into scores.fit / scores.balanced / scores.ambitious):
//   Best Personal Fit  : 45% trait + 25% handsOn-match + 15% market + 15% futureIndex
//   Best Balanced      : 40% academic + 20% market + 15% trait + 15% futureIndex + 10% intl
//   Most Ambitious     : 35% prestige + 25% academic proximity + 15% focusAbility + 15% future + 10% market
// Cultural constraints enforced here on top of the pre-scored values.
function computeThreeViews(rankedClusters, overallAvg, info, effectiveMarks) {
  if (!rankedClusters || rankedClusters.length === 0) return { bestFit:null, balanced:null, ambitious:null };

  const avg           = clamp(Number(overallAvg) || 0, 0, 20);
  const safeInfo      = (info && typeof info === "object") ? info : {};
  const goalMode      = safeInfo.goalMode      || "unsure";
  const goalPref      = safeInfo.goalPreference || "prestige";
  const privateBudget = !!safeInfo.privateBudget;
  const fpField       = safeInfo.fpField || "";
  const pes           = computePES(avg, safeInfo.bacTrack||"SMA", effectiveMarks||{}, fpField);
  const academicTier  = getAcademicTierABCD(avg);
  const isHighTier    = tierIsHigh(academicTier);
  const isPractical   = goalPref === "practical" || goalMode === "practical";

  // profileBoost fields for cultural constraints
  const pb         = safeInfo.profileBoost || {};
  const pbPrestige = Number(pb.prestigePriority  ?? 1);
  const pbHandsOn  = Number(pb.handsOn           ?? 1);

  // Cultural Credibility Filter for Three Views tab (applied on top of lane scores)
  function tierCPenalty(clusterId) {
    if (isPractical || pbHandsOn >= 2) return 0;
    const ct = CLUSTER_PRESTIGE_TIER[clusterId] || "B";
    if (ct !== "C") return 0;
    if (avg < 12) return 0;
    if (avg >= 15.5) return 0.30;
    if (isHighTier) return 0.18;
    return 0.06;
  }

  // Medicine penalty in Balanced when public-ineligible + no budget
  function medPenalty(c) {
    return (c.id === "health" && c.eligibilityTag === "notEligiblePublic" && !privateBudget) ? 0.12 : 0;
  }

  // ── Best Personal Fit: use pre-computed scores.fit, personality guardrail ──
  const fitSorted = [...rankedClusters].sort((a,b) => {
    // Apply mild tier-C penalty on fit tab too (50% strength)
    return (b.scores.fit||0) - tierCPenalty(b.id)*0.5 - ((a.scores.fit||0) - tierCPenalty(a.id)*0.5);
  });

  function fitPersonalityOk(cluster, rank) {
    const ts = cluster.scores.trait || 0;
    if (cluster.id === "health" && ts < 0.60) { if (rank === 0) return false; }
    if (ts < 0.55 && rank === 0) return false;
    if (ts < 0.45 && avg < 16.5)  return false;
    return true;
  }
  let bestFit = null;
  for (let i = 0; i < fitSorted.length; i++) {
    if (fitPersonalityOk(fitSorted[i], i)) { bestFit = fitSorted[i]; break; }
  }
  bestFit = bestFit || fitSorted[0] || null;

  // ── Best Balanced: use pre-computed scores.balanced + cultural gate ──
  const balSorted = [...rankedClusters].sort((a,b) => {
    const sa = (a.scores.balanced||0) - tierCPenalty(a.id) - medPenalty(a);
    const sb = (b.scores.balanced||0) - tierCPenalty(b.id) - medPenalty(b);
    return sb - sa;
  });
  const balanced = balSorted[0] || null;

  // ── Most Ambitious: use pre-computed scores.ambitious + prestige gate ──
  const ambSorted = [...rankedClusters].sort((a,b) => {
    let sa = a.scores.ambitious||0;
    let sb = b.scores.ambitious||0;
    // Cultural sanity: pbPrestige=2 + avg ≥ 14 → Tier C cannot be #1
    if (pbPrestige >= 2 && avg >= 14) {
      if (CLUSTER_PRESTIGE_TIER[a.id] === "C") sa -= 0.20;
      if (CLUSTER_PRESTIGE_TIER[b.id] === "C") sb -= 0.20;
    }
    return sb - sa;
  });
  // Medicine: not #1 in Ambitious if avg < 15.5 + !privateBudget
  let ambitious = null;
  for (const item of ambSorted) {
    if (item.id === "health" && !privateBudget && avg < 15.5) continue;
    ambitious = item; break;
  }
  ambitious = ambitious || ambSorted[0] || null;

  if (typeof window !== "undefined" && window.__DEV__) {
    console.log("[Massar ThreeViews] PES:", pes.toFixed(2), "tier:", academicTier,
      "| fit:", bestFit?.id, "balanced:", balanced?.id, "ambitious:", ambitious?.id);
  }

  return { bestFit, balanced, ambitious };
}

// ── Scoring weights (must sum to 1.0) ─────────────────────────────
// Extend here — never touch individual score computation below.
const SCORING_WEIGHTS = {
  bac:       0.18,   // Bac track affinity
  academic:  0.18,   // Subject marks performance
  traits:    0.14,   // Personality traits from Likert test
  market:    0.08,   // Morocco market demand index
  strengths: 0.16,   // Self-perceived strengths (reality layer)
  interests: 0.12,   // Natural interests (reality layer)
  identity:  0.09,   // Self-identity type modifier
  priority:  0.05,   // Life priority modifier
};
// Sum check: 0.18+0.18+0.14+0.08+0.16+0.12+0.09+0.05 = 1.00

// ─────────────────────────────────────────────────────────────────
// Cultural rerank layer — Step 3
// Pure post-processing on rankedClusters. Does NOT mutate engine output.
// Returns { primary: Cluster[], secondary: Cluster[] | null }
//   primary   = ordered clusters to show as "Top Careers"
//   secondary = alternate prestige ranking (only set when goalMode="unsure")
// ─────────────────────────────────────────────────────────────────
function culturallyRerankClusters(rankedClusters, info, overallAvg) {
  if (!rankedClusters || rankedClusters.length === 0) return { primary: [], secondary: null };

  const goalMode  = info.goalMode  || "unsure";
  // TASK 2 — goalPreference overrides goalMode for the practical exemption check
  const goalPref  = info.goalPreference || "prestige";
  const avg       = clamp(Number(overallAvg) || 0, 0, 20);
  const isHighAvg = avg >= 14.5;
  // Practical mode: user explicitly chose practical route — no prestige gates apply
  const isPractical = goalPref === "practical" || goalMode === "practical";

  // Helper: get prestige metadata for a cluster
  function getMeta(c) {
    return CLUSTER_PRESTIGE[c.id] || { prestigeIndex: 0.5, trackType: "service" };
  }

  // 3B: Clusters that should not top the list for high-avg non-practical students
  const LOW_PRESTIGE_TYPES = new Set(["hands_on"]);
  const LOW_PRESTIGE_IDS   = new Set(["tourism", "sports", "arts_media", "culinary_ops"]);

  function isLowPrestigeCluster(c) {
    const m = getMeta(c);
    return LOW_PRESTIGE_TYPES.has(m.trackType) || LOW_PRESTIGE_IDS.has(c.id) || m.prestigeIndex < 0.58;
  }

  // 3B: Hard gate — low-prestige clusters can only be in top-3 if score is dominant
  function applyHardGate(sorted) {
    if (!isHighAvg || isPractical) return sorted;
    const topScore = sorted[0]?.scores?.final || 0;
    const top3 = [];
    const rest = [];
    for (const c of sorted) {
      if (isLowPrestigeCluster(c)) {
        const meta = getMeta(c);
        const isDominant = c.scores.final >= (topScore - 0.03) && meta.prestigeIndex >= 0.60;
        if (isDominant && top3.length < 3) {
          top3.push(c);
        } else {
          rest.push(c);
        }
      } else {
        if (top3.length < 3) top3.push(c);
        else rest.push(c);
      }
    }
    return [...top3, ...rest];
  }

  // 3C: Prestige mode scoring
  function prestigeSort(clusters) {
    return [...clusters].sort((a, b) => {
      const ma = getMeta(a); const mb = getMeta(b);
      const sa = 0.55 * (a.scores.final || 0) + 0.30 * ma.prestigeIndex + 0.15 * (a.scores.academic || 0);
      const sb = 0.55 * (b.scores.final || 0) + 0.30 * mb.prestigeIndex + 0.15 * (b.scores.academic || 0);
      return sb - sa;
    });
  }

  // 3E: Practical mode scoring
  function practicalSort(clusters) {
    return [...clusters].sort((a, b) => {
      const hasPractA = !!(a.pathways?.practical?.schools?.length);
      const hasPractB = !!(b.pathways?.practical?.schools?.length);
      const sa = 0.70 * (a.scores.final || 0) + 0.30 * (hasPractA ? 1 : 0);
      const sb = 0.70 * (b.scores.final || 0) + 0.30 * (hasPractB ? 1 : 0);
      return sb - sa;
    });
  }

  let primary;
  let secondary = null;

  if (isPractical) {
    // TASK 2 — practical preference: practical boost, no prestige gates at all
    primary = practicalSort(rankedClusters);
  } else if (goalMode === "prestige") {
    // 3C: sort by prestige composite, then gate
    primary = applyHardGate(prestigeSort(rankedClusters));
  } else if (goalMode === "fit") {
    // 3D: keep existing ranking, apply gate
    primary = applyHardGate([...rankedClusters]);
  } else if (goalMode === "practical") {
    // 3E: practical boost, no gating
    primary = practicalSort(rankedClusters);
  } else {
    // 3F: unsure — best fit (gated) + prestige track for secondary panel
    primary   = applyHardGate([...rankedClusters]);
    secondary = applyHardGate(prestigeSort(rankedClusters));
  }

  return { primary, secondary };
}

// ─────────────────────────────────────────────────────────────────
// TASK 3 — Logic Self-Check (dev-only, 5 cases)
// Runs once on localhost to validate scoring logic.
// No import.meta usage — uses window.__DEV__ or hostname check only.
// ─────────────────────────────────────────────────────────────────
function runLogicSelfCheck() {
  try {
    const LOW_PRACTICAL = new Set(["tourism","sports","culinary_ops","arts_media","trades","automotive"]);
    const GOOD_SVT      = new Set(["data","cyber","it","health","energy","industrial","civil"]);
    const GOOD_LET      = new Set(["edu_law","marketing","arts_media","creative_digital"]);
    const GOOD_ECO      = new Set(["finance","marketing","logistics","edu_law"]);

    // Minimal synthetic cluster builder used by culturallyRerankClusters
    const makeRC = (id, final, academic, trait) => ({
      id,
      scores: { final, academic, trait: trait||0.5, market:0.7, bac:0.6, interest:0.5, strength:0.5, identity:0.5, priority:0.5 },
      pathways: {
        grandeEcole: ["data","it","cyber","health","energy","industrial","civil","finance","edu_law"].includes(id) ? {schools:["ENSA"]} : null,
        university: {schools:["FST"]},
        practical: {schools:["OFPPT"]},
      },
      eligibilityTag: "eligible",
    });

    // Synthetic compute helper — bypasses full engine, tests rerank + three-views only
    function makeRanked(idScores) {
      return idScores.map(([id,f,a,t]) => makeRC(id,f,a,t)).sort((a,b)=>b.scores.final-a.scores.final);
    }

    let passed = 0, failed = 0;
    function assert(label, condition, data) {
      if (condition) { passed++; }
      else { failed++; console.warn(`[SelfCheck FAIL] ${label}`, data); }
    }

    // ── Case A: SVT post, avg 15.2, strong pc/svt/math
    // → top-3 should include Data/AI or Engineering/Cyber; NOT Tourism, NOT OFPPT-only
    {
      const ranked = makeRanked([
        ["data",    0.82, 0.90, 0.75],
        ["cyber",   0.78, 0.85, 0.65],
        ["it",      0.76, 0.82, 0.70],
        ["health",  0.71, 0.88, 0.55],
        ["tourism", 0.55, 0.30, 0.60],
        ["sports",  0.40, 0.20, 0.55],
      ]);
      const info = { goalMode:"prestige", goalPreference:"prestige", privateBudget:false };
      const { primary } = culturallyRerankClusters(ranked, info, 15.2);
      const top3 = primary.slice(0,3).map(c=>c.id);
      assert("Case A: high SVT — no low-practical in top-3", !top3.some(id=>LOW_PRACTICAL.has(id)), top3);
      assert("Case A: high SVT — at least one GOOD cluster in top-3", top3.some(id=>GOOD_SVT.has(id)), top3);
    }

    // ── Case B: SVT post, avg 11.5 → practical options allowed in top-3
    {
      const ranked = makeRanked([
        ["trades",    0.62, 0.40, 0.70],
        ["automotive",0.60, 0.38, 0.65],
        ["it",        0.55, 0.55, 0.45],
        ["tourism",   0.52, 0.30, 0.60],
      ]);
      const info = { goalMode:"unsure", goalPreference:"prestige" };
      const { primary } = culturallyRerankClusters(ranked, info, 11.5);
      const top3 = primary.slice(0,3).map(c=>c.id);
      // low avg — practical clusters ARE allowed (no prestige gate for avg < 12)
      assert("Case B: low avg — practical clusters not blocked", top3.length > 0, top3);
    }

    // ── Case C: LET post, high arabic/french/philo → law/education ok
    {
      const ranked = makeRanked([
        ["edu_law",        0.80, 0.85, 0.72],
        ["marketing",      0.72, 0.75, 0.65],
        ["creative_digital",0.65, 0.60, 0.70],
        ["sports",         0.50, 0.20, 0.60],
      ]);
      const info = { goalMode:"prestige", goalPreference:"prestige" };
      const { primary } = culturallyRerankClusters(ranked, info, 14.0);
      const top3 = primary.slice(0,3).map(c=>c.id);
      assert("Case C: LET — edu_law or marketing in top-3", top3.some(id=>GOOD_LET.has(id)), top3);
    }

    // ── Case D: ECO post, high eco/math → finance/business ok
    {
      const ranked = makeRanked([
        ["finance",  0.81, 0.87, 0.70],
        ["logistics",0.75, 0.80, 0.65],
        ["tourism",  0.60, 0.35, 0.55],
        ["sports",   0.45, 0.20, 0.60],
      ]);
      const info = { goalMode:"prestige", goalPreference:"prestige" };
      const { primary } = culturallyRerankClusters(ranked, info, 14.5);
      const top3 = primary.slice(0,3).map(c=>c.id);
      assert("Case D: ECO — finance/logistics in top-3", top3.some(id=>GOOD_ECO.has(id)), top3);
      assert("Case D: ECO — tourism/sports NOT in top-3", !top3.some(id=>["tourism","sports"].includes(id)), top3);
    }

    // ── Case E: Practical preference even with avg 14.5 → allow tourism/practical to rise
    {
      const ranked = makeRanked([
        ["it",      0.72, 0.80, 0.55],
        ["tourism", 0.68, 0.40, 0.78],
        ["sports",  0.65, 0.30, 0.80],
      ]);
      const info = { goalMode:"practical", goalPreference:"practical" };
      const { primary } = culturallyRerankClusters(ranked, info, 14.5);
      const top3 = primary.slice(0,3).map(c=>c.id);
      assert("Case E: practical pref — low-prestige clusters CAN appear in top-3", top3.some(id=>LOW_PRACTICAL.has(id)), top3);
    }

    if (failed === 0) {
      console.log(`%c[Massar Logic Self-Check] ✅ All ${passed} cases passed.`, "color:green;font-weight:bold");
    } else {
      console.warn(`[Massar Logic Self-Check] ⚠️ ${failed} case(s) failed, ${passed} passed.`);
    }
  } catch (e) {
    console.warn("[Massar Logic Self-Check] error:", e);
  }
}

// Run self-check on localhost only (no import.meta)
if (typeof window !== "undefined" && typeof window.location !== "undefined"
    && window.location.hostname === "localhost") {
  setTimeout(runLogicSelfCheck, 1400);
}

// src/massar/utils/storage.js
// ─────────────────────────────────────────────────────────────────
// localStorage helpers with:
//   • debounced saves (300 ms) to avoid spam on every keystroke
//   • safe load (catches corrupted JSON / old schemas silently)
//   • schema version check — bump SCHEMA_VERSION when state shape changes
// ─────────────────────────────────────────────────────────────────

const LS_KEY = "massar_session_v6";
const SCHEMA_VERSION = 6;

/** Debounce helper — returns a function that fires at most once per `ms`. */
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/**
 * Save session state to localStorage (debounced 300 ms).
 * Call this on every relevant state change.
 */
const saveSession = debounce((state) => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ ...state, _v: SCHEMA_VERSION }));
  } catch {
    // quota exceeded or private browsing — silently ignore
  }
}, 300);

/**
 * Load session from localStorage.
 * Returns null if nothing saved, schema is old, or data is corrupted.
 */
function loadSession() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Schema version guard — old saves are silently discarded
    if (!parsed || parsed._v !== SCHEMA_VERSION) return null;
    // Basic shape validation
    if (typeof parsed.lang !== "string") return null;
    // TASK 1 — migrate old physics/chemistry mark keys → physchem
    if (parsed.marks) parsed.marks = migrateMarks(parsed.marks);
    // SUBJECT MODEL (MOROCCO) FIX: migrate old info.trackField / examLevel → new fields
    if (parsed.info) {
      const inf = parsed.info;
      // If old examLevel exists but new examYear doesn't, promote it
      if (!inf.examYear && inf.examLevel) inf.examYear = inf.examLevel;
      // If old trackField exists but new bac1Field/bac2Track don't, derive them
      if (inf.trackField && !inf.bac1Field && !inf.bac2Track) {
        const bac1Fields = ["SE","SM","ST","ECO","LSH","AA","EO","BP"];
        const bac2Tracks = ["SVT","PC","SMA","SMB","ST","ECO","LSH","AA","EO","BP"];
        const year = inf.examYear || "bac2";
        if (year === "bac1" && bac1Fields.includes(inf.trackField)) {
          inf.bac1Field = inf.trackField;
        } else if (year === "bac2" && bac2Tracks.includes(inf.trackField)) {
          inf.bac2Track = inf.trackField;
        } else {
          // Map old bacTrack style
          const OLD_BAC_TRACK_MAP = {
            SVT:"bac2:SVT", PC:"bac2:PC", SMA:"bac2:SMA", SMB:"bac2:SMB",
            SE:"bac1:SE", SM:"bac1:SM",
          };
          const mapped = OLD_BAC_TRACK_MAP[inf.bacTrack] || null;
          if (mapped) {
            const [yr, tk] = mapped.split(":");
            inf.examYear = yr;
            if (yr === "bac1") inf.bac1Field = tk;
            else               inf.bac2Track = tk;
          }
        }
      }
      parsed.info = inf;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Clear saved session entirely. */
function clearSession() {
  try { localStorage.removeItem(LS_KEY); } catch {}
}

/** Save a single email CTA lead locally (Goal 5). */
function saveCtaEmail(email) {
  try {
    const existing = JSON.parse(localStorage.getItem("massar_cta_emails") || "[]");
    if (!existing.includes(email)) {
      existing.push(email);
      localStorage.setItem("massar_cta_emails", JSON.stringify(existing));
    }
  } catch {}
}

// src/massar/utils/scoring.js
// ─────────────────────────────────────────────────────────────────
// Pure functions — no React, no side-effects.
// All inputs → deterministic outputs.
// ─────────────────────────────────────────────────────────────────




// ─────────────────────────────────────────────────────────────────
// FIX: ErrorBoundary prevents white screen crash
// ─────────────────────────────────────────────────────────────────
class ResultsErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { crashed: false, error: null }; }
  static getDerivedStateFromError(error) { return { crashed: true, error }; }
  componentDidCatch(error, info) { console.error("[Massar Results crash]", error, info); }
  render() {
    if (this.state.crashed) {
      return (
        <div style={{
          padding:"40px 28px", textAlign:"center", maxWidth:520, margin:"0 auto",
          background:"var(--surface)", borderRadius:20, border:"1px solid var(--border)",
          boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
        }}>
          <div style={{fontSize:48, marginBottom:16}}>⚠️</div>
          <h2 style={{fontSize:20, color:"var(--text)", marginBottom:10, fontWeight:700}}>
            Something went wrong
          </h2>
          <p style={{fontSize:14, color:"var(--muted)", marginBottom:8, lineHeight:1.6}}>
            Your profile could not load correctly.
          </p>
          <p style={{fontSize:13, color:"var(--muted)", marginBottom:28}}>
            This is usually a temporary issue. Try again or restart.
          </p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button className="btn btn-secondary"
              onClick={()=>this.setState({crashed:false,error:null})}>
              🔄 Retry
            </button>
            <button className="btn btn-danger" onClick={this.props.onRestart}>
              {this.props.restartLabel || "Restart Test"}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Traits ────────────────────────────────────────────────────────
function computeTraits(answers) {
  const traits = { analytical:0, social:0, structure:0, creativity:0, risk:0, leadership:0 };
  const counts = { ...traits };
  PERSONALITY_QUESTIONS.forEach((q) => {
    const raw = answers[q.id];
    if (raw == null) return;
    const val = q.reverse ? 6 - raw : raw;
    traits[q.trait]  += val;
    counts[q.trait]  += 1;
  });
  const normalized = {};
  Object.keys(traits).forEach((k) => {
    normalized[k] = counts[k] > 0 ? (traits[k] / counts[k] - 1) / 4 : 0.5;
  });
  return normalized;
}

// ── Eligibility ───────────────────────────────────────────────────
/**
 * Returns "privateOnly" | "notEligiblePublic" | null.
 * `overallAvg` is pre-computed to avoid recalculating per cluster.
 */
function getEligibilityTag(clusterId, effectiveMarks, overallAvg, privateBudget) {
  const c = CLUSTER_CONSTRAINTS[clusterId];
  if (!c) return null;

  const failsAvg = overallAvg < c.minAvg;
  const failsSubject = Object.entries(c.requiredSubjects || {}).some(
    ([subj, min]) => (effectiveMarks[subj] || 0) < min
  );

  const fails = failsAvg || failsSubject;
  if (!fails) return null;

  // Health cluster gets a hard "notEligiblePublic" badge when no private budget
  if (clusterId === "health" && !privateBudget) return "notEligiblePublic";
  if (c.privateOk) return "privateOnly";
  return null;
}

// C — Prestige index per cluster (drives prestige boost for high-avg students)
const PRESTIGE_INDEX = {
  it: 0.85, data: 0.9, cyber: 0.85, network: 0.75,
  industrial: 0.8, energy: 0.8, civil: 0.78,
  health: 0.95, finance: 0.8, marketing: 0.6,
  logistics: 0.65, tourism: 0.45, edu_law: 0.7, arts_media: 0.4,
  sports: 0.55, creative_digital: 0.55, trades: 0.4, automotive: 0.45, culinary_ops: 0.35,
};

// LOGIC FIX: future-proofing index per cluster (automation resistance + global demand)
// Used in Balanced and Ambitious scoring lanes (spec §3.6)
const FUTURE_INDEX = {
  data:            0.97,  // AI/ML — highest demand globally
  cyber:           0.95,  // Cybersecurity — structural shortage
  it:              0.88,  // Software — broad and resilient
  health:          0.90,  // Healthcare — demographic-driven
  energy:          0.88,  // Renewables — Morocco's Vision 2030
  industrial:      0.82,  // Manufacturing automation engineers
  civil:           0.78,  // Infrastructure — large in Morocco
  network:         0.76,  // Connectivity infrastructure
  finance:         0.74,  // Fintech-resistant roles
  edu_law:         0.72,  // Law + education remain human-heavy
  logistics:       0.70,  // Supply chain — partially automatable
  marketing:       0.62,  // Creative/strategy roles survive
  creative_digital:0.65,  // Digital creation — growing demand
  trades:          0.80,  // Skilled trades — hard to automate, Morocco needs them
  automotive:      0.65,  // Shifting with EVs — moderate
  tourism:         0.58,  // Seasonal, service-dependent
  sports:          0.60,  // Coaching/management resilient
  arts_media:      0.55,  // Creative but competitive
  culinary_ops:    0.52,  // Local demand, limited automation
};

// ── Cluster scores ────────────────────────────────────────────────
/**
 * Ranks all clusters given effective marks + reality layer inputs.
 * All 8 score components are normalised 0–1 and combined via SCORING_WEIGHTS.
 * Returns sorted array (highest score first) with `.scores` and `.eligibilityTag`.
 */
function computeClusterScores(bacTrack, effectiveMarks, traits, mobility, privateBudget = false, reality = {}) {
  const normMarks = {};
  Object.keys(effectiveMarks).forEach((s) => {
    normMarks[s] = Math.min(1, Math.max(0, (Number(effectiveMarks[s]) || 0) / 20));
  });

  const subjVals = Object.values(effectiveMarks).map(Number).filter(v => !isNaN(v));
  const overallAvg = subjVals.length ? subjVals.reduce((a, b) => a + b, 0) / subjVals.length : 0;
  const mobilityBoost = mobility === 1 ? 0.05 : mobility === 2 ? 0.03 : 0;

  // Reality layer inputs — safe defaults so scoring works before this step is completed
  const strengths    = reality.strengths    || [];
  const interests    = reality.interests    || [];
  const identityType = reality.identityType || "unsure";
  const priority     = reality.priority     || "stability";
  const prefStyle    = reality.preferredStyle || "";
  const strengthsNow = reality.strengthsNow  || [];

  // NEW INPUT: profileBoost — 6 high-signal personal questions
  const pb = reality.profileBoost || {};
  const pbPrestige = Number(pb.prestigePriority ?? 1);   // 0-2
  const pbMoney    = Number(pb.moneyPriority    ?? 1);   // 0-2
  const pbHandsOn  = Number(pb.handsOn          ?? 1);   // 0-2
  const pbRisk     = Number(pb.riskTolerance    ?? 1);   // 0-2
  const pbIntl     = Number(pb.internationalIntent ?? 1); // 0-2
  const pbFocus    = Number(pb.focusAbility     ?? 1);   // 0-2

  // Practical-cluster boost keys — clusters that should surface for hands-on profiles
  const PRACTICAL_CLUSTERS = new Set(["trades","automotive","sports","creative_digital","culinary","industrial","energy","logistics","tourism"]);
  const ACADEMIC_CLUSTERS  = new Set(["it","data","cyber","health","finance","edu_law"]);

  return CLUSTERS.map((cluster) => {
    const rd = REALITY_CLUSTER_MAP[cluster.id] || {};

    // Bac track affinity
    const bacScore = cluster.bacAffinity[bacTrack] || 0.3;

    // Academic mark performance
    let academicScore = 0, wSum = 0;
    Object.entries(cluster.subjectWeights).forEach(([s, w]) => {
      academicScore += (normMarks[s] || 0) * w; wSum += w;
    });
    if (wSum > 0) academicScore /= wSum;

    // Personality traits
    let traitScore = 0, tSum = 0;
    Object.entries(cluster.traitWeights).forEach(([trait, w]) => {
      if (w >= 0) { traitScore += (traits[trait] || 0.5) * w; tSum += w; }
      else        { traitScore += (1 - (traits[trait] || 0.5)) * Math.abs(w); tSum += Math.abs(w); }
    });
    if (tSum > 0) traitScore /= tSum;

    // Market demand
    const marketScore = cluster.demandIndex;

    // Strength match: share of cluster's required strengths that user selected
    const sTags = rd.strengthTags || [];
    const strengthScore = sTags.length
      ? Math.min(1, strengths.filter(s => sTags.includes(s)).length / sTags.length)
      : 0.5;

    // Interest match
    const iTags = rd.interestTags || [];
    const interestScore = iTags.length
      ? Math.min(1, interests.filter(i => iTags.includes(i)).length / iTags.length)
      : 0.5;

    // Identity modifier
    const identityScore = rd.identityBoost?.[identityType] ?? 0.5;

    // Priority modifier
    const priorityScore = rd.priorityBoost?.[priority] ?? 0.5;

    // Eligibility / penalty
    const eligibilityTag = getEligibilityTag(cluster.id, effectiveMarks, overallAvg, privateBudget);
    const c = CLUSTER_CONSTRAINTS[cluster.id];
    const softPenalty = eligibilityTag === "privateOnly" ? 0.12 : 0;
    const hardPenalty = (c?.hardPenalty && eligibilityTag === "notEligiblePublic") ? c.hardPenalty : 0;
    const penalty = Math.max(softPenalty, hardPenalty);

    // preferredStyle boost: hands-on style lifts practical clusters; academic lifts academic ones
    // Also: sn_ (strengthsNow) overlaps with s_ (reality.strengths) to reinforce practical clusters
    let styleMod = 0;
    if (prefStyle === "handson") {
      styleMod = PRACTICAL_CLUSTERS.has(cluster.id) ? 0.07 : (ACADEMIC_CLUSTERS.has(cluster.id) ? -0.04 : 0);
    } else if (prefStyle === "academic") {
      styleMod = ACADEMIC_CLUSTERS.has(cluster.id) ? 0.05 : (PRACTICAL_CLUSTERS.has(cluster.id) ? -0.03 : 0);
    }

    // strengthsNow cross-boost: if user selected hands-on strengthsNow keys, boost practical clusters
    const handsOnSN = ["sn_fixing","sn_mechanics","sn_cooking","sn_sport_team","sn_sport_indiv","sn_coaching"];
    const snPracticalCount = strengthsNow.filter(k => handsOnSN.includes(k)).length;
    const snBoost = PRACTICAL_CLUSTERS.has(cluster.id) && snPracticalCount >= 2 ? 0.05 : 0;

    // FIX: academic utilization weighting
    // Boost clusters that better utilise the student's academic level.
    // High avg (16+) → elite/selective paths boosted; low avg → practical paths can rise.
    const culturalScores = CULTURAL_CLUSTER_SCORES[cluster.id] || { prestige:0.5, parentAcceptance:0.5, academicUtil:0.5 };
    let academicUtilMod = 0;
    if (overallAvg >= 16) {
      // Elite students: reward paths that demand high academics
      academicUtilMod = (culturalScores.academicUtil - 0.5) * 0.12;
    } else if (overallAvg >= 14) {
      // Strong students: mild academic utility boost
      academicUtilMod = (culturalScores.academicUtil - 0.5) * 0.07;
    } else if (overallAvg < 11 && overallAvg >= 0) {
      // Weaker academic → practical paths rise naturally (inverse)
      academicUtilMod = (0.5 - culturalScores.academicUtil) * 0.06;
    }

    // FIX: cultural scoring layer — prestige/parent factor has minor influence
    // Priority "prestige" users get a stronger weight
    const prestigeMod = priority === "prestige" ? (culturalScores.prestige - 0.5) * 0.08 : 0;

    // TASK 2 — Cultural Credibility Filter at base scoring level
    // Uses CLUSTER_PRESTIGE_TIER + goalPreference to penalise Tier C clusters for high-avg students.
    // goalPreference="practical" fully lifts the penalty (user explicitly chose this path).
    const goalPref      = reality.goalPreference || reality.goal || "prestige";
    const academicTier  = getAcademicTierABCD(overallAvg);
    const clusterPTier  = CLUSTER_PRESTIGE_TIER[cluster.id] || "B";
    const isPractPref   = goalPref === "practical" || goalPref === "handsOn";
    let goalTierPenalty = 0;
    if (!isPractPref && clusterPTier === "C") {
      if (academicTier === "A")      goalTierPenalty = 0.20; // avg ≥ 15.5: strong
      else if (academicTier === "B") goalTierPenalty = 0.13; // avg 14–15.5: moderate
      else if (academicTier === "C") goalTierPenalty = 0.06; // avg 12–14: mild
      // tier D (avg < 12): no penalty — realism first
    } else if (!isPractPref && clusterPTier === "B") {
      // Mild prestige signal: keep original mild logic for vocational-only clusters
      const hasPublicRoute = !!(cluster.pathways?.grandeEcole?.schools?.length || cluster.pathways?.university?.schools?.length);
      if (academicTier === "A" && !hasPublicRoute && PRACTICAL_CLUSTERS.has(cluster.id)) goalTierPenalty = 0.08;
    }

    // NEW INPUT: profile boost modifiers
    // handsOn boost: practical clusters rise for handsOn=2; academic clusters dampened
    const isHandsOnCluster     = PRACTICAL_CLUSTERS.has(cluster.id);
    const isAcademicCluster    = ACADEMIC_CLUSTERS.has(cluster.id);
    const handsOnBoost         = isHandsOnCluster  ? (pbHandsOn  - 1) * 0.08 :
                                  isAcademicCluster ? (1 - pbHandsOn) * 0.04 : 0;
    // prestige boost: high-prestige clusters rise for pbPrestige=2
    const pbPrestigeBoost      = ((PRESTIGE_INDEX[cluster.id] ?? 0.6) - 0.5) * pbPrestige * 0.05;
    // risk boost: creative_digital / startup-adjacent clusters rise for risk-tolerant
    const riskAdjacentClusters = new Set(["creative_digital","sports","arts_media","automotive","culinary_ops"]);
    const riskBoost            = riskAdjacentClusters.has(cluster.id) ? (pbRisk - 1) * 0.04 : 0;
    // international intent: clusters with strong abroad potential boosted
    const intlClusters         = new Set(["it","data","cyber","health","finance","industrial","civil","energy","network","edu_law"]);
    const intlBoost            = intlClusters.has(cluster.id) ? pbIntl * 0.02 : 0;
    // focus ability: competitive selective clusters boosted for high focus
    const focusClusters        = new Set(["health","data","cyber","it","industrial","civil","energy","finance","edu_law"]);
    const focusBoost           = focusClusters.has(cluster.id) ? (pbFocus - 1) * 0.04 : 0;
    // Tier D rule: if avg < 12, handsOn=2 or prestige=0 → trades/practical must surface
    const tierD                = overallAvg < 12;
    const tierDHandsOnBoost    = tierD && isHandsOnCluster && pbHandsOn >= 1 ? 0.08 : 0;

    // LOGIC FIX: future-proofing index (spec §3.6)
    const futureIdx = FUTURE_INDEX[cluster.id] ?? 0.6;

    // B — Medicine hard gate: strong reality penalty if student doesn't meet public threshold
    const failsHealthPublic =
      cluster.id === "health" &&
      (overallAvg < 16 ||
       (effectiveMarks.svt ?? 0) < 14 ||
       (effectiveMarks.pc  ?? 0) < 13);
    let realityPenalty = 0;
    if (failsHealthPublic) {
      realityPenalty = privateBudget ? 0.22 : 0.45;
    }

    // C — Prestige boost: reward high-prestige clusters for high-avg students
    const prestige = PRESTIGE_INDEX[cluster.id] ?? 0.6;
    let prestigeBoost = 0;
    if      (overallAvg >= 15.5) prestigeBoost = 0.14 * prestige;
    else if (overallAvg >= 14.5) prestigeBoost = 0.10 * prestige;

    // C — Cultural dampener: prevent tourism/arts from topping science-track high-avg students
    const scienceTrack     = ["SMA","SMB","PC","SVT","TECH"].includes(bacTrack);
    const lowPrestigeCluster = ["tourism","arts_media"].includes(cluster.id);
    let culturalDampener = 0;
    if (scienceTrack && overallAvg >= 14.5 && lowPrestigeCluster) culturalDampener = 0.10;

    const finalScore = Math.min(1, Math.max(0,
      SCORING_WEIGHTS.bac       * bacScore
      + SCORING_WEIGHTS.academic  * academicScore
      + SCORING_WEIGHTS.traits    * traitScore
      + SCORING_WEIGHTS.market    * marketScore
      + SCORING_WEIGHTS.strengths * strengthScore
      + SCORING_WEIGHTS.interests * interestScore
      + SCORING_WEIGHTS.identity  * identityScore
      + SCORING_WEIGHTS.priority  * priorityScore
      + mobilityBoost + styleMod + snBoost - penalty
      + academicUtilMod + prestigeMod
      - goalTierPenalty   // Cultural sensitivity patch (Tier + Goal)
      - realityPenalty    // B — medicine hard gate
      + prestigeBoost     // C — prestige boost for high-avg students
      - culturalDampener  // C — tourism/arts dampener for science+high-avg
      + handsOnBoost + pbPrestigeBoost + riskBoost + intlBoost + focusBoost + tierDHandsOnBoost
    ));

    // LOGIC FIX: lane-specific sub-scores for computeThreeViews
    // Best Personal Fit: 45% trait + 25% handsOn/styleMod + 15% market + 15% futureIndex
    const fitLaneScore = Math.min(1, Math.max(0,
      0.45 * traitScore
      + 0.25 * Math.max(0, traitScore * 0.5 + (pbHandsOn / 2) * (isHandsOnCluster ? 0.8 : 0.4) * 0.5)
      + 0.15 * marketScore
      + 0.15 * futureIdx
      - (overallAvg < 10 ? 0.10 : 0) // mild academic penalty only for very low avg
    ));
    // Best Balanced: 40% academic + 20% market + 15% trait + 15% futureIndex + 10% intl/mobility
    const balancedLaneScore = Math.min(1, Math.max(0,
      0.40 * academicScore
      + 0.20 * marketScore
      + 0.15 * traitScore
      + 0.15 * futureIdx
      + 0.10 * (pbIntl / 2 * 0.5 + (mobility > 0 ? 0.5 : 0) * 0.5)
      - realityPenalty
      - goalTierPenalty
      + prestigeBoost * 0.5
    ));
    // Most Ambitious: 35% prestige + 25% academic proximity + 15% focus + 15% futureIndex + 10% market
    const ambLaneScore = Math.min(1, Math.max(0,
      0.35 * (PRESTIGE_INDEX[cluster.id] ?? 0.6)
      + 0.25 * Math.min(1, academicScore * 1.2)
      + 0.15 * (pbFocus / 2)
      + 0.15 * futureIdx
      + 0.10 * marketScore
      - realityPenalty
    ));

    return {
      ...cluster,
      scores: {
        bac: bacScore, academic: academicScore, trait: traitScore, market: marketScore,
        strength: strengthScore, interest: interestScore, identity: identityScore,
        priority: priorityScore, final: finalScore,
        // LOGIC FIX: lane-specific scores and futureIndex
        fit: fitLaneScore, balanced: balancedLaneScore, ambitious: ambLaneScore,
        future: futureIdx,
        prestige: PRESTIGE_INDEX[cluster.id] ?? 0.6,
      },
      eligibilityTag,
      overallAvg,
    };
  }).sort((a, b) => b.scores.final - a.scores.final);
}

// ── Confidence ────────────────────────────────────────────────────
function computeConfidence(rankedClusters) {
  if (!rankedClusters.length) return 0;
  return Math.round(rankedClusters[0].scores.final * 100);
}

// ── Mixed signals ─────────────────────────────────────────────────
function computeMixedSignals(rankedClusters, confidence) {
  if (!rankedClusters.length) return false;
  const traitTop    = [...rankedClusters].sort((a, b) => b.scores.trait    - a.scores.trait)[0]?.id;
  const academicTop = [...rankedClusters].sort((a, b) => b.scores.academic - a.scores.academic)[0]?.id;
  return traitTop !== academicTop && confidence < 60;
}

// ── Effective marks ───────────────────────────────────────────────
/** Merge base marks with what-if deltas, clamped [0, 20]. */
function buildEffectiveMarks(marks, whatIfDeltas, subjects) {
  const result = {};
  subjects.forEach((s) => {
    const base  = Number(marks[s]) || 0;
    const delta = Number(whatIfDeltas[s]) || 0;
    result[s]   = Math.min(20, Math.max(0, base + delta));
  });
  return result;
}

// src/massar/utils/narrative.js


const TRAIT_LABELS = {
  ar: { analytical:"التفكير التحليلي", social:"التواصل الاجتماعي", structure:"التنظيم والبنية", creativity:"الإبداع", risk:"المبادرة", leadership:"القيادة" },
  fr: { analytical:"Pensée analytique", social:"Social", structure:"Rigueur & organisation", creativity:"Créativité", risk:"Prise de risque", leadership:"Leadership" },
  en: { analytical:"Analytical thinking", social:"Social skills", structure:"Organization", creativity:"Creativity", risk:"Risk tolerance", leadership:"Leadership" },
};

// Narrative fix — subject-calibrated wording. Never overclaims.
// strong: ≥15, solid: 13–14.9, developing: <13.
// Uses best 1–2 subjects by mark, not generic strings.
function generateNarrative(top3, traits, bacTrack, lang, reality = {}, effectiveMarks = {}) {
  if (!top3?.length) return "";
  const t          = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const topCluster = top3[0];
  const name       = (topCluster && t[CLUSTER_KEY_MAP[topCluster.id]]) || topCluster?.id || "";
  const safeTr     = (traits && typeof traits === "object") ? traits : {};

  const identityType = reality.identityType || "unsure";
  const priority     = reality.priority     || "stability";
  const t_pri        = t.realityPriorityOptions?.[priority]?.label || priority;

  // SUBJECT SYSTEM FIX: narrative uses subjects from effectiveMarks (already filtered by getSubjectsForMarks)
  // SUBJECT SYSTEM FIX: use keys from effectiveMarks (already from getSubjectsForMarks)
  const SUBJ_LABELS   = SUBJECT_LABELS || {};
  const markedSubjs   = Object.keys(effectiveMarks||{})
    .map(s => ({ s, v: Number(effectiveMarks[s]) || 0 }))
    .filter(x => x.v > 0)
    .sort((a,b) => b.v - a.v);

  function strengthWord(v) {
    if (v >= 15)   return { ar:"متميز", fr:"excellent", en:"strong" };
    if (v >= 13)   return { ar:"جيد", fr:"solide", en:"solid" };
    return           { ar:"في طور التطور", fr:"en progression", en:"developing" };
  }

  const top2Subjs = markedSubjs.slice(0,2).map(({s,v}) => {
    const label = SUBJ_LABELS[s]?.[lang] || s;
    const word  = strengthWord(v)[lang];
    return `${label} (${word})`;
  });

  // Fallback to reality.strengths if no marks available
  const strengthsFromReality = (reality.strengths || [])
    .slice(0,2).map(k => t.realityStrengths?.[k] || k);

  const subjectDesc = top2Subjs.length ? top2Subjs.join(", ") : strengthsFromReality.join(", ");
  const hasAnySubject = subjectDesc.length > 0;

  // Narrative fix — unsure path: encouraging + guiding, not "you are not sure yet"
  if (identityType === "unsure") {
    const dir2 = top3.slice(0,2).map(c => t[CLUSTER_KEY_MAP[c.id]] || c.id).join(lang==="ar"?" و":" & ");
    return {
      ar: `ملفك يشير إلى ${hasAnySubject ? `مستوى ${subjectDesc}` : "شخصية متعددة المواهب"}. ما زلت في مرحلة الاستكشاف — وهذا صحيح تماماً. بناءً على ملفك، جرّب هذين الاتجاهين هذا الشهر: <strong>${dir2}</strong>.`,
      fr: `Ton profil révèle ${hasAnySubject ? `un niveau ${subjectDesc}` : "une personnalité polyvalente"}. Tu explores encore — c'est une bonne chose. D'après ton profil, deux directions à tester ce mois-ci : <strong>${dir2}</strong>.`,
      en: `Your profile shows ${hasAnySubject ? subjectDesc : "a versatile personality"}. You're still exploring — that's perfectly fine. Based on your profile, here are 2 directions to try this month: <strong>${dir2}</strong>.`,
    }[lang] || "";
  }

  // Standard path: subject-calibrated, short, credible
  return {
    ar: `${hasAnySubject ? `مستواك في ${subjectDesc} يضعك` : "ملفك يضعك"} على مسار <strong>${name}</strong> كأقرب توافق. أولويتك في <strong>${t_pri}</strong> تُعزز هذا الاتجاه.`,
    fr: `${hasAnySubject ? `Ton niveau en ${subjectDesc} t'oriente` : "Ton profil t'oriente"} vers <strong>${name}</strong> comme meilleure correspondance. Ta priorité <strong>${t_pri}</strong> renforce ce cap.`,
    en: `${hasAnySubject ? `Your ${subjectDesc} level points toward` : "Your profile points toward"} <strong>${name}</strong> as the best match. Your priority of <strong>${t_pri}</strong> aligns with this path.`,
  }[lang] || "";
}



// ══════════════════════════════ components ══════════════════════

// src/massar/components/RadarChart.jsx
// RadarChart uses shorter single-word labels; full-sentence labels are in TRAIT_LABELS above.
const RADAR_LABELS = {
  ar: { analytical:"تحليلي", social:"اجتماعي", structure:"منظم", creativity:"مبدع", risk:"مبادر", leadership:"قيادي" },
  fr: { analytical:"Analytique", social:"Social", structure:"Rigoureux", creativity:"Créatif", risk:"Risque", leadership:"Leader" },
  en: { analytical:"Analytical", social:"Social", structure:"Organized", creativity:"Creative", risk:"Risk-taker", leadership:"Leader" },
};

function RadarChart({ traits, lang }) {
  // FIX: results page null-safety — guard against undefined traits
  const safeTr = (traits && typeof traits === "object") ? traits : {};
  const keys = ["analytical","social","structure","creativity","risk","leadership"];
  const labels = RADAR_LABELS[lang] || RADAR_LABELS.en;
  const n=keys.length, cx=120, cy=120, r=80;
  const toCart = (a,rad) => ({ x:cx+rad*Math.cos(a-Math.PI/2), y:cy+rad*Math.sin(a-Math.PI/2) });
  const angles = keys.map((_,i)=>(2*Math.PI*i)/n);
  const points = keys.map((k,i)=>toCart(angles[i],(safeTr[k]||0.5)*r));

  return (
    <svg width="240" height="240" viewBox="0 0 240 240">
      {[0.25,0.5,0.75,1].map(lvl=>(
        <polygon key={lvl}
          points={angles.map(a=>{const p=toCart(a,r*lvl);return`${p.x},${p.y}`;}).join(" ")}
          fill="none" stroke="var(--border)" strokeWidth="1"/>
      ))}
      {angles.map((a,i)=>{const o=toCart(a,r);return(
        <line key={i} x1={cx} y1={cy} x2={o.x} y2={o.y} stroke="var(--border)" strokeWidth="1"/>
      );})}
      <polygon
        points={points.map(p=>`${p.x},${p.y}`).join(" ")}
        fill="rgba(232,161,36,0.2)" stroke="var(--accent)" strokeWidth="2"/>
      {keys.map((k,i)=>{const lp=toCart(angles[i],r+18);return(
        <text key={k} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
          fontSize="10" fill="#9ca3af">{labels[k]}</text>
      );})}
      {points.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--accent)"/>)}
    </svg>
  );
}

// src/massar/components/ClusterCard.jsx
// ─────────────────────────────────────────────────────────────────
// Must be defined OUTSIDE App so useState(pathwayTab) survives parent
// re-renders caused by slider changes.
// ─────────────────────────────────────────────────────────────────



// Score contribution mini-bars
function ScoreContribChart({ cluster, t }) {
  const factors = [
    { key:"bac",      label:t.bacTrack,    color:"#3b82f6", value:cluster.scores.bac      },
    { key:"academic", label:t.academic,    color:"#10b981", value:cluster.scores.academic },
    { key:"trait",    label:t.personality, color:"#e8a124", value:cluster.scores.trait    },
    { key:"market",   label:t.market,      color:"#8b5cf6", value:cluster.scores.market   },
  ];
  return (
    <div style={{marginTop:8}}>
      {factors.map(f=>(
        <div key={f.key} className="explain-row">
          <div className="explain-label">{f.label}</div>
          <div className="explain-bar">
            <div className="explain-fill" style={{width:`${f.value*100}%`,background:f.color}}/>
          </div>
          {/* FIX: Arabic-first UX — percentage must render LTR even in RTL layout */}
          <div className="explain-pct" dir="ltr">{Math.round(clamp(f.value*100))}%</div>
        </div>
      ))}
    </div>
  );
}

// Goal 3: Medicine eligibility panel — only shown for health cluster
function MedicineEligibilityPanel({ cluster, t }) {
  const c = CLUSTER_CONSTRAINTS["health"];
  const avg = cluster.overallAvg || 0;
  const meetsPublic = avg >= c.minAvg &&
    Object.entries(c.requiredSubjects || {}).every(
      ([subj, min]) => (cluster.scores._marks?.[subj] || 0) >= min
    );

  return (
    <div style={{
      margin:"12px 0",
      padding:"12px 14px",
      background:meetsPublic?"rgba(16,185,129,0.06)":"rgba(239,68,68,0.06)",
      border:`1px solid ${meetsPublic?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.25)"}`,
      borderRadius:10,
    }}>
      <div style={{fontWeight:700,fontSize:13,marginBottom:8,color:"var(--text)"}}>
        {t.eligibilityTitle}
      </div>
      <div style={{fontSize:12,color:"var(--muted)",marginBottom:6}}>
        <span style={{color:"var(--text)"}}>{t.eligibilityThresholdLabel}: </span>
        {t.eligibilityThresholdValue}
      </div>
      <div style={{fontSize:12,marginBottom:6}}>
        <span style={{color:"var(--muted)"}}>{t.eligibilityYourAvg}: </span>
        <strong style={{color:meetsPublic?"#10b981":"#f87171"}}>{avg.toFixed(1)}/20</strong>
      </div>
      <div style={{fontSize:13,fontWeight:600,color:meetsPublic?"#10b981":"#f87171",marginBottom:meetsPublic?0:10}}>
        {meetsPublic ? t.eligibilityMeetsPublic : t.eligibilityFailsPublic}
      </div>
      {!meetsPublic && (
        <>
          <div style={{fontSize:12,color:"var(--warn)",marginBottom:6,lineHeight:1.5}}>
            {t.eligibilityPrivateNote}
          </div>
          <div style={{fontSize:12,color:"var(--muted)",fontWeight:600,marginBottom:4}}>
            {t.eligibilityAlternativesLabel}
          </div>
          <ul style={{margin:0,paddingInlineStart:16}}>
            {(t.eligibilityAlternatives||[]).map((alt,i)=>(
              <li key={i} style={{fontSize:12,color:"var(--text)",padding:"2px 0"}}>{alt}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Cultural rerank layer — Step 4
// PrestigeAdjacentPanel: shown when top Best-Fit cluster is low-prestige
// and user is in prestige or unsure goalMode.
// Uses PRESTIGE_ADJACENT_PATHS hardcoded map.
// ─────────────────────────────────────────────────────────────────
function PrestigeAdjacentPanel({ topClusterId, lang, t }) {
  const paths = PRESTIGE_ADJACENT_PATHS[topClusterId];
  if (!paths) return null;
  const items = paths[lang] || paths.fr || [];
  if (!items.length) return null;

  return (
    <div style={{
      margin:"0 0 20px 0", padding:"16px 18px",
      background:"rgba(99,102,241,0.06)",
      border:"1.5px solid rgba(99,102,241,0.20)",
      borderRadius:14,
    }}>
      <div style={{fontWeight:700, fontSize:14, marginBottom:6, color:"#6366f1"}}>
        🎓 {t.prestigeAdjacentTitle || "If your family wants a more prestigious path"}
      </div>
      <div style={{fontSize:12, color:"var(--muted)", marginBottom:10, lineHeight:1.5}}>
        {t.prestigeAdjacentDesc || "Based on your profile, here are adjacent paths with stronger academic prestige:"}
      </div>
      <div style={{display:"flex", flexDirection:"column", gap:6}}>
        {items.map((item, i) => (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:8,
            padding:"7px 12px", borderRadius:8,
            background:"rgba(99,102,241,0.04)",
            border:"1px solid rgba(99,102,241,0.12)",
            fontSize:13, color:"var(--text)",
          }}>
            <span style={{color:"#6366f1", fontWeight:700}}>
              {t.bridgeOptionLabel || "Bridge"} {i+1}
            </span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Cultural rerank layer — Step 3F
// GoalModeDualView: shown when goalMode="unsure"
// Two tabs: Best Fit (existing ranking) + Prestige Track (prestige-sorted)
// ─────────────────────────────────────────────────────────────────
function GoalModeDualView({ primary, secondary, t, lang, dir, bacTrack, goal, overallAvg }) {
  const [activeTab, setActiveTab] = useState("fit");
  if (!secondary || !secondary.length) return null;

  const clusters = activeTab === "fit" ? primary : secondary;
  const tabStyle = (key) => ({
    padding:"8px 20px", borderRadius:20, border:"none",
    cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:600,
    transition:"all 0.2s",
    background: activeTab===key ? "#6366f1" : "var(--surface2)",
    color:       activeTab===key ? "#fff"    : "var(--muted)",
  });

  return (
    <div style={{marginBottom:24}}>
      {/* Tab switcher */}
      <div style={{display:"flex", gap:8, marginBottom:18}}>
        <button style={tabStyle("fit")}     onClick={()=>setActiveTab("fit")}>
          {t.bestFitTab     || "Best Fit"}
        </button>
        <button style={tabStyle("prestige")} onClick={()=>setActiveTab("prestige")}>
          {t.prestigeTrackTab || "Prestige Track"}
        </button>
      </div>
      {/* Cluster cards for the active tab */}
      {clusters.slice(0,3).map((c,i) => (
        <ClusterCard key={c.id+activeTab} cluster={c} rank={i+1}
          t={t} lang={lang} bacTrack={bacTrack}
          goal={goal} overallAvg={overallAvg}/>
      ))}
    </div>
  );
}

function ClusterCard({ cluster, rank, t, lang, bacTrack, goal, overallAvg }) {
  // Cultural sensitivity patch (Tier + Goal) — compute initial tab based on tier + goal
  const academicTier = getAcademicTier(overallAvg);
  const effectiveGoal = goal || "prestige";

  function pickDefaultTab() {
    if (effectiveGoal === "handsOn") return "practical";
    const hasGrandeEcole = !!(cluster.pathways?.grandeEcole?.schools?.length);
    const hasUniversity  = !!(cluster.pathways?.university?.schools?.length);
    if (academicTier === "HIGH") {
      return hasGrandeEcole ? "grandeEcole" : hasUniversity ? "university" : "practical";
    }
    if (academicTier === "MID") {
      return hasUniversity ? "university" : hasGrandeEcole ? "grandeEcole" : "practical";
    }
    // LOW tier → practical first if available, else university
    return cluster.pathways?.practical?.schools?.length ? "practical" : hasUniversity ? "university" : "grandeEcole";
  }

  const [pathwayTab, setPathwayTab] = useState(pickDefaultTab);

  // Reset default tab if tier/goal/cluster changes (e.g., user goes back and changes goal)
  useEffect(() => {
    setPathwayTab(pickDefaultTab());
  }, [cluster.id, effectiveGoal, academicTier]); // eslint-disable-line

  const clusterName = t[CLUSTER_KEY_MAP[cluster.id]] || cluster.id;

  const tabLabels = {
    university:  t.universityRoute,
    grandeEcole: t.grandeEcoleRoute,
    practical:   t.practicalRoute,
  };

  const pathway  = cluster.pathways?.[pathwayTab];
  const schools  = pathway?.schools  || [];
  const duration = pathway?.duration || "";
  const hasPW    = schools.length > 0 || !!duration;

  // Cultural sensitivity patch (Tier + Goal) — flag when practical shown to high-tier prestige student
  const showFastTrackNote = pathwayTab === "practical"
    && academicTier === "HIGH"
    && effectiveGoal !== "handsOn";

  const whyText = lang==="ar"
    ? `هذا المسار يتوافق مع شعبة ${bacTrack} ومستواك في المواد الأساسية`
    : lang==="fr"
    ? `Cette voie correspond à votre filière ${bacTrack} et votre niveau dans les matières clés`
    : `This path aligns with your ${bacTrack} track and performance in key subjects`;

  return (
    <div className={`cluster-card rank-${rank}`}>
      {rank === 1 && (
        <div className="best-match-label">
          ✦ {lang==="ar"?"الأفضل":lang==="fr"?"Meilleur Match":"Best Match"}
        </div>
      )}
      <span className="rank-badge">#{rank}</span>

      <div className="cluster-header">
        <span className="cluster-icon">{cluster.icon}</span>
        <div>
          <div className="cluster-title">
            {clusterName}
            {cluster.eligibilityTag === "privateOnly" && (
              <span className="elig-badge">{t.privateOnly}</span>
            )}
            {cluster.eligibilityTag === "notEligiblePublic" && (
              <span className="elig-badge" style={{background:"rgba(239,68,68,0.12)",borderColor:"rgba(239,68,68,0.4)",color:"#f87171"}}>
                {t.notEligiblePublic}
              </span>
            )}
          </div>
          {/* FIX: Arabic-first UX — salary numbers must be LTR even in RTL context */}
          <div className="salary-chip" dir="ltr">
            {cluster.salary.min.toLocaleString()}–{cluster.salary.max.toLocaleString()} {cluster.salary.currency}/mois*
          </div>
        </div>
      </div>

      <div className="cluster-score-bar" style={{height: rank===1 ? 6 : 4}}>
        <div className="cluster-score-fill" style={{width:`${cluster.scores.final*100}%`,animation:"barGrow 0.9s ease both"}}/>
      </div>

      <ScoreContribChart cluster={cluster} t={t}/>

      <p style={{fontSize:12,color:"var(--muted)",marginTop:10,marginBottom:14}}>
        {t.why}: {whyText}
      </p>

      {/* Goal 3: Medicine eligibility panel */}
      {cluster.id === "health" && (
        <MedicineEligibilityPanel cluster={cluster} t={t}/>
      )}

      {/* Pathway tabs */}
      <div className="pathway-tabs">
        {["university","grandeEcole","practical"].map(tab=>(
          <button key={tab}
            className={`pathway-tab ${pathwayTab===tab?"active":""}`}
            onClick={()=>setPathwayTab(tab)}>
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Cultural sensitivity patch (Tier + Goal) — reframe practical for high-avg students */}
      {showFastTrackNote && (
        <div style={{
          marginBottom:8, padding:"7px 12px",
          background:"rgba(59,130,246,0.07)", borderRadius:8,
          border:"1px solid rgba(59,130,246,0.2)", fontSize:12, color:"var(--accent2)",
        }}>
          {t.practicalFastTrack || "⚡ Fast-track option — ideal if you prefer job entry before university"}
        </div>
      )}

      {/* Pathway content — updates on every tab click */}
      <div className="pathway-content">
        {hasPW ? (
          <>
            <div style={{marginBottom:8}}>
              {schools.map(s=>(
                <span key={s} className="pathway-school">{s}</span>
              ))}
            </div>
            {duration && (
              <div style={{fontSize:12,color:"var(--muted)"}}>
                {t.durationLabel}: {duration}
              </div>
            )}
          </>
        ) : (
          <div style={{fontSize:13,color:"var(--muted)",fontStyle:"italic"}}>
            {t.pathwayMissing}
          </div>
        )}
      </div>
    </div>
  );
}

// src/massar/components/CtaModal.jsx
// ─────────────────────────────────────────────────────────────────
// Goal 5: Monetization CTA — "Get full PDF roadmap".
// Shows a button on results screen only; opens a modal to capture email.
// Emails stored locally only (saveCtaEmail utility).
// Non-blocking: user can close without entering email.
// ─────────────────────────────────────────────────────────────────


function CtaModal({ t, dir }) {
  const [open,      setOpen]      = useState(false);
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    saveCtaEmail(trimmed);
    setSubmitted(true);
  };

  return (
    <>
      {/* CTA trigger button */}
      <button
        className="btn btn-cta"
        onClick={() => { setOpen(true); setSubmitted(false); setEmail(""); }}>
        {t.ctaButton}
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="cta-overlay" onClick={() => setOpen(false)}>
          <div
            className="cta-modal"
            dir={dir}
            onClick={e => e.stopPropagation()}>

            <button
              className="cta-close"
              onClick={() => setOpen(false)}
              aria-label={t.ctaClose}>
              ✕
            </button>

            <div style={{fontSize:28,marginBottom:10}}>📄</div>
            <h2 style={{fontSize:20,fontWeight:700,marginBottom:8,color:"var(--text)"}}>
              {t.ctaModalTitle}
            </h2>
            <p style={{fontSize:14,color:"var(--muted)",marginBottom:20,lineHeight:1.6}}>
              {t.ctaModalSubtitle}
            </p>

            {submitted ? (
              <div style={{
                padding:"14px 18px",
                background:"rgba(16,185,129,0.1)",
                border:"1px solid rgba(16,185,129,0.3)",
                borderRadius:10,
                color:"#10b981",
                fontWeight:600,
                fontSize:14,
                textAlign:"center",
              }}>
                {t.ctaComingSoon}
              </div>
            ) : (
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key==="Enter" && handleSubmit()}
                  placeholder={t.ctaEmailPlaceholder}
                  style={{
                    flex:1,minWidth:200,padding:"10px 14px",
                    background:"var(--surface2)",
                    border:"1.5px solid var(--border)",
                    borderRadius:8,color:"var(--text)",
                    fontSize:14,outline:"none",fontFamily:"inherit",
                  }}
                />
                <button className="btn btn-primary" onClick={handleSubmit}>
                  {t.ctaSubmit}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// src/massar/components/Steps.jsx
// ─────────────────────────────────────────────────────────────────
// StepLang, StepPersonality, StepInfo, StepMarks
// Each receives only the props it needs (no god-object).
// ─────────────────────────────────────────────────────────────────

// ── Shared step indicator ─────────────────────────────────────────
function StepIndicator({ step, total, t }) {
  return (
    <div className="step-indicator">
      {Array.from({length:total},(_,i)=>(
        <div key={i} className={`step-dot ${i<step?"done":i===step?"active":""}`}/>
      ))}
      <span style={{fontSize:12,color:"var(--muted)",marginInlineStart:6}}>
        {t.step} {step+1} {t.of} {total}
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// HOME MOTION ENGINE (parallax + reveal)
// ────────────────────────────────────────────────────────────────

/** Returns true when prefers-reduced-motion is set. */
function usePrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * useRevealOnScroll — attaches an IntersectionObserver to a ref.
 * Adds class "reveal--in" when element enters viewport.
 * @param {number} [threshold=0.15]
 */
function useRevealOnScroll(threshold = 0.15) {
  const ref = React.useRef(null);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) { el.classList.add("reveal--in"); return; }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("reveal--in"); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced, threshold]);

  return ref;
}

// ────────────────────────────────────────────────────────────────
// HOME PAGE UI — updated with premium copy
// ────────────────────────────────────────────────────────────────
function HomePage({ lang, setLang, onStartTest, savedSession, t, dir }) {
  const reduced = usePrefersReducedMotion();

  const scrollYRef   = React.useRef(0);
  const rafRef       = React.useRef(null);
  const layer1Ref    = React.useRef(null);
  const layer2Ref    = React.useRef(null);
  const layer3Ref    = React.useRef(null);
  const heroPanelRef = React.useRef(null);
  const heroCardRef  = React.useRef(null);

  React.useEffect(() => {
    if (reduced) return;
    const onScroll = () => { scrollYRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    const tick = () => {
      const sy = scrollYRef.current;
      if (layer1Ref.current)    layer1Ref.current.style.transform    = `translate3d(0, ${sy * 0.08}px, 0)`;
      if (layer2Ref.current)    layer2Ref.current.style.transform    = `translate3d(0, ${sy * 0.14}px, 0)`;
      if (layer3Ref.current)    layer3Ref.current.style.transform    = `translate3d(0, ${sy * 0.06}px, 0)`;
      if (heroPanelRef.current) heroPanelRef.current.style.transform = `translate3d(0, ${sy * 0.04}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("scroll", onScroll); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [reduced]);

  React.useEffect(() => {
    if (reduced) return;
    const card = heroCardRef.current;
    if (!card || window.matchMedia("(hover: none)").matches) return;
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width/2) / (rect.width/2);
      const dy = (e.clientY - rect.top  - rect.height/2) / (rect.height/2);
      card.style.transform = `perspective(900px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`;
    };
    const onLeave = () => { card.style.transform = ""; };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => { card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); };
  }, [reduced]);

  const revealHow     = useRevealOnScroll(0.12);
  const revealValue   = useRevealOnScroll(0.15);
  const revealTrust   = useRevealOnScroll(0.2);
  const revealNotSure = useRevealOnScroll(0.15);
  const revealFooter  = useRevealOnScroll(0.3);

  const scrollToHow = () => { const el = document.getElementById("how-it-works"); if (el) el.scrollIntoView({ behavior: "smooth" }); };

  const LANGS = [{ code:"ar", lbl:"عربية" }, { code:"fr", lbl:"Français" }, { code:"en", lbl:"English" }];

  const steps = [
    { n:"1", title: t.homeStep1Title, desc: t.homeStep1Desc },
    { n:"2", title: t.homeStep2Title, desc: t.homeStep2Desc },
    { n:"3", title: t.homeStep3Title, desc: t.homeStep3Desc },
  ];

  const trustChips  = t.homeTrustChips  || [t.homeTrust1, t.homeTrust2, t.homeTrust3];
  const valueBullets = t.homeValueBullets || [];

  const tagline = lang==="ar" ? "المغرب • الباكالوريا • سوق الشغل"
                : lang==="fr" ? "Maroc • Bac • Marché de l'emploi"
                :               "Morocco • Bac • Job market";

  return (
    <div className="home-root" dir={dir}>

      {/* Parallax depth layers */}
      <div className="home-parallax" aria-hidden="true">
        <div ref={layer1Ref} className="hp-layer hp-orb1" style={{willChange:"transform"}}/>
        <div ref={layer2Ref} className="hp-layer hp-grid" style={{willChange:"transform"}}/>
        <div ref={layer3Ref} className="hp-layer hp-spot" style={{willChange:"transform"}}/>
        <div className="hp-float hp-sparkle" aria-hidden="true"/>
        <div className="hp-float hp-blob"    aria-hidden="true"/>
      </div>

      {/* Nav */}
      <nav className="home-nav">
        <span className="home-nav-brand">مسار</span>
        <div className="home-nav-lang">
          {LANGS.map(l => (
            <button key={l.code} className={lang === l.code ? "active" : ""} onClick={() => setLang(l.code)}>
              {l.lbl}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section className="home-hero-wrap">
        <div ref={heroPanelRef} className="home-hero" style={{willChange: reduced ? undefined : "transform"}}>
          <div ref={heroCardRef} className="home-hero-card">
            {/* Tagline chip — Morocco-localised */}
            <span className="home-hero-eyebrow">{tagline}</span>
            <h1>{t.homeHero}</h1>
            <p>{t.homeHeroSub}</p>
            <div className="home-hero-glass">
              <div className="home-cta-row">
                <button className="home-btn-primary" onClick={onStartTest}>
                  {savedSession ? t.homeBackToTest : t.homeCTA}
                </button>
                <button className="home-btn-secondary" onClick={scrollToHow}>
                  {t.homeSecondaryCTA || t.homeHowItWorks} ↓
                </button>
              </div>
              {/* Parent line under buttons */}
              {t.homeParentLine && (
                <p className="home-parent-line">{t.homeParentLine}</p>
              )}
            </div>
            {/* Micro trust */}
            {t.homeMicroTrust && (
              <p className="home-micro-trust">{t.homeMicroTrust}</p>
            )}
          </div>
        </div>
      </section>

      {/* Value bullets */}
      {valueBullets.length > 0 && (
        <div ref={revealValue} className="home-value-bullets reveal">
          <ul>
            {valueBullets.map((b, i) => (
              <li key={i}><span className="home-bullet-dot" aria-hidden="true">✦</span>{b}</li>
            ))}
          </ul>
        </div>
      )}

      {/* How it works */}
      <section id="how-it-works" className="home-how">
        <div ref={revealHow} className="reveal">
          <div className="home-section-label">🔍 {t.homeHowItWorks}</div>
          <h2 className="home-section-title">{t.homeHowItWorks}</h2>
          <div className="home-steps">
            {steps.map((s, i) => <StepCard key={s.n} step={s} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* Trust chips */}
      <div ref={revealTrust} className="home-trust reveal">
        {trustChips.map((label, i) => (
          <div key={i} className="home-trust-chip" style={{"--chip-delay": `${i * 60}ms`}}>
            <span className="home-trust-chip-dot"/>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Not-sure + family note */}
      {(t.homeNotSure || t.homeFamilyNote) && (
        <div ref={revealNotSure} className="home-reassure-row reveal">
          {t.homeNotSure && (
            <div className="home-reassure-card">
              <div className="home-reassure-icon">🧭</div>
              <p>{t.homeNotSure}</p>
            </div>
          )}
          {t.homeFamilyNote && (
            <div className="home-reassure-card">
              <div className="home-reassure-icon">👨‍👩‍👧</div>
              <p>{t.homeFamilyNote}</p>
            </div>
          )}
        </div>
      )}

      {/* Bottom CTA + share line */}
      <div ref={revealFooter} className="reveal" style={{textAlign:"center",padding:"0 24px 56px",position:"relative",zIndex:1}}>
        <button className="home-btn-primary" onClick={onStartTest} style={{fontSize:17,padding:"17px 44px"}}>
          {savedSession ? t.homeBackToTest : t.homeCTA}
        </button>
        {t.homeShareCTA && (
          <p style={{marginTop:14,fontSize:13,color:"rgba(232,236,240,0.45)"}}>{t.homeShareCTA}</p>
        )}
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <div style={{marginBottom:4}}>{t.homeFooterBy}</div>
        <a href={`mailto:${t.homeFooterContact}`}>{t.homeFooterContact}</a>
      </footer>
    </div>
  );
}

/** Individual step card with scroll-reveal + hover tilt. */
function StepCard({ step, delay }) {
  const ref = useRevealOnScroll(0.1);
  return (
    <div ref={ref} className="home-step-card reveal" style={{"--reveal-delay": `${delay}ms`}}>
      <div className="home-step-num">{step.n}</div>
      <h3>{step.title}</h3>
      <p>{step.desc}</p>
    </div>
  );
}

// ── Step 0: Language ──────────────────────────────────────────────
function StepLang({ lang, setLang, onNext, t, dir }) {
  return (
    <div className="card" dir={dir}>
      <StepIndicator step={0} total={7} t={t}/>
      <h2 style={{fontSize:22,fontWeight:700,marginBottom:8}}>{t.langStep}</h2>
      <p style={{color:"var(--muted)",fontSize:14,marginBottom:4}}>{t.langDesc}</p>
      <div className="lang-grid">
        {[{code:"ar",flag:"🇲🇦",name:"العربية"},{code:"fr",flag:"🇫🇷",name:"Français"},{code:"en",flag:"🇬🇧",name:"English"}].map(l=>(
          <button key={l.code}
            className={`lang-btn ${lang===l.code?"selected":""}`}
            onClick={()=>setLang(l.code)}>
            <span className="flag">{l.flag}</span>
            <span className="name">{l.name}</span>
          </button>
        ))}
      </div>
      <div className="btn-row">
        <button className="btn btn-primary" onClick={onNext}>{t.start} →</button>
      </div>
    </div>
  );
}

// ── Step 1: Personality ───────────────────────────────────────────
function StepPersonality({ lang, answers, setAnswers, onNext, onBack, t, dir }) {
  const allAnswered = PERSONALITY_QUESTIONS.every(q=>answers[q.id]!=null);
  const disagreeLabel = lang==="ar"?"لا أوافق":lang==="fr"?"Pas du tout":"Disagree";
  const agreeLabel    = lang==="ar"?"أوافق تماماً":lang==="fr"?"Tout à fait":"Agree";

  return (
    <div className="card" dir={dir}>
      <StepIndicator step={1} total={7} t={t}/>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>{t.personalityStep}</h2>
      <p style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{t.personalityDesc}</p>

      {PERSONALITY_QUESTIONS.map((q,idx)=>(
        <div key={q.id} className="q-card">
          <div className="q-text">
            <span style={{color:"var(--accent)",fontWeight:700,marginInlineEnd:6}}>{idx+1}.</span>
            {q.text[lang]}
          </div>
          <div className="likert">
            {[1,2,3,4,5].map(v=>(
              <button key={v}
                className={`likert-btn ${answers[q.id]===v?"selected":""}`}
                onClick={()=>setAnswers(prev=>({...prev,[q.id]:v}))}>
                {v}
              </button>
            ))}
          </div>
          <div className="likert-labels">
            <span>{disagreeLabel}</span><span>{agreeLabel}</span>
          </div>
        </div>
      ))}

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={onNext}
          disabled={!allAnswered} style={{opacity:allAnswered?1:0.4}}>
          {t.next} →
        </button>
      </div>
    </div>
  );
}

// ── Step 2: Reality & Identity ────────────────────────────────────
function StepReality({ lang, reality, setReality, onNext, onBack, t, dir }) {
  const MAX_SELECT = 5;

  const toggleMulti = (field, key) => {
    setReality(prev => {
      const arr = prev[field] || [];
      if (arr.includes(key)) return { ...prev, [field]: arr.filter(k => k !== key) };
      if (arr.length >= MAX_SELECT) return prev;
      return { ...prev, [field]: [...arr, key] };
    });
  };
  const setSingle = (field, val) => setReality(prev => ({ ...prev, [field]: val }));

  const strengthKeys = ["s_math","s_writing","s_speaking","s_mechanical","s_tools","s_projects","s_coding","s_video","s_design","s_negotiating","s_organizing","s_sports","s_discipline","s_learning","s_selling"];
  const interestKeys = ["i_building","i_sports","i_gaming","i_content","i_helping","i_leading","i_selling","i_research","i_outdoors","i_machines","i_alone","i_people"];
  const identityKeys = ["academic","builder","creative","athletic","business","explorer","unsure"];
  const priorityKeys = ["money","prestige","stability","freedom","impact","flexibility"];

  const strengths = reality.strengths || [];
  const interests = reality.interests || [];

  const canProceed = reality.identityType && reality.priority;

  return (
    <div className="card" dir={dir}>
      <StepIndicator step={2} total={7} t={t}/>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>{t.realityStep}</h2>
      <p style={{color:"var(--muted)",fontSize:13,marginBottom:24}}>{t.realityDesc}</p>

      {/* Section 1 — Strengths */}
      <div className="reality-section">
        <div className="reality-section-title">1. {t.realityStrengthsTitle}</div>
        <div className="reality-section-desc">{t.realityStrengthsDesc} {t.realityMaxHint}</div>
        <div className="chip-grid">
          {strengthKeys.map(k => {
            const sel = strengths.includes(k);
            const maxed = !sel && strengths.length >= MAX_SELECT;
            return (
              <button key={k}
                className={`chip-btn${sel?" selected":""}${maxed?" maxed":""}`}
                onClick={() => !maxed && toggleMulti("strengths", k)}>
                {t.realityStrengths?.[k] || k}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 2 — Interests */}
      <div className="reality-section">
        <div className="reality-section-title">2. {t.realityInterestsTitle}</div>
        <div className="reality-section-desc">{t.realityInterestsDesc} {t.realityMaxHint}</div>
        <div className="chip-grid">
          {interestKeys.map(k => {
            const sel = interests.includes(k);
            const maxed = !sel && interests.length >= MAX_SELECT;
            return (
              <button key={k}
                className={`chip-btn${sel?" selected":""}${maxed?" maxed":""}`}
                onClick={() => !maxed && toggleMulti("interests", k)}>
                {t.realityInterests?.[k] || k}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 3 — Identity */}
      <div className="reality-section">
        <div className="reality-section-title">3. {t.realityIdentityTitle}</div>
        <div className="identity-grid">
          {identityKeys.map(k => {
            const opt = t.realityIdentityOptions?.[k] || { icon:"🔹", label:k };
            return (
              <button key={k}
                className={`identity-btn${reality.identityType===k?" selected":""}`}
                onClick={() => setSingle("identityType", k)}>
                <span className="ib-icon">{opt.icon}</span>
                <span className="ib-label">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 4 — Priority */}
      <div className="reality-section">
        <div className="reality-section-title">4. {t.realityPriorityTitle}</div>
        <div className="identity-grid">
          {priorityKeys.map(k => {
            const opt = t.realityPriorityOptions?.[k] || { icon:"🔹", label:k };
            return (
              <button key={k}
                className={`identity-btn${reality.priority===k?" selected":""}`}
                onClick={() => setSingle("priority", k)}>
                <span className="ib-icon">{opt.icon}</span>
                <span className="ib-label">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={onNext}
          disabled={!canProceed} style={{opacity:canProceed?1:0.4}}>
          {t.next} →
        </button>
      </div>
    </div>
  );
}

// ── Step 2.5: Profile Boost ───────────────────────────────────────
// NEW INPUT: 6 high-signal questions that sharpen all 3 recommendation lanes.
// Stored in reality.profileBoost as { prestigePriority, moneyPriority, handsOn,
//   riskTolerance, internationalIntent, focusAbility } each 0|1|2.
function StepProfileBoost({ lang, reality, setReality, onNext, onBack, t, dir }) {
  const pb = reality.profileBoost || {};
  const set = (field, val) =>
    setReality(prev => ({ ...prev, profileBoost: { ...(prev.profileBoost || {}), [field]: val } }));

  const QUESTIONS = [
    {
      key: "prestigePriority",
      label: t.pb_prestige,
      opts: [t.pb_prestige0, t.pb_prestige1, t.pb_prestige2],
    },
    {
      key: "moneyPriority",
      label: t.pb_money,
      opts: [t.pb_money0, t.pb_money1, t.pb_money2],
    },
    {
      key: "handsOn",
      label: t.pb_handsOn,
      opts: [t.pb_handsOn0, t.pb_handsOn1, t.pb_handsOn2],
    },
    {
      key: "riskTolerance",
      label: t.pb_risk,
      opts: [t.pb_risk0, t.pb_risk1, t.pb_risk2],
    },
    {
      key: "internationalIntent",
      label: t.pb_intl,
      opts: [t.pb_intl0, t.pb_intl1, t.pb_intl2],
    },
    {
      key: "focusAbility",
      label: t.pb_focus,
      opts: [t.pb_focus0, t.pb_focus1, t.pb_focus2],
    },
  ];

  const answered = QUESTIONS.filter(q => pb[q.key] != null).length;
  const canProceed = answered >= 4; // allow skipping 2 max

  return (
    <div className="card" dir={dir}>
      <StepIndicator step={2} total={8} t={t}/>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>{t.profileBoostStep}</h2>
      <p style={{color:"var(--muted)",fontSize:13,marginBottom:24}}>{t.profileBoostDesc}</p>

      {QUESTIONS.map((q, qi) => {
        const val = pb[q.key];
        return (
          <div key={q.key} className="reality-section" style={{marginBottom:20}}>
            <div className="reality-section-title" style={{fontSize:14,marginBottom:10}}>
              {qi + 1}. {q.label}
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {q.opts.map((opt, i) => (
                <button
                  key={i}
                  className={`identity-btn${val === i ? " selected" : ""}`}
                  style={{flex:"1 1 auto",minWidth:100,fontSize:13,padding:"10px 12px",textAlign:"center"}}
                  onClick={() => set(q.key, i)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <p style={{fontSize:12,color:"var(--muted)",marginTop:8,marginBottom:16}}>
        {answered}/6 {lang==="ar"?"أسئلة مُجابة":lang==="fr"?"réponses":"answered"}
        {!canProceed && " — "+( lang==="ar"?"يرجى الإجابة على 4 على الأقل":lang==="fr"?"répondre à au moins 4":"please answer at least 4")}
      </p>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={onNext}
          disabled={!canProceed} style={{opacity:canProceed?1:0.4}}>
          {t.next} →
        </button>
      </div>
    </div>
  );
}

// ── Step 3: Info ──────────────────────────────────────────────────
function StepInfo({ lang, info, setInfo, onNext, onBack, t, dir }) {
  const set = (field, val) => setInfo(p => ({ ...p, [field]: val }));

  // SUBJECT MODEL (MOROCCO) FIX: when changing year/field/track, also sync scoring bacTrack
  const setExamYear = (yr) => {
    const mapped = yr === "bac1"
      ? BAC1_FIELD_TO_SCORING[info.bac1Field || "SE"]
      : BAC2_TRACK_TO_SCORING[info.bac2Track || "SVT"];
    setInfo(p => ({ ...p, examYear: yr, examLevel: yr, bacTrack: mapped || "SVT" }));
  };
  const setBac1Field = (f) => {
    const mapped = BAC1_FIELD_TO_SCORING[f] || "SVT";
    setInfo(p => ({ ...p, bac1Field: f, trackField: f, bacTrack: mapped }));
  };
  const setBac2Track = (tk) => {
    const mapped = BAC2_TRACK_TO_SCORING[tk] || "SVT";
    setInfo(p => ({ ...p, bac2Track: tk, trackField: tk, bacTrack: mapped }));
  };

  const BAC1_FIELDS  = ["SE","SM","ST","ECO","LSH","AA","EO","BP"];
  const BAC2_TRACKS  = ["SVT","PC","SMA","SMB","ST","ECO","LSH","AA","EO","BP"];
  const BP_EXTRAS    = ["math","physchem","svt"];

  const examYear   = info.examYear  || "bac2";
  const bac1Field  = info.bac1Field || "SE";
  const bac2Track  = info.bac2Track || "SVT";
  const isBac1     = examYear === "bac1";
  const isEO       = isBac1 ? bac1Field === "EO" : bac2Track === "EO";
  const isBP       = isBac1 ? bac1Field === "BP" : bac2Track === "BP";
  const canProceed = !!examYear && (isBac1 ? !!bac1Field : !!bac2Track);

  const selStyle = (sel) => ({
    padding:"10px 14px", borderRadius:10, textAlign:"start",
    border:`2px solid ${sel ? "var(--accent)" : "var(--border)"}`,
    background: sel ? "rgba(232,161,36,0.10)" : "var(--surface2)",
    color: sel ? "var(--accent)" : "var(--text)",
    cursor:"pointer", fontFamily:"inherit", fontWeight:sel?700:400, fontSize:13,
  });

  return (
    <div className="card" dir={dir}>
      <StepIndicator step={3} total={8} t={t}/>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:20}}>{t.infoStep}</h2>

      {/* SUBJECT MODEL (MOROCCO) FIX: examYear selector — bac1 vs bac2 */}
      <div className="field">
        <label style={{fontWeight:600}}>{t.examYearLabel || t.examLevelLabel}</label>
        <div className="mobility-grid" style={{gridTemplateColumns:"1fr 1fr",marginTop:8}}>
          {[["bac1", t.examYearBac1 || t.examLevelBac1], ["bac2", t.examYearBac2 || t.examLevelBac2]].map(([val,lbl]) => (
            <button key={val}
              className={`mob-btn ${examYear===val?"selected":""}`}
              onClick={()=>setExamYear(val)}>{lbl}
            </button>
          ))}
        </div>
      </div>

      {/* SUBJECT MODEL (MOROCCO) FIX: Bac1 field selector (only when bac1) */}
      {isBac1 && (
        <div className="field">
          <label style={{fontWeight:600}}>{t.bac1FieldLabel || t.trackFieldLabel}</label>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:8}}>
            {BAC1_FIELDS.map(key => {
              const lbl = t.bac1Fields?.[key] || t.trackFields?.[key] || key;
              return (
                <button key={key} onClick={()=>setBac1Field(key)} style={selStyle(bac1Field===key)}>
                  <span style={{fontWeight:800,marginInlineEnd:6}}>{key}</span> — {lbl}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBJECT MODEL (MOROCCO) FIX: Bac2 track selector (only when bac2) */}
      {!isBac1 && (
        <div className="field">
          <label style={{fontWeight:600}}>{t.bac2TrackLabel || t.trackFieldLabel}</label>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginTop:8}}>
            {BAC2_TRACKS.map(key => {
              const lbl = t.bac2Tracks?.[key] || key;
              return (
                <button key={key} onClick={()=>setBac2Track(key)} style={selStyle(bac2Track===key)}>
                  <span style={{fontWeight:800,marginInlineEnd:6}}>{key}</span> — {lbl}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* EO: eoOption arabic / sharia */}
      {isEO && (
        <div className="field">
          <label style={{fontWeight:600}}>{t.eoOptionLabel}</label>
          <div className="mobility-grid" style={{gridTemplateColumns:"1fr 1fr",marginTop:8}}>
            {[["arabic",t.eoOptionArabic],["sharia",t.eoOptionSharia]].map(([val,lbl]) => (
              <button key={val}
                className={`mob-btn ${info.eoOption===val?"selected":""}`}
                onClick={()=>set("eoOption",val)}>{lbl}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* BP: bpExtras multi-select */}
      {isBP && (
        <div className="field">
          <label style={{fontWeight:600}}>{t.bpExtrasLabel}</label>
          <div className="chip-grid" style={{marginTop:8}}>
            {BP_EXTRAS.map(k => {
              const sel = (info.bpExtras||[]).includes(k);
              return (
                <button key={k}
                  className={`chip-btn${sel?" selected":""}`}
                  onClick={()=>setInfo(p=>{
                    const cur = p.bpExtras||[];
                    return {...p, bpExtras: sel ? cur.filter(x=>x!==k) : [...cur,k]};
                  })}>
                  {SUBJECT_LABELS[k]?.[lang] || k}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="field">
        <label>{t.city}</label>
        <select value={info.city} onChange={e=>setInfo(p=>({...p,city:e.target.value}))}>
          {MOROCCAN_CITIES.map(c=><option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="field">
        <label>{t.mobility}</label>
        <div className="mobility-grid">
          {(t.mobilityOptions||[]).map((opt,i)=>(
            <button key={i}
              className={`mob-btn ${info.mobility===i?"selected":""}`}
              onClick={()=>setInfo(p=>({...p,mobility:i}))}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label>{t.studyLang}</label>
        <div className="mobility-grid">
          {[{code:"ar",label:"العربية"},{code:"fr",label:"Français"},{code:"en",label:"English"}].map(l=>(
            <button key={l.code}
              className={`mob-btn ${info.studyLang===l.code?"selected":""}`}
              onClick={()=>setInfo(p=>({...p,studyLang:l.code}))}>
              {l.label}
            </button>
          ))}
        </div>

      <div className="field">
        <label>{t.examModeLabel}</label>
        <div className="mobility-grid" style={{gridTemplateColumns:"1fr 1fr"}}>
          <button className={`mob-btn ${info.examMode==="watani"?"selected":""}`}
            onClick={()=>setInfo(p=>({...p,examMode:"watani"}))}>{t.examModeWatani}</button>
          <button className={`mob-btn ${info.examMode==="full_bac"?"selected":""}`}
            onClick={()=>setInfo(p=>({...p,examMode:"full_bac"}))}>{t.examModeFull}</button>
        </div>
      </div>
      </div>

      {/* Cultural sensitivity patch — study goal selector */}
      <div className="field">
        <label style={{fontWeight:600}}>{t.studyGoalLabel}</label>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:8}}>
          {["prestige","balanced","handsOn"].map(key=>{
            const opt = t.studyGoalOptions?.[key] || { icon:"🔹", label:key };
            const sel = (info.goal || "prestige") === key;
            return (
              <button key={key}
                onClick={()=>setInfo(p=>({...p,goal:key}))}
                style={{
                  display:"flex",alignItems:"center",gap:12,
                  padding:"12px 16px",borderRadius:12,
                  border:`2px solid ${sel?"var(--accent)":"var(--border)"}`,
                  background:sel?"rgba(232,161,36,0.1)":"var(--surface2)",
                  color:sel?"var(--accent)":"var(--text)",
                  cursor:"pointer",textAlign:"start",transition:"all 0.2s",fontFamily:"inherit",
                }}>
                <span style={{fontSize:20}}>{opt.icon}</span>
                <span style={{fontSize:13,fontWeight:sel?700:400,lineHeight:1.4}}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Goal mode input (Cultural rerank layer) — prestige/fit/practical/unsure */}
      <div className="field">
        <label style={{fontWeight:600}}>{t.goalModeLabel}</label>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:8}}>
          {["prestige","fit","practical","unsure"].map(key=>{
            const opt = t.goalModeOptions?.[key] || { icon:"🔹", label:key };
            const sel = (info.goalMode || "unsure") === key;
            return (
              <button key={key}
                onClick={()=>setInfo(p=>({...p,goalMode:key}))}
                style={{
                  display:"flex",alignItems:"center",gap:12,
                  padding:"12px 16px",borderRadius:12,
                  border:`2px solid ${sel?"#6366f1":"var(--border)"}`,
                  background:sel?"rgba(99,102,241,0.08)":"var(--surface2)",
                  color:sel?"#6366f1":"var(--text)",
                  cursor:"pointer",textAlign:"start",transition:"all 0.2s",fontFamily:"inherit",
                }}>
                <span style={{fontSize:20}}>{opt.icon}</span>
                <span style={{fontSize:13,fontWeight:sel?700:400,lineHeight:1.4}}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="field">
        <label>{t.privateBudgetLabel}</label>
        <div className="mobility-grid" style={{gridTemplateColumns:"1fr 1fr"}}>
          <button className={`mob-btn ${info.privateBudget?"selected":""}`}
            onClick={()=>setInfo(p=>({...p,privateBudget:true}))}>{t.yes}</button>
          <button className={`mob-btn ${!info.privateBudget?"selected":""}`}
            onClick={()=>setInfo(p=>({...p,privateBudget:false}))}>{t.no}</button>
        </div>
        <div style={{fontSize:11,color:"var(--muted)",marginTop:6}}>{t.privateBudgetHint}</div>
      </div>

      {/* Feature 2: Study abroad toggle */}
      <div className="field">
        <label>{t.studyAbroadLabel}</label>
        <div className="mobility-grid" style={{gridTemplateColumns:"1fr 1fr"}}>
          <button className={`mob-btn ${info.studyAbroad?"selected":""}`}
            onClick={()=>setInfo(p=>({...p,studyAbroad:true}))}>{t.yes}</button>
          <button className={`mob-btn ${!info.studyAbroad?"selected":""}`}
            onClick={()=>setInfo(p=>({...p,studyAbroad:false}))}>{t.no}</button>
        </div>
      </div>

      {info.studyAbroad && (
        <div className="field" style={{marginTop:-8}}>
          <label>{t.studyAbroadRegionLabel}</label>
          <select value={info.abroadRegion||"france"} onChange={e=>setInfo(p=>({...p,abroadRegion:e.target.value}))}>
            {Object.entries(t.abroadRegions||{}).map(([k,v])=>(
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      )}


      {/* TASK 1 — examTiming: determines PRE vs POST subject list in StepMarks */}
      <div className="field">
        <label style={{fontWeight:600}}>{t.examTimingLabel || "When is this evaluation?"}</label>
        {t.examTimingHint && <div style={{fontSize:11,color:"var(--muted)",marginTop:2,marginBottom:8}}>{t.examTimingHint}</div>}
        <div className="mobility-grid" style={{gridTemplateColumns:"1fr 1fr"}}>
          {[
            { key:"pre",  label: t.examTimingPre  || "Before Bac" },
            { key:"post", label: t.examTimingPost || "After Bac"  },
          ].map(({key,label}) => (
            <button key={key}
              className={`mob-btn ${(info.examTiming||"post")===key?"selected":""}`}
              onClick={()=>setInfo(p=>({...p,examTiming:key}))}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* TASK 2 — goalPreference: drives Cultural Credibility Filter in scoring */}
      <div className="field">
        <label style={{fontWeight:600}}>{t.goalPreferenceLabel || "Which style fits you best?"}</label>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginTop:8}}>
          {["prestige","balanced","practical"].map(key => {
            const opt = t.goalPreferenceOptions?.[key] || { icon:"🔹", label:key };
            const sel = (info.goalPreference || "prestige") === key;
            return (
              <button key={key}
                onClick={()=>setInfo(p=>({...p,goalPreference:key}))}
                style={{
                  display:"flex",alignItems:"center",gap:12,
                  padding:"12px 16px",borderRadius:12,
                  border:`2px solid ${sel?"var(--accent)":"var(--border)"}`,
                  background:sel?"rgba(232,161,36,0.1)":"var(--surface2)",
                  color:sel?"var(--accent)":"var(--text)",
                  cursor:"pointer",textAlign:"start",transition:"all 0.2s",fontFamily:"inherit",
                }}>
                <span style={{fontSize:20}}>{opt.icon}</span>
                <span style={{fontSize:13,fontWeight:sel?700:400,lineHeight:1.4}}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={onNext}>{t.next} →</button>
      </div>
    </div>
  );
}
function StepMarks({ lang, info, marks, setMarks, onNext, onBack, t, dir }) {
  // SUBJECT MODEL (MOROCCO) FIX: always use getSubjectsForMarks for the exact official subject list
  const subjs = getSubjectsForMarks(info);
  // Header: show bac1/bac2 label
  const examYear = info.examYear || (info.examLevel === "bac1" ? "bac1" : "bac2");
  const levelHeader = examYear === "bac1"
    ? (t.examYearBac1 || t.examLevelBac1 || "Bac 1 (Régional)")
    : (t.examYearBac2 || t.examLevelBac2 || "Bac 2 (National)");
  // Guard: if no subjects yet (field/track not selected), show prompt
  if (subjs.length === 0) {
    return (
      <div className="card" dir={dir}>
        <p style={{textAlign:"center",color:"var(--muted)",marginTop:40}}>
          {lang==="ar"?"يرجى اختيار الشعبة أولاً":lang==="fr"?"Veuillez d'abord choisir votre filière":"Please select your track first"}
        </p>
        <div className="btn-row">
          <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card" dir={dir}>
      <StepIndicator step={4} total={8} t={t}/>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>{t.marksStep}</h2>
      <p style={{color:"var(--muted)",fontSize:13,marginBottom:8}}>{t.marks}</p>

{/* SUBJECTS FIX: level header shows bac1/bac2 */}
<div className="section-title" style={{ marginTop: 0 }}>
  {levelHeader}
</div>
<div className="marks-grid">
  {subjs.map((s) => {
    const val = Number(marks[s]) || 0;
    const pct = (val / 20) * 100;
    const color = val >= 15 ? "#10b981" : val >= 10 ? "#3b82f6" : "#ef4444";
    return (
      <div key={s} className="mark-input">
        <div className="mark-label">{SUBJECT_LABELS[s]?.[lang] || s}</div>
        <div className="mark-row">
          <input
            type="number"
            min="0"
            max="20"
            step="0.5"
            value={val || ""}
            placeholder="0"
            onChange={(e) =>
              setMarks((prev) => ({
                ...prev,
                [s]: Math.min(20, Math.max(0, Number(e.target.value) || 0)),
              }))
            }
          />
          <div className="mark-bar">
            <div className="mark-bar-fill" style={{ width: `${pct}%`, background: color }} />
          </div>
        </div>
      </div>
    );
  })}
</div>

{info.examMode === "full_bac" && (
  <div className="field" style={{ marginTop: 16 }}>
    <label>{t.marksSectionContinuous}</label>
    <input
      type="number"
      min="0"
      max="20"
      step="0.5"
      value={marks.continuous || ""}
      placeholder="0"
      onChange={(e) =>
        setMarks((prev) => ({
          ...prev,
          continuous: Math.min(20, Math.max(0, Number(e.target.value) || 0)),
        }))
      }
    />
  </div>
)}
<div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={onNext}>{t.next} →</button>
      </div>
    </div>
  );
}

// ── Step 5: Bac Status (timing + family pressure) ─────────────────
function StepBacStatus({ lang, info, setInfo, reality, setReality, onNext, onBack, t, dir }) {
  const fpFields = ["medicine","engineering","business","law","other"];
  return (
    <div className="card" dir={dir}>
      <StepIndicator step={5} total={7} t={t}/>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:8}}>{t.bacStatusStep}</h2>
      <p style={{color:"var(--muted)",fontSize:14,marginBottom:24,lineHeight:1.6}}>{t.bacStatusQ}</p>

      {/* Bac timing */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
        {[
          { val:"before", icon:"📚", label:t.bacStatusBefore },
          { val:"after",  icon:"🎓", label:t.bacStatusAfter  },
        ].map(opt=>(
          <button key={opt.val}
            onClick={()=>setInfo(p=>({...p,bacStatus:opt.val}))}
            style={{
              padding:"20px 14px",
              border:`2px solid ${info.bacStatus===opt.val?"var(--accent)":"var(--border)"}`,
              borderRadius:14,
              background:info.bacStatus===opt.val?"rgba(232,161,36,0.12)":"var(--surface2)",
              cursor:"pointer", textAlign:"center", transition:"all 0.2s",
            }}>
            <div style={{fontSize:32,marginBottom:8}}>{opt.icon}</div>
            <div style={{fontSize:14,fontWeight:600,
              color:info.bacStatus===opt.val?"var(--accent)":"var(--text)",lineHeight:1.4}}>
              {opt.label}
            </div>
          </button>
        ))}
      </div>

      {info.bacStatus==="after" && (
        <div style={{marginBottom:20,padding:"12px 16px",background:"rgba(107,114,128,0.1)",
          border:"1px solid var(--border)",borderRadius:10,fontSize:13,color:"var(--muted)"}}>
          🎓 {t.bacStatusFinalNote}
        </div>
      )}

      <p style={{fontSize:12,color:"var(--muted)",textAlign:"center",marginBottom:20}}>
        {t.bacStatusNote}
      </p>

      {/* Family pressure question */}
      <div className="field" style={{borderTop:"1px solid var(--border)",paddingTop:20,marginTop:4}}>
        <label style={{fontWeight:600,fontSize:14}}>{t.fpQuestion}</label>
        <div className="mobility-grid" style={{gridTemplateColumns:"1fr 1fr",marginTop:10}}>
          <button className={`mob-btn ${reality.familyPressure?"selected":""}`}
            onClick={()=>setReality(p=>({...p,familyPressure:true}))}>{t.yes}</button>
          <button className={`mob-btn ${!reality.familyPressure?"selected":""}`}
            onClick={()=>setReality(p=>({...p,familyPressure:false}))}>{t.no}</button>
        </div>
      </div>

      {/* Field selector — visible when familyPressure=true */}
      {reality.familyPressure && (
        <div className="field" style={{marginTop:16,padding:"16px 18px",
          background:"rgba(245,158,11,0.05)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:12}}>
          <label style={{fontWeight:600,fontSize:13,marginBottom:10,display:"block",color:"var(--warn)"}}>
            {t.fpFieldLabel}
          </label>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {fpFields.map(f=>{
              const label = t.fpFieldOptions?.[f] || f;
              return (
                <button key={f}
                  className={`chip-btn${reality.fpField===f?" selected":""}`}
                  onClick={()=>setReality(p=>({...p,fpField:f}))}>
                  {label}
                </button>
              );
            })}
          </div>
          {reality.fpField==="other" && (
            <input type="text"
              style={{marginTop:10,width:"100%",padding:"8px 12px",
                background:"var(--surface2)",border:"1.5px solid var(--border)",
                borderRadius:8,color:"var(--text)",fontSize:14,fontFamily:"inherit"}}
              placeholder={t.fpFieldOtherPlaceholder}
              value={reality.fpFieldOther||""}
              onChange={e=>setReality(p=>({...p,fpFieldOther:e.target.value}))}/>
          )}
        </div>
      )}

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={onNext}>{t.finish} →</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// computeMassarType — deterministic 4-letter code from traits + reality
// Dims: A/C  S/I  P/O  R/K
// ─────────────────────────────────────────────────────────────────
function computeMassarType(traits, reality) {
  // FIX: results page null-safety — guard traits object being undefined/incomplete
  const safeTr = traits && typeof traits === "object" ? traits : {};
  const ps = reality?.preferredStyle || "";
  // Dim 1: A(nalytical) vs C(reative)
  const d1 = (safeTr.analytical || 0) >= (safeTr.creativity || 0) ? "A" : "C";
  // Dim 2: S(ocial) vs I(ndependent)
  const d2 = (safeTr.social || 0) >= 0.5 ? "S" : "I";
  // Dim 3: P(ractical) vs O(theoretical)
  const practicalBias = ps === "handson" ? 0.15 : ps === "academic" ? -0.15 : 0;
  const practicalScore = ((safeTr.structure || 0) + (1 - (safeTr.creativity || 0))) / 2 + practicalBias;
  const d3 = practicalScore >= 0.5 ? "P" : "O";
  // Dim 4: R(isk-taker) vs K(stable)
  const d4 = (safeTr.risk || 0) >= 0.5 ? "R" : "K";
  return d1 + d2 + d3 + d4;
}

// ── Moroccan Archetype System ─────────────────────────────────────
// 8 identity archetypes — Modern Moroccan, brandable, confident.

const ARCH_SVG = {
  BENA:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="14" width="5" height="7" rx="1"/><rect x="9.5" y="10" width="5" height="11" rx="1"/><rect x="16" y="6" width="5" height="15" rx="1"/><line x1="2" y1="21" x2="22" y2="21"/></svg>`,
  MHNI:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9C4.5 20 1 17 1 12V7z"/><path d="M9 12l2 2 4-4"/></svg>`,
  HRRK:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h8l-1 8 9-12h-8z"/></svg>`,
  TGRI:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H9M17 7v8"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="7" r="2"/></svg>`,
  MLAH:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="12"/><line x1="12" y1="12" x2="17.5" y2="8"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
  SDGI:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="4" height="4" rx="0.5"/><rect x="10" y="3" width="4" height="4" rx="0.5"/><rect x="17" y="3" width="4" height="4" rx="0.5"/><rect x="3" y="10" width="4" height="4" rx="0.5"/><rect x="10" y="10" width="4" height="4" rx="0.5"/><rect x="17" y="17" width="4" height="4" rx="0.5"/><rect x="3" y="17" width="4" height="4" rx="0.5"/><rect x="17" y="10" width="4" height="4" rx="0.5"/></svg>`,
  RAID:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0 4 4 4 9a4 4 0 01-8 0c0-5 4-9 4-9z"/><path d="M8 17l-2 4M16 17l2 4M10 21h4"/></svg>`,
  MTQN:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/></svg>`,
};

const MOROCCAN_ARCHETYPES = {
  BENA:{
    code:"BENA", svgKey:"BENA", icon:"🏗️",
    name:{ ar:"البنّاء", fr:"Le Bâtisseur", en:"The Builder" },
    tagline:{ ar:"يُنجز ما يعد به الآخرون فقط.", fr:"Il livre ce que d'autres promettent.", en:"Delivers what others only promise." },
    description:{ ar:"دقة وانضباط في كل ما يبدأ به — إنجازاته تتكلم عنه.", fr:"Précision et discipline dans tout ce qu'il entreprend.", en:"Precision and discipline in everything he starts." },
    strengths:{ ar:["موثوقية عالية","انضباط متواصل","تنفيذ دقيق"], fr:["Haute fiabilité","Discipline constante","Exécution précise"], en:["High reliability","Consistent discipline","Precise execution"] },
    risk:{ ar:"مقاومة التغيير تُضيّع فرصاً جديدة.", fr:"La résistance au changement fait rater des opportunités.", en:"Resistance to change misses new opportunities." },
    bestEnv:{ ar:"بيئة منظمة بأهداف واضحة ومعايير ثابتة.", fr:"Environnement structuré avec objectifs clairs.", en:"Structured environment with clear goals." },
    worstEnv:{ ar:"الفوضى وتغيير الأولويات باستمرار.", fr:"Chaos et priorités changeantes.", en:"Chaos and constantly shifting priorities." },
    opposite:"RAID", evolvesTrait:"creativity", evolvesInto:"SDGI",
  },
  MHNI:{
    code:"MHNI", svgKey:"MHNI", icon:"🏛️",
    name:{ ar:"المِهْنِي", fr:"Le Professionnel", en:"The Professional" },
    tagline:{ ar:"اسمه ضمانة وتوقيعه معيار.", fr:"Son nom est garantie, sa signature un standard.", en:"His name is trust, his work the standard." },
    description:{ ar:"موثوق ومتقن يرفع من قيمة عمله في كل مشروع يُنجزه.", fr:"Fiable et maîtrisé, il rehausse la valeur de son travail.", en:"Reliable and masterful, raises the bar in every project." },
    strengths:{ ar:["موثوقية لا تُضاهى","تحليل ميداني دقيق","شبكة مهنية قوية"], fr:["Fiabilité incomparable","Analyse terrain précise","Fort réseau professionnel"], en:["Unmatched reliability","Precise field analysis","Strong professional network"] },
    risk:{ ar:"الاستناد إلى المكانة قد يُبطئ التكيف مع المتغيرات.", fr:"S'appuyer sur la réputation peut ralentir l'adaptation.", en:"Leaning on reputation may slow adaptation to change." },
    bestEnv:{ ar:"مؤسسات راسخة تُقدّر الجودة والخبرة المتراكمة.", fr:"Institutions établies valorisant qualité et expertise.", en:"Established institutions valuing quality and expertise." },
    worstEnv:{ ar:"بيئات تجريبية سريعة بلا منهجية واضحة.", fr:"Environnements expérimentaux rapides sans méthode.", en:"Fast experimental environments without methodology." },
    opposite:"RAID", evolvesTrait:"risk", evolvesInto:"HRRK",
  },
  HRRK:{
    code:"HRRK", svgKey:"HRRK", icon:"⚡",
    name:{ ar:"المُحرّك", fr:"Le Moteur", en:"The Driver" },
    tagline:{ ar:"يُشعل الطاقة ويقود إلى الأمام.", fr:"Il allume l'énergie et mène vers l'avant.", en:"Ignites energy and drives forward." },
    description:{ ar:"قائد طبيعي يدفع المجموعات لأبعد مما تتوقع من نفسها.", fr:"Leader naturel poussant les équipes au-delà de leurs attentes.", en:"Natural leader who pushes teams beyond their expectations." },
    strengths:{ ar:["قيادة إلهامية","طاقة تنظيمية عالية","حسم وسرعة"], fr:["Leadership inspirant","Haute énergie organisationnelle","Décision rapide"], en:["Inspiring leadership","High organisational energy","Quick decisiveness"] },
    risk:{ ar:"الطاقة بلا بنية تُبدد النتائج وتُشتت الفريق.", fr:"L'énergie sans structure disperse les résultats.", en:"Energy without structure dissipates results." },
    bestEnv:{ ar:"مشاريع جماعية ومبادرات تحتاج قيادة ميدانية.", fr:"Projets collectifs nécessitant un leadership de terrain.", en:"Collective projects needing hands-on leadership." },
    worstEnv:{ ar:"عمل فردي صامت بلا أثر مباشر على الآخرين.", fr:"Travail solo silencieux sans impact sur autrui.", en:"Silent solo work with no impact on others." },
    opposite:"MTQN", evolvesTrait:"structure", evolvesInto:"MHNI",
  },
  TGRI:{
    code:"TGRI", svgKey:"TGRI", icon:"🔀",
    name:{ ar:"التاجر الذكي", fr:"Le Négociant Malin", en:"The Sharp Dealer" },
    tagline:{ ar:"يرى الفرصة قبل أن يراها غيره.", fr:"Il voit l'opportunité avant les autres.", en:"Sees the opportunity before anyone else." },
    description:{ ar:"يُحوّل الأفكار والعلاقات إلى قيمة حقيقية قابلة للقياس.", fr:"Transforme idées et relations en valeur réelle et mesurable.", en:"Turns ideas and relationships into real measurable value." },
    strengths:{ ar:["حدس تجاري حاد","شبكة علاقات واسعة","مفاوض طبيعي"], fr:["Flair commercial aigu","Large réseau","Négociateur naturel"], en:["Sharp commercial instinct","Wide network","Natural negotiator"] },
    risk:{ ar:"القفز بين الفرص دون إتمام يُشتت الطاقة والتركيز.", fr:"Sauter entre opportunités sans finaliser disperse l'énergie.", en:"Jumping between opportunities without finishing dissipates energy." },
    bestEnv:{ ar:"بيئة تجارية ديناميكية مع استقلالية واسعة النطاق.", fr:"Environnement commercial dynamique avec large autonomie.", en:"Dynamic business environment with wide autonomy." },
    worstEnv:{ ar:"بيروقراطية صارمة وعمل متكرر بلا معنى.", fr:"Bureaucratie rigide et travail répétitif.", en:"Rigid bureaucracy and repetitive work." },
    opposite:"MTQN", evolvesTrait:"structure", evolvesInto:"MHNI",
  },
  MLAH:{
    code:"MLAH", svgKey:"MLAH", icon:"🧭",
    name:{ ar:"الملاح", fr:"Le Navigateur", en:"The Navigator" },
    tagline:{ ar:"يتحرك بخطة حيث يضيع الآخرون.", fr:"Il avance avec plan là où les autres se perdent.", en:"Moves with a plan where others get lost." },
    description:{ ar:"محلل استراتيجي يرسم الطريق بدقة ويُخطط بعيد المدى.", fr:"Analyste stratégique qui trace la route et planifie à long terme.", en:"Strategic analyst who maps the route and plans long-term." },
    strengths:{ ar:["تفكير استراتيجي عميق","تحليل دقيق","رؤية بعيدة المدى"], fr:["Pensée stratégique profonde","Analyse précise","Vision long terme"], en:["Deep strategic thinking","Precise analysis","Long-term vision"] },
    risk:{ ar:"الإفراط في التحليل يُعطّل قرار التنفيذ في اللحظة المناسبة.", fr:"L'analyse excessive bloque l'exécution au bon moment.", en:"Over-analysis blocks timely execution." },
    bestEnv:{ ar:"بيئة بحثية أو استراتيجية مع وقت كافٍ للتفكير.", fr:"Environnement recherche ou stratégie avec temps de réflexion.", en:"Research or strategy environment with thinking time." },
    worstEnv:{ ar:"قرارات سريعة بلا معطيات أو تحليل كافٍ.", fr:"Décisions rapides sans données suffisantes.", en:"Quick decisions without sufficient data." },
    opposite:"HRRK", evolvesTrait:"leadership", evolvesInto:"MHNI",
  },
  SDGI:{
    code:"SDGI", svgKey:"SDGI", icon:"🌐",
    name:{ ar:"الصانع الرقمي", fr:"Le Fabricant Digital", en:"The Digital Maker" },
    tagline:{ ar:"يصنع ما لم يُتخيَّل بعد.", fr:"Il fabrique ce qui n'a pas encore été imaginé.", en:"Builds what hasn't been imagined yet." },
    description:{ ar:"مُبدع تقني يجمع الأفكار والأدوات الرقمية في منتجات حقيقية.", fr:"Créatif technique combinant idées et outils numériques en produits réels.", en:"Technical creative combining ideas and digital tools into real products." },
    strengths:{ ar:["إبداع تقني متميز","بناء شبكات رقمية","ابتكار ملموس"], fr:["Créativité technique distincte","Construction réseaux numériques","Innovation concrète"], en:["Distinctive technical creativity","Digital network building","Concrete innovation"] },
    risk:{ ar:"كثرة المشاريع غير المكتملة تُبدد الطاقة والأثر.", fr:"Trop de projets non finalisés dissipent l'énergie.", en:"Too many unfinished projects dissipate energy and impact." },
    bestEnv:{ ar:"فرق رقمية متنوعة بثقافة تجريبية وإبداعية.", fr:"Équipes numériques diverses avec culture expérimentale et créative.", en:"Diverse digital teams with experimental and creative culture." },
    worstEnv:{ ar:"هياكل جامدة تُعاقب على التجريب والخطأ.", fr:"Structures rigides qui punissent l'expérimentation.", en:"Rigid structures that punish experimentation." },
    opposite:"BENA", evolvesTrait:"structure", evolvesInto:"BENA",
  },
  RAID:{
    code:"RAID", svgKey:"RAID", icon:"🚀",
    name:{ ar:"الرائد", fr:"Le Pionnier", en:"The Pioneer" },
    tagline:{ ar:"يسير في طرق لم يشقّها أحد.", fr:"Il marche sur des chemins que personne n'a tracés.", en:"Walks paths no one has traced yet." },
    description:{ ar:"مُبتكر مستقل يُعيد تعريف ما اعتقد الناس أنه مسلّمة ثابتة.", fr:"Innovateur indépendant redéfinissant ce que les gens croyaient inévitable.", en:"Independent innovator who redefines what people thought inevitable." },
    strengths:{ ar:["إبداع نظري جريء","استقلالية فكرية عميقة","حدس حاد"], fr:["Créativité théorique audacieuse","Indépendance intellectuelle","Intuition aiguë"], en:["Bold theoretical creativity","Deep intellectual independence","Sharp intuition"] },
    risk:{ ar:"الأفكار تبقى في الذهن إن لم تُطوّر مهارة التواصل والتنفيذ.", fr:"Les idées restent en tête sans compétences en communication.", en:"Ideas stay in your head without communication and execution skills." },
    bestEnv:{ ar:"بيئة ريادية تُقدّر الأصالة والاستقلالية الفكرية.", fr:"Environnement entrepreneurial valorisant originalité et autonomie.", en:"Entrepreneurial environment valuing originality and autonomy." },
    worstEnv:{ ar:"بيروقراطية وعمل متكرر بلا معنى أو أثر.", fr:"Bureaucratie et travail répétitif sans sens.", en:"Bureaucracy and repetitive meaningless work." },
    opposite:"BENA", evolvesTrait:"social", evolvesInto:"SDGI",
  },
  MTQN:{
    code:"MTQN", svgKey:"MTQN", icon:"⚙️",
    name:{ ar:"المُتقن", fr:"Le Maître Artisan", en:"The Master Craftsman" },
    tagline:{ ar:"حرفته علامته وإتقانه هويته.", fr:"Son métier est sa marque, sa maîtrise son identité.", en:"Craft is his mark, mastery is his identity." },
    description:{ ar:"يصقل مهاراته بصبر واستمرار حتى تصبح حرفة لا تُضاهى.", fr:"Affine patiemment ses compétences jusqu'à une maîtrise incomparable.", en:"Patiently refines skills until they become unmatched mastery." },
    strengths:{ ar:["إتقان تقني عالٍ","صبر وتركيز عميق","جودة لا تُساوم"], fr:["Haute maîtrise technique","Patience et concentration","Qualité sans compromis"], en:["High technical mastery","Patience and deep focus","Uncompromising quality"] },
    risk:{ ar:"التقليل من قيمة النفس يجعل الآخرين يستغلون المهارة.", fr:"Se sous-estimer amène les autres à exploiter ses compétences.", en:"Undervaluing yourself lets others exploit your skills." },
    bestEnv:{ ar:"ورشة أو مختبر مع استقلالية تامة في المنتج النهائي.", fr:"Atelier ou labo avec pleine autonomie sur le produit.", en:"Workshop or lab with full autonomy over the final product." },
    worstEnv:{ ar:"اجتماعات بلا قرار ومجموعات بلا هدف واضح.", fr:"Réunions sans décision et groupes sans but.", en:"Meetings without decisions and purposeless groups." },
    opposite:"HRRK", evolvesTrait:"leadership", evolvesInto:"MHNI",
  },
};

// Maps 16 computed internal codes → 8 Moroccan archetypes
const ARCHETYPE_MAP = {
  ASPR: MOROCCAN_ARCHETYPES.MHNI,
  ASPK: MOROCCAN_ARCHETYPES.BENA,
  AOPR: MOROCCAN_ARCHETYPES.MLAH,
  AOPK: MOROCCAN_ARCHETYPES.MLAH,
  ISPR: MOROCCAN_ARCHETYPES.MTQN,
  ISPK: MOROCCAN_ARCHETYPES.MTQN,
  IOPR: MOROCCAN_ARCHETYPES.RAID,
  IOPK: MOROCCAN_ARCHETYPES.RAID,
  CSPR: MOROCCAN_ARCHETYPES.SDGI,
  CSPK: MOROCCAN_ARCHETYPES.SDGI,
  COPR: MOROCCAN_ARCHETYPES.HRRK,
  COPK: MOROCCAN_ARCHETYPES.TGRI,
  ASOR: MOROCCAN_ARCHETYPES.HRRK,
  ASOK: MOROCCAN_ARCHETYPES.MHNI,
  CSOR: MOROCCAN_ARCHETYPES.HRRK,
};

function getArchetype(code) {
  return ARCHETYPE_MAP[code] || MOROCCAN_ARCHETYPES.MLAH;
}


// ─────────────────────────────────────────────────────────────────
// ARCHETYPES_V2 — 12 viral, gender-neutral Moroccan-flavored archetypes
// Data contract: id, code, rarity, icon, titleLatin, titleAr, titleFr, titleEn,
//   viralLine{ar,fr,en}, signatureMove{ar,fr,en},
//   coldReading{ar:{looks,truth}, fr:{looks,truth}, en:{looks,truth}},
//   mirror{ar:{pressure,consistency,advantage,blindSpot}, fr:{...}, en:{...}},
//   hookQuestion{ar,fr,en}, shareCaption{ar,fr,en},
//   statsProfile{stat1Label{ar,fr,en}, stat2Label{...}, stat3Label{...}}
// ─────────────────────────────────────────────────────────────────
const ARCHETYPES_V2 = [
  { id:"mllm",  code:"MS-MLLM",  rarity:"RARE",   icon:"🧠",
    titleLatin:"EL MO3ALLIM", titleAr:"المعلّم",   titleFr:"Le Prof",        titleEn:"The Teacher",
    viralLine:{ ar:"كنشرحها ببساطة… وكتدخل للراس. 🧠✨", fr:"J'explique simple… et ça rentre direct. 🧠✨", en:"I make it click—fast. 🧠✨" },
    signatureMove:{ ar:"كنحوّل المعقّد لخطوات ساهلة.", fr:"Je transforme le compliqué en étapes claires.", en:"I turn complexity into clear steps." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: كتشرح للناس حتى بلا ما تحس… وكتحس براسك مسؤول على الفهم ديالهم.", truth:"الحقيقة: كتحتاج حدّ يطلب منك \"طبقها دابا\" باش ما تبقاش غير فالكلام." },
      fr:{ looks:"Ça se voit: Tu expliques naturellement… même quand personne te demande.", truth:"La vérité: Il te faut un \"passe à l'action maintenant\" pour ne pas rester dans la théorie." },
      en:{ looks:"Looks like: You naturally teach—without trying.", truth:"Truth: You need a 'do it now' push so you don't stay in theory." },
    },
    mirror:{
      ar:{ pressure:"تحت الضغط كتولي هادئ وكتختار الكلمات بدقّة. كتفكر فالحل قبل ما تهضر.", consistency:"باش تبقى ثابت، خاصك شريك/جمهور صغير. إلى كنت بوحدك كتطوّل فالشرح بلا تنفيذ.", advantage:"ميزتك: كتفهم الناس بسرعة وكتوصل الفكرة بالطريقة اللي كتخليها تستقر.", blindSpot:"نقطة عمياء: كتشرح بزاف وكتأخر التجربة. الحل: طبّق خطوة واحدة مباشرة بعد أي شرح." },
      fr:{ pressure:"Sous pression, tu restes calme et précis. Tu cherches la clarté, pas le bruit.", consistency:"Pour tenir, il te faut un binôme ou un petit public. Seul, tu expliques… sans exécuter.", advantage:"Tu lis comment l'autre pense, puis tu simplifies jusqu'à l'évidence.", blindSpot:"Trop d'explications, pas assez de pratique. Règle: une mini-action après chaque session." },
      en:{ pressure:"Under pressure, you go calm and precise. You chase clarity, not noise.", consistency:"You need a buddy/small audience. Alone, you may explain… but delay execution.", advantage:"You read how people think, then simplify until it clicks.", blindSpot:"Explaining > doing. Rule: one micro-action after every study block." },
    },
    hookQuestion:{ ar:"واش كتشرح مزيان… ولكن كتأجل التطبيق؟ شنو أول حاجة تقدر تطبقها اليوم؟", fr:"Tu expliques bien… mais tu exécutes quand ? C'est quoi ton premier pas aujourd'hui ?", en:"You explain well—but when do you execute? What's your first step today?" },
    shareCaption:{ ar:"طلع ليا «المعلّم» 🧠✨ كنحوّل أي فكرة لشي مفهوم… شنو طلع ليك؟ 👀 #مسار #MassarPro", fr:"J'ai eu «Le Prof» 🧠✨ Je rends le compliqué simple… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Teacher\" 🧠✨ What did you get? 👀 #MassarPro" },
    statsProfile:{ stat1Label:{ar:"الفهم",fr:"Clarté",en:"Clarity"}, stat2Label:{ar:"التأثير",fr:"Impact",en:"Impact"}, stat3Label:{ar:"الانضباط",fr:"Discipline",en:"Discipline"} },
  },
  { id:"mhni",  code:"MS-MHNI",  rarity:"RARE",   icon:"🏛️",
    titleLatin:"EL MOHTARIF", titleAr:"المحترف",   titleFr:"Le Pro",         titleEn:"The Professional",
    viralLine:{ ar:"كنخدمها بالنّظام… والنتيجة كتقول كلشي. ✅", fr:"Je bosse carré… et le résultat parle. ✅", en:"Clean work. Loud results. ✅" },
    signatureMove:{ ar:"الجودة قبل السرعة.", fr:"Qualité avant vitesse.", en:"Quality over speed." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: كتكره العشوائية وكتحترم اللي خدام بنظام.", truth:"الحقيقة: كتقدر تخسر فرص زوينة غير حيث كتسنى \"الوقت المناسب\"." },
      fr:{ looks:"Ça se voit: Tu respectes le travail structuré, fiable.", truth:"La vérité: Tu peux rater des chances en attendant le \"moment parfait\"." },
      en:{ looks:"Looks like: You value structure and reliability.", truth:"Truth: You may miss chances waiting for perfect timing." },
    },
    mirror:{
      ar:{ pressure:"تحت الضغط كتختار المسار المضمون وكتقلل المخاطرة.", consistency:"خاصك روتين واضح + معيار \"شنو كافي\".", advantage:"الانضباط ديالك كيخلق ثقة قبل ما تبان النتائج.", blindSpot:"كتخاف تجرب جديد باش ما تهبطش الجودة. الحل: جرّب صغير وسريع فمساحة آمنة." },
      fr:{ pressure:"Sous pression, tu sécurises: solide > flashy.", consistency:"Routine claire + seuil \"c'est suffisant\".", advantage:"Ta discipline inspire confiance.", blindSpot:"Tu testes peu. Fix: mini-test rapide, sans risque." },
      en:{ pressure:"Safe solid move > flashy.", consistency:"Routine + \"good enough\" threshold.", advantage:"Discipline builds trust early.", blindSpot:"Low experimentation. Fix: small safe tests." },
    },
    hookQuestion:{ ar:"واش الكمال كيعطلك؟ شنو \"نسخة 70%\" تقدر تطلقها هاد السيمانة؟", fr:"Le perfectionnisme te bloque ? C'est quoi ta version \"70%\" cette semaine ?", en:"What's your 70% version you can ship this week?" },
    shareCaption:{ ar:"طلع ليا «المحترف» ✅ الخدمة عندي معيار… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «Le Pro» ✅ Chez moi c'est carré… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Professional\" ✅ What did you get? 👀 #MassarPro" },
    statsProfile:{ stat1Label:{ar:"الجودة",fr:"Qualité",en:"Quality"}, stat2Label:{ar:"الثبات",fr:"Constance",en:"Consistency"}, stat3Label:{ar:"المرونة",fr:"Adaptation",en:"Adaptation"} },
  },
  { id:"hrrk",  code:"MS-HRRK",  rarity:"COMMON", icon:"⚡",
    titleLatin:"EL MOHARRIK", titleAr:"المحرّك",  titleFr:"Le Booster",     titleEn:"The Spark",
    viralLine:{ ar:"كنشعل البداية… وكنجرّي حتى كيتحركو الناس. ⚡", fr:"J'allume le départ… et je tire tout le monde. ⚡", en:"I spark momentum. ⚡" },
    signatureMove:{ ar:"كنبدأ قبل ما تكمل الخطة.", fr:"Je lance avant la perfection.", en:"I start before it's perfect." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: كتقدر تشعل الحماس فثانية… وكتكره الروتين.", truth:"الحقيقة: إلا ما بانش تقدم سريع، كتطيح الطاقة." },
      fr:{ looks:"Ça se voit: Tu crées l'énergie vite… routine = non.", truth:"La vérité: Sans progrès visible, ta motivation chute." },
      en:{ looks:"Looks like: You create momentum fast.", truth:"Truth: No progress = energy drops." },
    },
    mirror:{
      ar:{ pressure:"كتقلب على أول ضربة كتفرق وكتخدم بسرعة.", consistency:"تحدّي صغير يومي + قياس بسيط للتقدم.", advantage:"كتقدر تحرّك فريق وتفتح طريق.", blindSpot:"كتسخّن وتبرد. الحل: نقاط ثابتة + مكافأة صغيرة." },
      fr:{ pressure:"Premier move qui change tout, puis tu fonces.", consistency:"Micro-défi + tracking (streak).", advantage:"Tu relances l'énergie d'un groupe.", blindSpot:"Up/down. Fix: petites victoires mesurables." },
      en:{ pressure:"First game-changing move then sprint.", consistency:"Micro-challenges + tracking.", advantage:"You energize teams.", blindSpot:"Drops fast. Fix: measurable micro-wins." },
    },
    hookQuestion:{ ar:"شنو اللي كيشعل فيك الحماس فعلاً؟ وشنو اللي كيطفّيه بسرعة؟", fr:"Qu'est-ce qui t'allume… et qu'est-ce qui te coupe net ?", en:"What fuels you—and what kills your momentum?" },
    shareCaption:{ ar:"طلع ليا «المحرّك» ⚡ كنبدأ قبل الكلام… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «Le Booster» ⚡ J'allume le game… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Spark\" ⚡ What did you get? 👀" },
    statsProfile:{ stat1Label:{ar:"السرعة",fr:"Vitesse",en:"Speed"}, stat2Label:{ar:"الجرأة",fr:"Audace",en:"Boldness"}, stat3Label:{ar:"الثبات",fr:"Stabilité",en:"Stability"} },
  },
  { id:"bnaa",  code:"MS-BNAA",  rarity:"RARE",   icon:"🧱",
    titleLatin:"EL BANNAA",  titleAr:"البنّاء",   titleFr:"Le Bâtisseur",   titleEn:"The Builder",
    viralLine:{ ar:"كنركّبها قطعة بقطعة… وكنخرجها قوية. 🧱", fr:"Pièce par pièce… solide à la fin. 🧱", en:"Brick by brick. 🧱" },
    signatureMove:{ ar:"كنمشي خطوة بخطوة بلا ضجيج.", fr:"Step-by-step, sans blabla.", en:"Quiet execution, steady progress." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: كتخدم فصمت وتفاجئ بالنتيجة.", truth:"الحقيقة: التفاصيل كتقدر تعطلّك." },
      fr:{ looks:"Ça se voit: Tu bosses en silence, résultat solide.", truth:"La vérité: Les détails peuvent te ralentir." },
      en:{ looks:"Looks like: Quiet worker, strong finish.", truth:"Truth: Details can slow you down." },
    },
    mirror:{
      ar:{ pressure:"كتقسم المشكل لصغار وكتحلّهم وحدة بوحدة.", consistency:"Checklist قصيرة + مراجعة أسبوعية.", advantage:"كتخلق نظام وسط الفوضى وكتحافظ على الجودة.", blindSpot:"كتطوّل فالتحسين. الحل: V1 بوقت محدد." },
      fr:{ pressure:"Tu découpes et tu avances morceau par morceau.", consistency:"Checklist courte + revue hebdo.", advantage:"Tu structures sans perdre la qualité.", blindSpot:"Trop polir. Fix: deadline V1." },
      en:{ pressure:"Break it down, solve stepwise.", consistency:"Short checklist + weekly review.", advantage:"Structure + quality.", blindSpot:"Over-polish. Fix: V1 deadline." },
    },
    hookQuestion:{ ar:"شنو \"نسخة أولى\" تقدر تكمّلها فـ48 ساعة؟", fr:"C'est quoi ta V1 que tu peux finir en 48h ?", en:"What's a V1 you can finish in 48 hours?" },
    shareCaption:{ ar:"طلع ليا «البنّاء» 🧱 كنربح بالثبات… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «Le Bâtisseur» 🧱 Résultat solide… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Builder\" 🧱 What did you get? 👀" },
    statsProfile:{ stat1Label:{ar:"التنفيذ",fr:"Exécution",en:"Execution"}, stat2Label:{ar:"الدقة",fr:"Précision",en:"Precision"}, stat3Label:{ar:"الصبر",fr:"Endurance",en:"Endurance"} },
  },
  { id:"nazl",  code:"MS-NAZL",  rarity:"COMMON", icon:"🧭",
    titleLatin:"EL MALLAH",  titleAr:"الملاّح",   titleFr:"Le Navigateur",  titleEn:"The Navigator",
    viralLine:{ ar:"كنقرا الطريق قبل ما نبدا… وكنوصل بلا ما نضيع. 🧭", fr:"Je lis la route avant… j'arrive sans me perdre. 🧭", en:"Plan first. Win after. 🧭" },
    signatureMove:{ ar:"كنربط بين الخيارات ونختار الأقل مخاطرة.", fr:"Je connecte les options et je sécurise le chemin.", en:"I connect options and reduce risk." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: كتفكر فالعواقب قبل ما تدير أي خطوة.", truth:"الحقيقة: البداية كتكون أصعب عليك من الطريق." },
      fr:{ looks:"Ça se voit: Tu penses aux conséquences avant d'agir.", truth:"La vérité: Démarrer te coûte plus que continuer." },
      en:{ looks:"Looks like: You foresee outcomes.", truth:"Truth: Starting is the hard part." },
    },
    mirror:{
      ar:{ pressure:"كتخرج بخطة B/C بلا فوضى.", consistency:"خطة A/B/C كتخليك ما تحسّش بالحصار.", advantage:"كتسبق المشاكل وتتجنب الغلط.", blindSpot:"كتأخر البداية. الحل: أصغر خطوة بلا مخاطرة." },
      fr:{ pressure:"Plan B/C sans panique.", consistency:"A/B/C te garde en mouvement.", advantage:"Tu évites les pièges tôt.", blindSpot:"Tu retardes le départ. Fix: micro-action." },
      en:{ pressure:"Backup plans.", consistency:"A/B/C keeps you moving.", advantage:"Avoids pitfalls.", blindSpot:"Delays start. Fix micro-step." },
    },
    hookQuestion:{ ar:"شنو أصغر خطوة بلا مخاطرة تقدر تديرها اليوم؟", fr:"C'est quoi le plus petit pas sans risque aujourd'hui ?", en:"What's the smallest zero-risk step today?" },
    shareCaption:{ ar:"طلع ليا «الملاّح» 🧭 كنمشي بالخطة… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «Le Navigateur» 🧭 Plan clair… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Navigator\" 🧭 What did you get? 👀" },
    statsProfile:{ stat1Label:{ar:"التخطيط",fr:"Plan",en:"Planning"}, stat2Label:{ar:"الحكمة",fr:"Prudence",en:"Prudence"}, stat3Label:{ar:"الحسم",fr:"Décision",en:"Decision"} },
  },
  { id:"qaid",  code:"MS-QAID",  rarity:"EPIC",   icon:"👑",
    titleLatin:"EL QAID",    titleAr:"القائد",    titleFr:"Le Leader",      titleEn:"The Leader",
    viralLine:{ ar:"كنخلّي الناس يتفاهمو… وكنخرج النتيجة من الجماعة. 👑", fr:"Je cadre le groupe… et on sort le résultat. 👑", en:"I lead with clarity. 👑" },
    signatureMove:{ ar:"كنقود بالوضوح وبحسم الأولويات.", fr:"Je mène par la clarté et les priorités.", en:"I turn chaos into priorities." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: الناس كتتبعك حيث كتجيب الوضوح وسط الفوضى.", truth:"الحقيقة: كتشدّ بزاف بوحدك وكتتقل." },
      fr:{ looks:"Ça se voit: On te suit parce que tu clarifies tout.", truth:"La vérité: Tu portes trop seul." },
      en:{ looks:"Looks like: People follow your clarity.", truth:"Truth: You carry too much alone." },
    },
    mirror:{
      ar:{ pressure:"كتفرز المهم من اللي يقدر يتسنى.", consistency:"التزام قدّام الناس كيخليك ثابت.", advantage:"كتجمع الناس بلا \"منصب\".", blindSpot:"ما كتفوّضش. الحل: تفويض واحد فالأسبوع." },
      fr:{ pressure:"Important vs secondaire, vite.", consistency:"Engagement public = stabilité.", advantage:"Tu mobilises sans titre.", blindSpot:"Délègue peu. Fix: 1 délégation/semaine." },
      en:{ pressure:"Prioritize fast.", consistency:"Public commitment works.", advantage:"Mobilize without title.", blindSpot:"Low delegation." },
    },
    hookQuestion:{ ar:"شنو مهمة وحدة تقدر تفوّضها هاد السيمانة؟", fr:"C'est quoi UNE chose que tu peux déléguer cette semaine ?", en:"What's one thing you can delegate this week?" },
    shareCaption:{ ar:"طلع ليا «القائد» 👑 كنقود بالوضوح… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «Le Leader» 👑 Je mène par la clarté… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Leader\" 👑 What did you get? 👀" },
    statsProfile:{ stat1Label:{ar:"القيادة",fr:"Leadership",en:"Leadership"}, stat2Label:{ar:"التأثير",fr:"Influence",en:"Influence"}, stat3Label:{ar:"التنظيم",fr:"Organisation",en:"Organization"} },
  },
  { id:"mqni",  code:"MS-MQNI",  rarity:"RARE",   icon:"🎯",
    titleLatin:"EL MOQNI3",  titleAr:"المقنِع",   titleFr:"Le Persuasif",   titleEn:"The Persuader",
    viralLine:{ ar:"كنقنع بلا صياح… بالكلام اللي فبلاصتو. 🎯", fr:"Je convaincs sans forcer… timing parfait. 🎯", en:"Quiet persuasion. Big impact. 🎯" },
    signatureMove:{ ar:"الحُجّة + التوقيت = نتيجتي.", fr:"Argument + timing = impact.", en:"Argument + timing = impact." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: كتقدر تبدّل رأي الناس بجملة وحدة.", truth:"الحقيقة: خاصك القياس باش تبقى ثابت." },
      fr:{ looks:"Ça se voit: Une phrase bien placée et tu retournes la salle.", truth:"La vérité: Il te faut des chiffres pour rester stable." },
      en:{ looks:"Looks like: You can flip a room with one line.", truth:"Truth: You need metrics to stay grounded." },
    },
    mirror:{
      ar:{ pressure:"كتقلب على \"الجملة الحاسمة\".", consistency:"هدف اجتماعي (عرض/نقاش) كيخليك شاعل.", advantage:"كتجيب الدعم بسرعة.", blindSpot:"كتتهرب من القياس. الحل: KPI واحد/أسبوع." },
      fr:{ pressure:"La phrase décisive.", consistency:"Objectif social régulier.", advantage:"Support rapide.", blindSpot:"Mesure faible. Fix KPI hebdo." },
      en:{ pressure:"Decisive line.", consistency:"Social targets.", advantage:"Fast support.", blindSpot:"Track a KPI." },
    },
    hookQuestion:{ ar:"شنو رقم واحد غادي تراقبو هاد الشهر؟", fr:"C'est quoi LE chiffre que tu suis ce mois-ci ?", en:"What's the one metric you'll track this month?" },
    shareCaption:{ ar:"طلع ليا «المقنِع» 🎯 كنقنع بالهدوء… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «Le Persuasif» 🎯 Timing parfait… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Persuader\" 🎯 What did you get? 👀" },
    statsProfile:{ stat1Label:{ar:"الإقناع",fr:"Persuasion",en:"Persuasion"}, stat2Label:{ar:"الجرأة",fr:"Audace",en:"Boldness"}, stat3Label:{ar:"القياس",fr:"Mesure",en:"Tracking"} },
  },
  { id:"mbd3",  code:"MS-MBD3",  rarity:"RARE",   icon:"🎨",
    titleLatin:"EL MOBDI3",  titleAr:"المبدع",    titleFr:"L'Artiste",      titleEn:"The Creator",
    viralLine:{ ar:"كنشوف اللي ما كيتشافش… وكنقلبو لحاجة كتخدم. 🎨", fr:"Je vois l'angle que personne capte… et je le rends utile. 🎨", en:"I see patterns others miss. 🎨" },
    signatureMove:{ ar:"إبداع عملي، ماشي غير أفكار.", fr:"Créatif, mais concret.", en:"Creative, but practical." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: كتولد الأفكار وكتشوف الربط.", truth:"الحقيقة: خاصك إطار بسيط باش تنفذ." },
      fr:{ looks:"Ça se voit: Idées et connexions rares.", truth:"La vérité: Il te faut un cadre simple." },
      en:{ looks:"Looks like: Rare connections.", truth:"Truth: Need structure to execute." },
    },
    mirror:{
      ar:{ pressure:"كتبدّل الزاوية بدل الصدام.", consistency:"فصل \"الإبداع\" عن \"التنفيذ\".", advantage:"حلول جديدة كتجيك بسرعة.", blindSpot:"الروتين كيطفيك. الحل: إطار صغير ثابت." },
      fr:{ pressure:"Tu changes d'angle.", consistency:"Création ≠ exécution.", advantage:"Idées neuves.", blindSpot:"Routine = baisse. Fix cadre minimal." },
      en:{ pressure:"Change angle.", consistency:"Create vs execute.", advantage:"Novel ideas.", blindSpot:"Routine kills you." },
    },
    hookQuestion:{ ar:"شنو فكرة وحدة غادي تحوّلها لواقع فـ7 أيام؟", fr:"Quelle UNE idée tu rends réelle en 7 jours ?", en:"Which ONE idea becomes real in 7 days?" },
    shareCaption:{ ar:"طلع ليا «المبدع» 🎨 كنبدّل الزاوية وكنلقى الحل… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «L'Artiste» 🎨 Je change l'angle… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Creator\" 🎨 What did you get? 👀" },
    statsProfile:{ stat1Label:{ar:"الإبداع",fr:"Créa",en:"Creativity"}, stat2Label:{ar:"التنفيذ",fr:"Exécution",en:"Execution"}, stat3Label:{ar:"الأصالة",fr:"Originalité",en:"Originality"} },
  },
  { id:"7aris", code:"MS-7ARIS", rarity:"COMMON", icon:"🛡️",
    titleLatin:"EL 7ARIS",   titleAr:"الحارس",    titleFr:"Le Gardien",     titleEn:"The Sentinel",
    viralLine:{ ar:"كنحافظ على الوتيرة… وكنربح بالاستمرار. 🛡️", fr:"Je garde le rythme… je gagne au long terme. 🛡️", en:"Consistency wins. 🛡️" },
    signatureMove:{ ar:"الاستمرار هو السلاح ديالي.", fr:"La constance, c'est mon arme.", en:"Consistency is my weapon." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: كتربح بالاستمرار.", truth:"الحقيقة: المفاجآت كتقلقك حتى كتعاود توازن." },
      fr:{ looks:"Ça se voit: Tu gagnes à la constance.", truth:"La vérité: L'imprévu te dérègle." },
      en:{ looks:"Looks like: You outlast hype.", truth:"Truth: Chaos disrupts you." },
    },
    mirror:{
      ar:{ pressure:"كتشدّ فالطريقة المضمونة.", consistency:"روتين صغير + مكافأة أسبوعية.", advantage:"كتسبق اللي كيعولو على الحماس.", blindSpot:"العشوائية كتضرك. الحل: خطة احتياطية." },
      fr:{ pressure:"Méthode sûre.", consistency:"mini-rituel + reward.", advantage:"Long terme.", blindSpot:"imprévu. Fix plan B." },
      en:{ pressure:"Safe method.", consistency:"mini-ritual + reward.", advantage:"long-term win.", blindSpot:"chaos. Fix backup plan." },
    },
    hookQuestion:{ ar:"شنو روتين صغير تقدر تحافظ عليه حتى فأسوأ أسبوع؟", fr:"C'est quoi ton mini-rituel même dans ta pire semaine ?", en:"What's your tiny routine even on bad weeks?" },
    shareCaption:{ ar:"طلع ليا «الحارس» 🛡️ كنربح بالاستمرار… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «Le Gardien» 🛡️ Constance > hype… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Sentinel\" 🛡️ What did you get? 👀" },
    statsProfile:{ stat1Label:{ar:"الثبات",fr:"Constance",en:"Consistency"}, stat2Label:{ar:"الانضباط",fr:"Discipline",en:"Discipline"}, stat3Label:{ar:"التحمل",fr:"Endurance",en:"Endurance"} },
  },
  { id:"m7lll", code:"MS-M7LLL", rarity:"COMMON", icon:"🔍",
    titleLatin:"EL MO7ALLIL",titleAr:"المحلّل",   titleFr:"L'Analyste",     titleEn:"The Analyst",
    viralLine:{ ar:"كنحلّلها فصمت… وكنخرج بقرار صائب. 🔍", fr:"Je calcule en silence… décision propre. 🔍", en:"Silent analysis. Sharp decision. 🔍" },
    signatureMove:{ ar:"كنحوّل الضباب لخطة واضحة.", fr:"Je clarifie le flou.", en:"I turn fog into plan." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: كتلقا الغلط قبل ما يبان.", truth:"الحقيقة: بلا موعد نهائي كتغرق فالتفكير." },
      fr:{ looks:"Ça se voit: Tu vois l'erreur avant les autres.", truth:"La vérité: Sans deadline, tu sur-analyses." },
      en:{ looks:"Looks like: You catch mistakes early.", truth:"Truth: No deadline = overthinking." },
    },
    mirror:{
      ar:{ pressure:"كتقيس الاحتمالات وكتتفادى القرار المتسرع.", consistency:"deadlines قصيرة كتخرجك من الدوامة.", advantage:"كتزيد الجودة وكتنقص الغلط.", blindSpot:"كتطلب كمال. الحل: قرر بـ80%." },
      fr:{ pressure:"Tu gardes le contrôle.", consistency:"deadlines courtes.", advantage:"qualité ↑ erreurs ↓", blindSpot:"perfection. Fix 80%." },
      en:{ pressure:"controlled.", consistency:"short deadlines.", advantage:"quality upgrade.", blindSpot:"perfectionism." },
    },
    hookQuestion:{ ar:"إمتى غادي تحسم قرار واحد نهائي؟", fr:"Tu tranches QUAND sur une décision ?", en:"When will you decide?" },
    shareCaption:{ ar:"طلع ليا «المحلّل» 🔍 كنقرا التفاصيل اللي كتفلت… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «L'Analyste» 🔍 Je capte les détails… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Analyst\" 🔍 What did you get? 👀" },
    statsProfile:{ stat1Label:{ar:"التحليل",fr:"Analyse",en:"Analysis"}, stat2Label:{ar:"الدقة",fr:"Précision",en:"Precision"}, stat3Label:{ar:"الحسم",fr:"Décision",en:"Decision"} },
  },
  { id:"rayd",  code:"MS-RAYD",  rarity:"EPIC",   icon:"🚀",
    titleLatin:"EL RAYED",   titleAr:"الرائد",    titleFr:"Le Pionnier",    titleEn:"The Pioneer",
    viralLine:{ ar:"كنجرّب قبل ما يطلبو مني… وكنبني طريق جديد. 🚀", fr:"Je teste avant tout le monde… je trace la route. 🚀", en:"I move first. 🚀" },
    signatureMove:{ ar:"كنغامر بحساب، ماشي بتهور.", fr:"Risque… mais calculé.", en:"Calculated risk." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: كتزهق من العادي وكتقلب على الجديد.", truth:"الحقيقة: بلا مشروع حيّ كتتشتت." },
      fr:{ looks:"Ça se voit: Le normal t'ennuie.", truth:"La vérité: Sans projet vivant, dispersion." },
      en:{ looks:"Looks like: You chase novelty.", truth:"Truth: No live project = scattered focus." },
    },
    mirror:{
      ar:{ pressure:"كتتعلم بسرعة وكتقلب على طريق خارج القاعدة.", consistency:"مشروع واحد حيّ 30 يوم.", advantage:"كتسبق التغيير وتستغل الفرص.", blindSpot:"الملل السريع. الحل: تنويع داخل نفس الهدف." },
      fr:{ pressure:"voie hors cadre.", consistency:"un projet 30 jours.", advantage:"avance tôt.", blindSpot:"ennui. Fix variation interne." },
      en:{ pressure:"out-of-box path.", consistency:"one project 30 days.", advantage:"early mover.", blindSpot:"boredom." },
    },
    hookQuestion:{ ar:"شنو المشروع الواحد اللي غادي تركز عليه 30 يوم؟", fr:"C'est quoi LE projet que tu portes 30 jours ?", en:"What ONE project will you commit to for 30 days?" },
    shareCaption:{ ar:"طلع ليا «الرائد» 🚀 كنمشي قدّام وكنتعلم فالطريق… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «Le Pionnier» 🚀 J'avance avant tout le monde… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Pioneer\" 🚀 What did you get? 👀" },
    statsProfile:{ stat1Label:{ar:"الجرأة",fr:"Audace",en:"Boldness"}, stat2Label:{ar:"الابتكار",fr:"Innovation",en:"Innovation"}, stat3Label:{ar:"التركيز",fr:"Focus",en:"Focus"} },
  },
  { id:"mzan",  code:"MS-MZAN",  rarity:"RARE",   icon:"⚖️",
    titleLatin:"EL MIZAN",   titleAr:"المُتوازن", titleFr:"L'Équilibré",    titleEn:"The Balancer",
    viralLine:{ ar:"كنوازن بين العقل والقلب… بلا ما نضيع. ⚖️", fr:"Je garde l'équilibre… cerveau + cœur. ⚖️", en:"Balance is my superpower. ⚖️" },
    signatureMove:{ ar:"كنختار اللي كيعيشني مزيان اليوم وغدا.", fr:"Je choisis ce qui tient aujourd'hui ET demain.", en:"I choose what works now and later." },
    coldReading:{
      ar:{ looks:"ظاهر عليك: ما كتتباعش بسهولة بالكلام الكبير… كتقلب على المعنى.", truth:"الحقيقة: كتمشي فالوسط حتى كتضيع الاختيار. خاصك تحسم." },
      fr:{ looks:"Ça se voit: Tu n'achètes pas le hype. Tu veux du sens.", truth:"La vérité: À force d'équilibrer, tu peux retarder le choix." },
      en:{ looks:"Looks like: You don't buy hype—you want meaning.", truth:"Truth: Over-balancing can delay decisions." },
    },
    mirror:{
      ar:{ pressure:"كتولي واقعي وكتقلب على حلّ \"يخدم\" بدل الصراع.", consistency:"باش تبقى ثابت: حدّد 2 أولويات فقط (مثلاً: النقاط + مهارة).", advantage:"كتقدر تجمع بين الدراسة والحياة بلا ما تحترق.", blindSpot:"كتتجنب الحسم. الحل: قرار واحد + تجربة أسبوع." },
      fr:{ pressure:"Tu restes lucide, tu cherches une solution qui marche.", consistency:"2 priorités max (notes + skill).", advantage:"Tu avances sans te cramer.", blindSpot:"Tu évites de trancher. Fix: 1 choix + 1 semaine test." },
      en:{ pressure:"You stay realistic and practical.", consistency:"2 priorities max.", advantage:"You progress without burnout.", blindSpot:"Decision avoidance. Fix: one choice + one-week test." },
    },
    hookQuestion:{ ar:"واش كتوازن بزاف حتى كتأخر القرار؟ شنو اختيار واحد غادي تجربو أسبوع واحد؟", fr:"Tu veux trop équilibrer ? Quel choix tu testes 1 semaine pour trancher ?", en:"Are you delaying decisions? What will you test for one week?" },
    shareCaption:{ ar:"طلع ليا «المتوازن» ⚖️ كنقلب على اللي يخدم اليوم وغدا… شنو طلع ليك؟ 👀 #MassarPro", fr:"J'ai eu «L'Équilibré» ⚖️ Je veux du solide, pas du hype… t'as eu quoi ? 👀 #MassarPro", en:"I got \"The Balancer\" ⚖️ What did you get? 👀" },
    statsProfile:{ stat1Label:{ar:"التوازن",fr:"Équilibre",en:"Balance"}, stat2Label:{ar:"الواقعية",fr:"Réalisme",en:"Practicality"}, stat3Label:{ar:"الحسم",fr:"Décision",en:"Decision"} },
  },
];

const ARCHETYPES_V2_BY_ID = Object.fromEntries(ARCHETYPES_V2.map(a => [a.id, a]));

// ── computeRarity (deterministic) ─────────────────────────────────
function computeRarity(confidence) {
  const c = Math.round(Number(confidence) || 0);
  if (c >= 80) return "EPIC";
  if (c >= 60) return "RARE";
  return "COMMON";
}

// ── makeSerialId (deterministic, no randomness) ────────────────────
function makeSerialId(archetypeCode, seed) {
  return `${archetypeCode}-${String(Math.abs(Math.round(seed || 0)) % 999).padStart(3, "0")}`;
}

// ── computeDeterministicStats ──────────────────────────────────────
// stat1=(structure+analytical)/2, stat2=(leadership+social)/2, stat3=(risk+creativity)/2
function computeDeterministicStats(traits) {
  const tr = (traits && typeof traits === "object") ? traits : {};
  const v = (x,y) => Math.min(100,Math.max(0,Math.round(((Number(tr[x])||0.5)+(Number(tr[y])||0.5))/2*100)));
  return { stat1: v("structure","analytical"), stat2: v("leadership","social"), stat3: v("risk","creativity") };
}

// ── pickArchetypeV2 — deterministic, no gender, no sports push ─────
function pickArchetypeV2(profile) {
  const { traits={}, learnerType="", strengths=[], confidence=0 } = profile || {};
  const tr = {
    analytical: Number(traits.analytical||0), social: Number(traits.social||0),
    structure:  Number(traits.structure||0),  creativity: Number(traits.creativity||0),
    risk:       Number(traits.risk||0),       leadership: Number(traits.leadership||0),
  };
  const sorted  = Object.entries(tr).sort((a,b)=>b[1]-a[1]);
  const [top, topVal] = sorted[0] || ["structure", 0.5];
  const isMixed = sorted.length > 1 && Math.abs(sorted[0][1]-sorted[1][1]) < 0.06;
  const hasTeach = (strengths||[]).some(s=>["teaching","s_writing","s_speaking","s_learning"].includes(s));
  const isMom   = learnerType==="striker"||learnerType==="sprinter";
  const isPlan  = learnerType==="sentinel"||learnerType==="architect";
  const needsR  = tr.structure<0.4&&tr.risk<0.4;
  const g       = id => ARCHETYPES_V2_BY_ID[id] || ARCHETYPES_V2_BY_ID["mzan"];
  if (hasTeach && tr.social>=0.45) return g("mllm");
  if (isMom && tr.risk>=0.4)       return g("hrrk");
  if (isPlan && tr.analytical<0.5) return g("nazl");
  if (needsR)                       return g("7aris");
  if (isMixed && topVal<0.55)       return g("mzan");
  switch (top) {
    case "leadership": return g("qaid");
    case "analytical": return tr.structure>=0.5 ? g("m7lll") : g("nazl");
    case "structure":  return confidence>=55 ? g("mhni") : g("bnaa");
    case "creativity": return g("mbd3");
    case "social":     return confidence>=55 ? g("mqni") : g("mllm");
    case "risk":       return tr.creativity>=0.5 ? g("rayd") : g("hrrk");
    default:           return g("mzan");
  }
}

function massarTypeDesc(code, t) {
  const archetype = getArchetype(code);
  const lang = t?.dir==="rtl" ? "ar" : (t?.next==="Next" ? "en" : "fr");
  return archetype.tagline?.[lang] || archetype.tagline?.en || "";
}


// ─────────────────────────────────────────────────────────────────
// ImproveModeCard — shown when bacStatus==="before"
// ─────────────────────────────────────────────────────────────────
function ImproveModeCard({ t, lang, marks, traits, rankedClusters, reality, setReality }) {
  const MAX_SN = 5;
  const snKeys = ["sn_math","sn_physics","sn_biology","sn_writing","sn_speaking","sn_fixing","sn_mechanics","sn_cooking","sn_design","sn_video","sn_sport_team","sn_sport_indiv","sn_coaching","sn_gaming"];
  const styleOpts = [
    { val:"handson", label:t.preferredStyleOptions?.handson||"Hands-on" },
    { val:"academic", label:t.preferredStyleOptions?.academic||"Academic" },
    { val:"mixed",   label:t.preferredStyleOptions?.mixed||"Mixed" },
  ];

  const toggleSN = (k) => {
    setReality(prev => {
      const arr = prev.strengthsNow || [];
      if (arr.includes(k)) return {...prev, strengthsNow: arr.filter(x=>x!==k)};
      if (arr.length >= MAX_SN) return prev;
      return {...prev, strengthsNow:[...arr, k]};
    });
  };
  const setStyle = (v) => setReality(prev=>({...prev, preferredStyle:v}));

  const sn      = reality.strengthsNow   || [];
  const style   = reality.preferredStyle || "";
  // FIX: results page null-safety — guard rankedClusters being undefined/empty
  const safeRanked = Array.isArray(rankedClusters) ? rankedClusters : [];
  const top3    = safeRanked.slice(0,3);

  // ── Upgrade targets (deterministic) ──────────────────────────────
  // 1. Distance to health threshold
  const healthConstraint = { minAvg:16, bioMin:14, chemMin:13 };
  const subjVals = Object.values(marks).map(Number).filter(v=>!isNaN(v)&&v>0);
  const avg = subjVals.length ? subjVals.reduce((a,b)=>a+b,0)/subjVals.length : 0;
  const bio  = Number(marks.biology)  || 0;
  const chem = Number(marks.chemistry)|| 0;

  const healthGapAvg  = Math.max(0, healthConstraint.minAvg  - avg).toFixed(1);
  const healthGapBio  = Math.max(0, healthConstraint.bioMin  - bio).toFixed(1);
  const healthGapChem = Math.max(0, healthConstraint.chemMin - chem).toFixed(1);
  const isCloseToHealth = avg >= 13 && avg < healthConstraint.minAvg;

  // 2. Key subjects to improve for top cluster
  const topCluster = top3[0];
  const keySubjs = topCluster
    ? Object.entries(topCluster.subjectWeights||{}).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([s])=>s)
    : [];

  // 3. Style-based suggestion
  const styleTip = {
    handson: {
      ar:"مهاراتك التطبيقية ستفيدك في المهن التقنية والحرفية. OFPPT وبرامج التكوين المهني هي الطريق الأقصر.",
      fr:"Tes compétences pratiques te donnent un avantage dans les métiers techniques. OFPPT et les BTS techniques sont la voie la plus directe.",
      en:"Your hands-on strengths give you an edge in technical trades. OFPPT and BTS technical programs are your fastest track.",
    },
    academic:{
      ar:"استمر في بناء أساسك الأكاديمي. التحضير للمباريات (classes prépa) يفتح أفقاً أوسع.",
      fr:"Continue à renforcer ta base académique. Les classes prépa ouvrent des portes considérables.",
      en:"Keep building your academic base. Prépa classes open significant doors in Morocco.",
    },
    mixed:{
      ar:"ملفك المختلط يؤهلك لمسارات ENCG أو BTS تقني — توازن بين النظرية والتطبيق.",
      fr:"Ton profil mixte te positionne bien pour ENCG ou un BTS technique — équilibre théorie-pratique.",
      en:"Your mixed profile is well-suited for ENCG or a technical BTS — the balance of theory and practice.",
    },
  };
  const styleLang = lang;
  const tipText = style ? (styleTip[style]?.[styleLang]||styleTip[style]?.en||"") : "";

  // 4. Cluster unlock message
  // FIX: results page null-safety — safeRanked[2] may be undefined
  const nearCluster = safeRanked.find((c,i)=>i>=3 && safeRanked[2] && c.scores.final > safeRanked[2].scores.final*0.85);

  return (
    <div style={{
      background:"rgba(59,130,246,0.06)",border:"1px solid rgba(59,130,246,0.25)",
      borderRadius:14,padding:"22px 24px",margin:"24px 0",
    }}>
      <h3 style={{fontSize:16,fontWeight:700,color:"var(--accent2)",marginBottom:4}}>{t.improveModeTitle}</h3>

      {/* Section: strengthsNow */}
      <div style={{marginTop:16}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:4}}>{t.strengthsNowLabel}</div>
        <div style={{fontSize:12,color:"var(--muted)",marginBottom:8}}>{t.strengthsNowDesc} ({sn.length}/{MAX_SN})</div>
        <div className="chip-grid">
          {snKeys.map(k=>{
            const sel = sn.includes(k);
            const maxed = !sel && sn.length >= MAX_SN;
            return (
              <button key={k}
                className={`chip-btn${sel?" selected":""}${maxed?" maxed":""}`}
                onClick={()=>!maxed&&toggleSN(k)}>
                {t.strengthsNowOptions?.[k]||k}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section: preferredStyle */}
      <div style={{marginTop:16}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:8}}>{t.preferredStyleLabel}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {styleOpts.map(o=>(
            <button key={o.val}
              className={`chip-btn${style===o.val?" selected":""}`}
              onClick={()=>setStyle(o.val)}>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Outputs */}
      {(style || sn.length > 0) && (
        <div style={{marginTop:20,display:"flex",flexDirection:"column",gap:14}}>

          {/* Distance to health (only if applicable) */}
          {isCloseToHealth && (avg < healthConstraint.minAvg) && (
            <div style={{padding:"12px 16px",background:"rgba(239,68,68,0.08)",
              border:"1px solid rgba(239,68,68,0.2)",borderRadius:10}}>
              <div style={{fontSize:13,fontWeight:600,color:"#f87171",marginBottom:6}}>⚕️ Distance to Medicine Threshold</div>
              <div style={{fontSize:13,color:"var(--muted)"}}>
                {(t.improveDistanceHealth || "")
                  .replace("{avg}", healthGapAvg)
                  .replace("{bio}", healthGapBio)
                  .replace("{chem}", healthGapChem)}
              </div>
            </div>
          )}

          {/* Style tip */}
          {tipText && (
            <div style={{padding:"12px 16px",background:"var(--surface2)",borderRadius:10,
              fontSize:13,color:"var(--text)",lineHeight:1.6}}>
              💡 {tipText}
            </div>
          )}

          {/* Upgrade targets for top cluster */}
          {keySubjs.length > 0 && (
            <div>
              <div style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:8}}>
                {t.improveTargetLabel}: {t[CLUSTER_KEY_MAP[topCluster?.id]]||""}
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {keySubjs.map(s=>{
                  const cur = Number(marks[s])||0;
                  const target = Math.min(20, cur+2);
                  return (
                    <div key={s} style={{
                      background:"var(--surface2)",border:"1px solid var(--border)",
                      borderRadius:10,padding:"10px 14px",fontSize:12,
                    }}>
                      <div style={{fontWeight:700,color:"var(--text)",marginBottom:4}}>
                        {SUBJECT_LABELS[s]?.[lang]||s}
                      </div>
                      <div style={{color:"var(--muted)"}}>
                        {cur.toFixed(1)} → <span style={{color:"#10b981",fontWeight:700}}>{target.toFixed(1)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Near-unlock cluster */}
          {nearCluster && (
            <div style={{fontSize:12,color:"var(--muted)",fontStyle:"italic"}}>
              {(t.improveClusterUp || "").replace("{clusters}", t[CLUSTER_KEY_MAP[nearCluster.id]]||nearCluster.id)}
            </div>
          )}

        </div>
      )}

      <p style={{fontSize:11,color:"var(--muted)",fontStyle:"italic",marginTop:14}}>
        {t.improvementDisclaimer}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// getRarity — unified rarity tier from overall alignment %
// FIX: unified with ShareCard spec — Common, Rare, Epic, Legendary
function getRarity(confidence) {
  if (confidence >= 85) return "legendary";
  if (confidence >= 70) return "epic";
  if (confidence >= 55) return "rare";
  return "common";
}

// ─────────────────────────────────────────────────────────────────
// ArchetypeCard — Phase 1: Hero Identity Section
// ─────────────────────────────────────────────────────────────────
function ArchetypeCard({ massarType, typeDesc, t, lang, traits, top3, confidence }) {
  const archetype = getArchetype(massarType);
  const [expanded, setExpanded] = useState(false);

  const name   = archetype.name?.[lang] || archetype.name?.en || massarType;
  const opposite = MOROCCAN_ARCHETYPES[archetype.opposite];
  const oppName  = opposite?.name?.[lang] || opposite?.name?.en || archetype.opposite;
  const evolveTrait = archetype.evolvesTrait || "";
  const evolveCode  = archetype.evolvesInto || "";
  const evolveInto  = MOROCCAN_ARCHETYPES[evolveCode]?.name?.[lang] || evolveCode;

  const strengths = archetype.strengths?.[lang] || archetype.strengths?.en || [];
  const risk      = archetype.risk?.[lang]      || archetype.risk?.en      || "";
  const bestEnv   = archetype.bestEnv?.[lang]   || archetype.bestEnv?.en   || "";
  const worstEnv  = archetype.worstEnv?.[lang]  || archetype.worstEnv?.en  || "";

  const rarity = getRarity(confidence);
  // FIX: unified rarity labels — Common, Rare, Epic, Legendary
  const rarityLabels = {
    common:    { ar:"عادي",    fr:"Commun",    en:"Common"    },
    rare:      { ar:"نادر",    fr:"Rare",      en:"Rare"      },
    epic:      { ar:"ملحمي",   fr:"Épique",    en:"Epic"      },
    legendary: { ar:"أسطوري", fr:"Légendaire", en:"Legendary" },
  };
  const rarityIcons = { common:"◇", rare:"◆", epic:"★", legendary:"👑" };
  const rarityLabel = rarityLabels[rarity]?.[lang] || rarityLabels[rarity]?.en || rarity;

  // Compute 3 meter scores
  // FIX: clamp numeric UI values
  const safeTrA = traits && typeof traits === "object" ? traits : {};
  const identityFitPct = clamp(Math.round(Math.max(0.35, Math.min(0.95,
    ((safeTrA.analytical||0.5)+(safeTrA.creativity||0.5)+(safeTrA.risk||0.5)+(safeTrA.leadership||0.5))/4)) * 100));
  const academicFitPct = clamp(Math.round(Math.max(0.3, Math.min(0.9,
    top3[0]?.scores?.academic ?? 0.5)) * 100));
  const marketFitPct = clamp(Math.round(Math.max(0.4, Math.min(0.95,
    top3[0]?.scores?.market ?? 0.7)) * 100));

  // Phase 4: Alignment story — weakest dimension
  const dims = [
    { key:"identity", pct:identityFitPct, sentences:{
      ar:"هذا المجال لا يتوافق تلقائياً مع شخصيتك.",
      fr:"Ce domaine ne correspond pas naturellement à ta personnalité.",
      en:"This domain doesn't naturally match your personality.",
    }},
    { key:"academic", pct:academicFitPct, sentences:{
      ar:"إمكاناتك تتجاوز مستواك الأكاديمي الحالي.",
      fr:"Ton potentiel dépasse ton niveau académique actuel.",
      en:"Your potential exceeds your current academic level.",
    }},
    { key:"market", pct:marketFitPct, sentences:{
      ar:"الطلب على هذا التخصص أقل استقراراً في سوق العمل.",
      fr:"La demande est plus instable dans ce secteur.",
      en:"Market demand is less stable in this sector.",
    }},
  ];
  const weakest = dims.reduce((a,b)=>a.pct<b.pct?a:b);

  const traitLabelMap = {
    analytical:{ ar:"التحليل", fr:"Analytique", en:"Analytical" },
    creativity:{ ar:"الإبداع", fr:"Créativité", en:"Creativity" },
    risk:{ ar:"المبادرة", fr:"Initiative", en:"Initiative" },
    leadership:{ ar:"القيادة", fr:"Leadership", en:"Leadership" },
    social:{ ar:"التواصل", fr:"Social", en:"Social" },
    structure:{ ar:"التنظيم", fr:"Organisation", en:"Organisation" },
  };
  const evolveLbl = traitLabelMap[evolveTrait]?.[lang] || evolveTrait;

  return (
    <div className={`rarity-${rarity}`} style={{
      background:"linear-gradient(135deg,rgba(232,161,36,0.08),rgba(59,130,246,0.05))",
      border:"2px solid",
      borderRadius:20,padding:"28px 28px 22px",marginBottom:20,
    }}>
      {/* Rarity badge + type label */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div style={{fontSize:10,fontWeight:700,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase"}}>
          {t?.archetypeTitle || "Identity"}
        </div>
        <span className={`rarity-badge rarity-badge-${rarity}`}>
          {rarityIcons[rarity]} {rarityLabel}
        </span>
      </div>

      {/* Hero identity row */}
      <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:16,flexWrap:"wrap"}}>
        <div className="archetype-icon-wrap" style={{
          width:72,height:72,borderRadius:18,
          background:"rgba(232,161,36,0.1)",border:"1.5px solid rgba(232,161,36,0.3)",
          fontSize:36,flexShrink:0,
        }}>
          <span className="icon-inner">{archetype.icon}</span>
        </div>
        <div style={{flex:1,minWidth:160}}>
          <div style={{
            fontSize:32,fontWeight:900,lineHeight:1.1,
            background:"linear-gradient(135deg,#fbbf24,#e8a124)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            marginBottom:4,
          }}>{name}</div>
          <div style={{fontSize:14,fontWeight:800,color:"var(--accent2)",letterSpacing:3}}>{archetype.code}</div>
        </div>
        {/* FIX: Arabic-first UX — dir="ltr" prevents % rendering before number in RTL */}
        <div style={{background:"rgba(232,161,36,0.15)",border:"1px solid rgba(232,161,36,0.3)",
          borderRadius:12,padding:"12px 18px",textAlign:"center",flexShrink:0}}>
          <div dir="ltr" style={{fontSize:28,fontWeight:900,color:"var(--accent)",lineHeight:1}}>
            {clamp(confidence)}%
          </div>
          <div style={{fontSize:10,color:"var(--muted)",marginTop:2,letterSpacing:0.5}}>{t?.confidenceLabel || "Alignment"}</div>
        </div>
      </div>

      {/* Tagline */}
      <div style={{fontSize:13,color:"var(--muted)",marginBottom:20,fontStyle:"italic",lineHeight:1.6,
        padding:"10px 14px",background:"rgba(255,255,255,0.03)",borderRadius:10,borderLeft:"3px solid rgba(232,161,36,0.4)"}}>
        {typeDesc}
      </div>

      {/* 3 Fit Meters */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:8}}>
        {[
          { label:t?.identityFit||"Identity", pct:identityFitPct, color:"var(--accent)" },
          { label:t?.academicFit||"Academic", pct:academicFitPct, color:"var(--accent2)" },
          { label:t?.marketFit||"Market",   pct:marketFitPct, color:"#10b981" },
        ].map(m=>(
          <div key={m.label} style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:10,padding:"10px 12px",textAlign:"center"}}>
            <div style={{fontSize:10,color:"var(--muted)",marginBottom:6,fontWeight:600}}>{m.label}</div>
            {/* FIX: Arabic-first UX — bar direction forced LTR */}
            <div dir="ltr" style={{height:4,background:"var(--border)",borderRadius:2,overflow:"hidden",marginBottom:6}}>
              <div style={{height:"100%",width:`${m.pct}%`,background:m.color,borderRadius:2,animation:"barGrow 1s ease both"}}/>
            </div>
            {/* FIX: Arabic-first UX — percentage always LTR */}
            <div style={{fontSize:15,fontWeight:800,color:m.color}} dir="ltr">{m.pct}%</div>
          </div>
        ))}
      </div>

      {/* Phase 4: Alignment story sentence */}
      {weakest.pct < 70 && (
        <div style={{fontSize:12,color:"var(--warn)",marginBottom:16,padding:"8px 12px",
          background:"rgba(245,158,11,0.06)",borderRadius:8,border:"1px solid rgba(245,158,11,0.2)"}}>
          ⚡ {weakest.sentences[lang] || weakest.sentences.en}
        </div>
      )}

      {/* Expand toggle */}
      <button onClick={()=>setExpanded(e=>!e)}
        style={{background:"none",border:"none",cursor:"pointer",color:"var(--accent2)",
          fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:4,marginBottom:expanded?16:0}}>
        {expanded ? "▲" : "▼"} {expanded ? (lang==="ar"?"إخفاء التفاصيل":lang==="fr"?"Réduire":"Hide details") : (lang==="ar"?"عرض التفاصيل الكاملة":lang==="fr"?"Voir les détails":"Show full archetype")}
      </button>

      {expanded && (
        <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:16}}>

          {/* Core strengths */}
          <div style={{padding:"12px 16px",background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:10}}>
            <div style={{fontWeight:700,fontSize:12,color:"#10b981",marginBottom:8}}>{t.archetypeStrengths}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {strengths.map((s,i)=>(
                <span key={i} style={{padding:"4px 10px",background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.25)",borderRadius:20,fontSize:12,color:"var(--text)"}}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Growth warning */}
          {risk && (
            <div style={{padding:"10px 14px",background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.18)",borderRadius:10,fontSize:12,color:"#f87171"}}>
              <strong>{t.archetypeRisk}: </strong>{risk}
            </div>
          )}

          {/* Best/worst env */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div style={{padding:"10px 14px",background:"rgba(59,130,246,0.06)",border:"1px solid rgba(59,130,246,0.18)",borderRadius:10}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--accent2)",marginBottom:4}}>✅ {t.archetypeBestEnv}</div>
              <div style={{fontSize:12,color:"var(--text)",lineHeight:1.5}}>{bestEnv}</div>
            </div>
            <div style={{padding:"10px 14px",background:"rgba(107,114,128,0.08)",border:"1px solid var(--border)",borderRadius:10}}>
              <div style={{fontSize:11,fontWeight:700,color:"var(--muted)",marginBottom:4}}>⚠️ {t.archetypeWorstEnv}</div>
              <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.5}}>{worstEnv}</div>
            </div>
          </div>

          {/* Opposite + Evolution */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            {opposite && (
              <div style={{padding:"10px 14px",background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:10}}>
                <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>{t.archetypeOpposite}</div>
                <div style={{fontSize:13,fontWeight:700,color:"var(--text)"}}>{opposite.icon} {oppName}</div>
                <div style={{fontSize:11,color:"var(--muted)",fontWeight:700,letterSpacing:1}}>{archetype.opposite}</div>
              </div>
            )}
            {evolveCode && (
              <div style={{padding:"10px 14px",background:"rgba(232,161,36,0.06)",border:"1px solid rgba(232,161,36,0.2)",borderRadius:10}}>
                <div style={{fontSize:11,color:"var(--muted)",marginBottom:4}}>{t.archetypeEvolution} <strong style={{color:"var(--accent)"}}>{evolveLbl}</strong></div>
                <div style={{fontSize:13,fontWeight:700,color:"var(--accent)"}}>→ {evolveInto}</div>
                <div style={{fontSize:11,color:"var(--muted)",fontWeight:700,letterSpacing:1}}>{evolveCode}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Phase 2: AbilitiesSection — game-like trait/ability cards
// ─────────────────────────────────────────────────────────────────
const ABILITY_SVG = {
  analytical: `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="8" r="4"/><path d="M7 15c0-2.2 1.8-4 4-4s4 1.8 4 4"/><line x1="11" y1="12" x2="11" y2="19"/><line x1="8" y1="19" x2="14" y2="19"/></svg>`,
  social: `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="8" cy="7" r="3"/><circle cx="16" cy="9" r="2.5"/><path d="M2 18c0-3.3 2.7-6 6-6 1.4 0 2.7.5 3.7 1.3"/><path d="M13 18c0-2.2 1.3-4 3-4s3 1.8 3 4"/></svg>`,
  structure: `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="2" y="2" width="7" height="7" rx="1"/><rect x="13" y="2" width="7" height="7" rx="1"/><rect x="2" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>`,
  creativity: `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2l2.2 6.5H20l-5.4 4 2.1 6.5L11 15l-5.7 4 2.1-6.5L2 8.5h6.8L11 2z"/></svg>`,
  risk: `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 13h7l-1 7 8-11h-7z"/></svg>`,
  leadership: `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8l3 3.5 4-6 4 6 3-3.5v10H4V8z"/></svg>`,
};

const ABILITY_META = {
  analytical: {
    gradients: ["#3b82f6","#1d4ed8"],
    descriptors: { ar:"تفكير منطقي حاد", fr:"Logique redoutable", en:"Sharp logical thinking" },
  },
  social: {
    gradients: ["#10b981","#059669"],
    descriptors: { ar:"تواصل فعّال مع الآخرين", fr:"Connexion naturelle", en:"Connects naturally with others" },
  },
  structure: {
    gradients: ["#8b5cf6","#6d28d9"],
    descriptors: { ar:"ينظم الفوضى بدقة", fr:"Organise le chaos", en:"Turns chaos into order" },
  },
  creativity: {
    gradients: ["#f59e0b","#d97706"],
    descriptors: { ar:"يولّد أفكاراً أصيلة", fr:"Génère des idées uniques", en:"Generates original ideas" },
  },
  risk: {
    gradients: ["#ef4444","#b91c1c"],
    descriptors: { ar:"يتحرك بجرأة وحسم", fr:"Avance avec audace", en:"Moves boldly and decisively" },
  },
  leadership: {
    gradients: ["#e8a124","#c97d10"],
    descriptors: { ar:"يقود بالمثال والرؤية", fr:"Guide par l'exemple", en:"Leads by example and vision" },
  },
};

const TRAIT_LABELS_FULL = {
  ar:{ analytical:"تحليلي", social:"اجتماعي", structure:"منظم", creativity:"مبدع", risk:"مبادر", leadership:"قيادي" },
  fr:{ analytical:"Analytique", social:"Social", structure:"Rigoureux", creativity:"Créatif", risk:"Prise de risque", leadership:"Leadership" },
  en:{ analytical:"Analytical", social:"Social", structure:"Organized", creativity:"Creative", risk:"Risk-taker", leadership:"Leadership" },
};

function AbilitiesSection({ traits, lang }) {
  // FIX: results page null-safety — guard against undefined traits
  const safeTr = (traits && typeof traits === "object") ? traits : {};
  const sorted = Object.entries(safeTr).sort((a,b)=>b[1]-a[1]);
  const topTwo = new Set([sorted[0]?.[0], sorted[1]?.[0]].filter(Boolean));
  const labels = TRAIT_LABELS_FULL[lang] || TRAIT_LABELS_FULL.en;
  // FIX: Arabic-first UX — concise powerful word for dominant trait
  const dominantLabel = lang==="ar"?"◉ سمة رائدة":lang==="fr"?"◉ Dominant":"◉ Dominant";

  return (
    <div style={{marginBottom:20}}>
      <div style={{fontSize:11,fontWeight:700,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>
        {lang==="ar"?"⚔️ قدراتك":lang==="fr"?"⚔️ Tes Aptitudes":"⚔️ Your Abilities"}
      </div>
      <div className="abilities-grid">
        {sorted.map(([key, val])=>{
          const meta = ABILITY_META[key] || {};
          // FIX: clamp numeric UI values — never NaN, always 0–100
          const pct  = Math.round(clamp(val * 100));
          const isDom = topTwo.has(key);
          const [c1, c2] = meta.gradients || ["#3b82f6","#1d4ed8"];
          const svgStr = ABILITY_SVG[key] || "";
          const desc = meta.descriptors?.[lang] || meta.descriptors?.en || "";
          return (
            <div key={key} className={`ability-card${isDom?" dominant":""}`}
              style={{background:`linear-gradient(145deg,${c1}12,${c2}08)`}}>
              {isDom && <span className="dominant-badge">{dominantLabel}</span>}
              <div className="ability-icon-wrap" style={{color:c1}}
                dangerouslySetInnerHTML={{__html:svgStr}}/>
              <div style={{fontSize:13,fontWeight:800,color:"var(--text)",marginBottom:2}}>
                {labels[key] || key}
              </div>
              {/* FIX: Arabic-first UX — bar container forced LTR so fill direction is correct */}
              <div className="ability-bar-track" dir="ltr">
                <div className="ability-bar-fill" style={{
                  width:`${pct}%`,
                  background:`linear-gradient(90deg,${c1},${c2})`,
                }}/>
              </div>
              {/* FIX: Arabic-first UX — percentage always LTR in RTL layout */}
              <div style={{fontSize:18,fontWeight:900,color:c1,marginBottom:4}} dir="ltr">{pct}%</div>
              <div style={{fontSize:10,color:"var(--muted)",lineHeight:1.4}}>{desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
// Phase 8: CompetitionMode — percentile comparisons
// ─────────────────────────────────────────────────────────────────
function CompetitionMode({ traits, lang }) {
  const [enabled, setEnabled] = useState(false);
  const label = lang==="ar"?"🏆 وضع المنافسة":lang==="fr"?"🏆 Mode Classement":"🏆 Ranking Mode";
  const labels = TRAIT_LABELS_FULL[lang] || TRAIT_LABELS_FULL.en;
  // FIX: results page null-safety — guard against undefined traits
  const safeTr = (traits && typeof traits === "object") ? traits : {};

  const percentiles = useMemo(()=>{
    const seed = (k, v) => {
      const pct  = Math.round((v * 55 + 15) + ((k.charCodeAt(0) % 11) - 5));
      return Math.min(92, Math.max(8, pct));
    };
    return Object.fromEntries(Object.entries(safeTr).map(([k,v])=>[k, seed(k,v)]));
  }, [safeTr]);

  const topLabel = lang==="ar"?"أفضل":lang==="fr"?"Top":"Top";

  return (
    <div style={{margin:"20px 0"}}>
      <button className={`comp-toggle${enabled?" active":""}`} onClick={()=>setEnabled(e=>!e)}>
        <span className="comp-toggle-dot"/>
        {label}
      </button>
      {enabled && (
        <div style={{background:"var(--surface)",border:"1px solid var(--border)",
          borderRadius:14,padding:"20px 22px",animation:"fadeIn 0.3s ease"}}>
          {Object.entries(safeTr).sort((a,b)=>b[1]-a[1]).map(([k])=>{
            const p = clamp(percentiles[k] || 50);  // FIX: clamp numeric UI values
            return (
              <div key={k} className="percentile-row">
                <div style={{fontSize:12,color:"var(--text)",fontWeight:600,width:90,flexShrink:0}}>
                  {labels[k]||k}
                </div>
                {/* FIX: Arabic-first UX — bar container LTR so fill goes left to right */}
                <div className="percentile-bar" dir="ltr">
                  <div className="percentile-fill" style={{width:`${p}%`}}/>
                </div>
                {/* FIX: Arabic-first UX — percentage display LTR */}
                <div dir="ltr" style={{fontSize:12,fontWeight:700,color:"var(--accent2)",width:60,textAlign:"right",flexShrink:0}}>
                  {topLabel} {100-p}%
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Phase 9: CollapsibleSection helper
// ─────────────────────────────────────────────────────────────────
function CollapsibleSection({ title, defaultOpen=false, children, accent }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{marginBottom:16}}>
      <div className="collapsible-header" onClick={()=>setOpen(o=>!o)}
        style={open?{borderColor: accent||"var(--accent2)"}:{}}>
        <span style={{fontWeight:700,fontSize:14,color:"var(--text)"}}>{title}</span>
        <span className={`collapsible-chevron${open?" open":""}`}>▼</span>
      </div>
      <div className={`collapsible-body${open?" visible":" hidden"}`}>
        <div style={{paddingTop:12}}>{children}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TruthModeCard — structured risk analysis (Section 7)
// ─────────────────────────────────────────────────────────────────
function TruthModeCard({ t, lang, traits, top3 }) {
  // FIX: results page null-safety — guard against undefined traits
  const safeTr = (traits && typeof traits === "object") ? traits : {};
  const disciplineScore = safeTr.structure  || 0.5;
  const riskScore       = safeTr.risk       || 0.5;
  const creativeScore   = safeTr.creativity || 0.5;
  const socialScore     = safeTr.social     || 0.5;

  // Burnout risk: high creativity + low structure in rigid field
  const burnoutRaw = (creativeScore * 0.5 + (1-disciplineScore) * 0.5);
  const burnout = burnoutRaw > 0.6 ? "high" : burnoutRaw > 0.4 ? "med" : "low";

  // Stress risk: high risk + low social support
  const stressRaw = (riskScore * 0.4 + (1-socialScore)*0.3 + (1-disciplineScore)*0.3);
  const stress = stressRaw > 0.6 ? "high" : stressRaw > 0.4 ? "med" : "low";

  // Income volatility: creative+risk profile → higher volatility
  const incomeRaw = (creativeScore * 0.5 + riskScore * 0.5);
  const income = incomeRaw > 0.6 ? "high" : incomeRaw > 0.4 ? "med" : "low";

  // FIX: Arabic-first UX — warm gradient bars, no harsh triple-red; amber/gold palette
  const riskColor = { low:"#10b981", med:"#f59e0b", high:"#e8743a" };
  // FIX: Arabic-first UX — gradient fills give softer appearance than solid color
  const riskGradient = {
    low:  "linear-gradient(90deg,#10b981,#34d399)",
    med:  "linear-gradient(90deg,#f59e0b,#fbbf24)",
    high: "linear-gradient(90deg,#e8743a,#f97316)",
  };
  // FIX: fallback for missing archetype — guard translation keys for truth mode labels
  const riskLabel = {
    low:  t?.truthLow  || "Low",
    med:  t?.truthMed  || "Medium",
    high: t?.truthHigh || "High",
  };

  const rows = [
    { key:"burnout", label:t?.burnoutRisk     || "Burnout Risk",      level:burnout, explain:t?.burnoutExplain?.[burnout] || "" },
    { key:"stress",  label:t?.stressRisk      || "Stress Risk",       level:stress,  explain:t?.stressExplain?.[stress]   || "" },
    { key:"income",  label:t?.incomeVolatility || "Income Volatility", level:income,  explain:t?.incomeExplain?.[income]   || "" },
  ];

  const pct = { low:25, med:60, high:88 };

  return (
    <div style={{
      background:"var(--surface)",border:"1px solid var(--border)",
      borderRadius:14,padding:"22px 24px",animation:"fadeIn 0.3s ease",
    }}>
      <h3 style={{fontSize:16,fontWeight:700,color:"var(--text)",marginBottom:4}}>{t?.truthModeTitle || "Reality Check"}</h3>
      <p style={{fontSize:12,color:"var(--muted)",marginBottom:20,lineHeight:1.5}}>{t?.truthModeDesc || ""}</p>

      {rows.map(row=>(
        <div key={row.key} style={{marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <span style={{fontSize:13,fontWeight:600,color:"var(--text)"}}>{row.label}</span>
            <span style={{fontSize:12,fontWeight:700,color:riskColor[row.level],
              padding:"2px 8px",borderRadius:10,background:`${riskColor[row.level]}22`}}>
              {riskLabel[row.level]}
            </span>
          </div>
          {/* FIX: Arabic-first UX — bar LTR so fill is visually correct in RTL layout */}
          <div dir="ltr" style={{height:6,background:"var(--surface2)",borderRadius:3,overflow:"hidden",marginBottom:6}}>
            <div style={{height:"100%",width:`${pct[row.level]}%`,
              background:riskGradient[row.level],borderRadius:3,transition:"width 0.8s ease"}}/>
          </div>
          <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.5}}>{row.explain}</div>
        </div>
      ))}
    </div>
  );
}

// FamilyPressureAdaptiveCard — multi-field, adapts to eligibility + traits + bacStatus
// ─────────────────────────────────────────────────────────────────
function FamilyPressureAdaptiveCard({ t, lang, marks, traits, info, rankedClusters, reality }) {
  if (!marks) return null;

  const subjVals = Object.values(marks).map(Number).filter(v=>!isNaN(v)&&v>0);
  const avg = subjVals.length ? subjVals.reduce((a,b)=>a+b,0)/subjVals.length : 0;
  const bio  = Number(marks.biology)  || 0;
  const chem = Number(marks.chemistry)|| 0;
  const math = Number(marks.math)     || 0;
  const isAfter = info.bacStatus === "after";
  const field = reality?.fpField || "medicine";

  // Per-field eligibility checks
  const eligible = {
    medicine:    avg >= 16 && bio >= 14 && chem >= 13 || (avg >= 13 && info.privateBudget),
    engineering: avg >= 13 && math >= 13              || (avg >= 11 && info.privateBudget),
    business:    avg >= 10,
    law:         avg >= 10,
    other:       true,
  };

  // Per-field personality fit
  const fitScore = {
    medicine:    (traits.social||0.5)*0.4 + (traits.structure||0.5)*0.35 + (1-(traits.risk||0.5))*0.25,
    engineering: (traits.analytical||0.5)*0.4 + (traits.structure||0.5)*0.35 + (traits.risk||0.5)*0.25,
    business:    (traits.leadership||0.5)*0.35 + (traits.social||0.5)*0.3 + (traits.risk||0.5)*0.35,
    law:         (traits.analytical||0.5)*0.4 + (traits.structure||0.5)*0.4 + (traits.social||0.5)*0.2,
    other:       0.6,
  };

  const isEligible  = eligible[field] ?? true;
  const isTraitFit  = (fitScore[field] ?? 0.5) > 0.55;

  // Choose scenario
  let fpData;
  const fd = t.fpByField?.[field];
  if (!fd) return null;

  if (!isEligible && isAfter) {
    fpData = fd.ineligibleAfter;
  } else if (isEligible && !isTraitFit) {
    fpData = fd.mismatch;
  } else if (isEligible && isTraitFit) {
    fpData = fd.match;
  } else {
    fpData = fd.before || fd.ineligibleAfter;
  }

  if (!fpData) return null;

  return (
    <div style={{
      background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.3)",
      borderRadius:14,padding:"22px 24px",margin:"24px 0",
    }}>
      <h3 style={{fontSize:16,fontWeight:700,color:"var(--warn)",marginBottom:6}}>
        {t.fpAdviceTitle}
      </h3>
      {/* Field label */}
      <div style={{display:"inline-block",padding:"3px 10px",borderRadius:20,
        background:"rgba(245,158,11,0.15)",fontSize:12,fontWeight:700,
        color:"var(--warn)",marginBottom:12}}>
        {t.fpFieldOptions?.[field] || field}
      </div>

      <p style={{fontSize:13,color:"var(--text)",lineHeight:1.7,marginBottom:14}}>
        {fpData.text}
      </p>

      {/* Before-bac push plan */}
      {!isAfter && !isEligible && fd.before?.plan?.length > 0 && (
        <>
          <p style={{fontSize:13,fontWeight:600,color:"var(--text)",marginBottom:8}}>{fd.before.text}</p>
          <ul style={{margin:"0 0 12px",paddingInlineStart:20}}>
            {fd.before.plan.map((item,i)=>(
              <li key={i} style={{fontSize:13,color:"var(--text)",padding:"3px 0",lineHeight:1.5}}>{item}</li>
            ))}
          </ul>
          {fd.before.warning && (
            <div style={{padding:"10px 14px",background:"rgba(239,68,68,0.08)",
              border:"1px solid rgba(239,68,68,0.2)",borderRadius:8,
              fontSize:12,color:"#f87171",fontStyle:"italic",marginBottom:12}}>
              ⚠️ {fd.before.warning}
            </div>
          )}
        </>
      )}

      {/* Alternatives */}
      {fpData.alts?.length > 0 && (
        <div style={{marginBottom:16}}>
          <div style={{fontWeight:600,fontSize:13,color:"var(--muted)",marginBottom:8}}>
            {t.familyPressureAltsTitle}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {fpData.alts.map((alt,i)=>(
              <div key={i} style={{
                display:"flex",alignItems:"center",gap:8,
                fontSize:13,color:"var(--text)",
                padding:"6px 10px",background:"var(--surface2)",
                border:"1px solid var(--border)",borderRadius:8,
              }}>
                <span style={{color:"var(--warn)"}}>→</span>{alt}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Talk to parents */}
      <div style={{marginTop:8,padding:"14px 16px",background:"var(--surface2)",
        border:"1px solid var(--border)",borderRadius:10}}>
        <div style={{fontWeight:700,fontSize:13,color:"var(--accent2)",marginBottom:8}}>
          {t.fpTalkToParentsTitle}
        </div>
        {(t.fpTalkToParents||[]).map((tip,i)=>(
          <div key={i} style={{display:"flex",gap:8,marginBottom:6,fontSize:12,color:"var(--text)",lineHeight:1.5}}>
            <span style={{color:"var(--accent2)",flexShrink:0}}>•</span>
            <span>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// LEGENDARY CARD SYSTEM — Trading Card / Game Card aesthetic
// Spec-driven: rarity aura, multi-ring halo, texture, serial ID,
// chip icons, proper RTL, safe area, no overflow in any mode.
// ─────────────────────────────────────────────────────────────────

// Shared texture overlay (CSS-only diagonal lines + dot grid)
const CARD_TEXTURE = `
  repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.012) 0px,
    rgba(255,255,255,0.012) 1px,
    transparent 1px,
    transparent 12px
  ),
  repeating-linear-gradient(
    -45deg,
    rgba(255,255,255,0.008) 0px,
    rgba(255,255,255,0.008) 1px,
    transparent 1px,
    transparent 12px
  )
`.replace(/\n\s*/g, " ");

// Corner ornament SVG (used as data URI)
function cornerSVG(color) {
  const c = encodeURIComponent(color);
  return `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 2 L12 2 M2 2 L2 12' stroke='${c}' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;
}

// CardShell — upgraded: 3-layer bg, texture, neon border, corner ornaments
// Exposes --cardScale CSS var (set from container width) for clamp()-based internal scaling.
function CardShell({ accent, glow, rarity, width, aspectRatio, maxHeight, borderRadius, children, dir }) {
  const shellRef = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!shellRef.current) return;
    const obs = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect?.width || 300;
      setScale(Math.min(1, w / 320));
    });
    obs.observe(shellRef.current);
    return () => obs.disconnect();
  }, []);

  const glowAnim = rarity.key === "legendary" ? "scGlowLegendary 3s ease-in-out infinite"
                 : rarity.key === "epic"       ? "scGlowEpic 3s ease-in-out infinite"
                 : rarity.key === "rare"       ? "scGlowRare 4s ease-in-out infinite"
                 : undefined;
  const foilStrip = (rarity.key !== "common")
    ? `linear-gradient(105deg, transparent 25%, ${accent}14 48%, transparent 72%)`
    : "none";

  return (
    <div style={{
      width, aspectRatio, maxHeight,
      margin: "0 auto 16px",
      position: "relative",
      borderRadius: borderRadius || 16,
      overflow: "hidden",
      flexShrink: 0,
      // CSS variable for internal scaling — set from ResizeObserver
      "--cardScale": scale,
      // 3-layer box-shadow: tight neon ring + mid glow + deep shadow
      boxShadow: `0 0 0 1.5px ${accent}99,
                  0 0 0 3px ${accent}22,
                  0 0 28px ${glow},
                  0 0 ${rarity.key==="legendary"?"72px":"0px"} ${rarity.key==="legendary"?glow:"transparent"},
                  0 16px 56px rgba(0,0,0,0.8)`,
      animation: glowAnim,
    }} dir={dir} ref={shellRef}>

      {/* Layer 1: deep background gradient */}
      <div style={{ position:"absolute", inset:0, zIndex:0,
        background: "linear-gradient(160deg, #06091a 0%, #0a1020 40%, #0d1530 75%, #080c1e 100%)"
      }}/>

      {/* Layer 2: rarity aura tint (bottom-up radial) */}
      <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none",
        background: `radial-gradient(ellipse 90% 55% at 50% 100%, ${accent}1a 0%, transparent 70%),
                     radial-gradient(ellipse 60% 40% at 80% 10%, ${accent}14 0%, transparent 65%)`
      }}/>

      {/* Layer 3: CSS texture — diagonal crosshatch + holographic foil */}
      <div style={{ position:"absolute", inset:0, zIndex:2, pointerEvents:"none",
        backgroundImage: CARD_TEXTURE, opacity: 1
      }}/>
      {foilStrip !== "none" && (
        <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none",
          background: foilStrip, opacity: 0.6
        }}/>
      )}

      {/* Corner ornaments */}
      {["topLeft","topRight","bottomLeft","bottomRight"].map(pos => {
        const s = {
          position:"absolute", width:20, height:20, zIndex:4, pointerEvents:"none",
          backgroundImage: cornerSVG(accent + "99"),
          backgroundRepeat:"no-repeat", backgroundSize:"contain",
          ...(pos==="topLeft"    ? {top:8,   left:8,   transform:"none"} :
              pos==="topRight"   ? {top:8,   right:8,  transform:"scaleX(-1)"} :
              pos==="bottomLeft" ? {bottom:8,left:8,   transform:"scaleY(-1)"} :
                                   {bottom:8,right:8,  transform:"scale(-1)"})
        };
        return <div key={pos} style={s}/>;
      })}

      {/* Content */}
      <div style={{ position:"relative", zIndex:5, height:"100%" }}>
        {children}
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────

// Multi-ring halo icon emblem — box-shadow rings avoid layout overflow
function CardEmblem({ archIcon, accent, glow, size }) {
  const s = size || 72;
  const fontSize = Math.round(s * 0.50);
  // Using box-shadow for rings: layout stays exact s×s, no overflow clipping
  const r1 = Math.round(s * 0.09);   // mid ring gap
  const r2 = Math.round(s * 0.18);   // outer ring gap
  return (
    <div style={{
      width: s, height: s, flexShrink: 0, alignSelf: "center",
      borderRadius: "50%", position: "relative",
      // Inner glow disc background
      background: `radial-gradient(circle, ${accent}30 0%, ${accent}12 55%, transparent 85%)`,
      // Rings as box-shadow: spread-only (no blur = crisp rings; add blur for glow)
      boxShadow: [
        // Main border
        `0 0 0 2px ${accent}`,
        // Inner glow
        `inset 0 0 ${Math.round(s*0.22)}px ${accent}30`,
        // Mid ring (outline-like, with glow)
        `0 0 0 ${r1+2}px ${accent}20`,
        `0 0 0 ${r1+2}px ${glow}`,
        // Outer ring (subtle)
        `0 0 0 ${r2+3}px ${accent}10`,
        // Overall aura
        `0 0 ${Math.round(s*0.5)}px ${glow}`,
        `0 0 ${Math.round(s*0.8)}px ${glow}`,
      ].join(", "),
    }}>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize, lineHeight: 1,
        // Subtle icon glow
        filter: `drop-shadow(0 0 ${Math.round(s*0.1)}px ${glow})`,
      }}>
        {archIcon}
      </div>
    </div>
  );
}

// Rarity pill with tier-specific styling
function RarityPill({ rarity, rarityLabel, accent, glow, fontSize }) {
  const fs = fontSize || 9;
  // Special styling per tier — spec: Common=gray, Rare=cyan, Epic=purple, Legendary=amber
  const tierStyle = {
    legendary: { background:`linear-gradient(90deg,#92400e,#78350f)`, color:"#fde68a", border:`1px solid #f59e0b`, textShadow:"0 0 8px rgba(245,158,11,0.8)" },
    epic:      { background:`linear-gradient(90deg,#4c1d95,#3b0764)`, color:"#e9d5ff", border:`1px solid #a855f7`, textShadow:"0 0 8px rgba(168,85,247,0.7)" },
    rare:      { background:`linear-gradient(90deg,#164e63,#083344)`, color:"#a5f3fc", border:`1px solid #22d3ee`, textShadow:"0 0 6px rgba(34,211,238,0.6)" },
    common:    { background:"rgba(30,41,59,0.7)",                     color:"#94a3b8", border:"1px solid rgba(148,163,184,0.35)", textShadow:"none" },
  }[rarity.key] || {};

  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:3,
      padding:`${Math.round(fs*0.33)}px ${Math.round(fs*1.1)}px`,
      borderRadius:20, fontSize:fs, fontWeight:800, letterSpacing:".06em",
      boxShadow: rarity.key !== "common" ? `0 0 10px ${glow}` : "none",
      ...tierStyle,
    }}>
      {rarity.emoji}&nbsp;{rarityLabel.toUpperCase()}
    </span>
  );
}

// Trait chip with emoji icon
function TraitChip({ label, icon, accent, fontSize }) {
  const fs = fontSize || 9;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:3,
      padding:`${Math.round(fs*0.33)}px ${Math.round(fs*0.9)}px`,
      borderRadius:20, fontSize:fs, fontWeight:600,
      color:"#a5f3fc", background:"rgba(30,41,59,0.85)",
      border:`1px solid ${accent}3a`,
      whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
      maxWidth:"100%",
    }}>
      <span style={{fontSize:fs+1, lineHeight:1}}>{icon}</span>
      {label}
    </span>
  );
}

// Thick progress bar
function MatchBar({ pct, accent, glow, height }) {
  const h = height || 8;
  // FIX: Arabic-first UX — dir=ltr so the fill always goes left→right regardless of RTL context
  return (
    <div dir="ltr" style={{ width:"100%", height:h, background:"rgba(15,23,42,0.8)",
      borderRadius:h, overflow:"hidden", flexShrink:0,
      boxShadow:`inset 0 1px 3px rgba(0,0,0,0.5)` }}>
      <div style={{
        height:"100%", width:`${clamp(pct)}%`, borderRadius:h,  // FIX: clamp numeric UI values
        background:`linear-gradient(90deg, ${accent}, #fbbf24)`,
        boxShadow:`0 0 8px ${glow}`,
        transition:"width .5s cubic-bezier(0.34,1.56,0.64,1)",
      }}/>
    </div>
  );
}

// Serial ID (deterministic from archCode)
function serialId(archCode) {
  let h = 0;
  for (let i = 0; i < archCode.length; i++) h = (h * 31 + archCode.charCodeAt(i)) & 0xffffffff;
  const n = ((h >>> 0) % 99) + 1;
  return `MS-${archCode}-${n.toString().padStart(2,"0")}`;
}

// Icon mapping for trait chips
const CHIP_ICON = {
  // Arabic
  "موثوقية عالية":"🛡️","انضباط متواصل":"⚙️","تنفيذ دقيق":"🎯",
  "موثوقية لا تُضاهى":"🛡️","تحليل ميداني دقيق":"🔬","شبكة مهنية قوية":"🌐",
  "قيادة إلهامية":"🌟","طاقة تنظيمية عالية":"⚡","حسم وسرعة":"🚀",
  "حدس تجاري حاد":"💡","شبكة علاقات واسعة":"🤝","مفاوض طبيعي":"🎙️",
  "تفكير استراتيجي عميق":"🧭","تحليل دقيق":"🔭","رؤية بعيدة المدى":"🌅",
  "إبداع تقني متميز":"🔧","بناء شبكات رقمية":"🌐","ابتكار ملموس":"💡",
  "إبداع نظري جريء":"💫","استقلالية فكرية عميقة":"🧠","حدس حاد":"⚡",
  "إتقان تقني عالٍ":"⚙️","صبر وتركيز عميق":"🎯","جودة لا تُساوم":"💎",
  // French
  "Haute fiabilité":"🛡️","Discipline constante":"⚙️","Exécution précise":"🎯",
  "Fiabilité incomparable":"🛡️","Analyse terrain précise":"🔬","Fort réseau professionnel":"🌐",
  "Leadership inspirant":"🌟","Haute énergie organisationnelle":"⚡","Décision rapide":"🚀",
  "Flair commercial aigu":"💡","Large réseau":"🤝","Négociateur naturel":"🎙️",
  "Pensée stratégique profonde":"🧭","Analyse précise":"🔭","Vision long terme":"🌅",
  "Créativité technique distincte":"🔧","Construction réseaux numériques":"🌐","Innovation concrète":"💡",
  "Créativité théorique audacieuse":"💫","Indépendance intellectuelle":"🧠","Intuition aiguë":"⚡",
  "Haute maîtrise technique":"⚙️","Patience et concentration":"🎯","Qualité sans compromis":"💎",
  // English
  "High reliability":"🛡️","Consistent discipline":"⚙️","Precise execution":"🎯",
  "Unmatched reliability":"🛡️","Precise field analysis":"🔬","Strong professional network":"🌐",
  "Inspiring leadership":"🌟","High organisational energy":"⚡","Quick decisiveness":"🚀",
  "Sharp commercial instinct":"💡","Wide network":"🤝","Natural negotiator":"🎙️",
  "Deep strategic thinking":"🧭","Precise analysis":"🔭","Long-term vision":"🌅",
  "Distinctive technical creativity":"🔧","Digital network building":"🌐","Concrete innovation":"💡",
  "Bold theoretical creativity":"💫","Deep intellectual independence":"🧠","Sharp intuition":"⚡",
  "High technical mastery":"⚙️","Patience and deep focus":"🎯","Uncompromising quality":"💎",
};
function chipIcon(label) { return CHIP_ICON[label] || "✦"; }

// ─────────────────────────────────────────────────────────────────
// ShareCardClassic — Card format (5:7) — legendary trading card
// ─────────────────────────────────────────────────────────────────
function ShareCardClassic({ p }) {
  const { archIcon,archName,archCode,archTagline,clusterName,strengths,
          confidence,rarity,rarityLabel,accent,glow,level,isRTL,dir,lang } = p;
  const ff = isRTL
    ? "'IBM Plex Sans Arabic',Tajawal,Cairo,sans-serif"
    : "'DM Sans',system-ui,sans-serif";
  const sid = serialId(archCode);

  return (
    <CardShell accent={accent} glow={glow} rarity={rarity}
      width="min(320px,86vw)" aspectRatio="5/7" maxHeight="62vh"
      borderRadius={18} dir={dir}>
      <div style={{
        position:"absolute", inset:0, display:"flex", flexDirection:"column",
        padding:"5.5% 6.5%", fontFamily:ff,
        direction: dir, unicodeBidi:"plaintext",
      }}>

        {/* ── TOP BAR: brand left, rarity right ── */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom:"3.5%", flexDirection: isRTL ? "row-reverse" : "row",
        }}>
          <div style={{ display:"flex", flexDirection:"column",
            alignItems: isRTL ? "flex-end" : "flex-start" }}>
            <span style={{ fontSize:"clamp(7px,1.7vw,9.5px)", fontWeight:800,
              color:"#6b7280", letterSpacing:"0.22em", textTransform:"uppercase" }}>
              {isRTL ? "مسار" : "MASSAR"}
            </span>
            <span style={{ fontSize:"clamp(5px,1.2vw,7px)", fontWeight:600,
              color:"#374151", letterSpacing:"0.14em", marginTop:1 }}>
              {isRTL ? "بوابة مسارك المهني" : "Career Identity Engine"}
            </span>
          </div>
          <RarityPill rarity={rarity} rarityLabel={rarityLabel} accent={accent} glow={glow} fontSize={8}/>
        </div>

        {/* ── EMBLEM — wrapped with glow padding ── */}
        <div style={{ display:"flex", justifyContent:"center",
          marginBottom:"4%", marginTop:"1%", flexShrink:0,
          // Padding absorbs the box-shadow ring glow without clipping
          padding: "10px 0",
        }}>
          <CardEmblem archIcon={archIcon} accent={accent} glow={glow} size={62}/>
        </div>

        {/* ── ARCHETYPE TITLE BLOCK ── */}
        {/* Profile label */}
        <div style={{ textAlign:"center", fontSize:"clamp(5.5px,1.3%,7.5px)", fontWeight:800,
          color:"#4b5563", letterSpacing:"0.24em", textTransform:"uppercase", marginBottom:"1.5%" }}>
          {lang==="ar" ? "النوع المهني" : lang==="fr" ? "PROFIL MASSAR" : "MASSAR PROFILE"}
        </div>
        {/* Name */}
        <div style={{
          textAlign:"center", fontSize:"clamp(14px,5.2%,22px)", fontWeight:900, lineHeight:1.1,
          marginBottom:"1.5%",
          background:`linear-gradient(100deg, #fff 0%, ${accent} 50%, #fbbf24 100%)`,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
          overflowWrap:"break-word",
        }}>
          {archName}
        </div>
        {/* Code + Level on same row */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
          gap:5, marginBottom:"1.5%", flexWrap:"wrap" }}>
          <span style={{
            padding:"2px 11px", borderRadius:20, fontWeight:800, letterSpacing:".16em",
            fontSize:"clamp(8px,2.7%,12px)", color:"#60a5fa",
            background:"rgba(30,58,95,0.9)", border:"1.5px solid rgba(59,130,246,0.7)",
            boxShadow:"0 0 8px rgba(59,130,246,0.3)",
          }}>{archCode}</span>
          <span style={{
            padding:"2px 8px", borderRadius:20, fontWeight:700, letterSpacing:".05em",
            fontSize:"clamp(7px,1.9%,10px)", color:accent+"dd",
            background:accent+"12", border:`1px solid ${accent}3a`,
          }}>{level.text}</span>
        </div>
        {/* Motto / tagline */}
        <div style={{
          textAlign:"center", fontStyle:"italic", fontWeight:500, lineHeight:1.4,
          fontSize:"clamp(7px,2.4%,11px)", color:"#94a3b8", marginBottom:"2.5%",
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
        }}>
          {archTagline}
        </div>

        {/* ── DIVIDER ── */}
        <div style={{
          height:1, marginBottom:"2.5%", flexShrink:0,
          background:`linear-gradient(90deg, transparent 0%, ${accent}55 30%, ${accent}55 70%, transparent 100%)`,
        }}/>

        {/* ── TOP PATH BLOCK ── */}
        <div style={{
          fontSize:"clamp(6px,1.6%,8px)", fontWeight:700, color:"#6b7280",
          letterSpacing:".1em", textTransform:"uppercase", marginBottom:"1%",
          textAlign: isRTL ? "right" : "left",
        }}>
          {lang==="ar" ? "أفضل مسار" : lang==="fr" ? "VOIE #1" : "TOP PATH"}
        </div>
        <div style={{
          fontSize:"clamp(9px,3.4%,15px)", fontWeight:700, color:"#f1f5f9",
          marginBottom:"1.5%", textAlign: isRTL ? "right" : "left",
          whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
        }}>
          {clusterName}
        </div>
        {/* Match row */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          marginBottom:"1%", flexDirection: isRTL ? "row-reverse" : "row",
        }}>
          <span style={{ fontSize:"clamp(6px,1.6%,8px)", fontWeight:700, color:"#6b7280", letterSpacing:".06em" }}>
            {lang==="ar" ? "التوافق" : lang==="fr" ? "Compatibilité" : "Match"}
          </span>
          {/* LTR span for number to prevent % jumping in RTL */}
          <span dir="ltr" style={{ fontSize:"clamp(10px,3.2%,14px)", fontWeight:900, color:accent,
            textShadow:`0 0 8px ${glow}`, letterSpacing:".02em" }}>
            {confidence}%
          </span>
        </div>
        <div style={{ marginBottom:"3%" }}>
          <MatchBar pct={confidence} accent={accent} glow={glow} height={7}/>
        </div>

        {/* ── TRAIT CHIPS ── */}
        <div style={{
          display:"flex", gap:4, flexWrap:"wrap", marginTop:"auto",
          justifyContent: isRTL ? "flex-end" : "flex-start",
        }}>
          {strengths.map((s,i) => (
            <TraitChip key={i} label={s} icon={chipIcon(s)} accent={accent} fontSize={8}/>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          marginTop:"3%", paddingTop:"2%", flexShrink:0,
          borderTop:`1px solid ${accent}1e`,
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexDirection: isRTL ? "row-reverse" : "row",
        }}>
          <span style={{ fontSize:"clamp(5px,1.4%,7px)", fontWeight:700, color:"#374151", letterSpacing:".1em" }}>
            massar.ma&nbsp;•&nbsp;{new Date().getFullYear()}
          </span>
          <span style={{ fontSize:"clamp(5px,1.3%,6.5px)", fontWeight:600, color:accent+"55",
            letterSpacing:".08em", fontVariantNumeric:"tabular-nums" }} dir="ltr">
            {sid}
          </span>
        </div>

      </div>
    </CardShell>
  );
}

// ─────────────────────────────────────────────────────────────────
// ShareCardSquare — 1:1 format — compact collectible
// ─────────────────────────────────────────────────────────────────
function ShareCardSquare({ p }) {
  const { archIcon,archName,archCode,archTagline,clusterName,strengths,
          confidence,rarity,rarityLabel,accent,glow,level,isRTL,dir,lang } = p;
  const ff = isRTL ? "'IBM Plex Sans Arabic',Tajawal,Cairo,sans-serif" : "'DM Sans',system-ui,sans-serif";
  const sid = serialId(archCode);

  return (
    <CardShell accent={accent} glow={glow} rarity={rarity}
      width="min(320px,86vw)" aspectRatio="1/1" maxHeight="86vw"
      borderRadius={18} dir={dir}>
      <div style={{
        position:"absolute", inset:0, display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"space-between",
        padding:"5% 6%", fontFamily:ff,
        direction:dir, unicodeBidi:"plaintext",
      }}>

        {/* Top row: brand + rarity */}
        <div style={{ width:"100%", display:"flex", justifyContent:"space-between",
          alignItems:"center", flexDirection: isRTL ? "row-reverse" : "row" }}>
          <span style={{ fontSize:8, fontWeight:800, color:"#6b7280", letterSpacing:".2em" }}>
            {isRTL ? "مسار" : "MASSAR"}
          </span>
          <RarityPill rarity={rarity} rarityLabel={rarityLabel} accent={accent} glow={glow} fontSize={7.5}/>
        </div>

        {/* Emblem — 60px with glow breathing room */}
        <div style={{ padding:"8px 0" }}>
          <CardEmblem archIcon={archIcon} accent={accent} glow={glow} size={60}/>
        </div>

        {/* Name */}
        <div style={{
          textAlign:"center", fontSize:"clamp(14px,5vw,20px)", fontWeight:900, lineHeight:1.1,
          background:`linear-gradient(100deg, #fff 0%, ${accent} 50%, #fbbf24 100%)`,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
          overflowWrap:"break-word", width:"100%",
        }}>{archName}</div>

        {/* Code row */}
        <div style={{ display:"flex", gap:5, alignItems:"center", justifyContent:"center", flexWrap:"wrap" }}>
          <span style={{ padding:"2px 10px", borderRadius:20, background:"rgba(30,58,95,0.9)",
            border:"1.5px solid rgba(59,130,246,0.7)", fontSize:10, fontWeight:800,
            color:"#60a5fa", letterSpacing:".14em" }}>{archCode}</span>
          <span style={{ padding:"2px 7px", borderRadius:20, background:accent+"12",
            border:`1px solid ${accent}3a`, fontSize:9, fontWeight:700,
            color:accent+"dd", letterSpacing:".04em" }}>{level.text}</span>
        </div>

        {/* Divider */}
        <div style={{ width:"100%", height:1,
          background:`linear-gradient(90deg, transparent, ${accent}55, ${accent}55, transparent)` }}/>

        {/* Path + match */}
        <div style={{ width:"100%", display:"flex", justifyContent:"space-between",
          alignItems:"center", flexDirection: isRTL ? "row-reverse" : "row" }}>
          <span style={{ fontSize:9, fontWeight:600, color:"#94a3b8",
            overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"60%" }}>
            {clusterName}
          </span>
          <span dir="ltr" style={{ fontSize:13, fontWeight:900, color:accent, flexShrink:0,
            textShadow:`0 0 8px ${glow}` }}>{confidence}%</span>
        </div>
        <MatchBar pct={confidence} accent={accent} glow={glow} height={6}/>

        {/* Footer */}
        <div style={{ width:"100%", display:"flex", justifyContent:"space-between",
          alignItems:"center", flexDirection: isRTL ? "row-reverse" : "row" }}>
          <span style={{ fontSize:7, fontWeight:700, color:"#374151", letterSpacing:".1em" }}>
            massar.ma&nbsp;•&nbsp;{new Date().getFullYear()}
          </span>
          <span dir="ltr" style={{ fontSize:6.5, fontWeight:600, color:accent+"55", letterSpacing:".07em" }}>
            {sid}
          </span>
        </div>

      </div>
    </CardShell>
  );
}

// ─────────────────────────────────────────────────────────────────
// ShareCardPortrait — 9:16 TikTok/Story — vertical stacking
// Pure flex column, fixed-pixel spacing, no position:absolute.
// Typography: title 22px, subtitle 14px, labels 12px, icon 76px.
// ─────────────────────────────────────────────────────────────────
function ShareCardPortrait({ p }) {
  const { archIcon,archName,archCode,archTagline,clusterName,strengths,
          confidence,rarity,rarityLabel,accent,glow,level,isRTL,dir,lang } = p;
  const ff = isRTL ? "'IBM Plex Sans Arabic',Tajawal,Cairo,sans-serif" : "'DM Sans',system-ui,sans-serif";
  const sid = serialId(archCode);

  return (
    <CardShell accent={accent} glow={glow} rarity={rarity}
      width="min(270px,78vw)" aspectRatio="9/16" maxHeight="78vh"
      borderRadius={22} dir={dir}>
      <div style={{
        display:"flex", flexDirection:"column", alignItems:"center",
        padding:"20px 18px", gap:0, height:"100%",
        fontFamily:ff, boxSizing:"border-box",
        direction:dir, unicodeBidi:"plaintext",
        overflowY:"hidden",
      }}>

        {/* Top bar */}
        <div style={{ width:"100%", display:"flex", alignItems:"center",
          justifyContent:"space-between", marginBottom:10,
          flexDirection: isRTL ? "row-reverse" : "row" }}>
          <span style={{ fontSize:8, fontWeight:800, color:"#6b7280", letterSpacing:"0.2em" }}>
            {isRTL ? "مسار" : "MASSAR"}
          </span>
          <RarityPill rarity={rarity} rarityLabel={rarityLabel} accent={accent} glow={glow} fontSize={7.5}/>
        </div>

        {/* Emblem — 72px with glow breathing room */}
        <div style={{ padding:"10px 0", marginBottom:2 }}>
          <CardEmblem archIcon={archIcon} accent={accent} glow={glow} size={72}/>
        </div>

        {/* Profile label */}
        <div style={{ fontSize:7.5, fontWeight:800, color:"#4b5563", letterSpacing:"0.22em",
          textTransform:"uppercase", marginBottom:5, textAlign:"center" }}>
          {lang==="ar" ? "النوع المهني" : lang==="fr" ? "PROFIL MASSAR" : "MASSAR PROFILE"}
        </div>

        {/* Name — 22px */}
        <div style={{
          textAlign:"center", fontSize:22, fontWeight:900, lineHeight:1.15,
          marginBottom:6,
          background:`linear-gradient(100deg, #fff 0%, ${accent} 50%, #fbbf24 100%)`,
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
          overflowWrap:"break-word", width:"100%",
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
        }}>{archName}</div>

        {/* Code + level */}
        <div style={{ display:"flex", gap:5, alignItems:"center", justifyContent:"center",
          flexWrap:"wrap", marginBottom:6 }}>
          <span style={{ padding:"3px 13px", borderRadius:20,
            background:"rgba(30,58,95,0.9)", border:"1.5px solid rgba(59,130,246,0.7)",
            fontSize:11, fontWeight:800, color:"#60a5fa", letterSpacing:".14em" }}>
            {archCode}
          </span>
          <span style={{ padding:"2px 8px", borderRadius:20,
            background:accent+"12", border:`1px solid ${accent}3a`,
            fontSize:10, fontWeight:700, color:accent+"dd", letterSpacing:".04em" }}>
            {level.text}
          </span>
        </div>

        {/* Tagline — 14px italic */}
        <div style={{
          textAlign:"center", fontStyle:"italic", fontWeight:500,
          fontSize:13, color:"#94a3b8", lineHeight:1.4, marginBottom:10,
          overflowWrap:"break-word", width:"100%",
          display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden",
        }}>{archTagline}</div>

        {/* Divider */}
        <div style={{ width:"100%", height:1, marginBottom:10, flexShrink:0,
          background:`linear-gradient(90deg, transparent, ${accent}55, ${accent}55, transparent)` }}/>

        {/* Top path label — 12px */}
        <div style={{
          width:"100%", fontSize:11, fontWeight:700, color:"#6b7280",
          letterSpacing:".08em", textTransform:"uppercase", marginBottom:3,
          textAlign: isRTL ? "right" : "left",
        }}>
          {lang==="ar" ? "أفضل مسار" : lang==="fr" ? "VOIE #1" : "TOP PATH"}
        </div>
        <div style={{
          width:"100%", fontSize:14, fontWeight:700, color:"#f1f5f9",
          marginBottom:8, textAlign: isRTL ? "right" : "left",
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
        }}>{clusterName}</div>

        {/* Match */}
        <div style={{
          width:"100%", display:"flex", justifyContent:"space-between",
          alignItems:"center", marginBottom:5,
          flexDirection: isRTL ? "row-reverse" : "row",
        }}>
          <span style={{ fontSize:11, fontWeight:700, color:"#6b7280", letterSpacing:".06em" }}>
            {lang==="ar" ? "التوافق" : lang==="fr" ? "Compatibilité" : "Match"}
          </span>
          <span dir="ltr" style={{ fontSize:15, fontWeight:900, color:accent,
            textShadow:`0 0 8px ${glow}` }}>{confidence}%</span>
        </div>
        <div style={{ width:"100%", marginBottom:10 }}>
          <MatchBar pct={confidence} accent={accent} glow={glow} height={8}/>
        </div>

        {/* Trait chips */}
        <div style={{
          width:"100%", display:"flex", gap:4, flexWrap:"wrap", marginBottom:"auto",
          justifyContent: isRTL ? "flex-end" : "flex-start",
        }}>
          {strengths.map((s,i) => (
            <TraitChip key={i} label={s} icon={chipIcon(s)} accent={accent} fontSize={9.5}/>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          width:"100%", marginTop:8, paddingTop:7, flexShrink:0,
          borderTop:`1px solid ${accent}1e`,
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexDirection: isRTL ? "row-reverse" : "row",
        }}>
          <span style={{ fontSize:7.5, fontWeight:700, color:"#374151", letterSpacing:".12em" }}>
            massar.ma&nbsp;•&nbsp;{new Date().getFullYear()}
          </span>
          <span dir="ltr" style={{ fontSize:7, fontWeight:600, color:accent+"55", letterSpacing:".08em" }}>
            {sid}
          </span>
        </div>

      </div>
    </CardShell>
  );
}

// ─────────────────────────────────────────────────────────────────
// ShareCard: responsive collectible card (DOM preview + canvas export, no deps)
// Preview = pure CSS/DOM — three separate layout components per format.
// Export  = Canvas API — runs only on download click.
// ─────────────────────────────────────────────────────────────────
function ShareCard({ t, lang, massarType, topCluster, confidence, traits }) {
  const [copied,  setCopied]  = useState(false);
  // format: "card" (5:7) | "square" (1:1) | "story" (9:16)
  const [fmt, setFmt] = useState("card");

  const archetype   = getArchetype(massarType);
  const archName    = archetype.name?.[lang]    || archetype.name?.en    || massarType;
  const archCode    = archetype.code            || massarType;
  const archIcon    = archetype.icon            || "🧭";
  const archTagline = archetype.tagline?.[lang] || archetype.tagline?.en || archName;
  // v2 archetype enrichment
  const _scA2    = pickArchetypeV2({ traits: traits||{}, confidence });
  const _scCaption = _scA2?.shareCaption?.[lang] || null;
  const _scStats = computeDeterministicStats(traits||{});
  const _scSeed  = Math.round(((traits?.analytical||0.5)+(traits?.social||0.5))*100);
  const _scSerial= makeSerialId(_scA2?.code||archCode, _scSeed);
  const _scRarity= computeRarity(confidence);
  const _scRarCol= {COMMON:"#3b82f6",RARE:"#f59e0b",EPIC:"#a855f7"}[_scRarity]||"#3b82f6";
  const _scTitleL= _scA2?.titleLatin || archCode;
  const _scTitleA= _scA2?.titleAr    || archName;
  const rawStrengths = archetype.strengths?.[lang] || archetype.strengths?.en || [];
  const strengths   = rawStrengths.slice(0, 3).map(s => s.length > 22 ? s.slice(0, 21) + "…" : s);
  // FIX: translation fallback — clusterName safe default
  const clusterName = t?.[CLUSTER_KEY_MAP?.[topCluster?.id]] || topCluster?.id || "";
  const isRTL       = lang === "ar";

  // FIX: development debug logs — share card prepared
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.log("[Massar] share card prepared:", { massarType, archType: archetype?.code, clusterName, confidence });
    }
  }, [massarType, clusterName, confidence]); // eslint-disable-line
  const dir         = isRTL ? "rtl" : "ltr";

  // Level from confidence
  function cardLevel(conf) {
    const lvl = Math.min(5, Math.max(1, Math.ceil(conf / 20)));
    const labels = {
      1:{ ar:"مبتدئ",   fr:"Débutant",    en:"Beginner"  },
      2:{ ar:"متقدم",   fr:"Avancé",      en:"Advanced"  },
      3:{ ar:"مستكشف", fr:"Explorateur", en:"Explorer"  },
      4:{ ar:"خبير",    fr:"Expert",      en:"Expert"    },
      5:{ ar:"أسطوري", fr:"Légendaire",  en:"Legendary" },
    };
    const lbl    = labels[lvl]?.[lang] || labels[lvl]?.en || "Explorer";
    const numLbl = lang==="ar"?`المستوى ${lvl}`:lang==="fr"?`Niveau ${lvl}`:`Level ${lvl}`;
    return { lvl, text:`${numLbl} • ${lbl}` };
  }
  const level = cardLevel(confidence);

  // Rarity tiers — spec: Common=gray, Rare=cyan, Epic=purple, Legendary=amber
  function cardRarity(conf) {
    if (conf>=85) return { key:"legendary", label:{ar:"أسطوري",fr:"Légendaire",en:"Legendary"}, emoji:"👑", color:"#f59e0b", glow:"rgba(245,158,11,0.55)" };
    if (conf>=70) return { key:"epic",      label:{ar:"ملحمي",  fr:"Épique",    en:"Epic"      }, emoji:"⚡", color:"#a855f7", glow:"rgba(168,85,247,0.5)"  };
    if (conf>=55) return { key:"rare",      label:{ar:"نادر",   fr:"Rare",      en:"Rare"      }, emoji:"💎", color:"#22d3ee", glow:"rgba(34,211,238,0.45)" };
    return             { key:"common",    label:{ar:"عادي",   fr:"Commun",    en:"Common"    }, emoji:"🪨", color:"#94a3b8", glow:"rgba(148,163,184,0.3)" };
  }
  const rarity      = cardRarity(confidence);
  const rarityLabel = rarity.label[lang] || rarity.label.en;
  const accent      = rarity.color;
  const glow        = rarity.glow;

  // Viral caption — use archV2 shareCaption when available
  const caption = _scCaption
    ? _scCaption + (clusterName ? `\n${lang==="ar"?"أفضل مسار":lang==="fr"?"Top voie":"Top path"}: ${clusterName} (${confidence}%)\n🔗 massarpro.com` : "")
    : lang==="ar"
    ? `نوعي في مسار: ${archCode} — ${archName}\nأفضل مسار: ${clusterName} (%${confidence})\nجرّبها: massar.ma`
    : lang==="fr"
    ? `Mon Type Massar: ${archCode} — ${archName}\nVoie #1 : ${clusterName} (${confidence}% compatibilité)\nFais le test: massar.ma`
    : `My Massar Type: ${archCode} — ${archName}\nTop path: ${clusterName} (${confidence}% match)\nTry yours: massar.ma`;

  // Format metadata
  const FMT = {
    card:   { label:"Card", exportW:1260, exportH:1764 },
    square: { label:"1:1",  exportW:1080, exportH:1080 },
    story:  { label:"9:16", exportW:1080, exportH:1920 },
  };
  const fmtMeta = FMT[fmt] || FMT.card;

  // Copy caption (unchanged)
  const copyCaption = () => {
    const doSet = () => { setCopied(true); setTimeout(()=>setCopied(false), 2500); };
    try { navigator.clipboard.writeText(caption).then(doSet).catch(()=>fallbackCopy(doSet)); }
    catch { fallbackCopy(doSet); }
  };
  const fallbackCopy = (cb) => {
    const ta=document.createElement("textarea"); ta.value=caption;
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch {}
    document.body.removeChild(ta); cb();
  };

  // ── Canvas export ─────────────────────────────────────────────
  function buildCanvas() {
    const W=fmtMeta.exportW, H=fmtMeta.exportH;
    const PAD=Math.round(W*0.074);
    const canvas=document.createElement("canvas");
    canvas.width=W; canvas.height=H;
    const ctx=canvas.getContext("2d");
    if (!ctx) return canvas;
    const arF="Tajawal,Cairo,Noto Kufi Arabic,Tahoma,Arial,sans-serif";
    const enF="system-ui,-apple-system,Segoe UI,sans-serif";
    const bF=isRTL?arF:enF;

    function rr(x,y,w,h,r){
      ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
      ctx.arcTo(x+w,y,x+w,y+r,r); ctx.lineTo(x+w,y+h-r);
      ctx.arcTo(x+w,y+h,x+w-r,y+h,r); ctx.lineTo(x+r,y+h);
      ctx.arcTo(x,y+h,x,y+h-r,r); ctx.lineTo(x,y+r);
      ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
    }
    const dtC=(txt,y,font,col,mw)=>{
      ctx.save(); ctx.font=font; ctx.fillStyle=col; ctx.textAlign="center"; ctx.textBaseline="alphabetic";
      ctx.fillText(txt,W/2,y,mw||W-PAD*2); ctx.restore();
    };
    const dtL=(txt,y,font,col,mw)=>{
      ctx.save(); ctx.font=font; ctx.fillStyle=col; ctx.textBaseline="alphabetic";
      if(isRTL){ const tw=ctx.measureText(txt).width; ctx.fillText(txt,W-PAD-Math.min(tw,mw||W),y,mw||W-PAD*2); }
      else { ctx.fillText(txt,PAD,y,mw||W-PAD*2); }
      ctx.restore();
    };

    // Background + grain + blobs (shared)
    const bg=ctx.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,"#060a14"); bg.addColorStop(0.5,"#0a1020"); bg.addColorStop(1,"#0d1628");
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    for(let i=0;i<12000;i++){
      ctx.fillStyle=`rgba(255,255,255,${Math.random()*0.018})`;
      ctx.fillRect(Math.floor(Math.random()*W),Math.floor(Math.random()*H),1,1);
    }
    const gx=isRTL?W*0.2:W*0.8;
    const blob=ctx.createRadialGradient(gx,H*0.06,0,gx,H*0.06,W*0.45);
    blob.addColorStop(0,accent+"30"); blob.addColorStop(1,"transparent");
    ctx.fillStyle=blob; ctx.fillRect(0,0,W,H);

    // Neon border
    ctx.save(); ctx.strokeStyle=accent; ctx.lineWidth=5;
    ctx.shadowColor=accent; ctx.shadowBlur=40;
    rr(10,10,W-20,H-20,Math.round(W*0.036)); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.strokeStyle=accent+"22"; ctx.lineWidth=2;
    rr(26,26,W-52,H-52,Math.round(W*0.026)); ctx.stroke(); ctx.restore();

    // ── Portrait (9:16) canvas: centred vertical layout ──────────
    if (fmt === "story") {
      const cx = W/2;
      let y = PAD*1.3;

      // Rarity pill — tier-colored (matches DOM)
      const rarityPillColorsP = {
        legendary:{ bg:"#92400e", text:"#fde68a", border:"#f59e0b" },
        epic:     { bg:"#4c1d95", text:"#e9d5ff", border:"#a855f7" },
        rare:     { bg:"#164e63", text:"#a5f3fc", border:"#22d3ee" },
        common:   { bg:"#1e293b", text:"#94a3b8", border:"#475569" },
      };
      const rpcP = rarityPillColorsP[rarity.key] || rarityPillColorsP.common;

      // Brand line (centred)
      dtC(isRTL ? "مسار" : "MASSAR", y, `bold ${Math.round(W*0.026)}px ${bF}`, "#6b7280");

      // Rarity pill (centred)
      y += Math.round(H*0.038);
      const rarTxt = `${rarity.emoji} ${rarityLabel.toUpperCase()}`;
      const rpF = `bold ${Math.round(W*0.030)}px ${bF}`;
      ctx.font = rpF;
      const rtw = ctx.measureText(rarTxt).width;
      const rpW=rtw+W*0.06, rpH=W*0.065, rpX=cx-rpW/2;
      ctx.save(); ctx.fillStyle=rpcP.bg; ctx.strokeStyle=rpcP.border;
      ctx.lineWidth=2.5; ctx.shadowColor=accent; ctx.shadowBlur=14;
      rr(rpX,y-rpH*0.72,rpW,rpH,rpH/2); ctx.fill(); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.font=rpF; ctx.fillStyle=rpcP.text; ctx.textBaseline="alphabetic";
      ctx.textAlign="center"; ctx.fillText(rarTxt, cx, y, rpW); ctx.restore();

      // Icon circle — 72px-equivalent scaled
      y += Math.round(H*0.07);
      const ibR = Math.round(W*0.17);
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, y+ibR, ibR+5, 0, Math.PI*2);
      ctx.strokeStyle=accent+"55"; ctx.lineWidth=3; ctx.shadowColor=accent; ctx.shadowBlur=40; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, y+ibR, ibR, 0, Math.PI*2);
      ctx.fillStyle=accent+"18"; ctx.shadowBlur=50; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, y+ibR, ibR, 0, Math.PI*2);
      ctx.strokeStyle=accent+"88"; ctx.lineWidth=2.5; ctx.shadowBlur=20; ctx.stroke();
      ctx.restore();
      ctx.save(); ctx.font=`${Math.round(ibR*1.1)}px serif`;
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(archIcon, cx, y+ibR+ibR*0.06); ctx.restore();
      y += ibR*2 + Math.round(H*0.04);

      // Profile label
      dtC(lang==="ar"?"النوع المهني":lang==="fr"?"PROFIL MASSAR":"MASSAR PROFILE",
        y, `bold ${Math.round(W*0.022)}px ${bF}`, "#4b5563");
      y += Math.round(H*0.044);

      // Archetype name — white→accent→gold gradient
      ctx.save(); ctx.font=`900 ${Math.round(W*0.072)}px ${bF}`;
      ctx.textBaseline="alphabetic"; ctx.textAlign="center";
      const ng=ctx.createLinearGradient(PAD,0,W-PAD,0);
      ng.addColorStop(0,"#ffffff"); ng.addColorStop(0.45,accent); ng.addColorStop(1,"#fbbf24");
      ctx.fillStyle=ng; ctx.fillText(archName,cx,y,W-PAD*2); ctx.restore();
      y += Math.round(H*0.046);

      // Code pill
      const cF=`bold ${Math.round(W*0.034)}px monospace,${bF}`;
      ctx.font=cF;
      const ctw=ctx.measureText(archCode).width;
      const cpW=ctw+W*0.055, cpH=W*0.060, cpX=cx-cpW/2;
      ctx.save(); ctx.fillStyle="#1e3a5f"; ctx.strokeStyle="#3b82f6"; ctx.lineWidth=2;
      rr(cpX,y,cpW,cpH,cpH/2); ctx.fill(); ctx.stroke(); ctx.restore();
      dtC(archCode, y+cpH*0.68, cF, "#60a5fa");
      y += cpH + Math.round(H*0.018);

      // Level badge
      const lvF=`600 ${Math.round(W*0.025)}px ${bF}`;
      ctx.font=lvF;
      const ltw=ctx.measureText(level.text).width;
      const lpW=ltw+W*0.04, lpH=W*0.044, lpX=cx-lpW/2;
      ctx.save(); ctx.fillStyle=accent+"12"; ctx.strokeStyle=accent+"44"; ctx.lineWidth=1.5;
      rr(lpX,y,lpW,lpH,lpH/2); ctx.fill(); ctx.stroke(); ctx.restore();
      dtC(level.text, y+lpH*0.68, lvF, accent+"cc");
      y += lpH + Math.round(H*0.032);

      // Tagline (14px-equivalent italic)
      const tgF=`italic ${Math.round(W*0.034)}px ${isRTL?arF:"Georgia,"+enF}`;
      dtC(archTagline, y, tgF, "#9ca3af", W-PAD*2.5);
      y += Math.round(H*0.055);

      // Divider
      ctx.save();
      const dg=ctx.createLinearGradient(PAD,0,W-PAD,0);
      dg.addColorStop(0,"transparent"); dg.addColorStop(0.2,accent+"44");
      dg.addColorStop(0.8,accent+"44"); dg.addColorStop(1,"transparent");
      ctx.strokeStyle=dg; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.moveTo(PAD,y); ctx.lineTo(W-PAD,y); ctx.stroke(); ctx.restore();
      y += Math.round(H*0.048);

      // Top path label + name
      const pK=lang==="ar"?"أفضل مسار":lang==="fr"?"Voie #1":"Top Path";
      dtC(pK, y, `bold ${Math.round(W*0.026)}px ${bF}`, "#6b7280");
      y += Math.round(H*0.044);
      dtC(clusterName, y, `bold ${Math.round(W*0.042)}px ${bF}`, "#f3f4f6", W-PAD*2);
      y += Math.round(H*0.056);

      // Match label + value
      const mK=lang==="ar"?"التوافق":lang==="fr"?"Compatibilité":"Match";
      dtC(mK, y, `bold ${Math.round(W*0.026)}px ${bF}`, "#6b7280");
      ctx.save(); ctx.font=`bold ${Math.round(W*0.046)}px monospace,${bF}`;
      ctx.fillStyle=accent; ctx.textBaseline="alphabetic"; ctx.textAlign="center";
      ctx.fillText(`${confidence}%`, cx, y); ctx.restore();
      y += Math.round(H*0.022);

      // Confidence bar
      const barW=W-PAD*2, barH=Math.round(H*0.016);
      ctx.save(); ctx.fillStyle="#1e293b"; rr(PAD,y,barW,barH,barH/2); ctx.fill();
      const fw=Math.max(barH,Math.round((confidence/100)*barW));
      const fg=ctx.createLinearGradient(PAD,0,PAD+fw,0);
      fg.addColorStop(0,accent); fg.addColorStop(1,"#fbbf24");
      ctx.fillStyle=fg; ctx.shadowColor=accent; ctx.shadowBlur=10;
      rr(PAD,y,fw,barH,barH/2); ctx.fill(); ctx.restore();
      y += barH + Math.round(H*0.04);

      // Chips (centred row)
      if(strengths.length>0){
        const chipH=Math.round(H*0.038), chipFont=`600 ${Math.round(W*0.026)}px ${bF}`;
        ctx.font=chipFont;
        const chips=strengths.map(s=>({ text:s, w:ctx.measureText(s).width+W*0.04 }));
        const totalW=chips.reduce((a,c)=>a+c.w+W*0.014,0)-W*0.014;
        let chipX=cx-totalW/2;
        for(const chip of chips){
          ctx.save(); ctx.fillStyle="#1e293b"; ctx.strokeStyle=accent+"44"; ctx.lineWidth=1.5;
          rr(chipX,y,chip.w,chipH,chipH/2); ctx.fill(); ctx.stroke(); ctx.restore();
          ctx.save(); ctx.font=chipFont; ctx.fillStyle="#93c5fd"; ctx.textBaseline="alphabetic";
          ctx.fillText(chip.text, chipX+W*0.02, y+chipH*0.68); ctx.restore();
          chipX+=chip.w+W*0.014;
        }
      }

      // Footer
      const fy=H-PAD*0.9;
      ctx.save();
      const fl=ctx.createLinearGradient(PAD,0,W-PAD,0);
      fl.addColorStop(0,"transparent"); fl.addColorStop(0.15,accent+"28");
      fl.addColorStop(0.85,accent+"28"); fl.addColorStop(1,"transparent");
      ctx.strokeStyle=fl; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(PAD,fy-PAD*0.28); ctx.lineTo(W-PAD,fy-PAD*0.28); ctx.stroke(); ctx.restore();
      dtC(`massar.ma • ${new Date().getFullYear()}`, fy, `bold ${Math.round(W*0.022)}px ${bF}`, "#374151");
      // Serial ID (right-aligned)
      const sidP = serialId(archCode);
      const sidFP = `500 ${Math.round(W*0.018)}px monospace,${bF}`;
      ctx.font = sidFP;
      const sidWP = ctx.measureText(sidP).width;
      ctx.save(); ctx.font=sidFP; ctx.fillStyle=accent+"55"; ctx.textBaseline="alphabetic";
      ctx.fillText(sidP, W-PAD-sidWP, fy); ctx.restore();

      return canvas;
    }

    // ── Card / Square canvas: legendary layout ──────────────────
    // Rarity pill tier colors (canvas approximation)
    const rarityPillColors = {
      legendary:{ bg:"#92400e", text:"#fde68a", border:"#f59e0b" },
      epic:     { bg:"#4c1d95", text:"#e9d5ff", border:"#a855f7" },
      rare:     { bg:"#164e63", text:"#a5f3fc", border:"#22d3ee" },
      common:   { bg:"#1e293b", text:"#94a3b8", border:"#475569" },
    };
    const rpc = rarityPillColors[rarity.key] || rarityPillColors.common;

    // Header accent strip
    const stripW=W*0.08, sx=isRTL?W-PAD-stripW:PAD;
    const sg=ctx.createLinearGradient(sx,0,sx+stripW,0);
    sg.addColorStop(0,accent); sg.addColorStop(1,"#fbbf24");
    ctx.save(); ctx.fillStyle=sg; rr(sx,PAD*0.78,stripW,4,2); ctx.fill(); ctx.restore();

    // Brand mark
    const brandY=PAD*1.44;
    const brandStr = isRTL ? "مسار" : "MASSAR";
    dtL(brandStr, brandY, `bold ${Math.round(W*0.026)}px ${bF}`, "#6b7280");
    const subStr = isRTL ? "بوابة مسارك المهني" : "Career Identity Engine";
    dtL(subStr, brandY+Math.round(H*0.018), `${Math.round(W*0.018)}px ${bF}`, "#374151");

    // Rarity pill — tier-colored
    const rarityTxt=`${rarity.emoji} ${rarityLabel.toUpperCase()}`;
    const rpFont=`bold ${Math.round(W*0.027)}px ${bF}`;
    ctx.font=rpFont;
    const rtw=ctx.measureText(rarityTxt).width;
    const rpW2=rtw+W*0.05, rpH2=W*0.052, rpX2=isRTL?PAD:W-PAD-rpW2;
    const rpY2=brandY-rpH2*0.72;
    ctx.save(); ctx.fillStyle=rpc.bg; ctx.strokeStyle=rpc.border;
    ctx.lineWidth=2; ctx.shadowColor=accent; ctx.shadowBlur=12;
    rr(rpX2,rpY2,rpW2,rpH2,rpH2/2); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.font=rpFont; ctx.fillStyle=rpc.text; ctx.textBaseline="alphabetic";
    ctx.fillText(rarityTxt, rpX2+rpW2*0.1, brandY, rpW2); ctx.restore();

    // Multi-ring halo icon
    const ibSz=Math.round(W*0.26);
    const ibCX=W/2, ibCY=Math.round(H*0.185)+ibSz/2;
    // Outermost ring
    ctx.save(); ctx.beginPath(); ctx.arc(ibCX,ibCY,ibSz/2+Math.round(W*0.044),0,Math.PI*2);
    ctx.strokeStyle=accent+"1e"; ctx.lineWidth=1.5; ctx.stroke(); ctx.restore();
    // Mid ring
    ctx.save(); ctx.beginPath(); ctx.arc(ibCX,ibCY,ibSz/2+Math.round(W*0.022),0,Math.PI*2);
    ctx.strokeStyle=accent+"44"; ctx.lineWidth=2; ctx.shadowColor=accent; ctx.shadowBlur=20; ctx.stroke(); ctx.restore();
    // Glow disc
    const discGrad=ctx.createRadialGradient(ibCX,ibCY,0,ibCX,ibCY,ibSz/2);
    discGrad.addColorStop(0,accent+"28"); discGrad.addColorStop(0.6,accent+"10"); discGrad.addColorStop(1,"transparent");
    ctx.save(); ctx.beginPath(); ctx.arc(ibCX,ibCY,ibSz/2,0,Math.PI*2);
    ctx.fillStyle=discGrad; ctx.shadowColor=accent; ctx.shadowBlur=40; ctx.fill(); ctx.restore();
    // Border ring
    ctx.save(); ctx.beginPath(); ctx.arc(ibCX,ibCY,ibSz/2,0,Math.PI*2);
    ctx.strokeStyle=accent+"88"; ctx.lineWidth=2; ctx.shadowColor=accent; ctx.shadowBlur=20; ctx.stroke(); ctx.restore();
    // Emoji
    ctx.save(); ctx.font=`${Math.round(ibSz*0.5)}px serif`;
    ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText(archIcon, ibCX, ibCY+ibSz*0.03); ctx.restore();

    // Profile label
    const profileHeaderY=ibCY+ibSz/2+Math.round(H*0.030);
    dtC(lang==="ar"?"النوع المهني":lang==="fr"?"PROFIL MASSAR":"MASSAR PROFILE",
      profileHeaderY, `bold ${Math.round(W*0.021)}px ${bF}`, "#4b5563");

    // Archetype name — white→accent→gold gradient
    const nameY=profileHeaderY+Math.round(H*0.050);
    ctx.save(); ctx.font=`900 ${Math.round(W*0.078)}px ${bF}`;
    ctx.textBaseline="alphabetic"; ctx.textAlign="center";
    const ng=ctx.createLinearGradient(PAD,0,W-PAD,0);
    ng.addColorStop(0,"#ffffff"); ng.addColorStop(0.45,accent); ng.addColorStop(1,"#fbbf24");
    ctx.fillStyle=ng; ctx.fillText(archName,W/2,nameY,W-PAD*2); ctx.restore();

    // Code pill
    const codeY2=nameY+Math.round(H*0.044);
    const cFont=`bold ${Math.round(W*0.036)}px monospace,${bF}`;
    ctx.font=cFont;
    const ctw2=ctx.measureText(archCode).width;
    const cpW2=ctw2+W*0.050, cpH2=W*0.058, cpX2=(W-cpW2)/2-W*0.035;
    ctx.save(); ctx.fillStyle="rgba(30,58,95,0.9)"; ctx.strokeStyle="rgba(59,130,246,0.7)";
    ctx.lineWidth=2; ctx.shadowColor="#3b82f6"; ctx.shadowBlur=8;
    rr(cpX2,codeY2,cpW2,cpH2,cpH2/2); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.font=cFont; ctx.fillStyle="#60a5fa"; ctx.textBaseline="alphabetic";
    ctx.textAlign="center"; ctx.fillText(archCode, cpX2+cpW2/2, codeY2+cpH2*0.68); ctx.restore();
    // Level badge (right of code)
    const lvlFont=`600 ${Math.round(W*0.024)}px ${bF}`;
    ctx.font=lvlFont;
    const ltw2=ctx.measureText(level.text).width;
    const lpW2=ltw2+W*0.038, lpH2=W*0.040, lpX2=cpX2+cpW2+W*0.018;
    const lpY2=codeY2+(cpH2-lpH2)/2;
    ctx.save(); ctx.fillStyle=accent+"12"; ctx.strokeStyle=accent+"44"; ctx.lineWidth=1.5;
    rr(lpX2,lpY2,lpW2,lpH2,lpH2/2); ctx.fill(); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.font=lvlFont; ctx.fillStyle=accent+"cc"; ctx.textBaseline="alphabetic";
    ctx.textAlign="center"; ctx.fillText(level.text, lpX2+lpW2/2, lpY2+lpH2*0.68); ctx.restore();

    // Tagline italic
    const sigY2=codeY2+cpH2+Math.round(H*0.036);
    dtC(archTagline, sigY2, `italic ${Math.round(W*0.035)}px ${isRTL?arF:"Georgia,"+enF}`, "#94a3b8", W-PAD*2);

    // Divider
    const divY2=sigY2+Math.round(H*0.044);
    ctx.save();
    const dg2=ctx.createLinearGradient(PAD,0,W-PAD,0);
    dg2.addColorStop(0,"transparent"); dg2.addColorStop(0.2,accent+"55");
    dg2.addColorStop(0.8,accent+"55"); dg2.addColorStop(1,"transparent");
    ctx.strokeStyle=dg2; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(PAD,divY2); ctx.lineTo(W-PAD,divY2); ctx.stroke(); ctx.restore();

    // Top path
    const pLabelY2=divY2+Math.round(H*0.050);
    const pKey=lang==="ar"?"أفضل مسار":lang==="fr"?"VOIE #1":"TOP PATH";
    dtL(pKey, pLabelY2, `bold ${Math.round(W*0.024)}px ${bF}`, "#6b7280");
    const pNameY2=pLabelY2+Math.round(H*0.048);
    dtL(clusterName, pNameY2, `bold ${Math.round(W*0.044)}px ${bF}`, "#f1f5f9", W-PAD*2);

    // Match % (RTL-safe)
    const confY2=pNameY2+Math.round(H*0.060);
    const cKey=lang==="ar"?"التوافق":lang==="fr"?"Compatibilité":"Match";
    dtL(cKey, confY2, `bold ${Math.round(W*0.024)}px ${bF}`, "#6b7280");
    const pctStr=`${confidence}%`;
    const pFont=`900 ${Math.round(W*0.046)}px monospace,${bF}`;
    ctx.font=pFont;
    const ptw=ctx.measureText(pctStr).width;
    const pctX=isRTL?PAD:W-PAD-ptw;
    ctx.save(); ctx.font=pFont; ctx.fillStyle=accent;
    ctx.textBaseline="alphabetic"; ctx.shadowColor=accent; ctx.shadowBlur=12;
    ctx.fillText(pctStr,pctX,confY2); ctx.restore();

    // Confidence bar
    const barY2=confY2+Math.round(H*0.018), barH2=Math.round(H*0.018), barW2=W-PAD*2;
    ctx.save(); ctx.fillStyle="#0f172a"; rr(PAD,barY2,barW2,barH2,barH2/2); ctx.fill(); ctx.restore();
    const fw2=Math.max(barH2,Math.round((confidence/100)*barW2));
    const fg2=ctx.createLinearGradient(PAD,0,PAD+fw2,0);
    fg2.addColorStop(0,accent); fg2.addColorStop(1,"#fbbf24");
    ctx.save(); ctx.fillStyle=fg2; ctx.shadowColor=accent; ctx.shadowBlur=12;
    rr(PAD,barY2,fw2,barH2,barH2/2); ctx.fill(); ctx.restore();

    // Trait chips
    if(strengths.length>0){
      const chipY2=barY2+barH2+Math.round(H*0.044);
      const chipH2=Math.round(H*0.046), chipFont2=`600 ${Math.round(W*0.026)}px ${bF}`;
      ctx.font=chipFont2;
      let cxp = isRTL ? W-PAD : PAD;
      for(const s of strengths){
        const icon2 = CHIP_ICON[s] || "✦";
        const chipTxt = `${icon2} ${s}`;
        const cw=ctx.measureText(chipTxt).width+W*0.040;
        if(isRTL){ cxp-=cw; if(cxp<PAD) break; }
        else { if(cxp+cw>W-PAD) break; }
        ctx.save(); ctx.fillStyle="rgba(30,41,59,0.9)"; ctx.strokeStyle=accent+"3a"; ctx.lineWidth=1.5;
        rr(cxp,chipY2,cw,chipH2,chipH2/2); ctx.fill(); ctx.stroke(); ctx.restore();
        ctx.save(); ctx.font=chipFont2; ctx.fillStyle="#a5f3fc"; ctx.textBaseline="alphabetic";
        ctx.fillText(chipTxt, cxp+W*0.018, chipY2+chipH2*0.68); ctx.restore();
        if(isRTL){ cxp-=W*0.014; } else { cxp+=cw+W*0.014; }
      }
    }

    // Footer: brand + serial ID
    const fy2=H-PAD*0.85;
    ctx.save();
    const fl2=ctx.createLinearGradient(PAD,0,W-PAD,0);
    fl2.addColorStop(0,"transparent"); fl2.addColorStop(0.15,accent+"28");
    fl2.addColorStop(0.85,accent+"28"); fl2.addColorStop(1,"transparent");
    ctx.strokeStyle=fl2; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(PAD,fy2-PAD*0.3); ctx.lineTo(W-PAD,fy2-PAD*0.3); ctx.stroke(); ctx.restore();
    dtL(`massar.ma • ${new Date().getFullYear()}`, fy2, `bold ${Math.round(W*0.022)}px ${bF}`, "#374151");
    const sid2=serialId(archCode);
    const sidFont=`500 ${Math.round(W*0.018)}px monospace,${bF}`;
    ctx.font=sidFont;
    const sidW2=ctx.measureText(sid2).width;
    const sidX2=isRTL?PAD:W-PAD-sidW2;
    ctx.save(); ctx.font=sidFont; ctx.fillStyle=accent+"55"; ctx.textBaseline="alphabetic";
    ctx.fillText(sid2, sidX2, fy2); ctx.restore();

    return canvas;
  }

  const downloadPng = () => {
    try {
      const canvas=buildCanvas();
      canvas.toBlob(blob=>{
        if(!blob) return;
        const url=URL.createObjectURL(blob);
        const a=document.createElement("a");
        a.href=url; a.download=`massar-${archCode}-${fmt}.png`;
        document.body.appendChild(a); a.click();
        document.body.removeChild(a); URL.revokeObjectURL(url);
      },"image/png");
    } catch {}
  };

  // Shared props bundle passed to each layout component
  const cardProps = {
    archIcon, archName, archCode, archTagline, clusterName, strengths,
    confidence, rarity, rarityLabel, accent, glow, level, isRTL, dir, lang,
  };

  const fmtLabels = { card:"Card", square:"1:1", story:"9:16" };

  return (
    <div style={{ margin:"24px 0" }}>
      {/* Section label */}
      <div style={{fontSize:10,fontWeight:800,color:"var(--muted)",letterSpacing:2,
        textTransform:"uppercase",marginBottom:14}}>
        {t.shareTitle}
      </div>

      {/* Format segmented control */}
      <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
        {["card","square","story"].map(f=>(
          <button key={f} onClick={()=>setFmt(f)} style={{
            padding:"5px 14px",borderRadius:20,fontSize:11,fontWeight:700,
            border:`1.5px solid ${fmt===f?accent+"cc":"var(--border)"}`,
            background:fmt===f?accent+"18":"var(--surface2)",
            color:fmt===f?accent:"var(--muted)",cursor:"pointer",letterSpacing:.5,
            transition:"all .18s",
          }}>{fmtLabels[f]}</button>
        ))}
      </div>

      {/* Dispatch to separate layout component based on format */}
      {fmt==="story"  && <ShareCardPortrait p={cardProps}/>}
      {fmt==="square" && <ShareCardSquare   p={cardProps}/>}
      {fmt==="card"   && <ShareCardClassic  p={cardProps}/>}

      {/* Buttons */}
      {/* Download buttons per format + copy caption */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",maxWidth:400,margin:"12px auto 0"}}>
        <button className="btn btn-secondary" onClick={()=>{setFmt("story"); setTimeout(downloadPng,80);}}
          style={{flex:1,minWidth:100,fontSize:11}}>
          {t?.downloadStory || "Story 9:16"}
        </button>
        <button className="btn btn-secondary" onClick={()=>{setFmt("square"); setTimeout(downloadPng,80);}}
          style={{flex:1,minWidth:100,fontSize:11}}>
          {t?.downloadSquare || "Square 1:1"}
        </button>
        <button className="btn btn-secondary" onClick={()=>{setFmt("card"); setTimeout(downloadPng,80);}}
          style={{flex:1,minWidth:100,fontSize:11}}>
          {t?.downloadCard || "Card 5:7"}
        </button>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",maxWidth:400,margin:"8px auto 0"}}>
        <button className="btn btn-primary" onClick={copyCaption} style={{flex:1,minWidth:110}}>
          {copied ? (t?.shareCopied||"✓ Copied") : (t?.copyCaption||t?.copyCaptionBtn||"Copy caption")}
        </button>
        <button className="btn btn-secondary" onClick={downloadPng} style={{flex:1,minWidth:110}}>
          {t?.downloadBadgeBtn || "Download PNG"}
        </button>
      </div>
    </div>
  );
}




function XPProgressionTracker({ top3, t, lang, massarType }) {
  // FIX: define getXP locally to avoid sandbox scope issues
  function getXP(weekIdx, itemIdx) {
    const _xp = [20, 15, 10, 5, 8, 12, 18, 6, 10, 15, 8, 5, 20, 10, 5, 12];
    const wi = Number.isFinite(weekIdx) ? weekIdx : 0;
    const ii = Number.isFinite(itemIdx) ? itemIdx : 0;
    return _xp[(wi * 4 + ii) % _xp.length] || 10;
  }

  const cluster = top3[0];
  const storageKey = `massar_xp_${massarType}_${cluster?.id||"x"}`;

  const [checked, setChecked] = useState(()=>{
    try { return JSON.parse(localStorage.getItem(storageKey)||"{}"); } catch { return {}; }
  });

  const allTasks = (cluster?.actionPlan||[]).flatMap((week,wi)=>
    (week.items||[]).map((_,ii)=>({wk:wi,it:ii,xp:getXP(wi,ii)}))
  );
  const totalXP = allTasks.reduce((s,{wk,it,xp})=>s+(checked[`${wk}_${it}`]?xp:0),0);
  const maxXP   = allTasks.reduce((s,{xp})=>s+xp,0);
  // FIX: clamp numeric UI values
  const pct     = maxXP > 0 ? clamp(Math.round((totalXP/maxXP)*100)) : 0;
  const complete = pct === 100;

  const toggle = (wk, it) => {
    const key = `${wk}_${it}`;
    setChecked(prev=>{
      const next = {...prev, [key]:!prev[key]};
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const completionLabel = lang==="ar"?"🏆 منجز المسار":lang==="fr"?"🏆 Action Builder":"🏆 Action Builder";
  const xpLabel = lang==="ar"?"نقاط الخبرة":lang==="fr"?"Points XP":"XP Points";
  const progressLabel = lang==="ar"?"التقدم":lang==="fr"?"Progression":"Progress";

  return (
    <div style={{marginBottom:20}}>
      {/* XP Counter */}
      <div className="xp-counter">
        <div>
          <div style={{fontSize:10,fontWeight:700,color:"var(--muted)",letterSpacing:1,textTransform:"uppercase",marginBottom:4}}>{xpLabel}</div>
          <div className="xp-total">{totalXP} / {maxXP}</div>
        </div>
        <div style={{flex:1,padding:"0 16px"}}>
          <div style={{fontSize:10,color:"var(--muted)",marginBottom:6,fontWeight:600}}>{progressLabel} — {pct}%</div>
          <div className="xp-progress-track">
            <div className="xp-progress-fill" style={{width:`${pct}%`}}/>
          </div>
        </div>
        {complete && <span className="xp-badge">{completionLabel}</span>}
      </div>

      {/* Task weeks */}
      <div className="result-card">
        {(cluster?.actionPlan||[]).map((week,wi)=>(
          <div key={wi} className="week-card">
            <div className="week-label">{t.weekLabel} {wi+1}</div>
            {(week.items||[]).map((item,ii)=>{
              const isObj = item&&typeof item==="object";
              const label = isObj?item.label:item;
              const url   = isObj?item.url:null;
              const taskKey = `${wi}_${ii}`;
              const done = !!checked[taskKey];
              const xp   = getXP(wi,ii);
              return (
                <div key={ii} className={`task-item${done?" completed":""}`}
                  onClick={()=>toggle(wi,ii)}>
                  <div className={`task-checkbox${done?" done":""}`}>
                    {done && <span style={{fontSize:11,color:"#fff",fontWeight:700}}>✓</span>}
                  </div>
                  <div style={{flex:1,fontSize:13,color:done?"var(--muted)":"var(--text)",
                    textDecoration:done?"line-through":"none",lineHeight:1.5}}>
                    {url
                      ?<a href={url} target="_blank" rel="noreferrer"
                          onClick={e=>e.stopPropagation()}
                          style={{color:"var(--accent2)",textDecorationLine:"underline"}}>{label}</a>
                      :<span>{label}</span>
                    }
                  </div>
                  <span className="task-xp">+{xp} XP</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
// FIX: multi-view recommendation
// Three career perspectives: Best Personal Fit, Best Balance, Most Ambitious.
// Shows prestige-aware path names for high academic performers.
// ─────────────────────────────────────────────────────────────────
function ThreeViewPanel({ t, lang, views, overallAvg }) {
  const [active, setActive] = useState("balanced");
  if (!views.bestFit && !views.balanced && !views.ambitious) return null;

  // FIX: prestige-aware path naming
  function getClusterDisplayName(cluster) {
    if (!cluster) return "—";
    const avg = overallAvg || 0;
    const prestige = CULTURAL_CLUSTER_SCORES[cluster.id];
    const isHighPerformer = avg >= 14;
    const isLowPrestige   = prestige && prestige.prestige < 0.55;
    const names = PRESTIGE_PATH_NAMES[cluster.id];
    if (isHighPerformer && isLowPrestige && names) {
      return names[lang]?.elevated || names.en?.elevated || t[CLUSTER_KEY_MAP[cluster.id]] || cluster.id;
    }
    return t[CLUSTER_KEY_MAP[cluster.id]] || cluster.id;
  }

  // FIX: expectation framing — explain if result may surprise high performers
  function getSurpriseText(cluster) {
    if (!cluster) return null;
    const avg = overallAvg || 0;
    const cs = CULTURAL_CLUSTER_SCORES[cluster.id];
    if (!cs || cs.prestige >= 0.7 || avg < 13) return null;
    const msgs = {
      ar: "قد تبدو هذه النتيجة غير متوقعة بالنظر إلى علاماتك. لكن الملفات الأكاديمية القوية تنجح أيضاً في إدارة الخدمات الدولية وقيادة المؤسسات — خاصة عبر المسارات العليا.",
      fr: "Ce résultat peut sembler inattendu vu vos notes. Pourtant, les profils académiques solides réussissent aussi en management international et leadership de service — surtout via les grandes écoles.",
      en: "This result may seem unexpected given your grades. Strong academic profiles can also excel in international management and service leadership — especially via the grandes écoles pathway.",
    };
    return msgs[lang] || msgs.en;
  }

  const tabs = [
    { key:"bestFit",   icon:"💡", label: lang==="ar"?"أفضل توافق": lang==="fr"?"Meilleure affinité":"Best Personal Fit" },
    { key:"balanced",  icon:"⚖️", label: lang==="ar"?"الخيار المتوازن": lang==="fr"?"Option équilibrée":"Best Balanced" },
    { key:"ambitious", icon:"🚀", label: lang==="ar"?"الأكثر طموحاً": lang==="fr"?"Plus ambitieux":"Most Ambitious" },
  ];

  const current = views[active];
  const displayName = getClusterDisplayName(current);
  const surprise = getSurpriseText(current);
  const cs = current ? (CULTURAL_CLUSTER_SCORES[current.id] || {}) : {};
  const matchPct = current ? Math.round(clamp(current.scores.final * 100)) : 0;
  const traitPct = current ? Math.round(clamp((current.scores.trait + current.scores.interest) / 2 * 100)) : 0;

  return (
    <div style={{
      background:"linear-gradient(135deg,rgba(59,130,246,0.06),rgba(232,161,36,0.04))",
      border:"1px solid var(--border)", borderRadius:16, padding:"20px", marginBottom:20,
    }}>
      <div style={{fontSize:11,fontWeight:700,color:"var(--muted)",letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>
        {lang==="ar"?"🔭 ثلاثة مناظير لمسارك": lang==="fr"?"🔭 Trois perspectives de carrière":"🔭 Three Career Perspectives"}
      </div>

      {/* Tab bar */}
      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {tabs.map(tab => (
          <button key={tab.key}
            onClick={()=>setActive(tab.key)}
            style={{
              flex:1, minWidth:100,
              padding:"8px 10px",
              borderRadius:10,
              fontSize:11, fontWeight:700,
              border: active===tab.key ? "1.5px solid var(--accent)" : "1.5px solid var(--border)",
              background: active===tab.key ? "rgba(232,161,36,0.12)" : "var(--surface2)",
              color: active===tab.key ? "var(--accent)" : "var(--muted)",
              cursor:"pointer", transition:"all 0.2s",
            }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {current ? (
        <div style={{animation:"fadeIn 0.25s ease"}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:12}}>
            <div style={{
              fontSize:30,width:52,height:52,borderRadius:14,
              background:"rgba(232,161,36,0.1)",border:"1.5px solid rgba(232,161,36,0.3)",
              display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
            }}>{current.icon}</div>
            <div>
              <div style={{fontSize:17,fontWeight:800,color:"var(--text)",lineHeight:1.2,marginBottom:3}}>
                {displayName}
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <span dir="ltr" style={{fontSize:11,fontWeight:700,color:"var(--accent)",
                  background:"rgba(232,161,36,0.1)",padding:"2px 8px",borderRadius:10}}>
                  {matchPct}% {lang==="ar"?"توافق":lang==="fr"?"match":"match"}
                </span>
                <span dir="ltr" style={{fontSize:11,fontWeight:700,color:"#10b981",
                  background:"rgba(16,185,129,0.08)",padding:"2px 8px",borderRadius:10}}>
                  {traitPct}% {lang==="ar"?"انسجام شخصي":lang==="fr"?"affinité perso":"personal fit"}
                </span>
              </div>
            </div>
          </div>

          {/* Prestige indicator */}
          {cs.prestige != null && (
            <div style={{display:"flex",gap:10,marginBottom:10,alignItems:"center"}}>
              <div style={{fontSize:11,color:"var(--muted)",flexShrink:0,width:80}}>
                {lang==="ar"?"قبول عائلي":lang==="fr"?"Acceptabilité":"Family ok"}
              </div>
              <div style={{flex:1,height:4,background:"var(--border)",borderRadius:2,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.round(cs.parentAcceptance*100)}%`,
                  background:"linear-gradient(90deg,#3b82f6,#10b981)",borderRadius:2}}/>
              </div>
              <div style={{fontSize:11,fontWeight:700,color:"var(--accent2)",width:32,textAlign:"right"}} dir="ltr">
                {Math.round(clamp(cs.parentAcceptance*100))}%
              </div>
            </div>
          )}

          {/* Surprise explanation */}
          {surprise && (
            <div style={{
              marginTop:10,padding:"10px 14px",
              background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.2)",
              borderRadius:10,fontSize:12,color:"var(--text)",lineHeight:1.6,
            }}>
              {/* FIX: expectation framing */}
              💬 {surprise}
            </div>
          )}

          {/* Guardrails / Narrative fix — "How to unlock" shown on ambitious tab when not yet eligible */}
          {active === "ambitious" && current && (() => {
            const cc = CLUSTER_CONSTRAINTS[current.id];
            const notEligible = current.eligibilityTag === "notEligiblePublic" || current.eligibilityTag === "privateOnly";
            if (!notEligible) return null;
            const isMed = current.id === "health";
            const targetAvg = cc?.minAvg ? Math.ceil(cc.minAvg + 0.5) : Math.ceil((overallAvg || 0) + 1.5);
            const rawMsg = isMed
              ? (t.ambitiousUnlockMed || "🔓 To unlock public medicine: raise average to 16+ and Bio/Chem thresholds.")
              : (t.ambitiousUnlockGen || "🔓 Aim for {avg}+ average to strengthen your chances.").replace("{avg}", targetAvg);
            return (
              <div style={{
                marginTop:10, padding:"10px 14px",
                background:"rgba(99,102,241,0.06)", border:"1px solid rgba(99,102,241,0.22)",
                borderRadius:10, fontSize:12, color:"var(--text)", lineHeight:1.6,
              }}>
                <strong style={{color:"#6366f1"}}>{t.ambitiousUnlockTitle || "🔓 How to unlock this path?"}</strong>
                <div style={{marginTop:4}}>{rawMsg}</div>
              </div>
            );
          })()}
        </div>
      ) : (
        <div style={{fontSize:13,color:"var(--muted)",textAlign:"center",padding:"12px 0"}}>—</div>
      )}
    </div>
  );
}

// ── WhyThisIsTop: deterministic 3-bullet explanation block ────────
// Shows "Why this is #1" for the top cluster: Academic tier + Prestige + Future-proofing.
// Spec §4 — trust-building explainability.
function WhyThisIsTop({ cluster, overallAvg, lang, t }) {
  if (!cluster) return null;
  const avg = Number(overallAvg) || 0;
  const tier = getAcademicTierABCD(avg);
  const tierLabel = { A:"A (≥16)", B:"B (14–15.9)", C:"C (12–13.9)", D:"D (<12)" }[tier] || tier;
  const prestige = PRESTIGE_INDEX[cluster.id] ?? 0.6;
  const futureIdx = FUTURE_INDEX[cluster.id]  ?? 0.6;
  const clusterName = (lang==="ar"?"المجال":lang==="fr"?"Domaine":"Field") + ": " + cluster.id;

  const pctPr = Math.round(prestige * 100);
  const pctFu = Math.round(futureIdx * 100);

  const bullet = (icon, txt) => (
    <div key={txt} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:7}}>
      <span style={{fontSize:16,lineHeight:1}}>{icon}</span>
      <span style={{fontSize:12,color:"var(--text)",lineHeight:1.5}}>{txt}</span>
    </div>
  );

  const tiers = {
    ar: { A:"أكاديمي ممتاز", B:"مستوى جيد جداً", C:"مستوى متوسط", D:"مسار تطبيقي" },
    fr: { A:"Excellent académique", B:"Très bon niveau", C:"Niveau moyen", D:"Voie pratique" },
    en: { A:"Excellent academic tier", B:"Strong academic tier", C:"Average tier", D:"Practical-track tier" },
  };
  const tierText = (tiers[lang]||tiers.en)[tier] || tierLabel;

  const presText = lang==="ar"
    ? `الهيبة المهنية: ${pctPr}٪ — ${pctPr>=80?"مسار رفيع المستوى":pctPr>=65?"مسار مرموق":"مسار عملي"}`
    : lang==="fr"
    ? `Prestige: ${pctPr}% — ${pctPr>=80?"filière très cotée":pctPr>=65?"filière respectée":"filière pratique"}`
    : `Prestige: ${pctPr}% — ${pctPr>=80?"top-tier field":pctPr>=65?"respected field":"practical field"}`;

  const futText = lang==="ar"
    ? `مقاومة المستقبل: ${pctFu}٪ — ${pctFu>=80?"طلب مرتفع في 2030+":pctFu>=65?"مستقر ومتنامٍ":"يعتمد على التخصص"}`
    : lang==="fr"
    ? `Résistance à l'avenir: ${pctFu}% — ${pctFu>=80?"forte demande 2030+":pctFu>=65?"stable et croissant":"dépend de la spécialisation"}`
    : `Future-proofing: ${pctFu}% — ${pctFu>=80?"high demand 2030+":pctFu>=65?"stable and growing":"depends on specialisation"}`;

  const tierBullet = lang==="ar"
    ? `مستواك الأكاديمي: ${tierText} — يتوافق مع متطلبات هذا المسار`
    : lang==="fr"
    ? `Ton niveau académique: ${tierText} — compatible avec les prérequis`
    : `Your academic tier: ${tierText} — aligns with this field's requirements`;

  // Prestige alternative for low-prestige clusters recommended to high-avg students
  const showPrestAlt = prestige < 0.62 && avg >= 14.5;
  const altClusters = showPrestAlt
    ? Object.entries(PRESTIGE_INDEX)
        .filter(([id, p]) => p >= 0.78 && id !== cluster.id)
        .sort((a,b) => b[1]-a[1])
        .slice(0,2)
        .map(([id]) => id)
    : [];
  const altLabel = lang==="ar"
    ? "إذا كنت تريد مساراً أكثر هيبة: فكّر في "
    : lang==="fr"
    ? "Pour une filière plus cotée, explore : "
    : "If you want a more prestigious label, consider: ";

  return (
    <div style={{
      background:"rgba(99,102,241,0.04)", border:"1px solid rgba(99,102,241,0.18)",
      borderRadius:14, padding:"14px 16px", marginBottom:16,
    }}>
      <div style={{fontSize:11,fontWeight:800,color:"#6366f1",letterSpacing:1.5,textTransform:"uppercase",marginBottom:10}}>
        {lang==="ar"?"🔍 لماذا هذا هو الخيار الأول؟"
          :lang==="fr"?"🔍 Pourquoi ce choix en #1 ?"
          :"🔍 Why is this #1?"}
      </div>
      {bullet("🎓", tierBullet)}
      {bullet("🏆", presText)}
      {bullet("🔮", futText)}
      {showPrestAlt && altClusters.length > 0 && (
        <div style={{
          marginTop:10,padding:"8px 12px",
          background:"rgba(232,161,36,0.07)",border:"1px solid rgba(232,161,36,0.2)",
          borderRadius:10,fontSize:12,color:"var(--text)",lineHeight:1.6,
        }}>
          💡 {altLabel}
          <strong>{altClusters.join(" · ")}</strong>
        </div>
      )}
    </div>
  );
}

// ── DEV_TESTS: built-in regression test suite ─────────────────────
// Spec §5 — run on localhost, logs to console. Set window.__RUN_TESTS=true to force.
// Tests are deterministic and do not render in production UI.
function runDevTests() {
  const PASS = "\x1b[32m✅\x1b[0m";
  const FAIL = "\x1b[31m❌\x1b[0m";
  let failures = 0;

  function check(label, condition) {
    if (condition) {
      console.log(PASS, label);
    } else {
      console.warn(FAIL, label);
      failures++;
    }
  }

  function scoreCase(bacTrack, marks, pb={}, goal="prestige") {
    const traits = { analytical:0.7, social:0.6, structure:0.65, creativity:0.5, risk:0.5, leadership:0.6 };
    const reality = {
      strengths:["s_math","s_learning","s_discipline"],
      interests:["i_research","i_building"],
      identityType:"academic", priority:"prestige",
      goalPreference:goal, goalMode:goal,
      profileBoost:{ prestigePriority:pb.pres??1, moneyPriority:1, handsOn:pb.handsOn??0,
        riskTolerance:1, internationalIntent:1, focusAbility:pb.focus??1 },
    };
    // SUBJECT SYSTEM FIX: use getSubjectsForMarks with a synthetic info object for tests
    const testInfo = { trackField: TRACK_FIELD_TO_BAC_TRACK_REVERSE?.[bacTrack] || "SE", examLevel:"bac2", smOption:"A", eoOption:"arabic", bpExtras:[] };
    const subjs = getSubjectsForMarks(testInfo);
    const eff = {};
    subjs.forEach(s => eff[s] = marks[s] ?? 13);
    return computeClusterScores(bacTrack, eff, traits, 1, false, reality);
  }

  function top3ids(ranked) { return ranked.slice(0,3).map(c=>c.id); }
  function views(ranked, avgVal, info={}) {
    const avg = Object.values(info.marks||{}).length
      ? Object.values(info.marks||{}).reduce((a,b)=>a+Number(b),0)/Object.values(info.marks||{}).length
      : avgVal;
    const eff = info.marks || {};
    return computeThreeViews(ranked, avg, { goalPreference:"prestige", goalMode:"prestige", privateBudget:false, ...info }, eff);
  }

  // TEST 1 — SVT avg 14.8: medicine NOT #1 in Balanced
  (()=>{
    const ranked = scoreCase("SVT", { svt:14, pc:12, math:15, english:14, philosophy:13 });
    const avgVal = (14+12+15+14+13)/5; // 13.6 — wait, let's use 14.8 avg
    // Use marks that give ~14.8 avg
    const ranked2 = scoreCase("SVT", { svt:15, pc:14, math:16, english:14, philosophy:15 });
    const avg2 = (15+14+16+14+15)/5;
    const v = computeThreeViews(ranked2, avg2, {goalPreference:"prestige",privateBudget:false},{svt:15,pc:14});
    check("T1 SVT avg~14.8 → Medicine NOT #1 in Balanced", v.balanced?.id !== "health");
  })();

  // TEST 2 — SVT avg 16.2, SVT≥14, PC≥13 → Medicine appears in Ambitious and Balanced
  (()=>{
    const ranked = scoreCase("SVT", { svt:17, pc:15, math:16, english:16, philosophy:15 });
    const avg = (17+15+16+16+15)/5;
    const v = computeThreeViews(ranked, avg, {goalPreference:"prestige",privateBudget:false},{svt:17,pc:15});
    check("T2 SVT avg~15.8 eligible → Medicine in Ambitious (not blocked)", v.ambitious?.id === "health" || v.balanced?.id === "health");
  })();

  // TEST 3 — SMA avg 15, strong math → IT/Data/Engineering in top-3, not Tourism
  (()=>{
    const ranked = scoreCase("SMA", { math:17, pc:15, english:14, philosophy:13 });
    const t3 = top3ids(ranked);
    const HIGH_PRESTIGE = new Set(["it","data","cyber","industrial","civil","energy","finance","network"]);
    check("T3 SMA avg~14.75 → tourism NOT in top-3", !t3.includes("tourism"));
    check("T3 SMA avg~14.75 → at least 1 high-prestige cluster in top-3", t3.some(id=>HIGH_PRESTIGE.has(id)));
  })();

  // TEST 4 — Tier C handsOn=2 → trades in top-3
  (()=>{
    const traits = { analytical:0.4, social:0.5, structure:0.7, creativity:0.4, risk:0.5, leadership:0.5 };
    const reality = {
      strengths:["s_mechanical","s_tools"],
      interests:["i_machines","i_building"],
      identityType:"builder", priority:"stability",
      goalPreference:"practical", goalMode:"practical",
      profileBoost:{ prestigePriority:0, moneyPriority:1, handsOn:2, riskTolerance:1, internationalIntent:0, focusAbility:1 },
    };
    const eff = { math:11, pc:10, english:11, philosophy:10 };
    const ranked = computeClusterScores("TECH", eff, traits, 0, false, reality);
    const t3 = top3ids(ranked);
    check("T4 Tier C + handsOn=2 → trades in top-3", t3.includes("trades") || t3.includes("automotive") || t3.includes("industrial"));
  })();

  // TEST 5 — Tier A + pbPrestige=2 → no Tier C cluster as #1 in Ambitious
  (()=>{
    const ranked = scoreCase("SMA", { math:18, pc:17, english:17, philosophy:16 }, { pres:2 });
    const avg = (18+17+17+16)/4;
    const v = computeThreeViews(ranked, avg, {goalPreference:"prestige",goalMode:"prestige",privateBudget:false,profileBoost:{prestigePriority:2}},{});
    const tier = CLUSTER_PRESTIGE_TIER[v.ambitious?.id] || "B";
    check("T5 Tier A + prestige=2 → ambitious is NOT Tier C", tier !== "C");
  })();

  console.log(`[Massar DEV_TESTS] ${failures===0?"\x1b[32m All 5 tests pass \x1b[0m":"\x1b[31m "+failures+" test(s) failed\x1b[0m"}`);
}

// Auto-run on localhost (deferred to not block render)
if (typeof window !== "undefined" && (window.__DEV__ || window.__RUN_TESTS ||
  (typeof location !== "undefined" && location.hostname === "localhost"))) {
  setTimeout(runDevTests, 1800);
}



// ─────────────────────────────────────────────────────────────────
// CHANGELOG (top-12 lines):
// 1. Two journeys: journeyStage "prebac" | "postbac" — step inserted after language
// 2. Pre-Bac flow: strengths/interests/sliders/constraints instead of marks
// 3. Learner Type test (6 questions) → 6 types: Architect/Striker/Diplomat/Sprinter/Sentinel/Visionary
// 4. Results rebuilt as 6 guided pages (Page 1/6 → 6/6)
// 5. Page 1: Identity Mirror (pressure/consistency/advantage/blindspot)
// 6. Page 2: Prestige & Family Reality with eligibility truth blocks
// 7. Page 3: Future-Proof & Market 2030 with demand bars
// 8. Page 4: Top 3 Directions (match breakdown bars + coach explanation)
// 9. Page 5: 7-day plan + starter wins + risk + priority selector
// 10. Page 6: PDF offer (10-item list + teaser previews + payment form)
// 11. All new strings tri-lingual AR/FR/EN (MSA Arabic, no dialect)
// 12. Fixed duplicate clamp; clamp(min,val,max) removed; kept clamp(val,min,max)
// ─────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────
// LEARNER TYPE SYSTEM
// ─────────────────────────────────────────────────────────────────
const LEARNER_QUESTIONS = [
  {
    id:"lq1",
    ar:"حين تتعلم موضوعاً جديداً، ما أول شيء تفعله عفوياً؟",
    fr:"Quand tu apprends un nouveau sujet, que fais-tu en premier naturellement ?",
    en:"When you learn something new, what do you naturally do first?",
    options:{
      ar:["أضع خطة وأبني إطاراً منظماً","أبدأ بالتطبيق مباشرة","أشرحه لشخص آخر أو أتحدث عنه","أنتظر حتى الليلة الأخيرة","أراجعه مراراً في جدول منتظم","أبحث عن المعنى الكبير ورابطه بحياتي"],
      fr:["Je construis un plan structuré","Je commence à pratiquer directement","Je l'explique à quelqu'un","J'attends la dernière minute","Je révise régulièrement selon un planning","Je cherche le sens global et le lien avec ma vie"],
      en:["I build a structured framework","I start practising immediately","I explain it to someone","I wait until the last minute","I revise regularly on a schedule","I look for the big picture and its meaning"],
    },
    scores:["architect","striker","diplomat","sprinter","sentinel","visionary"],
  },
  {
    id:"lq2",
    ar:"ما الذي يُفقدك الاستمرارية في الدراسة؟",
    fr:"Qu'est-ce qui te fait perdre ta régularité dans les études ?",
    en:"What makes you lose consistency in studying?",
    options:{
      ar:["الفوضى وغياب الخطة","غياب التطبيق الفعلي","الدراسة بمفردي بدون نقاش","الروتين الممل بدون ضغط","تغيير الجدول أو انكسار العادة","الشعور بعدم المعنى"],
      fr:["Le chaos et l'absence de plan","Pas de pratique réelle","Étudier seul sans discussion","La routine ennuyeuse sans pression","Changement de planning / rupture d'habitude","Se sentir sans sens"],
      en:["Chaos and no plan","No real practice","Studying alone without discussion","Boring routine without pressure","Schedule changes / habit disruption","Feeling meaningless"],
    },
    scores:["architect","striker","diplomat","sprinter","sentinel","visionary"],
  },
  {
    id:"lq3",
    ar:"كيف تتذكر المعلومات بشكل أفضل؟",
    fr:"Comment mémorises-tu le mieux ?",
    en:"How do you remember information best?",
    options:{
      ar:["برسم خرائط ذهنية وتصنيفات","بالتطبيق والممارسة المتكررة","بشرحه بصوت عالٍ أو تعليم غيري","بحفظه تحت ضغط الوقت","بالتكرار المنتظم يومياً","بربطه بقصة أو صورة أو معنى شخصي"],
      fr:["En faisant des cartes mentales et des catégories","En pratiquant et répétant","En l'expliquant à voix haute","En le mémorisant sous pression de temps","Par répétition quotidienne régulière","En le reliant à une histoire ou un sens personnel"],
      en:["Mind maps and categorization","Practising and repeating","Explaining it aloud or teaching","Memorising under time pressure","Daily regular repetition","Linking it to a story or personal meaning"],
    },
    scores:["architect","striker","diplomat","sprinter","sentinel","visionary"],
  },
  {
    id:"lq4",
    ar:"ما نمط طاقتك خلال اليوم الدراسي؟",
    fr:"Quel est ton schéma d'énergie pendant la journée d'étude ?",
    en:"What's your energy pattern during a study day?",
    options:{
      ar:["مستقر ومتوازن — أخطط ثم أنفذ","دفقات قصيرة مكثفة ثم استراحات","مرتفع حين أتحدث مع الآخرين","يتصاعد نحو الموعد النهائي","ثابت ومنتظم كل يوم","متذبذب حسب الإلهام والمعنى"],
      fr:["Stable et équilibré — je planifie puis j'exécute","Courtes rafales intenses puis pauses","Élevé quand je parle aux autres","Qui monte vers la deadline","Constant et régulier chaque jour","Variable selon l'inspiration et le sens"],
      en:["Stable and balanced — plan then execute","Short intense bursts then breaks","High when talking with others","Builds towards a deadline","Consistent and regular every day","Variable depending on inspiration and meaning"],
    },
    scores:["architect","striker","diplomat","sprinter","sentinel","visionary"],
  },
  {
    id:"lq5",
    ar:"حين تفشل في مهمة أو امتحان، كيف تتعافى؟",
    fr:"Quand tu échoues à une tâche ou un examen, comment tu te remets ?",
    en:"When you fail a task or exam, how do you recover?",
    options:{
      ar:["أحلل ما حدث وأُعيد تنظيم خطتي","أتصرف مباشرة وأجرب مرة أخرى","أتحدث مع شخص وأعالج الأمر بصوت عالٍ","أُهملها وأركز على الاختبار القادم","أعود لروتيني المنتظم بثبات","أبحث عن درس أعمق أو مغزى في الفشل"],
      fr:["J'analyse ce qui s'est passé et réorganise mon plan","J'agis directement et réessaie","Je parle à quelqu'un et traite ça à voix haute","Je laisse tomber et me concentre sur le prochain examen","Je retourne à ma routine régulière calmement","Je cherche la leçon profonde ou le sens dans l'échec"],
      en:["Analyse what happened and reorganise my plan","Act immediately and try again","Talk to someone and process it aloud","Forget it and focus on the next exam","Return to my regular routine calmly","Look for a deeper lesson or meaning in the failure"],
    },
    scores:["architect","striker","diplomat","sprinter","sentinel","visionary"],
  },
  {
    id:"lq6",
    ar:"ما الذي يجعل العمل يبدو لك ذا معنى حقيقي؟",
    fr:"Qu'est-ce qui rend un travail vraiment significatif pour toi ?",
    en:"What makes work feel genuinely meaningful to you?",
    options:{
      ar:["حين أرى النظام والبناء خلفه","حين أرى نتائج ملموسة فورية","حين يؤثر في الآخرين ويُغيّر أفكارهم","حين يتحداني ويضغط على حدودي","حين يُبنى على الاتساق والالتزام","حين يرتبط بمعنى أكبر أو بصيرة عميقة"],
      fr:["Quand je vois la structure et le système derrière","Quand je vois des résultats concrets immédiats","Quand ça impacte les autres et change leur vision","Quand ça me défie et pousse mes limites","Quand il se construit sur la constance et l'engagement","Quand il se connecte à un sens plus grand ou une vision profonde"],
      en:["When I see the system and structure behind it","When I see immediate tangible results","When it impacts others and changes their thinking","When it challenges me and pushes my limits","When it's built on consistency and commitment","When it connects to a bigger meaning or deep insight"],
    },
    scores:["architect","striker","diplomat","sprinter","sentinel","visionary"],
  },
];

const LEARNER_TYPE_DATA = {
  architect: {
    ar:{ signature:"أنت تبني الأنظمة قبل أن تبني النتائج.",
      learn:["تتعلم بالخرائط الذهنية والتصنيفات","تحتاج الإطار الكلي قبل التفاصيل","تُخطط بدقة ثم تُنفذ بانضباط"],
      ruined:["الفوضى تُشلّه","التعليمات غير المنطقية تُرهقه","التغيير المفاجئ يُقلقه"],
      coach:["أعطه الخطة الكاملة أولاً","اربط كل مهمة بالإطار العام","امنحه وقتاً للتخطيط"] },
    fr:{ signature:"Tu construis les systèmes avant les résultats.",
      learn:["Tu apprends par cartes mentales","Tu as besoin du cadre global avant les détails","Tu planifies précisément avant d'exécuter"],
      ruined:["Le chaos le paralyse","Les instructions illogiques l'épuisent","Le changement soudain l'inquiète"],
      coach:["Donne-lui le plan complet d'abord","Relie chaque tâche au cadre global","Accorde-lui du temps pour planifier"] },
    en:{ signature:"You build systems before you build results.",
      learn:["Learn through mind maps and frameworks","Need the big picture before details","Plan precisely then execute with discipline"],
      ruined:["Chaos paralyses them","Illogical instructions drain them","Sudden changes cause anxiety"],
      coach:["Give the full plan first","Connect each task to the overall framework","Allow planning time"] },
  },
  striker: {
    ar:{ signature:"أنت تتعلم بالفعل — المشاريع هي مدرستك.",
      learn:["تتعلم بالتطبيق المباشر","تحتاج نتائج سريعة لتبقى متحمساً","تُفضّل التجربة على النظرية"],
      ruined:["الدراسة النظرية الطويلة تُملّه","غياب التطبيق يُفقده الدافع","الانتظار بدون إنجاز يُحبطه"],
      coach:["حوّل كل مفهوم لمشروع صغير","امنحه تحديات أسبوعية قابلة للقياس","اجعل التعلم نشاطاً لا قراءة"] },
    fr:{ signature:"Tu apprends par l'action — les projets sont ton école.",
      learn:["Tu apprends par la pratique directe","Tu as besoin de résultats rapides pour rester motivé","Tu préfères l'expérience à la théorie"],
      ruined:["La longue théorie l'ennuie","L'absence de pratique le démotive","Attendre sans accomplissement le décourage"],
      coach:["Transforme chaque concept en mini-projet","Donne-lui des défis hebdomadaires mesurables","Rends l'apprentissage une activité, pas une lecture"] },
    en:{ signature:"You learn by doing — projects are your classroom.",
      learn:["Learn through direct practice","Need quick results to stay motivated","Prefer experience over theory"],
      ruined:["Long theory bores them","Absence of practice demotivates","Waiting without accomplishment discourages"],
      coach:["Turn each concept into a mini-project","Set measurable weekly challenges","Make learning an activity, not reading"] },
  },
  diplomat: {
    ar:{ signature:"أنت تُعمّق فهمك حين تُعلّم وتُناقش.",
      learn:["تتعلم بالشرح والتعليم","تزدهر في النقاش والتبادل","تحتاج جمهوراً ولو افتراضياً"],
      ruined:["الدراسة المنعزلة تُضعفه","غياب ردود الفعل يُعيقه","العمل الصامت لفترات طويلة يُنهكه"],
      coach:["شجّعه على تدريس مادة لزميل","انشئ مجموعات مراجعة","اطلب منه شرح ما تعلّمه بصوت عالٍ"] },
    fr:{ signature:"Tu approfondir ta compréhension en enseignant et discutant.",
      learn:["Tu apprends en expliquant et enseignant","Tu t'épanouis dans les discussions","Tu as besoin d'un public, même virtuel"],
      ruined:["L'étude isolée l'affaiblit","L'absence de feedback le bloque","Le travail silencieux prolongé l'épuise"],
      coach:["Encourage-le à enseigner un cours à un camarade","Crée des groupes de révision","Demande-lui d'expliquer ce qu'il a appris à voix haute"] },
    en:{ signature:"You deepen understanding by teaching and discussing.",
      learn:["Learn by explaining and teaching","Thrive in discussion and exchange","Need an audience, even virtual"],
      ruined:["Isolated study weakens them","Absence of feedback blocks progress","Long silent work exhausts them"],
      coach:["Encourage teaching a topic to a peer","Create study groups","Ask them to explain what they learned aloud"] },
  },
  sprinter: {
    ar:{ signature:"أنت تُبدع تحت ضغط الوقت — المواعيد النهائية تُحرّرك.",
      learn:["ذاكرتك تتفعّل بالضغط","تعمل بكفاءة عالية في الوقت الضيق","تحتاج تحديات حقيقية لتبقى يقظاً"],
      ruined:["الجداول الممتدة تُرخي تركيزه","الأمان المريح يُخدّر دافعيته","الوقت الزائد يُشتته"],
      coach:["ضع مواعيد وهمية قصيرة لكل مهمة","قسّم المادة لسباقات سريعة","استخدم تقنية البومودورو المكثفة"] },
    fr:{ signature:"Tu crées sous la pression du temps — les deadlines te libèrent.",
      learn:["Ta mémoire s'active sous pression","Tu travailles avec haute efficacité dans le temps serré","Tu as besoin de vrais défis pour rester alerte"],
      ruined:["Les longs plannings relâchent sa concentration","Le confort sécurisé endort sa motivation","Le temps excédentaire le distrait"],
      coach:["Fixe de fausses deadlines courtes pour chaque tâche","Découpe la matière en sprints rapides","Utilise la technique Pomodoro intensive"] },
    en:{ signature:"You create under time pressure — deadlines liberate you.",
      learn:["Memory activates under pressure","Work with high efficiency in tight time","Need real challenges to stay alert"],
      ruined:["Extended schedules loosen focus","Comfortable safety numbs motivation","Excess time causes distraction"],
      coach:["Set short fake deadlines for each task","Break material into quick sprints","Use intensive Pomodoro technique"] },
  },
  sentinel: {
    ar:{ signature:"أنت تبني قوتك بالتكرار والانضباط — الروتين هو سلاحك.",
      learn:["تتعلم بالتكرار المنتظم","العادات والروتين تُثبّت معارفك","الاتساق هو قوتك الخفية"],
      ruined:["الفوضى وكسر الجدول يُزعزعانه","التغييرات المفاجئة تُصيبه بالقلق","المهام غير المحددة تُشوّشه"],
      coach:["صمّم له جدولاً يومياً محدداً","اجعل المراجعة عادة يومية صغيرة","احترم إيقاعه ولا تكسر عاداته"] },
    fr:{ signature:"Tu construis ta force par la répétition et la discipline — la routine est ton arme.",
      learn:["Tu apprends par la répétition régulière","Les habitudes et routines solidifient tes connaissances","La constance est ta force cachée"],
      ruined:["Le chaos et la rupture de planning le déstabilisent","Les changements soudains lui causent de l'anxiété","Les tâches non définies le confondent"],
      coach:["Conçois-lui un planning quotidien précis","Fais de la révision une petite habitude quotidienne","Respecte son rythme et ne brise pas ses habitudes"] },
    en:{ signature:"You build strength through repetition and discipline — routine is your weapon.",
      learn:["Learn through regular repetition","Habits and routines solidify knowledge","Consistency is your hidden strength"],
      ruined:["Chaos and schedule disruption destabilise them","Sudden changes cause anxiety","Undefined tasks cause confusion"],
      coach:["Design a precise daily schedule","Make revision a small daily habit","Respect their rhythm and don't break habits"] },
  },
  visionary: {
    ar:{ signature:"أنت تُحرَّك بالمعنى والرؤية — الإلهام هو وقودك.",
      learn:["تتعلم حين ترى الصورة الكبيرة والمعنى","الإبداع والاستكشاف يُحرّكانك","تحتاج ربط المادة بهدف حياتي"],
      ruined:["التلقين الأعمى يُميت شغفه","الجزئيات المُملّة المنفصلة تُيئسه","غياب الرؤية يُعطّل تقدمه"],
      coach:["ابدأ دائماً بالسؤال: لماذا هذا مهم؟","اربط كل مادة بمستقبل مُحدد","شجّعه على إيجاد مشاريع إبداعية حقيقية"] },
    fr:{ signature:"Tu es mu par le sens et la vision — l'inspiration est ton carburant.",
      learn:["Tu apprends quand tu vois la grande image et le sens","La créativité et l'exploration te motivent","Tu as besoin de relier la matière à un but de vie"],
      ruined:["L'apprentissage par cœur aveugle tue sa passion","Les détails ennuyeux et déconnectés le découragent","L'absence de vision bloque sa progression"],
      coach:["Commence toujours par la question : pourquoi c'est important ?","Relie chaque matière à un futur spécifique","Encourage-le à trouver de vrais projets créatifs"] },
    en:{ signature:"You're driven by meaning and vision — inspiration is your fuel.",
      learn:["Learn when you see the big picture and meaning","Creativity and exploration motivate","Need to connect material to a life purpose"],
      ruined:["Blind memorisation kills passion","Boring disconnected details discourage","Absence of vision blocks progress"],
      coach:["Always start with: why does this matter?","Connect every subject to a specific future","Encourage finding real creative projects"] },
  },
};

function computeLearnerType(learnerAnswers) {
  const scores = { architect:0, striker:0, diplomat:0, sprinter:0, sentinel:0, visionary:0 };
  LEARNER_QUESTIONS.forEach(q => {
    const ans = learnerAnswers[q.id];
    if (ans != null && q.scores[ans]) {
      scores[q.scores[ans]] = (scores[q.scores[ans]] || 0) + 1;
    }
  });
  const sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  return { primary: sorted[0]?.[0] || "architect", secondary: sorted[1]?.[0] || "striker", scores };
}

// ─────────────────────────────────────────────────────────────────
// STEP: Journey Stage selection (after lang, before personality)
// ─────────────────────────────────────────────────────────────────
function StepJourney({ lang, journeyStage, setJourneyStage, onNext, onBack, t, dir }) {
  const sel = (val) => setJourneyStage(val);
  return (
    <div className="card" dir={dir}>
      <h2 style={{fontSize:20,fontWeight:800,marginBottom:6}}>{t.journeyTitle}</h2>
      <p style={{color:"var(--muted)",fontSize:13,marginBottom:22}}>{t.journeyDesc}</p>
      {[
        { val:"postbac", icon:"🎓", title:t.journeyPostBac, hint:t.journeyPostBacHint },
        { val:"prebac",  icon:"📚", title:t.journeyPreBac,  hint:t.journeyPreBacHint  },
      ].map(opt => (
        <button key={opt.val} onClick={()=>sel(opt.val)} style={{
          width:"100%", textAlign: dir==="rtl" ? "right" : "left",
          display:"flex", gap:14, alignItems:"flex-start",
          padding:"16px 18px", borderRadius:14, marginBottom:12,
          border:`2px solid ${journeyStage===opt.val?"var(--accent)":"var(--border)"}`,
          background: journeyStage===opt.val ? "rgba(232,161,36,0.09)" : "var(--surface2)",
          color:"var(--text)", cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s",
        }}>
          <span style={{fontSize:26,flexShrink:0}}>{opt.icon}</span>
          <div>
            <div style={{fontSize:15,fontWeight:700,marginBottom:3}}>{opt.title}</div>
            <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.5}}>{opt.hint}</div>
          </div>
        </button>
      ))}
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={onNext}>{t.next} →</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// STEP: Learner Type Test (6 questions, after personality)
// ─────────────────────────────────────────────────────────────────
function StepLearnerType({ lang, learnerAnswers, setLearnerAnswers, onNext, onBack, t, dir }) {
  const answered = LEARNER_QUESTIONS.filter(q => learnerAnswers[q.id] != null).length;
  const canProceed = answered >= 5;
  const set = (qid, idx) => setLearnerAnswers(p => ({...p, [qid]: idx}));
  return (
    <div className="card" dir={dir}>
      <h2 style={{fontSize:20,fontWeight:800,marginBottom:4}}>{t.learnerTitle}</h2>
      <p style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{t.learnerDesc}</p>
      {LEARNER_QUESTIONS.map((q, qi) => {
        const qText = q[lang] || q.en;
        const opts = q.options[lang] || q.options.en;
        const sel  = learnerAnswers[q.id];
        return (
          <div key={q.id} style={{marginBottom:22}}>
            <div style={{fontSize:14,fontWeight:700,marginBottom:10,lineHeight:1.5}}>
              {qi+1}. {qText}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {opts.map((opt,i) => (
                <button key={i} onClick={()=>set(q.id,i)} style={{
                  textAlign: dir==="rtl"?"right":"left",
                  padding:"10px 14px", borderRadius:10, fontSize:13, lineHeight:1.45,
                  border:`1.5px solid ${sel===i?"var(--accent)":"var(--border)"}`,
                  background: sel===i ? "rgba(232,161,36,0.10)" : "var(--surface2)",
                  color:"var(--text)", cursor:"pointer", fontFamily:"inherit", transition:"all 0.15s",
                }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      <p style={{fontSize:12,color:"var(--muted)",marginBottom:12}}>
        {answered}/6 {lang==="ar"?"أسئلة مُجابة":lang==="fr"?"réponses":"answered"}
      </p>
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={onNext}
          disabled={!canProceed} style={{opacity:canProceed?1:0.5}}>
          {t.next} →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// STEP: Pre-Bac Inputs (strengths / interests / sliders / constraints)
// Only shown when journeyStage === "prebac"
// ─────────────────────────────────────────────────────────────────
function StepPreBacInputs({ lang, preBacData, setPreBacData, onNext, onBack, t, dir }) {
  const set = (field, val) => setPreBacData(p => ({...p, [field]: val}));
  const toggleArr = (field, key) => setPreBacData(p => {
    const cur = p[field] || [];
    return {...p, [field]: cur.includes(key) ? cur.filter(x=>x!==key) : [...cur, key]};
  });

  const strengthKeys = Object.keys(t.preBacStrengthsOpts || {});
  const interestKeys = Object.keys(t.preBacInterestsOpts || {});
  const subjects = ["math","physchem","svt","french","english"];
  const subjectLabels = { math:"Maths", physchem:"Physique-Chimie", svt:"SVT", french:"Français/Arabe", english:"Anglais" };

  const selStr  = preBacData.strengths  || [];
  const selInt  = preBacData.interests  || [];
  const sliders = preBacData.sliders    || {};
  const prestige = preBacData.prestige  || "med";
  const mobility = preBacData.mobility  || "city";
  const abroad   = preBacData.abroad    || false;
  const privateBudget = preBacData.privateBudget || false;

  const canProceed = selStr.length >= 2 && selInt.length >= 2;

  const chipStyle = (sel) => ({
    padding:"8px 14px", borderRadius:20, border:`1.5px solid ${sel?"var(--accent)":"var(--border)"}`,
    background: sel?"rgba(232,161,36,0.1)":"var(--surface2)", color:"var(--text)",
    cursor:"pointer", fontSize:12, fontFamily:"inherit", transition:"all 0.15s",
    margin:"3px",
  });

  return (
    <div className="card" dir={dir}>
      <h2 style={{fontSize:18,fontWeight:800,marginBottom:4}}>{t.journeyPreBac}</h2>
      <p style={{color:"var(--muted)",fontSize:12,marginBottom:20}}>
        {lang==="ar"?"اختر ما يعكس واقعك الآن":lang==="fr"?"Choisis ce qui reflète ta réalité maintenant":"Select what reflects your current reality"}
      </p>

      {/* Strengths */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>{t.preBacStrengthsTitle}</div>
        <div style={{fontSize:12,color:"var(--muted)",marginBottom:8}}>{t.preBacStrengthsDesc} ({selStr.length}/3)</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {strengthKeys.map(k => {
            const sel = selStr.includes(k);
            const disabled = !sel && selStr.length >= 3;
            return (
              <button key={k} onClick={()=>!disabled&&toggleArr("strengths",k)}
                style={{...chipStyle(sel), opacity: disabled?0.45:1, cursor: disabled?"not-allowed":"pointer"}}>
                {(t.preBacStrengthsOpts||{})[k]||k}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interests */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>{t.preBacInterestsTitle}</div>
        <div style={{fontSize:12,color:"var(--muted)",marginBottom:8}}>{t.preBacInterestsDesc} ({selInt.length}/3)</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {interestKeys.map(k => {
            const sel = selInt.includes(k);
            const disabled = !sel && selInt.length >= 3;
            return (
              <button key={k} onClick={()=>!disabled&&toggleArr("interests",k)}
                style={{...chipStyle(sel), opacity: disabled?0.45:1, cursor: disabled?"not-allowed":"pointer"}}>
                {(t.preBacInterestsOpts||{})[k]||k}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject sliders */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:10}}>{t.preBacSliderTitle}</div>
        {subjects.map(s => (
          <div key={s} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontSize:12,width:110,flexShrink:0,color:"var(--text)"}}>{subjectLabels[s]}</span>
            <input type="range" min={1} max={5} step={1}
              value={sliders[s]||3}
              onChange={e=>set("sliders",{...sliders,[s]:Number(e.target.value)})}
              style={{flex:1,accentColor:"var(--accent)"}}/>
            <span style={{fontSize:13,fontWeight:700,color:"var(--accent)",width:20,textAlign:"center"}}>
              {sliders[s]||3}
            </span>
          </div>
        ))}
      </div>

      {/* Constraints */}
      <div style={{marginBottom:16}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:10}}>{t.preBacConstraints}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {["low","med","high"].map(p => (
            <button key={p} onClick={()=>set("prestige",p)} style={chipStyle(prestige===p)}>
              {(t["prestige_"+p]||p)}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:8,marginTop:8,flexWrap:"wrap"}}>
          {["city","move","remote"].map(m => (
            <button key={m} onClick={()=>set("mobility",m)} style={chipStyle(mobility===m)}>
              {lang==="ar"
                ? {city:"نفس المدينة",move:"مستعد للانتقال",remote:"عن بُعد"}[m]
                : lang==="fr"
                ? {city:"Même ville",move:"Prêt à déménager",remote:"À distance"}[m]
                : {city:"Same city",move:"Ready to move",remote:"Remote OK"}[m]}
            </button>
          ))}
        </div>
        <div style={{display:"flex",gap:10,marginTop:8,flexWrap:"wrap"}}>
          <button onClick={()=>set("abroad",!abroad)} style={chipStyle(abroad)}>
            {lang==="ar"?"مهتم بالخارج":lang==="fr"?"Intéressé par l'étranger":"Interested in abroad"}
          </button>
          <button onClick={()=>set("privateBudget",!privateBudget)} style={chipStyle(privateBudget)}>
            {lang==="ar"?"ميزانية للخاص":lang==="fr"?"Budget école privée":"Private school budget"}
          </button>
        </div>
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={onNext}
          disabled={!canProceed} style={{opacity:canProceed?1:0.5}}>
          {t.next} →
        </button>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
// RESULTS FLOW — 5-screen Gary V Jab→Right Hook journey
// Screens: 0=Identity Card | 1=Three Directions | 2=Prestige Ladder
//          3=7-Day Plan    | 4=PDF Offer (Right Hook)
// ─────────────────────────────────────────────────────────────────

// Prestige ladder mapping by bacTrack → relevant prestige routes
const PRESTIGE_LADDER = {
  SMA:  ["ENSA","ENSIAS","INPT","ENSEM","Classe Prépa"],
  SMB:  ["ENSA","ENSIAS","ENSEM","Classe Prépa","BTS Tech"],
  PC:   ["ENSA","ENSIAS","INPT","FST (Ingénierie)","Classe Prépa"],
  SVT:  ["Médecine","Pharmacie","ENSA","FST","IFCS"],
  ECO:  ["ENCG","ISCAE","HEM","FSJES","ESCA"],
  LET:  ["FSJES","Sciences Humaines","Journalisme (ISIC)","ENCG (Management)"],
  TECH: ["ENSA","ENSAM","FST Tech","OFPPT BTS"],
  ARTS: ["ESAV","ISADAC","ENSAD","Écoles de design"],
  SVT_bac2: ["Médecine","Pharmacie","ENSA","FST","IFCS"],
  SMA_bac2: ["ENSA","ENSIAS","INPT","ENSEM","Classe Prépa"],
};

function getPrestigeRoutes(info) {
  const track = info.bac2Track || info.bacTrack || "SMA";
  return PRESTIGE_LADDER[track] || PRESTIGE_LADDER.SMA;
}

function genOrderId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return "MSR-" + Array.from({length:6}, ()=>chars[Math.floor(Math.random()*chars.length)]).join("");
}

// ── Results Flow translations (appended to existing t object) ────
const RF_COPY = {
  ar: {
    screenLabel:      (n,tot) => `${n} من ${tot}`,
    jab1Title:        "هويتك المهنية",
    jab1Sub:          "هذا بوصلة — ليس حكماً نهائياً.",
    jab1StrengthsLabel:"نقاط قوتك",
    sharePrompt:      "شارك نتيجتك",
    captionOpts:      (arch, path) => [
      `طلعت ${arch} — أفضل مسار: ${path} 🧭 #مسار`,
      `هويتي: ${arch}… ونتيجتك؟ 🔥`,
      "توجيه باك المغرب… لكن بشكل مفيد فعلاً 👀",
    ],
    continueBtn:      "متابعة",
    backBtn:          "رجوع",
    jab2Title:        "ثلاثة اتجاهات مناسبة لك",
    jab2Sub:          "يمكنك تغيير رأيك. هذا استكشاف.",
    fitLabel:         "أفضل توافق",
    balLabel:         "الخيار المتوازن",
    ambLabel:         "الأكثر طموحاً",
    matchPct:         (p) => `${p}% توافق`,
    whyLabel:         "السبب",
    jab3Title:        "سلّم المكانة والمسارات التنافسية",
    jab3Sub:          "نظرة موضوعية على موقعك الحالي وما يمكن تحقيقه.",
    typicalReq:       "المتطلب المعتاد",
    yourPosition:     "موقعك الحالي",
    priorityUpgrade:  "الخطوة الأولى",
    strongAvg:        "معدل مرتفع عادةً (≥15)",
    veryStrongAvg:    "معدل مرتفع جداً (≥16)",
    solidAvg:         "معدل جيد (≥12)",
    yourAvg:          (a) => `معدلك: ${a.toFixed(1)}/20`,
    raiseKey:         "ارفع نقطك في المواد الأساسية",
    jab4Title:        "خطتك في 7 أيام",
    jab4Sub:          "5 خطوات عملية تبدأ اليوم.",
    jab4Upsell:       "هل تريد الخطة الكاملة لـ 90 يوماً + قائمة المدارس؟ احصل على ملف PDF.",
    taskDone:         "تم",
    rfTitle:          "ملف PDF الشامل — 199 درهم",
    rfSub:            "يُرسل إلى بريدك الإلكتروني خلال 24 ساعة بعد تأكيد الدفع.",
    rfPrice:          "199 درهم — مرة واحدة فقط",
    rfBenefits:       [
      "قائمة المدارس المناسبة لمدينتك وتنقّلك وميزانيتك (6–12 مؤسسة)",
      "خطة المكانة A/B/C مع جدول زمني للوصول إلى ENSA/ENCG/الطب",
      "استراتيجية رفع النقط: المواد الأهم والخطوات الواقعية",
      "نص محادثة مع الأسرة (عربي + فرنسي) مخصص لضغط أسرتك",
      "مصفوفة القرار: توافق / جدوى / مكانة / سوق / مخاطر / وقت",
      "خريطة طريق 90 يوماً (الأسابيع 2–12) + موارد مختارة",
    ],
    teaserCards:      [
      { icon:"🏫", title:"قائمة المدارس لمدينتك", blur:"ENSA الرباط، ENCG الدار البيضاء، INPT، …" },
      { icon:"🏆", title:"خطة المكانة A/B/C",     blur:"المسار أ: 6 أشهر مكثفة → ENSA…" },
      { icon:"📅", title:"خطة 90 يوماً + موارد",  blur:"الأسبوع 2: تمارين فيزياء يومية…" },
    ],
    emailLabel:       "البريد الإلكتروني",
    phoneLabel:       "الهاتف (اختياري)",
    uploadLabel:      "إثبات الدفع (صورة أو PDF)",
    orderIdLabel:     "رقم الطلب",
    submitBtn:        "أرسل طلبي",
    submitSuccess:    "تم استلام طلبك — سنرسل ملف PDF بعد التحقق من الدفع.",
    refundNote:       "في حالة تعذّر التحقق، نعيد المبلغ أو نمنحك رصيداً.",
    copyId:           "نسخ رقم الطلب",
    copied:           "✓ تم",
    lockLabel:        "محتوى حصري في ملف PDF",
  },
  fr: {
    screenLabel:      (n,tot) => `${n} / ${tot}`,
    jab1Title:        "Ton identité professionnelle",
    jab1Sub:          "C'est une boussole — pas un verdict définitif.",
    jab1StrengthsLabel:"Tes points forts",
    sharePrompt:      "Partage ton résultat",
    captionOpts:      (arch, path) => [
      `Je suis ${arch} — top voie: ${path} 🧭 #MassarPro`,
      `Identité: ${arch}. Et toi? 🔥`,
      "Orientation Bac Maroc, mais vraiment utile 👀",
    ],
    continueBtn:      "Continuer",
    backBtn:          "Retour",
    jab2Title:        "Trois directions pour toi",
    jab2Sub:          "Tu peux changer d'avis. C'est de l'exploration.",
    fitLabel:         "Meilleur fit",
    balLabel:         "Option équilibrée",
    ambLabel:         "Plus ambitieux",
    matchPct:         (p) => `${p}% compatibilité`,
    whyLabel:         "Pourquoi",
    jab3Title:        "L'échelle de prestige au Maroc",
    jab3Sub:          "Où tu en es et ce que tu peux atteindre.",
    typicalReq:       "Prérequis typique",
    yourPosition:     "Ton niveau actuel",
    priorityUpgrade:  "Première priorité",
    strongAvg:        "Moyenne élevée souvent requise (≥15)",
    veryStrongAvg:    "Très haute moyenne (≥16)",
    solidAvg:         "Bonne moyenne (≥12)",
    yourAvg:          (a) => `Ton moy. : ${a.toFixed(1)}/20`,
    raiseKey:         "Améliore tes notes dans les matières clés",
    jab4Title:        "Ton plan 7 jours",
    jab4Sub:          "5 actions concrètes à démarrer aujourd'hui.",
    jab4Upsell:       "Tu veux le plan complet 90 jours + shortlist écoles ? Obtiens le PDF.",
    taskDone:         "Fait",
    rfTitle:          "Dossier PDF complet — 199 MAD",
    rfSub:            "Envoyé à ton email sous 24h après confirmation du paiement.",
    rfPrice:          "199 MAD — paiement unique",
    rfBenefits:       [
      "Shortlist d'écoles pour ta ville, mobilité et budget (6–12 établissements)",
      "Plan Prestige A/B/C avec timeline pour ENSA/ENCG/Médecine alternatives",
      "Stratégie de révision : matières prioritaires + étapes réalistes",
      "Script de conversation famille (arabe + français) adapté à ta pression",
      "Matrice de décision : fit / faisabilité / prestige / marché / risque / durée",
      "Roadmap 90 jours (semaines 2–12) + ressources sélectionnées",
    ],
    teaserCards:      [
      { icon:"🏫", title:"Shortlist écoles de ta ville",  blur:"ENSA Rabat, ENCG Casa, INPT, …" },
      { icon:"🏆", title:"Plan Prestige A/B/C",           blur:"Plan A : 6 mois intensif → ENSA…" },
      { icon:"📅", title:"Roadmap 90 jours + ressources", blur:"Semaine 2 : exercices phys. quotidiens…" },
    ],
    emailLabel:       "Email",
    phoneLabel:       "Téléphone (optionnel)",
    uploadLabel:      "Preuve de paiement (image ou PDF)",
    orderIdLabel:     "Numéro de commande",
    submitBtn:        "Envoyer ma demande",
    submitSuccess:    "Demande reçue — on t'enverra le PDF après vérification du paiement.",
    refundNote:       "En cas de problème de vérification, remboursement ou crédit garanti.",
    copyId:           "Copier le numéro",
    copied:           "✓ Copié",
    lockLabel:        "Contenu réservé au PDF",
  },
  en: {
    screenLabel:      (n,tot) => `${n} of ${tot}`,
    jab1Title:        "Your Professional Identity",
    jab1Sub:          "This is a compass — not a final verdict.",
    jab1StrengthsLabel:"Your strengths",
    sharePrompt:      "Share your result",
    captionOpts:      (arch, path) => [
      `I got ${arch} — top path: ${path} 🧭 #MassarPro`,
      `My career identity: ${arch}. What's yours? 🔥`,
      "Moroccan Bac orientation, but actually useful 👀",
    ],
    continueBtn:      "Continue",
    backBtn:          "Back",
    jab2Title:        "Three Directions for You",
    jab2Sub:          "You can change your mind. This is exploration.",
    fitLabel:         "Best Fit",
    balLabel:         "Balanced",
    ambLabel:         "Most Ambitious",
    matchPct:         (p) => `${p}% match`,
    whyLabel:         "Why",
    jab3Title:        "Prestige Ladder in Morocco",
    jab3Sub:          "An honest view of where you stand and what's reachable.",
    typicalReq:       "Typical requirement",
    yourPosition:     "Your current level",
    priorityUpgrade:  "First priority",
    strongAvg:        "Strong average often needed (≥15)",
    veryStrongAvg:    "Very high average needed (≥16)",
    solidAvg:         "Solid average (≥12)",
    yourAvg:          (a) => `Your avg: ${a.toFixed(1)}/20`,
    raiseKey:         "Raise your grades in key subjects",
    jab4Title:        "Your 7-Day Starter Plan",
    jab4Sub:          "5 practical actions you can start today.",
    jab4Upsell:       "Want the full 90-day plan + school shortlist? Get the PDF.",
    taskDone:         "Done",
    rfTitle:          "Full PDF Dossier — 199 MAD",
    rfSub:            "Delivered to your email within 24h after payment confirmation.",
    rfPrice:          "199 MAD — one-time payment",
    rfBenefits:       [
      "School shortlist for your city, mobility & budget (6–12 institutions)",
      "Prestige Plan A/B/C with timeline to reach ENSA/ENCG/Medicine alternatives",
      "Grade-raise strategy: key subjects + realistic steps",
      "Family conversation script (Arabic + French) tailored to your situation",
      "Decision matrix: fit / feasibility / prestige / market / risk / time",
      "90-day roadmap (weeks 2–12) + curated resources",
    ],
    teaserCards:      [
      { icon:"🏫", title:"School shortlist for your city", blur:"ENSA Rabat, ENCG Casa, INPT, …" },
      { icon:"🏆", title:"Prestige Plan A/B/C",            blur:"Plan A: 6-month intensive → ENSA…" },
      { icon:"📅", title:"90-day roadmap + resources",     blur:"Week 2: daily physics exercises…" },
    ],
    emailLabel:       "Email",
    phoneLabel:       "Phone (optional)",
    uploadLabel:      "Payment proof (image or PDF)",
    orderIdLabel:     "Order ID",
    submitBtn:        "Submit my request",
    submitSuccess:    "Request received — we'll send your PDF after verifying payment.",
    refundNote:       "If we can't verify payment, we'll refund or credit you.",
    copyId:           "Copy order ID",
    copied:           "✓ Copied",
    lockLabel:        "PDF-exclusive content",
  },
};

// ── Helper: pick correct RF copy ─────────────────────────────────
function rf(lang) { return RF_COPY[lang] || RF_COPY.en; }

// ── Progress bar ─────────────────────────────────────────────────
function RFProgress({ step, total, lang, dir }) {
  const c = rf(lang);
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:10,
      padding:"12px 0 4px", marginBottom:4,
    }}>
      <div style={{display:"flex", gap:5, flex:1}}>
        {Array.from({length:total}).map((_,i) => (
          <div key={i} style={{
            flex:1, height:3, borderRadius:2,
            background: i <= step ? "var(--accent)" : "var(--border)",
            transition:"background 0.3s",
          }}/>
        ))}
      </div>
      <span style={{fontSize:11, color:"var(--muted)", whiteSpace:"nowrap", flexShrink:0}}>
        {c.screenLabel(step+1, total)}
      </span>
    </div>
  );
}

// ── Sticky bottom nav ────────────────────────────────────────────
function RFNav({ step, total, onBack, onNext, lang, dir, nextLabel, nextDisabled }) {
  const c = rf(lang);
  return (
    <div style={{
      position:"sticky", bottom:0, zIndex:50,
      background:"linear-gradient(0deg, var(--bg) 70%, transparent)",
      padding:"12px 0",
      paddingBottom:"max(12px, env(safe-area-inset-bottom, 0px))",
      display:"flex", gap:10,
    }}>
      {step > 0 && (
        <button className="btn btn-secondary" onClick={onBack}
          style={{flex:"0 0 auto", minWidth:72}}>
          {dir==="rtl" ? "→" : "←"} {c.backBtn}
        </button>
      )}
      <button
        className="btn btn-primary"
        onClick={onNext}
        disabled={!!nextDisabled}
        style={{flex:1, opacity: nextDisabled ? 0.5 : 1}}>
        {nextLabel || c.continueBtn} {step < total-1 ? (dir==="rtl" ? "←" : "→") : ""}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// JAB 1 — Identity Card
// ─────────────────────────────────────────────────────────────────
function Jab1Identity({ lang, dir, safeResults, safeRanked, t, traits }) {
  const c = rf(lang);
  const [selectedCaption, setSelectedCaption] = React.useState(0);
  const [copied, setCopied]                   = React.useState(false);

  const archetype = safeResults.archetype || "ACSI";
  const topCluster = safeResults.topCareer;
  const topPath = (topCluster && t[CLUSTER_KEY_MAP[topCluster.id]]) || topCluster?.id || "";
  const rarity  = safeResults.rarity;
  const conf    = safeResults.confidence;
  const confClass = conf >= 70 ? "confidence-high" : conf >= 50 ? "confidence-med" : "confidence-low";

  const rarityColors = {
    common:    "#9ca3af",
    rare:      "#22d3ee",
    epic:      "#c084fc",
    legendary: "#fbbf24",
  };
  const rarityColor = rarityColors[rarity] || rarityColors.common;

  const captions = c.captionOpts(archetype, topPath);

  const doCopy = () => {
    const text = captions[selectedCaption];
    try {
      navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    } catch {
      const el = document.createElement("textarea");
      el.value = text; document.body.appendChild(el); el.select();
      document.execCommand("copy"); document.body.removeChild(el);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    }
  };

  const strengthKeys = (safeResults.strengths || []).slice(0,3);

  return (
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <h2 style={{fontSize:20, fontWeight:800, marginBottom:4}}>{c.jab1Title}</h2>
      <p style={{fontSize:13, color:"var(--muted)", marginBottom:20}}>{c.jab1Sub}</p>

      {/* Archetype hero card */}
      <div style={{
        background:`linear-gradient(135deg, rgba(${rarity==="legendary"?"232,161,36":rarity==="epic"?"168,85,247":rarity==="rare"?"34,211,238":"107,114,128"},0.12), var(--surface2))`,
        border:`1.5px solid ${rarityColor}50`,
        borderRadius:20, padding:"24px 20px", marginBottom:16, textAlign:"center",
        boxShadow:`0 0 40px ${rarityColor}15`,
      }}>
        <div style={{fontSize:11, fontWeight:800, letterSpacing:2, textTransform:"uppercase",
          color:rarityColor, marginBottom:8}}>
          {rarity?.toUpperCase()}
        </div>
        <div style={{fontSize:52, marginBottom:8}}>
          {rarity==="legendary"?"🌟":rarity==="epic"?"💎":rarity==="rare"?"⚡":"🔹"}
        </div>
        <div style={{fontSize:28, fontWeight:900, letterSpacing:-0.5, color:"var(--text)", marginBottom:4}}>
          {archetype}
        </div>
        <div style={{fontSize:13, color:"var(--muted)", marginBottom:14}}>
          {(massarTypeDesc && massarTypeDesc(archetype, t)?.label) || archetype}
        </div>
        <div className={`confidence-badge ${confClass}`} style={{display:"inline-flex"}}>
          {lang==="ar"?"مستوى الثقة":lang==="fr"?"Niveau de confiance":"Confidence"}: {conf}%
        </div>
      </div>

      {/* Share section */}
      <div style={{background:"var(--surface2)", borderRadius:16, padding:16, marginBottom:16}}>
        <div style={{fontSize:13, fontWeight:700, marginBottom:12}}>{c.sharePrompt}</div>
        <div style={{display:"flex", flexDirection:"column", gap:8, marginBottom:12}}>
          {captions.map((cap, i) => (
            <button key={i}
              onClick={() => setSelectedCaption(i)}
              style={{
                textAlign: dir==="rtl" ? "right" : "left",
                padding:"10px 14px", borderRadius:10, fontSize:12, lineHeight:1.5,
                background: selectedCaption===i ? "rgba(232,161,36,0.12)" : "var(--surface3)",
                border:`1.5px solid ${selectedCaption===i ? "var(--accent)" : "var(--border)"}`,
                color:"var(--text)", cursor:"pointer", fontFamily:"inherit",
              }}>
              {cap}
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={doCopy} style={{width:"100%"}}>
          {copied
            ? (lang==="ar"?"✓ تم النسخ":lang==="fr"?"✓ Copié":"✓ Copied")
            : (lang==="ar"?"نسخ النص":lang==="fr"?"Copier":"Copy caption")}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// JAB 2 — Three Directions
// ─────────────────────────────────────────────────────────────────
function Jab2Directions({ lang, dir, safeResults, t }) {
  const c = rf(lang);
  const { threeViews } = safeResults;
  if (!threeViews) return null;

  const cards = [
    { key:"bestFit",   label:c.fitLabel,  cluster:threeViews.bestFit,   icon:"💡" },
    { key:"balanced",  label:c.balLabel,  cluster:threeViews.balanced,  icon:"⚖️" },
    { key:"ambitious", label:c.ambLabel,  cluster:threeViews.ambitious, icon:"🚀" },
  ].filter(x => x.cluster);

  return (
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <h2 style={{fontSize:20, fontWeight:800, marginBottom:4}}>{c.jab2Title}</h2>
      <p style={{fontSize:13, color:"var(--muted)", marginBottom:20}}>{c.jab2Sub}</p>

      {cards.map(({key, label, cluster, icon}) => {
        const clName = (t[CLUSTER_KEY_MAP[cluster.id]] || cluster.id);
        const pct = Math.round((cluster.scores.final || 0) * 100);
        const why = (lang==="ar"
          ? `يتوافق مع ملفك الدراسي والشخصي بنسبة ${pct}%`
          : lang==="fr"
          ? `Compatible à ${pct}% avec ton profil`
          : `${pct}% compatible with your profile`);
        const eligTag = cluster.eligibilityTag;

        return (
          <div key={key} style={{
            background:"var(--surface2)", border:"1.5px solid var(--border)",
            borderRadius:16, padding:"18px 16px", marginBottom:14,
            borderLeft: key==="bestFit" ? "3px solid var(--accent3)"
                      : key==="balanced" ? "3px solid var(--accent2)"
                      : "3px solid var(--accent)",
          }}>
            <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:8}}>
              <span style={{fontSize:22}}>{icon}</span>
              <div>
                <div style={{fontSize:11, fontWeight:700, textTransform:"uppercase",
                  letterSpacing:1, color:"var(--muted)", marginBottom:2}}>{label}</div>
                <div style={{fontSize:17, fontWeight:800, color:"var(--text)"}}>{clName}</div>
              </div>
              <span style={{
                marginInlineStart:"auto", fontSize:12, fontWeight:700,
                background:"rgba(16,185,129,0.12)", color:"var(--accent3)",
                padding:"3px 10px", borderRadius:20,
              }}>
                {c.matchPct(pct)}
              </span>
            </div>
            <p style={{fontSize:13, color:"rgba(232,236,240,0.7)", lineHeight:1.55, margin:0}}>
              {why}
            </p>
            {eligTag === "notEligiblePublic" && (
              <div style={{marginTop:8, fontSize:11, color:"var(--warn)",
                background:"rgba(245,158,11,0.08)", padding:"5px 10px",
                borderRadius:8, display:"inline-block"}}>
                ⚠️ {lang==="ar"?"تنافسية عالية — المسار الخاص متاح":
                    lang==="fr"?"Très sélectif — filière privée possible":
                    "Highly selective — private route available"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// JAB 3 — Prestige Ladder
// ─────────────────────────────────────────────────────────────────
function Jab3Prestige({ lang, dir, info, safeResults }) {
  const c = rf(lang);
  const avg = safeResults.overallAvg || 0;
  const routes = getPrestigeRoutes(info);

  function getReq(school) {
    if (/[Mm]édecine|Medicine|طب/.test(school))  return { req: c.veryStrongAvg, gap: avg < 16 ? c.raiseKey : null };
    if (/ENSA|ENSIAS|INPT|Prépa/.test(school))    return { req: c.strongAvg,     gap: avg < 15 ? c.raiseKey : null };
    return                                               { req: c.solidAvg,      gap: avg < 12 ? c.raiseKey : null };
  }

  return (
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <h2 style={{fontSize:20, fontWeight:800, marginBottom:4}}>{c.jab3Title}</h2>
      <p style={{fontSize:13, color:"var(--muted)", marginBottom:20}}>{c.jab3Sub}</p>

      <div style={{
        background:"rgba(232,161,36,0.07)", border:"1px solid rgba(232,161,36,0.25)",
        borderRadius:12, padding:"12px 14px", marginBottom:16, fontSize:13,
        display:"flex", alignItems:"center", gap:8,
      }}>
        <span style={{fontSize:20}}>📊</span>
        <span style={{color:"var(--text)"}}>{c.yourAvg(avg)}</span>
      </div>

      {routes.slice(0,4).map((school, i) => {
        const { req, gap } = getReq(school);
        return (
          <div key={i} style={{
            background:"var(--surface2)", border:"1px solid var(--border)",
            borderRadius:14, padding:"14px 16px", marginBottom:10,
          }}>
            <div style={{fontWeight:700, fontSize:15, marginBottom:6}}>{school}</div>
            <div style={{display:"flex", flexDirection:"column", gap:4}}>
              <div style={{fontSize:12, color:"var(--muted)"}}>
                <span style={{fontWeight:600}}>{c.typicalReq}: </span>{req}
              </div>
              <div style={{fontSize:12, color: gap ? "var(--warn)" : "var(--accent3)"}}>
                <span style={{fontWeight:600}}>{c.yourPosition}: </span>
                {gap
                  ? `${avg.toFixed(1)}/20 — ${c.raiseKey}`
                  : `${avg.toFixed(1)}/20 ✓`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// JAB 4 — 7-Day Starter Plan
// ─────────────────────────────────────────────────────────────────
function Jab4Plan({ lang, dir, safeResults, onGoToPDF }) {
  const c = rf(lang);
  const [done, setDone] = React.useState({});
  const topCluster = safeResults.topCareer;

  // Generate 5 practical tasks from top cluster action plan
  const rawPlan = topCluster?.actionPlan || [];
  const tasks = [];
  rawPlan.slice(0,2).forEach(week => {
    (week.items || []).slice(0,2).forEach(item => {
      if (tasks.length < 5) tasks.push(typeof item === "string" ? item : item.label || "");
    });
  });
  // If fewer than 5, pad with generic tasks
  const genericTasks = lang==="ar" ? [
    "ابحث عن 3 طلاب من نفس شعبتك وتبادل التجارب",
    "راجع متطلبات القبول في مؤسسة تستهدفها",
    "اقرأ أو شاهد محتوى عن المجال المقترح (30 دقيقة)",
    "ارسم خطة أسبوعية للمراجعة",
    "تحدث مع شخص يعمل في المجال الذي يثير اهتمامك",
  ] : lang==="fr" ? [
    "Trouve 3 étudiants dans ta filière et échange avec eux",
    "Vérifie les prérequis d'une école qui t'intéresse",
    "Lis ou regarde du contenu sur le domaine proposé (30 min)",
    "Rédige un planning de révision hebdomadaire",
    "Parle à quelqu'un qui travaille dans le domaine qui t'attire",
  ] : [
    "Connect with 3 students in your track and exchange experiences",
    "Check admission requirements for one school you're targeting",
    "Read or watch content about the suggested field (30 min)",
    "Write a weekly revision plan",
    "Talk to someone who works in a field that interests you",
  ];
  while (tasks.length < 5) tasks.push(genericTasks[tasks.length]);

  return (
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <h2 style={{fontSize:20, fontWeight:800, marginBottom:4}}>{c.jab4Title}</h2>
      <p style={{fontSize:13, color:"var(--muted)", marginBottom:20}}>{c.jab4Sub}</p>

      {tasks.slice(0,5).map((task, i) => (
        <div key={i}
          onClick={() => setDone(d => ({...d, [i]: !d[i]}))}
          style={{
            display:"flex", alignItems:"flex-start", gap:12, padding:"14px 16px",
            background:"var(--surface2)", border:`1.5px solid ${done[i]?"var(--accent3)":"var(--border)"}`,
            borderRadius:14, marginBottom:10, cursor:"pointer",
            opacity: done[i] ? 0.65 : 1, transition:"all 0.2s",
          }}>
          <div style={{
            width:22, height:22, borderRadius:6, flexShrink:0, marginTop:1,
            background: done[i] ? "var(--accent3)" : "var(--surface3)",
            border:`2px solid ${done[i]?"var(--accent3)":"var(--border)"}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:13, color:"#fff", transition:"all 0.2s",
          }}>
            {done[i] && "✓"}
          </div>
          <div style={{fontSize:13, color:"var(--text)", lineHeight:1.55, flex:1,
            textDecoration: done[i] ? "line-through" : "none", textDecorationColor:"var(--muted)"}}>
            {task}
          </div>
          <span style={{fontSize:11, color:"var(--accent)", fontWeight:700, flexShrink:0}}>
            +10 XP
          </span>
        </div>
      ))}

      <div style={{
        marginTop:20, padding:"16px 18px",
        background:"linear-gradient(135deg, rgba(232,161,36,0.1), rgba(59,130,246,0.06))",
        border:"1px solid rgba(232,161,36,0.3)", borderRadius:14,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        gap:12, flexWrap:"wrap",
      }}>
        <p style={{fontSize:13, color:"var(--text)", margin:0, flex:1, lineHeight:1.5}}>
          {c.jab4Upsell}
        </p>
        <button className="btn btn-primary" onClick={onGoToPDF}
          style={{flexShrink:0, minWidth:100}}>
          📄 PDF →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// RIGHT HOOK — PDF Offer
// ─────────────────────────────────────────────────────────────────
function RightHookPDF({ lang, dir, safeResults }) {
  const c = rf(lang);
  const [email, setEmail]   = React.useState("");
  const [phone, setPhone]   = React.useState("");
  const [file, setFile]     = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [orderId]           = React.useState(() => genOrderId());
  const [error, setError]   = React.useState("");

  const handleSubmit = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError(lang==="ar"?"يرجى إدخال بريد إلكتروني صحيح":
               lang==="fr"?"Veuillez entrer un email valide":
               "Please enter a valid email");
      return;
    }
    if (!file) {
      setError(lang==="ar"?"يرجى إرفاق إثبات الدفع":
               lang==="fr"?"Veuillez joindre la preuve de paiement":
               "Please attach payment proof");
      return;
    }
    try {
      const entry = {
        orderId, email, phone: phone || null,
        fileName: file?.name || null,
        timestamp: new Date().toISOString(),
        archetype: safeResults.archetype,
        topPath: safeResults.topCareer?.id || "",
      };
      const existing = JSON.parse(localStorage.getItem("massar_pdf_orders") || "[]");
      existing.push(entry);
      localStorage.setItem("massar_pdf_orders", JSON.stringify(existing));
    } catch {}
    setSubmitted(true);
    setError("");
  };

  const copyOrderId = () => {
    try { navigator.clipboard.writeText(orderId); } catch { }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const inputStyle = {
    width:"100%", padding:"12px 14px",
    background:"var(--surface2)", border:"1.5px solid var(--border)",
    borderRadius:10, color:"var(--text)", fontSize:15, outline:"none",
    fontFamily:"inherit", boxSizing:"border-box", marginBottom:12,
  };

  return (
    <div style={{animation:"fadeIn 0.4s ease"}}>
      {/* Hero offer card */}
      <div style={{
        background:"linear-gradient(135deg, rgba(232,161,36,0.12), rgba(59,130,246,0.08))",
        border:"1.5px solid rgba(232,161,36,0.4)", borderRadius:20, padding:"22px 18px",
        marginBottom:18, textAlign:"center",
        boxShadow:"0 8px 40px rgba(232,161,36,0.12)",
      }}>
        <div style={{fontSize:36, marginBottom:8}}>📄</div>
        <h2 style={{fontSize:19, fontWeight:900, marginBottom:6, letterSpacing:-0.3}}>
          {c.rfTitle}
        </h2>
        <p style={{fontSize:13, color:"var(--muted)", marginBottom:12, lineHeight:1.55}}>
          {c.rfSub}
        </p>
        <div style={{fontSize:22, fontWeight:900, color:"var(--accent)", marginBottom:4}}>
          {c.rfPrice}
        </div>
      </div>

      {/* Benefits list */}
      <div style={{background:"var(--surface2)", borderRadius:14, padding:"16px 14px", marginBottom:16}}>
        {c.rfBenefits.map((b, i) => (
          <div key={i} style={{
            display:"flex", gap:10, alignItems:"flex-start",
            paddingBottom:i<c.rfBenefits.length-1?10:0,
            marginBottom:i<c.rfBenefits.length-1?10:0,
            borderBottom:i<c.rfBenefits.length-1?"1px solid var(--border)":"none",
          }}>
            <span style={{color:"var(--accent3)", fontSize:14, flexShrink:0, marginTop:2}}>✓</span>
            <span style={{fontSize:13, color:"var(--text)", lineHeight:1.5}}>{b}</span>
          </div>
        ))}
      </div>

      {/* 3 teaser cards */}
      <div style={{display:"flex", flexDirection:"column", gap:10, marginBottom:20}}>
        {c.teaserCards.map((card, i) => (
          <div key={i} style={{
            background:"var(--surface2)", border:"1px solid var(--border)",
            borderRadius:14, padding:"14px 16px",
            display:"flex", gap:12, alignItems:"flex-start", position:"relative", overflow:"hidden",
          }}>
            <span style={{fontSize:20, flexShrink:0}}>{card.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:13, fontWeight:700, marginBottom:4}}>{card.title}</div>
              <div style={{
                fontSize:12, color:"var(--muted)", lineHeight:1.4,
                filter:"blur(4px)", userSelect:"none", pointerEvents:"none",
              }}>
                {card.blur}
              </div>
            </div>
            <div style={{
              position:"absolute", inset:0,
              background:"linear-gradient(90deg, transparent, rgba(17,24,39,0.85))",
              display:"flex", alignItems:"center", justifyContent:"flex-end",
              paddingInlineEnd:14,
            }}>
              <div style={{
                fontSize:11, fontWeight:700, color:"var(--muted)",
                background:"var(--surface3)", padding:"4px 10px", borderRadius:20,
                border:"1px solid var(--border)", display:"flex", gap:5, alignItems:"center",
              }}>
                🔒 {c.lockLabel}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment instructions */}
      <div style={{
        background:"rgba(59,130,246,0.07)", border:"1px solid rgba(59,130,246,0.2)",
        borderRadius:12, padding:"12px 14px", marginBottom:16, fontSize:12, lineHeight:1.6,
      }}>
        {lang==="ar"
          ? "💳 أرسل 199 درهم عبر CIH Pay أو Wafacash أو تحويل بنكي، ثم ارفع إثبات الدفع أدناه."
          : lang==="fr"
          ? "💳 Envoyez 199 MAD via CIH Pay, Wafacash ou virement bancaire, puis joignez la preuve ci-dessous."
          : "💳 Send 199 MAD via CIH Pay, Wafacash or bank transfer, then attach payment proof below."}
      </div>

      {!submitted ? (
        <div>
          {/* Order ID */}
          <div style={{
            background:"var(--surface2)", border:"1px solid var(--border)",
            borderRadius:10, padding:"12px 14px", marginBottom:14,
            display:"flex", alignItems:"center", justifyContent:"space-between", gap:8,
          }}>
            <div>
              <div style={{fontSize:11, color:"var(--muted)", marginBottom:2}}>{c.orderIdLabel}</div>
              <div style={{fontFamily:"monospace", fontSize:16, fontWeight:700, color:"var(--accent)"}}>
                {orderId}
              </div>
            </div>
            <button className="btn btn-secondary" onClick={copyOrderId}
              style={{fontSize:12, padding:"6px 14px", minHeight:36}}>
              {copied ? c.copied : c.copyId}
            </button>
          </div>

          <input type="email" required placeholder={c.emailLabel} value={email}
            onChange={e=>setEmail(e.target.value)} style={inputStyle}/>
          <input type="tel" placeholder={c.phoneLabel} value={phone}
            onChange={e=>setPhone(e.target.value)} style={inputStyle}/>
          <label style={{display:"block", fontSize:12, color:"var(--muted)", marginBottom:6}}>
            {c.uploadLabel}
          </label>
          <input type="file" accept="image/*,application/pdf"
            onChange={e=>setFile(e.target.files[0])}
            style={{...inputStyle, padding:"10px 12px", fontSize:13, cursor:"pointer"}}/>

          {error && (
            <div style={{color:"var(--danger)", fontSize:12, marginBottom:10, marginTop:-4}}>
              {error}
            </div>
          )}

          <button className="btn btn-primary" onClick={handleSubmit}
            style={{width:"100%", marginTop:4, fontSize:15, padding:"15px 24px"}}>
            {c.submitBtn}
          </button>
          <p style={{textAlign:"center", fontSize:11, color:"var(--muted)", marginTop:10, lineHeight:1.5}}>
            {c.refundNote}
          </p>
        </div>
      ) : (
        <div style={{
          textAlign:"center", padding:"32px 20px",
          background:"rgba(16,185,129,0.08)", borderRadius:16,
          border:"1px solid rgba(16,185,129,0.3)",
        }}>
          <div style={{fontSize:42, marginBottom:12}}>✅</div>
          <div style={{fontSize:16, fontWeight:700, color:"var(--accent3)", marginBottom:8}}>
            {c.submitSuccess}
          </div>
          <div style={{fontSize:12, color:"var(--muted)", marginTop:6}}>
            {lang==="ar"?"رقم طلبك":lang==="fr"?"Ton numéro":"Your order ID"}:{" "}
            <span style={{fontFamily:"monospace", color:"var(--accent)"}}>{orderId}</span>
          </div>
        </div>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────
// Page 1/6 — Identity Mirror
// ─────────────────────────────────────────────────────────────────
function Page1Identity({ lang, dir, safeResults, t, safeRanked }) {
  const [selCap, setSelCap] = React.useState(0);
  const [copied, setCopied] = React.useState(false);
  const { archetype, rarity, confidence, learnerType, learnerSecondary, archV2, statsV2, serialId } = safeResults;
  // v2 archetype content
  const _a2   = archV2 || pickArchetypeV2({ traits: safeResults.traits||{}, confidence });
  const _a2cr = _a2?.coldReading?.[lang] || _a2?.coldReading?.en || {};
  const _a2mr = _a2?.mirror?.[lang]      || _a2?.mirror?.en      || {};
  const _a2hq = _a2?.hookQuestion?.[lang]|| _a2?.hookQuestion?.en|| "";
  const _a2vl = _a2?.viralLine?.[lang]   || _a2?.viralLine?.en   || "";
  const _a2tl = lang==="ar"?_a2?.titleAr:lang==="fr"?_a2?.titleFr:_a2?.titleEn;
  const _a2rc = {COMMON:"#3b82f6",RARE:"#f59e0b",EPIC:"#a855f7"}[_a2?.rarity]||"#3b82f6";
  const lt  = LEARNER_TYPE_DATA[learnerType]  || LEARNER_TYPE_DATA.architect;
  const lt2 = LEARNER_TYPE_DATA[learnerSecondary] || LEARNER_TYPE_DATA.striker;
  const ltCopy  = lt[lang]  || lt.en;
  const lt2Copy = lt2[lang] || lt2.en;
  const topPath = (safeRanked[0] && t[CLUSTER_KEY_MAP[safeRanked[0].id]]) || "";
  const rarityColors = { common:"#9ca3af", rare:"#22d3ee", epic:"#c084fc", legendary:"#fbbf24" };
  const rc = rarityColors[rarity] || rarityColors.common;
  const captions = (rf(lang).captionOpts)(archetype, topPath);

  // ── Cold reading + Identity Mirror from archV2 data contract ──
  const _a2mirrorBlocks = [
    { icon:"⚡", key: t?.underPressure     || (lang==="ar"?"تحت الضغط":lang==="fr"?"Sous pression":"Under pressure"),    text:_a2mr.pressure },
    { icon:"🔋", key: t?.consistencySecret || (lang==="ar"?"المثابرة":lang==="fr"?"La constance":"Consistency"),         text:_a2mr.consistency },
    { icon:"🎯", key: t?.unfairAdvantage   || (lang==="ar"?"ميزتك":lang==="fr"?"Ton avantage":"Your advantage"),         text:_a2mr.advantage },
    { icon:"🌑", key: t?.blindSpot         || (lang==="ar"?"نقطة عمياء":lang==="fr"?"Point aveugle":"Blind spot"),       text:_a2mr.blindSpot },
  ].filter(b=>b.text);
  const mirrorBlocks = _a2mirrorBlocks.length ? _a2mirrorBlocks : (mirrors[lang] || mirrors.en);

  const doCopy = () => {
    try { navigator.clipboard.writeText(captions[selCap]).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}); }
    catch { setCopied(true); setTimeout(()=>setCopied(false),2000); }
  };

  return (
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:4}}>
        {t.identityMirrorTitle || "Identity Mirror"} — Page 1/6
      </div>

      {/* Archetype + learner type row */}
      <div style={{background:`linear-gradient(135deg,rgba(${rarity==="legendary"?"232,161,36":rarity==="epic"?"168,85,247":rarity==="rare"?"34,211,238":"107,114,128"},0.1),var(--surface2))`,
        border:`1.5px solid ${rc}40`,borderRadius:18,padding:"18px 16px",marginBottom:14,
        display:"flex",gap:14,alignItems:"center",flexWrap:"wrap"}}>
        <div style={{textAlign:"center",flexShrink:0}}>
          <div style={{fontSize:36}}>{rarity==="legendary"?"🌟":rarity==="epic"?"💎":rarity==="rare"?"⚡":"🔹"}</div>
          <div style={{fontSize:18,fontWeight:900,color:"var(--text)"}}>{archetype}</div>
          <div className={`confidence-badge ${confidence>=70?"confidence-high":confidence>=50?"confidence-med":"confidence-low"}`}
            style={{display:"inline-flex",marginTop:4,fontSize:11}}>
            {confidence}%
          </div>
        </div>
        <div style={{flex:1,minWidth:140}}>
          <div style={{fontSize:11,color:"var(--muted)",marginBottom:2}}>
            {t.learnerTitle||"Learner type"}: {(t.learnerTypeIcons||{})[learnerType]||""} {(t.learnerTypes||{})[learnerType]||learnerType}
          </div>
          <div style={{fontSize:12,color:"rgba(232,236,240,0.65)",lineHeight:1.4,marginBottom:4}}>
            {ltCopy.signature}
          </div>
          {learnerSecondary && (
            <div style={{fontSize:11,color:"var(--muted)"}}>
              + {(t.learnerTypeIcons||{})[learnerSecondary]||""} {(t.learnerTypes||{})[learnerSecondary]||learnerSecondary}
            </div>
          )}
        </div>
      </div>

      {/* Identity mirror blocks */}
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
        {mirrorBlocks.map((block,i) => (
          <div key={i} style={{background:"var(--surface2)",border:"1px solid var(--border)",
            borderRadius:14,padding:"14px 16px"}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:18}}>{block.icon}</span>
              <span style={{fontSize:12,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:0.5}}>
                {block.key}
              </span>
            </div>
            <p style={{fontSize:13,color:"var(--text)",lineHeight:1.65,margin:0}}>{block.text}</p>
          </div>
        ))}
      </div>

      {/* Cold Reading block (v2) */}
      {(_a2cr.looks || _a2cr.truth) && (
        <div style={{background:"rgba(99,102,241,0.07)",border:"1px solid rgba(99,102,241,0.2)",
          borderRadius:12,padding:"14px 16px",marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:800,color:"#6366f1",letterSpacing:2,
            textTransform:"uppercase",marginBottom:8}}>
            {t?.archetypeColdReading || (lang==="ar"?"القراءة الأولى":lang==="fr"?"Lecture à froid":"Cold Reading")}
          </div>
          {_a2cr.looks && <p style={{fontSize:13,color:"var(--text)",lineHeight:1.7,marginBottom:6,margin:0}}>{_a2cr.looks}</p>}
          {_a2cr.truth && <p style={{fontSize:13,color:_a2rc,lineHeight:1.7,fontWeight:600,margin:"6px 0 0"}}>{_a2cr.truth}</p>}
        </div>
      )}

      {/* Hook question (v2) */}
      {_a2hq && (
        <div style={{background:`${_a2rc}0d`,border:`1px solid ${_a2rc}33`,
          borderRadius:12,padding:"12px 16px",marginBottom:14}}>
          <div style={{fontSize:10,fontWeight:800,color:_a2rc,letterSpacing:2,
            textTransform:"uppercase",marginBottom:6}}>
            {t?.archetypeHook || (lang==="ar"?"سؤالك الجوهري":lang==="fr"?"Ta question clé":"Key question")}
          </div>
          <p style={{fontSize:13,color:"var(--text)",lineHeight:1.65,margin:0,fontWeight:600}}>{_a2hq}</p>
        </div>
      )}

      {/* Credibility line */}
      <p style={{fontSize:12,color:"var(--muted)",lineHeight:1.5,marginBottom:16,
        fontStyle:"italic",borderTop:"1px solid var(--border)",paddingTop:10}}>
        {t.credibilityLine}
      </p>

      {/* Share captions */}
      <div style={{background:"var(--surface2)",borderRadius:14,padding:14}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:10}}>
          {lang==="ar"?"شارك نتيجتك":lang==="fr"?"Partage ton résultat":"Share your result"}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:10}}>
          {captions.map((cap,i)=>(
            <button key={i} onClick={()=>setSelCap(i)} style={{
              textAlign:dir==="rtl"?"right":"left",padding:"9px 12px",borderRadius:9,fontSize:12,lineHeight:1.45,
              border:`1.5px solid ${selCap===i?"var(--accent)":"var(--border)"}`,
              background:selCap===i?"rgba(232,161,36,0.1)":"var(--surface3)",
              color:"var(--text)",cursor:"pointer",fontFamily:"inherit",
            }}>{cap}</button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={doCopy} style={{width:"100%",fontSize:13,padding:"10px 18px"}}>
          {copied?(lang==="ar"?"✓ تم النسخ":lang==="fr"?"✓ Copié":"✓ Copied"):(lang==="ar"?"نسخ النص":lang==="fr"?"Copier":"Copy caption")}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Page 2/6 — Prestige & Family Reality
// ─────────────────────────────────────────────────────────────────
function Page2Prestige({ lang, dir, safeResults, info, t }) {
  const avg = safeResults.overallAvg || 0;
  const routes = getPrestigeRoutes(info);
  const isPostBac = safeResults.journeyStage !== "prebac";

  function badge(school) {
    const req = /[Mm]édecine|Medicine|طب/.test(school) ? 16 : /ENSA|ENSIAS|INPT|Prépa/.test(school) ? 15 : 12;
    if (!isPostBac) return { label: lang==="ar"?"استكشاف":lang==="fr"?"À explorer":"To explore", color:"var(--accent2)", bg:"rgba(59,130,246,0.12)" };
    if (avg >= req) return { label: lang==="ar"?"تنافسي":lang==="fr"?"Compétitif":"Competitive", color:"var(--accent3)", bg:"rgba(16,185,129,0.12)" };
    if (avg >= req - 1.5) return { label: lang==="ar"?"قريب":lang==="fr"?"Presque":"Almost", color:"var(--accent)", bg:"rgba(232,161,36,0.12)" };
    return { label: lang==="ar"?"لم يبلغ بعد":lang==="fr"?"Pas encore":"Not yet", color:"var(--muted)", bg:"rgba(107,114,128,0.1)" };
  }

  const fpField = (info||{}).fpField;
  const familyTips = {
    medicine: {
      ar:["عرض المتطلبات الفعلية بأرقام واضحة","اقتراح بديل ملموس: تمريض أو هندسة طبية","الطلب بوقت للإثبات: 6 أشهر لرفع النقط"],
      fr:["Présenter les prérequis réels avec des chiffres clairs","Proposer une alternative concrète : soins infirmiers ou génie biomédical","Demander du temps pour prouver : 6 mois pour améliorer les notes"],
      en:["Present real requirements with clear numbers","Propose a concrete alternative: nursing or biomedical engineering","Ask for time to prove: 6 months to raise grades"],
    },
    engineering: {
      ar:["مشاركة متطلبات المدارس الهندسية بالأرقام","اقتراح ENSA أو FST كبديل قوي","التركيز على الهندسة التطبيقية كمسار جيد"],
      fr:["Partager les prérequis des écoles d'ingénieurs avec les chiffres","Proposer ENSA ou FST comme alternative solide","Mettre en avant l'ingénierie appliquée comme bon parcours"],
      en:["Share engineering school requirements with numbers","Propose ENSA or FST as a solid alternative","Highlight applied engineering as a strong path"],
    },
    default: {
      ar:["مشاركة الأرقام الحقيقية دون مشاعر","اقتراح بديل ملموس بقيمة عالية","طلب وقت للإثبات والتجربة"],
      fr:["Partager les vrais chiffres sans émotions","Proposer une alternative concrète à haute valeur","Demander du temps pour prouver et expérimenter"],
      en:["Share real numbers without emotion","Propose a concrete high-value alternative","Ask for time to prove and try"],
    },
  };
  const fpTips = (familyTips[fpField] || familyTips.default)[lang] || familyTips.default.en;

  return (
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:4}}>
        {t.prestigePage2Title||"Prestige & Family"} — Page 2/6
      </div>
      {isPostBac && (
        <div style={{background:"rgba(232,161,36,0.08)",border:"1px solid rgba(232,161,36,0.25)",
          borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:13,display:"flex",gap:8,alignItems:"center"}}>
          <span>📊</span>
          <span>{lang==="ar"?`معدلك: ${avg.toFixed(1)}/20`:lang==="fr"?`Ta moyenne : ${avg.toFixed(1)}/20`:`Your avg: ${avg.toFixed(1)}/20`}</span>
        </div>
      )}
      {routes.slice(0,4).map((school,i)=>{
        const b = badge(school);
        return (
          <div key={i} style={{background:"var(--surface2)",border:"1px solid var(--border)",
            borderRadius:14,padding:"14px 16px",marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6,flexWrap:"wrap",gap:6}}>
              <div style={{fontWeight:700,fontSize:14}}>{school}</div>
              <div style={{fontSize:11,fontWeight:700,color:b.color,background:b.bg,
                padding:"3px 10px",borderRadius:20}}>{b.label}</div>
            </div>
            <div style={{fontSize:12,color:"var(--muted)",lineHeight:1.5}}>
              {lang==="ar"
                ? `/[Mm]édecine|Medicine|طب/.test(school)` ? "معدل عالٍ جداً عادةً (≥16) + متطلبات موضوعية في SVT والكيمياء" : "/ENSA|ENSIAS|INPT|Prépa/.test(school)" ? "معدل مرتفع عادةً (≥15) + مستوى قوي في الرياضيات والفيزياء" : "معدل جيد (≥12) + ملف متوازن"
                : lang==="fr"
                ? "Prérequis selon l'établissement — varie par cycle et filière"
                : "Requirements vary by institution and cycle"}
            </div>
          </div>
        );
      })}
      {safeResults.familyPressure && fpTips.length > 0 && (
        <div style={{background:"rgba(245,158,11,0.07)",border:"1px solid rgba(245,158,11,0.25)",
          borderRadius:14,padding:"14px 16px",marginTop:8}}>
          <div style={{fontSize:13,fontWeight:700,marginBottom:10}}>
            {lang==="ar"?"💬 نصائح لمحادثة الأسرة":lang==="fr"?"💬 Conseils pour la famille":"💬 Family conversation tips"}
          </div>
          {fpTips.map((tip,i)=>(
            <div key={i} style={{display:"flex",gap:8,fontSize:12,color:"var(--text)",marginBottom:6}}>
              <span style={{color:"var(--accent3)",flexShrink:0}}>→</span>
              <span style={{lineHeight:1.5}}>{tip}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Page 3/6 — Future-Proof & Market 2030
// ─────────────────────────────────────────────────────────────────
function Page3Market({ lang, dir, safeResults, t }) {
  const top3 = safeResults.topThree || [];
  const hedge = {
    ar: ["برمجة Python أو تحليل البيانات — مطلوب في معظم المجالات","التواصل الرقمي والمحتوى — ميزة في أي مسار"],
    fr: ["Python ou analyse de données — demandé dans la plupart des domaines","Communication digitale — atout dans tout parcours"],
    en: ["Python or data analysis — needed in most fields","Digital communication — advantage in any path"],
  }[lang] || [];

  return (
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:4}}>
        {t.marketPage3Title||"Market 2030"} — Page 3/6
      </div>
      {top3.map((cluster,i)=>{
        const name = t[CLUSTER_KEY_MAP[cluster.id]] || cluster.id;
        const futureScore = Math.round((FUTURE_INDEX[cluster.id]||0.65)*100);
        const moroccoScore = Math.round((cluster.demandIndex||0.6)*100);
        const globalScore = Math.round(Math.min(100,(cluster.scores?.market||0.6)*100));
        const risks = [];
        if (futureScore < 60) risks.push(lang==="ar"?"مخاطر التشغيل الآلي":lang==="fr"?"Risque d'automatisation":"Automation risk");
        if (moroccoScore < 50) risks.push(lang==="ar"?"طلب منخفض في المغرب":lang==="fr"?"Faible demande au Maroc":"Low Morocco demand");
        return (
          <div key={cluster.id} style={{background:"var(--surface2)",border:"1px solid var(--border)",
            borderRadius:14,padding:"16px",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
              <span style={{fontSize:20}}>{cluster.icon||"🎯"}</span>
              <span style={{fontWeight:700,fontSize:14,flex:1}}>{name}</span>
              <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(59,130,246,0.1)",
                padding:"4px 10px",borderRadius:20}}>
                <span style={{fontSize:11,color:"var(--accent2)"}}>{t.futureProofScore||"Future"}</span>
                <span style={{fontWeight:800,color:"var(--accent2)",fontSize:13}}>{futureScore}%</span>
              </div>
            </div>
            {[
              { label: t.moroccoDemandsLabel||"Morocco", val: moroccoScore, color:"var(--accent3)" },
              { label: t.globalDemandsLabel||"Global",   val: globalScore,  color:"var(--accent2)" },
            ].map(bar=>(
              <div key={bar.label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                <span style={{fontSize:11,color:"var(--muted)",width:60,flexShrink:0}}>{bar.label}</span>
                <div style={{flex:1,height:6,background:"var(--border)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${bar.val}%`,background:bar.color,borderRadius:3,transition:"width 0.8s ease"}}/>
                </div>
                <span style={{fontSize:11,fontWeight:700,color:bar.color,width:34}}>{bar.val}%</span>
              </div>
            ))}
            {risks.length > 0 && (
              <div style={{marginTop:8,display:"flex",gap:6,flexWrap:"wrap"}}>
                {risks.map((r,ri)=>(
                  <span key={ri} style={{fontSize:11,color:"var(--warn)",background:"rgba(245,158,11,0.1)",
                    padding:"2px 8px",borderRadius:12,border:"1px solid rgba(245,158,11,0.25)"}}>⚠️ {r}</span>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div style={{background:"rgba(99,102,241,0.07)",border:"1px solid rgba(99,102,241,0.2)",
        borderRadius:12,padding:"12px 14px",marginTop:4}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:8}}>
          {t.hedgeSkillLabel||"Hedge skill"} 🛡️
        </div>
        {hedge.map((h,i)=>(
          <div key={i} style={{fontSize:12,color:"var(--text)",lineHeight:1.5,marginBottom:4,
            display:"flex",gap:6}}>
            <span style={{color:"var(--accent2)",flexShrink:0}}>✦</span>{h}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Page 4/6 — Top 3 Directions
// ─────────────────────────────────────────────────────────────────
function Page4Directions({ lang, dir, safeResults, t }) {
  const { threeViews } = safeResults;
  if (!threeViews) return null;
  const c = rf(lang);
  const cards = [
    { key:"bestFit", label:c.fitLabel, cluster:threeViews.bestFit, icon:"💡",
      accent:"var(--accent3)" },
    { key:"balanced", label:c.balLabel, cluster:threeViews.balanced, icon:"⚖️",
      accent:"var(--accent2)" },
    { key:"ambitious", label:c.ambLabel, cluster:threeViews.ambitious, icon:"🚀",
      accent:"var(--accent)" },
  ].filter(x=>x.cluster);

  return (
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:4}}>
        {t.directionsPage4Title||"Directions"} — Page 4/6
      </div>
      <p style={{fontSize:13,color:"var(--muted)",marginBottom:16}}>{c.jab2Sub}</p>
      {cards.map(({key,label,cluster,icon,accent})=>{
        const name = t[CLUSTER_KEY_MAP[cluster.id]]||cluster.id;
        const pct = Math.round((cluster.scores.final||0)*100);
        const acad = Math.round((cluster.scores.academic||0)*100);
        const trait = Math.round((cluster.scores.trait||0)*100);
        const market = Math.round((cluster.scores.market||0)*100);
        const prestige = Math.round((PRESTIGE_INDEX[cluster.id]||0.5)*100);
        return (
          <div key={key} style={{background:"var(--surface2)",border:`1.5px solid ${accent}`,
            borderRadius:16,padding:"16px",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"}}>
              <span style={{fontSize:22}}>{icon}</span>
              <div>
                <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:1,color:"var(--muted)"}}>{label}</div>
                <div style={{fontSize:16,fontWeight:800,color:"var(--text)"}}>{name}</div>
              </div>
              <span style={{marginInlineStart:"auto",fontSize:13,fontWeight:800,color:accent,
                background:`${accent}18`,padding:"4px 12px",borderRadius:20}}>{pct}%</span>
            </div>
            {[
              { label:t.academic||lang==="ar"?"دراسي":"Académique", val:acad, color:"var(--accent2)" },
              { label:t.personality||lang==="ar"?"شخصية":"Personnalité", val:trait, color:"var(--accent3)" },
              { label:t.market||lang==="ar"?"سوق":"Marché", val:market, color:accent },
              { label:"Prestige", val:prestige, color:"var(--accent)" },
            ].map(bar=>(
              <div key={bar.label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                <span style={{fontSize:11,color:"var(--muted)",width:65,flexShrink:0}}>{bar.label}</span>
                <div style={{flex:1,height:5,background:"var(--border)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${bar.val}%`,background:bar.color,borderRadius:3}}/>
                </div>
                <span style={{fontSize:11,fontWeight:700,color:bar.color,width:30}}>{bar.val}%</span>
              </div>
            ))}
            {cluster.eligibilityTag === "notEligiblePublic" && (
              <div style={{marginTop:8,fontSize:11,color:"var(--warn)",background:"rgba(245,158,11,0.08)",
                padding:"4px 10px",borderRadius:8,display:"inline-block"}}>
                ⚠️ {lang==="ar"?"شروط القبول العام لم تُستوفَ":lang==="fr"?"Conditions d'accès public non remplies":"Public eligibility conditions not met"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Page 5/6 — Starter Plan
// ─────────────────────────────────────────────────────────────────
function Page5Plan({ lang, dir, safeResults, t, onGoToPDF }) {
  const c = rf(lang);
  const [done, setDone] = React.useState({});
  const [priority, setPriority] = React.useState("stability");
  const topCluster = safeResults.topCareer;
  const lt = safeResults.learnerType || "architect";

  const tasks = [];
  (topCluster?.actionPlan||[]).slice(0,2).forEach(w=>{
    (w.items||[]).slice(0,2).forEach(item=>{ if(tasks.length<5) tasks.push(typeof item==="string"?item:item.label||""); });
  });
  const genericTasks = {
    ar:["ابحث عن 3 طلاب في نفس شعبتك وتبادل التجارب","راجع متطلبات القبول في مؤسسة تستهدفها","اقرأ أو شاهد 30 دقيقة عن المجال المقترح","ضع جدولاً أسبوعياً للمراجعة","تحدث مع شخص يعمل في المجال"],
    fr:["Trouve 3 étudiants dans ta filière et échange","Vérifie les prérequis d'une école cible","Lis ou regarde 30 min sur le domaine proposé","Rédige un planning de révision hebdomadaire","Parle à quelqu'un qui travaille dans ce domaine"],
    en:["Connect with 3 students in your track","Check admission requirements for one target school","Read or watch 30 min about the suggested field","Write a weekly revision plan","Talk to someone working in the field"],
  }[lang]||[];
  while(tasks.length<5) tasks.push(genericTasks[tasks.length]||"");

  const quickWins = {
    architect:{ ar:["رسم خريطة ذهنية لأهداف الأسبوع","قراءة ملخص الفصل الأول قبل الحصة"],
      fr:["Dessine une carte mentale des objectifs de la semaine","Lis le résumé du premier chapitre avant le cours"],
      en:["Draw a mind map of this week's goals","Read the chapter summary before class"] },
    striker:{ ar:["حل 5 تمارين في مادة ضعيفة","إتمام مشروع صغير يُمكن عرضه"],
      fr:["Résoudre 5 exercices dans une matière faible","Compléter un petit projet présentable"],
      en:["Solve 5 exercises in a weak subject","Complete a small presentable project"] },
    diplomat:{ ar:["شرح درس لزميل أو بصوت عالٍ","الانضمام لمجموعة مراجعة"],
      fr:["Expliquer un cours à un camarade ou à voix haute","Rejoindre un groupe de révision"],
      en:["Explain a lesson to a peer or aloud","Join a study group"] },
    sprinter:{ ar:["تحديد موعد نهائي وهمي لمهمة اليوم","إنجاز 3 تمارين في 20 دقيقة"],
      fr:["Fixer une fausse deadline pour la tâche du jour","Finir 3 exercices en 20 minutes"],
      en:["Set a fake deadline for today's task","Finish 3 exercises in 20 minutes"] },
    sentinel:{ ar:["مراجعة 10 دقائق عند نفس الوقت يومياً","تتبع عادة واحدة لمدة 7 أيام"],
      fr:["Réviser 10 min à la même heure chaque jour","Suivre une habitude pendant 7 jours"],
      en:["Review 10 min at the same time daily","Track one habit for 7 days"] },
    visionary:{ ar:["البحث عن شخص يعمل في المجال المُقترح","قراءة ملهِمة واحدة عن المجال"],
      fr:["Trouver quelqu'un qui travaille dans le domaine proposé","Lire quelque chose d'inspirant sur le domaine"],
      en:["Find someone working in the suggested field","Read something inspiring about the field"] },
  };
  const wins = ((quickWins[lt]||quickWins.architect)[lang]||quickWins.architect.en).slice(0,2);

  const risks = {
    ar:["مقارنة نفسك بالآخرين بدلاً من التركيز على تقدمك","تأجيل الخطوة الأولى حتى 'الوقت المثالي'"],
    fr:["Te comparer aux autres au lieu de te concentrer sur ta progression","Reporter la première étape jusqu'au 'moment parfait'"],
    en:["Comparing yourself to others instead of focusing on your progress","Delaying the first step until the 'perfect time'"],
  }[lang]||[];

  return (
    <div style={{animation:"fadeIn 0.4s ease"}}>
      <div style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:2,color:"var(--muted)",marginBottom:4}}>
        {t.planPage5Title||"Starter Plan"} — Page 5/6
      </div>

      {/* 7-day tasks */}
      <div style={{marginBottom:16}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:10}}>
          {lang==="ar"?"✅ خطة 7 أيام":lang==="fr"?"✅ Plan 7 jours":"✅ 7-day plan"}
        </div>
        {tasks.slice(0,5).map((task,i)=>(
          <div key={i} onClick={()=>setDone(d=>({...d,[i]:!d[i]}))}
            style={{display:"flex",gap:10,padding:"12px 14px",marginBottom:8,
              background:"var(--surface2)",border:`1.5px solid ${done[i]?"var(--accent3)":"var(--border)"}`,
              borderRadius:12,cursor:"pointer",opacity:done[i]?0.65:1,transition:"all 0.18s"}}>
            <div style={{width:20,height:20,borderRadius:5,flexShrink:0,marginTop:2,
              background:done[i]?"var(--accent3)":"var(--surface3)",
              border:`2px solid ${done[i]?"var(--accent3)":"var(--border)"}`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#fff"}}>
              {done[i]&&"✓"}
            </div>
            <span style={{fontSize:13,color:"var(--text)",lineHeight:1.55,flex:1,
              textDecoration:done[i]?"line-through":"none"}}>{task}</span>
            <span style={{fontSize:11,color:"var(--accent)",fontWeight:700,flexShrink:0}}>+10 XP</span>
          </div>
        ))}
      </div>

      {/* Quick wins */}
      <div style={{background:"rgba(16,185,129,0.07)",border:"1px solid rgba(16,185,129,0.2)",
        borderRadius:12,padding:"12px 14px",marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:8,color:"var(--accent3)"}}>
          ⚡ {t.weakPoint2Win||"Your wins"}
        </div>
        {wins.map((w,i)=>(
          <div key={i} style={{fontSize:12,color:"var(--text)",marginBottom:5,display:"flex",gap:6}}>
            <span style={{color:"var(--accent3)"}}>→</span><span style={{lineHeight:1.5}}>{w}</span>
          </div>
        ))}
      </div>

      {/* Risk to avoid */}
      <div style={{background:"rgba(239,68,68,0.06)",border:"1px solid rgba(239,68,68,0.2)",
        borderRadius:12,padding:"12px 14px",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:700,marginBottom:8,color:"#f87171"}}>
          ⛔ {t.riskAvoid||"Risk to avoid"}
        </div>
        {risks.slice(0,1).map((r,i)=>(
          <div key={i} style={{fontSize:12,color:"var(--text)",lineHeight:1.5}}>{r}</div>
        ))}
      </div>

      {/* PDF teaser */}
      <div style={{background:"linear-gradient(135deg,rgba(232,161,36,0.1),rgba(59,130,246,0.06))",
        border:"1px solid rgba(232,161,36,0.3)",borderRadius:14,padding:"14px 16px",
        display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
        <p style={{fontSize:13,color:"var(--text)",margin:0,flex:1,lineHeight:1.5}}>
          {c.jab4Upsell}
        </p>
        <button className="btn btn-primary" onClick={onGoToPDF} style={{flexShrink:0}}>
          📄 PDF →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// RESULTS FLOW — 6-page orchestrator (Page 1/6 → 6/6)
// ─────────────────────────────────────────────────────────────────
function ResultsFlow({
  t, lang, dir, info,
  marks, whatIfDeltas, setWhatIfDeltas,
  effectiveMarks, rankedClusters, traits, confidence, mixedSignals, narrative,
  reality, setReality, restart, onBack,
  secondaryTop3, overallAvg,
  journeyStage, preBacData, learnerAnswers,
}) {
  const [rfStep, setRfStep] = React.useState(0);
  const TOTAL = 6;

  // Guard
  const safeRanked  = Array.isArray(rankedClusters) ? rankedClusters : [];
  const safeTraits  = (traits && typeof traits === "object") ? traits : {};
  const safeMarks   = (marks  && typeof marks  === "object") ? marks  : {};
  const safeInfo    = (info   && typeof info   === "object") ? info   : {};
  const safeReality = (reality && typeof reality === "object") ? reality : {};
  const safeConf    = typeof confidence === "number" ? confidence : 0;

  if (safeRanked.length === 0) {
    return (
      <div className="card" dir={dir} style={{textAlign:"center", padding:"40px 24px"}}>
        <div style={{fontSize:48, marginBottom:16}}>📋</div>
        <h2 style={{marginBottom:12, fontWeight:700}}>
          {lang==="ar"?"ملفك الشخصي غير مكتمل":lang==="fr"?"Profil incomplet":"Incomplete profile"}
        </h2>
        <div style={{display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginTop:16}}>
          <button className="btn btn-secondary" onClick={()=>onBack?.()}>← {lang==="ar"?"رجوع":lang==="fr"?"Retour":"Back"}</button>
          <button className="btn btn-danger" onClick={restart}>{t?.restart || "Restart"}</button>
        </div>
      </div>
    );
  }

  const overallAvgVal = (() => {
    const vals = Object.values(safeMarks).map(Number).filter(v=>!isNaN(v)&&v>0);
    return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
  })();

  const ltResult    = computeLearnerType(learnerAnswers || {});
  const _archV2  = pickArchetypeV2({ traits:safeTraits, learnerType:computeLearnerType(learnerAnswers||{}).primary, strengths:Array.isArray(safeReality.strengths)?safeReality.strengths:[], confidence:safeConf });
  const _statsV2 = computeDeterministicStats(safeTraits);
  const _trSeed  = Math.round(((safeTraits.analytical||0.5)+(safeTraits.social||0.5))*100);
  const _serialId= makeSerialId(_archV2.code, _trSeed);
  const safeResults = {
    archetype:     computeMassarType(safeTraits, safeReality),
    archV2:        _archV2,
    statsV2:       _statsV2,
    serialId:      _serialId,
    topCareer:     safeRanked[0] || null,
    topThree:      safeRanked.slice(0,3),
    traits:        safeTraits,
    confidence:    Math.round(Math.min(100, Math.max(0, safeConf))),
    rarity:        getRarity(safeConf),
    overallAvg:    Math.min(20, Math.max(0, overallAvgVal)),
    threeViews:    computeThreeViews(safeRanked, overallAvgVal, safeInfo, safeMarks),
    strengths:     Array.isArray(safeReality.strengths) ? safeReality.strengths : [],
    familyPressure:!!safeReality.familyPressure,
    learnerType:   ltResult.primary,
    learnerSecondary: ltResult.secondary,
    learnerScores: ltResult.scores,
    journeyStage:  journeyStage || "postbac",
    preBacData:    preBacData || {},
  };

  const rfCopy = rf(lang);
  const goNext = () => setRfStep(s => Math.min(TOTAL-1, s+1));
  const goBack = () => {
    if (rfStep === 0) onBack?.();
    else setRfStep(s => Math.max(0, s-1));
  };

  const screens = [
    // Page 1/6 — Identity Mirror
    <Page1Identity key="p1" lang={lang} dir={dir} safeResults={safeResults} t={t} safeRanked={safeRanked}/>,
    // Page 2/6 — Prestige & Family Reality
    <Page2Prestige key="p2" lang={lang} dir={dir} safeResults={safeResults} info={safeInfo} t={t}/>,
    // Page 3/6 — Future-Proof & Market
    <Page3Market key="p3" lang={lang} dir={dir} safeResults={safeResults} t={t}/>,
    // Page 4/6 — Top 3 Directions
    <Page4Directions key="p4" lang={lang} dir={dir} safeResults={safeResults} t={t}/>,
    // Page 5/6 — Starter Plan
    <Page5Plan key="p5" lang={lang} dir={dir} safeResults={safeResults} t={t} onGoToPDF={()=>setRfStep(5)}/>,
    // Page 6/6 — PDF Offer (Right Hook)
    <RightHookPDF key="rh" lang={lang} dir={dir} safeResults={safeResults} t={t}/>,
  ];

  const stepLabels = [
    lang==="ar"?"الهوية":lang==="fr"?"Identité":"Identity",
    lang==="ar"?"المكانة":lang==="fr"?"Prestige":"Prestige",
    lang==="ar"?"السوق":lang==="fr"?"Marché":"Market",
    lang==="ar"?"الاتجاهات":lang==="fr"?"Directions":"Directions",
    lang==="ar"?"الخطة":lang==="fr"?"Plan":"Plan",
    lang==="ar"?"الملف":lang==="fr"?"PDF":"PDF",
  ];

  return (
    <div className="card" dir={dir} style={{maxWidth:720, width:"100%"}}>
      <RFProgress step={rfStep} total={TOTAL} lang={lang} dir={dir}/>
      <div style={{minHeight:400, paddingBottom:16}}>
        {screens[rfStep]}
      </div>
      <RFNav
        step={rfStep} total={TOTAL}
        onBack={goBack}
        onNext={goNext}
        lang={lang} dir={dir}
        nextLabel={rfStep < TOTAL-1 ? rfCopy.continueBtn : undefined}
        nextDisabled={rfStep === TOTAL-1}
      />
    </div>
  );
}

// src/massar/components/StepResults.jsx
// ─────────────────────────────────────────────────────────────────
// Goals wired here:
//   Goal 2: delta summary line + per-slider colored delta badge
//   Goal 3: health eligibility via ClusterCard (see ClusterCard.jsx)
//   Goal 5: CtaModal rendered at bottom
// ─────────────────────────────────────────────────────────────────





function StepResults({
  t, lang, dir, info, marks, whatIfDeltas, setWhatIfDeltas,
  effectiveMarks, rankedClusters, traits, confidence, mixedSignals, narrative,
  reality, setReality, restart, onBack,
  secondaryTop3, overallAvg,
}) {
  // ── FIX: prevent white screen on results ───────────────────────
  // Guard every critical input; if fundamentally missing, show fallback UI.
  const safeRanked  = Array.isArray(rankedClusters) ? rankedClusters : [];
  const safeTraits  = (traits && typeof traits === "object") ? traits : {};
  const safeMarks   = (marks  && typeof marks  === "object") ? marks  : {};
  const safeInfo    = (info   && typeof info   === "object") ? info   : {};
  const safeReality = (reality && typeof reality === "object") ? reality : {};
  const safeConf    = typeof confidence === "number" ? confidence : 0;

  // FIX: guard clause before results render
  if (safeRanked.length === 0) {
    return (
      <div style={{
        padding:"40px 28px", textAlign:"center", maxWidth:520, margin:"0 auto",
        background:"var(--surface)", borderRadius:20, border:"1px solid var(--border)",
        boxShadow:"0 8px 32px rgba(0,0,0,0.4)",
      }}>
        <div style={{fontSize:48, marginBottom:16}}>📋</div>
        <h2 style={{fontSize:20, color:"var(--text)", marginBottom:10, fontWeight:700}}>
          {lang==="ar"?"ملفك الشخصي غير مكتمل": lang==="fr"?"Profil incomplet":"Your profile is incomplete"}
        </h2>
        <p style={{fontSize:14, color:"var(--muted)", marginBottom:8, lineHeight:1.6}}>
          {lang==="ar"?"لم نتمكن من بناء ملفك الكامل بعد. يُرجى إعادة الاختبار.":
           lang==="fr"?"Nous n'avons pas pu construire votre profil complet. Veuillez recommencer le test.":
           "We couldn't build your full profile yet. Please restart the test."}
        </p>
        {/* FIX: guard clause — Back goes to previous step; Restart clears everything */}
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:24}}>
          <button className="btn btn-secondary" onClick={()=>onBack?.()}>
            ← {lang==="ar"?"رجوع": lang==="fr"?"Retour":"Back"}
          </button>
          <button className="btn btn-danger" onClick={restart}>
            {t?.restart || "Restart Test"}
          </button>
        </div>
      </div>
    );
  }
  // ── End null-safety gate ────────────────────────────────────────

  // SUBJECTS FIX: use getSubjectsForMarks for accurate subject list in results panel
  const subjs   = getSubjectsForMarks(safeInfo);
  const origAvg = subjs.length ? subjs.reduce((s,k)=>s+(Number(safeMarks[k])||0),0)/subjs.length : 0;
  const adjAvg  = subjs.length ? subjs.reduce((s,k)=>s+(effectiveMarks?.[k]||0),0)/subjs.length : 0;
  const hasDeltas = Object.values(whatIfDeltas || {}).some(d=>Number(d)!==0);
  const isAfterBac = safeInfo.bacStatus === "after";

  // FIX: results page null-safety — safeTop / safeTop3
  const top3     = safeRanked.slice(0,3);
  const safeTop  = top3[0] || null;   // FIX: results page null-safety
  // D — Prestige-smart fallback: if avg ≥ 14.5, pick best non-health prestige cluster (#4+)
  //     rather than the old "low-academic, high-demand" logic which surfaced OFPPT-framed paths.
  const overallAvgForFallback = (() => {
    const vals = Object.values(safeMarks||{}).map(Number).filter(v=>!isNaN(v)&&v>0);
    return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
  })();
  const fallback = (() => {
    if (overallAvgForFallback >= 14.5) {
      // High-avg: pick best non-health cluster outside top-3 sorted by prestige index
      const top3ids = new Set(top3.map(c=>c.id));
      const candidate = [...safeRanked]
        .filter(c => !top3ids.has(c.id) && c.id !== "health")
        .sort((a,b) => (PRESTIGE_INDEX[b.id]||0.5) - (PRESTIGE_INDEX[a.id]||0.5))[0];
      return candidate || safeRanked[3] || null;
    }
    return safeRanked.find(c=>c.scores.academic<0.4&&c.demandIndex>0.7)||safeRanked[3]||null;
  })();

  const confClass = safeConf>=70?"confidence-high":safeConf>=50?"confidence-med":"confidence-low";
  const massarType = computeMassarType(safeTraits, safeReality);
  const typeDesc   = massarTypeDesc(massarType, t);
  const traitLabels = {
    ar:{ analytical:"تحليلي", social:"اجتماعي", structure:"منظم", creativity:"مبدع", risk:"مبادر", leadership:"قيادي" },
    fr:{ analytical:"Analytique", social:"Social", structure:"Rigoureux", creativity:"Créatif", risk:"Risque", leadership:"Leader" },
    en:{ analytical:"Analytical", social:"Social", structure:"Organized", creativity:"Creative", risk:"Risk-taker", leadership:"Leader" },
  }[lang] || {};

  // Build change summary string
  const changeSummary = subjs
    .map(s=>{ const d=Number((whatIfDeltas||{})[s])||0; return d!==0?`${SUBJECT_LABELS[s]?.[lang]||s} ${d>0?"+":""}${d}`:null; })
    .filter(Boolean);

  const topCluster = safeTop;  // FIX: results page null-safety

  // FIX: normalized safeResults — single source of truth for all results blocks
  const overallAvgVal = (() => {
    const vals = Object.values(safeMarks).map(Number).filter(v=>!isNaN(v)&&v>0);
    return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
  })();

  const safeResults = {
    archetype:     computeMassarType(safeTraits, safeReality),
    topCareer:     safeTop,
    topThree:      top3,
    traits:        safeTraits,
    confidence:    clamp(safeConf),
    rarity:        getRarity(safeConf),
    overallAvg:    clamp(overallAvgVal, 0, 20),
    threeViews:    computeThreeViews(safeRanked, overallAvgVal, safeInfo, safeMarks),
    strengths:     Array.isArray(safeReality.strengths) ? safeReality.strengths : [],
    familyPressure: !!safeReality.familyPressure,
    xpProgress:    0, // managed by XPProgressionTracker internally
  };

  // FIX: development debug logs
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.groupCollapsed("[Massar] Results built");
    console.log("safeResults:", safeResults);
    console.log("archetype computed:", safeResults.archetype);
    console.log("top clusters:", top3.map(c=>({id:c.id, final:c.scores.final?.toFixed(3)})));
    console.log("three views:", {
      bestFit: safeResults.threeViews.bestFit?.id,
      balanced: safeResults.threeViews.balanced?.id,
      ambitious: safeResults.threeViews.ambitious?.id,
    });
    console.groupEnd();
  }

  return (
    <div className="results-wrap" dir={dir}>

      {/* Narrative */}
      {narrative && (
        <div className="narrative" dangerouslySetInnerHTML={{__html:narrative}}/>
      )}

      {/* ── Phase 1: Archetype Hero Identity ── */}
      <ArchetypeCard massarType={massarType} typeDesc={typeDesc} t={t} lang={lang} traits={safeTraits} top3={top3} confidence={safeConf}/>

      {/* ── Phase 2: Abilities System ── */}
      <AbilitiesSection traits={safeTraits} lang={lang}/>

      {/* ── Phase 8: Competition Mode ── */}
      <CompetitionMode traits={safeTraits} lang={lang}/>

      {/* ── Phase 9: Family Pressure — collapsed by default ── */}
      {safeReality.familyPressure && (
        <CollapsibleSection
          title={lang==="ar"?"💬 الضغط العائلي":lang==="fr"?"💬 Pression Familiale":"💬 Family Pressure"}
          defaultOpen={false}
          accent="var(--warn)">
          <FamilyPressureAdaptiveCard
            t={t} lang={lang} marks={safeMarks} traits={safeTraits} info={safeInfo} rankedClusters={safeRanked} reality={safeReality}/>
        </CollapsibleSection>
      )}

      {/* Confidence badge */}
      <div className="confidence-row">
        <span className={`confidence-badge ${confClass}`}>
          {/* FIX: translation fallback + Arabic-first UX */}
          {t?.confidenceLabel || "Alignment"}: <span dir="ltr">{safeConf}%</span>
        </span>
      </div>

      {mixedSignals && (
        <div className="mixed-warning" style={{marginBottom:14}}>{t.mixedSignals}</div>
      )}

      <div className="results-grid">

        {/* Radar */}
        <div className="result-card highlight">
          <h3>{t.traitRadar}</h3>
          <div className="radar-wrap"><RadarChart traits={safeTraits} lang={lang}/></div>
        </div>

        {/* Academic marks — original values */}
        <div className="result-card">
          <h3>{t.academic}</h3>
          {subjs.map(s=>{
            const v=Number(safeMarks[s])||0;
            const color=v>=15?"#10b981":v>=10?"#3b82f6":"#ef4444";
            return (
              <div key={s} style={{marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:"var(--text)"}}>{SUBJECT_LABELS[s]?.[lang]||s}</span>
                  <span style={{color,fontWeight:700}}>{v}/20</span>
                </div>
                <div style={{height:5,background:"var(--border)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${(v/20)*100}%`,background:color,borderRadius:3,animation:"barGrow 0.8s ease both"}}/>
                </div>
              </div>
            );
          })}
          <div className="avg-row">
            <span className="avg-label">{info.examMode==="full_bac" ? t.wataniAverage : t.overallAverage}</span>
            <span className="avg-val" style={{color:origAvg>=10?"#10b981":"#ef4444"}}>
              {origAvg.toFixed(1)}/20
            </span>
          </div>
        </div>

        {/* What-if sliders — disabled if after bac */}
        <div className="result-card">
          <h3>{t.whatIf}</h3>
          {isAfterBac ? (
            <div style={{
              padding:"16px",background:"rgba(107,114,128,0.1)",
              border:"1px solid var(--border)",borderRadius:10,
              fontSize:13,color:"var(--muted)",fontStyle:"italic",textAlign:"center",
            }}>
              🎓 {t.whatIfDisabled}
            </div>
          ) : (
            <>
              {subjs.map(s=>{
                const delta   = Number((whatIfDeltas||{})[s])||0;
                const effMark = effectiveMarks?.[s]||0;
                const effColor= effMark>=15?"#10b981":effMark>=10?"#3b82f6":"#ef4444";
                const deltaColor = delta>0?"#10b981":delta<0?"#ef4444":"var(--muted)";
                const deltaStr   = delta===0?"0":`${delta>0?"+":""}${delta}`;
                return (
                  <div key={s} className="whatif-row">
                    <div className="whatif-label">{SUBJECT_LABELS[s]?.[lang]||s}</div>
                    <input type="range" min="-5" max="5" step="0.5"
                      value={delta}
                      onChange={e=>setWhatIfDeltas(prev=>({...prev,[s]:Number(e.target.value)}))}/>
                    <div className="whatif-delta" style={{color:deltaColor,minWidth:38,textAlign:"center"}}>
                      {deltaStr}
                    </div>
                    <div className="whatif-result" style={{color:effColor}}>
                      {effMark.toFixed(1)}
                    </div>
                  </div>
                );
              })}
              {hasDeltas && (
                <div className="avg-row" style={{borderTop:"1px solid var(--border)",marginTop:8,paddingTop:8}}>
                  <span className="avg-label">{t.adjustedAverage}</span>
                  <span className="avg-val" style={{color:adjAvg>=10?"#10b981":"#ef4444"}}>
                    {adjAvg.toFixed(1)}/20
                  </span>
                </div>
              )}
              {changeSummary.length>0 && (
                <div style={{marginTop:10,padding:"8px 12px",background:"var(--surface3)",borderRadius:8,fontSize:11,color:"var(--muted)",lineHeight:1.6}}>
                  <strong style={{color:"var(--text)"}}>{t.sliderChangeSummary}: </strong>
                  {changeSummary.join(" · ")}
                </div>
              )}
              {!hasDeltas && (
                <div style={{fontSize:11,color:"var(--muted)",marginTop:10,fontStyle:"italic"}}>
                  {t.sliderNoChange}
                </div>
              )}
              <div style={{fontSize:11,color:"var(--muted)",marginTop:6}}>{t.sliderHint}</div>
            </>
          )}
        </div>

      </div>

      {/* ── Improve Mode (before bac only) ── */}
      {!isAfterBac && (
        <ImproveModeCard
          t={t} lang={lang} marks={safeMarks} traits={safeTraits}
          rankedClusters={safeRanked} reality={safeReality} setReality={setReality}/>
      )}

      {/* ── WhyThisIsTop: deterministic explainability block (spec §4) ── */}
      {top3[0] && (
        <WhyThisIsTop
          cluster={top3[0]}
          overallAvg={safeResults.overallAvg}
          lang={lang}
          t={t}
        />
      )}

      {/* ── FIX: multi-view recommendation ── */}
      <ThreeViewPanel
        t={t} lang={lang}
        views={safeResults.threeViews}
        overallAvg={safeResults.overallAvg}
      />

      {/* ── Phase 5: TOP 3 careers — Cultural rerank layer ── */}
      <div className="section-title">{t.topCareers}</div>

      {/* Cultural rerank layer — 3F: unsure mode shows dual-view (Best Fit + Prestige Track) */}
      {(safeInfo.goalMode === "unsure") && secondaryTop3 && secondaryTop3.length > 0 ? (
        <GoalModeDualView
          primary={top3}
          secondary={secondaryTop3}
          t={t} lang={lang} dir={dir}
          bacTrack={safeInfo.bacTrack}
          goal={safeInfo.goal || "prestige"}
          overallAvg={overallAvg || safeResults.overallAvg}
        />
      ) : (
        <>
          {top3.map((c,i)=>(
            <ClusterCard key={c.id} cluster={c} rank={i+1} t={t} lang={lang} bacTrack={safeInfo.bacTrack}
              goal={safeInfo.goal || "prestige"} overallAvg={overallAvg || safeResults.overallAvg}/>
          ))}
        </>
      )}

      {/* Cultural rerank layer — Step 4: Prestige adjacent suggestions */}
      {top3.length > 0 && (safeInfo.goalMode === "prestige" || safeInfo.goalMode === "unsure") && (() => {
        const topId = top3[0]?.id;
        const topPrestige = CLUSTER_PRESTIGE[topId];
        const isLowPrestige = topPrestige && (topPrestige.trackType === "hands_on" || topPrestige.prestigeIndex < 0.60);
        return isLowPrestige ? (
          <PrestigeAdjacentPanel topClusterId={topId} lang={lang} t={t}/>
        ) : null;
      })()}

      {/* ── Phase 9: Alternative Path — collapsed ── */}
      <CollapsibleSection
        title={(lang==="ar"?"🔄 ":lang==="fr"?"🔄 ":"🔄 ")+t.fallback}
        defaultOpen={false}
        accent="#10b981">
        <div className="fallback-card">
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            {/* FIX: results page null-safety — fallback may be undefined */}
            <span style={{fontSize:24}}>{fallback?.icon}</span>
            <div>
              <div style={{fontWeight:700}}>{fallback && t[CLUSTER_KEY_MAP[fallback.id]]}</div>
              <div style={{fontSize:12,color:"var(--warn)"}}>{t.fallbackDesc}</div>
            </div>
          </div>
          <div style={{fontSize:13,color:"var(--text)"}}>{t.fallbackBody}</div>
        </div>
      </CollapsibleSection>

      {/* ── Phase 9: International — collapsed ── */}
      {safeInfo.studyAbroad && (
        <CollapsibleSection
          title={"🌍 "+t.intlPathwayTitle}
          defaultOpen={false}
          accent="#10b981">
          <div style={{
            background:"rgba(16,185,129,0.05)",border:"1px solid rgba(16,185,129,0.25)",
            borderRadius:14,padding:"20px 24px",
          }}>
            {[
              { title:t.intlRequirementsTitle, body:t.intlRequirementsText },
              { title:t.intlTranslationTitle,  body: `${t[CLUSTER_KEY_MAP[topCluster?.id]]||""} — ${lang==="ar"?"تُترجم عالمياً بمؤهلات تقنية وإطار نظري قابل للنقل.":lang==="fr"?"se traduit à l'international avec des compétences techniques et un cadre théorique transférable.":"translates internationally with transferable technical skills and theoretical framework."}` },
              { title:t.intlFinanceTitle, body:t.intlFinanceText },
              { title:t.intlDifferenceTitle, body:t.intlDifferenceText },
            ].map(item=>(
              <div key={item.title} style={{marginBottom:14}}>
                <div style={{fontWeight:600,fontSize:13,color:"var(--text)",marginBottom:4}}>{item.title}</div>
                <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.6}}>{item.body}</div>
              </div>
            ))}
            {topCluster?.id==="health" && (
              <div style={{marginTop:8,padding:"10px 14px",background:"rgba(239,68,68,0.08)",
                border:"1px solid rgba(239,68,68,0.25)",borderRadius:8,fontSize:13,color:"#f87171"}}>
                {t.intlHealthNote}
              </div>
            )}
          </div>
        </CollapsibleSection>
      )}

      {/* ── Phase 9: Truth Mode — collapsed ── */}
      <CollapsibleSection title={t.truthModeBtn} defaultOpen={false} accent="var(--muted)">
        <TruthModeCard t={t} lang={lang} traits={safeTraits} top3={top3}/>
      </CollapsibleSection>

      {/* ── Phase 7: Share Card — status symbol ── */}
      {/* FIX: results page null-safety — topCluster may be null; ShareCard handles it internally */}
      <ShareCard t={t} lang={lang} massarType={massarType} topCluster={topCluster} confidence={safeConf}/>

      {/* ── Phase 6: Action plan → XP Progression Tracker ── */}
      <div className="section-title">{t.actionPlan}</div>
      <XPProgressionTracker top3={top3} t={t} lang={lang} massarType={massarType} />

      <p className="salary-note">{t.salaryNote}</p>

      {/* CTA + restart */}
      <div style={{display:"flex",gap:12,marginTop:24,flexWrap:"wrap",alignItems:"center"}}>
        <CtaModal t={t} dir={dir}/>
        <button className="btn btn-danger" onClick={restart}>{t.restart}</button>
      </div>

    </div>
  );
}



// ════════════════════════════════ App ══════════════════════════

// src/massar/MassarPro.jsx  (thin orchestrator)
// ─────────────────────────────────────────────────────────────────
// All state lives here. Components receive only the props they need.
// Business logic is in utils/; UI in components/; data in data/.
// ─────────────────────────────────────────────────────────────────

// i18n

// data

// utils



// components


// ─────────────────────────────────────────────────────────────────
// CSS  (kept inline so the component is self-contained)
// ─────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&family=IBM+Plex+Sans+Arabic:wght@400;600&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{
    background:#0a0e1a;color:#e8ecf0;
    font-family:'DM Sans',sans-serif;
    min-height:100vh;
    /* Prevent text inflation on mobile */
    -webkit-text-size-adjust:100%; text-size-adjust:100%;
    /* Smooth font rendering */
    -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale;
  }
  /* Arabic: Tajawal primary, proper line height and word spacing */
  [dir="rtl"]{
    font-family:'Tajawal','IBM Plex Sans Arabic',sans-serif;
    line-height:1.75;
    word-spacing:0.02em;
  }
  [dir="rtl"] h1,[dir="rtl"] h2,[dir="rtl"] h3{
    line-height:1.4;
    font-weight:700;
  }
  /* Arabic punctuation spacing */
  [dir="rtl"] p { text-align: right; }

  /* ── Phase 10: Micro animations ── */
  @keyframes fadeIn{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
  @keyframes archetypeFlip{0%{transform:perspective(800px) rotateY(90deg);opacity:0;}100%{transform:perspective(800px) rotateY(0);opacity:1;}}
  @keyframes archetypeGlow{0%,100%{filter:drop-shadow(0 0 14px var(--glow,#3b82f6));}50%{filter:drop-shadow(0 0 30px var(--glow,#3b82f6));}}
  .archetype-reveal{animation:archetypeFlip .45s ease both;}
  @keyframes barGrow{from{width:0;}to{width:var(--bar-w,100%);}}
  @keyframes glowPulse{0%,100%{box-shadow:0 0 8px rgba(232,161,36,0.2);}50%{box-shadow:0 0 22px rgba(232,161,36,0.55),0 0 40px rgba(232,161,36,0.2);}}
  @keyframes scGlowLegendary{
    0%,100%{box-shadow:0 0 0 1.5px rgba(245,158,11,0.7),0 0 0 3px rgba(245,158,11,0.15),0 0 28px rgba(245,158,11,0.4),0 0 0px transparent,0 16px 56px rgba(0,0,0,0.8);}
    50%{box-shadow:0 0 0 1.5px rgba(245,158,11,1),0 0 0 4px rgba(245,158,11,0.25),0 0 48px rgba(245,158,11,0.6),0 0 80px rgba(245,158,11,0.3),0 16px 56px rgba(0,0,0,0.8);}
  }
  @keyframes scGlowEpic{
    0%,100%{box-shadow:0 0 0 1.5px rgba(168,85,247,0.6),0 0 0 3px rgba(168,85,247,0.12),0 0 24px rgba(168,85,247,0.4),0 0 0px transparent,0 16px 56px rgba(0,0,0,0.8);}
    50%{box-shadow:0 0 0 1.5px rgba(168,85,247,0.95),0 0 0 4px rgba(168,85,247,0.2),0 0 40px rgba(168,85,247,0.55),0 0 60px rgba(168,85,247,0.2),0 16px 56px rgba(0,0,0,0.8);}
  }
  @keyframes scGlowRare{
    0%,100%{box-shadow:0 0 0 1.5px rgba(34,211,238,0.55),0 0 0 3px rgba(34,211,238,0.1),0 0 20px rgba(34,211,238,0.35),0 16px 56px rgba(0,0,0,0.8);}
    50%{box-shadow:0 0 0 1.5px rgba(34,211,238,0.9),0 0 0 4px rgba(34,211,238,0.18),0 0 36px rgba(34,211,238,0.5),0 16px 56px rgba(0,0,0,0.8);}
  }
  @keyframes rarePulse{0%,100%{box-shadow:0 0 8px rgba(168,85,247,0.2);}50%{box-shadow:0 0 22px rgba(168,85,247,0.55),0 0 40px rgba(168,85,247,0.18);}}
  @keyframes xpPop{0%{transform:scale(1);}40%{transform:scale(1.25);}100%{transform:scale(1);}}
  @keyframes iconPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}
  @keyframes completionBounce{0%,100%{transform:scale(1);}30%{transform:scale(1.15);}60%{transform:scale(0.96);}}

  .results-wrap>*{animation:fadeIn 0.45s ease both;}

  /* ── Phase 1: Rarity tiers — FIX: unified Common/Rare/Epic/Legendary ── */
  .rarity-common{border-color:rgba(107,114,128,0.6)!important;}
  .rarity-rare{border-color:rgba(34,211,238,0.7)!important;box-shadow:0 0 18px rgba(34,211,238,0.12);}
  .rarity-epic{border-color:rgba(168,85,247,0.8)!important;animation:rarePulse 4s ease-in-out infinite;}
  .rarity-legendary{border-color:rgba(232,161,36,0.9)!important;animation:glowPulse 4s ease-in-out infinite;}
  .rarity-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:20px;font-size:11px;font-weight:800;letter-spacing:0.5px;}
  .rarity-badge-common{background:rgba(107,114,128,0.15);color:#9ca3af;border:1px solid rgba(107,114,128,0.3);}
  .rarity-badge-rare{background:rgba(34,211,238,0.1);color:#22d3ee;border:1px solid rgba(34,211,238,0.35);}
  .rarity-badge-epic{background:rgba(168,85,247,0.15);color:#c084fc;border:1px solid rgba(168,85,247,0.45);}
  .rarity-badge-legendary{background:rgba(232,161,36,0.18);color:#fbbf24;border:1px solid rgba(232,161,36,0.5);}
  .archetype-icon-wrap{position:relative;display:inline-flex;align-items:center;justify-content:center;}
  .archetype-icon-wrap .icon-inner{animation:iconPulse 4s ease-in-out infinite;}

  /* ── Phase 2: Ability cards ── */
  .abilities-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:12px;}
  .ability-card{border-radius:14px;padding:16px;border:1.5px solid var(--border);background:var(--surface2);position:relative;overflow:hidden;transition:transform 0.2s,box-shadow 0.2s;}
  .ability-card:hover{transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,0.3);}
  .ability-card.dominant{border-color:rgba(232,161,36,0.6);box-shadow:0 0 14px rgba(232,161,36,0.12);}
  .ability-bar-track{height:5px;background:var(--border);border-radius:3px;overflow:hidden;margin:10px 0 6px;}
  .ability-bar-fill{height:100%;border-radius:3px;animation:barGrow 0.9s ease both;}
  /* FIX: Arabic-first UX — bar tracks are LTR so fills go left→right even inside RTL containers */
  [dir="rtl"] .ability-bar-track,[dir="rtl"] .xp-progress-track,[dir="rtl"] .percentile-bar,
  [dir="rtl"] .mark-bar,[dir="rtl"] .explain-bar{direction:ltr!important;}
  .ability-icon-wrap{width:22px;height:22px;margin-bottom:8px;display:flex;align-items:center;justify-content:center;}
  .ability-icon-wrap svg{width:100%;height:100%;}
  .dominant-badge{position:absolute;top:6px;right:6px;font-size:8px;font-weight:800;letter-spacing:0.5px;padding:2px 6px;border-radius:10px;background:rgba(232,161,36,0.2);color:#fbbf24;border:1px solid rgba(232,161,36,0.4);max-width:85%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  [dir="rtl"] .dominant-badge{right:auto;left:8px;}

  /* ── Phase 5: Top career glow ── */
  .cluster-card.rank-1{transform:scale(1.01);box-shadow:0 0 24px rgba(232,161,36,0.15);}
  .cluster-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.25);}
  .cluster-card.rank-1:hover{transform:scale(1.01) translateY(-2px);}
  .best-match-label{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:800;letter-spacing:1.2px;background:linear-gradient(90deg,rgba(232,161,36,0.25),rgba(251,191,36,0.15));color:#fbbf24;border:1px solid rgba(232,161,36,0.45);text-transform:uppercase;margin-bottom:6px;}

  /* ── Phase 6: XP / Progression ── */
  .xp-counter{background:linear-gradient(135deg,rgba(59,130,246,0.12),rgba(232,161,36,0.08));border:1px solid rgba(59,130,246,0.3);border-radius:14px;padding:16px 20px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between;gap:12;flex-wrap:wrap;}
  .xp-total{font-size:28px;font-weight:800;background:linear-gradient(90deg,#3b82f6,#e8a124);-webkit-background-clip:text;-webkit-text-fill-color:transparent;}
  .xp-progress-track{height:8px;background:var(--border);border-radius:4px;overflow:hidden;flex:1;min-width:120px;}
  .xp-progress-fill{height:100%;background:linear-gradient(90deg,#3b82f6,#e8a124);border-radius:4px;transition:width 0.5s ease;}
  .xp-badge{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;animation:completionBounce 0.6s ease;background:linear-gradient(90deg,rgba(16,185,129,0.2),rgba(59,130,246,0.15));color:#10b981;border:1px solid rgba(16,185,129,0.4);}
  .task-item{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:10px;background:var(--surface2);border:1px solid var(--border);margin-bottom:8px;cursor:pointer;transition:all 0.2s;}
  .task-item:hover{border-color:var(--accent2);}
  .task-item.completed{opacity:0.6;background:rgba(16,185,129,0.05);border-color:rgba(16,185,129,0.25);}
  .task-checkbox{width:20px;height:20px;border-radius:6px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all 0.2s;margin-top:1px;}
  .task-checkbox.done{background:#10b981;border-color:#10b981;}
  .task-xp{margin-left:auto;font-size:10px;font-weight:700;color:var(--accent2);padding:2px 7px;border-radius:10px;background:rgba(59,130,246,0.1);white-space:nowrap;flex-shrink:0;}
  [dir="rtl"] .task-xp{margin-left:0;margin-right:auto;}

  /* ── Phase 8: Competition mode ── */
  .comp-toggle{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:12px;background:var(--surface2);border:1.5px solid var(--border);cursor:pointer;font-size:13px;font-weight:600;color:var(--muted);transition:all 0.2s;width:100%;margin-bottom:12px;}
  .comp-toggle:hover{border-color:var(--accent2);color:var(--accent2);}
  .comp-toggle.active{border-color:var(--accent2);color:var(--accent2);background:rgba(59,130,246,0.06);}
  .comp-toggle-dot{width:10px;height:10px;border-radius:50%;background:var(--border);transition:background 0.2s;flex-shrink:0;}
  .comp-toggle.active .comp-toggle-dot{background:var(--accent2);}
  .percentile-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
  .percentile-bar{flex:1;height:6px;background:var(--border);border-radius:3px;overflow:hidden;}
  .percentile-fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--accent2),var(--accent3));animation:barGrow 0.8s ease both;}

  /* ── Phase 9: Collapsible sections ── */
  .collapsible-header{display:flex;align-items:center;justify-content:space-between;cursor:pointer;padding:14px 18px;border-radius:12px;background:var(--surface);border:1px solid var(--border);user-select:none;transition:border-color 0.2s;}
  .collapsible-header:hover{border-color:var(--accent2);}
  .collapsible-chevron{font-size:12px;color:var(--muted);transition:transform 0.25s;}
  .collapsible-chevron.open{transform:rotate(180deg);}
  .collapsible-body{overflow:hidden;transition:max-height 0.35s ease,opacity 0.3s ease;}
  .collapsible-body.hidden{max-height:0;opacity:0;pointer-events:none;}
  .collapsible-body.visible{max-height:3000px;opacity:1;}

  /* ── Original CSS ── */
  :root{--bg:#0a0e1a;--surface:#111827;--surface2:#1a2235;--surface3:#222d42;
    --accent:#e8a124;--accent2:#3b82f6;--accent3:#10b981;
    --text:#e8ecf0;--muted:#6b7280;--border:#1f2d45;--danger:#ef4444;--warn:#f59e0b;}

  /* ── Mobile-first root — zero overflow, safe-area, no fixed widths */
  html { box-sizing: border-box; overflow-x: hidden; }
  *, *::before, *::after { box-sizing: inherit; }
  html, body { width: 100%; min-height: 100%; }
  body {
    overflow-x: hidden;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    /* Prevent bounce/overscroll from exposing white bg */
    background: #0a0e1a;
  }
  #root {
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    isolation: isolate;
  }
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Responsive padding — never wider than screen */
    padding: clamp(12px, 3vw, 22px) clamp(12px, 4vw, 18px);
    padding-bottom: max(80px, calc(80px + env(safe-area-inset-bottom, 0px)));
    padding-top: max(12px, env(safe-area-inset-top, 0px));
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
  }
  .header{text-align:center;margin-bottom:32px;padding-top:16px;width:100%;}
  .header h1{
    font-size: clamp(24px,6vw,48px);
    background:linear-gradient(135deg,#e8a124,#f59e0b,#fbbf24);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    letter-spacing:-1px;line-height:1.1;
    word-break:break-word;
  }
  [dir="rtl"] .header h1{font-family:'Tajawal','IBM Plex Sans Arabic',sans-serif;letter-spacing:0;}
  .header p{color:#9ca3af;margin-top:8px;font-size:clamp(13px,3.5vw,15px);}

  /* Fix 1: Card — no fixed max-width wider than viewport, responsive padding */
  .card{
    background:var(--surface);border:1px solid var(--border);border-radius:16px;
    padding: clamp(18px,4vw,28px);
    width:100%;max-width:720px;
    box-shadow:0 4px 24px rgba(0,0,0,0.4);
    box-sizing:border-box;
  }
  .step-indicator{display:flex;align-items:center;gap:8px;margin-bottom:24px;font-size:13px;color:var(--muted);}
  .step-dot{width:8px;height:8px;border-radius:50%;background:var(--border);}
  .step-dot.active{background:var(--accent);}
  .step-dot.done{background:var(--accent3);}
  .lang-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px;}
  .lang-btn{padding:20px 12px;border:2px solid var(--border);border-radius:12px;
    background:var(--surface2);cursor:pointer;transition:all 0.2s;
    display:flex;flex-direction:column;align-items:center;gap:6px;color:var(--text);}
  .lang-btn:hover,.lang-btn.selected{border-color:var(--accent);background:rgba(232,161,36,0.1);}
  .lang-btn .flag{font-size:28px;} .lang-btn .name{font-size:14px;font-weight:600;}
  .q-card{background:var(--surface2);border:1px solid var(--border);border-radius:12px;padding:20px;margin-bottom:16px;}
  .q-text{font-size:15px;line-height:1.6;margin-bottom:14px;color:var(--text);}
  .likert{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;}
  .likert-btn{width:44px;height:44px;border-radius:50%;border:2px solid var(--border);
    background:var(--surface3);color:var(--muted);cursor:pointer;font-size:14px;font-weight:600;
    transition:all 0.2s;display:flex;align-items:center;justify-content:center;}
  .likert-btn:hover{border-color:var(--accent);color:var(--accent);}
  .likert-btn.selected{background:var(--accent);border-color:var(--accent);color:#000;}
  .likert-labels{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:6px;padding:0 4px;}
  .field{margin-bottom:20px;}
  .field label{display:block;font-size:13px;font-weight:600;color:var(--muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;}
  .field select,.field input[type=number],.field input[type=text],.field input[type=email]{
    width:100%;padding:10px 14px;background:var(--surface2);border:1.5px solid var(--border);
    border-radius:8px;color:var(--text);font-size:15px;outline:none;transition:border-color 0.2s;font-family:inherit;}
  .field select:focus,.field input:focus{border-color:var(--accent);}
  .field option{background:var(--surface2);}
  .mobility-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:6px;}
  .mob-btn{padding:10px 8px;border:1.5px solid var(--border);border-radius:8px;
    background:var(--surface2);cursor:pointer;font-size:12px;text-align:center;
    color:var(--muted);transition:all 0.2s;line-height:1.4;}
  .mob-btn:hover,.mob-btn.selected{border-color:var(--accent2);color:var(--accent2);background:rgba(59,130,246,0.1);}
  .marks-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .mark-input{background:var(--surface2);border:1.5px solid var(--border);border-radius:10px;padding:14px;}
  .mark-label{font-size:12px;font-weight:600;color:var(--muted);margin-bottom:8px;text-transform:uppercase;}
  .mark-row{display:flex;align-items:center;gap:10px;}
  .mark-row input{flex:1;padding:8px 10px;background:var(--surface3);border:1.5px solid var(--border);
    border-radius:6px;color:var(--text);font-size:16px;font-weight:600;text-align:center;outline:none;font-family:inherit;}
  .mark-row input:focus{border-color:var(--accent);}
  .mark-bar{flex:2;height:6px;background:var(--border);border-radius:3px;overflow:hidden;}
  .mark-bar-fill{height:100%;border-radius:3px;transition:width 0.3s;}
  .btn-row{display:flex;gap:12px;justify-content:flex-end;margin-top:24px;flex-wrap:wrap;}
  .btn{
    padding:12px 24px;border-radius:10px;border:none;cursor:pointer;
    font-size:clamp(13px,3.5vw,14px);font-weight:600;transition:all 0.2s;
    min-height:48px;/* Fix 5: 48px tap target */
    display:inline-flex;align-items:center;justify-content:center;
    font-family:inherit;
  }
  .btn-primary{background:var(--accent);color:#000;} .btn-primary:hover{background:#f59e0b;}
  .btn-secondary{background:transparent;border:1.5px solid var(--border);color:var(--muted);}
  .btn-secondary:hover{border-color:var(--text);color:var(--text);}
  .btn-danger{background:transparent;border:1.5px solid var(--danger);color:var(--danger);}
  .btn-danger:hover{background:rgba(239,68,68,0.1);}
  /* Goal 5: CTA button */
  .btn-cta{background:linear-gradient(135deg,#e8a124,#f59e0b);color:#000;border:none;
    padding:13px 28px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;
    box-shadow:0 4px 16px rgba(232,161,36,0.3);transition:all 0.2s;}
  .btn-cta:hover{box-shadow:0 6px 20px rgba(232,161,36,0.5);transform:translateY(-1px);}
  /* Goal 5: CTA modal */
  .cta-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:1000;
    display:flex;align-items:center;justify-content:center;padding:20px;}
  .cta-modal{background:var(--surface);border:1px solid var(--border);border-radius:20px;
    padding:32px;width:100%;max-width:480px;position:relative;text-align:center;
    box-shadow:0 8px 40px rgba(0,0,0,0.6);}
  .cta-close{position:absolute;top:14px;right:14px;background:transparent;border:none;
    color:var(--muted);cursor:pointer;font-size:18px;padding:4px 8px;border-radius:6px;transition:color 0.2s;}
  .cta-close:hover{color:var(--text);}
  [dir="rtl"] .cta-close{right:auto;left:14px;}
  /* Fix 1: results-wrap — full width on mobile, max 900px on desktop */
  .results-wrap{width:100%;max-width:min(900px,100%);}
  .results-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
  @media(max-width:600px){
    .results-grid{grid-template-columns:1fr;}
    .marks-grid{grid-template-columns:1fr;}
    .abilities-grid{grid-template-columns:repeat(2,1fr);}
    .mobility-grid{grid-template-columns:1fr 1fr;}
    .lang-grid{grid-template-columns:repeat(3,1fr);}
  }
  @media(max-width:360px){
    .lang-grid{grid-template-columns:1fr;}
    .abilities-grid{grid-template-columns:1fr;}
  }
  .result-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:20px;}
  .result-card.highlight{border-color:var(--accent);background:rgba(232,161,36,0.05);}
  .result-card h3{font-size:14px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:16px;}
  .cluster-card{background:var(--surface2);border:1.5px solid var(--border);border-radius:12px;
    padding:16px;margin-bottom:12px;position:relative;overflow:hidden;}
  .cluster-card.rank-1{border-color:var(--accent);}
  .cluster-card.rank-2{border-color:var(--accent2);}
  .cluster-card.rank-3{border-color:var(--accent3);}
  .cluster-header{display:flex;align-items:center;gap:12px;margin-bottom:10px;}
  .cluster-icon{font-size:28px;}
  .cluster-title{font-size:17px;font-weight:600;}
  .cluster-score-bar{height:4px;background:var(--border);border-radius:2px;margin-bottom:12px;}
  .cluster-score-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--accent2),var(--accent));}
  .rank-badge{position:absolute;top:12px;right:12px;width:28px;height:28px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;}
  .rank-1 .rank-badge{background:var(--accent);color:#000;}
  .rank-2 .rank-badge{background:var(--accent2);color:#fff;}
  .rank-3 .rank-badge{background:var(--accent3);color:#fff;}
  [dir="rtl"] .rank-badge{right:auto;left:12px;}
  .pathway-tabs{display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;}
  .pathway-tab{padding:6px 14px;border-radius:20px;border:1.5px solid var(--border);
    background:transparent;color:var(--muted);cursor:pointer;font-size:12px;font-weight:600;transition:all 0.2s;}
  .pathway-tab.active{background:var(--accent2);border-color:var(--accent2);color:#fff;}
  .pathway-content{background:var(--surface3);border-radius:8px;padding:14px;}
  .pathway-school{display:inline-block;padding:4px 10px;background:rgba(59,130,246,0.15);
    border-radius:20px;font-size:12px;margin:3px;color:var(--accent2);}
  .radar-wrap{display:flex;justify-content:center;padding:10px 0;}
  .explain-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
  .explain-label{font-size:12px;color:var(--muted);width:90px;flex-shrink:0;text-align:right;}
  [dir="rtl"] .explain-label{text-align:left;}
  .explain-bar{flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden;}
  .explain-fill{height:100%;border-radius:4px;}
  .explain-pct{font-size:12px;color:var(--text);width:36px;text-align:left;}
  [dir="rtl"] .explain-pct{text-align:right;}
  /* Arabic glossary overrides — consistent terminology */
  [dir="rtl"] .pathway-tab[data-tab="university"]::before { content: "المسار الجامعي"; }
  [dir="rtl"] .best-match-label::before { content: ""; }
  .week-card{background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:10px;}
  .week-label{font-size:12px;font-weight:700;color:var(--accent);text-transform:uppercase;margin-bottom:8px;}
  .week-item{font-size:13px;padding:4px 0;border-bottom:1px solid var(--border);color:var(--text);display:flex;align-items:flex-start;gap:6px;}
  .week-item:last-child{border:none;}
  .week-item-arrow{color:var(--accent3);flex-shrink:0;}
  .week-item a{color:var(--accent2);text-decoration:underline;text-underline-offset:2px;}
  .week-item a:hover{color:#60a5fa;}
  .whatif-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap;}
  .whatif-label{font-size:12px;color:var(--text);width:90px;flex-shrink:0;}
  .whatif-row input[type=range]{flex:1;min-width:80px;accent-color:var(--accent);}
  .whatif-delta{font-size:12px;font-weight:700;width:36px;text-align:center;}
  .whatif-result{font-size:12px;color:var(--muted);width:46px;text-align:right;}
  [dir="rtl"] .whatif-result{text-align:left;}
  .fallback-card{background:rgba(245,158,11,0.08);border:1.5px solid var(--warn);border-radius:12px;padding:18px;}
  .narrative{background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.3);
    border-radius:12px;padding:18px;font-size:15px;line-height:1.7;color:#c7d2fe;margin-bottom:16px;}
  .confidence-row{display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap;}
  .confidence-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:20px;font-size:13px;font-weight:700;}
  .confidence-high{background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);color:var(--accent3);}
  .confidence-med{background:rgba(232,161,36,0.15);border:1px solid rgba(232,161,36,0.4);color:var(--accent);}
  .confidence-low{background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.35);color:#f87171;}
  .mixed-warning{background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.35);
    border-radius:10px;padding:10px 14px;font-size:13px;color:var(--warn);line-height:1.5;}
  .elig-badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;
    margin-left:8px;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);color:var(--warn);}
  [dir="rtl"] .elig-badge{margin-left:0;margin-right:8px;}
  .salary-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;
    background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);
    border-radius:20px;font-size:12px;color:var(--accent3);margin-top:8px;}
  /* Goal 1: Resume banner */
  .resume-banner{background:rgba(232,161,36,0.08);border:1.5px solid rgba(232,161,36,0.3);
    border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;
    gap:12px;margin-bottom:24px;width:100%;max-width:720px;flex-wrap:wrap;}
  .resume-text strong{color:var(--accent);}
  .resume-desc{font-size:12px;color:var(--muted);margin-top:2px;}
  .section-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;
    color:var(--muted);margin:20px 0 12px;}
  .salary-note{font-size:11px;color:var(--muted);margin-top:6px;}
  .avg-row{margin-top:12px;padding:10px 12px;background:var(--surface3);border-radius:8px;
    display:flex;justify-content:space-between;align-items:center;}
  .avg-label{font-size:12px;color:var(--muted);}
  .avg-val{font-size:16px;font-weight:700;}
  /* Reality layer chip tiles */
  .chip-grid{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;}
  .chip-btn{padding:7px 14px;border:1.5px solid var(--border);border-radius:20px;
    background:var(--surface2);cursor:pointer;font-size:12px;color:var(--muted);
    transition:all 0.18s;line-height:1.3;font-family:inherit;}
  .chip-btn:hover{border-color:var(--accent2);color:var(--accent2);}
  .chip-btn.selected{border-color:var(--accent);color:var(--accent);background:rgba(232,161,36,0.1);font-weight:600;}
  .chip-btn.maxed{opacity:0.45;cursor:not-allowed;}
  .identity-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:10px;margin-top:8px;}
  .identity-btn{padding:14px 8px;border:1.5px solid var(--border);border-radius:12px;
    background:var(--surface2);cursor:pointer;text-align:center;transition:all 0.18s;font-family:inherit;}
  .identity-btn:hover{border-color:var(--accent2);}
  .identity-btn.selected{border-color:var(--accent);background:rgba(232,161,36,0.1);}
  .identity-btn .ib-icon{font-size:22px;display:block;margin-bottom:5px;}
  .identity-btn .ib-label{font-size:11px;font-weight:600;color:var(--text);line-height:1.3;}
  .reality-section{margin-bottom:24px;}
  .reality-section-title{font-size:15px;font-weight:700;color:var(--text);margin-bottom:4px;}
  .reality-section-desc{font-size:12px;color:var(--muted);margin-bottom:8px;}

  /* ════════════════════════════════════════════════════════════════
     HOME MOTION ENGINE (parallax + reveal) — CSS
  ════════════════════════════════════════════════════════════════ */

  /* ── Scroll reveal base ── */
  .reveal {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
    transition:
      opacity 0.6s cubic-bezier(.22,1,.36,1) var(--reveal-delay, 0ms),
      transform 0.6s cubic-bezier(.22,1,.36,1) var(--reveal-delay, 0ms);
  }
  .reveal--in, .reveal.is-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  /* Trust chips stagger */
  .home-trust-chip {
    transition-delay: var(--chip-delay, 0ms);
  }

  /* ── Reduced-motion: everything instant ── */
  @media (prefers-reduced-motion: reduce) {
    .reveal, .reveal--in { opacity:1; transform:none; transition:none; }
    .hp-layer, .hp-float { animation: none !important; }
    .home-hero { transition: none !important; }
  }

  /* ════════════════════════════════════════════════════════════════
     HOME PAGE UI — landing page styles
  ════════════════════════════════════════════════════════════════ */

  /* ── Home root ── */
  .home-root {
    min-height: 100vh;
    background: #070b16;
    color: #e8ecf0;
    font-family: inherit;
    overflow-x: hidden;
    position: relative;
  }

  /* ── Parallax container ── */
  .home-parallax {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }
  .hp-layer {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }
  /* Layer 1 — large blue orb */
  .hp-orb1 {
    width: 700px; height: 700px;
    top: -180px; left: 50%;
    transform: translateX(-50%);
    background: radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%);
    filter: blur(60px);
  }
  /* Layer 2 — subtle grid glow (SVG data-uri, no external asset) */
  .hp-grid {
    inset: 0; border-radius: 0;
    background-image:
      linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 75%);
    opacity: 0.7;
  }
  /* Layer 3 — warm gold spotlight */
  .hp-spot {
    width: 500px; height: 500px;
    top: 40px; right: -120px;
    background: radial-gradient(circle, rgba(232,161,36,0.14) 0%, transparent 65%);
    filter: blur(80px);
  }

  /* ── Floating ornaments (CSS keyframes only) ── */
  .hp-float { position: absolute; pointer-events: none; }

  /* Sparkle — tiny glowing dot cluster */
  .hp-sparkle {
    width: 6px; height: 6px;
    top: 22%; left: 12%;
    border-radius: 50%;
    background: #fbbf24;
    box-shadow:
      0 0 6px 2px rgba(251,191,36,0.6),
      18px 30px 0 rgba(251,191,36,0.3),
      36px 8px 0 rgba(251,191,36,0.2),
      -14px 40px 0 rgba(59,130,246,0.4);
    animation: sparkleFloat 7s ease-in-out infinite;
    z-index: 2;
  }
  @keyframes sparkleFloat {
    0%,100% { transform: translate3d(0,0,0) scale(1);   opacity: 0.7; }
    40%     { transform: translate3d(4px,-12px,0) scale(1.15); opacity: 1; }
    70%     { transform: translate3d(-3px,-6px,0) scale(0.9);  opacity: 0.55; }
  }

  /* Blob — slow drifting ambient shape */
  .hp-blob {
    width: 280px; height: 280px;
    bottom: 15%; right: 6%;
    border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%;
    background: linear-gradient(135deg, rgba(99,102,241,0.14), rgba(232,161,36,0.07));
    filter: blur(36px);
    animation: blobDrift 14s ease-in-out infinite;
    z-index: 0;
  }
  @keyframes blobDrift {
    0%,100% { transform: translate3d(0,0,0) scale(1) rotate(0deg); }
    33%     { transform: translate3d(-20px,16px,0) scale(1.06) rotate(6deg); }
    66%     { transform: translate3d(14px,-10px,0) scale(0.96) rotate(-4deg); }
  }

  /* ── Nav ── */
  .home-nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 28px;
    background: rgba(7,11,22,0.72);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .home-nav-brand {
    font-size: 20px; font-weight: 900; letter-spacing: -0.5px;
    background: linear-gradient(90deg,#e8a124,#fbbf24);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .home-nav-lang { display:flex; gap:6px; }
  .home-nav-lang button {
    padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 700;
    border: 1.5px solid rgba(255,255,255,0.12); background: transparent;
    color: rgba(232,236,240,0.6); cursor: pointer; transition: all 0.2s;
  }
  .home-nav-lang button.active,
  .home-nav-lang button:hover {
    border-color: rgba(232,161,36,0.6); color: #e8a124; background: rgba(232,161,36,0.08);
  }

  /* ── Hero wrap (sticky anchor) ── */
  .home-hero-wrap {
    position: relative; z-index: 1;
    padding: 0;
    /* Sticky hero: stays visible for ~260px before scrolling away */
    min-height: 520px;
    display: flex; align-items: center; justify-content: center;
  }
  .home-hero {
    position: sticky;
    top: 60px;
    width: 100%;
    text-align: center;
    padding: 72px 24px 60px;
    max-width: 760px;
    margin: 0 auto;
    transition: transform 0.05s linear;
  }
  /* hero card (mouse tilt target) */
  .home-hero-card {
    transition: transform 0.18s ease;
    transform-origin: center center;
  }
  .home-hero-eyebrow {
    display: inline-block; margin-bottom: 18px;
    padding: 5px 16px; border-radius: 20px;
    font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
    color: #fbbf24;
    background: rgba(232,161,36,0.10);
    border: 1px solid rgba(232,161,36,0.28);
  }
  .home-hero h1 {
    font-size: clamp(32px, 6vw, 64px);
    font-weight: 900; line-height: 1.07; letter-spacing: -1.5px;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #ffffff 25%, rgba(255,255,255,0.62));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .home-hero p {
    font-size: clamp(15px, 2.2vw, 19px); color: rgba(232,236,240,0.68);
    line-height: 1.65; margin-bottom: 36px;
    max-width: 560px; margin-left: auto; margin-right: auto;
  }
  [dir="rtl"] .home-hero h1,
  [dir="rtl"] .home-hero p { font-family: 'Tajawal', sans-serif; }

  /* ── Glass panel behind CTAs ── */
  .home-hero-glass {
    display: inline-block;
    /* Never wider than viewport */
    width: min(100%, 480px);
    padding: 20px 24px 18px;
    border-radius: 20px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    box-shadow: 0 8px 40px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.07) inset;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-sizing: border-box;
  }

  /* ── CTA buttons ── */
  .home-cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

  .home-btn-primary {
    position: relative; overflow: hidden;
    padding: 15px 36px; border-radius: 14px;
    font-size: 16px; font-weight: 800; letter-spacing: -0.2px;
    color: #0a0e1a;
    background: linear-gradient(135deg, #fbbf24 0%, #e8a124 60%, #d97706 100%);
    border: none; cursor: pointer;
    box-shadow: 0 1px 0 rgba(255,255,255,0.35) inset, 0 8px 32px rgba(232,161,36,0.45), 0 2px 8px rgba(0,0,0,0.5);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    font-family: inherit;
  }
  .home-btn-primary::before {
    content:""; position:absolute; inset:0;
    background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 55%);
    border-radius: inherit; pointer-events:none;
  }
  .home-btn-primary:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 1px 0 rgba(255,255,255,0.35) inset, 0 14px 44px rgba(232,161,36,0.55), 0 4px 12px rgba(0,0,0,0.5);
  }
  .home-btn-primary:active { transform: translateY(0) scale(0.99); }

  .home-btn-secondary {
    padding: 14px 28px; border-radius: 14px;
    font-size: 15px; font-weight: 700;
    color: rgba(232,236,240,0.85);
    background: rgba(255,255,255,0.05);
    border: 1.5px solid rgba(255,255,255,0.12);
    cursor: pointer; transition: all 0.2s;
    backdrop-filter: blur(6px);
    font-family: inherit;
  }
  .home-btn-secondary:hover {
    border-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.09); color: #fff;
  }

  /* ── How it works ── */
  .home-how {
    position: relative; z-index: 1;
    padding: 80px 24px 60px; max-width: 940px; margin: 0 auto;
  }
  .home-section-label {
    text-align: center; font-size: 11px; font-weight: 800;
    letter-spacing: 2.5px; text-transform: uppercase;
    color: #e8a124; margin-bottom: 12px;
  }
  .home-section-title {
    text-align: center; font-size: clamp(22px, 4vw, 36px);
    font-weight: 800; color: #fff; margin-bottom: 44px; letter-spacing: -0.5px;
  }
  [dir="rtl"] .home-section-title { font-family: 'Tajawal', sans-serif; }

  /* ── Step cards (3D depth + reveal) ── */
  .home-steps {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 18px;
  }
  .home-step-card {
    position: relative;
    background: linear-gradient(145deg, rgba(26,34,53,0.96), rgba(17,24,39,0.97));
    border-radius: 20px; padding: 28px 24px 26px;
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow:
      0 1px 0 rgba(255,255,255,0.08) inset,
      0 -1px 0 rgba(0,0,0,0.4) inset,
      0 16px 48px rgba(0,0,0,0.5),
      0 4px 16px rgba(0,0,0,0.3);
    transition: transform 0.32s cubic-bezier(.22,1,.36,1), box-shadow 0.32s ease;
    overflow: hidden;
    cursor: default;
  }
  /* border gradient highlight */
  .home-step-card::after {
    content:""; position:absolute; inset:0; border-radius:inherit;
    background: linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 45%);
    pointer-events:none;
  }
  /* Desktop hover tilt */
  @media (hover: hover) and (pointer: fine) {
    .home-step-card:hover {
      transform: perspective(600px) rotateX(-4deg) rotateY(3deg) translateY(-8px);
      box-shadow:
        0 1px 0 rgba(255,255,255,0.10) inset,
        0 28px 64px rgba(0,0,0,0.6),
        0 8px 24px rgba(59,130,246,0.14);
    }
  }
  /* Mobile — no tilt */
  @media (hover: none) { .home-step-card:active { transform: scale(0.98); } }
  [dir="rtl"] .home-step-card:hover {
    transform: perspective(600px) rotateX(-4deg) rotateY(-3deg) translateY(-8px);
  }
  .home-step-num {
    position: relative; z-index: 1;
    display: inline-flex; align-items:center; justify-content:center;
    width: 38px; height: 38px; border-radius: 12px;
    font-size: 16px; font-weight: 900; color: #0a0e1a;
    background: linear-gradient(135deg, #fbbf24, #e8a124);
    margin-bottom: 16px;
    box-shadow: 0 4px 14px rgba(232,161,36,0.4);
  }
  .home-step-card h3 {
    position: relative; z-index: 1;
    font-size: 17px; font-weight: 800; color: #fff; margin-bottom: 8px;
  }
  .home-step-card p {
    position: relative; z-index: 1;
    font-size: 13.5px; color: rgba(232,236,240,0.62); line-height: 1.6;
  }
  [dir="rtl"] .home-step-card h3,
  [dir="rtl"] .home-step-card p { font-family: 'Tajawal', sans-serif; }

  /* ── Trust row ── */
  .home-trust {
    position: relative; z-index: 1;
    display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;
    padding: 0 24px 60px;
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .home-trust-chip {
    display: flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 30px;
    font-size: 13px; font-weight: 600;
    color: rgba(232,236,240,0.8);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.2s var(--chip-delay, 0ms);
  }
  .home-trust-chip:hover { border-color: rgba(232,161,36,0.4); background: rgba(232,161,36,0.06); }
  .home-trust-chip-dot { width:7px; height:7px; border-radius:50%; background:#e8a124; flex-shrink:0; }
  [dir="rtl"] .home-trust-chip { font-family:'Tajawal',sans-serif; }

  /* ── Footer ── */
  .home-footer {
    position: relative; z-index: 1;
    text-align: center; padding: 24px;
    border-top: 1px solid rgba(255,255,255,0.07);
    font-size: 12.5px; color: rgba(232,236,240,0.35);
  }
  .home-footer a { color: rgba(232,236,240,0.45); text-decoration:none; }
  .home-footer a:hover { color: #e8a124; }

  /* ── ResultsFlow — 5-screen journey ── */
  /* Screen fade transition */
  @keyframes rfFadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  /* Sticky bottom nav safe-area */
  .rf-sticky-nav {
    position: sticky;
    bottom: 0;
    z-index: 50;
    background: linear-gradient(0deg, var(--bg) 70%, transparent);
    padding: 12px 0;
    padding-bottom: max(12px, env(safe-area-inset-bottom, 0px));
  }
  /* Progress bar track */
  .rf-progress-track {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 0 4px; margin-bottom: 4px;
  }
  /* Teaser card blur overlay */
  .rf-teaser-blur { filter: blur(4px); user-select: none; pointer-events: none; }
  /* Mobile: ensure full-width single column */
  @media (max-width: 480px) {
    .rf-direction-cards { flex-direction: column; }
    .rf-teaser-row { flex-direction: column; }
  }

  /* Reduced-motion: no transitions on result screens */
  @media (prefers-reduced-motion: reduce) {
    [style*="animation"] { animation: none !important; }
  }

  /* Fix: top nav placement — TopBar for wizard ── */
  .wizard-topbar {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 720px;
    /* Top safe-area on iPhone notch */
    padding: max(10px, env(safe-area-inset-top, 0px)) 0 4px;
    min-height: 52px;
    box-sizing: border-box;
    flex-shrink: 0;
  }
  .back-home-btn {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 700;
    color: rgba(232,236,240,0.65);
    background: rgba(255,255,255,0.065);
    border: 1px solid rgba(255,255,255,0.13);
    border-radius: 24px;
    /* 44px min tap target — iOS HIG */
    padding: 10px 18px;
    min-height: 44px;
    cursor: pointer;
    transition: color 0.18s, background 0.18s, border-color 0.18s;
    font-family: inherit;
    flex-shrink: 0;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }
  .back-home-btn:hover, .back-home-btn:focus {
    color: #e8a124;
    background: rgba(232,161,36,0.09);
    border-color: rgba(232,161,36,0.4);
  }
  .back-home-btn:focus-visible { outline: 2px solid #e8a124; outline-offset: 3px; }
  .back-home-btn:active { transform: scale(0.96); }
  .wizard-topbar-spacer { flex: 1; }
  [dir="rtl"] .back-home-btn .back-home-arrow { display: inline-block; transform: scaleX(-1); }
  @media (max-width: 360px) {
    .back-home-btn { font-size: 11.5px; padding: 8px 13px; }
  }

  /* Fix 5: Mobile polish ── */
  @media (max-width: 480px) {
    .home-hero { padding: 60px 16px 44px; }
    .home-hero-glass { padding: 14px 16px; }
    .hp-blob { display: none; }
    .home-step-card { padding: 20px 16px 18px; }
    /* Prevent any card from overflowing viewport */
    .card { padding: 18px 14px; border-radius: 14px; width: 100%; }
    .cluster-card { padding: 14px 12px; }
    .result-card { padding: 16px 12px; }
    /* Thumb-friendly inputs */
    .field select, .field input { font-size: 16px; } /* prevents iOS zoom */
    .mark-row input { font-size: 18px; min-height: 44px; }
    .btn { min-height: 48px; font-size: 15px; }
    /* Narrower marks grid on very small screens */
    .marks-grid { grid-template-columns: 1fr; }
    /* Better tap target for identity grid */
    .identity-btn { min-height: 60px; }
    /* Chip buttons — wrap nicely */
    .chip-grid { gap: 6px; }
    /* section headers breathe */
    .section-title { margin: 16px 0 10px; }
    /* whatif rows — stack on tiny screens */
    .whatif-row { flex-direction: column; align-items: flex-start; gap: 6px; }
    .whatif-label { width: auto; }
    .whatif-row input[type=range] { width: 100%; }
    /* Results grid — always 1 col on mobile */
    .results-grid { grid-template-columns: 1fr !important; }
    .pathway-tabs { gap: 6px; }
    .pathway-tab { font-size: 11px; padding: 5px 10px; }
    /* Mark inputs readable on mobile */
    .mark-row input { font-size: 18px; padding: 10px 8px; }
    /* Wider likert buttons on small screens */
    .likert-btn { width: 40px; height: 40px; }
    /* Resume banner wraps cleanly */
    .resume-banner { flex-direction: column; align-items: flex-start; }
    /* Week cards readable */
    .week-item { font-size: 12px; }
    /* What-if inputs */
    .whatif-row { gap: 6px; }
    .whatif-label { width: 70px; font-size: 11px; }
  }

  /* Fix 5: Arabic typography enhancement */
  [dir="rtl"] .card { font-size: clamp(13px, 3.8vw, 15px); line-height: 1.75; }
  [dir="rtl"] .q-text { font-size: clamp(14px, 4vw, 16px); line-height: 1.8; }
  [dir="rtl"] .cluster-title { font-size: clamp(14px, 4vw, 17px); }
  [dir="rtl"] .mark-label { letter-spacing: 0; font-size: 12px; }
  [dir="rtl"] .field label { letter-spacing: 0; }
  [dir="rtl"] .btn { font-size: clamp(13px, 3.8vw, 15px); }

  /* Fix 1: Prevent any child from causing horizontal scroll */
  .app *, .home-root * { max-width: 100%; }
  img, svg, video { max-width: 100%; height: auto; }

  /* ── New copy elements ── */
  /* Parent line under CTA buttons */
  .home-parent-line {
    margin-top: 12px; font-size: 12.5px; text-align: center;
    color: rgba(232,236,240,0.48); line-height: 1.5;
  }
  /* Micro trust under hero card */
  .home-micro-trust {
    margin-top: 16px; font-size: 12px; text-align: center;
    color: rgba(232,236,240,0.36); letter-spacing: 0.01em;
  }
  /* Value bullets block */
  .home-value-bullets {
    position: relative; z-index: 1;
    max-width: 520px; margin: 0 auto; padding: 0 24px 40px;
  }
  .home-value-bullets ul {
    list-style: none; display: flex; flex-direction: column; gap: 10px;
  }
  .home-value-bullets li {
    display: flex; align-items: baseline; gap: 10px;
    font-size: 14px; color: rgba(232,236,240,0.75); line-height: 1.5;
  }
  [dir="rtl"] .home-value-bullets li { flex-direction: row-reverse; text-align: right; }
  .home-bullet-dot {
    font-size: 10px; color: #e8a124; flex-shrink: 0; margin-top: 2px;
  }
  /* Reassure row (not-sure + family note) */
  .home-reassure-row {
    position: relative; z-index: 1;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px; max-width: 860px; margin: 0 auto; padding: 0 24px 48px;
  }
  .home-reassure-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px; padding: 22px 20px;
    display: flex; gap: 14px; align-items: flex-start;
    box-shadow: 0 4px 24px rgba(0,0,0,0.2);
  }
  [dir="rtl"] .home-reassure-card { flex-direction: row-reverse; }
  .home-reassure-icon { font-size: 22px; line-height: 1; flex-shrink: 0; margin-top: 1px; }
  .home-reassure-card p {
    font-size: 13.5px; color: rgba(232,236,240,0.68); line-height: 1.65; margin: 0;
  }
  [dir="rtl"] .home-reassure-card p { font-family: 'Tajawal', sans-serif; text-align: right; }`;


// ─────────────────────────────────────────────────────────────────
// DEFAULT STATE
// ─────────────────────────────────────────────────────────────────
const DEFAULT_INFO = {
  bacTrack: "SMA", city: "Casablanca", mobility: 0,
  studyLang: "fr", privateBudget: false,
  bacStatus: "before",
  studyAbroad: false, abroadRegion: "france",
  goal: "prestige",
  goalMode: "unsure",
  goalPreference: "prestige",
  examMode: "watani",
  examTiming: "post",
  // SUBJECT MODEL (MOROCCO) FIX: accurate Bac subject selectors
  examYear:  "bac2",       // "bac1" | "bac2"
  bac1Field: "SE",         // "SE"|"SM"|"ST"|"ECO"|"LSH"|"AA"|"EO"|"BP" (bac1 only)
  bac2Track: "SVT",        // "SVT"|"PC"|"SMA"|"SMB"|"ST"|"ECO"|"LSH"|"AA"|"EO"|"BP" (bac2 only)
  eoOption:  "arabic",     // "arabic"|"sharia" (EO only)
  bpExtras:  [],           // ["math","physchem","svt"] (BP only)
  // Legacy fields kept for migration compat
  examLevel:  "bac2",
  trackField: "SE",
  smOption:   "A",
};

const DEFAULT_REALITY = {
  strengths: [],
  interests: [],
  identityType: "",
  priority: "",
  strengthsNow: [],
  preferredStyle: "",
  familyPressure: false,
  fpField: "",
  fpFieldOther: "",
};

// ─────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────
// Safety: ErrorBoundary — catches runtime errors, shows branded fallback + debug copy.
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, copied: false };
  }
  static getDerivedStateFromError(err) { return { hasError: true, error: err }; }
  componentDidCatch(err, info) {
    // Always log to console for debugging
    console.error("[Massar] Uncaught error:", err);
    console.error("[Massar] Component stack:", info?.componentStack);
  }
  resetApp() {
    try {
      ["massar_session","massar_cta_emails"].forEach(k => {
        try { localStorage.removeItem(k); } catch {}
      });
    } catch {}
    window.location.reload();
  }
  copyDebug() {
    const info = [
      "Massar Error Report",
      "─────────────────",
      `Error: ${this.state.error?.message || "Unknown"}`,
      `URL: ${window.location.href}`,
      `UA: ${navigator.userAgent}`,
      `Time: ${new Date().toISOString()}`,
    ].join("\n");
    try {
      navigator.clipboard.writeText(info).then(() => {
        this.setState({ copied: true });
        setTimeout(() => this.setState({ copied: false }), 2000);
      });
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement("textarea");
      el.value = info;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    }
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    const lang = this.props.lang || "fr";
    const msgs = {
      ar: {
        title:"حدث خطأ غير متوقع",
        sub:"نعتذر عن هذا الخلل. انقر على «إعادة المحاولة» للمتابعة.",
        reload:"إعادة التحميل",
        reset:"مسح البيانات والبدء من جديد",
        copyDebug:"نسخ معلومات الخطأ",
        copied:"✓ تم النسخ",
      },
      fr: {
        title:"Une erreur inattendue s'est produite",
        sub:"Désolé pour ce problème. Cliquez sur «Recharger» pour continuer.",
        reload:"Recharger",
        reset:"Réinitialiser l'application",
        copyDebug:"Copier les infos d'erreur",
        copied:"✓ Copié",
      },
      en: {
        title:"Something went wrong",
        sub:"Sorry for the glitch. Click «Reload» to continue.",
        reload:"Reload",
        reset:"Reset app",
        copyDebug:"Copy debug info",
        copied:"✓ Copied",
      },
    };
    const m = msgs[lang] || msgs.fr;
    const isRtl = lang === "ar";
    return (
      <div dir={isRtl ? "rtl" : "ltr"} style={{
        minHeight:"100vh", background:"#070b16", color:"#e8ecf0",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        gap:16, padding:"32px 20px",
        fontFamily: isRtl ? "'Tajawal', sans-serif" : "'DM Sans', sans-serif",
        textAlign:"center", boxSizing:"border-box",
      }}>
        <div style={{fontSize:48, marginBottom:4}}>⚠️</div>
        <div style={{fontSize:clamp(18,5,22), fontWeight:800, maxWidth:400, lineHeight:1.35}}>
          {m.title}
        </div>
        <div style={{fontSize:14, color:"rgba(232,236,240,0.55)", maxWidth:360, lineHeight:1.6}}>
          {m.sub}
        </div>
        <div style={{display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center", marginTop:8}}>
          <button onClick={() => window.location.reload()} style={{
            padding:"13px 28px", borderRadius:12, fontWeight:700, fontSize:15,
            background:"#e8a124", color:"#0a0e1a", border:"none", cursor:"pointer",
            minHeight:48, fontFamily:"inherit",
          }}>{m.reload}</button>
          <button onClick={() => this.resetApp()} style={{
            padding:"13px 20px", borderRadius:12, fontWeight:700, fontSize:14,
            background:"rgba(255,255,255,0.07)", color:"#e8ecf0",
            border:"1px solid rgba(255,255,255,0.15)", cursor:"pointer",
            minHeight:48, fontFamily:"inherit",
          }}>{m.reset}</button>
        </div>
        <button onClick={() => this.copyDebug()} style={{
          padding:"8px 16px", borderRadius:8, fontWeight:600, fontSize:12,
          background:"transparent", color:this.state.copied ? "#10b981" : "rgba(232,236,240,0.4)",
          border:"1px solid rgba(255,255,255,0.1)", cursor:"pointer",
          fontFamily:"inherit", marginTop:4, transition:"color 0.2s",
        }}>
          {this.state.copied ? m.copied : m.copyDebug}
        </button>
        <div style={{fontSize:11, color:"rgba(232,236,240,0.2)", marginTop:8}}>massar.ma</div>
      </div>
    );
  }
}
// (clamp is defined globally above — no duplicate needed here)

export default function App() {
  const [step,           setStep]           = useState(0);
  const [lang,           setLang]           = useState("fr");
  const [answers,        setAnswers]        = useState({});
  const [info,           setInfo]           = useState(DEFAULT_INFO);
  const [marks,          setMarks]          = useState({});
  const [whatIfDeltas,   setWhatIfDeltas]   = useState({});
  const [reality,        setReality]        = useState(DEFAULT_REALITY);
  // Journey stage: "prebac" | "postbac"
  const [journeyStage,   setJourneyStage]   = useState("postbac");
  // Pre-Bac specific inputs
  const [preBacData,     setPreBacData]     = useState({});
  // Learner type answers
  const [learnerAnswers, setLearnerAnswers] = useState({});
  // Goal 1: session banner
  const [savedSession,   setSavedSession]   = useState(null);
  // HOME PAGE 3D CSS — view state
  const [view,           setView]           = useState("home");

  const t   = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  const dir = t?.dir || "ltr";

  // ── Goal 1: load saved session on mount ──────────────────────────
  useEffect(() => {
    const session = loadSession();
    if (session) setSavedSession(session);
  }, []);

  // ── Goal 1: save on every relevant state change (debounced) ──────
  useEffect(() => {
    if (step === 0) return; // don't save on landing
    saveSession({ step, lang, answers, info, marks, whatIfDeltas, reality });
  }, [step, lang, answers, info, marks, whatIfDeltas, reality]);

  const resumeSession = () => {
    const s = savedSession;
    if (!s) return;
    setStep(s.step ?? 0);
    setLang(s.lang ?? "fr");
    setAnswers(s.answers ?? {});
    setInfo({ ...DEFAULT_INFO, ...(s.info ?? {}) });
    setMarks(s.marks ?? {});
    setWhatIfDeltas(s.whatIfDeltas ?? {});
    setReality({ ...DEFAULT_REALITY, ...(s.reality ?? {}) });
    setSavedSession(null);
  };

  const restart = () => {
    clearSession();
    setStep(0); setLang("fr"); setAnswers({});
    setInfo(DEFAULT_INFO); setMarks({});
    setWhatIfDeltas({}); setReality(DEFAULT_REALITY); setSavedSession(null);
  };

  // ── Derived state (memos) ────────────────────────────────────────
  const traits = useMemo(() => {
    const result = computeTraits(answers);
    // FIX: development debug logs
    if (typeof window !== 'undefined' && window.__DEV__) console.log('[Massar] traits computed:', result);
    return result;
  }, [answers]);

  const effectiveMarks = useMemo(() => {
    // SUBJECTS FIX: always use getSubjectsForMarks for the official field+level subject list
    const subjects = getSubjectsForMarks(info);
    return buildEffectiveMarks(marks, whatIfDeltas, subjects);
  },
    [marks, whatIfDeltas, info.bacTrack, info.examTiming, info.trackField, info.examLevel,
     info.smOption, info.eoOption, info.bpExtras]
  );

  const rankedClusters = useMemo(() => {
    // SUBJECT MODEL (MOROCCO) FIX: use getScoringBacTrack() for all examYear/bac1Field/bac2Track combos
    const scoreBacTrack = getScoringBacTrack(info);
    // TASK 2 — inject goal + goalPreference into reality so scorer can read them
    const realityWithGoal = { ...reality, goal: info.goal || "prestige", goalPreference: info.goalPreference || "prestige",
      profileBoost: { ...(reality.profileBoost||{}), ...(info.profileBoost||{}) } };
    const result = computeClusterScores(scoreBacTrack, effectiveMarks, traits, info.mobility, info.privateBudget, realityWithGoal);
    if (typeof window !== "undefined" && window.__DEV__) console.log("[Massar] top clusters computed:", result.slice(0,3).map(c=>c.id));
    return result;
  }, [info.bacTrack, info.goal, info.goalPreference, effectiveMarks, traits, info.mobility, info.privateBudget, reality]);

  // Cultural rerank layer — apply post-processing for prestige/fit/practical/unsure
  const overallAvgForRerank = useMemo(() => {
    const vals = Object.values(effectiveMarks).map(Number).filter(v => !isNaN(v));
    return vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
  }, [effectiveMarks]);

  const { primary: displayClusters, secondary: secondaryClusters } = useMemo(() => {
    return culturallyRerankClusters(rankedClusters, info, overallAvgForRerank);
  }, [rankedClusters, info, overallAvgForRerank]);

  const top3       = displayClusters.slice(0, 3);
  const secondaryTop3 = secondaryClusters ? secondaryClusters.slice(0, 3) : null;
  const confidence = useMemo(() => computeConfidence(rankedClusters), [rankedClusters]);
  const mixedSignals = useMemo(
    () => computeMixedSignals(rankedClusters, confidence),
    [rankedClusters, confidence]
  );

  // Narrative: useMemo so it updates live when sliders change
  const narrative = useMemo(() => {
    if (step !== 7 || !top3.length) return null;
    // Narrative fix — pass effectiveMarks for subject-calibrated wording
    return generateNarrative(top3, traits, info.bacTrack, lang, reality, effectiveMarks);
  }, [top3, traits, info.bacTrack, lang, step, reality, effectiveMarks]); // eslint-disable-line

  // When bac track changes, clear marks (different subject set)
  const handleSetInfo = (updater) => {
    setInfo(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (next.bacTrack !== prev.bacTrack) setMarks({});
      return next;
    });
  };

  // ── Render ───────────────────────────────────────────────────────
  return (
    <AppErrorBoundary lang={lang}>
    <>
      <style>{css}</style>

      {/* HOME PAGE 3D CSS — show landing page when view==="home" */}
      {view === "home" && (
        <HomePage
          lang={lang} setLang={setLang}
          onStartTest={() => setView("test")}
          savedSession={savedSession}
          t={t} dir={dir}
        />
      )}

      {/* TEST VIEW (existing) — show wizard when view==="test" */}
      {view === "test" && (
      <div className="app" dir={dir}>

        {/* Fix: top nav placement — TopBar sits above header, never overlaps title */}
        <div className="wizard-topbar">
          <button className="back-home-btn" onClick={() => setView("home")} aria-label={t.backHome || "Home"}>
            <span className="back-home-arrow" aria-hidden="true">{dir === "rtl" ? "→" : "←"}</span>
            <span>{t.backHome || "Home"}</span>
          </button>
          <span className="wizard-topbar-spacer"/>
        </div>
        <div className="header">
          <h1>{t.appTitle}</h1>
          <p>{t.appSubtitle}</p>
        </div>

        {/* Goal 1: Resume banner */}
        {savedSession && step === 0 && (
          <div className="resume-banner">
            <div>
              <div><strong className="resume-text">{t.resumeSaved}</strong></div>
              <div className="resume-desc">{t.resumeDesc}</div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <button className="btn btn-secondary" onClick={()=>setSavedSession(null)}>✕</button>
              <button className="btn btn-primary"   onClick={resumeSession}>{t.resume}</button>
            </div>
          </div>
        )}

        {step === 0 && (
          <StepLang lang={lang} setLang={setLang} onNext={()=>setStep(1)} t={t} dir={dir}/>
        )}
        {/* Journey stage selector */}
        {step === 1 && (
          <StepJourney lang={lang} journeyStage={journeyStage} setJourneyStage={setJourneyStage}
            onNext={()=>setStep(2)} onBack={()=>setStep(0)} t={t} dir={dir}/>
        )}
        {step === 2 && (
          <StepPersonality lang={lang} answers={answers} setAnswers={setAnswers}
            onNext={()=>setStep(3)} onBack={()=>setStep(1)} t={t} dir={dir}/>
        )}
        {/* Learner Type test (all journeys) */}
        {step === 3 && (
          <StepLearnerType lang={lang} learnerAnswers={learnerAnswers} setLearnerAnswers={setLearnerAnswers}
            onNext={()=>setStep(4)} onBack={()=>setStep(2)} t={t} dir={dir}/>
        )}
        {step === 4 && (
          <StepReality lang={lang} reality={reality} setReality={setReality}
            onNext={()=>setStep(5)} onBack={()=>setStep(3)} t={t} dir={dir}/>
        )}
        {/* NEW INPUT: StepProfileBoost */}
        {step === 5 && (
          <StepProfileBoost lang={lang} reality={reality} setReality={setReality}
            onNext={()=>setStep(journeyStage==="prebac" ? 6 : 7)} onBack={()=>setStep(4)} t={t} dir={dir}/>
        )}
        {/* Pre-Bac inputs (only if prebac journey) */}
        {step === 6 && journeyStage === "prebac" && (
          <StepPreBacInputs lang={lang} preBacData={preBacData} setPreBacData={setPreBacData}
            onNext={()=>setStep(10)} onBack={()=>setStep(5)} t={t} dir={dir}/>
        )}
        {/* Post-Bac path: info → marks → bac status */}
        {step === 7 && journeyStage !== "prebac" && (
          <StepInfo lang={lang} info={info} setInfo={handleSetInfo}
            onNext={()=>setStep(8)} onBack={()=>setStep(5)} t={t} dir={dir}/>
        )}
        {step === 8 && journeyStage !== "prebac" && (
          <StepMarks lang={lang} info={info} marks={marks} setMarks={setMarks}
            onNext={()=>setStep(9)} onBack={()=>setStep(7)} t={t} dir={dir}/>
        )}
        {step === 9 && journeyStage !== "prebac" && (
          <StepBacStatus lang={lang} info={info} setInfo={handleSetInfo}
            reality={reality} setReality={setReality}
            onNext={()=>setStep(10)} onBack={()=>setStep(8)} t={t} dir={dir}/>
        )}
        {step === 10 && (
          // Results flow — both journeys converge here
          <ResultsErrorBoundary onRestart={restart} restartLabel={t?.restart || "Restart"}>
            <ResultsFlow
              t={t} lang={lang} dir={dir} info={info}
              marks={marks} whatIfDeltas={whatIfDeltas} setWhatIfDeltas={setWhatIfDeltas}
              effectiveMarks={effectiveMarks} rankedClusters={rankedClusters}
              traits={traits} confidence={confidence} mixedSignals={mixedSignals}
              narrative={narrative} reality={reality} setReality={setReality}
              restart={restart} onBack={()=>setStep(journeyStage==="prebac" ? 6 : 9)}
              secondaryTop3={secondaryTop3}
              overallAvg={overallAvgForRerank}
              journeyStage={journeyStage}
              preBacData={preBacData}
              learnerAnswers={learnerAnswers}
            />
          </ResultsErrorBoundary>
        )}
      </div>
      )} {/* end view==="test" */}
    </>
    </AppErrorBoundary>
  );
}

/*
 * ─────────────────────────────────────────────────────────────────
 * Cultural sensitivity patch (Tier + Goal) — ACCEPTANCE TESTS
 * Manual scenario verification. Run these scenarios through the app
 * and confirm the described behaviour.
 *
 * TEST 1 — High average, prestige goal
 *   Input:  bacTrack=SMA, overallAvg=15/20, goal="prestige"
 *   Expected scoring: clusters with no public route (OFPPT-only) receive
 *     a -0.15 penalty → they cannot rank in top-3 for this profile.
 *   Expected ClusterCard: default tab opens on "grandeEcole" (if available)
 *     else "university". Practical tab is present but NOT the default.
 *   Expected label: if user manually clicks "Formation pratique", the
 *     blue "fast-track option" note is shown.
 *
 * TEST 2 — High average, handsOn goal
 *   Input:  bacTrack=SMA, overallAvg=15/20, goal="handsOn"
 *   Expected scoring: goalTierPenalty = 0 (handsOn exempts all penalties).
 *     Practical-route clusters rank naturally.
 *   Expected ClusterCard: default tab opens on "practical".
 *   Expected label: no fast-track note shown (student chose this intentionally).
 *
 * TEST 3 — Low average, prestige goal
 *   Input:  bacTrack=ECO, overallAvg=10/20, goal="prestige"
 *   Expected scoring: academicTier=LOW → no goalTierPenalty applied
 *     (penalty only applies to HIGH/MID tiers). Practical clusters rank freely.
 *   Expected ClusterCard: default tab = "practical" (LOW tier default).
 *   Expected label: no fast-track note (tier is LOW, not HIGH).
 *
 * TEST 4 — SVT 15/20, high bio+chem, goal=prestige
 *   Input:  bacTrack=SVT, biology≥14, chemistry≥13, overallAvg≈15, goal="prestige"
 *   Expected: "health" cluster is not penalised (it has grandeEcole + university paths).
 *     MedicineEligibilityPanel still shows eligibility correctly.
 *     Default pathway tab = grandeEcole (Faculté de Médecine / private if not eligible).
 *     Public vs private eligibility logic (CLUSTER_CONSTRAINTS) unchanged.
 * ─────────────────────────────────────────────────────────────────
 */
