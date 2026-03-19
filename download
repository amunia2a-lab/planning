type Appointment = {
  id: string;
  time: string;
  plate: string;
  client: string;
  intervention: string;
  status: "En cours" | "À venir" | "Terminé";
};

const appointments: Appointment[] = [
  {
    id: "1",
    time: "08:30",
    plate: "AB-124-GD",
    client: "Colin",
    intervention: "Embrayage",
    status: "En cours",
  },
  {
    id: "2",
    time: "10:00",
    plate: "EF-456-HJ",
    client: "Martin",
    intervention: "Révision",
    status: "À venir",
  },
  {
    id: "3",
    time: "14:00",
    plate: "GH-782-KL",
    client: "Dupont",
    intervention: "Diagnostic",
    status: "À venir",
  },
  {
    id: "4",
    time: "16:00",
    plate: "JK-903-MN",
    client: "Lucas",
    intervention: "Freinage",
    status: "Terminé",
  },
];

export default function PlanningWidgetPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] p-6 md:p-10">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-[32px] border border-white/60 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="border-b border-slate-100 px-6 py-6 md:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Dashboard garage
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                  Planning
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Rendez-vous du jour
                </p>
              </div>

              <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                + Nouveau
              </button>
            </div>
          </div>

          <div className="px-6 py-6 md:px-8">
            <div className="mb-6 flex justify-center">
              <div className="w-full max-w-sm rounded-[26px] border border-blue-100 bg-gradient-to-br from-blue-50 to-white px-6 py-6 text-center shadow-[0_16px_40px_rgba(59,130,246,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
                  Aujourd&apos;hui
                </p>
                <div className="mt-3 text-5xl font-extrabold text-slate-900">
                  {appointments.length}
                </div>
                <p className="mt-2 text-base font-medium text-slate-600">
                  Interventions
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {appointments.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-[24px] border border-slate-100 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-sm font-bold text-slate-700">
                    {item.time}
                  </div>

                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl md:flex">
                      🚗
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="rounded-xl bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                          {item.plate}
                        </span>
                        <span className="text-base font-semibold text-slate-900">
                          {item.client}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-sm text-slate-500">
                        {item.intervention}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <StatusBadge status={item.status} />
                  </div>

                  <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl text-slate-600 transition hover:bg-slate-100">
                    ⋯
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[24px] border border-slate-100 bg-slate-50 px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Prochain rendez-vous
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {appointments[0].time} · {appointments[0].client} · {appointments[0].intervention}
                  </p>
                </div>

                <div className="md:hidden">
                  <StatusBadge status={appointments[0].status} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: Appointment["status"] }) {
  const styles: Record<Appointment["status"], string> = {
    "En cours": "bg-amber-50 text-amber-700 border-amber-200",
    "À venir": "bg-blue-50 text-blue-700 border-blue-200",
    "Terminé": "bg-emerald-50 text-emerald-700 border-emerald-200",
  };

  return (
    <span
      className={`inline-flex rounded-xl border px-3 py-2 text-sm font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
