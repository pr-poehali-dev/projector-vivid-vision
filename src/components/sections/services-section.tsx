import { useState } from "react"
import { createPortal } from "react-dom"
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
  fullDescription: string
  disciplines: string[]
  universities: string[]
  salary: string
  demand: string
}

const specialities: Speciality[] = [
  {
    code: "10.05.01",
    title: "Компьютерная безопасность",
    description: "Специалитет. Глубокое изучение криптографических алгоритмов, методов защиты информации, анализа уязвимостей и построения защищённых систем.",
    direction: "top",
    icon: "Shield",
    careers: ["Криптограф", "Специалист по ИБ", "Аналитик угроз"],
    level: "Специалитет · 5 лет",
    fullDescription:
      "Одна из самых глубоких технических специальностей в области безопасности. Программа охватывает математические основы криптографии, разработку алгоритмов шифрования, анализ уязвимостей программного обеспечения и аппаратных систем, а также методы противодействия кибератакам на государственном уровне.",
    disciplines: [
      "Теория чисел и алгебра",
      "Криптографические методы защиты информации",
      "Анализ защищённости систем",
      "Безопасность операционных систем",
      "Теория алгоритмов",
      "Правовые основы ИБ",
    ],
    universities: ["НИЯУ МИФИ", "МГТУ им. Баумана", "СПбГУ", "НГУ"],
    salary: "от 120 000 ₽/мес",
    demand: "Очень высокий",
  },
  {
    code: "10.03.01",
    title: "Информационная безопасность",
    description: "Бакалавриат. Охватывает защиту данных, сетевую безопасность, криптографию и правовые аспекты ИБ. Самое популярное направление для поступления.",
    direction: "right",
    icon: "Lock",
    careers: ["Инженер ИБ", "Пентестер", "DevSecOps"],
    level: "Бакалавриат · 4 года",
    fullDescription:
      "Самое массовое направление подготовки специалистов по защите информации. Программа сочетает технические дисциплины (сетевая безопасность, криптография, защита ПО) с правовыми и организационными аспектами. Выпускники востребованы в банках, госструктурах, IT-компаниях и силовых ведомствах.",
    disciplines: [
      "Основы криптографии",
      "Сетевая безопасность",
      "Пентест и этичный хакинг",
      "Защита операционных систем",
      "Нормативная база ИБ (ФСТЭК, ФСБ)",
      "Безопасная разработка ПО",
    ],
    universities: ["МГУ", "МГТУ им. Баумана", "ИТМО", "УрФУ", "КФУ", "РГГУ"],
    salary: "от 100 000 ₽/мес",
    demand: "Высокий",
  },
  {
    code: "01.03.02",
    title: "Прикладная математика и информатика",
    description: "Бакалавриат. Математические основы криптографии: теория чисел, алгебра, теория вероятностей. Широкая база для работы в науке и IT.",
    direction: "left",
    icon: "Calculator",
    careers: ["Математик-программист", "Исследователь", "Data Scientist"],
    level: "Бакалавриат · 4 года",
    fullDescription:
      "Фундаментальная программа на стыке математики и компьютерных наук. Даёт глубокую подготовку по дискретной математике, теории вероятностей и алгебраическим структурам — именно они лежат в основе современной криптографии. Выпускники способны разрабатывать новые криптографические протоколы.",
    disciplines: [
      "Дискретная математика",
      "Теория вероятностей и статистика",
      "Алгебра и теория чисел",
      "Теория алгоритмов и сложности",
      "Математические основы криптографии",
      "Методы оптимизации",
    ],
    universities: ["МГУ", "НИУ ВШЭ", "СПбГУ", "НГУ", "КФУ"],
    salary: "от 110 000 ₽/мес",
    demand: "Высокий",
  },
  {
    code: "10.04.01",
    title: "Информационная безопасность (магистратура)",
    description: "Магистратура. Углублённая подготовка: разработка криптопротоколов, защита критической инфраструктуры, управление ИБ на уровне организации.",
    direction: "bottom",
    icon: "GraduationCap",
    careers: ["CISO", "Архитектор безопасности", "Научный сотрудник"],
    level: "Магистратура · 2 года",
    fullDescription:
      "Программа магистратуры для специалистов, желающих углубить знания или сменить профиль. Фокус — на стратегическом управлении безопасностью, разработке и сертификации средств криптозащиты, защите критической информационной инфраструктуры (КИИ) в соответствии с российским законодательством.",
    disciplines: [
      "Управление информационной безопасностью",
      "Разработка криптографических протоколов",
      "Защита критической инфраструктуры",
      "Форензика и расследование инцидентов",
      "Безопасность облачных систем",
      "Сертификация СКЗИ",
    ],
    universities: ["МГУ", "МГТУ им. Баумана", "НИЯУ МИФИ", "ИТМО", "НИУ ВШЭ"],
    salary: "от 150 000 ₽/мес",
    demand: "Очень высокий",
  },
  {
    code: "09.02.07",
    title: "Информационные системы и программирование",
    description: "СПО (колледж). Практическая подготовка: разработка ПО, основы защиты информации и сетевые технологии. Поступление после 9 или 11 класса.",
    direction: "top",
    icon: "Code",
    careers: ["Программист", "Сетевой администратор", "Техподдержка"],
    level: "Колледж · 3–4 года",
    fullDescription:
      "Наиболее распространённая IT-специальность в системе среднего профессионального образования. Позволяет получить востребованную профессию программиста или системного администратора уже после 9 класса. Хорошая стартовая точка перед поступлением в вуз по IT-направлению.",
    disciplines: [
      "Основы программирования (Python, Java)",
      "Базы данных",
      "Сетевые технологии",
      "Основы информационной безопасности",
      "Веб-разработка",
      "Администрирование ОС",
    ],
    universities: ["Колледж МГТУ", "Политехнический №8", "СПб технический колледж"],
    salary: "от 60 000 ₽/мес",
    demand: "Высокий",
  },
  {
    code: "10.02.05",
    title: "Обеспечение информационной безопасности",
    description: "СПО (колледж). Специальность для поступления после 9–11 класса. Даёт базу по защите информации, работе с криптосредствами и нормативной базе ИБ.",
    direction: "right",
    icon: "FileKey",
    careers: ["Оператор ИБ", "Администратор безопасности"],
    level: "Колледж · 2–3 года",
    fullDescription:
      "Узкопрофильная специальность СПО, ориентированная именно на защиту информации. Выпускники умеют работать с сертифицированными средствами криптографической защиты (СКЗИ), настраивать межсетевые экраны и системы обнаружения вторжений, знают требования ГОСТ и нормативов ФСБ и ФСТЭК.",
    disciplines: [
      "Средства криптографической защиты информации (СКЗИ)",
      "Нормативная база ИБ (ГОСТ, ФСБ, ФСТЭК)",
      "Администрирование защищённых систем",
      "Основы криптографии",
      "Техническая защита информации",
      "Документация по ИБ",
    ],
    universities: ["Политехнический №8 (Москва)", "Уральский радиотехнический колледж"],
    salary: "от 65 000 ₽/мес",
    demand: "Средний",
  },
]

function SpecialityModal({ spec, onClose }: { spec: Speciality; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-foreground/10 bg-background p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md border border-foreground/15 bg-foreground/5">
                <Icon name={spec.icon as "Shield"} size={13} className="text-foreground/50" />
              </div>
              <span className="font-mono text-xs text-foreground/45">{spec.code}</span>
              <span className="rounded-sm border border-foreground/12 bg-foreground/5 px-1.5 py-0.5 font-mono text-xs text-foreground/40">
                {spec.level}
              </span>
            </div>
            <h3 className="font-sans text-xl font-light text-foreground md:text-2xl">{spec.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground/50 transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <Icon name="X" size={14} />
          </button>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-foreground/70">{spec.fullDescription}</p>

        <div className="grid gap-5 md:grid-cols-2">
          {/* Disciplines */}
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/40">Ключевые дисциплины</p>
            <ul className="space-y-1.5">
              {spec.disciplines.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/50" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/40">Где учиться</p>
              <ul className="space-y-1">
                {spec.universities.map((u, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-foreground/25" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/40">Кем работать</p>
              <div className="flex flex-wrap gap-1.5">
                {spec.careers.map((c, i) => (
                  <span
                    key={i}
                    className="rounded-sm border border-foreground/12 bg-foreground/4 px-2 py-0.5 font-mono text-xs text-foreground/55"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap gap-6 border-t border-foreground/10 pt-4">
          <div>
            <p className="font-mono text-xs text-foreground/40">Средняя зарплата</p>
            <p className="text-sm font-medium text-foreground">{spec.salary}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-foreground/40">Спрос на рынке</p>
            <p className="text-sm text-foreground">{spec.demand}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [selected, setSelected] = useState<Speciality | null>(null)

  return (
    <>
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
              / Нажмите на карточку, чтобы узнать подробности
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-x-12 md:gap-y-5 lg:grid-cols-3 lg:gap-x-8">
            {specialities.map((spec, i) => (
              <SpecialityCard
                key={i}
                spec={spec}
                index={i}
                isVisible={isVisible}
                onClick={() => setSelected(spec)}
              />
            ))}
          </div>
        </div>
      </section>

      {selected &&
        createPortal(
          <SpecialityModal spec={selected} onClose={() => setSelected(null)} />,
          document.body
        )}
    </>
  )
}

function SpecialityCard({
  spec,
  index,
  isVisible,
  onClick,
}: {
  spec: Speciality
  index: number
  isVisible: boolean
  onClick: () => void
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (spec.direction) {
        case "left": return "-translate-x-12 opacity-0"
        case "right": return "translate-x-12 opacity-0"
        case "top": return "-translate-y-12 opacity-0"
        case "bottom": return "translate-y-12 opacity-0"
        default: return "translate-y-8 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group cursor-pointer rounded-xl border border-foreground/8 bg-foreground/3 p-4 transition-all duration-500 hover:border-foreground/20 hover:bg-foreground/6 hover:shadow-sm ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-foreground/15 bg-foreground/5 transition-colors group-hover:border-primary/30 group-hover:bg-primary/8">
            <Icon name={spec.icon as "Shield"} size={13} className="text-foreground/50 group-hover:text-primary/60" />
          </div>
          <span className="font-mono text-xs text-foreground/40">{spec.code}</span>
        </div>
        <Icon name="ChevronRight" size={13} className="text-foreground/20 transition-all group-hover:translate-x-0.5 group-hover:text-foreground/40" />
      </div>
      <h3 className="mb-1 font-sans text-base font-light text-foreground md:text-lg">{spec.title}</h3>
      <p className="mb-3 text-xs leading-relaxed text-foreground/55 md:text-sm">{spec.description}</p>
      <div className="flex flex-wrap items-center gap-1.5">
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
