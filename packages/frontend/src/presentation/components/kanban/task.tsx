import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// function bgcolorChange(props: any) {
//   return props.isDragging
//     ? "lightgreen"
//     : props.isDraggable
//     ? props.isBacklog
//       ? "#F2D7D5"
//       : "#DCDCDC"
//     : props.isBacklog
//     ? "#F2D7D5"
//     : "#EAF4FC";
// }

const Task: React.FC<{ task: any; index: any }> = (props) => {
  return (
    <Draggable
      draggableId={`${props.task.id}`}
      key={props.task.id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          //   isDragging={snapshot.isDragging}
        >
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                #{props.task.id}
                {"  "}
              </small>
            </span>
          </div>
          <div
            style={{ display: "flex", justifyContent: "start", padding: 0 }}
          >
            <TextContent>{props.task.title}</TextContent>
          </div>
          {/* {provided.placeholder} */}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;

const Container = styled.div`
  border-radius: 10px;
  padding: 8px;
  color: #000;
  margin-bottom: 8px;
  min-height: 90px;
  margin-left: 10px;
  background-color: #d6d5d5;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const TextContent = styled.div`
  justify-content: start;
`;

