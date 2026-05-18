import type { Briefing } from "@/lib/types";
import { koala } from "@/data/koala";

// 👇 ADICIONA NOVOS CLIENTES AQUI
// 1. Cria um arquivo novo em data/nome-do-cliente.ts (copia o koala.ts como base)
// 2. Importa aqui
// 3. Adiciona no array abaixo
// O link fica: seudominio.com/slug-do-cliente
export const briefings: Briefing[] = [koala];

export function getBriefing(slug: string): Briefing | undefined {
  return briefings.find((b) => b.slug === slug);
}

export function getAllSlugs(): string[] {
  return briefings.map((b) => b.slug);
}
