export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: number,
      PROBLEMS_DATABASE_ID: string,
      SECRET_TOKEN: string
    }
  }
}
