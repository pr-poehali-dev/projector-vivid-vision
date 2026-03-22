import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

type Speciality = {
  code: string
  title: string
  description: string
  direction: string
  icon: string
  careers: string[]
  level: string
}

const specialities: Speciality[] = [
  {
    code: "10.05.01",
    title: "Компьютерная безопасность",
    description:
      "Специалитет. Глубокое изучение криптографических алгоритмов, методов защиты информации, анализа уязвимостей и построения защищённых систем.",
    direction: "top",
    icon: "Shield",
    careers: ["Криптограф", "Специалист по ИБ", "Аналитик угроз"],
    level: "Специалитет · 5 лет",
  },
  {
    code: "10.03.01",
    title: "Информационная безопасность",
    description:
      "Бакалавриат. Охватывает защиту данных, сетевую безопасность, криптографию и правовые аспекты ИБ. Самое популярное направление для поступления.",
    direction: "right",
    icon: "Lock",
    careers: ["Инженер ИБ", "Пентестер", "DevSecOps"],
    level: "Бакалавриат · 4 года",
  },
  {
    code: "01.03.02",
    title: "Прикладная математика и информатика",
    description:
      "Бакалавриат. Математические основы криптографии: теория чисел, алгебра, теория вероятностей. Широкая база для работы в науке и IT.",
    direction: "left",
    icon: "Calculator",
    careers: ["Математик-программист", "Исследователь", "Data Scientist"],
    level: "Бакалавриат · 4 года",
  },
  {
    code: "10.04.01",
    title: "Информационная безопасность (магистратура)",
    description:
      "Магистратура. Углублённая подготовка: разработка криптопротоколов, защита критической инфраструктуры, управление ИБ на уровне организации.",
    direction: "bottom",
    icon: "GraduationCap",
    careers: ["CISO", "Архитектор безопасности", "Научный сотрудник"],
    level: "Магистратура · 2 года",
  },
  {
    code: "09.02.07",
    title: "Информационные системы и программирование",
    description:
      "СПО (колледж). Практическая подготовка: разработка ПО, основы защиты информации и сетевые технологии. Поступление после 9 или 11 класса.",
    direction: "top",
    icon: "Code",
    careers: ["Программист", "Сетевой администратор", "Техподдержка"],
    level: "Колледж · 3–4 года",
  },
  {
    code: "10.02.05",
    title: "Обеспечение информационной безопасности",
    description:
      "СПО (колледж). Специальность для поступления после 9–11 класса. Даёт базу по защите информации, работе с криптосредствами и нормативной базе ИБ.",
    direction: "right",
    icon: "FileKey",
    careers: ["Оператор ИБ", "Администратор безопасности"],
    level: "Колледж · 2–3 года",
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
          className={`mb-6 transition-all duration-700 md:mb-8 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Специальности
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">
            / Направления подготовки по криптографии и ИБ
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-x-14 md:gap-y-6 lg:grid-cols-3 lg:gap-x-10">
          {specialities.map((spec, i) => (
            <SpecialityCard key={i} spec={spec} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SpecialityCard({
  spec,
  index,
  isVisible,
}: {
  spec: Speciality
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (spec.direction) {
        case "left":
          return "-translate-x-12 opacity-0"
        case "right":
          return "translate-x-12 opacity-0"
        case "top":
          return "-translate-y-12 opacity-0"
        case "bottom":
          return "translate-y-12 opacity-0"
        default:
          return "translate-y-8 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-foreground/15 bg-foreground/5 transition-colors group-hover:border-primary/30 group-hover:bg-primary/8">
          <Icon name={spec.icon as "Shield"} size={13} className="text-foreground/50 group-hover:text-primary/60" />
        </div>
        <span className="font-mono text-xs text-foreground/40">{spec.code}</span>
      </div>
      <h3 className="mb-1 font-sans text-base font-light text-foreground md:text-lg">{spec.title}</h3>
      <p className="mb-2 text-xs leading-relaxed text-foreground/60 md:text-sm">{spec.description}</p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-foreground/35">{spec.level}</span>
        <span className="text-foreground/20">·</span>
        {spec.careers.slice(0, 2).map((c, i) => (
          <span key={i} className="rounded-sm border border-foreground/10 bg-foreground/4 px-1.5 py-0.5 font-mono text-xs text-foreground/50">
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
