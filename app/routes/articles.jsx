import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "true" },
  { href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap", rel: "stylesheet" }
];

// ==========================================
// 💡 記事データ
// ==========================================
const ARTICLES_DATA = [
  {
    id: "01",
    title: "エラー0.1mmにキレる夜と、手造りの泥臭さ",
    date: "2026.05.18",
    category: "BEHIND THE SCENES",
    image: "/assets/ピンク正面.png",
    excerpt: "画面の前で何度マウスを投げ出したことか。Master Handの指のカーブ、血管の浮き上がり。そのわずか0.1ミリの誤差が、プロダクトを生かすも殺すも決めてしまう。",
    contentBlocks: [
      { type: "text", value: "画面の前で何度マウスを投げ出したことか。Master Handの指のカーブ、血管の浮き上がり。そのわずか0.1ミリの誤差が、プロダクトを生かすも殺すも決めてしまう。\n\nデジタル画面上で完璧に見えても、いざ出力して手で触れると違和感がある。この泥臭い試行錯誤の繰り返しこそが、WACCAのプロダクトの核心にある。" },
      { type: "image", value: "/assets/ピンク横.png" },
      { type: "text", value: "完璧な工業製品にはない、人間の手が生み出す揺らぎや執念を、どうやってこの小さな造形に落とし込むか。毎夜、モニターの光に照らされながら考え続けている。" },
      { type: "youtube", value: "LUyyR_mZe58" }
    ],
    relatedProduct: {
      name: "Master Hand",
      price: "¥4,000",
      image: "/assets/ピンク正面.png",
      path: "/products"
    }
  },
  {
    id: "02",
    title: "ドイツで見た夜の街と、性の寛容さについて",
    date: "2026.04.12",
    category: "DIARY / INSPIRATION",
    image: "/assets/Dick正面.png",
    excerpt: "留学先で目撃したタブーのない圧倒的な表現の自由。Dick man key-charmという変態的でポップなキャラクターが生まれた本当の理由。",
    contentBlocks: [
      { type: "text", value: "留学先で目撃したタブーのない圧倒的な表現の自由。Dick man key-charmという変態的でポップなキャラクターが生まれた本当の理由。\n\n日本ではどうしてもタブー視されがちなモチーフも、向こうでは日常のユーモアとしてリスペクトされている。その空気を、そのままこの小さなキーチャームに閉じ込めたかった。" },
      { type: "image", value: "/assets/Dick横.png" }
    ]
  },
  {
    id: "03",
    title: "なぜ部屋に無数の不気味な試作品が転がっているのか",
    date: "2026.03.29",
    category: "DAILY LIFE",
    image: "/assets/angr正面.png",
    excerpt: "3Dプリンターの稼働音が響くワンルーム。失敗作の山に囲まれながら、僕らが毎夜考えているくだらないこだわりと、これからの話。",
    contentBlocks: [
      { type: "text", value: "3Dプリンターの稼働音が響くワンルーム。失敗作の山に囲まれながら、僕らが毎夜考えているくだらないこだわりと、これからの話。\n\n綺麗に並べられたお店の商品棚の裏側には、無数の失敗とボツになった残骸が転がっている。その「過程の熱量」も含めて、カルチャーとして楽しんでもらいたい。" },
      { type: "image", value: "/assets/アングル1.jpg" }
    ],
    relatedProduct: {
      name: "Angr-Kun key-holder",
      price: "¥2,500",
      image: "/assets/angr正面.png",
      path: "/shop"
    }
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

  const filteredArticles = ARTICLES_DATA.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", fontFamily: "'Montserrat', sans-serif", paddingBottom: isMobile ? "120px" : "100px" }}>
      
      {/* PC用ヘッダー */}
      <header style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff" }}>
          <img src="/assets/IN.png" alt="Logo" style={{ height: "24px", width: "auto", objectFit: "contain", filter: "invert(1)" }} />
          <span style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-0.04em", textTransform: "lowercase", lineHeight: "1" }}>wacca</span>
        </Link>
        <nav style={{ display: "flex", gap: "1.5rem", fontWeight: "900", fontSize: "12px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Home</Link>
          <Link to="/concept" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Concept</Link>
          <Link to="/articles" style={{ color: "#fff", textDecoration: "none", borderBottom: "2px solid #fff" }}>Articles</Link>
          <Link to="/request" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Request</Link>
          <Link to="/shop" style={{ color: "#fff", textDecoration: "none", opacity: 0.4 }}>Shop</Link>
        </nav>
      </header>

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        {selectedArticle ? (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <button 
              onClick={() => setSelectedArticle(null)}
              style={{ background: "none", border: "none", color: "#888", fontSize: "12px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.15em", cursor: "pointer", padding: 0, marginBottom: "2rem", display: "flex", alignItems: "center", gap: "8px" }}
            >← BACK TO LIST</button>

            <div style={{ display: "flex", gap: "15px", fontSize: "11px", fontWeight: "900", color: "#888", marginBottom: "10px", letterSpacing: "0.05em" }}>
              <span>{selectedArticle.category}</span><span>/</span><span>{selectedArticle.date}</span>
            </div>

            <h1 style={{ fontSize: "30px", fontWeight: "900", marginBottom: "2.5rem", lineHeight: "1.3" }}>{selectedArticle.title}</h1>

            {/* 💡 SNSシェアボタンエリア */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "3rem", alignItems: "center" }}>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedArticle.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", backgroundColor: "#fff", color: "#000", textDecoration: "none", fontWeight: "900", fontSize: "11px", textTransform: "uppercase", borderRadius: "4px" }}>Share on X</a>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Copied!"); }} style={{ padding: "10px 20px", backgroundColor: "#222", color: "#fff", border: "1px solid #444", fontWeight: "900", fontSize: "11px", textTransform: "uppercase", borderRadius: "4px", cursor: "pointer" }}>Copy Link</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "4rem" }}>
              {selectedArticle.contentBlocks.map((block, index) => {
                if (block.type === "text") return <p key={index} style={{ fontSize: "15px", lineHeight: "1.9", color: "#ddd", whiteSpace: "pre-line", margin: 0 }}>{block.value}</p>;
                if (block.type === "image") return <div key={index} style={{ width: "100%", maxHeight: "450px", backgroundColor: "#111", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", borderRadius: "4px", margin: "1rem 0" }}><img src={block.value} alt="media" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", display: "block" }} /></div>;
                if (block.type === "youtube") return <div key={index} style={{ width: "100%", aspectRatio: "16/9", margin: "1rem 0" }}><iframe src={`https://www.youtube.com/embed/${block.value}`} style={{ width: "100%", height: "100%", border: "none", borderRadius: "4px" }} allowFullScreen /></div>;
                return null;
              })}
            </div>

            {selectedArticle.relatedProduct && (
              <div style={{ backgroundColor: "#111", border: "1px solid #333", padding: "2rem", borderRadius: "8px", marginBottom: "3rem" }}>
                <div style={{ fontSize: "10px", fontWeight: "950", letterSpacing: "0.2em", color: "#888", textTransform: "uppercase", marginBottom: "1rem" }}>Featured Product</div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <img src={selectedArticle.relatedProduct.image} style={{ width: "90px", height: "120px", objectFit: "cover", borderRadius: "4px" }} />
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "900", textTransform: "uppercase" }}>{selectedArticle.relatedProduct.name}</h3>
                    <p style={{ fontSize: "14px", color: "#aaa" }}>{selectedArticle.relatedProduct.price}</p>
                    <a href={selectedArticle.relatedProduct.path} style={{ display: "inline-block", padding: "10px 20px", backgroundColor: "#fff", color: "#000", textDecoration: "none", fontWeight: "900", fontSize: "12px", borderRadius: "4px" }}>View Item →</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "900", textTransform: "uppercase", marginBottom: "2rem" }}>Articles & Logs</h1>
            <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: "100%", padding: "12px 16px", backgroundColor: "#111", border: "1px solid #333", color: "#fff", borderRadius: "4px", fontSize: "13px" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "4rem", marginTop: "3rem" }}>
              {filteredArticles.map((article) => (
                <article key={article.id} onClick={() => setSelectedArticle(article)} style={{ position: "relative", width: "100%", height: "420px", backgroundColor: "#111", borderRadius: "6px", overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <img src={article.image} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, zIndex: 2, background: "linear-gradient(to top, #000 0%, transparent 70%)" }} />
                  <div style={{ position: "relative", zIndex: 3, padding: "2rem" }}>
                    <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#fff" }}>{article.title}</h2>
                    <p style={{ fontSize: "13px", color: "#ddd" }}>{article.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {isMobile && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "65px", backgroundColor: "#111", borderTop: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 10px", zIndex: 100 }}>
          <input type="text" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)} style={{ flex: 1.2, padding: "8px", backgroundColor: "#222", border: "none", color: "#fff", borderRadius: "4px", fontSize: "11px" }} />
          <Link to="/shop" style={{ flex: 0.5, textAlign: "center", textDecoration: "none", color: "#fff", fontWeight: "900", fontSize: "11px" }}>CART</Link>
          <div style={{ flex: 1.5, display: "flex", justifyContent: "space-around", fontSize: "10px", fontWeight: "900" }}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>HOME</Link>
            <Link to="/concept" style={{ color: "#fff", textDecoration: "none" }}>CONCEPT</Link>
            <Link to="/request" style={{ color: "#fff", textDecoration: "none" }}>REQ</Link>
          </div>
        </div>
      )}
    </div>
  );
}