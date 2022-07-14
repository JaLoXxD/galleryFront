<template>
	<div id="profileContainer">
		<ConfirmationMsg :visible="getCustomMsg.visible" :text="getCustomMsg.text" />
		<div class="userCont">
			<h1>{{ this.getUserData.name }}</h1>
		</div>
		<MyImages :userId="this.getUserData.id" @editImagePopup="toogleEditPopup" @popup="tooglePopup" />
		<Popup :visible="showPopup" :image="getCurrentImage" @popup="tooglePopup" @updateImage="updateCurrentImage" />
		<!-- <ImagePopup :visible="visibleImage" @imagePopup="toogleImagePopup" :image="getCurrentImage" @editImagePopup="toogleEditPopup" @copyImageLink="toogleCopyPopup" /> -->
		<!-- <EditImage :visible="visiblePopup" :imgID="imageID" @editImagePopup="toogleEditPopup" /> -->
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import MyImages from "../components/User/Profile/MyImages.vue";
	import EditImage from "../components/User/Actions/EditImage.vue";
	import Popup from "../components/User/Profile/Popup.vue";
	import ConfirmationMsg from "../components/User/Actions/ConfirmationMsg.vue";

	export default {
		components: {
			MyImages,
			Popup,
			EditImage,
			ConfirmationMsg,
		},
		data() {
			return {
				showPopup: false,
				visiblePopup: false,
				visibleImage: false,
				imageID: "",
				imageURL: "",
			};
		},
		methods: {
			tooglePopup({ type, image }) {
				this.showPopup = !this.showPopup;
				if (type === "imagePopup") {
					this.updateCurrentImage(image);
				}
				if (type === "") {
					this.updateCurrentImage({});
				}
			},
			toogleEditPopup(id) {
				this.visiblePopup = !this.visiblePopup;
				this.setImageID(id);
			},
			toogleImagePopup(image) {
				this.visibleImage = !this.visibleImage;
				this.updateCurrentImage(image);
				console.log(this.getCurrentImage);
			},
			updateCurrentImage(options) {
				console.log(options);
				const { title, description } = options[0];
				this.currentImage.title = title;
				this.currentImage.description = description;
			},
			/* toogleCopyPopup(url) {
				this.visibleCopy = !this.visibleCopy;
				console.log(this.visibleCopy);
				this.setImageURL(url);
				this.copyText(this.imageURL);
				setTimeout(() => {
					this.visibleCopy = !this.visibleCopy;
					this.setImageURL("");
				}, 3000);
			}, */
			setImageID(id) {
				this.imageID = id;
			},
			setImageURL(url) {
				this.imageURL = url;
			},
			/* copyText(txt) {
				const tmpTextField = document.createElement("textarea");
				tmpTextField.textContent = txt;
				tmpTextField.setAttribute("style", "position:absolute; right:200%;");
				document.body.appendChild(tmpTextField);
				tmpTextField.select();
				tmpTextField.setSelectionRange(0, 99999); 
				document.execCommand("copy");
				tmpTextField.remove();
			}, */
			...mapActions(["updateCurrentImage"]),
		},
		mounted() {},
		name: "MyProfile",
		computed: {
			...mapGetters(["getUserData", "getUrl", "getCurrentImage", "getCustomMsg"]),
		},
	};
</script>

<style lang="css" scoped>
	#profileContainer {
		background: #fafafa;
		width: 1050px;
		margin: 20px auto;
	}
	.userCont {
		text-align: start;
	}
</style>
