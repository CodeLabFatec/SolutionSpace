import React from "react";
import styled from "styled-components";
import Task from "./task";
import Styles from "./style.scss";
import { Droppable } from "react-beautiful-dnd";

const Column: React.FC<{ title: any; tasks: any; id: any }> = (props) => {
  return (
    <Container className={Styles.column}>
      <Title className={Styles.title}>{props.title}</Title>
      <Droppable droppableId={props.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.tasks.map((task: any, index: any) => (
              <Task key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
};

export default Column;

const Container = styled.div`
  background-color: #333333;
  border-radius: 10px;
  width: 300px;
  height: 530px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Title = styled.h3`
  padding: 8px;
  background-color: #333333;
  text-align: center;
  color: #4FB4BC;
`;

const TaskList = styled.div`
  padding: 3px;
  transistion: background-color 0.2s ease;
  background-color: #333333;
  flex-grow: 1;
  min-height: 100px;
`;
