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
require("./verbs");
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const helpers_1 = require("./helpers");
class Application {
    /**
     * Application constructor.
     *
     * @param {any} express An Express app instance.
     */
    constructor(appDir, express) {
        this.appDir = appDir;
        this.express = express;
    }
    /**
     * Start the application and listen to a port.
     *
     * @return {void}
     */
    start() {
        dotenv_1.default.config();
        this.express.use(body_parser_1.default.urlencoded({ extended: true }));
        this.express.use(body_parser_1.default.json());
        // Run before routes hooks
        if (this.beforeRoutes) {
            this.beforeRoutes.call(this, this.express);
        }
        this.locateControllers();
        // Run after routes hooks
        if (this.beforeRoutes) {
            this.beforeRoutes.call(this, this.express);
        }
        this.express.listen(process.env.APP_PORT, () => {
            helpers_1.log(`Server listening on port: ${process.env.APP_PORT}`);
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
                helpers_1.log(`Registering routes for ${baseRoute} controller:`);
                this.registerRoutes(controller._routes, baseRoute);
            }
        });
    }
    /**
     * Registers all routes with the express app.
     *
     * @param {any}    routes     The list of routes to register
     * @param {string} baseRoute  The base of the domain, ie. "tasks"
     * @param {any}    req        Express's request object
     * @param {any}    res        Express's response handler
     *
     * @return {void}
     */
    registerRoutes(routes, baseRoute) {
        for (const verb in routes) {
            if (routes.hasOwnProperty(verb)) {
                routes[verb].forEach((route) => {
                    const routePart = helpers_1.stripSlashes(route.path);
                    const fullRoute = `/${baseRoute}${routePart ? '/' : ''}${routePart}`;
                    helpers_1.log(`Route: [${verb.toUpperCase()}] ${fullRoute}`);
                    this.express[verb](fullRoute, ...[...(route.middlewares ? route.middlewares : []), route.handler]);
                });
            }
        }
    }
}
exports.default = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBaUI7QUFDakIsZ0RBQXdCO0FBQ3hCLGdEQUF3QjtBQUN4QixvREFBNEI7QUFFNUIsOERBQXFDO0FBQ3JDLHVDQUE4QztBQUU5QyxNQUFxQixXQUFXO0lBZTlCOzs7O09BSUc7SUFDSCxZQUFvQixNQUFjLEVBQVUsT0FBWTtRQUFwQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBSztJQUFHLENBQUM7SUFFNUQ7Ozs7T0FJRztJQUNILEtBQUs7UUFDSCxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFcEMsMEJBQTBCO1FBQzFCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekIseUJBQXlCO1FBQ3pCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzVDO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBQzdDLGFBQUcsQ0FBQyw2QkFBNkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLGVBQWU7UUFDakIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1csaUJBQWlCOztZQUM3QixNQUFNLGVBQWUsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7WUFFeEYsSUFBSSxTQUFTLENBQUM7WUFDZCxJQUFJLFVBQVUsQ0FBQztZQUVmLEtBQUssTUFBTSxjQUFjLElBQUksZUFBZSxFQUFFO2dCQUM1QyxTQUFTLEdBQUcsY0FBSSxDQUFDLFFBQVEsQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELFVBQVUsR0FBRyx3REFBYSxjQUFjLEdBQUMsQ0FBQztnQkFDMUMsVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUV0QyxhQUFHLENBQUMsMEJBQTBCLFNBQVMsY0FBYyxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNwRDtRQUNILENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7T0FTRztJQUNLLGNBQWMsQ0FBQyxNQUFhLEVBQUUsU0FBaUI7UUFDckQsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDekIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7b0JBQ3BDLE1BQU0sU0FBUyxHQUFXLHNCQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNuRCxNQUFNLFNBQVMsR0FBVyxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLFNBQVMsRUFBRSxDQUFDO29CQUU3RSxhQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssU0FBUyxFQUFFLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDckcsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBdkdELDhCQXVHQyJ9