import React from 'react';
import { Card, Badge, Tag } from 'antd';

export default () => (
  <Card
    title="@2021 API Foundry by Virach Labo team"
    headStyle={{ textAlign: 'center' }}
    bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
  >
    <div style={{ textAlign: 'left', alignSelf: 'center' }}>
      <p>Prof. Dr. Virach Sornlertlamvanich</p>
      <p>Musashino University, Japan</p>
      <p>SIIT, Thammasat University, Thailand</p>
      <p>Email: virach@gmail.com</p>
      <p>
        URL: <a href="https://virach.com">https://virach.com</a>
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
    </div>
  </Card>
);
