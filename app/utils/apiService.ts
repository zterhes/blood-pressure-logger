import {
  BPLCredentials,
  ListOfMeasurementZodObject,
  User,
  UserZodObject,
} from "@/types";
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

const callLogin = async (credentials: BPLCredentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/loginWithCredentials",
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    return UserZodObject.parse(response.data);
  } catch (error) {
    console.log("validation error: ", error);
  }
};

export { fetchAll, callLogin };
