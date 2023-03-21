import { FormSelector } from "@/utils/FormBuilder";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddInput from "./AddInput";
import DropZone from "./DropZone";
import { selectForms, setForms } from "./formSlice";

interface InputListProps {
  items?: Form[];
}

export default function FormList({}: InputListProps) {
  const forms = useSelector(selectForms);
  const dispatch = useDispatch();
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const [dragging, setDragging] = useState(false);

  const handleDragStart = (
    e: React.DragEvent<HTMLLIElement>,
    position: number
  ) => {
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
    dragItem.current = position;
    setDragging(true);
  };

  const handleDragEnter = (
    _e: React.DragEvent<HTMLLIElement>,
    position: number
  ) => {
    dragOverItem.current = position;
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const drop = () => {
    if (dragItem.current !== null || dragOverItem.current !== null) {
      const copyListItems = [...forms];
      const dragItemContent = copyListItems[dragItem.current as number];
      copyListItems.splice(dragItem.current as number, 1);
      copyListItems.splice(dragOverItem.current as number, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      dispatch(setForms(copyListItems));
      setDragging(false);
    }
  };

  const addForm = (input: Form) => {
    dispatch(setForms([...forms, input]));
  };

  return (
    <>
      <form className="input-list">
        <ul>
          {forms.map((item, index) => (
            <li
              id={item.id}
              className="item-list"
              key={item.id}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={drop}
              onDragOver={handleDragOver}
              draggable
            >
              <FormSelector input={item} />
            </li>
          ))}
        </ul>
      </form>
      {dragging && <DropZone onExit={() => setDragging(false)} />}
      <AddInput onSubmit={addForm} />
      <button type="submit" className="success">
        Submit
      </button>
      <style jsx>{`
        .input-list {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          width: 100%;
        }
        ul {
          padding: 0;
        }
        .item-list {
          list-style-type: none;
        }
        .success {
          background-color: var(--color-success);
          border-color: var(--color-success);
        }
      `}</style>
    </>
  );
}
