<template>
	<div id="copyContainer" :class="showMessage">
		<h3>{{ text }}</h3>
	</div>
</template>

<script>
	export default {
		name: "ConfirmationMsg",
		props: {
			visible: Boolean,
			text: String,
		},
		computed: {
			showMessage() {
				return this.visible ? "active" : "";
			},
		},
	};
</script>

<style lang="css" scoped>
	#copyContainer {
		display: flex;
		position: absolute;
		width: fit-content;
		padding: 15px 30px;
		left: 0;
		right: 0;
		margin: auto;
		background-image: linear-gradient(90deg, #92ffc0 10%, #47df86 100%);
		border-radius: 30px;
		top: -50px;
		opacity: 0;
		transition: all 0.4s ease-in-out;
		-webkit-transition: all 0.4s ease-in-out;
		-moz-transition: all 0.4s ease-in-out;
		pointer-events: none;
	}
	#copyContainer h3 {
		font-size: 20px;
		margin-bottom: 0;
	}
	#copyContainer.active {
		opacity: 1;
		top: 20px;
	}
</style>
