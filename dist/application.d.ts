export default class Application {
    private appDir;
    private express;
    /**
     * Logic to execute before routes are registered.
     *
     * @return  {Function|null}
     */
    beforeRoutes?: Function;
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
     *
     * @return {void}
     */
    start(): void;
    /**
     * Returns the current express instance.
     *
     * @return  {any}
     */
    readonly expressInstance: any;
    /**
     * Locates all the controller's within the app
     *
     * @return {void}
     */
    private locateControllers;
    /**
     * Registers all routes with the express app.
     *
     * @param {any}    routes     The list of routes to register
     * @param {string} baseRoute  The base of the domain, ie. "tasks"
     *
     * @return {void}
     */
    private registerRoutes;
}
