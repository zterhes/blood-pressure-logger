import React, { LegacyRef, MutableRefObject } from "react";
import Logo from "./Logo";

interface HistoryPrintableComponentProps {
  ref: MutableRefObject<null>;
  name?: string | null | undefined;
  data?: {
    systolic: number;
    diastolic: number;
    heartRate: number;
    timeStamp?: Date | undefined;
    cause?: string | null | undefined;
  }[];
}

export const HistoryPrintableComponent = React.forwardRef<
  HTMLDivElement,
  HistoryPrintableComponentProps
>((props, ref) => {
  const { name, data } = props;

  return (
    <div ref={ref} className="p-10">
      <div className="mb-10">
        <Logo />
        <h1>BLOOD PRESSURE LOGGER</h1>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-center">
          Blood pressure history
        </h1>
        <div className="m-10">
          <div className="flex gap-12">
            <p className="text-lg">NAME:</p>
            <p className="text-lg font-bold">{name}</p>
          </div>
          <div className="flex gap-4">
            <p className="text-lg">Print Date:</p>
            <p className="text-lg font-bold">{new Date().toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="grid w-full">
        <table>
          <thead>
            <tr className="m-10">
              <th className="text-center">Time</th>
              <th className="text-center">Systolic</th>
              <th className="text-center">Diastolic</th>
              <th className="text-center">Heart Rate</th>
              <th className="text-center">Cause</th>
            </tr>
          </thead>
          {data &&
            data.map((value, i) => (
              <tbody>
                <tr>
                  <td className="text-center">
                    {value.timeStamp?.toLocaleTimeString()}
                  </td>
                  <td className="text-center">{value.systolic}</td>
                  <td className="text-center">{value.diastolic}</td>
                  <td className="text-center">{value.heartRate}</td>
                  <td className="text-center">{value.cause}</td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
});
