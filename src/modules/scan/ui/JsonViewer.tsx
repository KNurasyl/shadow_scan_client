import styles from '../Scan.module.css';

type Props = {
  value: unknown;
  title?: string;
  defaultOpen?: boolean;
};

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function preview(v: unknown): string {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';
  if (typeof v === 'string') return v.length > 80 ? `${v.slice(0, 80)}…` : v;
  if (typeof v === 'number' || typeof v === 'boolean') return String(v);
  if (Array.isArray(v)) return `Array(${v.length})`;
  if (isPlainObject(v)) return `Object(${Object.keys(v).length})`;
  return String(v);
}

export const JsonViewer = ({ value, title, defaultOpen }: Props) => {
  if (value === undefined) {
    return <div className={styles.hint}>—</div>;
  }

  const renderNode = (v: unknown, path: string) => {
    if (Array.isArray(v)) {
      return (
        <details open={defaultOpen} style={{ marginBottom: 8 }}>
          <summary className={styles.mono}>
            {path || 'array'}: {preview(v)}
          </summary>
          <div style={{ paddingLeft: 14, marginTop: 8 }}>
            {v.map((item, i) => (
              <div key={`${path}[${i}]`} style={{ marginBottom: 6 }}>
                {renderNode(item, `${path}[${i}]`)}
              </div>
            ))}
          </div>
        </details>
      );
    }

    if (isPlainObject(v)) {
      const keys = Object.keys(v);
      return (
        <details open={defaultOpen} style={{ marginBottom: 8 }}>
          <summary className={styles.mono}>
            {path || 'object'}: {preview(v)}
          </summary>
          <div style={{ paddingLeft: 14, marginTop: 8 }}>
            {keys.map((k) => (
              <div key={`${path}.${k}`} style={{ marginBottom: 6 }}>
                <span className={styles.mono}>{k}</span>
                {': '}
                {renderNode(v[k], path ? `${path}.${k}` : k)}
              </div>
            ))}
          </div>
        </details>
      );
    }

    return <span className={styles.mono}>{preview(v)}</span>;
  };

  return (
    <div>
      {title && <div className={styles.gptTextTitle}>{title}</div>}
      <div className={styles.code}>{renderNode(value, '')}</div>
    </div>
  );
};
