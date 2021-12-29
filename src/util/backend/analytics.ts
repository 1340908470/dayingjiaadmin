import { EndPoint } from "./index";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import ex from "umi/dist";

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

interface UserAccessByChannel {
  来源: string;
  访问次数: number;
  占比: number;
}

interface FromInviter {
  特邀影家: string;
  amount: number;
  占比: number;
}

interface ActiveUserGender {
  amount: string;
  name: string;
}

interface NewUserGender {
  amount: string;
  name: string;
}

interface UserGender {
  活跃用户性别分布: ActiveUserGender[];
  新用户性别分布: NewUserGender[];
}

interface ActiveUserAge {
  amount: string;
  name: string;
}

interface NewUserAge {
  amount: string;
  name: string;
}

interface UserAge {
  活跃用户年龄分布: ActiveUserAge[];
  新用户年龄分布: NewUserAge[];
}

interface ActiveUserProvince {
  amount: string;
  name: string;
}

interface NewUserProvince {
  amount: string;
  name: string;
}

interface UserProvince {
  活跃用户地区分布: ActiveUserProvince[];
  新用户地区分布: NewUserProvince[];
}

interface ActiveUUserDevice {
  amount: string;
  name: string;
}

interface NewUserDevice {
  amount: string;
  name: string;
}

interface UserDevice {
  活跃用户设备机型分布: ActiveUUserDevice[];
  新用户设备机型分布: NewUserDevice[];
}

interface UserPhoto {
  作品数量: number;
  用户数: number;
  占比: number;
}

interface AccessTime {
  访问时长: string;
  访问次数: number;
  占比: number;
}

interface AccessDepth {
  来源: string;
  访问次数: number;
  占比: number;
}

interface UserAccessData {
  访问时间: AccessTime[];
  访问深度: AccessDepth[];
}

interface UserPhotoReq {
  begin: string;
  end: string;
  split: string;
}

interface InvitePhotoReq {
  stage: string;
  begin: string;
  end: string;
}

interface InvitePhoto {
  name: string;
  data: number;
}

interface VisitUvNew {
  key: number;
  value: number;
}

interface VisitUv {
  key: number;
  value: number;
}

// 开始、结束时间一样，举例：20210531
interface DailyRetainReq {
  begin_date: string;
  end_date: string;
}

interface DailyRetain {
  ref_date: string; // 日期举例：20210531
  visit_uv_new: VisitUvNew[];
  visit_uv: VisitUv[];
}

interface PhotoEquipment {
  name: string;
  amount: number;
}

interface InviteGroupPhotosReq {
  stage: string;
  begin: string;
  end: string;
}

interface InviteGroupPhotos {
  name: string;
  data: number;
}

interface InviteGroupCommentsReq {
  stage: string;
  begin: string;
  end: string;
}

interface InviteGroupComments {
  name: string;
  data: number;
}

interface InviteGroupLikesReq {
  stage: string;
  begin: string;
  end: string;
}

interface InviteGroupLikes {
  name: string;
  data: number;
}

interface PageSharPV {
  pv: string;
  name: string;
}

interface PageSharUV {
  pv: string;
  name: string;
}

interface PageShare {
  pv: PageSharPV[];
  uv: PageSharUV[];
}

// 开始、结束时间一样，举例：20210531
interface PageShareReq {
  begin: string;
  end: string;
}

interface CircleTrend {
  amount: number;
  date: string;
}
interface NewMemberNum {
  amount: number;
  group_id: number;
  name: string;
}
interface NewWorksNum {
  amount: number;
  group_id: number;
  name: string;
}
interface CircleMemberNum {
  amount: number;
  group_id: number;
  name: string;
}

interface GroupData {
  新增圈子数: number;
  累计圈子数: number;
  新增分享至圈子的作品数: number;
  累计分享至圈子的作品数: number;
  新增加入圈子的人数: number;
  累计加入圈子的人数: number;
  圈子作品发布趋势: CircleTrend[];
  新增成员数TOP10: NewMemberNum[];
  新增作品数TOP10: NewWorksNum;
  圈子成员数TOP10: CircleMemberNum;
}

interface ChallengeRelatedData {
  新增挑战作品数: number;
  新增挑战成功作品数: number;
  新增获取头衔用户数: number;
  累计挑战通关用户数: number;
  累计挑战作品数: number;
  累计挑战成功作品数: number;
}

interface ChallengeWorksTrend {
  amount: number;
  date: string;
}

interface ChallengeJoinMember {
  id: number;
  amount: number;
  date: string;
}

interface ChallengeGetHonor {
  id: number;
  amount: number;
  date: string;
}

interface ChallengeJoinWorks {
  id: number;
  amount: number;
  date: string;
}

interface ChallengeSuccessWorks {
  id: number;
  amount: number;
  date: string;
}

interface ChallengeData {
  挑战相关数据: ChallengeRelatedData[];
  挑战作品发布趋势: ChallengeWorksTrend;
  各级别参与挑战用户数: ChallengeJoinMember;
  各级别获取头衔用户数: ChallengeGetHonor;
  各级别参与挑战作品数: ChallengeJoinWorks;
  各级别挑战成功作品数: ChallengeSuccessWorks;
}

interface FreeCourseAccess {
  amount: string;
  sku_id: number;
  name: string;
  onshelf: string;
}

interface CourseExchange {
  sales: string;
  sku_id: number;
  name: string;
  onshelf: string;
}

interface AvatarExchange {
  sales: string;
  sku_id: number;
  name: string;
  onshelf: string;
}

interface Shop {
  新增免费课程数: number;
  累计免费课程数: number;
  新增精品课程数: number;
  累计精品课程数: number;
  新增头像挂件数: number;
  累计头像挂件数: number;

  免费课程访问数: FreeCourseAccess[];
  精品课程兑换数: CourseExchange[];
  头像挂件兑换数: AvatarExchange[];
}

interface UserCheckIn {
  7: number;
  6: number;
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
  0: number;
}

interface UserPoints {
  141: number;
  121: number;
  101: number;
  81: number;
  61: number;
  41: number;
  21: number;
  0: number;
}

interface Mine {
  用户签到分布: UserCheckIn;
  用户获取积分分布: UserPoints;
}

interface MineReq {
  begin: string;
  end: string;
  checkin: string;
  point: string;
}

interface ChannelAccessTimes {
  amount: number;
  channel: string;
}

interface ChannelAccessNumbers {
  amount: number;
  channel: string;
}

interface Competition {
  id: number;
  name: string;
  投稿数量: number;
  详情页各渠道访问次数: ChannelAccessTimes[];
  详情页各渠道访问人数: ChannelAccessNumbers[];
  注册人数: number;
}

interface CompetitionDataReq {
  begin: string;
  end: string;
  id: number;
  category: number;
}

interface CompetitionData {
  新投稿人数: number;
  新参与人数: number;
  累计投稿人数: number;
  累计投稿作品数: number;
  累计参与人数: number;
  比赛推广新增注册人数: number;
  比赛推广累计注册人数: number;
  比赛推广新增访问次数: number;
  比赛推广累计访问次数: number;
}

interface CompetitionParticipateReq {
  category: number;
  begin: string;
  end: string;
  id: number;
}

interface CompetitionParticipate {
  日期: string;
  amount: number;
}

interface CompetitionChannelReq {
  category: number;
  begin: string;
  end: string;
  id: number;
}

interface CompetitionChannel {
  推广渠道: string;
  注册人数: number;
  访问次数: number;
  访问人数: number;
  投稿数: number;
  老用户回归数: number;
}

interface ShopInfoAvatarReq {
  begin: string;
  end: string;
  category: "头像挂件";
}

interface ShopInfoCourseReq {
  begin: string;
  end: string;
  category: "精品课程";
}

interface ShopInfoFreeCourseReq {
  begin: string;
  end: string;
  category: "免费课程";
}

interface ShopInfoAvatar {
  礼品名称: string;
  上架时间: string;
  兑换次数: number;
  兑换积分: number;
}

// 精品课程
interface ShopInfoCourse {
  礼品名称: string;
  上架时间: string;
  访问次数: string;
  兑换次数: number;
  兑换积分: number;
}

// 免费课程
interface ShopInfoFreeCourse {
  礼品名称: string;
  上架时间: string;
  访问次数: string;
}

interface WeeklyCompetitionReq {
  id: number;
}

export interface WeeklyCompetition {
  name: string;
  total: number;
  lastweek: number;
}

interface InviteKPIReq {
  stage: string;
}

interface InviteKPIMonthReq {
  month: string;
  stage: string;
}

export interface InviteKPI {
  name: string;
  newphotos: number;
  groupphotos: number;
  groupcomments: number;
  grouplikes: number;
  total: number;
  pass: boolean;
}

export interface InviteKPIMonth {
  姓名: string;
  发布作品数: number;
  圈子作品数: number;
  点赞和评论数: number;
  周KPI未达标次数: number;
  月度KPI是否达标: boolean;
}

interface StatisticMonth {
  访问人数: number;
  访问次数: number;
  新注册用户数: number;
  老用户回归数: number;
  新作品数: number;
}

interface LastStatistic {
  访问人数: number;
  访问次数: number;
  新注册用户数: number;
  老用户回归数: number;
  新作品数: number;
}

interface ChainGrowth {
  访问人数: number;
  访问次数: number;
  新注册用户数: number;
  老用户回归数: number;
  新作品数: number;
}

interface DataSummaryByMonthReq {
  month: string; // 2021-06
}

interface DataSummaryByMonth {
  统计月: StatisticMonth;
  上次统计: LastStatistic;
  环比增长: ChainGrowth;
}

interface DateMonth {
  month: string;
}

interface RegisteredUserByMonth {
  周数: string;
  amount: number;
}

interface PhotosByMonth {
  周数: string;
  amount: number;
}

interface PhotoTypeStatisticMonth {
  参赛: number;
  挑战: number;
  圈子: number;
  其它: number;
}

interface PhotoTypeLastStatistic {
  参赛: number;
  挑战: number;
  圈子: number;
  其它: number;
}

interface PhotoTypeChainGrowth {
  参赛: number;
  挑战: number;
  圈子: number;
  其它: number;
}

interface PhotoTypeByMonth {
  统计月: PhotoTypeStatisticMonth;
  上次统计: PhotoTypeLastStatistic;
  环比增长: PhotoTypeChainGrowth;
}

interface MonthlyChannel {
  统计项目: string;
  统计月访问次数: number;
  上次统计访问次数: number;
  环比增长: string;
}

interface InviterFocused {
  特邀影家: string;
  新增注册用户数: number;
  新增圈子成员数: number;
  新增圈子作品数: number;
  新增作品获赞数: number;
  新增作品被评论数: number;
}

interface InviterFocusedReq {
  begin: string;
  end: string;
  stage: "202108";
}

interface Platform {
  amount: string;
  name: string;
}

interface UserPlatform {
  活跃用户终端分布: Platform[];
  新用户终端分布: Platform[];
}

export interface CompetitionSimple {
  id: number;
  name: string;
  category: number;
}

export default {
  PhotoType: {} as PhotoType,
  Test: "" as EndPoint<TestReq, TestRes>,
  PhotoTypes: "analytics/phototype" as EndPoint<DateRangeReq, PhotoTypesRes>,
  PhotoTag: "analytics/phototag" as EndPoint<DateRangeReq, PhotoType[]>,
  UserAccess: "analytics/useraccess" as EndPoint<DateRangeReq, DayAmount[]>,
  NewPhotoByDay: "analytics/newphotobyday" as EndPoint<
    DateRangeReq,
    DayAmount[]
  >,
  RegisteredUserByDay: "analytics/registereduserbyday" as EndPoint<
    DateRangeReq,
    DayAmount[]
  >,
  DataSummary: "analytics/datasummary" as EndPoint<DateRangeReq, DataSummary>,
  UserAccessByChannel: "analytics/useraccessbychannel" as EndPoint<
    DateRangeReq,
    UserAccessByChannel[]
  >,
  FromInviter: "analytics/frominviter" as EndPoint<DateRangeReq, FromInviter[]>,
  UserGender: "analytics/usergender" as EndPoint<DateRangeReq, UserGender>,
  UserAge: "analytics/userage" as EndPoint<DateRangeReq, UserAge>,
  UserProvince: "analytics/userprovince" as EndPoint<
    DateRangeReq,
    UserProvince
  >,
  UserDevice: "analytics/userdevice" as EndPoint<DateRangeReq, UserDevice>,
  UserPhoto: "analytics/userphotos" as EndPoint<UserPhotoReq, UserPhoto[]>,
  UserAccessData: "analytics/useraccessdata" as EndPoint<
    DateRangeReq,
    UserAccessData
  >,
  PhotoEquipment: "analytics/photoequipment" as EndPoint<
    DateRangeReq,
    PhotoEquipment[]
  >,
  UserPlatform: "analytics/userplatform" as EndPoint<
    DateRangeReq,
    UserPlatform
  >,
  DailyRetain: "analytics/dailyretain" as EndPoint<DailyRetainReq, DailyRetain>,
  InvitePhoto: "analytics/invitephotos" as EndPoint<
    InvitePhotoReq,
    InvitePhoto[]
  >,
  InviteGroupPhotos: "analytics/invitegroupphotos" as EndPoint<
    InviteGroupPhotosReq,
    InviteGroupPhotos[]
  >,
  InviteGroupComments: "analytics/invitegroupcomments" as EndPoint<
    InviteGroupCommentsReq,
    InviteGroupComments[]
  >,
  InviteGroupLikes: "analytics/invitegrouplikes" as EndPoint<
    InviteGroupLikesReq,
    InviteGroupLikes[]
  >,
  PageShare: "analytics/pageshare" as EndPoint<PageShareReq, PageShare>,
  PageVisit: "analytics/pagevisit" as EndPoint<PageShareReq, PageShare>,
  GroupData: "analytics/groupdata" as EndPoint<DateRangeReq, GroupData>,
  ChallengeData: "analytics/challenge" as EndPoint<DateRangeReq, ChallengeData>,
  Shop: "analytics/shop" as EndPoint<DateRangeReq, Shop>,
  Mine: "analytics/user " as EndPoint<MineReq, Mine>,
  TotalCompetition: "analytics/totalcompetition" as EndPoint<
    DateRangeReq,
    Competition[]
  >,
  CompetitionList: "analytics/competitionlist" as EndPoint<
    DateRangeReq,
    CompetitionSimple[]
  >,
  CompetitionData: "analytics/competitiondata" as EndPoint<
    CompetitionDataReq,
    CompetitionData
  >,
  CompetitionParticipate: "analytics/competitionparticipate" as EndPoint<
    CompetitionParticipateReq,
    CompetitionParticipate[]
  >,
  CompetitionRegister: "analytics/competitionregister" as EndPoint<
    CompetitionParticipateReq,
    CompetitionParticipate[]
  >,
  CompetitionChannel: "analytics/competitionchannel" as EndPoint<
    CompetitionChannelReq,
    CompetitionChannel[]
  >,
  ShopInfoAvatar: "analytics/shopinfo" as EndPoint<
    ShopInfoAvatarReq,
    ShopInfoAvatar[]
  >,
  ShopInfoCourse: "analytics/shopinfo" as EndPoint<
    ShopInfoCourseReq,
    ShopInfoCourse[]
  >,
  ShopInfoFreeCourse: "analytics/shopinfo" as EndPoint<
    ShopInfoFreeCourseReq,
    ShopInfoFreeCourse[]
  >,
  WeeklyCompetition: "analytics/competition" as EndPoint<
    WeeklyCompetitionReq,
    WeeklyCompetition
  >,
  InviteKPI: "analytics/invites" as EndPoint<InviteKPIReq, InviteKPI[]>,
  InviteKPIMonth: "analytics/invitesbymonth" as EndPoint<
    InviteKPIMonthReq,
    InviteKPIMonth[]
  >,
  DataSummaryByMonth: "analytics/datasummarybymonth" as EndPoint<
    DataSummaryByMonthReq,
    DataSummaryByMonth
  >,
  RegisteredUserByMonth: "analytics/registereduserbymonth" as EndPoint<
    DateMonth,
    RegisteredUserByMonth[]
  >,
  PhotosByMonth: "analytics/photosbymonth" as EndPoint<
    DateMonth,
    PhotosByMonth[]
  >,
  PhotoTypeByMonth: "analytics/phototypebymonth" as EndPoint<
    DateMonth,
    PhotoTypeByMonth
  >,
  MonthlyChannel: "analytics/monthlychannel" as EndPoint<
    DateMonth,
    MonthlyChannel[]
  >,
  InviterFocused: "analytics/inviterfocused" as EndPoint<
    InviterFocusedReq,
    InviterFocused[]
  >,
};
