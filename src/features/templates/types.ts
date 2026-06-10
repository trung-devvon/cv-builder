export type TemplateLayoutType =
  | "single-column"
  | "single-column-with-header"
  | "two-column"
  | "two-column-with-header";

export type TemplateSectionType =
  | "profile"
  | "headline"
  | "contact"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "custom";

export type SectionDisplay =
  | "plain"
  | "timeline"
  | "bullet-list"
  | "tag-cloud"
  | "achievement-list"
  | "portfolio-list";

export interface TemplateColumn {
  id: "main" | "side";
  label: string;
  width: number;
  minWidth: number;
  maxWidth: number;
}

export interface TemplateSectionSlot {
  type: TemplateSectionType;
  title: string;
  region: "main" | "side" | "header";
  defaultVisible: boolean;
  locked?: boolean;
  draggable?: boolean;
  display: SectionDisplay;
}

export interface CvTemplateDefinition {
  schemaVersion: string;
  id: string;
  name: string;
  description: string;
  category: string;
  atsLevel: "safe" | "balanced" | "creative";
  layout: {
    defaultType: TemplateLayoutType;
    allowedTypes: TemplateLayoutType[];
    header: {
      supported: boolean;
      defaultEnabled: boolean;
      locked: boolean;
    };
    columns: TemplateColumn[];
  };
  avatar: {
    supported: boolean;
    defaultVisible: boolean;
    userToggleable: boolean;
    atsRecommended: boolean;
  };
  theme: {
    primary: string;
    backgroundMode: "white" | "soft-tint";
    backgroundTintOpacity: number;
    fontPair: {
      display: string;
      body: string;
    };
  };
  sections: {
    lockedTop: TemplateSectionType[];
    slots: TemplateSectionSlot[];
    customDisplays: SectionDisplay[];
  };
  atsGuidance: {
    risk: "low" | "medium" | "high";
    notes: string[];
  };
}

export interface CvEntry {
  id: string;
  title: string;
  subtitle?: string;
  location?: string;
  dateRange?: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
}

export interface CvSection {
  id: string;
  type: TemplateSectionType;
  title: string;
  visible: boolean;
  items: CvEntry[];
}

export interface CvProfile {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  avatarUrl?: string;
}

export interface CvDocument {
  id: string;
  title: string;
  profile: CvProfile;
  sections: CvSection[];
}
