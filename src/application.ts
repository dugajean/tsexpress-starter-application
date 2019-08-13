import glob from 'glob';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { log } from '@tsexpress-starter/utils';

export class Application {
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
  constructor(private appDir: string, private readonly express: any) {}

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
   * Locates all the controller's within the app
   *
   * @return {void}
   */
  private async locateControllers(): Promise<void> {
    globalThis.expressApp = this.express;
    glob.sync(path.join(this.appDir, '/app/**/controller.{ts,js}')).forEach(async c => await import(c));
  }
}
