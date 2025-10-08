import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import LinksSection from "./LinksSection";
import TableSection from "./TableSection";
import FormSection from "./FormSection";

export default function MainContent() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); 

  return (
     <main style={{ backgroundColor: "#fff", padding: "14px 0"}}>
  
      <Row gutter={0}>

        <Col xs={1} sm={2} md={3} lg={4} xl={5} />

        <Col xs={22} sm={20} md={18} lg={16} xl={14}>

          <Row gutter={[0, 12]}>

            {isMobile ? (
              <>
                <Col span={24}>
                  <TableSection />
                </Col>
                <Col span={24}>
                  <LinksSection />
                </Col>
                <Col span={24}>
                  <FormSection />
                </Col>
              </>
            ) : (
              <>
                <Col span={24}>
                  <LinksSection />
                </Col>
                <Col span={24}>
                  <TableSection />
                </Col>
                <Col span={24}>
                  <FormSection />
                </Col>
              </>
            )}
          </Row>
        </Col>


        <Col xs={1} sm={2} md={3} lg={4} xl={5} />
      </Row>
    </main>
  );
}