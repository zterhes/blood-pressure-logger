import { Measurement } from "@/types";
import { Card, CardBody } from "@nextui-org/card";
import React from "react";

type PropsMeasurement = {
  measurement: Measurement;
};

const HistoryData: React.FC<PropsMeasurement> = ({ measurement }) => {
  return (
    <Card
      isBlurred
      className="border-none dark:bg-default-100/50 my-3"
      shadow="sm"
    >
      <CardBody>
        <div className="flex my-5 justify-between">
          <p className="font-bold">Measurement Date</p>
          <div>
            <p className="text-sm">{measurement.timeStamp?.toDateString()}</p>
            <p className="text-sm">
              {measurement.timeStamp?.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <div className="text-center basis-1/3">
            <p className="font-bold">
              SYSTOLIC <p className="font-extralight text-xs">(mmHg)</p>
            </p>
            <p>{measurement.systolic}</p>
          </div>
          <div className="text-center basis-1/3">
            <p className="font-bold">
              DIASTOLIC <p className="font-extralight text-xs">(mmHg)</p>
            </p>
            <p>{measurement.diastolic}</p>
          </div>
          <div className="text-center basis-1/3">
            <p className="font-bold">
              Heart Rate <p className="font-extralight text-xs">(beat/min)</p>
            </p>
            <p>{measurement.heartRate}</p>
          </div>
        </div>
        {measurement.cause && (
          <div>
            <p className="text-red font-bold">Specific measurement: </p>
            <p>{measurement.cause}</p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default HistoryData;
