"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const utils_1 = require("@tsexpress-starter/utils");
class Application {
    /**
     * Application constructor.
     *
     * @param {any} express An Express app instance.
     */
    constructor(appDir, express) {
        this.appDir = appDir;
        this.express = express;
        /**
         * Logic to execute before routes are registered.
         *
         * @return  {Function|null}
         */
        this.beforeRoutes = () => null;
        /**
         * Logic to execute after routes are registered.
         *
         * @return  {Function|null}
         */
        this.afterRoutes = () => null;
    }
    /**
     * Start the application and listen to a port.
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            dotenv_1.default.config();
            this.express.use(body_parser_1.default.urlencoded({ extended: true }));
            this.express.use(body_parser_1.default.json());
            yield this.beforeRoutes(this.express);
            yield this.locateControllers();
            yield this.afterRoutes(this.express);
            this.express.listen(process.env.APP_PORT, () => {
                utils_1.log(`Server listening on port: ${process.env.APP_PORT}`);
            });
        });
    }
    /**
     * Returns the current express instance.
     *
     * @return  {any}
     */
    get expressInstance() {
        return this.express;
    }
    /**
     * Locates all the controller's within the app
     *
     * @return {void}
     */
    locateControllers() {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerPaths = glob_1.default.sync(path_1.default.join(this.appDir, '/app/**/controller.{ts,js}'));
            let baseRoute;
            let controller;
            for (const controllerPath of controllerPaths) {
                baseRoute = path_1.default.basename(path_1.default.dirname(controllerPath));
                controller = yield Promise.resolve().then(() => __importStar(require(controllerPath)));
                controller = new controller.default();
                utils_1.log(`Registering routes for ${baseRoute} controller:`);
                this.registerRoutes(controller._routes, baseRoute);
            }
        });
    }
    /**
     * Registers all routes with the express app.
     *
     * @param {any}    routes     The list of routes to register
     * @param {string} baseRoute  The base of the domain, ie. "tasks"
     *
     * @return {void}
     */
    registerRoutes(routes, baseRoute) {
        for (const verb in routes) {
            if (routes.hasOwnProperty(verb)) {
                routes[verb].forEach((route) => {
                    const routePart = utils_1.stripSlashes(route.path);
                    const fullRoute = `/${baseRoute}${routePart ? '/' : ''}${routePart}`;
                    utils_1.log(`Route: [${verb.toUpperCase()}] ${fullRoute}`);
                    this.express[verb](fullRoute, ...[...(route.middlewares ? route.middlewares : []), route.handler]);
                });
            }
        }
    }
}
exports.default = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsZ0RBQXdCO0FBQ3hCLG9EQUE0QjtBQUM1Qiw4REFBcUM7QUFFckMsb0RBQTZEO0FBRTdELE1BQXFCLFdBQVc7SUFlOUI7Ozs7T0FJRztJQUNILFlBQW9CLE1BQWMsRUFBVSxPQUFZO1FBQXBDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFLO1FBbkJ4RDs7OztXQUlHO1FBQ0gsaUJBQVksR0FBYSxHQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFFekM7Ozs7V0FJRztRQUNILGdCQUFXLEdBQWMsR0FBUSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBT2tCLENBQUM7SUFFNUQ7O09BRUc7SUFDRyxLQUFLOztZQUNULGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUVwQyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVyQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQzdDLFdBQUcsQ0FBQyw2QkFBNkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNILElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxpQkFBaUI7O1lBQzdCLE1BQU0sZUFBZSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLDRCQUE0QixDQUFDLENBQUMsQ0FBQztZQUV4RixJQUFJLFNBQVMsQ0FBQztZQUNkLElBQUksVUFBVSxDQUFDO1lBRWYsS0FBSyxNQUFNLGNBQWMsSUFBSSxlQUFlLEVBQUU7Z0JBQzVDLFNBQVMsR0FBRyxjQUFJLENBQUMsUUFBUSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDeEQsVUFBVSxHQUFHLHdEQUFhLGNBQWMsR0FBQyxDQUFDO2dCQUMxQyxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRXRDLFdBQUcsQ0FBQywwQkFBMEIsU0FBUyxjQUFjLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3BEO1FBQ0gsQ0FBQztLQUFBO0lBRUQ7Ozs7Ozs7T0FPRztJQUNLLGNBQWMsQ0FBQyxNQUFhLEVBQUUsU0FBaUI7UUFDckQsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDekIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7b0JBQ3BDLE1BQU0sU0FBUyxHQUFXLG9CQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNuRCxNQUFNLFNBQVMsR0FBVyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsRUFBRSxDQUFDO29CQUU3RSxXQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssU0FBUyxFQUFFLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDckcsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBM0ZELDhCQTJGQyJ9