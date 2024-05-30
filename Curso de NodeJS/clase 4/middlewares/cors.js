import cors from "cors";

const ACCEPTED_ORIGINS = [
    "http://localhost:8080",
    "http://localhost:5432",
    "http://localhost:8081",
  ];

export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {} ) => cors({
  origin: (origin,callback) => {
    
    if(ACCESS_ORIGIN.includes(origin)) {
      return callback(null, true);
    }
    if(!origin) {
      return callback(null,true);
    }
    return callback(new Error("Not allowed by CORS"));
  }
})