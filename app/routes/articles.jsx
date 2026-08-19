import { Link } from "@remix-run/react";
import { useState } from "react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
  { href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap", rel: "stylesheet" }
];

// ==========================================
// 💡 【ここに記事をコピペで追加していく】
// ==========================================
const ARTICLES_DATA = [
  {
    id: "01",
    title: "エラー0.1mmにキレる夜と、手造りの泥臭さ",
    date: "2026.05.18",
    category: "BEHIND THE SCENES",
    image: "/assets/ピンク正面.png", // 👈 ここに記事の挿絵にしたい画像のパスを入れる
    excerpt: "画面の前で何度マウスを投げ出したことか。Master Handの指のカーブ、血管の浮き上がり。そのわずか0.1ミリの誤差が、プロダクトを生かすも殺すも決めてしまう。",
    fullText: "画面の前で何度マウスを投げ出したことか。Master Handの指のカーブ、血管の浮き上がり。そのわずか0.1ミリの誤差が、プロダクトを生かすも殺すも決めてしまう。\n\nデジタル画面上で完璧に見えても、いざ出力して手で触れると違和感がある。この泥臭い試行錯誤の繰り返しこそが、WACCAのプロダクトの核心にある。"
  },
  {
    id: "02",
    title: "ドイツで見た夜の街と、性の寛容さについて",
    date: "2026.04.12",
    category: "DIARY / INSPIRATION",
    image: "/assets/Dick正面.png",
    excerpt: "留学先で目撃したタブーのない圧倒的な表現の自由。Dick man key-charmという変態的でポップなキャラクターが生まれた本当の理由。",
    fullText: "留学先で目撃したタブーのない圧倒的な表現の自由。Dick man key-charmという変態的でポップなキャラクターが生まれた本当の理由。\n\n日本ではどうしてもタブー視されがちなモチーフも、向こうでは日常のユーモアとしてリスペクトされている。その空気を、そのままこの小さなキーチャームに閉じ込めたかった。"
  },
  {
    id: "03",
    title: "なぜ部屋に無数の不気味な試作品が転がっているのか",
    date: "2026.03.29",
    category: "DAILY LIFE",
    image: "/assets/angr正面.png",
    excerpt: "3Dプリンターの稼働音が響くワンルーム。失敗作の山に囲まれながら、僕らが毎夜考えているくだらないこだわりと、これからの話。",
    fullText: "3Dプリンターの稼働音が響くワンルーム。失敗作の山に囲まれながら、僕らが毎夜考えているくだらないこだわりと、これからの話。\n\n綺麗に並べられたお店の商品棚の裏側には、無数の失敗とボツになった残骸が転がっている。その「過程の熱量」も含めて、カルチャーとして楽しんでもらいたい。"
  }
];

export default function Articles() {
  // どの記事が「Read More」で開かれているかを管理する状態
  const [openArticleId, setOpenArticleId] = useState(null);

  const toggleReadMore = (id) => {
    if (openArticleId === id) {
      setOpenArticleId(null); // すでに開いてたら閉じる
    } else {
      setOpenArticleId(id); // 開く
    }
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "'Montserrat', sans-serif", paddingBottom: "100px" }}>
      
      {/* ヘッダー */}
      <header style={{ 
        maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem", 
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem"
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff" }}>
          <img src="/assets/IN.png" alt="Logo" style={{ height: "24px", width: "auto", objectFit: "contain", filter: "invert(1)" }} />
          <span style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.04em", textTransform: "lowercase", lineHeight: "1" }}>
            wacca
          </span>
        </Link>

        <nav style={{ display: "flex", gap: "1.5rem", fontWeight: "900", fontSize: "12px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Home</Link>
          <Link to="/concept" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Concept</Link>
          <Link to="/articles" style={{ color: "#fff", textDecoration: "none", borderBottom: "2px solid #fff" }}>Articles</Link>
          <Link to="/request" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Request</Link>
          <Link to="/shop" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Shop</Link>
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "900", textTransform: "uppercase", marginBottom: "3rem", letterSpacing: "-0.03em" }}>
          Articles & Logs
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {ARTICLES_DATA.map((article) => {
            const isOpen = openArticleId === article.id;

            return (
              <article key={article.id} style={{ borderBottom: "1px solid #222", paddingBottom: "3rem" }}>
                <div style={{ display: "flex", gap: "15px", fontSize: "11px", fontWeight: "900", color: "#666", marginBottom: "8px", letterSpacing: "0.05em" }}>
                  <span>{article.category}</span>
                  <span>/</span>
                  <span>{article.date}</span>
                </div>

                <h2 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "1.2rem", lineHeight: "1.3" }}>
                  {article.title}
                </h2>

                {/* 記事の挿絵画像 */}
                {article.image && (
                  <div style={{ width: "100%", maxHeight: "400px", backgroundColor: "#111", overflow: "hidden", marginBottom: "1.5rem", borderRadius: "4px" }}>
                    <img src={article.image} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                )}

                {/* リード文 or 全文 */}
                <p style={{ fontSize: "14px", lineHeight: "1.8", color: "#ccc", whiteSpace: "pre-line" }}>
                  {isOpen ? article.fullText : article.excerpt}
                </p>

                {/* Read More ボタン（押すとその場でパッと開閉するギミック） */}
                <button 
                  onClick={() => toggleReadMore(article.id)}
                  style={{ 
                    marginTop: "1.5rem", background: "none", border: "none", color: "#fff", 
                    fontSize: "12px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em", 
                    cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: "6px",
                    opacity: 0.8, transition: "opacity 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "1"}
                  onMouseLeave={(e) => e.target.style.opacity = "0.8"}
                >
                  {isOpen ? "Close [↑]" : "Read More [↓]"}
                </button>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}