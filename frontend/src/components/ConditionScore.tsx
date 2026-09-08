interface ConditionScoreProps {
  score: number | null;
}


function getScoreStyles(
  score: number
) {

  if (score >= 85) {
    return {
      text: "text-emerald-600",
      stroke: "text-emerald-500",
      label: "Excellent",
    };
  }


  if (score >= 70) {
    return {
      text: "text-lime-600",
      stroke: "text-lime-500",
      label: "Good",
    };
  }


  if (score >= 50) {
    return {
      text: "text-amber-600",
      stroke: "text-amber-500",
      label: "Fair",
    };
  }


  return {
    text: "text-red-600",
    stroke: "text-red-500",
    label: "Poor",
  };

}


function ConditionScore({
  score,
}: ConditionScoreProps) {

  if (score === null) {

    return (
      <div className="flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-stone-200 bg-white">

        <div className="text-center">

          <p className="text-3xl font-bold text-stone-300">
            —
          </p>

          <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
            No data
          </p>

        </div>

      </div>
    );

  }


  const clampedScore =
    Math.min(
      100,
      Math.max(0, score)
    );


  const circumference =
    2 * Math.PI * 58;


  const offset =
    circumference -
    (clampedScore / 100) *
      circumference;


  const styles =
    getScoreStyles(
      clampedScore
    );


  return (
    <div className="relative h-40 w-40">

      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 128 128"
      >

        {/* Background ring */}

        <circle
          cx="64"
          cy="64"
          r="58"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          className="text-stone-200"
        />


        {/* Score ring */}

        <circle
          cx="64"
          cy="64"
          r="58"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${styles.stroke} transition-all duration-700`}
        />

      </svg>


      {/* Score */}

      <div className="absolute inset-0 flex items-center justify-center">

        <div className="text-center">

          <p
            className={`text-5xl font-bold tracking-tight ${styles.text}`}
          >
            {Math.round(clampedScore)}
          </p>


          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
            {styles.label}
          </p>

        </div>

      </div>

    </div>
  );
}


export default ConditionScore;