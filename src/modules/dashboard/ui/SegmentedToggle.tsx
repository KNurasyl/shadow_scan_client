import { cn } from '../../../share/utils/cn';

type Styles = Record<string, string>;

type Props<T extends string> = {
  styles: Styles;
  value: T;
  left: { label: string; value: T };
  right: { label: string; value: T };
  onChange: (v: T) => void;
};

export const SegmentedToggle = <T extends string>({
  styles,
  value,
  left,
  right,
  onChange,
}: Props<T>) => {
  return (
    <div className={styles.segment}>
      <button
        type="button"
        className={cn(styles.segmentBtn, value === left.value && styles.segmentActive)}
        onClick={() => onChange(left.value)}
      >
        {left.label}
      </button>
      <button
        type="button"
        className={cn(styles.segmentBtn, value === right.value && styles.segmentActive)}
        onClick={() => onChange(right.value)}
      >
        {right.label}
      </button>
    </div>
  );
};
