// // import {axiosInstance} from "../utils/AxiosHelper.js";

// // export const getDashboardData = async () => {

// //     const response = await axiosInstance.post('/ai/suggestions')
// //     return response.data;

// // }  


// import { axiosInstance } from "../utils/AxiosHelper.js";

// export const getDashboardData = async () => {
//   const response = await axiosInstance.post("/ai/suggestions");

//   // Gemini backend se response string aa raha hai
//   let raw = response.data.response || response.data; 

//   // Clean response (```json ... ``` hatao)
//   let cleanResponse = raw
//     .replace(/^```json\n/, "")
//     .replace(/```$/, "");

//   try {
//     const parsedData = JSON.parse(cleanResponse);
//     return parsedData; // ✅ ab parsed JSON object return hoga
//   } catch (err) {
//     console.error("Error parsing Gemini response:", err, raw);
//     return null;
//   }
// };




import { axiosInstance } from "../utils/AxiosHelper.js";

export const getDashboardData = async () => {
  try {
    const response = await axiosInstance.post("/ai/suggestions");

    // gemini-1.5-flash backend already parsed JSON return kar raha hai
    // const data = response.data; // yaha replace ki koi need nahi

    return response.data; // ✅ direct parsed object
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    return null;
  }
};
