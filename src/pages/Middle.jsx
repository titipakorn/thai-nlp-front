import React, { useState } from 'react';
import { Card, Row, Col, Divider, Button, Input, Icon, Upload, notification } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import ContentNER from '../components/contentNER';
import ContentTCC from '../components/contentTCC';
import { CloseOutlined, CopyOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Dragger } = Upload;
const TYPING_TIMER_LENGTH = 400;
const MAX_TYPING_LENGTH = 5000;
const API_PATH = 'http://go.siitai.xyz:8282/b_api';
var typing = false;
var lastTypingTime;
notification.config({
  placement: 'bottomLeft',
  bottom: 50,
  duration: 2,
});
export default ({ method }) => {
  const [queryInput, setInput] = useState('');
  const [fileList, setFileList] = useState([]);
  const [downloadResult, setDownloadResult] = useState('');
  const [resultShow, setResult] = useState({ ner: '', tcc: '' });

  const methods = (type, str) => {
    var formData = new FormData();
    formData.append('text', str);
    const url = `${API_PATH}/${type}/`;
    return fetch(url, {
      method: 'post',
      mode: 'cors',
      body: formData,
    })
      .catch(error => {
        console.log(error.message);
      })
      .then(results => {
        return results.json();
      })
      .then(data => {
        if (data.status === 'ok') {
          return setResult({ ...resultShow, [type]: data.result });
        } else {
          return setResult({ ...resultShow, [type]: "Something's wrong" });
        }
      });
  };

  const updateTyping = (method, a) => {
    if (!typing) {
      typing = true;
    }
    setInput(a);
    lastTypingTime = new Date().getTime();

    setTimeout(() => {
      var typingTimer = new Date().getTime();
      var timeDiff = typingTimer - lastTypingTime;
      if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
        methods(method, a);
        typing = false;
      }
    }, TYPING_TIMER_LENGTH);
  };

  const copyToClipboard = method => {
    const textField = document.createElement('textarea');
    textField.innerText = resultShow[method];
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
    textField.remove();
    notification.open({
      message: 'Copied!',
    });
  };
  return (
    <Card className="ant-advanced-search-form">
      {method === 'tcc' ? <ContentTCC /> : <ContentNER />}

      <Row type="flex">
        <Col xs={24} md={12}>
          <div style={{ textAlign: 'right', padding: 10 }}>
            {queryInput.length}/{MAX_TYPING_LENGTH}
            <Divider type="vertical" />
            <Button
              onClick={() => {
                setInput('');
                setResult({ ...resultShow, [method]: '' });
              }}
              icon={<CloseOutlined />}
              style={{ marginTop: 10 }}
            />
          </div>
          <Card bordered={false} bodyStyle={{ padding: 0 }}>
            <TextArea
              onChange={a => updateTyping(method, a.target.value)}
              onKeyDown={e => {
                if (queryInput.length > MAX_TYPING_LENGTH && e.keyCode !== 8) {
                  e.preventDefault();
                }
              }}
              onPressEnter={() => {
                methods(method, queryInput);
              }}
              value={queryInput}
              rows={10}
              style={{ padding: 24 }}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ textAlign: 'right', padding: 10 }}>
            <Button
              onClick={() => copyToClipboard(method)}
              disabled={resultShow[method].length > 0 ? false : true}
              icon={<CopyOutlined />}
              style={{ marginTop: 10 }}
            />
          </div>
          <Card
            bordered={false}
            // bodyStyle={{ textAlign: 'left' }}
            className="search-result-list"
          >
            {resultShow[method]}
          </Card>
        </Col>
      </Row>
      <Row type="flex">
        <Col xs={24} md={12}>
          <Dragger
            {...{
              accept: 'text/plain',
              name: 'file',
              multiple: false,
              fileList: fileList,
              action: `${API_PATH}/${method}/`,
              onChange(info) {
                const { status, response, name } = info.file;
                if (status === 'done') {
                  if ('url' in response) {
                    setDownloadResult(`${API_PATH}${response.url}`);
                  }
                  const link = document.createElement('a');
                  link.href = `${API_PATH}${response.url}`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
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
            <p className="ant-upload-hint">Support only .text file</p>
          </Dragger>
        </Col>
        <Col xs={24} md={12}>
          {downloadResult !== '' && (
            <a href={downloadResult}>
              <Card>
                <p style={{ fontSize: 48 }}>
                  <Icon type="download" />
                </p>
              </Card>
            </a>
          )}
        </Col>
      </Row>
    </Card>
  );
};
