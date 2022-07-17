import React, { useCallback, useState } from 'react'
import { Center, VStack, Fab, Icon, useColorModeValue } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import ThemeToggle from '../components/theme-toggle'
import TaskList from '../components/task-list'
import shortid from 'shortid'
const initialData = [
  {
    id: shortid.generate(),
    subject: 'Learn React Native',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Learn TypeScript',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Learn NativeBase',
    done: false
  }
]

export default function MainScreen() {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const index = newData.findIndex(i => i.id === item.id)
      newData[index].done = !newData[index].done
      return newData
    })
  }, [])
  const handleChangeTaskItemSubject = useCallback((item, subject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = newData.findIndex(i => i.id === item.id)
      newData[index].subject = subject
      return newData
    })
  }, [])
  const handleFinishEditingTaskItem = useCallback(_item => {
    setEditingItemId(null)
  }, [])
  const handlePressTaskItemLabel = useCallback(_item => {
    setEditingItemId(_item.id)
  }, [])
  const handleRemoveItem = useCallback(_item => {
    setData(prevData => {
      const newData = prevData.filter(i => i.id !== _item.id)
      return newData
    })
  }, [])
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <VStack space={5} alignItems="center" w="full">
        <TaskList
          data={data}
          onToggleItem={handleToggleTaskItem}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          editingItemId={editingItemId}
        />
        <ThemeToggle />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.500', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: '',
              done: false
            },
            ...data
          ])
          setEditingItemId(id)
        }}
      />
    </Center>
  )
}
