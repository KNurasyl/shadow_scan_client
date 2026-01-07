import type { Example } from '../model/constants';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  examples: Example[];
  onPick: (value: string, kind?: Example['kind']) => void;
};

export const ExamplesBar = ({ styles, examples, onPick }: Props) => {
  return (
    <div className={styles.examples}>
      <div className={styles.examplesLabel}>Примеры:</div>
      <div className={styles.examplesRow}>
        {examples.map((ex) => (
          <button
            key={ex.label}
            type="button"
            className={styles.chip}
            onClick={() => onPick(ex.value, ex.kind)}
          >
            {ex.label}
          </button>
        ))}
      </div>
    </div>
  );
};
