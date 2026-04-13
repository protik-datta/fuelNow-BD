function PriceBadge({ label, price, accent }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition
        ${
          accent
            ? "border border-amber-400/40 bg-amber-500/10 text-amber-300"
            : "border border-emerald-400/40 bg-emerald-500/10 text-emerald-300"
        }`}
    >
      {label}

      <span className="text-xs font-medium opacity-70">{price}</span>
    </div>
  );
}

export default PriceBadge;
