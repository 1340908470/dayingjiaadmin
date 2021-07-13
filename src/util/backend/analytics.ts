import { EndPoint } from "./index";

interface TestReq {
  Para1: string;
  Para2: number;
}
interface TestRes {
  Para1: boolean;
}

interface PhotoTypeReq {
  begin: string;
  end: string;
}

interface PhotoType {
  tag: string;
  amount: number;
}

interface PhotoTypesRes {
  参赛: number;
  挑战: number;
  圈子: number;
  其他: number;
}

export default {
  PhotoType: {} as PhotoType,
  Test: "" as EndPoint<TestReq, TestRes>,
  PhotoTypes: "analytics/phototype" as EndPoint<PhotoTypeReq, PhotoTypesRes>,
  PhotoTags: "analytics/phototag" as EndPoint<PhotoTypeReq, PhotoType[]>,
};
