export type Article = {
  id: string
  title: string
  excerpt: string
  body: string[]
  category: string
  readTime: number
  date: string
  author: string
  authorRole: string
  avatar: string
  color: string
  tags: string[]
  featured: boolean
}

export const articles: Article[] = [
  {
    id: "understanding-ngo-compliance-india",
    title: "Understanding NGO Compliance in India: A Complete Guide",
    excerpt:
      "A comprehensive overview of regulatory requirements for NGOs operating in India, including FCRA, 12A/80G registration, and MCA compliance.",
    body: [
      "Running an NGO in India is a rewarding but regulatory-intensive endeavour. From the moment you register your organisation to the day-to-day management of finances and donor reporting, compliance touches every corner of your operations. This guide walks you through the most critical requirements.",
      "## Registration — Choosing the Right Structure\n\nNGOs in India can be registered as a Trust (under the Indian Trusts Act, 1882), a Society (under the Societies Registration Act, 1860), or a Section 8 Company (under the Companies Act, 2013). Each structure has different compliance obligations. Section 8 companies carry the heaviest regulatory burden but offer the strongest credibility to institutional donors.",
      "## 12A and 80G Registration\n\n12A registration grants your NGO income-tax exemption on its surplus income. 80G registration allows your donors to claim a 50% deduction on their donations — a major fundraising advantage. Both applications are filed online through the Income Tax portal. From FY 2022-23, both registrations are provisional for three years and must be renewed.",
      "## FCRA — Foreign Contribution Regulation Act\n\nIf your NGO plans to receive funds from foreign individuals, foundations, or governments, FCRA registration with the Ministry of Home Affairs is mandatory. FCRA funds must flow into a dedicated SBI branch in New Delhi. Annual FC-4 returns must be filed by 31 December each year. Non-compliance leads to cancellation and significant penalties.",
      "## MCA Filings for Section 8 Companies\n\nSection 8 companies must file MGT-7 (Annual Return) and AOC-4 (Financial Statements) with the MCA each year. Directors must complete their KYC annually. Failure to file on time attracts Rs 100 per day penalty per form.",
      "## Key Takeaways\n\n1. Choose your registration structure based on your funding sources and governance needs.\n2. Apply for 12A and 80G early — the process can take 3-6 months.\n3. Open a separate FCRA account if you receive or plan to receive foreign funds.\n4. Maintain proper books of accounts — the Income Tax Act requires NGOs to maintain books if income exceeds Rs 2.5 lakh per year.\n5. File all annual returns on time to avoid penalties and maintain your good standing.",
    ],
    category: "NGO",
    readTime: 8,
    date: "2026-05-20",
    author: "Manish Mandal",
    authorRole: "Compliance Expert",
    avatar: "MM",
    color: "from-purple-500 to-primary-500",
    tags: ["NGO", "Compliance", "FCRA"],
    featured: true,
  },
  {
    id: "top-5-accounting-mistakes-ngos",
    title: "Top 5 Accounting Mistakes NGOs Make and How to Avoid Them",
    excerpt:
      "Learn about the most common financial management mistakes made by non-profit organisations and practical strategies to prevent them.",
    body: [
      "Non-profit organisations are often staffed by passionate people who entered the sector to create change — not to manage ledgers. As a result, financial management errors are common and can have serious consequences, from loss of donor trust to tax penalties. Here are the five mistakes we see most often.",
      "## 1. Mixing Restricted and Unrestricted Funds\n\nRestricted funds must be used only for the purposes specified by the donor. Mixing them with general funds is one of the most common — and dangerous — mistakes. Set up separate cost centres or sub-accounts for each restricted grant and track every expenditure against it.",
      "## 2. Skipping the Bank Reconciliation\n\nMany NGOs reconcile their bank statements quarterly or not at all. Monthly reconciliation is the minimum standard. Undetected errors, duplicate payments, or fraud can compound for months if reconciliation is skipped.",
      "## 3. Poor Documentation of Expenses\n\nEvery expense must have a bill or voucher. Auditors — and the Income Tax Department — will ask for supporting documents. Keep originals, scan them, and store them for at least 8 years. Create an expense approval workflow so no payment is made without authorisation.",
      "## 4. Not Preparing a Budget Before the Year Begins\n\nOperating without a budget means you have no benchmark to measure actual spending against. Prepare a detailed budget at the start of each financial year, break it down by project and quarter, and review actual vs. budget monthly.",
      "## 5. Delaying Statutory Filings\n\nIncome tax returns, TDS returns, and MCA filings have firm deadlines. Late fees and penalties quickly add up. Create a compliance calendar with all due dates for the year and assign a responsible person to each filing.",
    ],
    category: "Accounting",
    readTime: 6,
    date: "2026-05-15",
    author: "Priya Sharma",
    authorRole: "Senior Accountant",
    avatar: "PS",
    color: "from-blue-500 to-cyan-500",
    tags: ["Accounting", "NGO", "Finance"],
    featured: false,
  },
  {
    id: "income-tax-filing-non-profits",
    title: "Income Tax Filing for Non-Profit Organisations: Step-by-Step",
    excerpt:
      "A practical step-by-step guide to filing income tax returns for NGOs and non-profit organisations under Indian tax laws.",
    body: [
      "Filing income tax returns as an NGO is different from filing as an individual or a business. Even though your organisation may be exempt from tax, you are still required to file a return every year. Here is a step-by-step breakdown of the process.",
      "## Step 1 — Determine the Applicable ITR Form\n\nNGOs registered as trusts or societies use ITR-7. Section 8 companies also use ITR-7. Ensure you have your PAN and are registered on the Income Tax e-filing portal.",
      "## Step 2 — Prepare Your Financial Statements\n\nYou will need an Income & Expenditure account and a Balance Sheet for the year. These must be prepared on an accrual basis. Get your accounts audited if your total income exceeds Rs 2.5 lakh — which it almost certainly does.",
      "## Step 3 — Audit Under Section 12A\n\nIf your NGO has 12A registration, an audit report in Form 10B (or Form 10BB for larger organisations) must be filed before the return. This is done by a Chartered Accountant. The audit report must be uploaded on the portal at least 30 days before the return due date.",
      "## Step 4 — File the Return\n\nThe due date for NGOs is October 31 of the assessment year. Log in to the Income Tax portal, select ITR-7, fill in all schedules (income, application of funds, assets & liabilities), attach the audit report, and submit. Verify using DSC or EVC.",
      "## Step 5 — Respond to Notices Promptly\n\nThe Income Tax Department may send notices under Section 143(1) for processing, or 143(2) for scrutiny. Respond within the deadline. Engage a CA if you receive a scrutiny notice — the consequences of ignoring them are severe.",
    ],
    category: "Tax",
    readTime: 10,
    date: "2026-05-10",
    author: "Rahul Verma",
    authorRole: "Tax Advisor",
    avatar: "RV",
    color: "from-orange-500 to-yellow-500",
    tags: ["Tax", "Income Tax", "Filing"],
    featured: false,
  },
  {
    id: "how-to-register-ngo-india-2026",
    title: "How to Register an NGO in India: Complete 2026 Guide",
    excerpt:
      "Everything you need to know about registering a non-governmental organisation in India — Trust, Society, or Section 8 Company.",
    body: [
      "Starting an NGO in India begins with a critical decision: which legal structure to choose. Each structure — Trust, Society, or Section 8 Company — has distinct advantages, compliance requirements, and credibility implications. This guide covers each option and the step-by-step registration process.",
      "## Trust (Indian Trusts Act, 1882)\n\nA public charitable trust is registered with the office of the Charity Commissioner (state-specific). You need a minimum of two trustees, a trust deed, and stamp duty payment. Trusts are relatively easy to form but can be harder to scale. Best suited for individual philanthropists and family foundations.",
      "## Society (Societies Registration Act, 1860)\n\nA society requires a minimum of 7 members and a Memorandum of Association. Registration is with the Registrar of Societies in the state. Societies are democratic — members elect a governing body. Widely used for professional associations and educational institutions.",
      "## Section 8 Company (Companies Act, 2013)\n\nA Section 8 company is incorporated through the MCA portal. It requires at least two directors and two shareholders (can be the same persons), a Memorandum and Articles of Association, and a digital signature. Central government grants a licence under Section 8. This structure carries the highest credibility and is preferred by institutional donors and CSR funds.",
      "## Step-by-Step: Section 8 Company Registration\n\n1. Obtain DSCs for all directors.\n2. Apply for DIN (Director Identification Number).\n3. Reserve a name via the RUN-NP form on the MCA portal.\n4. File SPICe+ form with MoA and AoA.\n5. Obtain Section 8 licence in Form INC-12.\n6. Receive Certificate of Incorporation.\n7. Apply for PAN and TAN.\n8. Open a bank account.\n\nThe entire process typically takes 4-8 weeks.",
      "## Post-Registration Steps\n\nOnce registered, apply for 12A and 80G immediately. If you plan to receive foreign funds, apply for FCRA. Enroll your employees under PF and ESI if your staff exceeds 10. Prepare a proper Chart of Accounts and begin monthly bookkeeping from day one.",
    ],
    category: "NGO",
    readTime: 12,
    date: "2026-05-05",
    author: "Anjali Gupta",
    authorRole: "Legal Consultant",
    avatar: "AG",
    color: "from-green-500 to-teal-500",
    tags: ["NGO", "Registration", "Legal"],
    featured: true,
  },
  {
    id: "career-guide-ngo-sector-india",
    title: "Career Guide: Working in India's NGO Sector",
    excerpt:
      "An honest guide to building a career in India's non-profit sector — opportunities, challenges, salary expectations, and how to get started.",
    body: [
      "A career in India's non-profit sector is not for everyone — but for the right person, it offers purpose, variety, and impact that few other fields can match. Here is what you actually need to know before making the leap.",
      "## The Landscape\n\nIndia has over 3 million registered NGOs, though far fewer are active and well-funded. The sector spans education, healthcare, livelihoods, environment, women's empowerment, disaster relief, and more. Major employers include large national NGOs (like Pratham, Aga Khan Foundation), international NGOs (like Oxfam, Save the Children), and CSR implementation partners.",
      "## Roles and Salaries\n\nEntry-level programme associates can expect Rs 15,000–25,000/month at smaller NGOs, or Rs 30,000–45,000 at international organisations. Mid-level programme managers with 4-6 years of experience earn Rs 50,000–90,000. Senior roles (Director, Head of Programmes) can command Rs 1.5–4 lakh/month at large organisations. Accounts and compliance roles typically pay 10–20% below equivalent private sector positions.",
      "## Skills in High Demand\n\n1. M&E (Monitoring & Evaluation) — Every donor wants data. M&E skills are the fastest route to a senior role.\n2. Grant writing — The ability to write compelling proposals is rare and extremely valuable.\n3. Financial management — NGO accountants who understand restricted-fund accounting are always in demand.\n4. Communication — Report writing, donor communication, and stakeholder engagement are essential.\n5. Technology — Data tools (KoboCollect, Power BI) and CRM experience set you apart.",
      "## How to Get Started\n\nVolunteer or intern first to understand the culture. Apply to fellowships like the Young India Fellowship, Gandhi Fellowship, or Teach for India. Join professional networks like DevEx, NGOBOX, or local resource centres. Build your profile on LinkedIn with specific impact metrics from your work.",
      "## The Honest Challenges\n\nHigh burnout rates, limited job security tied to project funding, slow career progression at smaller NGOs, and the emotional weight of working in difficult contexts are real. Build clear boundaries, find a mentor, and ensure your organisation has a functional HR policy before you join.",
    ],
    category: "Career",
    readTime: 7,
    date: "2026-04-28",
    author: "Suresh Kumar",
    authorRole: "HR Specialist",
    avatar: "SK",
    color: "from-pink-500 to-rose-500",
    tags: ["Career", "NGO", "Jobs"],
    featured: false,
  },
  {
    id: "mca-annual-filing-2026",
    title: "MCA Annual Filing Requirements for Companies: 2026 Update",
    excerpt:
      "Updated guide on MCA annual filing requirements for private limited companies and LLPs in India.",
    body: [
      "Every company incorporated under the Companies Act, 2013 must file annual returns with the Ministry of Corporate Affairs (MCA). Missing deadlines attracts heavy penalties and can lead to the company being struck off the register. Here is the complete 2026 update.",
      "## Key Annual Filings for Private Limited Companies\n\n**MGT-7A (Annual Return)** — Due within 60 days of the AGM (typically by November 29 for companies with a March 31 year-end). Includes details of shareholding, directors, and key management personnel.\n\n**AOC-4 (Financial Statements)** — Due within 30 days of the AGM (typically by October 29). Includes Balance Sheet, Profit & Loss, Cash Flow, and auditor's report. XBRL filing is mandatory for certain classes of companies.\n\n**DIR-3 KYC** — Every director must complete annual KYC by September 30 each year. Failure results in DIN deactivation.",
      "## Key Annual Filings for LLPs\n\n**Form 11 (Annual Return)** — Due by May 30 each year. Lists all partners and their contributions.\n\n**Form 8 (Statement of Accounts)** — Due by October 30. Includes Statement of Solvency and a Statement of Accounts. Audit required if turnover exceeds Rs 40 lakh or contribution exceeds Rs 25 lakh.",
      "## Penalty Structure (2026)\n\nLate filing of AOC-4 and MGT-7 attracts Rs 100 per day per form — with no maximum cap since the Companies (Amendment) Act 2018. A company that delays by 6 months can easily face penalties of Rs 18,000 per form. Directors of companies that have not filed for 3 consecutive years can be disqualified under Section 164(2).",
      "## 2026 Changes to Watch\n\nThe MCA has been progressively mandating centralised processing of forms and stricter STP (Straight Through Processing) for certain filings. Companies should ensure their registered office address is current, as physical notices are still sent for show-cause proceedings. The MCA V3 portal is now the primary filing interface — ensure your DSCs are compatible.",
    ],
    category: "Compliance",
    readTime: 5,
    date: "2026-04-22",
    author: "Manish Mandal",
    authorRole: "Compliance Expert",
    avatar: "MM",
    color: "from-cyan-500 to-sky-500",
    tags: ["MCA", "Compliance", "Annual Filing"],
    featured: false,
  },
]

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id)
}

export function getRelatedArticles(current: Article, count = 3): Article[] {
  return articles
    .filter((a) => a.id !== current.id && (a.category === current.category || a.tags.some((t) => current.tags.includes(t))))
    .slice(0, count)
}
