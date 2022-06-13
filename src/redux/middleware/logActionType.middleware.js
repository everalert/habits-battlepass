export default store => next => action => {
	console.log(action.type);
	return next(action);
};