/*
 * 页面：总览
 * */

import './Default.css';
import { Column } from '@ant-design/charts';
import { PDFViewer } from '@react-pdf/renderer';
import PDF from '@/component/pdf/PDF';

var data = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];
var config = {
  data: data,
  xField: 'type',
  yField: 'sales',
  label: {
    position: 'middle',
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: { alias: '类别' },
    sales: { alias: '销售额' },
  },
};

export default function Pandect() {
  return (
    <div className={'card'}>
      <Column
        xField="type"
        yField="sales"
        xAxis={{
          label: {
            autoHide: true,
            autoRotate: false,
          },
        }}
        data={data}
        label={{ position: 'middle', style: { fill: '#FFFFFF', opacity: 0.6 } }}
      />
    </div>
  );
}
