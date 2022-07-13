<template>
	<div class="formCont">
		<h2>Register</h2>
		<form @submit.prevent="createUser">
			<label for="username">Username</label>
			<input v-on:keypress="hideErrors" type="text" placeholder="Type your name" id="username" class="form-control" v-model="credentials.name" />
			<p class="formError emptyError">This field is required</p>
			<label for="age">Age</label>
			<input v-on:keypress="hideErrors" type="number" placeholder="Type your age" id="age" class="form-control" v-model="credentials.age" />
			<p class="formError emptyError">This field is required</p>
			<label for="mail">E-mail</label>
			<input v-on:keypress="hideErrors" type="mail" placeholder="Type your e-mail" id="mail" class="form-control" v-model="credentials.mail" />
			<p class="formError emptyError">This field is required</p>
			<label for="password">Password</label>
			<input
				v-on:keypress="hideErrors"
				type="password"
				placeholder="Type your password"
				id="password"
				class="form-control"
				v-model="credentials.password"
			/>
			<p class="formError emptyError">This field is required</p>
			<p class="formError passError">Passwords must be the same</p>
			<label for="password2">Confirm Password</label>
			<input
				v-on:keypress="hideErrors"
				type="password"
				placeholder="Confirm your password"
				id="password2"
				class="form-control"
				v-model="credentials.password2"
			/>
			<p class="formError emptyError">This field is required</p>
			<p class="formError passError">Passwords must be the same</p>
			<button class="btn">REGISTER</button>
		</form>
		<p>If you already have an account <router-link class="" to="/login">login</router-link></p>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "RegisterForm",
		data() {
			return {
				credentials: {
					name: "",
					mail: "",
					password: "",
					password2: "",
					age: "",
					created: null,
				},
			};
		},
		computed: {
			...mapGetters(["getError"]),
		},
		methods: {
			hideErrors() {
				if (this.getError.empty) {
					let emptyErrors = document.getElementsByClassName("emptyError");
					for (let i = 0; i < emptyErrors.length; i++) {
						emptyErrors[i].style.display = "none";
					}
				}
				if (this.getError.password) {
					let passErrors = document.getElementsByClassName("passError");
					for (let i = 0; i < passErrors.length; i++) {
						passErrors[i].style.display = "none";
					}
				}
				return;
			},
			async createUser() {
				console.log(this.credentials);
				this.credentials.created = new Date();
				var success = await this.register(this.credentials);
				console.log(success);
				if (!success) {
					if (this.getError.empty) {
						let emptyErrors = document.getElementsByClassName("emptyError");
						for (let i = 0; i < emptyErrors.length; i++) {
							emptyErrors[i].style.display = "block";
						}
					}
					if (this.getError.password) {
						let passErrors = document.getElementsByClassName("passError");
						for (let i = 0; i < passErrors.length; i++) {
							passErrors[i].style.display = "block";
						}
					}
					return;
					/* this.$swal({
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
					}); */
				} else {
					this.$swal({
						icon: "success",
						title: `<span style='color:#fff; font-weight:700'>Your account was created successfully</span>`,
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
			...mapActions(["register"]),
		},
	};
</script>
