import { Link } from '@remix-run/react';
import { useState } from 'react';
import stylesUrl from "../styles/product.css?url";

export const links = () => [{ rel: 'stylesheet', href: stylesUrl }];

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [currency, setCurrency] = useState('JPY');

  // 為替レート設定 (35ドル基準の計算)
  const rates = {
    JPY: 5500, // 表示用（選択時に4000に上書きされます）
    USD: 35,
    EUR: 32,
    GBP: 28,
    AUD: 52
  };

  // JPY選択時は固定値4000、それ以外はレートに基づく価格
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

The future traced by these fingertips is, entirely and ultimately, in your own hands.`}</p>
              
              <div className="divider" />

              <p className="jp-text">{`「掴む」ことは、何かを変えること。

タバコを休ませる指先、お気に入りの小物を預ける器、あるいは、退屈な日常を引っこ抜くためのフックとして。

「手」というモチーフに、ただの装飾以上の意味を。
ミリ単位のこだわりで造形されたこのMasterhandは、日常の何気ない動作をちょっとだけドラマチックに変くれるはず。

大切なのは、これを手にしたあなたが、何に手を伸ばすか。
誰と繋がり、どんな新しい場所へ向かうのか。

この製品は、同じ感性を持つ人たちと出会うための「招待状」でもあります。
ようこそ コミュニティへ`}</p>
              
              <div className="footer-sign">「What`s ur Twenty？」---WACCA</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}