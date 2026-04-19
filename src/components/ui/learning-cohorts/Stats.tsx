function Stats() {
  const stats = [
    { value: "250+", label: "Courses by our best mentors" },
    { value: "1000+", label: "Courses by our best mentors" },
    { value: "15+", label: "Courses by our best mentors" },
    { value: "2400+", label: "Courses by our best mentors" },
  ];

  return (
    <section className="w-full bg-[#050030] border-t border-white/10 flex justify-center">

      <div className="w-full max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 text-center">

        {stats.map((stat, i) => (
          <div key={i} className="relative">

            {i !== stats.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-white/20" />
            )}

            <h3 className="text-2xl font-semibold">{stat.value}</h3>
            <p className="text-xs text-gray-300 mt-1">{stat.label}</p>

          </div>
        ))}

      </div>
    </section>
  );
}

export default Stats;