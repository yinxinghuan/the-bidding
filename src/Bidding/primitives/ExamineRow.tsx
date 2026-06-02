import './ExamineRow.less';

interface Item {
  id: string;
  shortLabel: string;
}

interface Props {
  items: Item[];
  onPick: (id: string) => void;
  headLabel: string;       // i18n "docs" / "文档"
}

// Discreet horizontal row of short text labels separated by a thin rule.
// Tapping a label expands the underlying examine card.
// Replaces the old "row of square thumbnails" UX (which confused players —
// the thumbnails read as decorations, not interactive documents).
export default function ExamineRow({ items, onPick, headLabel }: Props) {
  return (
    <div className="bd-examrow">
      <span className="bd-examrow__head" aria-hidden>{headLabel}</span>
      {items.map((it, i) => (
        <span key={it.id} className="bd-examrow__cell">
          {i > 0 && <span className="bd-examrow__sep" aria-hidden>·</span>}
          <button
            className="bd-examrow__btn"
            onPointerDown={(e) => {
              e.preventDefault(); e.stopPropagation();
              onPick(it.id);
            }}
          >{it.shortLabel}</button>
        </span>
      ))}
    </div>
  );
}
