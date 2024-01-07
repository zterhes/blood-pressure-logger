import {
  BPLCredentials,
  ListOfMeasurementZodObject,
  UserZodObject,
  getVercelUrl,
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
    const url = getVercelUrl().VERCEL_URL;
    const response = await axios.post(
      "https://" + url + "/api/loginWithCredentials",
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
