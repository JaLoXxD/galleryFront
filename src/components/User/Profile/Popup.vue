<template>
	<div class="popupContainer" :class="showPopup" @click="clickPopupContainer($event)">
		<div class="popupContent" id="imagePopup">
			<div class="imageCont">
				<img :src="getImageURL" />
			</div>
			<div class="infoCont">
				<div class="infoHead">
					<h4>{{ userData.name }}</h4>
					<div id="optionsBtn" class="icon" @click="toogleOptions">
						<button id="popupOptions"><font-awesome-icon :icon="['fas', 'ellipsis-vertical']" /></button>
					</div>
					<div id="optionsMenu" :class="`actions ${showActions}`">
						<ul>
							<li><button @click="toogleEdit">Edit</button></li>
							<li><button @click="this.deleteMyImage({ imageID: item._id, imageName: item.filename })">Delete</button></li>
							<li><button @click="this.$emit('copyImageLink', `${getUrl}/uploads/?img=${item.filename}`)">Share</button></li>
						</ul>
					</div>
				</div>
				<p v-if="!editImage">
					{{ userData.name }} <span id="imageDescription">{{ image.description }}</span>
				</p>
				<EditImage v-if="editImage" :image="image" @updateImg="updateCurrentImage" />
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import EditImage from "../Actions/EditImage.vue";
	export default {
		name: "Popup",
		emits: ["popup", "updateImage"],
		components: {
			EditImage,
		},
		props: {
			visible: Boolean,
			type: String,
			image: Object,
		},
		data() {
			return {
				optionsMenu: false,
				userData: {},
				editImage: false,
			};
		},
		mounted() {
			this.userData = this.getUserData;
		},
		methods: {
			clickPopupContainer(event) {
				const popup = document.getElementById("imagePopup");
				const isClickInside = popup.contains(event.target);
				if (!isClickInside) {
					this.$emit("popup", { type: "", image: {} });
				}
				const btn = document.getElementById("popupOptions");
				const menu = document.getElementById("optionsMenu");
				if (event.path.includes(btn)) {
					return;
				}
				if (this.optionsMenu && !event.path.includes(menu)) {
					this.optionsMenu = !this.optionsMenu;
				}
			},
			updateCurrentImage(newImage) {
				this.toogleEdit();
				this.$emit("updateImage", [newImage]);
			},
			toogleOptions() {
				this.optionsMenu = !this.optionsMenu;
			},
			toogleEdit() {
				this.editImage = !this.editImage;
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
			showActions() {
				return this.optionsMenu && "showOptions";
			},
			...mapGetters(["getUrl", "getUserData"]),
		},
	};
</script>

<style lang="css" scoped>
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
	.hidePopup {
		display: none;
	}

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
		position: relative;
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

	.actions {
		position: absolute;
		right: 0;
		top: 30px;
		padding: 0;
		height: 0;
		overflow: hidden;
		background-color: #fff;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		-webkit-box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		-moz-box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
		transition: all 0.4s ease-in-out;
	}
	.actions.showOptions {
		height: 116px;
	}
	.actions ul {
		list-style: none;
		padding: 10px 15px;
		margin: 0;
	}
	.actions ul li:hover {
		background-color: #b8b8b8;
	}
	.icon {
		cursor: pointer;
	}
	.icon i {
		pointer-events: none;
	}
</style>
