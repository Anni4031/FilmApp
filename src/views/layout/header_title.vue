<template>
	<div>
		<mt-header :title="title" class="header-title">
		  <router-link to="/" slot="left">
		    <mt-button icon="back" class="i"></mt-button>
		  </router-link>
		</mt-header>
	</div>
</template>

<script>
	export default {
	    props: ['title'],
	    mounted() {  
	        
	    },
	    methods: {  
	        backLastPage: function () {
	           // window.history.go(-1)
	           // this.$route.go(-1)
	           this.$router.go(-1)
	        }    
	    }  
	}
</script>

<style>
	.i{
	  float: left;
	  padding-top: 1%;
	  padding-left: 1%;
	  font-size: 1.5rem;
	}
	.header-title {
	  display: flex;
	  height: 24%;
	  width: 100%;
	  background-color: #e54847;
	  box-sizing: border-box;
	  font-size: 1.5rem;
	}
</style>