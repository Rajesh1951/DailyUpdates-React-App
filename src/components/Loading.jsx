import { Box, Spinner } from "@chakra-ui/react";
const Loading = () => {
  return (
    <Box
      position='absolute'
      top='50vh'
      left='35vw'
    >
      <Spinner thickness='5px' style={{ width: '100px', height: '100px' }} color="white" />
    </Box>
  );
};

export default Loading;
