import axios from "@/config/axiosConfig";

export const createEmploy = async ({
  name,
  designation,
  department,
  email,
  phone,
  token,
}) => {
  try {
    console.log("createEmploy", name, designation, department, email, phone);
    const response = await axios.post(
      "/employee",
      {
        name,
        designation,
        department,
        email,
        phone,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    console.log("createEmploy", response);

    return response?.data;
  } catch (error) {
    console.log("createEmploy", error);
    throw error.response.data;
  }
};

export const getEmploy = async ({ token }) => {
  try {
    const response = await axios.get("/employees", {
      headers: {
        "x-access-token": token,
      },
    });
    console.log("Response fetched for getEmploy ", response);
    return response?.data?.data;
  } catch (error) {
    console.log("Error occured in getEmploy", error);
    throw error.response.data;
  }
};
