import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import Icon from "@/components/ui/icon"

export type FilterState = {
  city: string
  maxScore: number
}

const CITIES = ["Все города", "Москва", "Санкт-Петербург", "Екатеринбург", "Новосибирск", "Казань"]
const SCORES = [
  { label: "Любой балл", value: 999 },
  { label: "до 220 баллов", value: 220 },
  { label: "до 250 баллов", value: 250 },
  { label: "до 270 баллов", value: 270 },
  { label: "до 290 баллов", value: 290 },
]

export function FilterPanel({
  filter,
  onChange,
  onEgeClick,
}: {
  filter: FilterState
  onChange: (f: FilterState) => void
  onEgeClick: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ top: 0, right: 0 })

  const isActive = filter.city !== "Все города" || filter.maxScore !== 999

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 8, right: window.innerWidth - rect.right })
    }
  }, [open])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) &&
          btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const reset = () => onChange({ city: "Все города", maxScore: 999 })

  return (
    <div className="flex items-center gap-2">
      {/* Filter toggle button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-sm font-medium backdrop-blur-md transition-all ${
          isActive
            ? "border-primary/50 bg-primary/15 text-foreground"
            : "border-foreground/20 bg-foreground/10 text-foreground/80 hover:border-foreground/35 hover:text-foreground"
        }`}
      >
        <Icon name="SlidersHorizontal" size={13} />
        Фильтр
        {isActive && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/70 font-mono text-[10px] text-white">
            {(filter.city !== "Все города" ? 1 : 0) + (filter.maxScore !== 999 ? 1 : 0)}
          </span>
        )}
      </button>

      {/* EGE button */}
      <button
        onClick={onEgeClick}
        className="flex items-center gap-1.5 rounded-full border border-foreground/20 bg-foreground/10 px-3 py-1.5 font-sans text-sm font-medium text-foreground/80 backdrop-blur-md transition-all hover:border-foreground/35 hover:text-foreground"
      >
        Предметы ЕГЭ
      </button>

      {/* Dropdown via portal */}
      {open &&
        createPortal(
          <div
            ref={ref}
            className="fixed z-[200] w-64 rounded-xl border border-foreground/12 bg-background shadow-xl"
            style={{ top: pos.top, right: pos.right }}
          >
            <div className="p-4">
              {/* City filter */}
              <div className="mb-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/40">Город</p>
                <div className="flex flex-wrap gap-1.5">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => onChange({ ...filter, city })}
                      className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-all ${
                        filter.city === city
                          ? "border-primary/50 bg-primary/12 text-foreground"
                          : "border-foreground/12 bg-foreground/4 text-foreground/55 hover:border-foreground/25 hover:text-foreground/80"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Score filter */}
              <div className="mb-4">
                <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/40">Максимальный балл ЕГЭ</p>
                <div className="flex flex-col gap-1">
                  {SCORES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => onChange({ ...filter, maxScore: s.value })}
                      className={`flex items-center justify-between rounded-md border px-2.5 py-1.5 font-mono text-xs transition-all ${
                        filter.maxScore === s.value
                          ? "border-primary/50 bg-primary/10 text-foreground"
                          : "border-foreground/10 bg-foreground/3 text-foreground/55 hover:border-foreground/20 hover:text-foreground/75"
                      }`}
                    >
                      {s.label}
                      {filter.maxScore === s.value && <Icon name="Check" size={11} className="text-primary/70" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset */}
              {isActive && (
                <button
                  onClick={() => { reset(); setOpen(false) }}
                  className="w-full rounded-md border border-foreground/12 py-1.5 font-mono text-xs text-foreground/50 transition-all hover:border-foreground/25 hover:text-foreground/70"
                >
                  Сбросить фильтры
                </button>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
