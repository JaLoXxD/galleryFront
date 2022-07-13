<template>
	<footer>
		<div class="container-fluid">
            <p>&copy; </p>
        </div>
	</footer>
</template>

<script>
	export default {
		name: "Footer",
	};
</script>

<style scoped>
	.container-fluid {
        color:rgb(199, 196, 196);
		background-color: rgb(20, 20, 20);
		height: calc(100vh - 80vh - 56px);
	}
</style>
