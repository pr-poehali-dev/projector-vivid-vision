import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"

function InfoModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-background p-6 shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-foreground/40 transition hover:text-foreground"
        >
          ✕
        </button>

        <h2 className="mb-6 font-sans text-2xl font-light tracking-tight text-foreground md:text-3xl">
          О проекте
        </h2>

        <div className="space-y-5 font-mono text-sm leading-relaxed text-foreground/80">
          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-foreground/40">Цель</p>
            <p>Знакомство с криптографией и изучение применения в ней основ математики.</p>
          </div>

          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-foreground/40">Гипотеза</p>
            <p>Криптография не потеряла своей актуальности и в наше время — заниматься шифрованием увлекательно и полезно, а знание шифров помогает скрыть информацию от посторонних.</p>
          </div>

          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-foreground/40">Задачи</p>
            <ol className="list-decimal space-y-1 pl-4">
              <li>Изучить историю криптографии с помощью специальной литературы.</li>
              <li>Познакомиться с различными видами шифрования и проанализировать их с применением математических навыков.</li>
              <li>Составить презентацию с различными видами шифрования.</li>
              <li>Создать сайт со списком учебных учреждений, в которых изучается криптография.</li>
            </ol>
          </div>

          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-foreground/40">Объект и предмет</p>
            <p><span className="text-foreground">Объект:</span> криптография и методы её практического применения.</p>
            <p><span className="text-foreground">Предмет:</span> математические и логические способы кодирования и шифрования.</p>
          </div>

          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-foreground/40">Новизна</p>
            <p>Высокая значимость при недостаточности внимания к криптографии как науке в начальном и среднем звене общего образования.</p>
          </div>

          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-foreground/40">Методы исследования</p>
            <p>Теоретический (поисковый, описательный) и практический (метод анализа и обобщения).</p>
          </div>

          <div>
            <p className="mb-1 text-xs uppercase tracking-widest text-foreground/40">Вывод</p>
            <p>Криптография немыслима без анализа и синтеза, сравнения и аналогии — а значит, математика больше всего подходит для этой науки. В нашей жизни шифры встречаются повсюду: в музыке, литературе, биологии, географии.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AuthorModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-background p-8 shadow-2xl md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-foreground/40 transition hover:text-foreground"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-foreground/20 text-2xl">
            К
          </div>

          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-foreground/40">Автор проекта</p>
          <h3 className="mb-4 font-sans text-2xl font-light text-foreground">
            Шувалов Кирилл
          </h3>

          <div className="w-12 border-t border-foreground/20 mb-4" />

          <p className="font-mono text-sm leading-relaxed text-foreground/70">
            Ученик МОУ «Разуменская СОШ №4 "Вектор Успеха"»
          </p>

          <div className="mt-6 rounded-lg border border-foreground/10 bg-foreground/5 px-4 py-3">
            <p className="mb-1 font-mono text-xs uppercase tracking-widest text-foreground/40">Руководитель</p>
            <p className="font-sans text-base font-light text-foreground">Щупко Ирина Анатольевна</p>
            <p className="font-mono text-xs text-foreground/60">учитель математики</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)
  const [showInfo, setShowInfo] = useState(false)
  const [showAuthor, setShowAuthor] = useState(false)

  return (
    <>
      <section
        ref={ref}
        className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
            <div>
              <div
                className={`mb-6 transition-all duration-700 md:mb-12 ${
                  isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
                }`}
              >
                <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                  О
                  <br />
                  проекте
                  <br />
                  <span className="text-foreground/40">криптографии</span>
                </h2>
              </div>

              <div
                className={`space-y-3 transition-all duration-700 md:space-y-4 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
                  Этот сайт создан как итоговый проект по математике, чтобы помочь абитуриентам найти лучшие учебные заведения для изучения криптографии и информационной безопасности.
                </p>
                <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
                  Криптография использует математические основы — теорию чисел, алгебру, теорию вероятностей — для создания надёжных систем защиты информации.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-6 md:space-y-10">
              {[
                { value: "50+", label: "Вузов", sublabel: "Готовят специалистов по ИБ в России", direction: "right" },
                { value: "3", label: "Предмета ЕГЭ", sublabel: "Математика, Информатика, Русский язык", direction: "left" },
                { value: "280+", label: "Баллов", sublabel: "Средний конкурсный балл в топ-вузах", direction: "right" },
              ].map((stat, i) => {
                const getRevealClass = () => {
                  if (!isVisible) {
                    return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                  }
                  return "translate-x-0 opacity-100"
                }

                return (
                  <div
                    key={i}
                    className={`flex items-baseline gap-4 border-l border-foreground/30 pl-4 transition-all duration-700 md:gap-8 md:pl-8 ${getRevealClass()}`}
                    style={{
                      transitionDelay: `${300 + i * 150}ms`,
                      marginLeft: i % 2 === 0 ? "0" : "auto",
                      maxWidth: i % 2 === 0 ? "100%" : "85%",
                    }}
                  >
                    <div className="text-3xl font-light text-foreground md:text-6xl lg:text-7xl">{stat.value}</div>
                    <div>
                      <div className="font-sans text-base font-light text-foreground md:text-xl">{stat.label}</div>
                      <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-12 md:gap-4 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "750ms" }}
          >
            <MagneticButton size="lg" variant="primary" onClick={() => setShowInfo(true)}>
              О проекте подробнее
            </MagneticButton>
            <MagneticButton size="lg" variant="secondary" onClick={() => setShowAuthor(true)}>
              Об авторе
            </MagneticButton>
          </div>
        </div>
      </section>

      {showInfo && <InfoModal onClose={() => setShowInfo(false)} />}
      {showAuthor && <AuthorModal onClose={() => setShowAuthor(false)} />}
    </>
  )
}
