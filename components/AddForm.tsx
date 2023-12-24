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
import { MutationFunction, useMutation } from "@tanstack/react-query";
import { Measurement } from "@/app/api/validation";

const mutationFn: MutationFunction<unknown, Measurement> = async (
  variables
) => {
  await fetch("/api/save", {
    method: "POST",
    body: JSON.stringify(variables),
  });
};

const AddForm = () => {
  const [specialMeasurement, setSpecialMeasurement] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Measurement>();

  const mutation = useMutation<unknown, Error, Measurement>({
    mutationFn,
    onSuccess: (value) => {
      console.log("value: ", value);
      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const onSubmit: SubmitHandler<Measurement> = async (data) => {
    mutation.mutate(data);
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
          <Button type="submit" className="mt-8" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddForm;
