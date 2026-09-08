interface StatCardProps {
  label: string;
  value: string | number;
  description: string;
}


function StatCard({
  label,
  value,
  description,
}: StatCardProps) {

  return (
    <div className="
      rounded-xl
      border
      border-stone-200
      bg-white
      p-5
      shadow-sm
      transition
      hover:-translate-y-0.5
      hover:shadow-md
    ">

      <p className="
        text-xs
        font-semibold
        uppercase
        tracking-wider
        text-stone-400
      ">
        {label}
      </p>


      <p className="
        mt-3
        text-3xl
        font-bold
        tracking-tight
        text-stone-900
      ">
        {value}
      </p>


      <p className="
        mt-2
        text-xs
        leading-5
        text-stone-500
      ">
        {description}
      </p>

    </div>
  );
}


export default StatCard;