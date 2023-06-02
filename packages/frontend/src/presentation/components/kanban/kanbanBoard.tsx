import React, { useState, useEffect, useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import Styles from "./style.scss";
import { clearRequestKanban, getAllApprovedRequests, getKanban, updateRequestKanbanColumn } from "@/main/api/api";
import { useAlert } from "@/main/services";
import { AuthContext } from "@/main/contexts/authcontext";

export default function KanbanBoard() {
  
  const [requests,setRequests] = useState([] as any[])
  const [kanban, setKanban] = useState([] as any[])
  const { user } = useContext(AuthContext)
  const alert = useAlert()

  const getKanbanByDestinationId = (id: any) => {
    if(id === 1 || id === '1') return kanban.find((i: any) => i.column === 'NEW')
    if(id === 2 || id === '2') return kanban.find((i: any) => i.column === 'ON HOLDING')
    if(id === 3 || id === '3') return kanban.find((i: any) => i.column === 'DONE')
    return kanban.at(0)
  }

  const loadRequests = async() => {
    try{
      const response = await getAllApprovedRequests(user.user_id)
      const responseKanban = await getKanban()

      setKanban(responseKanban.data)
      setRequests(response.data)
    }catch(e){ /* */}
  }

  useEffect(() => {
    loadRequests()
  }, []);

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if(!destination || !destination.droppableId) return;
    if(!source || !source.droppableId) return;
    if (source.droppableId == destination.droppableId) return;

    //REMOVE FROM SOURCE ARRAY
    const draggable = requests.find((i) => i.request_id === draggableId)
    const destinationId = destination.droppableId

    changeRequestColumn(draggable, destinationId)
  };

  const changeRequestColumn = async (item: any, destinationId: number) => {
    let array = requests.filter((i) => i.request_id !== item.request_id)
    const kanbanAnterior = item.kanban
    const kanbanPosterior = getKanbanByDestinationId(destinationId)
    item.kanban = kanbanPosterior
    array.push(item)
    setRequests(array)

    try{

      await updateRequestKanbanColumn(item.kanban.column, item.request_id)

    }catch(e){ 
      alert.criarAlerta({
        icon: 'error',
        html: 'Ocorreu um erro ao salvar a troca de coluna desse chamado.'
      }).then(r=> {
        item.kanban = kanbanAnterior
        array = requests.filter((i) => i.request_id !== item.request_id)
        array.push(item)
        setRequests(array)
      })
    }

  }

  const limparDone = async (requestsToClean: any[]) => {
    const array = requestsToClean.map((i)=> i.request_id)

    try{
      const response = await clearRequestKanban(array)

      alert.criarAlerta({
        html: response.data
      })
      loadRequests()
    }catch(e){ 
      alert.criarAlerta({
        icon: 'error',
        html: 'Ocorreu um erro ao limpar o kanban.'
      })
    }
  }

  const handleLimpar = (e: any) => {
    e.preventDefault()

    const requestsToClean = requests.filter((i)=> i.kanban.column === 'DONE')
    if(requestsToClean.length > 0){
      limparDone(requestsToClean)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={Styles.H1Kanban}>
        <h1>Kanban</h1>
        <hr />
      </div>

      <div className={Styles.colunas}>
        <Column title={"NEW"} tasks={requests.filter((i)=> i.kanban.column === 'NEW')} id={"1"} />
        <Column title={"ON HOLDING"} tasks={requests.filter((i)=> i.kanban.column === 'ON HOLDING')} id={"2"} />
        <Column title={"DONE"} tasks={requests.filter((i)=> i.kanban.column === 'DONE')} id={"3"} />
      </div>
      {requests.find((i: any) => i.kanban.column === 'DONE') != null ? 
      <><button onClick={handleLimpar} >Limpar</button></> : <></>}
    </DragDropContext>
  );
}
