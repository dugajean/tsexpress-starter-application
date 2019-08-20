export declare class Application {
    readonly appDir: string;
    private readonly express;
    /**
     * Logic to execute before routes are registered.
     *
     * @return  {Function|null}
     */
    beforeRoutes: Function;
    /**
     * Logic to execute after routes are registered.
     *
     * @return  {Function|null}
     */
    afterRoutes?: Function;
    /**
     * Application constructor.
     *
     * @param {any} express An Express app instance.
     */
    constructor(appDir: string, express: any);
    /**
     * Start the application and listen to a port.
     */
    start(): Promise<void>;
    /**
     * Locates all the controller's within the app
     *
     * @return {void}
     */
    private locateControllers;
}
