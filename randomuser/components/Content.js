import { Box, Flex, Text, Select } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserCard from "./UserCard";
const countries = [
  "AU",
  `BR`,
  `CA`,
  `CH`,
  `DE`,
  `DK`,
  `ES`,
  `FI`,
  `FR`,
  `GB`,
  `IE`,
  `IR`,
  `NO`,
  `NL`,
  `NZ`,
  `TR`,
  `US`,
];
export default function Content({ data }) {
  // Again w don't to use useEffect to fetch the data because we use getServerSideProps in index.js
  // For select country we dont need useEffect also because data change when select change
  const [country, setCountry] = useState("");
  const [posts, setPosts] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(10);

  const changeCountry = async (value) => {
    const { data } = await axios.get(
      `https://randomuser.me/api/?page=1&results=10&nat=${value}`
    );

    setPosts(data.results);
  };

  const selectCountry = (e) => {
    setCountry(e.target.value);
    changeCountry(e.target.value);
  };

  const getMorePost = async () => {
    const { data } = await axios.get(
      `https://randomuser.me/api/?page=${page}&results=10&nat=${country}`
    );

    setPosts((post) => [...post, ...data.results]);
    setPage(page + 1);
    setLength(length + 10);
  };

  return (
    <>
      <Box margin={"auto"} id="content" w={"600px"}>
        <Text
          marginLeft={"44px"}
          marginBottom={"15px"}
          marginTop={"15px"}
          fontSize={"5xl"}
        >
          Random User
        </Text>
        <Select
          marginLeft={"auto"}
          marginRight={"44px"}
          w={"350px"}
          onChange={(e) => selectCountry(e)}
          placeholder="Select option"
        >
          {countries.map((el) => {
            return (
              <option key={el} value={el}>
                {el}
              </option>
            );
          })}
        </Select>
        <InfiniteScroll
          style={{ margin: "auto", marginTop: "15px" }}
          dataLength={length}
          next={getMorePost}
          hasMore={hasMore}
          loader={<h3> Loading...</h3>}
          endMessage={<h4>Nothing more to show</h4>}
        >
          <Flex
            justify={"center"}
            margin={"auto"}
            gap={"10px"}
            flexDir={"row"}
            flexWrap={"wrap"}
          >
            {posts.map((data, index) => (
              <UserCard data={data} index={index} key={index}></UserCard>
            ))}
          </Flex>
        </InfiniteScroll>
      </Box>
    </>
  );
}
