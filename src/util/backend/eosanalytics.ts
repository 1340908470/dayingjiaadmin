import { EndPoint } from "./index";

interface DateRangeReq {
    begin: string;
    end: string;
}

interface DataSummary {
    学院课程总数: number;
    课程访问人数: number;
    用户提交作业数: number;
    待评分作业数: number;
    基础知识课程测试人数: number;
    推荐器材点击次数: number;
    用户累计提交作业数: number;
    已评分作业累计合格率: number;
    基础知识课程累计测试人数: number;
}

interface UserPercent {
    用户数: number;
    占比: number;
}

interface FinishStudy {
    佳上院: UserPercent;
    佳御院: UserPercent;
    实践: UserPercent;
    活动: UserPercent;
}

interface DayAmount {
    日期: string;
    amount: number;
}

export default {
    DataSummary: "eosanalytics/course_datasummary" as EndPoint<DateRangeReq, DataSummary>,
    UserSection: "eosanalytics/usersection" as EndPoint<
        DateRangeReq,
        FinishStudy
        >,
    Activityin: "eosanalytics/activityin" as EndPoint<
        DateRangeReq,
        DayAmount[]
        >,
};