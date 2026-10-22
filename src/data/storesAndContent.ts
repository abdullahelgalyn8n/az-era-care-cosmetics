export interface BranchItem {
  id: string;
  addressAr: string;
  addressEn: string;
  phones: string[];
}

export interface GovernorateStores {
  id: string;
  nameAr: string;
  nameEn: string;
  branchCount: number;
  branches: BranchItem[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  dateDay: string;
  dateMonth: string;
  fullDate: string;
  author: string;
  image: string;
  excerpt: string;
  excerptAr: string;
  content: string[];
  contentAr: string[];
  commentsCount: number;
}

export interface JourneyStep {
  year: string;
  yearEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  iconType: 'sprout' | 'users' | 'trending' | 'factory' | 'trophy' | 'rocket';
}

export const GOVERNORATES_STORES: GovernorateStores[] = [
  {
    id: 'sohag',
    nameAr: 'سوهاج',
    nameEn: 'Sohag',
    branchCount: 7,
    branches: [
      {
        id: 'sohag-1',
        addressAr: 'أخميم شرق أمام البريد',
        addressEn: 'Akhmim East, in front of the Post Office',
        phones: ['01103700411'],
      },
      {
        id: 'sohag-2',
        addressAr: 'أخميم دائري الخطيب بجوار صيدلية يحيى',
        addressEn: 'Akhmim El-Khatib Ring Rd, next to Yahya Pharmacy',
        phones: ['01123691882'],
      },
      {
        id: 'sohag-3',
        addressAr: 'الأرقم شارع عبدالفتاح سليم',
        addressEn: 'Al-Arqam, Abdel Fattah Selim St.',
        phones: ['01123691882'],
      },
      {
        id: 'sohag-4',
        addressAr: 'الشهيد شارع رمضان نصر',
        addressEn: 'Al-Shaheed, Ramadan Nasr St.',
        phones: ['01286916911'],
      },
      {
        id: 'sohag-5',
        addressAr: 'طهطا شارع مصطفى محمود',
        addressEn: 'Tahta, Mostafa Mahmoud St.',
        phones: ['01010133649'],
      },
      {
        id: 'sohag-6',
        addressAr: 'المنشاة شارع بنك إسكندرية',
        addressEn: 'El-Monshah, Bank of Alexandria St.',
        phones: ['01149559004'],
      },
      {
        id: 'sohag-7',
        addressAr: 'المراغة ش المدارس أمام الإدارة التعليمية',
        addressEn: 'El-Maragha, Schools St., opposite Educational Admin',
        phones: ['01015598842'],
      },
    ],
  },
  {
    id: 'cairo',
    nameAr: 'القاهرة',
    nameEn: 'Cairo',
    branchCount: 6,
    branches: [
      {
        id: 'cairo-1',
        addressAr: 'المعادي - 62 شارع 9 بجوار بن أبو عوف',
        addressEn: 'Maadi — 62 Street 9, next to Abu Auf',
        phones: ['01149558775'],
      },
      {
        id: 'cairo-2',
        addressAr: 'المقطم - شارع 9 ميدان النافورة أمام محل بلبن',
        addressEn: 'Mokattam — Street 9, El-Nafoura Sq., opposite B.Laban',
        phones: ['01127111941'],
      },
      {
        id: 'cairo-3',
        addressAr: 'سيتي ستارز - مدينة نصر الدور الأول المرحلة الثانية أمام ماكس',
        addressEn: 'City Stars Mall — Nasr City, First Floor Phase 2, opposite Max',
        phones: ['01118859895'],
      },
      {
        id: 'cairo-4',
        addressAr: 'محطة مترو ألف مسكن',
        addressEn: 'Alf Maskan Metro Station',
        phones: ['01282145205'],
      },
      {
        id: 'cairo-5',
        addressAr: 'داخل محطة مترو روض الفرج',
        addressEn: 'Inside Rod El-Farag Metro Station',
        phones: ['01282145205'],
      },
      {
        id: 'cairo-6',
        addressAr: 'حلمية الزيتون ش ترعة الجبل بجوار جملة ماركت',
        addressEn: 'Helmeya El-Zaytoun, Teraat El-Gabal St., next to Gomla Market',
        phones: ['01131288175'],
      },
    ],
  },
  {
    id: 'giza',
    nameAr: 'الجيزة',
    nameEn: 'Giza',
    branchCount: 4,
    branches: [
      {
        id: 'giza-1',
        addressAr: 'فيصل التعاون بجانب وزير الحلو',
        addressEn: 'Faisal — El-Taawon, beside Wazir El-Helw',
        phones: ['01116658834'],
      },
      {
        id: 'giza-2',
        addressAr: 'محطة مترو الدقي والعتبة',
        addressEn: 'Dokki & Attaba Metro Station Mall',
        phones: ['01282145205'],
      },
      {
        id: 'giza-3',
        addressAr: 'الزمالك محطة مترو صفاء حجازي',
        addressEn: 'Zamalek — Safaa Hegazy Metro Station',
        phones: ['01282145205'],
      },
      {
        id: 'giza-4',
        addressAr: 'حدائق الأهرام ع 8 البوابة الأولى شارع الجيش',
        addressEn: 'Hadayek El-Ahram — Bldg 8, Gate 1, El-Geish St.',
        phones: ['01127111435'],
      },
    ],
  },
  {
    id: 'alexandria',
    nameAr: 'الإسكندرية',
    nameEn: 'Alexandria',
    branchCount: 4,
    branches: [
      {
        id: 'alex-1',
        addressAr: 'السيوف شماعة بجوار طأطأ في جادي',
        addressEn: 'El-Soyouf Shamaa, beside Tata in Gady',
        phones: ['01065281823'],
      },
      {
        id: 'alex-2',
        addressAr: 'سبورتنج شارع بورسعيد أمام صيدناوي والخيال',
        addressEn: 'Sporting — Port Said St., opposite Sednawy & El-Khayal',
        phones: ['01066440202'],
      },
      {
        id: 'alex-3',
        addressAr: 'المندرة ش جمال عبد الناصر قبل حسني للمشويات',
        addressEn: 'El-Mandara — Gamal Abdel Nasser St., before Hosny Grill',
        phones: ['01116658757'],
      },
      {
        id: 'alex-4',
        addressAr: 'سموحة ش الفتح متفرع من ش الشرطة العسكرية أمام جوي صالون',
        addressEn: 'Smouha — El-Fath St. off Military Police St., opposite Joy Salon',
        phones: ['01041108797'],
      },
    ],
  },
  {
    id: 'qena',
    nameAr: 'قنا',
    nameEn: 'Qena',
    branchCount: 1,
    branches: [
      {
        id: 'qena-1',
        addressAr: 'شارع النساجون في اتجاه كوبري دندرة جنب البنك الأهلي وبجوار كافيه ماراندا',
        addressEn: 'El-Nassagoun St. towards Dandara Bridge, beside National Bank of Egypt',
        phones: ['01060983325'],
      },
    ],
  },
  {
    id: 'luxor',
    nameAr: 'الأقصر',
    nameEn: 'Luxor',
    branchCount: 1,
    branches: [
      {
        id: 'luxor-1',
        addressAr: 'شارع الطيب متفرع من التليفزيون',
        addressEn: 'El-Tayeb St., off Television St.',
        phones: ['01040330932'],
      },
    ],
  },
  {
    id: 'assiut',
    nameAr: 'أسيوط',
    nameEn: 'Assiut',
    branchCount: 2,
    branches: [
      {
        id: 'assiut-1',
        addressAr: 'شارع الجمهورية بجوار بنك القاهرة',
        addressEn: 'El-Gomhouria St., beside Banque du Caire',
        phones: ['01034313581'],
      },
      {
        id: 'assiut-2',
        addressAr: 'ديروط مستشفى الحميات أمام عطارة أولاد رجب',
        addressEn: 'Dayrout — Fever Hospital St., opposite Awlad Ragab',
        phones: ['01036765436'],
      },
    ],
  },
  {
    id: 'dakahlia',
    nameAr: 'الدقهلية',
    nameEn: 'Dakahlia',
    branchCount: 3,
    branches: [
      {
        id: 'dak-1',
        addressAr: 'مركز ميت غمر شارع سعد زغلول بجوار حلواني القدس',
        addressEn: 'Mit Ghamr — Saad Zaghloul St., beside Al-Quds Pastry',
        phones: ['01096433371'],
      },
      {
        id: 'dak-2',
        addressAr: 'المنصورة: مول جيهان شارع منتصر متفرع من ش الجلاء',
        addressEn: 'Mansoura — Gehan Mall, Montasser St. off El-Galaa St.',
        phones: ['01096433371'],
      },
      {
        id: 'dak-3',
        addressAr: 'السنبلاوين: حي السبوعة أمام مائدة كل ساعة',
        addressEn: 'Sinbillawin — El-Saboua District',
        phones: ['01096433371'],
      },
    ],
  },
  {
    id: 'beheira',
    nameAr: 'البحيرة',
    nameEn: 'Beheira',
    branchCount: 2,
    branches: [
      {
        id: 'beh-1',
        addressAr: 'دمنهور أمام مسجد الهداية',
        addressEn: 'Damanhour — In front of Al-Hidaya Mosque',
        phones: ['01286044437', '01004764610'],
      },
      {
        id: 'beh-2',
        addressAr: 'المحمودية أمام النافورة',
        addressEn: 'El-Mahmoudia — In front of the Fountain',
        phones: ['01286044437'],
      },
    ],
  },
  {
    id: 'sharqia',
    nameAr: 'الشرقية',
    nameEn: 'Sharqia',
    branchCount: 1,
    branches: [
      {
        id: 'sharqia-1',
        addressAr: 'الزقازيق القومية شارع طلبة عويضة الشارع اللي على ناصيته محل توميتو للملابس',
        addressEn: 'Zagazig — El-Kawmia, Tolba Oweida St., corner of Tomato Store',
        phones: ['01024011522'],
      },
    ],
  },
  {
    id: 'damietta',
    nameAr: 'دمياط',
    nameEn: 'Damietta',
    branchCount: 2,
    branches: [
      {
        id: 'dam-1',
        addressAr: 'السرو الزرقا أمام المعهد الديني مباشرة',
        addressEn: 'El-Serw, El-Zarqa — Directly opposite the Religious Institute',
        phones: ['01069474550'],
      },
      {
        id: 'dam-2',
        addressAr: 'دمياط الجديدة المركزية ورا سيتي جراند مول بجوار ماركت زهران',
        addressEn: 'New Damietta Central — Behind City Grand Mall, beside Zahran Market',
        phones: ['01069474550'],
      },
    ],
  },
  {
    id: 'kafr-el-sheikh',
    nameAr: 'كفر الشيخ',
    nameEn: 'Kafr El-Sheikh',
    branchCount: 1,
    branches: [
      {
        id: 'kfs-1',
        addressAr: 'فوه خلف مدرسة فوه الثانوية المشتركة',
        addressEn: 'Fuwwah — Behind Fuwwah Secondary Co-ed School',
        phones: ['01019054017'],
      },
    ],
  },
  {
    id: 'fayoum',
    nameAr: 'الفيوم',
    nameEn: 'Fayoum',
    branchCount: 1,
    branches: [
      {
        id: 'fayoum-1',
        addressAr: 'كوبري المبيضة بجوار محل السلطان للأقمشة',
        addressEn: 'El-Mobayeda Bridge, beside El-Sultan Fabrics',
        phones: ['01000366293'],
      },
    ],
  },
  {
    id: 'gharbia',
    nameAr: 'الغربية',
    nameEn: 'Gharbia',
    branchCount: 3,
    branches: [
      {
        id: 'ghar-1',
        addressAr: 'طنطا تقاطع شارع بطرس مع السلطان مراد أمام مكتبة الزهراء',
        addressEn: 'Tanta — Botros St. & Sultan Murad intersection, opposite Al-Zahraa Bookstore',
        phones: ['01090487852'],
      },
      {
        id: 'ghar-2',
        addressAr: 'زفتى شارع الجمهورية بجوار الهدى والنور',
        addressEn: 'Zifta — El-Gomhouria St., beside El-Hoda Wa El-Nour',
        phones: ['01090487852'],
      },
      {
        id: 'ghar-3',
        addressAr: 'المحلة الكبرى شكري القوتلي الشارع اللي قدام الصياد أمام المصري بك',
        addressEn: 'El-Mahalla El-Kubra — Shokry El-Kwatly St., opposite El-Masry Bey',
        phones: ['01090487852'],
      },
    ],
  },
  {
    id: 'monufia',
    nameAr: 'المنوفية',
    nameEn: 'Monufia',
    branchCount: 2,
    branches: [
      {
        id: 'mon-1',
        addressAr: 'شبين الكوم شارع الجلاء البحري أمام ماركت خير زمان القديم',
        addressEn: 'Shebin El-Kom — El-Galaa El-Bahary St., opposite Old Kheir Zaman',
        phones: ['0207726048', '01000708271'],
      },
      {
        id: 'mon-2',
        addressAr: 'بركة السبع شرق شارع ضاحي الأصلي بجوار حامل المسك',
        addressEn: 'Berket El-Sabaa East — Dahi St., beside Hamel El-Musk',
        phones: ['01001189285'],
      },
    ],
  },
  {
    id: 'qalyubia',
    nameAr: 'القليوبية',
    nameEn: 'Qalyubia',
    branchCount: 1,
    branches: [
      {
        id: 'qal-1',
        addressAr: 'شبرا الخيمة شارع عرابي بجوار دندش داخل مول أهل مصر',
        addressEn: 'Shubra El-Kheima — Orabi St., inside Ahl Masr Mall',
        phones: ['01103640892'],
      },
    ],
  },
  {
    id: 'ismailia',
    nameAr: 'الإسماعيلية',
    nameEn: 'Ismailia',
    branchCount: 1,
    branches: [
      {
        id: 'ism-1',
        addressAr: 'شارع السلطان حسين مول إعمار',
        addressEn: 'Sultan Hussein St., Emaar Mall',
        phones: ['01061770612'],
      },
    ],
  },
  {
    id: 'minya',
    nameAr: 'المنيا',
    nameEn: 'Minya',
    branchCount: 1,
    branches: [
      {
        id: 'minya-1',
        addressAr: 'آخر شارع طه حسين الشارع اللي قدام راية ماركت بعد ستور علي بابا',
        addressEn: 'End of Taha Hussein St., opposite Raya Market after Ali Baba Store',
        phones: ['01028215217'],
      },
    ],
  },
  {
    id: 'aswan',
    nameAr: 'أسوان',
    nameEn: 'Aswan',
    branchCount: 1,
    branches: [
      {
        id: 'aswan-1',
        addressAr: 'صيدليات د. أدهم - وسط البلد',
        addressEn: 'Dr. Adham Pharmacies — Downtown Aswan',
        phones: ['01159121609', '01098185939'],
      },
    ],
  },
  {
    id: 'suez',
    nameAr: 'السويس',
    nameEn: 'Suez',
    branchCount: 1,
    branches: [
      {
        id: 'suez-1',
        addressAr: 'النمسا شارع قزاز فلسطين بجانب حمص زينب',
        addressEn: 'El-Nemsa — Palestine St., beside Homs Zeinab',
        phones: ['01011413592'],
      },
    ],
  },
  {
    id: 'port-said',
    nameAr: 'بورسعيد',
    nameEn: 'Port Said',
    branchCount: 1,
    branches: [
      {
        id: 'ps-1',
        addressAr: 'الشرق السواحل سوهو سكوير محل رقم 28 أمام قرية سيد أحمد للمشويات',
        addressEn: 'El-Sharq El-Sawahel, Soho Square Shop #28, opposite Sayed Ahmed Grill',
        phones: ['01200385777'],
      },
    ],
  },
];

export const FLAGSHIP_BRANCH_CARDS = [
  {
    id: 'sohag-branch',
    title: 'Sohag Branch',
    titleAr: 'فرع سوهاج الرئيسي',
    subtitle: '7 Locations across Sohag, Tahta & Akhmim',
    subtitleAr: '7 فروع في سوهاج وطهطا وأخميم والمنشاة',
    image: '/assets/extracted/brand/branch-1.jpg',
    govId: 'sohag',
    address: 'Mostafa Mahmoud St., Tahta & Akhmim East, Sohag',
    phone: '01070222665',
  },
  {
    id: 'alexandria-branch',
    title: 'Alexandria Branch',
    titleAr: 'فرع الإسكندرية',
    subtitle: 'Sporting, Smouha, Mandara & Soyouf',
    subtitleAr: 'سبورتنج، سموحة، المندرة والسيوف',
    image: '/assets/extracted/brand/branch-2.jpg',
    govId: 'alexandria',
    address: 'Port Said St., Sporting & Smouha El-Fath St., Alexandria',
    phone: '01066440202',
  },
  {
    id: 'cairo-branch',
    title: 'Cairo Branch',
    titleAr: 'فرع القاهرة',
    subtitle: 'Maadi, Mokattam, City Stars & Nasr City',
    subtitleAr: 'المعادي، المقطم، سيتي ستارز وألف مسكن',
    image: '/assets/extracted/brand/branch-3.jpg',
    govId: 'cairo',
    address: '62 Street 9 Maadi & City Stars Phase 2, Cairo',
    phone: '01149558775',
  },
  {
    id: 'other-branches',
    title: 'Other Branches',
    titleAr: 'باقي المحافظات',
    subtitle: 'Giza, Delta, Canal & Upper Egypt',
    subtitleAr: 'الجيزة والدلتا والقناة والصعيد (21 محافظة)',
    image: '/assets/extracted/brand/branch-4.jpg',
    govId: 'all',
    address: '39 Branches Nationwide Across Egypt',
    phone: '01070222665',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'the-science-behind-radiant-skin-why-quality-ingredients-matter',
    title: 'The Science Behind Radiant Skin: Why Quality Ingredients Matter',
    titleAr: 'العلم وراء البشرة المشرقة: لماذا تصنع جودة المكونات الفارق؟',
    category: 'CLEANSERS',
    categoryAr: 'المنظفات والغسول',
    dateDay: '27',
    dateMonth: 'AUG',
    fullDate: 'August 27, 2026',
    author: 'Eracare',
    image: '/assets/extracted/brand/blog-1.jpg',
    excerpt:
      'Discover how pH-balanced cleansers, pure Niacinamide, and multi-molecular Hyaluronic Acid work together to rebuild your skin barrier without stripping natural lipids.',
    excerptAr:
      'اكتشفي كيف تعمل المنظفات المتوازنة والنياسيناميد النقي وحمض الهيالورونيك على بناء حاجز البشرة الطبيعي ومنحك إشراقة صحية تدوم.',
    content: [
      'Healthy, luminous skin never starts with harsh stripping surfactants. At Era Care Laboratories, every cleanser and treatment serum is formulated around one core principle: respecting the skin’s natural acid mantle (pH 4.8 – 5.5).',
      'When low-grade cleansers disrupt your lipid barrier, transepidermal water loss accelerates—triggering both flaky dehydration and rebound oil production. By pairing gentle amino-acid surfactants with pharmaceutical-grade Niacinamide, Salicylic Acid, and Ceramides, Tersus Cleansers purify deep inside pores while leaving skin calm and bouncy.',
      'Whether your skin is oily and blemish-prone (requiring our 2% Salicylic Acid Facial Cleanser SA) or normal-to-dry (thriving on our Hyaluronic & Ceramide Facial Cleanser), consistency with clean, dermatologist-tested actives transforms skin texture within 14 to 28 days.',
    ],
    contentAr: [
      'البشرة الصحية المشرقة تبدأ دائماً من اختيار المكونات النقية المتوازنة علمياً. في مختبرات إيرا كير، نصمم كل غسول وسيروم للحفاظ على الحاجز الطبيعي للبشرة ودرجة الحموضة المثالية.',
      'عند استخدام منظفات قاسية تفقد البشرة ترطيبها الداخلي وتزداد مشاكل الحبوب والتحسس. لذلك تعتمد تركيبات تيرسس على دمج حمض الساليسيليك النقي والنياسيناميد والسيراميد لتنقية المسام بعمق مع ترطيب فائق.',
      'سواء كانت بشرتك دهنية تحتاج إلى غسول الساليسيليك (Facial Cleanser SA) أو عادية إلى جافة، فإن الالتزام بروتين يومي مدروس يمنحك فرقاً واضحاً في النعومة والصفاء خلال أسابيع قليلة.',
    ],
    commentsCount: 2,
  },
  {
    id: 'blog-2',
    slug: 'glow-naturally-a-guide-to-healthy-skin-friendly-beauty',
    title: 'Glow Naturally: A Guide to Healthy, Skin-Friendly Beauty',
    titleAr: 'إشراقة طبيعية: دليلك الشامل لجمال صحي وآمن على البشرة',
    category: 'EYE CARE',
    categoryAr: 'العناية بالبشرة',
    dateDay: '26',
    dateMonth: 'AUG',
    fullDate: 'August 26, 2026',
    author: 'Eracare',
    image: '/assets/extracted/brand/blog-2.jpg',
    excerpt:
      'How the iconic Tersus Cream Trio—Day Cream, Collagen Night Cream, and Urea Foot Repair Cream—delivers round-the-clock nourishment from head to toe.',
    excerptAr:
      'كيف يمنحك الثلاثي الأشهر من تيرسس (كريم النهار، كريم الليل بالكولاجين، وكريم اليوريا) عناية متكاملة وترطيباً يدوم على مدار الساعة.',
    content: [
      'Your skin’s biological needs shift dramatically between sunrise and midnight. During the day, environmental stressors, UV exposure, and air conditioning demand a fast-absorbing, fragrance-free barrier shield like Tersus Daily Moisturizing Cream.',
      'At night, cellular regeneration peaks. Tersus Rejuvenator Night Cream harnesses Collagen Peptides and Shea Butter to plump fine lines and restore elasticity while you sleep—so you wake up to visibly firmer, well-rested skin.',
      'And because true care extends beyond the face, our 7-Day Foot & Elbow Repairing Cream combines 10% Urea with Salicylic Acid to gently dissolve rough dead skin on heels, knees, and elbows while locking in deep moisture.',
    ],
    contentAr: [
      'تختلف احتياجات بشرتك بين النهار والليل؛ ففي الصباح تحتاج البشرة إلى ترطيب خفيف سريع الامتصاص وخالٍ من العطور يحميها من العوامل الخارجية مثل كريم النهار من تيرسس.',
      'أما أثناء النوم، فتزداد قدرة الخلايا على التجدد، وهنا يعمل كريم الليل الغني بببتيدات الكولاجين على شد البشرة واستعادة مرونتها ونضارتها.',
      'ولأن العناية الحقيقية تشمل كامل الجسم، صممنا كريم إصلاح القدمين والركب والأكواع باليوريا وحمض الساليسيليك ليمنحك نعومة فائقة خلال 7 أيام فقط.',
    ],
    commentsCount: 4,
  },
  {
    id: 'blog-3',
    slug: 'from-nature-to-you-the-era-care-philosophy-of-pure-skincare',
    title: 'From Nature to You: The Era Care Philosophy of Pure Skincare',
    titleAr: 'من الطبيعة إليكِ: فلسفة إيرا كير في العناية النقية بالبشرة والشعر',
    category: 'BODY CARE',
    categoryAr: 'العناية بالجسم',
    dateDay: '26',
    dateMonth: 'AUG',
    fullDate: 'August 26, 2026',
    author: 'Eracare',
    image: '/assets/extracted/brand/blog-3.jpg',
    excerpt:
      'From a kitchen dream of 250g raw shea butter in 2019 to an Egyptian cosmetic manufacturing leader with 39 branches nationwide.',
    excerptAr:
      'من حلم بدأ بـ 250 جرام زبدة شيا في عام 2019 إلى شركة رائدة ومصنع متكامل لمستحضرات التجميل بأكثر من 39 فرعاً في مصر.',
    content: [
      'At Era Care, "Made By Care" is more than a tagline—it is our manufacturing standard. When we crafted our very first batch in 2019 using pure unrefined Shea Butter and natural beeswax, our mission was simple: offer Egyptian women world-class botanical formulations at honest, accessible prices.',
      'Today, inside our licensed factory, every bottle of Tersus shampoo, body mist, and cold-pressed oil undergoes rigorous quality testing. We eliminate harsh sulfates, parabens, and heavy silicones in favor of cold-pressed Rosemary, Tea Tree, Argan, and pure Shea Olein.',
      'Thank you for making Era Care part of your daily self-care ritual across all 21 governorates.',
    ],
    contentAr: [
      'في إيرا كير، شعارنا "صُنع بعناية" هو التزام حقيقي في كل خطوة تصنيع. منذ أول تركيبة في عام 2019 بزبدة الشيا الخام وشمع العسل الطبيعي، كان هدفنا تقديم منتجات تضاهي المعايير العالمية بأسعار عادلة.',
      'اليوم في مصنعنا المرخص، تخضع كل عبوة من شامبوهات وسيرومات وزيوت تيرسس لرقابة جودة دقيقة، مع خلوها من السلفات والبارابين والسيليكون الضار.',
      'نفخر بوجودنا معكم في 39 فرعاً حول الجمهورية لنكون دائماً أقرب إليكم.',
    ],
    commentsCount: 3,
  },
];

export const JOURNEY_TIMELINE: JourneyStep[] = [
  {
    year: '2019',
    yearEn: '2019',
    titleAr: 'البداية',
    titleEn: 'The Beginning',
    descAr:
      'أول خطوة في حلم... 250 جرام زبدة شيا + 250 جرام شمع عسل + 186 جنيه. تم إنشاء أول تركيبة في المطبخ، وبيع أول منتج لجارة قريبة. كل رحلة عظيمة تبدأ بخطوة واحدة.',
    descEn:
      'The first step in a dream: 250g of shea butter + 250g of beeswax + 186 EGP. The very first formula was crafted in a home kitchen and sold to a neighbor. Every great journey begins with a single step.',
    iconType: 'sprout',
  },
  {
    year: '2020',
    yearEn: '2020',
    titleAr: 'أول 100 عميل',
    titleEn: 'First 100 Customers',
    descAr:
      'انتشرت الكلمة بين الأصدقاء والعائلة. منتجات طبيعية مصنوعة بحب، تبني الثقة يوماً بعد يوم. بدأ مجتمعنا ينمو مع اكتشاف الناس للجودة والعناية في كل منتج من إيرا كير.',
    descEn:
      'Word spread among friends and family. Natural products crafted with love built trust day by day as our community discovered the care inside every Era Care jar.',
    iconType: 'users',
  },
  {
    year: '2021',
    yearEn: '2021',
    titleAr: 'الحلم يكبر',
    titleEn: 'The Dream Grows',
    descAr:
      'تم بيع حوالي 11,000 قطعة بإيرادات 560,000 جنيه. بدأنا التفكير في التوسع وجهزنا خط إنتاج صغير. تم وضع الأساس للنمو.',
    descEn:
      'Over 11,000 units sold with 560,000 EGP in revenue. We prepared our first small production line and laid the foundation for nationwide scale.',
    iconType: 'trending',
  },
  {
    year: '2022',
    yearEn: '2022',
    titleAr: 'مصنعنا الأول',
    titleEn: 'Our First Factory',
    descAr:
      'تم إنشاء مصنع صغير في سوهاج للتصنيع والتعبئة. وصلت المبيعات إلى 1.6 مليون جنيه مع بيع أكثر من 47,000 قطعة. بدأ التزامنا بالتصنيع عالي الجودة هنا.',
    descEn:
      'Established our dedicated manufacturing and packaging facility in Sohag. Sales reached 1.6M EGP with over 47,000 units delivered.',
    iconType: 'factory',
  },
  {
    year: '2023',
    yearEn: '2023',
    titleAr: 'النجاح الوطني',
    titleEn: 'National Success & Shark Tank',
    descAr:
      'مبيعات بقيمة 5.3 مليون جنيه وحوالي 120,000 قطعة. افتتحنا 3 فروع مع ظهور قوي في برنامج Shark Tank وحصلنا على عرض استثماري بقيمة 10 مليون جنيه. الاعتراف على أعلى مستوى.',
    descEn:
      '5.3M EGP in sales and 120,000 units sold. Opened 3 flagship retail branches and featured prominently on Shark Tank Egypt with a 10M EGP investment offer.',
    iconType: 'trophy',
  },
  {
    year: 'اليوم',
    yearEn: 'Today',
    titleAr: 'لا نزال مستمرين',
    titleEn: 'Still Growing Strong',
    descAr:
      'آلاف العملاء في جميع المحافظات، المزيد من المنتجات، تركيبات أذكى، وحلمنا يستمر ليصل إلى كل بيت. الرحلة مستمرة مع إمكانيات لا نهائية أمامنا.',
    descEn:
      'Tens of thousands of happy customers across 21 governorates, 72+ smart formulations, 39 branches, and a dream reaching every Egyptian home.',
    iconType: 'rocket',
  },
];

export const ABOUT_VIDEOS = [
  {
    id: 'vid-1',
    title: 'Shark Tank Egypt — CBC Egypt Feature',
    titleAr: 'ظهور إيرا كير في برنامج شارك تانك مصر — CBC Egypt',
    subtitle: 'How Era Care started from 186 EGP to a 10M EGP investment offer',
    image: '/assets/extracted/brand/video-1.jpg',
    duration: '14:20',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Era+Care+Shark+Tank+Egypt',
  },
  {
    id: 'vid-2',
    title: 'Founder of Erada with Erada Fattah — Podcast Interview',
    titleAr: 'لقاء مؤسس إيرا كير — في صوت جوايا اسمه الطموح',
    subtitle: 'Building a trusted Egyptian cosmetics manufacturing brand from Upper Egypt',
    image: '/assets/extracted/brand/video-2.jpg',
    duration: '28:45',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Era+Care+Egypt',
  },
  {
    id: 'vid-3',
    title: 'From a Kitchen Formula to a Leading Factory',
    titleAr: 'قصة نجاح إيرا كير — من حلم بسيط إلى مصنع وسلسلة فروع',
    subtitle: 'Inside Era Care’s manufacturing quality and nationwide retail expansion',
    image: '/assets/extracted/brand/video-3.jpg',
    duration: '09:15',
    youtubeUrl: 'https://www.youtube.com/results?search_query=Era+Care+Cosmetics+Egypt',
  },
];
