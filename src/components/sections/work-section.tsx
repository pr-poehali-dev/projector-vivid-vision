import { useState } from "react"
import { createPortal } from "react-dom"
import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"
import type { FilterState } from "@/components/filter-panel"

type University = {
  number: string
  title: string
  category: string
  city: string
  score: string
  minTotal: number
  direction: string
  founded: string
  website: string
  description: string
  programs: string[]
  subjects: { name: string; min: number }[]
  budget: string
  paid: string
  duration: string
}

const universities: University[] = [
  {
    number: "01",
    title: "МГУ им. М.В. Ломоносова",
    category: "Факультет вычислительной математики и кибернетики",
    city: "Москва",
    score: "от 280 баллов",
    minTotal: 280,
    direction: "left",
    founded: "1755",
    website: "https://www.msu.ru",
    description:
      "Один из старейших и ведущих университетов России. Факультет ВМК готовит специалистов в области математического обеспечения и администрирования информационных систем, криптографии и кибербезопасности.",
    programs: ["Информационная безопасность", "Фундаментальная информатика", "Математика и компьютерные науки"],
    subjects: [
      { name: "Математика (профиль)", min: 90 },
      { name: "Информатика", min: 88 },
      { name: "Русский язык", min: 70 },
    ],
    budget: "40 мест",
    paid: "от 450 000 ₽/год",
    duration: "4 года (бакалавриат)",
  },
  {
    number: "02",
    title: "МГТУ им. Н.Э. Баумана",
    category: "Факультет информационной безопасности (ИУ8)",
    city: "Москва",
    score: "от 260 баллов",
    minTotal: 260,
    direction: "right",
    founded: "1830",
    website: "https://www.bmstu.ru",
    description:
      "Ведущий технический университет России. Кафедра ИУ8 специализируется на подготовке инженеров в области защиты информации и криптографических методов защиты данных.",
    programs: ["Информационная безопасность", "Компьютерная безопасность", "Безопасность автоматизированных систем"],
    subjects: [
      { name: "Математика (профиль)", min: 85 },
      { name: "Физика", min: 75 },
      { name: "Русский язык", min: 60 },
    ],
    budget: "50 мест",
    paid: "от 380 000 ₽/год",
    duration: "4 года (бакалавриат)",
  },
  {
    number: "03",
    title: "НИУ Высшая школа экономики",
    category: "Факультет компьютерных наук",
    city: "Москва",
    score: "от 290 баллов",
    minTotal: 290,
    direction: "left",
    founded: "1992",
    website: "https://www.hse.ru",
    description:
      "Один из ведущих исследовательских университетов. Программы по прикладной математике и анализу данных включают глубокое изучение криптографии и математических основ безопасности.",
    programs: ["Прикладная математика и информатика", "Информационная безопасность", "Математика"],
    subjects: [
      { name: "Математика (профиль)", min: 95 },
      { name: "Информатика", min: 90 },
      { name: "Русский язык", min: 72 },
    ],
    budget: "35 мест",
    paid: "от 490 000 ₽/год",
    duration: "4 года (бакалавриат)",
  },
  {
    number: "04",
    title: "Санкт-Петербургский государственный университет",
    category: "Математико-механический факультет",
    city: "Санкт-Петербург",
    score: "от 270 баллов",
    minTotal: 270,
    direction: "right",
    founded: "1724",
    website: "https://www.spbu.ru",
    description:
      "Старейший университет России. Матмех является одним из лучших математических факультетов страны. Подготовка включает серьёзный курс теории чисел и алгебры — основ криптографии.",
    programs: ["Математика и компьютерные науки", "Информационная безопасность", "Прикладная математика"],
    subjects: [
      { name: "Математика (профиль)", min: 88 },
      { name: "Информатика", min: 82 },
      { name: "Русский язык", min: 65 },
    ],
    budget: "45 мест",
    paid: "от 360 000 ₽/год",
    duration: "4 года (бакалавриат)",
  },
  {
    number: "05",
    title: "НИЯУ МИФИ",
    category: "Институт интеллектуальных кибернетических систем",
    city: "Москва",
    score: "от 255 баллов",
    minTotal: 255,
    direction: "left",
    founded: "1942",
    website: "https://mephi.ru",
    description:
      "Национальный исследовательский ядерный университет. Один из немногих вузов России, где готовят специалистов по криптографическим методам защиты государственной тайны и ядерных объектов.",
    programs: ["Криптография", "Информационная безопасность", "Компьютерная безопасность"],
    subjects: [
      { name: "Математика (профиль)", min: 83 },
      { name: "Информатика", min: 78 },
      { name: "Русский язык", min: 60 },
    ],
    budget: "60 мест",
    paid: "от 310 000 ₽/год",
    duration: "4 года (бакалавриат)",
  },
  {
    number: "06",
    title: "Университет ИТМО",
    category: "Факультет безопасности информационных технологий",
    city: "Санкт-Петербург",
    score: "от 265 баллов",
    minTotal: 265,
    direction: "right",
    founded: "1900",
    website: "https://itmo.ru",
    description:
      "Университет мирового класса, лидер в IT-образовании. Программы по кибербезопасности занимают верхние строчки рейтингов. Активное взаимодействие с IT-индустрией и стартап-экосистемой.",
    programs: ["Безопасность информационных технологий", "Прикладная математика", "Информационная безопасность"],
    subjects: [
      { name: "Математика (профиль)", min: 85 },
      { name: "Информатика", min: 80 },
      { name: "Русский язык", min: 62 },
    ],
    budget: "55 мест",
    paid: "от 350 000 ₽/год",
    duration: "4 года (бакалавриат)",
  },
  {
    number: "07",
    title: "РГГУ — Институт информационных наук",
    category: "Факультет защиты информации",
    city: "Москва",
    score: "от 195 баллов",
    minTotal: 195,
    direction: "left",
    founded: "1991",
    website: "https://www.rsuh.ru",
    description:
      "Один из ведущих гуманитарных университетов с сильным направлением в информационной безопасности. Доступные проходные баллы делают его привлекательным для широкого круга абитуриентов.",
    programs: ["Информационная безопасность", "Документоведение и архивоведение", "Прикладная информатика"],
    subjects: [
      { name: "Математика (профиль)", min: 62 },
      { name: "Информатика", min: 55 },
      { name: "Русский язык", min: 55 },
    ],
    budget: "25 мест",
    paid: "от 245 000 ₽/год",
    duration: "4 года (бакалавриат)",
  },
  {
    number: "08",
    title: "Уральский федеральный университет",
    category: "Институт радиоэлектроники и информационных технологий",
    city: "Екатеринбург",
    score: "от 220 баллов",
    minTotal: 220,
    direction: "right",
    founded: "1920",
    website: "https://urfu.ru",
    description:
      "Крупнейший федеральный университет Урала и Сибири. Программы ИБ реализуются совместно с промышленными предприятиями региона, что даёт хорошую практическую базу.",
    programs: ["Информационная безопасность", "Математика и компьютерные науки", "Прикладная информатика"],
    subjects: [
      { name: "Математика (профиль)", min: 72 },
      { name: "Информатика", min: 65 },
      { name: "Русский язык", min: 58 },
    ],
    budget: "40 мест",
    paid: "от 200 000 ₽/год",
    duration: "4 года (бакалавриат)",
  },
  {
    number: "09",
    title: "Новосибирский государственный университет",
    category: "Факультет информационных технологий",
    city: "Новосибирск",
    score: "от 240 баллов",
    minTotal: 240,
    direction: "left",
    founded: "1958",
    website: "https://www.nsu.ru",
    description:
      "Университет, созданный при Сибирском отделении РАН. Мощная математическая школа и связь с академическими институтами делают его одним из лучших вузов по фундаментальной подготовке.",
    programs: ["Информационная безопасность", "Математика", "Фундаментальная информатика"],
    subjects: [
      { name: "Математика (профиль)", min: 80 },
      { name: "Информатика", min: 74 },
      { name: "Русский язык", min: 62 },
    ],
    budget: "30 мест",
    paid: "от 220 000 ₽/год",
    duration: "4 года (бакалавриат)",
  },
  {
    number: "10",
    title: "Казанский (Приволжский) федеральный университет",
    category: "Институт вычислительной математики и информационных технологий",
    city: "Казань",
    score: "от 210 баллов",
    minTotal: 210,
    direction: "right",
    founded: "1804",
    website: "https://kpfu.ru",
    description:
      "Один из старейших университетов России. Институт ВМиИТ предлагает широкий спектр программ в IT и ИБ с акцентом на прикладные задачи в сфере криптографии и защиты данных.",
    programs: ["Информационная безопасность", "Прикладная математика и информатика", "Компьютерные науки"],
    subjects: [
      { name: "Математика (профиль)", min: 68 },
      { name: "Информатика", min: 62 },
      { name: "Русский язык", min: 58 },
    ],
    budget: "35 мест",
    paid: "от 185 000 ₽/год",
    duration: "4 года (бакалавриат)",
  },
]

function UniversityModal({ university, onClose }: { university: University; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-foreground/10 bg-background p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="font-mono text-xs text-foreground/40">{university.number}</span>
              <span className="font-mono text-xs text-foreground/50">{university.city}</span>
              <span className="font-mono text-xs text-foreground/40">· основан {university.founded}</span>
            </div>
            <h3 className="font-sans text-xl font-light text-foreground md:text-2xl">{university.title}</h3>
            <p className="mt-0.5 font-mono text-xs text-foreground/50">{university.category}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground/50 transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <Icon name="X" size={14} />
          </button>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-foreground/70">{university.description}</p>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/40">Программы</p>
            <ul className="space-y-1.5">
              {university.programs.map((prog, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/75">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                  {prog}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/40">Минимальные баллы ЕГЭ</p>
            <ul className="space-y-1.5">
              {university.subjects.map((subj, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-foreground/65">{subj.name}</span>
                  <span className="font-mono font-medium text-primary/80">{subj.min}+</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-4 border-t border-foreground/10 pt-4">
          <div>
            <p className="font-mono text-xs text-foreground/40">Бюджет</p>
            <p className="text-sm text-foreground">{university.budget}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-foreground/40">Платно</p>
            <p className="text-sm text-foreground">{university.paid}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-foreground/40">Срок обучения</p>
            <p className="text-sm text-foreground">{university.duration}</p>
          </div>
          <div className="ml-auto">
            <a
              href={university.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-primary/70 transition-colors hover:text-primary"
            >
              Сайт вуза <Icon name="ExternalLink" size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function WorkSection({ filter }: { filter: FilterState }) {
  const { ref, isVisible } = useReveal(0.3)
  const [selected, setSelected] = useState<University | null>(null)

  const filtered = universities.filter((u) => {
    const cityMatch = filter.city === "Все города" || u.city === filter.city
    const scoreMatch = u.minTotal <= filter.maxScore
    return cityMatch && scoreMatch
  })

  return (
    <>
      <section
        ref={ref}
        className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div
            className={`mb-5 transition-all duration-700 md:mb-7 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
            }`}
          >
            <h2 className="mb-1 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Университеты
            </h2>
            <p className="font-mono text-sm text-foreground/60 md:text-base">
              / Нажмите на название, чтобы узнать подробности
              {filtered.length < universities.length && (
                <span className="ml-2 font-mono text-xs text-primary/60">
                  · показано {filtered.length} из {universities.length}
                </span>
              )}
            </p>
          </div>

          <div className="overflow-y-auto pr-1" style={{ maxHeight: "calc(100vh - 240px)", scrollbarWidth: "thin" }}>
            {filtered.length === 0 && (
              <p className="py-8 text-center font-mono text-sm text-foreground/40">
                Нет вузов по выбранным критериям
              </p>
            )}
            {filtered.map((uni, i) => (
              <div
                key={uni.number}
                className={`group flex cursor-pointer items-center justify-between border-b border-foreground/10 py-3 transition-all duration-500 hover:border-foreground/25 md:py-3.5 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : uni.direction === "left"
                      ? "-translate-x-16 opacity-0"
                      : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 55}ms` }}
                onClick={() => setSelected(uni)}
              >
                <div className="flex items-baseline gap-3 md:gap-6">
                  <span className="font-mono text-xs text-foreground/30 group-hover:text-foreground/50 md:text-sm">
                    {uni.number}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-xl lg:text-2xl">
                      {uni.title}
                      <Icon
                        name="ChevronRight"
                        size={13}
                        className="ml-1 inline opacity-0 transition-opacity group-hover:opacity-40"
                      />
                    </h3>
                    <p className="font-mono text-xs text-foreground/40">{uni.category}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-xs text-foreground/35">{uni.city}</div>
                  <div className="font-mono text-xs font-medium text-primary/70">{uni.score}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && createPortal(
        <UniversityModal university={selected} onClose={() => setSelected(null)} />,
        document.body
      )}
    </>
  )
}