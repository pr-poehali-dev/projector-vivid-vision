import { useState } from "react"
import { createPortal } from "react-dom"
import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"
import type { FilterState } from "@/components/filter-panel"

type College = {
  number: string
  title: string
  category: string
  city: string
  level: string
  entryScore: string
  direction: string
  description: string
  programs: string[]
  entry: string
  budget: string
  paid: string
  duration: string
  website: string
}

const colleges: College[] = [
  {
    number: "01",
    title: "Колледж МГТУ им. Н.Э. Баумана",
    category: "Информационные технологии и программирование",
    city: "Москва",
    level: "Колледж",
    entryScore: "Конкурс аттестатов",
    direction: "left",
    description:
      "Один из престижных технических колледжей Москвы при ведущем университете. Готовит специалистов среднего звена в области информационных технологий с упором на практику и взаимодействие с Бауманкой.",
    programs: ["Информационные системы и программирование", "Компьютерные системы и комплексы"],
    entry: "После 9 или 11 класса. Конкурс по среднему баллу аттестата. ЕГЭ не требуется.",
    budget: "Есть бюджетные места",
    paid: "от 85 000 ₽/год",
    duration: "3 года 10 месяцев",
    website: "https://college.bmstu.ru",
  },
  {
    number: "02",
    title: "Политехнический колледж №8 им. И.Ф. Павлова",
    category: "Защита информации и кибербезопасность",
    city: "Москва",
    level: "Колледж",
    entryScore: "Конкурс аттестатов",
    direction: "right",
    description:
      "Специализированный колледж с профилем защиты информации. Один из немногих колледжей Москвы, где ведётся подготовка именно по направлению информационной безопасности.",
    programs: ["Информационная безопасность автоматизированных систем", "Компьютерные сети"],
    entry: "После 9 или 11 класса. Вступительные испытания не проводятся. Конкурс по аттестату.",
    budget: "Есть бюджетные места",
    paid: "от 72 000 ₽/год",
    duration: "3 года 10 месяцев",
    website: "https://politeh8.ru",
  },
  {
    number: "03",
    title: "СПб технический колледж управления и коммерции",
    category: "Информационные системы и программирование",
    city: "Санкт-Петербург",
    level: "Колледж",
    entryScore: "Конкурс аттестатов",
    direction: "left",
    description:
      "Крупный петербургский колледж с развитой IT-инфраструктурой. Выпускники успешно продолжают обучение в ИТМО, СПбГУ и других ведущих вузах города.",
    programs: ["Информационные системы и программирование", "Сетевое и системное администрирование"],
    entry: "После 9 или 11 класса. Конкурс по среднему баллу аттестата.",
    budget: "Есть бюджетные места",
    paid: "от 68 000 ₽/год",
    duration: "3 года 10 месяцев",
    website: "https://sptcuk.ru",
  },
  {
    number: "04",
    title: "Колледж информатики и программирования ФПА",
    category: "Программирование и кибербезопасность",
    city: "Москва",
    level: "Колледж",
    entryScore: "Конкурс аттестатов",
    direction: "right",
    description:
      "Современный колледж при Финансово-правовой академии. Сочетает ИТ-подготовку с правовой базой в области информационной безопасности — особенно актуально для будущих специалистов по защите данных.",
    programs: ["Информационная безопасность автоматизированных систем", "Прикладная информатика"],
    entry: "После 9 или 11 класса. Конкурс по среднему баллу аттестата. ЕГЭ не требуется.",
    budget: "Ограниченные бюджетные места",
    paid: "от 90 000 ₽/год",
    duration: "3 года 10 месяцев",
    website: "https://fpa.ru",
  },
  {
    number: "05",
    title: "Уральский радиотехнический колледж им. А.С. Попова",
    category: "Информационная безопасность и телекоммуникации",
    city: "Екатеринбург",
    level: "Колледж",
    entryScore: "Конкурс аттестатов",
    direction: "left",
    description:
      "Старейший технический колледж Урала. Специализация в области защиты информации в телекоммуникационных системах. Тесно сотрудничает с предприятиями оборонно-промышленного комплекса региона.",
    programs: ["Информационная безопасность телекоммуникационных систем", "Компьютерные системы"],
    entry: "После 9 или 11 класса. Конкурс по среднему баллу аттестата.",
    budget: "Есть бюджетные места",
    paid: "от 55 000 ₽/год",
    duration: "3 года 10 месяцев",
    website: "https://uртк.рф",
  },
  {
    number: "06",
    title: "Новосибирский колледж телекоммуникаций и информатики",
    category: "Сетевые технологии и информационная безопасность",
    city: "Новосибирск",
    level: "Колледж",
    entryScore: "Конкурс аттестатов",
    direction: "right",
    description:
      "Ведущий ИТ-колледж Сибири. Готовит специалистов по сетевым технологиям, администрированию и защите информации. Выпускники востребованы на предприятиях Сибирского региона и продолжают обучение в НГУ.",
    programs: ["Информационные системы и программирование", "Сетевое администрирование", "Защита информации"],
    entry: "После 9 или 11 класса. Конкурс по среднему баллу аттестата.",
    budget: "Есть бюджетные места",
    paid: "от 50 000 ₽/год",
    duration: "3 года 10 месяцев",
    website: "https://nkti.ru",
  },
]

function CollegeModal({ college, onClose }: { college: College; onClose: () => void }) {
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
              <span className="font-mono text-xs text-foreground/40">{college.number}</span>
              <span className="font-mono text-xs text-foreground/50">{college.city}</span>
              <span className="rounded-sm border border-foreground/15 bg-foreground/5 px-1.5 py-0.5 font-mono text-xs text-foreground/40">
                {college.level}
              </span>
            </div>
            <h3 className="font-sans text-xl font-light text-foreground md:text-2xl">{college.title}</h3>
            <p className="mt-0.5 font-mono text-xs text-foreground/50">{college.category}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground/50 transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <Icon name="X" size={14} />
          </button>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-foreground/70">{college.description}</p>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/40">Программы</p>
            <ul className="space-y-1.5">
              {college.programs.map((prog, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/75">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                  {prog}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/40">Поступление</p>
            <p className="text-sm leading-relaxed text-foreground/70">{college.entry}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-end gap-4 border-t border-foreground/10 pt-4">
          <div>
            <p className="font-mono text-xs text-foreground/40">Бюджет</p>
            <p className="text-sm text-foreground">{college.budget}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-foreground/40">Платно</p>
            <p className="text-sm text-foreground">{college.paid}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-foreground/40">Срок обучения</p>
            <p className="text-sm text-foreground">{college.duration}</p>
          </div>
          <div className="ml-auto">
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-primary/70 transition-colors hover:text-primary"
            >
              Сайт колледжа <Icon name="ExternalLink" size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CollegesSection({ filter }: { filter: FilterState }) {
  const { ref, isVisible } = useReveal(0.3)
  const [selected, setSelected] = useState<College | null>(null)

  const filtered = colleges.filter((c) => {
    return filter.city === "Все города" || c.city === filter.city
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
              Колледжи
            </h2>
            <p className="font-mono text-sm text-foreground/60 md:text-base">
              / Нажмите на название, чтобы узнать подробности
              {filtered.length < colleges.length && (
                <span className="ml-2 font-mono text-xs text-primary/60">
                  · показано {filtered.length} из {colleges.length}
                </span>
              )}
            </p>
          </div>

          <div className="overflow-y-auto pr-1" style={{ maxHeight: "calc(100vh - 240px)", scrollbarWidth: "thin" }}>
            {filtered.length === 0 && (
              <p className="py-8 text-center font-mono text-sm text-foreground/40">
                Нет колледжей по выбранному городу
              </p>
            )}
            {filtered.map((college, i) => (
              <div
                key={college.number}
                className={`group flex cursor-pointer items-center justify-between border-b border-foreground/10 py-3 transition-all duration-500 hover:border-foreground/25 md:py-3.5 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : college.direction === "left"
                      ? "-translate-x-16 opacity-0"
                      : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 55}ms` }}
                onClick={() => setSelected(college)}
              >
                <div className="flex items-baseline gap-3 md:gap-6">
                  <span className="font-mono text-xs text-foreground/30 group-hover:text-foreground/50 md:text-sm">
                    {college.number}
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-xl lg:text-2xl">
                      {college.title}
                      <Icon
                        name="ChevronRight"
                        size={13}
                        className="ml-1 inline opacity-0 transition-opacity group-hover:opacity-40"
                      />
                    </h3>
                    <p className="font-mono text-xs text-foreground/40">{college.category}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="font-mono text-xs text-foreground/35">{college.city}</div>
                  <div className="font-mono text-xs font-medium text-primary/60">{college.entryScore}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && createPortal(
        <CollegeModal college={selected} onClose={() => setSelected(null)} />,
        document.body
      )}
    </>
  )
}