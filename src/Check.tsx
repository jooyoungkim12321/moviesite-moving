import { motion } from "framer-motion";
import styled from "styled-components";
import { CheckListState } from "./atoms";
import { useRecoilState } from "recoil";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import React from "react";
import { makeImagePath } from "./api";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 120vh;
`;

const Containers = styled.div`
  position: absolute;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 100px;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  color: ${(props) => props.theme.white};
  font-size: 25px;
`;

const BoxList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  width: 100%;
  height: 200px;
  border-radius: 15px;
`;

const Box = styled.div<{ bgphoto: string }>`
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  background-color: white;
  border-radius: 15px;
`;

function Check() {
  const [lists, Setlists] = useRecoilState(CheckListState);
  const ondragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    // 같은 보드 이동
    if (destination?.droppableId === source.droppableId) {
      Setlists((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }

    // 다른 보드 이동
    if (destination?.droppableId !== source.droppableId) {
      Setlists((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={ondragEnd}>
      <Wrapper>
        <Containers>
          {Object.keys(lists).map((boardId) => (
            <Container>
              <Title>{boardId}</Title>
              <Droppable droppableId={boardId}>
                {(provided) => (
                  <BoxList ref={provided.innerRef} {...provided.droppableProps}>
                    {lists[boardId].slice(0, 5).map((list, index) => (
                      <Draggable
                        key={list.id + ""}
                        draggableId={list.id + ""}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            bgphoto={makeImagePath(list.image, "w500")}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          ></Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </BoxList>
                )}
              </Droppable>
            </Container>
          ))}
        </Containers>
      </Wrapper>
    </DragDropContext>
  );
}

export default React.memo(Check);
