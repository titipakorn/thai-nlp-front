import React from 'react';
import { Collapse, Table, Card, Badge, Tag } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const Panel = Collapse.Panel;
//Merge array cells
const createNewArr = data => {
  return data
    .reduce((result, item) => {
      //First, take the name field as a new array result
      if (result.indexOf(item.name) < 0) {
        result.push(item.name);
      }
      return result;
    }, [])
    .reduce((result, name) => {
      //Take the data with the same name as a new array, and add a new field * * rowSpan inside it**
      const children = data.filter(item => item.name === name);
      result = result.concat(
        children.map((item, index) => ({
          ...item,
          rowSpan: index === 0 ? children.length : 0, //Add the first row of data to the rowSpan field
        })),
      );
      return result;
    }, []);
};
const data = [
  {
    key: '0',
    category: 'Date',
    format: 'B-DAT',
    description: 'Beginning of a date',
    example: 'วันที่ (Date)',
  },
  {
    key: '1',
    category: 'Date',
    format: 'I-DAT',
    description: 'Inside of a date',
    example: '14 กุมภาพันธ์ (February 14)',
  },
  {
    key: '2',
    category: 'Location',
    format: 'B-LOC',
    description: 'Beginning of a location name',
    example: 'เมือง (City)',
  },
  {
    key: '3',
    category: 'Location',
    format: 'I-LOC',
    description: 'Inside of a location name',
    example: 'นิวยอร์ค (New York)',
  },
  {
    key: '4',
    category: 'Measurement',
    format: 'B-MEA',
    description: 'Beginning of a measurement name',
    example: 'ห้า (Five)',
  },
  {
    key: '5',
    category: 'Measurement',
    format: 'I-MEA',
    description: 'Inside of a measurement name',
    example: 'เล่ม (Books)',
  },
  {
    key: '6',
    category: 'Date',
    format: 'I-DAT',
    description: 'Inside of a date',
    example: '14 กุมภาพันธ์ (February 14)',
  },
  {
    key: '7',
    category: 'Name',
    format: 'B-NAM',
    description:
      'Beginning of any proper name except location, person, and organization names, e.g., name of competition, name of position, etc.',
    example: 'ศึก (League)',
  },
  {
    key: '8',
    category: 'Date',
    format: 'I-NAM',
    description: 'Inside of any proper name',
    example: 'ลาลีกา (La Liga)',
  },
  {
    key: '9',
    category: 'Organization',
    format: 'B-ORG',
    description: 'Beginning of an organization name',
    example: 'บริษัท (Corp.)',
  },
  {
    key: '10',
    category: 'Organization',
    format: 'I-ORG',
    description: "Inside of an organization's name",
    example: 'โตโยต้า มอเตอร์ (Toyota Motor)',
  },
  {
    key: '11',
    category: 'Person',
    format: 'B-PER',
    description: 'Beginning of a person name',
    example: 'นาย (Mister)',
  },
  {
    key: '12',
    category: 'Organization',
    format: 'I-PER',
    description: "Inside of a person's name",
    example: 'ณัฐวุฒิ สะกิดใจ (Natthawut Sakidjai)',
  },
  {
    key: '13',
    category: 'Time',
    format: 'B-TIM',
    description: 'Beginning of a time',
    example: 'สิบ (Ten)',
  },
  {
    key: '14',
    category: 'Time',
    format: 'I-TIM',
    description: 'Inside of a time',
    example: 'นาฬิกา (O’clock)',
  },
  {
    key: '15',
    category: 'Other',
    format: 'O',
    description: 'Word does not belong to any type of entity',
    example: '',
  },
];
const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render(_, row) {
      return {
        children: row.category,
        props: {
          rowSpan: row.rowSpan,
        },
      };
    },
  },
  {
    title: 'Format',
    dataIndex: 'format',
    key: 'format',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Example',
    dataIndex: 'example',
    key: 'example',
  },
];
export default () => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ textAlign: 'left' }}
    >
      <Panel header="Named Entity Recognition (NER) for Thai" key="1">
        <p>
          Dataset: BKD20
          {/* (
          <a href="https://drive.google.com/open?id=18MfHqimIb7J24uYJ_LtW_xLFggaJK7Rf">
            <Icon type="download" />
            Click Here to download
          </a>
          ) */}
        </p>
        <img
          alt="CC-BY-SA"
          style={{ width: 150, height: 50 }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/CC-BY-SA_icon.svg/440px-CC-BY-SA_icon.svg.png"
        />

        <p style={{ fontSize: 18, fontWeight: 800 }}>
          Attribution-ShareAlike
          <br />
          CC BY-SA
        </p>
        <p>Citation:</p>
        <p>
          Any publications or works based on this corpus should make a reference to the following
          published paper.
        </p>
        <p>
          Suriyachay, K., Charoenporn, T., and Sornlertlamvanich, V. (2019). Thai Named Entity
          Tagged Corpus Annotation Scheme and Self Verification. The 9th Language and Technology
          Conference (LTC2019).
        </p>

        <p>
          This corpus is designed and constructed based on the annotation scheme proposed in ORCHID
          corpus construction, which is the first open online Thai POS Tagged corpus. The corpus is
          disjointedly managed in seven types of entities: DATe, LOCation, MEAsurement, NAMe,
          ORGanization, PERson, TIMe, where each category is abbreviated by its first three
          characters and one another category (Other). The BIO annotation scheme is used for this
          corpus.
        </p>
        <p>BIO annotation scheme:</p>
        <p>  &nbsp;&nbsp;&nbsp;&nbsp; B - The beginning of a word</p>
        <p>  &nbsp;&nbsp;&nbsp;&nbsp; I - The inside of a word</p>
        <p>  &nbsp;&nbsp;&nbsp;&nbsp; O - The word does not belong to any type of entities</p>

        <Table
          columns={columns}
          dataSource={createNewArr(data)}
          pagination={{ pageSize: 20, hideOnSinglePage: true }}
        />
        <p>
          In the corpus, a format of the data is generally composed of three components separated by
          a tab for each line. The first component is a word. The second component is part of speech
          (POS) of the word. The last component is a category or tag of the word in the same line.
          Some lines consist of only one part which is EOS, indicating the end of a sentence.
        </p>
        <p>Example labeled data in location corpus file: </p>
        <Card size="small" style={{ width: 200 }}>
          {`
          สหรัฐอเมริกา/NPRP/B-LOC\n
<space>/PUNC/O\n
ญี่ปุ่น/NPRP/B-LOC\n
<space>/PUNC/O\n
สหภาพ/NPRP/B-LOC\n
ยุโรป/NPRP/I-LOC\n
<space>/PUNC/O\n
อาเซียน/NCMN/B-LOC\n
<space>/PUNC/O\n
ลดลง/VSTA/O\n
เฉลี่ย/VACT/O\n
<space>/PUNC/O\n 
28.2/DCNM/O`
            .split('\n')
            .map((v, i) => (
              <p key={i}>{v}</p>
            ))}
        </Card>
        <Tag color="cyan">Contributor</Tag>
        <div>
          <Badge status="success" text="Prof. Dr. Virach Sornlertlamvanich" />
          <Tag color="blue">@Virach</Tag>
        </div>
        <div>
          <Badge status="success" text="Kitiya Suriyachay" />
          <a href="https://github.com/beekitiya/">
            <Tag color="blue">@BeeKitiya</Tag>
          </a>
        </div>
        <div>
          <Badge status="success" text="Titipakorn Prakayapan" />
          <a href="https://github.com/titipakorn/">
            <Tag color="blue">@Titipakorn</Tag>
          </a>
        </div>
      </Panel>
      <Panel header="Reference papers" key="2">
        {/* <p>
          Suriyachay, K., and Sornlertlamvanich, V. (2018). Named Entity Recognition Modeling for
          the Thai Language from a Disjointedly Labeled Corpus. The 5th International Conference on
          Advanced Informatics: Concept Theory and Applications (ICAICTA).
        </p> */}
        <p>
          Suriyachay, K., Charoenporn, T., and Sornlertlamvanich, V. (2019). Thai Named Entity
          Tagged Corpus Annotation Scheme and Self Verification. The 9th Language and Technology
          Conference (LTC2019).
        </p>
      </Panel>
    </Collapse>
  );
};
