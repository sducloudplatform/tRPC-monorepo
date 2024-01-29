//express context from trpc
import { type CreateExpressContextOptions } from "@trpc/server/adapters/express";

//request from express
//import { Request } from 'express';

const getTokenFromHeader = async ({req, res}: CreateExpressContextOptions) => {
    //get the token from the header
    console.log(req.headers);
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        return token
    }
    return null;
}

// this function cannot be renamed :( (express adapter need)
export const createContext = async (opts: CreateExpressContextOptions) => {
  const token = await getTokenFromHeader(opts);
  return {
    token
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;