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
          <div className="text-sm font-medium text-gray-500">
            {measurement.timeStamp?.toDateString()}
          </div>
          <div className="text-sm font-medium text-gray-500">
            {measurement.timeStamp?.toLocaleTimeString()}
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <div className="text-center basis-1/3">
            <p className="text-xl font-bold">{measurement.systolic}</p>
            <p className="text-gray-400 font-light">
              SYSTOLIC <p className="font-extralight text-xs">(mmHg)</p>
            </p>
          </div>
          <div className="text-center basis-1/3">
            <p className="text-xl font-bold">{measurement.diastolic}</p>
            <p className="text-gray-400 font-light">
              DIASTOLIC <p className="font-extralight text-xs">(mmHg)</p>
            </p>
          </div>
          <div className="text-center basis-1/3">
            <p className="text-xl font-bold">{measurement.heartRate}</p>
            <p className="text-gray-400 font-light">
              Heart Rate <p className="font-extralight text-xs">(beat/min)</p>
            </p>
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
