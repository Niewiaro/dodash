export default defineEventHandler(async (event) => {
	deleteCookie(event, "token");

	return {
		success: true,
		message: "Logged out",
	};
});
