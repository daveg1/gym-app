export function Exercise() {
  return (
    <section className="px-4">
      <h2 className="text-lg font-semibold">Bench press</h2>

      <div className="mt-4 flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
          <span>SET</span>
          <span>REPS</span>
          <span>KG</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            <span>1</span>
            <span>6 reps</span>
            <span>70kg</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <span>1</span>
            <span>6 reps</span>
            <span>70kg</span>
          </div>

          <button>Add set</button>
        </div>
      </div>
    </section>
  );
}
