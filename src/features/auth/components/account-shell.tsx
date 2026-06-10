"use client";

import {
  ArrowRight,
  Leaf,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";

type AccountMode = "login" | "signup" | "forgot" | "verify";

const modeCopy: Record<
  AccountMode,
  {
    badge: string;
    title: string;
    description: string;
    formTitle: string;
    submitLabel: string;
  }
> = {
  login: {
    badge: "Welcome back",
    title: "Pick up where you left off.",
    description:
      "Open your drafts, switch templates, and keep your next application moving.",
    formTitle: "Login",
    submitLabel: "Login"
  },
  signup: {
    badge: "New account",
    title: "Start a smoother CV workflow.",
    description:
      "Create an account to save progress, shape better resumes, and stay organized.",
    formTitle: "Sign up",
    submitLabel: "Create account"
  },
  forgot: {
    badge: "Need access again?",
    title: "Reset it without friction.",
    description:
      "Use your email to request a code and move back into your account quickly.",
    formTitle: "Forgot password",
    submitLabel: "Send code"
  },
  verify: {
    badge: "One more step",
    title: "Verify your code.",
    description:
      "Enter the code we sent so you can continue with your account securely.",
    formTitle: "Verify",
    submitLabel: "Verify code"
  }
};

export function AccountShell() {
  const [mode, setMode] = useState<AccountMode>("login");
  const [emailForVerify, setEmailForVerify] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isCentered = mode === "forgot" || mode === "verify";
  const copy = modeCopy[mode];

  function changeMode(nextMode: AccountMode) {
    startTransition(() => {
      setMode(nextMode);
    });
  }

  function handleOAuth(provider: "Google" | "GitHub") {
    toast.info(`${provider} sign in will be connected later.`, {
      description: "The button is ready so the final flow can be wired in cleanly."
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);

      if (mode === "forgot") {
        setEmailForVerify(email);
        toast.success("Verification code sent.", {
          description: "This is still a UI-only flow, but the next step is ready."
        });
        changeMode("verify");
        return;
      }

      if (mode === "verify") {
        toast.success("Code verified in preview.", {
          description: "The final backend verification will be added later."
        });
        return;
      }

      toast.success(
        mode === "signup" ? "Account flow preview submitted." : "Signed in preview submitted.",
        {
          description: "This screen is handling UI flow only for now."
        }
      );
    }, 460);
  }

  return (
    <main className="min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_14%_10%,#dff4e5_0,#f4fbf5_34%,#ffffff_76%)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-dvh max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-10">
        <div className="relative grid w-full gap-5 lg:min-h-[min(88vh,760px)] lg:grid-cols-1">
          <section
            className={cn(
              "relative overflow-hidden rounded-[38px] border border-[var(--border)] bg-[#102f1e] text-white shadow-2xl shadow-green-950/20 transition-all duration-700 ease-out",
              "min-h-[220px] px-5 py-6 sm:px-7 sm:py-7 lg:absolute lg:inset-y-0 lg:w-[68%] lg:px-9 lg:py-8",
              isLogin && "lg:left-0",
              isSignup && "lg:left-[32%]",
              isCentered && "lg:left-[16%] lg:w-[68%]"
            )}
          >
            <div className="absolute inset-0 opacity-90">
              <div className="absolute -left-20 top-6 h-56 w-56 rounded-full bg-[#39a86b]/35 blur-3xl" />
              <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#dff4e5]/12 blur-3xl" />
              <div className="absolute inset-x-8 top-20 h-px bg-white/18" />
            </div>

            <div
              className={cn(
                "relative z-10 flex h-full flex-col justify-between gap-6 transition-all duration-700 ease-out",
                "lg:max-w-[360px]",
                isLogin && "lg:ml-0 lg:text-left",
                isSignup && "lg:ml-auto lg:text-right",
                isCentered && "lg:mx-auto lg:text-center"
              )}
            >
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur">
                <Sparkles aria-hidden className="size-3.5 text-[#bcebc8]" />
                CV Builder
              </div>

              <div>
                <p className="text-sm font-semibold text-[#bcebc8]">{copy.badge}</p>
                <h1 className="mt-3 max-w-[12ch] font-[var(--font-display)] text-4xl leading-[0.94] sm:text-5xl lg:text-6xl">
                  {copy.title}
                </h1>
                <p className="mt-4 max-w-[30rem] text-sm leading-6 text-white/72 sm:text-[15px]">
                  {copy.description}
                </p>
              </div>

              <div
                className={cn(
                  "grid gap-3 sm:grid-cols-3 lg:grid-cols-1",
                  !isCentered && "xl:grid-cols-3"
                )}
              >
                <MiniPill text="Save drafts" />
                <MiniPill text="Switch layouts" />
                <MiniPill text="Export faster" />
              </div>
            </div>
          </section>

          <section
            className={cn(
              "w-full transition-all duration-700 ease-out lg:absolute lg:top-1/2 lg:z-20 lg:w-[430px] lg:-translate-y-1/2",
              isLogin && "lg:right-0",
              isSignup && "lg:left-0",
              isCentered && "lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
            )}
          >
            <div className="mx-auto max-w-[480px] rounded-[30px] border border-[var(--border)] bg-white/92 p-4 shadow-[0_28px_100px_rgb(18_76_45_/14%)] backdrop-blur sm:p-5">
              <div className="flex items-center justify-between gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary-ink)]"
                >
                  <Leaf aria-hidden className="size-4" />
                  CV Builder
                </Link>

                <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface-soft)] p-1 text-xs font-semibold text-[var(--muted)]">
                  <ModeTab
                    active={mode === "login"}
                    onClick={() => changeMode("login")}
                    label="Login"
                  />
                  <ModeTab
                    active={mode === "signup"}
                    onClick={() => changeMode("signup")}
                    label="Sign up"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-[22px] bg-[var(--primary-soft)] px-4 py-3">
                <p className="text-sm font-semibold text-[var(--primary-ink)]">
                  {copy.badge}
                </p>
                <h2 className="mt-1 font-[var(--font-display)] text-[32px] leading-none text-[var(--foreground)] sm:text-[36px]">
                  {copy.formTitle}
                </h2>
              </div>

              {(mode === "login" || mode === "signup") && (
                <>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <Button
                      type="button"
                      variant="secondary"
                      className="h-11 rounded-2xl"
                      onClick={() => handleOAuth("Google")}
                    >
                      <GoogleMark />
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="h-11 rounded-2xl"
                      onClick={() => handleOAuth("GitHub")}
                    >
                      <GitHubMark />
                      GitHub
                    </Button>
                  </div>

                  <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-[var(--border)]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      or
                    </span>
                    <div className="h-px flex-1 bg-[var(--border)]" />
                  </div>
                </>
              )}

              <form className="space-y-3" onSubmit={handleSubmit}>
                {mode === "signup" && (
                  <Field label="Full name" icon={<UserRound aria-hidden className="size-4 text-[var(--primary)]" />}>
                    <Input
                      name="fullName"
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                    />
                  </Field>
                )}

                {mode !== "verify" && (
                  <Field label="Email" icon={<Mail aria-hidden className="size-4 text-[var(--primary)]" />}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      defaultValue={emailForVerify}
                      required
                    />
                  </Field>
                )}

                {(mode === "login" || mode === "signup") && (
                  <Field
                    label="Password"
                    icon={<LockKeyhole aria-hidden className="size-4 text-[var(--primary)]" />}
                  >
                    <Input
                      type="password"
                      name="password"
                      placeholder={mode === "signup" ? "Create a password" : "Enter your password"}
                      autoComplete={mode === "signup" ? "new-password" : "current-password"}
                      required
                    />
                  </Field>
                )}

                {mode === "verify" && (
                  <>
                    <div className="rounded-2xl border border-[var(--border)] bg-[#f8fcf9] px-4 py-3 text-sm text-[var(--muted)]">
                      {emailForVerify ? `Code sent to ${emailForVerify}` : "Enter the 6-digit code from your email."}
                    </div>
                    <Field
                      label="Verification code"
                      icon={<ShieldCheck aria-hidden className="size-4 text-[var(--primary)]" />}
                    >
                      <Input
                        name="otp"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="123456"
                        autoComplete="one-time-code"
                        required
                      />
                    </Field>
                  </>
                )}

                {mode === "login" && (
                  <div className="flex items-center justify-between gap-4 pt-0.5 text-sm">
                    <label className="flex items-center gap-2 text-[var(--muted)]">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-[var(--border)] accent-[var(--primary)]"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="font-semibold text-[var(--primary-ink)]"
                      onClick={() => changeMode("forgot")}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="mt-1 h-12 w-full rounded-2xl"
                  disabled={isSubmitting || isPending}
                >
                  {isSubmitting ? "Working..." : copy.submitLabel}
                  <ArrowRight aria-hidden className="size-4" />
                </Button>
              </form>

              <p className="mt-4 text-center text-sm text-[var(--muted)]">
                {mode === "login" && (
                  <>
                    No account yet?{" "}
                    <button
                      type="button"
                      className="font-semibold text-[var(--primary-ink)]"
                      onClick={() => changeMode("signup")}
                    >
                      Create one
                    </button>
                  </>
                )}

                {mode === "signup" && (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="font-semibold text-[var(--primary-ink)]"
                      onClick={() => changeMode("login")}
                    >
                      Login
                    </button>
                  </>
                )}

                {mode === "forgot" && (
                  <button
                    type="button"
                    className="font-semibold text-[var(--primary-ink)]"
                    onClick={() => changeMode("login")}
                  >
                    Back to login
                  </button>
                )}

                {mode === "verify" && (
                  <>
                    Need a different email?{" "}
                    <button
                      type="button"
                      className="font-semibold text-[var(--primary-ink)]"
                      onClick={() => changeMode("forgot")}
                    >
                      Change it
                    </button>
                  </>
                )}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  icon,
  children
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function ModeTab({
  active,
  label,
  onClick
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full px-3 py-1.5 transition",
        active
          ? "bg-white text-[var(--primary-ink)] shadow-sm"
          : "text-[var(--muted)] hover:text-[var(--foreground)]"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function MiniPill({ text }: { text: string }) {
  return (
    <div className="rounded-full border border-white/12 bg-white/10 px-3.5 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white/78 backdrop-blur">
      {text}
    </div>
  );
}

function GoogleMark() {
  return (
    <span
      aria-hidden
      className="grid size-4 place-items-center rounded-full bg-white text-[10px] font-black text-[#1f1f1f]"
    >
      G
    </span>
  );
}

function GitHubMark() {
  return (
    <span
      aria-hidden
      className="grid size-4 place-items-center rounded-full bg-[#18251d] text-[9px] font-black text-white"
    >
      GH
    </span>
  );
}
