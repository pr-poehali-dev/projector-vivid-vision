import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const subjects = [
  {
    name: "Математика (профиль)",
    description: "Обязательный предмет для всех IT и технических направлений. Минимальный порог — 39 баллов, для топ-вузов необходимо 85+.",
    required: true,
  },
  {
    name: "Информатика и ИКТ",
    description: "Ключевой предмет для специальностей «Информационная безопасность» и «Прикладная математика». Требуется 80+ для бюджета.",
    required: true,
  },
  {
    name: "Русский язык",
    description: "Обязательный предмет для всех направлений. Минимальный порог — 36 баллов.",
    required: true,
  },
  {
    name: "Физика",
    description: "Дополнительный предмет. Требуется в МГТУ им. Баумана и ряде технических вузов вместо информатики.",
    required: false,
  },
]

const requirements = [
  { label: "МГУ ВМК", math: "90+", cs: "90+", total: "280+" },
  { label: "МГТУ Бауман", math: "85+", cs: "80+", total: "260+" },
  { label: "НИУ ВШЭ", math: "95+", cs: "90+", total: "290+" },
  { label: "СПбГУ", math: "88+", cs: "85+", total: "270+" },
]

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          {/* Left side - Subjects */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-10 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Предметы
                <br />
                ЕГЭ
              </h2>
              <p className="font-mono text-xs text-foreground/60 md:text-sm">/ Что нужно сдавать для поступления</p>
            </div>

            <div className="space-y-5">
              {subjects.map((subject, i) => (
                <div
                  key={i}
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: `${150 + i * 120}ms` }}
                >
                  <div className="mb-1 flex items-center gap-2">
                    <Icon
                      name={subject.required ? "CheckCircle" : "Circle"}
                      size={14}
                      className={subject.required ? "text-primary/70" : "text-foreground/30"}
                    />
                    <span className="font-sans text-sm font-medium text-foreground md:text-base">{subject.name}</span>
                    {subject.required && (
                      <span className="font-mono text-xs text-primary/60">обязательно</span>
                    )}
                  </div>
                  <p className="pl-5 text-xs leading-relaxed text-foreground/60 md:text-sm">{subject.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Score table */}
          <div
            className={`flex flex-col justify-center transition-all duration-700 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="mb-4 md:mb-6">
              <p className="font-mono text-xs text-foreground/60 md:text-sm">/ Минимальные баллы по вузам</p>
            </div>

            <div className="space-y-0">
              <div className="flex items-center gap-4 border-b border-foreground/20 pb-2 md:gap-6">
                <span className="w-36 font-mono text-xs text-foreground/40 md:w-40">Вуз</span>
                <span className="w-16 font-mono text-xs text-foreground/40 text-center">Матем.</span>
                <span className="w-16 font-mono text-xs text-foreground/40 text-center">Информ.</span>
                <span className="w-16 font-mono text-xs text-foreground/40 text-center">Сумма</span>
              </div>
              {requirements.map((req, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 border-b border-foreground/10 py-3 transition-all duration-700 hover:bg-foreground/5 md:gap-6 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <span className="w-36 font-sans text-sm text-foreground md:w-40 md:text-base">{req.label}</span>
                  <span className="w-16 text-center font-mono text-sm text-foreground/70">{req.math}</span>
                  <span className="w-16 text-center font-mono text-sm text-foreground/70">{req.cs}</span>
                  <span className="w-16 text-center font-mono text-sm font-medium text-primary/80">{req.total}</span>
                </div>
              ))}
            </div>

            <div
              className={`mt-6 rounded-lg border border-foreground/10 bg-foreground/5 p-4 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "850ms" }}
            >
              <p className="font-mono text-xs leading-relaxed text-foreground/60">
                Баллы указаны как ориентир по данным прошлых лет. Точные пороговые баллы уточняйте на официальных сайтах приёмных комиссий.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
