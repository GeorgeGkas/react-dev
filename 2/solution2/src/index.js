import React from 'react';
import ReactDOM from 'react-dom';

import { Councillors } from './components/Councillors'

ReactDOM.render(
  <React.StrictMode>
    <Councillors />
    {/* <Councils /> */}
    {/* <Affairs /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
