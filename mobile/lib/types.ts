export type Alert = {
  category: string;
  title: string;
  severity: string;
  excerpt: string;
};

export type AnalyzeResult = {
  risk_level: string;
  summary: string[];
  alerts: Alert[];
  model: string;
};
