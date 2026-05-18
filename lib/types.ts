export type Question = {
  text: string;
};

export type Section = {
  id: string;
  title: string;
  subtitle: string;
  icon: string; // emoji/símbolo
  color: string; // tailwind classes
  questions: string[];
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
