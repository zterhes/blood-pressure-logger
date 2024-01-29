import { ListOfMeasurementZodObject } from "@/types";
import axios from "axios";

const fetchAll = {
  fn: async () => {
    const response = await axios.get("/api/getAll");
    try {
      return ListOfMeasurementZodObject.parse(response.data);
    } catch (error) {
      console.log("validation error: ", error);
    }
  },
  key: "getAll",
};

export { fetchAll };
