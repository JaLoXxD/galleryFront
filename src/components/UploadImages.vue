<template>
	<div id="uploadImagesCont">
		<h3>Upload</h3>
		<form @submit.prevent="saveImg">
			<label for="imgTitle">Title<span v-bind:class="emptyClass">*</span></label>
			<input type="text" id="imgTitle" class="form-control" v-model="imageBody.title" />
			<label for="imgDesc">Description<span v-bind:class="emptyClass">*</span></label>
			<input type="text" id="imgDesc" class="form-control" v-model="imageBody.description" />
			<div class="photoBtns">
				<input id="imgFile" type="file" accept="image/*" @change="inputImage($event)" />
				<label for="imgFile" id="imgLabel"
					><font-awesome-icon :icon="['fas', 'camera-retro']" /><span id="imgText">Choose a Photo</span>
					<button id="removePhotoBtn" class="btn customBtn" @click="removePhoto()">X</button>
				</label>
			</div>
			<p class="formError emptyError">This field is required</p>
			<button class="btn customSubmit" type="submit"> Save</button>
		</form>
	</div>
</template>

<script>
	import $ from "jquery";
	import { mapActions, mapGetters } from "vuex";
	export default {
		name: "UploadImages",
		data() {
			return {
				imageBody: {
					userId: "",
					title: "",
					description: "",
					image: null,
				},
			};
		},
		computed: {
			emptyClass(){
				return this.getEmpty ? 'emptyField' : 'completeField';
			},
			...mapGetters(["getEmpty"]),
		},
		methods: {
			async saveImg() {
				console.log(JSON.parse(localStorage.getItem("user")));
				let currentUser = JSON.parse(localStorage.getItem("user"));
				this.imageBody.userId = currentUser.id;
				console.log(this.imageBody);
				var success = await this.uploadImage(this.imageBody);
				if (!success) {
					if (this.getError) {
						let emptyErrors = document.getElementsByClassName("emptyError");
						for (let i = 0; i < emptyErrors.length; i++) {
							emptyErrors[i].style.display = "block";
						}
						return;
					}
				} else {
					this.$swal({
						icon: "success",
						title: `<span style='color:#fff; font-weight:700'>Image upload successfully</span>`,
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
			inputImage(image) {
				if (image.target.files[0]) {
					this.imageBody.image = image.target.files[0];
					$("#imgText").text(image.target.files[0].name);
					$("#removePhotoBtn").css("opacity", "1");
					//console.log(image.target.files[0].name);
				} else {
					this.imageBody.image = null;
					this.fileName = "";
					$("#imgText").text("Choose a Photo");
					$("#removePhotoBtn").css("opacity", "0");
				}
			},
			removePhoto() {
				this.fileName = "";
				$("#imgText").text("Choose a Photo");
				$("#imgText").val();
				$("#removePhotoBtn").css("opacity", "0");
			},
			...mapActions(["setEmpty", "uploadImage"]),
		},
	};
</script>

<style lang="css">
	.fa-camera-retro,
	.fa-floppy-disk {
		margin-right: 10px;
	}
	.emptyField{
		color:rgb(228, 74, 74);
	}
	.completeField{
		color:#2c3e50;
	}
	#imgFile {
		display: none;
	}
	#imgLabel,
	.customBtn,
	.customSubmit {
		color: white;
		height: 60px;
		width: 250px;
		font-size: 20px;
	}
	#imgLabel {
		position: relative;
		background-color: rgba(51, 227, 169, 0.5);
		margin: 0 10px 0 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 200px;
		font-size: 30px;
		border: 5px dashed rgb(131, 186, 168);
		margin: 5px auto 20px auto;
	}
	.customBtn {
		background-color: rgb(229, 63, 63);
		position: absolute;
		top: -5px;
		right: -5px;
		width: fit-content;
		height: fit-content;
		border-radius: 0;
		opacity: 0;
		transition: all 0.8s ease;
	}
	.customSubmit {
		background-color: rgb(102, 193, 162);
		width: fit-content;
		margin-left: auto;
	}
	.photoBtns {
		display: flex;
		width: 90%;
		margin: auto;
	}
</style>
