<template>
	<div class="popupContainer" :class="showPopup" @click="clickPopupContainer($event)">
		<ImagePopup :visible="imagePopupVisible" @imagePopup="toogleImagePopup" :image="myImage" @editImagePopup="toogleEditPopup" @copyImageLink="toogleCopyPopup" />
	</div>
</template>

<script>
	import ImagePopup from "./ImagePopup.vue";
	export default {
		name: "Popup",
        emits:['popup'],
		components: { ImagePopup },
		props: {
			visible: Boolean,
			type: String,
            myImage: Object,
		},
        data() {
            return {
                imagePopupVisible:false,
            }
        },
		methods: {
			clickPopupContainer(event) {
				const popup = document.getElementById("imagePopup");
				const isClickInside = popup.contains(event.target);
				if (!isClickInside) {
					this.$emit("popup", {type:'',image:{}});
				}
			},
			toogleImagePopup(image) {
				this.visibleImage = !this.visibleImage;
				this.myImage = image;
				console.log(this.myImage);
			},
            showContent(){
                if(type === 'imagePopup'){
                    this.imagePopupVisible = !this.imagePopupVisible;
                }
            },
		},
		computed: {
			showPopup() {
				return !this.visible ? "hidePopup" : "";
			},
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
</style>
