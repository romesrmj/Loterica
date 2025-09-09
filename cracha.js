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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    var _e$target$files;
    const f = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
    if (!f) return;
    setPhotoURL(URL.createObjectURL(f));
  }
  function handleLogoFile(e) {
    var _e$target$files2;
    const f = (_e$target$files2 = e.target.files) === null || _e$target$files2 === void 0 ? void 0 : _e$target$files2[0];
    if (!f) return;
    setLogoURL(URL.createObjectURL(f));
  }
  function handleLogoFederalFile(e) {
    var _e$target$files3;
    const f = (_e$target$files3 = e.target.files) === null || _e$target$files3 === void 0 ? void 0 : _e$target$files3[0];
    if (!f) return;
    setLogoFederalURL(URL.createObjectURL(f));
  }
  async function exportPDF() {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff"
    });
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      unit: "mm",
      format: [54, 86],
      orientation: "portrait"
    });
    pdf.addImage(imgData, "PNG", 0, 0, 54, 86);
    const safeFirst = (firstName || "badge").replace(/[^a-z0-9-_]/gi, "_");
    const safeLast = (lastName || "badge").replace(/[^a-z0-9-_]/gi, "_");
    pdf.save(`${safeFirst}_${safeLast}.pdf`);
  }
  return /*#__PURE__*/_jsxs("div", {
    className: "p-4 max-w-4xl mx-auto",
    children: [/*#__PURE__*/_jsx("h2", {
      className: "text-xl font-semibold mb-4",
      children: "Gerador de Crach\xE1s Lot\xE9rica (Vertical)"
    }), /*#__PURE__*/_jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-2 gap-6",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "space-y-4",
        children: [/*#__PURE__*/_jsxs("label", {
          className: "block",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-sm",
            children: "Logo da Lot\xE9rica (upload)"
          }), /*#__PURE__*/_jsx("input", {
            type: "file",
            accept: "image/*",
            onChange: handleLogoFile,
            className: "mt-2 block"
          })]
        }), /*#__PURE__*/_jsxs("label", {
          className: "block",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-sm",
            children: "Logo da Lot\xE9rica (URL)"
          }), /*#__PURE__*/_jsx("input", {
            value: logoInputURL,
            onChange: e => setLogoInputURL(e.target.value),
            className: "mt-1 block w-full rounded border p-2",
            placeholder: "https://..."
          })]
        }), /*#__PURE__*/_jsxs("label", {
          className: "block",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-sm",
            children: "Foto (3x4)"
          }), /*#__PURE__*/_jsx("input", {
            type: "file",
            accept: "image/*",
            onChange: handlePhotoFile,
            className: "mt-2 block"
          })]
        }), /*#__PURE__*/_jsxs("label", {
          className: "block",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-sm",
            children: "Nome"
          }), /*#__PURE__*/_jsx("input", {
            value: firstName,
            onChange: e => setFirstName(e.target.value),
            className: "mt-1 block w-full rounded border p-2",
            placeholder: "Primeiro nome"
          })]
        }), /*#__PURE__*/_jsxs("label", {
          className: "block",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-sm",
            children: "Sobrenome"
          }), /*#__PURE__*/_jsx("input", {
            value: lastName,
            onChange: e => setLastName(e.target.value),
            className: "mt-1 block w-full rounded border p-2",
            placeholder: "Sobrenome"
          })]
        }), /*#__PURE__*/_jsxs("label", {
          className: "block",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-sm",
            children: "CPF"
          }), /*#__PURE__*/_jsx("input", {
            value: cpf,
            onChange: e => setCpf(e.target.value),
            className: "mt-1 block w-full rounded border p-2",
            placeholder: "000.000.000-00"
          })]
        }), /*#__PURE__*/_jsxs("label", {
          className: "block",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-sm",
            children: "Logo da Loteria Federal (upload)"
          }), /*#__PURE__*/_jsx("input", {
            type: "file",
            accept: "image/*",
            onChange: handleLogoFederalFile,
            className: "mt-2 block"
          })]
        }), /*#__PURE__*/_jsxs("label", {
          className: "block",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-sm",
            children: "Logo da Loteria Federal (URL)"
          }), /*#__PURE__*/_jsx("input", {
            value: logoFederalInputURL,
            onChange: e => setLogoFederalInputURL(e.target.value),
            className: "mt-1 block w-full rounded border p-2",
            placeholder: "https://..."
          })]
        }), /*#__PURE__*/_jsxs("label", {
          className: "block",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-sm",
            children: "Nome da Lot\xE9rica"
          }), /*#__PURE__*/_jsx("input", {
            value: lotericaName,
            onChange: e => setLotericaName(e.target.value),
            className: "mt-1 block w-full rounded border p-2",
            placeholder: "Nome da Lot\xE9rica"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex gap-2",
          children: [/*#__PURE__*/_jsx("button", {
            onClick: exportPDF,
            className: "px-4 py-2 bg-slate-800 text-white rounded",
            children: "Gerar PDF"
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => {
              setLogoURL(null);
              setLogoInputURL("");
              setLogoFederalURL(null);
              setLogoFederalInputURL("");
              setPhotoURL(null);
              setFirstName("");
              setLastName("");
              setCpf("");
              setLotericaName("Nome da Lotérica");
            },
            className: "px-4 py-2 border rounded",
            children: "Limpar"
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("div", {
          className: "mb-2 text-sm text-gray-600",
          children: "Preview (54mm \xD7 86mm)"
        }), /*#__PURE__*/_jsx("div", {
          className: "border p-3 inline-block bg-gray-100",
          children: /*#__PURE__*/_jsxs("div", {
            ref: previewRef,
            style: {
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
              paddingTop: "6mm"
            },
            children: [/*#__PURE__*/_jsx("div", {
              style: {
                width: "80%",
                height: "12mm",
                marginBottom: "5mm",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: logoURL ? /*#__PURE__*/_jsx("img", {
                src: logoURL,
                alt: "logo lot\xE9rica",
                style: {
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain"
                }
              }) : logoInputURL ? /*#__PURE__*/_jsx("img", {
                src: logoInputURL,
                alt: "logo lot\xE9rica url",
                style: {
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain"
                }
              }) : /*#__PURE__*/_jsx("div", {
                style: {
                  fontSize: "9pt",
                  color: "#666"
                },
                children: "Logo Lot\xE9rica"
              })
            }), /*#__PURE__*/_jsx("div", {
              style: {
                width: "22mm",
                height: "30mm",
                borderRadius: "2mm",
                overflow: "hidden",
                border: "2px solid #0166B3",
                marginBottom: "5mm"
              },
              children: photoURL ? /*#__PURE__*/_jsx("img", {
                src: photoURL,
                alt: "foto 3x4",
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }
              }) : /*#__PURE__*/_jsx("div", {
                style: {
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#666",
                  fontSize: 12
                },
                children: "3 x 4"
              })
            }), /*#__PURE__*/_jsxs("div", {
              style: {
                textAlign: "center",
                marginBottom: "5mm",
                color: "#0166B3"
              },
              children: [/*#__PURE__*/_jsx("div", {
                style: {
                  fontWeight: 700,
                  fontSize: "10pt",
                  textTransform: "uppercase"
                },
                children: (firstName || "Nome") + " " + (lastName || "Sobrenome")
              }), /*#__PURE__*/_jsx("div", {
                style: {
                  fontSize: "8pt",
                  marginTop: 4
                },
                children: cpf || "000.000.000-00"
              })]
            }), /*#__PURE__*/_jsx("div", {
              style: {
                width: "70%",
                height: "10mm",
                marginBottom: "4mm",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              },
              children: logoFederalURL ? /*#__PURE__*/_jsx("img", {
                src: logoFederalURL,
                alt: "logo loteria federal",
                style: {
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain"
                }
              }) : logoFederalInputURL ? /*#__PURE__*/_jsx("img", {
                src: logoFederalInputURL,
                alt: "logo loteria federal url",
                style: {
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain"
                }
              }) : /*#__PURE__*/_jsx("div", {
                style: {
                  fontSize: "9pt",
                  color: "#666"
                },
                children: "Logo Loteria Federal"
              })
            }), /*#__PURE__*/_jsx("div", {
              style: {
                marginTop: "auto",
                textAlign: "center",
                fontSize: "9pt",
                fontWeight: 500,
                backgroundColor: "#0166B3",
                color: "#fff",
                width: "100%",
                padding: "2mm 0"
              },
              children: lotericaName || "Nome da Lotérica"
            })]
          })
        }), /*#__PURE__*/_jsx("div", {
          className: "text-xs text-gray-500 mt-2",
          children: "Modelo oficial vertical \u2014 54 \xD7 86 mm, raio 3 mm."
        })]
      })]
    })]
  });
}
