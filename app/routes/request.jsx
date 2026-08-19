import { Link } from "@remix-run/react";
import { useState } from "react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
  { href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap", rel: "stylesheet" }
];

export default function RequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("custom"); // 3Dカスタムか、雑談/メッセージか切り替えギミック

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "'Montserrat', sans-serif", paddingBottom: "100px" }}>
      
      {/* ミニマムでソリッドなヘッダー */}
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
          <Link to="/shop" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Shop</Link>
          <Link to="/request" style={{ color: "#fff", textDecoration: "none", borderBottom: "2px solid #fff" }}>Request</Link>
        </nav>
      </header>

      {/* メイン：余白を活かしたミニマムな入力フォーム */}
      <main style={{ maxWidth: "560px", margin: "4rem auto 0 auto", padding: "0 1.5rem" }}>
        
        {/* モードを切り替えるちょっとしたインタラクション・タブ */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2.5rem", borderBottom: "1px solid #222", paddingBottom: "1rem" }}>
          <button 
            onClick={() => setActiveTab("custom")}
            style={{ 
              background: "none", border: "none", color: "#fff", cursor: "pointer",
              fontSize: "14px", fontWeight: "900", opacity: activeTab === "custom" ? 1 : 0.3,
              transition: "opacity 0.2s ease"
            }}
          >
            01. 3D CUSTOM / ORDER
          </button>
          <button 
            onClick={() => setActiveTab("secret")}
            style={{ 
              background: "none", border: "none", color: "#fff", cursor: "pointer",
              fontSize: "14px", fontWeight: "900", opacity: activeTab === "secret" ? 1 : 0.3,
              transition: "opacity 0.2s ease"
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
              電波は受信されました。波長が合えば、折り返し連絡します。
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            
            {activeTab === "custom" ? (
              <>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: "#888" }}>
                    What do you want to shape? (アイデア)
                  </label>
                  <textarea 
                    required 
                    rows="4" 
                    placeholder="作ってほしいもの、形、テクスチャのイメージ..." 
                    style={{ 
                      width: "100%", padding: "16px", backgroundColor: "#111", border: "1px solid #333", 
                      color: "#fff", borderRadius: "4px", fontSize: "14px", outline: "none",
                      transition: "border-color 0.2s ease"
                    }} 
                    onFocus={(e) => e.target.style.borderColor = "#fff"}
                    onBlur={(e) => e.target.style.borderColor = "#333"}
                  />
                </div>
              </>
            ) : (
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: "#888" }}>
                  Secret Message to WACCA (雑談・感想・秘密)
                </label>
                <textarea 
                  required 
                  rows="4" 
                  placeholder="制作陣へのメッセージや、くだらない日常の独り言でも..." 
                  style={{ 
                    width: "100%", padding: "16px", backgroundColor: "#111", border: "1px solid #333", 
                    color: "#fff", borderRadius: "4px", fontSize: "14px", outline: "none"
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
                placeholder="メールアドレス または SNS ID" 
                style={{ 
                  width: "100%", padding: "16px", backgroundColor: "#111", border: "1px solid #333", 
                  color: "#fff", borderRadius: "4px", fontSize: "14px", outline: "none" 
                }} 
              />
            </div>

            {/* 押したときにちょっと色が変わったり沈み込む楽しいギミックボタン */}
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