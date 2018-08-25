import { IServer } from "../Interfaces/IServer";
import { IServerConfiguration } from "../Interfaces/IServerConfiguration";
import { BootableApp } from "../Interfaces/BootableApp";

export class Server implements IServer 
{
    /**
     * Stores the configurations.
     */
    config: IServerConfiguration;

    /**
     * Stores the app.
     */
    app: BootableApp;

    /**
     * Setter for the application.
     */
    use(app: BootableApp): IServer 
    {
        this.app = app;

        return this;
    }

    /**
     * Starts the server on given port.
     */
    listen(port?: number): void
    {
        let appPort = port || parseInt(process.env.PORT || '80', 10);

        this.app.listen(appPort);

        console.log(`server listening on port: ${appPort}`);

        //@todo if there is no app run a simple node server.
    }
}