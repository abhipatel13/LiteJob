
const API_Endpoint = "http://localhost:5500/api/v1";
const API_Endpoint_Image = "http://localhost:5500";
const token = localStorage.getItem("authToken");
const email = "newbusiness662@gmail.com"
const business_ID = localStorage.getItem("businessId");
const userId = localStorage.getItem("user._id")

console.log(business_ID)


export { API_Endpoint, token, email, business_ID,API_Endpoint_Image,userId };