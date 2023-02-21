type dbSample = {
    content: string;
    createDate: number;
    password?: string;
    expire?: number;
};
export declare class AppController {
    route(): any;
    getHello(): string;
    create(dbData: dbSample): Promise<{}>;
}
export {};
