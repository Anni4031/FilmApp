<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <mt-button @click.native="handleClick">Toast按钮</mt-button>
    <mt-button @click.native="IndicatorClick">Indicator</mt-button>
    <br>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="item in list">{{ item }}</li>
    </ul>
    <mt-button @click.native="alert">打开alert提示框</mt-button>
    <mt-button @click.native="confirm">打开confirm提示框</mt-button>
    <mt-button @click.native="prompt">打开prompt提示框</mt-button>
    <br> 
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list:[0],
      slots: [
         {
           flex: 1,
           values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
           className: 'slot1',
           textAlign: 'right'
         }, {
           divider: true,
           content: '-',
           className: 'slot2'
         }, {
           flex: 1,
           values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
           className: 'slot3',
           textAlign: 'left'
         }
       ]
    }
  },
  methods: {
    handleClick: function() {
      this.$toast({
        message: '消息',
        position: 'bottom'
        // duration: 1000
      });
    },
    IndicatorClick:function(){
     
      this.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      setTimeout(() => {
        this.$indicator.close();
      }, 2000);
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    },
    alert(){
      this.$messagebox({
        title: '提示',
        message: '操作成功!',
        showCancelButton: true
      });
    },
    confirm(){
      this.$messagebox.confirm('确定执行此操作?').then(action => {
            
      });
    },
    prompt(){
      this.$messagebox.prompt('请输入姓名').then(({ value, action }) => {
        
      });
    },
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
    
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

</style>
