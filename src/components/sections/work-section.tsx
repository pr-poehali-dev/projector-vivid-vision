import { useReveal } from "@/hooks/use-reveal"

const universities = [
  {
    number: "01",
    title: "МГУ им. М.В. Ломоносова",
    category: "Факультет вычислительной математики и кибернетики",
    year: "Москва",
    direction: "left",
    score: "от 280 баллов",
  },
  {
    number: "02",
    title: "МГТУ им. Н.Э. Баумана",
    category: "Информационная безопасность",
    year: "Москва",
    direction: "right",
    score: "от 260 баллов",
  },
  {
    number: "03",
    title: "СПбГУ",
    category: "Математика и компьютерные науки",
    year: "Санкт-Петербург",
    direction: "left",
    score: "от 270 баллов",
  },
  {
    number: "04",
    title: "НИУ ВШЭ",
    category: "Прикладная математика и информатика",
    year: "Москва",
    direction: "right",
    score: "от 290 баллов",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Университеты
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Лучшие вузы России по криптографии и ИБ</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {universities.map((uni, i) => (
            <UniversityCard key={i} university={uni} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function UniversityCard({
  university,
  index,
  isVisible,
}: {
  university: { number: string; title: string; category: string; year: string; direction: string; score: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return university.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex items-center justify-between border-b border-foreground/10 py-4 transition-all duration-700 hover:border-foreground/30 md:py-5 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "90%" : "95%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
          {university.number}
        </span>
        <div>
          <h3 className="mb-0.5 font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-2xl lg:text-3xl">
            {university.title}
          </h3>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{university.category}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="font-mono text-xs text-foreground/30 md:text-sm">{university.year}</div>
        <div className="font-mono text-xs font-medium text-primary/70 md:text-sm">{university.score}</div>
      </div>
    </div>
  )
}
