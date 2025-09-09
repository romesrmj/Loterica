import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Badge Generator - React Component (Lotérica Vertical Model - Final Adjustments)
 *
 * Layout:
 * - Vertical card (54 mm width × 86 mm height).
 * - Top: Logo da Lotérica (editável: upload ou URL).
 * - Below: Foto 3x4 with border in #0166B3.
 * - Below: Nome + Sobrenome in one line (space separated) and CPF, all in #0166B3.
 * - Footer: Caixa colorida #0166B3 with Nome da Lotérica text in white.
 * - Above footer: Logo da Loteria Federal (editável: upload ou URL).
 * - Removed punch hole.
 */

export default function BadgeGenerator() {
  const previewRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [logoURL, setLogoURL] = useState(null);
  const [logoFederalURL, setLogoFederalURL] = useState(null);
  const [logoInputURL, setLogoInputURL] = useState("");
  const [logoFederalInputURL, setLogoFederalInputURL] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [lotericaName, setLotericaName] = useState("Nome da Lotérica");

  const DPI = 300;
  const CSS_DPI = 96;
  const scale = DPI / CSS_DPI;

  useEffect(() => {
    return () => {
      if (photoURL) URL.revokeObjectURL(photoURL);
      if (logoURL) URL.revokeObjectURL(logoURL);
      if (logoFederalURL) URL.revokeObjectURL(logoFederalURL);
    };
  }, [photoURL, logoURL, logoFederalURL]);

  function handlePhotoFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPhotoURL(URL.createObjectURL(f));
  }

  function handleLogoFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setLogoURL(URL.createObjectURL(f));
  }

  function handleLogoFederalFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setLogoFederalURL(URL.createObjectURL(f));
  }

  async function exportPDF() {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({ unit: "mm", format: [54, 86], orientation: "portrait" });
    pdf.addImage(imgData, "PNG", 0, 0, 54, 86);

    const safeFirst = (firstName || "badge").replace(/[^a-z0-9-_]/gi, "_");
    const safeLast = (lastName || "badge").replace(/[^a-z0-9-_]/gi, "_");
    pdf.save(`${safeFirst}_${safeLast}.pdf`);
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Gerador de Crachás Lotérica (Vertical)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm">Logo da Lotérica (upload)</span>
            <input type="file" accept="image/*" onChange={handleLogoFile} className="mt-2 block" />
          </label>
          <label className="block">
            <span className="text-sm">Logo da Lotérica (URL)</span>
            <input value={logoInputURL} onChange={(e) => setLogoInputURL(e.target.value)} className="mt-1 block w-full rounded border p-2" placeholder="https://..." />
          </label>

          <label className="block">
            <span className="text-sm">Foto (3x4)</span>
            <input type="file" accept="image/*" onChange={handlePhotoFile} className="mt-2 block" />
          </label>

          <label className="block">
            <span className="text-sm">Nome</span>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 block w-full rounded border p-2" placeholder="Primeiro nome" />
          </label>

          <label className="block">
            <span className="text-sm">Sobrenome</span>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 block w-full rounded border p-2" placeholder="Sobrenome" />
          </label>

          <label className="block">
            <span className="text-sm">CPF</span>
            <input value={cpf} onChange={(e) => setCpf(e.target.value)} className="mt-1 block w-full rounded border p-2" placeholder="000.000.000-00" />
          </label>

          <label className="block">
            <span className="text-sm">Logo da Loteria Federal (upload)</span>
            <input type="file" accept="image/*" onChange={handleLogoFederalFile} className="mt-2 block" />
          </label>
          <label className="block">
            <span className="text-sm">Logo da Loteria Federal (URL)</span>
            <input value={logoFederalInputURL} onChange={(e) => setLogoFederalInputURL(e.target.value)} className="mt-1 block w-full rounded border p-2" placeholder="https://..." />
          </label>

          <label className="block">
            <span className="text-sm">Nome da Lotérica</span>
            <input value={lotericaName} onChange={(e) => setLotericaName(e.target.value)} className="mt-1 block w-full rounded border p-2" placeholder="Nome da Lotérica" />
          </label>

          <div className="flex gap-2">
            <button onClick={exportPDF} className="px-4 py-2 bg-slate-800 text-white rounded">Gerar PDF</button>
            <button
              onClick={() => {
                setLogoURL(null);
                setLogoInputURL("");
                setLogoFederalURL(null);
                setLogoFederalInputURL("");
                setPhotoURL(null);
                setFirstName("");
                setLastName("");
                setCpf("");
                setLotericaName("Nome da Lotérica");
              }}
              className="px-4 py-2 border rounded"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div className="mb-2 text-sm text-gray-600">Preview (54mm × 86mm)</div>

          <div className="border p-3 inline-block bg-gray-100">
            <div
              ref={previewRef}
              style={{
                width: "54mm",
                height: "86mm",
                borderRadius: "3mm",
                backgroundColor: "#ffffff",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                fontFamily: "Futura, FuturaStd, sans-serif",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "6mm",
              }}
            >
              {/* Logo da Lotérica */}
              <div style={{ width: "80%", height: "12mm", marginBottom: "5mm", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {logoURL ? (
                  <img src={logoURL} alt="logo lotérica" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                ) : logoInputURL ? (
                  <img src={logoInputURL} alt="logo lotérica url" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                ) : (
                  <div style={{ fontSize: "9pt", color: "#666" }}>Logo Lotérica</div>
                )}
              </div>

              {/* Foto */}
              <div style={{ width: "22mm", height: "30mm", borderRadius: "2mm", overflow: "hidden", border: "2px solid #0166B3", marginBottom: "5mm" }}>
                {photoURL ? (
                  <img src={photoURL} alt="foto 3x4" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", fontSize: 12 }}>3 x 4</div>
                )}
              </div>

              {/* Nome + Sobrenome + CPF */}
              <div style={{ textAlign: "center", marginBottom: "5mm", color: "#0166B3" }}>
                <div style={{ fontWeight: 700, fontSize: "10pt", textTransform: "uppercase" }}>
                  {(firstName || "Nome") + " " + (lastName || "Sobrenome")}
                </div>
                <div style={{ fontSize: "8pt", marginTop: 4 }}>{cpf || "000.000.000-00"}</div>
              </div>

              {/* Logo da Loteria Federal */}
              <div style={{ width: "70%", height: "10mm", marginBottom: "4mm", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {logoFederalURL ? (
                  <img src={logoFederalURL} alt="logo loteria federal" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                ) : logoFederalInputURL ? (
                  <img src={logoFederalInputURL} alt="logo loteria federal url" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                ) : (
                  <div style={{ fontSize: "9pt", color: "#666" }}>Logo Loteria Federal</div>
                )}
              </div>

              {/* Rodapé */}
              <div style={{ marginTop: "auto", textAlign: "center", fontSize: "9pt", fontWeight: 500, backgroundColor: "#0166B3", color: "#fff", width: "100%", padding: "2mm 0" }}>
                {lotericaName || "Nome da Lotérica"}
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-2">Modelo oficial vertical — 54 × 86 mm, raio 3 mm.</div>
        </div>
      </div>
    </div>
  );
}
