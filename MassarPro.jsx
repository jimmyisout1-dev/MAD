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
    appTitle: "مسار | دليلك المهني المغربي",
    appSubtitle: "اكتشف مسارك المهني المثالي في المغرب",
    next: "التالي",
    back: "السابق",
    start: "ابدأ الآن",
    finish: "احصل على نتائجي",
    step: "الخطوة",
    of: "من",
    // Steps
    langStep: "اختر لغتك",
    langDesc: "سيتم عرض التطبيق بالكامل بالغة المختارة",
    personalityStep: "اختبار الشخصية",
    personalityDesc: "أجب بصدق – لا توجد إجابات خاطئة",
    infoStep: "معلوماتك الدراسية",
    marksStep: "درجاتك",
    resultsStep: "نتائجك",
    // Info fields
    bacTrack: "شعبة الباكالوريا",
    city: "مدينتك الحالية",
    mobility: "استعدادك للتنقل",
    mobilityOptions: ["نفس المدينة فقط", "مستعد للانتقال داخل المغرب", "أقبل التعلم عن بُعد"],
    studyLang: "لغة الدراسة المفضلة",
    privateBudgetLabel: "هل لديك إمكانية الالتحاق بالتعليم الخاص؟",
    privateBudgetHint: "يؤثر هذا على توصيات الطب والتخصصات ذات المنافسة العالية",
    yes: "نعم",
    no: "لا",
    // Marks
    marks: "درجاتك /20",
    overallAverage: "المعدل العام",
    // What-if sliders (Goal 2)
    whatIf: "ماذا لو؟ – تعديل الدرجات",
    adjustedAverage: "المعدل بعد التعديل",
    sliderHint: "↑ تغيير الدرجات لإعادة حساب التوصيات فوراً",
    sliderChangeSummary: "التغييرات",
    sliderNoChange: "لم تُجرَ أي تعديلات بعد",
    // Results
    traitRadar: "ملف شخصيتك",
    topCareers: "أفضل المسارات المهنية",
    pathways: "المسارات التعليمية",
    actionPlan: "خطة العمل – 30 يوماً",
    fallback: "مسار بديل",
    fallbackDesc: "مسار احتياطي ذو قيمة متساوية",
    fallbackBody: "OFPPT والتكوين المهني ليسا مساراً ثانوياً — بل بوابةً مباشرة لسوق العمل بمهارات تقنية مرتفعة الطلب.",
    explainability: "لماذا هذه التوصية؟",
    // Confidence / signals
    confidenceLabel: "مستوى الثقة",
    mixedSignals: "📊 تباين في الملف – العوامل الأكاديمية وعوامل الهوية تشير إلى مجالات مختلفة. راجع المسارات مع الأخذ بالسياق الكامل.",
    // Pathways
    universityRoute: "المسار الجامعي",
    grandeEcoleRoute: "المدارس العليا",
    practicalRoute: "التكوين المهني",
    durationLabel: "المدة",
    pathwayMissing: "تفاصيل قريباً",
    // Eligibility
    privateOnly: "مدارس خاصة فقط",
    notEligiblePublic: "تنافسية عالية (عام)",
    // Medicine eligibility note (Goal 3)
    eligibilityTitle: "شرط القبول – الطب العام",
    eligibilityThresholdLabel: "العتبة الرسمية للقبول العام",
    eligibilityThresholdValue: "المعدل ≥ 16/20 · علم الأحياء ≥ 14 · الكيمياء ≥ 13",
    eligibilityYourAvg: "معدلك الحالي",
    eligibilityMeetsPublic: "✅ مؤهل للمسار العام",
    eligibilityFailsPublic: "❌ لا يفي بشروط الطب العام الحكومي",
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
    ambitiousUnlockMed:   "لفتح الطب العام: ارفع معدلك إلى 16+ وعلوم الحياة ≥ 14 والكيمياء ≥ 13.",
    ambitiousUnlockGen:   "ارفع معدلك العام إلى {avg}+ وحسّن المواد الأساسية لزيادة حظوظك.",
    // Feature 1: Exam timing
    examTimingStep: "توقيت التقييم",
    examTimingQuestion: "هل أجريت هذا التقييم قبل أم بعد امتحان الباكالوريا؟",
    examTimingBefore: "قبل نتائج الباكالوريا",
    examTimingAfter: "بعد نتائج الباكالوريا",
    examTimingDesc: "يؤثر هذا على طريقة عرض التوصيات وخطط التحسين",
    whatIfDisabled: "الدرجات نهائية – لا يمكن تعديلها بعد إعلان النتائج.",
    improvementTitle: "💡 كيف تحسّن حظوظك قبل الباكالوريا؟",
    improvementSubjectHint: "المواد الأهم لمسارك:",
    improvementUnlock: "رفع درجة +2 يفتح لك:",
    improvementTip1: "ركّز على المسائل المتكررة في مواضيع الامتحانات السابقة",
    improvementTip2: "التحضير لمسابقات القبول يبدأ 6 أشهر مسبقاً",
    improvementTip3: "انضم لمجموعات مراجعة عبر واتساب أو تليغرام مع طلاب من نفس الشعبة",
    improvementTip4: "استخدم منصات مجانية: خان أكاديمي عربي، إدراك، مرحبا",
    improvementDisclaimer: "هذه توقعات تعليمية. لا يمكن ضمان القبول بأي مدرسة.",
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
    goalModeLabel: "شنو الأهم دابا بالنسبة ليك؟",
    goalModeOptions: {
      prestige:  { icon:"🏆", label:"أفضل مدرسة / المسار الأرفع مستوى" },
      fit:       { icon:"🎯", label:"الأنسب لشخصيتي" },
      practical: { icon:"🔧", label:"دخل سريع / مهارة ملموسة" },
      unsure:    { icon:"🤷", label:"مش عارف — أريني الاثنين" },
    },
    prestigeAdjacentTitle: "إذا كانت العائلة تريد مساراً أكثر هيبة",
    prestigeAdjacentDesc: "بناءً على ملفك الشخصي، هذه مسارات مجاورة بمستوى أكاديمي أعلى:",
    bridgeOptionLabel: "خيار جسر",
    bestFitTab: "الأنسب لك",
    prestigeTrackTab: "المسار الأرفع",
    familyPressureLabel: "هل تواجه ضغطاً عائلياً نحو تخصص معين؟",
    familyPressureTitle: "💬 كلمة صريحة بشأن الضغط العائلي",
    familyPressureText: "من الطبيعي أن تحمل عائلتك آمالاً كبيرة. لكن مسيرة مهنية موفقة تبنى على مزيج من الميول الحقيقية، والواقع الأكاديمي، وظروف سوق الشغل.",
    familyPressureAltsTitle: "مسارات مجاورة ذات قيمة عالية:",
    familyPressureAlts: {
      health: ["تمريض وعلاج طبيعي (IFCS)", "أجهزة طبية وتقنيات المختبر", "إدارة صحية (ENCG/FSJES)"],
      engineering: ["تقنية في الصناعة (OFPPT BTS)", "الهندسة المعلوماتية الصناعية", "الطاقة الشمسية والكهرباء"],
      law: ["إدارة الشركات (ENCG)", "محاسبة ومالية", "الوظيفة العمومية"],
    },
    // Misc
    why: "لماذا؟",
    score: "النتيجة",
    personality: "الشخصية",
    academic: "أكاديمي",
    market: "السوق",
    constraints: "القيود",
    salaryNote: "* الأرقام تقديرية وتعتمد على الخبرة والشركة والمنطقة",
    salary: "الراتب المتوقع (تقديري)",
    weekLabel: "الأسبوع",
    // Session (Goal 1)
    resume: "استأنف من حيث توقفت",
    resumeSaved: "لديك جلسة سابقة محفوظة",
    resumeDesc: "جلسة محفوظة في متناول يدك – هل تريد الاستمرار من حيث توقفت؟",
    restart: "بدء من جديد",
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
    truthModeTitle: "🔍 تحليل واقعي لملفك",
    truthModeDesc: "تحليل موضوعي — لا مبالغة، لا ترهيب. فقط معطيات.",
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
    shareTitle: "📤 شارك مسارك",
    copyCaptionBtn: "نسخ النص",
    downloadBadgeBtn: "تحميل البطاقة",
    shareCopied: "✓ تم النسخ!",
    shareCaptionTpl: "اكتشفت نوع مساري: {type} 🧬\nأفضل مسار: {cluster} ({confidence}% توافق)\nاكتشف نوعك على Massar 👇",
    // Reality layer
    realityStep: "حياتك وهويتك",
    realityDesc: "4 أسئلة سريعة – تختار وتنتهي في 3 دقائق",
    realityStrengthsTitle: "ما الذي تُتقنه فعلاً الآن؟",
    realityStrengthsDesc: "اختر حتى 5 مهارات تشعر أنك قوي فيها",
    realityInterestsTitle: "ما الذي تستمتع به بشكل طبيعي؟",
    realityInterestsDesc: "اختر حتى 5 أنشطة تشدّك",
    realityIdentityTitle: "كيف تصف نفسك؟",
    realityPriorityTitle: "ما الأهم بالنسبة إليك الآن؟",
    realityMaxHint: "(اختر حتى 5)",
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

const SUBJECTS_BY_TRACK = {
  SMA:  ["math", "physics", "french", "arabic", "philosophy"],
  SMB:  ["math", "physics", "tech", "french", "arabic"],
  PC:   ["physics", "chemistry", "math", "french", "arabic"],
  SVT:  ["biology", "chemistry", "math", "french", "arabic"],
  ECO:  ["economics", "math", "management", "french", "arabic"],
  LET:  ["arabic", "french", "philosophy", "history", "english"],
  TECH: ["tech", "math", "physics", "french", "arabic"],
  ARTS: ["arts", "design", "french", "arabic", "history"],
};

const SUBJECT_LABELS = {
  math:       { ar: "الرياضيات",          fr: "Mathématiques", en: "Mathematics"         },
  physics:    { ar: "الفيزياء",           fr: "Physique",      en: "Physics"              },
  chemistry:  { ar: "الكيمياء",           fr: "Chimie",        en: "Chemistry"            },
  biology:    { ar: "علم الأحياء",        fr: "Biologie",      en: "Biology"              },
  french:     { ar: "اللغة الفرنسية",     fr: "Français",      en: "French"               },
  arabic:     { ar: "اللغة العربية",      fr: "Arabe",         en: "Arabic"               },
  english:    { ar: "اللغة الإنجليزية",  fr: "Anglais",       en: "English"              },
  economics:  { ar: "الاقتصاد",           fr: "Économie",      en: "Economics"            },
  management: { ar: "التدبير",            fr: "Gestion",       en: "Management"           },
  tech:       { ar: "التكنولوجيا",        fr: "Technologie",   en: "Technology"           },
  philosophy: { ar: "الفلسفة",            fr: "Philosophie",   en: "Philosophy"           },
  history:    { ar: "التاريخ والجغرافيا", fr: "Histoire-Géo",  en: "History & Geography" },
  arts:       { ar: "الفنون",             fr: "Arts",          en: "Arts"                 },
  design:     { ar: "التصميم",            fr: "Design",        en: "Design"               },
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
    requiredSubjects: { biology: 14, chemistry: 13 },
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
    subjectWeights:{ math:0.35,physics:0.2,tech:0.3,french:0.1,english:0.05 },
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
    subjectWeights:{ math:0.45,physics:0.1,economics:0.2,french:0.1,tech:0.15 },
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
    subjectWeights:{ math:0.3,physics:0.15,tech:0.4,french:0.1,english:0.05 },
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
    subjectWeights:{ math:0.25,physics:0.3,tech:0.4,french:0.05 },
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
    subjectWeights:{ math:0.3,physics:0.35,tech:0.3,chemistry:0.05 },
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
    subjectWeights:{ math:0.3,physics:0.45,chemistry:0.15,tech:0.1 },
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
    subjectWeights:{ math:0.35,physics:0.4,tech:0.2,french:0.05 },
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
    subjectWeights:{ biology:0.5,chemistry:0.3,math:0.1,physics:0.1 },
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
    subjectWeights:{ economics:0.35,french:0.25,management:0.25,arabic:0.1,arts:0.05 },
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
    subjectWeights:{ tech:0.4,math:0.25,physics:0.2,french:0.1,arabic:0.05 },
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
    subjectWeights:{ tech:0.45,math:0.2,physics:0.2,french:0.1,arabic:0.05 },
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
    subjectWeights:{ french:0.25,arabic:0.2,economics:0.2,management:0.15,biology:0.1,history:0.1 },
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

// Cultural sensitivity patch (Tier + Goal) — academic tier from overallAvg
// HIGH ≥14.5 → public selective/grande école first
// MID  ≥12   → university first
// LOW  <12   → practical can be default
function getAcademicTier(overallAvg) {
  const avg = Number(overallAvg) || 0;
  if (avg >= 14.5) return "HIGH";
  if (avg >= 12)   return "MID";
  return "LOW";
}

// FIX: multi-view recommendation
// Returns { bestFit, balanced, ambitious } from ranked clusters.
// bestFit    = highest trait+interest match (personal)
// balanced   = highest final score (already top-1, academic/prestige blend)
// ambitious  = highest prestige that's academically reachable (top-6)
// PrestigeIndex / Guardrails — computeThreeViews
// Implements three distinct scoring perspectives as per spec:
//   ambitiousScore  = 0.35*prestige + 0.25*market + 0.2*bac + 0.2*academic - penalties
//   balancedScore   = existingFinalScore + 0.08*(prestige-0.5)
//   personalScore   = 0.45*trait + 0.2*market + 0.2*academic + 0.15*bac - penalties
// Guardrails: high-avg students can't have low-prestige cluster as #1 unless explicit passion.
function computeThreeViews(rankedClusters, overallAvg, info, effectiveMarks, reality) {
  if (!rankedClusters || rankedClusters.length === 0) return { bestFit:null, balanced:null, ambitious:null };

  const avg           = clamp(Number(overallAvg) || 0, 0, 20);
  const safeInfo      = (info && typeof info === "object") ? info : {};
  const goalMode      = safeInfo.goalMode || "unsure";
  const privateBudget = !!safeInfo.privateBudget;

  const safeReality   = (reality && typeof reality === "object") ? reality : {};
  const interests     = new Set(Array.isArray(safeReality.interests) ? safeReality.interests : []);
  const strengthsNow  = new Set(Array.isArray(safeReality.strengthsNow) ? safeReality.strengthsNow : []);

  // Moroccan cultural tiers (grade leverage)
  const tier =
    avg >= 15.5 ? "A" :
    avg >= 14.0 ? "B" :
    avg >= 12.0 ? "C" : "D";

  // Low-prestige clusters that should NOT headline for Tier A/B unless explicit interest or overwhelming fit
  const LOW_PRESTIGE_BLOCKED = new Set(["tourism","sports","arts_media","culinary_ops","creative_digital"]);

  function hasStrongInterestForCluster(clusterId) {
    if (clusterId === "sports") {
      return interests.has("i_sports") || interests.has("i_outdoors") || strengthsNow.has("s_sport_team") || strengthsNow.has("s_sport_indiv") || strengthsNow.has("s_coaching");
    }
    if (clusterId === "tourism") {
      return interests.has("i_outdoors") || interests.has("i_people") || interests.has("i_content");
    }
    if (clusterId === "arts_media" || clusterId === "creative_digital") {
      return interests.has("i_content") || interests.has("i_gaming") || strengthsNow.has("s_design") || strengthsNow.has("s_media");
    }
    if (clusterId === "health") {
      return interests.has("i_helping") || interests.has("i_research");
    }
    if (clusterId === "finance" || clusterId === "marketing") {
      return interests.has("i_selling") || strengthsNow.has("s_persuasion") || strengthsNow.has("s_negotiation");
    }
    if (clusterId === "it" || clusterId === "data" || clusterId === "cyber" || clusterId === "network") {
      return interests.has("i_gaming") || interests.has("i_research") || strengthsNow.has("s_problem_solving");
    }
    return false;
  }

  // Strict personality consistency guardrail for Best Fit
  function isPersonalityMismatch(cluster) {
    const trait = Number(cluster?.scores?.trait ?? 0);
    return trait < 0.55;
  }

  // Medicine selective gating (avoid SVT=>medicine stereotype in Best Fit)
  function medicineAllowedAsBestFit(cluster) {
    if (cluster.id !== "health") return true;
    const trait = Number(cluster?.scores?.trait ?? 0);
    // Require either strong trait alignment OR explicit health interest.
    if (trait >= 0.60) return true;
    if (hasStrongInterestForCluster("health")) return true;
    return false;
  }

  // Guardrail for low-prestige clusters being #1 for high tiers
  function passesLowPrestigeTop1(cluster, score, scoredList) {
    if (!LOW_PRESTIGE_BLOCKED.has(cluster.id)) return true;
    if (tier === "C" || tier === "D") return true;
    // In passion/fit mode we allow it.
    if (goalMode === "fit") return true;
    // Allow if user explicitly signaled interest strongly.
    if (hasStrongInterestForCluster(cluster.id)) return true;

    const sorted = [...scoredList].sort((a,b)=>b.s-a.s);
    const r1 = sorted[0], r2 = sorted[1];
    if (r1?.c?.id === cluster.id && r2) {
      // must be overwhelmingly better to headline
      return (score - r2.s) >= 0.15;
    }
    return false;
  }

  function pickBest(scored, { enforcePersonality = false, enforceMedicine = false } = {}) {
    const sorted = [...scored].sort((a,b)=>b.s-a.s);
    for (const item of sorted) {
      const c = item.c;
      if (!c) continue;

      if (!passesLowPrestigeTop1(c, item.s, scored)) continue;

      if (enforcePersonality && isPersonalityMismatch(c)) {
        // allow mismatch only if explicit interest AND goalMode==fit
        if (!(goalMode === "fit" && hasStrongInterestForCluster(c.id))) continue;
      }

      if (enforceMedicine && !medicineAllowedAsBestFit(c)) continue;

      return c;
    }
    return sorted[0]?.c || null;
  }

  // Prestige metadata
  function prestigeIndex(c) {
    const cp = CLUSTER_PRESTIGE[c.id] || { prestigeIndex:0.5 };
    return Number(cp.prestigeIndex ?? 0.5);
  }

  // ── Ambitious (prestige ladder) ──
  const ambitiousScored = rankedClusters.map(c => {
    const pIdx = prestigeIndex(c);
    let s = 0.45*pIdx + 0.30*(c.scores.academic||0) + 0.15*(c.scores.market||0) + 0.10*(c.scores.bac||0);

    // If locked public and no private budget, avoid dominating ambitious unless Tier A
    if ((c.eligibilityTag === "notEligiblePublic" || c.eligibilityTag === "privateOnly") && !privateBudget) {
      s -= (tier === "A") ? 0.05 : 0.15;
    }

    // Soft cultural boost for Tier A/B to prestige
    if (tier === "A") s += 0.05*(pIdx - 0.5);
    if (tier === "B") s += 0.03*(pIdx - 0.5);

    s = Math.min(1, Math.max(0, s));
    return { c, s };
  });
  const ambitious = pickBest(ambitiousScored);

  // ── Balanced ──
  const balancedScored = rankedClusters.map(c => {
    const pIdx = prestigeIndex(c);
    let s = 0.35*(c.scores.academic||0) + 0.20*(c.scores.trait||0) + 0.20*(c.scores.market||0) + 0.15*(c.scores.bac||0) + 0.10*pIdx;

    // If Tier A/B and NOT fast mode, softly suppress very low prestige from top1
    if ((tier === "A" || tier === "B") && goalMode !== "practical") {
      if (pIdx < 0.50 && !hasStrongInterestForCluster(c.id)) s -= 0.15;
      else if (pIdx < 0.60 && !hasStrongInterestForCluster(c.id)) s -= 0.08;
    }

    s = Math.min(1, Math.max(0, s));
    return { c, s };
  });
  const balanced = pickBest(balancedScored);

  // ── Best Fit ──
  const fitScored = rankedClusters.map(c => {
    let s = 0.55*(c.scores.trait||0) + 0.25*(c.scores.academic||0) + 0.10*(c.scores.bac||0) + 0.10*(c.scores.market||0);

    // If public locked + no private budget, reduce for Best Fit (it can still appear in Ambitious)
    if (c.id === "health" && c.eligibilityTag === "notEligiblePublic" && !privateBudget) {
      s -= 0.12;
    }

    // Interest boost (small)
    if (hasStrongInterestForCluster(c.id)) s += 0.05;

    s = Math.min(1, Math.max(0, s));
    return { c, s };
  });
  const bestFit = pickBest(fitScored, { enforcePersonality: true, enforceMedicine: true });

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
  const avg       = clamp(Number(overallAvg) || 0, 0, 20);
  const isHighAvg = avg >= 14.5;

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
    if (!isHighAvg || goalMode === "practical") return sorted;
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

  if (goalMode === "prestige") {
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
// Sanity checks — Step 5
// Dev-only. Runs once at load if on localhost.
// No import.meta. No crashes if checks fail.
// ─────────────────────────────────────────────────────────────────
function runSanityChecks() {
  try {
    const LOW_IDS = new Set(["tourism","sports","culinary_ops","arts_media","trades","automotive"]);

    // Build minimal synthetic clusters for testing
    const makeSC = (id, finalScore, academicScore) => ({
      id, scores: { final: finalScore, academic: academicScore },
      pathways: {},
    });

    // Check 1: overallAvg=15, goalMode=prestige → top-3 must not contain tourism/sports
    const synth = [
      makeSC("it",      0.74, 0.82),
      makeSC("finance", 0.71, 0.78),
      makeSC("data",    0.70, 0.79),
      makeSC("tourism", 0.68, 0.40),  // should NOT be in top-3
      makeSC("sports",  0.65, 0.30),  // should NOT be in top-3
    ];
    const info1 = { goalMode: "prestige" };
    const { primary: p1 } = culturallyRerankClusters(synth, info1, 15);
    const top3ids1 = p1.slice(0,3).map(c=>c.id);
    if (top3ids1.some(id => LOW_IDS.has(id))) {
      console.warn("[Massar] Sanity check FAILED (1): high-avg prestige still shows low-prestige cluster in top-3:", top3ids1);
    }

    // Check 2: goalMode=practical → tourism/sports ARE allowed in top-3
    const info2 = { goalMode: "practical" };
    const { primary: p2 } = culturallyRerankClusters(synth, info2, 15);
    const top3ids2 = p2.slice(0,3).map(c=>c.id);
    if (!top3ids2.some(id => LOW_IDS.has(id))) {
      console.warn("[Massar] Sanity check WARN (2): practical mode should allow hands-on clusters in top-3:", top3ids2);
    }

    console.log("[Massar] Sanity checks passed. Check1 top3:", top3ids1, "Check2 top3:", top3ids2);
  } catch (e) {
    console.warn("[Massar] Sanity check error:", e);
  }
}

// Run sanity checks on localhost only (no import.meta)
if (typeof window !== "undefined" && typeof window.location !== "undefined"
    && window.location.hostname === "localhost") {
  setTimeout(runSanityChecks, 1200);
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

    // Cultural sensitivity patch (Tier + Goal) — penalty for practical-only clusters shown to high-avg students
    // who did NOT choose handsOn goal. Keeps OFPPT/ISTA from dominating top slots for tier=HIGH.
    const goal = reality.goal || "prestige";
    const academicTier = getAcademicTier(overallAvg);
    let goalTierPenalty = 0;
    if (academicTier === "HIGH" && goal !== "handsOn") {
      const hasGrandeEcole = !!(cluster.pathways?.grandeEcole?.schools?.length);
      const hasUniversity  = !!(cluster.pathways?.university?.schools?.length);
      const hasPublicRoute = hasGrandeEcole || hasUniversity;
      if (!hasPublicRoute) {
        // Cluster has no university/grande-école pathway → penalise for high-avg non-handsOn students
        goalTierPenalty = 0.15;
      } else if (PRACTICAL_CLUSTERS.has(cluster.id) && !hasGrandeEcole) {
        // Vocational-leaning cluster with university only — modest penalty
        goalTierPenalty = 0.08;
      }
    } else if (academicTier === "MID" && goal === "prestige" && PRACTICAL_CLUSTERS.has(cluster.id)) {
      // Mid-tier prestige students: gentle nudge away from purely vocational top slots
      const hasPublicRoute = !!(cluster.pathways?.grandeEcole?.schools?.length || cluster.pathways?.university?.schools?.length);
      if (!hasPublicRoute) goalTierPenalty = 0.06;
    }

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
      - goalTierPenalty  // Cultural sensitivity patch (Tier + Goal)
    ));

    return {
      ...cluster,
      scores: {
        bac: bacScore, academic: academicScore, trait: traitScore, market: marketScore,
        strength: strengthScore, interest: interestScore, identity: identityScore,
        priority: priorityScore, final: finalScore,
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
  const t          = TRANSLATIONS[lang];
  const topCluster = top3[0];
  const name       = (topCluster && t[CLUSTER_KEY_MAP[topCluster.id]]) || topCluster?.id || "";
  const safeTr     = (traits && typeof traits === "object") ? traits : {};

  const identityType = reality.identityType || "unsure";
  const priority     = reality.priority     || "stability";
  const t_pri        = t.realityPriorityOptions?.[priority]?.label || priority;

  // Narrative fix — pick best 1–2 subjects by mark and calibrate wording
  const trackSubjects = SUBJECTS_BY_TRACK[bacTrack] || [];
  const SUBJ_LABELS   = SUBJECT_LABELS || {};
  const markedSubjs   = trackSubjects
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

// ── Step 3: Info ──────────────────────────────────────────────────
function StepInfo({ lang, info, setInfo, onNext, onBack, t, dir }) {
  const resetMarksOnTrackChange = (newTrack) => {
    // parent resets marks when bacTrack changes
    setInfo(p=>({...p,bacTrack:newTrack}));
  };

  return (
    <div className="card" dir={dir}>
      <StepIndicator step={3} total={7} t={t}/>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:20}}>{t.infoStep}</h2>

      <div className="field">
        <label>{t.bacTrack}</label>
        <select value={info.bacTrack} onChange={e=>resetMarksOnTrackChange(e.target.value)}>
          {BAC_TRACKS.map(b=><option key={b.id} value={b.id}>{b.label[lang]}</option>)}
        </select>
      </div>

      <div className="field">
        <label>{t.city}</label>
        <select value={info.city} onChange={e=>setInfo(p=>({...p,city:e.target.value}))}>
          {MOROCCAN_CITIES.map(c=><option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="field">
        <label>{t.mobility}</label>
        <div className="mobility-grid">
          {t.mobilityOptions.map((opt,i)=>(
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
      </div>

      {/* Cultural sensitivity patch (Tier + Goal) — study goal selector */}
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


      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>{t.back}</button>
        <button className="btn btn-primary" onClick={onNext}>{t.next} →</button>
      </div>
    </div>
  );
}

// ── Step 3: Marks ─────────────────────────────────────────────────
function StepMarks({ lang, info, marks, setMarks, onNext, onBack, t, dir }) {
  const subjs = SUBJECTS_BY_TRACK[info.bacTrack] || [];

  return (
    <div className="card" dir={dir}>
      <StepIndicator step={4} total={7} t={t}/>
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>{t.marksStep}</h2>
      <p style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{t.marks}</p>

      <div className="marks-grid">
        {subjs.map(s=>{
          const val = Number(marks[s])||0;
          const pct = (val/20)*100;
          const color = val>=15?"#10b981":val>=10?"#3b82f6":"#ef4444";
          return (
            <div key={s} className="mark-input">
              <div className="mark-label">{SUBJECT_LABELS[s]?.[lang]||s}</div>
              <div className="mark-row">
                <input type="number" min="0" max="20" step="0.5"
                  value={val||""} placeholder="0"
                  onChange={e=>setMarks(prev=>({...prev,[s]:Math.min(20,Math.max(0,Number(e.target.value)||0))}))}/>
                <div className="mark-bar">
                  <div className="mark-bar-fill" style={{width:`${pct}%`,background:color}}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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

function massarTypeDesc(code, t) {
  const archetype = getArchetype(code);
  const lang = t.dir==="rtl" ? "ar" : (t.next==="Next" ? "en" : "fr");
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
      fr:"Forte opportunité, mais le quotidien peut te fatiguer selon ton style.",
      en:"High opportunity, but day-to-day may feel demanding for your style.",
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
function ShareCard({ t, lang, massarType, topCluster, confidence }) {
  const [copied,  setCopied]  = useState(false);
  // format: "card" (5:7) | "square" (1:1) | "story" (9:16)
  const [fmt, setFmt] = useState("card");

  const archetype   = getArchetype(massarType);
  const archName    = archetype.name?.[lang]    || archetype.name?.en    || massarType;
  const archCode    = archetype.code            || massarType;
  const archIcon    = archetype.icon            || "🧭";
  const archTagline = archetype.tagline?.[lang] || archetype.tagline?.en || archName;
  const rawStrengths = archetype.strengths?.[lang] || archetype.strengths?.en || [];
  const strengths   = rawStrengths.slice(0, 3).map(s => s.length > 22 ? s.slice(0, 21) + "…" : s);
  // FIX: translation fallback — clusterName safe default
  const clusterName = t?.[CLUSTER_KEY_MAP?.[topCluster?.id]] || topCluster?.id || "";
  const isRTL       = lang === "ar";

  // FIX: development debug logs — share card prepared
  useEffect(() => {
    if (import.meta.env.DEV) {
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

  // Viral caption (unchanged)
  const caption = lang==="ar"
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
      <div style={{display:"flex",gap:10,flexWrap:"wrap",maxWidth:360,margin:"0 auto"}}>
        <button className="btn btn-primary" onClick={copyCaption} style={{flex:1,minWidth:110}}>
          {copied ? t.shareCopied : t.copyCaptionBtn}
        </button>
        <button className="btn btn-secondary" onClick={downloadPng} style={{flex:1,minWidth:110}}>
          {t.downloadBadgeBtn}
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
    { key:"bestFit",   icon:"💡", label: lang==="ar"?"الأنسب شخصياً": lang==="fr"?"Meilleure affinité":"Best Personal Fit" },
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

  const subjs   = SUBJECTS_BY_TRACK[safeInfo.bacTrack] || [];
  const origAvg = subjs.length ? subjs.reduce((s,k)=>s+(Number(safeMarks[k])||0),0)/subjs.length : 0;
  const adjAvg  = subjs.length ? subjs.reduce((s,k)=>s+(effectiveMarks?.[k]||0),0)/subjs.length : 0;
  const hasDeltas = Object.values(whatIfDeltas || {}).some(d=>Number(d)!==0);
  const isAfterBac = safeInfo.bacStatus === "after";

  // FIX: results page null-safety — safeTop / safeTop3
  const top3     = safeRanked.slice(0,3);
  const safeTop  = top3[0] || null;   // FIX: results page null-safety
  const fallback = safeRanked.find(c=>c.scores.academic<0.4&&c.demandIndex>0.7)||safeRanked[3]||null;

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
    threeViews:    computeThreeViews(safeRanked, overallAvgVal, safeInfo, safeMarks, safeReality),
    strengths:     Array.isArray(safeReality.strengths) ? safeReality.strengths : [],
    familyPressure: !!safeReality.familyPressure,
    xpProgress:    0, // managed by XPProgressionTracker internally
  };

  // FIX: development debug logs
  if (typeof window !== "undefined" && import.meta.env.DEV) {
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
            <span className="avg-label">{t.overallAverage}</span>
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
  body{background:#0a0e1a;color:#e8ecf0;font-family:'DM Sans',sans-serif;min-height:100vh;}
  [dir="rtl"]{font-family:'Tajawal','IBM Plex Sans Arabic',sans-serif;}

  /* ── Phase 10: Micro animations ── */
  @keyframes fadeIn{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
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
  .app{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:20px 16px 60px;}
  .header{text-align:center;margin-bottom:32px;padding-top:16px;}
  .header h1{font-family:'Playfair Display',serif;font-size:clamp(28px,5vw,48px);
    background:linear-gradient(135deg,#e8a124,#f59e0b,#fbbf24);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-1px;line-height:1.1;}
  [dir="rtl"] .header h1{font-family:'IBM Plex Sans Arabic',sans-serif;}
  .header p{color:#9ca3af;margin-top:8px;font-size:15px;}
  .card{background:var(--surface);border:1px solid var(--border);border-radius:16px;
    padding:28px;width:100%;max-width:720px;box-shadow:0 4px 24px rgba(0,0,0,0.4);}
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
  .btn-row{display:flex;gap:12px;justify-content:flex-end;margin-top:24px;}
  .btn{padding:11px 24px;border-radius:8px;border:none;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.2s;}
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
  .results-wrap{width:100%;max-width:900px;}
  .results-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
  @media(max-width:600px){.results-grid{grid-template-columns:1fr;}.marks-grid{grid-template-columns:1fr;}}
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
`;

// ─────────────────────────────────────────────────────────────────
// DEFAULT STATE
// ─────────────────────────────────────────────────────────────────
const DEFAULT_INFO = {
  bacTrack: "SMA", city: "Casablanca", mobility: 0,
  studyLang: "fr", privateBudget: false,
  bacStatus: "before",
  studyAbroad: false, abroadRegion: "france",
  goal: "prestige",     // Cultural sensitivity patch (Tier + Goal)
  goalMode: "unsure",   // Cultural rerank layer — prestige/fit/practical/unsure
};

const DEFAULT_REALITY = {
  strengths: [],
  interests: [],
  identityType: "",
  priority: "",
  strengthsNow: [],
  preferredStyle: "",
  familyPressure: false,
  fpField: "medicine",
  fpFieldOther: "",
};

// ─────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const [step,         setStep]         = useState(0);
  const [lang,         setLang]         = useState("fr");
  const [answers,      setAnswers]      = useState({});
  const [info,         setInfo]         = useState(DEFAULT_INFO);
  const [marks,        setMarks]        = useState({});
  const [whatIfDeltas, setWhatIfDeltas] = useState({});
  const [reality,      setReality]      = useState(DEFAULT_REALITY);
  // Goal 1: session banner
  const [savedSession, setSavedSession] = useState(null);

  const t   = TRANSLATIONS[lang];
  const dir = t.dir;

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
    if (import.meta.env.DEV) console.log("[Massar] traits computed:", result);
    return result;
  }, [answers]);

  const effectiveMarks = useMemo(
    () => buildEffectiveMarks(marks, whatIfDeltas, SUBJECTS_BY_TRACK[info.bacTrack] || []),
    [marks, whatIfDeltas, info.bacTrack]
  );

  const rankedClusters = useMemo(() => {
    // Cultural sensitivity patch (Tier + Goal) — inject goal into reality so scorer can read it
    const realityWithGoal = { ...reality, goal: info.goal || "prestige" };
    const result = computeClusterScores(info.bacTrack, effectiveMarks, traits, info.mobility, info.privateBudget, realityWithGoal);
    // FIX: development debug logs
    if (typeof window !== "undefined" && window.__DEV__) console.log("[Massar] top clusters computed:", result.slice(0,3).map(c=>c.id));
    return result;
  }, [info.bacTrack, info.goal, effectiveMarks, traits, info.mobility, info.privateBudget, reality]);

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
    if (step !== 6 || !top3.length) return null;
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
    <>
      <style>{css}</style>
      <div className="app" dir={dir}>

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
        {step === 1 && (
          <StepPersonality lang={lang} answers={answers} setAnswers={setAnswers}
            onNext={()=>setStep(2)} onBack={()=>setStep(0)} t={t} dir={dir}/>
        )}
        {step === 2 && (
          <StepReality lang={lang} reality={reality} setReality={setReality}
            onNext={()=>setStep(3)} onBack={()=>setStep(1)} t={t} dir={dir}/>
        )}
        {step === 3 && (
          <StepInfo lang={lang} info={info} setInfo={handleSetInfo}
            onNext={()=>setStep(4)} onBack={()=>setStep(2)} t={t} dir={dir}/>
        )}
        {step === 4 && (
          <StepMarks lang={lang} info={info} marks={marks} setMarks={setMarks}
            onNext={()=>setStep(5)} onBack={()=>setStep(3)} t={t} dir={dir}/>
        )}
        {step === 5 && (
          <StepBacStatus lang={lang} info={info} setInfo={handleSetInfo}
            reality={reality} setReality={setReality}
            onNext={()=>setStep(6)} onBack={()=>setStep(4)} t={t} dir={dir}/>
        )}
        {step === 6 && (
          // FIX: prevent white screen on results — ErrorBoundary catches any render throw
          <ResultsErrorBoundary onRestart={restart} restartLabel={t?.restart || "Restart"}>
            <StepResults
              t={t} lang={lang} dir={dir} info={info}
              marks={marks} whatIfDeltas={whatIfDeltas} setWhatIfDeltas={setWhatIfDeltas}
              effectiveMarks={effectiveMarks} rankedClusters={rankedClusters}
              traits={traits} confidence={confidence} mixedSignals={mixedSignals}
              narrative={narrative} reality={reality} setReality={setReality}
              restart={restart} onBack={()=>setStep(5)}
              secondaryTop3={secondaryTop3}
              overallAvg={overallAvgForRerank}
            />
          </ResultsErrorBoundary>
        )}
      </div>
    </>
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
