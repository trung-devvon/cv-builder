"use client";

import {
  ArrowRight,
  Download,
  Palette,
  Save,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const GREEN_SPLIT_START = 4.2;
const GREEN_SPLIT_DURATION = 0.78;
const WIDTH_REVEAL_START = 5.08;
const PHASE_THREE_EXIT_START = 7.28;
const DEPTH_REVEAL_START = 7.66;
const WELCOME_WIPE_DURATION = 0.92;
const WELCOME_DOCK_START = 0.78;
const WELCOME_DOCK_DURATION = 0.58;
const WELCOME_DURATION = 1.36;
const welcomeLetters = ["W", "E", "L", "C", "O", "M", "E"];
const capRidges = Array.from({ length: 14 }, (_, index) => index);

const templateImageCards = [
  {
    name: "Signal Portfolio",
    role: "Product Designer",
    useCase: "Creative roles",
    accent: "#e0b15b",
    src: "https://i.pinimg.com/1200x/f2/fd/06/f2fd068dc6c68c16700e37e76b01fbf3.jpg"
  },
  {
    name: "Calm Interview",
    role: "Marketing Lead",
    useCase: "Story-first CV",
    accent: "#ff8f70",
    src: "https://i.pinimg.com/1200x/4a/16/93/4a16933fb577bb4c60fdac743ec7fb9d.jpg"
  },
  {
    name: "Clean Recruiter",
    role: "Frontend Engineer",
    useCase: "ATS-friendly",
    accent: "#39a86b",
    src: "https://i.pinimg.com/736x/ee/3e/44/ee3e440c0dc3f5c0b163fe83ec61b177.jpg"
  },
  {
    name: "Editorial Profile",
    role: "Brand Strategist",
    useCase: "Portfolio CV",
    accent: "#78a6ff",
    src: "https://i.pinimg.com/736x/9e/e9/f9/9ee9f98ea241e7b00377e2cccf007f3e.jpg"
  },
  {
    name: "Compact Signal",
    role: "Data Analyst",
    useCase: "Dense content",
    accent: "#bcebc8",
    src: "https://i.pinimg.com/736x/21/6d/05/216d05ab52d2d8b4b4775400b01c1b5f.jpg"
  }
];

const workflow = [
  {
    icon: Save,
    title: "Drafts stay safe",
    text: "Write, switch sections, and come back later without losing your place."
  },
  {
    icon: Palette,
    title: "Templates stay flexible",
    text: "Start from a polished layout, then adjust color, avatar, header, and sections."
  },
  {
    icon: Download,
    title: "Exports stay sharp",
    text: "Prepare clean PDF and image outputs from the same structured CV data."
  }
];

export function HomeLanding() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [activeTemplateIndex, setActiveTemplateIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!root || reduceMotion.matches) {
      return;
    }

    const rootElement = root;
    let disposed = false;
    let cleanup = () => {};

    async function setupMotion() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger")
      ]);

      if (disposed || !rootElement.isConnected) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.set(".phase-white", {
          clipPath: "circle(0% at 50% 52%)"
        });
        gsap.set(".phase-green", {
          clipPath: "circle(0% at 50% 50%)"
        });
        gsap.set(".phase-depth", {
          clipPath: "circle(0% at 50% 52%)"
        });
        gsap.set(".welcome-left-panel, .welcome-right-panel", {
          xPercent: 0
        });
        gsap.set(".welcome-horizontal-mask", {
          clipPath: "circle(8% at 50% 50%)",
          rotate: -18,
          scaleX: 0,
          scaleY: 0.22,
          transformOrigin: "50% 50%",
          x: 0,
          xPercent: -50,
          y: 0,
          yPercent: -50
        });
        gsap.set(".welcome-cap-core", {
          rotate: -34,
          scale: 0.84,
          transformOrigin: "50% 50%"
        });
        gsap.set(".welcome-cap-glow", {
          scale: 0.62,
          transformOrigin: "50% 50%"
        });
        gsap.set(".welcome-cap-ring", {
          rotate: 0,
          scale: 0.74,
          transformOrigin: "50% 50%"
        });
        gsap.set(".welcome-cap-ridge", {
          scaleX: 0.18,
          transformOrigin: "0% 50%"
        });
        gsap.set(".welcome-image-left", {
          yPercent: 8,
          rotate: 0,
          scale: 0.94
        });
        gsap.set(".welcome-image-right", {
          yPercent: 0,
          rotate: 0,
          scale: 0.94
        });
        gsap.set(".welcome-inspiration-copy", {
          yPercent: 18
        });
        gsap.set(".welcome-label-docked", {
          rotate: 0,
          scale: 1,
          transformOrigin: "50% 50%"
        });
        gsap.set(".welcome-image-frame-left, .welcome-image-frame-right", {
          scale: 0.92,
          transformOrigin: "50% 50%"
        });
        gsap.set(".welcome-image-sheet-left, .welcome-image-sheet-right", {
          clipPath: "inset(0% 0% 100% 0%)",
          y: 24
        });
        gsap.set(".welcome-ornament-line", {
          clipPath: "inset(0% 100% 0% 0%)"
        });
        gsap.set(".welcome-ornament-note", {
          y: 18,
          clipPath: "inset(0% 0% 100% 0%)"
        });
        gsap.set(".phase-two-orbit-card", {
          clipPath: "inset(0% 0% 100% 0%)",
          rotationX: -14,
          scale: 0.9,
          transformOrigin: "50% 50%",
          y: 26
        });
        gsap.set(".phase-two-orbit-node", {
          scale: 0,
          transformOrigin: "50% 50%"
        });
        gsap.set(".welcome-scroll-fill", {
          clipPath: "inset(0% 100% 0% 0%)"
        });
        gsap.set(".phase-two-template-browser", {
          pointerEvents: "none"
        });
        gsap.set(".phase-three-content", {
          pointerEvents: "none"
        });
        gsap.set(".width-left-half", {
          xPercent: -101
        });
        gsap.set(".width-right-half", {
          xPercent: 101
        });
        gsap.set(".phase-three-left-half", {
          clipPath: "inset(0% 100% 0% 0%)",
          xPercent: -16
        });
        gsap.set(".phase-three-right-half", {
          clipPath: "inset(0% 0% 0% 100%)",
          xPercent: 16
        });
        gsap.set(".height-reveal-line", {
          clipPath: "inset(100% 0% 0% 0%)",
          yPercent: 112
        });
        gsap.set(
          ".hero-copy-mask, .white-copy-mask, .green-copy-mask, .width-copy-mask, .depth-copy-mask, .white-card-mask, .green-card-mask, .template-preview-stack, .template-list-item, .width-pill-mask, .after-reveal",
          {
            clipPath: "inset(0% 0% 100% 0%)",
            y: 42
          }
        );
        gsap.set(".hero-template-card", {
          clipPath: "inset(20% 12% 24% 12%)",
          y: 96,
          scale: 0.7,
          rotate: -7,
          filter: "blur(10px)"
        });
        gsap.set(".split-left-half, .split-right-half, .green-split-left, .green-split-right", {
          xPercent: 0
        });
        gsap.set(".green-panel", {
          scale: 0.86,
          borderRadius: 54
        });
        gsap.set(".green-card-mask", {
          y: 24
        });
        gsap.set(".width-reveal-copy", {
          xPercent: -18
        });
        gsap.set(".color-shift-word", {
          color: "#102f1e"
        });
        gsap.set(".depth-stage", {
          transformPerspective: 1400
        });
        gsap.set(".depth-image-card", {
          clipPath: "inset(34% 30% 34% 30%)",
          filter: "blur(18px)",
          scale: 0.18,
          y: 180,
          z: -900,
          rotateX: 16
        });

        rootElement.classList.remove("landing-motion-preload");

        const choreo = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ".choreo-section",
            start: "top top",
            end: "+=10400",
            scrub: 1,
            pin: ".choreo-stage",
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        const mainMotion = gsap.timeline({
          defaults: { ease: "none" }
        });

        choreo
          .to(".welcome-image-left", {
            yPercent: -18,
            rotate: 0,
            scale: 1,
            duration: WELCOME_WIPE_DURATION
          }, 0)
          .to(".welcome-image-right", {
            yPercent: 18,
            rotate: 0,
            scale: 1,
            duration: WELCOME_WIPE_DURATION
          }, 0)
          .to(".welcome-inspiration-copy", {
            yPercent: -8,
            duration: WELCOME_WIPE_DURATION * 0.86
          }, 0)
          .to(".welcome-scroll-fill", {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: WELCOME_WIPE_DURATION * 0.78,
            stagger: 0.08
          }, WELCOME_WIPE_DURATION * 0.12)
          .to(".welcome-horizontal-mask", {
            clipPath: "circle(45% at 50% 50%)",
            rotate: 34,
            scaleX: 1,
            scaleY: 1,
            duration: WELCOME_WIPE_DURATION * 0.88
          }, WELCOME_WIPE_DURATION * 0.04)
          .to(".welcome-cap-core", {
            rotate: 128,
            scale: 1.08,
            duration: WELCOME_WIPE_DURATION * 0.86
          }, WELCOME_WIPE_DURATION * 0.04)
          .to(".welcome-cap-glow", {
            scale: 1,
            duration: WELCOME_WIPE_DURATION * 0.66,
            stagger: 0.04
          }, WELCOME_WIPE_DURATION * 0.12)
          .to(".welcome-cap-ring", {
            rotate: -78,
            scale: 1,
            duration: WELCOME_WIPE_DURATION * 0.72,
            stagger: 0.04
          }, WELCOME_WIPE_DURATION * 0.12)
          .to(".welcome-cap-ridge", {
            scaleX: 1,
            duration: WELCOME_WIPE_DURATION * 0.64,
            stagger: {
              amount: 0.18,
              from: "center"
            }
          }, WELCOME_WIPE_DURATION * 0.16)
          .to(".welcome-horizontal-mask", {
            clipPath: "circle(15% at 50% 50%)",
            rotate: 0,
            scaleX: 0.42,
            scaleY: 0.42,
            x: 0,
            y: 0,
            duration: WELCOME_WIPE_DURATION * 0.34
          }, WELCOME_WIPE_DURATION * 0.62)
          .to(".welcome-cap-core", {
            rotate: 218,
            scale: 0.86,
            duration: WELCOME_WIPE_DURATION * 0.34
          }, WELCOME_WIPE_DURATION * 0.62)
          .to(".welcome-cap-ring", {
            rotate: -136,
            scale: 0.76,
            duration: WELCOME_WIPE_DURATION * 0.32,
            stagger: 0.02
          }, WELCOME_WIPE_DURATION * 0.62)
          .to(".welcome-cap-ridge", {
            scaleX: 0.38,
            duration: WELCOME_WIPE_DURATION * 0.28,
            stagger: {
              amount: 0.1,
              from: "edges"
            }
          }, WELCOME_WIPE_DURATION * 0.64)
          .to(".phase-welcome-shell", {
            clipPath: "inset(0% 50% 0% 50%)",
            xPercent: 8,
            duration: WELCOME_WIPE_DURATION * 0.44
          }, WELCOME_WIPE_DURATION * 0.42)
          .to(".welcome-figure-left", {
            x: "22vw",
            xPercent: 18,
            y: "-1vh",
            yPercent: -2,
            duration: WELCOME_DOCK_DURATION
          }, WELCOME_DOCK_START)
          .to(".welcome-figure-right", {
            x: "-22vw",
            xPercent: -18,
            y: "2vh",
            yPercent: 6,
            duration: WELCOME_DOCK_DURATION
          }, WELCOME_DOCK_START)
          .to(".welcome-image-frame-left, .welcome-image-frame-right", {
            scale: 1.06,
            rotate: 0,
            duration: WELCOME_DOCK_DURATION
          }, WELCOME_DOCK_START)
          .to(".welcome-image-sheet-left, .welcome-image-sheet-right", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: WELCOME_DOCK_DURATION * 0.26,
            stagger: 0.04
          }, WELCOME_DOCK_START + WELCOME_DOCK_DURATION * 0.7)
          .to(".welcome-label-left", {
            rotate: 90,
            scale: 0.54,
            xPercent: -64,
            yPercent: -108,
            duration: WELCOME_DOCK_DURATION
          }, WELCOME_DOCK_START)
          .to(".welcome-label-right", {
            rotate: -90,
            scale: 0.54,
            xPercent: 64,
            yPercent: 132,
            duration: WELCOME_DOCK_DURATION
          }, WELCOME_DOCK_START)
          .to(".welcome-ornament-line", {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: WELCOME_DOCK_DURATION * 0.78,
            stagger: 0.04
          }, WELCOME_DOCK_START)
          .to(".phase-two-orbit-node", {
            scale: 1,
            duration: WELCOME_DOCK_DURATION * 0.42,
            stagger: 0.05
          }, WELCOME_DOCK_START + 0.02)
          .to(".phase-two-orbit-card", {
            clipPath: "inset(0% 0% 0% 0%)",
            rotationX: 0,
            scale: 1,
            y: 0,
            duration: WELCOME_DOCK_DURATION * 0.72,
            stagger: 0.06
          }, WELCOME_DOCK_START + 0.04)
          .to(".welcome-ornament-note", {
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: WELCOME_DOCK_DURATION * 0.68,
            stagger: 0.05
          }, WELCOME_DOCK_START + 0.06)
          .set(".phase-welcome", {
            pointerEvents: "none"
          }, WELCOME_DURATION);

        mainMotion
          .to(".hero-line", {
            clipPath: "inset(0% 0% 0% 0%)",
            yPercent: 0,
            duration: 0.52,
            stagger: 0.06
          }, 0)
          .to(".hero-copy-mask", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.5,
            stagger: 0.08
          }, 0.18)
          .to(".hero-template-card", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            duration: 0.72,
            stagger: 0.1
          }, 0.28)
          .to(".hero-title-lockup", {
            y: -36,
            scale: 0.94,
            duration: 0.66
          }, 0.92)
          .to(".hero-template-card", {
            y: -62,
            scale: 1.08,
            duration: 0.7,
            stagger: 0.04
          }, 1.02)
          .to(".phase-white", {
            clipPath: "circle(145% at 50% 52%)",
            duration: 0.9
          }, 1.18)
          .to(".white-word", {
            clipPath: "inset(0% 0% 0% 0%)",
            yPercent: 0,
            duration: 0.54,
            stagger: 0.06
          }, 1.45)
          .to(".color-shift-word", {
            color: "#0f766e",
            duration: 0.7
          }, 1.58)
          .to(".white-copy-mask", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.52,
            stagger: 0.07
          }, 1.68)
          .to(".white-card-mask", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.5,
            stagger: 0.08
          }, 1.82)
          .to(".split-left-half", {
            xPercent: -112,
            duration: 0.82
          }, 2.72)
          .to(".split-right-half", {
            xPercent: 112,
            duration: 0.82
          }, 2.72)
          .to(".phase-green", {
            clipPath: "circle(148% at 50% 50%)",
            duration: 0.94
          }, 2.84)
          .to(".green-panel", {
            scale: 1,
            borderRadius: 0,
            duration: 0.76
          }, 2.9)
          .to(".green-word", {
            clipPath: "inset(0% 0% 0% 0%)",
            yPercent: 0,
            duration: 0.5,
            stagger: 0.06
          }, 3.18)
          .to(".green-copy-mask", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.48,
            stagger: 0.07
          }, 3.36)
          .to(".template-preview-stack", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.54
          }, 3.42)
          .set(".phase-two-template-browser", {
            pointerEvents: "auto"
          }, 3.44)
          .to(".template-list-item", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.42,
            stagger: 0.05
          }, 3.5)
          .to(".green-card-mask", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.62,
            stagger: 0.1
          }, 3.5)
          .to(".green-title-wrap", {
            scale: 1.06,
            y: -18,
            duration: 0.54
          }, 3.88)
          .to(".green-split-left", {
            xPercent: -120,
            duration: GREEN_SPLIT_DURATION
          }, GREEN_SPLIT_START)
          .to(".green-split-right", {
            xPercent: 120,
            duration: GREEN_SPLIT_DURATION
          }, GREEN_SPLIT_START)
          .set(".phase-two-template-browser", {
            pointerEvents: "none"
          }, WIDTH_REVEAL_START)
          .to(".width-left-half", {
            xPercent: 0,
            duration: 0.9
          }, WIDTH_REVEAL_START)
          .to(".width-right-half", {
            xPercent: 0,
            duration: 0.9
          }, WIDTH_REVEAL_START)
          .to(".phase-three-left-half", {
            clipPath: "inset(0% 0% 0% 0%)",
            xPercent: 0,
            duration: 0.52
          }, WIDTH_REVEAL_START + 0.58)
          .to(".phase-three-right-half", {
            clipPath: "inset(0% 0% 0% 0%)",
            xPercent: 0,
            duration: 0.52
          }, WIDTH_REVEAL_START + 0.58)
          .set(".phase-three-content", {
            pointerEvents: "auto"
          }, WIDTH_REVEAL_START + 0.68)
          .to(".width-word", {
            clipPath: "inset(0% 0% 0% 0%)",
            yPercent: 0,
            duration: 0.52,
            stagger: 0.06
          }, WIDTH_REVEAL_START + 0.86)
          .to(".width-copy-mask", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.48,
            stagger: 0.06
          }, WIDTH_REVEAL_START + 1)
          .to(".width-reveal-copy", {
            xPercent: 0,
            duration: 0.72
          }, WIDTH_REVEAL_START + 0.86)
          .to(".width-pill-mask", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.42,
            stagger: 0.06
          }, WIDTH_REVEAL_START + 1.18)
          .set(".phase-three-content", {
            pointerEvents: "none"
          }, PHASE_THREE_EXIT_START)
          .to(".width-reveal-shell, .phase-three-content", {
            xPercent: 112,
            duration: 0.72
          }, PHASE_THREE_EXIT_START)
          .to(".phase-depth", {
            clipPath: "circle(150% at 50% 52%)",
            duration: 0.9
          }, DEPTH_REVEAL_START)
          .to(".depth-word", {
            clipPath: "inset(0% 0% 0% 0%)",
            yPercent: 0,
            duration: 0.52,
            stagger: 0.06
          }, DEPTH_REVEAL_START + 0.22)
          .to(".depth-copy-mask", {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 0.46,
            stagger: 0.07
          }, DEPTH_REVEAL_START + 0.38)
          .to(".depth-image-card", {
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "blur(0px)",
            scale: 1,
            y: 0,
            z: 0,
            rotateX: 0,
            duration: 0.86,
            stagger: 0.1
          }, DEPTH_REVEAL_START + 0.48)
          .to(".depth-stage", {
            scale: 1.08,
            duration: 0.8
          }, DEPTH_REVEAL_START + 1.12);

        choreo.add(mainMotion, WELCOME_DURATION);

        gsap.to(".after-reveal", {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".after-flow",
            start: "top 76%"
          }
        });
      }, rootElement);

      cleanup = () => {
        ctx.revert();
      };
    }

    void setupMotion();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <main
      ref={rootRef}
      className="landing-motion-preload w-full max-w-[100vw] overflow-x-hidden bg-[#f4fbf5] text-[var(--foreground)]"
    >
      <ScrollChoreography
        activeTemplateIndex={activeTemplateIndex}
        onSelectTemplate={setActiveTemplateIndex}
      />
      <AfterFlow />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}

function ScrollChoreography({
  activeTemplateIndex,
  onSelectTemplate
}: {
  activeTemplateIndex: number;
  onSelectTemplate: (index: number) => void;
}) {
  return (
    <section className="choreo-section relative min-h-[1060vh] max-w-[100vw] overflow-x-hidden bg-[#f4fbf5]">
      <div className="choreo-stage relative h-dvh w-full max-w-[100vw] overflow-hidden">
        <StageHeader />
        {/* Intro hero: pre-phase landing scene */}
        <PhaseHero />
        {/* Phase 01 includes the welcome lockup; Phase 02 is the signal orbit inside WelcomeOrnaments. */}
        <PhaseWelcome />
        {/* Phase 03: readable base */}
        <PhaseWhite />
        {/* Phase 04: compose */}
        <PhaseGreen
          activeTemplateIndex={activeTemplateIndex}
          onSelectTemplate={onSelectTemplate}
        />
        {/* Phase 05: apply */}
        <PhaseSplit />
        {/* Phase 06: template depth */}
        <PhaseDepth />
      </div>
    </section>
  );
}

function StageHeader() {
  return (
    <div className="absolute left-0 right-0 top-0 z-[90] w-full max-w-[100vw] px-4 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href="/"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/70 bg-white/76 px-3 py-2 text-sm font-black text-[var(--primary-ink)] shadow-lg shadow-green-900/5 backdrop-blur-xl"
        >
          <span className="grid size-7 place-items-center rounded-full bg-[var(--primary)] text-white">
            C
          </span>
          CV Builder
        </Link>

        <Link href="/account" className="shrink-0">
          <Button size="sm">
            Start
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

function PhaseWelcome() {
  // Phase 01: welcome lockup. Phase 02 is composed by WelcomeOrnaments.
  return (
    <section className="phase-welcome pointer-events-none absolute inset-0 z-[18] overflow-hidden text-white">
      <div className="absolute inset-0 bg-[#102f1e]" />
      <div className="welcome-left-panel absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_100%_50%,rgba(255,253,248,0.18),rgba(16,47,30,0.58)_42%,#102f1e_100%)]" />
      <div className="welcome-right-panel absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_0%_50%,rgba(255,253,248,0.18),rgba(16,47,30,0.58)_42%,#102f1e_100%)]" />
      <div className="welcome-horizontal-mask welcome-cap-swirl absolute left-1/2 top-1/2 z-[1] h-[150vmax] w-[150vmax] overflow-hidden rounded-full will-change-transform">
        <div className="welcome-rotating-mask welcome-cap-core absolute inset-0 bg-[conic-gradient(from_216deg_at_50%_50%,#dff4e5_0deg,#8de0aa_34deg,#1a6a42_74deg,#102f1e_118deg,#eaf7ec_154deg,#39a86b_196deg,#102f1e_254deg,#dff4e5_360deg)]" />
        <div className="welcome-cap-glow absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,253,248,0.72),rgba(188,235,200,0.24)_34%,rgba(16,47,30,0)_68%)] blur-2xl" />
        <div className="welcome-cap-ring absolute inset-[9%] rounded-full border border-[#dff4e5]/24 shadow-[inset_0_0_38px_rgba(223,244,229,0.16),0_0_44px_rgba(57,168,107,0.16)]" />
        <div className="welcome-cap-ring absolute inset-[22%] rounded-full border border-[#eaf7ec]/18 shadow-[inset_0_0_28px_rgba(234,247,236,0.12)]" />
        <div className="welcome-cap-ridge-set absolute inset-0">
          {capRidges.map((ridge) => (
            <span
              key={ridge}
              className="welcome-cap-ridge absolute left-1/2 top-1/2 h-[2px] w-[34%] origin-left rounded-full bg-[linear-gradient(90deg,rgba(234,247,236,0.02),rgba(234,247,236,0.68),rgba(57,168,107,0.18))] shadow-[0_0_18px_rgba(223,244,229,0.18)]"
              style={{
                transform: `rotate(${ridge * (360 / capRidges.length)}deg) translateX(7%)`
              }}
            />
          ))}
        </div>
      </div>

      <WelcomeInspiration />
      <WelcomeOrnaments />

      <div className="phase-welcome-shell absolute left-1/2 top-1/2 z-10 w-[min(92vw,980px)] -translate-x-1/2 -translate-y-1/2 text-center">
        <div
          aria-label="Welcome"
          className="welcome-letter-row mx-auto mb-6 flex w-full max-w-[min(86vw,48rem)] items-center justify-center gap-[clamp(0.25rem,1.6vw,1rem)]"
        >
          {welcomeLetters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="welcome-letter grid size-[clamp(2.15rem,7vw,5.4rem)] place-items-center border border-[#f0cf8a]/44 bg-[#f0cf8a] font-mono text-[clamp(1.1rem,3.4vw,2.8rem)] font-black leading-none text-[#102f1e] shadow-[0_18px_46px_rgba(0,0,0,0.2)]"
              style={{
                "--welcome-letter-x": `${(index - 3) * 18}px`,
                "--welcome-letter-y": `${index % 2 === 0 ? -28 : 28}px`,
                "--welcome-letter-rotate": `${(index - 3) * 7}deg`,
                animationDelay: `${index * 58}ms`
              } as CSSProperties}
            >
              {letter}
            </span>
          ))}
        </div>

        <h1 className="welcome-word mx-auto max-w-[11ch] font-[var(--font-body)] text-[2.2rem] font-black uppercase leading-[0.84] tracking-normal text-[#fffdf8] sm:text-[clamp(2.65rem,8.1vw,7.35rem)]">
          <span className="welcome-title-line block text-[#fffdf8]">Your CV</span>
          <span className="welcome-title-line block text-[#bcebc8]">arrives</span>
          <span className="welcome-title-line block text-[#f0cf8a]">before you</span>
          <span className="welcome-title-line block text-[#f5c15b]">Do.</span>
        </h1>
      </div>

      <div className="welcome-orbit-copy absolute bottom-6 left-1/2 z-10 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 text-[11px] font-black uppercase tracking-[0.22em] text-white/66">
        <span className="h-px w-10 bg-white/38" />
        Scroll
        <span className="h-px w-10 bg-white/38" />
      </div>
    </section>
  );
}

function WelcomeOrnaments() {
  // Phase 02: signal orbit around the welcome lockup.
  const ornaments = [
    {
      className: "welcome-corner-top-left left-[11%] top-[18%]",
      align: "items-start text-left",
      icon: ShieldCheck,
      eyebrow: "01 / ATS grid",
      label: "Readable lines",
      text: "Core details stay in recruiter-friendly scan zones."
    },
    {
      className: "welcome-corner-top-right right-[10%] top-[17%]",
      align: "items-end text-right",
      icon: Sparkles,
      eyebrow: "02 / proof layer",
      label: "Visual proof",
      text: "Personality sits around the CV without burying the facts."
    },
    {
      className: "welcome-corner-bottom-left bottom-[14%] left-[12%]",
      align: "items-start text-left",
      icon: Palette,
      eyebrow: "03 / signal",
      label: "Role fit",
      text: "Template tone can shift while the content model stays stable."
    },
    {
      className: "welcome-corner-bottom-right bottom-[15%] right-[11%]",
      align: "items-end text-right",
      icon: Download,
      eyebrow: "04 / export",
      label: "Clean output",
      text: "The same structured CV carries into PDF and image output."
    }
  ];

  return (
    <div className="welcome-ornament-layer phase-two-signal-orbit pointer-events-none absolute inset-0 z-[7] hidden md:block">
      <div className="phase-two-orbit-rail welcome-ornament-line absolute left-1/2 top-1/2 h-[min(64vh,34rem)] w-[min(74vw,58rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5c15b]/18" />
      <div className="phase-two-orbit-rail welcome-ornament-line absolute left-1/2 top-1/2 h-[min(48vh,25rem)] w-[min(58vw,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#bcebc8]/14" />
      <span className="phase-two-orbit-node absolute left-1/2 top-[18%] size-2 -translate-x-1/2 rounded-full bg-[#f5c15b] shadow-[0_0_24px_rgba(245,193,91,0.52)]" />
      <span className="phase-two-orbit-node absolute bottom-[16%] left-1/2 size-2 -translate-x-1/2 rounded-full bg-[#bcebc8] shadow-[0_0_24px_rgba(188,235,200,0.48)]" />
      <span className="phase-two-orbit-node absolute left-[18%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-[#eaf7ec] shadow-[0_0_24px_rgba(234,247,236,0.42)]" />
      <span className="phase-two-orbit-node absolute right-[18%] top-1/2 size-2 -translate-y-1/2 rounded-full bg-[#f5c15b] shadow-[0_0_24px_rgba(245,193,91,0.42)]" />

      {ornaments.map((item) => (
        <div
          key={item.eyebrow}
          className={cn(
            "phase-two-orbit-card absolute flex w-[clamp(11rem,16vw,16.5rem)] flex-col gap-2 rounded-[8px] border border-white/12 bg-[#102f1e]/48 p-3 text-[#dff4e5]/72 shadow-[0_18px_48px_rgba(0,0,0,0.16)] backdrop-blur-[1px] will-change-transform",
            item.align,
            item.className
          )}
        >
          <span className="welcome-ornament-line phase-two-orbit-rail block h-px w-full bg-[linear-gradient(90deg,transparent,rgba(245,193,91,0.78),rgba(188,235,200,0.48),transparent)]" />
          <span className="welcome-ornament-note flex items-center gap-2">
            <span className="phase-two-orbit-node grid size-8 shrink-0 place-items-center rounded-full border border-[#f5c15b]/26 bg-[#fffdf8]/10 text-[#f5c15b]">
              <item.icon aria-hidden className="size-4" />
            </span>
            <span className="phase-two-orbit-index font-mono text-[10px] font-black uppercase tracking-[0.18em] text-[#f5c15b]/86">
              {item.eyebrow}
            </span>
          </span>
          <span className="welcome-ornament-note phase-two-orbit-title font-[var(--font-display)] text-[clamp(1.15rem,1.9vw,1.75rem)] font-black uppercase leading-none text-[#fffdf8]">
            {item.label}
          </span>
          <span className="welcome-ornament-note phase-two-orbit-copy text-[11px] font-semibold leading-5 text-[#dff4e5]/62">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}

function WelcomeInspiration() {
  const leftCard = templateImageCards[0];
  const rightCard = templateImageCards[3];

  return (
    <div className="welcome-dock-stage pointer-events-none absolute inset-0 z-[8] hidden overflow-hidden md:block">
      <figure className="welcome-figure-left welcome-inspiration-left absolute left-[clamp(1.5rem,4.6vw,5rem)] top-[clamp(8rem,18vh,11rem)] grid w-[clamp(8.5rem,14vw,12.75rem)] gap-[clamp(1.1rem,2.2vw,1.7rem)]">
        <div className="welcome-image-left relative isolate">
          <div className="welcome-image-sheet-left absolute inset-0 z-0 -translate-x-[10%] translate-y-[10%]">
            <div className="w-full overflow-hidden rounded-[20px] border border-white/14 bg-white/12 shadow-[0_18px_46px_rgba(0,0,0,0.18)] backdrop-blur-[1px]">
              <WelcomeSheetMock accent={leftCard.accent} />
            </div>
          </div>
          <div className="welcome-image-frame-left relative z-10 overflow-hidden rounded-[20px] border border-white/22 bg-[#fffdf8] p-2 shadow-[0_26px_70px_rgba(0,0,0,0.28)]">
            <div className="welcome-image-stage-left aspect-[0.76] overflow-hidden rounded-[15px] bg-[#f6f2eb]">
              <img
                alt={`${leftCard.name} CV inspiration`}
                className="h-full w-full object-contain object-top"
                loading="lazy"
                src={leftCard.src}
              />
            </div>
          </div>
        </div>
        <figcaption className="welcome-label-docked welcome-label-left welcome-inspiration-copy relative z-20 max-w-[10ch] font-[var(--font-display)] text-[clamp(1.45rem,3vw,3.3rem)] font-black uppercase leading-[0.84] tracking-normal">
          <ColorFillText>Signal first</ColorFillText>
        </figcaption>
      </figure>

      <figure className="welcome-figure-right welcome-inspiration-right absolute right-[clamp(1.5rem,4.6vw,5rem)] top-[clamp(6.75rem,15vh,9.75rem)] grid w-[clamp(8.5rem,14vw,12.75rem)] gap-[clamp(1.1rem,2.2vw,1.7rem)] text-right">
        <figcaption className="welcome-label-docked welcome-label-right welcome-inspiration-copy relative z-20 justify-self-end max-w-[10ch] font-[var(--font-display)] text-[clamp(1.45rem,3vw,3.3rem)] font-black uppercase leading-[0.84] tracking-normal">
          <ColorFillText>Styled clean</ColorFillText>
        </figcaption>
        <div className="welcome-image-right relative isolate">
          <div className="welcome-image-sheet-right absolute inset-0 z-0 -translate-x-[10%] translate-y-[10%]">
            <div className="w-full overflow-hidden rounded-[20px] border border-white/14 bg-white/12 shadow-[0_18px_46px_rgba(0,0,0,0.18)] backdrop-blur-[1px]">
              <WelcomeSheetMock accent={rightCard.accent} />
            </div>
          </div>
          <div className="welcome-image-frame-right relative z-10 overflow-hidden rounded-[20px] border border-white/22 bg-[#fffdf8] p-2 shadow-[0_26px_70px_rgba(0,0,0,0.28)]">
            <div className="welcome-image-stage-right aspect-[0.76] overflow-hidden rounded-[15px] bg-[#f6f2eb]">
              <img
                alt={`${rightCard.name} CV inspiration`}
                className="h-full w-full object-contain object-top"
                loading="lazy"
                src={rightCard.src}
              />
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
}

function ColorFillText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="text-[#bcebc8]/42">{children}</span>
      <span
        aria-hidden
        className="welcome-scroll-fill absolute inset-0 overflow-hidden"
      >
        <span className="welcome-fill-word block bg-[linear-gradient(90deg,#fffdf8_0%,#bcebc8_48%,#f5c15b_100%)] bg-clip-text text-transparent">
          {children}
        </span>
      </span>
    </span>
  );
}

function WelcomeSheetMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#fbf8f1] p-3 text-[#183325]">
      <div>
        <div
          className="h-1.5 w-12 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <div className="mt-3 h-2.5 w-20 rounded-full bg-[#183325]" />
        <div className="mt-2 h-1.5 w-14 rounded-full bg-[#98b7a2]" />
      </div>
      <div className="space-y-2">
        <div className="h-1.5 rounded-full bg-[#d7e6da]" />
        <div className="h-1.5 w-11/12 rounded-full bg-[#e4efe7]" />
        <div className="h-1.5 w-10/12 rounded-full bg-[#d7e6da]" />
        <div className="h-1.5 w-9/12 rounded-full bg-[#e4efe7]" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-8 rounded-[10px] bg-[#edf4ee]" />
        <div className="h-8 rounded-[10px] bg-[#edf4ee]" />
      </div>
    </div>
  );
}

function PhaseHero() {
  return (
    <section className="phase-hero absolute inset-0 z-10 overflow-hidden bg-[#effaf1]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#ffffff_0,#f4fbf5_28%,#dff4e5_56%,#102f1e_130%)]" />
      <div className="absolute left-1/2 top-[47%] h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#39a86b]/20" />
      <div className="absolute left-1/2 top-[47%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e0b15b]/30" />

      <div className="hero-title-lockup center-stage-copy absolute left-1/2 top-[47%] z-20 w-[min(92vw,820px)] -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="hero-copy-mask mx-auto inline-flex items-center gap-2 rounded-full border border-[#cfe6d5] bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0f5d38] shadow-lg shadow-green-900/5 backdrop-blur">
          <Sparkles aria-hidden className="size-4 text-[#c57f16]" />
          CV templates for real interviews
        </div>
        <h1 className="mt-5 font-[var(--font-display)] text-[52px] leading-[0.86] text-[#102f1e] sm:text-[86px] lg:text-[126px]">
          <KineticLine className="hero-line">Make the</KineticLine>
          <KineticLine className="hero-line text-[#0f766e]">
            first screen
          </KineticLine>
          <KineticLine className="hero-line text-[#0f5d38]">
            feel hired.
          </KineticLine>
        </h1>
      </div>

      <div className="pointer-events-none absolute inset-0 z-10">
        <TemplateImageCard
          card={templateImageCards[0]}
          className="hero-template-card absolute left-[7%] top-[25%] hidden w-[190px] rotate-[-8deg] sm:block lg:w-[240px]"
        />
        <TemplateImageCard
          card={templateImageCards[1]}
          className="hero-template-card absolute right-[8%] top-[18%] hidden w-[170px] rotate-[7deg] sm:block lg:w-[230px]"
        />
        <TemplateImageCard
          card={templateImageCards[2]}
          className="hero-template-card absolute bottom-[15%] left-1/2 w-[176px] -translate-x-1/2 rotate-[2deg] sm:w-[220px] lg:w-[270px]"
        />
      </div>

      <div className="bottom-left-copy hero-copy-mask absolute bottom-7 left-4 z-30 max-w-[19rem] text-sm leading-6 text-[#314338] sm:left-8 lg:left-12">
        Build a CV that explains your value before the recruiter reaches the
        interview invite.
      </div>
      <div className="bottom-right-copy hero-copy-mask absolute bottom-7 right-4 z-30 max-w-[19rem] text-right text-sm leading-6 text-[#314338] sm:right-8 lg:right-12">
        Structured sections, editable themes, export-ready previews, and a
        softer path from draft to application.
      </div>
    </section>
  );
}

function PhaseWhite() {
  // Phase 03: readable base.
  return (
    <section className="phase-white pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <div className="split-left-half absolute inset-y-0 left-0 w-1/2 bg-[#fffdf8]" />
      <div className="split-right-half absolute inset-y-0 right-0 w-1/2 bg-[#fffdf8]" />

      <div className="absolute inset-0 bg-[#fffdf8]" />
      <div className="center-stage-copy white-copy-mask absolute left-1/2 top-[38%] z-10 w-[min(90vw,760px)] -translate-x-1/2 -translate-y-1/2 text-center sm:top-[40%]">
        <PhaseLabel className="text-[#a86d35]">Phase 03 / readable base</PhaseLabel>
        <h2 className="mt-4 font-[var(--font-display)] text-[40px] leading-[0.9] text-[#102f1e] sm:text-[74px] lg:text-[100px]">
          <KineticLine className="white-word">Start ATS-safe,</KineticLine>
          <KineticLine className="white-word color-shift-word">
            then make it yours.
          </KineticLine>
        </h2>
      </div>

      <div className="absolute inset-x-4 bottom-5 z-10 grid gap-6 sm:inset-x-8 sm:bottom-8 lg:inset-x-12 lg:grid-cols-[minmax(16rem,0.72fr)_minmax(15rem,0.46fr)] lg:items-end lg:gap-12">
        <div className="bottom-left-copy white-copy-mask max-w-md pt-12 text-[12px] leading-6 text-[#5b645f] sm:text-[13px] sm:leading-7 lg:pt-20">
          Name, role, contact, summary, and high-signal achievements stay easy
          to scan. The design can move, but the CV hierarchy remains calm.
        </div>
        <div className="bottom-right-copy phase-one-details-rail flex flex-col gap-3 justify-self-end text-right sm:max-w-[20rem]">
          <FlowCard index="01" title="Interview angle" text="Shape the summary around the role." />
          <FlowCard index="02" title="Recruiter scan" text="Keep key sections predictable." />
          <FlowCard index="03" title="Theme control" text="Change accent, avatar, and layout." />
          <FlowCard index="04" title="Section rhythm" text="Drag, hide, and reorder content." />
        </div>
      </div>
    </section>
  );
}

function PhaseGreen({
  activeTemplateIndex,
  onSelectTemplate
}: {
  activeTemplateIndex: number;
  onSelectTemplate: (index: number) => void;
}) {
  const activeTemplate = templateImageCards[activeTemplateIndex];

  // Phase 04: compose.
  return (
    <section className="phase-green pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <div className="green-panel absolute inset-0 overflow-hidden bg-[#102f1e] text-white">
        <div className="green-split-left absolute inset-y-0 left-0 z-0 w-1/2 bg-[#102f1e]" />
        <div className="green-split-right absolute inset-y-0 right-0 z-0 w-1/2 bg-[#102f1e]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(224,177,91,0.34),transparent_30%),radial-gradient(circle_at_82%_74%,rgba(57,168,107,0.38),transparent_32%)]" />
        <div className="absolute left-[-9rem] top-[-9rem] h-[34rem] w-[34rem] rounded-full bg-[#39a86b]/28 blur-3xl" />

        <div className="center-stage-copy green-title-wrap absolute left-1/2 top-[clamp(6.75rem,17dvh,9rem)] z-10 w-[min(92vw,820px)] -translate-x-1/2 text-center sm:top-[clamp(7.25rem,17dvh,9.75rem)] lg:top-[clamp(7.5rem,16dvh,9.5rem)]">
          <p className="green-copy-mask text-xs font-black uppercase tracking-[0.18em] text-[#e0b15b] sm:text-sm">
            Phase 04 / compose
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-[clamp(2.25rem,10vw,5.75rem)] leading-[0.88] sm:mt-4">
            <KineticLine className="green-word">Move sections</KineticLine>
            <KineticLine className="green-word text-[#bcebc8]">
              like editorial layers.
            </KineticLine>
          </h2>
        </div>

        <div className="phase-two-template-browser phase-two-responsive-grid phase-four-compose-lift pointer-events-auto absolute inset-x-4 bottom-[clamp(4rem,8dvh,6rem)] z-10 grid max-h-[44dvh] -translate-y-[clamp(1.25rem,4dvh,3rem)] grid-cols-[minmax(0,0.54fr)_minmax(0,0.46fr)] items-end gap-3 sm:inset-x-8 sm:bottom-[clamp(4.5rem,9dvh,6.5rem)] sm:max-h-[48dvh] sm:-translate-y-[clamp(1.5rem,4.5dvh,3.25rem)] sm:gap-5 md:grid-cols-[minmax(17rem,0.84fr)_minmax(16rem,0.62fr)] lg:bottom-[clamp(5rem,10dvh,7.5rem)] lg:inset-x-12 lg:max-h-[min(52dvh,25rem)] lg:-translate-y-[clamp(1.25rem,4dvh,3.5rem)] lg:grid-cols-[minmax(18rem,0.84fr)_minmax(18rem,0.74fr)] lg:gap-8">
          <div className="bottom-left-copy phase-two-preview-group phase-two-preview-lift grid min-w-0 gap-2 sm:gap-4 lg:grid-cols-[minmax(13rem,0.58fr)_minmax(13rem,0.42fr)] lg:items-end lg:gap-6">
            <div className="phase-two-preview-column green-card-mask">
              <TemplatePreviewStack card={activeTemplate} />
            </div>
            <div className="green-copy-mask max-w-[22rem] text-[11px] leading-5 text-white/78 sm:text-[13px] sm:leading-6 lg:text-[15px] lg:leading-7">
              <p className="phase-two-active-template text-[10px] font-black uppercase tracking-[0.16em] text-[#e0b15b] sm:text-xs">
                Active template
              </p>
              <h3 className="mt-2 font-[var(--font-display)] text-[clamp(1.35rem,5.4vw,2.25rem)] leading-none text-white sm:mt-3">
                {activeTemplate.name}
              </h3>
              <p className="mt-3 hidden sm:block">
                {activeTemplate.role} template for {activeTemplate.useCase.toLowerCase()}.
                Useful when users want a CV that supports the interview story,
                not only a clean export.
              </p>
            </div>
          </div>

          <div className="bottom-right-copy min-w-0 justify-self-stretch md:justify-self-end">
            <div className="phase-two-template-list flex w-full min-w-0 flex-col items-stretch gap-1 text-right sm:gap-2 md:w-[min(38vw,26rem)]">
              {templateImageCards.map((card, index) => (
                <button
                  key={card.name}
                  className={cn(
                    "template-list-item group/list flex min-w-0 items-baseline justify-end gap-2 py-1 text-right font-[var(--font-display)] text-[clamp(1.1rem,5.9vw,2rem)] leading-[0.95] text-white transition-colors duration-300 hover:text-[#e0b15b] sm:gap-3 sm:py-1.5 sm:text-[clamp(1.8rem,4.8vw,2.6rem)] lg:text-[clamp(2rem,5dvh,3rem)]",
                    index === activeTemplateIndex && "phase-two-active-template text-[#e0b15b]"
                  )}
                  onFocus={() => onSelectTemplate(index)}
                  onMouseEnter={() => onSelectTemplate(index)}
                  type="button"
                >
                  <span className="hidden h-px w-10 origin-right scale-x-50 bg-current transition-transform duration-300 group-hover/list:scale-x-100 sm:block" />
                  <span className="min-w-0 break-words underline decoration-current decoration-1 underline-offset-[0.18em]">
                    {card.name}
                  </span>
                </button>
              ))}
              <div className="template-list-item pt-1 font-[var(--font-display)] text-[clamp(1.8rem,7vw,3rem)] leading-none text-white/45 lg:text-[clamp(1.8rem,5dvh,3rem)]">
                ...
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TemplatePreviewStack({
  card
}: {
  card: (typeof templateImageCards)[number];
}) {
  return (
    <div className="template-preview-stack relative aspect-[4/5] w-[74%] max-w-[clamp(6.25rem,28vw,11rem)] overflow-visible sm:w-[58%] sm:max-w-[210px] lg:max-w-[min(230px,32dvh)]">
      <div className="template-preview-layer template-preview-card-box template-preview-card-back template-card-back-offset absolute bottom-4 left-0 z-0 aspect-[3/4] w-[calc(100%-1.5rem)] overflow-hidden border border-white/18 bg-white shadow-xl shadow-black/18">
        <MiniCvMock accent={card.accent} title={card.role} />
      </div>

      <div
        key={card.name}
        className="template-preview-layer template-preview-card-box template-preview-card-front template-preview-slide-reveal template-card-front-offset absolute bottom-4 left-0 z-10 aspect-[3/4] w-[calc(100%-1.5rem)] overflow-visible"
      >
        <div className="template-preview-image size-full">
          <img
            alt={`${card.name} CV template preview`}
            className="block h-full w-full object-contain drop-shadow-[0_18px_42px_rgba(0,0,0,0.20)]"
            loading="lazy"
            src={card.src}
          />
        </div>
        <div className="template-preview-scan-line pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(223,244,229,0.74),transparent)]" />
      </div>
    </div>
  );
}

function MiniCvMock({ accent, title }: { accent: string; title: string }) {
  return (
    <div className="template-preview-layer template-mock-cv-back size-full bg-white p-4 text-[#102f1e]">
      <div className="flex items-start justify-between gap-3 border-b border-[#dcece0] pb-3">
        <div>
          <div
            className="h-2 w-14 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <div className="mt-3 h-3 w-24 rounded-full bg-[#102f1e]" />
          <div className="mt-2 h-2 w-20 rounded-full bg-[#b6cfc0]" />
        </div>
        <div
          className="size-10 rounded-full"
          style={{ backgroundColor: accent }}
        />
      </div>
      <div className="mt-4 grid grid-cols-[1fr_0.52fr] gap-4">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index}>
              <div className="h-2 w-16 rounded-full bg-[#aac9b4]" />
              <div className="mt-2 h-1.5 rounded-full bg-[#dcece0]" />
              <div className="mt-1.5 h-1.5 w-5/6 rounded-full bg-[#eaf7ec]" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-5 rounded-full bg-[#eaf7ec]" />
          ))}
        </div>
      </div>
      <p className="sr-only">{title} mock CV preview</p>
    </div>
  );
}

function PhaseSplit() {
  // Phase 05: apply.
  return (
    <section className="phase-split pointer-events-none absolute inset-0 z-40 overflow-hidden">
      <div className="width-reveal-shell absolute inset-0 z-0 overflow-hidden bg-transparent">
        <div className="width-left-half absolute inset-y-0 left-0 w-1/2 bg-[#f4fbf5]" />
        <div className="width-right-half absolute inset-y-0 right-0 w-1/2 bg-[#f4fbf5]" />
      </div>

      <div className="phase-three-content phase-three-layout pointer-events-none absolute inset-0 z-10 flex max-h-[calc(100dvh-0rem)] flex-col justify-center gap-[clamp(1.25rem,4vh,3.5rem)] px-4 pb-8 pt-20 sm:px-6 sm:pt-24 md:grid md:grid-cols-2 md:gap-0 md:p-0">
        <div className="phase-three-left-half flex justify-center md:h-full md:items-center md:justify-end md:pl-10 md:pr-[clamp(2rem,6vw,5rem)]">
          <div className="width-reveal-copy w-[min(100%,31rem)]">
            <PhaseLabel>Phase 05 / apply</PhaseLabel>
            <h2 className="mt-4 max-w-[8.5ch] font-[var(--font-display)] text-[clamp(2.55rem,7vw,5.35rem)] leading-[0.9] text-[#102f1e] sm:mt-5">
              <KineticLine className="width-word">Draft</KineticLine>
              <KineticLine className="width-word">for the</KineticLine>
              <KineticLine className="width-word text-[#0f766e]">
                interview room.
              </KineticLine>
            </h2>
            <div className="width-copy-mask mt-5 max-w-[24rem] text-sm leading-7 text-[var(--muted)] sm:text-[15px]">
              Tune one CV per role, keep drafts safe, then export from the same
              preview.
            </div>
            <Link href="/account" className="mt-6 inline-flex sm:mt-8">
              <Button size="lg">
                Create CV
                <ArrowRight aria-hidden className="size-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="phase-three-right-half flex justify-center md:h-full md:items-center md:justify-start md:pl-[clamp(2rem,6vw,5rem)] md:pr-10">
          <div className="phase-three-action-list width-copy-mask justify-self-start md:justify-self-end">
            <div className="phase-three-menu flex max-w-[min(20rem,72vw)] flex-col gap-[clamp(0.2rem,1vh,0.55rem)] text-left md:max-w-[20rem]">
              <MiniPill index="01" text="Export" />
              <MiniPill index="02" text="Image" />
              <MiniPill index="03" text="Match" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseDepth() {
  // Phase 06: template depth.
  return (
    <section className="phase-depth pointer-events-none absolute inset-0 z-50 overflow-hidden bg-[#111814] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(57,168,107,0.24),transparent_24%),radial-gradient(circle_at_70%_20%,rgba(224,177,91,0.2),transparent_20%),linear-gradient(135deg,#111814,#1b2b21_52%,#070907)]" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />

      <div className="center-stage-copy depth-copy-mask absolute left-1/2 top-[22%] z-20 w-[min(92vw,780px)] -translate-x-1/2 text-center">
        <PhaseLabel className="text-[#e0b15b]">Phase 06 / template depth</PhaseLabel>
        <h2 className="mt-4 font-[var(--font-display)] text-[42px] leading-[0.9] sm:text-[76px] lg:text-[100px]">
          <KineticLine className="depth-word">Pull the right CV</KineticLine>
          <KineticLine className="depth-word text-[#e0b15b]">
            out of the archive.
          </KineticLine>
        </h2>
      </div>

      <div className="depth-stage absolute inset-0 z-10">
        {templateImageCards.map((card, index) => (
          <TemplateImageCard
            key={card.name}
            card={card}
            className={cn(
              "depth-image-card absolute w-[135px] sm:w-[190px] lg:w-[250px]",
              index === 0 && "left-[9%] top-[39%] rotate-[-8deg]",
              index === 1 && "right-[13%] top-[34%] rotate-[7deg]",
              index === 2 && "left-1/2 top-[48%] -translate-x-1/2 rotate-[1deg]",
              index === 3 && "bottom-[12%] left-[22%] hidden rotate-[5deg] sm:block",
              index === 4 && "bottom-[10%] right-[22%] hidden rotate-[-5deg] sm:block"
            )}
            dark
          />
        ))}
      </div>

      <div className="bottom-left-copy depth-copy-mask absolute bottom-7 left-4 z-20 max-w-[24rem] text-sm leading-6 text-white/76 sm:left-8 sm:text-base sm:leading-7 lg:left-12">
        Search later can connect CV versions with job filters, saved roles, and
        interview notes so every application has context.
      </div>
      <div className="bottom-right-copy depth-copy-mask absolute bottom-7 right-4 z-20 hidden max-w-[24rem] text-right text-sm leading-6 text-[#f0cf8a] sm:right-8 lg:right-12 lg:block">
        The images here are placeholder inspiration from your array. Names and
        template metadata can be tuned as the real template system grows.
      </div>
    </section>
  );
}

function AfterFlow() {
  return (
    <section className="after-flow bg-white px-4 py-20 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="after-reveal text-sm font-black uppercase tracking-[0.18em] text-[var(--primary-ink)]">
            After the motion
          </p>
          <h2 className="after-reveal mt-4 max-w-3xl font-[var(--font-display)] text-5xl leading-[0.95] text-[#102f1e] sm:text-6xl">
            The actual product stays calm and usable.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {workflow.map((item) => (
            <article
              key={item.title}
              className="after-reveal rounded-[28px] border border-[var(--border)] bg-[#f8fcf9] p-5 shadow-sm"
            >
              <item.icon
                aria-hidden
                className="size-6 text-[var(--primary)]"
              />
              <h3 className="mt-5 text-lg font-bold text-[#102f1e]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseLabel({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-ink)] sm:text-sm",
        className
      )}
    >
      {children}
    </p>
  );
}

function KineticLine({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <span className={cn("height-reveal-line block", className)}>
        {children}
      </span>
    </span>
  );
}

function TemplateImageCard({
  card,
  className,
  dark = false
}: {
  card: (typeof templateImageCards)[number];
  className?: string;
  dark?: boolean;
}) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-[18px] border bg-white shadow-2xl shadow-green-950/20",
        dark
          ? "border-white/15 bg-white/8 text-white"
          : "border-white/80 text-[#102f1e]",
        className
      )}
    >
      <div className="aspect-[4/5] overflow-hidden bg-[#fffdf8]">
        <img
          alt={`${card.name} CV template preview`}
          className="h-full w-full object-contain"
          loading="lazy"
          src={card.src}
        />
      </div>
      <div className={cn("p-3", dark ? "bg-white/8" : "bg-white")}>
        <div
          className="mb-2 h-1.5 w-12 rounded-full"
          style={{ backgroundColor: card.accent }}
        />
        <h3 className="text-sm font-black leading-tight">{card.name}</h3>
        <p
          className={cn(
            "mt-1 text-[11px] font-semibold uppercase tracking-[0.12em]",
            dark ? "text-white/64" : "text-[#657066]"
          )}
        >
          {card.role} / {card.useCase}
        </p>
      </div>
    </article>
  );
}

function FlowCard({
  index,
  title,
  text
}: {
  index: string;
  title: string;
  text: string;
}) {
  return (
    <article className="phase-one-detail-item white-card-mask grid grid-cols-[2.8rem_1fr] gap-3 py-1.5 text-left sm:text-right">
      <span className="font-[var(--font-display)] text-xl leading-none text-[#c57f16] sm:text-2xl">
        {index}
      </span>
      <span>
        <span className="block text-sm font-black text-[#102f1e] underline decoration-[#e0b15b] decoration-1 underline-offset-4 sm:text-base">
          {title}
        </span>
        <span className="mt-1 block text-[12px] leading-5 text-[#67746a] sm:text-[13px]">
          {text}
        </span>
      </span>
    </article>
  );
}

function MiniPill({
  index,
  text
}: {
  index: string;
  text: string;
}) {
  return (
    <div className="phase-three-action-item width-pill-mask group grid grid-cols-[clamp(2.35rem,4vw,3rem)_1fr] items-start gap-2 py-1 text-left sm:gap-3">
      <span className="phase-three-menu-index pt-[0.38em] font-mono text-[clamp(0.78rem,1.35vw,0.95rem)] font-black leading-none tracking-[0.08em] text-[#c57f16]">
        ({index})
      </span>
      <span className="phase-three-menu-label whitespace-nowrap font-[var(--font-display)] text-[clamp(2rem,4.4vw,4rem)] font-black uppercase leading-[0.95] text-[#102f1e] underline decoration-[#39a86b]/45 decoration-2 underline-offset-[0.16em] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0f766e]">
        {text}
      </span>
    </div>
  );
}

function FinalCta() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[36px] bg-[#102f1e] px-6 py-12 text-white sm:px-10 lg:px-14">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#e0b15b]">
              Ready when you are
            </p>
            <h2 className="mt-4 max-w-3xl font-[var(--font-display)] text-5xl leading-[0.95] sm:text-7xl">
              Build the CV that fits the role.
            </h2>
          </div>
          <Link href="/account">
            <Button
              size="lg"
              className="bg-white text-[#102f1e] hover:bg-[#dff4e5]"
            >
              Create your account
              <ArrowRight aria-hidden className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-white px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-[var(--primary-ink)]">CV Builder</p>
        <p>Created by Nguyễn Đình Trung</p>
      </div>
    </footer>
  );
}
