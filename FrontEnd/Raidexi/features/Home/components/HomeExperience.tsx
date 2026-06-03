"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type React from "react";
import { useEffect } from "react";

const journey = [
  {
    index: "01",
    title: "Quét cơ thể",
    copy: "Camera ghi nhận dáng đứng và các mốc cơ thể quan trọng trong một luồng đo có hướng dẫn.",
    label: "Camera",
    value: "360",
  },
  {
    index: "02",
    title: "Tạo hồ sơ fit",
    copy: "Số đo được chuyển thành một hồ sơ có thể dùng lại cho vai, ngực, eo, hông và chiều dài.",
    label: "Profile",
    value: "Fit",
  },
  {
    index: "03",
    title: "Dịch theo thương hiệu",
    copy: "Raidexi đọc logic size riêng của từng nhãn hàng để gợi ý theo ngữ cảnh sản phẩm.",
    label: "Brand",
    value: "M/32",
  },
];

const measurements = [
  { label: "Vai", value: "42.1", offset: "14%" },
  { label: "Ngực", value: "88.4", offset: "34%" },
  { label: "Eo", value: "72.8", offset: "54%" },
  { label: "Hông", value: "94.6", offset: "72%" },
];

const translations = [
  { brand: "UNIQLO", size: "M", note: "dáng cơ bản", tone: "sage" },
  { brand: "NIKE", size: "M", note: "rộng hơn khi vận động", tone: "clay" },
  { brand: "LEVI'S", size: "32", note: "chuẩn denim", tone: "brass" },
];

const outcomes = [
  ["Ít do dự", "Người mua hiểu vì sao size được gợi ý trước khi thanh toán."],
  ["Ít đổi trả", "Thương hiệu có thêm dữ liệu fit thay vì chỉ nhìn size được chọn."],
  ["Dùng lại", "Một hồ sơ cơ thể đi cùng người mua qua nhiều lần chọn đồ."],
];

function PrimaryAction({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const primary = variant === "primary";

  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center justify-between gap-4 rounded-full px-5 py-2 text-sm font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--surface-canvas)] active:scale-[0.98] ${
        primary
          ? "bg-[var(--ink)] text-[var(--surface-paper)] shadow-[0_26px_80px_-38px_rgba(24,23,20,0.9)]"
          : "bg-[rgba(255,253,247,0.74)] text-[var(--ink)] ring-1 ring-[rgba(24,23,20,0.12)]"
      }`}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] ${
          primary ? "bg-[var(--signal-blue)] text-white" : "bg-[var(--ink)] text-[var(--surface-paper)]"
        }`}
      >
        -&gt;
      </span>
    </a>
  );
}

function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
        {index}
      </span>
      <span className="h-px w-14 bg-[rgba(24,23,20,0.22)]" />
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
        {children}
      </span>
    </div>
  );
}

function FitPassport() {
  return (
    <div
      className="relative mx-auto min-h-[520px] w-full max-w-[620px] md:min-h-[640px]"
      aria-label="Minh họa hồ sơ fit cá nhân và gợi ý size theo thương hiệu"
    >
      <div className="absolute inset-x-[8%] bottom-[6%] h-20 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(24,23,20,0.2),rgba(24,23,20,0.06)_48%,transparent_72%)] opacity-45" />

      <div className="absolute left-[4%] top-[10%] h-[74%] w-[72%] rotate-[-5deg] rounded-[2.5rem] border border-[rgba(24,23,20,0.09)] bg-[rgba(255,253,247,0.34)]" />
      <div className="absolute right-[2%] top-[18%] h-[70%] w-[66%] rotate-[6deg] rounded-[2.2rem] border border-[rgba(154,116,71,0.16)] bg-[rgba(234,223,206,0.24)]" />

      <div className="raidexi-shell absolute left-[6%] top-[2%] w-[82%] rounded-[2.6rem] p-1.5 shadow-[0_42px_120px_-84px_rgba(24,23,20,0.72)] md:left-[10%] md:w-[76%]">
        <div className="raidexi-core relative overflow-hidden rounded-[calc(2.6rem-0.375rem)] p-6 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_18%,rgba(154,116,71,0.14),transparent_28%),radial-gradient(circle_at_28%_78%,rgba(93,116,101,0.13),transparent_34%)]" />
          <div className="relative">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--ink-muted)]">
                  Fit passport
                </p>
                <h2 className="mt-3 font-serif text-[clamp(2.45rem,5vw,4.4rem)] font-light leading-[0.88] text-[var(--ink)]">
                  Hồ sơ
                  <span className="block italic text-[var(--signal-blue)]">cơ thể số</span>
                </h2>
              </div>
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[rgba(24,23,20,0.12)] bg-[rgba(255,253,247,0.65)]">
                <span className="font-serif text-3xl text-[var(--brass)]">R</span>
              </div>
            </div>

            <div className="mt-8 grid gap-7 md:grid-cols-[0.9fr_0.9fr] md:items-center">
              <div className="relative mx-auto h-[300px] w-[190px] md:h-[360px] md:w-[220px]">
                <div className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 rounded-full bg-[linear-gradient(145deg,rgba(255,253,247,0.92),rgba(228,218,203,0.72))] shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_22px_60px_-42px_rgba(24,23,20,0.5)]" />
                <div className="absolute left-1/2 top-[58px] h-[230px] w-[154px] -translate-x-1/2 rounded-[48%_52%_43%_57%/29%_31%_69%_71%] border border-[rgba(24,23,20,0.1)] bg-[linear-gradient(155deg,rgba(255,253,247,0.78),rgba(232,223,209,0.44)_52%,rgba(93,116,101,0.12))] shadow-[inset_0_1px_2px_rgba(255,255,255,0.88),0_34px_80px_-62px_rgba(24,23,20,0.52)] md:top-[70px] md:h-[270px] md:w-[178px]" />
                <span className="absolute left-1/2 top-[92px] h-[220px] w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(24,23,20,0.24),transparent)] md:top-[108px]" />
                {measurements.map((item) => (
                  <span
                    key={item.label}
                    className="absolute left-[2%] h-px w-[96%] bg-[linear-gradient(90deg,transparent,rgba(93,116,101,0.58),rgba(154,116,71,0.42),transparent)]"
                    style={{ top: item.offset }}
                  />
                ))}
                {measurements.map((item, index) => (
                  <span
                    key={item.value}
                    className="absolute flex h-7 w-7 items-center justify-center rounded-full border border-[rgba(255,253,247,0.82)] bg-[var(--surface-paper)] text-[9px] font-bold text-[var(--signal-blue)] shadow-[0_16px_38px_-28px_rgba(24,23,20,0.65)]"
                    style={{
                      left: index % 2 === 0 ? "-2%" : "86%",
                      top: `calc(${item.offset} - 14px)`,
                    }}
                  >
                    {index + 1}
                  </span>
                ))}
              </div>

              <div className="space-y-3 pb-28 md:pb-20">
                {measurements.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 border-b border-[rgba(24,23,20,0.09)] pb-3 last:border-b-0"
                  >
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                      {item.label}
                    </span>
                    <span className="h-px bg-[linear-gradient(90deg,rgba(24,23,20,0.12),rgba(24,23,20,0.02))]" />
                    <span className="font-serif text-3xl leading-none text-[var(--ink)]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="raidexi-shell absolute bottom-[2%] right-[5%] w-[56%] rounded-[1.8rem] p-1.5 shadow-[0_34px_100px_-74px_rgba(24,23,20,0.68)] md:right-[4%] md:w-[46%]">
        <div className="raidexi-core rounded-[calc(1.8rem-0.375rem)] p-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            Gợi ý size
          </p>
          <div className="mt-4 space-y-3">
            {translations.map((item) => (
              <div key={item.brand} className="flex items-center justify-between gap-4">
                <span>
                  <span className="block text-sm font-bold text-[var(--ink)]">{item.brand}</span>
                  <span className="block text-[11px] font-semibold text-[var(--ink-muted)]">{item.note}</span>
                </span>
                <span
                  className={`flex h-11 min-w-11 items-center justify-center rounded-full px-3 font-serif text-2xl ${
                    item.tone === "sage"
                      ? "bg-[rgba(93,116,101,0.13)] text-[var(--signal-blue)]"
                      : item.tone === "clay"
                        ? "bg-[rgba(159,74,61,0.12)] text-[var(--tailor-red)]"
                        : "bg-[rgba(154,116,71,0.13)] text-[var(--brass)]"
                  }`}
                >
                  {item.size}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100dvh] px-4 pb-20 pt-24 md:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100dvh-6rem)] max-w-7xl gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
        <div data-rx-reveal>
          <Eyebrow index="01">Tầm nhìn sản phẩm</Eyebrow>
          <h1 className="font-serif text-[clamp(3.25rem,7vw,6.4rem)] font-light leading-[0.88] text-[var(--ink)]">
            Đo cơ thể.
            <span className="block">Chọn đúng size.</span>
            <span className="block italic text-[var(--signal-blue)]">Ở mọi thương hiệu.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-[var(--ink-soft)] md:text-lg">
            Raidexi biến một lần đo bằng camera thành hồ sơ fit cá nhân, rồi dịch hồ sơ đó sang size phù hợp cho từng thương hiệu.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryAction href="/Measurements">Bắt đầu đo</PrimaryAction>
            <PrimaryAction href="/Brand" variant="secondary">
              Xem thương hiệu
            </PrimaryAction>
          </div>
        </div>

        <div data-rx-reveal>
          <FitPassport />
        </div>
      </div>
      <p className="absolute bottom-6 right-8 hidden max-w-xs font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)] md:block">
        Đo cơ thể / chuẩn hóa / dịch size
      </p>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="rx-section pt-14">
      <div className="rx-container">
        <div data-rx-reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <Eyebrow index="02">Hành trình</Eyebrow>
            <h2 className="font-serif text-[clamp(3rem,7vw,6.4rem)] font-light leading-[0.86] text-[var(--ink)]">
              Một dòng chảy
              <span className="block italic text-[var(--brass)]">thay cho phỏng đoán.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
            Landing không cần giải thích bằng quá nhiều ô thông tin. Người dùng chỉ cần thấy rõ: đo một lần, có hồ sơ fit, sau đó Raidexi chuyển hồ sơ ấy thành size có lý do.
          </p>
        </div>

        <div className="mt-16 space-y-5">
          {journey.map((item, index) => (
            <div
              key={item.index}
              data-rx-reveal
              className="raidexi-shell rounded-[2.2rem] p-1.5"
              style={{ transform: index % 2 === 0 ? "rotate(-0.35deg)" : "rotate(0.35deg)" }}
            >
              <div className="raidexi-core grid gap-8 rounded-[calc(2.2rem-0.375rem)] p-6 md:grid-cols-[0.7fr_1.1fr_0.55fr] md:items-center md:p-8 lg:p-10">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                    {item.index}
                  </p>
                  <h3 className="mt-3 font-serif text-4xl font-light leading-none text-[var(--ink)] md:text-5xl">
                    {item.title}
                  </h3>
                </div>
                <p className="max-w-xl text-base leading-7 text-[var(--ink-soft)]">{item.copy}</p>
                <div className="justify-self-start md:justify-self-end">
                  <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.6)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                    <span className="font-serif text-4xl leading-none text-[var(--signal-blue)]">{item.value}</span>
                    <span className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TranslationSection() {
  return (
    <section className="rx-section">
      <div className="rx-container">
        <div data-rx-reveal className="raidexi-shell rounded-[2.6rem] p-2">
          <div className="raidexi-core overflow-hidden rounded-[calc(2.6rem-0.5rem)]">
            <div className="grid gap-10 p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
              <div>
                <Eyebrow index="03">Điểm khác biệt</Eyebrow>
                <h2 className="font-serif text-[clamp(3rem,6vw,5.8rem)] font-light leading-[0.88] text-[var(--ink)]">
                  Một cơ thể.
                  <span className="block italic text-[var(--signal-blue)]">Nhiều ngôn ngữ size.</span>
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--ink-soft)]">
                  S/M/L không giống nhau giữa các thương hiệu. Raidexi giữ phần con người ở trung tâm, sau đó chuyển đổi sang từng hệ size cụ thể.
                </p>
              </div>

              <div className="relative min-h-[420px]">
                <div className="absolute left-0 top-1/2 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(24,23,20,0.18),transparent)]" />
                <div className="absolute left-[10%] top-[12%] flex h-44 w-44 items-center justify-center rounded-full border border-[rgba(93,116,101,0.18)] bg-[rgba(255,253,247,0.72)]">
                  <div className="text-center">
                    <p className="font-serif text-5xl leading-none text-[var(--ink)]">Fit</p>
                    <p className="mt-2 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                      hồ sơ gốc
                    </p>
                  </div>
                </div>

                <div className="absolute right-[4%] top-[4%] w-[62%] space-y-4 md:right-[8%] md:w-[56%]">
                  {translations.map((item, index) => (
                    <div
                      key={item.brand}
                      className="rounded-[1.4rem] border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.72)] p-4 shadow-[0_24px_72px_-60px_rgba(24,23,20,0.5)]"
                      style={{ transform: `translateX(${index * 18}px)` }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span>
                          <span className="block text-base font-bold text-[var(--ink)]">{item.brand}</span>
                          <span className="block text-sm font-semibold text-[var(--ink-muted)]">{item.note}</span>
                        </span>
                        <span className="font-serif text-4xl leading-none text-[var(--brass)]">{item.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OutcomeSection() {
  return (
    <section className="rx-section pb-32">
      <div className="rx-container">
        <div data-rx-reveal className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <Eyebrow index="04">Kết quả</Eyebrow>
            <h2 className="font-serif text-[clamp(3.4rem,7vw,6.8rem)] font-light leading-[0.86] text-[var(--ink)]">
              Mua tự tin hơn.
              <span className="block italic text-[var(--tailor-red)]">Trả hàng ít hơn.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
              Raidexi không chỉ nói người mua chọn size nào. Sản phẩm tạo cảm giác được hiểu: cơ thể của họ được ghi nhận, thương hiệu được dịch đúng ngữ cảnh, và quyết định mua bớt mơ hồ.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <PrimaryAction href="/Measurements">Tạo hồ sơ fit</PrimaryAction>
              <PrimaryAction href="/Contact" variant="secondary">
                Trao đổi với đội ngũ
              </PrimaryAction>
            </div>
          </div>

          <div className="space-y-4">
            {outcomes.map((item) => (
              <div key={item[0]} className="raidexi-shell rounded-[1.8rem] p-1.5">
                <div className="raidexi-core rounded-[calc(1.8rem-0.375rem)] p-6">
                  <h3 className="font-serif text-4xl font-light leading-none text-[var(--ink)]">{item[0]}</h3>
                  <p className="mt-3 text-base leading-7 text-[var(--ink-soft)]">{item[1]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeExperience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      wheelMultiplier: 0.88,
      touchMultiplier: 0.9,
      easing: (time: number) => 1 - Math.pow(1 - time, 3),
    });

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const revealTriggers = gsap.utils.toArray<HTMLElement>("[data-rx-reveal]").map((element) =>
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 52, filter: "blur(8px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            end: "top 58%",
            scrub: 0.8,
          },
        },
      ),
    );

    ScrollTrigger.refresh();

    return () => {
      revealTriggers.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <main
      className="relative overflow-hidden bg-[var(--surface-canvas)] text-[var(--ink)]"
      style={{
        background:
          "radial-gradient(circle at 18% 8%, rgba(93,116,101,0.11), transparent 30%), radial-gradient(circle at 84% 18%, rgba(154,116,71,0.13), transparent 28%), linear-gradient(180deg, var(--surface-paper) 0%, var(--surface-canvas) 46%, var(--surface-linen) 100%)",
      }}
    >
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.11]" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(24,23,20,0.22)_100%)]" />
      </div>
      <div className="relative z-10">
        <Hero />
        <JourneySection />
        <TranslationSection />
        <OutcomeSection />
      </div>
    </main>
  );
}
