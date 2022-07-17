import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import UserCard from "../components/UserCard";
import axios from "axios";
import Content from "../components/Content";
import { Box, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Doesn't need useEffect because we use getServerSideProps here

export async function getServerSideProps(context) {
  const { data } = await axios.get(
    `https://randomuser.me/api/?page=1&results=10`
  );

  return {
    props: { user: data.results }, // will be passed to the page component as props
  };
}
export default function Home({ user }) {
  return (
    <Box>
      <Content data={user}></Content>
    </Box>
  );
}
