import { EndPoint } from "./index";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";

interface TestReq {
  Para1: string;
  Para2: number;
}
interface TestRes {
  Para1: boolean;
}

interface DateRangeReq {
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

interface DayAmount {
  日期: string;
  amount: number;
}

interface DataSummary {
  访问人数: number;
  访问次数: number;
  新注册用户数: number;
  老用户回归数: number;
  新作品数: number;
  本年度新增注册用户数: number;
  本年度新增作品数: number;
  累计注册用户数: number;
  累计作品数: number;
}

export default {
  PhotoType: {} as PhotoType,
  Test: "" as EndPoint<TestReq, TestRes>,
  PhotoTypes: "analytics/phototype" as EndPoint<DateRangeReq, PhotoTypesRes>,
  PhotoTags: "analytics/phototag" as EndPoint<DateRangeReq, PhotoType[]>,
  UserAccesses: "analytics/useraccess" as EndPoint<DateRangeReq, DayAmount[]>,
  NewPhotoByDay: "analytics/newphotobyday" as EndPoint<
    DateRangeReq,
    DayAmount[]
  >,
  RegisteredUserByDay: "analytics/registereduserbyday" as EndPoint<
    DateRangeReq,
    DayAmount[]
  >,
  DataSummary: "analytics/datasummary" as EndPoint<DateRangeReq, DataSummary>,
};
