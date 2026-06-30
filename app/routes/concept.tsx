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
        {/* 左側：真の左.jpgのグラフィックをはっきりと見せるためのスペーサー領域（被り防止） */}
        <div style={leftSpacerStyle} />

        {/* 右側：コンセプトテキストのエリア（画像に一切干渉しない） */}
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
  backgroundColor: "#f4f0ea",
  
  backgroundImage: "url('/assets/真の左.jpg')", 
  
  // 【修正ポイント1】100%（縦いっぱい）から 92%〜95% ほどに少し縮小する
  backgroundSize: "auto 92vh", 
  
  // 【修正ポイント2】左端（0%）に固定してロゴが切れるのを防ぐ
  backgroundPosition: "0% center", 
  
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  color: "#000000",
  fontFamily: "'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', sans-serif",
  position: "relative",
  boxSizing: "border-box",
};

const navStyle: React.CSSProperties = {
  position: "fixed",
  top: "30px",
  right: "40px", // テキストのある右側にBACKボタンを配置
  zIndex: 10,
};

const backLinkStyle: React.CSSProperties = {
  color: "#000000",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "14px",
  letterSpacing: "0.1em",
  backgroundColor: "#f4f0ea", // オリジナルの背景色と合わせて綺麗に馴染ませる
  padding: "8px 16px",
  border: "1px solid #000000",
  borderRadius: "20px",
};

const contentWrapperStyle: React.CSSProperties = {
  display: "flex",
  width: "100%",
  minHeight: "100vh",
  flexWrap: "wrap", // スマホ表示などのレスポンシブにも自動対応
};

// 左側の空白領域（真の左.jpg のデザインと絶対にテキストを重ねないためのガード）
const leftSpacerStyle: React.CSSProperties = {
  flex: "1 1 50%", // 画面の左半分（50%）を画像のために100%確保
  minWidth: "320px",
  pointerEvents: "none",
};

// 右側のテキストエリア
const rightSectionStyle: React.CSSProperties = {
  flex: "1 1 50%", // 画面の右半分（50%）にテキストを配置
  minWidth: "320px",
  padding: "80px 60px 60px 40px", // 上下左右にバランスの良い余白を設定
  display: "flex",
  flexDirection: "column",
  gap: "50px",
  justifyContent: "center",
  boxSizing: "border-box",
};

const textBlockEnStyle: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.9",
  textAlign: "left", // 左揃えにして読みやすく調整
  letterSpacing: "0.05em",
  maxWidth: "520px",
};

const textBlockJaStyle: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "2.1",
  textAlign: "left",
  letterSpacing: "0.08em",
  maxWidth: "520px",
};