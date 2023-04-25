export interface ChartLineData {
  tooltip: {
    trigger: "axis";
  };
  title: {
    text: string;
  };
  grid: {
    left: string;
    right: string;
    bottom: string;
    containLabel: boolean;
  };
  xAxis: {
    type: "category";
    data: string[];
    axisLabel: {
      interval: number;
    };
  };
  yAxis: {
    type: "value";
    minInterval?: number; // 增加了一个可选的属性 "minInterval"
    axisLabel: {
      formatter: string;
    };
  };
  series: {
    data: number[];
    type: "line";
    smooth: boolean;
  }[];
}

export interface ChartLineData2 {
  tooltip: {
    trigger: "axis";
  };
  title: {
    text: string;
  };
  xAxis: {
    type: "category";
    data: string[];
  };
  yAxis: {
    type: "value";
  };
  series: {
    data: number[];
    type: "line";
    smooth: boolean;
  }[];
}
