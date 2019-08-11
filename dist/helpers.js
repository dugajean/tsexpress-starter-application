"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Output stuff to the console.
 *
 * @param {string} message
 */
function log(message) {
    console.info(`\x1b[35m[${process.env.APP_NAME}] ${message}`);
}
exports.log = log;
/**
 * Trims slashes from a path.
 *
 * @param {string} path
 *
 * @return {string}
 */
function stripSlashes(path) {
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    if (path.startsWith('/')) {
        path = path.substring(1);
    }
    return path;
}
exports.stripSlashes = stripSlashes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7R0FJRztBQUNILFNBQWdCLEdBQUcsQ0FBQyxPQUFlO0lBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQy9ELENBQUM7QUFGRCxrQkFFQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQWdCLFlBQVksQ0FBQyxJQUFZO0lBQ3ZDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN0QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxQjtJQUVELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN4QixJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxQjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVZELG9DQVVDIn0=