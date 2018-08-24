
export interface IServer
{
    use(app: IServer): IServer;

    listen(): void;
}