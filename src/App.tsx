import * as React from "react"
import {
  ChakraProvider,
  theme
} from "@chakra-ui/react"


import TaskManager from './components/TaskManager';

export const App = () => (
  <ChakraProvider theme={theme}>
   <TaskManager />

  </ChakraProvider>
)
