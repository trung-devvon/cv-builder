import templateJson from "@/features/templates/data/two-column-no-header.json";
import { TemplatePreview } from "@/features/templates/components/template-preview";
import { sampleCv } from "@/features/templates/sample-cv";
import type { CvTemplateDefinition } from "@/features/templates/types";

const template = templateJson as CvTemplateDefinition;

export default function TwoColumnNoHeaderTemplatePage() {
  return (
    <main className="min-h-dvh bg-[var(--background)] px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary-ink)]">
            CV template preview
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-5xl leading-[0.95] text-[var(--foreground)] sm:text-7xl">
            Two columns, no default header.
          </h1>
          <p className="mt-5 text-base leading-7 text-[var(--muted)] sm:text-lg">
            This is a starter JSON template. It ships without a header, but the
            schema keeps header, avatar, section visibility, region movement,
            and column resizing open for the future editor.
          </p>
        </div>

        <TemplatePreview template={template} cv={sampleCv} />
      </div>
    </main>
  );
}
