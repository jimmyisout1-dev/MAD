// MassarPro — self-contained single-file build
/*
 * CHANGELOG (Personality Reveal update)
 * 1. Added PersonalityReveal page (step 10, old results pushed to step 11)
 * 2. Reveal page: archetype header, 6 identity mirror blocks, mini coach, viral share zone
 * 3. Share card upgraded: premium collectible, 3 formats, archV2 captions
 * 4. Richer identity mirror blocks using archV2 data contract
 * 5. Navigation: reveal → results flow intact; Back/Next work
 * 6. Build safe: no duplicates, no module-scope DOM, one default export
 */

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";



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
    revealPageTitle: "هويتك المهنية",
    revealPageSub: "هاد النتيجة ديالك بصح — مبنية على اختياراتك",
    revealColdReading: "القراءة الأولى",
    revealMirrorTitle: "مرآة هويتك",
    revealCoachTitle: "3 خطوات هاد الأسبوع",
    revealTrapTitle: "فخ تتجنبو",
    revealChallengeTitle: "سؤال للتأمل",
    revealShareTitle: "شارك نتيجتك",
    revealShareCTA: "اصنع بطاقتك",
    revealContinue: "كمّل لخريطة الطريق ←",
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
    revealPageTitle: "Ton Identité Pro",
    revealPageSub: "Ce résultat est le tien — construit sur tes choix",
    revealColdReading: "Lecture à froid",
    revealMirrorTitle: "Miroir Identité",
    revealCoachTitle: "3 moves cette semaine",
    revealTrapTitle: "Le piège à éviter",
    revealChallengeTitle: "Question clé",
    revealShareTitle: "Partage ton résultat",
    revealShareCTA: "Générer ma carte",
    revealContinue: "Voir ma roadmap →",
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
    revealPageTitle: "Your Career Identity",
    revealPageSub: "This result is yours — built from your choices",
    revealColdReading: "Cold Reading",
    revealMirrorTitle: "Identity Mirror",
    revealCoachTitle: "3 moves this week",
    revealTrapTitle: "Trap to avoid",
    revealChallengeTitle: "Challenge question",
    revealShareTitle: "Share your result",
    revealShareCTA: "Generate my card",
    revealContinue: "See my roadmap →",
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

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(String(email || "").trim());
}

function getSupabaseBrowserClient() {
  const url = import.meta?.env?.VITE_SUPABASE_URL;
  const anon = import.meta?.env?.VITE_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

async function requestPdfEmailViaSupabase(payload) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    throw new Error("Supabase environment variables are missing.");
  }

  const fnName = import.meta?.env?.VITE_SUPABASE_SEND_REPORT_FUNCTION || "send-report";
  const { data, error } = await supabase.functions.invoke(fnName, {
    body: payload,
  });

  if (error) throw error;
  return data;
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


function CtaModal({ t, dir, lang, reportData }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const copyFor = {
    ar: {
      trigger: t.ctaButton,
      sending: "جاري تجهيز ملفك وإرساله…",
      success: "✅ تم إرسال ملفك بنجاح إلى بريدك الإلكتروني.",
      fallback: "✅ تم حفظ بريدك. سنرسل لك الملف لاحقاً.",
      invalid: "يرجى إدخال بريد إلكتروني صحيح.",
      error: "تعذر إرسال الملف الآن. تم حفظ بريدك وسنتواصل معك لاحقاً.",
    },
    fr: {
      trigger: t.ctaButton,
      sending: "Préparation et envoi de votre PDF…",
      success: "✅ Votre PDF a bien été envoyé par email.",
      fallback: "✅ Votre email a bien été enregistré. Nous vous enverrons le PDF plus tard.",
      invalid: "Veuillez entrer un email valide.",
      error: "Impossible d'envoyer le PDF pour le moment. Votre email a été enregistré pour un envoi ultérieur.",
    },
    en: {
      trigger: t.ctaButton,
      sending: "Preparing and sending your PDF…",
      success: "✅ Your PDF has been sent to your email.",
      fallback: "✅ Your email was saved. We will send your PDF later.",
      invalid: "Please enter a valid email.",
      error: "We couldn't send the PDF right now. Your email was saved for later delivery.",
    },
  }[lang] || {};

  const openModal = () => {
    setOpen(true);
    setEmail("");
    setStatus("idle");
    setErrorMsg("");
  };

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!isValidEmail(trimmed)) {
      setStatus("error");
      setErrorMsg(copyFor.invalid);
      return;
    }

    saveCtaEmail(trimmed);
    setStatus("sending");
    setErrorMsg("");

    try {
      const payload = {
        email: trimmed,
        report: reportData,
      };

      const hasSupabase = !!(import.meta?.env?.VITE_SUPABASE_URL && import.meta?.env?.VITE_SUPABASE_ANON_KEY);
      if (!hasSupabase) {
        setStatus("success");
        setErrorMsg(copyFor.fallback);
        return;
      }

      await requestPdfEmailViaSupabase(payload);
      setStatus("success");
      setErrorMsg(copyFor.success);
    } catch (err) {
      console.error("[Massar PDF email]", err);
      setStatus("error");
      setErrorMsg(copyFor.error);
    }
  };

  return (
    <>
      <button className="btn btn-cta" onClick={openModal}>
        {copyFor.trigger}
      </button>

      {open && (
        <div className="cta-overlay" onClick={() => setOpen(false)}>
          <div className="cta-modal" dir={dir} onClick={e => e.stopPropagation()}>
            <button
              className="cta-close"
              onClick={() => setOpen(false)}
              aria-label={t.ctaClose}
            >
              ✕
            </button>

            <div style={{ fontSize: 28, marginBottom: 10 }}>📄</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "var(--text)" }}>
              {t.ctaModalTitle}
            </h2>
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20, lineHeight: 1.6 }}>
              {t.ctaModalSubtitle}
            </p>

            {status === "success" ? (
              <div style={{
                padding: "14px 18px",
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 10,
                color: "#10b981",
                fontWeight: 600,
                fontSize: 14,
                textAlign: "center",
              }}>
                {errorMsg || copyFor.success}
              </div>
            ) : (
              <>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                    placeholder={t.ctaEmailPlaceholder}
                    style={{
                      flex: 1, minWidth: 200, padding: "10px 14px",
                      background: "var(--surface2)",
                      border: "1.5px solid var(--border)",
                      borderRadius: 8, color: "var(--text)",
                      fontSize: 14, outline: "none", fontFamily: "inherit",
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    style={{ opacity: status === "sending" ? 0.7 : 1 }}
                  >
                    {status === "sending" ? "…" : t.ctaSubmit}
                  </button>
                </div>

                {(status === "sending" || status === "error") && (
                  <div style={{
                    marginTop: 12,
                    padding: "10px 12px",
                    borderRadius: 10,
                    fontSize: 13,
                    lineHeight: 1.5,
                    background: status === "error" ? "rgba(239,68,68,0.08)" : "rgba(59,130,246,0.08)",
                    border: status === "error" ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(59,130,246,0.25)",
                    color: status === "error" ? "#fca5a5" : "#bfdbfe",
                  }}>
                    {status === "sending" ? copyFor.sending : errorMsg}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
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
// PersonalityReveal — premium identity reveal page
// Shows after quiz, before 6-page roadmap results flow
// ─────────────────────────────────────────────────────────────────
function PersonalityReveal({
  t, lang, dir, traits, confidence, learnerAnswers,
  rankedClusters, journeyStage, reality,
  onContinue, onBack,
}) {
  const [cardFmt,     setCardFmt]     = React.useState("card");
  const [cardBlob,    setCardBlob]    = React.useState(null);
  const [cardUrl,     setCardUrl]     = React.useState(null);
  const [generating,  setGenerating]  = React.useState(false);
  const [captionCopied, setCaptionCopied] = React.useState(false);

  // ── Archetype v2 + derived data ───────────────────────────────
  const ltResult  = computeLearnerType(learnerAnswers || {});
  const learnerType = ltResult.primary || "architect";
  const strengths   = Array.isArray(reality?.strengths) ? reality.strengths : [];
  const archV2 = React.useMemo(
    () => pickArchetypeV2({ traits, learnerType, strengths, confidence }),
    [traits, learnerType, confidence] // eslint-disable-line
  );
  const statsV2  = computeDeterministicStats(traits || {});
  const trSeed   = Math.round(((traits?.analytical||0.5)+(traits?.social||0.5))*100);
  const serialId = makeSerialId(archV2.code, trSeed);
  const rarity   = computeRarity(confidence);
  const rarCol   = {COMMON:"#3b82f6",RARE:"#f59e0b",EPIC:"#a855f7"}[rarity]||"#3b82f6";
  const rarLbl   = {COMMON:{ar:"عادي",fr:"Commun",en:"Common"},RARE:{ar:"نادر",fr:"Rare",en:"Rare"},EPIC:{ar:"ملحمي",fr:"Épique",en:"Epic"}}[rarity];

  const cr = archV2.coldReading?.[lang] || archV2.coldReading?.en || {};
  const mr = archV2.mirror?.[lang]      || archV2.mirror?.en      || {};
  const hq = archV2.hookQuestion?.[lang]|| archV2.hookQuestion?.en|| "";
  const vl = archV2.viralLine?.[lang]   || archV2.viralLine?.en   || "";
  const sm = archV2.signatureMove?.[lang]|| archV2.signatureMove?.en|| "";
  const titleLocal = lang==="ar"?archV2.titleAr:lang==="fr"?archV2.titleFr:archV2.titleEn;
  const topCluster = Array.isArray(rankedClusters) ? rankedClusters[0] : null;

  // ── 6 rich identity mirror blocks ─────────────────────────────
  const tr = {
    analytical: Number(traits?.analytical||0.5), social: Number(traits?.social||0.5),
    structure:  Number(traits?.structure||0.5),  creativity: Number(traits?.creativity||0.5),
    risk:       Number(traits?.risk||0.5),       leadership: Number(traits?.leadership||0.5),
  };
  const mirrorBlocks6 = [
    {
      icon:"⚡",
      key: lang==="ar"?"تحت الضغط":lang==="fr"?"Sous pression":"Under pressure",
      text: mr.pressure || (
        lang==="ar" ? (tr.analytical>0.6 ? "تتحول إلى آلة تحليل — تُبطئ، تُنظّم، تُقرر. الضغط لا يُشلّك، بل يُحدّد تفكيرك." : tr.social>0.6 ? "تبحث عن دعم بشري — حديث قصير مع شخص تثق فيه يعيد توازنك بسرعة." : "تعمل أحسن ملي تحدّد أولوية وحدة وتنجّزها بالكامل قبل ما تنتقل.")
        : lang==="fr" ? (tr.analytical>0.6 ? "Tu te transformes en machine d'analyse — tu ralentis, organises, décides. La pression te focalise." : tr.social>0.6 ? "Tu cherches un soutien humain — une courte conversation avec quelqu'un de confiance te recentre." : "Tu travailles mieux quand tu identifies une seule priorité et l'exécutes jusqu'au bout.")
        : (tr.analytical>0.6 ? "You become an analysis machine — you slow down, organize, decide. Pressure doesn't freeze you, it focuses you." : tr.social>0.6 ? "You seek human support — a short talk with a trusted person rebalances you fast." : "You work best with one clear priority executed fully before moving on.")
      ),
    },
    {
      icon:"🔋",
      key: lang==="ar"?"باش تبقى ثابت":lang==="fr"?"La constance":"What keeps you consistent",
      text: mr.consistency || (
        lang==="ar" ? (learnerType==="sentinel" ? "الروتين هو وقودك. ملي تكسر عادة وحدة، ارجعها فورًا — ما تسناش." : learnerType==="sprinter" ? "خاصك مواعيد حقيقية باش تبقى شاعل. الضغط الاصطناعي يفيدك." : learnerType==="diplomat" ? "خاصك جمهور — مجموعة مراجعة أو شريك يساعدك تكمّل." : "ربط أهدافك بمعنى أعمق كيبقيك ثابت ملي يتراجع الحماس.")
        : lang==="fr" ? (learnerType==="sentinel" ? "La routine est ton carburant. Dès qu'une habitude casse, récupère-la immédiatement." : learnerType==="sprinter" ? "Tu as besoin de vraies deadlines pour rester motivé. La pression artificielle te sert." : learnerType==="diplomat" ? "Tu as besoin d'un public — un groupe ou un partenaire t'aide à persévérer." : "Relier tes objectifs à un sens plus profond te stabilise quand l'élan baisse.")
        : (learnerType==="sentinel" ? "Routine is your fuel. The moment a habit breaks, recover it immediately." : learnerType==="sprinter" ? "You need real deadlines to stay motivated. Artificial pressure genuinely helps you." : learnerType==="diplomat" ? "You need an audience — a study group or partner helps you follow through." : "Linking your goals to deeper meaning keeps you steady when enthusiasm fades.")
      ),
    },
    {
      icon:"🎯",
      key: lang==="ar"?"ميزتك الخفية":lang==="fr"?"Ton avantage caché":"Your unfair advantage",
      text: mr.advantage || (
        lang==="ar" ? (tr.creativity>0.6 ? "كتشوف اللي ما كيتشافش — قدرتك على ربط أفكار بعيدة كتنتج حلول غير متوقعة." : tr.analytical>0.6 ? "كتفكّك المشكلات — قدرتك على تشريح الأنظمة المعقدة ميزة نادرة." : tr.structure>0.6 ? "الاتساق تحت الضغط — ملي يتفكك الآخرون، أنت تثبّت وتنجز." : "الذكاء الاجتماعي — قدرتك على بناء الثقة بسرعة ميزة ما كتتعلّمش.")
        : lang==="fr" ? (tr.creativity>0.6 ? "Tu vois ce que les autres ne voient pas — relier des idées distantes produit des solutions inattendues." : tr.analytical>0.6 ? "Tu décomposes les problèmes — analyser des systèmes complexes est un avantage rare." : tr.structure>0.6 ? "La constance sous pression — quand les autres s'effondrent, tu stabilises et livres." : "L'intelligence sociale — bâtir la confiance rapidement est un avantage qui ne s'enseigne pas.")
        : (tr.creativity>0.6 ? "You see what others miss — connecting distant ideas produces unexpected solutions." : tr.analytical>0.6 ? "You break down problems — dissecting complex systems is a rare skill." : tr.structure>0.6 ? "Consistency under pressure — when others fall apart, you stabilize and deliver." : "Social intelligence — building trust fast is an advantage that can't be taught.")
      ),
    },
    {
      icon:"🌑",
      key: lang==="ar"?"نقطة عمياء":lang==="fr"?"Point aveugle":"Blind spot",
      text: mr.blindSpot || (
        lang==="ar" ? (tr.risk>0.6 ? "الإثارة كتضيّع التخطيط. تأكد أن طاقتك تتحوّل لنتائج حقيقية مو مجرد مشاريع تبدأ." : tr.structure>0.6 ? "الكمالية كتعيق الإنجاز. التقدم 80% في الوقت أحسن من الكمال المتأخر." : tr.social>0.6 ? "الاعتماد على موافقة الناس كيبطّلك. ثق في حكمك في القرارات الصغيرة." : "الانتظار حتى 'الجاهزية الكاملة' كيفوّت الفرص. ابدأ بما عندك دابا.")
        : lang==="fr" ? (tr.risk>0.6 ? "L'excitation peut faire oublier la planification. Assure-toi que ton énergie se traduit en résultats concrets." : tr.structure>0.6 ? "Le perfectionnisme bloque l'exécution. Un progrès à 80% dans les temps vaut mieux qu'un parfait tardif." : tr.social>0.6 ? "Dépendre de l'approbation peut te ralentir. Fais confiance à ton jugement sur les petites décisions." : "Attendre d'être 'totalement prêt' fait rater des opportunités. Commence avec ce que tu as.")
        : (tr.risk>0.6 ? "Excitement can overshadow planning. Make sure your energy converts to real results, not just new starts." : tr.structure>0.6 ? "Perfectionism blocks execution. 80% progress on time beats late perfection." : tr.social>0.6 ? "Relying on others' approval can slow you down. Trust your judgment on small decisions." : "Waiting until you're 'fully ready' costs opportunities. Start with what you have now.")
      ),
    },
    {
      icon:"👁️",
      key: lang==="ar"?"كيفاش كيشوفك الناس":lang==="fr"?"Comment les autres te lisent":"How people read you",
      text: lang==="ar"
        ? (tr.leadership>0.6 ? "الناس كيحسوا بيك قبل ما تهضر. كتعطي انطباع مباشر وموثوق — حتى حين ما تنتبهش." : tr.social>0.6 ? "كتوصل للناس بسرعة — بلا جهيد كبير، الناس كتحس مرتاحة معك." : tr.analytical>0.6 ? "كتبان هادئ وعميق. الناس كتحترمك لأن ما تتكلمش غير ملي عندك شي حقيقي." : "كتعطي انطباع ديال الموثوقية — ملي تعد بشيء، الناس كتعرف أنك غادي تنجزه.")
        : lang==="fr"
        ? (tr.leadership>0.6 ? "Les gens te sentent avant que tu parles. Tu dégages une présence directe et fiable — même sans effort." : tr.social>0.6 ? "Tu te connectes vite — sans forcer, les gens se sentent à l'aise avec toi." : tr.analytical>0.6 ? "Tu parais calme et profond. On te respecte parce que tu ne parles que quand tu as quelque chose de réel." : "Tu dégages la fiabilité — quand tu promets quelque chose, les gens savent que tu vas livrer.")
        : (tr.leadership>0.6 ? "People sense you before you speak. You project a direct, reliable presence — even without trying." : tr.social>0.6 ? "You connect fast — without forcing it, people feel comfortable around you." : tr.analytical>0.6 ? "You come across as calm and deep. People respect you because you only speak when you have something real." : "You project reliability — when you promise something, people know you'll deliver."),
    },
    {
      icon:"💡",
      key: lang==="ar"?"جملة الواقع":lang==="fr"?"La vérité":"A truth about you",
      text: lang==="ar"
        ? (tr.risk>0.6 ? "الطاقة ديالك قوة — بشرط ما دير منها حماسًا فقط. ملي تربطها بخطة، تصبح خطيرة بالإيجاب." : tr.analytical>0.6 ? "عقلك يشتغل باستمرار حتى ملي كتستراح. الفخ هو التحليل الزايد. السر: قرر بـ80% وطبّق." : tr.structure>0.6 ? "الانتظام ديالك ميزة — لكن الكمالية كتقدر تكون حيط. خليها نعال بدل حيط." : "قوّتك الكبرى هي أنك واقعي. ما كتضيعش وقتك في أشياء مو فبلاصتها.")
        : lang==="fr"
        ? (tr.risk>0.6 ? "Ton énergie est une force — à condition de ne pas en faire juste de l'enthousiasme. Liée à un plan, elle devient redoutable." : tr.analytical>0.6 ? "Ton cerveau tourne en permanence, même au repos. Le piège : l'analyse excessive. La clé : décider à 80% et exécuter." : tr.structure>0.6 ? "Ta rigueur est une force — mais le perfectionnisme peut devenir un mur. Fais-en une chaussure, pas un obstacle." : "Ta grande force c'est d'être réaliste. Tu ne perds pas ton temps sur ce qui ne tient pas.")
        : (tr.risk>0.6 ? "Your energy is a superpower — as long as it doesn't stay as enthusiasm. Paired with a plan, it becomes formidable." : tr.analytical>0.6 ? "Your brain runs constantly, even at rest. The trap: over-analysis. The key: decide at 80% and execute." : tr.structure>0.6 ? "Your consistency is a strength — but perfectionism can become a wall. Make it a tool, not a barrier." : "Your real strength is being grounded. You don't waste energy on things that don't hold up."),
    },
  ];

  // ── Mini Coach content ─────────────────────────────────────────
  const getCoachMoves = () => {
    const moves = {
      ar: {
        moves: [
          tr.analytical>0.6 ? "اكتب تحليل قصير ليوم واحد: شنو أنجزت + شنو بقى" : tr.social>0.6 ? "تواصل مع شخص في المجال اللي يهمك — اسألو سؤال واحد" : "حدّد 3 مهام فقط ليوم غد وأنجزهم بالترتيب",
          tr.risk>0.6 ? "ابدأ مشروعًا صغيرًا بدون انتظار الجاهزية الكاملة" : tr.structure>0.6 ? "راجع خطتك الأسبوعية وحذف اللي مو ضروري" : "اعمل 25 دقيقة بوضع الهاتف بعيد",
          "ابحث على شخص يعمل في المسار اللي يعجبك وتعرّف على مساره",
        ],
        trap: tr.analytical>0.6 ? "الإفراط في التحليل بدل البدء. دابا: قرر بـ80% من المعلومات." : tr.structure>0.6 ? "الانتظار حتى تكون 'الظروف مثالية'. ابدأ بما عندك." : "الانتشاء بالأفكار بدون تنفيذ. حوّل فكرة وحدة لخطوة دابا.",
        challenge: tr.analytical>0.6 ? "شنو القرار اللي كنت تؤخّره؟ اكتب 3 خطوات باش تحسمه هاد الأسبوع." : tr.social>0.6 ? "من هو شخص مهم في مسارك المهني تقدر تتواصل معه هاد الأسبوع؟" : "شنو الشيء الوحيد اللي، لو أنجزته هاد الأسبوع، سيغيّر التعادل لصالحك؟",
      },
      fr: {
        moves: [
          tr.analytical>0.6 ? "Écris une analyse rapide de ta journée : réalisé vs prévu" : tr.social>0.6 ? "Contacte quelqu'un dans le domaine qui t'intéresse — une seule question" : "Liste 3 tâches seulement pour demain et fais-les dans l'ordre",
          tr.risk>0.6 ? "Lance un mini-projet sans attendre d'être totalement prêt" : tr.structure>0.6 ? "Revois ton planning et supprime ce qui n'est pas essentiel" : "25 minutes de travail profond, téléphone loin",
          "Trouve quelqu'un qui travaille dans ton domaine cible et découvre son parcours",
        ],
        trap: tr.analytical>0.6 ? "L'excès d'analyse au lieu de commencer. Maintenant : décide à 80% des infos." : tr.structure>0.6 ? "Attendre que les conditions soient parfaites. Commence avec ce que tu as." : "Te contenter des idées sans passer à l'action. Transforme une idée en étape concrète.",
        challenge: tr.analytical>0.6 ? "Quelle décision tu repoussais ? Écris 3 étapes pour la trancher cette semaine." : tr.social>0.6 ? "Qui est une personne clé pour ton parcours que tu peux contacter cette semaine ?" : "Quelle est la seule chose qui, si tu la fais cette semaine, changerait ton momentum ?",
      },
      en: {
        moves: [
          tr.analytical>0.6 ? "Write a quick end-of-day analysis: done vs planned" : tr.social>0.6 ? "Reach out to someone in your target field — ask one question" : "List only 3 tasks for tomorrow and do them in order",
          tr.risk>0.6 ? "Start a mini-project without waiting to be fully ready" : tr.structure>0.6 ? "Review your weekly plan and cut what's not essential" : "25 minutes of deep work, phone far away",
          "Find someone working in your target field and learn their path",
        ],
        trap: tr.analytical>0.6 ? "Over-analysis instead of starting. Rule: decide at 80% of info." : tr.structure>0.6 ? "Waiting for perfect conditions. Start with what you have." : "Getting stuck in idea mode. Convert one idea into one concrete step.",
        challenge: tr.analytical>0.6 ? "What decision were you postponing? Write 3 steps to resolve it this week." : tr.social>0.6 ? "Who's one key person for your path you can contact this week?" : "What's the one thing, if done this week, that changes your momentum?",
      },
    };
    return moves[lang] || moves.en;
  };
  const coach = getCoachMoves();

  // ── Canvas download ────────────────────────────────────────────
  const FMT_SIZES = { card:{w:1260,h:1764}, square:{w:1080,h:1080}, story:{w:1080,h:1920} };
  const clusterName = topCluster?.id || "";

  const generateCard = () => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    setGenerating(true);
    try {
      const { w:W, h:H } = FMT_SIZES[cardFmt] || FMT_SIZES.card;
      const PAD = Math.round(W * 0.072);
      const canvas = document.createElement("canvas");
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) { setGenerating(false); return; }
      const isRTL = lang === "ar";
      const arF = "Tajawal,Cairo,Arial,sans-serif";
      const enF = "system-ui,-apple-system,sans-serif";
      const bF = isRTL ? arF : enF;

      // Background
      const bg = ctx.createLinearGradient(0, 0, W*0.4, H);
      bg.addColorStop(0,"#07091a"); bg.addColorStop(0.5,"#0b1230"); bg.addColorStop(1,"#0f1840");
      ctx.fillStyle = bg; ctx.fillRect(0,0,W,H);

      // Tile overlay
      const tile = Math.round(W*0.12);
      ctx.save(); ctx.globalAlpha=0.04; ctx.strokeStyle="#fbbf24"; ctx.lineWidth=1.5;
      for (let gx=0;gx<W+tile;gx+=tile) for (let gy=0;gy<H+tile;gy+=tile) {
        ctx.beginPath();
        for (let p=0;p<8;p++){const a=(p/8)*Math.PI*2-Math.PI/8,a2=((p+0.5)/8)*Math.PI*2-Math.PI/8,r2=tile*0.38,rI=r2*0.45;
          p===0?ctx.moveTo(gx+Math.cos(a)*r2,gy+Math.sin(a)*r2):ctx.lineTo(gx+Math.cos(a)*r2,gy+Math.sin(a)*r2);
          ctx.lineTo(gx+Math.cos(a2)*rI,gy+Math.sin(a2)*rI);}
        ctx.closePath(); ctx.stroke();
      }
      ctx.restore();

      // Glow
      const ggl=ctx.createRadialGradient(W*0.82,H*0.06,0,W*0.82,H*0.06,W*0.5);
      ggl.addColorStop(0,rarCol+"28"); ggl.addColorStop(1,"transparent");
      ctx.fillStyle=ggl; ctx.fillRect(0,0,W,H);

      // Border
      function rr(x,y,rw,rh,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+rw-r,y);ctx.arcTo(x+rw,y,x+rw,y+r,r);ctx.lineTo(x+rw,y+rh-r);ctx.arcTo(x+rw,y+rh,x+rw-r,y+rh,r);ctx.lineTo(x+r,y+rh);ctx.arcTo(x,y+rh,x,y+rh-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath();}
      ctx.save(); ctx.strokeStyle=rarCol; ctx.lineWidth=3.5; ctx.shadowColor=rarCol; ctx.shadowBlur=28;
      rr(8,8,W-16,H-16,Math.round(W*0.03)); ctx.stroke(); ctx.restore();
      ctx.save(); ctx.strokeStyle=rarCol+"30"; ctx.lineWidth=1.5;
      rr(20,20,W-40,H-40,Math.round(W*0.024)); ctx.stroke(); ctx.restore();

      // Helpers
      function txC(txt,y,font,col,maxW){ctx.save();ctx.font=font;ctx.fillStyle=col;ctx.textAlign="center";ctx.textBaseline="alphabetic";ctx.fillText(txt,W/2,y,maxW||W-PAD*2);ctx.restore();}
      function txL(txt,y,font,col){ctx.save();ctx.font=font;ctx.fillStyle=col;ctx.textBaseline="alphabetic";if(isRTL){ctx.textAlign="right";ctx.fillText(txt,W-PAD,y,W-PAD*2);}else{ctx.textAlign="left";ctx.fillText(txt,PAD,y,W-PAD*2);}ctx.restore();}
      function txR(txt,y,font,col){ctx.save();ctx.font=font;ctx.fillStyle=col;ctx.textBaseline="alphabetic";if(isRTL){ctx.textAlign="left";ctx.fillText(txt,PAD,y);}else{ctx.textAlign="right";ctx.fillText(txt,W-PAD,y);}ctx.restore();}

      let y = Math.round(H*0.052);
      const GOLD="#e8a124",GOLD2="#fbbf24",BLUE2="#3b82f6";

      // MASSAR header
      txL(`MASSAR | ${new Date().getFullYear()}`,y,`bold ${Math.round(W*0.028)}px ${bF}`,GOLD);
      const subTxt=isRTL?"محرك الهوية المهنية":"Morocco Career Identity Engine";
      txL(subTxt,y+Math.round(H*0.022),`${Math.round(W*0.018)}px ${bF}`,"#4b5563");

      // Rarity pill
      const rarTxt=`${(rarLbl?.[lang]||rarity).toUpperCase()} ✦ ${isRTL?"موثّق":lang==="fr"?"VÉRIFIÉ":"VERIFIED"}`;
      const rarF=`bold ${Math.round(W*0.022)}px ${bF}`;
      ctx.font=rarF; const rtw=ctx.measureText(rarTxt).width;
      const rpW=rtw+W*0.05,rpH=W*0.048;
      ctx.save();ctx.fillStyle="#1e3a5f";ctx.strokeStyle=rarCol;ctx.lineWidth=1.5;ctx.shadowColor=rarCol;ctx.shadowBlur=12;
      rr(W/2-rpW/2,y-rpH*0.72,rpW,rpH,rpH/2);ctx.fill();ctx.stroke();ctx.restore();
      txC(rarTxt,y,rarF,rarCol);
      y+=Math.round(H*0.04);

      // Divider
      ctx.save();const rg=ctx.createLinearGradient(PAD,0,W-PAD,0);rg.addColorStop(0,"transparent");rg.addColorStop(0.1,rarCol+"55");rg.addColorStop(0.9,rarCol+"55");rg.addColorStop(1,"transparent");ctx.strokeStyle=rg;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(PAD,y);ctx.lineTo(W-PAD,y);ctx.stroke();ctx.restore();
      y+=Math.round(H*0.03);

      // Icon emblem
      const iR=Math.round(W*(cardFmt==="square"?0.17:0.19));
      const iCX=W/2,iCY=y+iR;
      [iR*1.28,iR*1.12,iR].forEach((r3,ri)=>{ctx.save();ctx.beginPath();ctx.arc(iCX,iCY,r3,0,Math.PI*2);ctx.strokeStyle=ri===2?rarCol:rarCol+(ri===1?"44":"18");ctx.lineWidth=ri===2?2.5:1.5;ctx.shadowColor=rarCol;ctx.shadowBlur=ri===2?24:8;ctx.stroke();ctx.restore();});
      ctx.save();ctx.beginPath();for(let p=0;p<6;p++){const a=(p/6)*Math.PI*2-Math.PI/2;p===0?ctx.moveTo(iCX+Math.cos(a)*iR,iCY+Math.sin(a)*iR):ctx.lineTo(iCX+Math.cos(a)*iR,iCY+Math.sin(a)*iR);}ctx.closePath();ctx.strokeStyle=GOLD+"88";ctx.lineWidth=2;ctx.shadowColor=GOLD;ctx.shadowBlur=10;ctx.stroke();ctx.restore();
      ctx.save();ctx.font=`${Math.round(iR*0.95)}px serif`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(archV2.icon,iCX,iCY+iR*0.06);ctx.restore();
      y=iCY+iR+Math.round(H*0.03);

      // Title
      const nmF=`900 ${Math.round(W*0.072)}px ${bF}`;
      ctx.save();ctx.font=nmF;const nmG=ctx.createLinearGradient(PAD,0,W-PAD,0);nmG.addColorStop(0,"#ffffff");nmG.addColorStop(0.45,GOLD2);nmG.addColorStop(1,GOLD);ctx.fillStyle=nmG;ctx.textAlign="center";ctx.textBaseline="alphabetic";ctx.fillText(archV2.titleLatin,W/2,y,W-PAD*2);ctx.restore();
      y+=Math.round(H*0.038);
      txC(lang==="ar"?archV2.titleAr:lang==="fr"?archV2.titleFr:archV2.titleEn,y,`${Math.round(W*0.028)}px ${bF}`,"#6b7280",W-PAD*2);
      y+=Math.round(H*0.032);
      txC(`[ ${archV2.code} ]`,y,`bold ${Math.round(W*0.03)}px monospace,${bF}`,BLUE2,W-PAD*2);
      y+=Math.round(H*0.038);

      // Divider
      ctx.save();const dg=ctx.createLinearGradient(PAD,0,W-PAD,0);dg.addColorStop(0,"transparent");dg.addColorStop(0.2,rarCol+"55");dg.addColorStop(0.8,rarCol+"55");dg.addColorStop(1,"transparent");ctx.strokeStyle=dg;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(PAD,y);ctx.lineTo(W-PAD,y);ctx.stroke();ctx.restore();
      y+=Math.round(H*0.03);

      // 3 stat bars
      const sp=archV2.statsProfile||{};
      const s1L=sp.stat1Label?.[lang]||"Stat 1",s2L=sp.stat2Label?.[lang]||"Stat 2",s3L=sp.stat3Label?.[lang]||"Stat 3";
      const barTW=W-PAD*2,barH=Math.round(H*0.016);
      const sLF=`bold ${Math.round(W*0.024)}px ${bF}`,sVF=`bold ${Math.round(W*0.024)}px monospace,${bF}`;
      const sCols=[rarCol,BLUE2,"#10b981"];
      [[s1L,statsV2.stat1],[s2L,statsV2.stat2],[s3L,statsV2.stat3]].forEach(([lbl,val],si)=>{
        const sc=sCols[si];
        txL(lbl,y,sLF,"#9ca3af"); txR(`${val}%`,y,sVF,sc);
        y+=Math.round(H*0.022);
        ctx.save();ctx.fillStyle="#0f172a";rr(PAD,y,barTW,barH,barH/2);ctx.fill();ctx.restore();
        const fw=Math.max(barH,Math.round((val/100)*barTW));
        const fg=ctx.createLinearGradient(PAD,0,PAD+fw,0);fg.addColorStop(0,sc);fg.addColorStop(1,sc+"88");
        ctx.save();ctx.fillStyle=fg;ctx.shadowColor=sc;ctx.shadowBlur=8;rr(PAD,y,fw,barH,barH/2);ctx.fill();ctx.restore();
        y+=barH+Math.round(H*0.026);
      });
      y+=Math.round(H*0.01);

      // Top direction
      const dirLbl=isRTL?"أفضل اتجاه:":lang==="fr"?"Top direction:":"Top direction:";
      txL(dirLbl,y,`${Math.round(W*0.022)}px ${bF}`,"#6b7280");
      y+=Math.round(H*0.034);
      ctx.save();ctx.font=`bold ${Math.round(W*0.038)}px ${bF}`;const cng=ctx.createLinearGradient(PAD,0,W-PAD,0);cng.addColorStop(0,"#f3f4f6");cng.addColorStop(1,GOLD2);ctx.fillStyle=cng;ctx.textBaseline="alphabetic";ctx.textAlign=isRTL?"right":"left";ctx.fillText(clusterName||"—",isRTL?W-PAD:PAD,y,W-PAD*2);ctx.restore();
      y+=Math.round(H*0.042);

      // Confidence + serial
      txL(`${isRTL?"التوافق":lang==="fr"?"Compatibilité":"Match"} — ${confidence}%`,y,`600 ${Math.round(W*0.020)}px monospace,${bF}`,GOLD);
      y+=Math.round(H*0.022);
      const bW5=W-PAD*2,bH5=Math.round(H*0.016);
      ctx.save();ctx.fillStyle="#0f172a";rr(PAD,y,bW5,bH5,bH5/2);ctx.fill();ctx.restore();
      const fw5=Math.max(bH5,Math.round((confidence/100)*bW5));
      const fg5=ctx.createLinearGradient(PAD,0,PAD+fw5,0);fg5.addColorStop(0,GOLD);fg5.addColorStop(1,GOLD2);
      ctx.save();ctx.fillStyle=fg5;ctx.shadowColor=GOLD;ctx.shadowBlur=10;rr(PAD,y,fw5,bH5,bH5/2);ctx.fill();ctx.restore();

      // Footer
      const fy=H-PAD*0.85;
      ctx.save();const fl=ctx.createLinearGradient(PAD,0,W-PAD,0);fl.addColorStop(0,"transparent");fl.addColorStop(0.12,rarCol+"28");fl.addColorStop(0.88,rarCol+"28");fl.addColorStop(1,"transparent");ctx.strokeStyle=fl;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(PAD,fy-PAD*0.3);ctx.lineTo(W-PAD,fy-PAD*0.3);ctx.stroke();ctx.restore();
      txL("massarpro.com",fy,`bold ${Math.round(W*0.022)}px ${bF}`,"#374151");
      txR(serialId,fy,`500 ${Math.round(W*0.018)}px monospace,${bF}`,rarCol+"66");

      // Export
      if (cardUrl) URL.revokeObjectURL(cardUrl);
      canvas.toBlob(blob=>{
        if (!blob) { setGenerating(false); return; }
        const url = URL.createObjectURL(blob);
        setCardBlob(blob); setCardUrl(url); setGenerating(false);
      },"image/png");
    } catch(e) {
      console.error("[Massar] card gen error:", e);
      setGenerating(false);
    }
  };

  const downloadCard = () => {
    if (!cardUrl) return;
    const a = document.createElement("a");
    a.href = cardUrl; a.download = `massar-${archV2.code}-${cardFmt}.png`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  // ── Caption ────────────────────────────────────────────────────
  const captionText = archV2.shareCaption?.[lang]
    ? archV2.shareCaption[lang] + (clusterName ? `\n${lang==="ar"?"أفضل مسار":lang==="fr"?"Top voie":"Top path"}: ${clusterName} (${confidence}%)\n🔗 massarpro.com` : "")
    : lang==="ar"
    ? `طلع ليا «${archV2.titleAr}» ${archV2.icon} — ${archV2.code}\nالتوافق: ${confidence}%\nجرّبها: massarpro.com\n#MassarPro`
    : lang==="fr"
    ? `J'ai eu «${archV2.titleFr}» ${archV2.icon} — ${archV2.code}\nCompatibilité: ${confidence}%\nFais le test: massarpro.com\n#MassarPro`
    : `I got «${archV2.titleEn}» ${archV2.icon} — ${archV2.code}\nMatch: ${confidence}%\nTry yours: massarpro.com\n#MassarPro`;

  const copyCaption = () => {
    if (typeof navigator === "undefined") return;
    const doSet=()=>{ setCaptionCopied(true); setTimeout(()=>setCaptionCopied(false),2500); };
    try { navigator.clipboard.writeText(captionText).then(doSet).catch(()=>fallbackCopyText(captionText,doSet)); }
    catch { fallbackCopyText(captionText,doSet); }
  };
  const fallbackCopyText = (txt,cb) => {
    const ta=document.createElement("textarea"); ta.value=txt;
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand("copy"); }catch{}
    document.body.removeChild(ta); cb();
  };

  // ── Render ─────────────────────────────────────────────────────
  const glowStyle = { "--glow":rarCol, boxShadow:`0 0 32px ${rarCol}22` };

  return (
    <div dir={dir} style={{maxWidth:720,width:"100%",margin:"0 auto",padding:"0 4px"}}>

      {/* ── A: Identity header ── */}
      <div style={{
        background:`linear-gradient(135deg,${rarCol}12,rgba(30,41,59,0.6))`,
        border:`2px solid ${rarCol}55`, borderRadius:20, padding:"24px 20px", marginBottom:18,
        boxShadow:`0 0 40px ${rarCol}18`,
      }}>
        <div style={{fontSize:10,fontWeight:800,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase",marginBottom:10}}>
          {t?.revealPageTitle||"Identité Pro"} — {journeyStage==="prebac"?"Pré-Bac":"Post-Bac"}
        </div>
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:54,filter:`drop-shadow(0 0 18px ${rarCol})`}}>{archV2.icon}</div>
          <div style={{
            fontSize:30,fontWeight:900,letterSpacing:-0.5,
            background:`linear-gradient(135deg,#fff,${rarCol},#fbbf24)`,
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:4,
          }}>{archV2.titleLatin}</div>
          <div style={{fontSize:17,fontWeight:700,color:"var(--text)",marginBottom:4}}>{titleLocal}</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:10}}>
            <span style={{
              fontSize:11,fontWeight:800,letterSpacing:2,color:rarCol,
              background:`${rarCol}18`,border:`1px solid ${rarCol}50`,
              borderRadius:20,padding:"3px 12px",
            }}>{rarLbl?.[lang]||rarity} ✦ {archV2.code}</span>
            <span className={`confidence-badge ${confidence>=70?"confidence-high":confidence>=50?"confidence-med":"confidence-low"}`}
              style={{display:"inline-flex"}}>
              <span dir="ltr">{confidence}%</span>
            </span>
          </div>
          <div style={{fontSize:13,color:"var(--muted)",fontStyle:"italic",lineHeight:1.55}}>{vl}</div>
        </div>
        {sm && (
          <div style={{
            textAlign:"center",fontSize:12,color:rarCol,fontWeight:700,
            background:`${rarCol}0d`,borderRadius:8,padding:"6px 12px",
          }}>✦ {sm}</div>
        )}
      </div>

      {/* ── B: 6 cold reading / mirror blocks ── */}
      <div style={{marginBottom:18}}>
        <div style={{fontSize:10,fontWeight:800,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase",marginBottom:12}}>
          {t?.revealMirrorTitle||"Identity Mirror"}
        </div>

        {/* Cold reading (looks + truth) */}
        {(cr.looks||cr.truth) && (
          <div style={{background:"rgba(99,102,241,0.07)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:12,padding:"14px 16px",marginBottom:10}}>
            <div style={{fontSize:10,fontWeight:800,color:"#6366f1",letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>
              {t?.revealColdReading||"Cold Reading"}
            </div>
            {cr.looks && <p style={{fontSize:13,color:"var(--text)",lineHeight:1.7,marginBottom:6,margin:0}}>{cr.looks}</p>}
            {cr.truth && <p style={{fontSize:13,color:rarCol,lineHeight:1.7,fontWeight:600,margin:"6px 0 0"}}>{cr.truth}</p>}
          </div>
        )}

        {/* 6 mirror blocks */}
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {mirrorBlocks6.map((b,i)=>(
            <div key={i} style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:12,padding:"12px 14px"}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                <span style={{fontSize:16}}>{b.icon}</span>
                <span style={{fontSize:11,fontWeight:700,color:"var(--muted)",textTransform:"uppercase",letterSpacing:0.5}}>{b.key}</span>
              </div>
              <p style={{fontSize:13,color:"var(--text)",lineHeight:1.65,margin:0}}>{b.text}</p>
            </div>
          ))}
        </div>

        {/* Hook question */}
        {hq && (
          <div style={{background:`${rarCol}08`,border:`1px solid ${rarCol}30`,borderRadius:12,padding:"14px 16px",marginTop:10}}>
            <div style={{fontSize:10,fontWeight:800,color:rarCol,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>
              {t?.revealChallengeTitle||"Question clé"}
            </div>
            <p style={{fontSize:13,color:"var(--text)",lineHeight:1.65,margin:0,fontWeight:600}}>{hq}</p>
          </div>
        )}
      </div>

      {/* ── C: Mini Coach ── */}
      <div style={{background:"var(--surface2)",border:"1px solid var(--border)",borderRadius:16,padding:"16px 18px",marginBottom:18}}>
        <div style={{fontSize:10,fontWeight:800,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase",marginBottom:12}}>
          {t?.revealCoachTitle||"3 moves this week"}
        </div>
        <ol style={{margin:0,paddingLeft:dir==="rtl"?0:20,paddingRight:dir==="rtl"?20:0,display:"flex",flexDirection:"column",gap:8}}>
          {coach.moves.map((m,i)=>(
            <li key={i} style={{fontSize:13,color:"var(--text)",lineHeight:1.6}}>{m}</li>
          ))}
        </ol>
        <div style={{borderTop:"1px solid var(--border)",marginTop:12,paddingTop:10}}>
          <div style={{fontSize:10,fontWeight:800,color:"#ef4444",letterSpacing:1.5,textTransform:"uppercase",marginBottom:6}}>
            {t?.revealTrapTitle||"Trap to avoid"}
          </div>
          <p style={{fontSize:13,color:"var(--text)",lineHeight:1.6,margin:0}}>⚠️ {coach.trap}</p>
        </div>
      </div>

      {/* ── D: Viral Share Zone ── */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:10,fontWeight:800,letterSpacing:2,color:"var(--muted)",textTransform:"uppercase",marginBottom:12}}>
          {t?.revealShareTitle||"Share your result"}
        </div>

        {/* Format picker */}
        <div style={{display:"flex",gap:6,marginBottom:14,justifyContent:"center"}}>
          {["card","square","story"].map(f=>(
            <button key={f} onClick={()=>setCardFmt(f)} style={{
              padding:"6px 16px",borderRadius:20,fontSize:11,fontWeight:700,
              border:`1.5px solid ${cardFmt===f?rarCol+"cc":"var(--border)"}`,
              background:cardFmt===f?`${rarCol}18`:"var(--surface2)",
              color:cardFmt===f?rarCol:"var(--muted)",cursor:"pointer",
              transition:"all .18s",
            }}>
              {f==="card"?"Card 5:7":f==="square"?"Square 1:1":"Story 9:16"}
            </button>
          ))}
        </div>

        {/* Generate CTA */}
        <div style={{textAlign:"center",marginBottom:14}}>
          <button
            onClick={generateCard}
            disabled={generating}
            className="btn btn-primary"
            style={{fontSize:15,padding:"13px 28px",minWidth:180,opacity:generating?0.7:1}}
          >
            {generating
              ? (lang==="ar"?"جاري الإنشاء…":lang==="fr"?"Génération…":"Generating…")
              : (t?.revealShareCTA||"Generate my card")}
          </button>
        </div>

        {/* Preview + download */}
        {cardUrl && (
          <div style={{textAlign:"center",animation:"fadeIn .4s ease"}}>
            <img
              src={cardUrl} alt="Massar Card Preview"
              style={{maxWidth:Math.min(320,cardFmt==="story"?180:280),borderRadius:12,
                boxShadow:`0 8px 32px ${rarCol}44`,marginBottom:12,display:"block",margin:"0 auto 12px"}}
            />
            <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:10}}>
              <button className="btn btn-primary" onClick={downloadCard} style={{fontSize:13}}>
                ⬇ {lang==="ar"?"تحميل":lang==="fr"?"Télécharger":"Download PNG"}
              </button>
              <button className="btn btn-secondary" onClick={copyCaption} style={{fontSize:13}}>
                {captionCopied
                  ? (lang==="ar"?"✓ تم النسخ":lang==="fr"?"✓ Copié":"✓ Copied")
                  : (t?.copyCaption||"Copy caption")}
              </button>
            </div>
            <div style={{
              fontSize:12,color:"var(--muted)",lineHeight:1.6,
              background:"var(--surface2)",borderRadius:8,padding:"8px 12px",
              textAlign:dir==="rtl"?"right":"left",whiteSpace:"pre-wrap",
              border:"1px solid var(--border)",maxWidth:360,margin:"0 auto",
            }}>{captionText}</div>
          </div>
        )}
      </div>

      {/* ── E: Continue button ── */}
      <div style={{textAlign:"center",paddingTop:8,paddingBottom:24}}>
        <button
          className="btn btn-primary"
          onClick={onContinue}
          style={{fontSize:15,padding:"14px 32px",minWidth:220}}
        >
          {t?.revealContinue||"Continue to roadmap →"}
        </button>
        {onBack && (
          <button
            className="btn btn-secondary"
            onClick={onBack}
            style={{marginTop:10,display:"block",margin:"10px auto 0",fontSize:13}}
          >
            ← {t?.back||"Back"}
          </button>
        )}
      </div>
    </div>
  );
}

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
          // Personality Reveal page — personality identity before roadmap
          <PersonalityReveal
            t={t} lang={lang} dir={dir}
            traits={traits} confidence={confidence}
            learnerAnswers={learnerAnswers}
            rankedClusters={displayClusters}
            journeyStage={journeyStage}
            reality={reality}
            onContinue={()=>setStep(11)}
            onBack={()=>setStep(journeyStage==="prebac" ? 6 : 9)}
          />
        )}
        {step === 11 && (
          // Results flow — full roadmap (was step 10)
          <ResultsErrorBoundary onRestart={restart} restartLabel={t?.restart || "Restart"}>
            <ResultsFlow
              t={t} lang={lang} dir={dir} info={info}
              marks={marks} whatIfDeltas={whatIfDeltas} setWhatIfDeltas={setWhatIfDeltas}
              effectiveMarks={effectiveMarks} rankedClusters={rankedClusters}
              traits={traits} confidence={confidence} mixedSignals={mixedSignals}
              narrative={narrative} reality={reality} setReality={setReality}
              restart={restart} onBack={()=>setStep(10)}
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
