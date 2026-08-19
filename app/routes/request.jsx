import { Link } from "@remix-run/react";
import { useState } from "react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
  { href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap", rel: "stylesheet" }
];

export default function RequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("custom"); // "custom" 又は "secret"
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 外部サービス（FormspreeやMake.comなど）への送信処理をここに記述
    setSubmitted(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "'Montserrat', sans-serif", paddingBottom: "100px" }}>
      
      {/* ヘッダー */}
      <header style={{ 
        maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem", 
        display: "flex", justifyContent: "space-between", alignItems: "center" 
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff" }}>
          <img src="/assets/IN.png" alt="Logo" style={{ height: "24px", width: "auto", objectFit: "contain", filter: "invert(1)" }} />
          <span style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "-0.04em", textTransform: "lowercase" }}>
            wacca
          </span>
        </Link>

        <nav style={{ display: "flex", gap: "1.5rem", fontWeight: "900", fontSize: "12px", textTransform: "uppercase" }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Home</Link>
          <Link to="/concept" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Concept</Link>
          <Link to="/articles" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Articles</Link>
          <Link to="/request" style={{ color: "#fff", textDecoration: "none", borderBottom: "2px solid #fff" }}>Request</Link>
          <Link to="/shop" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Shop</Link>
        </nav>
      </header>

      {/* メインフォーム */}
      <main style={{ maxWidth: "560px", margin: "4rem auto 0 auto", padding: "0 1.5rem" }}>
        
        {/* タブ切り替え */}
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem", borderBottom: "1px solid #222", paddingBottom: "1rem" }}>
          <button 
            onClick={() => setActiveTab("custom")}
            style={{ 
              background: "none", border: "none", color: "#fff", cursor: "pointer",
              fontSize: "14px", fontWeight: "900", opacity: activeTab === "custom" ? 1 : 0.3,
              transition: "opacity 0.2s ease", padding: 0
            }}
          >
            01. 3D CUSTOM / ORDER
          </button>
          <button 
            onClick={() => setActiveTab("secret")}
            style={{ 
              background: "none", border: "none", color: "#fff", cursor: "pointer",
              fontSize: "14px", fontWeight: "900", opacity: activeTab === "secret" ? 1 : 0.3,
              transition: "opacity 0.2s ease", padding: 0
            }}
          >
            02. SECRET NOTE
          </button>
        </div>

        {submitted ? (
          <div style={{ 
            padding: "4rem 2rem", backgroundColor: "#111", textAlign: "center", borderRadius: "8px",
            animation: "fadeIn 0.5s ease" 
          }}>
            <h3 style={{ fontSize: "20px", fontWeight: "900", marginBottom: "10px", letterSpacing: "0.05em" }}>TRANSMISSION COMPLETE</h3>
            <p style={{ fontSize: "12px", color: "#888", lineHeight: "1.6" }}>
              リクエストを受け付けました。波長が合えば、WACCAチームより連絡します。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {activeTab === "custom" ? (
              <>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: "#888" }}>
                    What do you want to shape? (アイデア・要望)
                  </label>
                  <textarea 
                    required 
                    rows="4" 
                    placeholder="作ってほしいもの、サイズ感、モチーフなど..." 
                    style={{ 
                      width: "100%", padding: "16px", backgroundColor: "#111", border: "1px solid #333", 
                      color: "#fff", borderRadius: "4px", fontSize: "14px", outline: "none", resize: "vertical"
                    }} 
                  />
                </div>

                {/* 💡 【3Dカスタム専用】PDF・画像・その他ファイルに対応したアップロード欄 */}
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: "#888" }}>
                    Reference File (画像 / PDF / 3Dデータなど)
                  </label>
                  <label style={{ 
                    display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", 
                    backgroundColor: "#111", border: "1px dashed #444", borderRadius: "4px", cursor: "pointer",
                    fontSize: "12px", color: fileName ? "#fff" : "#888", fontWeight: "700"
                  }}>
                    {fileName ? `Attached: ${fileName}` : "+ Choose File (PDF, Images, 3D, ZIP)"}
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg,.zip,.stl,.obj,.step,.iges,image/*,application/pdf" 
                      onChange={handleFileChange} 
                      style={{ display: "none" }} 
                    />
                  </label>
                </div>
              </>
            ) : (
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: "#888" }}>
                  Secret Message to WACCA (雑談・感想・秘密)
                </label>
                <textarea 
                  required 
                  rows="5" 
                  placeholder="制作陣へのメッセージや独り言..." 
                  style={{ 
                    width: "100%", padding: "16px", backgroundColor: "#111", border: "1px solid #333", 
                    color: "#fff", borderRadius: "4px", fontSize: "14px", outline: "none", resize: "vertical"
                  }} 
                />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: "#888" }}>
                Your Contact / Handle
              </label>
              <input 
                type="text" 
                required 
                placeholder="メールアドレス または SNS ID (X / Instagram)" 
                style={{ 
                  width: "100%", padding: "16px", backgroundColor: "#111", border: "1px solid #333", 
                  color: "#fff", borderRadius: "4px", fontSize: "14px", outline: "none" 
                }} 
              />
            </div>

            <button 
              type="submit" 
              style={{ 
                width: "100%", padding: "18px", backgroundColor: "#fff", color: "#000", border: "none", 
                fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer", 
                borderRadius: "4px", transition: "transform 0.1s ease, background-color 0.2s ease"
              }}
              onMouseDown={(e) => e.target.style.transform = "scale(0.98)"}
              onMouseUp={(e) => e.target.style.transform = "scale(1)"}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#ddd"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#fff"}
            >
              SEND TO THE WHEEL
            </button>
          </form>
        )}
      </main>
    </div>
  );
}