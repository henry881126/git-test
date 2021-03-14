<template>
	<div class="home">
		<router-link to="/test1">test1</router-link>
		<router-link to="/test2">test2</router-link>
	</div>
</template>
 
<script>
	export default {
		name: "vueName",
		data() {
			return {
				msg: "Welcome to your vueName",
			};
		},
	};
</script>
 
<style scoped lang = "scss">
</style>