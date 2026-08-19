import { Link } from "@remix-run/react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
  { href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap", rel: "stylesheet" }
];

const ARTICLES_DATA = [
  {
    id: "01",
    title: "エラー0.1mmにキレる夜と、手造りの泥臭さ",
    date: "2026.05.18",
    category: "BEHIND THE SCENES",
    excerpt: "画面の前で何度マウスを投げ出したことか。Master Handの指のカーブ、血管の浮き上がり。そのわずか0.1ミリの誤差が、プロダクトを生かすも殺すも決めてしまう。"
  },
  {
    id: "02",
    title: "ドイツで見た夜の街と、性の寛容さについて",
    date: "2026.04.12",
    category: "DIARY / INSPIRATION",
    excerpt: "留学先で目撃したタブーのない圧倒的な表現の自由。Dick man key-charmという変態的でポップなキャラクターが生まれた本当の理由。"
  },
  {
    id: "03",
    title: "なぜ部屋に無数の不気味な試作品が転がっているのか",
    date: "2026.03.29",
    category: "DAILY LIFE",
    excerpt: "3Dプリンターの稼働音が響くワンルーム。失敗作の山に囲まれながら、僕らが毎夜考えているくだらないこだわりと、これからの話。"
  }
];

export default function Articles() {
  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", color: "#000", fontFamily: "'Montserrat', sans-serif", paddingBottom: "100px" }}>
      
      {/* 共通ヘッダー */}
      <header style={{ 
        maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem", 
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem"
      }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", color: "#000" }}>
          <img src="/assets/IN.png" alt="Logo" style={{ height: "30px", width: "auto", objectFit: "contain" }} />
          <span style={{ fontSize: "36px", fontWeight: "900", letterSpacing: "-0.04em", textTransform: "lowercase", lineHeight: "1" }}>
            wacca
          </span>
        </Link>

        <nav style={{ display: "flex", gap: "1.8rem", fontWeight: "900", fontSize: "13px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          <Link to="/" style={{ color: "#000", textDecoration: "none", opacity: 0.5 }}>Home</Link>
          <Link to="/concept" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Concept</Link>
          <Link to="/articles" style={{ color: "#000", textDecoration: "none", borderBottom: "2px solid #000" }}>Articles</Link>
          <Link to="/request" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Request</Link>
          <Link to="/shop" style={{ color: "#000", textDecoration: "none", opacity: 0.7 }}>Shop</Link>
        </nav>
      </header>

      {/* 記事メインコンテンツ */}
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "900", textTransform: "uppercase", marginBottom: "3rem", letterSpacing: "-0.03em" }}>
          Articles & Logs
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {ARTICLES_DATA.map((article) => (
            <article key={article.id} style={{ borderBottom: "1px solid #eee", paddingBottom: "2.5rem", cursor: "pointer" }}>
              <div style={{ display: "flex", gap: "15px", fontSize: "11px", fontWeight: "900", color: "#888", marginBottom: "8px", letterSpacing: "0.05em" }}>
                <span>{article.category}</span>
                <span>/</span>
                <span>{article.date}</span>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: "900", marginBottom: "10px", lineHeight: "1.4" }}>
                {article.title}
              </h2>
              <p style={{ fontSize: "14px", lineHeight: "1.8", color: "#555" }}>
                {article.excerpt}
              </p>
              <div style={{ marginTop: "15px", fontSize: "12px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Read More →
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}