import { IServer } from "./Interfaces/IServer";
import { IServerConfiguration } from "./Interfaces/IServerConfiguration";
import { BootableApp } from "./Interfaces/BootableApp";

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
     * Initialize the configurations.
     * 
     * @param config IServerConfiguration
     */
    constructor(config: IServerConfiguration)
    {
        this.config = config;
    }

    /**
     * Setter for the application.
     * 
     * @param app IServer
     * @return IServer
     */
    use(app: BootableApp): IServer 
    {
        this.app = app;

        return this;
    }

    /**
     * Starts the server on given port.
     * 
     * @param port number
     * @return void
     */
    listen(port: number): void
    {
        this.app.listen(this.config.port);

        console.log(`server listening on port: ${this.config.port}`);

        //@todo if there is no app run a simple node server.
    }
}