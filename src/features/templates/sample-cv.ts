import type { CvDocument } from "./types";

export const sampleCv: CvDocument = {
  id: "sample-cv-01",
  title: "Product Designer CV",
  profile: {
    fullName: "Maya Nguyen",
    headline: "Product Designer focused on AI hiring tools",
    email: "maya.nguyen@example.com",
    phone: "+84 901 234 567",
    location: "Ho Chi Minh City, Vietnam",
    website: "maya.design",
    avatarUrl: ""
  },
  sections: [
    {
      id: "summary",
      type: "summary",
      title: "Summary",
      visible: true,
      items: [
        {
          id: "summary-1",
          title: "Profile",
          description:
            "Designer with 6 years of experience building hiring, productivity, and SaaS products. Strong in design systems, resume workflows, and conversion-focused product storytelling."
        }
      ]
    },
    {
      id: "experience",
      type: "experience",
      title: "Experience",
      visible: true,
      items: [
        {
          id: "exp-1",
          title: "Senior Product Designer",
          subtitle: "TalentFlow",
          location: "Remote",
          dateRange: "2023 - Present",
          bullets: [
            "Designed a resume review workflow that reduced recruiter screening time by 34%.",
            "Built a reusable template system for candidate profiles and export-ready documents.",
            "Partnered with engineering to improve editor performance for long-form documents."
          ]
        },
        {
          id: "exp-2",
          title: "Product Designer",
          subtitle: "Greenhouse Labs",
          location: "Ho Chi Minh City",
          dateRange: "2020 - 2023",
          bullets: [
            "Led dashboard redesign for a hiring analytics product used by 12,000 monthly users.",
            "Created ATS-friendly profile layouts with clearer hierarchy and better parsing fallback."
          ]
        }
      ]
    },
    {
      id: "projects",
      type: "projects",
      title: "Projects",
      visible: true,
      items: [
        {
          id: "project-1",
          title: "CV Template Engine",
          subtitle: "Design system project",
          description:
            "Created a modular CV layout framework with reusable section slots, theme tokens, and export-safe typography."
        }
      ]
    },
    {
      id: "skills",
      type: "skills",
      title: "Skills",
      visible: true,
      items: [
        {
          id: "skills-1",
          title: "Core",
          tags: [
            "Product Design",
            "Design Systems",
            "UX Research",
            "ATS Layout",
            "Figma",
            "Prototyping"
          ]
        }
      ]
    },
    {
      id: "education",
      type: "education",
      title: "Education",
      visible: true,
      items: [
        {
          id: "edu-1",
          title: "B.A. Interaction Design",
          subtitle: "University of Design",
          dateRange: "2016 - 2020"
        }
      ]
    },
    {
      id: "certifications",
      type: "certifications",
      title: "Certifications",
      visible: false,
      items: [
        {
          id: "cert-1",
          title: "Human-Centered AI Design",
          subtitle: "Design Institute",
          dateRange: "2025"
        }
      ]
    },
    {
      id: "languages",
      type: "languages",
      title: "Languages",
      visible: true,
      items: [
        {
          id: "lang-1",
          title: "Vietnamese",
          subtitle: "Native"
        },
        {
          id: "lang-2",
          title: "English",
          subtitle: "Professional"
        }
      ]
    },
    {
      id: "custom-highlights",
      type: "custom",
      title: "Highlights",
      visible: true,
      items: [
        {
          id: "highlight-1",
          title: "Award",
          description: "Won internal innovation award for a document export QA workflow."
        },
        {
          id: "highlight-2",
          title: "Speaking",
          description: "Presented design systems for hiring products at a regional UX meetup."
        }
      ]
    }
  ]
};
