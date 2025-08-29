import React from "react";
import { Layout, Row, Col, Typography, Space, Divider } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  LaptopOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#001529",
        color: "#fff",
        marginTop: "50px",
        padding: "40px 0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <Row gutter={[32, 32]}>
          {/* Thông tin công ty */}
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" size="middle">
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <LaptopOutlined
                  style={{ fontSize: "24px", color: "#1890ff" }}
                />
                <Title level={4} style={{ color: "#fff", margin: 0 }}>
                  DuxShop
                </Title>
              </div>
              <Text style={{ color: "#bfbfbf" }}>
                Chuyên cung cấp laptop chính hãng, uy tín với giá cả cạnh tranh.
                Đảm bảo chất lượng và dịch vụ hậu mãi tốt nhất.
              </Text>
            </Space>
          </Col>

          {/* Danh mục sản phẩm */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: "#fff", marginBottom: "16px" }}>
              Danh mục sản phẩm
            </Title>
            <Space direction="vertical" size="small">
              <Link style={{ color: "#bfbfbf" }} href="#gaming">
                Laptop Gaming
              </Link>
              <Link style={{ color: "#bfbfbf" }} href="#office">
                Laptop Văn phòng
              </Link>
              <Link style={{ color: "#bfbfbf" }} href="#design">
                Laptop Đồ họa
              </Link>
              <Link style={{ color: "#bfbfbf" }} href="#student">
                Laptop Sinh viên
              </Link>
              <Link style={{ color: "#bfbfbf" }} href="#accessories">
                Phụ kiện
              </Link>
            </Space>
          </Col>

          {/* Hỗ trợ khách hàng */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: "#fff", marginBottom: "16px" }}>
              Hỗ trợ khách hàng
            </Title>
            <Space direction="vertical" size="small">
              <Link style={{ color: "#bfbfbf" }} href="#policy">
                Chính sách bảo hành
              </Link>
              <Link style={{ color: "#bfbfbf" }} href="#shipping">
                Chính sách giao hàng
              </Link>
              <Link style={{ color: "#bfbfbf" }} href="#return">
                Chính sách đổi trả
              </Link>
              <Link style={{ color: "#bfbfbf" }} href="#payment">
                Hướng dẫn thanh toán
              </Link>
              <Link style={{ color: "#bfbfbf" }} href="#faq">
                Câu hỏi thường gặp
              </Link>
            </Space>
          </Col>

          {/* Thông tin liên hệ */}
          <Col xs={24} sm={12} md={6}>
            <Title level={5} style={{ color: "#fff", marginBottom: "16px" }}>
              Thông tin liên hệ
            </Title>
            <Space direction="vertical" size="small">
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <PhoneOutlined style={{ color: "#1890ff" }} />
                <Text style={{ color: "#bfbfbf" }}>1900 9999</Text>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <MailOutlined style={{ color: "#1890ff" }} />
                <Text style={{ color: "#bfbfbf" }}>support@duxshop.com</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                }}
              >
                <EnvironmentOutlined
                  style={{ color: "#1890ff", marginTop: "4px" }}
                />
                <Text style={{ color: "#bfbfbf" }}>Hải Châu, Đà Nẵng</Text>
              </div>

              {/* Social Media */}
              <div style={{ marginTop: "16px" }}>
                <Title level={5} style={{ color: "#fff", marginBottom: "8px" }}>
                  Theo dõi chúng tôi
                </Title>
                <Space size="middle">
                  <FacebookOutlined
                    style={{
                      fontSize: "20px",
                      color: "#1890ff",
                      cursor: "pointer",
                    }}
                    onClick={() => window.open("#facebook")}
                  />
                  <InstagramOutlined
                    style={{
                      fontSize: "20px",
                      color: "#1890ff",
                      cursor: "pointer",
                    }}
                    onClick={() => window.open("#instagram")}
                  />
                  <TwitterOutlined
                    style={{
                      fontSize: "20px",
                      color: "#1890ff",
                      cursor: "pointer",
                    }}
                    onClick={() => window.open("#twitter")}
                  />
                  <YoutubeOutlined
                    style={{
                      fontSize: "20px",
                      color: "#1890ff",
                      cursor: "pointer",
                    }}
                    onClick={() => window.open("#youtube")}
                  />
                </Space>
              </div>
            </Space>
          </Col>
        </Row>

        <Divider style={{ borderColor: "#434343", margin: "32px 0 24px 0" }} />

        {/* Copyright */}
        <Row justify="center">
          <Col>
            <Text style={{ color: "#8c8c8c", textAlign: "center" }}>
              © 2025 DuxShop. All rights reserved.
            </Text>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default AppFooter;
