import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
  { href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap", rel: "stylesheet" }
];

// ==========================================
// 💡 記事データ（ここに追加していくだけで自動反映）
// ==========================================
const ARTICLES_DATA = [
  {
    id: "01",
    title: "エラー0.1mmにキレる夜と、手造りの泥臭さ",
    date: "2026.05.18",
    category: "BEHIND THE SCENES",
    image: "/assets/ピンク正面.png",
    excerpt: "画面の前で何度マウスを投げ出したことか。Master Handの指のカーブ、血管の浮き上がり。そのわずか0.1ミリの誤差が、プロダクトを生かすも殺すも決めてしまう。",
    fullText: `画面の前で何度マウスを投げ出したことか。Master Handの指のカーブ、血管の浮き上がり。そのわずか0.1ミリの誤差が、プロダクトを生かすも殺すも決めてしまう。

デジタル画面上で完璧に見えても、いざ出力して手で触れると違和感がある。この泥臭い試行錯誤の繰り返しこそが、WACCAのプロダクトの核心にある。

完璧な工業製品にはない、人間の手が生み出す揺らぎや執念を、どうやってこの小さな造形に落とし込むか。毎夜、モニターの光に照らされながら考え続けている。`
  },
  {
    id: "02",
    title: "ドイツで見た夜の街と、性の寛容さについて",
    date: "2026.04.12",
    category: "DIARY / INSPIRATION",
    image: "/assets/Dick正面.png",
    excerpt: "留学先で目撃したタブーのない圧倒的な表現の自由。Dick man key-charmという変態的でポップなキャラクターが生まれた本当の理由。",
    fullText: `留学先で目撃したタブーのない圧倒的な表現の自由。Dick man key-charmという変態的でポップなキャラクターが生まれた本当の理由。

日本ではどうしてもタブー視されがちなモチーフも、向こうでは日常のユーモアとしてリスペクトされている。その空気を、そのままこの小さなキーチャームに閉じ込めたかった。

真面目すぎる日常に、少しの毒とポップな解放感を。僕らが作るものは、いつもそういう「日常への小さな反抗」から始まっている。`
  },
  {
    id: "03",
    title: "なぜ部屋に無数の不気味な試作品が転がっているのか",
    date: "2026.03.29",
    category: "DAILY LIFE",
    image: "/assets/angr正面.png",
    excerpt: "3Dプリンターの稼働音が響くワンルーム。失敗作の山に囲まれながら、僕らが毎夜考えているくだらないこだわりと、これからの話。",
    fullText: `3Dプリンターの稼働音が響くワンルーム。失敗作の山に囲まれながら、僕らが毎夜考えているくだらないこだわりと、これからの話。

綺麗に並べられたお店の商品棚の裏側には、無数の失敗とボツになった残骸が転がっている。その「過程の熱量」も含めて、カルチャーとして楽しんでもらいたい。

今日も明日も、新しい造形を出力しては直し、出しては直しの日々。この部屋のゴミの山こそが、WACCAの原動力だ。`
  }
];

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 検索ワードにひっかかる記事を絞り込み
  const filteredArticles = ARTICLES_DATA.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "'Montserrat', sans-serif", paddingBottom: isMobile ? "120px" : "100px" }}>
      
      {/* PC用ヘッダー */}
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
      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        
        {selectedArticle ? (
          // ==========================================
          // 💡 【個別記事の詳細ビュー】
          // ==========================================
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <button 
              onClick={() => setSelectedArticle(null)}
              style={{ 
                background: "none", border: "none", color: "#888", fontSize: "12px", fontWeight: "900", 
                textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer", padding: 0, 
                marginBottom: "2rem", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.2s"
              }}
              onMouseEnter={(e) => e.target.style.color = "#fff"}
              onMouseLeave={(e) => e.target.style.color = "#888"}
            >
              ← BACK TO LIST
            </button>

            <div style={{ display: "flex", gap: "15px", fontSize: "11px", fontWeight: "900", color: "#666", marginBottom: "10px", letterSpacing: "0.05em" }}>
              <span>{selectedArticle.category}</span>
              <span>/</span>
              <span>{selectedArticle.date}</span>
            </div>

            {/* 詳細ページのサムネイル画像（大きめ＆中央配置） */}
            {selectedArticle.image && (
              <div style={{ 
                width: "100%", height: "420px", backgroundColor: "#111", 
                display: "flex", alignItems: "center", justifyContent: "center", 
                overflow: "hidden", marginBottom: "2rem", borderRadius: "4px" 
              }}>
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title} 
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", objectPosition: "center", display: "block" }} 
                />
              </div>
            )}

            <h1 style={{ fontSize: "28px", fontWeight: "900", marginBottom: "2.5rem", lineHeight: "1.3" }}>
              {selectedArticle.title}
            </h1>

            <div style={{ fontSize: "15px", lineHeight: "1.9", color: "#ddd", whiteSpace: "pre-line", marginBottom: "4rem" }}>
              {selectedArticle.fullText}
            </div>

            <button 
              onClick={() => setSelectedArticle(null)}
              style={{ 
                width: "100%", padding: "16px", backgroundColor: "#222", color: "#fff", border: "none", 
                fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", borderRadius: "4px" 
              }}
            >
              BACK TO LIST
            </button>
          </div>
        ) : (
          // ==========================================
          // 💡 【見出し一覧ビュー】
          // ==========================================
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "900", textTransform: "uppercase", marginBottom: "2rem", letterSpacing: "-0.03em" }}>
              Articles & Logs
            </h1>

            {/* 記事一覧内での簡易検索バー */}
            <div style={{ marginBottom: "3rem" }}>
              <input 
                type="text" 
                placeholder="Search articles..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%", padding: "12px 16px", backgroundColor: "#111", border: "1px solid #333",
                  color: "#fff", borderRadius: "4px", fontSize: "13px", outline: "none", fontWeight: "700"
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <article 
                    key={article.id} 
                    onClick={() => setSelectedArticle(article)}
                    style={{ borderBottom: "1px solid #222", paddingBottom: "3.5rem", cursor: "pointer" }}
                  >
                    {/* 💡 要望対応：サムネイル画像をタイトルの「上」に大きめに配置 */}
                    {article.image && (
                      <div style={{ 
                        width: "100%", height: "320px", backgroundColor: "#111", 
                        display: "flex", alignItems: "center", justifyContent: "center", 
                        overflow: "hidden", marginBottom: "1.5rem", borderRadius: "4px" 
                      }}>
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", objectPosition: "center", display: "block" }} 
                        />
                      </div>
                    )}

                    <div style={{ display: "flex", gap: "15px", fontSize: "11px", fontWeight: "900", color: "#666", marginBottom: "8px", letterSpacing: "0.05em" }}>
                      <span>{article.category}</span>
                      <span>/</span>
                      <span>{article.date}</span>
                    </div>

                    <h2 style={{ fontSize: "22px", fontWeight: "900", marginBottom: "1rem", lineHeight: "1.3" }}>
                      {article.title}
                    </h2>

                    <p style={{ fontSize: "14px", lineHeight: "1.8", color: "#aaa" }}>
                      {article.excerpt}
                    </p>

                    <div style={{ marginTop: "1.5rem", fontSize: "12px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff" }}>
                      Read Article →
                    </div>
                  </article>
                ))
              ) : (
                <p style={{ color: "#666", fontSize: "14px" }}>No articles found.</p>
              )}
            </div>
          </div>
        )}

      </main>

      {/* ==========================================
          📱 【スマホ専用 下部固定フッター】
          左から: 検索BOX / カートロゴ / メニューバー
         ========================================== */}
      {isMobile && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, height: "65px",
          backgroundColor: "#111", borderTop: "1px solid #222", display: "flex",
          alignItem: "center", justifyContent: "space-around", padding: "0 10px", zIndex: 100
        }}>
          {/* 1. サイト内検索BOX */}
          <div style={{ display: "flex", alignItems: "center", flex: "1.2", paddingRight: "8px" }}>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%", padding: "8px 10px", backgroundColor: "#222", border: "none",
                color: "#fff", borderRadius: "4px", fontSize: "11px", outline: "none"
              }}
            />
          </div>

          {/* 2. 買い物カートのロゴ (Cart 0) */}
          <Link to="/shop" style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: "0.8", textDecoration: "none", color: "#fff", fontSize: "11px", fontWeight: "900", gap: "4px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span>(0)</span>
          </Link>

          {/* 3. メニューバー（主要ページへのリンク集） */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", flex: "1.5", fontSize: "10px", fontWeight: "900", textTransform: "uppercase" }}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}>Home</Link>
            <Link to="/concept" style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}>Concept</Link>
            <Link to="/request" style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}>Req</Link>
            <Link to="/shop" style={{ color: "#fff", textDecoration: "none", opacity: 0.7 }}>Shop</Link>
          </div>
        </div>
      )}
    </div>
  );
}