import { useMemo, useState } from 'react'
import data from '../../Data/data'

const Quiz = () => {
  const total = data.length

  const [index, setIndex] = useState(0)
  const question = data[index]

  const [lock, setLock] = useState(false)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(false)

  const options = useMemo(
    () => [
      { id: 1, label: question.option1 },
      { id: 2, label: question.option2 },
      { id: 3, label: question.option3 },
      { id: 4, label: question.option4 },
    ],
    [question],
  )

  const progressPct = Math.round(((index + 1) / total) * 100)

  const checkAns = (ans) => {
    if (lock) return
    setSelected(ans)
    setLock(true)
    if (ans === question.ans) setScore((prev) => prev + 1)
  }

  const nextQuestion = () => {
    if (!lock) return
    if (index === total - 1) {
      setResult(true)
      return
    }
    setIndex((prev) => prev + 1)
    setSelected(null)
    setLock(false)
  }

  const resetBtn = () => {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setLock(false)
    setResult(false)
  }

  const optionClassName = (id) => {
    const base =
      'group w-full rounded-xl border px-4 py-3 text-left transition-all duration-200 select-none'
    const idle =
      'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 active:scale-[0.99]'

    if (!lock) {
      if (selected === id) {
        return `${base} border-indigo-400/50 bg-indigo-500/15 ring-2 ring-indigo-400/20`
      }
      return `${base} ${idle}`
    }

    // locked: show correctness
    if (id === question.ans) {
      return `${base} border-emerald-400/50 bg-emerald-500/15 ring-2 ring-emerald-400/20`
    }
    if (selected === id && id !== question.ans) {
      return `${base} border-rose-400/50 bg-rose-500/15 ring-2 ring-rose-400/20`
    }
    return `${base} border-white/10 bg-white/5 opacity-70`
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md">
        <div className="absolute inset-x-0 top-0 h-1 bg-white/10">
          <div
            className="h-full bg-linear-to-r from-indigo-500 via-fuchsia-500 to-rose-500 transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-medium tracking-wider text-white/60">
                QUESTION {index + 1} / {total}
              </div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Quiz App
              </h1>
            </div>

            {!result ? (
              <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Score: <span className="text-white">{score}</span>
              </div>
            ) : null}
          </div>

          <div className="mt-6">
            {result ? (
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm text-white/70">Final score</div>
                  <div className="mt-1 text-3xl font-semibold text-white">
                    {score} / {total}
                  </div>
                  <div className="mt-2 text-sm text-white/60">
                    {Math.round((score / total) * 100)}% correct
                  </div>
                </div>

                <button
                  onClick={resetBtn}
                  className="w-full rounded-xl bg-linear-to-r from-indigo-600 via-fuchsia-600 to-rose-600 px-5 py-3 font-semibold text-white shadow-lg shadow-fuchsia-600/10 transition hover:brightness-110 active:scale-[0.99]"
                >
                  Restart Quiz
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold leading-snug text-white sm:text-xl">
                  <span className="text-white/60">{index + 1}.</span> {question.question}
                </h2>

                <div className="grid gap-3">
                  {options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => checkAns(opt.id)}
                      className={optionClassName(opt.id)}
                      disabled={lock}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-white/80 group-hover:border-white/20">
                          {String.fromCharCode(64 + opt.id)}
                        </div>
                        <div className="flex-1 text-sm font-medium text-white/90 sm:text-base">
                          {opt.label}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="text-xs text-white/60">
                    Progress: {index + 1} of {total} ({progressPct}%)
                  </div>

                  <button
                    onClick={nextQuestion}
                    disabled={!lock}
                    className="rounded-xl bg-white px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-white/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/30 disabled:text-white/60"
                  >
                    {index === total - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
