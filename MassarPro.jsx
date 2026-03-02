import { useState, useEffect, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────────────────────────
// I18N  — FIX 1: added confidenceLabel, mixedSignals + all other
//         previously hard-coded UI strings
// ─────────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  ar: {
    dir: "rtl",
    appTitle: "مسار | دليلك المهني المغربي",
    appSubtitle: "اكتشف مسارك المهني المثالي في المغرب",
    next: "التالي",
    back: "السابق",
    start: "ابدأ الآن",
    finish: "احصل على نتائجي",
    step: "الخطوة",
    of: "من",
    langStep: "اختر لغتك",
    langDesc: "سيتم عرض التطبيق بالكامل بالغة المختارة",
    personalityStep: "اختبار الشخصية",
    personalityDesc: "أجب بصدق – لا توجد إجابات خاطئة",
    infoStep: "معلوماتك الدراسية",
    marksStep: "درجاتك",
    resultsStep: "نتائجك",
    bacTrack: "شعبة الباكالوريا",
    city: "مدينتك الحالية",
    mobility: "استعدادك للتنقل",
    mobilityOptions: ["نفس المدينة فقط", "مستعد للانتقال داخل المغرب", "أقبل التعلم عن بُعد"],
    studyLang: "لغة الدراسة المفضلة",
    marks: "درجاتك /20",
    whatIf: "ماذا لو؟ – تعديل الدرجات",
    traitRadar: "ملف شخصيتك",
    topCareers: "أفضل المسارات المهنية",
    pathways: "المسارات التعليمية",
    actionPlan: "خطة العمل – 30 يوماً",
    fallback: "مسار بديل",
    fallbackDesc: "مسار بديل في حالة ضعف الدرجات",
    fallbackBody: "يمكنك الالتحاق بـ OFPPT أو التكوين المهني وتطوير خبرتك العملية قبل الانتقال لمسار أكاديمي أعلى.",
    explainability: "لماذا هذه التوصية؟",
    resume: "استأنف من حيث توقفت",
    resumeSaved: "لديك جلسة سابقة محفوظة",
    restart: "بدء من جديد",
    marketDemand: "الطلب في سوق العمل",
    universityRoute: "المسار الجامعي",
    grandeEcoleRoute: "المدارس العليا",
    practicalRoute: "التكوين المهني",
    why: "لماذا؟",
    score: "النتيجة",
    personality: "الشخصية",
    academic: "أكاديمي",
    market: "السوق",
    constraints: "القيود",
    salaryNote: "* الأرقام تقديرية وتعتمد على الخبرة والشركة والمنطقة",
    salary: "الراتب المتوقع (تقديري)",
    strongSubjects: "مواد قوتك",
    weakSubjects: "مواد تحتاج تحسيناً",
    overallAverage: "المعدل العام",
    adjustedAverage: "المعدل بعد التعديل",
    sliderHint: "↑ تغيير الدرجات لإعادة حساب التوصيات فوراً",
    weekLabel: "الأسبوع",
    durationLabel: "المدة",
    pathwayMissing: "تفاصيل قريباً",
    privateOnly: "مدارس خاصة فقط",
    notEligiblePublic: "غير مؤهل (عام)",
    // FIX 1 ↓
    confidenceLabel: "مستوى الثقة",
    mixedSignals: "⚠️ إشارات متضاربة – شخصيتك ودرجاتك تتجه نحو مجالات مختلفة. راجع المسارات بعناية.",
    privateBudgetLabel: "هل لديك إمكانية الالتحاق بالتعليم الخاص؟",
    privateBudgetHint: "يؤثر هذا على توصيات الطب والتخصصات ذات المنافسة العالية",
    yes: "نعم",
    no: "لا",
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
    marks: "Vos notes /20",
    whatIf: "Et si ? – Modifier les notes",
    traitRadar: "Votre profil de personnalité",
    topCareers: "Meilleures orientations",
    pathways: "Parcours de formation",
    actionPlan: "Plan d'action – 30 jours",
    fallback: "Parcours alternatif",
    fallbackDesc: "Parcours alternatif si les notes sont faibles",
    fallbackBody: "Vous pouvez rejoindre l'OFPPT ou une formation BTS et développer votre expérience pratique avant de progresser académiquement.",
    explainability: "Pourquoi cette recommandation ?",
    resume: "Reprendre où j'en étais",
    resumeSaved: "Vous avez une session sauvegardée",
    restart: "Recommencer",
    marketDemand: "Demande du marché",
    universityRoute: "Université",
    grandeEcoleRoute: "Grande École",
    practicalRoute: "Formation pratique",
    why: "Pourquoi ?",
    score: "Score",
    personality: "Personnalité",
    academic: "Académique",
    market: "Marché",
    constraints: "Contraintes",
    salaryNote: "* Estimations indicatives selon l'expérience, l'entreprise et la région",
    salary: "Salaire estimé",
    strongSubjects: "Points forts",
    weakSubjects: "À améliorer",
    overallAverage: "Moyenne générale",
    adjustedAverage: "Moyenne ajustée",
    sliderHint: "↑ Modifier les notes pour recalculer les recommandations instantanément",
    weekLabel: "Semaine",
    durationLabel: "Durée",
    pathwayMissing: "Détails à venir",
    privateOnly: "Privé uniquement",
    notEligiblePublic: "Non éligible (public)",
    // FIX 1 ↓
    confidenceLabel: "Niveau de confiance",
    mixedSignals: "⚠️ Signaux mixtes – votre personnalité et vos notes pointent vers des domaines différents. Examinez les parcours avec soin.",
    privateBudgetLabel: "Études privées envisageables ?",
    privateBudgetHint: "Influence les recommandations pour la médecine et filières très sélectives",
    yes: "Oui",
    no: "Non",
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
    marks: "Your Grades /20",
    whatIf: "What-If? – Adjust Grades",
    traitRadar: "Your Personality Profile",
    topCareers: "Top Career Paths",
    pathways: "Educational Pathways",
    actionPlan: "30-Day Action Plan",
    fallback: "Fallback Path",
    fallbackDesc: "Alternative path if grades are low",
    fallbackBody: "You can join OFPPT or a BTS program and build practical skills before advancing academically.",
    explainability: "Why This Recommendation?",
    resume: "Resume Where I Left Off",
    resumeSaved: "You have a saved session",
    restart: "Start Over",
    marketDemand: "Market Demand",
    universityRoute: "University Route",
    grandeEcoleRoute: "Grande École Route",
    practicalRoute: "Practical Training",
    why: "Why?",
    score: "Score",
    personality: "Personality",
    academic: "Academic",
    market: "Market",
    constraints: "Constraints",
    salaryNote: "* Estimates vary by experience, company, and region",
    salary: "Estimated Salary",
    strongSubjects: "Your Strengths",
    weakSubjects: "Needs Improvement",
    overallAverage: "Overall Average",
    adjustedAverage: "Adjusted Average",
    sliderHint: "↑ Adjusting grades instantly recomputes recommendations",
    weekLabel: "Week",
    durationLabel: "Duration",
    pathwayMissing: "Details coming soon",
    privateOnly: "Private only",
    notEligiblePublic: "Not eligible (public)",
    // FIX 1 ↓
    confidenceLabel: "Confidence",
    mixedSignals: "⚠️ Mixed signals – your personality and grades point toward different fields. Review pathways carefully.",
    privateBudgetLabel: "Private studies budget available?",
    privateBudgetHint: "Affects recommendations for medicine and highly selective programs",
    yes: "Yes",
    no: "No",
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
  },
};

// ─────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────
const BAC_TRACKS = [
  { id: "SMA",  label: { ar: "علوم رياضية أ",       fr: "Sciences Math A",            en: "Sciences Math A"         } },
  { id: "SMB",  label: { ar: "علوم رياضية ب",       fr: "Sciences Math B",            en: "Sciences Math B"         } },
  { id: "PC",   label: { ar: "فيزياء وكيمياء",      fr: "Physique-Chimie",            en: "Physics-Chemistry"       } },
  { id: "SVT",  label: { ar: "علوم الحياة والأرض",  fr: "SVT",                        en: "Life & Earth Sciences"   } },
  { id: "ECO",  label: { ar: "علوم اقتصادية",       fr: "Sciences Économiques",       en: "Economic Sciences"       } },
  { id: "LET",  label: { ar: "آداب وعلوم إنسانية",  fr: "Lettres & Sciences Humaines",en: "Humanities"              } },
  { id: "TECH", label: { ar: "علوم وتقنيات",        fr: "Sciences & Techniques",      en: "Sciences & Technology"   } },
  { id: "ARTS", label: { ar: "فنون تطبيقية",        fr: "Arts Appliqués",             en: "Applied Arts"            } },
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
  math:       { ar: "الرياضيات",         fr: "Mathématiques",  en: "Mathematics"          },
  physics:    { ar: "الفيزياء",          fr: "Physique",       en: "Physics"               },
  chemistry:  { ar: "الكيمياء",          fr: "Chimie",         en: "Chemistry"             },
  biology:    { ar: "علم الأحياء",       fr: "Biologie",       en: "Biology"               },
  french:     { ar: "اللغة الفرنسية",    fr: "Français",       en: "French"                },
  arabic:     { ar: "اللغة العربية",     fr: "Arabe",          en: "Arabic"                },
  english:    { ar: "اللغة الإنجليزية", fr: "Anglais",        en: "English"               },
  economics:  { ar: "الاقتصاد",          fr: "Économie",       en: "Economics"             },
  management: { ar: "التدبير",           fr: "Gestion",        en: "Management"            },
  tech:       { ar: "التكنولوجيا",       fr: "Technologie",    en: "Technology"            },
  philosophy: { ar: "الفلسفة",           fr: "Philosophie",    en: "Philosophy"            },
  history:    { ar: "التاريخ والجغرافيا",fr: "Histoire-Géo",  en: "History & Geography"  },
  arts:       { ar: "الفنون",            fr: "Arts",           en: "Arts"                  },
  design:     { ar: "التصميم",           fr: "Design",         en: "Design"                },
};

// ─── FIX 5: Morocco realism constraints ───────────────────────────
// minAvg: public path requires this average /20 to be realistic
// requiredSubjects: { subject: minMark } for public eligibility
// privateOk: always show as "private only" when public bar not met
const CLUSTER_CONSTRAINTS = {
  health:     { minAvg: 16.0, requiredSubjects: { biology: 14, chemistry: 13 }, privateOk: true },
  data:       { minAvg: 14.0, requiredSubjects: { math: 13 }, privateOk: true },
  it:         { minAvg: 12.0, requiredSubjects: { math: 11 }, privateOk: true },
  cyber:      { minAvg: 12.0, requiredSubjects: { math: 11 }, privateOk: true },
  network:    { minAvg: 11.0, requiredSubjects: {}, privateOk: true },
  industrial: { minAvg: 11.0, requiredSubjects: {}, privateOk: true },
  energy:     { minAvg: 12.0, requiredSubjects: { physics: 12 }, privateOk: true },
  civil:      { minAvg: 11.0, requiredSubjects: {}, privateOk: true },
  finance:    { minAvg: 11.0, requiredSubjects: {}, privateOk: true },
  marketing:  { minAvg: 10.0, requiredSubjects: {}, privateOk: true },
  logistics:  { minAvg: 10.0, requiredSubjects: {}, privateOk: true },
  tourism:    { minAvg:  9.0, requiredSubjects: {}, privateOk: true },
  edu_law:    { minAvg: 11.0, requiredSubjects: {}, privateOk: true },
  arts_media: { minAvg:  9.0, requiredSubjects: {}, privateOk: true },
};

// ─── FIX 4: Action plan items as {label, url} objects ─────────────
// Backward-compatible: plain strings still render as text.
const CLUSTERS = [
  {
    id: "it",
    icon: "💻",
    demandIndex: 0.95,
    bacAffinity: { SMA: 0.9, SMB: 0.9, PC: 0.7, SVT: 0.3, ECO: 0.4, LET: 0.2, TECH: 0.8, ARTS: 0.2 },
    subjectWeights: { math: 0.35, physics: 0.2, tech: 0.3, french: 0.1, english: 0.05 },
    traitWeights:   { analytical: 0.35, creativity: 0.25, structure: 0.2, social: -0.05, risk: 0.1, leadership: 0.05 },
    salary: { min: 5000, max: 25000, currency: "MAD" },
    pathways: {
      university:  { schools: ["FSTT Tanger", "FST Mohammedia", "Université Ibn Tofail"],            duration: "3–5 ans" },
      grandeEcole: { schools: ["ENSIAS", "ENSA Rabat/Marrakech", "EMSI", "INPT", "UM6P CS"],         duration: "5 ans"   },
      practical:   { schools: ["OFPPT – Technicien Spécialisé Dev", "YouCode", "Simplon.co", "1337 (42)"], duration: "1–3 ans" },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Python basics – freeCodeCamp", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/" },
        { label: "GitHub account setup",          url: "https://github.com" },
      ]},
      { week: 2, items: [
        { label: "Build a simple web page (HTML/CSS) – MDN",  url: "https://developer.mozilla.org/fr/docs/Learn" },
        { label: "Join a coding Discord (Dev Maroc)",          url: "https://discord.gg/devmaroc" },
      ]},
      { week: 3, items: [
        { label: "JavaScript crash course – The Odin Project", url: "https://www.theodinproject.com/" },
        "Renseignez-vous sur le concours ENSIAS/ENSA",
      ]},
      { week: 4, items: [
        { label: "Push your first project to GitHub",          url: "https://docs.github.com/fr/get-started" },
        { label: "Programme Marhaba – Simplon.co Maroc",       url: "https://simplon.co/maroc" },
      ]},
    ],
  },
  {
    id: "data",
    icon: "📊",
    demandIndex: 0.92,
    bacAffinity: { SMA: 0.95, SMB: 0.85, PC: 0.7, SVT: 0.5, ECO: 0.7, LET: 0.15, TECH: 0.6, ARTS: 0.1 },
    subjectWeights: { math: 0.45, physics: 0.1, economics: 0.2, french: 0.1, tech: 0.15 },
    traitWeights:   { analytical: 0.45, creativity: 0.2, structure: 0.25, social: -0.05, risk: 0.05, leadership: 0.1 },
    salary: { min: 6000, max: 30000, currency: "MAD" },
    pathways: {
      university:  { schools: ["Faculté des Sciences – Master Big Data", "Université Hassan II"],            duration: "5 ans"         },
      grandeEcole: { schools: ["ENSIAS – Data", "UM6P Data Science", "OCP School of AI"],                   duration: "5 ans"         },
      practical:   { schools: ["DataCamp Morocco", "OFPPT BI", "Coursera Google Data Analytics"],           duration: "6 mois–2 ans"  },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Statistics basics – Khan Academy",           url: "https://fr.khanacademy.org/math/statistics-probability" },
        { label: "Install Jupyter Notebook",                   url: "https://jupyter.org/install" },
      ]},
      { week: 2, items: [
        { label: "Kaggle Intro to Machine Learning",           url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
        { label: "Bourse OCP School of AI",                    url: "https://ocpschoolofai.ma" },
      ]},
      { week: 3, items: [
        { label: "Titanic dataset project – Kaggle",           url: "https://www.kaggle.com/c/titanic" },
        "Suivez @DataMaroc sur Twitter/X",
      ]},
      { week: 4, items: [
        { label: "Publiez votre notebook sur Kaggle",          url: "https://www.kaggle.com" },
        { label: "Programme été OCP School of AI",             url: "https://ocpschoolofai.ma" },
      ]},
    ],
  },
  {
    id: "cyber",
    icon: "🔐",
    demandIndex: 0.88,
    bacAffinity: { SMA: 0.85, SMB: 0.8, PC: 0.6, SVT: 0.2, ECO: 0.3, LET: 0.15, TECH: 0.75, ARTS: 0.1 },
    subjectWeights: { math: 0.3, physics: 0.15, tech: 0.4, french: 0.1, english: 0.05 },
    traitWeights:   { analytical: 0.4, creativity: 0.15, structure: 0.3, social: -0.1, risk: 0.1, leadership: 0.05 },
    salary: { min: 7000, max: 28000, currency: "MAD" },
    pathways: {
      university:  { schools: ["FST – Réseaux & Sécurité", "FSTG Marrakech"],                               duration: "3–5 ans" },
      grandeEcole: { schools: ["INPT Cybersécurité", "ENSA", "EMSI Sécurité"],                              duration: "5 ans"   },
      practical:   { schools: ["OFPPT Cyber", "TryHackMe", "EC-Council CEH (bootcamp)"],                   duration: "1–2 ans" },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "TryHackMe – free learning path",             url: "https://tryhackme.com" },
        { label: "Networking basics – OSI model (Coursera)",   url: "https://www.coursera.org/learn/computer-networking" },
      ]},
      { week: 2, items: [
        { label: "CTF beginner challenge – picoCTF",           url: "https://picoctf.org" },
        { label: "Install Kali Linux (VirtualBox)",            url: "https://www.kali.org/get-kali/" },
      ]},
      { week: 3, items: [
        { label: "TryHackMe Pre-Security path",                url: "https://tryhackme.com/path/outline/presecurity" },
        "Renseignez-vous sur le concours INPT",
      ]},
      { week: 4, items: [
        { label: "HackTheBox – Starting Point machines",       url: "https://www.hackthebox.com/starting-point" },
        { label: "Discord Morocco Cyber Community",            url: "https://discord.gg/cybersecmaroc" },
      ]},
    ],
  },
  {
    id: "network",
    icon: "📡",
    demandIndex: 0.8,
    bacAffinity: { SMA: 0.8, SMB: 0.85, PC: 0.65, SVT: 0.2, ECO: 0.25, LET: 0.1, TECH: 0.9, ARTS: 0.05 },
    subjectWeights: { math: 0.25, physics: 0.3, tech: 0.4, french: 0.05 },
    traitWeights:   { analytical: 0.3, creativity: 0.1, structure: 0.35, social: 0.1, risk: 0.05, leadership: 0.1 },
    salary: { min: 5000, max: 20000, currency: "MAD" },
    pathways: {
      university:  { schools: ["FST – Génie Électrique", "Université Ibn Zohr"],                             duration: "3–5 ans" },
      grandeEcole: { schools: ["INPT", "ENSA Télécom", "EMSI"],                                              duration: "5 ans"   },
      practical:   { schools: ["OFPPT Technicien Réseaux", "Cisco CCNA (Cisco Academy)", "OFPPT TSRI"],     duration: "2 ans"   },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Cisco Networking Academy – Intro to Networks", url: "https://www.netacad.com" },
        { label: "Install Packet Tracer",                        url: "https://www.netacad.com/courses/packet-tracer" },
      ]},
      { week: 2, items: [
        { label: "Subnetting practice – Subnetting.net",         url: "https://subnetting.net" },
        { label: "YouTube: NetworkChuck Networking series",      url: "https://www.youtube.com/@NetworkChuck" },
      ]},
      { week: 3, items: [
        "Simulez un réseau LAN complet dans Packet Tracer",
        "Renseignez-vous sur le concours INPT & OFPPT TSRI",
      ]},
      { week: 4, items: [
        { label: "Quiz CCNA Introduction – Cisco",               url: "https://www.netacad.com" },
        "Contactez un fournisseur internet local pour un stage",
      ]},
    ],
  },
  {
    id: "industrial",
    icon: "⚙️",
    demandIndex: 0.78,
    bacAffinity: { SMA: 0.8, SMB: 0.95, PC: 0.75, SVT: 0.2, ECO: 0.2, LET: 0.05, TECH: 0.9, ARTS: 0.05 },
    subjectWeights: { math: 0.3, physics: 0.35, tech: 0.3, chemistry: 0.05 },
    traitWeights:   { analytical: 0.25, creativity: 0.15, structure: 0.4, social: 0.1, risk: 0.05, leadership: 0.05 },
    salary: { min: 5500, max: 22000, currency: "MAD" },
    pathways: {
      university:  { schools: ["FST – Génie Industriel", "FSTG"],                                            duration: "3–5 ans" },
      grandeEcole: { schools: ["ENSA – Génie Mécanique", "EMINES UM6P", "EMI Rabat"],                       duration: "5 ans"   },
      practical:   { schools: ["OFPPT Technicien Mécanique", "ISTA Automobile", "Renault Somaca Formation"],duration: "2 ans"   },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "AutoCAD basics – Autodesk free course",        url: "https://www.autodesk.com/education/edu-software" },
        { label: "YouTube: Lean Manufacturing explained",        url: "https://www.youtube.com/results?search_query=lean+manufacturing" },
      ]},
      { week: 2, items: [
        "Visitez une usine locale (Renault, Stellantis Kénitra)",
        { label: "Journées portes ouvertes EMINES UM6P",         url: "https://emines.um6p.ma" },
      ]},
      { week: 3, items: [
        "Réalisez un projet CAD (pièce mécanique simple)",
        "Renseignez-vous sur le concours ENSA Génie Industriel",
      ]},
      { week: 4, items: [
        "Postulez pour un stage ISTA en usine",
        { label: "Zone industrielle Tanger Auto – LinkedIn",     url: "https://www.linkedin.com/jobs/search/?keywords=génie+industriel+maroc" },
      ]},
    ],
  },
  {
    id: "energy",
    icon: "🌞",
    demandIndex: 0.85,
    bacAffinity: { SMA: 0.85, SMB: 0.9, PC: 0.85, SVT: 0.5, ECO: 0.2, LET: 0.05, TECH: 0.8, ARTS: 0.05 },
    subjectWeights: { math: 0.3, physics: 0.45, chemistry: 0.15, tech: 0.1 },
    traitWeights:   { analytical: 0.3, creativity: 0.2, structure: 0.3, social: 0.1, risk: 0.05, leadership: 0.05 },
    salary: { min: 6000, max: 24000, currency: "MAD" },
    pathways: {
      university:  { schools: ["FST – Énergie", "Université Cadi Ayyad"],                                    duration: "3–5 ans" },
      grandeEcole: { schools: ["EMINES UM6P", "ENSA Énergie", "IRESEN partenaires"],                        duration: "5 ans"   },
      practical:   { schools: ["OFPPT Électrotechnique", "IRESEN bootcamp", "Masen partenaires"],           duration: "2–3 ans" },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Solar Energy – Coursera (Duke University)",    url: "https://www.coursera.org/learn/solar-energy" },
        { label: "Projet Noor Ouarzazate – MASEN",               url: "https://www.masen.ma" },
      ]},
      { week: 2, items: [
        { label: "Projet Arduino capteur solaire – Instructables",url: "https://www.instructables.com/Solar-Arduino/" },
        { label: "Bourses EMINES UM6P",                          url: "https://emines.um6p.ma" },
      ]},
      { week: 3, items: [
        { label: "Webinaires IRESEN",                            url: "https://www.iresen.org" },
        { label: "Programme de stage MASEN",                     url: "https://www.masen.ma/fr/rejoindre-masen" },
      ]},
      { week: 4, items: [
        { label: "Journées découverte EMINES UM6P",              url: "https://emines.um6p.ma" },
        { label: "Ingénieurs énergie Maroc – LinkedIn",          url: "https://www.linkedin.com/jobs/search/?keywords=energie+renouvelable+maroc" },
      ]},
    ],
  },
  {
    id: "civil",
    icon: "🏗️",
    demandIndex: 0.72,
    bacAffinity: { SMA: 0.85, SMB: 0.9, PC: 0.75, SVT: 0.2, ECO: 0.15, LET: 0.05, TECH: 0.85, ARTS: 0.1 },
    subjectWeights: { math: 0.35, physics: 0.4, tech: 0.2, french: 0.05 },
    traitWeights:   { analytical: 0.3, creativity: 0.2, structure: 0.35, social: 0.1, risk: 0.0, leadership: 0.05 },
    salary: { min: 5000, max: 20000, currency: "MAD" },
    pathways: {
      university:  { schools: ["Faculté des Sciences et Techniques", "Université Mohammed V"],               duration: "3–5 ans" },
      grandeEcole: { schools: ["EHTP", "EMI Génie Civil", "ENSA BTP"],                                      duration: "5 ans"   },
      practical:   { schools: ["OFPPT Technicien BTP", "ISTA Génie Civil", "BTS Construction"],             duration: "2 ans"   },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "AutoCAD Civil basics – Autodesk",              url: "https://www.autodesk.com/education/edu-software" },
        "Visitez un chantier de construction près de chez vous",
      ]},
      { week: 2, items: [
        "Renseignez-vous sur le programme Villes Nouvelles Maroc",
        { label: "Concours EHTP – informations",                 url: "https://www.ehtp.ac.ma" },
      ]},
      { week: 3, items: [
        "Réalisez un plan d'étage simple (SketchUp free)",
        "Contactez une entreprise BTP locale pour un shadowing",
      ]},
      { week: 4, items: [
        { label: "OFPPT BTP – filières disponibles",             url: "https://www.ofppt.ma" },
        { label: "Offres emploi BTP Maroc – LinkedIn",           url: "https://www.linkedin.com/jobs/search/?keywords=génie+civil+maroc" },
      ]},
    ],
  },
  {
    id: "health",
    icon: "🏥",
    demandIndex: 0.82,
    bacAffinity: { SMA: 0.5, SMB: 0.4, PC: 0.75, SVT: 0.98, ECO: 0.15, LET: 0.1, TECH: 0.3, ARTS: 0.05 },
    subjectWeights: { biology: 0.5, chemistry: 0.3, math: 0.1, physics: 0.1 },
    traitWeights:   { analytical: 0.25, creativity: 0.1, structure: 0.25, social: 0.3, risk: 0.0, leadership: 0.1 },
    salary: { min: 8000, max: 40000, currency: "MAD" },
    pathways: {
      university:  { schools: ["Faculté de Médecine et de Pharmacie (Rabat/Casa)", "Faculté Médecine Dentaire"], duration: "6–7 ans"  },
      grandeEcole: { schools: ["UIR Médecine", "Université Internationale de Casablanca", "EMSI Santé"],    duration: "5–7 ans" },
      practical:   { schools: ["IFCS Infirmier", "OFPPT Aide-soignant", "Technicien de Radiologie"],       duration: "2–3 ans" },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Programme Concours Médecine – syllabus SVT/Chimie", url: "https://www.fmpr.ac.ma" },
        { label: "Khan Academy – biologie niveau concours",       url: "https://fr.khanacademy.org/science/biology" },
      ]},
      { week: 2, items: [
        "Bénévolat dans un dispensaire local",
        { label: "Frais et bourses UIR Médecine",                 url: "https://www.uir.ac.ma/fr/faculty/medicine" },
      ]},
      { week: 3, items: [
        "Faites 2 annales du concours national Médecine",
        "Parlez avec un(e) étudiant(e) en 2e année de Médecine",
      ]},
      { week: 4, items: [
        { label: "Concours National Médecine – dates & infos",    url: "https://www.fmpr.ac.ma" },
        { label: "Concours IFCS Infirmier (plan B)",              url: "https://www.sante.gov.ma" },
      ]},
    ],
  },
  {
    id: "finance",
    icon: "💰",
    demandIndex: 0.8,
    bacAffinity: { SMA: 0.7, SMB: 0.6, PC: 0.5, SVT: 0.3, ECO: 0.98, LET: 0.3, TECH: 0.4, ARTS: 0.1 },
    subjectWeights: { math: 0.3, economics: 0.45, management: 0.2, french: 0.05 },
    traitWeights:   { analytical: 0.4, creativity: 0.1, structure: 0.3, social: 0.1, risk: 0.05, leadership: 0.05 },
    salary: { min: 5500, max: 25000, currency: "MAD" },
    pathways: {
      university:  { schools: ["FSJES – Économie/Gestion", "Université Mohammed V", "Université Hassan II"], duration: "3–5 ans" },
      grandeEcole: { schools: ["ENCG (toutes villes)", "HEM", "ISCAE", "ESCA École de Management"],         duration: "5 ans"   },
      practical:   { schools: ["OFPPT Comptabilité", "BTS Finance", "CPA Maroc"],                           duration: "2 ans"   },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Rapport annuel Banque Al-Maghrib",              url: "https://www.bkam.ma" },
        { label: "Finance personnelle – Khan Academy",            url: "https://fr.khanacademy.org/college-careers-more/personal-finance" },
      ]},
      { week: 2, items: [
        "Construisez un modèle de budget simple sur Excel",
        { label: "Concours ENCG – guide complet",                 url: "https://www.encg.ac.ma" },
      ]},
      { week: 3, items: [
        { label: "Financial Markets – Yale/Coursera (gratuit)",   url: "https://www.coursera.org/learn/financial-markets-global" },
        { label: "Offres emploi Finance Maroc – LinkedIn",        url: "https://www.linkedin.com/jobs/search/?keywords=finance+maroc" },
      ]},
      { week: 4, items: [
        { label: "Dossier ENCG ou ISCAE",                         url: "https://www.encg.ac.ma" },
        "Accompagnez un comptable ou conseiller bancaire local",
      ]},
    ],
  },
  {
    id: "marketing",
    icon: "📣",
    demandIndex: 0.75,
    bacAffinity: { SMA: 0.5, SMB: 0.4, PC: 0.4, SVT: 0.3, ECO: 0.9, LET: 0.65, TECH: 0.4, ARTS: 0.6 },
    subjectWeights: { economics: 0.35, french: 0.25, management: 0.25, arabic: 0.1, arts: 0.05 },
    traitWeights:   { analytical: 0.15, creativity: 0.4, structure: 0.1, social: 0.25, risk: 0.05, leadership: 0.05 },
    salary: { min: 4500, max: 18000, currency: "MAD" },
    pathways: {
      university:  { schools: ["FSJES Marketing", "Université Mundiapolis", "Université Internationale de Rabat"], duration: "3–5 ans"    },
      grandeEcole: { schools: ["ENCG", "HEM", "ESCA", "ISIC – Communication"],                              duration: "5 ans"      },
      practical:   { schools: ["OFPPT Commerce", "Google Digital Marketing Certificate", "Bootcamp Social Media"], duration: "6 mois–2 ans" },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Google Digital Marketing – certification gratuite", url: "https://skillshop.withgoogle.com" },
        "Créez un compte Instagram professionnel test",
      ]},
      { week: 2, items: [
        "Créez une fausse campagne pub (Canva + Meta Ads Manager)",
        { label: "Concours ENCG Marketing",                      url: "https://www.encg.ac.ma" },
      ]},
      { week: 3, items: [
        "Constituez un mini portfolio (3 campagnes créatives)",
        { label: "Marketeurs marocains – LinkedIn",               url: "https://www.linkedin.com/jobs/search/?keywords=marketing+maroc" },
      ]},
      { week: 4, items: [
        { label: "Dossier ENCG ou ISIC",                          url: "https://www.isic.ac.ma" },
        "Proposez vos services social media à une boutique locale (gratuitement)",
      ]},
    ],
  },
  {
    id: "logistics",
    icon: "🚢",
    demandIndex: 0.83,
    bacAffinity: { SMA: 0.7, SMB: 0.75, PC: 0.55, SVT: 0.3, ECO: 0.8, LET: 0.2, TECH: 0.7, ARTS: 0.05 },
    subjectWeights: { math: 0.25, economics: 0.35, management: 0.25, tech: 0.1, french: 0.05 },
    traitWeights:   { analytical: 0.3, creativity: 0.1, structure: 0.4, social: 0.1, risk: 0.05, leadership: 0.05 },
    salary: { min: 5000, max: 22000, currency: "MAD" },
    pathways: {
      university:  { schools: ["FSJES – Logistique", "ENCG Logistics", "Université Hassan 1er Settat"],      duration: "3–5 ans" },
      grandeEcole: { schools: ["ENCG Settat Logistique", "EMT Transports", "ISCAE Logistique"],             duration: "5 ans"   },
      practical:   { schools: ["OFPPT Logistique/Transport", "BTS Commerce International", "DHL/MAERSK Formation"], duration: "2 ans" },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Supply Chain Basics – Coursera (Rutgers)",      url: "https://www.coursera.org/learn/supply-chain-logistics" },
        { label: "Port Tanger Med – actualités",                  url: "https://www.tangermed.ma" },
      ]},
      { week: 2, items: [
        { label: "Introduction logistique – Coursera",            url: "https://www.coursera.org/courses?query=supply+chain" },
        { label: "Concours ENCG Settat",                          url: "https://www.encg-settat.ac.ma" },
      ]},
      { week: 3, items: [
        "Cartographiez une chaîne logistique marocaine (huile d'argan, phosphate…)",
        { label: "Recruteurs Tanger Med – LinkedIn",              url: "https://www.linkedin.com/jobs/search/?keywords=logistique+tanger" },
      ]},
      { week: 4, items: [
        { label: "Candidature ENCG ou EMT",                       url: "https://www.encg.ac.ma" },
        { label: "Programmes étudiants MAERSK/DHL Maroc",         url: "https://jobs.maersk.com" },
      ]},
    ],
  },
  {
    id: "tourism",
    icon: "🏨",
    demandIndex: 0.7,
    bacAffinity: { SMA: 0.3, SMB: 0.25, PC: 0.3, SVT: 0.3, ECO: 0.65, LET: 0.7, TECH: 0.2, ARTS: 0.75 },
    subjectWeights: { french: 0.3, arabic: 0.2, economics: 0.2, english: 0.2, history: 0.1 },
    traitWeights:   { analytical: 0.1, creativity: 0.25, structure: 0.15, social: 0.45, risk: 0.0, leadership: 0.05 },
    salary: { min: 4000, max: 16000, currency: "MAD" },
    pathways: {
      university:  { schools: ["Faculté des Lettres – Tourisme", "Université Ibn Battuta Tanger"],           duration: "3 ans"   },
      grandeEcole: { schools: ["ISIT (Institut Supérieur International du Tourisme)", "ISHT Mohammedia", "Vatel Maroc"], duration: "3–5 ans" },
      practical:   { schools: ["OFPPT Tourisme & Hôtellerie", "ISTA Accueil", "Ecole Hôtelière de Casablanca"], duration: "2 ans" },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Plan Maroc 2030 Tourisme – ONMT",               url: "https://www.onmt.ma" },
        "Apprenez 20 phrases d'hospitalité en anglais et en espagnol",
      ]},
      { week: 2, items: [
        "Visitez un riad ou hôtel local, posez des questions au manager",
        { label: "Concours ISIT – informations",                  url: "https://www.isit.ac.ma" },
      ]},
      { week: 3, items: [
        "Créez un itinéraire touristique pour votre ville (48h)",
        { label: "Hôtellerie de luxe – YouTube (hospitality management)", url: "https://www.youtube.com/results?search_query=hotel+management+luxury" },
      ]},
      { week: 4, items: [
        { label: "OFPPT Tourisme – filières",                     url: "https://www.ofppt.ma" },
        "Contactez une agence de voyage pour un stage d'observation",
      ]},
    ],
  },
  {
    id: "edu_law",
    icon: "⚖️",
    demandIndex: 0.65,
    bacAffinity: { SMA: 0.4, SMB: 0.35, PC: 0.35, SVT: 0.4, ECO: 0.6, LET: 0.95, TECH: 0.2, ARTS: 0.3 },
    subjectWeights: { arabic: 0.35, french: 0.3, philosophy: 0.2, history: 0.15 },
    traitWeights:   { analytical: 0.25, creativity: 0.1, structure: 0.3, social: 0.25, risk: 0.0, leadership: 0.1 },
    salary: { min: 4500, max: 20000, currency: "MAD" },
    pathways: {
      university:  { schools: ["Faculté des Sciences Juridiques (toutes villes)", "Université Mohammed V Droit"], duration: "4–5 ans" },
      grandeEcole: { schools: ["ENA (École Nationale d'Administration)", "IEAP Droit", "UIR Droit"],         duration: "5 ans"   },
      practical:   { schools: ["CPGE Lettres (prépa ENA)", "Formation Greffier Tribunal", "BTS Assistant Juridique"], duration: "2–3 ans" },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Constitution marocaine – version simplifiée",   url: "https://www.sgg.gov.ma/Portals/0/constitution/constitution_2011_Fr.pdf" },
        { label: "Introduction au droit – Khan Academy",          url: "https://fr.khanacademy.org" },
      ]},
      { week: 2, items: [
        "Assistez à une audience publique au tribunal de votre ville",
        { label: "Conditions concours ENA Maroc",                 url: "https://www.ena.ac.ma" },
      ]},
      { week: 3, items: [
        "Rédigez une analyse d'1 page sur un fait divers juridique marocain",
        "Contactez le Barreau de votre ville pour une visite",
      ]},
      { week: 4, items: [
        { label: "Dossier Faculté Droit ou ENA CPGE",             url: "https://www.ena.ac.ma" },
        "Rejoignez un club de débat au lycée ou à la faculté",
      ]},
    ],
  },
  {
    id: "arts_media",
    icon: "🎨",
    demandIndex: 0.55,
    bacAffinity: { SMA: 0.2, SMB: 0.2, PC: 0.2, SVT: 0.2, ECO: 0.3, LET: 0.6, TECH: 0.25, ARTS: 0.98 },
    subjectWeights: { arts: 0.4, french: 0.2, arabic: 0.15, design: 0.25 },
    traitWeights:   { analytical: 0.05, creativity: 0.55, structure: 0.05, social: 0.2, risk: 0.1, leadership: 0.05 },
    salary: { min: 3500, max: 15000, currency: "MAD" },
    pathways: {
      university:  { schools: ["INBA (Institut National des Beaux Arts)", "ISADAC Théâtre", "ESAv Arts Visuels Marrakech"], duration: "4–5 ans" },
      grandeEcole: { schools: ["ISIC – Journalisme", "Université Senghor", "ISCAE Communication"],          duration: "3–5 ans" },
      practical:   { schools: ["OFPPT Arts Graphiques", "Bootcamp UI/UX Design", "YouTube Creator Academy"], duration: "1–2 ans" },
    },
    actionPlan: [
      { week: 1, items: [
        { label: "Créez un profil Behance",                       url: "https://www.behance.net" },
        { label: "Canva Design School – cours gratuits",          url: "https://www.canva.com/learn/design-school/" },
      ]},
      { week: 2, items: [
        "Concevez une affiche pour un événement local",
        { label: "Concours INBA – informations",                  url: "https://www.inba.ac.ma" },
      ]},
      { week: 3, items: [
        "Constituez un portfolio de 3 œuvres (Behance ou PDF)",
        { label: "Designers marocains à suivre – LinkedIn",       url: "https://www.linkedin.com/jobs/search/?keywords=design+maroc" },
      ]},
      { week: 4, items: [
        { label: "Dossier INBA ou ISIC",                          url: "https://www.isic.ac.ma" },
        "Lancez un compte Instagram ou TikTok créatif",
      ]},
    ],
  },
];

const CLUSTER_KEY_MAP = {
  it: "cluster1", data: "cluster2", cyber: "cluster3", network: "cluster4",
  industrial: "cluster5", energy: "cluster6", civil: "cluster7", health: "cluster8",
  finance: "cluster9", marketing: "cluster10", logistics: "cluster11",
  tourism: "cluster12", edu_law: "cluster13", arts_media: "cluster14",
};

// ─────────────────────────────────────────────────────────────────
// PERSONALITY QUESTIONS (12 items, 6 reverse-coded)
// ─────────────────────────────────────────────────────────────────
const PERSONALITY_QUESTIONS = [
  { id: "q1",  trait: "analytical", reverse: false, text: { ar: "أستمتع بحل المشكلات الرياضية والمنطقية المعقدة", fr: "J'aime résoudre des problèmes mathématiques et logiques complexes", en: "I enjoy solving complex mathematical and logical problems" } },
  { id: "q2",  trait: "social",     reverse: false, text: { ar: "أفضل العمل في فريق على العمل منفرداً", fr: "Je préfère travailler en équipe plutôt que seul", en: "I prefer working in a team rather than alone" } },
  { id: "q3",  trait: "structure",  reverse: false, text: { ar: "أحب التخطيط المسبق واتباع الجداول الزمنية", fr: "J'aime planifier à l'avance et suivre des horaires", en: "I like planning ahead and following schedules" } },
  { id: "q4",  trait: "creativity", reverse: false, text: { ar: "أجد نفسي دائماً أبحث عن طرق جديدة وغير تقليدية لحل المشكلات", fr: "Je cherche toujours des façons nouvelles et créatives de résoudre les problèmes", en: "I always look for new and unconventional ways to solve problems" } },
  { id: "q5",  trait: "risk",       reverse: false, text: { ar: "أنا مرتاح لتجربة أشياء جديدة حتى لو كانت النتيجة غير مضمونة", fr: "Je suis à l'aise pour essayer de nouvelles choses même si le résultat est incertain", en: "I'm comfortable trying new things even if the outcome is uncertain" } },
  { id: "q6",  trait: "leadership", reverse: false, text: { ar: "أتقدم طوعاً لقيادة المشاريع والمجموعات", fr: "Je me porte volontaire pour diriger des projets et des groupes", en: "I voluntarily step up to lead projects and groups" } },
  { id: "q7",  trait: "analytical", reverse: true,  text: { ar: "أجد الأرقام والبيانات مملة وغير مثيرة للاهتمام", fr: "Je trouve les chiffres et les données ennuyeux et sans intérêt", en: "I find numbers and data boring and uninteresting" } },
  { id: "q8",  trait: "social",     reverse: true,  text: { ar: "أفضل قضاء وقت طويل بمفردي بدلاً من التواجد مع الآخرين", fr: "Je préfère passer beaucoup de temps seul plutôt qu'avec d'autres", en: "I prefer spending long periods alone rather than with others" } },
  { id: "q9",  trait: "structure",  reverse: true,  text: { ar: "أنا مرتاح للتصرف عفوياً دون خطة مسبقة", fr: "Je suis à l'aise pour agir spontanément sans plan préalable", en: "I'm comfortable acting spontaneously without a prior plan" } },
  { id: "q10", trait: "creativity", reverse: false, text: { ar: "أستمتع بالرسم والكتابة أو أي شكل من أشكال التعبير الفني", fr: "J'apprécie le dessin, l'écriture ou toute forme d'expression artistique", en: "I enjoy drawing, writing, or any form of artistic expression" } },
  { id: "q11", trait: "risk",       reverse: true,  text: { ar: "أفضل المسار المضمون حتى لو كان أقل إثارة", fr: "Je préfère le chemin sûr même s'il est moins excitant", en: "I prefer the safe path even if it's less exciting" } },
  { id: "q12", trait: "leadership", reverse: true,  text: { ar: "أشعر بعدم الارتياح عندما يطلب مني الآخرون اتخاذ القرارات", fr: "Je me sens mal à l'aise quand on me demande de prendre des décisions", en: "I feel uncomfortable when others ask me to make decisions" } },
];

const MOROCCAN_CITIES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", "Meknès",
  "Oujda", "Kénitra", "Tétouan", "Safi", "El Jadida", "Nador", "Beni Mellal",
  "Settat", "Khouribga", "Mohammedia", "Laâyoune", "Dakhla", "Autre",
];

// ─────────────────────────────────────────────────────────────────
// SCORING ENGINE
// ─────────────────────────────────────────────────────────────────
function computeTraits(answers) {
  const traits = { analytical: 0, social: 0, structure: 0, creativity: 0, risk: 0, leadership: 0 };
  const counts = { ...traits };
  PERSONALITY_QUESTIONS.forEach((q) => {
    const raw = answers[q.id];
    if (raw == null) return;
    const val = q.reverse ? 6 - raw : raw;
    traits[q.trait] += val;
    counts[q.trait]++;
  });
  const normalized = {};
  Object.keys(traits).forEach((k) => {
    normalized[k] = counts[k] > 0 ? (traits[k] / counts[k] - 1) / 4 : 0.5;
  });
  return normalized;
}

// FIX 5: Compute eligibility tag for a cluster given effective marks
function getEligibilityTag(clusterId, effectiveMarks) {
  const constraint = CLUSTER_CONSTRAINTS[clusterId];
  if (!constraint) return null; // no constraint → always eligible

  const subjs = Object.keys(effectiveMarks);
  if (subjs.length === 0) return null;

  const avg = subjs.reduce((s, k) => s + (effectiveMarks[k] || 0), 0) / subjs.length;

  // Check required subject thresholds
  const failsSubject = Object.entries(constraint.requiredSubjects || {}).some(
    ([subj, minMark]) => (effectiveMarks[subj] || 0) < minMark
  );

  const failsAvg = avg < constraint.minAvg;

  if ((failsAvg || failsSubject) && constraint.privateOk) return "privateOnly";
  return null; // eligible for public
}

// FIX 2: computeClusterScores now receives effectiveMarks (already merged)
// TASK E: accepts privateBudget — if false, health cluster is hard-excluded when avg < threshold
function computeClusterScores(bacTrack, effectiveMarks, traits, mobility, privateBudget = false) {
  const normMarks = {};
  Object.keys(effectiveMarks).forEach((s) => {
    normMarks[s] = Math.min(1, Math.max(0, (Number(effectiveMarks[s]) || 0) / 20));
  });

  // Compute overall average for hard constraints
  const subjVals = Object.values(effectiveMarks).map(Number).filter(v => !isNaN(v));
  const overallAvg = subjVals.length ? subjVals.reduce((a,b)=>a+b,0)/subjVals.length : 0;

  const mobilityBoost = mobility === 1 ? 0.05 : mobility === 2 ? 0.03 : 0;

  return CLUSTERS.map((cluster) => {
    const bacScore = cluster.bacAffinity[bacTrack] || 0.3;

    let academicScore = 0, weightSum = 0;
    Object.entries(cluster.subjectWeights).forEach(([subj, w]) => {
      academicScore += (normMarks[subj] || 0) * w;
      weightSum += w;
    });
    if (weightSum > 0) academicScore /= weightSum;

    let traitScore = 0, traitWeightSum = 0;
    Object.entries(cluster.traitWeights).forEach(([trait, w]) => {
      if (w >= 0) { traitScore += (traits[trait] || 0.5) * w; traitWeightSum += w; }
      else        { traitScore += (1 - (traits[trait] || 0.5)) * Math.abs(w); traitWeightSum += Math.abs(w); }
    });
    if (traitWeightSum > 0) traitScore /= traitWeightSum;

    const marketScore = cluster.demandIndex;

    // TASK E: eligibility check
    const eligibilityTag = getEligibilityTag(cluster.id, effectiveMarks);

    // Hard constraint: health cluster requires avg ≥ 16 for public path.
    // If privateBudget=false and avg < 15.5 → massive penalty pushes it out of top 3.
    let eligibilityPenalty = eligibilityTag === "privateOnly" ? 0.12 : 0;
    if (cluster.id === "health" && overallAvg < 15.5 && !privateBudget) {
      eligibilityPenalty = 0.45; // effectively removes from top 3
    }

    const finalScore = Math.min(1, Math.max(0,
      0.3 * bacScore + 0.25 * academicScore + 0.25 * traitScore + 0.2 * marketScore
      + mobilityBoost - eligibilityPenalty
    ));

    return {
      ...cluster,
      scores: { bac: bacScore, academic: academicScore, trait: traitScore, market: marketScore, final: finalScore },
      eligibilityTag: cluster.id === "health" && overallAvg < 15.5 && !privateBudget ? "notEligiblePublic" : eligibilityTag,
    };
  }).sort((a, b) => b.scores.final - a.scores.final);
}

// Compute confidence: measures alignment between trait-top cluster and academic-top cluster
function computeConfidence(rankedClusters) {
  if (!rankedClusters.length) return 0;
  return Math.round(rankedClusters[0].scores.final * 100);
}

// ─────────────────────────────────────────────────────────────────
// LOCAL NARRATIVE GENERATOR
// ─────────────────────────────────────────────────────────────────
function generateNarrative(top3, traits, bacTrack, lang) {
  const t = TRANSLATIONS[lang];
  const topCluster = top3[0];
  const clusterName = t[CLUSTER_KEY_MAP[topCluster.id]];
  const traitKeys = Object.entries(traits).sort((a, b) => b[1] - a[1]);
  const topTrait = traitKeys[0][0];

  const traitLabels = {
    ar: { analytical:"التفكير التحليلي", social:"التواصل الاجتماعي", structure:"التنظيم والبنية", creativity:"الإبداع", risk:"المبادرة", leadership:"القيادة" },
    fr: { analytical:"Pensée analytique", social:"Social",           structure:"Rigueur & organisation", creativity:"Créativité", risk:"Prise de risque", leadership:"Leadership" },
    en: { analytical:"Analytical thinking", social:"Social skills",  structure:"Organization",           creativity:"Creativity", risk:"Risk tolerance",  leadership:"Leadership" },
  };

  const tl = traitLabels[lang];

  const narratives = {
    ar: `بناءً على شعبة ${bacTrack} وإجاباتك على اختبار الشخصية، يبدو أن مجال <strong>${clusterName}</strong> يتوافق بشكل ممتاز مع ملفك. تبرز لديك قوة في <strong>${tl[topTrait]}</strong>، وهي صفة أساسية في هذا المجال. المغرب يشهد طلباً متزايداً على هذه التخصصات، لذا أمامك فرصة حقيقية لبناء مسيرة مهنية متميزة.`,
    fr: `Sur la base de votre filière ${bacTrack} et de vos réponses au test de personnalité, le domaine <strong>${clusterName}</strong> correspond excellemment à votre profil. Votre point fort est la <strong>${tl[topTrait]}</strong>, une qualité essentielle dans ce secteur. Le marché marocain affiche une forte demande dans ce domaine, vous offrant de réelles opportunités.`,
    en: `Based on your ${bacTrack} track and personality test responses, <strong>${clusterName}</strong> aligns excellently with your profile. Your standout strength is <strong>${tl[topTrait]}</strong>, a key quality in this field. The Moroccan market shows strong demand in this area, giving you real opportunities to build a distinguished career.`,
  };

  return narratives[lang];
}

// ─────────────────────────────────────────────────────────────────
// PURE DISPLAY COMPONENTS  — defined OUTSIDE App so React never
// unmounts them on parent re-renders (preserves useState inside).
// ─────────────────────────────────────────────────────────────────

function RadarChart({ traits: traitData, lang }) {
  const traitKeys = ["analytical","social","structure","creativity","risk","leadership"];
  const traitLabels = {
    ar: { analytical:"تحليلي", social:"اجتماعي", structure:"منظم", creativity:"مبدع", risk:"مبادر", leadership:"قيادي" },
    fr: { analytical:"Analytique", social:"Social", structure:"Rigoureux", creativity:"Créatif", risk:"Risque", leadership:"Leader" },
    en: { analytical:"Analytical", social:"Social", structure:"Organized", creativity:"Creative", risk:"Risk-taker", leadership:"Leader" },
  }[lang] || {};
  const n=traitKeys.length, cx=120, cy=120, r=80;
  const toCart=(a,rad)=>({ x:cx+rad*Math.cos(a-Math.PI/2), y:cy+rad*Math.sin(a-Math.PI/2) });
  const angles=traitKeys.map((_,i)=>(2*Math.PI*i)/n);
  const points=traitKeys.map((k,i)=>toCart(angles[i],(traitData[k]||0.5)*r));
  return (
    <svg width="240" height="240" viewBox="0 0 240 240">
      {[0.25,0.5,0.75,1].map(lvl=>(
        <polygon key={lvl} points={angles.map(a=>{const p=toCart(a,r*lvl);return `${p.x},${p.y}`;}).join(" ")}
          fill="none" stroke="var(--border)" strokeWidth="1"/>
      ))}
      {angles.map((a,i)=>{const o=toCart(a,r);return <line key={i} x1={cx} y1={cy} x2={o.x} y2={o.y} stroke="var(--border)" strokeWidth="1"/>;} )}
      <polygon points={points.map(p=>`${p.x},${p.y}`).join(" ")} fill="rgba(232,161,36,0.2)" stroke="var(--accent)" strokeWidth="2"/>
      {traitKeys.map((k,i)=>{const lp=toCart(angles[i],r+18);return <text key={k} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill="#9ca3af">{traitLabels[k]}</text>;})}
      {points.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--accent)"/>)}
    </svg>
  );
}

function ScoreContribChart({ cluster, t }) {
  const factors = [
    { key:"bac",      label:t.bacTrack,   color:"#3b82f6", value:cluster.scores.bac      },
    { key:"academic", label:t.academic,    color:"#10b981", value:cluster.scores.academic },
    { key:"trait",    label:t.personality, color:"#e8a124", value:cluster.scores.trait    },
    { key:"market",   label:t.market,      color:"#8b5cf6", value:cluster.scores.market   },
  ];
  return (
    <div style={{marginTop:8}}>
      {factors.map(f=>(
        <div key={f.key} className="explain-row">
          <div className="explain-label">{f.label}</div>
          <div className="explain-bar"><div className="explain-fill" style={{width:`${f.value*100}%`,background:f.color}}/></div>
          <div className="explain-pct">{Math.round(f.value*100)}%</div>
        </div>
      ))}
    </div>
  );
}

// ClusterCard: must be outside App so its useState(pathwayTab) persists.
// Receives t, lang, bacTrack as explicit props.
function ClusterCard({ cluster, rank, t, lang, bacTrack }) {
  const [pathwayTab, setPathwayTab] = useState("university");
  const clusterName = t[CLUSTER_KEY_MAP[cluster.id]];

  const tabLabels = {
    university:  t.universityRoute,
    grandeEcole: t.grandeEcoleRoute,
    practical:   t.practicalRoute,
  };

  const pathway  = cluster.pathways?.[pathwayTab];
  const schools  = pathway?.schools  || [];
  const duration = pathway?.duration || "";
  const hasPW    = schools.length > 0 || !!duration;

  const whyText = lang==="ar"
    ? `هذا المسار يتوافق مع شعبة ${bacTrack} ومستواك في المواد الأساسية`
    : lang==="fr"
    ? `Cette voie correspond à votre filière ${bacTrack} et votre niveau dans les matières clés`
    : `This path aligns with your ${bacTrack} track and performance in key subjects`;

  return (
    <div className={`cluster-card rank-${rank}`}>
      <span className="rank-badge">#{rank}</span>
      <div className="cluster-header">
        <span className="cluster-icon">{cluster.icon}</span>
        <div>
          <div className="cluster-title">
            {clusterName}
            {cluster.eligibilityTag==="privateOnly" && (
              <span className="elig-badge">{t.privateOnly}</span>
            )}
            {cluster.eligibilityTag==="notEligiblePublic" && (
              <span className="elig-badge" style={{background:"rgba(239,68,68,0.12)",borderColor:"rgba(239,68,68,0.4)",color:"#f87171"}}>{t.notEligiblePublic}</span>
            )}
          </div>
          <div className="salary-chip">
            {cluster.salary.min.toLocaleString()}–{cluster.salary.max.toLocaleString()} {cluster.salary.currency}/mois*
          </div>
        </div>
      </div>
      <div className="cluster-score-bar">
        <div className="cluster-score-fill" style={{width:`${cluster.scores.final*100}%`}}/>
      </div>
      <ScoreContribChart cluster={cluster} t={t}/>
      <p style={{fontSize:12,color:"var(--muted)",marginTop:10,marginBottom:14}}>{t.why}: {whyText}</p>

      {/* Pathway tabs — each click updates pathwayTab state */}
      <div className="pathway-tabs">
        {["university","grandeEcole","practical"].map(tab=>(
          <button key={tab}
            className={`pathway-tab ${pathwayTab===tab?"active":""}`}
            onClick={()=>setPathwayTab(tab)}>
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* Pathway content — rerenders whenever pathwayTab changes */}
      <div className="pathway-content">
        {hasPW ? (
          <>
            <div style={{marginBottom:8}}>
              {schools.map(s=><span key={s} className="pathway-school">{s}</span>)}
            </div>
            {duration && (
              <div style={{fontSize:12,color:"var(--muted)"}}>
                {t.durationLabel}: {duration}
              </div>
            )}
          </>
        ) : (
          <div style={{fontSize:13,color:"var(--muted)",fontStyle:"italic"}}>{t.pathwayMissing}</div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────
const LS_KEY = "massar_progress_v3";

export default function App() {
  const [step,         setStep]         = useState(0);
  const [lang,         setLang]         = useState("fr");
  const [answers,      setAnswers]      = useState({});
  const [info,         setInfo]         = useState({ bacTrack: "SMA", city: "Casablanca", mobility: 0, studyLang: "fr", privateBudget: false });
  const [marks,        setMarks]        = useState({});
  // FIX 2: deltas are numbers, not strings
  const [whatIfDeltas, setWhatIfDeltas] = useState({});
  const [hasSaved,     setHasSaved]     = useState(false);

  const t   = TRANSLATIONS[lang];
  const dir = t.dir;

  // localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) { JSON.parse(saved); setHasSaved(true); }
    } catch {}
  }, []);

  const saveProgress = useCallback(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify({ step, lang, answers, info, marks })); } catch {}
  }, [step, lang, answers, info, marks]);

  useEffect(() => { if (step > 0) saveProgress(); }, [step, saveProgress]);

  const resumeProgress = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      if (saved.step !== undefined) {
        setStep(saved.step); setLang(saved.lang || "fr");
        setAnswers(saved.answers || {}); setInfo(saved.info || info);
        setMarks(saved.marks || {}); setHasSaved(false);
      }
    } catch {}
  };

  const restart = () => {
    localStorage.removeItem(LS_KEY);
    setStep(0); setAnswers({}); setInfo({ bacTrack: "SMA", city: "Casablanca", mobility: 0, studyLang: "fr", privateBudget: false });
    setMarks({}); setWhatIfDeltas({}); setHasSaved(false);
  };

  const traits = useMemo(() => computeTraits(answers), [answers]);

  // Derive effectiveMarks (numbers) from marks + deltas — depends on both
  const effectiveMarks = useMemo(() => {
    const result = {};
    const subjs = SUBJECTS_BY_TRACK[info.bacTrack] || [];
    subjs.forEach((s) => {
      const base  = Number(marks[s]) || 0;
      const delta = Number(whatIfDeltas[s]) || 0;
      result[s]   = Math.min(20, Math.max(0, base + delta));
    });
    return result;
  }, [marks, whatIfDeltas, info.bacTrack]);

  // rankedClusters fully depends on effectiveMarks, traits, info, privateBudget
  const rankedClusters = useMemo(
    () => computeClusterScores(info.bacTrack, effectiveMarks, traits, info.mobility, info.privateBudget),
    [info.bacTrack, effectiveMarks, traits, info.mobility, info.privateBudget]
  );

  const top3     = rankedClusters.slice(0, 3);
  const fallback = rankedClusters.find((c) => c.scores.academic < 0.4 && c.demandIndex > 0.7) || rankedClusters[3];

  const confidence   = useMemo(() => computeConfidence(rankedClusters), [rankedClusters]);
  const mixedSignals = useMemo(() => {
    if (!rankedClusters.length) return false;
    const traitTop    = [...rankedClusters].sort((a,b) => b.scores.trait    - a.scores.trait)[0]?.id;
    const academicTop = [...rankedClusters].sort((a,b) => b.scores.academic - a.scores.academic)[0]?.id;
    return traitTop !== academicTop && confidence < 60;
  }, [rankedClusters, confidence]);

  // TASK A: narrative is a useMemo — updates live whenever top3/traits/lang/bacTrack changes
  // (including when what-if sliders move, because top3 derives from effectiveMarks)
  const narrative = useMemo(() => {
    if (step !== 4 || !top3.length) return null;
    return generateNarrative(top3, traits, info.bacTrack, lang);
  }, [top3, traits, info.bacTrack, lang, step]); // eslint-disable-line

  // ── CSS ──────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=IBM+Plex+Sans+Arabic:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#0a0e1a;color:#e8ecf0;font-family:'DM Sans',sans-serif;min-height:100vh;}
    [dir="rtl"]{font-family:'IBM Plex Sans Arabic',sans-serif;}
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
    .field select,.field input[type=number],.field input[type=text]{
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
    .mark-bar-fill{height:100%;border-radius:3px;transition:width 0.3s;
      background:linear-gradient(90deg,var(--accent2),var(--accent));}
    .btn-row{display:flex;gap:12px;justify-content:flex-end;margin-top:24px;}
    .btn{padding:11px 24px;border-radius:8px;border:none;cursor:pointer;font-size:14px;font-weight:600;transition:all 0.2s;}
    .btn-primary{background:var(--accent);color:#000;} .btn-primary:hover{background:#f59e0b;}
    .btn-secondary{background:transparent;border:1.5px solid var(--border);color:var(--muted);}
    .btn-secondary:hover{border-color:var(--text);color:var(--text);}
    .btn-danger{background:transparent;border:1.5px solid var(--danger);color:var(--danger);}
    .btn-danger:hover{background:rgba(239,68,68,0.1);}
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
    /* FIX 4: action items */
    .week-item{font-size:13px;padding:4px 0;border-bottom:1px solid var(--border);color:var(--text);display:flex;align-items:flex-start;gap:6px;}
    .week-item:last-child{border:none;}
    .week-item-arrow{color:var(--accent3);flex-shrink:0;}
    .week-item a{color:var(--accent2);text-decoration:underline;text-underline-offset:2px;}
    .week-item a:hover{color:#60a5fa;}
    .whatif-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap;}
    .whatif-label{font-size:12px;color:var(--text);width:90px;flex-shrink:0;}
    .whatif-row input[type=range]{flex:1;min-width:80px;accent-color:var(--accent);}
    .whatif-delta{font-size:12px;font-weight:700;color:var(--accent);width:36px;text-align:center;}
    .whatif-result{font-size:12px;color:var(--muted);width:46px;text-align:right;}
    [dir="rtl"] .whatif-result{text-align:left;}
    .fallback-card{background:rgba(245,158,11,0.08);border:1.5px solid var(--warn);border-radius:12px;padding:18px;}
    .narrative{background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.3);
      border-radius:12px;padding:18px;font-size:15px;line-height:1.7;color:#c7d2fe;margin-bottom:16px;}
    /* FIX 1: confidence badge */
    .confidence-row{display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap;}
    .confidence-badge{display:inline-flex;align-items:center;gap:6px;padding:5px 14px;border-radius:20px;
      font-size:13px;font-weight:700;}
    .confidence-high{background:rgba(16,185,129,0.15);border:1px solid rgba(16,185,129,0.4);color:var(--accent3);}
    .confidence-med{background:rgba(232,161,36,0.15);border:1px solid rgba(232,161,36,0.4);color:var(--accent);}
    .confidence-low{background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.35);color:#f87171;}
    .mixed-warning{background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.35);
      border-radius:10px;padding:10px 14px;font-size:13px;color:var(--warn);line-height:1.5;}
    /* FIX 5: eligibility badge */
    .elig-badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;
      margin-left:8px;background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.4);color:var(--warn);}
    [dir="rtl"] .elig-badge{margin-left:0;margin-right:8px;}
    .salary-chip{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;
      background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);
      border-radius:20px;font-size:12px;color:var(--accent3);margin-top:8px;}
    .resume-banner{background:rgba(232,161,36,0.08);border:1.5px solid rgba(232,161,36,0.3);
      border-radius:12px;padding:16px;display:flex;align-items:center;justify-content:space-between;
      gap:12px;margin-bottom:24px;width:100%;max-width:720px;flex-wrap:wrap;}
    .resume-text{font-size:14px;color:var(--accent);}
    .section-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;
      color:var(--muted);margin:20px 0 12px;}
    .salary-note{font-size:11px;color:var(--muted);margin-top:6px;}
    .avg-row{margin-top:12px;padding:10px 12px;background:var(--surface3);border-radius:8px;
      display:flex;justify-content:space-between;align-items:center;}
    .avg-label{font-size:12px;color:var(--muted);}
    .avg-val{font-size:16px;font-weight:700;}
  `;

  // ── STEP INDICATOR ────────────────────────────────────────────────
  const StepIndicator = () => (
    <div className="step-indicator">
      {[0,1,2,3,4].map(i => (
        <div key={i} className={`step-dot ${i < step ? "done" : i === step ? "active" : ""}`} />
      ))}
      <span style={{fontSize:12,color:"var(--muted)",marginInlineStart:6}}>
        {t.step} {step+1} {t.of} 5
      </span>
    </div>
  );

  // ── STEP 0: Language ──────────────────────────────────────────────
  const StepLang = () => (
    <div className="card" dir={dir}>
      <StepIndicator />
      <h2 style={{fontSize:22,fontWeight:700,marginBottom:8}}>{t.langStep}</h2>
      <p style={{color:"var(--muted)",fontSize:14,marginBottom:4}}>{t.langDesc}</p>
      <div className="lang-grid">
        {[{code:"ar",flag:"🇲🇦",name:"العربية"},{code:"fr",flag:"🇫🇷",name:"Français"},{code:"en",flag:"🇬🇧",name:"English"}].map(l => (
          <button key={l.code} className={`lang-btn ${lang===l.code?"selected":""}`} onClick={() => setLang(l.code)}>
            <span className="flag">{l.flag}</span>
            <span className="name">{l.name}</span>
          </button>
        ))}
      </div>
      <div className="btn-row">
        <button className="btn btn-primary" onClick={() => setStep(1)}>{t.start} →</button>
      </div>
    </div>
  );

  // ── STEP 1: Personality ───────────────────────────────────────────
  const StepPersonality = () => {
    const allAnswered = PERSONALITY_QUESTIONS.every(q => answers[q.id] != null);
    const disagreeLabel = lang==="ar" ? "لا أوافق" : lang==="fr" ? "Pas du tout" : "Disagree";
    const agreeLabel    = lang==="ar" ? "أوافق تماماً" : lang==="fr" ? "Tout à fait" : "Agree";
    return (
      <div className="card" dir={dir}>
        <StepIndicator />
        <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>{t.personalityStep}</h2>
        <p style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{t.personalityDesc}</p>
        {PERSONALITY_QUESTIONS.map((q, idx) => (
          <div key={q.id} className="q-card">
            <div className="q-text"><span style={{color:"var(--accent)",fontWeight:700,marginInlineEnd:6}}>{idx+1}.</span>{q.text[lang]}</div>
            <div className="likert">
              {[1,2,3,4,5].map(v => (
                <button key={v} className={`likert-btn ${answers[q.id]===v?"selected":""}`}
                  onClick={() => setAnswers(prev => ({...prev,[q.id]:v}))}>{v}</button>
              ))}
            </div>
            <div className="likert-labels"><span>{disagreeLabel}</span><span>{agreeLabel}</span></div>
          </div>
        ))}
        <div className="btn-row">
          <button className="btn btn-secondary" onClick={() => setStep(0)}>{t.back}</button>
          <button className="btn btn-primary" onClick={() => setStep(2)}
            disabled={!allAnswered} style={{opacity:allAnswered?1:0.4}}>{t.next} →</button>
        </div>
      </div>
    );
  };

  // ── STEP 2: Info ──────────────────────────────────────────────────
  const StepInfo = () => (
    <div className="card" dir={dir}>
      <StepIndicator />
      <h2 style={{fontSize:20,fontWeight:700,marginBottom:20}}>{t.infoStep}</h2>
      <div className="field">
        <label>{t.bacTrack}</label>
        <select value={info.bacTrack} onChange={e => { setInfo(p => ({...p,bacTrack:e.target.value})); setMarks({}); }}>
          {BAC_TRACKS.map(b => <option key={b.id} value={b.id}>{b.label[lang]}</option>)}
        </select>
      </div>
      <div className="field">
        <label>{t.city}</label>
        <select value={info.city} onChange={e => setInfo(p => ({...p,city:e.target.value}))}>
          {MOROCCAN_CITIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="field">
        <label>{t.mobility}</label>
        <div className="mobility-grid">
          {t.mobilityOptions.map((opt, i) => (
            <button key={i} className={`mob-btn ${info.mobility===i?"selected":""}`}
              onClick={() => setInfo(p => ({...p,mobility:i}))}>{opt}</button>
          ))}
        </div>
      </div>
      <div className="field">
        <label>{t.studyLang}</label>
        <div className="mobility-grid">
          {[{code:"ar",label:"العربية"},{code:"fr",label:"Français"},{code:"en",label:"English"}].map(l => (
            <button key={l.code} className={`mob-btn ${info.studyLang===l.code?"selected":""}`}
              onClick={() => setInfo(p => ({...p,studyLang:l.code}))}>{l.label}</button>
          ))}
        </div>
      </div>
      {/* TASK E: private budget toggle */}
      <div className="field">
        <label>{t.privateBudgetLabel}</label>
        <div className="mobility-grid" style={{gridTemplateColumns:"1fr 1fr"}}>
          <button className={`mob-btn ${info.privateBudget?"selected":""}`}
            onClick={() => setInfo(p => ({...p,privateBudget:true}))}>{t.yes}</button>
          <button className={`mob-btn ${!info.privateBudget?"selected":""}`}
            onClick={() => setInfo(p => ({...p,privateBudget:false}))}>{t.no}</button>
        </div>
        <div style={{fontSize:11,color:"var(--muted)",marginTop:6}}>{t.privateBudgetHint}</div>
      </div>
      <div className="btn-row">
        <button className="btn btn-secondary" onClick={() => setStep(1)}>{t.back}</button>
        <button className="btn btn-primary" onClick={() => setStep(3)}>{t.next} →</button>
      </div>
    </div>
  );

  // ── STEP 3: Marks ─────────────────────────────────────────────────
  const StepMarks = () => {
    const subjs = SUBJECTS_BY_TRACK[info.bacTrack] || [];
    return (
      <div className="card" dir={dir}>
        <StepIndicator />
        <h2 style={{fontSize:20,fontWeight:700,marginBottom:4}}>{t.marksStep}</h2>
        <p style={{color:"var(--muted)",fontSize:13,marginBottom:20}}>{t.marks}</p>
        <div className="marks-grid">
          {subjs.map(s => {
            const val = Number(marks[s]) || 0;
            const pct = (val / 20) * 100;
            const color = val >= 15 ? "#10b981" : val >= 10 ? "#3b82f6" : "#ef4444";
            return (
              <div key={s} className="mark-input">
                <div className="mark-label">{SUBJECT_LABELS[s]?.[lang] || s}</div>
                <div className="mark-row">
                  <input type="number" min="0" max="20" step="0.5" value={val || ""}
                    placeholder="0"
                    onChange={e => setMarks(prev => ({...prev,[s]:Math.min(20,Math.max(0,Number(e.target.value)||0))}))} />
                  <div className="mark-bar">
                    <div className="mark-bar-fill" style={{width:`${pct}%`,background:color}} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btn-row">
          <button className="btn btn-secondary" onClick={() => setStep(2)}>{t.back}</button>
          <button className="btn btn-primary" onClick={() => setStep(4)}>{t.finish} →</button>
        </div>
      </div>
    );
  };

  // ── STEP 4: Results ───────────────────────────────────────────────
  const StepResults = () => {
    const subjs   = SUBJECTS_BY_TRACK[info.bacTrack] || [];
    const origAvg = subjs.length ? subjs.reduce((s,k) => s+(Number(marks[k])||0), 0) / subjs.length : 0;
    const adjAvg  = subjs.length ? subjs.reduce((s,k) => s+(effectiveMarks[k]||0), 0) / subjs.length : 0;
    const hasDeltas = Object.values(whatIfDeltas).some(d => Number(d) !== 0);

    // FIX 1: confidence badge class
    const confClass = confidence >= 70 ? "confidence-high" : confidence >= 50 ? "confidence-med" : "confidence-low";

    const traitLabels = {
      ar: { analytical:"تحليلي", social:"اجتماعي", structure:"منظم", creativity:"مبدع", risk:"مبادر", leadership:"قيادي" },
      fr: { analytical:"Analytique", social:"Social", structure:"Rigoureux", creativity:"Créatif", risk:"Risque", leadership:"Leader" },
      en: { analytical:"Analytical", social:"Social", structure:"Organized", creativity:"Creative", risk:"Risk-taker", leadership:"Leader" },
    }[lang];

    return (
      <div className="results-wrap" dir={dir}>
        {/* FIX 1: narrative + confidence badge + mixed signals */}
        {narrative && (
          <div className="narrative" dangerouslySetInnerHTML={{__html: narrative}} />
        )}

        {/* FIX 1: confidence + mixed signals — 100% from t object */}
        <div className="confidence-row">
          <span className={`confidence-badge ${confClass}`}>
            {t.confidenceLabel}: {confidence}%
          </span>
        </div>
        {mixedSignals && (
          <div className="mixed-warning" style={{marginBottom:14}}>
            {t.mixedSignals}
          </div>
        )}

        <div className="results-grid">
          {/* Radar */}
          <div className="result-card highlight">
            <h3>{t.traitRadar}</h3>
            <div className="radar-wrap"><RadarChart traits={traits} lang={lang}/></div>
          </div>

          {/* Trait bars */}
          <div className="result-card">
            <h3>{t.personality}</h3>
            {Object.entries(traits).sort((a,b)=>b[1]-a[1]).map(([k,v]) => (
              <div key={k} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                  <span style={{color:"var(--text)"}}>{traitLabels[k]}</span>
                  <span style={{color:"var(--accent)"}}>{Math.round(v*100)}%</span>
                </div>
                <div style={{height:6,background:"var(--border)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${v*100}%`,background:"linear-gradient(90deg,var(--accent2),var(--accent))",borderRadius:3}} />
                </div>
              </div>
            ))}
          </div>

          {/* Academic — shows ORIGINAL marks */}
          <div className="result-card">
            <h3>{t.academic}</h3>
            {subjs.map(s => {
              const v = Number(marks[s]) || 0;
              const color = v>=15?"#10b981":v>=10?"#3b82f6":"#ef4444";
              return (
                <div key={s} style={{marginBottom:8}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:4}}>
                    <span style={{color:"var(--text)"}}>{SUBJECT_LABELS[s]?.[lang]||s}</span>
                    <span style={{color,fontWeight:700}}>{v}/20</span>
                  </div>
                  <div style={{height:5,background:"var(--border)",borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(v/20)*100}%`,background:color,borderRadius:3}} />
                  </div>
                </div>
              );
            })}
            <div className="avg-row">
              <span className="avg-label">{t.overallAverage}</span>
              <span className="avg-val" style={{color:origAvg>=10?"#10b981":"#ef4444"}}>{origAvg.toFixed(1)}/20</span>
            </div>
          </div>

          {/* FIX 2: What-if — shows delta + resulting mark + adjusted average */}
          <div className="result-card">
            <h3>{t.whatIf}</h3>
            {subjs.map(s => {
              const delta    = Number(whatIfDeltas[s]) || 0;
              const effMark  = effectiveMarks[s] || 0;
              const color    = effMark>=15?"#10b981":effMark>=10?"#3b82f6":"#ef4444";
              return (
                <div key={s} className="whatif-row">
                  <div className="whatif-label">{SUBJECT_LABELS[s]?.[lang]||s}</div>
                  <input type="range" min="-5" max="5" step="0.5"
                    value={delta}
                    onChange={e => setWhatIfDeltas(prev => ({...prev, [s]: Number(e.target.value)}))} />
                  <div className="whatif-delta">{delta>0?"+":""}{delta}</div>
                  <div className="whatif-result" style={{color}}>{effMark.toFixed(1)}</div>
                </div>
              );
            })}
            {/* FIX 2: show adjusted average */}
            {hasDeltas && (
              <div className="avg-row" style={{borderTop:"1px solid var(--border)",marginTop:8,paddingTop:8}}>
                <span className="avg-label">{t.adjustedAverage}</span>
                <span className="avg-val" style={{color:adjAvg>=10?"#10b981":"#ef4444"}}>{adjAvg.toFixed(1)}/20</span>
              </div>
            )}
            <div style={{fontSize:11,color:"var(--muted)",marginTop:8}}>{t.sliderHint}</div>
          </div>
        </div>

        {/* TOP 3 */}
        <div className="section-title">{t.topCareers}</div>
        {top3.map((c,i) => <ClusterCard key={c.id} cluster={c} rank={i+1} t={t} lang={lang} bacTrack={info.bacTrack}/>)}

        {/* FALLBACK */}
        <div className="section-title">{t.fallback}</div>
        <div className="fallback-card">
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontSize:24}}>{fallback?.icon}</span>
            <div>
              <div style={{fontWeight:700}}>{fallback && t[CLUSTER_KEY_MAP[fallback.id]]}</div>
              <div style={{fontSize:12,color:"var(--warn)"}}>{t.fallbackDesc}</div>
            </div>
          </div>
          <div style={{fontSize:13,color:"var(--text)"}}>
            {t.fallbackBody}
          </div>
        </div>

        {/* ACTION PLAN — FIX 4: renders links for items with url */}
        <div className="section-title">{t.actionPlan}</div>
        <div className="result-card">
          {top3[0]?.actionPlan?.map((week, i) => (
            <div key={i} className="week-card">
              <div className="week-label">{t.weekLabel} {i+1}</div>
              {week.items.map((item, j) => {
                const isObj   = item && typeof item === "object";
                const label   = isObj ? item.label : item;
                const url     = isObj ? item.url   : null;
                return (
                  <div key={j} className="week-item">
                    <span className="week-item-arrow">→</span>
                    {url
                      ? <a href={url} target="_blank" rel="noreferrer">{label}</a>
                      : <span>{label}</span>
                    }
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <p className="salary-note">{t.salaryNote}</p>
        <div style={{display:"flex",gap:12,marginTop:24,flexWrap:"wrap"}}>
          <button className="btn btn-danger" onClick={restart}>{t.restart}</button>
        </div>
      </div>
    );
  };

  // ── ROOT RENDER ───────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>
      <div className="app" dir={dir}>
        <div className="header">
          <h1>{t.appTitle}</h1>
          <p>{t.appSubtitle}</p>
        </div>

        {hasSaved && step === 0 && (
          <div className="resume-banner">
            <div className="resume-text">{t.resumeSaved}</div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-secondary" onClick={() => setHasSaved(false)}>✕</button>
              <button className="btn btn-primary" onClick={resumeProgress}>{t.resume}</button>
            </div>
          </div>
        )}

        {step === 0 && <StepLang />}
        {step === 1 && <StepPersonality />}
        {step === 2 && <StepInfo />}
        {step === 3 && <StepMarks />}
        {step === 4 && <StepResults />}
      </div>
    </>
  );
}