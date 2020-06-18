import React, { useState } from 'react';
import { Card, Button, Upload, Row, Col, Icon, message } from 'antd';
import ContentFER from '../components/contentFER';
import Radar from '../components/Radar';
import test1 from '../assets/prince_2.jpg';
import test2 from '../assets/hap3.jpg';
import logo from '../assets/mu_logo.jpg';
const API_PATH = 'http://go.siitai.xyz:8282/b_api';
const { Dragger } = Upload;

export default () => {
  const [fileList, setFileList] = useState([]);
  const [resultImageShow, setImageResult] = useState('');
  const [ImageUrl, setImageUrl] = useState('');
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const convert_data = data => {
    let new_data = data.map((v, i) => {
      return Object.keys(v).map(emotion => {
        return { item: emotion, user: `u${i}`, score: v[emotion] };
      });
    });
    return new_data.flat();
  };
  const SOLUTION = {
    [test1]: [
      {
        '幸せ(Happy)': 3,
        '嫌気(Disgust)': 0,
        '恐怖(Fear)': 8,
        '悲しみ(Sad)': 0,
        '通常(Neutral)': 86,
        '驚き( Surprise)': 0,
        '怒り(Angry)': 0,
      },
    ],
    [test2]: [
      {
        '幸せ(Happy)': 100,
        '嫌気(Disgust)': 0,
        '恐怖(Fear)': 0,
        '悲しみ(Sad)': 0,
        '通常(Neutral)': 0,
        '驚き( Surprise)': 0,
        '怒り(Angry)': 0,
      },
    ],
  };
  return (
    <Card className="ant-advanced-search-form">
      <ContentFER logo={logo} />
      <Row type="flex">
        <Col xs={24} md={12}>
          <Dragger
            {...{
              accept: 'image/*',
              name: 'file',
              multiple: false,
              fileList: fileList,
              action: `${API_PATH}/fer/`,
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
              <Icon type="inbox" />
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
                <img
                  src={
                    ImageUrl ||
                    'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                  }
                  alt="query"
                  style={{ width: 200, height: 200 }}
                />
              </Col>
              <p style={{ fontSize: 16, fontWeight: 600 }}>Result:</p>
              <p style={{ fontSize: 20, fontWeight: 700 }}>
                {resultImageShow ? (
                  <Radar data={convert_data(resultImageShow)} />
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
