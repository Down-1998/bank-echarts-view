import * as echarts from 'echarts';
import chinaJson from 'china-map-data/china';

// 在应用入口提前注册中国地图，避免各业务图表组件重复注册。
echarts.registerMap('china', chinaJson as never);
