<template>
	<div id="profileContainer">
		<ShareImage :visible="visibleCopy" />
		<div class="userCont">
			<h1>{{ this.getUserData.name }}</h1>
		</div>
		<MyImages
			:userId="this.getUserData.id"
			@editImagePopup="toogleEditPopup"
			@copyImageLink="toogleCopyPopup"
			@imagePopup="toogleImagePopup"
			@popup="tooglePopup"
		/>
		<Popup :visible="showPopup" :myImage="currentImage" @popup="tooglePopup" />
		<!-- <ImagePopup :visible="visibleImage" @imagePopup="toogleImagePopup" :image="currentImage" @editImagePopup="toogleEditPopup" @copyImageLink="toogleCopyPopup" /> -->
		<!-- <EditImage :visible="visiblePopup" :imgID="imageID" @editImagePopup="toogleEditPopup" /> -->
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import MyImages from "../components/MyImages.vue";
	import EditImage from "../components/EditImage.vue";
	import ShareImage from "../components/ShareImage.vue";
	import ImagePopup from "../components/ImagePopup.vue";
	import Popup from "../components/Popup.vue";

	export default {
		components: {
			MyImages,
			Popup,
			EditImage,
			ShareImage,
			ImagePopup,
		},
		data() {
			return {
				showPopup: false,
				visiblePopup: false,
				visibleImage: false,
				visibleCopy: false,
				imageID: "",
				imageURL: "",
				currentImage: {},
			};
		},
		methods: {
			tooglePopup({ type, image }) {
				console.log('asd');
				this.showPopup = !this.showPopup;
				if (type === "imagePopup") {
					this.currentImage = image;
				}
				if(type === ''){
					this.currentImage = {};
				}
			},
			toogleEditPopup(id) {
				this.visiblePopup = !this.visiblePopup;
				this.setImageID(id);
			},
			toogleImagePopup(image) {
				this.visibleImage = !this.visibleImage;
				this.currentImage = image;
				console.log(this.currentImage);
			},
			toogleCopyPopup(url) {
				this.visibleCopy = !this.visibleCopy;
				console.log(this.visibleCopy);
				this.setImageURL(url);
				this.copyText(this.imageURL);
				setTimeout(() => {
					this.visibleCopy = !this.visibleCopy;
					this.setImageURL("");
				}, 3000);
			},
			setImageID(id) {
				this.imageID = id;
			},
			setImageURL(url) {
				this.imageURL = url;
			},
			copyText(txt) {
				const tmpTextField = document.createElement("textarea");
				tmpTextField.textContent = txt;
				tmpTextField.setAttribute("style", "position:absolute; right:200%;");
				document.body.appendChild(tmpTextField);
				tmpTextField.select();
				tmpTextField.setSelectionRange(0, 99999); /*For mobile devices*/
				document.execCommand("copy");
				tmpTextField.remove();
			},
		},
		mounted() {},
		name: "MyProfile",
		computed: {
			...mapGetters(["getUserData", "getUrl"]),
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
