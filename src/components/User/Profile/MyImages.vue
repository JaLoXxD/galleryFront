<template>
	<div id="myImagesCont">
		<div v-for="(item, i) in myImages" :key="item._id">
			<div class="imageCard" :id="`image-${item._id}`">
				<div class="imgCont" @click="showPopup('imagePopup', item)">
					<img :src="`${getUrl}/uploads/?img=${item.filename}`" />
				</div>
				<!-- <div class="textCont">
					<div class="options">
						<div class="icon" @click="showOptions(`opt${i}`)">
							<font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
						</div>
						<div class="actions" :id="`opt${i}`">
							<ul>
								<li><button @click="this.$emit('editImagePopup', item._id);">Edit</button></li>
								<li><button @click="this.deleteMyImage({ imageID: item._id, imageName: item.filename })">Delete</button></li>
								<li><button @click="this.$emit('copyImageLink', `${getUrl}/uploads/?img=${item.filename}`);">Share</button></li>
							</ul>
						</div>
					</div>
					<h3>{{ item.title }}</h3>
					<p>{{ item.description }}</p>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import $ from "jquery";
	export default {
		name: "MyImages",
		emits: ["editImagePopup", "copyImageLink", "popup"],
		data: () => {
			return {
				myImages: [],
			};
		},
		props: {
			userId: String,
		},
		async mounted() {
			this.myImages = await this.fetchUserImages(this.userId);
		},
		created() {
			document.onclick = this.documentClick;
		},
		methods: {
			showPopup(popup, currentImage) {
				console.log(currentImage);
				this.$emit("popup", { type: popup, image: currentImage });
			},
			documentClick(e) {
				let dropdown_selector = $(".actions");
				if (!e.target.matches([".icon"])) {
					$(".actions").removeClass("active");
				}
			},
			deleteMyImage(imageData) {
				this.$swal({
					icon: "warning",
					title: `<span style='color:#fff; font-weight:700'>Are you sure?</span>`,
					showConfirmButton: true,
					showCancelButton: true,
					showLoaderOnConfirm: true,
					showClass: {
						popup: "animated fadeInDown faster",
						icon: "animated heartBeat delay-1s",
					},
					customClass: {
						confirmButton: "warningConfirmBtn",
					},
					hideClass: {
						popup: "animated fadeOutUp faster",
					},
					html: `<p>The image will be deleted forever!</p>`,
					background: "#32ccbc",
					cancelButtonColor: "#2BB895",
				})
					.then((result) => {
						if (result.isConfirmed) {
							this.deleteImage(imageData);
							document.getElementById(`image-${imageData.imageID}`).remove();
						}
					})
					.catch((err) => {
						console.log(err);
					});
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
			...mapActions(["fetchUserImages", "deleteImage"]),
		},
		computed: {
			...mapGetters(["getUrl", "getUserImages"]),
		},
	};
</script>

<style lang="css" scoped>
	#myImagesCont {
		margin: 50px auto 0;
		display: flex;
		gap: 30px;
		width: 100%;
		flex-wrap: wrap;
	}
	#myImagesCont .imageCard {
		padding: 0;
		border-radius: 20px;
		margin: 0 auto;
		width: 300px;
		cursor: pointer;
	}
	#myImagesCont .imageCard .imgCont {
		overflow: hidden;
	}
	#myImagesCont .imageCard .imgCont img {
		width: 300px;
		height: 300px;
		object-fit: cover;
		transition: transform 0.5s ease-in-out;
	}
	#myImagesCont .imageCard .textCont {
		position: relative;
	}
	#myImagesCont .imageCard .textCont h3 {
		font-size: 30px;
		margin-top: 15px;
	}
	#myImagesCont .imageCard .textCont p {
		font-family: Arial;
		font-weight: lighter;
	}
	#myImagesCont .imageCard .textCont .options {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	#myImagesCont .imageCard .textCont .options .icon {
		position: absolute;
		width: 25px;
		height: 25px;
		right: 0;
		cursor: pointer;
		z-index: 100;
	}
	#myImagesCont .imageCard .textCont .options .actions {
		background-color: rgb(98, 92, 92);
		width: 60%;
		position: absolute;
		right: 0px;
		top: 30px;
		border-radius: 0 0 5px 5px;
		height: 0px;
		transition: height 0.5s ease-in-out;
		overflow: hidden;
	}
	#myImagesCont .imageCard .textCont .options .actions.active {
		height: 109px;
	}
	#myImagesCont .imageCard .textCont .options .actions ul {
		padding: 5px 20px;
		transition: height 0.5s ease-in-out;
		margin-bottom: 0;
		list-style-type: none;
		text-align: start;
		color: #fff;
	}
	#myImagesCont .imageCard .textCont .options .actions ul li {
		border-bottom: 1px solid #d8d8d8;
	}
	#myImagesCont .imageCard .textCont .options .actions ul li button {
		color: #fff;
		background: transparent;
		border: 0;
		padding: 4px 0;
		width: 100%;
		text-align: start;
	}
	#myImagesCont .imageCard .textCont .options .actions ul li button:hover {
		background: rgba(0, 0, 0, 0.4);
	}
	#myImagesCont .imageCard .textCont .options svg {
		position: absolute;
		pointer-events: none;
		right: 10px;
		font-size: 25px;
	}
</style>
