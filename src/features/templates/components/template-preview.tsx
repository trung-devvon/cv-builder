import { CheckCircle2, Columns2, FileText, GripVertical, ShieldCheck } from "lucide-react";
import type {
  CvDocument,
  CvEntry,
  CvSection,
  CvTemplateDefinition,
  TemplateSectionSlot
} from "../types";

interface TemplatePreviewProps {
  template: CvTemplateDefinition;
  cv: CvDocument;
}

export function TemplatePreview({ template, cv }: TemplatePreviewProps) {
  const [mainColumn, sideColumn] = template.layout.columns;
  const sectionByType = new Map(cv.sections.map((section) => [section.type, section]));
  const mainSlots = template.sections.slots.filter((slot) => slot.region === "main");
  const sideSlots = template.sections.slots.filter((slot) => slot.region === "side");

  return (
    <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="overflow-x-auto rounded-[28px] border border-[var(--border)] bg-[var(--primary-soft)]/70 p-4 sm:p-8">
        <article
          className="cv-paper mx-auto min-h-[1040px] w-[794px] max-w-full overflow-hidden rounded-[26px] bg-white text-[#17231b]"
          style={{
            background:
              template.theme.backgroundMode === "soft-tint"
                ? `linear-gradient(135deg, color-mix(in srgb, ${template.theme.primary} 6%, white), white 42%)`
                : "white"
          }}
        >
          <div
            className="grid gap-9 p-10"
            style={{
              gridTemplateColumns: `${mainColumn.width}% ${sideColumn.width}%`
            }}
          >
            <main className="min-w-0">
              <ProfileBlock cv={cv} template={template} />
              <div className="mt-8 space-y-7">
                {mainSlots.map((slot) => (
                  <SectionBlock
                    key={slot.type}
                    slot={slot}
                    section={sectionByType.get(slot.type)}
                    accent={template.theme.primary}
                  />
                ))}
              </div>
            </main>

            <aside className="min-w-0 rounded-[22px] border border-[#d9eadf] bg-white/72 p-5">
              <ContactBlock cv={cv} accent={template.theme.primary} />
              <div className="mt-7 space-y-7">
                {sideSlots
                  .filter((slot) => slot.type !== "contact")
                  .map((slot) => (
                    <SectionBlock
                      key={slot.type}
                      slot={slot}
                      section={sectionByType.get(slot.type)}
                      accent={template.theme.primary}
                      compact
                    />
                  ))}
              </div>
            </aside>
          </div>
        </article>
      </div>

      <aside className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-ink)]">
          Template JSON
        </p>
        <h2 className="mt-3 font-[var(--font-display)] text-4xl leading-none">
          {template.name}
        </h2>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
          {template.description}
        </p>

        <div className="mt-7 space-y-4">
          <MetaRow
            icon={<Columns2 aria-hidden className="size-5" />}
            label="Default layout"
            value={`${template.layout.defaultType}, ${mainColumn.width}/${sideColumn.width}`}
          />
          <MetaRow
            icon={<FileText aria-hidden className="size-5" />}
            label="Header"
            value={
              template.layout.header.defaultEnabled
                ? "Enabled by default"
                : "Supported, off by default"
            }
          />
          <MetaRow
            icon={<CheckCircle2 aria-hidden className="size-5" />}
            label="Avatar"
            value={
              template.avatar.defaultVisible
                ? "Visible by default"
                : "Supported, hidden by default"
            }
          />
          <MetaRow
            icon={<ShieldCheck aria-hidden className="size-5" />}
            label="ATS risk"
            value={`${template.atsGuidance.risk} (${template.atsLevel})`}
          />
        </div>

        <div className="mt-7 rounded-2xl bg-[var(--primary-soft)] p-4">
          <p className="text-sm font-semibold text-[var(--primary-ink)]">
            Future editor behavior
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-5 text-[var(--muted)]">
            <li>Toggle header/avatar per CV.</li>
            <li>Drag sections between main and side regions.</li>
            <li>Resize columns with a 30% minimum width.</li>
            <li>Switch to a one-column ATS-safer layout when needed.</li>
          </ul>
        </div>
      </aside>
    </section>
  );
}

function ProfileBlock({
  cv,
  template
}: {
  cv: CvDocument;
  template: CvTemplateDefinition;
}) {
  const showAvatar = template.avatar.defaultVisible && cv.profile.avatarUrl;

  return (
    <header className="border-b border-[#d9eadf] pb-7">
      {showAvatar ? (
        <div className="mb-5 size-20 rounded-full bg-[var(--primary-soft)]" />
      ) : null}
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#327650]">
        {cv.title}
      </p>
      <h1 className="mt-3 font-[var(--font-display)] text-6xl leading-[0.92] text-[#12351f]">
        {cv.profile.fullName}
      </h1>
      <p className="mt-4 max-w-[34rem] text-lg font-medium leading-7 text-[#2e4637]">
        {cv.profile.headline}
      </p>
    </header>
  );
}

function ContactBlock({ cv, accent }: { cv: CvDocument; accent: string }) {
  const contactItems = [
    cv.profile.email,
    cv.profile.phone,
    cv.profile.location,
    cv.profile.website
  ];

  return (
    <section>
      <h2
        className="text-xs font-bold uppercase tracking-[0.18em]"
        style={{ color: accent }}
      >
        Contact
      </h2>
      <div className="mt-4 space-y-2 text-sm leading-5 text-[#2f4438]">
        {contactItems.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </section>
  );
}

function SectionBlock({
  slot,
  section,
  accent,
  compact = false
}: {
  slot: TemplateSectionSlot;
  section?: CvSection;
  accent: string;
  compact?: boolean;
}) {
  if (!slot.defaultVisible || !section?.visible || section.items.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        {slot.draggable ? (
          <GripVertical aria-hidden className="size-4 text-[#9ab7a2]" />
        ) : null}
        <h2
          className="text-xs font-bold uppercase tracking-[0.18em]"
          style={{ color: accent }}
        >
          {slot.title}
        </h2>
      </div>
      <div className={compact ? "space-y-4" : "space-y-5"}>
        {section.items.map((item) => (
          <EntryBlock
            key={item.id}
            item={item}
            display={slot.display}
            compact={compact}
          />
        ))}
      </div>
    </section>
  );
}

function EntryBlock({
  item,
  display,
  compact
}: {
  item: CvEntry;
  display: TemplateSectionSlot["display"];
  compact: boolean;
}) {
  if (display === "tag-cloud" && item.tags) {
    return (
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#e5f5e9] px-3 py-1 text-xs font-semibold text-[#235f3d]"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }

  return (
    <article className={compact ? "text-sm" : "text-[15px]"}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold text-[#142d1e]">{item.title}</h3>
        {item.dateRange ? (
          <p className="text-xs font-semibold text-[#6d7d72]">{item.dateRange}</p>
        ) : null}
      </div>
      {item.subtitle ? (
        <p className="mt-1 font-medium text-[#476455]">{item.subtitle}</p>
      ) : null}
      {item.description ? (
        <p className="mt-2 leading-6 text-[#4b5b51]">{item.description}</p>
      ) : null}
      {item.bullets ? (
        <ul className="mt-3 space-y-2 leading-6 text-[#4b5b51]">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="pl-4 before:-ml-4 before:content-['-']">
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}

function MetaRow({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-[var(--border)] p-4">
      <div className="text-[var(--primary)]">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-[var(--foreground)]">{label}</p>
        <p className="mt-1 text-sm text-[var(--muted)]">{value}</p>
      </div>
    </div>
  );
}
