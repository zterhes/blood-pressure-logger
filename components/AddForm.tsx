"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Switch,
  CardHeader,
} from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Measurement } from "@/types";

const AddForm = () => {
  const [specialMeasurement, setSpecialMeasurement] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Measurement>();
  const onSubmit: SubmitHandler<Measurement> = async (data) => {
    const response = await fetch("/api/save", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(response);
  };
  return (
    <Card isBlurred className="border-none dark:bg-default-100/50" shadow="sm">
      <CardHeader>
        <p className="w-full text-center font-bold text-xl">
          Add new measurement
        </p>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            isRequired
            labelPlacement="outside"
            label="SYSTOLIC mmHg"
            variant="bordered"
            {...register("systolic")}
          />
          <Input
            isRequired
            labelPlacement="outside"
            label="DIASTOLIC mmHg"
            variant="bordered"
            {...register("diastolic")}
          />
          <Input
            isRequired
            labelPlacement="outside"
            label="Heart rate"
            variant="bordered"
            {...register("heartRate")}
          />
          <div className="pt-8">
            <Switch
              isSelected={specialMeasurement}
              onValueChange={setSpecialMeasurement}
              color="danger"
            >
              Special Measurement
            </Switch>
          </div>
          {specialMeasurement ? (
            <div>
              <Input
                isRequired
                labelPlacement="outside"
                label="Cause"
                variant="bordered"
                {...register("cause")}
              />
            </div>
          ) : null}
          <Button type="submit" className="mt-8">
            Save
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddForm;
