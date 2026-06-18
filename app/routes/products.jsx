import { Link } from '@remix-run/react';
import { useState } from 'react';
import stylesUrl from "../styles/product.css?url";

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState('JPY');
  const [color, setColor] = useState('black'); // カラーの状態を保持

  // 為替レート設定 (35ドル基準の計算)
  const rates = {
    JPY: 5500,
    USD: 35,
    EUR: 32,
    GBP: 28,
    AUD: 52
  };

  const displayPrice = currency === 'JPY' ? 4000 : rates[currency];

  return (
    <div className="product-page">
      <header className="product-header">
        <Link to="/" className="logo-link">
          <img src="/assets/bf.png" alt="Logo" className="site-logo" />
        </Link>
      </header>

      <main className="product-main">
        <section className="product-visual">
          <div className="gallery">
            <img src="/assets/1.jpg" alt="Detail 1" />
            <img src="/assets/2.jpg" alt="Detail 2" />
            <img src="/assets/3.jpg" alt="Detail 3" />
            <img src="/assets/5.jpg" alt="Detail 5" />
          </div>
        </section>

        <section className="product-info">
          <div className="product-header-info">
            <span className="product-code">wacca-001</span>
            <h1>Master Hand</h1>
          </div>
          
          <div className="currency-selector">
            <label>CURRENCY</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="JPY">JPY (¥)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>

          {/* カラー選択カラム */}
          <div className="color-selector" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '8px', color: '#808080' }}>COLOR</label>
            <select value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '100%', padding: '10px', background: '#111', color: '#fff', border: '1px solid #333' }}>
              <option value="black">Black</option>
              <option value="pink">Pink</option>
              <option value="darkgreen">Dark Green</option>
              <option value="grey">Grey</option>
            </select>
          </div>

          <div className="price-display">
            <span className="currency">{currency}</span>
            <span className="amount">
              {currency === 'JPY' 
                ? `¥${displayPrice.toLocaleString()}` 
                : `${currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : 'A$'}${displayPrice}`
              }
            </span>
          </div>

          <div className="quantity-selector">
            <label>Quantity</label>
            <div className="counter">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="actions">
            <a href="https://buy.stripe.com/aFa14n96ncnNbMAdeA3wQ01" className="buy-btn" target="_blank" rel="noopener noreferrer">
              ADD TO COLLECTION
            </a>
          </div>
          
          <div className="product-story">
            <h2>Masterhand: The Zenith of "The Hand"</h2>
            <div className="story-content">
              <p className="en-text">{`One day, while repeating the same prototypes in the studio, my hands suddenly stopped. I looked back and forth between my own reflection and the "hand" I was trying to bring to life.

A hand possesses a truly multifaceted expression.

At times, it seeks serenity, holding a cigarette between its fingers to savor a moment of silence. At others, it clenches tightly, desperate to seize prey or snatch a future. Like Adam Smith’s "Invisible Hand," it can shift the gears of society from the shadows; and at times, it stands against us as a formidable presence—much like the final boss in a game, imposing and absolute.

For this project, we decided to treat "the hand" not merely as a motif, but as a distinct personality.

Throughout the production process, we fought against errors measured in millimeters. The curve of a knuckle, the trace of a vein, the pressure of a fingertip reaching out to grasp—a difference of just 0.1 millimeters can transform the hand from an instrument of mercy into one of violence.

This Masterhand product is the concentrated form of our obsession and the infinite stories that a hand can tell.

When you wear this "hand," it becomes an extension of your own will. What will you reach for? What will you grasp? And what will you defend yourself against?

The future traced by these fingertips is, entirely and ultimately, in your own hands.

---
Features:
- Available in multiple colorways: Black, Pink, Dark Green, and Grey.
- Includes a detachable carabiner for versatile attachment.

Note:
* Product color may slightly vary due to lighting. 
* Ensure the carabiner is securely fastened before use.`}</p>
              
              <div className="divider" />

              <p className="jp-text">{`その手で、日常を、輪へ。

差し出された指先、預けられた小物。
「Masterhand」は、日常の何気ない動作に物語を宿すための装置です。

私たちが目指すのは、製品を通じて「自分の居場所」を再認識し、見知らぬ誰かと確かな連帯感で繋がること。仲間との出会いは、退屈な日常を引っこ抜くフックになります。

これは、あなたのアイデアを証明するアイテムであり、コミュニティへの招待状でもある。
ようこそ 　WACCAコミュニティへ`}</p>
              
              <div className="footer-sign">「What`s ur Twenty？」---WACCA</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
