<template>
  <dashboard :MyImg="MyImg" />
</template>

<script>
import Vue from 'vue'
import MyImg from '@MyImg/core'
import { Dashboard } from '@MyImg/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
  },
  computed: {
    MyImg: () => new MyImg(),
  },
}
</script>

<style src="@MyImg/core/dist/style.css"></style>
<style src="@MyImg/dashboard/dist/style.css"></style>
