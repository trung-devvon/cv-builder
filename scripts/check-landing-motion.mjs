import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(
  __dirname,
  "..",
  "src",
  "features",
  "landing",
  "components",
  "home-landing.tsx"
);
const source = readFileSync(sourcePath, "utf8");
const stylesPath = join(__dirname, "..", "src", "app", "globals.css");
const styles = readFileSync(stylesPath, "utf8");

const forbidden = [
  {
    label: "GSAP autoAlpha",
    pattern: /\bautoAlpha\b/
  },
  {
    label: "object-style opacity animation",
    pattern: /\bopacity\s*:/
  },
  {
    label: "phase 3 preview card",
    pattern: /width-reveal-preview/
  },
  {
    label: "phase 3 mini status badges",
    pattern: /function MiniStatus|<MiniStatus/
  },
  {
    label: "phase 2 content split panels",
    pattern: /green-bottom-left-panel|green-bottom-right-panel/
  },
  {
    label: "phase 3 center divider line",
    pattern: /left-1\/2 z-10 hidden w-px/
  },
  {
    label: "phase 2 mobile list viewport min-width",
    pattern: /min-w-\[min\(88vw,26rem\)\]/
  },
  {
    label: "phase 2 fixed mobile preview height",
    pattern: /template-preview-stack[^\n]*min-h-\[218px\]/
  },
  {
    label: "visible zero phase label",
    pattern: />\s*Phase 0\b|>\s*phase 0\b/
  },
  {
    label: "welcome circular shrink wipe",
    pattern: /(?:gsap\.set|\.to)\("\.phase-welcome",\s*\{[^}]*clipPath:\s*"circle/
  },
  {
    label: "welcome signal badge",
    pattern: /Start with signal/
  },
  {
    label: "welcome letter backdrop blur",
    pattern: /welcome-letter[^\n]*backdrop-blur/
  },
  {
    label: "cropped landing CV image",
    pattern: /\bobject-cover\b/
  },
  {
    label: "welcome helper copy that collides with bottom scroll label",
    pattern: /Scroll to open the canvas from the center line/
  },
  {
    label: "inline phase layer initial styles",
    pattern: /initialPhaseLayerStyles/
  }
];

const requiredMarkers = [
  "clipPath",
  "split-left-half",
  "split-right-half",
  "width-reveal-shell",
  "height-reveal-line",
  "color-shift-word",
  "WELCOME_DURATION",
  "WELCOME_DOCK_START",
  "WELCOME_DOCK_DURATION",
  "phase-welcome",
  "welcome-left-panel",
  "welcome-right-panel",
  "welcome-rotating-mask",
  "welcome-horizontal-mask",
  "welcome-dock-stage",
  "welcome-figure-left",
  "welcome-figure-right",
  "welcome-image-frame-left",
  "welcome-image-frame-right",
  "welcome-label-left",
  "welcome-label-right",
  "welcome-label-docked",
  "welcome-ornament-layer",
  "welcome-ornament-line",
  "welcome-ornament-note",
  "welcome-corner-top-left",
  "welcome-corner-top-right",
  "welcome-corner-bottom-left",
  "welcome-corner-bottom-right",
  "welcome-scroll-fill",
  "welcome-inspiration-left",
  "welcome-inspiration-right",
  "welcome-image-left",
  "welcome-image-right",
  "welcome-inspiration-copy",
  "welcome-fill-word",
  "welcome-title-line",
  "welcome-letter",
  "welcome-letter-row",
  "welcome-orbit-copy",
  "welcome-word",
  "templateImageCards",
  "center-stage-copy",
  "bottom-left-copy",
  "bottom-right-copy",
  "depth-image-card",
  "depth-stage",
  "phase-one-details-rail",
  "phase-one-detail-item",
  "phase-two-template-browser",
  "template-list-item",
  "template-preview-stack",
  "template-preview-card-front",
  "template-preview-card-back",
  "template-mock-cv-back",
  "template-card-back-offset",
  "template-card-front-offset",
  "template-door-top",
  "template-door-bottom",
  "template-door-height-open",
  "phase-two-active-template",
  "phase-two-responsive-grid",
  "phase-two-preview-column",
  "phase-two-template-list",
  "phase-three-content",
  "width-left-half",
  "width-right-half",
  "phase-three-left-half",
  "phase-three-right-half",
  "phase-three-action-list",
  "phase-three-action-item",
  "phase-three-layout",
  "phase-three-menu",
  "phase-three-menu-index",
  "phase-three-menu-label",
  "WIDTH_REVEAL_START",
  "PHASE_THREE_EXIT_START",
  "DEPTH_REVEAL_START",
  "GREEN_SPLIT_START",
  "GREEN_SPLIT_DURATION"
];

const failures = [];
const requiredDomClassMarkers = ["green-card-mask"];

const preloadGuardChecks = [
  {
    label: "landing preload class on choreographed root",
    source,
    pattern: /className="landing-motion-preload\b/
  },
  {
    label: "GSAP removes landing preload after initial set",
    source,
    pattern: /rootElement\.classList\.remove\("landing-motion-preload"\)/
  },
  {
    label: "phase 1 preload clip guard",
    source: styles,
    pattern: /\.landing-motion-preload \.phase-white[\s\S]*clip-path:\s*circle\(0%/
  },
  {
    label: "phase 2 preload clip guard",
    source: styles,
    pattern: /\.landing-motion-preload \.phase-green[\s\S]*clip-path:\s*circle\(0%/
  },
  {
    label: "phase 3 preload visibility guard",
    source: styles,
    pattern: /\.landing-motion-preload \.phase-split[\s\S]*visibility:\s*hidden/
  },
  {
    label: "phase 4 preload clip guard",
    source: styles,
    pattern: /\.landing-motion-preload \.phase-depth[\s\S]*clip-path:\s*circle\(0%/
  }
];

for (const item of forbidden) {
  if (item.pattern.test(source)) {
    failures.push(`Remove ${item.label} from home landing motion.`);
  }
}

for (const marker of requiredMarkers) {
  if (!source.includes(marker)) {
    failures.push(`Missing required landing motion marker: ${marker}`);
  }
}

for (const marker of requiredDomClassMarkers) {
  const classNamePattern = new RegExp(`className=["{][^\\n]*${marker}`);

  if (!classNamePattern.test(source)) {
    failures.push(`GSAP target .${marker} must be present in a JSX className, not only in timeline selectors.`);
  }
}

for (const item of preloadGuardChecks) {
  if (!item.pattern.test(item.source)) {
    failures.push(`Missing preload render guard: ${item.label}.`);
  }
}

const greenSplitStart = source.match(/const GREEN_SPLIT_START = ([\d.]+);/);
const greenSplitDuration = source.match(/const GREEN_SPLIT_DURATION = ([\d.]+);/);
const widthRevealStart = source.match(/const WIDTH_REVEAL_START = ([\d.]+);/);
const phaseThreeExitStart = source.match(/const PHASE_THREE_EXIT_START = ([\d.]+);/);
const depthRevealStart = source.match(/const DEPTH_REVEAL_START = ([\d.]+);/);
const welcomeDuration = source.match(/const WELCOME_DURATION = ([\d.]+);/);
const welcomeDockStart = source.match(/const WELCOME_DOCK_START = ([\d.]+);/);
const welcomeDockDuration = source.match(/const WELCOME_DOCK_DURATION = ([\d.]+);/);

if (welcomeDuration && Number(welcomeDuration[1]) > 1.7) {
  failures.push("WELCOME_DURATION should stay compact even with the filled pre-phase-1 docking beat.");
}

if (welcomeDuration && welcomeDockStart && welcomeDockDuration) {
  const dockEnd = Number(welcomeDockStart[1]) + Number(welcomeDockDuration[1]);
  const welcomeEnd = Number(welcomeDuration[1]);

  if (welcomeEnd < dockEnd) {
    failures.push("WELCOME_DURATION must include the full pre-phase-1 docking beat.");
  }
}

const welcomeHorizontalSet = source.match(
  /gsap\.set\("\.welcome-horizontal-mask",\s*\{[\s\S]*?\}\);/
);

if (!welcomeHorizontalSet || !welcomeHorizontalSet[0].includes("scaleX: 0")) {
  failures.push("Welcome rotating axis should start at 0% scaleX before expanding on scroll.");
}

const welcomeLeftImageMotion = source.match(/\.to\("\.welcome-image-left",\s*\{[\s\S]*?\},\s*0\)/);
const welcomeRightImageMotion = source.match(/\.to\("\.welcome-image-right",\s*\{[\s\S]*?\},\s*0\)/);

if (!welcomeLeftImageMotion || !welcomeLeftImageMotion[0].includes("yPercent: -")) {
  failures.push("Left welcome CV image should move upward while scrolling into phase 1.");
}

if (!welcomeRightImageMotion || !welcomeRightImageMotion[0].includes("yPercent: ")) {
  failures.push("Right welcome CV image should move downward while scrolling into phase 1.");
}

const welcomeLeftDockMotion = source.match(/\.to\("\.welcome-figure-left",\s*\{[\s\S]*?\},\s*WELCOME_DOCK_START\)/);
const welcomeRightDockMotion = source.match(/\.to\("\.welcome-figure-right",\s*\{[\s\S]*?\},\s*WELCOME_DOCK_START\)/);
const welcomeFrameDockMotion = source.match(/\.to\("\.welcome-image-frame-left, \.welcome-image-frame-right",\s*\{[\s\S]*?\},\s*WELCOME_DOCK_START\)/);
const welcomeLeftLabelDockMotion = source.match(/\.to\("\.welcome-label-left",\s*\{[\s\S]*?\},\s*WELCOME_DOCK_START\)/);
const welcomeRightLabelDockMotion = source.match(/\.to\("\.welcome-label-right",\s*\{[\s\S]*?\},\s*WELCOME_DOCK_START\)/);
const welcomeOrnamentLineMotion = source.match(/\.to\("\.welcome-ornament-line",\s*\{[\s\S]*?\},\s*WELCOME_DOCK_START\)/);
const welcomeOrnamentNoteMotion = source.match(/\.to\("\.welcome-ornament-note",\s*\{[\s\S]*?\},\s*WELCOME_DOCK_START(?:\s*\+\s*[\d.]+)?\)/);
const greenCardSetMotion = source.match(/gsap\.set\("\.green-card-mask",\s*\{[\s\S]*?\}\);/);
const greenCardRevealMotion = source.match(/\.to\("\.green-card-mask",\s*\{[\s\S]*?\},\s*3\.5\)/);

if (!welcomeLeftDockMotion || !welcomeLeftDockMotion[0].includes("xPercent") || !welcomeLeftDockMotion[0].includes("yPercent: -")) {
  failures.push("Left welcome figure should dock toward center and end higher than the right figure.");
}

if (!welcomeRightDockMotion || !welcomeRightDockMotion[0].includes("xPercent") || !welcomeRightDockMotion[0].includes("yPercent: ")) {
  failures.push("Right welcome figure should dock toward center and end lower than the left figure.");
}

if (welcomeRightDockMotion && /y:\s*"8vh"|yPercent:\s*16/.test(welcomeRightDockMotion[0])) {
  failures.push("Right welcome figure should not dock so low that it can cover the bottom scroll label.");
}

if (!welcomeFrameDockMotion || !welcomeFrameDockMotion[0].includes("scaleX")) {
  failures.push("Welcome CV image frames should widen during the docking beat.");
}

if (!welcomeLeftLabelDockMotion || !welcomeLeftLabelDockMotion[0].includes("rotate: 90")) {
  failures.push("Left welcome label should rotate 90deg and sit beside the left image during docking.");
}

if (!welcomeRightLabelDockMotion || !welcomeRightLabelDockMotion[0].includes("rotate: -90")) {
  failures.push("Right welcome label should rotate -90deg and sit beside the right image during docking.");
}

if (!welcomeOrnamentLineMotion || !welcomeOrnamentLineMotion[0].includes("clipPath")) {
  failures.push("Welcome docking beat should reveal supporting corner lines.");
}

if (!welcomeOrnamentNoteMotion || !welcomeOrnamentNoteMotion[0].includes("y: 0")) {
  failures.push("Welcome docking beat should reveal supporting corner text.");
}

if (greenCardSetMotion?.[0].includes("rotate")) {
  failures.push("Phase 2 preview should start upright and must not set rotate on .green-card-mask.");
}

if (greenCardRevealMotion?.[0].includes("rotate")) {
  failures.push("Phase 2 preview reveal should stay upright and must not animate rotate on .green-card-mask.");
}

if (greenSplitStart && greenSplitDuration && widthRevealStart) {
  const splitEnd = Number(greenSplitStart[1]) + Number(greenSplitDuration[1]);
  const widthStart = Number(widthRevealStart[1]);

  if (widthStart < splitEnd) {
    failures.push(
      `WIDTH_REVEAL_START (${widthStart}) must be after green split ends (${splitEnd}).`
    );
  }
}

if (widthRevealStart && phaseThreeExitStart) {
  const widthStart = Number(widthRevealStart[1]);
  const exitStart = Number(phaseThreeExitStart[1]);

  if (exitStart < widthStart + 1.85) {
    failures.push("PHASE_THREE_EXIT_START should give phase 3 a stable hold after its entrance.");
  }
}

if (phaseThreeExitStart && depthRevealStart) {
  const exitStart = Number(phaseThreeExitStart[1]);
  const depthStart = Number(depthRevealStart[1]);

  if (depthStart < exitStart + 0.3) {
    failures.push("DEPTH_REVEAL_START should leave room for the phase 3 rightward exit.");
  }
}

if (depthRevealStart && Number(depthRevealStart[1]) < 7.3) {
  failures.push("DEPTH_REVEAL_START should be at least 7.3 so phase 3 has more scroll room.");
}

const widthExitBlock = source.match(
  /\.to\("\.width-reveal-shell, \.phase-three-content", \{\s*[^}]*\s*\}, PHASE_THREE_EXIT_START\)/
);

if (widthExitBlock) {
  const exitSource = widthExitBlock[0];

  if (!exitSource.includes("xPercent")) {
    failures.push("Phase 3 should exit to the right using xPercent before phase 4.");
  }

  if (exitSource.includes("yPercent")) {
    failures.push("Phase 3 should not exit upward with yPercent before phase 4.");
  }
}

const phaseThreeMenuBlock = source.match(
  /function MiniPill[\s\S]*?function FinalCta/
);

if (!phaseThreeMenuBlock) {
  failures.push("Missing Phase 3 MiniPill implementation block.");
} else {
  const menuSource = phaseThreeMenuBlock[0];

  if (!menuSource.includes("({index})")) {
    failures.push("Phase 3 MiniPill should render index in parenthesized menu style.");
  }

  if (menuSource.includes("<Icon")) {
    failures.push("Phase 3 MiniPill should be typography-led and not render icons.");
  }

  if (!menuSource.includes("text-[clamp(")) {
    failures.push("Phase 3 MiniPill should use clamp-based responsive menu typography.");
  }
}

const phaseSplitBlock = source.match(/function PhaseSplit[\s\S]*?function PhaseDepth/);

if (phaseSplitBlock) {
  const phaseSplitSource = phaseSplitBlock[0];

  if (!phaseSplitSource.includes("width-reveal-shell") || !phaseSplitSource.includes("phase-three-content")) {
    failures.push("Phase 3 should separate the reveal background from the content layer.");
  }

  if (!phaseSplitSource.includes("width-left-half") || !phaseSplitSource.includes("width-right-half")) {
    failures.push("Phase 3 reveal shell should contain mirrored left and right half panels.");
  }

  if (!phaseSplitSource.includes("phase-three-left-half") || !phaseSplitSource.includes("phase-three-right-half")) {
    failures.push("Phase 3 content should be anchored in separate left and right half panels.");
  }

  if (phaseSplitSource.includes("place-items-center")) {
    failures.push("Phase 3 content should not use the old full-screen centered layout.");
  }

  if (!/phase-three-content[^"]*pointer-events-none/.test(phaseSplitSource)) {
    failures.push("Phase 3 content should start with pointer events disabled.");
  }

  if (phaseSplitSource.indexOf("phase-three-content") < phaseSplitSource.indexOf("width-reveal-shell")) {
    failures.push("Phase 3 content layer should render after the reveal shell so it is not clipped by it.");
  }

  if (!phaseSplitSource.includes("md:grid-cols-")) {
    failures.push("Phase 3 layout should become two-column at md so MiniPill stays visible on tablet widths.");
  }

  if (!phaseSplitSource.includes("max-h-[calc(100dvh-")) {
    failures.push("Phase 3 layout should reserve viewport-height bounds for responsive fit.");
  }
}

const pointerEventsBlocks = [
  {
    label: "phase 2 browser starts disabled",
    pattern: /gsap\.set\("\.phase-two-template-browser",\s*\{\s*pointerEvents:\s*"none"/
  },
  {
    label: "phase 2 browser enables during phase 2",
    pattern: /\.set\("\.phase-two-template-browser",\s*\{\s*pointerEvents:\s*"auto"\s*\}/
  },
  {
    label: "phase 2 browser disables before phase 3",
    pattern: /\.set\("\.phase-two-template-browser",\s*\{\s*pointerEvents:\s*"none"\s*\},\s*WIDTH_REVEAL_START/
  },
  {
    label: "phase 3 content enables during phase 3",
    pattern: /\.set\("\.phase-three-content",\s*\{\s*pointerEvents:\s*"auto"\s*\}/
  },
  {
    label: "phase 3 content disables on exit",
    pattern: /\.set\("\.phase-three-content",\s*\{\s*pointerEvents:\s*"none"\s*\},\s*PHASE_THREE_EXIT_START/
  }
];

for (const item of pointerEventsBlocks) {
  if (!item.pattern.test(source)) {
    failures.push(`Missing pointer-events guard: ${item.label}.`);
  }
}

const leftHalfMotion = source.match(/\.to\("\.width-left-half",\s*\{[\s\S]*?\},\s*WIDTH_REVEAL_START\)/);
const rightHalfMotion = source.match(/\.to\("\.width-right-half",\s*\{[\s\S]*?\},\s*WIDTH_REVEAL_START\)/);

if (!leftHalfMotion || !leftHalfMotion[0].includes("xPercent: 0")) {
  failures.push("Phase 3 left half should animate into place from the opposite side.");
}

if (!rightHalfMotion || !rightHalfMotion[0].includes("xPercent: 0")) {
  failures.push("Phase 3 right half should animate into place from the opposite side.");
}

const previewStackBlock = source.match(
  /function TemplatePreviewStack[\s\S]*?function PhaseSplit/
);

if (previewStackBlock) {
  const previewSource = previewStackBlock[0];

  if (!previewSource.includes("object-contain")) {
    failures.push("Template preview images must use object-contain to avoid cropping details.");
  }

  if (/rotate-\[/.test(previewSource)) {
    failures.push("Template preview stack should stay upright and must not use rotate classes.");
  }

  if (previewSource.includes("bg-[#07110c]")) {
    failures.push("Template preview overlay should not use the old hard black layer.");
  }

  if (previewSource.includes("template-preview-overlay")) {
    failures.push("Template preview should not include a full dark overlay layer.");
  }

  if (/background CV preview/.test(previewSource)) {
    failures.push("Template preview back layer should be a mock CV, not the same image source.");
  }
}

if (failures.length > 0) {
  console.error("Landing motion contract failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Landing motion contract passed.");
