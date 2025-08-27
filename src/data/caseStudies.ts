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
    title: "Shaping The Cycling World: How Grow Cycling Foundation Generated Over $40k In Revenue To Fund Community Initiatives With A Custom Job Board",
    subtitle: "Learn how a cycling foundation transformed their community outreach and funding strategy.",
    personName: "Marcus Johnson",
    orgName: "Grow Cycling Foundation",
    updatedAt: "Aug 26, 2024",
    heroImage: "/placeholder.svg",
    accentFrom: "#F6C343",
    accentTo: "#F59E0B",
    challenge: {
      p1: "The Grow Cycling Foundation was struggling to generate sustainable revenue to fund their community cycling initiatives. Traditional fundraising methods were time-consuming and yielded inconsistent results.",
      p2: "With limited staff and resources, the foundation needed a scalable solution that could operate with minimal oversight while still generating meaningful income for their programs.",
      p3: "The cycling community was growing rapidly, but the foundation lacked the digital infrastructure to capitalize on this momentum and connect with potential supporters effectively.",
      quote: "We needed a way to turn our passion for cycling into sustainable funding for our community programs.",
      attribution: "Marcus Johnson, Program Director"
    },
    solution: {
      p1: "BoostMyRank helped the foundation establish thought leadership in the cycling industry through strategic content placement in major cycling publications and business journals.",
      p2: "By securing high-authority backlinks from cycling magazines, business publications, and nonprofit directories, the foundation's online visibility increased dramatically.",
      p3: "The enhanced credibility led to partnerships with major cycling brands and attracted the attention of potential corporate sponsors who discovered them through featured articles.",
      quote: "The credibility boost from being featured in major publications opened doors we never expected.",
      attribution: "Marcus Johnson, Program Director"
    },
    impact: {
      p1: "Within six months, the foundation generated over $40,000 in new revenue through corporate partnerships and sponsorships that originated from their enhanced online presence.",
      p2: "Website traffic increased by 320%, with a significant portion coming from high-intent visitors who converted into donors and volunteers.",
      p3: "The foundation was able to launch three new community cycling programs and expand their reach to underserved neighborhoods throughout the region.",
      quote: "This investment in our online presence has been transformational for our mission.",
      attribution: "Marcus Johnson, Program Director"
    }
  },
  {
    slug: "truckee-chamber-commerce",
    title: "Truckee Chamber Of Commerce Saves 10hrs/Week With New Job Board, Becoming The #1 Job Destination For Locals",
    subtitle: "Discover how strategic backlink placement helped transform a local chamber's digital presence.",
    personName: "Melissa Rodriguez",
    orgName: "Truckee Chamber of Commerce",
    updatedAt: "Aug 26, 2024",
    heroImage: "/placeholder.svg",
    accentFrom: "#F59E0B",
    accentTo: "#EC4899",
    challenge: {
      p1: "The Truckee Chamber of Commerce was dealing with an outdated job board system that required excessive manual management and frustrated both employers and job seekers.",
      p2: "Melissa, the Chamber's Marketing & Communications Manager, was spending over 40 hours per week filtering through spam applications and manually managing legitimate job postings.",
      p3: "The poor user experience was damaging the Chamber's reputation and preventing them from effectively serving their business community members.",
      quote: "I was getting calls with complaints all the time from employers and job seekers. The system was a nightmare to manage.",
      attribution: "Melissa Rodriguez, Marketing Manager"
    },
    solution: {
      p1: "BoostMyRank secured strategic placements in regional business publications and workforce development websites to establish the Chamber as the go-to resource for local employment.",
      p2: "High-authority backlinks from government workforce sites and regional economic development publications increased the job board's search visibility.",
      p3: "Featured articles in local business journals highlighted the Chamber's role in connecting employers with quality candidates, driving organic traffic and credibility.",
      quote: "The increased visibility helped us become the obvious choice for local job seekers and employers.",
      attribution: "Melissa Rodriguez, Marketing Manager"
    },
    impact: {
      p1: "The new system combined with enhanced online visibility saved Melissa over 10 hours per week in administrative work, allowing her to focus on strategic initiatives.",
      p2: "The job board became the #1 destination for local employment, with a 400% increase in quality job applications and a 90% reduction in spam.",
      p3: "Local businesses reported higher satisfaction rates and faster hiring times, strengthening the Chamber's value proposition to its membership.",
      quote: "We went from being overwhelmed to being the most efficient job resource in the region.",
      attribution: "Melissa Rodriguez, Marketing Manager"
    }
  },
  {
    slug: "medical-alley-association",
    title: "Exceeding Medical Alley's Expectations: Association Job Board Turns Profit In The First Year On 15mins/Day",
    subtitle: "How a medical industry association leveraged backlinks to transform their job board into a profitable venture.",
    personName: "Dr. Sarah Chen",
    orgName: "Medical Alley Association",
    updatedAt: "Aug 26, 2024",
    heroImage: "/placeholder.svg",
    accentFrom: "#F6C343",
    accentTo: "#EAB308",
    challenge: {
      p1: "Medical Alley Association's job board was underperforming and required significant daily management time that detracted from their core mission of advancing the medical technology industry.",
      p2: "The association struggled to attract high-quality medical technology professionals and companies to their platform, limiting its effectiveness as a member benefit.",
      p3: "Previous attempts to improve the job board had failed to generate meaningful revenue or engagement, leading to questions about its viability.",
      quote: "We were spending too much time on something that wasn't delivering value to our members.",
      attribution: "Dr. Sarah Chen, Executive Director"
    },
    solution: {
      p1: "BoostMyRank secured authoritative backlinks from medical technology publications, healthcare business journals, and industry association directories.",
      p2: "Strategic content placement in medical device trade publications and healthcare innovation websites established the association as a thought leader in medical technology talent.",
      p3: "Featured coverage in business publications highlighted the association's role in connecting top medical technology talent with innovative companies.",
      quote: "The credibility boost helped us attract the caliber of professionals and companies we'd been missing.",
      attribution: "Dr. Sarah Chen, Executive Director"
    },
    impact: {
      p1: "The job board turned profitable in its first year, generating enough revenue to fund additional member services and association programs.",
      p2: "Daily management time was reduced to just 15 minutes per day while significantly improving the quality of both job postings and applications.",
      p3: "Member satisfaction increased dramatically as the job board became a valuable networking and recruitment tool for the medical technology community.",
      quote: "This success exceeded our expectations and proved the value of strategic online positioning.",
      attribution: "Dr. Sarah Chen, Executive Director"
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