import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Styles from "./style.scss";

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
          <div style={{  padding: 0, color: "#4fb4bc"  }}>
            <TextContent>{props.task.title}</TextContent>
          </div>
          <div style={{  padding: 0, color: "#FFF", textAlign: "justify" }}>
            <TextContent>{props.task.description}</TextContent>
          </div>
          <div
            className={Styles.Status}
            style={{ backgroundColor: props.task.status.color }}
          >
              <p>
                {props.task.status.status}
              </p>
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
  margin-left: 10px;
  background-color: #454444;
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const TextContent = styled.div`
  font-size: 13px;
  justify-content: start;
  margin-bottom: 10px;
`;
