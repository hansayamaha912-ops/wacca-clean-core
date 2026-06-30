import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "WACCA - CONCEPT" },
    { name: "description", content: "WACCAコンセプト: 文化は常に発展し、動き続ける生命体である。" }
  ];
};

export default function Concept() {
  return (
    <div style={containerStyle}>
      {/* 戻るボタン */}
      <div style={navStyle}>
        <Link to="/" style={backLinkStyle}>← BACK</Link>
      </div>

      <div style={contentWrapperStyle}>
        {/* 左側：ロゴとメインコピーのエリア */}
        <div style={leftSectionStyle}>
          <div style={brandBlockStyle}>
            <p style={subTitleStyle}>What's ur 20?</p>
            <p style={subTitleStyle}>Connecting from here, You and I.</p>
            <h1 style={logoTextStyle}>WACCA</h1>
          </div>
        </div>

        {/* 右側：コンセプトテキストのエリア */}
        <div style={rightSectionStyle}>
          {/* 英語版テキスト */}
          <section style={textBlockEnStyle}>
            <p>Culture is a living thing that is always developing and moving.</p>
            <p>Who is wearing which clothes, in which city, and breathing in what kind of music?</p>
            <p style={{ fontWeight: 'bold', margin: '1.5em 0' }}>People, objects, and places.</p>
            <p>At the moment these three variables overlap, culture is born.</p>
            <p>Using 3D technology, we grant mass and form to communities<br />that are inherently invisible.</p>
            <p>We sculpt images on your mind and fragments of memory into a tangible "reality"<br />possessed with true texture and presence.</p>
            <p>This product is the very shape of culture you can hold in your hands<br />—a key to guiding you, a person of intent, toward new places and experiences.</p>
            <p>WACCA creates a circle (wacca) within that culture.</p>
            <p>Starting from local connections in Tokyo,<br />it is an attempt to bind them together through products.</p>
            <p style={{ fontStyle: 'italic', marginTop: '1.5em' }}>"What's ur 20?"</p>
            <p>Connecting from here, You and I.</p>
          </section>

          {/* 日本語版テキスト */}
          <section style={textBlockJaStyle}>
            <p>文化は常に発展し、動き続ける生命体である。</p>
            <p>誰がどの服を着て、どの街の、どんな音楽の中で呼吸しているのか。</p>
            <p style={{ fontWeight: 'bold', margin: '1.5em 0' }}>人・モノ・場所。この3つの変数が重なる瞬間に、文化は生まれる。</p>
            <p>私たちは、3D技術を用いて、本来目に見えないコミュニティに質量と形態を授ける。</p>
            <p>頭の中のイメージや記憶の断片を、確かな触感と存在感を持つ「実在」へと彫り込む。</p>
            <p>このプロダクトは、あなたが手で掴める文化の形であり、<br />意思を持つあなたを新しい場所や体験へと導くための鍵である。</p>
            <p>WACCAは、その文化（culture）の中に輪っか（circle）を創出する。</p>
            <p>東京のローカルな人の繋がりを起点に、それらをプロダクトで繋ぐ試みである。</p>
            <p style={{ marginTop: '1.5em' }}>「What's ur 20?」ここから繋がる、あなたとわたし。</p>
          </section>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// インラインスタイルの定義
// ==========================================

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "#f4f0ea", // 画像のトーンに合わせた薄いベージュ
  
  // 背景画像に「wacca背景.jpg」を指定し、最下層の中央に配置
  backgroundImage: "linear-gradient(rgba(244, 240, 234, 0.4), rgba(244, 240, 234, 0.4)), url('/assets/wacca背景.jpg')", 
  backgroundSize: "contain", // 画像全体が画面内に綺麗に収まるサイズに調整（お好みで cover に変更可）
  backgroundPosition: "center center", // 中央に配置
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed", // スクロール時に背景の青いグラフィックを固定
  
  color: "#000000",
  fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif",
  position: "relative",
  padding: "40px 20px",
  boxSizing: "border-box",
};

const navStyle: React.CSSProperties = {
  position: "fixed", // スクロールしても追従するように fixed に変更
  top: "30px",
  left: "30px",
  zIndex: 10,
};

const backLinkStyle: React.CSSProperties = {
  color: "#000000",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "14px",
  letterSpacing: "0.1em",
  backgroundColor: "rgba(244, 240, 234, 0.7)", // スクロール時に文字と被ってもボタンが見えるように
  padding: "6px 12px",
  borderRadius: "4px",
};

const contentWrapperStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  maxWidth: "1200px",
  margin: "0 auto",
  paddingTop: "60px",
  position: "relative",
  zIndex: 2, // 背景画像より確実に上のレイヤーに配置
};

const leftSectionStyle: React.CSSProperties = {
  flex: "1 1 400px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  minHeight: "300px",
  padding: "20px",
};

const brandBlockStyle: React.CSSProperties = {
  textAlign: "left",
};

const subTitleStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "1.4",
  margin: "4px 0",
  fontWeight: "500",
  textShadow: "0 0 10px rgba(244, 240, 234, 0.8)", // 青い背景と被ったときの可読性向上
};

const logoTextStyle: React.CSSProperties = {
  fontSize: "64px",
  fontWeight: "900",
  margin: "10px 0 0 0",
  letterSpacing: "0.05em",
  fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
  textShadow: "0 0 10px rgba(244, 240, 234, 0.8)",
};

const rightSectionStyle: React.CSSProperties = {
  flex: "1 1 600px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
};

const textBlockEnStyle: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.8",
  textAlign: "right",
  letterSpacing: "0.05em",
  // 青い太いグラフィックとテキストが重なった際、文字（黒）が読めるように薄くシャドウを追加
  textShadow: "0 0 8px rgba(244, 240, 234, 0.9), 0 0 4px rgba(244, 240, 234, 0.9)", 
};

const textBlockJaStyle: React.CSSProperties = {
  fontSize: "13px",
  lineHeight: "2.0",
  textAlign: "right",
  letterSpacing: "0.08em",
  opacity: 0.9,
  textShadow: "0 0 8px rgba(244, 240, 234, 0.9), 0 0 4px rgba(244, 240, 234, 0.9)",
};