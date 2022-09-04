<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-main>
        <market />
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->

    </el-container>
  </div>
</template>

<script>
import market from '@/views/pages/market.vue'
export default {
  name: 'App',
  components: {
    market,
  },
  methods: {
  },
  data () {
    return {
    }
  }

}
</script>


<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  /* line-height: 160px; */
}
</style>
