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
            this.express.all('*', (req, res) => res.sendStatus(404));
            this.express.listen(process.env.APP_PORT, () => {
                utils_1.log(`Server listening on port: ${process.env.APP_PORT}`);
            });
        });
    }
    /**
     * Locates all the controller's within the app
     *
     * @return {void}
     */
    locateControllers() {
        return __awaiter(this, void 0, void 0, function* () {
            globalThis.expressApp = this.express;
            glob_1.default.sync(path_1.default.join(this.appDir, '/app/**/controller.{ts,js}')).forEach((c) => __awaiter(this, void 0, void 0, function* () { return yield Promise.resolve().then(() => __importStar(require(c))); }));
        });
    }
}
exports.Application = Application;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwbGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsZ0RBQXdCO0FBQ3hCLG9EQUE0QjtBQUM1Qiw4REFBcUM7QUFFckMsb0RBQStDO0FBRS9DLE1BQWEsV0FBVztJQWV0Qjs7OztPQUlHO0lBQ0gsWUFBNEIsTUFBYyxFQUFtQixPQUFZO1FBQTdDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBbUIsWUFBTyxHQUFQLE9BQU8sQ0FBSztRQW5CekU7Ozs7V0FJRztRQUNILGlCQUFZLEdBQWEsR0FBUSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBRXpDOzs7O1dBSUc7UUFDSCxnQkFBVyxHQUFjLEdBQVEsRUFBRSxDQUFDLElBQUksQ0FBQztJQU9tQyxDQUFDO0lBRTdFOztPQUVHO0lBQ0csS0FBSzs7WUFDVCxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRWhCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFFcEMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTVFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDN0MsV0FBRyxDQUFDLDZCQUE2QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRDs7OztPQUlHO0lBQ1csaUJBQWlCOztZQUM3QixVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDckMsY0FBSSxDQUFDLElBQUksQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFNLENBQUMsRUFBQyxFQUFFLGdEQUFDLE9BQUEsd0RBQWEsQ0FBQyxHQUFDLENBQUEsR0FBQSxDQUFDLENBQUM7UUFDdEcsQ0FBQztLQUFBO0NBQ0Y7QUFuREQsa0NBbURDIn0=