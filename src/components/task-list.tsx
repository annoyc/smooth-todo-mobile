import React, { useCallback, useRef } from 'react'
import { AnimatePresence, View } from 'moti'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import TaskItem from './task-item'
import { makeStyledComponent } from '../utils/styled'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
  id: string
  subject: string
  done: boolean
}

interface TaskListProps {
  data: TaskItemData[]
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: TaskItemData
  isEditing: boolean
  onToggleItem: (item: TaskItemData) => void
  onChangeSubject: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemove: (item: TaskItemData) => void
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove,
    simultaneousHandlers
  } = props
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data)
  }, [onToggleItem, data])
  const handleChangeSubject = useCallback(
    subject => {
      onChangeSubject(data, subject)
    },
    [onChangeSubject, data]
  )
  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [onFinishEditing, data])
  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [onPressLabel, data])
  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [onRemove, data])

  return (
    <StyledView
      w="full"
      from={{ opacity: 0, scale: 0.5, marginBottom: -46 }}
      animate={{ opacity: 1, scale: 1, marginBottom: 0 }}
      exit={{ opacity: 0, scale: 0.5, marginBottom: -46 }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        isEditing={isEditing}
        subject={data.subject}
        isDone={data.done}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      ></TaskItem>
    </StyledView>
  )
}

function TaskList(props: TaskListProps) {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem
  } = props
  const refScrollView = useRef(null)

  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
        {data.map(item => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            simultaneousHandlers={refScrollView}
            isEditing={item.id === editingItemId}
            onChangeSubject={onChangeSubject}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  )
}
export default TaskList
