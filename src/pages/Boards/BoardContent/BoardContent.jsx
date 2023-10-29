import  Box  from "@mui/material/Box"
import ListColumns from "./ListColumns/ListColumns"
import { mapOrder } from "~/utils/sorts"
import {DndContext, PointerSensor, useSensor, 
  useSensors, MouseSensor, TouchSensor , DragOverlay, 
  defaultDropAnimationSideEffects, closestCorners} from '@dnd-kit/core'
import { useEffect, useState } from "react"
import { arrayMove } from '@dnd-kit/sortable'
import Column from "./ListColumns/Column/Column"
import Card from "./ListColumns/Column/ListCards/Card/Card"
import { cloneDeep } from "lodash"

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }){
    const pointerSensor = useSensor(PointerSensor, {activationConstraint: {distance: 10}})
    const mouseSensor = useSensor(MouseSensor, {activationConstraint: {distance: 10}})
    const touchSensor = useSensor(TouchSensor, {activationConstraint: {delay: 250, tolerance: 5}})


    const sensors = useSensors(mouseSensor, touchSensor)
    const [orderedColumns, setOrderedColumns] = useState([])

    const [activeDragItemId, setActiveDragItemId] = useState(null)
    const [activeDragItemType, setActiveDragItemType] = useState(null)
    const [activeDragItemData, setActiveDragItemData] = useState(null)
    const [oldColumnDraggingCard, setOldColumnDraggingCard] = useState(null)

    

    useEffect(() => {
      setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
    }, [board])

    const findColumnByCardId = (cardId) => {
      return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
    }
      
    const handleDragStart = (eve) => {
      setActiveDragItemId(eve?.active?.id)
      setActiveDragItemType(eve?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
      setActiveDragItemData(eve?.active?.data?.current)
      setOldColumnDraggingCard()
      if( eve?.active?.data?.current?.columnId ){
        setOldColumnDraggingCard(findColumnByCardId(eve?.active?.id))
      }
    }

    const handleDragOver = (eve) => {
      if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

      const {active, over} = eve
      if(!active || !over) return

      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if(!activeColumn || !overColumn) return

      if(activeColumn._id !== overColumn._id){
        setOrderedColumns(prevColumns => {
          const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
          let newCardIndex
          const isBelowOverItem = active.rect.current.translated &&
                active.rect.current.translated.top > over.rect.top + over.rect.height
          const modifier = isBelowOverItem ? 1 : 0;

          newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
          
          const nextColumns = cloneDeep(prevColumns)
          const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
          const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)


          if(nextActiveColumn){
            nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
          }

          if(nextOverColumn){
            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
            nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
          }
            return nextColumns

          })

        
      }

    }

    const handleDragEnd = (eve) => {
      
     

      const {active, over} = eve

      if(!active || !over) return

      console.log('Old Coumn', oldColumnDraggingCard)

      if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD){
        const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
        const { id: overCardId } = over
        const activeColumn = findColumnByCardId(activeDraggingCardId)
        const overColumn = findColumnByCardId(overCardId)
  
        if(!activeColumn || !overColumn) return

        if(oldColumnDraggingCard._id !== overColumn._id){

        } else {
          const oldCardIndex = oldColumnDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
          const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)
          const dndOrderedCards = arrayMove(oldColumnDraggingCard?.cards, oldCardIndex, newCardIndex)
          console.log(dndOrderedCards)
          setOrderedColumns(prevColumns => {
            const nextColumns = cloneDeep(prevColumns)
            const targetColumn = nextColumns.find(c => {
              return c._id === overColumn._id
            })

            targetColumn.cards = dndOrderedCards
            targetColumn.cardOrderIds = dndOrderedCards.map(c => c._id)

            return nextColumns
          })
        }
      }

      if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN){
        if(active.id !== over.id){
          const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
          const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
          const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
          // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
          // console.log('dndOrderedColumns', dndOrderedColumns)
          setOrderedColumns(dndOrderedColumns)
        }
      }

      setActiveDragItemId(null)
      setActiveDragItemType(null)
      setActiveDragItemData(null)
      setOldColumnDraggingCard(null)
    }

    const customDropAnimation = {
      sideEffects: defaultDropAnimationSideEffects({
        styles: {
          active: {
            opacity: 0.5
          }
        }
      })
    }

    return (
      <DndContext 
      onDragEnd={handleDragEnd} 
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      collisionDetection={closestCorners}
      sensors={sensors}
      >
          <Box sx={{
            backgroundColor:(theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2' ),
            width:'100%',
            height: theme => theme.trelloCustom.boardContentHeight,
            display:'flex',
            alignItems:'center',
            p: '10px 0',
           
          }}>

            <ListColumns columns={orderedColumns}/>
            <DragOverlay dropAnimation={customDropAnimation}>
              { !activeDragItemType && null}
              { (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) 
              && <Column column={activeDragItemData}/>}

              { (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) 
              && <Card card={activeDragItemData}/>}

            </DragOverlay>
          </Box>
      </DndContext>
        
    )
}

export default BoardContent