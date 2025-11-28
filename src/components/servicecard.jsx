export default function ServiceCard({ title, description, tiers }) {
  return (
    <div className="group border rounded-xl p-6 bg-white/70 backdrop-blur-sm
                    hover:shadow-md transition-all duration-200">

      {/* TITLE — stronger, clearer hierarchy */}
      <h3 className="text-xl md:text-[22px] font-semibold tracking-tight mb-1">
        {title}
      </h3>

      {/* DESCRIPTION — calmer, more readable */}
      <p className="text-[15px] md:text-[16px] text-gray-700 leading-[1.55] mb-4">
        {description}
      </p>

      {/* TIERS — unchanged except for spacing */}
      <details className="mb-2 cursor-pointer">
        <summary className="font-medium text-[15px] md:text-[16px]">
          {tiers.one.name}
        </summary>
        <p className="text-sm md:text-[15px] text-gray-600 pl-4 pt-1 leading-snug">
          {tiers.one.text}
        </p>
      </details>

      <details className="mb-2 cursor-pointer">
        <summary className="font-medium text-[15px] md:text-[16px]">
          {tiers.two.name}
        </summary>
        <p className="text-sm md:text-[15px] text-gray-600 pl-4 pt-1 leading-snug">
          {tiers.two.text}
        </p>
      </details>

      <details>
        <summary className="font-medium text-[15px] md:text-[16px]">
          {tiers.three.name}
        </summary>
        <p className="text-sm md:text-[15px] text-gray-600 pl-4 pt-1 leading-snug">
          {tiers.three.text}
        </p>
      </details>
    </div>
  );
}
