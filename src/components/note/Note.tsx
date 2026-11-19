// @ts-expect-error CSS imports are handled by the bundler.
import "./note.css";
import { HandleBottomRight } from "lucide-react";
import { PointerMode } from "../board/NoteBoard";
import { useEffect, useRef, useState } from "react";

export interface INote {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  pointerDown: (
    ev: React.PointerEvent<HTMLDivElement>,
    pointerMode: PointerMode,
  ) => void;
  onTextChange: (id: string, nextText: string) => void;
}

const Note = ({
  id,
  text,
  x,
  y,
  width,
  height,
  pointerDown,
  onTextChange,
}: INote) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [typingEnabled, setTypingEnabled] = useState(false);

  useEffect(() => {
    if (typingEnabled) {
      inputRef.current?.focus();
    }
  }, [typingEnabled]);

  return (
    <div
      id={id}
      className="note"
      onPointerDown={(ev) => {
        ev.stopPropagation();
        pointerDown(ev, "drag");
        setTypingEnabled(true);
      }}
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        width: `${width}px`,
        height: `${height}px`,
        background: "yellow",
        boxSizing: "border-box",
        touchAction: "none",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <input
        value={text}
        className="bare-input"
        type="text"
        name="note-text"
        id={`note-${id}`}
        ref={inputRef}
        onChange={(ev) => {
          onTextChange(id, ev.currentTarget.value);
        }}
      />
      <div
        className="resize-handle"
        style={{
          position: "absolute",
          bottom: "-6px",
          right: "0px",
          cursor: "nwse-resize",
          boxSizing: "border-box",
        }}
        onPointerDown={(ev) => {
          ev.stopPropagation();
          pointerDown(ev, "resize");
        }}
      >
        <HandleBottomRight />
      </div>
    </div>
  );
};

export default Note;
