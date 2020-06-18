import React from 'react';
import { Collapse, Badge, Tag } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const Panel = Collapse.Panel;
export default () => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ textAlign: 'left' }}
    >
      <Panel header="Pill Recognition" key="1">
        <p>
          Pill Recognition is a classification model of medicine packages for eldery people. The
          model has the Inception deep learning architecture. With Inception-V3, the accuracy is
          achieved 92.75%.
        </p>
        <Tag color="cyan">Contributor</Tag>
        <div>
          <Badge status="success" text="Prof. Dr. Virach Sornlertlamvanich" />
          <Tag color="blue">@Virach</Tag>
        </div>
        <div>
          <Badge status="success" text="Asst.Prof. Narit Hnoohom" />
          <Tag color="blue">@Narit</Tag>
        </div>
        <div>
          <Badge status="success" text="Titipakorn Prakayapan" />
          <a href="https://github.com/titipakorn/">
            <Tag color="blue">@Titipakorn</Tag>
          </a>
        </div>
      </Panel>
      <Panel header="Reference papers" key="2">
        <p>
          N. Hnoohom, S. Yuenyong and P. Chotivatunyu, "MEDiDEN: Automatic Medicine Identification
          Using a Deep Convolutional Neural Network," 2018 International Joint Symposium on
          Artificial Intelligence and Natural Language Processing (iSAI-NLP), Pattaya, Thailand,
          2018, pp. 1-5.
        </p>
      </Panel>
    </Collapse>
  );
};
