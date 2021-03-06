// @ts-nocheck
/*
 * 页面：总览
 * */
import html2canvas from "html2canvas";
import "./Default.css";
import { useRef, useState } from "react";
import DateRangeFilter, { DateRange } from "@/component/filter/DateRangeFilter";
import DataSummary from "@/component/chart/DataSummary";
import RegisteredUserByDay from "@/component/chart/RegisteredUserByDay";
import NewPhotoByDay from "@/component/chart/NewPhotoByDay";
import { exportComponentAsPNG } from "@/util/export/ExportComponent";
import DateRangeMonthlyFilter from "@/component/filter/DateRangeMonthlyFilter";
import InvitedKPI from "@/component/chart/InvitedKPI";
import DataSummaryByMonth from "@/component/chart/DataSummaryByMonth";
import PhotoTypes from "@/component/chart/PhotoTypes";
import PhotoTag from "@/component/chart/PhotoTag";
import PhotoTypeByMonth from "@/component/chart/PhotoTypeByMonth";
import PhotoEquipment from "@/component/chart/PhotoEquipment";
import PhotoCompetitionTotal from "@/component/ppt/PhotoCompetitionTotal";
import GiftRelatedData from "@/component/chart/GiftRelatedData";
import FreeCourseAccess from "@/component/chart/FreeCourseAccess";
import CourseExchange from "@/component/chart/CourseExchange";
import AvatarExchange from "@/component/chart/AvatarExchange";
import UserAccessByChannel from "@/component/chart/UserAccessByChannel";
import FromInviter from "@/component/chart/FromInviter";
import MonthlyChannel from "@/component/chart/MonthlyChannel";
import ActiveUserGender from "@/component/chart/ActiveUserGender";
import ActiveUserAge from "@/component/chart/ActiveUserAge";
import ActiveUserDevice from "@/component/chart/ActiveUserDevice";
import ActiveDailyRetain from "@/component/chart/ActiveDailyRetain";
import InviterFocused from "@/component/chart/InviterFocused";
import MonthActiveUserProvince from "@/component/chart/MonthActiveUserProvince";
import PPTCover from "@/component/ppt/PPTCover";
import UserPhotos from "@/component/chart/UserPhotos";
import { Button, Col, message, notification, Row } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { ExportOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import InvitedKPIMonth from "@/component/chart/InvitedKPIMonth";
import CollegeDataSummary from "@/component/chart/CollegeDataSummary";
import CollegeDataByMonth from "@/component/chart/CollegeDataByMonth";
import CollegeFinishStudy from "@/component/chart/CollegeFinishStudy";
import CollegeCourseAccessTimes from "@/component/chart/CollegeCourseAccessTimes";
import CollegeHomeworkSubmitTrend from "@/component/chart/CollegeHomeworkSubmitTrend";
import CollegeUserJoinTrend from "@/component/chart/CollegeUserJoinTrend";
import CollegeOfflineJoin from "@/component/chart/CollegeOfflineJoin";
import CollegeAreaJoin from "@/component/chart/CollegeAreaJoin";
import CollegeCourseSummary from "@/component/chart/CollegeCourseSummary";
import CollegeCourseAccess from "@/component/chart/CollegeCourseAccess";
import CollegeCourseHomework from "@/component/chart/CollegeCourseHomework";
import CollegeCourseDiscuss from "@/component/chart/CollegeCourseDiscuss";
import CollegeClickTrend from "@/component/chart/CollegeClickTrend";
import CollegeRecommendClick from "@/component/chart/CollegeRecommendClick";
import CollegeTeacher from "@/component/chart/CollegeTeacher";
import CollegeOfflineCompetition from "@/pages/CollegeOfflineCompetition";

interface MonthlyReportProps {
  nowPage: string;
  resetPage: () => void;
}

export default function MonthlyReport(props: MonthlyReportProps) {
  const [date, setDate] = useState({} as DateRange);

  const [isPrint, setIsPrint] = useState(false);

  const [rate, setRate] = useState(0);

  function setDateRange(startTime: string, endTime: string) {
    setDate({
      StartTime: startTime,
      EndTime: endTime,
    });
  }

  const DataSummaryRefMonth = useRef(null);
  const DataSummaryByMonthRefMonth = useRef(null);
  const RegisteredUserByDayRefMonth = useRef(null);
  const NewPhotoByDayRefMonth = useRef(null);
  const PhotoTypesRefMonth = useRef(null);
  const PhotoTagRefMonth = useRef(null);
  const PhotoTypeByMonthRefMonth = useRef(null);
  const PhotoEquipmentRefMonth = useRef(null);
  const PhotoCompetitionTotalRefMonth = useRef(null);

  const CollegeDataSummaryRefMonth = useRef(null);
  const CollegeDataByMonthRefMonth = useRef(null);
  const CollegeFinishStudyRefMonth = useRef(null);
  const CollegeCourseAccessTimesRefMonth = useRef(null);
  const CollegeHomeworkSubmitTrendRefMonth = useRef(null);
  const CollegeOfflineJoinRefMonth = useRef(null);
  const CollegeAreaJoinRefMonth = useRef(null);
  const CollegeCourseSummaryRefMonth = useRef(null);
  const CollegeCourseAccessRefMonth = useRef(null);
  const CollegeCourseHomeworkRefMonth = useRef(null);
  const CollegeCourseDiscussRefMonth = useRef(null);
  const CollegeClickTrendRefMonth = useRef(null);
  const CollegeRecommendClickRefMonth = useRef(null);
  const CollegeTeacherRefMonth = useRef(null);
  const CollegeOfflineCompetitionRefMonth = useRef(null);

  const GiftRelatedDataRefMonth = useRef(null);
  const FreeCourseAccessRefMonth = useRef(null);
  const CourseExchangeRefMonth = useRef(null);
  const AvatarExchangeRefMonth = useRef(null);

  const UserAccessByChannelRefMonth = useRef(null);
  const MonthlyChannelRefMonth = useRef(null);
  const FromInviterRefMonth = useRef(null);

  const ActiveUserGenderRefMonth = useRef(null);
  const ActiveUserAgeRefMonth = useRef(null);
  const ActiveUserDeviceRefMonth = useRef(null);
  const MonthActiveUserProvinceRefMonth = useRef(null);

  const ActiveDailyRetainRefMonth = useRef(null);
  const UserPhotosRefMonth = useRef(null);

  const InvitedKPIMonthRefMonth = useRef(null);
  const InviterFocusedRefMonth = useRef(null);

  async function setPrint() {
    setIsPrint(true);
  }

  const openNotification = () => {
    notification.open({
      message: "下载完成",
      description:
        "已将月报数据打包并成功下载至您的个人电脑，您现在可以打开压缩包查看",
      icon: <CheckSquareOutlined style={{ color: "#f59898" }} />,
    });
  };

  async function exportPNG() {
    let uris = [];

    // 用户访问总览

    await exportComponentAsPNG(DataSummaryRefMonth, {
      fileName: "用户访问总览||用户数据概况",
    }).then((r) => {
      uris.push(r);
      setRate(4);
    });
    await exportComponentAsPNG(DataSummaryByMonthRefMonth, {
      fileName: "用户访问总览||用户数据月度对比",
    }).then((r) => {
      uris.push(r);
      setRate(8);
    });
    await exportComponentAsPNG(RegisteredUserByDayRefMonth, {
      fileName: "用户访问总览||新增用户注册数",
    }).then((r) => {
      uris.push(r);
      setRate(14);
    });
    await exportComponentAsPNG(NewPhotoByDayRefMonth, {
      fileName: "用户访问总览||新增作品数",
    }).then((r) => {
      uris.push(r);
      setRate(18);
    });

    // 发布作品统计

    await exportComponentAsPNG(PhotoTypesRefMonth, {
      fileName: "发布作品统计||发布作品类型分布",
    }).then((r) => {
      uris.push(r);
      setRate(22);
    });
    await exportComponentAsPNG(PhotoTagRefMonth, {
      fileName: "发布作品统计||不同标签作品数统计",
    }).then((r) => {
      uris.push(r);
      setRate(25);
    });
    await exportComponentAsPNG(PhotoTypeByMonthRefMonth, {
      fileName: "发布作品统计||发布作品类型月度对比",
    }).then((r) => {
      uris.push(r);
      setRate(29);
    });
    await exportComponentAsPNG(PhotoEquipmentRefMonth, {
      fileName: "发布作品统计||作品拍摄器材分布",
    }).then((r) => {
      uris.push(r);
      setRate(35);
    });

    // 活动比赛

    for (
      let i = 0;
      i < PhotoCompetitionTotalRefMonth.current.childNodes[0].childNodes.length;
      i++
    ) {
      for (
        let j = 1;
        j <
        PhotoCompetitionTotalRefMonth.current.childNodes[0].childNodes[i]
          .childNodes.length;
        j++
      ) {
        if (j !== 0) {
          await exportComponentAsPNG(
            {
              current:
                PhotoCompetitionTotalRefMonth.current.childNodes[0].childNodes[
                  i
                ].childNodes[j],
            },
            {
              fileName:
                "活动比赛||" +
                PhotoCompetitionTotalRefMonth.current.childNodes[0].childNodes[
                  i
                ].childNodes[j].childNodes[0].innerHTML,
            }
          ).then((r) => {
            uris.push(r);
            setRate(37);
          });
        }
      }
    }

    // 积分商城相关数据

    await exportComponentAsPNG(GiftRelatedDataRefMonth, {
      fileName: "积分商城相关数据||礼品相关数据",
    }).then((r) => {
      uris.push(r);
      setRate(40);
    });
    await exportComponentAsPNG(FreeCourseAccessRefMonth, {
      fileName: "积分商城相关数据||免费课程访问数Top10",
    }).then((r) => {
      uris.push(r);
      setRate(43);
    });
    await exportComponentAsPNG(CourseExchangeRefMonth, {
      fileName: "积分商城相关数据||精品课程兑换数Top10",
    }).then((r) => {
      uris.push(r);
      setRate(48);
    });
    await exportComponentAsPNG(AvatarExchangeRefMonth, {
      fileName: "积分商城相关数据||头像挂件兑换数Top10",
    }).then((r) => {
      uris.push(r);
      setRate(54);
    });

    // 用户来源渠道统计

    await exportComponentAsPNG(UserAccessByChannelRefMonth, {
      fileName: "用户来源渠道统计||不同来源访问次数分布",
    }).then((r) => {
      uris.push(r);
      setRate(58);
    });
    await exportComponentAsPNG(MonthlyChannelRefMonth, {
      fileName: "用户来源渠道统计||不同渠道来源用户访问月度对比",
    }).then((r) => {
      uris.push(r);
      setRate(63);
    });
    await exportComponentAsPNG(FromInviterRefMonth, {
      fileName: "用户来源渠道统计||来自特邀影家渠道访问详情",
    }).then((r) => {
      uris.push(r);
      setRate(67);
    });

    // 青年学院
    await exportComponentAsPNG(CollegeDataSummaryRefMonth, {
      fileName: "EOS青年影像学院总览||不同来源访问次数分布",
    }).then((r) => {
      uris.push(r);
      setRate(58);
    });
    await exportComponentAsPNG(MonthlyChannelRefMonth, {
      fileName: "用户来源渠道统计||不同渠道来源用户访问月度对比",
    }).then((r) => {
      uris.push(r);
      setRate(63);
    });
    await exportComponentAsPNG(FromInviterRefMonth, {
      fileName: "用户来源渠道统计||来自特邀影家渠道访问详情",
    }).then((r) => {
      uris.push(r);
      setRate(67);
    });


    // 用户画像分析

    await exportComponentAsPNG(ActiveUserGenderRefMonth, {
      fileName: "用户画像分析||访问用户性别分布",
    }).then((r) => {
      uris.push(r);
      setRate(72);
    });
    await exportComponentAsPNG(ActiveUserAgeRefMonth, {
      fileName: "用户画像分析||访问用户年龄分布",
    }).then((r) => {
      uris.push(r);
      setRate(76);
    });
    await exportComponentAsPNG(ActiveUserDeviceRefMonth, {
      fileName: "用户画像分析||访问用户终端分布",
    }).then((r) => {
      uris.push(r);
      setRate(81);
    });
    await exportComponentAsPNG(MonthActiveUserProvinceRefMonth, {
      fileName: "用户画像分析||访问用户地区分布",
    }).then((r) => {
      uris.push(r);
      setRate(84);
    });

    // 用户留存行为分析;

    for (
      let i = 1;
      i < ActiveDailyRetainRefMonth.current.childNodes.length;
      i++
    ) {
      // @ts-ignore
      await exportComponentAsPNG(
        {
          current: ActiveDailyRetainRefMonth.current.childNodes[i],
        },
        {
          fileName: "用户留存行为分析||访问用户留存数据(" + i + ")",
        }
      ).then((r) => {
        uris.push(r);
        setRate(87);
      });
    }

    await exportComponentAsPNG(UserPhotosRefMonth, {
      fileName: "用户留存行为分析||用户发布作品数分布",
    }).then((r) => {
      uris.push(r);
      setRate(90);
    });

    // 特邀影家

    await exportComponentAsPNG(InvitedKPIMonthRefMonth, {
      fileName: "特邀影家||特邀影家KPI考核",
    }).then((r) => {
      uris.push(r);
      setRate(94);
    });
    await exportComponentAsPNG(InviterFocusedRefMonth, {
      fileName: "特邀影家||特邀影家关注度统计",
    }).then((r) => {
      uris.push(r);
      setRate(100);
    });

    return uris;
  }

  // fileName: 文件夹名||文件名&&base64
  async function exportByUris(uris: any[]) {
    const zip = new JSZip();

    // const img = zip.folder("images");
    // // @ts-ignore
    // img.file("lalal.png", uri.replace(/^data:image\/(png|jpg);base64,/, ""), {
    //   base64: true,
    // });

    uris.forEach((value) => {
      const uri = value.split("&&")[1];
      const folderName = value.split("&&")[0].split("||")[0];
      const fileName = value.split("&&")[0].split("||")[1];

      const 用户访问总览 = zip.folder("用户访问总览");
      const 发布作品统计 = zip.folder("发布作品统计");
      const 活动比赛 = zip.folder("活动比赛");
      const 积分商城相关数据 = zip.folder("积分商城相关数据");
      const 用户来源渠道统计 = zip.folder("用户来源渠道统计");
      const 用户画像分析 = zip.folder("用户画像分析");
      const 用户留存行为分析 = zip.folder("用户留存行为分析");
      const 特邀影家 = zip.folder("特邀影家");

      if (folderName === "用户访问总览") {
        // @ts-ignore
        用户访问总览.file(
          fileName + ".png",
          uri.replace(/^data:image\/(png|jpg);base64,/, ""),
          {
            base64: true,
          }
        );
      }
      if (folderName === "发布作品统计") {
        // @ts-ignore
        发布作品统计.file(
          fileName + ".png",
          uri.replace(/^data:image\/(png|jpg);base64,/, ""),
          {
            base64: true,
          }
        );
      }
      if (folderName === "活动比赛") {
        // @ts-ignore
        活动比赛.file(
          fileName + ".png",
          uri.replace(/^data:image\/(png|jpg);base64,/, ""),
          {
            base64: true,
          }
        );
      }
      if (folderName === "积分商城相关数据") {
        // @ts-ignore
        积分商城相关数据.file(
          fileName + ".png",
          uri.replace(/^data:image\/(png|jpg);base64,/, ""),
          {
            base64: true,
          }
        );
      }
      if (folderName === "用户来源渠道统计") {
        // @ts-ignore
        用户来源渠道统计.file(
          fileName + ".png",
          uri.replace(/^data:image\/(png|jpg);base64,/, ""),
          {
            base64: true,
          }
        );
      }
      if (folderName === "用户画像分析") {
        // @ts-ignore
        用户画像分析.file(
          fileName + ".png",
          uri.replace(/^data:image\/(png|jpg);base64,/, ""),
          {
            base64: true,
          }
        );
      }
      if (folderName === "用户留存行为分析") {
        // @ts-ignore
        用户留存行为分析.file(
          fileName + ".png",
          uri.replace(/^data:image\/(png|jpg);base64,/, ""),
          {
            base64: true,
          }
        );
      }
      if (folderName === "特邀影家") {
        // @ts-ignore
        特邀影家.file(
          fileName + ".png",
          uri.replace(/^data:image\/(png|jpg);base64,/, ""),
          {
            base64: true,
          }
        );
      }
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      // see FileSaver.js
      FileSaver.saveAs(
        content,
        "大影家月报（" + date.StartTime + "至" + date.EndTime + "）.zip"
      );
    });
  }

  return (
    <div
      style={{
        minHeight: "1000px",
      }}
    >
      <Button
        className="print"
        danger
        icon={<ExportOutlined />}
        onClick={() => {
          setPrint()
            .then(() => {
              return exportPNG();
            })
            .then((uris) => {
              exportByUris(uris).then(() => openNotification);
              setIsPrint(false);
            })
            .then(() => {
              setRate(0);
            });
        }}
      >
        导出
      </Button>
      <Row
        className={"print"}
        style={{
          width: "100%",
          marginTop: "10px",
          display: isPrint ? "" : "none",
        }}
      >
        <Col flex={"70px"}>导出进度:</Col>
        <Col flex={"auto"}>
          <Progress strokeColor={"#f59898"} className="print" percent={rate} />
        </Col>
      </Row>

      <DateRangeMonthlyFilter Title={"月报"} setDateRange={setDateRange} />

      <div style={{ height: "15px", display: isPrint ? "" : "none" }} />

      <div>
        <PPTCover
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          title={"用户访问总览"}
        />
      </div>

      <div ref={DataSummaryRefMonth}>
        <DataSummary
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={DataSummaryByMonthRefMonth}>
        <DataSummaryByMonth
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={RegisteredUserByDayRefMonth}>
        <RegisteredUserByDay
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={NewPhotoByDayRefMonth}>
        <NewPhotoByDay
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>

      {/*<div ref={NumbersOfNewUserEveryWeekRefMonth}>*/}
      {/*  <NumbersOfNewUserEveryWeek*/}
      {/*    begin={date.StartTime}*/}
      {/*    end={date.EndTime}*/}
      {/*    isMonthReport={true}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div ref={NumbersOfNewWorkEveryWeekRefMonth}>*/}
      {/*  <NumbersOfNewWorkEveryWeek*/}
      {/*    begin={date.StartTime}*/}
      {/*    end={date.EndTime}*/}
      {/*    isMonthReport={true}*/}
      {/*  />*/}
      {/*</div>*/}

      <div>
        <PPTCover
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          title={"发布作品统计"}
        />
      </div>

      <div ref={PhotoTypesRefMonth}>
        <PhotoTypes
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={PhotoTagRefMonth}>
        <PhotoTag
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={PhotoEquipmentRefMonth}>
        <PhotoEquipment
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>
      <div ref={PhotoTypeByMonthRefMonth}>
        <PhotoTypeByMonth
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>

      <div ref={PhotoCompetitionTotalRefMonth}>
        <PhotoCompetitionTotal
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          isMonthReport={true}
        />
      </div>

      <div>
        <PPTCover
            nowPage={isPrint}
            begin={date.StartTime}
            end={date.EndTime}
            title={"EOS 青年影像学院总览"}
        />
      </div>
      <div ref={CollegeDataSummaryRefMonth}>
        <CollegeDataSummary
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeDataByMonthRefMonth}>
        <CollegeDataByMonth
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeFinishStudyRefMonth}>
        <CollegeFinishStudy
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeCourseAccessTimesRefMonth}>
        <CollegeCourseAccessTimes
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeHomeworkSubmitTrendRefMonth}>
        <CollegeHomeworkSubmitTrend
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeOfflineJoinRefMonth}>
        <CollegeOfflineJoin
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeAreaJoinRefMonth}>
        <CollegeAreaJoin
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>

      <div>
        <PPTCover
            nowPage={isPrint}
            begin={date.StartTime}
            end={date.EndTime}
            title={"EOS 青年影像学院课程"}
        />
      </div>
      <div ref={CollegeCourseSummaryRefMonth}>
        <CollegeCourseSummary
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeCourseAccessRefMonth}>
        <CollegeCourseAccess
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeCourseHomeworkRefMonth}>
        <CollegeCourseHomework
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeCourseDiscussRefMonth}>
        <CollegeCourseDiscuss
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeClickTrendRefMonth}>
        <CollegeClickTrend
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeRecommendClickRefMonth}>
        <CollegeRecommendClick
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>
      <div ref={CollegeTeacherRefMonth}>
        <CollegeTeacher
            nowPage={isPrint}
            isMonthReport={true}
            begin={date.StartTime}
            end={date.EndTime}
        />
      </div>

      <div ref={CollegeOfflineCompetitionRefMonth}>
        <CollegeOfflineCompetition
            nowPage={isPrint}
            begin={date.StartTime}
            end={date.EndTime}
            isMonthReport={true}
        />
      </div>

      <div>
        <PPTCover
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          title={"积分商城相关数据"}
        />
      </div>

      <div ref={GiftRelatedDataRefMonth}>
        <GiftRelatedData
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={FreeCourseAccessRefMonth}>
        <FreeCourseAccess
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={CourseExchangeRefMonth}>
        <CourseExchange
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={AvatarExchangeRefMonth}>
        <AvatarExchange
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div>
        <PPTCover
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          title={"用户来源渠道统计"}
        />
      </div>

      <div ref={UserAccessByChannelRefMonth}>
        <UserAccessByChannel
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={MonthlyChannelRefMonth}>
        <MonthlyChannel
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={FromInviterRefMonth}>
        <FromInviter
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div>
        <PPTCover
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          title={"用户画像分析"}
        />
      </div>

      <div ref={ActiveUserGenderRefMonth}>
        <ActiveUserGender
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={ActiveUserAgeRefMonth}>
        <ActiveUserAge
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={ActiveUserDeviceRefMonth}>
        <ActiveUserDevice
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={MonthActiveUserProvinceRefMonth}>
        <MonthActiveUserProvince
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div>
        <PPTCover
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          title={"用户留存/行为分析"}
        />
      </div>

      <div ref={ActiveDailyRetainRefMonth}>
        <ActiveDailyRetain
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={UserPhotosRefMonth}>
        <UserPhotos
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>

      <div>
        <PPTCover
          nowPage={isPrint}
          begin={date.StartTime}
          end={date.EndTime}
          title={"特邀影家"}
        />
      </div>

      <div ref={InvitedKPIMonthRefMonth}>
        <InvitedKPIMonth
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
      <div ref={InviterFocusedRefMonth}>
        <InviterFocused
          nowPage={isPrint}
          isMonthReport={true}
          begin={date.StartTime}
          end={date.EndTime}
        />
      </div>
    </div>
  );
}
