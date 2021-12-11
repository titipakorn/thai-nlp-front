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
      <Panel header="Sentence Segmentation (SS)" key="1">
        <p>
          SS is our standard tool for dividing bunches of words into sentences for post processing
          such as sentence classification. The input of this model is words along with their POS
          tags. The output is the sentence dividing by |.
        </p>
        <Tag color="cyan">Contributor</Tag>
        <div>
          <Badge status="success" text="Prof. Dr. Virach Sornlertlamvanich" />
          <Tag color="blue">@Virach</Tag>
        </div>
        <div>
          <Badge status="success" text="Dr.Sumeth Yuenyong" />
          <Tag color="blue">@Sumeth</Tag>
        </div>
        <div>
          <Badge status="success" text="Titipakorn Prakayapan" />
          <Tag color="blue">@Titipakorn</Tag>
        </div>
      </Panel>
      <Panel header="Reference papers" key="2">
        <p>
          Sornlertlamvanich, V., Charoenporn, T., and Isahara, H. (1997). ORCHID: Thai
          Part-Of-Speech Tagged Corpus. Tech. Rep. TR-NECTEC-1997-001, National Electronics and
          Computer Technology Center, Thailand, pp. 5-19.
        </p>
        <p>
          Sornlertlamvanich, V., and Tanaka H. (1996)a. The Automatic Extraction of Open Compounds
          from Text Corpora. The 16th International Conference on Computational Linguistics
          (COLING-96), pp. 1143- 1146.
        </p>
        <p>
          Sornlertlamvanich, V., and Tanaka H. (1996)b. Extracting Open Compounds from Text Corpora.
          The Second Annual Meetings of the Association for Natural Language Processing, pp 213-216.
        </p>
      </Panel>
    </Collapse>
  );
};
