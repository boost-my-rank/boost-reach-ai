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
    slug: "voicevalet-case-study",
    title: "Case Study: How VoiceValet increased organic traffic 150% in 6 months using BoostMyRank",
    subtitle: "Learn how an AI phone-answering service turned missed calls into inbound pipeline by building domain authority.",
    personName: "Aidan Mattrick",
    orgName: "VoiceValet",
    updatedAt: "Aug 26, 2024",
    heroImage: "/placeholder.svg",
    accentFrom: "#F59E0B",
    accentTo: "#EC4899",
    challenge: {
      p1: "<a href='https://govoicevalet.com/' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 underline'>VoiceValet</a> helps businesses answer every call with a smart AI that qualifies prospects, books appointments, and pushes clean data into the CRM, without adding human headcount. But the category is noisy and crowded.",
      p2: "Larger vendors dominated the SERP with long-standing authority. Referral traffic had plateaued, and many of their top-funnel keywords lingered on page two.",
      p3: "The team was focused on shipping product and customer stories, not managing ongoing outreach.",
      quote: "We were missing out on high-intent organic traffic because our brand didn't yet have the authority signals that buyers and Google look for.",
      attribution: "Aidan Mattrick, CEO, <a href='https://govoicevalet.com/' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 underline'>VoiceValet</a>"
    },
    solution: {
      p1: "BoostMyRank executed an automated editorial outreach program that matched <a href='https://govoicevalet.com/' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 underline'>VoiceValet</a>'s CEO to journalist requests on their area of expertise.",
      p2: "Over the course of three months,BoostMyRank delivered 15 backlinks (5 per month) from respected business and technology outlets, all in an automated way through matching <a href='https://govoicevalet.com/' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 underline'>VoiceValet</a> to journalist requests.",
      p3: "Every month, we provided <a href='https://govoicevalet.com/' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 underline'>VoiceValet</a> with a report with all the backlinks we secured, including the URL, anchor, DA, status, and impact highlights thir team could share in exec meetings.",
      quote: "Once we started appearing in well-known publications, sales conversations moved faster. Prospects came in already trusting the brand.",
      attribution: "Aidan Mattrick, CEO, <a href='https://govoicevalet.com/' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 underline'>VoiceValet</a>"
    },
    impact: {
      p1: "In 6 months, <a href='https://govoicevalet.com/' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 underline'>VoiceValet</a>'s domain authority rose 12 points, organic sessions grew 150%, and demo requests increased 60%, while customer acquisition costs (CAC) decreased 22% due to stronger organic performance.",
      p2: "At the same time, <a href='https://govoicevalet.com/' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 underline'>VoiceValet</a> was able to create an \"As Seen In\" section and media badges for the homepage to increase their social proof.",
      p3: "This allowed them to increase their close rate on demo calls by nearly 50% with their SDRs reporting shorter time-to-trust on discovery calls.",
      quote: "BoostMyRank's backlink-building strategy helped us convert more of our organic traffic into customer demos, and it did it without adding work to our team.",
      attribution: "Aidan Mattrick, CEO, <a href='https://govoicevalet.com/' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 underline'>VoiceValet</a>"
    }
  },
  {
    slug: "qt-marketing-case-study",
    title: "Case Study: How QT Marketing grew demo requests by 44% in 90 days by improving its backlinking strategy",
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
      p3: "The team was focused on campaign execution, not ongoing PR or press outreach.",
      quote: "We were winning in paid, but our brand signals didn't match our results. We needed credible mentions that search engines, and skeptical prospects, could recognize.",
      attribution: "Quentin Thomassin, Founder, QT Marketing"
    },
    solution: {
      p1: "BoostMyRank executed a hands-off backlink outreach program to top publications in their space to boost QT Marketing's domain authority.",
      p2: "Over the course of 3 months, QT Marketing received consistent placements in business, marketing, and small-business outlets with no paid links or networks, that were targeted to their area of expertise.",
      p3: "QTMarketing received a monthly results reports with URL's, anchor, DA, status to keep track of all mentions and backlinks.",
      quote: "Once we started showing up in recognized publications, our organic traffic increased significantly. Plus, our prospects arrived already trusting us.",
      attribution: "Quentin Thomassin, Founder, QT Marketing"
    },
    impact: {
      p1: "In 90 days, domain authority rose +8 points, organic sessions grew 62%, and inbound demo requests increased 44%. 15 priority keywords moved into the top-10 (e.g., \"find clients as a personal trainer,\" \"fitness coach marketing,\" \"Facebook ads for trainers\").",
      p2: "Once the backlinks started boosting website ranking, new case studies started indexing faster and began ranking sooner due to stronger brand signals.",
      p3: "Homepage conversion rate lifted after adding media badges, reducing blended CAC and reliance on incremental ad spend.",
      quote: "The credibility boost didn't just help rankings, it also improved close rates. It's the compounder we were missing.",
      attribution: "Quentin Thomassin, Founder, QT Marketing"
    }
  },
  {
    slug: "loch-case-study",
    title: "Case Study: How Loch boosted organic traffic 68% in 90 days by improving its backlinking strategy",
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
      p3: "As a newer outlet competing with established media for the same headlines, Loch had great content but too few high-authority mentions pointing back to the site. Their small team had no bandwidth for ongoing press outreach to get noticed.",
      quote: "We were publishing strong content, but they stalled on page two. We needed clear proof of authority that search engines and readers recognize.",
      attribution: "Prithvir Jhaveri, Founder, Loch"
    },
    solution: {
      p1: "BoostMyRank ran a fully managed outreach program to earn editorial backlinks from respected business and finance publications. We positioned Loch editors as quotable experts, responded to journalist requests on timely topics, and delivered 3 or more backlinks per month.",
      p2: "This enabled them to create a simple \"As Seen In\" section and media badges for the homepage, article templates, and author bios to showcase credibility.",
      p3: "BoostMyRank provided a completely hands-off workflow: We sourced opportunities, drafted quotes in the Loch voice, handled submissions and follow-ups, and provided monthly reports on newspaper placements (URL, anchor, DA, status).",
      quote: "Being cited by well-known outlets changed the conversation for us as partners and readers suddenly starting taking us more seriously.",
      attribution: "Prithvir Jhaveri, Founder, Loch"
    },
    impact: {
      p1: "In 90 days, Loch's Google domain authority increased by 9 points, organic sessions grew 68%, and 18 priority keywords moved into the top 10.",
      p2: "The site's newsletter signups rose 54%, which improved sponsorship interest and ad performance. New articles began indexing faster and earned visibility sooner because the brand now carried clear authority signals.",
      p3: "The improved domain authority and backlink profile led to faster content indexing, with new posts ranking within days instead of weeks.",
      quote: "This investment in our digital authority has transformed our business trajectory.",
      attribution: "Prithvir Jhaveri, Founder, Loch "
    }
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}