import React, { useCallback, useState } from 'react'
import { Text, Box, Center, VStack, useColorModeValue } from 'native-base'
import ThemeToggle from '../components/theme-toggle'
import TaskItem from '../components/task-item'

export default function MainScreen() {
  const [checked, setChecked] = useState(false)
  const handlePressCheckbox = useCallback(() => {
    setChecked(checked => !checked)
  }, [])
  return (
    <Center
      _dark={{ bg: 'blueGray.900' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Box w="full" h="100px">
          <TaskItem
            isDone={checked}
            onToggleCheckbox={handlePressCheckbox}
          ></TaskItem>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}
