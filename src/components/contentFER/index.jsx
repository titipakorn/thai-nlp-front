import React from 'react';
import { Collapse, Badge, Tag, Row, Typography } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Title } = Typography;
const Panel = Collapse.Panel;
export default props => {
  const { logo } = props;

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
    >
      <Row style={{ textAlign: 'center' }}>
        <img src={logo} width="240" height="200" />
        <Title level={3}>“See you, see happy” 顔感情認識で表情を推定して“幸せ“の近さの可視化</Title>
      </Row>
      <Panel header="Facial Expression Recognition" key="1">
        <p>
          Facial expression recognition plays an important role in communicating the emotions and
          intentions of human beings.
        </p>
        <Tag color="cyan">Contributor</Tag>
        <div>
          <Badge status="success" text="Prof. Dr. Virach Sornlertlamvanich" />
          <Tag color="blue">@Virach</Tag>
        </div>
        <div>
          <Badge status="success" text="Titipakorn Prakayapan" />
          <a href="https://github.com/titipakorn/">
            <Tag color="blue">@Titipakorn</Tag>
          </a>
        </div>
        <div>
          <Badge status="success" text="表情推定：柳瀬 愛里、李 鳳桐、嘉村勇輝　" />
        </div>
        <div>
          <Badge
            status="success"
            text="距離計算：新田 拓真、宮川 季己、嘉村勇輝、立津 尚也、中村 洋太"
          />
        </div>
        <div>
          <Badge status="success" text="資料作成：木内瑠一、萩本新平" />
        </div>
      </Panel>
      <Panel header="Reference papers" key="2"></Panel>
    </Collapse>
  );
};
