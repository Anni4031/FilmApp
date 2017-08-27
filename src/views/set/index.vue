<template>
  <div>
      <T :title="title"></T>
      <div>
      	
      </div>
  </div>
</template>

<script>
import star from '../star/star'
import Title from '../layout/header_title'
import { api } from '../../global/api'
import store from '../../store/index'
  export default {
    components: {
      star:star,
      T:Title
    },
    data () {
      return {
      	title:"设置"
      	}
    },
    
    mounted: function () {
      // this.getMovie()
    },
    methods: {
    },
}
</script>

<style scoped>
	.middle{
		width: 100%;
		display: flex;
	}
</style>