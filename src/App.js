import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Button,
  VStack,
  Box,
  Text,
  Tag,
  Spinner,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [joke, setJoke] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setJoke({
      joke: `Click "${'Generate'}" to start the random joke`,
      category: 'category',
    });
  }, []);
  async function fetchJokeHandler() {
    setLoading(true);
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    const data = await response.json();

    const isJoke = () => {
      return {
        id: data.id,
        category: data.category,
        joke: data.joke,
      };
    };
    setJoke(isJoke);
    setLoading(false);
  }
  
  return (
    <Container align="center">
      <VStack spacing={4}>
        <Heading>Random Joke Generator</Heading>
        <Button onClick={fetchJokeHandler} colorScheme="blue">
          Generate
        </Button>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" p={2}>
          {loading ? <Spinner size="xl" /> : <RandomJoke joke={joke} />}
        </Box>
      </VStack>
    </Container>
  );
}

export default App;

export const RandomJoke = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      exit={{ opacity: 0 }}
    >
      <Text fontSize="lg">{props.joke.joke}</Text>
      <Tag>{props.joke.category}</Tag>
    </motion.div>
  );
};
// https://v2.jokeapi.dev/joke/Any?type=single
