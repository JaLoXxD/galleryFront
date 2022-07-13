import { createStore } from "vuex";
import router from "../router";

export default createStore({
	state: {
		url: "http://localhost:8082",
		tokenDuration: 36,
		token: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null,
		startSession: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).startSession : null,
		user: null,
		userImages: {},
		empty: null,
		error: { message: null, password: null },
	},
	mutations: {
		setEmpty(state, payload) {
			state.empty = payload;
		},
		setError(state, payload) {
			state.error = payload;
		},
		setUser(state, payload) {
			state.user = payload;
		},
		setUserImages(state, payload) {
			state.userImages = payload;
		},
		logoutUser(state, payload) {
			localStorage.removeItem("user");
			state.user = null;
			router.push("/login");
		},
		isAuth(state, payload) {
			if (localStorage.getItem("user")) {
				state.user = localStorage.getItem("user");
			}
		},
	},
	actions: {
		async login({ commit, state }, credentials) {
			try {
				const config = {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify(credentials),
				};
				const req = await fetch(`${state.url}/login`, config);
				const resp = await req.json();
				if (!resp.success) {
					console.log({ message: "an error was ocurred", error: resp });
					commit("setError", resp);
					return false;
				}
				router.push("/");
				let user = {
					id: resp.user._id,
					mail: resp.user.mail,
					name: resp.user.name,
					age: resp.user.age,
					token: resp.token,
					startSession: new Date(),
				};
				commit("setUser", user);
				localStorage.setItem("user", JSON.stringify(user));
				console.log({ message: "ok", resp: resp });
				commit("setError", null);
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		async register({ commit, state }, credentials) {
			try {
				const config = {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify(credentials),
				};
				const req = await fetch(`${state.url.getUrl}/register`, config);
				const resp = await req.json();
				let empty = false;
				if (!credentials.name || !credentials.age || !credentials.password || !credentials.password2 || !credentials.mail) {
					empty = true;
				}
				if (credentials.password != credentials.password2) {
					console.log("error password");
					commit("setError", { message: "Passwords must be the same", password: true });
					commit("setEmpty", empty);
					return false;
				}
				if (empty) {
					commit("setError", { message: "There are empty files", password: false });
					commit("setEmpty", empty);
					return false;
				}
				if (!resp.success) {
					console.log({ message: "an error was ocurred", error: resp });
					commit("setError", { message: resp, password: false });
					commit("setEmpty", empty);
					return false;
				}
				console.log(resp);
				/* let user = { id: resp.user._id, mail: resp.user.mail, name: resp.user.name, age: resp.user.age, token: resp.token };
				commit("setUser", user);
				localStorage.setItem("user", JSON.stringify(user)); */
				console.log({ message: "ok", resp: resp });
				commit("setError", null);
				commit("setEmpty", null);
				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
		async uploadImage({ commit, state }, imageBody) {
			try {
				let apiData = new FormData();
				console.log(imageBody);
				apiData.append("userId", imageBody.userId);
				apiData.append("title", imageBody.title);
				apiData.append("description", imageBody.description);
				if (imageBody.image) {
					apiData.append("image", imageBody.image);
				}
				console.log(apiData);
				const config = {
					method: "POST",
					headers: {
						Authorization: state.token,
					},
					body: apiData,
				};
				const req = await fetch(`${state.url}/uploadImage`, config);
				const resp = await req.json();
				let empty = false;
				if (!imageBody.userId || !imageBody.title || !imageBody.description || !imageBody.image) {
					empty = true;
				}
				if (empty) {
					commit("setError", { message: "There are empty files", password: null });
					commit("setEmpty", empty);
					return false;
				}
				if (!resp.success) {
					console.log({ message: "an error was ocurred", error: resp });
					commit("setError", { message: resp, password: null });
					commit("setEmpty", empty);
					return false;
				}
				console.log(resp);
				console.log({ message: "ok", resp: resp });
				commit("setError", null);
				commit("setEmpty", empty);
				return true;
			} catch (error) {
				console.log(error);
				commit("setError", error);
				return false;
			}
		},
		async updateImage({ commit, state }, imageBody) {
			try {
				console.log(imageBody);
				const config = {
					method: "PUT",
					headers: {
						Authorization: state.token,
						"Content-type": "application/json",
					},
					body: JSON.stringify(imageBody),
				};
				let empty = false;
				if (!imageBody.imageID || !imageBody.title || !imageBody.description) {
					empty = true;
				}
				if (empty) {
					commit("setError", { message: "There are empty files", password: null });
					commit("setEmpty", empty);
					return false;
				}
				const req = await fetch(`${state.url}/updateImage`, config);
				const resp = await req.json();
				if (!resp.success) {
					console.log({ message: "an error was ocurred", error: resp });
					commit("setError", { message: resp, password: null });
					commit("setEmpty", empty);
					return false;
				}
				console.log(resp);
				console.log({ message: "ok", resp: resp });
				commit("setError", null);
				commit("setEmpty", empty);
				return true;
			} catch (error) {
				console.log(error);
				commit("setError", error);
				return false;
			}
		},
		async fetchUserImages({ commit, state }, userId) {
			try {
				const config = {
					method: "GET",
					headers: {
						"content-type": "application/json",
						Authorization: state.token,
					},
				};
				const req = await fetch(`${state.url}/getUserImages?userId=${userId}`, config);
				const resp = await req.json();
				if (!resp.success) {
					console.log({ message: "an error was ocurred", error: resp });
					commit("setError", { message: resp });
					return false;
				}
				//console.log(resp);
				console.log({ message: "ok", resp: resp });
				commit("setError", null);
				commit("setUserImages", resp.userImages);
				return resp.userImages;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
		async deleteImage({ commit, state }, imageData) {
			try {
				const config = {
					method: "POST",
					headers: {
						"Content-type": "application/json",
						Authorization: state.token,
					},
					body: JSON.stringify(imageData),
				};
				const req = await fetch(`${state.url}/deleteImage`, config);
				const resp = await req.json();
				if (!resp.success) {
					console.log({ message: "an error was ocurred", error: resp });
					commit("setError", { message: resp });
					return false;
				}
				console.log(resp);
				console.log({ message: "ok", resp: resp });
				commit("setError", null);
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
		checkToken({ commit, state }) {
			try {
				let startSession = new Date(state.startSession);
				let actualDate = new Date();
				let diff;
				if (state.token === null) {
					console.log("the user needs login");
					return;
				}
				diff = (actualDate.getTime() - startSession.getTime()) / 1000;
				diff /= 60 * 60;
				//console.log(`diff: ${diff}`);
				if (diff > this.state.tokenDuration) {
					console.log("expired token");
					commit("logoutUser");
				} else {
					console.log("valid token");
				}
			} catch (err) {
				console.log(err);
			}
		},
		logout({ commit }) {
			commit("logoutUser");
		},
		isLogin({ commit }) {
			commit("isAuth");
		},
	},
	getters: {
		getUser(state) {
			return !!state.user;
		},
		getUserData(state) {
			return JSON.parse(state.user);
		},
		getUserImages(state) {
			return state.userImages;
		},
		getToken(state) {
			return state.token;
		},
		getStartSession(state) {
			return state.startSession;
		},
		getError(state) {
			return state.error;
		},
		getEmpty(state) {
			return state.empty;
		},
		getUrl(state) {
			return state.url;
		},
		getToken(state) {
			return JSON.parse(state.user).token;
		},
	},
	modules: {},
});
