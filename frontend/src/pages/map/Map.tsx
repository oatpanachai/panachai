import React, { useState, useEffect, useRef } from 'react';
import { Offcanvas, Card } from 'react-bootstrap';
import Logo from './../../assets/biglogoz.png';
import MapImage from './../../assets/map.png'; // นำเข้ารูปแผนผังตลาด
import { ZoomInOutlined, ShopOutlined, ArrowRightOutlined, StarOutlined, LeftOutlined, RightOutlined ,NotificationOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { GetMaps } from '../../services/https';
import { message, Modal, Button } from "antd"; // ใช้ Modal และ Button จาก Ant Design
import './map.css';

interface Map {
  lock_id: string;
  shop_name: string;
  shop_img: string;
  description: string;
  rating: number;
}

//สร้างวันที่
const getFormattedDate = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = (date.getFullYear() + 543).toString();
  return `${day}-${month}-${year}`;
};

// จำนวนแถวและคอลัมน์
const ROWS = 6;
const COLS = 10;

// ฟังก์ชันสร้าง lock_id
const generateLockId = (rowIndex: number, colIndex: number) => {
  const rowLetter = String.fromCharCode(65 + rowIndex);
  const columnNumber = colIndex.toString().padStart(2, '0');
  return `${rowLetter}${columnNumber}`;
};

const Map: React.FC = () => {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate('/reserve');
  };

  const [show, setShow] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Map | null>(null);
  const [messageApi] = message.useMessage();
  const [mapModalVisible, setMapModalVisible] = useState(false); // สถานะการแสดง Modal

  const handleClose = () => setShow(false);
  const handleShow = (shop: Map) => {
    setSelectedShop(shop);
    setShow(true);
  };

  const [map, setMap] = useState<Map[]>([]);

  const getMap = async () => {
    try {
      const res = await GetMaps();
      if (res.status === 200) {
        setMap(res.data);
      } else {
        setMap([]);
        messageApi.open({
          type: "error",
          content: res.data.error || "Error fetching reserves details",
        });
      }
    } catch (error) {
      setMap([]);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลรายละเอียดการจอง",
      });
    }
  };

  useEffect(() => {
    getMap();
  }, []);

  // ฟังก์ชันเลื่อน
  const scrollRow = (rowRef: React.RefObject<HTMLDivElement>, direction: string) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // ฟังก์ชันเปิดป๊อปอัพแผนผังตลาด
  const showMarketMap = () => {
    setMapModalVisible(true);
  };

  const handleMapModalClose = () => {
    setMapModalVisible(false);
  };

  return (
    <>
      <div className="map-container">
      <div className="marquee-container" style={{marginTop: "80px"}}>
        <span className="marquee-text">
          <NotificationOutlined /> อัพเดตล่าสุดวันที่: {getFormattedDate(new Date())} (ตลาดเปิดเวลา: 18:00 - 24:00 น.) 
        </span>
     </div>
        <h2 className="map-title">
          <ShopOutlined /> แผนผังร้านค้าในตลาด
        </h2>

        {/* ปุ่มดูแผนผังตลาดที่มุมขวา */}
        <Button 
          type="primary" 
          icon={<NotificationOutlined />} 
          className="market-map-button" 
          style={{ position: 'absolute', top: '100px', right: '10px' }}
          onClick={showMarketMap}
        >
          ดูแผนผังตลาด
        </Button>

        {Array.from({ length: ROWS }).map((_, rowIndex) => {
          const rowRef = useRef<HTMLDivElement>(null); // ใช้ useRef สำหรับการเลื่อนในแต่ละแถว

          return (
            <div key={rowIndex} className="map-row-container">
              <div className="row-header" style={{ textAlign: 'center', fontWeight: 'bold', alignSelf: 'center' }}>
                โซน: {String.fromCharCode(65 + rowIndex)}
              </div>
              <button className="scroll-button left" style={{marginTop: "80px"}} onClick={() => scrollRow(rowRef, 'left')}>
                <LeftOutlined style={{fontSize: "32px" , color: "white"}}/>
              </button>
              <div ref={rowRef} className="map-row">
                {Array.from({ length: COLS }).map((_, colIndex) => {
                  const lockId = generateLockId(rowIndex, colIndex);
                  const shop = map.find(m => m.lock_id === lockId);

                  return (
                    <div className="cell" key={colIndex}>
                      {shop ? (
                        <Card className="card">
                          <Card.Img variant="top" src={shop.shop_img} alt={shop.shop_name} style={{ height: '100px', objectFit: 'cover' }} />
                          <Card.Body>
                            <Card.Title>{shop.shop_name}</Card.Title>
                            <Card.Text>คะแนน: {shop.rating} <StarOutlined /></Card.Text>
                            <button className='details-button cancel' onClick={() => handleShow(shop)}>
                              <ZoomInOutlined /> เพิ่มเติม
                            </button>
                          </Card.Body>
                        </Card>
                      ) : (
                        <Card className="card">
                          <Card.Img variant="top" src={Logo} style={{ height: '100px', objectFit: 'cover' }} />
                          <Card.Body>
                            <Card.Title>ยังไม่มีร้านค้า</Card.Title>
                            <Card.Text>โปรดติดตาม</Card.Text>
                            <button className='details-button finish'  onClick={handleReserveClick}>
                              <ArrowRightOutlined />ไปจอง
                            </button>
                          </Card.Body>
                        </Card>
                      )}
                    </div>
                  );
                })}
              </div>
              <button className="scroll-button right" style={{marginTop: "80px"}} onClick={() => scrollRow(rowRef, 'right')}>
                <RightOutlined style={{fontSize: '32px', color: 'white'}}/>
              </button>
            </div>
          );
        })}
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedShop?.shop_name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedShop && (
            <>
              <img
                id="pic"
                src={selectedShop.shop_img}
                alt={selectedShop.shop_name}
                style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
              />
              <p>{selectedShop.description}</p>
              <p>คะแนนร้านค้า: {selectedShop.rating}</p>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Modal แสดงแผนผังตลาด */}
      <Modal
        title="แผนผังตลาด"
        visible={mapModalVisible}
        footer={null}
        onCancel={handleMapModalClose}
        width={800}
      >
        <img
          src={MapImage} 
          alt="Market Map" 
          style={{ width: '100%', height: 'auto' }}
        />
      </Modal>
    </>
  );
};

export default Map;
