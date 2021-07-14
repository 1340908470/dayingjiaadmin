// @ts-nocheck
import React, { Component } from "react";
import * as Echarts from "echarts";
import china from "../../wwwroot/mapJSON/china.json";

interface CityData {
  name: string;
  value: number;
}

interface ChinaMapProps {
  cityData: CityData[];
}

export default class ChinaMap extends Component {
  constructor(props: ChinaMapProps) {
    super(props);
    this.state = { cityData: props.cityData };
  }

  LoadMap(cd: any) {
    let myChart = Echarts.init(
      document.getElementById(this.props.uid) as HTMLElement
    );

    let cityData = cd;

    let name = "china";
    let data = china;
    Echarts.registerMap(name, data);

    let option = {
      visualMap: {
        show: true,
        //设置最大值和最小值
        min: 0,
        max: 50,
        //设置位置
        left: "4%",
        top: "40%",
        text: ["高", "低"], // 文本，默认为数值文本
        calculable: true,
        seriesIndex: [0], //作用在哪个series上
        inRange: {
          color: ["#fddbdb", "#ff0000"], //粉黄
        },
      },

      series: [
        {
          name: "市报名人数",
          type: "map",
          geoIndex: 0,
          data: cityData,
        },
      ],
      backgroundColor: "#fff",
      geo: {
        data: cityData,
        type: "map",
        map: name, //'jiangxi'
        geoIndex: 1,
        zoom: 1.2, //地图的比例
        itemStyle: {
          normal: {
            areaColor: "#fdebeb",
            borderColor: "#ffffff",
          },
          emphasis: {
            areaColor: "#ffffff",
          },
        },
      },
    };

    myChart.setOption(option, true);
  }

  componentDidMount() {
    this.LoadMap(this.props.cityData);
  }

  render() {
    console.log(this.props);
    // @ts-ignore
    if (this.props.cityData && this.props.cityData.length > 0) {
      // @ts-ignore
      this.LoadMap(this.props.cityData);
    }
    // @ts-ignore
    return (
      <div>
        <h1>China map</h1>
        <div id={this.props.uid} style={{ height: "500px", width: "140%" }} />
      </div>
    );
  }
}
