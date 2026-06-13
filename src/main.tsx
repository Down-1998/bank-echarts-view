import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import './lib/echarts';

// 入口只保留全局样式、地图注册和应用挂载，业务逻辑全部下沉到组件层。
ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
