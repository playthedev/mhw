export type Lesson = {
  title: string
  duration: string  // e.g. "12 min"
  free?: boolean    // preview lessons visible without enrollment
}

export type Module = {
  title: string
  lessons: Lesson[]
}

export type Course = {
  id: string
  title: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  lessons: number
  students: number       // seed/baseline count; UI adds real DB count on top
  rating: number
  reviews: number
  price: number
  originalPrice?: number
  offerEndsAt?: string   // ISO date — strikethrough pricing shown while offer is active
  batchStartsAt?: string // ISO date — display only
  instructor: string
  instructorRole: string
  instructorAvatar: string
  instructorBio: string
  badge: string | null
  badgeColor: string
  gradient: string
  color: string
  description: string
  about: string
  outcomes: string[]
  syllabus: Module[]
  requirements: string[]
  featured: boolean
}

export const courses: Course[] = [
  {
    id: "ngo-management-fundamentals",
    title: "NGO Management & Compliance Fundamentals",
    category: "NGO",
    level: "Beginner",
    duration: "8 weeks",
    lessons: 24,
    students: 0,
    rating: 4.9,
    reviews: 89,
    price: 15000,
    instructor: "Manish Mandal",
    instructorRole: "Compliance Expert",
    instructorAvatar: "MM",
    instructorBio: "Manish has 12+ years of hands-on experience advising Indian NGOs on regulatory compliance, FCRA filings, and governance. He has worked with 50+ non-profits across India and regularly trains auditors and CSR teams.",
    badge: "Best Seller",
    badgeColor: "bg-gold-500/10 text-gold-400 border-gold-500/20",
    gradient: "from-purple-500/20 to-primary-500/10",
    color: "from-purple-500 to-primary-500",
    description: "Master NGO governance, compliance requirements, and financial management. Perfect for NGO professionals and new entrants.",
    about: "This course is designed for professionals entering or growing within India's NGO sector. You will learn how to navigate the regulatory landscape, manage finances responsibly, and build a compliant, well-governed organisation. The course combines practical frameworks with real-world case studies from Indian NGOs.",
    outcomes: [
      "Understand the full regulatory framework for NGOs in India",
      "Set up proper financial management systems from day one",
      "Prepare and file 12A, 80G, and FCRA applications confidently",
      "Create donor reports that meet international standards",
      "Design and implement an M&E framework for your programmes",
      "Manage grants and ensure restricted-fund compliance",
    ],
    syllabus: [
      {
        title: "Module 1 — NGO Sector in India",
        lessons: [
          { title: "Overview of the non-profit landscape", duration: "14 min", free: true },
          { title: "Types of NGOs: Trust, Society, Section 8", duration: "18 min", free: true },
          { title: "Key regulators: MCA, Income Tax, MHA", duration: "12 min" },
        ],
      },
      {
        title: "Module 2 — Regulatory Framework & Compliance",
        lessons: [
          { title: "12A and 80G registration walkthrough", duration: "22 min" },
          { title: "FCRA registration and annual filing", duration: "25 min" },
          { title: "MCA annual return for Section 8 companies", duration: "19 min" },
        ],
      },
      {
        title: "Module 3 — Financial Management",
        lessons: [
          { title: "Chart of accounts for NGOs", duration: "16 min" },
          { title: "Restricted vs. unrestricted fund accounting", duration: "20 min" },
          { title: "Budget preparation and monitoring", duration: "18 min" },
        ],
      },
      {
        title: "Module 4 — Donor Reporting & Accountability",
        lessons: [
          { title: "Narrative and financial reporting to donors", duration: "21 min" },
          { title: "International reporting standards (IPSAS basics)", duration: "17 min" },
          { title: "Building donor trust and transparency", duration: "14 min" },
        ],
      },
      {
        title: "Module 5 — Grant Management",
        lessons: [
          { title: "Understanding grant agreements", duration: "15 min" },
          { title: "Procurement and asset management", duration: "19 min" },
          { title: "Audit preparation for grant funds", duration: "22 min" },
        ],
      },
      {
        title: "Module 6 — Monitoring & Evaluation",
        lessons: [
          { title: "Designing a results framework", duration: "16 min" },
          { title: "Data collection and verification", duration: "13 min" },
          { title: "Reporting outcomes to stakeholders", duration: "18 min" },
        ],
      },
    ],
    requirements: [
      "No prior NGO experience required",
      "Basic understanding of Microsoft Excel",
      "Interest in the social sector",
    ],
    featured: true,
  },
  {
    id: "accounting-basics-nonprofits",
    title: "Accounting Basics for Non-Profits",
    category: "Accounting",
    level: "Beginner",
    duration: "24 Hours (8 Sessions)",
    lessons: 18,
    students: 0,
    rating: 4.8,
    reviews: 67,
    price: 11999,
    originalPrice: 24999,
    offerEndsAt: "2026-06-30",
    batchStartsAt: "2026-07-03",
    instructor: "Priya Sharma",
    instructorRole: "Senior Accountant",
    instructorAvatar: "PS",
    instructorBio: "Priya is a Chartered Accountant with 9 years of experience in non-profit accounting. She has audited 30+ NGOs and specialises in making financial concepts accessible to non-finance professionals.",
    badge: "Popular",
    badgeColor: "bg-primary-500/10 text-primary-400 border-primary-500/20",
    gradient: "from-blue-500/20 to-cyan-500/10",
    color: "from-blue-500 to-cyan-500",
    description: "Learn the fundamentals of accounting specifically designed for non-profit organisations. No prior accounting experience required.",
    about: "This course demystifies accounting for non-profit professionals who are not from a finance background. By the end, you will be able to maintain books, prepare basic financial statements, and hold informed conversations with auditors and donors.",
    outcomes: [
      "Understand core accounting principles and how they apply to NGOs",
      "Set up and maintain a proper chart of accounts",
      "Record transactions using double-entry bookkeeping",
      "Prepare Income & Expenditure accounts and Balance Sheets",
      "Create and monitor annual budgets",
      "Prepare for statutory audits with confidence",
    ],
    syllabus: [
      {
        title: "Module 1 — Accounting Principles",
        lessons: [
          { title: "Accrual vs. cash accounting", duration: "13 min", free: true },
          { title: "Key concepts: assets, liabilities, income, expenditure", duration: "15 min", free: true },
          { title: "GAAP basics for non-profits", duration: "11 min" },
        ],
      },
      {
        title: "Module 2 — Chart of Accounts",
        lessons: [
          { title: "Designing a COA for an NGO", duration: "17 min" },
          { title: "Programme vs. administrative cost centres", duration: "14 min" },
          { title: "Tally/QuickBooks setup walkthrough", duration: "22 min" },
        ],
      },
      {
        title: "Module 3 — Double Entry Bookkeeping",
        lessons: [
          { title: "Debits and credits explained simply", duration: "16 min" },
          { title: "Journal entries with real NGO examples", duration: "20 min" },
          { title: "Bank reconciliation", duration: "18 min" },
        ],
      },
      {
        title: "Module 4 — Financial Statements",
        lessons: [
          { title: "Income & Expenditure statement", duration: "19 min" },
          { title: "Balance Sheet preparation", duration: "21 min" },
          { title: "Cash Flow statement basics", duration: "15 min" },
        ],
      },
      {
        title: "Module 5 — Budget Management",
        lessons: [
          { title: "Annual budget preparation", duration: "17 min" },
          { title: "Budget vs. actuals analysis", duration: "14 min" },
          { title: "Re-forecasting mid-year", duration: "12 min" },
        ],
      },
      {
        title: "Module 6 — Audit Preparation",
        lessons: [
          { title: "Statutory audit requirements", duration: "16 min" },
          { title: "Supporting documents checklist", duration: "13 min" },
          { title: "Responding to auditor queries", duration: "15 min" },
        ],
      },
    ],
    requirements: [
      "No accounting experience needed",
      "Access to a spreadsheet application (Excel or Google Sheets)",
    ],
    featured: false,
  },
  {
    id: "tally-prime-gst-cost-centre",
    title: "Tally Prime with GST, Cost Centre & Business Accounting",
    category: "Accounting",
    level: "Beginner",
    duration: "30 Hours (15 Sessions)",
    lessons: 15,
    students: 0,
    rating: 4.8,
    reviews: 0,
    price: 5999,
    originalPrice: 12000,
    offerEndsAt: "2026-06-30",
    batchStartsAt: "2026-07-03",
    instructor: "Priya Sharma",
    instructorRole: "Senior Accountant",
    instructorAvatar: "PS",
    instructorBio: "Priya is a Chartered Accountant with 9 years of experience in non-profit accounting. She has audited 30+ NGOs and specialises in making financial concepts accessible to non-finance professionals.",
    badge: "New Batch",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    gradient: "from-indigo-500/20 to-violet-500/10",
    color: "from-indigo-500 to-violet-500",
    description: "Master Tally Prime for day-to-day accounting, GST compliance, and Cost Centre-based expense tracking. Ideal for students, accountants, NGO finance staff, and small business owners.",
    about: "This course takes you from accounting fundamentals through to running a full set of books in Tally Prime — including GST returns and Cost Centre / Cost Category allocation for department-wise and project-wise reporting. Built around practical, hands-on exercises rather than theory alone, with real GST and NGO project accounting case studies.",
    outcomes: [
      "Understand accounting fundamentals in Tally Prime",
      "Create and manage company accounts",
      "Record daily accounting transactions confidently",
      "Manage GST accounting and compliance, including GSTR-1 and GSTR-3B",
      "Create and utilise Cost Centres and Cost Categories",
      "Generate financial reports and GST reports",
      "Maintain books of accounts efficiently",
    ],
    syllabus: [
      {
        title: "Module 1 — Introduction to Accounting & Tally Prime",
        lessons: [
          { title: "Accounting concepts and golden rules", duration: "18 min", free: true },
          { title: "Types of accounts and the accounting cycle", duration: "15 min", free: true },
          { title: "Tally Prime interface walkthrough", duration: "20 min" },
        ],
      },
      {
        title: "Module 2 — Company Setup & Ledger Management",
        lessons: [
          { title: "Company creation, alteration & features", duration: "22 min" },
          { title: "Security control and data backup/restore", duration: "14 min" },
          { title: "Groups, ledgers and opening balances", duration: "19 min" },
        ],
      },
      {
        title: "Module 3 — Vouchers & Inventory",
        lessons: [
          { title: "Voucher types: payment, receipt, contra, journal", duration: "20 min" },
          { title: "Purchase, sales & inventory management", duration: "23 min" },
          { title: "Stock groups, categories and godowns", duration: "17 min" },
        ],
      },
      {
        title: "Module 4 — GST Accounting",
        lessons: [
          { title: "GST fundamentals and setup in Tally", duration: "21 min" },
          { title: "GST purchase & sales entries (intra & inter-state)", duration: "25 min" },
          { title: "GSTR-1, GSTR-3B and reconciliation", duration: "24 min" },
        ],
      },
      {
        title: "Module 5 — Cost Centre Accounting",
        lessons: [
          { title: "Cost Centres and Cost Categories — concepts", duration: "18 min" },
          { title: "Creating Cost Centres & allocating expenses", duration: "20 min" },
          { title: "Department-wise and project-wise accounting", duration: "19 min" },
        ],
      },
      {
        title: "Module 6 — Reconciliation, Payroll & Reporting",
        lessons: [
          { title: "Bank reconciliation & outstanding management", duration: "17 min" },
          { title: "Payroll basics and employee cost allocation", duration: "18 min" },
          { title: "P&L, Balance Sheet and Cash Flow reports", duration: "22 min" },
        ],
      },
    ],
    requirements: [
      "No prior Tally or accounting experience required",
      "Access to a computer (Tally Prime software covered in course)",
    ],
    featured: false,
  },
  {
    id: "advanced-tax-compliance",
    title: "Advanced Tax Compliance & Filing",
    category: "Tax",
    level: "Intermediate",
    duration: "10 weeks",
    lessons: 30,
    students: 0,
    rating: 4.7,
    reviews: 45,
    price: 20000,
    instructor: "Hassan Raza",
    instructorRole: "Tax Advisor",
    instructorAvatar: "HR",
    instructorBio: "Hassan is a tax practitioner with 14 years of experience in direct and indirect taxation. He has represented clients at Income Tax tribunals and regularly consults on GST matters for mid-size businesses and NGOs.",
    badge: "New",
    badgeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    gradient: "from-green-500/20 to-teal-500/10",
    color: "from-green-500 to-teal-500",
    description: "Deep dive into India's tax system, Income Tax & GST compliance, and advanced tax planning strategies for businesses and NGOs.",
    about: "Designed for accountants, finance managers, and tax practitioners who want to sharpen their skills and stay current with India's evolving tax laws. The course covers both direct and indirect taxation with hands-on filing practice.",
    outcomes: [
      "Navigate India's Income Tax Act 1961 with confidence",
      "File GST returns and handle GST notices independently",
      "Compute TDS, deposit it correctly, and file TDS returns",
      "Prepare and file ITR-7 for NGOs and trusts",
      "Handle Income Tax notices and attend assessments",
      "Design tax-efficient structures for businesses and NGOs",
    ],
    syllabus: [
      {
        title: "Module 1 — India Tax System Overview",
        lessons: [
          { title: "Direct vs. indirect taxes", duration: "12 min", free: true },
          { title: "Key authorities: CBDT, CBIC, GST Council", duration: "10 min", free: true },
          { title: "Filing deadlines calendar", duration: "9 min" },
        ],
      },
      {
        title: "Module 2 — Income Tax Act 1961",
        lessons: [
          { title: "Heads of income", duration: "18 min" },
          { title: "Deductions and exemptions", duration: "22 min" },
          { title: "Tax computation for individuals, companies, trusts", duration: "25 min" },
        ],
      },
      {
        title: "Module 3 — GST Act & Returns",
        lessons: [
          { title: "GST registration and threshold", duration: "15 min" },
          { title: "GSTR-1, GSTR-3B, GSTR-9 filing", duration: "28 min" },
          { title: "Input tax credit reconciliation", duration: "20 min" },
        ],
      },
      {
        title: "Module 4 — TDS Provisions",
        lessons: [
          { title: "TDS deduction rates and thresholds", duration: "17 min" },
          { title: "Deposit and challan filing", duration: "14 min" },
          { title: "Form 26Q and 24Q returns", duration: "19 min" },
        ],
      },
      {
        title: "Module 5 — Tax Returns Filing",
        lessons: [
          { title: "ITR-7 for NGOs step by step", duration: "30 min" },
          { title: "ITR-3, ITR-4 for professionals", duration: "25 min" },
          { title: "Revised and belated returns", duration: "16 min" },
        ],
      },
      {
        title: "Module 6 — Tax Audit & Notices",
        lessons: [
          { title: "Section 44AB tax audit", duration: "22 min" },
          { title: "Responding to 143(1) and 143(2) notices", duration: "18 min" },
          { title: "Penalty and appeal provisions", duration: "15 min" },
        ],
      },
    ],
    requirements: [
      "Basic knowledge of accounting (Modules 1–3 of Accounting Basics OR equivalent)",
      "Familiarity with ITR filing basics",
    ],
    featured: false,
  },
  {
    id: "ngo-internship-program",
    title: "NGO Sector Internship Program",
    category: "Internship",
    level: "Beginner",
    duration: "12 weeks",
    lessons: 40,
    students: 0,
    rating: 5.0,
    reviews: 32,
    price: 25000,
    instructor: "MHW Consultancy Team",
    instructorRole: "Expert Panel",
    instructorAvatar: "MH",
    instructorBio: "The MHW Consultancy expert panel brings together certified compliance advisors, grant writers, and project managers with 10–18 years of combined NGO sector experience. All mentors have worked on live client engagements.",
    badge: "Limited Seats",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    gradient: "from-pink-500/20 to-rose-500/10",
    color: "from-pink-500 to-rose-500",
    description: "Comprehensive internship programme for individuals seeking to enter the NGO sector. Includes mentorship, practical assignments, and certification.",
    about: "This is not a passive course — it is a structured internship programme run by the MHW Consultancy team. You will work on real client-adjacent tasks, receive weekly mentorship calls, and graduate with a portfolio of work and a verified certificate that carries weight with NGO employers.",
    outcomes: [
      "Understand the full NGO ecosystem in India end-to-end",
      "Manage projects using industry-standard tools",
      "Write fundable grant proposals from scratch",
      "Complete field-simulation assignments with mentor feedback",
      "Prepare financial reports for a mock NGO",
      "Graduate with a verifiable MHW Consultancy certificate",
    ],
    syllabus: [
      {
        title: "Phase 1 — Orientation (Weeks 1–2)",
        lessons: [
          { title: "NGO ecosystem and career paths", duration: "20 min", free: true },
          { title: "Introduction to your mentor", duration: "15 min", free: true },
          { title: "Setting learning goals", duration: "10 min" },
        ],
      },
      {
        title: "Phase 2 — Project Management (Weeks 3–5)",
        lessons: [
          { title: "Logical Framework Approach (LFA)", duration: "25 min" },
          { title: "Work planning and scheduling", duration: "18 min" },
          { title: "Risk management basics", duration: "15 min" },
        ],
      },
      {
        title: "Phase 3 — Proposal Writing (Weeks 6–8)",
        lessons: [
          { title: "Grant landscape in India", duration: "20 min" },
          { title: "Proposal structure and narrative writing", duration: "30 min" },
          { title: "Budget development for proposals", duration: "22 min" },
        ],
      },
      {
        title: "Phase 4 — Field Simulation (Weeks 9–10)",
        lessons: [
          { title: "Data collection design", duration: "18 min" },
          { title: "Community engagement basics", duration: "16 min" },
          { title: "Field report writing", duration: "20 min" },
        ],
      },
      {
        title: "Phase 5 — Financial Reporting (Weeks 11–12)",
        lessons: [
          { title: "Donor financial reporting formats", duration: "22 min" },
          { title: "Audit trail documentation", duration: "18 min" },
          { title: "Final presentation to panel", duration: "35 min" },
        ],
      },
    ],
    requirements: [
      "Genuine interest in the social sector",
      "Commitment to attend weekly mentor calls",
      "Time commitment of at least 15 hours per week",
    ],
    featured: true,
  },
  {
    id: "mca-corporate-compliance",
    title: "MCA & Corporate Compliance",
    category: "Compliance",
    level: "Intermediate",
    duration: "6 weeks",
    lessons: 20,
    students: 0,
    rating: 4.6,
    reviews: 38,
    price: 18000,
    instructor: "Anjali Gupta",
    instructorRole: "Legal Consultant",
    instructorAvatar: "AG",
    instructorBio: "Anjali is a practising Company Secretary with 11 years of experience in MCA filings, corporate governance, and Companies Act 2013 compliance. She has advised 80+ companies on their annual compliance obligations.",
    badge: null,
    badgeColor: "",
    gradient: "from-orange-500/20 to-yellow-500/10",
    color: "from-orange-500 to-yellow-500",
    description: "Navigate MCA regulations, company filing requirements, and corporate compliance obligations under Indian Companies Act 2013.",
    about: "This course is built for company secretaries, compliance officers, finance managers, and founders who need to stay on the right side of the Companies Act 2013. Each module includes practical filing walkthroughs on the MCA V3 portal.",
    outcomes: [
      "Understand all annual compliance obligations under Companies Act 2013",
      "File MGT-7A and AOC-4 on the MCA portal independently",
      "Maintain statutory registers and minute books correctly",
      "Handle Director KYC (DIR-3) and DIN-related filings",
      "Navigate LLP compliance including Form 8 and Form 11",
      "Respond to MCA show-cause notices effectively",
    ],
    syllabus: [
      {
        title: "Module 1 — Companies Act 2013",
        lessons: [
          { title: "Key provisions and definitions", duration: "15 min", free: true },
          { title: "Types of companies and their obligations", duration: "13 min", free: true },
          { title: "Role of the company secretary", duration: "11 min" },
        ],
      },
      {
        title: "Module 2 — MCA Filing Requirements",
        lessons: [
          { title: "MCA V3 portal walkthrough", duration: "20 min" },
          { title: "Annual return (MGT-7A) filing", duration: "25 min" },
          { title: "Financial statements (AOC-4) filing", duration: "22 min" },
        ],
      },
      {
        title: "Module 3 — Annual Return Submission",
        lessons: [
          { title: "AGM and EGM requirements", duration: "16 min" },
          { title: "Statutory registers: members, directors, charges", duration: "19 min" },
          { title: "XBRL filing for applicable companies", duration: "18 min" },
        ],
      },
      {
        title: "Module 4 — Corporate Governance",
        lessons: [
          { title: "Board meeting requirements", duration: "14 min" },
          { title: "Minutes of meetings", duration: "12 min" },
          { title: "Related party transactions", duration: "16 min" },
        ],
      },
      {
        title: "Module 5 — Directors' Obligations",
        lessons: [
          { title: "DIR-3 KYC annual process", duration: "15 min" },
          { title: "DIN surrender and reactivation", duration: "13 min" },
          { title: "Section 164 disqualification — how to avoid it", duration: "17 min" },
        ],
      },
      {
        title: "Module 6 — Penalties & Remedies",
        lessons: [
          { title: "Late filing penalty structure", duration: "12 min" },
          { title: "Compounding of offences", duration: "14 min" },
          { title: "Strike-off and revival of companies", duration: "16 min" },
        ],
      },
    ],
    requirements: [
      "Basic understanding of company law concepts",
      "Access to a computer for portal walkthroughs",
    ],
    featured: false,
  },
  {
    id: "grant-writing-fundraising",
    title: "Grant Writing & Fundraising for NGOs",
    category: "NGO",
    level: "Intermediate",
    duration: "4 weeks",
    lessons: 14,
    students: 0,
    rating: 4.8,
    reviews: 55,
    price: 10000,
    instructor: "Suresh Kumar",
    instructorRole: "Grant Specialist",
    instructorAvatar: "SK",
    instructorBio: "Suresh has 10 years of experience writing successful grant proposals for Indian NGOs. He has secured over ₹8 crore in grants from government, CSR, and bilateral donors, and trains NGO teams on proposal strategy.",
    badge: "Fast Track",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    gradient: "from-cyan-500/20 to-sky-500/10",
    color: "from-cyan-500 to-sky-500",
    description: "Learn to write winning grant proposals and develop effective fundraising strategies for your NGO.",
    about: "Grant writing is one of the most in-demand skills in the NGO sector — and one of the most under-taught. This fast-track course gives you a repeatable framework for writing proposals that get funded, backed by real examples from successful Indian NGOs.",
    outcomes: [
      "Map the grant landscape in India and identify the right funders",
      "Understand what donors actually look for in proposals",
      "Write a compelling problem statement and theory of change",
      "Develop realistic and defensible project budgets",
      "Meet reporting requirements and maintain donor relationships",
      "Build an annual fundraising plan for your organisation",
    ],
    syllabus: [
      {
        title: "Module 1 — Grant Landscape in India",
        lessons: [
          { title: "Government grants: CSR, NABARD, Govt schemes", duration: "18 min", free: true },
          { title: "Foundation and bilateral donors", duration: "15 min", free: true },
          { title: "Online crowdfunding platforms", duration: "12 min" },
        ],
      },
      {
        title: "Module 2 — Understanding Donor Requirements",
        lessons: [
          { title: "Reading grant guidelines carefully", duration: "14 min" },
          { title: "Eligibility checks", duration: "11 min" },
          { title: "Pre-application due diligence", duration: "13 min" },
        ],
      },
      {
        title: "Module 3 — Proposal Structure & Writing",
        lessons: [
          { title: "Problem statement and context", duration: "20 min" },
          { title: "Theory of change and results framework", duration: "22 min" },
          { title: "Narrative writing that persuades", duration: "25 min" },
        ],
      },
      {
        title: "Module 4 — Budget Development",
        lessons: [
          { title: "Budget line items explained", duration: "16 min" },
          { title: "Indirect and direct costs", duration: "13 min" },
          { title: "Budget justification notes", duration: "14 min" },
        ],
      },
    ],
    requirements: [
      "Basic knowledge of your NGO's programmes",
      "No prior grant writing experience needed",
    ],
    featured: false,
  },
]

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id)
}

export function getRelatedCourses(current: Course, count = 3): Course[] {
  return courses
    .filter((c) => c.id !== current.id && c.category === current.category)
    .slice(0, count)
    .concat(courses.filter((c) => c.id !== current.id && c.category !== current.category))
    .slice(0, count)
}
