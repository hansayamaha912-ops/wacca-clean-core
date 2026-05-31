import { Link } from '@remix-run/react';

export const meta = () => [
  { title: 'WACCA - Your City. Your Culture.' },
];

export default function Index() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', backgroundColor: '#0a0a0c', color: '#fff' }}>
      <h1 style={{ fontSize: '3rem', letterSpacing: '0.3em', color: '#00f0ff', margin: '0 0 10px 0' }}>WACCA</h1>
      <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>[ 3D_VIEWPORT_RESERVED ]</p>

      {/* ─── 購入導線の確保 ─── */}
      <div style={{ border: '1px solid rgba(0,240,255,0.2)', padding: '30px', borderRadius: '6px', backgroundColor: '#030305', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>WACCA CARABINER / DICE</h2>
        <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '20px' }}>価格: ¥3,500 (税込)</p>
        <button
          onClick={() => alert('只今Stripe決済システムのメンテナンス中です。')}
          style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid #00f0ff', color: '#00f0ff', cursor: 'pointer', fontFamily: 'monospace', fontWeight: 'bold' }}
        >
          &gt; PROCEED_TO_CHECKOUT
        </button>
      </div>

      <footer style={{ marginTop: '60px' }}>
        <Link to="/policies" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'underline' }}>
          特定商取引法に基づく表記
        </Link>
      </footer>
    </main>
  );
}
