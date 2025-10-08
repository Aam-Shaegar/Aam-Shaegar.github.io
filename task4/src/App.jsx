import React from "react";
import HeaderBlock from "./Components/HeaderBlock";
import "./App.css";
import { Layout } from "antd";
import { Footer } from "antd/es/layout/layout";
import FooterBlock from "./Components/FooterBlock";
import MainContent from "./Components/MainContent";
export default function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderBlock/>
      <MainContent/>
      <FooterBlock/>
    </Layout>
  );
}
