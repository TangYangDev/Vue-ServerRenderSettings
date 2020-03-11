<template>
  <div>
    <p>{{systemName}}</p>
    <p>{{currentDate}}</p>
    <h2>这是首页</h2>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {};
  },
  mounted() {
    this.realTimeUpdate({
      time: 1000
    });
    this.updateSysemName({
      sysPrefixName: "大数据",
      sysSuffixName: "研判分析平台"
    });
  },
  methods: {
    ...mapActions(["realTimeUpdate"]),
    ...mapMutations(["updateSysemName"])
  },
  computed: {
    ...mapState(["sysPrefixName", "sysSuffixName", "currentDate"]),
    ...mapGetters(["systemName"])
  }
};
</script>