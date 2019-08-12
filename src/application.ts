import glob from 'glob';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Route } from '@tsexpress-starter/routes';
import { stripSlashes, log } from '@tsexpress-starter/utils';

export default class Application {
  /**
   * Logic to execute before routes are registered.
   *
   * @return  {Function|null}
   */
  beforeRoutes: Function = (): any => null;

  /**
   * Logic to execute after routes are registered.
   *
   * @return  {Function|null}
   */
  afterRoutes?: Function = (): any => null;

  /**
   * Application constructor.
   *
   * @param {any} express An Express app instance.
   */
  constructor(private appDir: string, private express: any) {}

  /**
   * Start the application and listen to a port.
   */
  async start() {
    dotenv.config();

    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());

    await this.beforeRoutes(this.express);
    await this.locateControllers();
    await this.afterRoutes(this.express);

    this.express.listen(process.env.APP_PORT, () => {
      log(`Server listening on port: ${process.env.APP_PORT}`);
    });
  }

  /**
   * Returns the current express instance.
   *
   * @return  {any}
   */
  get expressInstance(): any {
    return this.express;
  }

  /**
   * Locates all the controller's within the app
   *
   * @return {void}
   */
  private async locateControllers(): Promise<void> {
    const controllerPaths = glob.sync(path.join(this.appDir, '/app/**/controller.{ts,js}'));

    let baseRoute;
    let controller;

    for (const controllerPath of controllerPaths) {
      baseRoute = path.basename(path.dirname(controllerPath));
      controller = await import(controllerPath);
      controller = new controller.default();

      log(`Registering routes for ${baseRoute} controller:`);
      this.registerRoutes(controller._routes, baseRoute);
    }
  }

  /**
   * Registers all routes with the express app.
   *
   * @param {any}    routes     The list of routes to register
   * @param {string} baseRoute  The base of the domain, ie. "tasks"
   *
   * @return {void}
   */
  private registerRoutes(routes: any[], baseRoute: string): void {
    for (const verb in routes) {
      if (routes.hasOwnProperty(verb)) {
        routes[verb].forEach((route: Route) => {
          const routePart: string = stripSlashes(route.path);
          const fullRoute: string = `/${baseRoute}${routePart ? '/' : ''}${routePart}`;

          log(`Route: [${verb.toUpperCase()}] ${fullRoute}`);
          this.express[verb](fullRoute, ...[...(route.middlewares ? route.middlewares : []), route.handler]);
        });
      }
    }
  }
}
