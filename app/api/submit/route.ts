import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getBriefing } from "@/data";

export const runtime = "nodejs";

type SubmitBody = {
  slug: string;
  clientName: string;
  respondent: { name: string; email: string; phone: string };
  answers: Record<string, string>;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubmitBody;
    const { slug, respondent, answers } = body;

    const briefing = getBriefing(slug);
    if (!briefing) {
      return NextResponse.json({ error: "Briefing not found" }, { status: 404 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM || "onboarding@resend.dev";
    const to = process.env.AGENCY_EMAIL;

    if (!apiKey || !to) {
      return NextResponse.json(
        {
          error:
            "Servidor sem variáveis de ambiente. Configura RESEND_API_KEY e AGENCY_EMAIL.",
        },
        { status: 500 }
      );
    }

    // Build HTML
    const html = buildEmailHTML(briefing, respondent, answers);
    const text = buildEmailText(briefing, respondent, answers);

    const resend = new Resend(apiKey);
    const subject = `📋 Briefing recebido: ${briefing.clientName}`;

    const result = await resend.emails.send({
      from: `Briefings <${from}>`,
      to: [to],
      replyTo: respondent.email || undefined,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { error: result.error.message || "Erro ao enviar e-mail" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: result.data?.id });
  } catch (e: any) {
    console.error("Submit error:", e);
    return NextResponse.json(
      { error: e?.message || "Erro inesperado" },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHTML(
  briefing: ReturnType<typeof getBriefing>,
  respondent: SubmitBody["respondent"],
  answers: Record<string, string>
) {
  if (!briefing) return "";
  const total = briefing.sections.reduce((a, s) => a + s.questions.length, 0);
  const filled = Object.values(answers).filter((v) => v?.trim()).length;
  const date = new Date().toLocaleString("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const sectionsHTML = briefing.sections
    .map(
      (sec, secIdx) => `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px">
          <tr>
            <td style="border-left:4px solid #1a1a1a;padding-left:14px">
              <p style="margin:0;font-size:11px;color:#888;letter-spacing:1px;font-weight:600">SEÇÃO ${
                secIdx + 1
              }</p>
              <h2 style="margin:4px 0 0;font-size:18px;color:#1a1a1a;font-weight:600">${escapeHtml(
                sec.title
              )}</h2>
            </td>
          </tr>
        </table>
        ${sec.questions
          .map((q, qi) => {
            const a = answers[`${sec.id}:${qi}`]?.trim() || "—";
            const isEmpty = a === "—";
            return `
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:14px">
                <tr>
                  <td style="padding:14px 16px;background:#fafafa;border-radius:8px">
                    <p style="margin:0;font-size:13px;color:#666;font-weight:500">
                      ${qi + 1}. ${escapeHtml(q)}
                    </p>
                    <p style="margin:8px 0 0;font-size:14px;color:${
                      isEmpty ? "#bbb" : "#1a1a1a"
                    };line-height:1.6;white-space:pre-wrap">${escapeHtml(a)}</p>
                  </td>
                </tr>
              </table>
            `;
          })
          .join("")}
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;color:#1a1a1a">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f0;padding:24px 0">
    <tr><td align="center">
      <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background:#fff;border-radius:16px;overflow:hidden">
        <tr><td style="background:#1a1a1a;padding:32px 28px">
          <p style="margin:0;font-size:11px;color:#aaa;letter-spacing:2px;font-weight:600">📋 BRIEFING RECEBIDO</p>
          <h1 style="margin:8px 0 4px;font-size:24px;color:#fff;font-weight:600">${escapeHtml(
            briefing.clientName
          )}</h1>
          <p style="margin:0;font-size:14px;color:#aaa">${escapeHtml(briefing.clientCity)}</p>
        </td></tr>

        <tr><td style="padding:24px 28px">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafafa;border-radius:12px;padding:16px">
            <tr>
              <td>
                <p style="margin:0 0 8px;font-size:11px;color:#888;letter-spacing:1px;font-weight:600">RESPONDIDO POR</p>
                <p style="margin:0;font-size:16px;color:#1a1a1a;font-weight:600">${escapeHtml(
                  respondent.name || "—"
                )}</p>
                ${
                  respondent.email
                    ? `<p style="margin:4px 0 0;font-size:13px;color:#555">📧 <a href="mailto:${escapeHtml(
                        respondent.email
                      )}" style="color:#555;text-decoration:none">${escapeHtml(
                        respondent.email
                      )}</a></p>`
                    : ""
                }
                ${
                  respondent.phone
                    ? `<p style="margin:4px 0 0;font-size:13px;color:#555">📱 ${escapeHtml(
                        respondent.phone
                      )}</p>`
                    : ""
                }
                <p style="margin:12px 0 0;font-size:12px;color:#888">${escapeHtml(
                  date
                )} · ${filled} de ${total} respostas preenchidas</p>
              </td>
            </tr>
          </table>

          ${sectionsHTML}

          <p style="margin:40px 0 0;font-size:12px;color:#aaa;text-align:center;border-top:1px solid #eee;padding-top:20px">
            Briefing enviado pela landing da agência. Responder esse e-mail vai direto pro cliente.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>
  `.trim();
}

function buildEmailText(
  briefing: ReturnType<typeof getBriefing>,
  respondent: SubmitBody["respondent"],
  answers: Record<string, string>
) {
  if (!briefing) return "";
  let out = `BRIEFING RECEBIDO — ${briefing.clientName}\n`;
  out += `${briefing.clientCity}\n\n`;
  out += `Respondido por: ${respondent.name}\n`;
  if (respondent.email) out += `E-mail: ${respondent.email}\n`;
  if (respondent.phone) out += `WhatsApp: ${respondent.phone}\n`;
  out += `Data: ${new Date().toLocaleString("pt-BR")}\n\n`;
  out += "═".repeat(60) + "\n\n";

  briefing.sections.forEach((sec, idx) => {
    out += `\n${idx + 1}. ${sec.title.toUpperCase()}\n`;
    out += "─".repeat(60) + "\n";
    sec.questions.forEach((q, qi) => {
      const a = answers[`${sec.id}:${qi}`]?.trim() || "—";
      out += `\n${qi + 1}. ${q}\n${a}\n`;
    });
  });
  return out;
}
