type dbSample = {
    content: string;
    createDate: number;
    password?: string;
    expire?: number;
};
type dbResponse = {
    status: number;
    message: string;
    postId: number;
};
declare function dbRead(id: number, callback: (a: dbSample) => void): void;
declare function dbWrite(dataJson: any, callback: (data: dbResponse) => void): Promise<void>;
declare function getNextID(callback: (a: number) => void): Promise<void>;
export { dbRead, dbWrite, getNextID };
