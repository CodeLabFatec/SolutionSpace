import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Task: React.FC<{ task: any; index: any }> = (props) => {
  return (
    <Draggable
      draggableId={`${props.task.request_id}`}
      key={props.task.request_id}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div style={{ display: "flex", justifyContent: "start", padding: 2, backgroundColor: props.task.status.color }}>
            <span>
              <small>
                {props.task.status.status}
                {"  "}
              </small>
            </span>
          </div>
          <div
            style={{ display: "flex", justifyContent: "start", padding: 0 }}
          >
            <TextContent>{props.task.title}</TextContent>
          </div>
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

