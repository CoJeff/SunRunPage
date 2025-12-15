import { useMemo, useState } from "react"
import "./YearCalender.css"

const MONTH_LABELS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

type VacationDay = {
  date: string // "YYYY-MM-DD"
  name?: string
}

const YEAR = 2025
const MAX_DAYS = 30

function YearCalendar() {
  const [vacationDays, setVacationDays] = useState<Record<string, VacationDay>>({})

  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), [])

  const getDateKey = (monthIndex: number, day: number) => {
    const mm = String(monthIndex + 1).padStart(2, "0")
    const dd = String(day).padStart(2, "0")
    return `${YEAR}-${mm}-${dd}`
  }

  const isValidDate = (monthIndex: number, day: number) => {
    const d = new Date(YEAR, monthIndex, day)
    return (
      d.getFullYear() === YEAR &&
      d.getMonth() === monthIndex &&
      d.getDate() === day
    )
  }

  const getVacationCount = (days: Record<string, VacationDay>) =>
    Object.keys(days).length

  const handleDayClick = (monthIndex: number, day: number) => {
    if (!isValidDate(monthIndex, day)) return
    const key = getDateKey(monthIndex, day)
    const existing = vacationDays[key]

    if (!existing && getVacationCount(vacationDays) >= MAX_DAYS) {
      alert("Maximal 30 Urlaubstage erlaubt.")
      return
    }

    const name = window.prompt("Name / Beschreibung:", existing?.name ?? "")
    if (name === null) return

    setVacationDays(prev => ({
      ...prev,
      [key]: { date: key, name }
    }))
  }

  return (
    <div className="yc-root">
      {/* Kopfzeile: Tage-Label-Spalte + Monatsspalten */}
      <div className="yc-header-row">
        <div className="yc-header-corner" />
        {MONTH_LABELS.map(m => (
          <div key={m} className="yc-header-month">
            {m}
          </div>
        ))}
      </div>

      {/* Zeilen: Tag links + 12 Spalten */}
      {days.map(day => (
        <div key={day} className="yc-day-row">
          <div className="yc-day-label">
            {day}
          </div>

          {MONTH_LABELS.map((m, monthIndex) => {
            const valid = isValidDate(monthIndex, day)
            const key = getDateKey(monthIndex, day)
            const vacation = vacationDays[key]

            let classes = "yc-day-cell"
            if (!valid) {
              classes += " yc-day-cell--invalid"
            } else if (vacation) {
              classes += " yc-day-cell--vacation"
            } else {
              classes += " yc-day-cell--normal"
            }

            return (
              <button
                key={m}
                type="button"
                disabled={!valid}
                onClick={() => valid && handleDayClick(monthIndex, day)}
                className={classes}
              >
                {vacation?.name}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default YearCalendar
