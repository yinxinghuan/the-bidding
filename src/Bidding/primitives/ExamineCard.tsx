import './ExamineCard.less';

interface Props {
  src: string;     // /public-relative URL
  caption: string;
  onClose: () => void;
}

export default function ExamineCard({ src, caption, onClose }: Props) {
  return (
    <div className="bd-examine" onClick={onClose}>
      <div
        className="bd-examine__inner"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <img src={src} alt={caption} className="bd-examine__img" draggable={false} />
        <div className="bd-examine__caption">{caption}</div>
      </div>
      <button
        className="bd-examine__close"
        onClick={onClose}
        aria-label="close"
      >×</button>
    </div>
  );
}
