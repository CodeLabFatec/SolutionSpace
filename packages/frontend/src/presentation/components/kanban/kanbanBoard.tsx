import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import Styles from "./style.scss";

export default function KanbanBoard() {
  const [completed, setCompleted] = useState([] as any[]);
  const [incomplete, setIncomplete] = useState([] as any[]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task: any) => task.completed));
        setIncomplete(json.filter((task: any) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

    //REMOVE FROM SOURCE ARRAY

    if (source.droppableId == 2) {
      setCompleted(removeItemById(draggableId, completed));
    } else {
      setIncomplete(removeItemById(draggableId, incomplete));
    }

    // GET ITEM

    const task = findItemById(draggableId, [...incomplete, ...completed]);

    //ADD ITEM
    if (destination.droppableId == 2) {
      setCompleted([{ ...task, completed: !task.completed }, ...completed]);
    } else {
      setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
    }
  };

  function findItemById(id: any, array: any[]) {
    return array.find((item: any) => item.id == id);
  }

  function removeItemById(id: any, array: any[]) {
    return array.filter((item: any) => item.id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={Styles.H1Kanban}>
        <h1>Kanban</h1>
        <hr />
      </div>

      <div className={Styles.colunas}>
        <Column title={"NEW"} tasks={incomplete} id={"1"} />
        <Column title={"ON HOLDING"} tasks={completed} id={"2"} />
        <Column title={"DONE"} tasks={[]} id={"3"} />
      </div>
    </DragDropContext>
  );
}
