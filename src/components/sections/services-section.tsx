import { useReveal } from "@/hooks/use-reveal"

const colleges = [
  {
    title: "Колледж МГТУ им. Баумана",
    description: "Специальность: Информационная безопасность. Требования: аттестат 9 или 11 класса, конкурс по среднему баллу.",
    direction: "top",
    city: "Москва",
    level: "Колледж",
  },
  {
    title: "Политехнический колледж №8",
    description: "Специальность: Защита информации в компьютерных системах. Поступление по итогам конкурса аттестатов.",
    direction: "right",
    city: "Москва",
    level: "Колледж",
  },
  {
    title: "СПб технический колледж",
    description: "Специальность: Информационные системы и программирование. Бюджетные и платные места.",
    direction: "left",
    city: "Санкт-Петербург",
    level: "Колледж",
  },
  {
    title: "Институт криптографии РГГУ",
    description: "Программы бакалавриата и магистратуры по ИБ и прикладной математике. Вступительные испытания.",
    direction: "bottom",
    city: "Москва",
    level: "Институт",
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Колледжи
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Среднее профессиональное образование</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-x-16 md:gap-y-10 lg:gap-x-24">
          {colleges.map((college, i) => (
            <CollegeCard key={i} college={college} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CollegeCard({
  college,
  index,
  isVisible,
}: {
  college: { title: string; description: string; direction: string; city: string; level: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (college.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/50">{college.level} · {college.city}</span>
      </div>
      <h3 className="mb-2 font-sans text-xl font-light text-foreground md:text-2xl">{college.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/70 md:text-base">{college.description}</p>
    </div>
  )
}
