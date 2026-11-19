import { useRef, useState } from "react";
import NoteBoard, { PointerMode } from "./components/board/NoteBoard";
import Note, { INote } from "./components/note/Note";
import ControlPanel from "./components/controlPanel/ControlPanel";
import { Trash } from "lucide-react";

const MIN_WIDTH = 80;
const MIN_HEIGHT = 80;

function App() {
  const [pointerMode, setPointerMode] = useState<PointerMode>();
  const [notes, setNotes] = useState<
    Omit<INote, "pointerDown" | "onTextChange">[]
  >([]);
  const trashRef = useRef<HTMLDivElement | null>(null);
  const selectedNoteId = useRef<string>("");
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const resizeStart = useRef<{
    pointerX: number;
    pointerY: number;
    width: number;
    height: number;
  }>({
    pointerX: 0,
    pointerY: 0,
    width: 200,
    height: 200,
  });
  const onStickySelected = (
    noteId: string,
    ev: React.PointerEvent<HTMLDivElement>,
    mode: PointerMode,
  ) => {
    setPointerMode(mode);
    selectedNoteId.current = noteId;
    ev.currentTarget.setPointerCapture(ev.pointerId);

    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    dragOffset.current = {
      x: ev.clientX - note.x,
      y: ev.clientY - note.y,
    };

    resizeStart.current = {
      pointerX: ev.clientX,
      pointerY: ev.clientY,
      width: note.width,
      height: note.height,
    };
  };
  const onDrag = (ev: React.PointerEvent<HTMLDivElement>) => {
    const activeNoteId = selectedNoteId.current;
    if (!activeNoteId) return;

    if (pointerMode === "resize") {
      const deltaX = ev.clientX - resizeStart.current.pointerX;
      const deltaY = ev.clientY - resizeStart.current.pointerY;

      const nextWidth = Math.max(MIN_WIDTH, resizeStart.current.width + deltaX);
      const nextHeight = Math.max(
        MIN_HEIGHT,
        resizeStart.current.height + deltaY,
      );

      setNotes((currentState) =>
        currentState.map((note) =>
          note.id === activeNoteId
            ? { ...note, width: nextWidth, height: nextHeight }
            : note,
        ),
      );
      return;
    }

    const nextX = ev.clientX - dragOffset.current.x;
    const nextY = ev.clientY - dragOffset.current.y;

    setNotes((currentState) =>
      currentState.map((note) =>
        note.id === activeNoteId ? { ...note, x: nextX, y: nextY } : note,
      ),
    );
  };
  const endDrag = (ev?: React.PointerEvent<HTMLDivElement>) => {
    if (ev && ev.currentTarget.hasPointerCapture?.(ev.pointerId)) {
      ev.currentTarget.releasePointerCapture(ev.pointerId);
    }
    selectedNoteId.current = "";
  };
  const onTextChange = (id: string, value: string) => {
    setNotes((currentState) =>
      currentState.map((note) =>
        note.id === id ? { ...note, text: value } : note,
      ),
    );
  };
  const createNote = () => {
    setNotes((currentState) => [
      ...currentState,
      {
        id: crypto.randomUUID(),
        text: "Write here...",
        x: 0,
        y: 0,
        width: 200,
        height: 200,
      },
    ]);
  };

  return (
    <>
      <section id="center">
        <NoteBoard
          pointerCancel={endDrag}
          pointerDown={(ev) => {}}
          pointerUp={(ev) => {
            selectedNoteId.current = "";
          }}
          onDrag={onDrag}
        >
          <ControlPanel onCreate={createNote} />
          {notes.map((note) => (
            <Note
              key={note.id}
              id={note.id}
              text={note.text}
              x={note.x}
              y={note.y}
              width={note.width}
              height={note.height}
              pointerDown={(ev, pointerMode) => {
                onStickySelected(note.id, ev, pointerMode);
              }}
              onTextChange={onTextChange}
            />
          ))}
          <div
            ref={trashRef}
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
            }}
          >
            <Trash height="3rem" width="3rem" />
          </div>
        </NoteBoard>
      </section>
    </>
  );
}

export default App;
