import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

// ==========================================
// 商品マスタデータ
// ==========================================
const PRODUCT_DATA = [
  {
    id: "master-hand",
    name: "Master Hand",
    price: "¥4,000",
    status: "Available",
    images: [
      "/assets/ピンク正面.png",
      "/assets/ピンク横.png",
      "/assets/c1.jpg",
      "/assets/c2.jpg",
      "/assets/c3.jpg",
      "/assets/c4.jpg",
      "/assets/c5.jpg",
      "/assets/c6.jpg",
      "/assets/c7.jpg",
      "/assets/c8.jpg",
      "/assets/c9.jpg"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: null
  },
  {
    id: "dick-man-key-charm",
    name: "Dick man key-charm",
    price: "¥3,500",
    status: "Available",
    images: [
      "/assets/Dick正面.png",
      "/assets/Dick横.png"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/9B67sL4Q773tg2Q6Qc3wQ04"
  },
  {
    id: "angr-kun-key-holder",
    name: "Angr-Kun key-holder",
    price: "¥3,500",
    status: "Available",
    images: [
      "/assets/angr正面.png",
      "/assets/angr横.png",
      "/assets/アングル1.jpg",
      "/assets/アングル2.jpg",
      "/assets/アングルM1.mp4",
      "/assets/アングル3.jpg",
      "/assets/アングル4.jpg",
      "/assets/アングル5.jpg",
      "/assets/アングル6.jpg",
      "/assets/アングル7.jpg"
    ],
    sizes: ["ONE SIZE"],
    stripeUrl: "https://buy.stripe.com/14AcN5eqH0F517WdeA3wQ05"
  }
];

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: "#fff", minHeight: "100vh", color: "#000", fontFamily: "sans-serif", paddingBottom: "140px" }}>
      
      <header style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem", display: "flex", justifyContent: "space-between" }}>
        <nav style={{ display: "flex", gap: "2rem" }}>
          <Link to="/" style={{ color: "#000", textDecoration: "none", opacity: 0.5 }}>Home</Link>
          <Link to="/shop" style={{ color: "#000", textDecoration: "none", borderBottom: "1px solid #000" }}>Shop</Link>
        </nav>
      </header>

      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: "1.5rem" }}>
          {PRODUCT_DATA.map((product) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} style={{ cursor: "pointer" }}>
              <div style={{ width: "100%", aspectRatio: "3/4", backgroundColor: "#f9f9f9", overflow: "hidden", marginBottom: "0.8rem" }}>
                <img src={product.images[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ margin: 0, fontSize: "13px" }}>{product.name}</h3>
              <p style={{ margin: 0, opacity: 0.6 }}>{product.price}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ポップアップモーダル */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 50,
        pointerEvents: selectedProduct ? "auto" : "none",
        opacity: selectedProduct ? 1 : 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div onClick={() => setSelectedProduct(null)} style={{ position: "absolute", inset: 0 }} />
        <div style={{
          width: "90%", maxWidth: "500px", backgroundColor: "#fff", padding: "2rem",
          maxHeight: "80vh", overflowY: "auto", position: "relative"
        }}>
          {selectedProduct && (
            <>
              <button onClick={() => setSelectedProduct(null)} style={{ position: "absolute", top: "10px", right: "10px", border: "none", background: "none", cursor: "pointer" }}>CLOSE</button>
              <h2>{selectedProduct.name}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {selectedProduct.images.map((src, index) => (
                  src.endsWith(".mp4") ? (
                    <video key={index} src={src} controls style={{ width: "100%" }} />
                  ) : (
                    <img key={index} src={src} style={{ width: "100%", display: "block" }} />
                  )
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}