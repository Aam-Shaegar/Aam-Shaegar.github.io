import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default function FooterBlock() {
  return (
    <Footer 
      style={{ 
        backgroundColor: "#d9d9d9", 
        color: "#000", 
        padding: "14px 12px",
        textAlign: "left"
      }}
    >
      <p style={{ margin: 0 }}>© Aam-Shaegar 2025</p>
    </Footer>
  );
}