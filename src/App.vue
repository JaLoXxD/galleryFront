<template>
	<Navbar />
	<router-view class="content" />
	<Footer />
</template>

<script>
	import { mapActions } from "vuex";
	import Navbar from "./components/Navbar.vue";
	import Footer from "./components/Footer.vue";
	export default {
		name: "App",
		created() {
			this.isLogin();
			this.checkToken();
		},
		components: {
			Navbar,
			Footer,
		},
		methods: {
			...mapActions(["isLogin", "checkToken"]),
		},
	};
</script>

<style>
	/* FONTS (POPPINS) */
	@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap");
	#app {
		background: #fafafa;
		font-family: "Poppins", sans-serif;
		font-weight: bold;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	.h1,
	.h2,
	.h3,
	.h4,
	.h5,
	.h6,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: bold;
	}
	.form-control:focus {
		color: #212529;
		background-color: #fff;
		border: 0;
		border-bottom: 3px solid rgba(51, 227, 169, 0.5);
		outline: 0;
		box-shadow: none;
	}
	.content {
		padding: 30px;
		min-height: calc(100vh - 56px - 131px);
		height: fit-content;
	}
	.formCont {
		width: 500px;
		height: fit-content;
		margin: 20px auto;
		-webkit-box-shadow: 10px 13px 39px 1px rgba(0, 0, 0, 0.63);
		-moz-box-shadow: 10px 13px 39px 1px rgba(0, 0, 0, 0.63);
		box-shadow: 10px 13px 39px 1px rgba(0, 0, 0, 0.63);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		border: 2px solid #fff;
		border-radius: 20px;
		padding: 30px;
		font-family: "Poppins", sans-serif;
		position: relative;
		background-color: #fff;
		align-self: center;
	}
	.form-control {
		width: 90%;
		margin: 5px auto 20px auto;
		border: 0;
		padding: 5px 0;
		border-bottom: 2px solid rgb(108, 117, 125);
	}
	h2 {
		margin-top: 20px;
	}
	form {
		margin-top: 70px;
	}
	label {
		text-align: start;
		margin: 0;
		width: 90%;
	}
	.formCont .btn {
		width: 90%;
		background-image: linear-gradient(135deg, #90f7ec 10%, #32ccbc 100%);
		color: #fff;
		border: 0;
		border-radius: 20px;
		margin: 10px auto 0;
	}
	.formCont p {
		width: 100%;
		margin: 20px auto 0;
	}
	.formError {
		padding: 5px 0;
		margin: 0 auto;
		background-color: #dd5151;
		color: #fff;
		width: 90%;
		display: none;
	}
	.greenCont {
		min-height: 80vh;
		background-image: linear-gradient(135deg, #92ffc0 10%, #002661 100%);
		display: flex;
	}
	.warningConfirmBtn {
		background-color: rgb(205, 74, 74) !important;
		color: #fff;
		font-size: 16px !important;
		transition: all 2s ease !important;
		-moz-transition: all 2s ease !important;
		-webkit-transition: all 2s ease !important;
		-o-transition: all 2s ease !important;
	}
	.warningConfirmBtn:hover {
		background-color: rgb(209, 39, 39) !important;
	}
	.warningConfirmBtn:focus {
		box-shadow: 0 0 0 3px rgba(209, 39, 39, 0.5) !important;
	}
</style>
