export type LeadAttachment = { filename: string; content: string };

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function submitLead(payload: {
  type: "presupuesto" | "empleo";
  subject?: string;
  fields: Record<string, string>;
  attachments?: LeadAttachment[];
}): Promise<{ ok: boolean; message?: string }> {
  try {
    const res = await fetch("/api/public/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json()) as { ok?: boolean; message?: string };
    return { ok: Boolean(data.ok), message: data.message };
  } catch {
    return { ok: false, message: "No se pudo conectar con el servidor." };
  }
}
