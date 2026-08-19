import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
  { href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap", rel: "stylesheet" }
];

const SECRET_RESPONSES = [
  "「その視点は面白かった。保存した。」",
  "「情報は受信された。続きは次のログで。」",
  "「クレイジーだな。気に入った。」",
  "「その独り言、いいな。ニヤついた。」",
  "「結構アリだぞ、検討させてもらう。」",
  "「もっとくれ、そういうの欲しかったんだよ。」",
  "「イかれてんな、最高だぜ。」",
  "「その発想、面白いな。」",
  "「そのアイデア、最高だ。」",
  "「もっと早く聞きたかったぜ、それ。」",
  "「そのゴミ、ウチで回収しとくわ。」",
  "「脳内からダイレクトに受信。面白そうだな。」",
  "「ガラクタの山に放り込んどいた。気が向いたら形にする。」",
  "「シュレッダーにかけるか、新作のヒントにするか迷うところだな。」"
];

export default function RequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("custom");
  const [fileName, setFileName] = useState("");
  const [randomReply, setRandomReply] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reply = SECRET_RESPONSES[Math.floor(Math.random() * SECRET_RESPONSES.length)];
    setRandomReply(reply);
    setSubmitted(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "'Montserrat', sans-serif", paddingBottom: isMobile ? "120px" : "100px" }}>
      
      {/* ヘッダー（スマホ時はレイアウトを縦並びやコンパクトに調整） */}
      <header style={{ 
        maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1rem", 
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" 
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff" }}>
          <img src="/assets/IN.png" alt="Logo" style={{ height: "24px", width: "auto", objectFit: "contain", filter: "invert(1)" }} />
          <span style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "-0.04em", textTransform: "lowercase" }}>wacca</span>
        </Link>
        <nav style={{ display: "flex", gap: "1.2rem", fontWeight: "900", fontSize: "11px", textTransform: "uppercase" }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Home</Link>
          <Link to="/concept" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Concept</Link>
          <Link to="/articles" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Articles</Link>
          <Link to="/request" style={{ color: "#fff", textDecoration: "none", borderBottom: "2px solid #fff" }}>Request</Link>
          <Link to="/shop" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Shop</Link>
        </nav>
      </header>

      {/* メインフォーム（スマホの画面幅に合わせてパディングを最適化） */}
      <main style={{ maxWidth: "560px", margin: "2rem auto 0 auto", padding: "0 1.2rem" }}>
        
        {/* タブ切替 */}
        <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", borderBottom: "1px solid #222", paddingBottom: "1rem", overflowX: "auto" }}>
          <button 
            onClick={() => setActiveTab("custom")}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: "900", opacity: activeTab === "custom" ? 1 : 0.3, padding: 0, whiteSpace: "nowrap" }}
          >
            01. 3D CUSTOM / ORDER
          </button>
          <button 
            onClick={() => setActiveTab("idea")}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: "900", opacity: activeTab === "idea" ? 1 : 0.3, padding: 0, whiteSpace: "nowrap" }}
          >
            02. IDEA BOX
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: "3rem 1.5rem", backgroundColor: "#111", textAlign: "center", borderRadius: "8px", border: "1px solid #333" }}>
            <div style={{ fontSize: "10px", fontWeight: "900", letterSpacing: "0.2em", color: "#888", marginBottom: "1.5rem", textTransform: "uppercase" }}>
              // THROWN INTO THE BIN
            </div>
            <p style={{ fontSize: "15px", fontWeight: "900", color: "#fff", lineHeight: "1.6", marginBottom: "2rem" }}>
              {randomReply}
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              style={{ background: "none", border: "1px solid #555", color: "#aaa", padding: "10px 20px", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", cursor: "pointer", borderRadius: "4px" }}
            >
              Throw another idea →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>
            
            {activeTab === "custom" ? (
              <>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: "#888" }}>
                    What do you want to shape? (アイデア・3Dオーダー)
                  </label>
                  <textarea 
                    required 
                    rows="4" 
                    placeholder="作ってほしいもの、サイズ感、狂ったアイデアなど..." 
                    style={{ width: "100%", padding: "14px", backgroundColor: "#111", border: "1px solid #333", color: "#fff", borderRadius: "4px", fontSize: "14px", outline: "none", resize: "vertical", boxSizing: "border-box" }} 
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: "#888" }}>
                    Reference File (画像 / PDF / 3Dデータなど)
                  </label>
                  <label style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "18px", backgroundColor: "#111", border: "1px dashed #444", borderRadius: "4px", cursor: "pointer", fontSize: "12px", color: fileName ? "#fff" : "#888", fontWeight: "700", textAlign: "center", wordBreak: "break-all" }}>
                    {fileName ? `Attached: ${fileName}` : "+ Choose File (PDF, Images, 3D, ZIP)"}
                    <input type="file" accept=".pdf,.png,.jpg,.jpeg,.zip,.stl,.obj,.step,.iges,image/*,application/pdf" onChange={handleFileChange} style={{ display: "none" }} />
                  </label>
                </div>
              </>
            ) : (
              <div>
                <label style={{ display: "block", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: "#888" }}>
                  Drop your idea / trash in the bin (アイデア・脳内ガラクタ置き場)
                </label>
                <textarea 
                  required 
                  rows="5" 
                  placeholder="「こんなの作ったら面白そう」「こういうネタ好き」みたいな頭の中の独り言を気軽にポイッと..." 
                  style={{ width: "100%", padding: "14px", backgroundColor: "#111", border: "1px solid #333", color: "#fff", borderRadius: "4px", fontSize: "14px", outline: "none", resize: "vertical", boxSizing: "border-box" }} 
                />
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "900", textTransform: "uppercase", marginBottom: "8px", color: "#888" }}>
                Your Contact / Handle (任意・返事が欲しい場合のみ)
              </label>
              <input 
                type="text" 
                placeholder="メールアドレス または SNS ID (X / Instagram)" 
                style={{ width: "100%", padding: "14px", backgroundColor: "#111", border: "1px solid #333", color: "#fff", borderRadius: "4px", fontSize: "14px", outline: "none", boxSizing: "border-box" }} 
              />
            </div>

            <button 
              type="submit" 
              style={{ width: "100%", padding: "16px", backgroundColor: "#fff", color: "#000", border: "none", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer", borderRadius: "4px", transition: "transform 0.1s ease, background-color 0.2s ease" }}
            >
              THROW INTO THE BIN
            </button>
          </form>
        )}
      </main>

      {/* スマホ用下部固定フッター（他のページと統一感を持たせる場合） */}
      {isMobile && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, height: "60px",
          backgroundColor: "#111", borderTop: "1px solid #222", display: "flex",
          alignItems: "center", justifyContent: "space-around", padding: "0 10px", zIndex: 100
        }}>
          <div style={{ display: "flex", justifyContent: "space-around", width: "100%", fontSize: "10px", fontWeight: "900", textTransform: "uppercase" }}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}>Home</Link>
            <Link to="/concept" style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}>Concept</Link>
            <Link to="/articles" style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}>Articles</Link>
            <Link to="/request" style={{ color: "#fff", textDecoration: "none" }}>Request</Link>
            <Link to="/shop" style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}>Shop</Link>
          </div>
        </div>
      )}
    </div>
  );
}