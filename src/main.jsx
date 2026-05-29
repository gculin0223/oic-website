import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Download,
  FileText,
  Globe,
  GraduationCap,
  Handshake,
  Home,
  Languages,
  LifeBuoy,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import "./styles.css";

const pages = [
  { id: "home", icon: Home },
  { id: "about", icon: Building2 },
  { id: "courses", icon: BookOpen },
  { id: "admissions", icon: FileText },
  { id: "tuition", icon: GraduationCap },
  { id: "life", icon: Users },
  { id: "support", icon: LifeBuoy },
  { id: "downloads", icon: Download },
  { id: "faq", icon: CircleHelp },
  { id: "access", icon: MapPin },
  { id: "contact", icon: Mail },
];

const languageOptions = [
  { code: "ja", label: "日本語" },
  { code: "zh", label: "简体中文" },
  { code: "en", label: "English" },
];

const typewriterGreetings = [
  "こんにちは",
  "你好",
  "Xin chào",
  "Hello",
];

const copy = {
  ja: {
    lang: "JA",
    navTitle: "Menu",
    close: "閉じる",
    home: "ホーム",
    about: "学校紹介",
    courses: "コース案内",
    admissions: "入学案内",
    tuition: "学費・奨学金",
    life: "学校生活",
    support: "学生サポート",
    downloads: "資料ダウンロード",
    faq: "FAQ",
    access: "アクセス",
    contact: "お問い合わせ",
    request: "資料請求",
    heroTitle: "OIC言語学院",
    heroLead: "進学・就職・日本での生活を見据えた、実践的な日本語教育。",
    heroBody:
      "少人数クラス、進路指導、生活サポートを一体で提供し、世界から来る学生の日本での一歩を支えます。",
    primaryCta: "入学案内を見る",
    secondaryCta: "コースを見る",
    greeting: "こんにちは / 你好 / Xin chào / Hello",
    stats: [
      ["3", "学習目的別コース"],
      ["4月・7月・10月", "主な入学時期"],
      ["多言語", "相談サポート"],
    ],
    newsTitle: "お知らせ",
    news: [
      "2026年度 長期留学コースの相談受付を開始しました。",
      "オンライン個別相談を平日夕方にも実施しています。",
      "学校案内・募集要項のPDFを準備中です。",
    ],
    aboutTitle: "世界とつながる日本語教育",
    aboutLead:
      "OIC言語学院は、言語だけでなく文化理解、進学準備、生活適応までを重視する日本語学校です。",
    aboutItems: [
      ["教育方針", "会話・読解・作文・発表をバランスよく学び、日本で使える日本語を育てます。"],
      ["進路支援", "大学・大学院・専門学校への進学、面接、志望理由書、出願書類を個別に支援します。"],
      ["国際環境", "中国、ベトナム、ネパールなど多様な国の学生が学び合う環境を目指します。"],
    ],
    coursesTitle: "目的に合わせて選べるコース",
    coursesLead: "進学、ビジネス、短期体験まで、学習目的に合わせて選択できます。",
    courseCards: [
      ["進学コース", "大学・大学院・専門学校への進学を目指す長期コース。JLPT・EJU対策も行います。"],
      ["ビジネス日本語", "日本企業で必要な敬語、メール、面接、プレゼンテーションを実践的に学びます。"],
      ["文化体験コース", "日本語学習に加え、生活文化、地域交流、企業見学などを組み合わせます。"],
    ],
    admissionsTitle: "入学までの流れ",
    admissionsLead: "問い合わせから来日・入学まで、必要書類と手続きを段階ごとに案内します。",
    steps: [
      "お問い合わせ・オンライン相談",
      "コースと入学時期の確認",
      "出願書類の準備・提出",
      "選考・面接",
      "在留資格認定証明書の申請",
      "学費納入・ビザ申請",
      "来日・オリエンテーション",
    ],
    tuitionTitle: "学費・奨学金",
    tuitionLead: "正式な金額は募集要項で案内します。分納や奨学金制度の相談にも対応します。",
    tuitionRows: [
      ["出願料", "20,000円"],
      ["入学金", "募集要項に記載"],
      ["授業料", "コース・期間により異なります"],
      ["教材・施設費", "実費または年度ごとの設定"],
      ["奨学金", "成績・出席状況により相談可能"],
    ],
    lifeTitle: "日本で学び、生活する",
    lifeLead: "授業以外の時間も、学生が安心して日本で生活できる環境づくりを大切にします。",
    lifeItems: ["年間行事", "地域交流", "生活オリエンテーション", "アルバイト相談", "進学説明会", "防災ガイダンス"],
    supportTitle: "学生サポート",
    supportLead: "学習・進路・生活の相談窓口を用意し、来日前から卒業後まで伴走します。",
    supportItems: [
      ["来日前相談", "住居、ビザ、持ち物、入国後の手続きについて案内します。"],
      ["生活支援", "区役所手続き、保険、銀行口座、携帯電話などをサポートします。"],
      ["進路相談", "志望校選び、出願、面接練習、就職活動の準備を支援します。"],
    ],
    downloadsTitle: "資料ダウンロード",
    downloadsLead: "学校案内、募集要項、出願書類などをここから確認できる構成にしています。",
    downloadItems: ["学校案内 PDF", "募集要項", "入学願書", "学費一覧", "アクセスマップ"],
    faqTitle: "よくある質問",
    faqLead: "入学前によくある質問をまとめました。",
    faqs: [
      ["日本語レベルはどのくらい必要ですか？", "長期コースでは基礎的な日本語学習歴を確認します。詳細はコースにより異なります。"],
      ["海外から出願できますか？", "はい。オンライン相談後、必要書類と出願スケジュールを案内します。"],
      ["進学サポートはありますか？", "志望校選び、出願書類、面接練習、試験対策を個別に支援します。"],
    ],
    accessTitle: "アクセス",
    accessLead: "東京都新宿区を想定したアクセス情報です。正式住所に合わせて差し替えできます。",
    address: "7-chome-22-1 Nishi-Shinjuku, Shinjuku City, Tokyo",
    accessNotes: ["JR新宿駅から徒歩圏内", "東京メトロ・都営線からアクセス可能", "周辺に生活施設が充実"],
    contactTitle: "お問い合わせ",
    contactLead: "入学相談、資料請求、学校見学についてお気軽にご連絡ください。",
    formName: "お名前",
    formEmail: "メールアドレス",
    formMessage: "相談内容",
    send: "送信する",
  },
  zh: {
    lang: "中文",
    navTitle: "菜单",
    close: "关闭",
    home: "主页",
    about: "学校介绍",
    courses: "课程介绍",
    admissions: "入学指南",
    tuition: "学费・奖学金",
    life: "学校生活",
    support: "学生支援",
    downloads: "资料下载",
    faq: "常见问题",
    access: "交通位置",
    contact: "联系我们",
    request: "索取资料",
    heroTitle: "OIC语言学院",
    heroLead: "面向升学、就业与日本生活的实用日语教育。",
    heroBody:
      "通过小班教学、升学指导和生活支援，帮助来自世界各地的学生顺利迈出在日本学习的第一步。",
    primaryCta: "查看入学指南",
    secondaryCta: "查看课程",
    greeting: "你好 / こんにちは / Xin chào / Hello",
    stats: [
      ["3", "学习目标课程"],
      ["4月・7月・10月", "主要入学时期"],
      ["多语言", "咨询支援"],
    ],
    newsTitle: "最新消息",
    news: ["2026年度长期留学课程开始接受咨询。", "平日晚间也可预约线上个别咨询。", "学校介绍与募集要项 PDF 准备中。"],
    aboutTitle: "连接世界的日语教育",
    aboutLead: "OIC语言学院重视语言能力、文化理解、升学准备与生活适应。",
    aboutItems: [
      ["教育方针", "均衡训练会话、阅读、写作与发表，培养在日本真正能使用的日语。"],
      ["升学支援", "为大学、研究生院、专门学校升学提供面试、理由书与出愿文件指导。"],
      ["国际环境", "目标是建设中国、越南、尼泊尔等多国学生共同学习的环境。"],
    ],
    coursesTitle: "按目标选择课程",
    coursesLead: "从升学、商务到短期文化体验，可根据学习目标选择。",
    courseCards: [
      ["升学课程", "面向大学、研究生院、专门学校升学的长期课程，包含 JLPT・EJU 对策。"],
      ["商务日语", "实践学习敬语、邮件、面试和演示等日本企业需要的沟通能力。"],
      ["文化体验课程", "在日语学习之外，结合生活文化、地域交流、企业参观等体验。"],
    ],
    admissionsTitle: "入学流程",
    admissionsLead: "从咨询到赴日入学，分阶段说明所需文件与手续。",
    steps: ["咨询・线上面谈", "确认课程和入学时期", "准备并提交出愿材料", "选考・面试", "申请在留资格", "缴纳学费・申请签证", "赴日・入学说明"],
    tuitionTitle: "学费・奖学金",
    tuitionLead: "正式金额以募集要项为准，也可咨询分期缴纳与奖学金制度。",
    tuitionRows: [
      ["报名费", "20,000日元"],
      ["入学金", "募集要项中说明"],
      ["授课费", "根据课程和期间不同"],
      ["教材・设施费", "按实际或年度设定"],
      ["奖学金", "可根据成绩和出勤情况咨询"],
    ],
    lifeTitle: "在日本学习与生活",
    lifeLead: "课堂之外，也重视让学生安心适应日本生活的环境建设。",
    lifeItems: ["年度活动", "地域交流", "生活说明会", "打工咨询", "升学说明会", "防灾指导"],
    supportTitle: "学生支援",
    supportLead: "设置学习、升学和生活咨询窗口，从来日前到毕业后持续支持。",
    supportItems: [
      ["来日前咨询", "说明住宿、签证、携带物品和入境后手续。"],
      ["生活支援", "协助区役所手续、保险、银行账户、手机等生活事项。"],
      ["升学咨询", "支持志愿校选择、出愿、面试练习和就业准备。"],
    ],
    downloadsTitle: "资料下载",
    downloadsLead: "这里用于放置学校介绍、募集要项、出愿文件等必要资料。",
    downloadItems: ["学校介绍 PDF", "募集要项", "入学申请书", "学费一览", "交通地图"],
    faqTitle: "常见问题",
    faqLead: "整理入学前常见问题。",
    faqs: [
      ["需要什么日语水平？", "长期课程会确认基础日语学习经历，具体要求根据课程不同。"],
      ["可以从海外申请吗？", "可以。线上咨询后会说明必要材料和申请日程。"],
      ["有升学支援吗？", "提供志愿校选择、出愿文件、面试练习和考试对策等个别支援。"],
    ],
    accessTitle: "交通位置",
    accessLead: "以下为以东京新宿区为基础的交通信息，可按正式地址替换。",
    address: "7-chome-22-1 Nishi-Shinjuku, Shinjuku City, Tokyo",
    accessNotes: ["从 JR 新宿站步行可达", "可使用东京 Metro 与都营线", "周边生活设施完善"],
    contactTitle: "联系我们",
    contactLead: "关于入学咨询、资料索取、学校参观，欢迎随时联系。",
    formName: "姓名",
    formEmail: "邮箱地址",
    formMessage: "咨询内容",
    send: "发送",
  },
  en: {
    lang: "EN",
    navTitle: "Menu",
    close: "Close",
    home: "Home",
    about: "About",
    courses: "Courses",
    admissions: "Admissions",
    tuition: "Tuition & Scholarships",
    life: "Student Life",
    support: "Student Support",
    downloads: "Downloads",
    faq: "FAQ",
    access: "Access",
    contact: "Contact",
    request: "Request Info",
    heroTitle: "OIC Language School",
    heroLead: "Practical Japanese education for study, work, and life in Japan.",
    heroBody:
      "OIC supports international students through small classes, academic counseling, and everyday-life guidance from the first step in Japan.",
    primaryCta: "View Admissions",
    secondaryCta: "View Courses",
    greeting: "Hello / こんにちは / 你好 / Xin chào",
    stats: [
      ["3", "Learning tracks"],
      ["Apr・Jul・Oct", "Main intakes"],
      ["Multilingual", "Consultation support"],
    ],
    newsTitle: "News",
    news: [
      "Consultations for the 2026 long-term course are now open.",
      "Online private consultations are available on weekday evenings.",
      "School guide and application PDF files are being prepared.",
    ],
    aboutTitle: "Japanese education connected to the world",
    aboutLead:
      "OIC Language School focuses on language ability, cultural understanding, academic preparation, and life adjustment in Japan.",
    aboutItems: [
      ["Education Policy", "Students learn speaking, reading, writing, and presentation skills in a balanced way."],
      ["Academic Guidance", "We support school selection, statements of purpose, applications, interviews, and exams."],
      ["International Environment", "Students from China, Vietnam, Nepal and other regions learn together."],
    ],
    coursesTitle: "Courses for different goals",
    coursesLead: "Choose from academic preparation, business Japanese, and short cultural experiences.",
    courseCards: [
      ["Academic Track", "A long-term course for university, graduate school, and vocational school preparation with JLPT and EJU support."],
      ["Business Japanese", "Practical training in honorifics, email, interviews, and presentations for Japanese workplaces."],
      ["Culture Experience", "Japanese lessons combined with local exchange, daily culture, and company visits."],
    ],
    admissionsTitle: "Admissions Flow",
    admissionsLead: "We guide each step from inquiry and documents to arrival and orientation.",
    steps: [
      "Inquiry and online consultation",
      "Confirm course and intake",
      "Prepare and submit documents",
      "Screening and interview",
      "Certificate of Eligibility application",
      "Tuition payment and visa application",
      "Arrival and orientation",
    ],
    tuitionTitle: "Tuition & Scholarships",
    tuitionLead: "Official fees are listed in the application guide. Installment and scholarship consultation is available.",
    tuitionRows: [
      ["Application fee", "20,000 JPY"],
      ["Admission fee", "Listed in the application guide"],
      ["Tuition", "Depends on course and period"],
      ["Materials & facility fee", "Actual or annual setting"],
      ["Scholarships", "Consultation based on grades and attendance"],
    ],
    lifeTitle: "Study and live in Japan",
    lifeLead: "OIC supports students beyond the classroom so they can adapt to daily life in Japan.",
    lifeItems: ["Annual events", "Local exchange", "Life orientation", "Part-time job consultation", "Academic seminars", "Disaster guidance"],
    supportTitle: "Student Support",
    supportLead: "Learning, career, and life consultation is available before arrival through graduation.",
    supportItems: [
      ["Before Arrival", "Housing, visa, packing, and post-arrival procedures."],
      ["Daily Life", "Ward office procedures, insurance, bank accounts, and mobile phone setup."],
      ["Future Planning", "School selection, applications, interview practice, and job preparation."],
    ],
    downloadsTitle: "Downloads",
    downloadsLead: "School guide, application guide, forms, and access documents can be placed here.",
    downloadItems: ["School Guide PDF", "Application Guide", "Application Form", "Tuition List", "Access Map"],
    faqTitle: "FAQ",
    faqLead: "Common questions before enrollment.",
    faqs: [
      ["What Japanese level is required?", "Long-term courses check basic Japanese study history. Requirements vary by course."],
      ["Can I apply from overseas?", "Yes. After online consultation, we will explain documents and schedules."],
      ["Do you support higher education applications?", "Yes. We support school selection, documents, interviews, and test preparation."],
    ],
    accessTitle: "Access",
    accessLead: "Sample access information based on Shinjuku, Tokyo. Replace it with the official address when ready.",
    address: "7-chome-22-1 Nishi-Shinjuku, Shinjuku City, Tokyo",
    accessNotes: ["Walkable from JR Shinjuku Station", "Accessible by Tokyo Metro and Toei lines", "Daily-life facilities nearby"],
    contactTitle: "Contact",
    contactLead: "Contact us for admissions, documents, or school visits.",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    send: "Send",
  },
};

function routeFromHash() {
  const hash = window.location.hash.replace("#", "");
  return pages.some((page) => page.id === hash) ? hash : "home";
}

function App() {
  const [isReady, setIsReady] = useState(false);
  const [lang, setLang] = useState("ja");
  const [route, setRoute] = useState(routeFromHash);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const onHashChange = () => {
      setRoute(routeFromHash());
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ja" ? "ja" : lang === "zh" ? "zh-CN" : "en";
    document.body.classList.toggle("menu-lock", menuOpen);
  }, [lang, menuOpen]);

  const currentTitle = t[route];

  return (
    <div className="app-shell">
      <OpeningAnimation onComplete={() => setIsReady(true)} />
      {isReady && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <Header
            t={t}
            lang={lang}
            route={route}
            menuOpen={menuOpen}
            setLang={setLang}
            setMenuOpen={setMenuOpen}
          />
          <MenuDrawer t={t} route={route} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <main>
            {route === "home" ? <HomePage t={t} /> : <ContentPage t={t} route={route} title={currentTitle} />}
          </main>
          <Footer t={t} />
        </motion.div>
      )}
    </div>
  );
}

function Header({ t, lang, route, menuOpen, setLang, setMenuOpen }) {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="OIC home">
        {!logoError ? (
          <img src="/crest.jpg" alt="OIC school crest" onError={() => setLogoError(true)} />
        ) : (
          <span>OIC</span>
        )}
      </a>
      <div className="header-actions">
        <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
        <a className="request-link" href="#contact">
          {t.request}
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t.close : t.navTitle}
          aria-expanded={menuOpen}
          type="button"
        >
          {menuOpen ? <X size={26} /> : <Menu size={28} />}
        </button>
      </div>
      <div className="route-pill">{route === "home" ? t.greeting : t[route]}</div>
    </header>
  );
}

function LanguageSwitcher({ currentLang, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const current = languageOptions.find((option) => option.code === currentLang);

  return (
    <div className="language-menu">
      <button
        className="language-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Language"
        type="button"
      >
        <Globe size={18} />
        <span>{current?.code.toUpperCase()}</span>
        <ChevronDown size={15} className={isOpen ? "rotate" : ""} />
      </button>
      {isOpen && (
        <div className="language-dropdown">
          {languageOptions.map((option) => (
            <button
              key={option.code}
              className={currentLang === option.code ? "active" : ""}
              onClick={() => {
                onLanguageChange(option.code);
                setIsOpen(false);
              }}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuDrawer({ t, route, menuOpen, setMenuOpen }) {
  return (
    <>
      <button
        className={`menu-backdrop ${menuOpen ? "show" : ""}`}
        aria-label={t.close}
        onClick={() => setMenuOpen(false)}
        type="button"
      />
      <aside className={`menu-drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow">{t.navTitle}</span>
            <h2>OIC Language School</h2>
          </div>
          <button className="icon-button" onClick={() => setMenuOpen(false)} aria-label={t.close} type="button">
            <X size={22} />
          </button>
        </div>
        <nav className="drawer-nav" aria-label={t.navTitle}>
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <a key={page.id} className={route === page.id ? "active" : ""} href={`#${page.id}`}>
                <Icon size={20} />
                <span>{t[page.id]}</span>
                <ChevronRight size={18} />
              </a>
            );
          })}
        </nav>
        <div className="drawer-contact">
          <a href="tel:+81312345678">
            <Phone size={17} /> +81-3-1234-5678
          </a>
          <a href="mailto:hello@oic.school">
            <Mail size={17} /> hello@oic.school
          </a>
        </div>
      </aside>
    </>
  );
}

function HomePage({ t }) {
  return (
    <>
      <section className="hero-section">
        <OsakaSketch />
        <div className="hero-copy">
          <span className="eyebrow">OIC Language School</span>
          <TypewriterHeader schoolName={t.heroTitle} />
          <motion.p
            className="hero-lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t.heroLead}
          </motion.p>
          <motion.p
            className="hero-body"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            {t.heroBody}
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <a className="primary-button" href="#admissions">
              {t.primaryCta}
              <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="#courses">
              {t.secondaryCta}
            </a>
          </motion.div>
        </div>
        <motion.div
          className="hero-media"
          aria-label="Students studying Japanese"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
            alt="Students studying together"
          />
          <div className="media-card">
            <Languages size={24} />
            <span>{t.greeting}</span>
          </div>
        </motion.div>
      </section>

      <motion.section
        className="stats-strip"
        aria-label="OIC highlights"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {t.stats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </motion.section>

      <section className="home-grid">
        <motion.div
          className="intro-panel"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow">Our Philosophy</span>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutLead}</p>
          <a href="#about">
            {t.about}
            <ArrowRight size={18} />
          </a>
        </motion.div>
        <motion.div
          className="news-panel"
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2>{t.newsTitle}</h2>
          <ul>
            {t.news.map((item) => (
              <li key={item}>
                <CalendarDays size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </>
  );
}

function TypewriterHeader({ schoolName }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setBlink((prev) => !prev), 500);
    return () => window.clearTimeout(timeout);
  }, [blink]);

  useEffect(() => {
    if (subIndex === typewriterGreetings[index].length + 1 && !reverse) {
      const timeout = window.setTimeout(() => setReverse(true), 1500);
      return () => window.clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % typewriterGreetings.length);
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 120);

    return () => window.clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className="typewriter-header">
      <h1>{schoolName}</h1>
      <div className="typewriter-line">
        <span>{typewriterGreetings[index].substring(0, subIndex)}</span>
        <i className={blink ? "show" : ""} aria-hidden="true" />
      </div>
    </div>
  );
}

function OpeningAnimation({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(false);
      window.setTimeout(onComplete, 800);
    }, 2400);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="opening-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="opening-mark" aria-label="OIC opening animation">
            <motion.svg
              className="opening-globe"
              viewBox="0 0 160 160"
              fill="none"
              initial={{ opacity: 1, scale: 0.92 }}
              animate={{ opacity: [1, 1, 0], scale: [0.92, 1, 1] }}
              transition={{ duration: 1.45, times: [0, 0.78, 1], ease: "easeInOut" }}
            >
              <motion.circle cx="80" cy="80" r="58" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.55, ease: "easeOut" }} />
              <motion.path d="M80 22C55 44 55 116 80 138" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.08, duration: 0.55, ease: "easeOut" }} />
              <motion.path d="M80 22C105 44 105 116 80 138" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.14, duration: 0.55, ease: "easeOut" }} />
              <motion.path d="M22 80H138" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.48, ease: "easeOut" }} />
              <motion.path d="M30 58C58 68 102 68 130 58" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.26, duration: 0.48, ease: "easeOut" }} />
              <motion.path d="M30 102C58 92 102 92 130 102" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.32, duration: 0.48, ease: "easeOut" }} />
            </motion.svg>

            <motion.div
              className="opening-word"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: [0, 0, 1], scale: [0.92, 0.96, 1], filter: ["blur(8px)", "blur(4px)", "blur(0px)"] }}
              transition={{ delay: 1.05, duration: 0.72, times: [0, 0.35, 1], ease: "easeOut" }}
            >
              <span>O</span>
              <span>I</span>
              <span>C</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OsakaSketch() {
  const reduceMotion = useReducedMotion();
  const stroke = "rgba(0,0,0,0.55)";
  const mainW = 2.2;
  const thinW = 1.1;
  const draw = (delay = 0, duration = 0.8) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { delay, duration, ease: "easeOut" },
  });

  const staticPaths = (
    <>
      <path d="M0,260 L1440,260" stroke={stroke} strokeWidth={mainW} />
      <circle cx="220" cy="170" r="60" stroke={stroke} strokeWidth={mainW} />
      <path d="M220,110 L220,230 M160,170 L280,170 M180,130 L260,210 M180,210 L260,130" stroke={stroke} strokeWidth={thinW} />
      <path d="M190,260 L220,200 L250,260" stroke={stroke} strokeWidth={mainW} />
      <path d="M360,260 L360,170 L400,170 L400,260 M420,260 L420,140 L460,140 L460,260 M480,260 L480,190 L510,190 L510,260 M530,260 L530,150 L570,150 L570,260" stroke={stroke} strokeWidth={mainW} strokeLinejoin="round" />
      <path d="M720,260 L735,240 L755,240 L770,260 M745,240 L745,130 M730,130 L760,130 M735,130 L730,110 L760,110 L755,130 M745,110 L745,80 M735,80 L755,80 M745,80 L740,60 L750,60 L745,80" stroke={stroke} strokeWidth={mainW} strokeLinejoin="round" />
      <path d="M900,260 L1020,260 L1000,230 L920,230 Z M930,230 L990,230 L980,210 L940,210 Z M950,210 L970,210 L965,195 L955,195 Z M960,195 L955,180 L965,180 Z" stroke={stroke} strokeWidth={mainW} strokeLinejoin="round" />
      <path d="M100,285 Q160,270 220,285 T340,285 T460,285" stroke={stroke} strokeWidth={thinW} />
      <path d="M880,285 Q940,270 1000,285 T1120,285 T1240,285" stroke={stroke} strokeWidth={thinW} />
    </>
  );

  return (
    <div className="osaka-sketch">
      <svg viewBox="0 0 1440 320" fill="none" preserveAspectRatio="xMidYMax meet">
        {reduceMotion ? (
          staticPaths
        ) : (
          <>
            <motion.path d="M0,260 L1440,260" stroke={stroke} strokeWidth={mainW} strokeLinecap="round" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} />
            <motion.circle cx="220" cy="170" r="60" stroke={stroke} strokeWidth={mainW} {...draw(0.05, 0.65)} />
            <motion.path d="M220,110 L220,230 M160,170 L280,170 M180,130 L260,210 M180,210 L260,130" stroke={stroke} strokeWidth={thinW} strokeLinecap="round" {...draw(0.08, 0.55)} />
            <motion.path d="M190,260 L220,200 L250,260" stroke={stroke} strokeWidth={mainW} strokeLinecap="round" {...draw(0.1, 0.55)} />
            <motion.path d="M360,260 L360,170 L400,170 L400,260 M420,260 L420,140 L460,140 L460,260 M480,260 L480,190 L510,190 L510,260 M530,260 L530,150 L570,150 L570,260" stroke={stroke} strokeWidth={mainW} strokeLinecap="round" strokeLinejoin="round" {...draw(0.12, 0.75)} />
            <motion.path d="M720,260 L735,240 L755,240 L770,260 M745,240 L745,130 M730,130 L760,130 M735,130 L730,110 L760,110 L755,130 M745,110 L745,80 M735,80 L755,80 M745,80 L740,60 L750,60 L745,80" stroke={stroke} strokeWidth={mainW} strokeLinecap="round" strokeLinejoin="round" {...draw(0.15, 0.85)} />
            <motion.path d="M900,260 L1020,260 L1000,230 L920,230 Z M930,230 L990,230 L980,210 L940,210 Z M950,210 L970,210 L965,195 L955,195 Z M960,195 L955,180 L965,180 Z" stroke={stroke} strokeWidth={mainW} strokeLinecap="round" strokeLinejoin="round" {...draw(0.18, 0.85)} />
            <motion.path d="M100,285 Q160,270 220,285 T340,285 T460,285" stroke={stroke} strokeWidth={thinW} strokeLinecap="round" {...draw(0.22, 0.55)} />
            <motion.path d="M880,285 Q940,270 1000,285 T1120,285 T1240,285" stroke={stroke} strokeWidth={thinW} strokeLinecap="round" {...draw(0.24, 0.55)} />
          </>
        )}
      </svg>
    </div>
  );
}

function ContentPage({ t, route, title }) {
  const content = useMemo(() => getPageContent(t, route), [t, route]);

  return (
    <motion.section className="page-shell" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
      <div className="page-hero">
        <span className="eyebrow">OIC</span>
        <h1>{title}</h1>
        <p>{content.lead}</p>
      </div>
      {content.body}
    </motion.section>
  );
}

function getPageContent(t, route) {
  const leadByRoute = {
    about: t.aboutLead,
    courses: t.coursesLead,
    admissions: t.admissionsLead,
    tuition: t.tuitionLead,
    life: t.lifeLead,
    support: t.supportLead,
    downloads: t.downloadsLead,
    faq: t.faqLead,
    access: t.accessLead,
    contact: t.contactLead,
  };

  const map = {
    about: (
      <div className="three-grid">
        {t.aboutItems.map(([title, text]) => (
          <ArticleCard key={title} icon={Sparkles} title={title} text={text} />
        ))}
      </div>
    ),
    courses: (
      <div className="three-grid">
        {t.courseCards.map(([title, text], index) => (
          <ArticleCard
            key={title}
            icon={index === 0 ? GraduationCap : index === 1 ? Users : Calendar}
            title={title}
            text={text}
            action={t.admissions}
            href="#admissions"
          />
        ))}
      </div>
    ),
    admissions: (
      <ol className="timeline">
        {t.steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{step}</p>
          </li>
        ))}
      </ol>
    ),
    tuition: (
      <div className="table-card">
        {t.tuitionRows.map(([label, value]) => (
          <div className="table-row" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    ),
    life: (
      <div className="tag-grid">
        {t.lifeItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    ),
    support: (
      <div className="three-grid">
        {t.supportItems.map(([title, text]) => (
          <ArticleCard key={title} icon={Handshake} title={title} text={text} />
        ))}
      </div>
    ),
    downloads: (
      <div className="download-list">
        {t.downloadItems.map((item) => (
          <a key={item} href="#contact">
            <Download size={20} />
            <span>{item}</span>
            <ArrowRight size={18} />
          </a>
        ))}
      </div>
    ),
    faq: (
      <div className="faq-list">
        {t.faqs.map(([question, answer]) => (
          <details key={question} open>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    ),
    access: (
      <div className="access-layout">
        <div className="map-placeholder">
          <MapPin size={38} />
          <span>{t.address}</span>
        </div>
        <ul className="check-list">
          {t.accessNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    ),
    contact: <ContactForm t={t} />,
  };

  return {
    lead: leadByRoute[route],
    body: map[route],
  };
}

function ArticleCard({ icon: Icon, title, text, action, href }) {
  return (
    <motion.article className="article-card" whileHover={{ y: -10 }} transition={{ duration: 0.25 }}>
      <Icon size={24} />
      <h2>{title}</h2>
      <p>{text}</p>
      {action && (
        <a href={href}>
          {action}
          <ArrowRight size={17} />
        </a>
      )}
    </motion.article>
  );
}

function ContactForm({ t }) {
  return (
    <div className="contact-layout">
      <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
        <label>
          {t.formName}
          <input type="text" name="name" autoComplete="name" />
        </label>
        <label>
          {t.formEmail}
          <input type="email" name="email" autoComplete="email" />
        </label>
        <label>
          {t.formMessage}
          <textarea name="message" rows="6" />
        </label>
        <button type="submit">
          <Send size={18} />
          {t.send}
        </button>
      </form>
      <div className="contact-card">
        <a href="tel:+81312345678">
          <Phone size={20} /> +81-3-1234-5678
        </a>
        <a href="mailto:hello@oic.school">
          <Mail size={20} /> hello@oic.school
        </a>
        <p>{t.address}</p>
      </div>
    </div>
  );
}

function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div>
        <div className="footer-brand">
          <img src="/crest.jpg" alt="OIC school crest" />
          <div>
            <strong>OIC</strong>
            <p>Language School</p>
          </div>
        </div>
      </div>
      <nav aria-label="Footer">
        <a href="#about">{t.about}</a>
        <a href="#admissions">{t.admissions}</a>
        <a href="#access">{t.access}</a>
        <a href="#contact">{t.contact}</a>
      </nav>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
