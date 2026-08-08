import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

// ==========================================
// 商品マスタデータ（descriptionを追加）
// ==========================================
const PRODUCT_DATA = [
  {
    id: "master-hand",
    name: "Master Hand",
    price: "¥4,000",
    description: "WACCAの新たな「第3の手」。ただの雑貨ではなく、これを持つことであなたも輪（WACCA）のメンバーとしてジョインするというメッセージを込めたシグネチャーグッズです。",
    images: [
      "/assets/ピンク正面.png", "/assets/c2.jpg", "/assets/c6.jpg", "/assets/ピンク横.png",
      "/assets/c1.jpg", "/assets/c3.jpg", "/assets/c7.jpg", "/assets/c8.jpg", "/assets/c9.jpg"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: null
  },
  {
    id: "dick-man-key-charm",
    name: "Dick man key-charm",
    price: "¥3,500",
    description: "ドイツ留学時に触れた「性の寛容さ」に感銘を受け、日本ではタブー視されがちな性をどこまでポップに表現できるか挑戦したキャラクター。日常にユーモアと解放を。",
    images: ["/assets/Dick正面.png", "/assets/Dick横.png"],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/9B67sL4Q773tg2Q6Qc3wQ04"
  },
  {
    id: "angr-kun-key-holder",
    name: "Angr-Kun key-holder",
    price: "¥3,500",
    description: "「怒り」という感情から生まれた正直すぎるキャラクター。本心を隠さず、ありのままを表現する彼を身につければ、自分にも正直になれるはず。",
    images: [
      "/assets/angr正面.png", "/assets/アングル1.jpg", "/assets/angr横.png", "/assets/アングル2.jpg",
      "/assets/アングルM1.mp4", "/assets/アングル3.jpg", "/assets/アングル4.jpg", "/assets/アングル5.jpg",
      "/assets/アングル6.jpg", "/assets/アングル7.jpg"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/14AcN5eqH0F517WdeA3wQ05"
  }
];

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", paddingBottom: "140px" }}>
      
      {/* ヘッダー・メイン（既存のコードと同じ） */}
      <header style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem", display: "flex" }}>
        <Link to="/" style={{ color: "#000", textDecoration: "none", opacity: 0.5 }}>Home</Link>
        <Link to="/shop" style={{ color: "#000", textDecoration: "none", borderBottom: "1px solid #000", marginLeft: "2rem" }}>Shop</Link>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "1.5rem" }}>
          {PRODUCT_DATA.map((product) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} style={{ cursor: "pointer" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", backgroundColor: "#f9f9f9", overflow: "hidden" }}>
                <img src={product.images[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontSize: "13px" }}>{product.name}</h3>
              <p style={{ opacity: 0.6 }}>{product.price}</p>
            </div>
          ))}
        </div>
      </main>

      {/* 2カラムレイアウトのポップアップモーダル */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 50,
        pointerEvents: selectedProduct ? "auto" : "none",
        opacity: selectedProduct ? 1 : 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center"
      }}>
        <div onClick={() => setSelectedProduct(null)} style={{ position: "absolute", inset: 0 }} />
        
        <div style={{
          width: "100%", maxWidth: "860px", backgroundColor: "#fff", height: isMobile ? "90vh" : "80vh",
          display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden"
        }}>
          {selectedProduct && (
            <>
              {/* 左：ギャラリー */}
              <div style={{ flex: 1.2, overflowY: "auto", padding: "20px" }}>
                {selectedProduct.images.map((src, index) => (
                  src.toLowerCase().endsWith(".mp4") ? (
                    <video key={index} src={src} controls playsInline loop muted autoPlay style={{ width: "100%", marginBottom: "10px" }} />
                  ) : (
                    <img key={index} src={src} style={{ width: "100%", marginBottom: "10px", display: "block" }} />
                  )
                ))}
              </div>

              {/* 右：ストーリーと購入ボタン */}
              <div style={{ flex: 1, padding: "40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h2>{selectedProduct.name}</h2>
                  <p style={{ fontSize: "20px" }}>{selectedProduct.price}</p>
                  <p style={{ lineHeight: "1.8", color: "#555", marginTop: "20px" }}>{selectedProduct.description}</p>
                </div>
                {selectedProduct.stripeUrl ? (
                  <button onClick={() => window.location.href = selectedProduct.stripeUrl} style={{ padding: "15px", background: "#000", color: "#fff", cursor: "pointer" }}>BUY NOW</button>
                ) : (
                  <div style={{ padding: "15px", background: "#eee", textAlign: "center" }}>COMING SOON</div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}