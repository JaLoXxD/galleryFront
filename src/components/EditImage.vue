<template>
	<div class="popupContainer" :class="showPopup" @click="clickPopupContainer($event)">
		<div class="popupContent" id="editPopup">
			<h2>Edit Image {{ imgID }}</h2>
			<form @submit.prevent="sendForm">
				<label for="imgTitle">Title<span v-bind:class="emptyClass">*</span></label>
				<input type="text" id="imgTitle" class="form-control" v-model="imageBody.title" />
				<label for="imgDesc">Description<span v-bind:class="emptyClass">*</span></label>
				<input type="text" id="imgDesc" class="form-control" v-model="imageBody.description" />
				<button class="btn customSubmit" type="submit"> Save</button>
			</form>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "EditImage",
		props: {
			visible: Boolean,
			imgID: String,
		},
		emits: ["editImagePopup"],
		data() {
			return {
				imageBody: {
					imageID: this.imgID,
					title: "",
					description: "",
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
					this.imageBody.imageID = this.imgID;
					this.updateImage(this.imageBody);
					//this.$emit("editImagePopup", "");
				} catch (err) {
					console.log(err);
				}
			},
			clickPopupContainer(event) {
				const popup = document.getElementById("editPopup");
				const isClickInside = popup.contains(event.target);
				if (!isClickInside) {
					this.$emit("editImagePopup", "");
				}
			},
			...mapActions(["updateImage"]),
		},
		computed: {
			showPopup() {
				return !this.visible ? "hidePopup" : "";
			},
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
	.popupContainer {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
		top: 0;
		left: 0;
	}
	.popupContainer .popupContent {
		background: #fff;
		min-width: 50%;
		height: fit-content;
		z-index: 9999;
		padding: 40px;
		border-radius: 20px;
		box-shadow: -7px 5px 36px 0px rgba(0, 0, 0, 0.75);
		-webkit-box-shadow: -7px 5px 36px 0px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: -7px 5px 36px 0px rgba(0, 0, 0, 0.75);
	}
	.popupContainer .popupContent h2 {
		margin-top: 0;
	}
	.hidePopup {
		display: none;
	}
</style>
