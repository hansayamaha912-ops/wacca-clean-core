import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';

export const meta = () => [
  { title: '特定商取引法に基づく表記 | WACCA' },
];

const TOKUSHOHO_ENTRIES = [
  { id: 'ENT_01', label: '法人名 / 屋号',   labelEn: 'BUSINESS_NAME',      value: 'Wacca / ワッカ' },
  { id: 'ENT_02', label: '運営責任者',       labelEn: 'OPERATOR',           value: 'MIN HANSA, SEITA MIURA' },
  { id: 'ENT_03', label: '所在地',           labelEn: 'ADDRESS',            value: '〒103-0004 東京都中央区東日本橋' },
  { id: 'ENT_04', label: '電話番号',         labelEn: 'PHONE',              value: '080-3070-4748', sub: '受付時間: 10:00〜18:00（土日祝除く）' },
  { id: 'ENT_05', label: 'メールアドレス',   labelEn: 'EMAIL',              value: 'hansayamaha912@gmail.com' },
  { id: 'ENT_06', label: '追加費用',         labelEn: 'ADDITIONAL_FEES',    value: '配送料: 一律 ¥1,000 / コンビニ決済手数料: ¥300' },
  { id: 'ENT_07', label: '引渡時期',         labelEn: 'DELIVERY_TIMELINE',  value: '注文確定後 8〜14営業日以内に発送' },
  { id: 'ENT_08', label: '決済手段',         labelEn: 'PAYMENT_METHODS',    value: 'クレジットカード（即時決済） / 現金振込' },
  { id: 'ENT_09', label: '返品・交換',       labelEn: 'RETURN_POLICY',      value: null },
];

const RETURN_POLICY_LINES = [
  '発送前: キャンセル可',
  '発送後: 未開封に限り 到着後7日以内に限り返品受付',
  '不良品: 弊社負担にて交換対応',
  '返送先: 上記所在地と同一',
];

export default function Policies() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0c' }} />;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0a0a0c', color: '#fff', padding: '80px 20px', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        <header style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '40px' }}>
          <h1 style={{ color: '#00f0ff', fontSize: '1.8rem', letterSpacing: '0.2em', margin: '0 0 10px 0' }}>特定商取引法に基づく表記</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0 }}>COMMERCIAL TRANSACTIONS ACT DISCLOSURE</p>
        </header>

        <div style={{ backgroundColor: '#030305', border: '1px solid rgba(0,240,255,0.2)', borderRadius: '6px', padding: '30px' }}>
          <dl style={{ margin: 0 }}>
            {TOKUSHOHO_ENTRIES.map((entry, index) => (
              <div key={entry.id} style={{ padding: '20px 0', borderBottom: index < TOKUSHOHO_ENTRIES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <dt style={{ fontSize: '0.7rem', color: 'rgba(0,240,255,0.7)', marginBottom: '8px', letterSpacing: '0.1em' }}>
                  [{entry.id}] — {entry.labelEn}
                </dt>
                <dd style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px 16px' }}>{entry.label}:</dd>
                {entry.id === 'ENT_09' ? (
                  <dd style={{ fontSize: '0.9rem', color: '#fff', margin: '8px 0 0 16px' }}>
                    {RETURN_POLICY_LINES.map((line, i) => (
                      <div key={i} style={{ marginBottom: '6px' }}>&gt; {line}</div>
                    ))}
                  </dd>
                ) : (
                  <dd style={{ fontSize: '0.9rem', color: '#fff', margin: '0 0 0 16px' }}>&gt; {entry.value}</dd>
                )}
                {entry.sub && (
                  <dd style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', margin: '6px 0 0 16px' }}>// NOTE: {entry.sub}</dd>
                )}
              </div>
            ))}
          </dl>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>[ RETURN_TO_CORE ]</Link>
        </div>
      </div>
    </main>
  );
}
