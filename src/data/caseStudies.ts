export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  personName: string;
  orgName: string;
  updatedAt: string;
  heroImage: string;
  partnerLogo?: string;
  accentFrom: string;
  accentTo: string;
  challenge: {
    p1: string;
    p2: string;
    p3: string;
    quote: string;
    attribution?: string;
  };
  solution: {
    p1: string;
    p2: string;
    p3: string;
    quote: string;
    attribution?: string;
  };
  impact: {
    p1: string;
    p2: string;
    p3: string;
    quote: string;
    attribution?: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "grow-cycling-foundation",
    title: "Case Study — Loch",
    subtitle: "Learn how an online news site covering global market trends broke through page-one competition and established domain authority.",
    personName: "Prithvir Jhaveri",
    orgName: "Loch",
    updatedAt: "Aug 26, 2024",
    heroImage: "/placeholder.svg",
    accentFrom: "#F6C343",
    accentTo: "#F59E0B",
    challenge: {
      p1: "Loch is an online news site covering global market trends with a focus on US news, politics, and finance stories. Despite publishing on their blog consistently, they struggled to break into page-one results against bigger publishers.",
      p2: "Referral traffic had leveled off, and the site lacked the domain authority signals Google uses to trust and rank content from newer brands.",
      p3: "As a newer outlet competing with established media for the same headlines, Loch had great content but too few high-authority mentions pointing back to the site. The small team had no bandwidth for ongoing, white-hat outreach.",
      quote: "We were publishing strong stories, but they stalled on page two. We needed clear proof of authority that search engines and readers recognize.",
      attribution: "Prithvir Jhaveri, Founder, Loch"
    },
    solution: {
      p1: "BoostMyRank ran a fully managed outreach program to earn editorial backlinks from respected business and finance publications. We positioned Loch editors as quotable experts, responded to journalist requests on timely topics, and delivered 3–5 DA30+ links per month.",
      p2: "This enabled them to create a simple \"As Seen In\" section and media badges for the homepage, article templates, and author bios to showcase credibility.",
      p3: "We provided a hands-off workflow: We sourced opportunities, drafted quotes in the Loch voice, handled submissions and follow-ups, and provided monthly reports on newspaper placements (URL, anchor, DA, status).",
      quote: "Being cited by well-known outlets changed the conversation for us as partners and readers suddenly starting taking us more seriously.",
      attribution: "Prithvir Jhaveri, Founder, Loch"
    },
    impact: {
      p1: "In 90 days, Loch's Google domain authority increased by 9 points, organic sessions grew 68%, and 18 priority keywords moved into the top 10.",
      p2: "The site's newsletter signups rose 54%, which improved sponsorship interest and ad performance. New articles began indexing faster and earned visibility sooner because the brand now carried clear authority signals.",
      p3: "Authority: DA +9 in 90 days; referring domains up 42%. Visibility: 18 target keywords entered top-10 positions; new posts started ranking sooner. Growth: Organic sessions +68% QoQ; newsletter signups +54%; more inbound sponsor interest.",
      quote: "This investment in our digital authority has transformed our business trajectory.",
      attribution: "Prithvir Jhaveri, Founder, Loch"
    }
  },
  {
    slug: "truckee-chamber-commerce",
    title: "Case Study — How VoiceValet increased organic traffic 70% in 3 months using BoostMyRank",
    subtitle: "Learn how an AI phone-answering service turned missed calls into inbound pipeline by building domain authority.",
    personName: "Aidan Mattrick",
    orgName: "VoiceValet",
    updatedAt: "Aug 26, 2024",
    heroImage: "/placeholder.svg",
    accentFrom: "#F59E0B",
    accentTo: "#EC4899",
    challenge: {
      p1: "VoiceValet helps businesses answer every call with a smart AI that qualifies prospects, books appointments, and pushes clean data into the CRM, without adding human headcount. But the category is noisy and crowded.",
      p2: "Larger vendors dominated the SERP with long-standing authority. Referral traffic had plateaued, and many top-funnel keywords lingered on page two.",
      p3: "The team was focused on shipping product and customer stories, not managing ongoing outreach.",
      quote: "We were missing out on high-intent organic traffic because our brand didn't yet have the authority signals that buyers and Google look for.",
      attribution: "Aidan Mattrick, CEO, VoiceValet"
    },
    solution: {
      p1: "BoostMyRank executed a hands-off, white-hat editorial outreach program designed for CMOs who need results without adding workload.",
      p2: "Expert positioning: We matched VoiceValet's CEO to journalist requests on customer experience, lead capture, and AI in customer service, supplying concise quotes and proof points. Editorial backlinks: BoostMyRank delivered 3–5 DA30+ links per month from respected business, technology, and marketing outlets, all automated, with no paid link schemes or PBNs.",
      p3: "Clear reporting: Monthly CSV and dashboard with URL, anchor, DA, status, and impact highlights the team could share in exec meetings.",
      quote: "Once we started appearing in well-known publications, sales conversations moved faster. Prospects came in already trusting the brand.",
      attribution: "Aidan Mattrick, CEO, VoiceValet"
    },
    impact: {
      p1: "In 90 days, domain authority rose +12 points, organic sessions grew 72%, and demo requests increased 58%, while customer acquisition costs (CAC) decreased 22% due to stronger organic performance. Domain Authority: +12 in 90 days; referring domains: +45%. 19 priority keywords moved into top-10 (e.g., \"AI receptionist,\" \"24/7 phone answering,\" \"AI book appointments\").",
      p2: "Organic sessions: +72% QoQ; demo requests: +58%; trial starts: +41%. New articles indexed faster and began ranking sooner due to stronger brand signals.",
      p3: "Paid CAC down 22% as organic took a larger share of conversions; SDRs reported shorter time-to-trust on discovery calls.",
      quote: "This program turned missed calls into a steady stream of qualified demos, and it did it without adding work to our team.",
      attribution: "Avery Kim, CMO, VoiceValet"
    }
  },
  {
    slug: "medical-alley-association",
    title: "How QT Marketing grew demo requests by 44% in 90 days by improving its backlinking strategy",
    subtitle: "Learn how a personal trainer marketing agency increased organic pipeline through strategic editorial placement and credibility building.",
    personName: "Quentin Thomassin",
    orgName: "QT Marketing",
    updatedAt: "Aug 26, 2024",
    heroImage: "/placeholder.svg",
    accentFrom: "#F6C343",
    accentTo: "#EAB308",
    challenge: {
      p1: "QT Marketing helps personal trainers win clients with targeted Facebook/Instagram ads and a proven follow-up script. Despite strong paid results, the brand struggled to rank on page one for core queries and to convert high-intent inbound traffic.",
      p2: "Larger agencies and directories dominated the SERP with long-standing authority. Referral traffic plateaued; many priority keywords sat on page two or three.",
      p3: "The team was focused on campaign execution, not ongoing PR or white-hat outreach.",
      quote: "We were winning in paid, but our brand signals didn't match our results. We needed credible mentions that search engines, and skeptical prospects, could recognize.",
      attribution: "Quentin Thomassin, Founder, QT Marketing"
    },
    solution: {
      p1: "BoostMyRank executed a hands-off, white-hat outreach program designed for busy growth teams.",
      p2: "Editorial backlinks (3–5/mo, DA30+): Consistent placements in business, marketing, and small-business outlets with no paid links or networks. Expert positioning: Rapid responses to journalist requests on lead generation, offer design, and follow-up scripting; concise quotes in QT's voice.",
      p3: "Clear reporting: Monthly CSV + summary (URL, anchor, DA, status) to keep track of all mentions and backlinks.",
      quote: "Once we started showing up in recognized publications, our organic traffic increased significantly. Plus, our prospects arrived already trusting us.",
      attribution: "Quentin Thomassin, Founder, QT Marketing"
    },
    impact: {
      p1: "In 90 days, domain authority rose +8 points, organic sessions grew 62%, and inbound demo requests increased 44%. Domain Authority: +8 in 90 days; referring domains: +38%. 15 priority keywords moved into the top-10 (e.g., \"find clients as a personal trainer,\" \"fitness coach marketing,\" \"Facebook ads for trainers\").",
      p2: "Organic sessions: +62% QoQ; inbound demo requests: +44%; more qualified conversations from non-paid channels. New case studies indexed faster and began ranking sooner due to stronger brand signals.",
      p3: "Homepage conversion rate lifted after adding media badges, reducing blended CAC and reliance on incremental ad spend.",
      quote: "The credibility boost didn't just help rankings, it also improved close rates. It's the compounder our paid engine was missing.",
      attribution: "Quentin Thomassin, Founder, QT Marketing"
    }
  },
  {
    slug: "space-industry-australia",
    title: "Space Industry Association Of Australia Launches Successful Career Platform Through Strategic Backlink Campaign",
    subtitle: "Learn how strategic media placement helped launch Australia's premier space industry job platform.",
    personName: "Emma Thompson",
    orgName: "Space Industry Association of Australia",
    updatedAt: "Aug 26, 2024",
    heroImage: "/placeholder.svg",
    accentFrom: "#10B981",
    accentTo: "#059669",
    challenge: {
      p1: "The Space Industry Association of Australia needed to establish credibility for their new career platform in a highly specialized and competitive field.",
      p2: "With limited brand recognition outside the immediate space industry, they struggled to attract both employers and job seekers to their new platform.",
      p3: "The niche nature of space industry careers required reaching very specific audiences through trusted industry channels and publications.",
      quote: "Breaking into this specialized market required credibility that only established industry recognition could provide.",
      attribution: "Emma Thompson, Platform Director"
    },
    solution: {
      p1: "BoostMyRank secured strategic placements in aerospace and defense publications, technology innovation websites, and government contractor directories.",
      p2: "Featured articles in space industry trade publications and science & technology magazines established the association's platform as the authoritative source for space careers.",
      p3: "High-authority backlinks from university aerospace programs and government space agencies added institutional credibility to the platform.",
      quote: "The strategic media placement gave us instant credibility with both employers and candidates.",
      attribution: "Emma Thompson, Platform Director"
    },
    impact: {
      p1: "Within six months of launch, the platform became the go-to destination for space industry careers in Australia, with over 200 active job postings.",
      p2: "Major aerospace companies and government agencies began using the platform exclusively for their specialized hiring needs.",
      p3: "The platform's success led to expansion opportunities and increased membership for the association itself.",
      quote: "We went from startup to industry standard faster than we ever imagined possible.",
      attribution: "Emma Thompson, Platform Director"
    }
  },
  {
    slug: "health-education-group",
    title: "Health Education Training Group Doubles Revenue Through Enhanced Digital Authority And Strategic Partnerships",
    subtitle: "Discover how a health education provider leveraged backlinks to attract major institutional partnerships.",
    personName: "Dr. Michael Rodriguez",
    orgName: "Health Education Training Group",
    updatedAt: "Aug 26, 2024",
    heroImage: "/placeholder.svg",
    accentFrom: "#F59E0B",
    accentTo: "#DC2626",
    challenge: {
      p1: "Health Education Training Group was struggling to compete with larger, more established training providers for lucrative institutional contracts.",
      p2: "Despite offering high-quality programs, they lacked the digital presence and credibility markers that large healthcare systems and educational institutions expected.",
      p3: "The competitive landscape required demonstrable thought leadership and industry recognition to win major contracts worth hundreds of thousands of dollars.",
      quote: "We had the expertise but lacked the visibility to compete for the contracts we deserved.",
      attribution: "Dr. Michael Rodriguez, CEO"
    },
    solution: {
      p1: "BoostMyRank secured authoritative backlinks from medical education journals, healthcare administration publications, and professional development websites.",
      p2: "Strategic placements in healthcare business magazines and medical training directories established the group as an industry thought leader.",
      p3: "Featured coverage in institutional publications helped build the credibility needed to approach major healthcare systems and educational institutions.",
      quote: "The enhanced credibility opened doors to conversations we couldn't have before.",
      attribution: "Dr. Michael Rodriguez, CEO"
    },
    impact: {
      p1: "Revenue doubled within 18 months as the group successfully secured three major institutional contracts worth over $500,000 each.",
      p2: "The enhanced digital authority led to speaking opportunities at major healthcare conferences and invitations to serve on industry advisory boards.",
      p3: "Organic website traffic increased by 280%, with high-intent visitors from target institutions comprising the majority of new leads.",
      quote: "This investment in our digital authority has transformed our business trajectory.",
      attribution: "Dr. Michael Rodriguez, CEO"
    }
  },
  {
    slug: "patrick-henry-college",
    title: "Patrick Henry College Increases Student Enrollment Through Strategic Online Visibility Campaign",
    subtitle: "How a private college used backlink authority to compete with larger institutions for prospective students.",
    personName: "Robert Wilson",
    orgName: "Patrick Henry College",
    updatedAt: "Aug 26, 2024",
    heroImage: "/placeholder.svg",
    accentFrom: "#F6C343",
    accentTo: "#D97706",
    challenge: {
      p1: "Patrick Henry College faced intense competition from larger, more well-known institutions for qualified prospective students.",
      p2: "The college's unique programs and values weren't reaching their target audience effectively through traditional marketing channels.",
      p3: "Limited marketing budget required a strategic approach that could compete with universities spending millions on student recruitment.",
      quote: "We needed to level the playing field with institutions that had much larger marketing budgets.",
      attribution: "Robert Wilson, Director of Admissions"
    },
    solution: {
      p1: "BoostMyRank secured strategic placements in higher education publications, student college guides, and academic excellence directories.",
      p2: "Featured articles in education policy magazines and conservative education publications helped the college reach its target demographic.",
      p3: "High-authority backlinks from academic ranking sites and college comparison platforms improved the college's visibility in student search processes.",
      quote: "The strategic placement helped us reach students who were actively looking for what we offered.",
      attribution: "Robert Wilson, Director of Admissions"
    },
    impact: {
      p1: "Student enrollment increased by 35% over two years, with a significant improvement in the quality and retention rate of incoming students.",
      p2: "The college's programs gained national recognition, leading to increased donations and expanded academic partnerships.",
      p3: "Cost per student acquisition decreased by 60% while improving the overall quality of the applicant pool.",
      quote: "We're now competing successfully with much larger institutions for the students we want most.",
      attribution: "Robert Wilson, Director of Admissions"
    }
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}