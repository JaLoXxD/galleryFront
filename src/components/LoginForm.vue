<template>
	<div class="formCont">
		<h2>Login</h2>
		<form @submit.prevent="sendForm">
			<label for="mail">E-mail</label>
			<input type="mail" placeholder="Type your e-mail" id="mail" class="form-control" v-model="credentials.mail" />
			<label for="password">Password</label>
			<input type="password" placeholder="Type your password" id="password" class="form-control" v-model="credentials.password" />
			<button class="btn">LOGIN</button>
		</form>
		
		<p>Don't have an account? <router-link class="" to="/register">Sign up</router-link></p>
	</div>
</template>

<script>
	import router from "../router";
	import { mapActions, mapGetters, mapState } from "vuex";
	export default {
		name: "LoginForm",
		data() {
			return {
				credentials: {
					mail: "",
					password: "",
				},
			};
		},
		computed: {
			...mapGetters(["getError"]),
		},
		methods: {
			async sendForm() {
				var success = await this.login(this.credentials);
				if (!success) {
					this.$swal({
						icon: "error",
						title: `<span style='color:#fff; font-weight:700'>${this.getError.message}</span>`,
						showConfirmButton: true,
						showLoaderOnConfirm: true,
						showClass: {
							popup: "animated fadeInDown faster",
							icon: "animated heartBeat delay-1s",
						},
						hideClass: {
							popup: "animated fadeOutUp faster",
						},
						background: "#32ccbc",
						confirmButtonColor: "#2BB895",
					});
				}
			},
			register() {
				router.push({ path: "/register" });
			},
			...mapActions(["login"]),
		},
	};
</script>

<style scoped></style>
