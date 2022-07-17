import {
  Box,
  Text,
  Avatar,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import ModalComponent from "./ModalComponent";

export default function UserCard({ data, index }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  function formatDate(input) {
    let datePart = input.match(/\d+/g),
      year = datePart[0].substring(2), // get only two digits
      month = datePart[1],
      day = datePart[2],
      hour = datePart[3],
      minute = datePart[4],
      second = datePart[5];

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  }

  return (
    <>
      <ModalComponent
        data={data}
        isOpen={isOpen}
        onClose={onClose}
      ></ModalComponent>
      <Box
        cursor={"pointer"}
        onClick={onOpen}
        borderRadius={"5px"}
        width={"250px"}
        h={"220px"}
        bgGradient="linear(to-r, #141e30  , #243b55)"
      >
        <Center>
          <Avatar
            textAlign={"center"}
            marginTop={"15px"}
            marginBottom={"15px"}
            src={data.picture.medium}
          />
        </Center>
        <Box marginBottom={"15px"} marginRight={"10px"} marginLeft={"10px"}>
          <Text textAlign={"center"} color={"#fafafa"}>
            {getAge(data.dob.date)} Years Old
          </Text>
          <Text
            textAlign={"center"}
            color={"#fafafa"}
          >{`${data.name.title} ${data.name.first} ${data.name.last}`}</Text>
          <Text textAlign={"center"} fontSize={"14px"} color={"#fafafa"}>
            {data.email}
          </Text>
          <Text textAlign={"center"} color={"#fafafa"}>
            {data.location.state}
          </Text>
          <Text textAlign={"center"} color={"#fafafa"}>
            {}
          </Text>
          <Text textAlign={"center"} color={"#fafafa"}>
            {formatDate(data.dob.date)}
          </Text>
        </Box>
      </Box>
    </>
  );
}
