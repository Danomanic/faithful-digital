export type Register = "warm" | "plain" | "both";

export interface Source {
  title: string;
  url?: string;
}

export interface Part {
  name: string;
  summary: string;
}

export interface GuidancePage {
  slug: string;
  title: string;
  summary: string;
  part: string;
  register: Register;
  lastReviewed: string;
  sources: Source[];
  professionalAdviceNote?: boolean;
}

export const parts: Part[] = [
  { name: "Part 1: Vision", summary: "Why digital work matters for welcome, care, discipleship and stewardship." },
  { name: "Part 2: Foundations", summary: "The responsibilities, laws and habits that keep people and information safe." },
  { name: "Part 3: Systems", summary: "How to choose and run the tools your church depends on every week." },
  { name: "Part 4: AI", summary: "Where AI can help, where to draw lines, and how to set rules." },
  { name: "Part 5: Implementation", summary: "How to share the work and bring your church with you." },
];

const reviewed = "18 November 2026";

const ico = {
  specialCategory: {
    title: "Information Commissioner's Office: What is special category data?",
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/what-is-special-category-data/",
  },
  fee: {
    title: "Information Commissioner's Office: Data protection fee",
    url: "https://ico.org.uk/for-organisations/data-protection-fee/",
  },
  feeExemptions: {
    title: "Information Commissioner's Office: Data protection fee exemptions",
    url: "https://ico.org.uk/for-organisations/data-protection-fee/data-protection-fee/exemptions/",
  },
  breach: { title: "Information Commissioner's Office: Report a breach", url: "https://ico.org.uk/for-organisations/report-a-breach/" },
  softOptIn: {
    title: "Information Commissioner's Office: The charitable purpose soft opt-in",
    url: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/the-charitable-purpose-soft-opt-in/",
  },
};

const ncscSmallOrgs = {
  title: "National Cyber Security Centre: Small organisations guide to cyber security",
  url: "https://www.ncsc.gov.uk/collection/small-organisations-guide-to-cyber-security",
};

const thirtyoneeightFaqs = {
  title: "Thirtyone:eight: Safeguarding FAQs, including online church services",
  url: "https://www.thirtyoneeight.org/help-and-resources/knowledge-hub/safeguarding-faqs/",
};

export const guidancePages: GuidancePage[] = [
  // Part 1: Vision
  {
    slug: "why-digital-matters",
    title: "Why digital matters for the local church",
    summary: "How everyday digital choices can serve welcome, care and mission, and where their limits lie.",
    part: "Part 1: Vision",
    register: "warm",
    lastReviewed: "4 November 2026",
    sources: [{ title: "Scripture references: Acts 6:1–7; Colossians 2:5; 1 Corinthians 4:2; John 1:14" }],
  },
  {
    slug: "welcome-discipleship-and-care",
    title: "Welcome, discipleship and care in a connected world",
    summary: "How digital tools can open doors, sustain community between Sundays and reach people who can't be there.",
    part: "Part 1: Vision",
    register: "warm",
    lastReviewed: reviewed,
    sources: [
      { title: "Scripture references: Luke 14:21–23; Acts 2:42–47; Hebrews 10:24–25; 2 John 12; 1 Corinthians 12:12–26; Matthew 25:36–40" },
    ],
  },

  // Part 2: Foundations
  {
    slug: "trustee-responsibilities",
    title: "Trustee responsibilities for digital",
    summary: "What your trustees are responsible for, and how the rules differ across the UK.",
    part: "Part 2: Foundations",
    register: "plain",
    lastReviewed: reviewed,
    professionalAdviceNote: true,
    sources: [
      { title: "Charity Commission: How to register your charity (CC21b)", url: "https://www.gov.uk/guidance/how-to-register-your-charity-cc21b" },
      { title: "Charity Commission: Excepted charities", url: "https://www.gov.uk/government/publications/excepted-charities" },
      { title: "Charity Commission: The essential trustee (CC3)", url: "https://www.gov.uk/government/publications/the-essential-trustee-what-you-need-to-know-cc3" },
      { title: "Scottish Charity Regulator (OSCR)", url: "https://www.oscr.org.uk/" },
      { title: "Charity Commission for Northern Ireland: Registration", url: "https://www.charitycommissionni.org.uk/register-a-charity/registration/" },
      { title: "Charity Commission for Northern Ireland: Charity registration threshold", url: "https://www.charitycommissionni.org.uk/news/charity-registration-threshold/" },
    ],
  },
  {
    slug: "data-protection",
    title: "Look after personal data",
    summary: "The main things UK data protection law asks of a church, in the order most churches should tackle them.",
    part: "Part 2: Foundations",
    register: "plain",
    lastReviewed: reviewed,
    professionalAdviceNote: true,
    sources: [
      ico.specialCategory,
      ico.fee,
      ico.feeExemptions,
      ico.breach,
      {
        title: "Information Commissioner's Office: UK GDPR guidance and resources",
        url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/",
      },
      { title: "Data Protection Act 2018, section 164A (complaints by data subjects), inserted by the Data (Use and Access) Act 2025", url: "https://www.legislation.gov.uk/ukpga/2025/18/contents" },
    ],
  },
  {
    slug: "emails-and-texts",
    title: "Send emails and texts within the rules",
    summary: "When you need permission to email or text people, and what changed for charities in 2026.",
    part: "Part 2: Foundations",
    register: "plain",
    lastReviewed: reviewed,
    professionalAdviceNote: true,
    sources: [
      ico.softOptIn,
      {
        title: "Information Commissioner's Office: Guide to PECR",
        url: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/",
      },
      { title: "Data (Use and Access) Act 2025, section 114", url: "https://www.legislation.gov.uk/ukpga/2025/18/section/114" },
    ],
  },
  {
    slug: "safeguarding-online",
    title: "Keep people safe online",
    summary: "Practical safeguarding steps for livestreams, photos, online groups and messaging.",
    part: "Part 2: Foundations",
    register: "plain",
    lastReviewed: reviewed,
    professionalAdviceNote: true,
    sources: [
      thirtyoneeightFaqs,
      { title: "NSPCC Learning: Online safety", url: "https://learning.nspcc.org.uk/online-safety" },
    ],
  },
  {
    slug: "accounts-and-logins",
    title: "Set up accounts and logins",
    summary: "Keep your church's important accounts secure and under the church's control, even when volunteers change.",
    part: "Part 2: Foundations",
    register: "plain",
    lastReviewed: "4 November 2026",
    sources: [
      {
        title: "National Cyber Security Centre: Secure your important online accounts",
        url: "https://www.ncsc.gov.uk/collection/small-organisations-guide-to-cyber-security/secure-your-important-online-accounts",
      },
      {
        title: "National Cyber Security Centre: Small Business Guide (PDF)",
        url: "https://www.ncsc.gov.uk/files/NCSC_A5_Small_Business_Guide_v4_OCT20.pdf",
      },
    ],
  },
  {
    slug: "cyber-security",
    title: "Protect your church from scams and cyber attacks",
    summary: "Simple habits that stop most attacks, and what to do if something goes wrong.",
    part: "Part 2: Foundations",
    register: "plain",
    lastReviewed: reviewed,
    sources: [
      ncscSmallOrgs,
      { title: "City of London Police: Report Fraud", url: "https://www.reportfraud.police.uk/" },
      { title: "National Cyber Security Centre: Report a suspicious email", url: "https://www.ncsc.gov.uk/collection/phishing-scams/report-scam-email" },
    ],
  },
  {
    slug: "accessibility",
    title: "Make your digital work accessible",
    summary: "How to make sure no one is shut out of your website, messages, documents and services.",
    part: "Part 2: Foundations",
    register: "plain",
    lastReviewed: reviewed,
    sources: [
      { title: "Equality and Human Rights Commission: Services, public functions and associations statutory code of practice", url: "https://www.equalityhumanrights.com/guidance/business/services-public-functions-and-associations-statutory-code-practice" },
      { title: "W3C: Web Content Accessibility Guidelines (WCAG) 2.2", url: "https://www.w3.org/TR/WCAG22/" },
      { title: "GOV.UK: Making your service accessible", url: "https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction" },
    ],
  },

  // Part 3: Systems
  {
    slug: "choosing-systems",
    title: "Choose and change your systems",
    summary: "A simple way to decide which tools your church needs, and to change them without losing anything.",
    part: "Part 3: Systems",
    register: "plain",
    lastReviewed: reviewed,
    sources: [
      { title: "Charity Digital: Charity Digital Exchange", url: "https://charitydigital.org.uk/" },
      ico.specialCategory,
    ],
  },
  {
    slug: "email-and-documents",
    title: "Email, documents and calendars",
    summary: "How to choose between Microsoft 365 and Google Workspace, and what charity offers are available.",
    part: "Part 3: Systems",
    register: "plain",
    lastReviewed: reviewed,
    sources: [
      { title: "Google for Nonprofits: Eligibility (UK)", url: "https://www.google.com/intl/en-GB/nonprofits/eligibility/" },
      { title: "Google for Nonprofits: Google Workspace (UK)", url: "https://www.google.com/intl/en-GB/nonprofits/offerings/workspace/" },
      {
        title: "Microsoft Partner Center: Microsoft 365 Business Premium and Office 365 E1 grant discontinuation",
        url: "https://partner.microsoft.com/asset/collection/microsoft-365-business-premium-and-office-365-e1-grant-discontinuation",
      },
      { title: "Microsoft: Nonprofit offers", url: "https://www.microsoft.com/en-gb/nonprofits/microsoft-365" },
    ],
  },
  {
    slug: "church-management-systems",
    title: "Church management systems",
    summary: "What a church management system does, whether you need one, and how to choose well.",
    part: "Part 3: Systems",
    register: "plain",
    lastReviewed: reviewed,
    sources: [ico.specialCategory],
  },
  {
    slug: "accounting",
    title: "Church accounts and finance tools",
    summary: "How to choose between a spreadsheet and accounting software, and what to keep in good order.",
    part: "Part 3: Systems",
    register: "plain",
    lastReviewed: reviewed,
    professionalAdviceNote: true,
    sources: [
      { title: "Charity Commission: Charity reporting and accounting: the essentials (CC15)", url: "https://www.gov.uk/government/publications/charity-reporting-and-accounting-the-essentials-november-2016-cc15d" },
      { title: "Scottish Charity Regulator: Charity accounts", url: "https://www.oscr.org.uk/guidance-and-forms/" },
      { title: "Charity Commission for Northern Ireland: Reporting and accounting", url: "https://www.charitycommissionni.org.uk/" },
    ],
  },
  {
    slug: "giving-and-gift-aid",
    title: "Giving and Gift Aid",
    summary: "How to make giving easy, claim Gift Aid correctly and keep good records.",
    part: "Part 3: Systems",
    register: "plain",
    lastReviewed: reviewed,
    professionalAdviceNote: true,
    sources: [
      { title: "HMRC: Claim Gift Aid as a charity or CASC", url: "https://www.gov.uk/claim-gift-aid" },
      { title: "HMRC: Claiming a top-up payment on small charitable donations", url: "https://www.gov.uk/guidance/claiming-a-top-up-payment-on-small-charitable-donations" },
      { title: "HMRC: Charities detailed guidance notes", url: "https://www.gov.uk/government/publications/charities-detailed-guidance-notes" },
    ],
  },
  {
    slug: "church-website",
    title: "Your church website",
    summary: "What a church website needs to do, what to put on it, and how to keep it in the church's hands.",
    part: "Part 3: Systems",
    register: "plain",
    lastReviewed: reviewed,
    sources: [
      {
        title: "Information Commissioner's Office: Guidance on the use of storage and access technologies (cookies)",
        url: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/",
      },
      { title: "W3C: Web Content Accessibility Guidelines (WCAG) 2.2", url: "https://www.w3.org/TR/WCAG22/" },
    ],
  },
  {
    slug: "communications",
    title: "News, social media and group messaging",
    summary: "How to share news without overwhelming people, and how to run social media and group chats safely.",
    part: "Part 3: Systems",
    register: "plain",
    lastReviewed: reviewed,
    sources: [thirtyoneeightFaqs, ico.softOptIn],
  },
  {
    slug: "streaming-and-recording",
    title: "Streaming and recording services",
    summary: "What you need to stream or record services legally and safely, using simple equipment.",
    part: "Part 3: Systems",
    register: "plain",
    lastReviewed: reviewed,
    professionalAdviceNote: true,
    sources: [
      { title: "CCLI UK: Licences for churches", url: "https://uk.ccli.com/" },
      { title: "Methodist Church: Copyright guide for streamed worship", url: "https://www.methodist.org.uk/for-churches/digital-church/online-worship-toolkit/copyright-guide-for-streamed-worship/" },
      thirtyoneeightFaqs,
    ],
  },

  // Part 4: AI
  {
    slug: "using-ai-well",
    title: "Using AI well in your church",
    summary: "Why we're hopeful about AI, where it can help, and the limits we recommend every church sets.",
    part: "Part 4: AI",
    register: "both",
    lastReviewed: "4 November 2026",
    professionalAdviceNote: true,
    sources: [
      { title: "Scripture references: Genesis 1:27; John 1:14; 1 Thessalonians 5:21; James 1:5" },
      {
        title: "Diocese of York: Understanding PCC Responsibilities in the Use of Artificial Intelligence (Word document)",
        url: "https://dioceseofyork.org.uk/wp-content/uploads/2026/02/AI-Advice-for-PCCs-v2.docx",
      },
      {
        title: "Church of England Ethical Investment Advisory Group: Artificial Intelligence advice (PDF)",
        url: "https://www.churchofengland.org/sites/default/files/2025-01/eiag-artificial-intelligence-advice-2024.pdf",
      },
      { title: "United Reformed Church: Generative AI: The Essentials", url: "https://urc.org.uk/generative-ai-guidance/" },
      ico.specialCategory,
    ],
  },
  {
    slug: "choosing-ai-tools",
    title: "Choose AI tools that protect your data",
    summary: "What to check before your church approves an AI tool, and how to set it up safely.",
    part: "Part 4: AI",
    register: "plain",
    lastReviewed: reviewed,
    sources: [
      {
        title: "Information Commissioner's Office: Guidance on AI and data protection",
        url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/",
      },
      { title: "United Reformed Church: Generative AI: The Essentials", url: "https://urc.org.uk/generative-ai-guidance/" },
      ico.specialCategory,
    ],
  },
  {
    slug: "writing-an-ai-policy",
    title: "Agree your church's AI rules",
    summary: "What to include in a short AI policy, and how to agree it with your trustees.",
    part: "Part 4: AI",
    register: "plain",
    lastReviewed: reviewed,
    sources: [
      {
        title: "Diocese of York: Understanding PCC Responsibilities in the Use of Artificial Intelligence (Word document)",
        url: "https://dioceseofyork.org.uk/wp-content/uploads/2026/02/AI-Advice-for-PCCs-v2.docx",
      },
      { title: "United Reformed Church: Generative AI: The Essentials", url: "https://urc.org.uk/generative-ai-guidance/" },
    ],
  },

  // Part 5: Implementation
  {
    slug: "roles-and-responsibilities",
    title: "Share the work: roles and responsibilities",
    summary: "Who does what, so your digital work doesn't depend on one person.",
    part: "Part 5: Implementation",
    register: "plain",
    lastReviewed: reviewed,
    sources: [{ title: "Charity Commission: The essential trustee (CC3)", url: "https://www.gov.uk/government/publications/the-essential-trustee-what-you-need-to-know-cc3" }],
  },
  {
    slug: "bringing-people-along",
    title: "Bring your trustees and congregation with you",
    summary: "How to make a good decision, explain the change, and help everyone take part.",
    part: "Part 5: Implementation",
    register: "plain",
    lastReviewed: reviewed,
    sources: [{ title: "Scripture reference: 1 Corinthians 12:12–26" }],
  },
];

export function getGuidancePage(slug: string): GuidancePage | undefined {
  return guidancePages.find((page) => page.slug === slug);
}

export function getAdjacentPages(slug: string) {
  const index = guidancePages.findIndex((page) => page.slug === slug);
  return {
    previous: index > 0 ? guidancePages[index - 1] : undefined,
    next: index >= 0 ? guidancePages[index + 1] : undefined,
  };
}

export function guidanceByPart(): (Part & { pages: GuidancePage[] })[] {
  return parts.map((part) => ({ ...part, pages: guidancePages.filter((page) => page.part === part.name) }));
}
