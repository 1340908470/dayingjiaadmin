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
};
