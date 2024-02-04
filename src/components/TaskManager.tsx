import React, { useState } from "react"
import {
  Box,
  Text,
  Flex,
  Heading, 
  Input,
  Button
} from "@chakra-ui/react"


interface Task {
  title: string;
  description: string;
}


function TaskManager() {
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [editIndex, setEditIndex] = useState(-1);
  const [editedDescription, setEditedDescription] = useState(''); 


  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };


  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };


  const handleEditTask = (index: number) => {
  const updatedTasks = [...tasks]; 
  updatedTasks[index].description = editedDescription; 
  setTasks(updatedTasks); 
};


  const addTask = () => {
    if(title.trim() !== '' && description.trim() !== ''){
      setTasks((tasks) => [...tasks, { title, description }]);
      setTitle('');
      setDescription('');
  }
};

 

  const deleteTask = (index: number) => {
    const updatedTasks =  tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }



  return(
    <>
    <Box className='Header' p={6}>
     <Flex direction='row' justifyContent='space-between'>
      <Box> 
        <Text color='gray'>
          WPWeb Tasks
        </Text>
      </Box>
          
      <Box>
        <Text>
          Task Manager App by WPWeb Tasks Infotech
        </Text> 
      </Box>
     </Flex>
    </Box>

    <Flex direction="column" align="center">

      <Box className='add-task-box' w='80%' p={2} border='1px' borderColor='gray.200'>
        <Flex direction='column' align='center'>
          <Box className='add-task-title' mb={2}>
           <Heading>
              Add Task
           </Heading> 
          </Box>

           <Box w='70%'>
            <Text m={2}>
              Enter Title
            </Text> 
            <Input
            value={title}
            placeholder='Title'
            onChange={handleTitleChange} 
            />

            <Text m={2}>
              Enter Description
            </Text> 
            <Input 
            value={description}
            placeholder='Description' 
            onChange={handleDescriptionChange} 
            />

            <Button 
            colorScheme='twitter' 
            variant='solid' 
            m={3}
            onClick={addTask}
            >
              Add
            </Button>
          </Box>
        </Flex>
        
      </Box>

      <Box className='Tasks' m='10px' w='80%'>
        {tasks.map((task, index) => (
          <Flex key={index} mt='5px' direction='row' justifyContent='space-between' w='100%'  p={3} shadow='md' borderWidth='1px'> 
            <Flex className="task-text" direction='column' maxWidth="75%">
              <Heading size='md' my={2}>{task.title}</Heading>
              {editIndex === index ? (
                <Input
                  value={editedDescription}
                  placeholder='Edit description'
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              ) : (
                <Text>{task.description}</Text>
              )}
            </Flex>

          <Box className='task-buttons'>
            {editIndex === index ? 
              <Button 
                colorScheme='twitter' 
                variant='solid' 
                m={2}
                onClick={() => {
                  setEditIndex(-1);
                  handleEditTask(index);
                  }}
              >
              Save
              </Button>
              :
              <Button 
                colorScheme='twitter' 
                variant='solid' 
                m={2}
                onClick={() => {
                  setEditIndex(index);
                  setEditedDescription(task.description);
                  }}
              >
              Edit
              </Button>
            }


            <Button 
              colorScheme='red' 
              variant='solid' 
              m={2}
              onClick={() => {
                if(editIndex !== index) deleteTask(index)

                else setEditIndex(-1)
                }
              }
              >
              {editIndex === index ? 'Cancel' : 'Delete' } 
              
            </Button>
          </Box>
          
          </Flex>
          ))
        }
      </Box>


    </Flex> 
    </>
  )
}

export default TaskManager;

