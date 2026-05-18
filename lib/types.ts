export type Question = {
  q: string;
  placeholder?: string;
  hint?: string;
};

export type Section = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  questions: Question[];
};

export type Briefing = {
  slug: string;
  clientName: string;
  clientCity: string;
  agencyName: string;
  introTitle: string;
  introText: string;
  sections: Section[];
};
