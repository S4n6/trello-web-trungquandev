import  Box  from "@mui/material/Box"
import ListColumns from "./ListColumns/ListColumns"
import { mapOrder } from "~/utils/sorts"
import {DndContext, PointerSensor, useSensor, useSensors, MouseSensor, TouchSensor} from '@dnd-kit/core'
import { useEffect, useState } from "react"
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }){
    const pointerSensor = useSensor(PointerSensor, {activationConstraint: {distance: 10}})
    const mouseSensor = useSensor(MouseSensor, {activationConstraint: {distance: 10}})
    const touchSensor = useSensor(touchSensor, {activationConstraint: {delay: 250, tolerance: 5}})


    const sensors = useSensors(mouseSensor, touchSensor)
    const [orderedColumns, setorderedColumns] = useState([])
    

    useEffect(() => {
      setorderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])
    const handleDragEnd = (eve) => {
      console.log(eve)
      const {active, over} = eve

      if(!over) return

      if(active.id !== over.id){
        const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
        const newIndex = orderedColumns.findIndex(c => c._id === over.id)
        const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // console.log('dndOrderedColumns', dndOrderedColumns)
        setorderedColumns(dndOrderedColumns)
      }

    }
    return (
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          <Box sx={{
            backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
            width:'100%',
            height: theme => theme.trelloCustom.boardContentHeight,
            display:'flex',
            alignItems:'center',
            p: '10px 0',
           
          }}>

            <ListColumns columns={orderedColumns}/>
          
          </Box>
      </DndContext>
        
    )
}

export default BoardContent