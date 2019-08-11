"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addRoute(verb, route, middlewares, target, descriptor) {
    const currentRoutes = target._routes ? target._routes[verb] : [];
    const newRoute = {
        path: route,
        handler: descriptor.value,
        middlewares
    };
    Object.defineProperty(target, '_routes', {
        value: { [verb]: [...currentRoutes, newRoute] },
        writable: true
    });
    return descriptor;
}
function Get(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('get', route, middlwares, target, descriptor);
    };
}
exports.Get = Get;
function Post(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('post', route, middlwares, target, descriptor);
    };
}
exports.Post = Post;
function Patch(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('patch', route, middlwares, target, descriptor);
    };
}
exports.Patch = Patch;
function Put(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('put', route, middlwares, target, descriptor);
    };
}
exports.Put = Put;
function Delete(route = '', ...middlwares) {
    return (target, key, descriptor) => {
        return addRoute('delete', route, middlwares, target, descriptor);
    };
}
exports.Delete = Delete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmVyYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQSxTQUFTLFFBQVEsQ0FDZixJQUFZLEVBQ1osS0FBYSxFQUNiLFdBQXVCLEVBQ3ZCLE1BQVcsRUFDWCxVQUE4QjtJQUU5QixNQUFNLGFBQWEsR0FBWSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDMUUsTUFBTSxRQUFRLEdBQVU7UUFDdEIsSUFBSSxFQUFFLEtBQUs7UUFDWCxPQUFPLEVBQUUsVUFBVSxDQUFDLEtBQUs7UUFDekIsV0FBVztLQUNaLENBQUM7SUFFRixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUU7UUFDdkMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1FBQy9DLFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQyxDQUFDO0lBRUgsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUUsR0FBRyxVQUFzQjtJQUMvRCxPQUFPLENBQUMsTUFBYyxFQUFFLEdBQW9CLEVBQUUsVUFBOEIsRUFBRSxFQUFFO1FBQzlFLE9BQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsa0JBSUM7QUFFRCxTQUFnQixJQUFJLENBQUMsUUFBZ0IsRUFBRSxFQUFFLEdBQUcsVUFBc0I7SUFDaEUsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUM5RSxPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELG9CQUlDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLFFBQWdCLEVBQUUsRUFBRSxHQUFHLFVBQXNCO0lBQ2pFLE9BQU8sQ0FBQyxNQUFjLEVBQUUsR0FBb0IsRUFBRSxVQUE4QixFQUFFLEVBQUU7UUFDOUUsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ2xFLENBQUMsQ0FBQztBQUNKLENBQUM7QUFKRCxzQkFJQztBQUVELFNBQWdCLEdBQUcsQ0FBQyxRQUFnQixFQUFFLEVBQUUsR0FBRyxVQUFzQjtJQUMvRCxPQUFPLENBQUMsTUFBYyxFQUFFLEdBQW9CLEVBQUUsVUFBOEIsRUFBRSxFQUFFO1FBQzlFLE9BQU8sUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUM7QUFDSixDQUFDO0FBSkQsa0JBSUM7QUFFRCxTQUFnQixNQUFNLENBQUMsUUFBZ0IsRUFBRSxFQUFFLEdBQUcsVUFBc0I7SUFDbEUsT0FBTyxDQUFDLE1BQWMsRUFBRSxHQUFvQixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUM5RSxPQUFPLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkUsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELHdCQUlDIn0=