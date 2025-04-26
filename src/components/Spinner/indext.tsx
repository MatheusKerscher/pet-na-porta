import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type SpinnerProps = {
  tip: string;
};

const Spinner = ({ tip }: SpinnerProps) => {
  return (
    <div className="w-full h-[calc(100vh-60px)]">
      <Spin
        tip={tip}
        style={{ color: "var(--color-primary)" }}
        indicator={<LoadingOutlined spin style={{ fontSize: 68 }} />}
        fullscreen
      />
    </div>
  );
};

export default Spinner;
