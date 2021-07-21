import { Button } from "antd";

interface PhotoCompetitionNavigationButtonProps {
  competitionName: string;
  competitionNames: string[];
  setNowCompetitionName: (name: string) => void;
}

export default function PhotoCompetitionNavigationButton(
  props: PhotoCompetitionNavigationButtonProps
) {
  return (
    <>
      {props.competitionNames.map((value, index) => (
        <Button
          key={index}
          danger={props.competitionName === value}
          style={{
            marginRight: "10px",
            marginBottom: "30px",
            borderRadius: "20px",
          }}
          onClick={() => {
            props.setNowCompetitionName(value);
          }}
        >
          {value}
        </Button>
      ))}
    </>
  );
}
