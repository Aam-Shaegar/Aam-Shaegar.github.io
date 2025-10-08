import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Menu } from "antd";

const { Header } = Layout;

export default function HeaderBlock() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const LogoAndTitle = () => (
    <Row
      align="middle"
      style={{
        padding: "12px 0",
        paddingLeft: isMobile ? "0" : "12px",
        backgroundColor: "#d9d9d9",
      }}
    >
      <Col xs={6} sm={6} md={3} lg={2}>
        <img
          src="/imageLogo.png"
          alt="Логотип"
          style={{
            width: 90,
            height: 90,
            objectFit: "contain",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.05)",
            display: "block",
            marginLeft: isMobile ? "12px" : "0"
          }}
        />
      </Col>
      <Col xs={18} sm={18} md={21} lg={22}>
        <h1
          style={{
            fontSize: 36,
            fontWeight: "bold",
            margin: 0,
            color: "#000",
            textAlign: isMobile ? "right" : "left",
            marginRight: isMobile ? "12px" : "0"
          }}
        >
          Задание 4
        </h1>
      </Col>
    </Row>
  );

  const Navigation = () => (
    <div 
      style={{
        backgroundColor: "#d9d9d9",
        paddingRight: isMobile ? 0 : "12px",
        paddingTop: "8px",
        paddingBottom: "14px"
      }}
    >
      <Menu
        mode={isMobile ? "inline" : "horizontal"}
        theme="light"
        style={{
          fontSize: 18,
          fontWeight: "bold",
          backgroundColor: "#d9d9d9",
          borderBottom: "none",
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "flex-end",
          flexDirection: isMobile ? "column" : "row",
          paddingLeft: isMobile ? "24px" : "0",
        }}
      >
        <Menu.Item key="links">Список ссылок</Menu.Item>
        <Menu.Item key="table">Таблица</Menu.Item>
        <Menu.Item key="form">Форма</Menu.Item>
      </Menu>
    </div>
  );

  return (
    <Header style={{ backgroundColor: "#d9d9d9", padding: 0, height: "auto"}}>
      {isMobile ? (
        <>
          <LogoAndTitle />
          <Navigation />
        </>
      ) : (
        <>
          <Navigation />
          <LogoAndTitle />
        </>
      )}
    </Header>
  );
}