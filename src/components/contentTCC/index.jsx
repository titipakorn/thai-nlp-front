import React from 'react';
import { Collapse, Icon, Badge, Tag } from 'antd';
const Panel = Collapse.Panel;
export default () => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
      style={{ textAlign: 'left' }}
    >
      <Panel header="Thai Character Cluster (TCC)" key="1">
        <p>
          TCC is the smallest stand-alone character unit by the spelling rules. By recognizing the
          Thai character string in the unit of character cluster, it can reduce the size of search
          space for possible word segmentation positions. Since there is no ambiguity in identifying
          the character cluster boundary, applying the TCC algorithm will not affect the accuracy in
          the higher level language processing.
        </p>
        <Tag color="cyan">Contributor</Tag>
        <div>
          <Badge status="success" text="Prof. Dr. Virach Sornlertlamvanich" />
          <Tag color="blue">@Virach</Tag>
        </div>
        <div>
          <Badge status="success" text="Nannam Aksorn" />
          <a href="https://github.com/NannamAksorn/">
            <Tag color="blue">@NannamAksorn</Tag>
          </a>
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
