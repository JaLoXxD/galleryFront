<template>
	<div class="popupContent" :class="showPopup" id="imagePopup">
		<div class="imageCont">
			<img :src="getImageURL" />
		</div>
		<div class="infoCont">
			<div class="infoHead">
				<h4>{{ userData.name }}</h4>
				<div class="icon" @click="showOptions(`opt${i}`)">
					<button id="popupOptions"><font-awesome-icon :icon="['fas', 'ellipsis-vertical']" /></button>
				</div>
				<div class="actions">
					<ul>
						<li><button @click="this.$emit('editImagePopup', image._id)">Edit</button></li>
						<li><button @click="this.deleteMyImage({ imageID: item._id, imageName: item.filename })">Delete</button></li>
						<li><button @click="this.$emit('copyImageLink', `${getUrl}/uploads/?img=${item.filename}`)">Share</button></li>
					</ul>
				</div>
			</div>
			<p>
				{{ userData.name }} <span id="imageDescription">{{ image.description }}</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "ImagePopup",
		props: {
			visible: Boolean,
			image: Object,
		},
		emits: ["editImagePopup", "copyImageLink", "imagePopup"],
		data() {
			return {
				userData: {},
			};
		},
		setup() {
			return {};
		},
		mounted() {
			this.userData = this.getUserData;
		},
		methods: {
			clickPopupContainer(event) {
				const popup = document.getElementById("imagePopup");
				const isClickInside = popup.contains(event.target);
				if (!isClickInside) {
					this.$emit("imagePopup", {});
				}
			},
			showOptions(id) {
				let content = document.getElementById(id);
				$(".actions").removeClass("active");
				if (content.classList.contains("active")) {
					content.classList.remove("active");
				} else {
					content.classList.add("active");
				}
			},
			...mapActions(["updateImage"]),
		},
		computed: {
			getImageURL() {
				return this.image.path ? `${this.getUrl}/uploads/?img=${this.image.filename}` : "";
			},
			showPopup() {
				return !this.visible ? "hidePopup" : "";
			},
			...mapGetters(["getUrl", "getUserData"]),
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
		overflow: hidden;
		background: #fff;
		min-width: 80%;
		max-width: 80%;
		min-height: 530px;
		height: fit-content;
		max-height: 70%;
		display: flex;
		z-index: 9999;
		padding: 0;
		border-radius: 20px;
		box-shadow: -7px 5px 36px 0px rgba(0, 0, 0, 0.75);
		-webkit-box-shadow: -7px 5px 36px 0px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: -7px 5px 36px 0px rgba(0, 0, 0, 0.75);
	}
	.popupContainer .popupContent .imageCont {
		width: 60%;
		background: #000;
	}
	.popupContainer .popupContent .infoCont {
		height: 100%;
		width: 40%;
		text-align: start;
		padding: 30px;
	}
	.popupContainer .popupContent .infoCont .infoHead {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px solid #b8b8b8;
		padding: 0 0 10px;
		margin-bottom: 10px;
	}
	.popupContainer .popupContent .infoCont .infoHead h4 {
		margin-bottom: 0;
	}
	.popupContainer .popupContent .infoCont .infoHead button {
		border: 0;
		background: transparent;
		font-size: 20px;
	}
	#imageDescription {
		font-weight: normal;
		font-family: "Montserrat", sans-serif;
		margin-left: 10px;
	}
	.popupContainer .popupContent .imageCont img {
		height: 100%;
		max-width: 100%;
		object-fit: contain;
	}
	.popupContainer .popupContent h2 {
		margin-top: 0;
	}
	.hidePopup {
		display: none;
	}
</style>
