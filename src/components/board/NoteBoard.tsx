import { ReactNode } from "react";

export type PointerMode = "drag" | "resize";

const NoteBoard = ({
  pointerCancel,
  pointerDown,
  pointerUp,
  onDrag,
  children,
}: {
  pointerCancel: (ev: React.PointerEvent<HTMLDivElement>) => void;
  pointerDown: (ev: React.PointerEvent<HTMLDivElement>) => void;
  pointerUp: (ev: React.PointerEvent<HTMLDivElement>) => void;
  onDrag: (ev: React.PointerEvent<HTMLDivElement>) => void;
  children: ReactNode;
}) => {
  return (
    <>
      <style jsx>{`
        .board {
          background-color: #fafafa;
          background-image:
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
          min-width: 1024px;
          min-height: 768px;
          cursor: pointer;
          position: relative;
        }
      `}</style>
      <div
        className="board"
        onPointerDown={pointerDown}
        onPointerUp={pointerUp}
        onPointerMove={onDrag}
        onPointerCancel={pointerCancel}
      >
        {children}
      </div>
    </>
  );
};

export default NoteBoard;
