import { briefings } from "@/data";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-medium mb-3">Briefings da agência</h1>
        <p className="text-sm text-gray-500 mb-6">
          Cada cliente tem um link próprio para preenchimento.
        </p>
        <ul className="space-y-2 text-left">
          {briefings.map((b) => (
            <li
              key={b.slug}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <a
                href={`/${b.slug}`}
                className="font-medium hover:underline"
              >
                {b.clientName}
              </a>
              <p className="text-xs text-gray-500 mt-1">/{b.slug}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
