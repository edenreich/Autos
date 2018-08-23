
export interface IServer
{
    use(app: IServer): IServer;

    listen(port: number): void;
}