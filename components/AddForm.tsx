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
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Measurement, MeasurementZodObject } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchHistory } from "@/app/utils/apiService";

const mutationFn: MutationFunction<unknown, Measurement> = async (
  variables
) => {
  return axios.post("/api/save", variables);
};

const AddForm = () => {
  const [specialMeasurement, setSpecialMeasurement] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Measurement>({
    resolver: zodResolver(MeasurementZodObject),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation<unknown, Error, Measurement>({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [fetchHistory.key],
      });
      router.push("/");
    },
    onError: (error) => console.log(error),
  });

  const router = useRouter();

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
          {errors.systolic?.message && <p>{errors.systolic?.message}</p>}
          <Input
            isRequired
            labelPlacement="outside"
            label="DIASTOLIC mmHg"
            variant="bordered"
            {...register("diastolic")}
          />
          {errors.diastolic?.message && <p>{errors.diastolic?.message}</p>}
          <Input
            isRequired
            labelPlacement="outside"
            label="Heart rate"
            variant="bordered"
            {...register("heartRate")}
          />
          {errors.heartRate?.message && <p>{errors.heartRate?.message}</p>}
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
              {errors.cause?.message && <p>{errors.cause?.message}</p>}
            </div>
          ) : null}
          <Button type="submit" className="mt-8" disabled={mutation.isPending}>
            {mutation.isPending
              ? "Saving..."
              : mutation.isError
              ? "Unsuccessfull saving"
              : "Save"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default AddForm;
