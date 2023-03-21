import { useRef } from "react";
import { useDispatch } from "react-redux";
import { removeById } from "./formSlice";

interface DropZoneProps {
  onExit: () => void;
}

export default function DropZone({ onExit }: DropZoneProps) {
  const dispatch = useDispatch();
  let ref = useRef<NodeJS.Timeout>(null);
  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    console.log("leave", e.dataTransfer.getData("text/plain"));
    dispatch(removeById(e.dataTransfer.getData("text/plain")));
    onExit();
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <article
        onDragLeave={handleDragLeave}
        onDrop={handleDragLeave}
        onDragOver={handleDragOver}
        draggable
        className="dropzone"
      >
        Delete
      </article>
      <style jsx>{`
        .dropzone {
          margin: 0 auto;
          margin-bottom: 1rem;
          width: 100%;
          border: 2px dashed #d81b60;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }
      `}</style>
    </>
  );
}
