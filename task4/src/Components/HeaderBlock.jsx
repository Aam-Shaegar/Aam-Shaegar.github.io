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

  return (
    <Header style={{ backgroundColor: "#d9d9d9", padding: 0 }}>
      {/* Внешний Row - создает структуру сетки на всю ширину */}
      <Row style={{ backgroundColor: "#d9d9d9" }}>
        {/* Offset колонки - создают отступ слева, как у Main */}
        <Col xs={1} sm={2} md={3} lg={4} xl={5} />
        
        {/* Контентная область - точно такая же ширина как у Main */}
        <Col xs={22} sm={20} md={18} lg={16} xl={14}>
          {/* Внутренний Row с логотипом и заголовком */}
          <Row align="middle" style={{ padding: "12px 0" }}>
            <Col xs={6} sm={4} md={3} lg={2}>
              <img
                src="/imageLogo.png"
                alt="Логотип"
                style={{
                  width: 90,
                  height: 90,
                  objectFit: "contain",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.05)",
                  display: "block"
                }}
              />
            </Col>
            <Col xs={18} sm={20} md={21} lg={22} style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontSize: 36,
                  fontWeight: "bold",
                  margin: 0,
                  color: "#000",
                }}
              >
                Задание 4
              </h1>
            </Col>
          </Row>
        </Col>
        
        {/* Offset колонки справа - балансируют отступ */}
        <Col xs={1} sm={2} md={3} lg={4} xl={5} />
      </Row>

      {/* Меню остается на всю ширину экрана */}
      <Menu
        mode={isMobile ? "inline" : "horizontal"} 
        theme="light"
        style={{
          fontSize: 18,
          fontWeight: "bold",
          backgroundColor: "#d9d9d9",
          borderBottom: "none",
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "center",
          flexDirection: isMobile ? "column" : "row",
          paddingLeft: isMobile ? "24px" : "0",
        }}
      >
        <Menu.Item key="links">Список ссылок</Menu.Item>
        <Menu.Item key="table">Таблица</Menu.Item>
        <Menu.Item key="form">Форма</Menu.Item>
      </Menu>
    </Header>
  );
}