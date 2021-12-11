import React from 'react';
import Middle from './Middle';
export default () => <Middle method="ws" customUrl={`${osaka_api}/nlp_api/wordpos_tokenize`} />;
