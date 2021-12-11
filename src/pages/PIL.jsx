import React, { useState } from 'react';
import { Card, Button, Upload, Row, Col, Icon, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ContentPILL from '../components/contentPILL';
import test1 from '../assets/222371.jpg';
import test2 from '../assets/223370.jpg';
const { Dragger } = Upload;
const SOLUTION = { [test1]: 'madiplot', [test2]: 'apolets' };
const MEDICAL_INFO = {
  'harnal ocas': {
    picture: 'DB00001',
    usage: 'โรคต่อมลูกหมากโต',
    effect: 'คลายกล้ามเนื้อของต่อมลูกหมากและของกระเพาะปัสสาวะ',
    medical_name: 'Tamsulosin hydrochloride',
    trade_mark: 'Harnal OCAS',
    manufacturer: 'Astellas Pharma',
  },
  zimmex: {
    picture: 'DB00501',
    usage: 'โรคหัวใจ',
    effect: 'ลดไขมันในหลอดเลือด',
    medical_name: 'Simvastatin',
    trade_mark: 'Zimmex',
    manufacturer: 'Silom Medical',
  },
  madiplot: {
    picture: 'DB01001',
    usage: 'โรคความดัน',
    effect: 'ลดความดันโลหิต',
    medical_name: 'Manidipine',
    trade_mark: 'Madiplot',
    manufacturer: 'Takeda',
  },
  ambes: {
    picture: 'DB01501',
    usage: 'โรคความดัน',
    effect: 'ลดความดันโลหิต',
    medical_name: 'Amlodipine',
    trade_mark: 'Ambes',
    manufacturer: 'GPO',
  },
  apolets: {
    picture: 'DB02001',
    usage: 'โรคหัวใจ',
    effect: 'ป้องกันการอุดตันของหลอดเลือด',
    medical_name: 'Clopidogrel',
    trade_mark: 'Apolets',
    manufacturer: 'Apotex',
  },
  sandos: {
    picture: 'DB02501',
    usage: 'โรคเบาหวาน',
    effect: 'ลดคอเลสเตอรอล',
    medical_name: 'Rosuvastatin',
    trade_mark: 'Rosuvastatin Sandoz',
    manufacturer: 'Sandoz',
  },
  vitabon: {
    picture: 'DB03001',
    usage: 'โรคเบาหวาน',
    effect: 'บำรุงประสาท',
    medical_name: 'Thiamin disulfate Pyridoxine HCL Cyanocobalamin',
    trade_mark: 'Vitabion',
    manufacturer: 'Unison',
  },
  millimed: {
    picture: 'DB03501',
    usage: 'โรคกระดูกพรุน',
    effect: 'บำรุงกระดูก',
    medical_name: 'Calcium Carbonat',
    trade_mark: 'Caltab',
    manufacturer: 'Millimed',
  },
  fosamax: {
    picture: 'DB04000',
    usage: 'โรคกระดูกพรุน',
    effect: 'ป้องกันโรคกระดูกพรุน',
    medical_name: 'Alendronate',
    trade_mark: 'Fosamax Plus',
    manufacturer: 'บริษัท เอ็มเอสดี (ประเทศไทย) จำกัด',
  },
  calcifefol: {
    picture: 'DB04501',
    usage: 'โรคกระดูกพรุน',
    effect: 'รักษาโรคกระดูกอ่อน',
    medical_name: 'Vitamin D2 หรือ  Ergocalciferol',
    trade_mark: 'Calciferol Capsules',
    manufacturer: 'British Dispensary (L.P.)',
  },
  miformin: {
    picture: 'DB05001',
    usage: 'โรคเบาหวาน',
    effect: 'ยารักษาโรคเบาหวานชนิด 2',
    medical_name: 'Metformin',
    trade_mark: 'Miformin',
    manufacturer: 'บริษัท เกร๊ทเตอร์ฟาร์ม่า จำกัด',
  },
  anapril: {
    picture: 'DB05501',
    usage: 'โรคความดัน',
    effect: 'ต้านการบีบตัวของหลอดเลือดแดง',
    medical_name: 'Enalapril Maleate',
    trade_mark: 'Analapril',
    manufacturer: 'Berlin Pharm',
  },
  amlopine: {
    picture: 'DB06001',
    usage: 'โรคความดัน',
    effect: 'ลดความดันโลหิต',
    medical_name: 'Amlodipine',
    trade_mark: 'Amlopine',
    manufacturer: 'Berlin Pharm',
  },
  prenolol: {
    picture: 'DB06501',
    usage: 'โรคหัวใจ',
    effect: 'รักษาโรคหัวใจ',
    medical_name: 'Atenolol หรือ Prenolol',
    trade_mark: 'Prenolol',
    manufacturer: 'Berlin Pharm',
  },
};

export default () => {
  const [fileList, setFileList] = useState([]);
  const [resultImageShow, setImageResult] = useState('');
  const [ImageUrl, setImageUrl] = useState('');
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  return (
    <Card className="ant-advanced-search-form">
      <ContentPILL />
      <Row type="flex">
        <Col xs={24} md={12}>
          <Dragger
            {...{
              accept: 'image/*',
              name: 'file',
              multiple: false,
              fileList: fileList,
              action: `${osaka_api}/b_api/pill/`,
              onChange(info) {
                const { status, response, name, originFileObj } = info.file;
                if (status === 'done') {
                  if ('status' in response) {
                    if (response.status === 'ok') {
                      setImageResult(response.result);
                      getBase64(originFileObj, imageUrl => setImageUrl(imageUrl));
                    }
                  }
                  message.success(`${name} file processed successfully.`);
                } else if (status === 'error') {
                  message.error(`${name} file processed failed.`);
                }
                let fileList = [...info.fileList];

                // 1. Limit the number of uploaded files
                // Only to show two recent uploaded files, and old ones will be replaced by the new
                fileList = fileList.slice(-1);

                // 2. Read from response and show file link
                fileList = fileList.map(file => {
                  if (file.response) {
                    // Component will show file.url as link
                    file.url = file.response.url;
                  }
                  return file;
                });

                setFileList(fileList);
              },
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support only image file</p>
          </Dragger>
        </Col>
        <Col xs={24} md={12}>
          <Row>
            <Col>
              <Button
                block
                onClick={() => {
                  setImageUrl(test1);
                  setImageResult('');
                }}
              >
                Example 1
              </Button>
            </Col>
            <Col>
              <Button
                block
                onClick={() => {
                  setImageUrl(test2);
                  setImageResult('');
                }}
              >
                Example 2
              </Button>
            </Col>
          </Row>
          <Card bordered={false} className="search-result-list">
            <div>
              <Col style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 16, fontWeight: 600 }}>Image</p>
                <img
                  src={
                    ImageUrl ||
                    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                  }
                  alt="query"
                  style={{ width: 250, height: 250 }}
                />
              </Col>
              <p style={{ fontSize: 16, fontWeight: 600 }}>Result:</p>
              <p style={{ fontSize: 20, fontWeight: 700 }}>
                {resultImageShow ? (
                  <span>
                    <p>ยาใช้สำหรับ: {MEDICAL_INFO[resultImageShow].usage}</p>
                    <p>สรรพคุณ: {MEDICAL_INFO[resultImageShow].effect}</p>
                    <p>ชื่อสามัญ: {MEDICAL_INFO[resultImageShow].medical_name}</p>
                    <p>ชื่อการค้า: {MEDICAL_INFO[resultImageShow].trade_mark}</p>
                    <p>ผู้ผลิต: {MEDICAL_INFO[resultImageShow].manufacturer}</p>
                  </span>
                ) : ImageUrl ? (
                  <Button onClick={() => setImageResult(SOLUTION[ImageUrl])}> Identify it </Button>
                ) : (
                  'Please upload the image'
                )}
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
