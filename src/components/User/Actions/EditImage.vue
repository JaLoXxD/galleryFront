<template>
	<h5>Edit</h5>
	<form @submit.prevent="sendForm">
		<label for="imgTitle">Title<span v-bind:class="emptyClass">*</span></label>
		<input type="text" id="imgTitle" class="form-control" v-model="imageBody.title" />
		<label for="imgDesc">Description<span v-bind:class="emptyClass">*</span></label>
		<textarea id="imgDesc" class="form-control" v-model="imageBody.description" cols="30" rows="5"></textarea>
		<button class="btn customSubmit" type="submit"> Save</button>
	</form>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "EditImage",
		props: {
			visible: Boolean,
			image: Object,
		},
		emits: ["updateImg"],
		data() {
			return {
				imageBody: {
					imageID: this.image._id,
					title: this.image.title,
					description: this.image.description,
				},
			};
		},
		setup() {
			return {};
		},
		mounted() {},
		methods: {
			sendForm() {
				try {
					const { title, description } = this.imageBody;
					this.updateImage(this.imageBody);
					this.$emit("updateImg", { title, description });
				} catch (err) {
					console.log(err);
				}
			},
			...mapActions(["updateImage"]),
		},
		computed: {
			emptyClass() {
				return this.getEmpty ? "emptyField" : "completeField";
			},
			...mapGetters(["getEmpty"]),
		},
	};
</script>

<style lang="css" scoped>
	.customSubmit {
		background-color: rgb(102, 193, 162);
		width: fit-content;
		margin-left: auto;
		color: white;
		height: 50px;
		padding: 5px 20px;
		width: fit-content;
		font-size: 20px;
	}
	h2 {
		margin-top: 0;
	}
	form {
		margin-top: 20px;
	}
	.form-control {
		width: 100%;
	}
</style>
